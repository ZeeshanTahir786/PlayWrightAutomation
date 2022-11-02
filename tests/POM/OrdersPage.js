const { expect } = require("@playwright/test");

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.tbody = page.locator("tbody");
    this.orderIDsList = page.locator("tbody tr th");
    this.view = page.locator("tbody tr td button[class='btn btn-primary']");
    this.id = page.locator(".row .col-text.-main");
    this.email = page.locator(".address p:nth-child(2)");
  }
  async searchProd(id, userEmail) {
    await this.tbody.waitFor();
    const orderCount = await this.orderIDsList.count();
    console.log("countttt", orderCount);
    console.log("OrdersPage", id);
    for (let i = 0; i < orderCount; ++i) {
      const ordr = await this.orderIDsList.nth(i).textContent();
      if (ordr === id) {
        await this.view.nth(i).click();
      }
    }
    await expect(this.id).toHaveText(id);
    await expect(await this.email.first()).toHaveText(userEmail);
  }
}
module.exports = OrdersPage;
