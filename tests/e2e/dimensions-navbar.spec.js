import { test, expect } from '@playwright/test';

/**
 * Dimension and Navbar Tests for Genesis Theme Demo Page
 * 
 * These tests verify proper dimensions, spacing, and navbar behavior
 * across different viewports (mobile, tablet, desktop).
 */

test.describe('Dimensions and Navbar Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test.describe('Viewport Containers', () => {
    
    test('genesis-viewport should have correct max-width on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const genesisViewport = page.locator('.genesis-viewport').first();
      if (await genesisViewport.count() > 0) {
        const width = await genesisViewport.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            maxWidth: styles.maxWidth,
            width: el.offsetWidth
          };
        });
        
        // Max-width should be 1600px
        expect(width.maxWidth).toBe('1600px');
        // Actual width should not exceed max-width
        expect(width.width).toBeLessThanOrEqual(1600);
      }
    });

    test('consciousness-viewport should have correct max-width', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const consciousnessViewport = page.locator('.consciousness-viewport').first();
      const width = await consciousnessViewport.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          maxWidth: styles.maxWidth,
          width: el.offsetWidth
        };
      });
      
      // Max-width should be 1200px
      expect(width.maxWidth).toBe('1200px');
      expect(width.width).toBeLessThanOrEqual(1200);
    });

    test('essence-viewport should have correct max-width', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const essenceViewport = page.locator('.essence-viewport').first();
      if (await essenceViewport.count() > 0) {
        const width = await essenceViewport.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            maxWidth: styles.maxWidth,
            width: el.offsetWidth
          };
        });
        
        // Max-width should be 800px
        expect(width.maxWidth).toBe('800px');
        expect(width.width).toBeLessThanOrEqual(800);
      }
    });

    test('viewport containers should have proper padding on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const consciousnessViewport = page.locator('.consciousness-viewport').first();
      const padding = await consciousnessViewport.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          paddingLeft: parseInt(styles.paddingLeft),
          paddingRight: parseInt(styles.paddingRight)
        };
      });
      
      // Should have at least 16px padding on mobile
      expect(padding.paddingLeft).toBeGreaterThanOrEqual(16);
      expect(padding.paddingRight).toBeGreaterThanOrEqual(16);
    });
  });

  test.describe('Desktop Navbar', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
    });

    test('header should be visible on desktop', async ({ page }) => {
      const header = page.locator('.genesis-header');
      await expect(header).toBeVisible();
    });

    test('header should have proper height', async ({ page }) => {
      const header = page.locator('.genesis-header');
      const height = await header.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          minHeight: styles.minHeight,
          actualHeight: el.offsetHeight
        };
      });
      
      // Min-height should be 64px
      expect(height.minHeight).toBe('64px');
      expect(height.actualHeight).toBeGreaterThanOrEqual(64);
    });

    test('mobile menu toggle should be hidden on desktop', async ({ page }) => {
      const toggle = page.locator('.genesis-header__toggle');
      
      // Toggle might be in DOM but hidden via CSS
      const isHidden = await toggle.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.display === 'none';
      });
      
      expect(isHidden).toBe(true);
    });

    test('navigation should be inline on desktop', async ({ page }) => {
      const nav = page.locator('.genesis-header__nav');
      
      const navStyles = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          transform: styles.transform
        };
      });
      
      // Desktop nav should be static positioned, not fixed
      expect(navStyles.position).toBe('static');
      // Transform should be none (not translateX)
      expect(navStyles.transform).toBe('none');
    });

    test('navbar links should be visible', async ({ page }) => {
      const navLinks = page.locator('.navbar__link');
      const count = await navLinks.count();
      
      // Should have at least one nav link
      expect(count).toBeGreaterThan(0);
      
      // First link should be visible
      if (count > 0) {
        await expect(navLinks.first()).toBeVisible();
      }
    });
  });

  test.describe('Mobile Navbar', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('header should be visible on mobile', async ({ page }) => {
      const header = page.locator('.genesis-header');
      await expect(header).toBeVisible();
    });

    test('mobile menu toggle should be visible on mobile', async ({ page }) => {
      const toggle = page.locator('.genesis-header__toggle');
      await expect(toggle).toBeVisible();
    });

    test('mobile menu toggle should have proper touch target size', async ({ page }) => {
      const toggle = page.locator('.genesis-header__toggle');
      const size = await toggle.evaluate((el) => {
        return {
          width: el.offsetWidth,
          height: el.offsetHeight
        };
      });
      
      // WCAG 2.5.5: minimum 44x44px touch target
      expect(size.width).toBeGreaterThanOrEqual(44);
      expect(size.height).toBeGreaterThanOrEqual(44);
    });

    test('mobile navigation should be off-screen by default', async ({ page }) => {
      const nav = page.locator('.genesis-header__nav');
      
      const navStyles = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          transform: styles.transform
        };
      });
      
      // Mobile nav should be fixed positioned
      expect(navStyles.position).toBe('fixed');
      // Should be translated off-screen
      expect(navStyles.transform).toContain('translateX');
    });

    test('mobile navigation should have proper dimensions', async ({ page }) => {
      const nav = page.locator('.genesis-header__nav');
      
      const navSize = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          width: styles.width,
          maxWidth: styles.maxWidth,
          height: styles.height
        };
      });
      
      // Mobile nav should have max-width of 340px
      expect(navSize.maxWidth).toBe('340px');
      // Height should be 100vh
      expect(navSize.height).toContain('vh');
    });

    test('brand logo should be visible on mobile', async ({ page }) => {
      const brand = page.locator('.genesis-header__brand');
      await expect(brand).toBeVisible();
    });

    test('brand should have minimum touch target size', async ({ page }) => {
      const brand = page.locator('.genesis-header__brand');
      const height = await brand.evaluate((el) => el.offsetHeight);
      
      // Should meet WCAG 2.5.5: minimum 44px
      expect(height).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Tablet Navbar', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('header should be visible on tablet', async ({ page }) => {
      const header = page.locator('.genesis-header');
      await expect(header).toBeVisible();
    });

    test('should use mobile navigation on tablet (< 1024px)', async ({ page }) => {
      const toggle = page.locator('.genesis-header__toggle');
      await expect(toggle).toBeVisible();
    });
  });

  test.describe('Button and Interactive Element Dimensions', () => {
    
    test('hero action buttons should have proper dimensions on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const heroButtons = page.locator('.hero-actions button, .hero-actions a[class*="btn"]');
      const count = await heroButtons.count();
      
      if (count > 0) {
        const button = heroButtons.first();
        const size = await button.evaluate((el) => {
          return {
            minHeight: window.getComputedStyle(el).minHeight,
            actualHeight: el.offsetHeight,
            actualWidth: el.offsetWidth
          };
        });
        
        // Should have min-height of 44px
        expect(size.minHeight).toBe('44px');
        expect(size.actualHeight).toBeGreaterThanOrEqual(44);
      }
    });

    test('demo buttons should have proper touch targets', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const buttons = page.locator('button, a[class*="btn-genesis"]').first();
      if (await buttons.count() > 0) {
        const size = await buttons.evaluate((el) => {
          return {
            width: el.offsetWidth,
            height: el.offsetHeight
          };
        });
        
        // WCAG 2.5.5: minimum 44x44px
        expect(size.height).toBeGreaterThanOrEqual(44);
        expect(size.width).toBeGreaterThanOrEqual(44);
      }
    });

    test('form inputs should have proper height on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const inputs = page.locator('input[type="text"], input[type="email"], select, textarea').first();
      if (await inputs.count() > 0) {
        const height = await inputs.evaluate((el) => {
          return {
            minHeight: window.getComputedStyle(el).minHeight,
            actualHeight: el.offsetHeight
          };
        });
        
        // Should have min-height of 44px for touch
        expect(height.minHeight).toBe('44px');
        expect(height.actualHeight).toBeGreaterThanOrEqual(44);
      }
    });
  });

  test.describe('Responsive Grid Dimensions', () => {
    
    test('bento-layout should use single column on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const bentoLayout = page.locator('.bento-layout, .demo-grid').first();
      if (await bentoLayout.count() > 0) {
        const gridColumns = await bentoLayout.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.gridTemplateColumns;
        });
        
        // Should have single column (only one fr value)
        const columnCount = (gridColumns.match(/\d+fr/g) || []).length;
        expect(columnCount).toBeLessThanOrEqual(1);
      }
    });

    test('bento-layout should use multiple columns on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      
      const bentoLayout = page.locator('.bento-layout, .demo-grid').first();
      if (await bentoLayout.count() > 0) {
        const gridColumns = await bentoLayout.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.gridTemplateColumns;
        });
        
        // Should have multiple columns (more than one fr value or pixel value)
        const hasmultipleColumns = gridColumns.split(' ').length > 1;
        expect(hasmultipleColumns).toBe(true);
      }
    });

    test('cards should have proper padding', async ({ page }) => {
      const cards = page.locator('.bento-card').first();
      if (await cards.count() > 0) {
        const padding = await cards.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            top: parseInt(styles.paddingTop),
            right: parseInt(styles.paddingRight),
            bottom: parseInt(styles.paddingBottom),
            left: parseInt(styles.paddingLeft)
          };
        });
        
        // Should have at least 20px padding
        expect(padding.top).toBeGreaterThanOrEqual(20);
        expect(padding.right).toBeGreaterThanOrEqual(20);
        expect(padding.bottom).toBeGreaterThanOrEqual(20);
        expect(padding.left).toBeGreaterThanOrEqual(20);
      }
    });
  });

  test.describe('Hero Section Dimensions', () => {
    
    test('hero section should have full viewport height', async ({ page }) => {
      const hero = page.locator('.demo-hero, .genesis-hero').first();
      
      const heroHeight = await hero.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          minHeight: styles.minHeight,
          actualHeight: el.offsetHeight
        };
      });
      
      // Should have min-height of 100vh or 100dvh
      expect(heroHeight.minHeight).toMatch(/100(vh|dvh)/);
    });

    test('hero content should be properly centered', async ({ page }) => {
      const heroContent = page.locator('.hero-content').first();
      if (await heroContent.count() > 0) {
        const alignment = await heroContent.evaluate((el) => {
          const parent = el.parentElement;
          const parentStyles = window.getComputedStyle(parent);
          return {
            display: parentStyles.display,
            alignItems: parentStyles.alignItems,
            justifyContent: parentStyles.justifyContent
          };
        });
        
        // Parent should use flex with center alignment
        expect(alignment.display).toBe('flex');
        expect(alignment.alignItems).toBe('center');
        expect(alignment.justifyContent).toBe('center');
      }
    });
  });

  test.describe('Navbar Overflow and Scroll', () => {
    
    test('header should not cause horizontal scroll on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const body = await page.evaluate(() => {
        return {
          scrollWidth: document.body.scrollWidth,
          clientWidth: document.body.clientWidth
        };
      });
      
      // Should not exceed viewport width
      expect(body.scrollWidth).toBeLessThanOrEqual(body.clientWidth + 1); // +1 for rounding
    });

    test('header container should have overflow visible for mobile drawer', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const container = page.locator('.genesis-header__container');
      const overflow = await container.evaluate((el) => {
        return window.getComputedStyle(el).overflow;
      });
      
      // Should be visible to allow mobile drawer to render outside
      expect(overflow).toBe('visible');
    });

    test('mobile nav should be scrollable when content exceeds viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const nav = page.locator('.genesis-header__nav');
      const scrollable = await nav.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          overflowY: styles.overflowY,
          height: styles.height
        };
      });
      
      // Should have overflow-y: auto
      expect(scrollable.overflowY).toBe('auto');
    });
  });

  test.describe('Section Spacing', () => {
    
    test('demo sections should have adequate vertical spacing', async ({ page }) => {
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
        
        // Should have at least 48px vertical padding
        expect(padding.paddingTop).toBeGreaterThanOrEqual(48);
        expect(padding.paddingBottom).toBeGreaterThanOrEqual(48);
      }
    });
  });
});
