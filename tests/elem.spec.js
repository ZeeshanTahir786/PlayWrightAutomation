const { default: test, expect } = require("@playwright/test");

test.describe("Hide and show", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  test("Input field", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#name").type("Hafiz");
  });
});
