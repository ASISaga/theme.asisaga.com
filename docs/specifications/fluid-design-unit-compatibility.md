# Fluid Design Unit Compatibility Specification

**Version**: 1.0  
**Status**: Active  
**Last Updated**: 2026-02-14

## Overview

This specification defines how to correctly mix viewport units (vw, vh, vmin, vmax) with root-relative units (rem, em) in SCSS to create fluid, responsive designs without causing Sass compilation errors.

## The Problem

Sass is a CSS preprocessor that attempts to "bake" calculations into static values during compilation. While Sass knows fixed conversions (e.g., `1in = 96px`), it cannot determine:

- **Viewport units** (vw, vh, vmin, vmax): Depend on the visitor's browser window size
- **Root units** (rem, em): Depend on the user's browser font settings

When Sass encounters incompatible unit arithmetic like `5vw + 1rem` outside of CSS functions, it cannot pre-compute the result and throws a compilation error:

```
Error: Incompatible units: 'vw' and 'rem'
```

## The Solution: CSS Runtime Functions

Modern CSS provides functions that browsers compute at runtime, after viewport and font sizes are known:

### calc()
Performs mathematical calculations with mixed units:

```scss
// ✅ VALID: Browser computes at runtime
font-size: calc(5vw + 1rem);
padding: calc(2vw - 0.5rem);
margin: calc(100% / 3 - 1rem);
```

### clamp()
Creates responsive values with min/max boundaries:

```scss
// ✅ VALID: Fluid typography with boundaries
font-size: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);
//         ^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^
//         min   preferred (fluid)          max

// Common pattern for headings
h1 {
  font-size: clamp(2.5rem, calc(5vw + 1rem), 4rem);
}
```

### min() / max()
Choose between multiple values:

```scss
// ✅ VALID: Responsive spacing
margin-bottom: min(5vw, 3rem);  // Never exceeds 3rem
padding: max(1rem, 2vw);        // Always at least 1rem
```

## Valid Patterns

### Fluid Typography Scale

```scss
// Heading scales - mobile to desktop
$font-h1: clamp(2.5rem, calc(5vw + 1rem), 4rem);        // 40px - 64px
$font-h2: clamp(2rem, calc(4vw + 0.5rem), 3rem);        // 32px - 48px
$font-h3: clamp(1.5rem, calc(3vw + 0.5rem), 2.25rem);   // 24px - 36px

// Body text scales
$font-body: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);
$font-body-sm: clamp(0.875rem, calc(0.5vw + 0.5rem), 1rem);
```

### Fluid Spacing

```scss
// Responsive margins that scale with viewport
.section {
  margin-bottom: clamp(2rem, 5vw, 4rem);
  padding: clamp(1rem, 3vw, 2rem);
}

// Gap in flex/grid layouts
.grid {
  gap: clamp(1rem, 2vw, 1.5rem);
}
```

### Responsive Component Sizing

```scss
.card {
  width: clamp(20rem, calc(50vw - 2rem), 40rem);
  padding: clamp(1rem, 2vw, 1.5rem);
  border-radius: clamp(0.5rem, 1vw, 1rem);
}
```

## Invalid Patterns

### Direct Arithmetic (Fails at Compile Time)

```scss
// ❌ INVALID: Sass cannot compute
$font-size: 5vw + 1rem;           // Error: Incompatible units
padding: 2vw - 0.5rem;            // Error: Incompatible units
margin: 10% + 1rem;               // Error: Incompatible units

// ✅ FIX: Wrap in calc()
$font-size: calc(5vw + 1rem);     // Valid
padding: calc(2vw - 0.5rem);      // Valid
margin: calc(10% + 1rem);         // Valid
```

### Sass Variables Without calc()

```scss
// ❌ INVALID: Assignment fails
$spacing: 2vw + 1rem;

// ✅ FIX: Use calc() in variable
$spacing: calc(2vw + 1rem);

// ✅ ALTERNATIVE: Calculate at usage
.element {
  margin: calc(2vw + 1rem);
}
```

### Nested Calculations

```scss
// ⚠️ CAUTION: calc() cannot be nested
$base: calc(5vw + 1rem);
font-size: calc($base * 1.5);     // May not work as expected

// ✅ FIX: Combine into single calc()
font-size: calc((5vw + 1rem) * 1.5);
```

## Validation

### Automated Testing

Use the SCSS Unit Compatibility Validator:

```bash
# Run validation
npm run validate:scss:units

# Verbose mode (shows all valid patterns)
VERBOSE=1 npm run validate:scss:units
```

### Manual Compilation Test

```bash
# Test Sass compilation
npm run test:scss

# Verbose output for debugging
npm run test:scss:verbose
```

### What the Validator Checks

