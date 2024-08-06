import { parse as parseCsv } from "csv-parse/sync";
import fsp from "fs/promises";
import {
  HPRCDataExplorerAssembly,
  HPRCDataExplorerRawSequencingData,
} from "../app/apis/catalog/hprc-data-explorer/common/entities";
import { SourceAssembly, SourceRawSequencingData } from "./entities";

buildCatalog();

async function buildCatalog(): Promise<void> {
  const rawSequencingData = await buildRawSequencingData();

  const assemblies = await buildAssemblies();

  console.log("Raw sequencing data:", rawSequencingData.length);
  await saveJson("files/out/raw-sequencing-data.json", rawSequencingData);

  console.log("Assemblies:", assemblies.length);
  await saveJson("files/out/assemblies.json", assemblies);

  console.log("Done");
}

async function buildRawSequencingData(): Promise<
  HPRCDataExplorerRawSequencingData[]
> {
  const sourceRows = await readValuesFile<SourceRawSequencingData>(
    "files/source/raw-sequencing-data.tsv",
    "\t"
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerRawSequencingData => ({
      dataType: row.data_type,
      designDescription: row.design_description,
      filename: row.filename,
      generatorContact: row.generator_contact,
      generatorFacility: row.generator_facility,
      instrumentModel: row.instrument_model,
      libraryId: row.library_ID,
      libraryLayout: row.library_layout,
      librarySelection: row.library_selection,
      librarySource: row.library_source,
      libraryStrategy: row.library_strategy,
      notes: row.notes,
      path: row.path,
      platform: row.platform,
      sampleId: row.sample_ID,
      shearMethod: row.shear_method,
      sizeSelection: row.size_selection,
    })
  );
  return mappedRows.sort((a, b) => a.filename.localeCompare(b.filename));
}

async function buildAssemblies(): Promise<HPRCDataExplorerAssembly[]> {
  const sourceRows = await readValuesFile<SourceAssembly>(
    "files/source/assemblies.csv",
    ","
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerAssembly => ({
      accession: parseStringOrNull(row.Accession),
      asatAnnotationFile: parseStringOrNull(row["ASat-annotation-file"]),
      awsFasta: parseStringOrNull(row.aws_fasta),
      catGenesChm13AnnotationFile: parseStringOrNull(
        row.CAT_genes_chm13_annotation_file
      ),
      catGenesHg38AnnotationFile: parseStringOrNull(
        row.CAT_genes_hg38_annotation_file
      ),
      dnaBrnnAnnotationFile: parseStringOrNull(row.DNA_BRNN_annotation_file),
      familyId: parseStringOrNull(row.familyID),
      fastaSha256: parseStringOrNull(row.fasta_sha256),
      flaggerAnnotationFile: parseStringOrNull(row.Flagger_annotation_file),
      frag: parseNumberOrNull(row.frag),
      fullDup: parseNumberOrNull(row.full_dup),
      fullSgl: parseNumberOrNull(row.full_sgl),
      gcpFasta: parseStringOrNull(row.gcp_fasta),
      hammingErrRate: parsePercentageOrNull(row.hamming_err_rate),
      haplotype: row.haplotype,
      hsatAnnotationFile: parseStringOrNull(row.HSat_annotation_file),
      l50: parseNumberOrNull(row.L50),
      n50: parseNumberOrNull(row.N50),
      numContigs: parseNumberOrNull(row.num_contigs),
      productionYear: parseStringOrNull(row["Production Year"]),
      qv: parseNumberOrStringOrNull(row.qv),
      repeatMaskerAnnotationFile: parseStringOrNull(
        row.Repeat_masker_annotation_file
      ),
      sample: row.sample,
      segDupsAnnotationFile: parseStringOrNull(row.Seg_Dups_annotation_file),
      subpopulation: parseStringOrNull(row.Subpopulation),
      superpopulation: parseStringOrNull(row.Superpopulation),
      switchErrRate: parsePercentageOrNull(row.switch_err_rate),
      totalLen: parseNumberOrNull(row.total_len),
      trfAnnotationFile: parseStringOrNull(row.TRF_annotation_file),
    })
  );
  return mappedRows.sort((a, b) =>
    (a.sample + "_" + a.haplotype).localeCompare(b.sample + "_" + b.haplotype)
  );
}

async function readValuesFile<T>(
  filePath: string,
  delimiter: string
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
