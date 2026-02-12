# Playwright Testing Documentation

## Overview

This repository includes comprehensive structural regression testing using Playwright to ensure the Genesis Theme demo page maintains its semantic HTML structure, accessibility standards, and responsive behavior.

**Demo Page URL**: https://asisaga.github.io/theme.asisaga.com/

## Quick Start

### Installation

Dependencies are already included in `package.json`. To set up:

```bash
npm install
npx playwright install chromium
```

### Running Tests

```bash
# Run all tests (headless, against live site)
npm run test:e2e

# Run tests against local Jekyll server
npm run test:e2e:local

# Run with visible browser
npm run test:e2e:headed

# Run with Playwright UI (interactive)
npm run test:e2e:ui

# View HTML test report
npm run test:e2e:report
```

## Test Structure

### Test Directory
```
tests/e2e/
├── structural-regression.spec.js  # Main test suite
└── README.md                      # Detailed documentation
```

### Test Coverage

The structural regression tests verify:

1. **Semantic HTML Structure**
   - Proper document structure (html, head, body)
   - Required meta tags (charset, viewport)
   - Single main landmark (WCAG 2.1 requirement)
   - Proper heading hierarchy

2. **Accessibility Landmarks**
   - Skip link for keyboard navigation
   - Main landmark with skip target
   - Header and footer landmarks
   - Navigation semantics

3. **Component Structure**
   - Hero section presence and visibility
   - Demo sections
   - Interactive elements (buttons, links)

4. **Responsive Behavior**
   - Mobile viewport (375px)
   - Tablet viewport (768px)
   - Desktop viewport (1440px)

5. **CSS and Styling**
   - Stylesheet loading
   - Ontological classes (genesis-* patterns)

6. **Content Presence**
   - Meaningful page title
   - Visible text content
   - Images with alt attributes

7. **JavaScript and Interactivity**
   - Console error detection
   - Motion library features

8. **Performance**
   - Load time under 10 seconds
   - Critical resources loaded

## Configuration

### Playwright Config (`playwright.config.js`)

- **Base URL**: Configurable via `TEST_LOCAL` environment variable
  - Default: `https://asisaga.github.io/theme.asisaga.com`
  - Local: `http://localhost:4000` (when `TEST_LOCAL=1`)
- **Browsers**: Chromium
- **Viewports**: Desktop (1440x900), Mobile (iPhone 12), Tablet (iPad Pro)
- **Timeout**: 30 seconds per test
- **Retries**: 2 on CI, 0 locally
- **Reporter**: HTML report + list output

### CI/CD Integration

Tests run automatically via GitHub Actions (`.github/workflows/playwright.yml`):

- **On push** to main branch
- **On pull requests** to main branch
- **On schedule** (weekly, Sundays at midnight UTC)
- **Manual trigger** via workflow_dispatch

#### CI Workflow Features
- Installs dependencies and Playwright browsers
- Runs tests with CI-optimized settings
- Uploads HTML report as artifact (30-day retention)
- Uploads screenshots on failure (7-day retention)
- Comments on PR if tests fail

## Testing Against Local Server

To test against a local Jekyll server:

```bash
# Terminal 1: Start Jekyll server
bundle exec jekyll serve

# Terminal 2: Run Playwright tests against local server
npm run test:e2e:local
```

## Test Development

### Adding New Tests

Add new test cases to `tests/e2e/structural-regression.spec.js`:

```javascript
test('should verify new component', async ({ page }) => {
  await page.goto('/');
  
  const component = page.locator('.new-component');
  await expect(component).toBeVisible();
  await expect(component).toHaveClass(/genesis-/);
});
```

### Test Best Practices

1. **Use semantic selectors**: Prefer semantic HTML elements and data-* attributes over classes
2. **Test structure, not style**: Focus on HTML structure and accessibility
3. **Be resilient**: Tests should tolerate minor content changes
4. **Use meaningful names**: Test names should describe what they verify
5. **Keep tests independent**: Each test should work in isolation

### Debugging Tests

```bash
# Run specific test
npx playwright test --grep "should have proper document structure"

# Debug mode (pauses execution)
npx playwright test --debug

# Run with trace (records execution)
npx playwright test --trace on
```

## Project Structure

```
/
├── playwright.config.js           # Playwright configuration
├── tests/e2e/                     # E2E test directory
│   ├── structural-regression.spec.js
│   └── README.md
├── .github/workflows/
│   └── playwright.yml             # CI workflow
├── playwright-report/             # Generated HTML reports (gitignored)
└── test-results/                  # Test artifacts (gitignored)
```

## Reports and Artifacts

### Local Reports

After running tests, view the HTML report:
```bash
npm run test:e2e:report
```

### CI Reports

On CI, reports are uploaded as artifacts:
- **playwright-report**: Full HTML report (30-day retention)
- **playwright-screenshots**: Screenshots on failure (7-day retention)

Access artifacts from the GitHub Actions run page.

## Maintenance

### When to Update Tests

Update tests when:
- Page structure changes (new sections, components)
- Accessibility requirements change
- Responsive breakpoints are added/modified
- New interactive features are added

### Updating Test Selectors

If page structure changes, update selectors in `structural-regression.spec.js`:

```javascript
// Before
const hero = page.locator('.demo-hero');

// After (if class name changes)
const hero = page.locator('.new-hero-class');
```

## Troubleshooting

### Tests Fail on CI but Pass Locally

1. Check if using correct base URL (live vs local)
2. Verify network connectivity on CI
3. Check browser compatibility
4. Review CI logs for specific errors

### Network Errors

If tests fail with network errors:
1. Verify the live site is accessible
2. Check GitHub Pages deployment status
3. For local testing, ensure Jekyll server is running

### Timeout Errors

If tests timeout:
1. Increase timeout in `playwright.config.js`
2. Check if page loads slowly
3. Verify network conditions
4. Review test logic for unnecessary waits

## Related Documentation

- [Playwright Documentation](https://playwright.dev/)
- [Genesis Ontological Design System](/docs/specifications/scss-ontology-system.md)
- [Accessibility Guidelines](/docs/specifications/accessibility.md)
- [HTML Semantic Patterns](/docs/specifications/html-semantic-patterns.md)
- [Responsive Design](/docs/specifications/responsive-design.md)

## Dependencies

```json
{
  "@playwright/test": "^1.58.2"
}
```

## License

Tests are part of the ASI Saga Theme project and share the same MIT license.
