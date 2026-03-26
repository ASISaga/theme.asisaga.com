# Genesis Design Token Guide

**Last Updated**: 2026-03-26  
**Version**: 1.0  
**Source**: `.github/skills/style-dictionary/tokens.json`

## Overview

Design tokens are the atomic values that define the Genesis Semantic Design System visual language. This guide documents every token category, its SCSS output variable name, and usage guidance.

The tokens are stored in `tokens.json` using the Style Dictionary format (nested JSON with `value`, `type`, and optional `comment` fields). They are translated into SCSS variable declarations by `script.mjs`.

## Token Categories

### 1. Color Tokens

The Genesis design system uses **OKLCH** color values throughout. OKLCH provides perceptually uniform color spaces, enabling consistent contrast and vibrant accents across all displays.

| Token path | SCSS variable | Value | Usage |
|---|---|---|---|
| `color.light.white` | `$color-light-white` | `oklch(0.99 0.005 90)` | Primary page background |
| `color.light.surface` | `$color-light-surface` | `oklch(0.96 0.01 90)` | Card / elevated surfaces |
| `color.light.subtle-gray` | `$color-light-subtle-gray` | `oklch(0.93 0.01 220)` | Subtle depth separators |
| `color.text.primary` | `$color-text-primary` | `oklch(0.12 0.01 250)` | Main body text |
| `color.text.secondary` | `$color-text-secondary` | `oklch(0.25 0.01 230)` | Secondary / supporting text |
| `color.text.muted` | `$color-text-muted` | `oklch(0.45 0.01 220)` | Placeholder / de-emphasised text |
| `color.dark.profound-black` | `$color-dark-profound-black` | `oklch(0.08 0.01 250)` | Dark backgrounds |
| `color.accent.neon-blue` | `$color-accent-neon-blue` | `oklch(0.65 0.25 230)` | Primary interactive accent |
| `color.accent.neon-blue-bright` | `$color-accent-neon-blue-bright` | `oklch(0.75 0.28 225)` | Hover / active state |
| `color.accent.gold` | `$color-accent-gold` | `oklch(0.70 0.15 85)` | Subtle gold emphasis |
| `color.border.light` | `$color-border-light` | `oklch(0.85 0.01 220)` | Borders on white backgrounds |
| `color.border.dark` | `$color-border-dark` | `oklch(0.15 0.01 220)` | Borders on dark backgrounds |

> ⚠️ **OKLCH preservation**: Never run these tokens through Style Dictionary's default color transforms — they will be corrupted to hex. Always use `node script.mjs` or the provided shell scripts.

### 2. Typography Tokens

#### Font Families

| Token path | SCSS variable | Purpose |
|---|---|---|
| `font.family.consciousness` | `$font-family-consciousness` | Primary UI font (Inter/system) |
| `font.family.wisdom` | `$font-family-wisdom` | Serif narrative font (Crimson Text) |
| `font.family.sacred` | `$font-family-sacred` | Display heading font (Montserrat) |

#### Font Weights

| Token path | SCSS variable | Value |
|---|---|---|
| `font.weight.light` | `$font-weight-light` | 300 |
| `font.weight.normal` | `$font-weight-normal` | 400 |
| `font.weight.medium` | `$font-weight-medium` | 500 |
| `font.weight.semibold` | `$font-weight-semibold` | 600 |
| `font.weight.bold` | `$font-weight-bold` | 700 |
| `font.weight.sacred` | `$font-weight-sacred` | 800 |

#### Font Sizes

The scale follows a standard modular approach plus Genesis-specific sacred/consciousness sizes:

| Token path | SCSS variable | Value | Notes |
|---|---|---|---|
| `font.size.xs` | `$font-size-xs` | 0.75rem | 12px |
| `font.size.sm` | `$font-size-sm` | 0.875rem | 14px |
| `font.size.base` | `$font-size-base` | 1rem | 16px |
| `font.size.lg` | `$font-size-lg` | 1.125rem | 18px |
| `font.size.xl` | `$font-size-xl` | 1.25rem | 20px |
| `font.size.xxl` | `$font-size-xxl` | 1.5rem | 24px |
| `font.size.3xl` | `$font-size-3xl` | 1.875rem | 30px |
| `font.size.4xl` | `$font-size-4xl` | 2.25rem | 36px |
| `font.size.5xl` | `$font-size-5xl` | 3rem | 48px |
| `font.size.genesis` | `$font-size-genesis` | 4rem | 64px hero headlines |
| `font.size.sacred-xl` | `$font-size-sacred-xl` | 2.618rem | Golden ratio (φ²) |
| `font.size.sacred-lg` | `$font-size-sacred-lg` | 1.618rem | Golden ratio (φ) |

