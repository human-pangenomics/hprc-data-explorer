export interface SourceRawSequencingData {
  "100kb+": string;
  "1Mb+": string;
  "200kb+": string;
  "300kb+": string;
  "400kb+": string;
  "500kb+": string;
  Accession: string;
  accession: string;
  assembly: string;
  basecaller: string;
  basecaller_model: string;
  basecaller_version: string;
  bioproject_accession: string;
  biosample_accession: string;
  ccs_algorithm: string;
  coverage: string;
  data_type: string;
  DeepConsensus_version: string;
  design_description: string;
  familyID: string;
  file_size: string;
  filename: string;
  filetype: string;
  Gb: string;
  generator_contact: string;
  generator_facility: string;
  instrument_model: string;
  library_ID: string;
  library_layout: string;
  library_selection: string;
  library_source: string;
  library_strategy: string;
  max: string;
  mean: string;
  min: string;
  MM_tag: string;
  N25: string;
  N50: string;
  N75: string;
  notes: string;
  ntsm_result: string;
  ntsm_score: string;
  path: string;
  platform: string;
  polymerase_version: string;
  "Production Year": string;
  quartile_25: string;
  quartile_50: string;
  quartile_75: string;
  read_N50: string;
  result: string;
  sample_ID: string;
  seq_kit: string;
  seq_plate_chemistry_version: string;
  shear_method: string;
  size_selection: string;
  study: string;
  Subpopulation: string;
  Superpopulation: string;
  title: string;
  total_bp: string;
  total_Gbp: string;
  total_reads: string;
  whales: string;
}

export interface SourceAssembly {
  Accession: string;
  aws_fasta: string;
  familyID: string;
  fasta_sha256: string;
  file_size: string;
  frag: string;
  full_dup: string;
  full_sgl: string;
  gcp_fasta: string;
  hamming_err_rate: string;
  haplotype: string;
  L50: string;
  N50: string;
  num_contigs: string;
  "Production Year": string;
  qv: string;
  sample: string;
  Subpopulation: string;
  Superpopulation: string;
  switch_err_rate: string;
  total_len: string;
}

export interface SourceAnnotation {
  annotation_type: string;
  file_location: string;
  file_size: string;
  haplotype: string;
  reference: string;
  sample: string;
}

export interface SourceAlignment {
  alignment: string;
  file: string;
  file_size: string;
  loc: string;
  pipeline: string;
  reference_coordinates: string;
  use_case: string;
  version: string;
}
