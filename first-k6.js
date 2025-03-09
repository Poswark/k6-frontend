import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  page
    .goto('http://192.168.1.5:3000/', { waitUntil: 'networkidle' })
    .then(() => {
      page.screenshot({ path: 'screenshot.png' });
    })
    .finally(() => {
      page.close();
      browser.close();
    });
}