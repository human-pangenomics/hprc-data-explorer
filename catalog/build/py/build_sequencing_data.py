import os
import pandas as pd
import numpy as np
from linkml_runtime.utils.schemaview import SchemaView
from build_help import map_columns, download_file, get_file_sizes_from_uris
import generated_schema.schema as schema

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/sequencing-data.csv")

METADA_SOURCES = [
    {"model": schema.HiCSequencingData, "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sequencing_data/data_hic_pre_release.index.csv"},
    {"model": schema.OntSequencingData, "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sequencing_data/data_ont_pre_release.index.csv"},
    {"model": schema.DeepConsensusSequencingData, "drop": ["production", "data_type", "notes", "mm_tag", "coverage", "ntsm_score", "ccs_algorithm"], "url": "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sequencing_data/data_deepconsensus_pre_release.index.csv"},
    {"model": schema.HiFiSequencingData, "drop": ["MM_review"], "url": "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sequencing_data/data_hifi_pre_release.index.csv"},
    # TODO don't keep gender mapping in without checking it's correct
    {"model": schema.IlluminaSequencingData, "map": {"gender": lambda v: "Male" if v == 1 else "Female" if v == 2 else "Other"}, "drop": ["Phenotype"], "add": {"total_gbp": np.nan}, "url": "https://raw.githubusercontent.com/human-pangenomics/hprc_intermediate_assembly/refs/heads/main/data_tables/sequencing_data/data_illumina_pre_release.index.csv"},
    {"model": schema.KinnexSequencingData, "map": {"basecaller_version": str}, "url": "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sequencing_data/data_kinnex_pre_release.index.csv"},
]

BIOSAMPLES_TABLE_URL = "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sample/hprc_release2_sample_metadata.csv"


def download_source_files(urls_source, output_folder_path, get_url=lambda v: v, get_result_info=lambda v, _: v):
    paths_info = []
    for source in urls_source:
        # Get the filename and the path where the output will be saved
        paths_info.append(get_result_info(download_file(get_url(source), output_folder_path), source))
    return paths_info


def add_columns_to_df(df, columns):
    df = df.copy()
    for name, value in columns.items():
        df[name] = value
    return df


def load_model_csv(path, model, schemaview, drop_columns, column_mappers, add_columns):
    df = pd.read_csv(path, sep=",", keep_default_na=False, na_values={"ntsm_score": [""], "deepconsensus_coverage": [""]}).drop_duplicates()

    df = df.rename(columns={
        "sample_ID": "sample_id",
        "total_Gbp": "total_gbp",
        "read_N50": "n50",
        "100kb+": "coverage_100kb_plus",
        "200kb+": "coverage_200kb_plus",
        "300kb+": "coverage_300kb_plus",
        "400kb+": "coverage_400kb_plus",
        "500kb+": "coverage_500kb_plus",
        "1Mb+": "coverage_1Mb_plus",
        "DeepConsensus_version": "deepconsensus_version",
        "N25": "n25",
        "N50": "n50",
        "N75": "n75",
        "MM_tag": "mm_tag",
        "MM_remove": "mm_remove",
        "Family ID": "family_id",
        "Paternal ID": "paternal_id",
        "Maternal ID": "maternal_id",
        "Gender": "gender",
        "Population": "population",
        "Relationship": "relationship",
        "Siblings": "siblings",
        "Second Order": "second_order",
        "Third Order": "third_order",
        "Other Comments": "other_comments",
        "check-flnc reads": "check_flnc_reads",
    })
    if column_mappers: df = map_columns(df, **column_mappers)
    if drop_columns: df = df.drop(columns=drop_columns)
    if add_columns: df = add_columns_to_df(df, add_columns)
    rows = df.to_dict(orient="records")
    rows = [{k: None if pd.isna(v) and k in ["ntsm_score", "total_gbp", "deepconsensus_coverage"] else v for k, v in row.items()} for row in rows]

    return [model(**row) for row in rows]


def join_samples(metadata_paths, biosamples_table_path):
    schemaview = SchemaView(os.path.join(BASE_DIR, "../../schema/sequencing_data.yaml"))
    # Generate each column across all provided sheets
    metadata_model_list = [load_model_csv(path, model, schemaview, drop_columns, column_mappers, add_columns) for path, model, drop_columns, column_mappers, add_columns in metadata_paths]
    metadata_list = [pd.DataFrame([item.model_dump() for item in items]) for items in metadata_model_list]
    metadata_columns = np.unique([col for df in metadata_list for col in df.columns])
    # Concatenate all the provided metadata sheets
    all_metadata = (
        pd.concat(metadata_list, axis=0, ignore_index=True)
        .reindex(columns=metadata_columns)
        .fillna("N/A")
    )
    # Join the concatenated sheets with the table
    biosamples_table = pd.read_csv(biosamples_table_path, sep=",").drop(columns=["notes"])
    joined = all_metadata.merge(
        biosamples_table,
        on="sample_id",
        how="left",
        validate="many_to_one",
    )
    print("\nThe following biosamples did not have corresponding metadata:")
    print(
        ", ".join(
            all_metadata[~all_metadata["sample_id"].isin(biosamples_table["sample_id"])][
                "sample_id"
            ].unique()
        )
    )

    joined_with_size = joined.assign(file_size=get_file_sizes_from_uris(joined["path"], "sequencing data"))

    return joined_with_size


if __name__ == "__main__":
    metadata_files = download_source_files(METADA_SOURCES, DOWNLOADS_FOLDER_PATH, lambda source: source["url"], lambda path, source: (path, source["model"], source.get("drop"), source.get("map"), source.get("add")))
    biosamples_table_file = download_source_files(
        [BIOSAMPLES_TABLE_URL], DOWNLOADS_FOLDER_PATH
    )[0]
    joined = join_samples(metadata_files, biosamples_table_file)
    joined.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nSequencing data processing complete!\n")
