// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './playwright',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    browserName: 'chromium',
  },
});
