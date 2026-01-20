# Layout Testing with Playwright

This directory contains automated tests for all Jekyll theme layouts using Playwright.

## Overview

The testing system validates that all 20 theme layouts render correctly without errors. Since this is a Jekyll theme repository (not a full Jekyll site), we use a static HTML generation approach:

1. **Static Layout Generation**: The `generate-static-layouts.js` script converts Jekyll layouts into static HTML files with sample data
2. **HTTP Server**: Serves the static HTML files during testing
3. **Playwright Tests**: Automated browser tests that verify rendering, accessibility, and responsiveness

## Layouts Tested

All 20 layouts are tested:
- `archive`, `article`, `dashboard`, `default`, `gallery`, `landing`
- `profile`, `post`, `faq`, `docs`, `search`, `settings`
- `splash`, `form`, `app`, `chatroom`, `minimal`, `minimal-base`
- `fixed-height`, `scrollable`

## Running Tests

```bash
# Run all layout tests (generates static files and runs Playwright)
npm run test:layouts

# Run tests with browser UI visible
npm run test:layouts:headed

# Run tests in interactive UI mode
npm run test:layouts:ui

# Generate static layout files only
npm run generate:layouts
```

## Test Coverage

### Layout Rendering Tests
- Verifies each layout loads with HTTP 200 status
- Confirms page content is rendered
- Captures full-page screenshots for visual reference
- Checks for JavaScript console errors

### Accessibility Tests
- Validates semantic HTML structure (main landmarks)
- Checks for proper heading hierarchy
- Tests keyboard navigation support

### Responsive Tests
- Tests default layout at three viewport sizes:
  - Mobile: 375x667
  - Tablet: 768x1024
  - Desktop: 1440x900
- Captures screenshots at each breakpoint

## Output

### Screenshots
Generated screenshots are saved to `tests/screenshots/`:
- `{layout-name}-layout.png` - Full page screenshot of each layout
- `default-{mobile|tablet|desktop}.png` - Responsive screenshots

### Test Reports
- Console output shows pass/fail for each test
- HTML report available at `playwright-report/index.html` (after test run)

## Architecture

### Files
- `generate-static-layouts.js` - Converts Jekyll layouts to static HTML
- `tests/layouts.spec.js` - Playwright test suite
- `playwright.config.js` - Playwright configuration
- `_test_layouts/*.md` - Jekyll-format test data (legacy, not used)
- `test-layouts-static/*.html` - Generated static HTML (gitignored)

### How It Works

1. **Generation Phase**: Script reads layout files from `_layouts/`, processes Liquid templating with test data, and outputs static HTML
2. **Server Phase**: HTTP server starts on port 4000 serving the static files
3. **Test Phase**: Playwright opens a browser and tests each layout URL
4. **Cleanup**: Screenshots and reports are generated

## Continuous Integration

To run in CI:
```bash
npm install
npx playwright install chromium
npm run test:layouts
```

## Adding New Layouts

When a new layout is added to `_layouts/`:

1. Add test data to `layoutData` object in `generate-static-layouts.js`
2. Add layout to the `layouts` array in `tests/layouts.spec.js`
3. Run `npm run test:layouts` to verify

## Troubleshooting

### Layout not rendering
- Check `test-layouts-static/{layout}.html` to see generated HTML
- Verify layout exists in `_layouts/` directory
- Ensure test data matches layout's expected front matter

### Tests failing
- Run `npm run test:layouts:headed` to see browser visually
- Check console output for specific errors
- Review screenshots in `tests/screenshots/`

### CSS not loading
- Ensure `assets/css/style.css` exists and is properly compiled
- Check browser console for 404 errors on CSS files
- Verify CSS paths in generated HTML match actual file structure
