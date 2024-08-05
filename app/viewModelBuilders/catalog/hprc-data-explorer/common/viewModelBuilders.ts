import { HPRCDataExplorerRawSequencingData } from "app/apis/catalog/hprc-data-explorer/common/entities";
import * as C from "../../../../components/index";

/**
 * Build props for the data type cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildDataType = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.dataType,
  };
};

/**
 * Build props for the design description cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildDesignDescription = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.designDescription,
  };
};

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

/**
 * Build props for the generator contact cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildGeneratorContact = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.generatorContact,
  };
};

/**
 * Build props for the generator facility cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildGeneratorFacility = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.generatorFacility,
  };
};

/**
 * Build props for the intrument model cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildInstrumentModel = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.instrumentModel,
  };
};

/**
 * Build props for the library ID cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildLibraryId = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.libraryId,
  };
};

/**
 * Build props for the library layout cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildLibraryLayout = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.libraryLayout,
  };
};

/**
 * Build props for the library selection cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildLibrarySelection = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.librarySelection,
  };
};

/**
 * Build props for the library source cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildLibrarySource = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.librarySource,
  };
};

/**
 * Build props for the library strategy cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildLibraryStrategy = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.libraryStrategy,
  };
};

/**
 * Build props for the notes cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildNotes = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.notes,
  };
};

/**
 * Build props for the path cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildPath = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.path,
  };
};

/**
 * Build props for the platform cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildPlatform = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.platform,
  };
};

/**
 * Build props for the sample ID cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildSampleId = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.sampleId,
  };
};

/**
 * Build props for the shear method cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildShearMethod = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.shearMethod,
  };
};

/**
 * Build props for the size selection cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildSizeSelection = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.sizeSelection,
  };
};
