import {
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
} from "../../../../apis/catalog/hprc-data-explorer/common/entities";
import * as C from "../../../../components/index";

/**
 * Build props for the accession cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildAccession = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.accession,
  };
};

/**
 * Build props for the ASat annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildAsatAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.asatAnnotationFile,
  };
};

/**
 * Build props for the AWS FASTA cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildAwsFasta = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.awsFasta,
  };
};

/**
 * Build props for the CAT genes CHM13 annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildCatGenesChm13AnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.catGenesChm13AnnotationFile,
  };
};

/**
 * Build props for the CAT genes hg38 annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildCatGenesHg38AnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.catGenesHg38AnnotationFile,
  };
};

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
 * Build props for the DNA BRNN annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildDnaBrnnAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.dnaBrnnAnnotationFile,
  };
};

/**
 * Build props for the family ID cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFamilyId = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.familyId,
  };
};

/**
 * Build props for the FASTA SHA-256 cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFastaSha256 = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.fastaSha256,
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
 * Build props for the Flagger annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFlaggerAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.flaggerAnnotationFile,
  };
};

/**
 * Build props for the frag cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFrag = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.frag?.toLocaleString(),
  };
};

/**
 * Build props for the full dup cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFullDup = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.fullDup?.toLocaleString(),
  };
};

/**
 * Build props for the full SGL cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFullSgl = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.fullSgl?.toLocaleString(),
  };
};

/**
 * Build props for the GCP FASTA cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildGcpFasta = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.gcpFasta,
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
 * Build props for the Hamming err rate cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildHammingErrRate = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value:
      assembly.hammingErrRate === null
        ? undefined
        : formatPercentage(assembly.hammingErrRate),
  };
};

/**
 * Build props for the haplotype cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildHaplotype = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.haplotype,
  };
};

/**
 * Build props for the HSat annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildHsatAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.hsatAnnotationFile,
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
 * Build props for the L50 cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildL50 = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.l50?.toLocaleString(),
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
 * Build props for the N50 cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildN50 = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.n50?.toLocaleString(),
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
 * Build props for the num configs cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildNumContigs = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.numContigs?.toLocaleString(),
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
 * Build props for the production year cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildProductionYear = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.productionYear,
  };
};

/**
 * Build props for the QV cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildQv = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.qv?.toLocaleString(),
  };
};

/**
 * Build props for the repeat masker annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildRepeatMaskerAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.repeatMaskerAnnotationFile,
  };
};

/**
 * Build props for the sample ID cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSampleId = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.sampleId,
  };
};

/**
 * Build props for the seg dups annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSegDupsAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.segDupsAnnotationFile,
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

/**
 * Build props for the subpopulation cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSubpopulation = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.subpopulation,
  };
};

/**
 * Build props for the superpopulation cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSuperpopulation = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.superpopulation,
  };
};

/**
 * Build props for the switch err rate cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSwitchErrRate = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value:
      assembly.switchErrRate === null
        ? undefined
        : formatPercentage(assembly.switchErrRate),
  };
};

/**
 * Build props for the total len cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildTotalLen = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.totalLen?.toLocaleString(),
  };
};

/**
 * Build props for the TRF annotation file cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildTrfAnnotationFile = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: assembly.trfAnnotationFile,
  };
};

/**
 * Format a decimal value as a fraction.
 * @param decimalFraction - Value to format.
 * @returns Percentage string.
 */
function formatPercentage(decimalFraction: number): string {
  return `${(decimalFraction * 100).toLocaleString()}%`;
}
