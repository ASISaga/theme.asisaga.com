# Design Foundation

This directory contains the visual design foundation - colors, typography, tokens, and variables that define the theme's aesthetic.

## Source of Truth

- `_design/tokens/*.json` - canonical design token source in DTCG JSON
- `_variables-generated.scss` - generated mirror of `_design/tokens/*.json` via `npm run tokens:build` (Style Dictionary)
- Other SCSS files in this directory group those tokens by concern (colors, dimensions, typography, theme) and provide curated compatibility aliases where needed

## Files

- `_colors.scss` - Semantic color aliases, CSS custom properties, and compatibility mappings
- `_design-tokens.scss` - Non-color design tokens (shadows, opacity, animations, z-index, grid)
- `_typography.scss` - Font families, sizes, and typographic scale
- `_semantic-typography.scss` - Fluid typography and material primitives
- `_variables-generated.scss` - Generated token variables that mirror `_design/tokens/*.json`
- `_variables.scss` - Theme-wide Sass aliases and non-color compatibility variables
- `_dimensions.scss` - Spacing, sizing, and dimension tokens
- `_theme.scss` - Theme-level styling classes (no color definitions)

## Purpose

These files establish the visual language and design tokens used throughout the theme.

## 🎨 Color System (NEW - Centralized)

**All color definitions are now in `_colors.scss`** for easy maintenance and consistency.

### Why Centralized?

Previously, colors were scattered across multiple files:
- `_design-tokens.scss` - OKLCH primitives
- `_variables.scss` - Sacred color variables
- `_theme.scss` - CSS variables
- `ontology/_tokens.scss` - Ontology CSS custom properties

This made it difficult to:
- ❌ Find and update colors
- ❌ Avoid duplication
- ❌ Maintain consistency

Now, **all colors are in one place**:
- ✅ Single source of truth
- ✅ Easier maintenance
- ✅ Better organization
- ✅ No duplication

### Color File Structure

`_colors.scss` contains 7 sections:

1. **OKLCH Color Primitives** - Atomic color values (whites, blacks, blues, golds, grays)
2. **Semantic Color Tokens** - Functional mappings (surface, text, accent, border, state, gradient)
3. **Legacy Compatibility Layer** - Backward-compatible variable names
4. **Grayscale Palette** - Neutral grays for UI elements
5. **CSS Custom Properties** - Runtime theming colors
6. **Dark Mode Theme Variables** - Dark mode support
7. **Accessibility** - High contrast mode overrides

### Quick Start

**To update a color:**
1. Open `_colors.scss`
2. Find the color in Section 1 (Primitives) or Section 2 (Semantic)
3. Update the value
4. Run `npm run test:scss` to verify compilation

**To add a new color:**
1. Add primitive in Section 1: `$color-my-new-color: oklch(0.65 0.25 240);`
2. Create semantic token in Section 2: `$accent-feature: $color-my-new-color;`
3. Add CSS custom property in Section 5: `--accent-feature: #{$accent-feature};`

### Import Order

Colors **must** be imported first in `_common.scss`:

```scss
@import "base/design/colors";        // FIRST - all others depend on this
@import "base/design/design-tokens";
@import "base/design/variables";
```

### Color Philosophy

- **Primary**: Black text on white backgrounds (body content)
- **Chrome**: White text on black backgrounds (header, footer, nav)
- **Accents**: Neon blue for interactions, gold for special emphasis
- **Avoid**: Excessive colored backgrounds, use white/light gray primarily

### Testing

```bash
# Test SCSS compilation
npm run test:scss

# Run SCSS linter
npm run lint:scss

# Both
npm test
```

## Additional Documentation

- See `_colors.scss` for inline documentation and usage guidelines
- See `.github/instructions/scss.instructions.md` for complete SCSS guidelines
- See `GENOME.md` for design system evolution and philosophy
