const { test, expect, request } = require("@playwright/test");
const CartPage = require("../POM/CartPage");
const Dashboard = require("../POM/Dashboard");
const LoginPage = require("../POM/LoginPage");
const OrderDetailsPage = require("../POM/OrderDetailsPage");
const OrdersPage = require("../POM/OrdersPage");
const PaymentMethodPage = require("../POM/PaymentMethodPage");
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

    const paymentMethodPage = new PaymentMethodPage(page);
    const email = await paymentMethodPage.selectCountry();
    await expect(email).toHaveText(userEmail);
    await paymentMethodPage.submitDetails();

    const orderDetailsPage = new OrderDetailsPage(page);
    let id;
    const order = orderDetailsPage.validateOrderDetails();
    order.then((x) => {
      id = x.id;
      console.log("idddddd", x.id);
    });
    await orderDetailsPage.gotoOrderHistory();

    const ordersPage = new OrdersPage(page);
    await ordersPage.searchProd(id, userEmail);
    await page.pause();
  });
});
