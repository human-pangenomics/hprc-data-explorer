export type HPRCDataExplorerEntity =
  | HPRCDataExplorerAlignment
  | HPRCDataExplorerAnnotation
  | HPRCDataExplorerAssembly
  | HPRCDataExplorerRawSequencingData;

export interface HPRCDataExplorerRawSequencingData {
  accession: string | null;
  assembly: string | null;
  basecaller: string;
  basecallerModel: string;
  basecallerVersion: string;
  bioprojectAccession: string;
  biosampleAccession: string;
  ccsAlgorithm: string;
  coverage: string; //number | LABEL.NA;
  dataType: string;
  deepConsensusVersion: string;
  designDescription: string;
  familyId: string | null;
  filename: string;
  fileSize: string; // This and other fileSize fields should be `number | LABEL.NA` if that's ever restored
  filetype: string;
  fiveHundredkbPlus: string; //number | LABEL.NA;
  fourHundredkbPlus: string; //number | LABEL.NA;
  Gb: string; //number | LABEL.NA;
  generatorContact: string;
  generatorFacility: string;
  instrumentModel: string;
  libraryId: string;
  libraryLayout: string;
  librarySelection: string;
  librarySource: string;
  libraryStrategy: string;
  max: string; //number | LABEL.NA;
  mean: string; //number | LABEL.NA;
  metadataAccession: string;
  min: string; //number | LABEL.NA;
  mmTag: boolean | LABEL.NA;
  n25: string; //number | LABEL.NA;
  n50: string; //number | LABEL.NA;
  n75: string; //number | LABEL.NA;
  notes: string;
  ntsmResult: string;
  ntsmScore: string; //number | LABEL.NA;
  oneHundredkbPlus: string; //number | LABEL.NA;
  oneMbPlus: string; //number | LABEL.NA;
  path: string;
  platform: string;
  polymeraseVersion: string;
  productionYear: string | null;
  quartile25: string; //number | LABEL.NA;
  quartile50: string; //number | LABEL.NA;
  quartile75: string; //number | LABEL.NA;
  readN50: string; //number | LABEL.NA;
  result: string;
  sampleId: string;
  seqKit: string;
  seqPlateChemistryVersion: string;
  shearMethod: string;
  sizeSelection: string;
  study: string;
  subpopulation: string | null;
  superpopulation: string | null;
  threeHundredkbPlus: string; //number | LABEL.NA;
  title: string;
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
  frag: number | null;
  fullDup: number | null;
  fullSgl: number | null;
  gcpFasta: string | null;
  hammingErrRate: number | null;
  haplotype: string;
  l50: number | null;
  n50: number | null;
  numContigs: number | null;
  productionYear: string | null;
  qv: number | string | null;
  sampleId: string;
  subpopulation: string | null;
  superpopulation: string | null;
  switchErrRate: number | null;
  totalLen: number | null;
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
  loc: string;
  pipeline: string;
  referenceCoordinates: string | null;
  useCase: string[];
  version: string | null;
}

export enum LABEL {
  NA = "N/A",
}
