import os
import pandas as pd
import numpy as np
import requests
import sys
from buildHelp import downloadFile

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


def downloadSourceFiles(urls, outputFolderPath):
    paths = []
    for url in urls:
        # Get the filename and the path where the output will be saved
        paths.append(downloadFile(url, outputFolderPath))
    return paths


def get_file_size(url, total_files, current_index):
    """
    Convert S3 URL to HTTPS if necessary and fetch file size using HEAD request.
    Show progress by printing remaining files to process.
    """
    try:
        # Convert S3 to HTTPS URL
        if url.startswith("s3://"):
            bucket_and_key = url[5:]  # Remove 's3://'
            url = (
                f"https://{bucket_and_key.split('/')[0]}.s3.amazonaws.com/"
                + "/".join(bucket_and_key.split("/")[1:])
            )

        # Make HEAD request to get file size
        response = requests.head(url, timeout=10)
        if response.status_code == 200 and "Content-Length" in response.headers:
            return int(response.headers["Content-Length"])
        else:
            return "N/A"
    except Exception:
        return "N/A"
    finally:
        # Update progress
        remaining_files = total_files - current_index - 1
        sys.stdout.write(f"\rRemaining files to process: {remaining_files}")
        sys.stdout.flush()


def joinSamples(metadataPaths, biosamplesTablePath):
    # Generate each column across all provided sheets
    metadataList = [
        pd.read_csv(path, sep="\t", keep_default_na=False).drop_duplicates()
        for path in metadataPaths
    ]
    metadataColumns = np.unique([col for df in metadataList for col in df.columns])
    # Concatenate all the provided metadata sheets
    allMetadata = (
        pd.concat(metadataList, axis=0, ignore_index=True)
        .reindex(columns=metadataColumns)
        .fillna("N/A")
    )
    # Join the concatenated sheets with the table
    biosamplesTable = pd.read_csv(biosamplesTablePath, sep="\t")
    joined = allMetadata.merge(
        biosamplesTable,
        left_on="sample_ID",
        right_on="Sample",
        how="left",
        validate="many_to_one",
    )
    print("\nThe following biosamples did not have corresponding metadata:")
    print(
        ", ".join(
            allMetadata[~allMetadata["sample_ID"].isin(biosamplesTable["Sample"])][
                "sample_ID"
            ].unique()
        )
    )

    # Add 'file_size' column by calculating size for 'path' column
    if "path" in joined.columns:
        total_files = len(joined["path"])
        joined["file_size"] = [
            get_file_size(url, total_files, index)
            for index, url in enumerate(joined["path"])
        ]
    else:
        joined["file_size"] = "N/A"

    return joined


if __name__ == "__main__":
    metadataFiles = downloadSourceFiles(METADATA_URLS, STORAGE_FOLDER_PATH)
    biosamplesTableFile = downloadSourceFiles(
        [BIOSAMPLES_TABLE_URL], STORAGE_FOLDER_PATH
    )[0]
    joined = joinSamples(metadataFiles, biosamplesTableFile)
    joined.to_csv(OUTPUT_PATH, index=False)
    print("\nProcessing complete!")
