---
name: style-dictionary
description: Bidirectional design token translation between Style Dictionary JSON and _variables.scss for the Genesis Semantic Design System. Converts tokens to SCSS variables and parses existing SCSS back into structured token JSON.
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: design-system
  role: token-translator
allowed-tools: Bash(node:*) Bash(npx:*) Read Edit
---

# Style Dictionary Skill

**Role**: Design Token Translation Specialist  
**Scope**: Bidirectional translation between `tokens.json` and `_variables.scss`  
**Version**: 1.0

## Purpose

Maintains a single source of truth for the Genesis Semantic Design System design tokens. Translates between two representations:

- **Tokens → SCSS**: Build structured `tokens.json` → SCSS `$variable: value;` declarations  
- **SCSS → Tokens**: Parse existing `_sass/base/design/_variables.scss` → structured `tokens.json`

The token source (`tokens.json`) covers OKLCH colors, typography, spacing, border-radius, shadows, and transitions that define the Genesis design language.

## When to Use This Skill

- Synchronising `_sass/base/design/_variables.scss` after updating `tokens.json`
- Extracting design tokens from SCSS into JSON for tooling, design tools, or documentation
- Onboarding a new subdomain by exporting the current token set as JSON
- Auditing design token drift between the JSON source and generated SCSS

## Core Responsibilities

1. **Forward translation** — `tokens.json` → `_variables.scss` via `scripts/tokens-to-scss.sh`
2. **Reverse translation** — `_variables.scss` → `tokens.json` via `scripts/scss-to-tokens.sh`
3. **Token governance** — flag duplicate variable names, missing values, or orphaned references
4. **OKLCH preservation** — pass through OKLCH color values without transformation (no hex coercion)

## Workflows

### 1. Tokens → SCSS (Forward)

Update `tokens.json` with new or changed values, then generate the SCSS output:

```bash
# Generate _variables.scss from tokens.json (staged output for review)
.github/skills/style-dictionary/scripts/tokens-to-scss.sh

# Or generate directly using node script
node .github/skills/style-dictionary/script.mjs
```

The script writes `_sass/base/design/_variables-generated.scss`. Review the diff, then run with `--apply` to overwrite the production `_variables.scss`.

### 2. SCSS → Tokens (Reverse)

Parse existing `_sass/base/design/` SCSS variables back into `tokens.json` format:

```bash
# Extract SCSS variables into tokens.json (staged output for review)
.github/skills/style-dictionary/scripts/scss-to-tokens.sh
```

The script writes `.github/skills/style-dictionary/tokens-extracted.json`. Review and rename to `tokens.json`.

### 3. Full Sync Check

Verify the token source and generated SCSS are in sync:

```bash
# Generate and diff against production variables
.github/skills/style-dictionary/scripts/tokens-to-scss.sh --diff
```

## Token Structure

Tokens in `tokens.json` use the Style Dictionary format with Genesis-specific categories:

| Category | SCSS prefix | Examples |
|----------|-------------|---------|
| `color.light.*` | `$color-light-*` | `$color-light-white`, `$color-light-surface` |
| `color.text.*` | `$color-text-*` | `$color-text-primary`, `$color-text-muted` |
| `color.accent.*` | `$color-accent-*` | `$color-accent-neon-blue`, `$color-accent-gold` |
| `font.family.*` | `$font-family-*` | `$font-family-consciousness`, `$font-family-wisdom` |
| `font.weight.*` | `$font-weight-*` | `$font-weight-bold`, `$font-weight-sacred` |
| `font.size.*` | `$font-size-*` | `$font-size-base`, `$font-size-genesis` |
| `spacing.*` | `$spacing-*` | `$spacing-md`, `$spacing-genesis` |
| `border-radius.*` | `$border-radius-*` | `$border-radius-lg`, `$border-radius-infinite` |
| `transition.*` | `$transition-*` | `$transition-fast`, `$transition-consciousness` |

→ **Full token reference**: `.github/skills/style-dictionary/references/TOKEN-GUIDE.md`

## OKLCH Preservation

The Genesis design system uses OKLCH color values (e.g. `oklch(0.65 0.25 230)`). Style Dictionary's default color transforms convert to hex and would corrupt these values. This skill uses a **pass-through format** in `script.mjs` that outputs raw values without transformation.

❌ **Do not use** `npx style-dictionary build` directly with the default `scss` transformGroup — it will corrupt OKLCH values.  
✅ **Always use** `node script.mjs` or the wrapper scripts in `scripts/`.

## Validation

After generating SCSS, validate with the standard test suite:

```bash
npm run test:scss          # Confirms Sass compiles successfully
npm run validate:scss:units  # Checks for incompatible unit mixing
npm test                   # Full suite
```

## Related Documentation

→ **Design token source**: `.github/skills/style-dictionary/tokens.json`  
→ **Token guide**: `.github/skills/style-dictionary/references/TOKEN-GUIDE.md`  
→ **SCSS variables**: `_sass/base/design/_variables.scss`  
→ **Color definitions**: `_sass/base/design/_colors.scss`  
→ **SCSS instructions**: `.github/instructions/scss.instructions.md`  
→ **Ontology system**: `/docs/specifications/scss-ontology-system.md`  
→ **Fluid design units**: `/docs/specifications/fluid-design-unit-compatibility.md`

---

**Version**: 1.0  
**Last Updated**: 2026-03-26
