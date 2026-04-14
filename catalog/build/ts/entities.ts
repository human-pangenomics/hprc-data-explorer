import {
  AlignmentsSlotName,
  AnnotationsSlotName,
  AssembliesSlotName,
  SamplesSlotName,
  SequencingDataSlotName,
} from "catalog/schema/generated/schema";

type KeyAnnotationType = "annotation_type";

type KeyBrowser = "browser";

type KeyFileSize = "file_size";

type KeyRelease = "release";

export type SourceSampleKey = SamplesSlotName;

export type SourceRawSequencingDataKey = SequencingDataSlotName | KeyFileSize;

export type SourceAssemblyKey =
  | AssembliesSlotName
  | KeyFileSize
  | KeyRelease
  | KeyBrowser;

export type SourceAnnotationKey =
  | AnnotationsSlotName
  | KeyAnnotationType
  | KeyFileSize
  | KeyRelease;

export type SourceAlignmentKey = AlignmentsSlotName;
