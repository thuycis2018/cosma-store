import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("should display the home page", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1");
    await expect(h1).toHaveText("FPGA Design Services");

    await expect(page.locator("text=/Top-tier FPGA expertise/")).toBeVisible();
    await expect(page.locator("text=Featured Offers")).toBeVisible();
  });
});
