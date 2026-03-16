import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Travel Backpack/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('h1');
    await expect(hero).toContainText('Lorem Ipsum');
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
    await expect(page.locator('nav a[href="/resources"]')).toBeVisible();
    await expect(page.locator('nav a[href="/about"]')).toBeVisible();
  });

  test('should display latest posts section', async ({ page }) => {
    await page.goto('/');
    const latestPostsHeading = page.locator('h2:has-text("Latest Travel Guides")');
    await expect(latestPostsHeading).toBeVisible();
  });

  test('should have footer with affiliate disclosure', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('affiliate links');
  });
});
