export interface HPRCDataExplorerRawSequencingData {
  accession: string | null;
  dataType: string;
  designDescription: string;
  familyId: string | null;
  filename: string;
  generatorContact: string;
  generatorFacility: string;
  instrumentModel: string;
  libraryId: string;
  libraryLayout: string;
  librarySelection: string;
  librarySource: string;
  libraryStrategy: string;
  notes: string;
  path: string;
  platform: string;
  productionYear: string | null;
  sampleId: string;
  shearMethod: string;
  sizeSelection: string;
  subpopulation: string | null;
  superpopulation: string | null;
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
  flaggerAnnotationFile: string | null;
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
  filename: string | null;
  loc: string;
  pipeline: string;
  referenceCoordinates: string;
  useCase: string[];
}
