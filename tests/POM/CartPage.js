class CartPage {
  constructor(page) {
    this.page = page;
    this.addedProd = page.locator("div li");
    this.prodVisible = page.locator("h3:has-text('adidas original')");
    this.gotoCheckoutPage = page.locator("button[type='button']");
  }
  async verifyAddedProduct() {
    await this.addedProd.first().waitFor();
    const bool = await this.prodVisible.isVisible();
    return bool;
  }
  async gotoCheckoutpage() {
    await this.gotoCheckoutPage.last().click();
  }
}
module.exports = CartPage;
