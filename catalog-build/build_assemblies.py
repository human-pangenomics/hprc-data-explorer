import os
import pandas as pd
import numpy as np
from build_help import download_file

ASSEMBLY_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/assembly_index/Year1_assemblies_v2_genbank.index"
QC_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/automated_qc_results/Y1_assemblies_v2_genbank_QC.csv"
BIOSAMPLE_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/production/hprc-production-biosample-table.tsv"
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

def process_qc_df(qcDf):
    # Split the qcDf into two based on maternal / paternal
    mat_qc_df = qcDf.filter(regex="^genbank_qc_sample_id_id|(^mat_)").copy()
    pat_qc_df = qcDf.filter(regex="^genbank_qc_sample_id_id|(^pat_)").copy()
    mat_qc_df["haplotype"] = HAPLOTYPES[MATERNAL_HAPLOTYPE_ID]
    pat_qc_df["haplotype"] = HAPLOTYPES[PATERNAL_HAPLOTYPE_ID]
    pat_qc_df.columns = pat_qc_df.columns.str.replace('^pat_', '', regex=True)
    mat_qc_df.columns = mat_qc_df.columns.str.replace('^mat_', '', regex=True)
    # Concatenate the two DFs so that each entry corresponds to a different sample and haplotype
    return pd.concat([mat_qc_df, pat_qc_df]).rename(columns={"genbank_qc_sample_id_id": "sample"})

if __name__ == "__main__":
    # Download the files from Github
    assembly_path = download_file(ASSEMBLY_URL, DOWNLOADS_FOLDER_PATH)
    biosample_path = download_file(BIOSAMPLE_TABLE_URL, DOWNLOADS_FOLDER_PATH)
    qc_path = download_file(QC_URL, DOWNLOADS_FOLDER_PATH)

    # Get DataFrames from downloaded files
    assembly_df = pd.read_csv(assembly_path, sep="\t")
    biosample_df = pd.read_csv(biosample_path, sep="\t")
    qc_df = pd.read_csv(qc_path)

    # Add haplotypes and merge all DataFrames
    assembly_df_with_haplotypes = format_assemblies_df(assembly_df)
    combined_df = assembly_df_with_haplotypes.merge(
        biosample_df, left_on="sample", right_on="Sample", how="left", validate="many_to_one"
    ).drop(
        columns=["Sample"]
    )
    print("The following sample IDs did not correspond to a value in the Biosample sheet, so NA values were entered:")
    print(", ".join(
        assembly_df_with_haplotypes.loc[~assembly_df_with_haplotypes["sample"].isin(biosample_df["Sample"]), "sample"]
    ))
    # Add the QC DataFrame
    qc_df_joined_with_haplotype = process_qc_df(qc_df)
    output_df = combined_df.merge(
        qc_df_joined_with_haplotype,
        on=["sample", "haplotype"],
        how="left",
        validate="one_to_one"
    )
    output_df.to_csv(OUTPUT_FILE_PATH, index=False)
    print("Done!")
