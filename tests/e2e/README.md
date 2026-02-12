# Playwright Structural Regression Testing

This directory contains end-to-end (e2e) structural regression tests for the Genesis Theme demo page using Playwright.

## Overview

The tests verify the structural integrity, accessibility, and responsive behavior of the live demo page at:
**https://asisaga.github.io/theme.asisaga.com/**

## Test Coverage

### 1. Semantic HTML Structure
- Proper document structure (html, head, body)
- Required meta tags (charset, viewport)
- Single main landmark (WCAG requirement)
- Proper heading hierarchy (h1, h2, etc.)

### 2. Accessibility Landmarks
- Skip link for keyboard navigation
- Main landmark with skip target
- Header and footer landmarks
- Navigation with proper semantics

### 3. Component Structure
- Hero section presence
- Hero title visibility
- Demo sections
- Interactive elements (buttons, links)

### 4. Responsive Behavior
- Mobile-friendly (375px viewport)
- Tablet adaptation (768px viewport)
- Desktop viewport (1440px viewport)

### 5. CSS and Styling
- Stylesheet loading
- Ontological classes applied (genesis-* classes)

### 6. Content Presence
- Meaningful page title
- Visible text content
- Images with alt attributes

### 7. JavaScript and Interactivity
- Console error detection
- JavaScript-enabled features (Motion library)

### 8. Performance and Loading
- Reasonable load time (< 10 seconds)
- Critical resources loaded

## Running Tests

### Run all tests (headless)
```bash
npm run test:e2e
```

### Run tests with browser UI (headed mode)
```bash
npm run test:e2e:headed
```

### Run tests with Playwright UI
```bash
npm run test:e2e:ui
```

### View test report
```bash
npm run test:e2e:report
```

## Test Configuration

Tests are configured in `playwright.config.js` with:
- **Base URL**: https://asisaga.github.io/theme.asisaga.com
- **Browsers**: Chromium (desktop, mobile, tablet)
- **Timeout**: 30 seconds per test
- **Retries**: 2 on CI, 0 locally
- **Reporter**: HTML report + list

## Project Configuration

The tests run across three viewport configurations:

1. **Desktop (Chromium)**: 1440x900
2. **Mobile (iPhone 12)**: 390x844
3. **Tablet (iPad Pro)**: 1024x1366

## Test Structure

```
tests/e2e/
├── structural-regression.spec.js  # Main structural regression tests
└── README.md                       # This file
```

## CI/CD Integration

Tests can be integrated into CI/CD pipelines:
- Set `CI=true` environment variable to enable retries
- Tests run in parallel by default (can be disabled on CI)
- HTML reports generated in `playwright-report/`
- Screenshots captured on failure

## Debugging Tests

### Run specific test
```bash
npx playwright test --grep "should have proper document structure"
```

### Debug mode
```bash
npx playwright test --debug
```

### Run with trace
```bash
npx playwright test --trace on
```

## Best Practices

1. **Test live site**: Tests hit the actual GitHub Pages deployment
2. **Structural focus**: Tests verify HTML structure, not visual appearance
3. **Accessibility first**: Tests ensure WCAG compliance
4. **Responsive validation**: Tests verify behavior across viewports
5. **Performance aware**: Tests check load times and critical resources

## Maintenance

- Update tests when page structure changes
- Add new tests for new components or features
- Keep test selectors semantic (prefer data-* attributes or semantic elements)
- Review and update viewport configurations as needed

## Dependencies

- `@playwright/test`: ^1.58.2
- Playwright browsers installed via `npx playwright install chromium`

## Related Documentation

- [Playwright Documentation](https://playwright.dev/)
- [Genesis Ontological Design System](/docs/specifications/scss-ontology-system.md)
- [Accessibility Guidelines](/docs/specifications/accessibility.md)
- [HTML Semantic Patterns](/docs/specifications/html-semantic-patterns.md)
