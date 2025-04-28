import os
import pandas as pd
import numpy as np
from linkml_runtime.utils.schemaview import SchemaView
from build_help import load_and_validate_csv, download_file, get_file_sizes_from_uris
import generated_schema.sequencing_data as schema

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/sequencing-data.csv")
SEQUENCING_DATA_SCHEMA_PATH = os.path.join(BASE_DIR, "../../schema/sequencing_data.yaml")

METADA_SOURCES = [
    {"model": schema.HiCSequencingData, "filename": "hic_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=hic"},
    {"model": schema.OntSequencingData, "filename": "ont_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=ont"},
    {"model": schema.DeepConsensusSequencingData, "filename": "dc_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=dc"},
    {"model": schema.HiFiSequencingData, "filename": "hifi_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=hifi"},
    {"model": schema.IlluminaSequencingData, "filename": "ill_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=ill"},
    {"model": schema.KinnexSequencingData, "filename": "kinnex_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=kinnex"},
]

BIOSAMPLES_TABLE_URL = "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sample/hprc_release2_sample_metadata.csv"


def download_source_files(urls_source, output_folder_path, get_filename=None, get_url=lambda v: v, get_result_info=lambda v, _: v):
    paths_info = []
    for source in urls_source:
        # Get the filename and the path where the output will be saved
        paths_info.append(get_result_info(download_file(get_url(source), output_folder_path, get_filename and get_filename(source)), source))
    return paths_info


def join_samples(metadata_paths, biosamples_table_path):
    schemaview = SchemaView(SEQUENCING_DATA_SCHEMA_PATH)
    # Generate each column across all provided sheets
    metadata_list = []
    errors_by_file = {}
    for path, model in metadata_paths:
        file_df, file_errors = load_and_validate_csv(path, model, schemaview)
        metadata_list.append(file_df)
        if file_errors: errors_by_file[path.name] = file_errors
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

    return (joined_with_size, errors_by_file)


def format_index_list(ordered_indices):
    ranges = []
    prev_index = None
    for index in ordered_indices:
        if prev_index == index - 1:
            if isinstance(ranges[-1], list):
                ranges[-1][1] = index
            else:
                ranges[-1] = [ranges[-1], index]
        else:
            ranges.append(index)
        prev_index = index
    range_strings = [str(r[0]) + "-" + str(r[1]) if isinstance(r, list) else str(r) for r in ranges]
    if len(range_strings) > 2:
        return ", ".join(range_strings[:-1]) + ", and " + range_strings[-1]
    else:
        return " and ".join(range_strings)

def format_file_errors(errors):
    rows_by_field_and_message = {}
    for err in errors:
        field_and_message = (err.field, err.message)
        if field_and_message not in rows_by_field_and_message:
            rows_by_field_and_message[field_and_message] = [err.row]
        else:
            rows_by_field_and_message[field_and_message].append(err.row)
    return "\n".join(
        f"{field_and_message[0]}: {field_and_message[1]} (source {"row" if len(rows) == 1 else "rows"} {format_index_list(rows)})"
        for field_and_message, rows in rows_by_field_and_message.items()
    )

def format_errors(errors_by_file):
    return "\n\n".join(f"{filename}:\n{format_file_errors(errors)}" for filename, errors in errors_by_file.items())


if __name__ == "__main__":
    metadata_files = download_source_files(METADA_SOURCES, DOWNLOADS_FOLDER_PATH, lambda source: source.get("filename"), lambda source: source["url"], lambda path, source: (path, source["model"]))
    biosamples_table_file = download_source_files(
        [BIOSAMPLES_TABLE_URL], DOWNLOADS_FOLDER_PATH
    )[0]
    joined, errors_by_file = join_samples(metadata_files, biosamples_table_file)
    if errors_by_file:
        print(f"\nValidation errors:\n\n{format_errors(errors_by_file)}")
        print(f"\nFound errors in {len(errors_by_file)} source files")
    joined.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nSequencing data processing complete!\n")
