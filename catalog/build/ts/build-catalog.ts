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
import { HAPLOTYPE_BY_ID } from "./constants";
import {
  SourceAlignmentKey,
  SourceAnnotationKey,
  SourceAssemblyKey,
  SourceRawSequencingDataKey,
} from "./entities";

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
  const assemblies = enforceUniqueIds(
    "assemblies",
    await buildAssemblies(),
    getAssemblyId
  );
  const annotations = enforceUniqueIds(
    "annotations",
    await buildAnnotations(),
    getAnnotationId
  );
  const alignments = enforceUniqueIds(
    "alignments",
    await buildAlignments(),
    getAlignmentId
  );

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
      familyId: parseStringOrAbsent(row.family_id),
      filename: parseStringOrAbsent(row.filename),
      filetype: parseStringOrAbsent(row.filetype),
      generatorContact: parseStringOrAbsent(row.generator_contact),
      generatorFacility: parseStringOrAbsent(row.generator_facility),
      instrumentModel: parseStringOrAbsent(row.instrument_model),
      librarySource: parseStringOrAbsent(row.library_source),
      libraryStrategy: parseStringOrAbsent(row.library_strategy),
      mmTag: parseBooleanOrAbsent(row.mm_tag),
      n50: parseNumberOrAbsent(row.n50),
      oneHundredkbPlus: parseNumberOrAbsent(row.coverage_over_100kb),
      path: parseStringOrAbsent(row.path),
      platform: parseStringOrAbsent(row.platform),
      populationAbbreviation: parseStringOrAbsent(row.population_abbreviation),
      populationDescriptor: parseStringOrAbsent(row.population_descriptor),
      sampleId: parseStringOrAbsent(row.sample_id),
      study: parseStringOrAbsent(row.study),
      totalGbp: parseNumberOrAbsent(row.total_gbp),
      totalReads: parseNumberOrAbsent(row.total_reads),
      whales: parseNumberOrAbsent(row.whales),
    })
  );
  return mappedRows.sort((a, b) =>
    getRawSequencingDataId(a).localeCompare(getRawSequencingDataId(b))
  );
}

async function buildAssemblies(): Promise<HPRCDataExplorerAssembly[]> {
  const sourceRows = await readUnknownValuesFile<SourceAssemblyKey>(
    SOURCE_PATH_ASSEMBLIES
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAssembly => ({
      awsFasta: parseStringOrAbsent(row.assembly),
      biosampleAccession: parseStringOrAbsent(row.biosample_id),
      familyId: parseStringOrAbsent(row.family_id),
      fastaMd5: parseStringOrAbsent(row.assembly_md5),
      fastaSha256: parseStringOrAbsent(row.fasta_sha256),
      fileSize: parseNumberOrAbsent(row.file_size),
      filename: parseStringOrAbsent(row.assembly, getFileNameFromPath),
      haplotype: parseStringOrAbsent(
        row.haplotype,
        (id) => HAPLOTYPE_BY_ID[id] ?? id
      ),
      populationAbbreviation: parseStringOrAbsent(row.population_abbreviation),
      populationDescriptor: parseStringOrAbsent(row.population_descriptor),
      release: parseStringOrAbsent(row.release),
      sampleId: parseStringOrAbsent(row.sample_id),
    })
  );
  return mappedRows.sort((a, b) =>
    getAssemblyId(a).localeCompare(getAssemblyId(b))
  );
}

async function buildAnnotations(): Promise<HPRCDataExplorerAnnotation[]> {
  const sourceRows = await readUnknownValuesFile<SourceAnnotationKey>(
    SOURCE_PATH_ANNOTATIONS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAnnotation => ({
      annotationType: parseStringOrAbsent(row.annotation_type),
      fileLocation: parseStringOrAbsent(row.location),
      fileSize: parseNumberOrAbsent(row.file_size),
      filename: parseStringOrAbsent(row.location, getFileNameFromPath),
      haplotype: parseStringOrAbsent(
        row.haplotype,
        (id) => HAPLOTYPE_BY_ID[id] ?? id
      ),
      release: parseStringOrAbsent(row.release),
      sampleId: parseStringOrAbsent(row.sample_id),
    })
  );
  return mappedRows.sort((a, b) =>
    getAnnotationId(a).localeCompare(getAnnotationId(b))
  );
}

async function buildAlignments(): Promise<HPRCDataExplorerAlignment[]> {
  const sourceRows = await readUnknownValuesFile<SourceAlignmentKey>(
    SOURCE_PATH_ALIGNMENTS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAlignment => ({
      alignment: parseStringOrAbsent(row.alignment),
      fileSize: parseNumberOrAbsent(row.file_size),
      filename: parseStringOrAbsent(row.file),
      filetype: parseStringOrAbsent(row.file, getTypeFromFilename),
      loc: parseStringOrAbsent(row.loc),
      pipeline: parseStringOrAbsent(row.pipeline),
      referenceCoordinates: parseStringOrAbsent(row.reference_coordinates),
      version: parseStringOrAbsent(row.version),
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

async function saveJson(filePath: string, data: unknown): Promise<void> {
  await fsp.writeFile(filePath, JSON.stringify(data, undefined, 2));
}

function getFileNameFromPath(p: string): string {
  return p.substring(p.lastIndexOf("/") + 1);
}

/**
 * Parse a string value that may be unspecified or N/A.
 * @param value - Potentially-undefined string value to parse.
 * @param mapper - Function to apply to a non-absent value before returning.
 * @returns string adjusted to label unspecified values.
 */
function parseStringOrAbsent(
  value: string | undefined,
  mapper?: (v: string) => string
): string {
  if (value === LABEL.NA) return value;
  if (!value) return LABEL.UNSPECIFIED;
  return mapper ? mapper(value) : value;
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
