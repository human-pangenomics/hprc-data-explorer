import os
import pandas as pd
import numpy as np
from build_help import download_file, get_file_sizes_from_uris

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
STORAGE_FOLDER_PATH = os.path.join(BASE_DIR, "unprocessed_files/")
OUTPUT_PATH = os.path.join(BASE_DIR, "source/sequencing-data.csv")

HIC_URL = "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sequencing_data/data_hic_pre_release.index.csv"
ONT_URL = "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sequencing_data/data_ont_pre_release.index.csv"
DEEPCONSENSUS_URL = "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sequencing_data/data_deepconsensus_pre_release.index.csv"
PACBIO_HIFI_URL = "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sequencing_data/data_hifi_pre_release.index.csv"
KINNEX_URL = "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sequencing_data/data_kinnex_pre_release.index.csv"
METADATA_URLS = [HIC_URL, ONT_URL, DEEPCONSENSUS_URL, PACBIO_HIFI_URL]
BIOSAMPLES_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/refs/heads/main/data/sequencing-production/hprc-sequence-production.tsv"


def download_source_files(urls, output_folder_path):
    paths = []
    for url in urls:
        # Get the filename and the path where the output will be saved
        paths.append(download_file(url, output_folder_path))
    return paths


def join_samples(metadata_paths, kinnex_path, biosamples_table_path):
    # Generate each column across all provided sheets
    metadata_list = [
        pd.read_csv(path, sep=",", keep_default_na=False).drop_duplicates()
        for path in metadata_paths
    ]
    metadata_list.append(pd.read_csv(kinnex_path, sep=",", keep_default_na=False).drop_duplicates().rename(columns={"sample_id": "sample_ID", "library_id": "library_ID"}))
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
        right_on="ChildID",
        how="left",
        validate="many_to_one",
    )
    print("\nThe following biosamples did not have corresponding metadata:")
    print(
        ", ".join(
            all_metadata[~all_metadata["sample_ID"].isin(biosamples_table["ChildID"])][
                "sample_ID"
            ].unique()
        )
    )

    joined_with_size = joined.assign(file_size=get_file_sizes_from_uris(joined["path"], "sequencing data"))

    return joined_with_size


if __name__ == "__main__":
    metadata_files = download_source_files(METADATA_URLS, STORAGE_FOLDER_PATH)
    kinnex_file = download_source_files(
        [KINNEX_URL], STORAGE_FOLDER_PATH
    )[0]
    biosamples_table_file = download_source_files(
        [BIOSAMPLES_TABLE_URL], STORAGE_FOLDER_PATH
    )[0]
    joined = join_samples(metadata_files, kinnex_file, biosamples_table_file)
    joined.to_csv(OUTPUT_PATH, index=False)
    print("\nSequencing data processing complete!\n")
