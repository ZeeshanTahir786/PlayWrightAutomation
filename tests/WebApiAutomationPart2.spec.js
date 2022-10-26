const { default: test, expect } = require("@playwright/test");

test.describe("Injecting Web Storage", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  let webContext;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const userEmail = "abc+22@gmail.com";

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    await email.type(userEmail);
    await password.type("Nisum@123");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");
    await context.storageState({ path: "state.json" });
    webContext = await browser.newContext({ storageState: "state.json" });
  });

  test("Test", async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const cardTitles = page.locator(".card-body b");
    const cardBody = page.locator(".card-body");
    const prodTitle = "adidas original";

    const titles = await cardTitles.allTextContents();
    const cart = page.locator("button[routerlink*='/cart']");
    console.log(titles);
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );
  });
});
