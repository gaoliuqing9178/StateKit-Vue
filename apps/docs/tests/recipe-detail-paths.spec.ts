import { expect, test } from "@playwright/test";

test.describe("Recipe detail paths", () => {
  test("moves between related recipes inside the same category", async ({ page }) => {
    await page.goto("/recipes/empty-search-state");

    await page.getByTestId("recipe-related-empty-collection-state").click();

    await expect(page).toHaveURL(/\/recipes\/empty-collection-state$/);
    await expect(
      page.getByTestId("recipe-detail-live-preview").locator(".sk-shell"),
    ).toHaveAttribute("data-category", "empty");
    await expect(page.getByTestId("recipe-detail-metadata")).toContainText(
      "empty-collection-state",
    );
  });

  test("shows the missing-state fallback for unknown recipe slugs", async ({ page }) => {
    await page.goto("/recipes/not-a-real-recipe");

    await expect(page.getByTestId("recipe-detail-missing")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Recipe not found" }),
    ).toBeVisible();
  });
});
