import { test } from "@playwright/test";
import { HPRC_TABS } from "./hprc-tabs";
import { testSortFirstColumn } from "./testFunctions";

test("Expect sorting the first column of the Raw Sequencing Data tab to switch its first and last entry", async ({
  page,
}) => {
  await testSortFirstColumn(page, HPRC_TABS.rawSequencingData);
});

test("Expect sorting the first column of the Assemblies tab to switch its first and last entry", async ({
  page,
}) => {
  await testSortFirstColumn(page, HPRC_TABS.assemblies);
});

test("Expect sorting the first column of the Pangenomes tab to switch its first and last entry", async ({
  page,
}) => {
  await testSortFirstColumn(page, HPRC_TABS.pangenomes);
});
