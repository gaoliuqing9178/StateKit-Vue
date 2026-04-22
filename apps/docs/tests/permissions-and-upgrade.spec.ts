import { expect, test } from "@playwright/test";

test.describe("Permissions and upgrade example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/examples/permissions-and-upgrade");
  });

  test("submits an access request and keeps the policy link navigable", async ({ page }) => {
    const demo = page.getByTestId("request-access-demo");
    const approvalsMetric = page
      .locator(".demo-metric")
      .filter({ hasText: "Pending approvals" });
    const primaryAction = demo.getByRole("button", { name: "Request access" });
    const secondaryAction = demo.getByRole("link", { name: "Review policy" });

    await expect(secondaryAction).toHaveAttribute("href", "/recipes/no-permission-state");

    await primaryAction.click();

    await expect(demo.getByRole("button", { name: "Sending request..." })).toBeDisabled();
    await expect(approvalsMetric.locator("strong")).toHaveText("5");

    await secondaryAction.click();
    await expect(page).toHaveURL(/\/recipes\/no-permission-state$/);
  });

  test("keeps the stale-session recovery flow to a single CTA", async ({ page }) => {
    const demo = page.getByTestId("session-recovery-demo");
    const recoveredSessionsMetric = page
      .locator(".demo-metric")
      .filter({ hasText: "Recovered sessions" });
    const primaryAction = demo.getByRole("button", { name: "Sign in again" });

    await expect(demo.getByRole("button")).toHaveCount(1);

    await primaryAction.click();

    await expect(
      demo.getByRole("button", { name: "Redirecting to sign in..." }),
    ).toBeDisabled();
    await expect(demo.getByRole("button")).toHaveCount(1);
    await expect(recoveredSessionsMetric.locator("strong")).toHaveText("2");
  });

  test("handles the page-level upgrade CTA and routes to the quota recipe", async ({ page }) => {
    const demo = page.getByTestId("approval-routing-demo");
    const billingMetric = page
      .locator(".demo-metric")
      .filter({ hasText: "Billing unlocks" });
    const primaryAction = demo.getByRole("button", {
      name: "Open billing workspace",
    });
    const secondaryAction = demo.getByRole("link", { name: "See quota state" });

    await expect(secondaryAction).toHaveAttribute("href", "/recipes/usage-limit-state");

    await primaryAction.click();

    await expect(
      demo.getByRole("button", { name: "Opening billing workspace..." }),
    ).toBeDisabled();
    await expect(billingMetric.locator("strong")).toHaveText("1");

    await secondaryAction.click();
    await expect(page).toHaveURL(/\/recipes\/usage-limit-state$/);
  });

  test("keeps disabled quota actions inert while inline permission actions still work", async ({ page }) => {
    const demo = page.getByTestId("quota-review-demo");
    const disabledPrimaryAction = demo.getByRole("button", {
      name: "Increase limit",
    });
    const exportAction = demo.getByRole("button", { name: "Export usage report" });
    const pingAction = demo.getByRole("button", { name: "Ping admin" });

    await expect(disabledPrimaryAction).toBeDisabled();
    await expect(demo.getByText("2 reports")).toBeVisible();

    await exportAction.click();
    await expect(demo.getByText("3 reports")).toBeVisible();

    await pingAction.click();
    await expect(demo.getByText("Admin pings sent: 2")).toBeVisible();
  });
});
