const puppeteer = require('puppeteer');

async function fetchPage(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    const html = await page.content();
    if (browser) {
      await browser.close();
    }
    return html;
  } catch (err) {
    if (browser) {
      await browser.close();
    }
    throw new Error(`Failed to fetch page: ${err.message}`);
  }
}

module.exports = fetchPage;
