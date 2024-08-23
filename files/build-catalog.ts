import { parse as parseCsv } from "csv-parse/sync";
import fsp from "fs/promises";
import {
  HPRCDataExplorerAssembly,
  HPRCDataExplorerPangenome,
  HPRCDataExplorerRawSequencingData,
  LABEL,
} from "../app/apis/catalog/hprc-data-explorer/common/entities";
import {
  SourceAssembly,
  SourcePangenome,
  SourceRawSequencingData,
} from "./entities";

buildCatalog();

async function buildCatalog(): Promise<void> {
  const rawSequencingData = await buildRawSequencingData();
  const assemblies = await buildAssemblies();
  const pangenomes = await buildPangenomes();

  console.log("Raw sequencing data:", rawSequencingData.length);
  await saveJson("files/out/raw-sequencing-data.json", rawSequencingData);

  console.log("Assemblies:", assemblies.length);
  await saveJson("files/out/assemblies.json", assemblies);

  console.log("Pangenomes:", pangenomes.length);
  await saveJson("files/out/pangenomes.json", pangenomes);

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
      Gb: parseNumberOrNA(row.Gb),
      accession: parseStringOrNull(row.Accession),
      basecaller: row.basecaller,
      basecallerModel: row.basecaller_model,
      basecallerVersion: row.basecaller_version,
      biosampleAccession: row.biosample_accession,
      ccsAlgorithm: row.ccs_algorithm,
      coverage: parseNumberOrNA(row.coverage),
      dataType: row.data_type,
      deepConsensusVersion: row.DeepConsensus_version,
      designDescription: row.design_description,
      familyId: parseStringOrNull(row.familyID),
      filename: row.filename,
      filetype: row.filetype,
      fiveHundredkbPlus: parseNumberOrNA(row["500kb+"]),
      fourHundredkbPlus: parseNumberOrNA(row["400kb+"]),
      generatorContact: row.generator_contact,
      generatorFacility: row.generator_facility,
      instrumentModel: row.instrument_model,
      libraryId: row.library_ID,
      libraryLayout: row.library_layout,
      librarySelection: row.library_selection,
      librarySource: row.library_source,
      libraryStrategy: row.library_strategy,
      max: parseNumberOrNA(row.max),
      mean: parseNumberOrNA(row.mean),
      metadataAccession: row.accession,
      min: parseNumberOrNA(row.min),
      n25: parseNumberOrNA(row.N25),
      n50: parseNumberOrNA(row.N50),
      n75: parseNumberOrNA(row.N75),
      notes: row.notes,
      ntsmScore: parseNumberOrNA(row.ntsm_score),
      oneHundredkbPlus: parseNumberOrNA(row["100kb+"]),
      oneMbPlus: parseNumberOrNA(row["1Mb+"]),
      path: row.path,
      platform: row.platform,
      polymeraseVersion: row.polymerase_version,
      productionYear: parseStringOrNull(row["Production Year"]),
      quartile25: parseNumberOrNA(row.quartile_25),
      quartile50: parseNumberOrNA(row.quartile_50),
      quartile75: parseNumberOrNA(row.quartile_75),
      readN50: parseNumberOrNA(row.read_N50),
      result: row.result,
      sampleId: row.sample_ID,
      seqKit: row.seq_kit,
      seqPlateChemistryVersion: row.seq_plate_chemistry_version,
      shearMethod: row.shear_method,
      sizeSelection: row.size_selection,
      study: row.study,
      subpopulation: parseStringOrNull(row.Subpopulation),
      superpopulation: parseStringOrNull(row.Superpopulation),
      threeHundredkbPlus: parseNumberOrNA(row["300kb+"]),
      totalBp: parseNumberOrNA(row.total_bp),
      totalGbp: parseNumberOrNA(row.total_Gbp),
      totalReads: parseNumberOrNA(row.total_reads),
      twoHundredkbPlus: parseNumberOrNA(row["200kb+"]),
      whales: parseNumberOrNA(row.whales),
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
      flaggerAll: parseStringOrNull(
        row.Flagger_annotation_file_all_file_location
      ),
      flaggerUnreliableOnly: parseStringOrNull(
        row.Flagger_annotation_file_unreliable_only_file_location
      ),
      flaggerUnreliableOnlyNoMT: parseStringOrNull(
        row.Flagger_annotation_file_unreliable_only_no_MT_file_location
      ),
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
      sampleId: row.sample,
      segDupsAnnotationFile: parseStringOrNull(row.Seg_Dups_annotation_file),
      subpopulation: parseStringOrNull(row.Subpopulation),
      superpopulation: parseStringOrNull(row.Superpopulation),
      switchErrRate: parsePercentageOrNull(row.switch_err_rate),
      totalLen: parseNumberOrNull(row.total_len),
      trfAnnotationFile: parseStringOrNull(row.TRF_annotation_file),
    })
  );
  return mappedRows.sort((a, b) =>
    (a.sampleId + "_" + a.haplotype).localeCompare(
      b.sampleId + "_" + b.haplotype
    )
  );
}

async function buildPangenomes(): Promise<HPRCDataExplorerPangenome[]> {
  const sourceRows = await readValuesFile<SourcePangenome>(
    "files/source/pangenomes.csv",
    ","
  );
  const mappedRows = sourceRows.map(
    (row): HPRCDataExplorerPangenome => ({
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
