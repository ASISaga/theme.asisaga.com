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

#### Structural Regression (`playwright.yml`)

Tests run automatically via GitHub Actions (`.github/workflows/playwright.yml`):

- **On push** to main branch
- **On pull requests** to main branch
- **On schedule** (weekly, Sundays at midnight UTC)
- **Manual trigger** via workflow_dispatch

Features:
- Installs dependencies and Playwright browsers
- Runs tests with CI-optimized settings
- Uploads HTML report as artifact (30-day retention)
- Uploads screenshots on failure (7-day retention)
- Comments on PR if tests fail

#### Accessibility Audit (`accessibility-audit.yml`)

Audits all site pages against WCAG 2.1 AA using axe-core, targeting the production deployment at `https://theme.asisaga.com`. See [Accessibility Audit Workflow](#accessibility-audit-workflow) for full configuration details.

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

## Accessibility Audit Workflow

*Last Updated: 2026-04-24*

### Overview

The accessibility audit workflow (`.github/workflows/accessibility-audit.yml`) navigates every page of the live site at `https://theme.asisaga.com` using Playwright and evaluates each against WCAG 2.1 Level AA using axe-core. It **never fails the build** — all violations are recorded and surfaced as a downloadable Markdown report.

### Trigger Configuration

| Trigger | Details |
|---------|---------|
| `schedule` | Weekly, every Monday at 06:00 UTC (`0 6 * * 1`) |
| `workflow_dispatch` | Manual trigger; accepts an optional `base_url` input to target a staging URL |

### Required Dependencies

Both are already listed in `package.json` under `devDependencies`:

```json
"@axe-core/playwright": "^4.11.1",
"@playwright/test": "^1.58.2"
```

No additional secrets or environment variables are needed for the default configuration.

### `BASE_URL` Environment Variable

`playwright.config.js` resolves the target URL in priority order:

```
BASE_URL env var  →  TEST_LOCAL=1 (localhost:4000)  →  asisaga.github.io/theme.asisaga.com
```

The workflow sets `BASE_URL=https://theme.asisaga.com`, so all 16 pages in `accessibility-audit.spec.js` are audited against the production domain.

### Pages Audited

| Path | Label |
|------|-------|
| `/` | Home |
| `/samples/application/chatroom.html` | Application – Chatroom |
| `/samples/application/dashboard.html` | Application – Dashboard |
| `/samples/application/search.html` | Application – Search |
| `/samples/application/settings.html` | Application – Settings |
| `/samples/content-driven/archive.html` | Content-Driven – Archive |
| `/samples/content-driven/article.html` | Content-Driven – Article |
| `/samples/content-driven/post.html` | Content-Driven – Post |
| `/samples/content-driven/profile.html` | Content-Driven – Profile |
| `/samples/knowledge/docs.html` | Knowledge – Docs |
| `/samples/knowledge/faq.html` | Knowledge – FAQ |
| `/samples/marketing/landing.html` | Marketing – Landing |
| `/samples/marketing/gallery.html` | Marketing – Gallery |
| `/samples/marketing/form.html` | Marketing – Form |
| `/samples/utility/404.html` | Utility – 404 |
| `/samples/utility/splash.html` | Utility – Splash |

### Artifacts

| Artifact | Contents | Retention |
|----------|----------|-----------|
| `accessibility-audit-report` | `tests/accessibility-audit-report.md` + Playwright HTML report | 90 days |
| `accessibility-audit-screenshots` | Failure screenshots (uploaded only on error) | 14 days |

### Running Locally

```bash
# Against production (https://theme.asisaga.com)
npm run test:a11y:live  # defined in package.json

# Against local Jekyll server
npm run test:a11y       # defined in package.json (requires TEST_LOCAL=1)

# Against any URL
BASE_URL=https://staging.example.com npx playwright test tests/e2e/accessibility-audit.spec.js --project=chromium
```

### Report Structure

The generated `tests/accessibility-audit-report.md` contains:

1. **Executive Summary** — totals by impact level (critical / serious / moderate / minor)
2. **Page-by-Page Results** — per-page violation list with axe rule ID, description, help URL, and affected HTML nodes
3. **Design System Review** — maps violations back to `_design/tokens/` files, enabling token-level fixes rather than ad-hoc SCSS patches



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
