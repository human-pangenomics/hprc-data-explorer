import { expect, Locator, Page } from "@playwright/test";
import { TabDescription } from "./testInterfaces";

/**
 * Tests that the tab url goes to a valid page and that the correct tab (and only
 * the correct tab) appears selected
 * @param page - a Playwright page object
 * @param tab - the Tab object to check
 * @param otherTabs - an array of the other Tab objects for this configuration
 */
export async function testUrl(
  page: Page,
  tab: TabDescription,
  otherTabs: TabDescription[]
): Promise<void> {
  await page.goto(tab.url);
  // Currently, there is no non-flaky way to use Playwright to determine if a tab is selected,
  // so this test just checks for visibility.
  await expect(
    page.getByRole("button").getByText(tab.tabName, { exact: true })
  ).toBeVisible();
  for (const otherTab of otherTabs) {
    if (otherTab.tabName !== tab.tabName) {
      await expect(
        page.getByRole("button").getByText(otherTab.tabName)
      ).toBeVisible();
    }
  }
}

/**
 * Test that the main table is visible and has at least one cell
 * @param page - a Playwright page object
 * @param tab - the tab object to test on
 */
export async function testTableExists(
  page: Page,
  tab: TabDescription
): Promise<void> {
  await page.goto(tab.url);
  await expect(page.getByRole("table")).toBeVisible();
  await expect(
    page.getByRole("rowgroup").nth(1).getByRole("cell").first()
  ).toBeVisible();
}

/**
 * Returns a string with special characters escaped
 * @param string - the string to escape
 * @returns - a string with special characters escaped
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
 * Returns a regex that matches the sidebar filter buttons
 * This is useful for selecting a filter from the sidebar
 * @param filterName - the name of the filter to match
 * @returns a regular expression matching "[filterName] ([n])"
 */
export const filterRegex = (filterName: string): RegExp =>
  new RegExp("^(" + escapeRegExp(filterName) + ")" + "\\s+\\([0-9]+\\)\\s*");

const allFilterRegex = /^(.+)\s+\([0-9]+\)\s*/;
/**
 * Get an array of all filter names on the current page
 * @param page - a Playwright Page object
 * @returns - an array of filter names
 */
const getAllFilterNames = async (page: Page): Promise<string[]> => {
  await expect(page.getByText(allFilterRegex).first()).toBeVisible();
  /*await expect(page.getByText(allFilterRegex).first()).toContainText(
    /\(([0-9])+\)/
  );*/
  const filterStrings = await page.getByText(allFilterRegex).allInnerTexts();
  return filterStrings.map(
    (x: string) => (x.match(allFilterRegex) ?? ["", ""])[1]
  );
};

/**
 * Test that all text that looks like a filter button is clickable and opens
 * a filter menu with at least one checkbox.
 * This is a temporary test to be used until a permanent list of filter names
 * is found.
 * @param page - a Playwright page object
 * @param tab - the tab object to test on
 */
export async function testAllFiltersPresence(
  page: Page,
  tab: TabDescription
): Promise<void> {
  // Temp test to be used until we have a stable list of filters
  await page.goto(tab.url);
  const filterNames = await getAllFilterNames(page);
  await testFilterPresence(page, tab, filterNames);
}

/**
 * Checks that each filter specified in filterNames is visible and can be
 * selected on the specified tab
 * @param page - a Playwright page object
 * @param tab - the tab to check
 * @param filterNames - the names of the filters who whose existence should be tested for
 */
export async function testFilterPresence(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<void> {
  // Goto the selected tab
  await page.goto(tab.url);
  await expect(page.getByRole("button").getByText(tab.tabName)).toBeVisible();
  for (const filterName of filterNames) {
    // Check that each filter is visible and clickable
    await expect(page.getByText(filterRegex(filterName))).toBeVisible();
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    await expect(page.getByRole("checkbox").first()).toBeVisible();
    await expect(page.getByRole("checkbox").first()).not.toBeChecked();
    // Check that clicking out of the filter menu causes it to disappear
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
  }
}

/**
 * Get a locator for a filter option with name filterName
 * @param page - a Playwright page object
 * @param filterName - the filterName to search for
 * @returns - a Playwright locator object for the filter option
 */
export const getNamedFilterButtonLocator = (
  page: Page,
  filterName: string
): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox"), hasText: filterName });
};

/**
 * Get a locator for the first filter option on the page.
 * @param page - a Playwright page object
 * @returns - a Playwright locator object for the first filter option on the page
 */
export const getFirstFilterButtonLocator = (page: Page): Locator => {
  return page
    .getByRole("button")
    .filter({ has: page.getByRole("checkbox") })
    .first();
};

/**
 * Test that Filter counts update correctly for the first n filters on the page.
 * This is a temporary test that should only be used until a final list of
 * filters is available.
 * @param page - a Playwright page object
 * @param tab - the tab object to run the test on
 * @param n - the number of filters tot est
 * @returns - true if the test passes and false if the test should fail
 */
export async function testFirstNFilterCounts(
  page: Page,
  tab: TabDescription,
  n: number
): Promise<boolean> {
  await page.goto(tab.url);
  const allFilterNames = await getAllFilterNames(page);
  if (allFilterNames.length < n) {
    console.log(
      `There are only ${allFilterNames.length} filters, which is fewer than the ${n} specified for this test`
    );
    return false;
  }
  const firstNFilterNames = allFilterNames.slice(0, n);
  return await testFilterCounts(page, tab, firstNFilterNames);
}

