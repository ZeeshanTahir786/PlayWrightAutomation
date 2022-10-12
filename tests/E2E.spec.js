const { test, expect } = require("@playwright/test");
test.describe("E2E playright", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  test("Client App Login", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    const cardBody = page.locator(".card-body");
    const prodTitle = "adidas original";

    await email.type("abc+22@gmail.com");
    await password.type("Nisum@123");
    await loginBtn.click();
    await page.waitForNavigation();
    const titles = await cardTitles.allTextContents();
    console.log(titles);
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );
    const count = await cardBody.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
      if (titles[i] === prodTitle) {
        await cardBody.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
    await page.pause();
  });
});
