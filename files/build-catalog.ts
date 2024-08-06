import { parse as parseCsv } from "csv-parse/sync";
import fsp from "fs/promises";
import { HPRCDataExplorerRawSequencingData } from "../app/apis/catalog/hprc-data-explorer/common/entities";
import { SourceRawSequencingData } from "./entities";

buildCatalog();

async function buildCatalog(): Promise<void> {
  const rawSequencingData = await buildRawSequencingData();

  console.log("Raw sequencing data:", rawSequencingData.length);
  await saveJson("files/out/raw-sequencing-data.json", rawSequencingData);

  console.log("Done");
}

async function buildRawSequencingData(): Promise<
  HPRCDataExplorerRawSequencingData[]
> {
  const sourceRows = await readTsv<SourceRawSequencingData>(
    "files/source/raw-sequencing-data.tsv"
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

async function readTsv<T>(filePath: string): Promise<T[]> {
  const content = await fsp.readFile(filePath, "utf8");
  return parseCsv(content, {
    columns: true,
    delimiter: "\t",
    relax_quotes: true,
  });
}

async function saveJson(filePath: string, data: unknown): Promise<void> {
  await fsp.writeFile(filePath, JSON.stringify(data, undefined, 2));
}
