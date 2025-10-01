import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',        // folder where your test files are
  timeout: 30000,            // max time for each test in ms
  retries: 1,                // retry failed tests once
  reporter: [['html', { outputFolder: 'reports/html-report', open: 'always' }]], // HTML report
  use: {
    headless: false,         // run tests in headed mode (browser visible)
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // take screenshots on failure
    video: 'retain-on-failure',    // record video if test fails
  },
});