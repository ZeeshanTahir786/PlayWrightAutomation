const { test, expect, devices } = require("@playwright/test");

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

test("validate sign in", async ({ page }) => {
  // page.setViewportSize({ width: 1280, height: 1200 });
  // do stuff then resize to a particular device size
  page.setViewportSize(devices["Desktop Chrome"].viewport);
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body .card-title a");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await username.type("rahulshetty");
  await page.locator("#password").type("learning");
  await signIn.click();
  console.log(await page.locator("div[style='display: block;']").textContent());
  await expect(page.locator("div[style='display: block;']")).toContainText(
    "Incorrect"
  );

  await username.fill("");
  await username.type("rahulshettyacademy");
  await signIn.click();
  await page.waitForNavigation();
  const titles = await cardTitles.allTextContents();
  console.log(titles);
  console.log(titles[0]);
  console.log(await cardTitles.nth(0).textContent());
  await expect(cardTitles.nth(0)).toContainText("iphone X");
});

test("Assertions", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const password = page.locator("#password");

  await username.fill("rahulshettyacademy");
  await password.type("learning");

  await page.locator("select.form-control").selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  await page.pause();
  // await signIn.click();
});

test("w3 school", async ({ page }) => {
  page.goto("https://www.w3schools.com/default.asp");
  await page.pause();
  // await signIn.click();
});
