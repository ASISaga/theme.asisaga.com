# SCSS & Styling Specification

## Overview

This specification defines the SCSS architecture, coding standards, and styling patterns for the ASI Saga theme. All styles use SCSS (Sass) with a modular architecture built on Bootstrap 5.3.5.

## SCSS Architecture

### Directory Structure

```
_sass/
├── _common.scss              # Entry point (imports all partials)
├── base/                     # Foundation styles
│   ├── _colors.scss          # Color system and variables
│   ├── _variables.scss       # Bootstrap overrides and custom vars
│   ├── _typography.scss      # Font system and text styles
│   ├── _animations.scss      # Animation keyframes and utilities
│   ├── _mixins.scss          # Reusable mixins
│   ├── _utilities.scss       # Utility classes
│   ├── _layout.scss          # Layout fundamentals
│   └── _accessibility.scss   # A11y-specific styles
├── bootstrap/                # Bootstrap 5.3.5 source
│   ├── _functions.scss
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── ...
├── components/               # UI component styles
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _navbar.scss
│   ├── _hero.scss
│   └── ...
├── layouts/                  # Layout-specific styles
│   ├── _default.scss
│   ├── _post.scss
│   ├── _landing.scss
│   └── ...
├── fontawesome/              # Font Awesome source
└── vendor/                   # Third-party libraries
```

### Import Order

**CRITICAL**: The order of imports in `_common.scss` is essential:

```scss
// 1. Font Awesome (must be first for global variables)
@import "fontawesome/font-awesome";

// 2. Third-party fonts and icons
@import "base/fonts";
@import "base/icons";

// 3. Bootstrap dependencies (before overrides)
@import "bootstrap/functions";
@import "bootstrap/variables";
@import "bootstrap/variables-dark";
@import "bootstrap/mixins";

// 4. Theme base styles and variable overrides
@import "base/colors";
@import "base/dimensions";
@import "base/variables";
@import "base/mixins";
@import "base/typography";
@import "base/animations";

// 5. Bootstrap main (uses overridden variables)
@import "bootstrap/bootstrap";

// 6. Accessibility (after Bootstrap for variable access)
@import "base/accessibility";

// 7. Additional base styles
@import "base/utilities";
@import "base/layout";
@import "base/common";
@import "base/responsive";

// 8. Component mixins (before components)
@import "components/section-component";
@import "components/layout-component";

// 9. Individual components
@import "components/footer";
@import "components/header";
// ... more components

// 10. Layout-specific styles
@import "layouts/default";
@import "layouts/post";
// ... more layouts
```

## SCSS Coding Standards

### NEVER Use @extend

```scss
/* ❌ BAD: Causes Jekyll build errors */
.button {
  @extend .btn;
  @extend .btn-primary;
}

/* ✅ GOOD: Use explicit properties or mixins */
.button {
  @include button-variant($primary, $primary);
  // Or explicit classes in HTML:
  // <button class="btn btn-primary">
}
```

### Use Variables for Customization

```scss
/* ✅ GOOD: Override Bootstrap variables */
// In base/_variables.scss
$primary: #FFD700;  // Luminous Gold
$secondary: #0B1426;  // Cosmic Deep Blue
$font-family-base: 'Inter', -apple-system, sans-serif;

/* ❌ BAD: Override compiled CSS */
.btn-primary {
  background-color: #FFD700;  // Don't do this
}
```

### Component Structure

Each component has exactly ONE SCSS class:

```scss
// _components/_card.scss

.card-component {
  // Container styles
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: $white;
  
  // Child elements (BEM-like naming)
  &__header {
    margin-bottom: 1rem;
    border-bottom: 1px solid $gray-300;
  }
  
  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: $primary;
  }
  
  &__body {
    color: $body-color;
    line-height: 1.6;
  }
  
  // Modifiers
  &--featured {
    border: 2px solid $primary;
    box-shadow: 0 4px 12px rgba($primary, 0.2);
  }
  
  // States
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
}
```

### Nesting Limits

**Limit nesting to 3-4 levels max**:

```scss
/* ✅ GOOD: Shallow nesting */
.nav-menu {
  &__item {
    padding: 0.5rem;
    
    &:hover {
      background: $gray-100;
    }
  }
}

/* ❌ BAD: Too deeply nested */
.nav {
  .menu {
    .list {
      .item {
        .link {
          // Too deep!
        }
      }
    }
  }
}
```

### Use Parent Selector (&)

