import { expect, test } from "@playwright/test";

test.describe("Home featured recipes", () => {
  test("opens featured recipe cards and the lower installation CTA", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("home-featured-recipe-onboarding-workspace-state").click();

    await expect(page).toHaveURL(/\/recipes\/onboarding-workspace-state$/);
    await expect(
      page.getByTestId("recipe-detail-live-preview").locator(".sk-shell"),
    ).toHaveAttribute("data-category", "onboarding");

    await page.goto("/");

    await page.getByTestId("home-bottom-installation").click();
    await expect(page).toHaveURL(/\/docs\/installation$/);
    await expect(page.getByTestId("installation-step-01")).toBeVisible();
  });
});
