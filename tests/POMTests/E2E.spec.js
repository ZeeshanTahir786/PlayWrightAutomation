const { test, expect, request } = require("@playwright/test");
const CartPage = require("../POM/CartPage");
const Dashboard = require("../POM/Dashboard");
const LoginPage = require("../POM/LoginPage");
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

    const userEmail = "abc+22@gmail.com";
    const password = "Nisum@123";
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.validateLogin(userEmail, password);
    const prodTitle = "adidas original";
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );
    const dashboard = new Dashboard(page);
    await dashboard.searchProduct(prodTitle);
    await dashboard.gotoCart();
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/cart"
    );

    const cartPage = new CartPage(page);
    const bool = await cartPage.verifyAddedProduct();
    expect(bool).toBeTruthy();
    await cartPage.gotoCheckoutpage();
    // await page
    //   .locator("input[placeholder='Select Country']")
    //   .type("pa", { delay: 100 });

    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();

    // const optionsCount = await dropdown.locator("button").count();
    // for (let i = 0; i < optionsCount; ++i) {
    //   let text = await dropdown.locator("button").nth(i).textContent();
    //   if (text === " Pakistan") {
    //     dropdown.locator("button").nth(i).click();
    //     break;
    //   }
    // }

    // await expect(page.locator(".user__name label[type='text']")).toHaveText(
    //   userEmail
    // );

    // await page.locator(".action__submit ").click();

    // expect(page.locator(".hero-primary")).toHaveText(
    //   " Thankyou for the order. "
    // );
    // const orderId = await page
    //   .locator(".em-spacer-1 .ng-star-inserted")
    //   .textContent();

    // const id = orderId.split(" ")[2];
    // console.log("iddd", id);

    // await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click();
    // await page.locator("tbody").waitFor();
    // const orderIDsList = await page.locator("tbody tr th");
    // const orderCount = await orderIDsList.count();
    // console.log("countttt", orderCount);
    // for (let i = 0; i < orderCount; ++i) {
    //   const ordr = await orderIDsList.nth(i).textContent();
    //   if (ordr === id) {
    //     await page
    //       .locator("tbody tr td button[class='btn btn-primary']")
    //       .nth(i)
    //       .click();
    //   }
    // }
    // await expect(page.locator(".row .col-text.-main")).toHaveText(id);
    // await expect(
    //   await page.locator(".address p:nth-child(2)").first()
    // ).toHaveText(userEmail);
    // await expect(
    //   await page.locator(".address p:nth-child(2)").last()
    // ).toHaveText(userEmail);
    await page.pause();
  });
});
