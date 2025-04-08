export type HPRCDataExplorerEntity =
  | HPRCDataExplorerAlignment
  | HPRCDataExplorerAnnotation
  | HPRCDataExplorerAssembly
  | HPRCDataExplorerRawSequencingData;

export interface HPRCDataExplorerRawSequencingData {
  accession: string | null;
  basecaller: string | null;
  basecallerModel: string | null;
  basecallerVersion: string | null;
  bioprojectAccession: string | null;
  biosampleAccession: string | null;
  ccsAlgorithm: string | null;
  coverage: string; //number | LABEL.NA;
  dataType: string | null;
  deepConsensusVersion: string | null;
  designDescription: string | null;
  familyId: string | null;
  filename: string;
  fileSize: string; // This and other fileSize fields should be `number | LABEL.NA` if that's ever restored
  filetype: string | null;
  fiveHundredkbPlus: string; //number | LABEL.NA;
  fourHundredkbPlus: string; //number | LABEL.NA;
  Gb: string; //number | LABEL.NA;
  generatorContact: string | null;
  generatorFacility: string | null;
  instrumentModel: string | null;
  libraryId: string | null;
  libraryLayout: string | null;
  librarySelection: string | null;
  librarySource: string | null;
  libraryStrategy: string | null;
  max: string; //number | LABEL.NA;
  mean: string; //number | LABEL.NA;
  metadataAccession: string | null;
  min: string; //number | LABEL.NA;
  mmTag: boolean | LABEL.NA | null;
  n25: string; //number | LABEL.NA;
  n50: string; //number | LABEL.NA;
  n75: string; //number | LABEL.NA;
  notes: string | null;
  ntsmScore: string | null; //number | LABEL.NA;
  oneHundredkbPlus: string; //number | LABEL.NA;
  oneMbPlus: string; //number | LABEL.NA;
  path: string;
  platform: string | null;
  polymeraseVersion: string | null;
  populationAbbreviation: string | null;
  populationDescriptor: string | null;
  quartile25: string; //number | LABEL.NA;
  quartile50: string; //number | LABEL.NA;
  quartile75: string; //number | LABEL.NA;
  readN50: string; //number | LABEL.NA;
  sampleId: string;
  seqKit: string | null;
  seqPlateChemistryVersion: string | null;
  shearMethod: string | null;
  sizeSelection: string | null;
  study: string | null;
  threeHundredkbPlus: string; //number | LABEL.NA;
  title: string | null;
  totalBp: string; //number | LABEL.NA;
  totalGbp: string; //number | LABEL.NA;
  totalReads: string; //number | LABEL.NA;
  twoHundredkbPlus: string; //number | LABEL.NA;
  whales: string; //number | LABEL.NA;
}

export interface HPRCDataExplorerAssembly {
  accession: string | null;
  awsFasta: string | null;
  familyId: string | null;
  fastaSha256: string | null;
  filename: string;
  fileSize: string;
  gcpFasta: string | null;
  haplotype: string;
  populationAbbreviation: string | null;
  populationDescriptor: string | null;
  sampleId: string;
}

export interface HPRCDataExplorerAnnotation {
  annotationType: string;
  fileLocation: string;
  filename: string;
  fileSize: string;
  haplotype: string | null;
  reference: string | null;
  sampleId: string;
}

export interface HPRCDataExplorerAlignment {
  alignment: string;
  filename: string;
  fileSize: number;
  filetype: string;
  loc: string;
  pipeline: string;
  referenceCoordinates: string | null;
  useCase: string[];
  version: string | null;
}

export enum LABEL {
  NA = "N/A",
}