1. ✅ **Valid**: Mixed units inside `calc()`, `clamp()`, `min()`, `max()`
2. ❌ **Invalid**: Mixed-unit arithmetic outside CSS functions
3. 📊 **Reports**: File location, line number, and fix suggestions

## Best Practices

### 1. Always Use clamp() for Fluid Typography

```scss
// ✅ BEST: Fluid with boundaries
h1 {
  font-size: clamp(2.5rem, calc(5vw + 1rem), 4rem);
}

// ❌ AVOID: No boundaries, can become too large/small
h1 {
  font-size: calc(5vw + 1rem);
}
```

### 2. Set Sensible Min/Max Values

```scss
// ✅ GOOD: Readable on all screens
$font-body: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);
//          ^^^^                                ^^^^^^
//          16px min                           18px max

// ❌ PROBLEMATIC: Can become illegible
$font-body: clamp(0.5rem, calc(2vw + 0.5rem), 3rem);
//          ^^^^                              ^^^
//          8px too small                    48px too large
```

### 3. Use Consistent Scaling Factors

```scss
// ✅ GOOD: Proportional scaling
$font-h1: clamp(2.5rem, calc(5vw + 1rem), 4rem);      // 5vw base
$font-h2: clamp(2rem, calc(4vw + 0.5rem), 3rem);      // 4vw base
$font-h3: clamp(1.5rem, calc(3vw + 0.5rem), 2.25rem); // 3vw base

// ❌ INCONSISTENT: Random scaling
$font-h1: clamp(2.5rem, calc(7vw + 2rem), 8rem);
$font-h2: clamp(1rem, calc(2vw + 0.1rem), 1.5rem);
```

### 4. Test at Multiple Viewport Sizes

- **Mobile**: 375px, 480px
- **Tablet**: 768px, 1024px
- **Desktop**: 1440px, 1920px

### 5. Consider Accessibility

```scss
// ✅ ACCESSIBLE: Respects user font size (rem)
font-size: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem);

// ⚠️ CAUTION: Fixed pixels ignore user preferences
font-size: clamp(16px, calc(0.5vw + 12px), 18px);
```

## Migration Guide

### From Fixed Sizes

```scss
// BEFORE: Fixed typography
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
p { font-size: 1rem; }

// AFTER: Fluid typography
h1 { font-size: clamp(2.5rem, calc(5vw + 1rem), 4rem); }
h2 { font-size: clamp(2rem, calc(4vw + 0.5rem), 3rem); }
p { font-size: clamp(1rem, calc(0.5vw + 0.75rem), 1.125rem); }
```

### From Media Queries

```scss
// BEFORE: Breakpoint-based scaling
h1 {
  font-size: 2.5rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 4rem;
  }
}

// AFTER: Fluid scaling (no media queries needed)
h1 {
  font-size: clamp(2.5rem, calc(5vw + 1rem), 4rem);
}
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Validate SCSS

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:scss
      - run: npm run validate:scss:units
      - run: npm run lint:scss
```

## Troubleshooting

### "Incompatible units: 'vw' and 'rem'"

**Problem**: Direct arithmetic mixing viewport and root units

```scss
// ❌ Error
$size: 5vw + 1rem;
```

**Solution**: Wrap in calc()

```scss
// ✅ Fixed
$size: calc(5vw + 1rem);
```

### "calc() nested too deeply"

**Problem**: Sass variables with calc() used in more calc()

```scss
// ❌ May fail
$base: calc(5vw + 1rem);
$doubled: calc($base * 2);
```

**Solution**: Combine into single calc()

```scss
// ✅ Fixed
$doubled: calc((5vw + 1rem) * 2);
```

### Values not scaling as expected

**Problem**: Min/max too close or wrong order

```scss
// ❌ Min > Max (invalid)
clamp(2rem, calc(5vw + 1rem), 1rem)

// ❌ Too restrictive
clamp(1rem, calc(5vw + 1rem), 1.1rem)
```

**Solution**: Ensure min < preferred < max

```scss
// ✅ Valid range
clamp(1rem, calc(5vw + 1rem), 3rem)
```

## Examples Repository

See `/docs/specifications/scss-ontology-system.md` for complete implementation examples using the Genesis Ontology system.

## References

- **MDN calc()**: https://developer.mozilla.org/en-US/docs/Web/CSS/calc
- **MDN clamp()**: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
- **CSS Values and Units**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units
- **Sass Documentation**: https://sass-lang.com/documentation
- **SCSS Instructions**: `.github/instructions/scss.instructions.md`
- **Unit Validator**: `.github/skills/scss-unit-validator/SKILL.md`

---

**Specification maintained by**: ASISaga  
**Related Skills**: scss-unit-validator, scss-refactor-agent, responsive-design-agent
