/**
 * Converts all fields of the specified T to accept LABEL.NA and LABEL.UNSPECIFIED.
 */
type WithAbsentValues<T> = {
  [K in keyof T]: T[K] | LABEL.NA | LABEL.UNSPECIFIED;
};

export type HPRCDataExplorerEntity =
  | HPRCDataExplorerAlignment
  | HPRCDataExplorerAnnotation
  | HPRCDataExplorerAssembly
  | HPRCDataExplorerRawSequencingData;

export type HPRCDataExplorerRawSequencingData = WithAbsentValues<{
  basecaller: string;
  basecallerModel: string;
  basecallerVersion: string;
  bioprojectAccession: string;
  biosampleAccession: string;
  ccsAlgorithm: string;
  coverage: number;
  deepConsensusVersion: string;
  familyId: string;
  filename: string;
  filetype: string;
  generatorContact: string;
  generatorFacility: string;
  instrumentModel: string;
  librarySource: string;
  libraryStrategy: string;
  mmTag: boolean;
  n50: number;
  oneHundredkbPlus: number;
  path: string;
  platform: string;
  populationAbbreviation: string;
  populationDescriptor: string;
  sampleId: string;
  study: string;
  totalGbp: number;
  totalReads: number;
  whales: number;
}>;

export type HPRCDataExplorerAssembly = WithAbsentValues<{
  awsFasta: string;
  biosampleAccession: string;
  familyId: string;
  fastaMd5: string;
  fastaSha256: string;
  filename: string;
  fileSize: number;
  haplotype: string;
  populationAbbreviation: string;
  populationDescriptor: string;
  release: string;
  sampleId: string;
}>;

export type HPRCDataExplorerAnnotation = WithAbsentValues<{
  annotationType: string;
  fileLocation: string;
  filename: string;
  fileSize: number;
  haplotype: string;
  release: string;
  sampleId: string;
}>;

export type HPRCDataExplorerAlignment = WithAbsentValues<{
  alignment: string;
  filename: string;
  fileSize: number;
  filetype: string;
  loc: string;
  pipeline: string;
  referenceCoordinates: string;
  version: string;
}>;

export enum LABEL {
  NA = "N/A",
  UNSPECIFIED = "Unspecified",
}