### 3. Spacing Tokens

Eight-point grid with Genesis-specific extensions:

| Token path | SCSS variable | Value |
|---|---|---|
| `spacing.xs` | `$spacing-xs` | 0.25rem (4px) |
| `spacing.sm` | `$spacing-sm` | 0.5rem (8px) |
| `spacing.md` | `$spacing-md` | 1rem (16px) |
| `spacing.lg` | `$spacing-lg` | 1.5rem (24px) |
| `spacing.xl` | `$spacing-xl` | 2rem (32px) |
| `spacing.2xl` | `$spacing-2xl` | 3rem (48px) |
| `spacing.3xl` | `$spacing-3xl` | 4rem (64px) |
| `spacing.4xl` | `$spacing-4xl` | 6rem (96px) |
| `spacing.genesis` | `$spacing-genesis` | 8rem (128px) — major section gaps |

### 4. Border Radius Tokens

| Token path | SCSS variable | Value |
|---|---|---|
| `border-radius.sm` | `$border-radius-sm` | 0.25rem |
| `border-radius.md` | `$border-radius-md` | 0.5rem |
| `border-radius.lg` | `$border-radius-lg` | 1rem |
| `border-radius.xl` | `$border-radius-xl` | 1.5rem |
| `border-radius.consciousness` | `$border-radius-consciousness` | 2rem |
| `border-radius.infinite` | `$border-radius-infinite` | 50% |

### 5. Transition Tokens

| Token path | SCSS variable | Value |
|---|---|---|
| `transition.fast` | `$transition-fast` | 0.2s ease |
| `transition.normal` | `$transition-normal` | 0.3s ease |
| `transition.slow` | `$transition-slow` | 0.5s ease |
| `transition.consciousness` | `$transition-consciousness` | 0.8s cubic-bezier (energetic in/out) |
| `transition.transcendent` | `$transition-transcendent` | 1.2s cubic-bezier (easeOutExpo) |

### 6. Z-Index Tokens

| Token path | SCSS variable | Value | Layer |
|---|---|---|---|
| `z-index.background` | `$z-index-background` | -1 | Canvas backgrounds |
| `z-index.content` | `$z-index-content` | 1 | Normal content |
| `z-index.overlay` | `$z-index-overlay` | 10 | Dropdowns / tooltips |
| `z-index.consciousness` | `$z-index-consciousness` | 100 | Modals / drawers |
| `z-index.transcendent` | `$z-index-transcendent` | 1000 | Navigation |
| `z-index.genesis` | `$z-index-genesis` | 9999 | Critical overlays |

## Adding New Tokens

1. Add entry to `tokens.json` following the category pattern
2. Run `node .github/skills/style-dictionary/script.mjs`
3. Review `_sass/base/design/_variables-generated.scss`
4. Run `npm run test:scss` to confirm Sass compilation
5. Copy relevant variables into `_sass/base/design/_variables.scss` or apply with `--apply`

## Bidirectional Sync Workflow

```
tokens.json ──[tokens-to-scss.sh]──► _variables-generated.scss
                                            │
                                     Review & --apply
                                            │
                                            ▼
                                    _variables.scss (production)
                                            │
                                    [scss-to-tokens.sh]
                                            │
                                            ▼
                               tokens-extracted.json ──► tokens.json
```

## Related Files

- **Token source**: `.github/skills/style-dictionary/tokens.json`
- **Build script**: `.github/skills/style-dictionary/script.mjs`
- **Forward script**: `.github/skills/style-dictionary/scripts/tokens-to-scss.sh`
- **Reverse script**: `.github/skills/style-dictionary/scripts/scss-to-tokens.sh`
- **Production variables**: `_sass/base/design/_variables.scss`
- **Production colors**: `_sass/base/design/_colors.scss`
- **Sample output**: `.github/skills/style-dictionary/_variables.scss`

## References

→ **Skill overview**: `.github/skills/style-dictionary/SKILL.md`  
→ **SCSS instructions**: `.github/instructions/scss.instructions.md`  
→ **Ontology system**: `/docs/specifications/scss-ontology-system.md`  
→ **Fluid design**: `/docs/specifications/fluid-design-unit-compatibility.md`
