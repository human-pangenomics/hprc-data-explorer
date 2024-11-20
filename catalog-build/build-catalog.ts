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
  getAnnotationId,
  getAssemblyId,
  getRawSequencingDataId,
} from "../app/apis/catalog/hprc-data-explorer/common/utils";
import {
  SourceAlignment,
  SourceAnnotation,
  SourceAssembly,
  SourceRawSequencingData,
} from "./entities";

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
  const sourceRows = await readValuesFile<SourceRawSequencingData>(
    SOURCE_PATH_RAW_SEQUENCING_DATA
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerRawSequencingData => ({
      Gb: LABEL.NA,
      accession: parseStringOrNull(row.Accession),
      assembly: parseStringOrNull(row.assembly),
      basecaller: row.basecaller,
      basecallerModel: row.basecaller_model,
      basecallerVersion: row.basecaller_version,
      bioprojectAccession: row.bioproject_accession,
      biosampleAccession: row.biosample_accession,
      ccsAlgorithm: row.ccs_algorithm,
      coverage: parseNumberOrNA(row.coverage).toString(),
      dataType: row.data_type,
      deepConsensusVersion: row.DeepConsensus_version,
      designDescription: row.design_description,
      familyId: parseStringOrNull(row.familyID),
      filename: row.filename,
      filetype: row.filetype,
      fiveHundredkbPlus: parseNumberOrNA(row["500kb+"]).toString(),
      fourHundredkbPlus: parseNumberOrNA(row["400kb+"]).toString(),
      generatorContact: row.generator_contact,
      generatorFacility: row.generator_facility,
      instrumentModel: row.instrument_model,
      libraryId: row.library_ID,
      libraryLayout: row.library_layout,
      librarySelection: row.library_selection,
      librarySource: row.library_source,
      libraryStrategy: row.library_strategy,
      max: parseNumberOrNA(row.max).toString(),
      mean: parseNumberOrNA(row.mean).toString(),
      metadataAccession: row.accession,
      min: parseNumberOrNA(row.min).toString(),
      mmTag: parseBooleanOrNa(row.MM_tag),
      n25: parseNumberOrNA(row.N25).toString(),
      n50: parseNumberOrNA(row.N50).toString(),
      n75: parseNumberOrNA(row.N75).toString(),
      notes: row.notes,
      ntsmResult: row.ntsm_result,
      ntsmScore: parseNumberOrNA(row.ntsm_score).toString(),
      oneHundredkbPlus: parseNumberOrNA(row["100kb+"]).toString(),
      oneMbPlus: parseNumberOrNA(row["1Mb+"]).toString(),
      path: row.path,
      platform: row.platform,
      polymeraseVersion: row.polymerase_version,
      productionYear: parseStringOrNull(row["Production Year"]),
      quartile25: parseNumberOrNA(row.quartile_25).toString(),
      quartile50: parseNumberOrNA(row.quartile_50).toString(),
      quartile75: parseNumberOrNA(row.quartile_75).toString(),
      readN50: LABEL.NA,
      result: row.result,
      sampleId: row.sample_ID,
      seqKit: row.seq_kit,
      seqPlateChemistryVersion: row.seq_plate_chemistry_version,
      shearMethod: row.shear_method,
      sizeSelection: row.size_selection,
      study: row.study,
      subpopulation: parseStringOrNull(row.Subpopulation),
      superpopulation: parseStringOrNull(row.Superpopulation),
      threeHundredkbPlus: parseNumberOrNA(row["300kb+"]).toString(),
      title: row.title,
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
  const sourceRows = await readValuesFile<SourceAssembly>(
    SOURCE_PATH_ASSEMBLIES
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAssembly => ({
      accession: parseStringOrNull(row.Accession),
      awsFasta: parseStringOrNull(row.aws_fasta),
      familyId: parseStringOrNull(row.familyID),
      fastaSha256: parseStringOrNull(row.fasta_sha256),
      frag: parseNumberOrNull(row.frag),
      fullDup: parseNumberOrNull(row.full_dup),
      fullSgl: parseNumberOrNull(row.full_sgl),
      gcpFasta: parseStringOrNull(row.gcp_fasta),
      hammingErrRate: parsePercentageOrNull(row.hamming_err_rate),
      haplotype: row.haplotype,
      l50: parseNumberOrNull(row.L50),
      n50: parseNumberOrNull(row.N50),
      numContigs: parseNumberOrNull(row.num_contigs),
      productionYear: parseStringOrNull(row["Production Year"]),
      qv: parseNumberOrStringOrNull(row.qv),
      sampleId: row.sample,
      subpopulation: parseStringOrNull(row.Subpopulation),
      superpopulation: parseStringOrNull(row.Superpopulation),
      switchErrRate: parsePercentageOrNull(row.switch_err_rate),
      totalLen: parseNumberOrNull(row.total_len),
    })
  );
  return mappedRows.sort((a, b) =>
    getAssemblyId(a).localeCompare(getAssemblyId(b))
  );
}

async function buildAnnotations(): Promise<HPRCDataExplorerAnnotation[]> {
  const sourceRows = await readValuesFile<SourceAnnotation>(
    SOURCE_PATH_ANNOTATIONS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAnnotation => ({
      annotationType: row.annotation_type,
      fileLocation: row.file_location,
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
  const sourceRows = await readValuesFile<SourceAlignment>(
    SOURCE_PATH_ALIGNMENTS
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAlignment => ({
      filename: row.file,
      loc: row.loc,
      pipeline: row.pipeline,
      referenceCoordinates: parseStringOrNull(row.reference_coordinates),
      useCase: parseStringArray(row.use_case),
    })
  );
  return mappedRows.sort((a, b) => a.loc.localeCompare(b.loc));
}

async function readValuesFile<T>(
  filePath: string,
  delimiter = ","
): Promise<T[]> {
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

function parseStringOrNull(value: string): string | null {
  return value.trim() || null;
}

function parseNumberOrNull(value: string): number | null {
  value = value.trim();
  if (!value) return null;
  const n = Number(value);
  if (isNaN(n))
    throw new Error(`Invalid number value: ${JSON.stringify(value)}`);
  return n;
}

function parseNumberOrNA(value: string): number | LABEL.NA {
  value = value.trim();
  if (value === LABEL.NA) return value;
  const n = Number(value);
  if (!value || isNaN(n))
    throw new Error(`Invalid number value: ${JSON.stringify(value)}`);
  return n;
}

function parseNumberOrStringOrNull(value: string): number | string | null {
  value = value.trim();
  if (!value) return null;
  const n = Number(value);
  if (isNaN(n)) return value;
  return n;
}

function parsePercentageOrNull(value: string): number | null {
  value = value.trim();
  if (!value) return null;
  const match = /^(\d+|\d*\.\d+)%$/.exec(value);
  if (!match)
    throw new Error(`Invalid percentage value: ${JSON.stringify(value)}`);
  return Number(match[1]) / 100;
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
  if (value === LABEL.NA) return LABEL.NA;
  if (value === "True") return true;
  if (value === "False") return false;
  throw new Error(`Invalid boolean value: ${JSON.stringify(value)}`);
}
