class PaymentMethodPage {
  constructor(page) {
    this.page = page;
    this.selCountry = page.locator("input[placeholder='Select Country']");
    this.dropdown = page.locator(".ta-results");
    this.email = page.locator(".user__name label[type='text']");
    this.submit = page.locator(".action__submit ");
  }
  async selectCountry() {
    await this.selCountry.type("pa", { delay: 100 });
    await this.dropdown.waitFor();

    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      let text = await this.dropdown.locator("button").nth(i).textContent();
      if (text === " Pakistan") {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
    return this.email;
  }
  async submitDetails() {
    await this.submit.click();
  }
}

module.exports = PaymentMethodPage;
