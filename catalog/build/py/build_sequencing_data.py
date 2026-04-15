import os
import pandas as pd
import numpy as np
from linkml_runtime.utils.schemaview import SchemaView
from build_help import load_and_validate_csv, format_errors_by_file, download_file, get_file_sizes_from_uris
from reports import EntityTypeReport, get_error_strings_per_file
import generated_schema.sequencing_data as schema

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/sequencing-data.csv")
REPORT_PATH = os.path.join(BASE_DIR, "../reports/data/normalization_sequencing_data.json")
SEQUENCING_DATA_SCHEMA_PATH = os.path.join(BASE_DIR, "../../schema/sequencing_data.yaml")

METADA_SOURCES = [
    {"model": schema.HiCSequencingData, "filename": "hic_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=hic"},
    {"model": schema.OntSequencingData, "filename": "ont_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=ont"},
    {"model": schema.DeepConsensusSequencingData, "filename": "dc_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=dc"},
    {"model": schema.HiFiSequencingData, "filename": "hifi_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=hifi"},
    {"model": schema.IlluminaSequencingData, "filename": "ill_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=ill"},
    {"model": schema.KinnexSequencingData, "filename": "kinnex_sheet.csv", "url": "https://docs.google.com/spreadsheets/d/1EuZNw2sdijKYpJLqgHUYBOF6F4ECry8EWKZzVPjAw4Y/gviz/tq?tqx=out:csv&sheet=kinnex"},
]


def download_source_files(urls_source, output_folder_path, get_filename=None, get_url=lambda v: v, get_result_info=lambda v, _: v):
    paths_info = []
    for source in urls_source:
        # Get the filename and the path where the output will be saved
        paths_info.append(get_result_info(download_file(get_url(source), output_folder_path, get_filename and get_filename(source)), source))
    return paths_info


def join_samples(metadata_paths):
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

    with_size = all_metadata.assign(file_size=get_file_sizes_from_uris(all_metadata["path"], "sequencing data"))

    return (with_size, errors_by_file)


if __name__ == "__main__":
    metadata_files = download_source_files(METADA_SOURCES, DOWNLOADS_FOLDER_PATH, lambda source: source.get("filename"), lambda source: source["url"], lambda path, source: (path, source["model"]))
    joined, errors_by_file = join_samples(metadata_files)
    if errors_by_file:
        print(f"\nValidation errors:\n\n{format_errors_by_file(errors_by_file)}")
        print(f"\nFound errors in {len(errors_by_file)} source files")
    
    EntityTypeReport(
        validation_errors=get_error_strings_per_file(errors_by_file)
    ).save_to(REPORT_PATH)

    joined.to_csv(OUTPUT_FILE_PATH, index=False)

    print("\nSequencing data processing complete!\n")
