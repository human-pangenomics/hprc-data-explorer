import { HPRCDataExplorerRawSequencingData } from "./entities";

export function getRawSequencingDataId(
  rawSequencingData: HPRCDataExplorerRawSequencingData
): string {
  return rawSequencingData.filename;
}
