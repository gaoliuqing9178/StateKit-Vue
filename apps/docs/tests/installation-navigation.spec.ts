import { expect, test } from "@playwright/test";

test.describe("Installation navigation", () => {
  test("shows the install sequence and routes back to recipes", async ({ page }) => {
    await page.goto("/docs/installation");

    await expect(page.getByTestId("installation-step-01")).toContainText(
      "Add the package",
    );
    await expect(page.getByTestId("installation-step-02")).toContainText(
      "Import the shared stylesheet",
    );
    await expect(page.getByTestId("installation-step-03")).toContainText(
      "Render one category component and override the copy",
    );

    await page.getByTestId("installation-browse-recipes").click();

    await expect(page).toHaveURL(/\/recipes$/);
    await expect(page.getByTestId("recipe-list-empty")).toBeVisible();
  });
});
