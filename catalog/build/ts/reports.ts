import path from "path";
import { saveJson } from "./utils";

const ENTITY_TYPE_KEYS = [
  "samples",
  "sequencingData",
  "assemblies",
  "annotations",
  "alignments",
] as const;

type EntityTypeKey = (typeof ENTITY_TYPE_KEYS)[number];

type DeduplicatedIds = { [K in EntityTypeKey]: string[] };

export type MissingSamples = { [K in EntityTypeKey]: string[] | null };

interface CatalogConversionReport {
  deduplicatedIds: DeduplicatedIds;
  missingSamples: MissingSamples;
}

const REPORTS_PATH = "./catalog/build/reports";
const REPORTS_DATA_PATH = path.resolve(REPORTS_PATH, "data");
const CONVERSION_REPORT_NAME = "conversion.json";

export async function saveCatalogConversionReport(
  report: CatalogConversionReport
): Promise<void> {
  await saveJson(
    path.resolve(REPORTS_DATA_PATH, CONVERSION_REPORT_NAME),
    report
  );
}
