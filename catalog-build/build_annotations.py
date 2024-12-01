import os
import pandas as pd
import numpy as np
from build_help import download_file, get_file_sizes_from_uris

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

def get_type_df(source_df, type, location_column, all_location_columns=[]):
    other_location_columns = [c for c in all_location_columns if c != location_column]
    return source_df.drop(columns=other_location_columns).rename(columns={location_column: "file_location"}).assign(annotation_type=pd.Series(type, index=source_df.index))

def get_type_dfs(source_df, types_by_column):
    return [get_type_df(source_df, type, location_column, types_by_column.keys()) for location_column, type in types_by_column.items()]

if __name__ == "__main__":
    # Download the files from Github
    cat_path = download_file(CAT_URL, DOWNLOADS_FOLDER_PATH)
    flagger_path = download_file(FLAGGER_URL, DOWNLOADS_FOLDER_PATH)
    annotation_paths = {
        type: download_file(ANNOTATION_URLS[type], DOWNLOADS_FOLDER_PATH) for type in ANNOTATION_URLS
    }

    # Get DataFrames from downloaded files
    cat_df = pd.read_csv(cat_path, sep="\t")
    flagger_df = pd.read_csv(flagger_path, sep="\t")
    annotation_dfs = {
        column: pd.read_csv(annotation_paths[column], sep="\t") for column in annotation_paths
    }

    annotation_dfs[CAT_ANNOTATION_TYPES[CHM13]] = cat_df[cat_df["reference"] == CHM13]
    annotation_dfs[CAT_ANNOTATION_TYPES[HG38]] = cat_df[cat_df["reference"] == HG38]

    # Concatenate the annotation files
    combined_annotations_df = pd.concat([
        *[get_type_df(df, type, "file_location") for type, df in annotation_dfs.items()],
        *get_type_dfs(flagger_df, FLAGGER_ANNOTATION_TYPES)
    ]).fillna({"reference": "N/A"})
    output_df = combined_annotations_df.assign(file_size=get_file_sizes_from_uris(combined_annotations_df["file_location"], "annotation"))
    output_df.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nAnnotation processing complete!\n")
