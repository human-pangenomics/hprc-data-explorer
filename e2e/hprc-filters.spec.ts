import { expect, test } from "@playwright/test";
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
  const result = await testFirstNFilterCounts(page, HPRC_TABS.assemblies, 2);
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
  expect(
    await testSelectFiltersThroughSearchBar(page, HPRC_TABS.rawSequencingData)
  ).toBe(true);
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Assemblies tab', async ({
  page,
}) => {
  expect(
    await testSelectFiltersThroughSearchBar(page, HPRC_TABS.assemblies)
  ).toBe(true);
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Annotations tab', async ({
  page,
}) => {
  expect(
    await testSelectFiltersThroughSearchBar(page, HPRC_TABS.annotations)
  ).toBe(true);
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Alignments tab', async ({
  page,
}) => {
  expect(
    await testSelectFiltersThroughSearchBar(page, HPRC_TABS.alignments)
  ).toBe(true);
});

test("Expect at least one filter to exist on the Samples tab and for all filters to function", async ({
  page,
}) => {
  await testAllFiltersPresence(page, HPRC_TABS.samples);
});

test("Expect filter counts to update for the first three filters on the Samples tab", async ({
  page,
}) => {
  const result = await testFirstNFilterCounts(page, HPRC_TABS.samples, 3);
  if (!result) {
    test.fail();
  }
});

test('Check that selecting the first filter through the "Search all Filters" textbox works correctly on the Samples tab', async ({
  page,
}) => {
  expect(await testSelectFiltersThroughSearchBar(page, HPRC_TABS.samples)).toBe(
    true
  );
});
