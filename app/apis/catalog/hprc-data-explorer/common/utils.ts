import {
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
} from "./entities";

export function getRawSequencingDataId(
  rawSequencingData: HPRCDataExplorerRawSequencingData
): string {
  return rawSequencingData.filename;
}

export function getAssemblyId(assembly: HPRCDataExplorerAssembly): string {
  return `${assembly.sampleId}_${assembly.haplotype}`;
}
