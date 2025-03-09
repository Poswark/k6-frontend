import { browser } from 'k6/browser';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "/home/k6/screenshots/result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export const options = {
  thresholds: {
    'http_req_duration{scenario:browser}': ['p(95)<2000'], 
    'http_req_failed{scenario:browser}': ['rate<0.01'], // Errores < 1%
  },
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 10,
      duration: '2m',
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
    let response = await page.goto('http://192.168.1.5:3000/');
    check(response, {
      'status is 200 or 304': (res) => res.status() === 200 || res.status() === 304,
      //'response time is acceptable': (res) => res.timing().responseEnd < 4000,
    });
    await page.screenshot({ path: 'screenshots/home_screenshot.png' });

    sleep(1); // Espera 1 segundo antes de continuar

    response = await page.goto('http://192.168.1.5:3000/hola');
    check(response, {
      'status is 200 or 304': (res) => res.status() === 200 || res.status() === 304,
      //'response time is acceptable': (res) => res.timing().responseEnd < 4000,
    });
    await page.screenshot({ path: 'screenshots/hola_screenshot.png' });

  } catch (error) {
    console.error('Test execution failed:', error);
  } finally {
    await page.close();
  }
}