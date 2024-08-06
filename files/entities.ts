export interface SourceRawSequencingData {
  data_type: string;
  design_description: string;
  filename: string;
  generator_contact: string;
  generator_facility: string;
  instrument_model: string;
  library_ID: string;
  library_layout: string;
  library_selection: string;
  library_source: string;
  library_strategy: string;
  notes: string;
  path: string;
  platform: string;
  sample_ID: string;
  shear_method: string;
  size_selection: string;
}

export interface SourceAssembly {
  Accession: string;
  "ASat-annotation-file": string;
  aws_fasta: string;
  CAT_genes_chm13_annotation_file: string;
  CAT_genes_hg38_annotation_file: string;
  DNA_BRNN_annotation_file: string;
  familyID: string;
  fasta_sha256: string;
  Flagger_annotation_file: string;
  frag: string;
  full_dup: string;
  full_sgl: string;
  gcp_fasta: string;
  hamming_err_rate: string;
  haplotype: string;
  HSat_annotation_file: string;
  L50: string;
  N50: string;
  num_contigs: string;
  "Production Year": string;
  qv: string;
  Repeat_masker_annotation_file: string;
  sample: string;
  Seg_Dups_annotation_file: string;
  Subpopulation: string;
  Superpopulation: string;
  switch_err_rate: string;
  total_len: string;
  TRF_annotation_file: string;
}
