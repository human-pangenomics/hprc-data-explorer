import os
import pandas as pd
import numpy as np
from build_help import download_file, get_file_sizes_from_uris

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
STORAGE_FOLDER_PATH = os.path.join(BASE_DIR, "unprocessed_files/")
OUTPUT_PATH = os.path.join(BASE_DIR, "source/sequencing-data.csv")

HIC_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/hprc-data-explorer-tables/HPRC_HiC.tsv"
ONT_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/hprc-data-explorer-tables/HPRC_ONT.tsv"
PACBIO_HIFI_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/hprc-data-explorer-tables/HPRC_PacBio_HiFi.tsv"
METADATA_URLS = [HIC_URL, ONT_URL, PACBIO_HIFI_URL]
BIOSAMPLES_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/production/hprc-production-biosample-table.tsv"


def download_source_files(urls, output_folder_path):
    paths = []
    for url in urls:
        # Get the filename and the path where the output will be saved
        paths.append(download_file(url, output_folder_path))
    return paths


def join_samples(metadata_paths, biosamples_table_path):
    # Generate each column across all provided sheets
    metadata_list = [
        pd.read_csv(path, sep="\t", keep_default_na=False).drop_duplicates()
        for path in metadata_paths
    ]
    metadata_columns = np.unique([col for df in metadata_list for col in df.columns])
    # Concatenate all the provided metadata sheets
    all_metadata = (
        pd.concat(metadata_list, axis=0, ignore_index=True)
        .reindex(columns=metadata_columns)
        .fillna("N/A")
    )
    # Join the concatenated sheets with the table
    biosamples_table = pd.read_csv(biosamples_table_path, sep="\t")
    joined = all_metadata.merge(
        biosamples_table,
        left_on="sample_ID",
        right_on="Sample",
        how="left",
        validate="many_to_one",
    )
    print("\nThe following biosamples did not have corresponding metadata:")
    print(
        ", ".join(
            all_metadata[~all_metadata["sample_ID"].isin(biosamples_table["Sample"])][
                "sample_ID"
            ].unique()
        )
    )

    joined_with_size = joined.assign(file_size=get_file_sizes_from_uris(joined["path"], "sequencing data"))

    return joined_with_size


if __name__ == "__main__":
    metadata_files = download_source_files(METADATA_URLS, STORAGE_FOLDER_PATH)
    biosamples_table_file = download_source_files(
        [BIOSAMPLES_TABLE_URL], STORAGE_FOLDER_PATH
    )[0]
    joined = join_samples(metadata_files, biosamples_table_file)
    joined.to_csv(OUTPUT_PATH, index=False)
    print("\nSequencing data processing complete!")
