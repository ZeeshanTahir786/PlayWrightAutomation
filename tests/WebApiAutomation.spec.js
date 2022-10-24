const { default: test, request, expect } = require("@playwright/test");

test.describe("Web APi Automation", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });
  const loginPayload = {
    userEmail: "abc+22@gmail.com",
    userPassword: "Nisum@123",
  };

  test.beforeAll(async ({ browser }) => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: loginPayload,
      }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = await loginResponseJson.token;
    console.log(token);
  });

  test("Store token on local storage", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
  });
});
