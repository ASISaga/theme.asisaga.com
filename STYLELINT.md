# Stylelint Configuration for ASI Saga Theme

This directory contains the stylelint configuration for the ASI Saga semantic design system.

## Quick Start

```bash
# Install dependencies (if not already installed)
npm install

# Lint all SCSS files
npm run lint:scss

# Auto-fix issues where possible
npm run lint:scss:fix

# Get detailed verbose output
npm run lint:scss:report
```

## Configuration Files

- **package.json** - Contains stylelint dependencies and npm scripts
- **.stylelintrc.yml** - Main stylelint configuration with custom rules
- **.stylelintignore** - Files to ignore during linting

## Key Rules Enforced

### Critical Rules (MUST follow)

1. **No @extend** - Using `@extend` causes Jekyll build errors
   - Error: `at-rule-disallowed-list`
   - Fix: Replace with mixins or CSS custom properties

2. **Max 3 nesting levels** - Prevents overly complex selectors
   - Error: `max-nesting-depth`
   - Fix: Refactor to reduce nesting using parent selectors

3. **No ID selectors** - Use classes for styling
   - Error: `selector-max-id`
   - Fix: Convert ID selectors to classes

4. **BEM-style class naming** - `.block__element--modifier`
   - Error: `selector-class-pattern`
   - Fix: Rename classes to follow BEM pattern

5. **No units on zero values** - Use `0` not `0px`
   - Error: `length-zero-no-unit`
   - Fix: Remove units from zero values (auto-fixable)

### Best Practices (Recommended)

- Use CSS custom properties from design token system
- Prefer kebab-case for variable names
- Use semantic class names (WHAT, not HOW)
- Follow ontology mixins for new development

## Current Status

As of the initial setup:
- **Total errors**: 202 (down from 570 after auto-fix)
- **Critical @extend violations**: 61 in 11 files (needs manual fixing)
- **Nesting depth issues**: 18 in 8 files (needs refactoring)
- **Auto-fixable issues**: 15 remaining (run `npm run lint:scss:fix`)

## Files with Known Issues

### Files with @extend violations (Priority: HIGH)

These files MUST be refactored to remove @extend:
- `_sass/base/_base-section.scss`
- `_sass/components/layouts/_archive-item.scss`
- `_sass/components/layouts/_article-toc.scss`
- `_sass/components/layouts/_faq-item.scss`
- `_sass/components/layouts/_gallery-item.scss`
- `_sass/components/layouts/_landing-features.scss`
- `_sass/components/layouts/_post-navigation.scss`
- `_sass/components/layouts/_profile-stats.scss`
- `_sass/components/layouts/_splash-countdown.scss`
- `_sass/layouts/_archive.scss`
- `_sass/layouts/_article.scss`

### Files with nesting depth issues (Priority: MEDIUM)

These files should be refactored to reduce nesting:
- `_sass/components/_genesis-invitation.scss`
- `_sass/components/_header.scss`
- `_sass/components/_product-benefits-list.scss`
- `_sass/components/_product-code-example.scss`
- `_sass/components/_product-feature-grid.scss`
- `_sass/components/_product-page.scss`
- `_sass/components/_product-visual.scss`
- `_sass/components/_timeline.scss`

## How to Fix Common Issues

### Replacing @extend

**Before:**
```scss
.section {
  @extend .bg-gradient-primary-light;
  @extend .rounded;
  @extend .shadow;
}
```

**After (using mixins):**
```scss
.section {
  @include glass-surface(0.85, 20px);
  @include padding-section;
  border-radius: var(--radius-bento);
  box-shadow: var(--shadow-ambient);
}
```

**After (using ontology - preferred for new code):**
```scss
.section {
  @include genesis-entity('primary');
  @include genesis-environment('focused');
}
```

### Reducing Nesting Depth

**Before:**
```scss
.component {
  .header {
    .title {
      .icon {  // 4 levels - too deep!
        color: var(--accent-glow);
      }
    }
  }
}
```

**After:**
```scss
.component {
  .header {
    .title {
      // Max 3 levels
    }
  }
  
  // Flatten using parent selector
  .title .icon {
    color: var(--accent-glow);
  }
}
```

## Integration with Copilot

When using GitHub Copilot to make SCSS changes:

1. **Before changes**: Run `npm run lint:scss` to see baseline
2. **During development**: Fix issues as you go
3. **Before commit**: Ensure new code passes all critical rules
4. **Auto-fix**: Use `npm run lint:scss:fix` for formatting

**Focus on new code**: Don't worry about fixing all legacy issues immediately. Ensure your new code follows the rules, and refactor legacy code incrementally.

## Ignored Files

The following are ignored from linting:
- Node modules and build outputs
- Vendor files (fontawesome, etc.)
- Jekyll front matter files (style.scss with ---)
- JavaScript files

## Configuration Philosophy

This stylelint configuration balances:
- **Strictness on critical issues** (@extend, nesting depth)
- **Flexibility on formatting** (allow various styles)
- **Backward compatibility** (don't break existing code)
- **Progressive enhancement** (new code should be better)

Rules are tuned specifically for:
- Jekyll SCSS compilation constraints
- OKLCH color space usage
- Ontology-based semantic system
- Legacy Bento/Material components

## Further Documentation

See `.github/instructions/scss.instructions.md` for complete SCSS coding guidelines.
