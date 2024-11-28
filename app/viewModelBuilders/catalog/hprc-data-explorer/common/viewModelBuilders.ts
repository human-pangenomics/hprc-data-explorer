import {
  HPRCDataExplorerAlignment,
  HPRCDataExplorerAnnotation,
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
} from "../../../../apis/catalog/hprc-data-explorer/common/entities";
import * as C from "../../../../components/index";
import { METADATA_KEY } from "./entities";
import { getPluralizedMetadataLabel } from "./utils";

/**
 * Build props for the accession cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildAccession = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.accession,
  };
};

/**
 * Build props for the alignment cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildAlignment = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: alignment.alignment,
  };
};

/**
 * Build props for the annotation type cell.
 * @param annotation - Annotation entity.
 * @returns Props to be used for the cell.
 */
export const buildAnnotationType = (
  annotation: HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: annotation.annotationType,
  };
};

/**
 * Build props for the assembly cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildAssembly = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.assembly,
  };
};

/**
 * Build props for the AWS FASTA cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildAwsFasta = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.TypographyNoWrap> => {
  return {
    value: assembly.awsFasta,
  };
};

/**
 * Build props for the basecaller cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildBasecaller = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.basecaller,
  };
};

/**
 * Build props for the basecaller model cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildBasecallerModel = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.basecallerModel,
  };
};

/**
 * Build props for the basecaller version cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildBasecallerVersion = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.basecallerVersion,
  };
};

/**
 * Build props for the bioproject accession cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildBioprojectAccession = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.bioprojectAccession,
  };
};

/**
 * Build props for the biosample accession cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildBiosampleAccession = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.biosampleAccession,
  };
};

/**
 * Build props for the CCS algorithm cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildCcsAlgorithm = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.ccsAlgorithm,
  };
};

/**
 * Build props for the coverage cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildCoverage = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.coverage?.toLocaleString(),
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
 * Build props for the DeepConsensus version cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildDeepConsensusVersion = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.deepConsensusVersion,
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
 * Build props for the family ID cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFamilyId = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.familyId,
  };
};

/**
 * Build props for the FASTA SHA-256 cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFastaSha256 = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.TypographyNoWrap> => {
  return {
    value: assembly.fastaSha256,
  };
};

/**
 * Build props for the file location cell.
 * @param annotation - Annotation entity.
 * @returns Props to be used for the cell.
 */
