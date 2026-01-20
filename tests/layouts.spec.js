import { test, expect } from '@playwright/test';

/**
 * Test suite for Jekyll theme layouts
 * Tests that all layouts render correctly without errors
 */

const layouts = [
  { name: 'archive', url: '/archive.html' },
  { name: 'article', url: '/article.html' },
  { name: 'dashboard', url: '/dashboard.html' },
  { name: 'default', url: '/default.html' },
  { name: 'gallery', url: '/gallery.html' },
  { name: 'landing', url: '/landing.html' },
  { name: 'profile', url: '/profile.html' },
  { name: 'post', url: '/post.html' },
  { name: 'faq', url: '/faq.html' },
  { name: 'docs', url: '/docs.html' },
  { name: 'search', url: '/search.html' },
  { name: 'settings', url: '/settings.html' },
  { name: 'splash', url: '/splash.html' },
  { name: 'form', url: '/form.html' },
  { name: 'app', url: '/app.html' },
  { name: 'chatroom', url: '/chatroom.html' },
  { name: 'minimal', url: '/minimal.html' },
  { name: 'minimal-base', url: '/minimal-base.html' },
  { name: 'fixed-height', url: '/fixed-height.html' },
  { name: 'scrollable', url: '/scrollable.html' },
];

test.describe('Layout Rendering Tests', () => {
  for (const layout of layouts) {
    test(`${layout.name} layout should render without errors`, async ({ page }) => {
      // Navigate to the test page
      const response = await page.goto(layout.url);
      
      // Check that the page loaded successfully
      expect(response?.status()).toBe(200);
      
      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');
      
      // Check that the page has content (not empty)
      const bodyText = await page.textContent('body');
      expect(bodyText).toBeTruthy();
      expect(bodyText.length).toBeGreaterThan(0);
      
      // Take a screenshot for visual reference
      await page.screenshot({ 
        path: `tests/screenshots/${layout.name}-layout.png`,
        fullPage: true 
      });
      
      // Check for JavaScript errors in console
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Verify no critical errors occurred
      expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
    });
  }
});

test.describe('Layout Accessibility Tests', () => {
  test('layouts should have proper semantic structure', async ({ page }) => {
    // Test one representative layout for semantic structure
    await page.goto('/article.html');
    
    // Check for main landmark
    const main = await page.locator('main').count();
    expect(main).toBeGreaterThan(0);
    
    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
  });
});

test.describe('Layout Responsive Tests', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];
  
  for (const viewport of viewports) {
    test(`default layout should render properly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/default.html');
      
      await page.waitForLoadState('networkidle');
      
      // Take screenshot at this viewport size
      await page.screenshot({ 
        path: `tests/screenshots/default-${viewport.name}.png`,
        fullPage: true 
      });
      
      // Verify page is visible
      const isVisible = await page.locator('body').isVisible();
      expect(isVisible).toBe(true);
    });
  }
});
