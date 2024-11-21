import { test as setup, expect } from "@playwright/test";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const authFile = path.join(__dirname, "../../playwright/.auth/user.json");
// npx playwright test --project=setup
setup("authenticate", async ({ page }) => {
  await page.goto("/");
  const loginMenu = page
    .locator("div")
    .filter({ hasText: /^0$/ })
    .getByRole("button");

  if (await loginMenu.isVisible()) {
    await page
      .locator("div")
      .filter({ hasText: /^0$/ })
      .getByRole("button")
      .click();

    await page.getByRole("button", { name: "Login" }).click();
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error("EMAIL environment variable is not defined");
    }
    await page.getByLabel("Email address").fill(process.env.EMAIL);
    const passwordField = page.locator('input[type="password"]');
    await passwordField.fill(process.env.PASSWORD);
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^0$/ })
      .getByRole("button")
      .click();
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();

    // End of authentication steps.
    await page.context().storageState({ path: authFile });
  }
});
