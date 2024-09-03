import { test } from "@playwright/test";
import { HPRC_TABS, HPRC_TAB_LIST } from "./hprc-tabs";
import { testUrl } from "./testFunctions";

test("Expect the Raw Sequencing Data tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = HPRC_TABS.rawSequencingData;
  await testUrl(page, tab, HPRC_TAB_LIST);
});

test("Expect the Assemblies tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = HPRC_TABS.assemblies;
  await testUrl(page, tab, HPRC_TAB_LIST);
});

test("Expect the Alignments tab to appear as selected when the corresponding url is accessed", async ({
  page,
}) => {
  const tab = HPRC_TABS.alignments;
  await testUrl(page, tab, HPRC_TAB_LIST);
});
