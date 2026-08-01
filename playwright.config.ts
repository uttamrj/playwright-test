import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: 'html',
  timeout: 60000,

  use: {
    baseURL: 'https://www.testmuai.com/selenium-playground/',
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    launchOptions: {slowMo: 1000}
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
