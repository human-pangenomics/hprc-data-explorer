import { parse as parseCsv } from "csv-parse/sync";
import fsp from "fs/promises";
import {
  HPRCDataExplorerAlignment,
  HPRCDataExplorerAnnotation,
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
  LABEL,
} from "../../../app/apis/catalog/hprc-data-explorer/common/entities";
import {
  getAlignmentId,
  getAnnotationId,
  getAssemblyId,
  getRawSequencingDataId,
} from "../../../app/apis/catalog/hprc-data-explorer/common/utils";
import {
  HAPLOTYPE_BY_ID,
  SOURCE_ALIGNMENT_KEYS,
  SOURCE_ANNOTATION_KEYS,
  SOURCE_ASSEMBLY_KEYS,
} from "./constants";
import { SourceRawSequencingDataKey } from "./entities";

const CATALOG_DIR = "catalog/output";

const SOURCE_PATH_RAW_SEQUENCING_DATA =
  "catalog/build/intermediate/sequencing-data.csv";
const SOURCE_PATH_ASSEMBLIES = "catalog/build/intermediate/assemblies.csv";
const SOURCE_PATH_ANNOTATIONS = "catalog/build/intermediate/annotations.csv";
const SOURCE_PATH_ALIGNMENTS = "catalog/build/intermediate/alignments.csv";

buildCatalog();

async function buildCatalog(): Promise<void> {
  console.log("Building catalog...");
  const rawSequencingData = enforceUniqueIds(
    "raw sequencing data",
    await buildRawSequencingData(),
    getRawSequencingDataId
  );
  const assemblies = await buildAssemblies();
  const annotations = await buildAnnotations();
  const alignments = await buildAlignments();

  verifyUniqueIds("assembly", assemblies, getAssemblyId);
  verifyUniqueIds("annotation", annotations, getAnnotationId);
  verifyUniqueIds("alignment", alignments, getAlignmentId);

  console.log("Sequencing data:", rawSequencingData.length);
  await saveJson(`${CATALOG_DIR}/sequencing-data.json`, rawSequencingData);

  console.log("Assemblies:", assemblies.length);
  await saveJson(`${CATALOG_DIR}/assemblies.json`, assemblies);

  console.log("Annotations:", annotations.length);
  await saveJson(`${CATALOG_DIR}/annotations.json`, annotations);

  console.log("Alignments:", alignments.length);
  await saveJson(`${CATALOG_DIR}/alignments.json`, alignments);

  console.log("Done");
}

async function buildRawSequencingData(): Promise<
  HPRCDataExplorerRawSequencingData[]
> {
  const sourceRows = await readUnknownValuesFile<SourceRawSequencingDataKey>(
    SOURCE_PATH_RAW_SEQUENCING_DATA
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerRawSequencingData => ({
      basecaller: parseStringOrAbsent(row.basecaller),
      basecallerModel: parseStringOrAbsent(row.basecaller_model),
      basecallerVersion: parseStringOrAbsent(row.basecaller_version),
      bioprojectAccession: parseStringOrAbsent(row.bioproject_accession),
      biosampleAccession: parseStringOrAbsent(row.biosample_id),
      ccsAlgorithm: parseStringOrAbsent(row.ccs_algorithm),
      coverage: parseNumberOrAbsent(row.coverage),
      deepConsensusVersion: parseStringOrAbsent(row.DeepConsensus_version),
      familyId: parseStringOrAbsent(row.family_id),
      filename: parseStringOrAbsent(row.filename),
      filetype: parseStringOrAbsent(row.filetype),
      generatorContact: parseStringOrAbsent(row.generator_contact),
      generatorFacility: parseStringOrAbsent(row.generator_facility),
      instrumentModel: parseStringOrAbsent(row.instrument_model),
      librarySource: parseStringOrAbsent(row.library_source),
      libraryStrategy: parseStringOrAbsent(row.library_strategy),
      mmTag: parseBooleanOrAbsent(row.MM_tag),
      n50: parseNumberOrAbsent(row.N50),
      oneHundredkbPlus: parseNumberOrAbsent(row.coverage_100kb_plus),
      path: parseStringOrAbsent(row.path),
      platform: parseStringOrAbsent(row.platform),
      populationAbbreviation: parseStringOrAbsent(row.population_abbreviation),
      populationDescriptor: parseStringOrAbsent(row.population_descriptor),
      sampleId: parseStringOrAbsent(row.sample_ID),
      study: parseStringOrAbsent(row.study),
      totalGbp: parseNumberOrAbsent(row.total_Gbp),
      totalReads: parseNumberOrAbsent(row.total_reads),
      whales: parseNumberOrAbsent(row.whales),
    })
  );
  return mappedRows.sort((a, b) =>
    getRawSequencingDataId(a).localeCompare(getRawSequencingDataId(b))
  );
}

