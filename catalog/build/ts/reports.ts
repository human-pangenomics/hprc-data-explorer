import fsp from "fs/promises";
import path from "path";
import { readJson, saveJson } from "./utils";

const ENTITY_TYPE_KEYS = [
  "samples",
  "sequencingData",
  "assemblies",
  "annotations",
  "alignments",
] as const;

type EntityTypeKey = (typeof ENTITY_TYPE_KEYS)[number];

type EntityTypeMapping<T> = { [K in EntityTypeKey]: T };

type DeduplicatedIds = EntityTypeMapping<string[]>;

export type MissingSamples = EntityTypeMapping<string[] | null>;

interface CatalogConversionReport {
  deduplicatedIds: DeduplicatedIds;
  missingSamples: MissingSamples;
}

interface EntityNormalizationReport {
  validation_errors: Array<{
    filename: string;
    errors: string[];
  }>;
  file_uri_errors: Array<{
    uri: string;
    message: string;
  }> | null;
}

const REPORTS_PATH = "./catalog/build/reports";
const REPORTS_DATA_PATH = path.resolve(REPORTS_PATH, "data");
const CONVERSION_REPORT_NAME = "conversion.json";

const NORMALIZATION_REPORT_NAMES: EntityTypeMapping<string> = {
  alignments: "normalization_alignments.json",
  annotations: "normalization_annotations.json",
  assemblies: "normalization_assemblies.json",
  samples: "normalization_samples.json",
  sequencingData: "normalization_sequencing_data.json",
};

const CATALOG_REPORT_NAME = "catalog-build-report.md";

const ENTITY_TYPE_TITLES: EntityTypeMapping<string> = {
  alignments: "Alignments",
  annotations: "Annotations",
  assemblies: "Assemblies",
  samples: "Samples",
  sequencingData: "Raw sequencing data",
};

const ID_FUNCTIONS_FOLDER_PATH_FROM_REPORT =
  "../../../app/apis/catalog/hprc-data-explorer/common";
const ID_FUNCTIONS_FILE_NAME = "utils.ts";
const CATALOG_REPORT_NOTES_TEXT = `
- As catalog build scripts may be run independently of each other, some parts of this report may be more up-to-date than others, although they should all be applicable to what's displayed in the app as long as \`npm run build-catalog\` is the most recent catalog build script to have been run.
- For reference when considering duplicated entity IDs, the functions used to generate IDs can be found in [${ID_FUNCTIONS_FILE_NAME}](${ID_FUNCTIONS_FOLDER_PATH_FROM_REPORT}/${ID_FUNCTIONS_FILE_NAME}).
`.trim();

export async function saveCatalogConversionReport(
  report: CatalogConversionReport
): Promise<void> {
  await saveJson(
    path.resolve(REPORTS_DATA_PATH, CONVERSION_REPORT_NAME),
    report
  );
}

export async function generateCatalogBuildReport(): Promise<void> {
  const conversionReport = await readJson<CatalogConversionReport>(
    path.resolve(REPORTS_DATA_PATH, CONVERSION_REPORT_NAME)
  );

  let report = `# Catalog build report\n\n## Notes\n\n${CATALOG_REPORT_NOTES_TEXT}`;

  for (const entityType of ENTITY_TYPE_KEYS) {
    // Add report section for an entity type

    const normalizationReport = await readJson<EntityNormalizationReport>(
      path.resolve(REPORTS_DATA_PATH, NORMALIZATION_REPORT_NAMES[entityType])
    );

    report += `\n\n## ${ENTITY_TYPE_TITLES[entityType]}`;

    // Validation errors
    const filesWithErrors = normalizationReport.validation_errors.filter(
      (fileInfo) => fileInfo.errors.length
    );
    report += `\n\n### Validation errors\n\n${generateListOrNone(
      filesWithErrors,
      ({ filename, errors }) => {
        return `${filename}:\n${generateStringList(errors, "  ")}`;
      }
    )}`;

    // File URI errors
    if (normalizationReport.file_uri_errors !== null) {
      report += `\n\n### File URI errors\n\n${generateListOrNone(normalizationReport.file_uri_errors, ({ uri, message }) => `\`${uri}\`: ${message}`)}`;
    }

    // Missing samples
    const missingSamples = conversionReport.missingSamples[entityType];
    if (missingSamples !== null) {
      report += `\n\n### Linked samples not found in samples list\n\n${generateStringListOrNone(missingSamples)}`;
    }

    // Deduplicated IDs
    const dedupedIds = conversionReport.deduplicatedIds[entityType];
    report += `\n\n### Duplicated IDs for which entities were removed\n\n${generateStringListOrNone(dedupedIds)}`;
  }

  await fsp.writeFile(path.resolve(REPORTS_PATH, CATALOG_REPORT_NAME), report);

  console.log("Updated catalog build report");
}

function generateStringListOrNone(arr: string[], indent?: string): string {
  return generateListOrNone(arr, (s) => s, indent);
}

function generateStringList(arr: string[], indent?: string): string {
  return generateList(arr, (s) => s, indent);
}

function generateListOrNone<T>(
  arr: T[],
  getItemText: (v: T) => string,
  indent?: string
): string {
  if (arr.length === 0) return "None";
  return generateList(arr, getItemText, indent);
}

function generateList<T>(
  arr: T[],
  getItemText: (v: T) => string,
  indent = ""
): string {
  return arr.map((v) => `${indent}- ${getItemText(v)}`).join("\n");
}
