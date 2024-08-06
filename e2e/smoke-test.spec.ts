import { expect, test } from "@playwright/test";

const REDIRECT_DESTINATION_URL = "/raw-sequencing-data";

test("Expect visiting / to redirect to /raw-sequence-data", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(REDIRECT_DESTINATION_URL);
});
