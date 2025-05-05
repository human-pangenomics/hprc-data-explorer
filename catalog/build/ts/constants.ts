export const SOURCE_ALIGNMENT_KEYS = [
  "alignment",
  "file",
  "file_size",
  "loc",
  "pipeline",
  "reference_coordinates",
  "use_case",
  "version",
] as const;

export const HAPLOTYPE_BY_ID: Record<string, string> = {
  1: "paternal",
  2: "maternal",
};
