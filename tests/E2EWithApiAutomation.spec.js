const { test, expect, request } = require("@playwright/test");
const APIUtils = require("./Utils/APIUtils");
test.describe("E2E playright", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  let orderId;
  let response;
  const loginPayload = {
    userEmail: "abc+22@gmail.com",
    userPassword: "Nisum@123",
  };
  const orderPayload = {
    orders: [
      { country: "Pakistan", productOrderedId: "6262e95ae26b7e1a10e89bf0" },
    ],
  };

  test.beforeAll(async ({ browser }) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
  });
  test("Client App Login", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.addInitScript((val) => {
      window.localStorage.setItem("token", val);
    }, response?.token);

    await page.goto("https://rahulshettyacademy.com/client");
    const userEmail = "abc+22@gmail.com";

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    const cardBody = page.locator(".card-body");
    const prodTitle = "adidas original";

    // await email.type(userEmail);
    // await password.type("Nisum@123");
    // await loginBtn.click();
    // await page.waitForNavigation();
    // const titles = await cardTitles.allTextContents();
    // const cart = page.locator("button[routerlink*='/cart']");
    // console.log(titles);
    // await expect(page).toHaveURL(
    //   "https://rahulshettyacademy.com/client/dashboard/dash"
    // );
    // const count = await cardBody.count();
    // console.log(count);
    // for (let i = 0; i < count; ++i) {
    //   if (titles[i] === prodTitle) {
    //     await cardBody.nth(i).locator("text= Add To Cart").click();
    //     break;
    //   }
    // }
    // await cart.click();
    // const abc = page.locator("div li");
    // await abc.first().waitFor();
    // const bool = await page
    //   .locator("h3:has-text('adidas original')")
    //   .isVisible();
    // expect(bool).toBeTruthy();
    // await page.locator("button[type='button']").last().click();
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

    await page.locator(".btn-custom[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const orderIDsList = await page.locator("tbody tr th");
    const orderCount = await orderIDsList.count();
    console.log("countttt", orderCount);
    for (let i = 0; i < orderCount; ++i) {
      const ordr = await orderIDsList.nth(i).textContent();
      if (ordr === response?.orderId) {
        await page
          .locator("tbody tr td button[class='btn btn-primary']")
          .nth(i)
          .click();
      }
    }
    await page.locator(".email-container").waitFor();
    await expect(page.locator(".row .col-text.-main")).toHaveText(
      response?.orderId
    );
    await expect(
      await page.locator(".address p:nth-child(2)").first()
    ).toHaveText(userEmail);
    await expect(
      await page.locator(".address p:nth-child(2)").last()
    ).toHaveText(userEmail);
    await page.pause();
  });
});