async function buildAssemblies(): Promise<HPRCDataExplorerAssembly[]> {
  const sourceRows = await readValuesFile(
    SOURCE_PATH_ASSEMBLIES,
    SOURCE_ASSEMBLY_KEYS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAssembly => ({
      awsFasta: parseStringOrNull(row.assembly),
      biosampleAccession: parseStringOrNull(row.biosample_id),
      familyId: parseStringOrNull(row.family_id),
      fastaMd5: row.assembly_md5,
      fastaSha256: parseStringOrNull(row.fasta_sha256),
      fileSize: parseNumberOrNA(row.file_size).toString(),
      filename: getFileNameFromPath(row.assembly),
      haplotype: HAPLOTYPE_BY_ID[row.haplotype] ?? row.haplotype,
      populationAbbreviation: parseStringOrNull(row.population_abbreviation),
      populationDescriptor: parseStringOrNull(row.population_descriptor),
      release: row.release,
      sampleId: row.sample_id,
    })
  );
  return mappedRows.sort((a, b) =>
    getAssemblyId(a).localeCompare(getAssemblyId(b))
  );
}

async function buildAnnotations(): Promise<HPRCDataExplorerAnnotation[]> {
  const sourceRows = await readValuesFile(
    SOURCE_PATH_ANNOTATIONS,
    SOURCE_ANNOTATION_KEYS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAnnotation => ({
      annotationType: row.annotation_type,
      fileLocation: row.location,
      fileSize: parseNumberOrNA(row.file_size).toString(),
      filename: getFileNameFromPath(row.location),
      haplotype: HAPLOTYPE_BY_ID[row.haplotype] ?? row.haplotype,
      release: row.release,
      sampleId: row.sample_id,
    })
  );
  return mappedRows.sort((a, b) =>
    getAnnotationId(a).localeCompare(getAnnotationId(b))
  );
}

async function buildAlignments(): Promise<HPRCDataExplorerAlignment[]> {
  const sourceRows = await readValuesFile(
    SOURCE_PATH_ALIGNMENTS,
    SOURCE_ALIGNMENT_KEYS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAlignment => ({
      alignment: row.alignment,
      fileSize: parseNumber(row.file_size),
      filename: row.file,
      filetype: getTypeFromFilename(row.file),
      loc: row.loc,
      pipeline: row.pipeline,
      referenceCoordinates: parseStringOrNull(row.reference_coordinates),
      useCase: parseStringArray(row.use_case),
      version: parseStringOrNull(row.version),
    })
  );
  return mappedRows.sort((a, b) => a.loc.localeCompare(b.loc));
}

function enforceUniqueIds<T>(
  pluralEntityName: string,
  entities: T[],
  getId: (entity: T) => string
): T[] {
  const foundIds = new Set<string>();
  const deduplicatedIds = new Set<string>();
  const filteredEntities: T[] = [];
  for (const entity of entities) {
    const id = getId(entity);
    if (foundIds.has(id)) {
      deduplicatedIds.add(id);
    } else {
      filteredEntities.push(entity);
      foundIds.add(id);
    }
  }
  if (deduplicatedIds.size)
    console.warn(
      `Removed ${pluralEntityName} with duplicate IDs: ${Array.from(deduplicatedIds).join(", ")}`
    );
  return filteredEntities;
}

/**
 * Take a list of entities and check for duplicate IDs, as calculated by the given function, and throw an error if there are any.
 * @param entityName - Name of the entity type, to use in the error message.
 * @param entities - Array of entities.
 * @param getId - Function to get an entity's ID.
 */
function verifyUniqueIds<T>(
  entityName: string,
  entities: T[],
  getId: (entity: T) => string
): void {
  const idCounts = new Map<string, number>();
  for (const entity of entities) {
    const id = getId(entity);
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
  }
  const duplicateIdEntries = Array.from(idCounts.entries()).filter(
    ([, count]) => count > 1
  );
  if (duplicateIdEntries.length > 0) {
    const duplicateIds = duplicateIdEntries.map(([id]) => id);
    throw new Error(
      `Duplicate ${entityName} IDs found: ${duplicateIds.join(", ")}`
    );
  }
}

function getTypeFromFilename(name: string): string {
  return /\.([^.]*)(?:$|\.gz$)/.exec(name)?.[1].toLowerCase() || "N/A";
}

