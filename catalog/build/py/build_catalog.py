from build_samples import build_samples
from build_sequencing_data import build_sequencing_data
from build_assemblies import build_assemblies
from build_annotations import build_annotations
from validate_alignments import validate_alignments
from reports import generate_catalog_report

if __name__ == "__main__":
    build_samples()
    build_sequencing_data()
    build_assemblies()
    build_annotations()
    validate_alignments()
    generate_catalog_report()
