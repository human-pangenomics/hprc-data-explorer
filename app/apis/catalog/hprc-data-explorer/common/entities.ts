export interface HPRCDataExplorerRawSequencingData {
  accession: string | null;
  basecaller: string;
  basecallerModel: string;
  basecallerVersion: string;
  biosampleAccession: string;
  ccsAlgorithm: string;
  coverage: number | LABEL.NA;
  dataType: string;
  deepConsensusVersion: string;
  designDescription: string;
  familyId: string | null;
  filename: string;
  filetype: string;
  fiveHundredkbPlus: number | LABEL.NA;
  fourHundredkbPlus: number | LABEL.NA;
  Gb: number | LABEL.NA;
  generatorContact: string;
  generatorFacility: string;
  instrumentModel: string;
  libraryId: string;
  libraryLayout: string;
  librarySelection: string;
  librarySource: string;
  libraryStrategy: string;
  max: number | LABEL.NA;
  mean: number | LABEL.NA;
  metadataAccession: string;
  min: number | LABEL.NA;
  n25: number | LABEL.NA;
  n50: number | LABEL.NA;
  n75: number | LABEL.NA;
  notes: string;
  ntsmScore: number | LABEL.NA;
  oneHundredkbPlus: number | LABEL.NA;
  oneMbPlus: number | LABEL.NA;
  path: string;
  platform: string;
  polymeraseVersion: string;
  productionYear: string | null;
  quartile25: number | LABEL.NA;
  quartile50: number | LABEL.NA;
  quartile75: number | LABEL.NA;
  readN50: number | LABEL.NA;
  result: string;
  sampleId: string;
  seqKit: string;
  seqPlateChemistryVersion: string;
  shearMethod: string;
  sizeSelection: string;
  study: string;
  subpopulation: string | null;
  superpopulation: string | null;
  threeHundredkbPlus: number | LABEL.NA;
  totalBp: number | LABEL.NA;
  totalGbp: number | LABEL.NA;
  totalReads: number | LABEL.NA;
  twoHundredkbPlus: number | LABEL.NA;
  whales: number | LABEL.NA;
}

export interface HPRCDataExplorerAssembly {
  accession: string | null;
  asatAnnotationFile: string | null;
  awsFasta: string | null;
  catGenesChm13AnnotationFile: string | null;
  catGenesHg38AnnotationFile: string | null;
  dnaBrnnAnnotationFile: string | null;
  familyId: string | null;
  fastaSha256: string | null;
  flaggerAll: string | null;
  flaggerUnreliableOnly: string | null;
  flaggerUnreliableOnlyNoMT: string | null;
  frag: number | null;
  fullDup: number | null;
  fullSgl: number | null;
  gcpFasta: string | null;
  hammingErrRate: number | null;
  haplotype: string;
  hsatAnnotationFile: string | null;
  l50: number | null;
  n50: number | null;
  numContigs: number | null;
  productionYear: string | null;
  qv: number | string | null;
  repeatMaskerAnnotationFile: string | null;
  sampleId: string;
  segDupsAnnotationFile: string | null;
  subpopulation: string | null;
  superpopulation: string | null;
  switchErrRate: number | null;
  totalLen: number | null;
  trfAnnotationFile: string | null;
}

export interface HPRCDataExplorerPangenome {
  filename: string;
  loc: string;
  pipeline: string;
  referenceCoordinates: string | null;
  useCase: string[];
}

export enum LABEL {
  NA = "N/A",
}
