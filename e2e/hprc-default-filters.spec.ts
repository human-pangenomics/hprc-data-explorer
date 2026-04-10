import { expect, test } from "@playwright/test";

const DEFAULT_RELEASE_FILTER = [
  {
    categoryKey: "release",
    value: ["2"],
  },
];

for (const route of ["/assemblies", "/annotations"]) {
  test(`Expect ${route} to apply the default Release 2 filter on initial load`, async ({
    page,
  }) => {
    await page.goto(route);
    await page.waitForURL(/filter=/);

    const filterParam = new URL(page.url()).searchParams.get("filter");

    expect(filterParam).not.toBeNull();
    expect(JSON.parse(filterParam as string)).toEqual(DEFAULT_RELEASE_FILTER);
    await expect(page.getByText(/^Results 1 - \d+ of \d+/)).toBeVisible();
  });
}

test("Expect the default Release 2 filter on /assemblies to stay cleared after user removes it", async ({
  page,
}) => {
  await page.goto("/assemblies");
  await page.waitForURL(/filter=/);

  await page.getByText(/^Release\s+\(\d+\)\s*/).dispatchEvent("click");
  await page
    .getByRole("button")
    .filter({
      has: page.getByRole("checkbox", { checked: true }),
      hasText: /^2\s*\d+\s*/,
    })
    .first()
    .dispatchEvent("click");

  await page.waitForTimeout(1000);
  await expect(page).not.toHaveURL(/filter=/);
});
