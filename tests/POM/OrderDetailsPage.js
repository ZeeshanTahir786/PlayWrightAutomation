class OrderDetailsPage {
  constructor(page) {
    this.page = page;
    this.thankyouText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    this.orderHistory = page.locator("label[routerlink='/dashboard/myorders']");
  }
  async validateOrderDetails() {
    const order = {};
    const orderId = await this.orderId.textContent();
    const id = orderId.split(" ")[2];
    order.id = id;
    order.thankyouText = await this.thankyouText.textContent();
    console.log("iddd", id, order);
    return order;
  }
  async gotoOrderHistory() {
    await this.orderHistory.click();
  }
}
module.exports = OrderDetailsPage;