async function readUnknownValuesFile<TAccessedKeys extends string>(
  filePath: string,
  delimiter = ","
): Promise<Partial<Record<TAccessedKeys, string>>[]> {
  const content = await fsp.readFile(filePath, "utf8");
  return parseCsv(content, {
    columns: true,
    delimiter,
    relax_quotes: true,
  });
}

async function readValuesFile<T extends string>(
  filePath: string,
  columnNames: string extends T ? never : T[] | readonly T[], // Ensure that the type includes specific string values, rather than just being `string[]`, which would cause the return type to be the overly-broad `Record<string, string>[]`.
  delimiter = ","
): Promise<Record<T, string>[]> {
  const content = await fsp.readFile(filePath, "utf8");
  const rows = parseCsv(content, {
    columns: true,
    delimiter,
    relax_quotes: true,
  });
  if (rows.length > 0) {
    for (const name of columnNames) {
      if (!Object.hasOwn(rows[0], name))
        throw new Error(
          `Missing column ${JSON.stringify(name)} in ${filePath}`
        );
    }
  }
  return rows;
}

async function saveJson(filePath: string, data: unknown): Promise<void> {
  await fsp.writeFile(filePath, JSON.stringify(data, undefined, 2));
}

function getFileNameFromPath(p: string): string {
  return p.substring(p.lastIndexOf("/") + 1);
}

/**
 * Parse a string value that may be unspecified or N/A.
 * @param value - Potentially-undefined string value to parse.
 * @returns string adjusted to label unspecified values.
 */
function parseStringOrAbsent(value: string | undefined): string {
  return value?.trim() || LABEL.UNSPECIFIED;
}

/**
 * Parse a number value that may be unspecified or N/A, treating invalid values as unspecified.
 * @param value - Potentially-undefined string value to parse.
 * @returns number, unspecified, or N/A.
 */
function parseNumberOrAbsent(
  value: string | undefined
): number | LABEL.NA | LABEL.UNSPECIFIED {
  value = value?.trim();
  if (!value) return LABEL.UNSPECIFIED;
  if (value === LABEL.NA) return value;
  const n = Number(value);
  if (isNaN(n)) {
    console.warn(`Invalid number value: ${JSON.stringify(value)}`);
    return LABEL.UNSPECIFIED;
  }
  return n;
}

/**
 * Parse a boolean value that may be unspecified or N/A, treating invalid values as unspecified.
 * @param value - Potentially-undefined string value to parse.
 * @returns boolean, unspecified, or N/A.
 */
function parseBooleanOrAbsent(
  value: string | undefined
): boolean | LABEL.NA | LABEL.UNSPECIFIED {
  value = value?.trim();
  if (!value) return LABEL.UNSPECIFIED;
  if (value === LABEL.NA) return value;
  const lower = value.toLowerCase();
  if (lower === "true") return true;
  if (lower === "false") return false;
  console.warn(`Invalid boolean value: ${JSON.stringify(value)}`);
  return LABEL.UNSPECIFIED;
}

function parseStringOrNull(value: string): string | null {
  return value.trim() || null;
}

function parseNumber(value: string): number {
  const n = parseNumberOrNull(value);
  if (n === null)
    throw new Error(`Invalid number value: ${JSON.stringify(value)}`);
  return n;
}

function parseNumberOrNull(value: string): number | null {
  value = value.trim();
  if (!value) return null;
  const n = Number(value);
  if (isNaN(n))
    throw new Error(`Invalid number value: ${JSON.stringify(value)}`);
  return n;
}

function parseNumberOrNAOrNull(value: string): number | LABEL.NA | null {
  value = value.trim();
  if (!value) return null;
  return parseNumberOrNA(value);
}

function parseNumberOrNA(value: string): number | LABEL.NA {
  value = value.trim();
  if (value === LABEL.NA) return value;
  const n = Number(value);
  if (!value || isNaN(n))
    throw new Error(`Invalid number value: ${JSON.stringify(value)}`);
  return n;
}

function parseStringArray(value: string): string[] {
  const items: string[] = [];
  for (const sourceItem of value.split(",")) {
    const item = sourceItem.trim();
    if (item) items.push(item);
  }
  return items;
}

function parseBooleanOrNa(value: string): boolean | LABEL.NA {
  value = value.trim();
  if (value === LABEL.NA) return LABEL.NA;
  if (value === "True") return true;
  if (value === "False") return false;
  throw new Error(`Invalid boolean value: ${JSON.stringify(value)}`);
}
