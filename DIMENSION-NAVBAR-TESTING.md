# Dimension and Navbar Testing Guide

## Overview

This document describes the dimension and navbar issues that were identified and fixed on the Genesis theme demo page (index.html).

## Issues Identified

### 1. Inline Styles Architecture Issue
**Problem**: index.html contained 700+ lines of inline `<style>` tags (lines 280-981), violating the theme's three-tier architecture.

**Impact**: 
- Makes maintenance difficult
- Prevents style reuse across subdomain sites
- Bloats HTML file size
- Violates separation of concerns

**Fix**: 
- Created `_sass/_index-demo.scss` with all demo-specific styles
- Removed inline `<style>` tag from index.html
- Added import to `_sass/_common.scss`

### 2. Grid Dimension Issues on Mobile
**Problem**: `.demo-grid` used `auto-fit` which could cause layout issues on small screens.

**Impact**:
- Cards might become too narrow on small screens
- Grid calculation could fail on edge case widths

**Fix**:
```scss
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  width: 100%;
  max-width: 100%;
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr; // Force single column
  }
}
```

### 3. Component Width Constraints
**Problem**: `.component-group` and `.bento-card` lacked explicit width and box-sizing constraints.

**Impact**:
- Could overflow parent containers
- Padding might cause width calculations to exceed 100%

**Fix**:
```scss
.component-group {
  width: 100%;
  box-sizing: border-box;
  // ... other styles
}

.bento-card {
  width: 100%;
  box-sizing: border-box;
  // ... other styles
}
```

### 4. Navbar Behavior Verification Needed
**Problem**: No automated tests to verify navbar behaves correctly across viewports.

**Fix**: Created comprehensive test suites:
- `tests/e2e/dimensions-navbar.spec.js` - 30+ tests for dimensions and layout
- `tests/e2e/navbar-visual.spec.js` - 30+ tests for navbar behavior

## Test Coverage

### Dimension Tests
- ✅ Viewport containers (genesis-viewport, consciousness-viewport, essence-viewport)
- ✅ Max-width constraints (1600px, 1200px, 800px)
- ✅ Horizontal centering
- ✅ Padding on mobile
- ✅ Grid single column on mobile
- ✅ Card spacing and padding

### Navbar Tests

#### Desktop (1440px)
- ✅ Header visibility and position
- ✅ Horizontal alignment (flex-direction: row)
- ✅ No horizontal overflow
- ✅ Container overflow: visible for mobile drawer
- ✅ Link spacing
- ✅ Mobile toggle hidden

#### Mobile (375px)
- ✅ Mobile toggle visible and clickable
- ✅ Nav off-screen by default (translateX)
- ✅ Fixed positioning
- ✅ Max-width: 340px
- ✅ Width not exceeding viewport
- ✅ Vertical alignment (flex-direction: column)
- ✅ Scrollable overflow-y
- ✅ No horizontal overflow

#### Tablet (768px)
- ✅ Uses mobile navigation (< 1024px)
- ✅ Vertical navbar
- ✅ Mobile toggle visible

### Touch Target Tests (WCAG 2.5.5)
- ✅ All buttons ≥ 44x44px on mobile
- ✅ Navbar links ≥ 44px height
- ✅ Mobile menu toggle 44x44px
- ✅ Brand link ≥ 44px height
- ✅ Form inputs ≥ 44px height

### Overflow Tests
- ✅ No horizontal body overflow at any viewport
- ✅ Header container overflow: visible
- ✅ Mobile nav scrollable when needed
- ✅ Grid and cards don't exceed container

## Running Tests

### Prerequisites
```bash
npm install
npx playwright install chromium
```

### Run All E2E Tests
```bash
# Against live GitHub Pages
npm run test:e2e

# Against local Jekyll server (requires Jekyll running on :4000)
npm run test:e2e:local

# With headed browser (visual)
npm run test:e2e:headed

# Interactive UI mode
npm run test:e2e:ui
```

### Run Specific Test Files
```bash
# Only dimension tests
npx playwright test tests/e2e/dimensions-navbar.spec.js

# Only navbar visual tests
npx playwright test tests/e2e/navbar-visual.spec.js

# Specific viewport
npx playwright test --project=mobile
npx playwright test --project=chromium
npx playwright test --project=tablet
```

### View Test Reports
```bash
npm run test:e2e:report
```

## Expected Test Results

All tests should pass if:
1. Styles are properly compiled from `_sass/_index-demo.scss`
2. No inline styles remain in index.html
3. Navbar behaves correctly on desktop/mobile/tablet
4. All touch targets meet WCAG requirements
5. No horizontal overflow at any viewport size
6. Grid properly collapses to single column on mobile

## Visual Verification

After running tests, verify visually:

### Desktop (1440px)
- [ ] Header is sticky at top
- [ ] Navbar is horizontal
- [ ] Mobile toggle is hidden
- [ ] No horizontal scrollbar
- [ ] Viewport containers are centered

### Mobile (375px)
- [ ] Mobile toggle is visible
- [ ] Navbar is off-screen by default
- [ ] Grid shows single column
- [ ] All buttons are tappable (≥44px)
- [ ] No horizontal scrollbar

### Tablet (768px)
- [ ] Uses mobile navigation
- [ ] Navbar is vertical
- [ ] Mobile toggle is visible
- [ ] Layout adapts properly

## Files Changed

### Created
- `_sass/_index-demo.scss` - Demo page styles (646 lines)
- `tests/e2e/dimensions-navbar.spec.js` - Dimension tests (422 lines)
- `tests/e2e/navbar-visual.spec.js` - Navbar visual tests (434 lines)

### Modified
- `_sass/_common.scss` - Added import for `_index-demo.scss`
- `index.html` - Removed 700+ lines of inline styles (now 278 lines)

### Total Impact
- **Lines removed**: 703 (inline styles)
- **Lines added**: 1,502 (SCSS + tests)
- **Net change**: +799 lines (but properly organized)
- **File size reduction**: index.html reduced by 72%

## Browser Compatibility

Tests run on:
- **Desktop**: Chrome 1440x900
- **Mobile**: iPhone 12 (390x844)
- **Tablet**: iPad Pro (1024x1366)

All modern browsers should work correctly as the styles use:
- Standard CSS Grid
- Standard Flexbox
- OKLCH colors (with fallbacks)
- Modern CSS features (clamp, min, max)

## Known Limitations

1. Tests require live or local server - cannot test static HTML directly
2. Visual regression tests depend on consistent rendering across environments
3. Some deprecation warnings in SCSS compilation (non-breaking)

## Next Steps

1. ✅ Move inline styles to SCSS
2. ✅ Create comprehensive tests
3. ✅ Fix dimension issues
4. ⏳ Run tests on live site
5. ⏳ Take screenshots for documentation
6. ⏳ Verify all tests pass
7. ⏳ Document any remaining issues

## Success Criteria

- ✅ No inline styles in index.html
- ✅ SCSS compiles without errors
- ✅ Comprehensive test coverage (60+ tests)
- ⏳ All Playwright tests pass
- ⏳ No horizontal overflow on any viewport
- ⏳ Navbar works correctly on desktop/mobile
- ⏳ All touch targets meet WCAG 2.5.5

## Contact

For questions or issues, refer to:
- `.github/instructions/scss.instructions.md` - SCSS guidelines
- `.github/instructions/html.instructions.md` - HTML guidelines
- `docs/specifications/responsive-design.md` - Responsive patterns
