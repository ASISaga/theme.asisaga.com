# Test Pages Directory

This directory contains organized test and demo pages for the ASI Saga Theme.

## Directory Structure

### `/responsive/`
Responsive design and layout tests across different viewport sizes.
- `responsive-ui-test.html` - General responsive UI testing
- `grid-centering-test.html` - Grid centering behavior tests
- `width-collapse-fix-test.html` - Width collapse fix validation

### `/mobile/`
Mobile-specific testing pages for touch interactions and viewport behavior.
- `mobile-test-fixed.html` - Mobile layout fixes
- `mobile-portrait-test.html` - Portrait orientation tests
- `mobile-gutter-test.html` - Mobile gutter spacing tests
- `mobile-white-pillar-test.html` - White pillar fix tests
- `mobile-nav-drawer-test.html` - Mobile navigation drawer tests
- `touch-target-test.html` - Touch target compliance (WCAG 2.5.5)
- `touch-target-test-standalone.html` - Standalone touch target tests

### `/motion/`
Motion library and animation testing pages.
- `motion-test.html` - General motion library tests
- `motion-demo.html` - Motion library demonstration
- `motion-presets-test.html` - Motion preset validation
- `test-motion-fix.html` - Motion library fixes

### `/overflow/`
Overflow and containment behavior tests.
- `overflow-test.html` - General overflow testing
- `overflow-fix-demo.html` - Overflow fix demonstrations
- `overflow-containment-test.html` - Containment strategy tests

### `/navigation/`
Navigation component and behavior tests.
- `navigation-demo.html` - Navigation component demo
- `scroll-test.html` - Scroll behavior tests
- `header-visibility-test.html` - Header visibility on scroll
- `test-header-scroll.html` - Header scroll behavior
- `test-background-header.html` - Header background tests

### `/layouts/`
Jekyll layout integration and migration tests.
- `complete-layouts-migration-demo.html` - Complete layout migration demo
- `jekyll-layouts-demo.html` - Jekyll layouts demonstration
- `footer-width-standalone-test.html` - Footer width behavior tests

### `/ontology/`
Ontology system demonstrations and examples.
- `ontology-animations-demo.html` - Ontology animation system demo
- `enhanced-showcase.html` - Enhanced ontology showcase (moved to root demo)
- `ontology-examples.html` - Ontology examples (moved to root demo)

### `/components/`
Component library demonstrations.
- `web-component-templates-demo.html` - Web component templates
- `web-components-includes-demo.html` - Web component includes
- `genesis-web-components-demo.html` - Genesis web components

### `/misc/`
Miscellaneous test pages and legacy tests.
- `geometric-leak-test.html` - Geometric rendering tests

### `/e2e/`
End-to-end structural regression tests using Playwright.
- `structural-regression.spec.js` - Main test suite for live demo page
- See `/docs/PLAYWRIGHT-TESTING.md` for complete documentation

## Root-Level Demos (Keep in Root)

These are primary showcase pages that should remain in the repository root:
- `demo.html` - Main theme demonstration (permalink: /demo/)
- `genesis-complete-demo.html` - Complete Genesis system showcase

## Usage in Agent Intelligence System

Test page locations are referenced in:
- `.github/instructions/html.instructions.md` - HTML testing patterns
- `.github/skills/responsive-design-agent/` - Responsive testing
- `.github/skills/futuristic-effects-agent/` - Visual effects testing

## Testing Workflow

1. Create new test pages in appropriate subdirectory
2. Use Jekyll layouts from `_layouts/` (theme responsibility)
3. Reference SCSS from theme via layouts (no direct SCSS in pages)
4. Follow semantic HTML patterns from `.github/instructions/html.instructions.md`
