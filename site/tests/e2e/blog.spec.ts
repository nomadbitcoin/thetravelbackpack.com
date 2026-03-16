import { test, expect } from '@playwright/test';

test.describe('Blog Pages', () => {
  test('should display blog listing page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Travel Blog/);

    const heading = page.locator('h1');
    await expect(heading).toContainText('Travel Blog');
  });

  test('should display blog posts on listing page', async ({ page }) => {
    await page.goto('/blog');
    const articles = page.locator('article');
    await expect(articles).toHaveCount(1); // We have 1 placeholder post
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');
    const firstPostLink = page.locator('article a').first();
    await firstPostLink.click();

    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator('article h1')).toBeVisible();
  });

  test('should display affiliate disclosure on post with affiliate links', async ({ page }) => {
    await page.goto('/blog/ultimate-travel-backpack-guide');
    const disclosure = page.locator('text=affiliate links');
    await expect(disclosure).toBeVisible();
  });

  test('should display tags on blog post', async ({ page }) => {
    await page.goto('/blog/ultimate-travel-backpack-guide');
    const tags = page.locator('span:has-text("gear")');
    await expect(tags).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/blog/ultimate-travel-backpack-guide');

    // Check title
    await expect(page).toHaveTitle(/Ultimate Travel Backpack Guide/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });
});
