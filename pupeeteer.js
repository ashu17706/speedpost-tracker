const pupeeteer = require("puppeteer");

class Puppeteer {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init(params) {
    try {
    browser = await pupeeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(100000);
    } catch(error) {

    }
  }
}