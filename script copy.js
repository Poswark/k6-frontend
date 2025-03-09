import { browser } from 'k6/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "/home/k6/screenshots/result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto('http://192.168.1.5:3000/');
    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}