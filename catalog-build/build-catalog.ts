import { parse as parseCsv } from "csv-parse/sync";
import fsp from "fs/promises";
import {
  HPRCDataExplorerAlignment,
  HPRCDataExplorerAnnotation,
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
  LABEL,
} from "../app/apis/catalog/hprc-data-explorer/common/entities";
import {
  getAlignmentId,
  getAnnotationId,
  getAssemblyId,
  getRawSequencingDataId,
} from "../app/apis/catalog/hprc-data-explorer/common/utils";
import {
  HAPLOTYPE_BY_ID,
  SOURCE_ALIGNMENT_KEYS,
  SOURCE_ANNOTATION_KEYS,
  SOURCE_ASSEMBLY_KEYS,
  SOURCE_RAW_SEQUENCING_DATA_KEYS,
} from "./constants";

const CATALOG_DIR = "catalog";

const SOURCE_PATH_RAW_SEQUENCING_DATA =
  "catalog-build/source/sequencing-data.csv";
const SOURCE_PATH_ASSEMBLIES = "catalog-build/source/assemblies.csv";
const SOURCE_PATH_ANNOTATIONS = "catalog-build/source/annotations.csv";
const SOURCE_PATH_ALIGNMENTS = "catalog-build/source/alignments.csv";

buildCatalog();

async function buildCatalog(): Promise<void> {
  console.log("Building catalog...");
  const rawSequencingData = await buildRawSequencingData();
  const assemblies = await buildAssemblies();
  const annotations = await buildAnnotations();
  const alignments = await buildAlignments();

  verifyUniqueIds(
    "raw sequencing data",
    rawSequencingData,
    getRawSequencingDataId
  );
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
  const sourceRows = await readValuesFile(
    SOURCE_PATH_RAW_SEQUENCING_DATA,
    SOURCE_RAW_SEQUENCING_DATA_KEYS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerRawSequencingData => ({
      Gb: LABEL.NA,
      accession: parseStringOrNull(row.accession),
      basecaller: parseStringOrNull(row.basecaller),
      basecallerModel: parseStringOrNull(row.basecaller_model),
      basecallerVersion: parseStringOrNull(row.basecaller_version),
      bioprojectAccession: parseStringOrNull(row.bioproject_accession),
      biosampleAccession: parseStringOrNull(row.biosample_accession),
      ccsAlgorithm: parseStringOrNull(row.ccs_algorithm),
      coverage: parseNumberOrNA(row.coverage).toString(),
      dataType: parseStringOrNull(row.data_type),
      deepConsensusVersion: parseStringOrNull(row.DeepConsensus_version),
      designDescription: parseStringOrNull(row.design_description),
      familyId: parseStringOrNull(row.family_id),
      fileSize: parseNumberOrNA(row.file_size).toString(),
      filename: row.filename,
      filetype: parseStringOrNull(row.filetype),
      fiveHundredkbPlus: parseNumberOrNA(row["500kb+"]).toString(),
      fourHundredkbPlus: parseNumberOrNA(row["400kb+"]).toString(),
      generatorContact: parseStringOrNull(row.generator_contact),
      generatorFacility: parseStringOrNull(row.generator_facility),
      instrumentModel: parseStringOrNull(row.instrument_model),
      libraryId: parseStringOrNull(row.library_ID),
      libraryLayout: parseStringOrNull(row.library_layout),
      librarySelection: parseStringOrNull(row.library_selection),
      librarySource: parseStringOrNull(row.library_source),
      libraryStrategy: parseStringOrNull(row.library_strategy),
      max: parseNumberOrNA(row.max).toString(),
      mean: parseNumberOrNA(row.mean).toString(),
      metadataAccession: parseStringOrNull(row.accession),
      min: parseNumberOrNA(row.min).toString(),
      mmTag: parseBooleanOrNaOrNull(row.MM_tag),
      n25: parseNumberOrNA(row.N25).toString(),
      n50: parseNumberOrNA(row.N50).toString(),
      n75: parseNumberOrNA(row.N75).toString(),
      notes: parseStringOrNull(row.notes),
      ntsmScore: parseNumberOrNAOrNull(row.ntsm_score)?.toString() ?? null,
      oneHundredkbPlus: parseNumberOrNA(row["100kb+"]).toString(),
      oneMbPlus: parseNumberOrNA(row["1Mb+"]).toString(),
      path: row.path,
      platform: parseStringOrNull(row.platform),
      polymeraseVersion: parseStringOrNull(row.polymerase_version),
      populationAbbreviation: parseStringOrNull(row.population_abbreviation),
      populationDescriptor: parseStringOrNull(row.population_descriptor),
      quartile25: parseNumberOrNA(row.quartile_25).toString(),
      quartile50: parseNumberOrNA(row.quartile_50).toString(),
      quartile75: parseNumberOrNA(row.quartile_75).toString(),
      readN50: LABEL.NA,
      sampleId: row.sample_ID,
      seqKit: parseStringOrNull(row.seq_kit),
      seqPlateChemistryVersion: parseStringOrNull(
        row.seq_plate_chemistry_version
      ),
      shearMethod: parseStringOrNull(row.shear_method),
      sizeSelection: parseStringOrNull(row.size_selection),
      study: parseStringOrNull(row.study),
      threeHundredkbPlus: parseNumberOrNA(row["300kb+"]).toString(),
      title: parseStringOrNull(row.title),
      totalBp: parseNumberOrNA(row.total_bp).toString(),
      totalGbp: parseNumberOrNA(row.total_Gbp).toString(),
      totalReads: parseNumberOrNA(row.total_reads).toString(),
      twoHundredkbPlus: parseNumberOrNA(row["200kb+"]).toString(),
      whales: parseNumberOrNA(row.whales).toString(),
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
      accession: parseStringOrNull(row.biosample_id),
      awsFasta: parseStringOrNull(row.assembly),
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
      fileLocation: row.file_location,
      fileSize: parseNumberOrNA(row.file_size).toString(),
      filename: getFileNameFromPath(row.file_location),
      haplotype: parseStringOrNull(row.haplotype),
      reference: parseStringOrNull(row.reference),
      sampleId: row.sample,
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

function parseBooleanOrNaOrNull(value: string): boolean | LABEL.NA | null {
  value = value.trim();
  if (!value) return null;
  return parseBooleanOrNa(value);
}

function parseBooleanOrNa(value: string): boolean | LABEL.NA {
  value = value.trim();
  if (value === LABEL.NA) return LABEL.NA;
  if (value === "True") return true;
  if (value === "False") return false;
  throw new Error(`Invalid boolean value: ${JSON.stringify(value)}`);
}
