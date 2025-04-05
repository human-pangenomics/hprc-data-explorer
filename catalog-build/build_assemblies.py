import os
import pandas as pd
import numpy as np
from build_help import download_file, get_file_sizes_from_uris

ASSEMBLY_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/assembly_index/Year1_assemblies_v2_genbank.index"
BIOSAMPLE_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sample/hprc_release2_sample_metadata.csv"
EXCLUDED_SAMPLE_IDS = ["CHM13_v1.1", "GRCh38_no_alt_analysis_set"]


# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "unprocessed_files")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "source/assemblies.csv")

HAPLOTYPES = ["maternal", "paternal"]
MATERNAL_HAPLOTYPE_ID = 0
PATERNAL_HAPLOTYPE_ID = 1
NA_HAPLOTYPE = "-"

def format_assemblies_df(data):
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
    combined_data = combined_data[~combined_data["sample"].isin(EXCLUDED_SAMPLE_IDS)]
    # Add haplotypes to the data
    def determine_haplotype(filename):
        if type(filename) is float and np.isnan(filename):
            return np.nan
        for haplotype in HAPLOTYPES:
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
    combined_data["haplotype"] = aws_haplotype.fillna(NA_HAPLOTYPE)
    # Output the sorted data
    outputData = combined_data.sort_values(
        ["sample", "haplotype"]
    ).reindex(
        columns=["sample", "haplotype", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    ).drop_duplicates(subset=["sample", "haplotype"], keep="first")
    return outputData

if __name__ == "__main__":
    # Download the files from Github
    assembly_path = download_file(ASSEMBLY_URL, DOWNLOADS_FOLDER_PATH)
    biosample_path = download_file(BIOSAMPLE_TABLE_URL, DOWNLOADS_FOLDER_PATH)

    # Get DataFrames from downloaded files
    assembly_df = pd.read_csv(assembly_path, sep="\t")
    biosample_df = pd.read_csv(biosample_path, sep=",")

    # Add haplotypes and merge all DataFrames
    assembly_df_with_haplotypes = format_assemblies_df(assembly_df)
    combined_df = assembly_df_with_haplotypes.merge(
        biosample_df, left_on="sample", right_on="sample_id", how="left", validate="many_to_one"
    ).drop(
        columns=["sample_id"]
    )
    print("The following sample IDs did not correspond to a value in the Biosample sheet, so NA values were entered:")
    print(", ".join(
        assembly_df_with_haplotypes.loc[~assembly_df_with_haplotypes["sample"].isin(biosample_df["sample_id"]), "sample"]
    ))
    output_df = combined_df.assign(file_size=get_file_sizes_from_uris(combined_df["aws_fasta"], "assembly"))
    output_df.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nAssembly processing complete!\n")
