import os
import pandas as pd
import numpy as np
from buildHelp import downloadFile

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
STORAGE_FOLDER_PATH = os.path.join(BASE_DIR, "unprocessed_files/")
OUTPUT_PATH = os.path.join(BASE_DIR, "source/sequencing-data.csv")
FIELDS_CSV_PATH = os.path.join(BASE_DIR, "source/fields.csv")

HIC_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/hprc-data-explorer-tables/HPRC_HiC.tsv"
ONT_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/hprc-data-explorer-tables/HPRC_ONT.tsv"
PACBIO_HIFI_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/hprc-data-explorer-tables/HPRC_PacBio_HiFi.tsv"
# DEEPCONSENSUS_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/sample-files/hprc_metadata_sample_files_DEEPCONSENSUS.tsv"
# HIFI_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/sample-files/hprc_metadata_sample_files_HiFi.tsv"
# ONT_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/sample-files/hprc_metadata_sample_files_ONT.tsv"
METADATA_URLS = [HIC_URL, ONT_URL, PACBIO_HIFI_URL]
BIOSAMPLES_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/production/hprc-production-biosample-table.tsv"


def downloadSourceFiles(urls, outputFolderPath):
    paths = []
    for url in urls:
        # Get the filename and the path where the output will be saved
        paths.append(downloadFile(url, outputFolderPath))
    return paths


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
    print("The following biosamples did not have corresponding metadata:")
    print(
        ", ".join(
            allMetadata[~allMetadata["sample_ID"].isin(biosamplesTable["Sample"])][
                "sample_ID"
            ].unique()
        )
    )
    return joined


if __name__ == "__main__":
    metadataFiles = downloadSourceFiles(METADATA_URLS, STORAGE_FOLDER_PATH)
    biosamplesTableFile = downloadSourceFiles(
        [BIOSAMPLES_TABLE_URL], STORAGE_FOLDER_PATH
    )[0]
    joined = joinSamples(metadataFiles, biosamplesTableFile)
    joined.to_csv(OUTPUT_PATH, index=False)

    # Read columns from each file
    hic_columns = set(pd.read_csv(HIC_URL, sep="\t", keep_default_na=False).columns)
    ont_columns = set(pd.read_csv(ONT_URL, sep="\t", keep_default_na=False).columns)
    pacbio_hifi_columns = set(
        pd.read_csv(PACBIO_HIFI_URL, sep="\t", keep_default_na=False).columns
    )

    # Calculate common columns across all input files
    common_columns = hic_columns & ont_columns & pacbio_hifi_columns

    # Calculate unique columns for each file
    unique_hic_columns = hic_columns - ont_columns - pacbio_hifi_columns
    unique_ont_columns = ont_columns - hic_columns - pacbio_hifi_columns
    unique_pacbio_hifi_columns = pacbio_hifi_columns - hic_columns - ont_columns

    # Calculate columns that are in two but not all three files
    in_two_files_columns = (
        (hic_columns & ont_columns)
        | (hic_columns & pacbio_hifi_columns)
        | (ont_columns & pacbio_hifi_columns)
    )
    in_two_files_columns -= common_columns

    print("")
    print("")
    print("**************************************")
    print("**************************************")
    print("**************************************")
    print("")
    print("")

    # Read columns from each file
    hic_columns = set(pd.read_csv(HIC_URL, sep="\t", keep_default_na=False).columns)
    ont_columns = set(pd.read_csv(ONT_URL, sep="\t", keep_default_na=False).columns)
    pacbio_hifi_columns = set(
        pd.read_csv(PACBIO_HIFI_URL, sep="\t", keep_default_na=False).columns
    )

    # Calculate all unique columns across all files
    all_columns = sorted(hic_columns | ont_columns | pacbio_hifi_columns)

    # Create a DataFrame to store the presence of each column in each file
    df = pd.DataFrame(
        index=all_columns,
        columns=["HPRC_HiC.tsv", "HPRC_ONT.tsv", "HPRC_PacBio_HiFi.tsv"],
    )
    df.index.name = "Field"

    # Mark presence of columns in each file
    for column in all_columns:
        if column in hic_columns:
            df.at[column, "HPRC_HiC.tsv"] = "x"
        if column in ont_columns:
            df.at[column, "HPRC_ONT.tsv"] = "x"
        if column in pacbio_hifi_columns:
            df.at[column, "HPRC_PacBio_HiFi.tsv"] = "x"

    # Fill NaN values with empty strings
    df = df.fillna("")

    # Add a column to count the number of files that have each field
    df["Count"] = df.apply(lambda row: row.str.count("x").sum(), axis=1)

    # Sort the DataFrame by the count (descending) and then by the field name (alphabetically)
    df = df.sort_values(by=["Count", "Field"], ascending=[False, True])

    # Drop the count column
    df = df.drop(columns=["Count"])

    # Save the DataFrame to a CSV file
    df.to_csv(FIELDS_CSV_PATH)

    # Print out common columns across all input files
    common_columns = hic_columns & ont_columns & pacbio_hifi_columns
    print("Common columns across all input files:")
    for column in sorted(common_columns):
        print(column)

    # Print out columns specific to the HPRC_HiC.tsv file
    unique_hic_columns = hic_columns - ont_columns - pacbio_hifi_columns
    print("\nColumns specific to HPRC_HiC.tsv:")
    for column in sorted(unique_hic_columns):
        print(column)

    # Print out columns specific to the HPRC_PacBio_HiFi.tsv file
    unique_pacbio_hifi_columns = pacbio_hifi_columns - hic_columns - ont_columns
    print("\nColumns specific to HPRC_PacBio_HiFi.tsv:")
    for column in sorted(unique_pacbio_hifi_columns):
        print(column)

    # Print out columns specific to the HPRC_ONT.tsv file
    unique_ont_columns = ont_columns - hic_columns - pacbio_hifi_columns
    print("\nColumns specific to HPRC_ONT.tsv:")
    for column in sorted(unique_ont_columns):
        print(column)

    # Print out columns that are in two but not all three files
    in_two_files_columns = (
        (hic_columns & ont_columns)
        | (hic_columns & pacbio_hifi_columns)
        | (ont_columns & pacbio_hifi_columns)
    )
    in_two_files_columns -= common_columns
    print("\nColumns in two but not all three files:")
    for column in sorted(in_two_files_columns):
        files_containing_column = []
        if column in hic_columns:
            files_containing_column.append("HPRC_HiC.tsv")
        if column in ont_columns:
            files_containing_column.append("HPRC_ONT.tsv")
        if column in pacbio_hifi_columns:
            files_containing_column.append("HPRC_PacBio_HiFi.tsv")
        print(f"{column}: {', '.join(files_containing_column)}")
