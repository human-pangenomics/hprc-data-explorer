import os
from linkml_runtime.utils.schemaview import SchemaView
from build_help import load_and_validate_csv, format_file_errors, download_file
import generated_schema.samples as schema

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define paths relative to the script's directory
DOWNLOADS_FOLDER_PATH = os.path.join(BASE_DIR, "../temporary")
OUTPUT_FILE_PATH = os.path.join(BASE_DIR, "../intermediate/samples.csv")
SAMPLE_SCHEMA_PATH = os.path.join(BASE_DIR, "../../schema/samples.yaml")

BIOSAMPLES_TABLE_URL = "https://github.com/human-pangenomics/hprc_intermediate_assembly/raw/refs/heads/main/data_tables/sample/hprc_release2_sample_metadata.csv"


if __name__ == "__main__":
    schemaview = SchemaView(SAMPLE_SCHEMA_PATH)
    samples_file = download_file(BIOSAMPLES_TABLE_URL, DOWNLOADS_FOLDER_PATH)
    df, errors = load_and_validate_csv(samples_file, schema.Sample, schemaview)
    if errors:
        print(f"\nValidation errors:\n\n{format_file_errors(errors)}")
        print(f"\nFound {len(errors)} errors")
    df.to_csv(OUTPUT_FILE_PATH, index=False)
    print("\nSample processing complete!\n")
