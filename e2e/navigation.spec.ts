import { test, expect } from "@playwright/test";

/**
 * Click-through tests: clicking a header control lands on the expected route.
 * Names use .first() (footer repeats some link texts; the navbar is first in
 * the DOM).
 */
const NAV = [
  { name: "About Us", url: /\/about$/ },
  { name: "Products", url: /\/products$/ },
  { name: "Applications", url: /\/applications$/ },
  { name: "News", url: /\/news$/ },
];

test.describe("Header navigation", () => {
  for (const item of NAV) {
    test(`nav "${item.name}" navigates`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("link", { name: item.name, exact: true }).first().click();
      await expect(page).toHaveURL(item.url);
    });
  }

  test("logo returns home", async ({ page }) => {
    await page.goto("/about");
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$/);
  });
});
