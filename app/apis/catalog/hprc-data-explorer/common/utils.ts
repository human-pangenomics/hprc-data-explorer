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
  return rawSequencingData.path;
}

export function getAssemblyId(assembly: HPRCDataExplorerAssembly): string {
  return assembly.awsFasta;
}

export function getAnnotationId(
  annotation: HPRCDataExplorerAnnotation
): string {
  return annotation.fileLocation;
}

export function getAlignmentId(alignment: HPRCDataExplorerAlignment): string {
  return alignment.loc;
}
