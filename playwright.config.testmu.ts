import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

if (!LT_USERNAME || !LT_ACCESS_KEY) {
  throw new Error('LT_USERNAME and LT_ACCESS_KEY must be set in .env file');
}

const buildLtEndpoint = (browserName: string, platform: string, testName: string) => {
  const capabilities = {
    browserName,
    browserVersion: 'latest',
    'LT:Options': {
      username: LT_USERNAME,
      accessKey: LT_ACCESS_KEY,
      platform,
      build: 'Playwright 101 Assignment',
      project: 'TestMu AI Certification',
      name: testName,
      network: true,
      video: true,
      console: true,
      screenshot: 'on',
      w3c: true,
    },
  };
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: 'html',
  timeout: 120000,

  projects: [
    {
      name: 'Windows10-Chrome',
      use: {
        connectOptions: {
          wsEndpoint: buildLtEndpoint('Chrome', 'Windows 10', 'Playwright 101 - Win10 Chrome'),
        },
      },
    },
    {
      name: 'macOSCatalina-Firefox',
      use: {
        connectOptions: {
          wsEndpoint: buildLtEndpoint('pw-firefox', 'macOS Sonoma', 'Playwright 101 - macOS Firefox'),
        },
      },
    },
  ],
});
