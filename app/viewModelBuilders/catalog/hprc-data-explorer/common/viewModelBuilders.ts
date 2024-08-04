import { HPRCDataExplorerRawSequencingData } from "app/apis/catalog/hprc-data-explorer/common/entities";
import * as C from "../../../../components/index";

/**
 * Build props for the filename cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildFilename = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.filename,
  };
};
