import os
from functools import partial
import pandas as pd
import numpy as np
from build_help import columns_mapper, load_data_for_releases, get_file_sizes_from_uris

RELEASE_1_CAT_ANNOTATION_TYPES = {"chm13": "CAT_genes_chm13", "hg38": "CAT_genes_hg38"}
RELEASE_1_FLAGGER_ANNOTATION_TYPES = {
    "unreliable_only_no_MT_file_location": "flagger_unreliable_only_no_MT_file_location",
    "unreliable_only_file_location": "flagger_unreliable_only_file_location",
    "all_file_location": "flagger_all_file_location"
}
RELEASE_1_HAPLOTYPES_TO_IDS = {
    "maternal": 2,
    "paternal": 1
}

# Base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/annotations.csv")


def r1_type_formatter(type):
    return type_formatter(type, "file_location")

def type_formatter(type, location_column="location"):
    return lambda df: get_type_df(df, type, location_column)

def normalize_haplotype(hap):
    return "1" if hap == "hap1" else "2" if hap == "hap2" else hap

RELEASE_SPECIFIC_DATA = [
    {
        "release": "1",
        "ANNOTATIONS": {
            "sep": "\t",
            "source": [
                { "input_formatter": r1_type_formatter("ASat"), "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_ASat.index" },
                { "input_formatter": r1_type_formatter("DNA_BRNN"), "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_DNA_BRNN.index" },
                { "input_formatter": r1_type_formatter("HSat"), "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_HSat.index" },
                { "input_formatter": r1_type_formatter("Repeat_masker"), "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Repeat_Masker.index" },
                { "input_formatter": r1_type_formatter("Seg_Dups"), "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Seg_Dups.index" },
                { "input_formatter": r1_type_formatter("TRF"), "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_TRF.index" },
                {
                    "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_CAT_genes.index",
                    "input_formatter":
                        lambda df: pd.concat(
                            get_type_df(df[df["reference"] == ref_type], type, "file_location") for ref_type, type in RELEASE_1_CAT_ANNOTATION_TYPES.items()
                        )
                },
                {
                    "url": "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Flagger.index",
                    "input_formatter": lambda df: pd.concat(get_type_dfs(df, RELEASE_1_FLAGGER_ANNOTATION_TYPES, "file_location"))
                }
            ],
            "mapper": columns_mapper(haplotype=lambda h: RELEASE_1_HAPLOTYPES_TO_IDS.get(h, h)),
            "columns": {
                "sample": "sample_id",
                "haplotype": "haplotype",
                "file_location": "location",
                "annotation_type": "annotation_type"
            }
        }
    },
    {
        "release": "2",
        "ANNOTATIONS": {
            "sep": ",",
            "source": [
                { "input_formatter": type_formatter("liftoff"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/liftoff/liftoff_pre_release_v0.3.index.csv" },
                { "input_formatter": type_formatter("ChromAlias"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/chrom_assignment/chrom_alias_pre_release_v0.1.index.csv" },
                {
                    "input_formatter": type_formatter("CenSat"),
                    "source": {
                        "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/censat/censat_pre_release_v0.3.index.csv",
                        "input_formatter": columns_mapper(haplotype=normalize_haplotype)
                    }
                },
                { "input_formatter": type_formatter("Flagger_HiFi"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/assembly_qc/flagger/flagger_hifi_v0.1.csv" },
                { "input_formatter": type_formatter("Flagger_ONT"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/assembly_qc/flagger/flagger_ont_v0.1.csv" },
                {
                    "input_formatter": type_formatter("Repeat_masker"),
                    "source": {
                        "source": {
                            "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/repeat_masker/repeat_masker_bed_pre_release_v0.2.index.csv",
                            "columns": {
                                "sample_id": "sample_id",
                                "hap": "haplotype",
                                "s3_loc": "location"
                            }
                        },
                        "input_formatter": columns_mapper(haplotype=normalize_haplotype)
                    }
                }
            ]
        }
    }
]


def get_type_df(source_df, type, target_location_column, location_column=None, all_location_columns=[]):
    if location_column is None:
        location_column = target_location_column
    other_location_columns = [c for c in all_location_columns if c != location_column]
    return source_df.drop(columns=other_location_columns).rename(columns={location_column: target_location_column}).assign(annotation_type=pd.Series(type, index=source_df.index))

def get_type_dfs(source_df, types_by_column, target_location_column):
    return [get_type_df(source_df, type, target_location_column, location_column, types_by_column.keys()) for location_column, type in types_by_column.items()]

if __name__ == "__main__":
    annotations_df = load_data_for_releases(RELEASE_SPECIFIC_DATA, DOWNLOADS_FOLDER_PATH)["ANNOTATIONS"]
    output_df = annotations_df.assign(file_size=get_file_sizes_from_uris(annotations_df["location"], "annotation"))
    output_df.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nAnnotation processing complete!\n")
