import {
  AssembliesSlotName,
  SequencingDataSlotName,
} from "catalog/schema/generated/schema";

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
  | SequencingDataSlotName
  | BiosampleKey
  | KeyFileSize;

export type SourceAssemblyKey =
  | AssembliesSlotName
  | BiosampleKey
  | KeyFileSize
  | KeyRelease;
