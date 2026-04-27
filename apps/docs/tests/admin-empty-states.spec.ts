import { expect, test } from "@playwright/test";

test.describe("Admin setup and empty states example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/admin-empty-states");
  });

  test("handles inline recovery without removing the secondary action", async ({ page }) => {
    const demo = page.getByTestId("inline-empty-state-demo");
    const filterRow = demo.locator(".demo-filter-row");
    const primaryAction = demo.getByRole("button", { name: "Clear filters" });
    const secondaryAction = demo.getByRole("button", { name: "Save empty view" });

    await expect(filterRow.getByText("Campaign: Spring relaunch")).toBeVisible();
    await expect(filterRow.getByText("Owner: Brand studio")).toBeVisible();
    await expect(filterRow.getByText("Status: Needs review")).toBeVisible();

    await primaryAction.click();

    await expect(demo.getByRole("button", { name: "Filters cleared" })).toBeDisabled();
    await expect(filterRow.getByText("No active filters")).toBeVisible();
    await expect(filterRow.getByText("Campaign: Spring relaunch")).toHaveCount(0);
    await expect(secondaryAction).toBeVisible();
    await expect(demo.getByText("Filters cleared. The inline state keeps the table frame visible, and the clear-filters CTA is now disabled because there is nothing left to reset.")).toBeVisible();
  });

  test("keeps the secondary save-view CTA actionable on the inline example", async ({ page }) => {
    const demo = page.getByTestId("inline-empty-state-demo");
    const secondaryAction = demo.getByRole("button", { name: "Save empty view" });

    await secondaryAction.click();

    await expect(
      demo.getByText(
        "Saved the current empty result as a reusable review view for the content team.",
      ),
    ).toBeVisible();
    await expect(demo.getByRole("button", { name: "Clear filters" })).toBeVisible();
  });

  test("shows a single panel CTA while collection creation is pending", async ({ page }) => {
    const demo = page.getByTestId("panel-empty-state-demo");
    const primaryAction = demo.getByRole("button", { name: "Create collection" });

    await expect(demo.getByText("0 draft")).toBeVisible();
    await expect(demo.getByRole("button")).toHaveCount(1);

    await primaryAction.click();

    await expect(demo.getByRole("button", { name: "Creating collection..." })).toBeDisabled();
    await expect(demo.getByText("Creating a starter collection for the launch team...")).toBeVisible();
    await expect(demo.getByRole("button")).toHaveCount(1);
    await expect(demo.getByText("1 draft")).toBeVisible();
    await expect(
      demo.getByText(
        "Starter collection created. The docs page keeps the empty state visible so this example can stay focused on the single-CTA pattern.",
      ),
    ).toBeVisible();
  });

  test("routes readers to the dedicated onboarding example when they need a hero flow", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Open onboarding hero example" }).first().click();

    await expect(page).toHaveURL(/\/examples\/onboarding-activation$/);
    await expect(
      page.getByRole("heading", { name: "Onboarding Activation" }),
    ).toBeVisible();
  });
});
