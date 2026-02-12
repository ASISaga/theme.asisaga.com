import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Genesis Theme Structural Regression Testing
 * 
 * Tests the live demo page at https://asisaga.github.io/theme.asisaga.com/
 * 
 * Focus areas:
 * - Semantic HTML structure and accessibility
 * - Responsive behavior across viewports
 * - Component presence and structure
 * - Landmark elements and navigation
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],
  
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    // Use local server if TEST_LOCAL is set, otherwise use live GitHub Pages
    baseURL: process.env.TEST_LOCAL 
      ? 'http://localhost:4000' 
      : 'https://asisaga.github.io/theme.asisaga.com',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      },
    },
    
    {
      name: 'mobile',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 }
      },
    },
    
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 }
      },
    },
  ],
});
