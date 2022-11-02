class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginBtn = page.locator("#login");
  }
  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
  async validateLogin(username, password) {
    await this.email.type(username);
    await this.password.type(password);
    await this.loginBtn.click();
    await this.page.waitForNavigation();
  }
}
module.exports = LoginPage;