export const buildFileLocation = (
  annotation: HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.TypographyNoWrap> => {
  return {
    value: annotation.fileLocation,
  };
};

/**
 * Build props for the filename cell.
 * @param entity - Raw sequencing data or alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildFilename = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.filename,
  };
};

/**
 * Build props for the filetype cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildFiletype = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.filetype,
  };
};

/**
 * Build props for the 500kb+ cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildFiveHundredkbPlus = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.fiveHundredkbPlus?.toLocaleString(),
  };
};

/**
 * Build props for the 400kb+ cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildFourHundredkbPlus = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.fourHundredkbPlus?.toLocaleString(),
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
 * Build props for the Gb cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildGb = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.Gb?.toLocaleString(),
  };
};

/**
 * Build props for the GCP FASTA cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildGcpFasta = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.TypographyNoWrap> => {
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
 * @param entity - Assembly or annotation entity.
 * @returns Props to be used for the cell.
 */
export const buildHaplotype = (
  entity: HPRCDataExplorerAssembly | HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.haplotype,
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
 * Build props for the loc cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildLoc = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.TypographyNoWrap> => {
  return {
    value: alignment.loc,
  };
};

/**
 * Build props for the max cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildMax = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.max?.toLocaleString(),
  };
};

/**
 * Build props for the mean cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildMean = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.mean?.toLocaleString(),
  };
};

/**
 * Build props for the metadata accession cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildMetadataAccession = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.metadataAccession,
  };
};

/**
 * Build props for the min cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildMin = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.min?.toLocaleString(),
  };
};

/**
 * Build props for the MM tag cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildMmTag = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: String(rawSequencingData.mmTag),
  };
};

/**
 * Build props for the N25 cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildN25 = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.n25?.toLocaleString(),
  };
};

/**
 * Build props for the N50 cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildN50 = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.n50?.toLocaleString(),
  };
};

/**
 * Build props for the N75 cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildN75 = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.n75?.toLocaleString(),
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
 * Build props for the ntsm result cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildNtsmResult = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.ntsmResult,
  };
};

/**
 * Build props for the ntsm score cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildNtsmScore = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.ntsmScore?.toLocaleString(),
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
 * Build props for the 100kb+ cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildOneHundredkbPlus = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.oneHundredkbPlus?.toLocaleString(),
  };
};

/**
 * Build props for the 1Mb+ cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildOneMbPlus = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.oneMbPlus?.toLocaleString(),
  };
};

/**
 * Build props for the path cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildPath = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.TypographyNoWrap> => {
  return {
    value: rawSequencingData.path,
  };
};

/**
 * Build props for the pipeline cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildPipeline = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: alignment.pipeline,
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
 * Build props for the polymerase version cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildPolymeraseVersion = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.polymeraseVersion,
  };
};

/**
 * Build props for the production year cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildProductionYear = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.productionYear,
  };
};

/**
 * Build props for the quartile 25 cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildQuartile25 = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.quartile25?.toLocaleString(),
  };
};

/**
 * Build props for the quartile 50 cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildQuartile50 = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.quartile50?.toLocaleString(),
  };
};

/**
 * Build props for the quartile 75 cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildQuartile75 = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.quartile75?.toLocaleString(),
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
 * Build props for the read N50 cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildReadN50 = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.readN50?.toLocaleString(),
  };
};

/**
 * Build props for the reference cell.
 * @param annotation - Annotation entity.
 * @returns Props to be used for the cell.
 */
export const buildReference = (
  annotation: HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: annotation.reference,
  };
};

/**
 * Build props for the reference coordinates cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildReferenceCoordinates = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: alignment.referenceCoordinates,
  };
};

/**
 * Build props for the result cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildResult = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.result,
  };
};

/**
 * Build props for the sample ID cell.
 * @param entity - Entity containing sample ID.
 * @returns Props to be used for the cell.
 */
export const buildSampleId = (
  entity:
    | HPRCDataExplorerRawSequencingData
    | HPRCDataExplorerAssembly
    | HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.sampleId,
  };
};

/**
 * Build props for the seq kit cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildSeqKit = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.seqKit,
  };
};

/**
 * Build props for the seq plate chemistry version cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildSeqPlateChemistryVersion = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.seqPlateChemistryVersion,
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
 * Build props for the study cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildStudy = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.study,
  };
};

/**
 * Build props for the subpopulation cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSubpopulation = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.subpopulation,
  };
};

/**
 * Build props for the superpopulation cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildSuperpopulation = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.superpopulation,
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
 * Build props for the 300kb+ cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildThreeHundredkbPlus = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.threeHundredkbPlus?.toLocaleString(),
  };
};

/**
 * Build props for the title cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildTitle = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.title,
  };
};

/**
 * Build props for the total bp cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildTotalBp = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.totalBp?.toLocaleString(),
  };
};

/**
 * Build props for the total Gbp cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildTotalGbp = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.totalGbp?.toLocaleString(),
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
 * Build props for the total reads cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildTotalReads = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.totalReads?.toLocaleString(),
  };
};

/**
 * Build props for the 200kb+ cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildTwoHundredkbPlus = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.twoHundredkbPlus?.toLocaleString(),
  };
};

/**
 * Build props for the use case cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildUseCase = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.USE_CASE),
    values: alignment.useCase,
  };
};

/**
 * Build props for the version cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildVersion = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: alignment.version,
  };
};

/**
 * Build props for the whales cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildWhales = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.whales?.toLocaleString(),
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