```scss
.button {
  background: $primary;
  
  // Modifier
  &--large {
    padding: 1rem 2rem;
    font-size: 1.25rem;
  }
  
  // State
  &:hover {
    background: darken($primary, 10%);
  }
  
  // Context
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## Layout & CSS Requirements (MANDATORY)

### CSS Containment

**All layout containers MUST use CSS containment**:

```scss
.layout-container {
  contain: layout style;
  isolation: isolate;
}

.site-main {
  contain: layout style;
  isolation: isolate;
}
```

**Why**: Improves rendering performance and prevents style leakage.

### Responsive Grid Containers

**All grid containers MUST be responsive**:

```scss
/* ✅ GOOD: Responsive grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* ❌ BAD: Fixed grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  // Breaks on mobile
}
```

### Horizontal Overflow Prevention

**Never allow horizontal overflow**:

```scss
/* ✅ GOOD: Prevent overflow */
body {
  overflow-x: hidden;  // Only on body when required and tested
}

.content-wrapper {
  max-width: 100%;
  overflow-wrap: break-word;
}

/* ❌ BAD: Allowing overflow */
.wide-content {
  width: 1400px;  // Can cause horizontal scroll on smaller screens
}
```

### Focus Indicators

**All interactive elements MUST have visible focus indicators**:

```scss
/* ✅ GOOD: Clear focus styles */
.btn {
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}

a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  text-decoration: underline;
}

/* ❌ BAD: Removing focus styles */
button:focus {
  outline: none;  // Never do this without replacement
}
```

## Color & Contrast Rules (MANDATORY)

### Text Color Requirements

**Text colors MUST be solid and WCAG AA compliant**:

```scss
/* ✅ GOOD: Solid, compliant colors */
.text-primary {
  color: #0B1426;  // Cosmic Deep Blue (high contrast on white)
}

.footer-text {
  color: #ffffff;  // White text on dark background
}

/* ❌ BAD: Low opacity text */
.muted-text {
  color: rgba(0, 0, 0, 0.5);  // Opacity < 0.9 not allowed for text
}
```

### Contrast Testing

**Test all color combinations for WCAG AA compliance**:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

```scss
// Example: Testing contrast
// Background: #0B1426 (Cosmic Deep Blue)
// Text: #ffffff (White)
// Contrast ratio: 16.47:1 ✅ WCAG AAA

.dark-section {
  background-color: #0B1426;
  color: #ffffff;  // High contrast
}
```

### Footer/Header Text Rules

**Footer and header text on dark backgrounds MUST be #ffffff**:

```scss
.site-header {
  background: $cosmic-blue;  // #0B1426
  color: #ffffff;  // MUST be solid white
}

.site-footer {
  background: $cosmic-blue;
  color: #ffffff;  // MUST be solid white
}
```

## Responsive Design

### Mobile-First Approach

**Always write mobile styles first, then enhance for larger screens**:

```scss
/* ✅ GOOD: Mobile-first */
.card {
  padding: 1rem;
  font-size: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
    font-size: 1.125rem;
  }
  
  @media (min-width: 1200px) {
    padding: 2rem;
    font-size: 1.25rem;
  }
}

/* ❌ BAD: Desktop-first */
.card {
  padding: 2rem;
  
  @media (max-width: 1199px) {
    padding: 1.5rem;
  }
}
```

### Test Viewports

**Minimum required test viewports**:

- **375px**: iPhone SE (mobile)
- **768px**: iPad (tablet)
- **1440px**: Desktop

```scss
// Use Bootstrap breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

### Touch Targets

**Touch targets MUST be at least 44px**:

```scss
/* ✅ GOOD: Adequate touch target */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}

.nav-link {
  padding: 0.75rem 1rem;  // Ensures 44px+ height
}
```

### Minimum Font Size

**Minimum font size is 16px**:

```scss
/* ✅ GOOD: Readable text */
body {
  font-size: 1rem;  // 16px
}

.small-text {
  font-size: 0.875rem;  // 14px - use sparingly
}

/* ❌ BAD: Too small */
.tiny-text {
  font-size: 0.75rem;  // 12px - avoid
}
```

## Sacred Color System

### Color Variables

```scss
// Primary Sacred Colors
$cosmic-blue: #0B1426;      // Infinite potential
$luminous-gold: #FFD700;     // Human wisdom
$transcendent-white: #FFFFFF; // Unity consciousness
$ethereal-silver: #C0C0C0;   // Bridging consciousness
$emerald-green: #50C878;     // Life force integration
$royal-purple: #6A0DAD;      // Sovereign consciousness

// Bootstrap overrides
$primary: $luminous-gold;
$secondary: $cosmic-blue;
$success: $emerald-green;
$info: $ethereal-silver;
```

