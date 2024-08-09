import pandas as pd
import numpy as np
import requests
from pathlib import Path
from urllib.parse import urlparse

STORAGE_FOLDER_PATH = "./files/unprocessed_files/"
OUTPUT_PATH = "./files/out/raw_sequencing_data.tsv"
DEEPCONSENSUS_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/sample-files/hprc_metadata_sample_files_DEEPCONSENSUS.tsv"
HIFI_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/sample-files/hprc_metadata_sample_files_HiFi.tsv"
ONT_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/sample-files/hprc_metadata_sample_files_ONT.tsv"
METADATA_URLS = [DEEPCONSENSUS_URL, HIFI_URL, ONT_URL]
BIOSAMPLES_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/production/hprc-production-biosample-table.tsv"

def downloadSourceFiles(urls, outputFolderPath):
    paths = []
    for url in urls:
        # Get the filename and the path where the output will be saved
        filename = Path(urlparse(url).path).name
        outputPath = Path(outputFolderPath, filename)
        # Download the text associated with each of the provided urls
        with requests.get(url) as r:
            if r.status_code != 200:
                raise RuntimeError(f"{url} caused error {r.status_code}. See details below:\n {r.text}")
            with open(outputPath.resolve(), "w") as f:
                f.write(r.text)
            paths.append(outputPath)
    return paths

def joinSamples(metadataPaths, biosamplesTablePath):
    # Generate each column across all provided sheets
    metadataList = [pd.read_csv(path, sep="\t") for path in metadataPaths]
    metadataColumns = np.unique([df.columns for df in metadataList])
    # Concatenate all the provided metadata sheets
    allMetadata = pd.concat(
        metadataList,
        axis=0,
        ignore_index=True
    ).reindex(columns=metadataColumns).fillna("N/A")
    # Join the concatenated sheets with the table
    biosamplesTable = pd.read_csv(biosamplesTablePath, sep="\t")
    joined = allMetadata.merge(
        biosamplesTable,
        left_on='sample_ID',
        right_on='Sample',
        how='left',
        validate="many_to_one"
    )
    print("The following biosamples did not have corresponding metadata:")
    print(", ".join(allMetadata[~allMetadata["sample_ID"].isin(biosamplesTable["Sample"])]["sample_ID"].unique()))
    return joined

if __name__ == "__main__":
    metadataFiles = downloadSourceFiles(METADATA_URLS, STORAGE_FOLDER_PATH)
    biosamplesTableFile = downloadSourceFiles([BIOSAMPLES_TABLE_URL], STORAGE_FOLDER_PATH)[0]
    joined = joinSamples(metadataFiles, biosamplesTableFile)
    joined.to_csv(OUTPUT_PATH, sep="\t", index=False)