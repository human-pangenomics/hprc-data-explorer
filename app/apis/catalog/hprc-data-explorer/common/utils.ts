import {
  HPRCDataExplorerAlignment,
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
} from "./entities";

export function getRawSequencingDataId(
  rawSequencingData: HPRCDataExplorerRawSequencingData
): string {
  return `${rawSequencingData.mmTag}_${rawSequencingData.filename}`;
}

export function getAssemblyId(assembly: HPRCDataExplorerAssembly): string {
  return `${assembly.sampleId}_${assembly.haplotype}`;
}

export function getAlignmentId(alignment: HPRCDataExplorerAlignment): string {
  return `${alignment.referenceCoordinates}_${alignment.loc}`;
}
