//playwright/example.spec.js

// playwright/example.spec.js
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBe('Vite + React');
});
