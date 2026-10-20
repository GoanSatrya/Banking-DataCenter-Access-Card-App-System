import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: 'https://dashboard.devepass3dc.dti.co.id',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    headless: false,
    channel: 'chrome',
  },
  projects: [
    {
      name: 'chrome',
      use: {},
    },
  ],
});