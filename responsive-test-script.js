/**
 * Responsive Layout Testing Script for PR #36
 * Tests https://asisaga.com/ for responsive behavior after Bootstrap removal
 * 
 * Usage: Run with Playwright when firewall access is configured
 * This script tests:
 * - Desktop layout (1920x1080)
 * - Tablet layout (768x1024)
 * - Mobile layout (375x667)
 * - Navigation functionality
 * - Dropdown menus
 * - Mobile hamburger menu
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test configuration
const config = {
  baseUrl: 'https://asisaga.com',
  viewports: {
    desktop: { width: 1920, height: 1080, name: 'desktop' },
    tablet: { width: 768, height: 1024, name: 'tablet' },
    mobile: { width: 375, height: 667, name: 'mobile' }
  },
  pages: [
    { url: '/', name: 'home' },
    { url: '/about/', name: 'about' },
    { url: '/contact/', name: 'contact' }
  ],
  outputDir: './responsive-test-results',
  screenshotsDir: './responsive-test-results/screenshots'
};

// Ensure output directories exist
function setupDirectories() {
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  if (!fs.existsSync(config.screenshotsDir)) {
    fs.mkdirSync(config.screenshotsDir, { recursive: true });
  }
}

// Test results storage
const results = {
  timestamp: new Date().toISOString(),
  tests: [],
  issues: []
};

async function testResponsiveLayout() {
  console.log('🚀 Starting responsive layout tests...');
  setupDirectories();

  const browser = await chromium.launch({ headless: true });
  
  try {
    for (const [viewportKey, viewport] of Object.entries(config.viewports)) {
      console.log(`\n📱 Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
      
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        userAgent: viewport.name === 'mobile' 
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
          : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });
      
      const page = await context.newPage();
      
      for (const pageConfig of config.pages) {
        const testUrl = `${config.baseUrl}${pageConfig.url}`;
        console.log(`  📄 Testing page: ${testUrl}`);
        
        try {
          // Navigate to page
          await page.goto(testUrl, { waitUntil: 'networkidle', timeout: 30000 });
          
          // Wait for content to load
          await page.waitForSelector('body', { timeout: 5000 });
          
          const testResult = {
            page: pageConfig.name,
            viewport: viewport.name,
            url: testUrl,
            timestamp: new Date().toISOString(),
            tests: {}
          };
          
          // Test 1: Check if header is visible
          console.log('    ✓ Checking header visibility...');
          const headerVisible = await page.isVisible('.site-header');
          testResult.tests.headerVisible = headerVisible;
          
          if (!headerVisible) {
            results.issues.push({
              severity: 'high',
              page: pageConfig.name,
              viewport: viewport.name,
              issue: 'Header not visible',
              element: '.site-header'
            });
          }
          
          // Test 2: Check navigation
          console.log('    ✓ Checking navigation...');
          const navVisible = await page.isVisible('.site-navbar');
          testResult.tests.navVisible = navVisible;
          
          // Test 3: Check full-width content
          console.log('    ✓ Checking full-width layout...');
          const bodyWidth = await page.evaluate(() => {
            return {
              bodyWidth: document.body.offsetWidth,
              windowWidth: window.innerWidth,
              mainWidth: document.querySelector('.site-main')?.offsetWidth || 0
            };
          });
          testResult.tests.widths = bodyWidth;
          
          // Check if content is properly full-width (allowing for some margin)
          const isFullWidth = bodyWidth.mainWidth >= (viewport.width * 0.95);
          testResult.tests.isFullWidth = isFullWidth;
          
          if (!isFullWidth && viewport.name !== 'mobile') {
            results.issues.push({
              severity: 'medium',
              page: pageConfig.name,
              viewport: viewport.name,
              issue: 'Content not full-width',
              details: `Main width: ${bodyWidth.mainWidth}px, Viewport: ${viewport.width}px`
            });
          }
          
          // Test 4: Mobile-specific tests
          if (viewport.name === 'mobile') {
            console.log('    ✓ Testing mobile navigation...');
            
            // Check hamburger menu
            const hamburgerVisible = await page.isVisible('.site-header-toggler');
            testResult.tests.hamburgerVisible = hamburgerVisible;
            
            if (!hamburgerVisible) {
              results.issues.push({
                severity: 'high',
                page: pageConfig.name,
                viewport: viewport.name,
                issue: 'Hamburger menu not visible on mobile'
              });
            }
            
            // Test hamburger toggle
            if (hamburgerVisible) {
              const navCollapsed = await page.evaluate(() => {
                const nav = document.querySelector('[data-nav-target]');
                return !nav?.classList.contains('is-open');
              });
              
              testResult.tests.navInitiallyCollapsed = navCollapsed;
              
              if (!navCollapsed) {
                results.issues.push({
                  severity: 'medium',
                  page: pageConfig.name,
                  viewport: viewport.name,
                  issue: 'Mobile navigation not initially collapsed'
                });
              }
              
              // Click hamburger to expand
              await page.click('.site-header-toggler');
              await page.waitForTimeout(500); // Wait for animation
              
              const navExpanded = await page.evaluate(() => {
                const nav = document.querySelector('[data-nav-target]');
                return nav?.classList.contains('is-open');
              });
              
              testResult.tests.navExpandsOnClick = navExpanded;
              
              if (!navExpanded) {
                results.issues.push({
                  severity: 'high',
                  page: pageConfig.name,
                  viewport: viewport.name,
                  issue: 'Mobile navigation does not expand when hamburger clicked'
                });
              }
            }
          }
          
          // Test 5: Desktop-specific tests
          if (viewport.name === 'desktop') {
            console.log('    ✓ Testing desktop navigation...');
            
            // Check if dropdowns are initially hidden
            const dropdownsHidden = await page.evaluate(() => {
              const dropdowns = document.querySelectorAll('.dropdown-menu');
              return Array.from(dropdowns).every(dropdown => {
                const styles = window.getComputedStyle(dropdown);
                return styles.opacity === '0' || styles.visibility === 'hidden' || styles.display === 'none';
              });
            });
            
            testResult.tests.dropdownsInitiallyHidden = dropdownsHidden;
            
            if (!dropdownsHidden) {
              results.issues.push({
                severity: 'high',
                page: pageConfig.name,
                viewport: viewport.name,
                issue: 'Dropdown menus visible by default (should be hidden)'
              });
            }
          }
          
          // Test 6: Check header height
          console.log('    ✓ Checking header height...');
          const headerHeight = await page.evaluate(() => {
            const header = document.querySelector('.site-header');
            return header ? header.offsetHeight : 0;
          });
          
          testResult.tests.headerHeight = headerHeight;
          
          // Mobile header should have reasonable height
          if (viewport.name === 'mobile' && (headerHeight < 50 || headerHeight > 100)) {
            results.issues.push({
              severity: 'medium',
              page: pageConfig.name,
              viewport: viewport.name,
              issue: `Unexpected header height: ${headerHeight}px (expected 50-100px)`
            });
          }
          
          // Take screenshot
          const screenshotPath = path.join(
            config.screenshotsDir,
            `${pageConfig.name}-${viewport.name}.png`
          );
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`    📸 Screenshot saved: ${screenshotPath}`);
          
          testResult.screenshot = screenshotPath;
          results.tests.push(testResult);
          
        } catch (error) {
          console.error(`    ❌ Error testing ${testUrl}:`, error.message);
          results.issues.push({
            severity: 'critical',
            page: pageConfig.name,
            viewport: viewport.name,
            issue: `Test failed: ${error.message}`
          });
        }
      }
      
      await context.close();
    }
  } catch (error) {
    console.error('❌ Critical error during testing:', error);
  } finally {
    await browser.close();
  }
  
  // Generate report
  generateReport();
}

function generateReport() {
  console.log('\n📊 Generating test report...');
  
  const report = {
    summary: {
      timestamp: results.timestamp,
      totalTests: results.tests.length,
      totalIssues: results.issues.length,
      issuesBySeverity: {
        critical: results.issues.filter(i => i.severity === 'critical').length,
        high: results.issues.filter(i => i.severity === 'high').length,
        medium: results.issues.filter(i => i.severity === 'medium').length,
        low: results.issues.filter(i => i.severity === 'low').length
      }
    },
    tests: results.tests,
    issues: results.issues
  };
  
  // Write JSON report
  const jsonPath = path.join(config.outputDir, 'test-results.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`✅ JSON report saved: ${jsonPath}`);
  
  // Write markdown report
  const markdownReport = generateMarkdownReport(report);
  const mdPath = path.join(config.outputDir, 'TEST-REPORT.md');
  fs.writeFileSync(mdPath, markdownReport);
  console.log(`✅ Markdown report saved: ${mdPath}`);
  
  // Print summary
  console.log('\n📋 Test Summary:');
  console.log(`   Total tests: ${report.summary.totalTests}`);
  console.log(`   Total issues: ${report.summary.totalIssues}`);
  if (report.summary.issuesBySeverity.critical > 0) {
    console.log(`   🔴 Critical: ${report.summary.issuesBySeverity.critical}`);
  }
  if (report.summary.issuesBySeverity.high > 0) {
    console.log(`   🟠 High: ${report.summary.issuesBySeverity.high}`);
  }
  if (report.summary.issuesBySeverity.medium > 0) {
    console.log(`   🟡 Medium: ${report.summary.issuesBySeverity.medium}`);
  }
  
  if (report.summary.totalIssues === 0) {
    console.log('\n✅ All tests passed! No issues found.');
  } else {
    console.log('\n⚠️  Issues found - see report for details.');
  }
}

function generateMarkdownReport(report) {
  let md = `# Responsive Layout Test Report - PR #36\n\n`;
  md += `**Test Date:** ${new Date(report.summary.timestamp).toLocaleString()}\n`;
  md += `**Site:** ${config.baseUrl}\n`;
  md += `**Total Tests:** ${report.summary.totalTests}\n\n`;
  
  md += `## Summary\n\n`;
  md += `- **Total Issues:** ${report.summary.totalIssues}\n`;
  if (report.summary.issuesBySeverity.critical > 0) {
    md += `- 🔴 **Critical:** ${report.summary.issuesBySeverity.critical}\n`;
  }
  if (report.summary.issuesBySeverity.high > 0) {
    md += `- 🟠 **High:** ${report.summary.issuesBySeverity.high}\n`;
  }
  if (report.summary.issuesBySeverity.medium > 0) {
    md += `- 🟡 **Medium:** ${report.summary.issuesBySeverity.medium}\n`;
  }
  if (report.summary.issuesBySeverity.low > 0) {
    md += `- 🟢 **Low:** ${report.summary.issuesBySeverity.low}\n`;
  }
  
  md += `\n## Test Results by Viewport\n\n`;
  
  for (const viewport of Object.values(config.viewports)) {
    const viewportTests = report.tests.filter(t => t.viewport === viewport.name);
    md += `### ${viewport.name.charAt(0).toUpperCase() + viewport.name.slice(1)} (${viewport.width}x${viewport.height})\n\n`;
    
    for (const test of viewportTests) {
      md += `#### ${test.page.charAt(0).toUpperCase() + test.page.slice(1)} Page\n\n`;
      md += `- **URL:** ${test.url}\n`;
      md += `- **Header Visible:** ${test.tests.headerVisible ? '✅' : '❌'}\n`;
      md += `- **Navigation Visible:** ${test.tests.navVisible ? '✅' : '❌'}\n`;
      
      if (test.tests.widths) {
        md += `- **Widths:** Body: ${test.tests.widths.bodyWidth}px, Window: ${test.tests.widths.windowWidth}px, Main: ${test.tests.widths.mainWidth}px\n`;
        md += `- **Full Width:** ${test.tests.isFullWidth ? '✅' : '❌'}\n`;
      }
      
      if (viewport.name === 'mobile') {
        md += `- **Hamburger Visible:** ${test.tests.hamburgerVisible ? '✅' : '❌'}\n`;
        md += `- **Nav Initially Collapsed:** ${test.tests.navInitiallyCollapsed ? '✅' : '❌'}\n`;
        md += `- **Nav Expands on Click:** ${test.tests.navExpandsOnClick ? '✅' : '❌'}\n`;
      }
      
      if (viewport.name === 'desktop') {
        md += `- **Dropdowns Initially Hidden:** ${test.tests.dropdownsInitiallyHidden ? '✅' : '❌'}\n`;
      }
      
      md += `- **Header Height:** ${test.tests.headerHeight}px\n`;
      md += `- **Screenshot:** [View](${test.screenshot})\n\n`;
    }
  }
  
  if (report.issues.length > 0) {
    md += `\n## Issues Found\n\n`;
    
    const groupedIssues = {
      critical: report.issues.filter(i => i.severity === 'critical'),
      high: report.issues.filter(i => i.severity === 'high'),
      medium: report.issues.filter(i => i.severity === 'medium'),
      low: report.issues.filter(i => i.severity === 'low')
    };
    
    for (const [severity, issues] of Object.entries(groupedIssues)) {
      if (issues.length > 0) {
        const icon = { critical: '🔴', high: '🟠', medium: '🟡', low: '🟢' }[severity];
        md += `### ${icon} ${severity.charAt(0).toUpperCase() + severity.slice(1)} Issues\n\n`;
        
        for (const issue of issues) {
          md += `- **${issue.page} / ${issue.viewport}:** ${issue.issue}\n`;
          if (issue.details) {
            md += `  - Details: ${issue.details}\n`;
          }
          if (issue.element) {
            md += `  - Element: \`${issue.element}\`\n`;
          }
        }
        md += `\n`;
      }
    }
  } else {
    md += `\n## ✅ No Issues Found\n\nAll tests passed successfully!\n`;
  }
  
  return md;
}

// Run tests
testResponsiveLayout().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
