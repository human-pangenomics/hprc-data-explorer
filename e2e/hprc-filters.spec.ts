import { test } from "@playwright/test";
import { HPRC_TABS } from "./hprc-tabs";
import {
  testAllFiltersPresence,
  testFirstNFilterCounts,
} from "./testFunctions";

test("Expect at least one filter to exist on the Raw Sequencing Data tab and for all filters to function", async ({
  page,
}) => {
  await testAllFiltersPresence(page, HPRC_TABS.rawSequencingData);
});

test("Expect at least one filter to exist on the Assemblies tab and for all filters to function", async ({
  page,
}) => {
  await testAllFiltersPresence(page, HPRC_TABS.assemblies);
});

test("Expect at least one filter to exist on the Pangenomes tab and for all filters to function", async ({
  page,
}) => {
  await testAllFiltersPresence(page, HPRC_TABS.pangenomes);
});

test("Expect filter counts to update for the first five filters on the Raw Sequencing Data tab", async ({
  page,
}) => {
  const result = await testFirstNFilterCounts(
    page,
    HPRC_TABS.rawSequencingData,
    3
  );
  if (!result) {
    test.fail();
  }
});

test("Expect filter counts to update for the first five filters on the Assemblies tab", async ({
  page,
}) => {
  const result = await testFirstNFilterCounts(page, HPRC_TABS.assemblies, 3);
  if (!result) {
    test.fail();
  }
});

test("Expect filter counts to update for the first five on the Pangenomes tab", async ({
  page,
}) => {
  const result = await testFirstNFilterCounts(page, HPRC_TABS.pangenomes, 3);
  if (!result) {
    test.fail();
  }
});
