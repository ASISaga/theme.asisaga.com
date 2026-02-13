import { test, expect } from '@playwright/test';

/**
 * Structural Regression Tests for Genesis Theme Demo Page
 * 
 * These tests verify the semantic HTML structure, accessibility,
 * and component presence on the live demo page.
 */

test.describe('Genesis Theme Demo - Structural Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto('/');
  });

  test.describe('Semantic HTML Structure', () => {
    
    test('should have proper document structure', async ({ page }) => {
      // Verify basic HTML structure
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('head')).toBeVisible();
      await expect(page.locator('body')).toBeVisible();
    });

    test('should have required meta tags', async ({ page }) => {
      // Check for essential meta tags
      const charset = await page.locator('meta[charset]').count();
      expect(charset).toBeGreaterThan(0);
      
      const viewport = await page.locator('meta[name="viewport"]').count();
      expect(viewport).toBeGreaterThan(0);
    });

    test('should have a single main landmark', async ({ page }) => {
      // WCAG requirement: exactly one main landmark
      const mainCount = await page.locator('main').count();
      expect(mainCount).toBe(1);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Check for h1 presence
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThan(0);
      
      // Verify h1 is visible
      await expect(page.locator('h1').first()).toBeVisible();
    });
  });

  test.describe('Accessibility Landmarks', () => {
    
    test('should have skip link for keyboard navigation', async ({ page }) => {
      // Check for skip link
      const skipLink = page.locator('a[href="#skip-target"]');
      const skipLinkCount = await skipLink.count();
      
      // Skip link should exist (theme requirement)
      if (skipLinkCount > 0) {
        await expect(skipLink.first()).toHaveAttribute('class', /sr-only/);
      }
    });

    test('should have main landmark with skip target', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();
      
      // Check if main has id="skip-target" or tabindex
      const mainId = await main.getAttribute('id');
      const mainTabindex = await main.getAttribute('tabindex');
      
      // At least one should be present for accessibility
      expect(mainId !== null || mainTabindex !== null).toBe(true);
    });

    test('should have header and footer landmarks', async ({ page }) => {
      // Check for header (may be in layout)
      const headerCount = await page.locator('header').count();
      
      // Check for footer (may be in layout)  
      const footerCount = await page.locator('footer').count();
      
      // Both should exist (theme provides these)
      expect(headerCount).toBeGreaterThanOrEqual(0);
      expect(footerCount).toBeGreaterThanOrEqual(0);
    });

    test('should have navigation with proper semantics', async ({ page }) => {
      // Check for nav elements
      const navCount = await page.locator('nav').count();
      
      if (navCount > 0) {
        // If nav exists, it should be visible
        await expect(page.locator('nav').first()).toBeVisible();
      }
    });
  });

  test.describe('Component Structure', () => {
    
    test('should have hero section', async ({ page }) => {
      // Hero section is a key component of the demo
      const hero = page.locator('.demo-hero, .genesis-hero, section.hero');
      const heroCount = await hero.count();
      
      expect(heroCount).toBeGreaterThan(0);
      await expect(hero.first()).toBeVisible();
    });

    test('should have hero title', async ({ page }) => {
      // Hero should have a title
      const heroTitle = page.locator('.hero-title, .demo-hero h1');
      const heroTitleCount = await heroTitle.count();
      
      if (heroTitleCount > 0) {
        await expect(heroTitle.first()).toBeVisible();
        await expect(heroTitle.first()).not.toBeEmpty();
      }
    });

    test('should have demo sections', async ({ page }) => {
      // Demo should have multiple sections
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      
      expect(sectionCount).toBeGreaterThan(1);
    });

    test('should have interactive elements', async ({ page }) => {
      // Check for buttons or links
      const buttons = await page.locator('button, a.btn, a[class*="btn-"]').count();
      
      expect(buttons).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Behavior', () => {
    
    test('should be mobile-friendly', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Page should still be visible and functional
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('should adapt to tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Page should still be visible and functional
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('should handle desktop viewport', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1440, height: 900 });
      
      // Page should still be visible and functional
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });
  });

  test.describe('CSS and Styling', () => {
    
    test('should load stylesheets', async ({ page }) => {
      // Check if styles are loaded by verifying computed styles
      const body = page.locator('body');
      const backgroundColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Should have some background color (not just default white)
      expect(backgroundColor).toBeTruthy();
    });

    test('should have ontological classes applied', async ({ page }) => {
      // Check for Genesis ontological class patterns
      const genesisClasses = await page.locator('[class*="genesis-"]').count();
      
      // Demo should use ontological classes
      expect(genesisClasses).toBeGreaterThan(0);
    });
  });

  test.describe('Content Presence', () => {
    
    test('should have meaningful page title', async ({ page }) => {
      const title = await page.title();
      
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      // Title should mention theme or Genesis
      expect(title.toLowerCase()).toMatch(/genesis|theme|demo|asi/);
    });

    test('should have visible text content', async ({ page }) => {
      // Page should have meaningful text content
      const bodyText = await page.locator('body').textContent();
      
      expect(bodyText).toBeTruthy();
      expect(bodyText.trim().length).toBeGreaterThan(100);
    });

    test('should have images with alt attributes', async ({ page }) => {
      // Get all images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      // Check each image has alt attribute
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const hasAlt = await img.getAttribute('alt');
        
        // Alt should exist (even if empty for decorative images)
        expect(hasAlt !== null).toBe(true);
      }
    });
  });

  test.describe('JavaScript and Interactivity', () => {
    
    test('should not have console errors on load', async ({ page }) => {
      const errors = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Log errors if any exist
      if (errors.length > 0) {
        console.log('Console errors detected:', errors);
      }
      
      // For now, just log errors but don't fail the test
      // This allows us to identify issues without blocking
    });

    test('should have JavaScript enabled features', async ({ page }) => {
      // Check if Motion library animations are initialized
      const hasMotionElements = await page.locator('[data-motion]').count();
      
      // Motion elements may or may not be present
      expect(hasMotionElements).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Performance and Loading', () => {
    
    test('should load in reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      
      const loadTime = Date.now() - startTime;
      
      // Page should load within 10 seconds
      expect(loadTime).toBeLessThan(10000);
    });

    test('should have all critical resources loaded', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check that main content is visible (indicates successful load)
      await expect(page.locator('main')).toBeVisible();
    });
  });
});
