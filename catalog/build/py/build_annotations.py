import os
from functools import partial
from linkml_runtime import SchemaView
import pandas as pd
import numpy as np
from generated_schema.annotations import Annotation, ReleaseOneAnnotation, ReleaseOneFlaggerAnnotation
from build_help import columns_mapper, format_errors_by_file, load_data_for_releases, get_file_sizes_from_uris, validation_input_formatter

RELEASE_1_CAT_ANNOTATION_TYPES = {"chm13": "CAT_genes_chm13", "hg38": "CAT_genes_hg38"}
RELEASE_1_FLAGGER_ANNOTATION_TYPES = {
    "unreliable_only_no_MT_file_location": "flagger_unreliable_only_no_MT_file_location",
    "unreliable_only_file_location": "flagger_unreliable_only_file_location",
    "all_file_location": "flagger_all_file_location"
}
RELEASE_1_HAPLOTYPES_TO_IDS = {
    "maternal": 2,
    "paternal": 1,
    "-": ""
}

# Base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/annotations.csv")
ANNOTATIONS_SCHEMA_PATH = os.path.join(BASE_DIR, "../../schema/annotations.yaml")

ANNOTATIONS_SCHEMAVIEW = SchemaView(ANNOTATIONS_SCHEMA_PATH)


def type_formatter(type, model=Annotation):
    return validation_input_formatter(model, ANNOTATIONS_SCHEMAVIEW, lambda df: get_type_df(df, type))

def r1_source_spec(annotation_type_source, url, no_haplotype=False, model=ReleaseOneAnnotation):
    update_spec = {
        **({} if no_haplotype else {"mapper": columns_mapper(haplotype=lambda h: RELEASE_1_HAPLOTYPES_TO_IDS.get(h, h))}),
        "columns": {
            "sample": "sample_id",
            **({} if no_haplotype else {"haplotype": "haplotype"}),
            "file_location": "location"
        }
    }
    if isinstance(annotation_type_source, str):
        return {
            "source": {
                "source": {
                    "url": url,
                    **update_spec
                },
                "contextual_input_formatter": type_formatter(annotation_type_source, model)
            },
            "contextual_input_formatter": lambda df, file_errors, context: (df, [file_errors])
        }
    else:
        return {
            "url": url,
            "source_transformer": lambda source: [
                (df, annotation_type, {**source[2], "source_file_names": [f"{name} ({annotation_type})" for name in source[2]["source_file_names"]]})
                for annotation_type, df in annotation_type_source(source[0])
            ],
            "map_spec": {
                "map_spec": update_spec,
                "contextual_input_formatter": lambda df, meta_annotation_type, context: type_formatter(meta_annotation_type, model)(df, None, context)
            }
        }

RELEASE_SPECIFIC_DATA = [
    {
        "release": "1",
        "ANNOTATIONS": {
            "sep": "\t",
            "source": [
                r1_source_spec("ASat", "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_ASat.index"),
                r1_source_spec("DNA_BRNN", "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_DNA_BRNN.index"),
                r1_source_spec("HSat", "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_HSat.index"),
                r1_source_spec("Repeat_masker", "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Repeat_Masker.index"),
                r1_source_spec("Seg_Dups", "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Seg_Dups.index"),
                r1_source_spec("TRF", "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_TRF.index"),
                r1_source_spec(
                    lambda df: [(type, df[df["reference"] == ref_type]) for ref_type, type in RELEASE_1_CAT_ANNOTATION_TYPES.items()],
                    "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_CAT_genes.index"
                ),
                r1_source_spec(
                    lambda df: [
                        (type, df.drop(columns=[c for c in RELEASE_1_FLAGGER_ANNOTATION_TYPES.keys() if c != location_column]).rename(columns={location_column: "file_location"}))
                        for location_column, type in RELEASE_1_FLAGGER_ANNOTATION_TYPES.items()
                    ],
                    "https://raw.githubusercontent.com/human-pangenomics/HPP_Year1_Assemblies/main/annotation_index/Year1_assemblies_v2_genbank_Flagger.index",
                    no_haplotype=True,
                    model=ReleaseOneFlaggerAnnotation
                )
            ],
            "contextual_input_formatter": lambda df, meta_error_sets, context: (df, [file_errors for error_set in meta_error_sets for file_errors in error_set])
        }
    },
    {
        "release": "2",
        "ANNOTATIONS": {
            "sep": ",",
            "source": [  
                { "contextual_input_formatter": type_formatter("Reference Mappings CHM13"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/alignments_to_ref/alignments_to_ref_chm13_winnowmap_bai_hprc_r2_v1.1.index.csv" },
                { "contextual_input_formatter": type_formatter("Reference Mappings CHM13"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/alignments_to_ref/alignments_to_ref_chm13_winnowmap_hprc_r2_v1.1.index.csv" },
                { "contextual_input_formatter": type_formatter("Reference Mappings GRCh38"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/alignments_to_ref/alignments_to_ref_grch38_winnowmap_bai_hprc_r2_v1.1.index.csv" },
                { "contextual_input_formatter": type_formatter("Reference Mappings GRCh38"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/alignments_to_ref/alignments_to_ref_grch38_winnowmap_hprc_r2_v1.1.index.csv" },
                { "contextual_input_formatter": type_formatter("CAT Genes"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/cat/cat_genes_hprc_r2_v1.2.index.csv" },
                { "contextual_input_formatter": type_formatter("CenSat"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/censat/censat_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("chains CHM13"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/chains/chains_to_chm13_mc_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("chains GRCh38"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/chains/chains_to_grch38_mc_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("ChromAlias"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/chrom_assignment/chrom_alias_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("ChromAlias Gaps"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/chrom_assignment/gaps_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("ChromAlias T2T"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/chrom_assignment/t2t_sequences_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("liftoff"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/liftoff/liftoff_genes_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("methylation"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/methylation/ont_methylation_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("Repeat_masker Bed"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/repeat_masker/repeat_masker_bed_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("Repeat_masker Out"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/repeat_masker/repeat_masker_out_hprc_r2_v1.0.index.csv" },
                { "contextual_input_formatter": type_formatter("Seg_Dups"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/annotation/segdups/segdups_hprc_r2_v1.1.index.csv" },
                { "contextual_input_formatter": type_formatter("Flagger_HiFi"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/assembly_qc/flagger/flagger_hifi_v0.1.csv" },
                { "contextual_input_formatter": type_formatter("Flagger_ONT"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/assembly_qc/flagger/flagger_ont_v0.1.1.csv" },
                { "contextual_input_formatter": type_formatter("NucFlag"), "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/assembly_qc/nucflag/nucflag_pre_release_v0.2.index.csv" },
            ]
        }
    }
]


def get_type_df(source_df, type):
    return source_df.assign(annotation_type=pd.Series(type, index=source_df.index))

if __name__ == "__main__":
    loaded_dfs, load_metadata = load_data_for_releases(RELEASE_SPECIFIC_DATA, DOWNLOADS_FOLDER_PATH)
    annotations_df = loaded_dfs["ANNOTATIONS"]
    validation_errors = {file_name: errors for release_errors in load_metadata["ANNOTATIONS"].values() for file_name, errors in release_errors if errors}
    
    if validation_errors:
        print(f"\nValidation errors:\n\n{format_errors_by_file(validation_errors)}")
        print(f"\nFound errors in {len(validation_errors)} source files\n")
    
    output_df = annotations_df.assign(file_size=get_file_sizes_from_uris(annotations_df["location"], "annotation"))
    output_df.to_csv(OUTPUT_FILE_PATH, index=False)

    print("\nAnnotation processing complete!\n")
