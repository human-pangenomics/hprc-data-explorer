import { formatFileSize } from "@databiosphere/findable-ui/lib/utils/formatFileSize";
import {
  HPRCDataExplorerAlignment,
  HPRCDataExplorerAnnotation,
  HPRCDataExplorerAssembly,
  HPRCDataExplorerEntity,
  HPRCDataExplorerRawSequencingData,
  LABEL,
} from "../../../../apis/catalog/hprc-data-explorer/common/entities";
import * as C from "../../../../components/index";
import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../components/common/MDXContent";
import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";

/**
 * Build props for the accession cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildAccession = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: rawSequencingData.accession,
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
 * Build props for the alignment download cell.
 * @param alignment - Alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildAlignmentDownload = (
  alignment: HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.FileDownload> => {
  return {
    fileName: alignment.filename,
    fileUrl: getDownloadUrl(alignment.loc),
  };
};

/**
 * Build props for the annotation download cell.
 * @param annotation - Annotation entity.
 * @returns Props to be used for the cell.
 */
export const buildAnnotationDownload = (
  annotation: HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.FileDownload> => {
  return {
    fileName: annotation.filename,
    fileUrl: getDownloadUrl(annotation.fileLocation),
  };
};

/**
 * Build props for annotation list view info Alert component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Alert component.
 */
export const buildAnnotationListHero = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof MDX.AlertAnnotationListHero> => {
  return {
    ...ALERT_PROPS.STANDARD_INFO,
    component: C.FluidPaper,
    entityName: viewContext.entityConfig.label,
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
 * Build props for the assembly download cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildAssemblyDownload = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.FileDownload> => {
  return {
    fileName: assembly.filename,
    fileUrl: assembly.awsFasta ? getDownloadUrl(assembly.awsFasta) : undefined,
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
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildBiosampleAccession = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.biosampleAccession,
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
 * Build props for the FASTA MD5 cell.
 * @param assembly - Assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildFastaMd5 = (
  assembly: HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.TypographyNoWrap> => {
  return {
    value: assembly.fastaMd5,
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
 * @param entity - Entity.
 * @returns Props to be used for the cell.
 */
export const buildFilename = (
  entity: HPRCDataExplorerEntity
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.filename,
  };
};

/**
 * Build props for the file size cell.
 * @param entity - Entity.
 * @returns Props to be used for the cell.
 */
export const buildFileSize = (
  entity:
    | HPRCDataExplorerAlignment
    | HPRCDataExplorerAnnotation
    | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value:
      entity.fileSize === LABEL.NA
        ? LABEL.NA
        : formatFileSize(Number(entity.fileSize)),
  };
};

/**
 * Build props for the filetype cell.
 * @param entity - Raw sequencing data or alignment entity.
 * @returns Props to be used for the cell.
 */
export const buildFiletype = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAlignment
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.filetype,
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
 * Build props for the N50 cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildN50 = (
  entity: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.n50?.toLocaleString(),
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
 * Build props for the population abbreviation cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildPopulationAbbreviation = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.populationAbbreviation,
  };
};

/**
 * Build props for the population descriptor cell.
 * @param entity - Raw sequencing data or assembly entity.
 * @returns Props to be used for the cell.
 */
export const buildPopulationDescriptor = (
  entity: HPRCDataExplorerRawSequencingData | HPRCDataExplorerAssembly
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.populationDescriptor,
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
 * Build props for the release cell.
 * @param entity - Assembly or annotation entity.
 * @returns Props to be used for the cell.
 */
export const buildRelease = (
  entity: HPRCDataExplorerAssembly | HPRCDataExplorerAnnotation
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: entity.release,
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
 * Build props for the sequencing data download cell.
 * @param rawSequencingData - Raw sequencing data entity.
 * @returns Props to be used for the cell.
 */
export const buildSequencingDataDownload = (
  rawSequencingData: HPRCDataExplorerRawSequencingData
): React.ComponentProps<typeof C.FileDownload> => {
  return {
    fileName: rawSequencingData.filename,
    fileUrl: getDownloadUrl(rawSequencingData.path),
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
 * Get a download URL from a given URI, by converting it from an S3 URI or returning it as-is.
 * @param uri - URI.
 * @returns download URL.
 */
function getDownloadUrl(uri: string): string {
  const s3UriMatch = /^s3:\/\/([^/]+)\/(.*)$/.exec(uri);
  if (!s3UriMatch) return uri;
  const [, bucketName, filePath] = s3UriMatch;
  return `https://${bucketName}.s3.amazonaws.com/${filePath}`;
}
