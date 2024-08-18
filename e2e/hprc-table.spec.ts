import { test } from "@playwright/test";
import { HPRC_TABS } from "./hprc-tabs";
import { testTableExists } from "./testFunctions";

test("Expect the table to exist and have at least one row on the Raw Sequencing Data tab", async ({
  page,
}) => {
  await testTableExists(page, HPRC_TABS.rawSequencingData);
});

test("Expect the table to exist and have at least one row on the Assemblies tab", async ({
  page,
}) => {
  await testTableExists(page, HPRC_TABS.assemblies);
});

test("Expect the table to exist and have at least one row on the Pangenomes tab", async ({
  page,
}) => {
  await testTableExists(page, HPRC_TABS.pangenomes);
});
