import { expect, test } from "@playwright/test";

test.describe("Recipes navigation", () => {
  test("opens a recipe detail from the recipes index", async ({ page }) => {
    await page.goto("/recipes");
    await page.getByTestId("recipe-link-page-error-state").click();

    await expect(page).toHaveURL(/\/recipes\/page-error-state$/);

    const preview = page.getByTestId("recipe-detail-preview");
    const livePreview = page.getByTestId("recipe-detail-live-preview");

    await expect(preview).toBeVisible();
    await expect(livePreview.locator(".sk-shell")).toHaveAttribute(
      "data-category",
      "error",
    );
    await expect(livePreview.locator(".sk-shell")).toHaveAttribute(
      "data-layout",
      "page",
    );
    await expect(page.getByTestId("recipe-detail-metadata")).toContainText(
      "page-error-state",
    );
    await expect(page.getByTestId("recipe-detail-metadata")).toContainText(
      "ErrorState",
    );
  });

  test("redirects legacy blocks routes to the recipe detail page", async ({ page }) => {
    await page.goto("/blocks/page-error-state");

    await expect(page).toHaveURL(/\/recipes\/page-error-state$/);
    await expect(page.getByTestId("recipe-detail-preview")).toBeVisible();
    await expect(
      page.getByTestId("recipe-detail-live-preview").locator(".sk-shell"),
    ).toHaveAttribute("data-category", "error");
  });
});
