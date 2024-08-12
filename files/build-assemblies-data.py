import pandas as pd
import numpy as np
from buildHelp import downloadFile

ASSEMBLY_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/assembly_index/Year1_assemblies_v2_genbank.index"
QC_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/automated_qc_results/Y1_assemblies_v2_genbank_QC.csv"
CAT_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_CAT_genes.index"
BIOSAMPLE_TABLE_URL = "https://raw.githubusercontent.com/human-pangenomics/HPRC_metadata/main/data/production/hprc-production-biosample-table.tsv"
FLAGGER_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Flagger.index"
ANNOTATION_URLS = {
    "ASat-annotation-file": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_ASat.index",
    "DNA_BRNN_annotation_file": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_DNA_BRNN.index",
    "HSat_annotation_file": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_HSat.index",
    "Repeat_masker_annotation_file": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Repeat_Masker.index",
    "Seg_Dups_annotation_file": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Seg_Dups.index",
    "TRF_annotation_file": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_TRF.index",
}
EXCLUDED_SAMPLE_IDS = ["CHM13_v1.1", "GRCh38_no_alt_analysis_set"]

DOWNLOADS_FOLDER_PATH = "./files/unprocessed_files"
OUTPUT_FILE_PATH = "./files/source/assemblies.csv"

CHM13 = "chm13"
HG38 = "hg38"
CAT_COLUMN_NAMES = {CHM13: "CAT_genes_chm13_annotation_file", HG38: "CAT_genes_hg38_annotation_file"}
FLAGGER_COLUMN_NAMES = {
    "unreliable_only_no_MT_file_location": "Flagger_annotation_file_unreliable_only_no_MT_file_location",
    "unreliable_only_file_location": "Flagger_annotation_file_unreliable_only_file_location",
    "all_file_location": "Flagger_annotation_file_all_file_location"
}

HAPLOTYPES = ["maternal", "paternal"]
MATERNAL_HAPLOTYPE_ID = 0
PATERNAL_HAPLOTYPE_ID = 1
NA_HAPLOTYPE = "-"

