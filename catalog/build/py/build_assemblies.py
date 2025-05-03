import os
from linkml_runtime import SchemaView
import pandas as pd
import numpy as np
from generated_schema.assemblies import Assembly, ReleaseOneAssembly
from build_help import columns_mapper, format_errors_by_file, download_file, validation_input_formatter, load_data_for_releases, get_file_sizes_from_uris

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/assemblies.csv")
ASSEMBLIES_SCHEMA_PATH = os.path.join(BASE_DIR, "../../schema/assemblies.yaml")

ASSEMBLIES_SCHEMAVIEW = SchemaView(ASSEMBLIES_SCHEMA_PATH)


RELEASE_SPECIFIC_DATA = [
    {
        "release": "1",
        "ASSEMBLIES": {
            "source": {
                "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/assembly_index/Year1_assemblies_v2_genbank.index",
                "sep": "\t",
                "read_options": {"dtype": str, "keep_default_na": False},
                "input_formatter": lambda df: format_release_1_assemblies_df(df),
                "mapper": columns_mapper(haplotype=lambda h: RELEASE_1_HAPLOTYPES_TO_IDS.get(h, h)),
                "columns": {
                    "sample": "sample_id",
                    "haplotype": "haplotype",
                    "aws_fasta": "assembly",
                    "fasta_sha256": "fasta_sha256"
                }
            },
            "contextual_input_formatter": validation_input_formatter(ReleaseOneAssembly, ASSEMBLIES_SCHEMAVIEW)
        }
    },
    {
        "release": "2",
        "ASSEMBLIES": {
            "url": "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/assemblies_pre_release_v0.6.1.index.csv",
            "sep": ",",
            "read_options": {"dtype": str, "keep_default_na": False},
            "contextual_input_formatter": validation_input_formatter(Assembly, ASSEMBLIES_SCHEMAVIEW)
        }
    }
]

BIOSAMPLE_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sample/hprc_release2_sample_metadata.csv"


RELEASE_1_EXCLUDED_SAMPLE_IDS = ["CHM13_v1.1", "GRCh38_no_alt_analysis_set"]
RELEASE_1_HAPLOTYPES_TO_IDS = {
    "maternal": 2,
    "paternal": 1
}
RELEASE_1_NA_HAPLOTYPE = "-"

def format_release_1_assemblies_df(data):
    # Check for duplicate keys
    if data["sample"].duplicated().any():
        raise RuntimeError("Duplicate keys are present in the annotation data.")
    # Split the data into two records per row
    hap1_data = data[["sample", "hap1_aws_fasta", "hap1_gcp_fasta", "hap1_fasta_sha256"]].copy()
    hap2_data = data[["sample", "hap2_aws_fasta", "hap2_gcp_fasta", "hap2_fasta_sha256"]].copy()
    # Rename the columns to remove the hap1_ and hap2_ prefixes
    hap1_data.columns = ["sample", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    hap2_data.columns = ["sample", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    # Combine the two dataframes
    combined_data = pd.concat([hap1_data, hap2_data], ignore_index=True)
    combined_data = combined_data[~combined_data["sample"].isin(RELEASE_1_EXCLUDED_SAMPLE_IDS)]
    # Add haplotypes to the data
    def determine_haplotype(filename):
        for haplotype in RELEASE_1_HAPLOTYPES_TO_IDS:
            if haplotype in filename:
                return haplotype
        print(f"WARN: no haplotype found for {filename}")
        return np.nan
    aws_haplotype = combined_data["aws_fasta"].map(determine_haplotype)
    gcp_haplotype = combined_data["gcp_fasta"].map(determine_haplotype)
    if (aws_haplotype != gcp_haplotype).any():
        #TODO: test this
        disagreement_filenames = combined_data.loc[
            (aws_haplotype != gcp_haplotype) & ~aws_haplotype.isna() & ~gcp_haplotype.isna(), "sample"
        ]
        raise RuntimeError(
            f"Haplotypes disagree between AWS and GCP filenames for the following entries. Are the files for these sample IDs correct? {','.join(disagreement_filenames)}"
        )
    combined_data["haplotype"] = aws_haplotype.fillna(RELEASE_1_NA_HAPLOTYPE)
    # Output the sorted data
    outputData = combined_data.sort_values(
        ["sample", "haplotype"]
    ).reindex(
        columns=["sample", "haplotype", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    ).drop_duplicates(subset=["sample", "haplotype"], keep="first")
    return outputData

if __name__ == "__main__":
    # Download the files from Github and load them as dataframes
    biosample_path = download_file(BIOSAMPLE_TABLE_URL, DOWNLOADS_FOLDER_PATH)
    biosample_df = pd.read_csv(biosample_path, sep=",")
    loaded_dfs, load_metadata = load_data_for_releases(RELEASE_SPECIFIC_DATA, DOWNLOADS_FOLDER_PATH)
    assembly_df = loaded_dfs["ASSEMBLIES"]
    validation_errors = {file_name: errors for file_name, errors in load_metadata["ASSEMBLIES"].values() if errors}

    if validation_errors:
        print(f"\nValidation errors:\n\n{format_errors_by_file(validation_errors)}")
        print(f"\nFound errors in {len(validation_errors)} source files\n")

    # Merge all DataFrames
    combined_df = assembly_df.merge(
        biosample_df, on="sample_id", how="left", validate="many_to_one"
    )
    print("The following sample IDs did not correspond to a value in the Biosample sheet, so NA values were entered:")
    print(", ".join(
        assembly_df.loc[~assembly_df["sample_id"].isin(biosample_df["sample_id"]), "sample_id"]
    ))
    output_df = combined_df.assign(file_size=get_file_sizes_from_uris(combined_df["assembly"], "assembly"))
    output_df.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nAssembly processing complete!\n")
