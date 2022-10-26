const { test, expect, request } = require("@playwright/test");
const APIUtils = require("./Utils/APIUtils");
test.describe("E2E playright", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
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
