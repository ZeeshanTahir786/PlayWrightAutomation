const { test, expect } = require("@playwright/test");

test("Browser Context Platwight test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log(title);
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only("validate sign in", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator("#username").type("rahulshettyacademy");
  await page.locator("#password").type("learnin");
  console.log("LoginPagePractise");

  await page.locator("#signInBtn").click();
  console.log(await page.locator("div[style='display: block;']").textContent());
  await expect(page.locator("div[style='display: block;']")).toContainText(
    "Incorrect"
  );
});
