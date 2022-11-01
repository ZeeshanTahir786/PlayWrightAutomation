const { default: test, expect } = require("@playwright/test");

test.describe("Injecting Web Storage", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  let webContext;
  test("Hello", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://10.4.100.187/");
    const text = await page
      .locator(".ant-menu-title-content span:nth-child(2)")
      .textContent();
    console.log(text);
    await page
      .locator(
        ".ant-menu-item-group-list span[class*='anticon anticon-team ant-menu-item-icon']"
      )
      .click();
    const emp = await page
      .locator(
        "li[data-menu-id*='rc-menu-uuid-83825-1-employees'] span span:nth-child(2)"
      )
      .textContent();
    console.log(emp);
  });

  //   test.beforeAll(async ({ browser }) => {
  //     const context = await browser.newContext();
  //     const page = await context.newPage();
  //     await page.goto("https://rahulshettyacademy.com/client");
  //     const userEmail = "abc+22@gmail.com";
  //     const email = page.locator("#userEmail");
  //     const password = page.locator("#userPassword");
  //     const loginBtn = page.locator("#login");
  //     await email.type(userEmail);
  //     await password.type("Nisum@123");
  //     await loginBtn.click();
  //     await page.waitForLoadState("networkidle");
  //     await context.storageState({ path: "state.json" });
  //     webContext = await browser.newContext({ storageState: "state.json" });
  //   });

  //   test("Test", async () => {
  //     const page = await webContext.newPage();
  //     await page.goto("https://rahulshettyacademy.com/client");
  //     const cardTitles = page.locator(".card-body b");
  //     const cardBody = page.locator(".card-body");
  //     const prodTitle = "adidas original";

  //     const titles = await cardTitles.allTextContents();
  //     const cart = page.locator("button[routerlink*='/cart']");
  //     console.log(titles);
  //     await expect(page).toHaveURL(
  //       "https://rahulshettyacademy.com/client/dashboard/dash"
  //     );
  //   });
});
