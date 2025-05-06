import os
from linkml_runtime import SchemaView
from build_help import format_file_errors, load_and_validate_csv
from generated_schema.alignments import Alignment

# Determine the base directory of the script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

FILE_PATH = os.path.join(BASE_DIR, "../intermediate/alignments.csv")
ALIGNMENTS_SCHEMA_PATH = os.path.join(BASE_DIR, "../../schema/alignments.yaml")

ALIGNMENTS_SCHEMAVIEW = SchemaView(ALIGNMENTS_SCHEMA_PATH)

if __name__ == "__main__":
  errors = load_and_validate_csv(FILE_PATH, Alignment, ALIGNMENTS_SCHEMAVIEW)[1]
  if errors:
    print(f"\nValidation errors:\n\n{format_file_errors(errors)}")
    print(f"\nFound errors in file")
