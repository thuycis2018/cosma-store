import { test, expect } from "@playwright/test";

test.describe("Add to cart", () => {
  test("should add to cart and update cart quantity icon", async ({ page }) => {
    await page.goto("/products/premium-package");
    await expect(
      page.getByRole("button", { name: "Add To Cart" })
    ).toBeVisible();

    // check current cart quantity
    const cartQuantity = page.locator('[data-testid="cart-quantity"]');
    const initialQuantity = parseInt(
      (await cartQuantity.textContent())?.trim() || "0",
      10
    );

    // click add-to-cart
    await page.getByRole("button", { name: "Add To Cart" }).click();

    // wait for add-to-cart call - cart page renders
    await expect(page.locator("h2")).toHaveText("Shopping Cart");

    // check new quantity in cart
    const updatedQuantity = parseInt(
      (await cartQuantity.textContent())?.trim() || "0",
      10
    );
    expect(updatedQuantity).toBe(initialQuantity + 1);
  });

  test("should add correct item and quantity to cart", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Basic Package" }).click();

    // check current cart quantity
    const cartQuantity = page.locator('[data-testid="cart-quantity"]');
    const initialQuantity = parseInt(
      (await cartQuantity.textContent())?.trim() || "0",
      10
    );

    // set new quantity for selected product
    const newQuantity = "3";
    await page.getByRole("combobox").click();
    await page.getByLabel(newQuantity).click();

    // click to add-to-cart
    await page.getByRole("button", { name: "Add To Cart" }).click();

    // wait for add-to-cart call - cart page renders
    await expect(page.locator("h2")).toHaveText("Shopping Cart");

    // check new quantity in cart
    const updatedQuantity = parseInt(
      (await cartQuantity.textContent())?.trim() || "0",
      10
    );
    expect(updatedQuantity).toBe(initialQuantity + parseInt(newQuantity));

    // check for the correct item in cart
    await expect(page.locator("text=/Basic Package/")).toBeVisible();
  });
});
