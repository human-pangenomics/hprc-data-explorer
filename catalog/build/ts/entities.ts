import { SOURCE_RAW_SEQUENCING_DATA_KEYS } from "./constants";

type BiosampleKey =
  | "sample_id"
  | "biosample_id"
  | "population_descriptor"
  | "population_abbreviation"
  | "trio_available"
  | "family_id"
  | "paternal_id"
  | "maternal_id"
  | "sex"
  | "tissue"
  | "collection"
  | "alternative_id"
  | "notes";

type KeyFileSize = "file_size";

type KeyRelease = "release";

export type SourceRawSequencingDataKey =
  (typeof SOURCE_RAW_SEQUENCING_DATA_KEYS)[number];

type AssemblySchemaKey =
  | "sample_id"
  | "assembly_name"
  | "haplotype"
  | "phasing"
  | "assembly_method"
  | "assembly_method_version"
  | "assembly_date"
  | "genbank_accession"
  | "assembly_md5"
  | "assembly_fai"
  | "assembly_gzi"
  | "assembly"
  | "fasta_sha256";

export type SourceAssemblyKey =
  | AssemblySchemaKey
  | BiosampleKey
  | KeyFileSize
  | KeyRelease;
