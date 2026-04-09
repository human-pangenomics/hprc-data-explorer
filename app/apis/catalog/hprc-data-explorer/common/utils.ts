import {
  HPRCDataExplorerAlignment,
  HPRCDataExplorerAnnotation,
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
  HPRCDataExplorerSample,
} from "./entities";

export function getSampleId(sample: HPRCDataExplorerSample): string {
  return sample.sampleId;
}

export function getRawSequencingDataId(
  rawSequencingData: HPRCDataExplorerRawSequencingData
): string {
  return `${rawSequencingData.mmTag}_${rawSequencingData.filename}`;
}

export function getAssemblyId(assembly: HPRCDataExplorerAssembly): string {
  return `${assembly.sampleId}_${assembly.haplotype}_${assembly.release}`;
}

export function getAnnotationId(
  annotation: HPRCDataExplorerAnnotation
): string {
  return `${annotation.sampleId}_${annotation.haplotype}_${annotation.annotationType}_${annotation.release}`;
}

export function getAlignmentId(alignment: HPRCDataExplorerAlignment): string {
  return `${alignment.referenceCoordinates}_${alignment.loc}`;
}
