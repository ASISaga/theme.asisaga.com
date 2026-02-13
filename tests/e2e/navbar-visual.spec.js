import { test, expect } from '@playwright/test';

/**
 * Enhanced Navbar and Dimension Visual Tests
 * 
 * Tests for specific dimension and navbar issues on desktop and mobile.
 * Includes visual regression checks and overflow detection.
 */

test.describe('Navbar Visual and Dimension Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop Navbar Tests (1440px)', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(500); // Allow layout to stabilize
    });

    test('navbar should be visible and properly positioned', async ({ page }) => {
      const header = page.locator('.genesis-header');
      const nav = page.locator('.genesis-header__nav');
      
      // Header should be visible
      await expect(header).toBeVisible();
      
      // Nav should be visible on desktop
      await expect(nav).toBeVisible();
      
      // Header should be at top of page
      const headerBox = await header.boundingBox();
      expect(headerBox?.y).toBeLessThanOrEqual(10);
    });

    test('navbar items should be horizontally aligned', async ({ page }) => {
      const navList = page.locator('.navbar__list');
      
      const flexDirection = await navList.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });
      
      // Should be row (horizontal) on desktop
      expect(flexDirection).toBe('row');
    });

    test('navbar should not cause horizontal overflow', async ({ page }) => {
      const body = await page.evaluate(() => ({
        scrollWidth: document.body.scrollWidth,
        clientWidth: document.body.clientWidth,
        htmlScrollWidth: document.documentElement.scrollWidth,
        htmlClientWidth: document.documentElement.clientWidth
      }));
      
      // No horizontal scrollbar should be present
      expect(body.scrollWidth).toBeLessThanOrEqual(body.clientWidth + 1);
      expect(body.htmlScrollWidth).toBeLessThanOrEqual(body.htmlClientWidth + 1);
    });

    test('header container should not overflow', async ({ page }) => {
      const container = page.locator('.genesis-header__container');
      
      const overflow = await container.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.getBoundingClientRect();
        return {
          overflow: window.getComputedStyle(el).overflow,
          overflowX: window.getComputedStyle(el).overflowX,
          exceedsParent: rect.width > parentRect.width
        };
      });
      
      // Container should have visible overflow for mobile drawer to work
      expect(overflow.overflow).toBe('visible');
      // But should not actually exceed parent width
      expect(overflow.exceedsParent).toBe(false);
    });

    test('navbar links should have proper spacing', async ({ page }) => {
      const navList = page.locator('.navbar__list');
      
      const gap = await navList.evaluate((el) => {
        return window.getComputedStyle(el).gap;
      });
      
      // Should have at least some gap between items
      expect(gap).not.toBe('0px');
    });
  });

  test.describe('Mobile Navbar Tests (375px)', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500); // Allow layout to stabilize
    });

    test('mobile menu toggle should be visible', async ({ page }) => {
      const toggle = page.locator('.genesis-header__toggle');
      await expect(toggle).toBeVisible();
      
      // Should be clickable
      await expect(toggle).toBeEnabled();
    });

    test('mobile nav should be off-screen by default', async ({ page }) => {
      const nav = page.locator('.genesis-header__nav');
      
      const navState = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const transform = styles.transform;
        const rect = el.getBoundingClientRect();
        
        return {
          transform,
          position: styles.position,
          right: rect.right,
          viewportWidth: window.innerWidth,
          isOffScreen: rect.left >= window.innerWidth
        };
      });
      
      // Nav should be fixed positioned
      expect(navState.position).toBe('fixed');
      
      // Nav should be translated off-screen
      expect(navState.transform).toContain('translateX');
      
      // Nav should be off-screen (either via transform or position)
      expect(navState.isOffScreen).toBe(true);
    });

    test('mobile nav should have proper width', async ({ page }) => {
      const nav = page.locator('.genesis-header__nav');
      
      const navDimensions = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          width: styles.width,
          maxWidth: styles.maxWidth,
          actualWidth: el.offsetWidth
        };
      });
      
      // Max width should be 340px as per design
      expect(navDimensions.maxWidth).toBe('340px');
      
      // Actual width should not exceed viewport
      expect(navDimensions.actualWidth).toBeLessThanOrEqual(375);
    });

    test('mobile nav should not cause horizontal overflow', async ({ page }) => {
      const bodyOverflow = await page.evaluate(() => ({
        scrollWidth: document.body.scrollWidth,
        clientWidth: document.body.clientWidth
      }));
      
      // No horizontal overflow even with fixed nav
      expect(bodyOverflow.scrollWidth).toBeLessThanOrEqual(bodyOverflow.clientWidth + 1);
    });

    test('mobile nav should be scrollable if content exceeds viewport', async ({ page }) => {
      const nav = page.locator('.genesis-header__nav');
      
      const scrollable = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          overflowY: styles.overflowY,
          height: styles.height,
          scrollHeight: el.scrollHeight
        };
      });
      
      // Should have overflow-y auto for scrolling
      expect(scrollable.overflowY).toBe('auto');
    });

    test('navbar list should be vertical on mobile', async ({ page }) => {
      const navList = page.locator('.navbar__list');
      
      const flexDirection = await navList.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });
      
      // Should be column (vertical) on mobile
      expect(flexDirection).toBe('column');
    });
  });

  test.describe('Tablet Navbar Tests (768px)', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
    });

    test('should use mobile navigation on tablet', async ({ page }) => {
      const toggle = page.locator('.genesis-header__toggle');
      
      // Mobile toggle should be visible on tablet (< 1024px)
      await expect(toggle).toBeVisible();
    });

    test('navbar should be vertical on tablet', async ({ page }) => {
      const navList = page.locator('.navbar__list');
      
      const flexDirection = await navList.evaluate((el) => {
        return window.getComputedStyle(el).flexDirection;
      });
      
      // Should still be column on tablet
      expect(flexDirection).toBe('column');
    });
  });

  test.describe('Viewport Container Tests', () => {
    
    test('consciousness-viewport should not exceed max-width at any size', async ({ page }) => {
      const sizes = [
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1024, height: 768 },
        { width: 1440, height: 900 },
        { width: 1920, height: 1080 }
      ];
      
      for (const size of sizes) {
        await page.setViewportSize(size);
        await page.waitForTimeout(300);
        
        const container = page.locator('.consciousness-viewport').first();
        const width = await container.evaluate((el) => {
          return {
            maxWidth: window.getComputedStyle(el).maxWidth,
            actualWidth: el.offsetWidth
          };
        });
        
        // Max-width should be 1200px
        expect(width.maxWidth).toBe('1200px');
        
        // Actual width should not exceed max-width
        expect(width.actualWidth).toBeLessThanOrEqual(1200);
      }
    });

    test('viewport containers should have proper horizontal centering', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const container = page.locator('.consciousness-viewport').first();
      const centering = await container.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const parentWidth = el.parentElement.offsetWidth;
        
        return {
          marginLeft: styles.marginLeft,
          marginRight: styles.marginRight,
          leftSpace: rect.left,
          rightSpace: parentWidth - rect.right
        };
      });
      
      // Should have auto margins for centering
      expect(centering.marginLeft).toBe('auto');
      expect(centering.marginRight).toBe('auto');
      
      // Left and right space should be approximately equal (within 5px)
      const spaceDiff = Math.abs(centering.leftSpace - centering.rightSpace);
      expect(spaceDiff).toBeLessThan(5);
    });
  });

  test.describe('Button and Touch Target Tests', () => {
    
    test('all buttons should meet WCAG 2.5.5 touch target size on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const buttons = page.locator('button, a[class*="btn-"]');
      const count = await buttons.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const button = buttons.nth(i);
        const isVisible = await button.isVisible();
        
        if (isVisible) {
          const size = await button.evaluate((el) => ({
            width: el.offsetWidth,
            height: el.offsetHeight
          }));
          
          // WCAG 2.5.5: minimum 44x44px
          expect(size.height).toBeGreaterThanOrEqual(44);
          expect(size.width).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('navbar links should meet touch target requirements', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const navLinks = page.locator('.navbar__link');
      const count = await navLinks.count();
      
      if (count > 0) {
        const firstLink = navLinks.first();
        const size = await firstLink.evaluate((el) => ({
          minHeight: window.getComputedStyle(el).minHeight,
          actualHeight: el.offsetHeight
        }));
        
        // Should have min-height of 44px
        expect(size.minHeight).toBe('44px');
        expect(size.actualHeight).toBeGreaterThanOrEqual(44);
      }
    });
  });

  test.describe('Spacing and Layout Tests', () => {
    
    test('demo sections should have adequate spacing', async ({ page }) => {
      const sections = page.locator('.demo-section');
      const count = await sections.count();
      
      if (count > 0) {
        const firstSection = sections.first();
        const padding = await firstSection.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            paddingTop: parseInt(styles.paddingTop),
            paddingBottom: parseInt(styles.paddingBottom)
          };
        });
        
        // Should have at least 48px padding
        expect(padding.paddingTop).toBeGreaterThanOrEqual(48);
        expect(padding.paddingBottom).toBeGreaterThanOrEqual(48);
      }
    });

    test('cards should maintain proper spacing in grid', async ({ page }) => {
      const grid = page.locator('.demo-grid, .bento-layout').first();
      
      if (await grid.count() > 0) {
        const gap = await grid.evaluate((el) => {
          return window.getComputedStyle(el).gap;
        });
        
        // Should have some gap
        expect(gap).not.toBe('0px');
        
        // Gap should be at least 16px
        const gapValue = parseInt(gap);
        expect(gapValue).toBeGreaterThanOrEqual(16);
      }
    });
  });

  test.describe('Visual Regression - Header Height', () => {
    
    test('header height should be consistent across viewport widths', async ({ page }) => {
      const widths = [375, 768, 1024, 1440, 1920];
      const heights = [];
      
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForTimeout(300);
        
        const header = page.locator('.genesis-header');
        const height = await header.evaluate((el) => el.offsetHeight);
        heights.push({ width, height });
      }
      
      // All desktop widths (>=1024) should have similar height
      const desktopHeights = heights.filter(h => h.width >= 1024).map(h => h.height);
      if (desktopHeights.length > 1) {
        const maxHeight = Math.max(...desktopHeights);
        const minHeight = Math.min(...desktopHeights);
        
        // Heights should not vary by more than 10px
        expect(maxHeight - minHeight).toBeLessThanOrEqual(10);
      }
    });
  });
});
