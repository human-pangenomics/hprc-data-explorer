import { test } from "@playwright/test";
import { HPRC_TABS } from "./hprc-tabs";
import {
  testAllFiltersPresence,
  testFirstNFilterCounts,
  testSelectFiltersThroughSearchBar,
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

test("Expect at least one filter to exist on the Alignments tab and for all filters to function", async ({
  page,
}) => {
  await testAllFiltersPresence(page, HPRC_TABS.alignments);
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

test("Expect filter counts to update for the first five on the Alignments tab", async ({
  page,
}) => {
  const result = await testFirstNFilterCounts(page, HPRC_TABS.alignments, 3);
  if (!result) {
    test.fail();
  }
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Raw Sequencing Data tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(page, HPRC_TABS.rawSequencingData);
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Assemblies tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(page, HPRC_TABS.assemblies);
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Annotations tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(page, HPRC_TABS.annotations);
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Alignments tab', async ({
  page,
}) => {
  await testSelectFiltersThroughSearchBar(page, HPRC_TABS.alignments);
});