def formatAssembliesDf(data):
    # Check for duplicate keys
    if data["sample"].duplicated().any():
        raise RuntimeError("Duplicate keys are present in the annotation data.")
    # Split the data into two records per row
    hap1Data = data[["sample", "hap1_aws_fasta", "hap1_gcp_fasta", "hap1_fasta_sha256"]].copy()
    hap2Data = data[["sample", "hap2_aws_fasta", "hap2_gcp_fasta", "hap2_fasta_sha256"]].copy()
    # Rename the columns to remove the hap1_ and hap2_ prefixes
    hap1Data.columns = ["sample", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    hap2Data.columns = ["sample", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    # Combine the two dataframes
    combinedData = pd.concat([hap1Data, hap2Data], ignore_index=True)
    combinedData = combinedData[~combinedData["sample"].isin(EXCLUDED_SAMPLE_IDS)]
    # Add haplotypes to the data
    def determineHaplotype(filename):
        if type(filename) is float and np.isnan(filename):
            return np.nan
        for haplotype in HAPLOTYPES:
            if haplotype in filename:
                return haplotype
        print(f"WARN: no haplotype found for {filename}")
        return np.nan
    awsHaplotype = combinedData["aws_fasta"].map(determineHaplotype)
    gcpHaplotype = combinedData["gcp_fasta"].map(determineHaplotype)
    if (awsHaplotype != gcpHaplotype).any():
        #TODO: test this
        disagreementFilenames = combinedData.loc[
            (awsHaplotype != gcpHaplotype) & ~awsHaplotype.isna() & ~gcpHaplotype.isna(), "sample"
        ]
        raise RuntimeError(
            f"Haplotypes disagree between AWS and GCP filenames for the following entries. Are the files for these sample IDs correct? {','.join(disagreementFilenames)}"
        )
    combinedData["haplotype"] = awsHaplotype.fillna(NA_HAPLOTYPE)
    # Output the sorted data
    outputData = combinedData.sort_values(
        ["sample", "haplotype"]
    ).reindex(
        columns=["sample", "haplotype", "aws_fasta", "gcp_fasta", "fasta_sha256"]
    ).drop_duplicates(subset=["sample", "haplotype"], keep="first")
    return outputData

def joinOneRowFiles(baseDf, columnDfPairs, originalColumn, joinColumns):
    joinedDf = baseDf.copy()
    for column in columnDfPairs:
        # Merge each entry of columnDfPairs into baseDf
        newDf = columnDfPairs[column].copy().rename(columns={originalColumn: column})
        joinedDf = joinedDf.merge(
            newDf[joinColumns + [column]], on=joinColumns, how="left", validate="one_to_one"
        )
    return joinedDf

def processQcDf(qcDf):
    # Split the qcDf into two based on maternal / paternal
    matQcDf = qcDf.filter(regex="^genbank_qc_sample_id_id|(^mat_)").copy()
    patQcDf = qcDf.filter(regex="^genbank_qc_sample_id_id|(^pat_)").copy()
    matQcDf["haplotype"] = HAPLOTYPES[MATERNAL_HAPLOTYPE_ID]
    patQcDf["haplotype"] = HAPLOTYPES[PATERNAL_HAPLOTYPE_ID]
    patQcDf.columns = patQcDf.columns.str.replace('^pat_', '', regex=True)
    matQcDf.columns = matQcDf.columns.str.replace('^mat_', '', regex=True)
    # Concatenate the two DFs so that each entry corresponds to a different sample and haplotype
    return pd.concat([matQcDf, patQcDf]).rename(columns={"genbank_qc_sample_id_id": "sample"})

if __name__ == "__main__":
    # Download the files from Github
    assemblyPath = downloadFile(ASSEMBLY_URL, DOWNLOADS_FOLDER_PATH)
    biosamplePath = downloadFile(BIOSAMPLE_TABLE_URL, DOWNLOADS_FOLDER_PATH)
    catPath = downloadFile(CAT_URL, DOWNLOADS_FOLDER_PATH)
    qcPath = downloadFile(QC_URL, DOWNLOADS_FOLDER_PATH)
    flaggerPath = downloadFile(FLAGGER_URL, DOWNLOADS_FOLDER_PATH)
    annotationPaths = {
        column: downloadFile(ANNOTATION_URLS[column], DOWNLOADS_FOLDER_PATH) for column in ANNOTATION_URLS
    }

    # Get DataFrames from downloaded files
    assemblyDf = pd.read_csv(assemblyPath, sep="\t")
    biosampleDf = pd.read_csv(biosamplePath, sep="\t")
    catDf = pd.read_csv(catPath, sep="\t")
    flaggerDf = pd.read_csv(flaggerPath, sep="\t").rename(columns=FLAGGER_COLUMN_NAMES)
    qcDf = pd.read_csv(qcPath)
    annotationDfs = {
        column: pd.read_csv(annotationPaths[column], sep="\t") for column in annotationPaths
    }

    # Add haplotypes and merge all DataFrames
    assemblyDfWithHaplotypes = formatAssembliesDf(assemblyDf)
    chm13Df = catDf[catDf["reference"] == CHM13].copy().rename(
                columns={"file_location": CAT_COLUMN_NAMES[CHM13]}
            )
    hg38Df = catDf[catDf["reference"] == HG38].copy().rename(
        columns={"file_location": CAT_COLUMN_NAMES[HG38]}
    )
    annotationDfs[CAT_COLUMN_NAMES[CHM13]] = chm13Df
    annotationDfs[CAT_COLUMN_NAMES[HG38]] = hg38Df
    combinedDf = assemblyDfWithHaplotypes.merge(
        biosampleDf, left_on="sample", right_on="Sample", how="left", validate="many_to_one"
    ).drop(
        columns=["Sample"]
    ).merge(
        flaggerDf, how="left", on="sample", validate="many_to_one"
    )
    print("The following sample IDs did not correspond to a value in the Biosample sheet, so NA values were entered:")
    print(", ".join(
        assemblyDfWithHaplotypes.loc[~assemblyDfWithHaplotypes["sample"].isin(biosampleDf["Sample"]), "sample"]
    ))
    # Merge the DF with the annotation files
    annotationJoinedDf = joinOneRowFiles(combinedDf, annotationDfs, "file_location", ["sample", "haplotype"])
    # Add the QC DataFrame
    qcDfJoinedWithHaplotype = processQcDf(qcDf)
    outputDf = annotationJoinedDf.merge(
        qcDfJoinedWithHaplotype,
        on=["sample", "haplotype"],
        how="left",
        validate="one_to_one"
    )
    outputDf.to_csv(OUTPUT_FILE_PATH, index=False)
    print("Done!")
