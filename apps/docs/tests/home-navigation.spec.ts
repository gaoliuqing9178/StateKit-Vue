import { expect, test } from "@playwright/test";

test.describe("Home navigation", () => {
  test("opens recipes and installation from the hero CTA row", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("home-browse-recipes").click();
    await expect(page).toHaveURL(/\/recipes$/);
    await expect(page.getByTestId("recipe-list-empty")).toBeVisible();

    await page.goto("/");

    await page.getByTestId("home-open-installation").click();
    await expect(page).toHaveURL(/\/docs\/installation$/);
    await expect(
      page.getByRole("heading", {
        name: "Start with one category component, then change only the product language.",
      }),
    ).toBeVisible();
  });

  test("opens the remaining example pages from the home examples section", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("home-example-link-permissions-and-upgrade").click();
    await expect(page).toHaveURL(/\/examples\/permissions-and-upgrade$/);
    await expect(
      page.getByRole("heading", { name: "Permissions And Upgrade" }),
    ).toBeVisible();

    await page.goto("/");

    await page.getByTestId("home-example-link-task-flow").click();
    await expect(page).toHaveURL(/\/examples\/task-flow$/);
    await expect(page.getByRole("heading", { name: "Task Flow" })).toBeVisible();
  });
});
