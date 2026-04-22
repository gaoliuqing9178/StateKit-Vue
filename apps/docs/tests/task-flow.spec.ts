import { expect, test } from "@playwright/test";

test.describe("Task flow example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/task-flow");
  });

  test("opens the processing log through the loading CTA", async ({ page }) => {
    const demo = page.getByTestId("loading-task-demo");
    const taskLogMetric = page
      .locator(".demo-metric")
      .filter({ hasText: "Task log opens" });
    const primaryAction = demo.getByRole("button", { name: "Open processing log" });

    await primaryAction.click();

    await expect(
      demo.getByRole("button", { name: "Opening processing log..." }),
    ).toBeDisabled();
    await expect(taskLogMetric.locator("strong")).toHaveText("7");
  });

  test("retries inline validation and jumps to the anchored validation notes", async ({ page }) => {
    const demo = page.getByTestId("inline-error-demo");
    const retriesMetric = page
      .locator(".demo-metric")
      .filter({ hasText: "Retries queued" });
    const retryAction = demo.getByRole("button", { name: "Retry validation" });
    const notesLink = demo.getByRole("link", { name: "Read validation notes" });

    await notesLink.click();
    await expect(page).toHaveURL(/\/examples\/task-flow#validation-rules$/);
    await expect(page.getByTestId("publish-summary-demo")).toBeVisible();

    await page.goto("/examples/task-flow");

    const refreshedDemo = page.getByTestId("inline-error-demo");

    await refreshedDemo.getByRole("button", { name: "Retry validation" }).click();

    await expect(
      refreshedDemo.getByRole("button", { name: "Retrying validation..." }),
    ).toBeDisabled();
    await expect(refreshedDemo.getByText("Retrying now")).toBeVisible();
    await expect(retriesMetric.locator("strong")).toHaveText("3");
    await expect(refreshedDemo.getByText("Queued 3 times")).toBeVisible();
  });

  test("keeps the page success handoff to one CTA and updates the report metric", async ({ page }) => {
    const demo = page.getByTestId("success-handoff-demo");
    const reportsMetric = page
      .locator(".demo-metric")
      .filter({ hasText: "Reports opened" });
    const primaryAction = demo.getByRole("button", {
      name: "Open reconciliation report",
    });

    await expect(demo.getByRole("button")).toHaveCount(1);

    await primaryAction.click();

    await expect(demo.getByRole("button")).toHaveCount(1);
    await expect(reportsMetric.locator("strong")).toHaveText("4");
  });

  test("tracks publish-summary follow-up actions without leaving the task flow route", async ({ page }) => {
    const demo = page.getByTestId("publish-summary-demo");
    const primaryAction = demo.getByRole("button", { name: "Open publish summary" });
    const secondaryAction = demo.getByRole("link", { name: "Back to queue" });

    await expect(secondaryAction).toHaveAttribute("href", "/examples/task-flow");

    await primaryAction.click();
    await expect(
      demo.getByText("Publish summaries opened from this panel: 2"),
    ).toBeVisible();

    await secondaryAction.click();
    await expect(page).toHaveURL(/\/examples\/task-flow$/);
  });
});
