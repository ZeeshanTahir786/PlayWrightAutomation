const { chromium, default: test } = require("@playwright/test");

test.describe("Abc", () => {
  test.use({
    viewport: {
      width: 1920,
      height: 1080,
    },
  });

  let browser = null;
  let context = null;
  let page = null;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.only("should", async () => {
    await page.goto("https://www.google.com");
    //   await browser.close();
  });
});

// (async () => {
//   const browser = chromium.launch({ headless: false });
//   browser.
//   //   await chromium.launch({
//   //     headless: false,
//   //     args: ["--start-maximized"],
//   //   });
//   const context = await browser.newContext({ viewport: null });
//   const page = await context.newPage();

//   await page.goto("https://www.google.com");
//   //   await browser.close();
// })();