/**
 * Test that the counts associated with an array of filter names are reflected
 * in the table
 * @param page - a Playwright page object
 * @param tab - the tab object to test
 * @param filterNames - the names of the filters to select, in order
 * @returns false if the test should fail and true if the test should pass
 */
export async function testFilterCounts(
  page: Page,
  tab: TabDescription,
  filterNames: string[]
): Promise<boolean> {
  await page.goto(tab.url);
  const elementsPerPageRegex = /^Results 1 - ([0-9]+) of [0-9]+/;
  await expect(page.getByText(elementsPerPageRegex)).toBeVisible();
  const elementsPerPageText = ((
    await page.getByText(elementsPerPageRegex).innerText()
  ).match(elementsPerPageRegex) ?? ["", "-1"])[1];
  const elementsPerPage = parseInt(elementsPerPageText) ?? -1;
  if (elementsPerPage < 0) {
    console.log(
      "The number of elements per page was negative or did not appear"
    );
    return false;
  }
  // For each arbitrarily selected filter
  for (const filterName of filterNames) {
    // Select the filter
    await page.getByText(filterRegex(filterName)).dispatchEvent("click");
    // Get the number associated with the first filter button, and select it
    await page.waitForLoadState("load");
    const filterButton = getFirstFilterButtonLocator(page);
    const filterNumbers = (await filterButton.innerText()).split("\n");
    const filterNumber =
      filterNumbers.map((x) => Number(x)).find((x) => !isNaN(x) && x !== 0) ??
      -1;
    if (filterNumber < 0) {
      console.log(filterNumbers.map((x) => Number(x)));
      return false;
    }
    // Check the filter
    await filterButton.getByRole("checkbox").dispatchEvent("click");
    await page.waitForLoadState("load");
    // Exit the filter menu
    await page.locator("body").click();
    await expect(page.getByRole("checkbox")).toHaveCount(0);
    // Expect the displayed count of elements to be 0
    const firstNumber =
      filterNumber <= elementsPerPage ? filterNumber : elementsPerPage;
    await expect(
      page.getByText("Results 1 - " + firstNumber + " of " + filterNumber)
    ).toBeVisible();
  }
  return true;
}

/**
 * Get a locator to the cell in the first row's nth column
 * @param page - a Playwright page object
 * @param columnIndex - the zero-indexed column to return
 * @returns a Playwright locator object to the selected cell
 **/
export const getFirstRowNthColumnCellLocator = (
  page: Page,
  columnIndex: number
): Locator => {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .nth(0)
    .getByRole("cell")
    .nth(columnIndex);
};

/**
 * Get a locator to the cell in the last row's nth column
 * @param page - a Playwright page object
 * @param columnIndex - the zero-indexed column to return
 * @returns a Playwright locator object to the selected cell
 **/
export const getLastRowNthColumnCellLocator = (
  page: Page,
  columnIndex: number
): Locator => {
  return page
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row")
    .last()
    .getByRole("cell")
    .nth(columnIndex);
};

/**
 * Cause the current page to scroll to the top
 * @param page - a Playwright page object
 */
const scrollToTop = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
};

/**
 * Cause the current page to scroll to the bottom
 * @param page - a Playwright page object
 */
const scrollToBottom = async (page: Page): Promise<void> => {
  const scrollHeight = await page.evaluate(
    () => window.document.documentElement.scrollHeight
  );
  await page.evaluate((height) => {
    window.scrollTo(0, height);
  }, scrollHeight);
};

/**
 * Checks that sorting the tab by the first visible column  does not cause the
 * first row of the table to break.
 * This test does not check whether the sort order is correct.
 * @param page - a Playwright page object
 * @param tab - the tab to check
 */
export async function testSortFirstColumn(
  page: Page,
  tab: TabDescription
): Promise<void> {
  // Get the current tab, and go to it's URL
  await page.goto(tab.url);
  await expect(page.getByText(allFilterRegex).first()).toBeVisible();
  const columnSortLocator = page
    .getByRole("table")
    .getByRole("columnheader")
    .first()
    .getByRole("button");
  // Check that the first and last cells are visible
  const firstElementTextLocator = getFirstRowNthColumnCellLocator(page, 0);
  const lastElementTextLocator = getLastRowNthColumnCellLocator(page, 0);
  await expect(firstElementTextLocator).toBeVisible();
  await scrollToBottom(page);
  await expect(lastElementTextLocator).toBeVisible();
  await scrollToTop(page);
  // Click to sort
  await columnSortLocator.click();
  // Expect the first cell to still be visible
  await expect(firstElementTextLocator).toBeVisible();
  const firstElementText = await firstElementTextLocator.innerText();
  await scrollToBottom(page);
  // Expect the last cell to still be visible
  await expect(
    page.getByRole("rowgroup").nth(1).getByRole("row").last()
  ).not.toHaveText("");
  await expect(lastElementTextLocator).toBeVisible();
  const lastElementText = await lastElementTextLocator.innerText();
  await scrollToTop(page);
  // Click to sort again
  await columnSortLocator.click();
  // Expect the first and last cell to have switched their text
  await expect(firstElementTextLocator).toBeVisible();
  await expect(firstElementTextLocator).toHaveText(lastElementText);
  await scrollToBottom(page);
  await expect(lastElementTextLocator).toBeVisible();
  await expect(lastElementTextLocator).toHaveText(firstElementText);
}