### Color Usage

```scss
.hero {
  background: linear-gradient(135deg, $cosmic-blue, $royal-purple);
  color: $transcendent-white;
}

.cta-button {
  background: $luminous-gold;
  color: $cosmic-blue;
  
  &:hover {
    background: darken($luminous-gold, 10%);
  }
}
```

## Animation System

### Sacred Animations

```scss
// Keyframes
@keyframes sacred-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba($luminous-gold, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba($luminous-gold, 0.6);
  }
}

@keyframes transcendence-spiral {
  from {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(1.1);
  }
}

// Utility classes
.animate-glow {
  animation: sacred-glow 3s ease-in-out infinite;
}

.animate-spiral {
  animation: transcendence-spiral 20s linear infinite;
}
```

### Reduced Motion Support

```scss
/* MANDATORY: Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Mixins

### Common Mixins

```scss
// Responsive breakpoint mixin
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($grid-breakpoints, $breakpoint)) {
    @content;
  }
}

// Usage
.element {
  font-size: 1rem;
  
  @include respond-to(md) {
    font-size: 1.125rem;
  }
}

// Button variant mixin
@mixin sacred-button($bg-color, $text-color) {
  background: $bg-color;
  color: $text-color;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    background: darken($bg-color, 10%);
    border-color: $text-color;
  }
}

// Flex center mixin
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Bootstrap Integration

### Using Bootstrap Utilities

```html
<!-- ✅ GOOD: Use Bootstrap utilities where appropriate -->
<div class="d-flex align-items-center justify-content-between mb-4">
  <h2 class="text-primary">Title</h2>
  <button class="btn btn-secondary">Action</button>
</div>
```

### Customizing Bootstrap

```scss
// Override variables BEFORE importing Bootstrap
$primary: $luminous-gold;
$border-radius: 0.5rem;
$btn-padding-y: 0.75rem;
$btn-padding-x: 1.5rem;

@import "bootstrap/bootstrap";
```

## Performance Best Practices

### Efficient Selectors

```scss
/* ✅ GOOD: Efficient */
.card {
  background: white;
}

/* ❌ BAD: Inefficient */
div.container > div.row > div.col > div.card {
  background: white;
}
```

### Use Transform and Opacity for Animations

```scss
/* ✅ GOOD: Hardware-accelerated */
.slide-in {
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &.active {
    transform: translateX(0);
    opacity: 1;
  }
}

/* ❌ BAD: Causes layout recalculation */
.slide-in {
  left: -100px;
  transition: left 0.3s ease;
  
  &.active {
    left: 0;
  }
}
```

## Comments

### Documentation

```scss
/**
 * Card Component
 * 
 * A flexible card component for displaying content with optional
 * header, body, and footer sections.
 * 
 * @example
 *   <div class="card-component">
 *     <div class="card-component__header">Header</div>
 *     <div class="card-component__body">Content</div>
 *   </div>
 */
.card-component {
  // Component styles
}

// Single-line comment for brief notes
.card-component__header {
  border-bottom: 1px solid $gray-300;  // Visual separator
}
```

## Anti-Patterns to Avoid

### ❌ Don't Use !important

```scss
/* Bad */
.text {
  color: red !important;
}

/* Good: Increase specificity properly */
.section .text {
  color: red;
}
```

### ❌ Don't Use Magic Numbers

```scss
/* Bad */
.element {
  margin-top: 47px;  // Why 47?
}

/* Good: Use variables */
$spacing-lg: 3rem;

.element {
  margin-top: $spacing-lg;
}
```

### ❌ Don't Duplicate Bootstrap

```scss
/* Bad: Reinventing Bootstrap */
.my-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Good: Use Bootstrap */
<div class="container">
```

## File Naming

- Underscore prefix for partials: `_component.scss`
- Lowercase with hyphens: `_feature-grid.scss`
- Match component/layout name: `_header.scss` for header component

## Testing Checklist

- [ ] Test in all target browsers
- [ ] Test at all required viewports (375px, 768px, 1440px)
- [ ] Verify color contrast (WCAG AA minimum)
- [ ] Test with reduced motion preference
- [ ] Check focus indicators on all interactive elements
- [ ] Validate no horizontal overflow
- [ ] Test dark mode (if applicable)

## Related Specifications

- [Color System](./color-system.md)
- [Typography](./typography.md)
- [Animation System](./animation-system.md)
- [Responsive Design](./responsive-design.md)
- [Accessibility Standards](./accessibility.md)
