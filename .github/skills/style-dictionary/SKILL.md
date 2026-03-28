---
name: style-dictionary
description: Bidirectional design token translation between Style Dictionary JSON and _variables.scss for the Genesis Semantic Design System. Converts tokens to SCSS variables and parses existing SCSS back into structured token JSON.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: token-translator
allowed-tools: Bash(node:*) Bash(npx:*) Read Edit
---

# Style Dictionary Skill

**Role**: Design Token Translation Specialist  
**Scope**: Bidirectional translation between `tokens.json` (DTCG format) and `_variables.scss`  
**Version**: 2.0

## Purpose

Maintains a single source of truth for the Genesis Semantic Design System design tokens using the **[Style Dictionary v4](https://amzn.github.io/style-dictionary/) npm package**. Translates between two representations:

- **Tokens → SCSS**: Build structured `tokens.json` (DTCG) → SCSS `$variable: value;` declarations via Style Dictionary  
- **SCSS → Tokens**: Parse existing `_sass/base/design/_variables.scss` → structured DTCG `tokens.json`

The token source (`tokens.json`) uses the **Design Token Community Group (DTCG) spec** (`$value`, `$type`, `$description`) and covers OKLCH colors, typography, spacing, border-radius, shadows, and transitions.

## When to Use This Skill

- Synchronising `_sass/base/design/_variables.scss` after updating `tokens.json`
- Extracting design tokens from SCSS into DTCG JSON for tooling, design tools, or documentation
- Onboarding a new subdomain by exporting the current token set as JSON
- Auditing design token drift between the JSON source and generated SCSS

## Core Responsibilities

1. **Forward translation** — `tokens.json` → `_variables.scss` via Style Dictionary v4 (`sd.config.mjs`)
2. **Reverse translation** — `_variables.scss` → `tokens.json` via `scripts/scss-to-tokens.sh`
3. **Token governance** — flag duplicate variable names, missing values, or orphaned references
4. **OKLCH preservation** — pass through OKLCH color values without transformation (no hex coercion)

## Workflows

### 1. Tokens → SCSS (Forward, via Style Dictionary)

Update `tokens.json` with new or changed values, then generate the SCSS output:

```bash
# Generate _variables.scss from tokens.json (staged output for review)
.github/skills/style-dictionary/scripts/tokens-to-scss.sh

# Or generate directly using Style Dictionary
node .github/skills/style-dictionary/sd.config.mjs

# Or via npx CLI (also registers custom Genesis format via sd.config.mjs)
npx style-dictionary build --config .github/skills/style-dictionary/sd.config.mjs
```

The script writes `_sass/base/design/_variables-generated.scss`. Review the diff, then run with `--apply` to overwrite the production `_variables.scss`.

### 2. SCSS → Tokens (Reverse)

Parse existing `_sass/base/design/` SCSS variables back into DTCG `tokens.json` format:

```bash
# Extract SCSS variables into tokens-extracted.json (staged output for review)
.github/skills/style-dictionary/scripts/scss-to-tokens.sh
```

The script writes `.github/skills/style-dictionary/tokens-extracted.json` in DTCG format. Review and rename to `tokens.json`.

### 3. Full Sync Check

Verify the token source and generated SCSS are in sync:

```bash
# Generate and diff against production variables
.github/skills/style-dictionary/scripts/tokens-to-scss.sh --diff

# Or use npm scripts
npm run tokens:check
```

## Token Structure

Tokens in `tokens.json` use the **DTCG spec** with Style Dictionary nested categories:

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

The Genesis design system uses OKLCH color values (e.g. `oklch(0.65 0.25 230)`). Style Dictionary's default color transforms convert to hex and would corrupt these values. The Genesis configuration uses a custom `scss/genesis` transform group that applies **only `name/kebab`** — no color transforms — so OKLCH values pass through unchanged.

❌ **Do not use** `npx style-dictionary build` with the default `scss` transformGroup — it will corrupt OKLCH values.  
✅ **Always use** `node sd.config.mjs` or the provided shell scripts (which use `sd.config.mjs`).

## Validation

After generating SCSS, validate with the standard test suite:

```bash
npm run test:scss          # Confirms Sass compiles successfully
npm run validate:scss:units  # Checks for incompatible unit mixing
npm test                   # Full suite
```

## Related Documentation

→ **Style Dictionary v4 config**: `.github/skills/style-dictionary/sd.config.mjs`  
→ **Design token source**: `.github/skills/style-dictionary/tokens.json`  
→ **Token guide**: `.github/skills/style-dictionary/references/TOKEN-GUIDE.md`  
→ **SCSS variables**: `_sass/base/design/_variables.scss`  
→ **Color definitions**: `_sass/base/design/_colors.scss`  
→ **SCSS instructions**: `.github/instructions/scss.instructions.md`  
→ **Ontology system**: `/docs/specifications/scss-ontology-system.md`  
→ **Fluid design units**: `/docs/specifications/fluid-design-unit-compatibility.md`

---

**Version**: 2.0 — Replaced custom script with Style Dictionary v4; tokens migrated to DTCG format  
**Last Updated**: 2026-03-28
