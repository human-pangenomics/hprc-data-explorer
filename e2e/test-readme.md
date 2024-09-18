## HPRC Data Explorer End-To-End Tests

### Test Information

All tests are stored in `/explorer/e2e`. Playwright will run tests in any file with the suffix `*.spec.ts`, so long as these files are stored in `/explorer/e2e`.
Tests for a specific configuration are stored as `config_name/config_name-test_name.spec.ts`. While these are the tests
that Playwright actually runs, most test code is stored in `e2e/testFunctions.ts`. These functions contain the
code that runs for all tests, except for tests that are not reused between configurations and that only run in one tab. This allows tests to be repeated
for different tabs in different configurations without reusing code, and means that information that tests
depend on can be stored in one place to make adjusting tests to changes in user-facing content is straightforward.
Config specific constants used for tests are kept in the `hprc-tabs.ts`, and use interfaces and
custom types in `testInterfaces.ts`.

### Running Tests

#### Running Locally

To run all tests locally, run `npm run test:e2e`. If there is no server running
on `localhost:3000`, this will create a dev build of the correct configuration and run the tests on Chromium, Firefox, and Webkit (Safari). The tests may be flaky
if run on the `dev` version instead of a dev build, as the site will run too slow and they may time out. Traces
and screenshots from any tests that fail will be output to `explorer/playwright-report`. To manually run an individual test file,
run `npx playwright test e2efilename.spec.ts`. To run an individual test, add the argument `-g <test_name>`. More information
about command line options for the test can be found in [Playwright's Documentation](https://playwright.dev/docs/test-cli).
To debug or write tests, it can be useful to use Playwright's UI mode with `npx playwright test --ui`, which allows you
to easily run individual tests, and view the actions Playwright takes step by step and their result.

#### Running in GitHub

All tests are run automatically when a pull request is made, using GitHub Actions. These actions create a dev build
for each configuration, then run the test. When a test passes, it will become visible on GitHub. If one fails, screenshots
and traces can be downloaded from GitHub. To view step by step what happened in the test, visit `trace.playwright.dev`
in a web browser and upload the `trace.zip` file. This web app, which runs entirely in browser, allows you to step
through the actions taken as part of the test and view the impact on the web page.

### Current Tests

- Filters (`hprc-filters.spec.ts`)
  - Check that all text that matches a filter regex is clickable, shows a filter menu with checkboxes when clicked, and that the filter menu disapperas when the center of the page is clicked
    - Uses the regex "^(.+)\s+\([0-9]+\)\s\*" to match all filter buttons
    - Once the list of filters is finalized, this should be converted to using a constant list of filters
    - Runs on all three tabs except Annotations
  - Check that the filter counts in the filter menus match the resulting row counts for the main table for the first three filters on each tab
    - Once the list of filters is finalized, this should be converted to using a constant list of filters
  - Check that the filter search bar can be used to select and deselect tests (runs on all four tabs)
- Sort (`hprc-sort.spec.ts`)
  - Check that clicking the table header of the first row switches the first and last rows in that row
    - Does not check that any actual sorting occurs, only that the first and last rows are switched
    - Runs on all three tables except Annotations
    - Should be expanded to run on all sortable columns once column names are finalized
- Navigation
  - Check that all tabs appear on each tab page
    - Runs on all tabs except Annotations
    - Cannot tell what tabs are selected because the aria-selected value is not set for the tab buttons
    - `hprc-urls.spec.ts`
  - Check that the data table appears on each tab and that the first cell of the first column is visible
    - Runs on all tabs except Annotations
    - `hprc-table.spec.ts`
  - Check that `/` redirects to `/raw-sequencing-data` (`smoke-test.spec.ts`)
- All tests rely on correct lists of tabs in `hprc-tabs.ts`
