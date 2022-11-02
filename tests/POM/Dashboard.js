class Dashboard {
  constructor(page) {
    this.page = this.page;
    this.cardTitles = page.locator(".card-body b");
    this.cardBody = page.locator(".card-body");
    this.cart = page.locator("button[routerlink*='/cart']");
  }
  async searchProduct(prodTitle) {
    const titles = await this.cardTitles.allTextContents();
    console.log(titles);
    const count = await this.cardBody.count();
    console.log(count);

    for (let i = 0; i < count; ++i) {
      if (titles[i] === prodTitle) {
        await this.cardBody.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async gotoCart() {
    await this.cart.click();
  }
}
module.exports = Dashboard;
