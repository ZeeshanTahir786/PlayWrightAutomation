import { test, expect } from "@playwright/test";
test.describe("Start th exe", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  test("test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Go to https://rahulshettyacademy.com/loginpagePractise/
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // Click input[name="username"]
    await page.locator('input[name="username"]').click();
    // Fill input[name="username"]
    await page.locator('input[name="username"]').fill("rahulshettyacademy");
    // Click input[name="password"]
    await page.locator('input[name="password"]').click();
    // Fill input[name="password"]
    await page.locator('input[name="password"]').fill("learning");
    // Check input[name="terms"]
    await page.locator('input[name="terms"]').check();
    // Click text=Sign In
    await page.locator("text=Sign In").click();
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/angularpractice/shop"
    );
    // Click app-card-list img >> nth=0
    await page.locator("app-card-list img").first().click();
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/angularpractice/"
    );
    // Click text=Name Email Password Check me out if you Love IceCreams! Gender Male Female Emplo >> input[name="name"]
    await page
      .locator(
        'text=Name Email Password Check me out if you Love IceCreams! Gender Male Female Emplo >> input[name="name"]'
      )
      .click();
    // Fill text=Name Email Password Check me out if you Love IceCreams! Gender Male Female Emplo >> input[name="name"]
    await page
      .locator(
        'text=Name Email Password Check me out if you Love IceCreams! Gender Male Female Emplo >> input[name="name"]'
      )
      .fill("Hello");
    // Click input[name="email"]
    await page.locator('input[name="email"]').click();
    // Fill input[name="email"]
    await page.locator('input[name="email"]').fill("abx@gmail.com");
    // Click [placeholder="Password"]
    await page.locator('[placeholder="Password"]').click();
    // Fill [placeholder="Password"]
    await page.locator('[placeholder="Password"]').fill("123456");
    // Select Female
    await page.locator("select").selectOption("Female");
    // Check input[type="checkbox"]
    await page.locator('input[type="checkbox"]').check();
    // Check #inlineRadio2
    await page.locator("#inlineRadio2").check();
    // Fill input[name="bday"]
    await page.locator('input[name="bday"]').fill("2022-10-11");
    // Click text=Submit
    await page.locator("text=Submit").click();
    // Click text=× Success! The Form has been submitted successfully!.
    await page
      .locator("text=× Success! The Form has been submitted successfully!.")
      .click();
  });
});
