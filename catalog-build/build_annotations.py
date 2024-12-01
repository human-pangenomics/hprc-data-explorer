import os
import pandas as pd
import numpy as np
from build_help import downloadFile

CAT_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_CAT_genes.index"
FLAGGER_URL = "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Flagger.index"
ANNOTATION_URLS = {
    "ASat": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_ASat.index",
    "DNA_BRNN": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_DNA_BRNN.index",
    "HSat": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_HSat.index",
    "Repeat_masker": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Repeat_Masker.index",
    "Seg_Dups": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Seg_Dups.index",
    "TRF": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_TRF.index",
}

# Base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "unprocessed_files")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "source/annotations.csv")


CHM13 = "chm13"
HG38 = "hg38"
CAT_ANNOTATION_TYPES = {CHM13: "CAT_genes_chm13", HG38: "CAT_genes_hg38"}
FLAGGER_ANNOTATION_TYPES = {
    "unreliable_only_no_MT_file_location": "flagger_unreliable_only_no_MT_file_location",
    "unreliable_only_file_location": "flagger_unreliable_only_file_location",
    "all_file_location": "flagger_all_file_location"
}

def getTypeDf(sourceDf, type, locationColumn, allLocationColumns=[]):
    otherLocationColumns = [c for c in allLocationColumns if c != locationColumn]
    return sourceDf.drop(columns=otherLocationColumns).rename(columns={locationColumn: "file_location"}).assign(annotation_type=pd.Series(type, index=sourceDf.index))

def getTypeDfs(sourceDf, typesByColumn):
    return [getTypeDf(sourceDf, type, locationColumn, typesByColumn.keys()) for locationColumn, type in typesByColumn.items()]

if __name__ == "__main__":
    # Download the files from Github
    catPath = downloadFile(CAT_URL, DOWNLOADS_FOLDER_PATH)
    flaggerPath = downloadFile(FLAGGER_URL, DOWNLOADS_FOLDER_PATH)
    annotationPaths = {
        type: downloadFile(ANNOTATION_URLS[type], DOWNLOADS_FOLDER_PATH) for type in ANNOTATION_URLS
    }

    # Get DataFrames from downloaded files
    catDf = pd.read_csv(catPath, sep="\t")
    flaggerDf = pd.read_csv(flaggerPath, sep="\t")
    annotationDfs = {
        column: pd.read_csv(annotationPaths[column], sep="\t") for column in annotationPaths
    }

    annotationDfs[CAT_ANNOTATION_TYPES[CHM13]] = catDf[catDf["reference"] == CHM13]
    annotationDfs[CAT_ANNOTATION_TYPES[HG38]] = catDf[catDf["reference"] == HG38]

    # Concatenate the annotation files
    outputDf = pd.concat([
        *[getTypeDf(df, type, "file_location") for type, df in annotationDfs.items()],
        *getTypeDfs(flaggerDf, FLAGGER_ANNOTATION_TYPES)
    ]).fillna({"reference": "N/A"})
    outputDf.to_csv(OUTPUT_FILE_PATH, index=False)
    print("Done!")
