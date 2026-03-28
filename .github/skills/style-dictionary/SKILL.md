---
name: style-dictionary
description: Bidirectional design token translation between Style Dictionary JSON and _variables.scss for the Genesis Semantic Design System. Converts tokens to SCSS variables and parses existing SCSS back into structured token JSON.
license: MIT
metadata:
  author: ASISaga
  version: "2.2"
  category: design-system
  role: token-translator
allowed-tools: Bash(node:*) Bash(npx:*) Read Edit
---

# Style Dictionary Skill

**Role**: Design Token Translation Specialist  
**Scope**: Bidirectional translation between `_design/tokens.json` (DTCG format) and `_variables.scss`  
**Version**: 2.2

## Purpose

Maintains a single source of truth for the Genesis Semantic Design System design tokens using the **[Style Dictionary v4](https://amzn.github.io/style-dictionary/) npm package**. Translates between two representations:

- **Tokens → SCSS**: Build structured `_design/tokens.json` (DTCG) → SCSS `$variable: value;` declarations via Style Dictionary  
- **SCSS → Tokens**: Parse existing `_sass/base/design/_variables.scss` → structured DTCG `_design/tokens.json`

The token source (`_design/tokens.json`) uses the **Design Token Community Group (DTCG) spec** (`$value`, `$type`, `$description`) with a **4-tier architecture**:
- **Tier 1 (Identity)**: Core scale (Golden Ratio 1.618) and grid (0.25rem) — the mathematical roots
- **Tier 2 (Primitives)**: Raw OKLCH colors, font families, fluid typography scales, computed spacing
- **Tier 3 (Sys/Semantic)**: Style Dictionary 4 aliases mapping primitives to intent (e.g., `sys.color.action.primary` → `{color.accent.neon-blue}`)
- **Tier 4 (Ontology)**: Mirrors the six SCSS engine variants — each variant's design choices expressed as aliases to Tier 2/3 primitives

## When to Use This Skill

- Synchronising `_sass/base/design/_variables.scss` after updating `_design/tokens.json`
- Extracting design tokens from SCSS into DTCG JSON for tooling, design tools, or documentation
- Onboarding a new subdomain by exporting the current token set as JSON
- Auditing design token drift between the JSON source and generated SCSS

## Core Responsibilities

1. **Forward translation** — `_design/tokens.json` → `_variables-generated.scss` via Style Dictionary v4 (`sd.config.mjs`)
2. **Reverse translation** — `_variables.scss` → `_design/tokens.json` via `scripts/scss-to-tokens.sh`
3. **Token governance** — flag duplicate variable names, missing values, or orphaned references
4. **OKLCH preservation** — pass through OKLCH color values without transformation (no hex coercion)
5. **Fluid typography** — `value/fluid-clamp` custom transform generates `clamp()` from `{min, max, minVP, maxVP}` objects using the UTOPIA linear-interpolation formula

## Workflows

### 1. Tokens → SCSS (Forward, via Style Dictionary)

Update `_design/tokens.json` with new or changed values, then generate the SCSS output:

```bash
# Generate _variables-generated.scss from _design/tokens.json (staged output for review)
.github/skills/style-dictionary/scripts/tokens-to-scss.sh

# Or generate directly using Style Dictionary
node .github/skills/style-dictionary/sd.config.mjs

# Or via npx CLI (also registers custom Genesis format via sd.config.mjs)
npx style-dictionary build --config .github/skills/style-dictionary/sd.config.mjs
```

The script writes `_sass/base/design/_variables-generated.scss`. Review the diff, then run with `--apply` to overwrite the production `_variables.scss`.

### 2. SCSS → Tokens (Reverse)

Parse existing `_sass/base/design/` SCSS variables back into DTCG `_design/tokens.json` format:

```bash
# Extract SCSS variables into tokens-extracted.json (staged output for review)
.github/skills/style-dictionary/scripts/scss-to-tokens.sh
```

The script writes `.github/skills/style-dictionary/tokens-extracted.json` in DTCG format. Review and rename to `_design/tokens.json`.

### 3. Full Sync Check

Verify the token source and generated SCSS are in sync:

```bash
# Generate and diff against production variables
.github/skills/style-dictionary/scripts/tokens-to-scss.sh --diff

# Or use npm scripts
npm run tokens:check
```

## Token Structure

Tokens in `_design/tokens.json` use the **DTCG spec** with Style Dictionary 4 nested categories:

| Tier | Category | SCSS prefix | Examples |
|------|----------|-------------|---------|
| 1 (Identity) | `identity.*` | `$identity-*` | `$identity-scale: 1.618`, `$identity-grid: 0.25rem` |
| 2 (Primitives) | `color.light.*` | `$color-light-*` | `$color-light-white`, `$color-light-surface` |
| 2 (Primitives) | `color.text.*` | `$color-text-*` | `$color-text-primary`, `$color-text-muted` |
| 2 (Primitives) | `color.accent.*` | `$color-accent-*` | `$color-accent-neon-blue`, `$color-accent-gold` |
| 2 (Primitives) | `font.family.*` | `$font-family-*` | `$font-family-consciousness`, `$font-family-wisdom`, `$font-family-mono` |
| 2 (Primitives) | `font.weight.*` | `$font-weight-*` | `$font-weight-bold`, `$font-weight-sacred` |
| 2 (Primitives) | `font.size.*` | `$font-size-*` | `$font-size-base`, `$font-size-sacred-lg (1.618rem = φ¹)` |
| 2 (Primitives) | `font.fluid.*` | `$font-fluid-*` | `$font-fluid-hero`, `$font-fluid-h1`, `$font-fluid-body` — **fluid-typography type** |
| 2 (Primitives) | `spacing.*` | `$spacing-*` | `$spacing-md (4× grid)`, `$spacing-genesis (32× grid)` |
| 3 (Sys/Semantic) | `sys.color.*` | `$sys-color-*` | `$sys-color-action-primary` → `{color.accent.neon-blue}` |
| 3 (Sys/Semantic) | `sys.spacing.*` | `$sys-spacing-*` | `$sys-spacing-md` → `{spacing.md}` |
| 3 (Sys/Semantic) | `sys.font.*` | `$sys-font-*` | `$sys-font-family-primary` → `{font.family.consciousness}` |
| 4 (Ontology) | `ontology.atmosphere.*` | `$ontology-atmosphere-*` | `$ontology-atmosphere-void-background` → `{color.dark.profound-black}` |
| 4 (Ontology) | `ontology.entity.*` | `$ontology-entity-*` | `$ontology-entity-primary-padding` → `{spacing.lg}` |
| 4 (Ontology) | `ontology.cognition.*` | `$ontology-cognition-*` | `$ontology-cognition-axiom-font-size` → clamp() via `{font.fluid.hero}` |
| 4 (Ontology) | `ontology.environment.*` | `$ontology-environment-*` | `$ontology-environment-focused-max-width: 70ch` |
| 4 (Ontology) | `ontology.synapse.*` | `$ontology-synapse-*` | `$ontology-synapse-execute-background` → `{sys.color.action.primary}` |
| 4 (Ontology) | `ontology.state.*` | `$ontology-state-*` | `$ontology-state-deprecated-opacity: 0.5` |

→ **Full token reference**: `.github/skills/style-dictionary/references/TOKEN-GUIDE.md`

## Custom Transforms

The `scss/genesis` transform group (registered in `sd.config.mjs`) includes two transforms:

| Transform | Applies to | Formula |
|-----------|-----------|---------|
| `name/kebab` | all tokens | `font.size.base` → `$font-size-base` |
| `value/fluid-clamp` | `$type: "fluid-typography"` | UTOPIA linear-interpolation: `slope = (max−min)/(maxVP−minVP)`, `intercept = min − slope×minVP` → `clamp(min, calc(slope·100vw ± intercept·rem), max)` |

**Fluid typography token format** — use `$type: "fluid-typography"` with structured `$value`:

```json
"hero": {
  "$type": "fluid-typography",
  "$value": { "min": "2rem", "max": "3.5rem", "minVP": "20rem", "maxVP": "90rem" },
  "$description": "Hero size — maps to --size-hero CSS custom property"
}
```

Output: `$font-fluid-hero: clamp(2rem, calc(2.1429vw + 1.5714rem), 3.5rem);`

**Aliases to fluid tokens** — alias tokens that reference `{font.fluid.*}` must also declare `$type: "fluid-typography"` so the transform matches:

```json
"axiom": {
  "font-size": { "$type": "fluid-typography", "$value": "{font.fluid.hero}", "$description": "..." }
}
```

## Tier 4 Ontology Tokens

Tier 4 (`ontology.*`) propagates the semantic intent of the SCSS engine variants into the token system. Each group mirrors one engine:

| Group | Maps to SCSS mixin | Semantic meaning |
|-------|-------------------|-----------------|
| `ontology.atmosphere.*` | `genesis-atmosphere($vibe)` | Background, text color, accent for each vibe |
| `ontology.entity.*` | `genesis-entity($nature)` | Surface, border, radius, padding per visual nature |
| `ontology.cognition.*` | `genesis-cognition($intent)` | Font-size (fluid), weight, family, line-height per intent |
| `ontology.environment.*` | `genesis-environment($logic)` | Gap, max-width per layout logic |
| `ontology.synapse.*` | `genesis-synapse($vector)` | Color, background, touch-target per interaction vector |
| `ontology.state.*` | `genesis-state($condition)` | Opacity, animation color, duration per lifecycle condition |

All Tier 4 tokens are **aliases to Tier 2/3 primitives**. They do not introduce new raw values (except for intentional non-tokenized values like `44px` touch targets and `70ch` reading width).

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
→ **Design token source**: `_design/tokens.json`  
→ **Token guide**: `.github/skills/style-dictionary/references/TOKEN-GUIDE.md`  
→ **SCSS variables**: `_sass/base/design/_variables.scss`  
→ **Color definitions**: `_sass/base/design/_colors.scss`  
→ **SCSS instructions**: `.github/instructions/scss.instructions.md`  
→ **Ontology system**: `/docs/specifications/scss-ontology-system.md`  
→ **Fluid design units**: `/docs/specifications/fluid-design-unit-compatibility.md`

---

**Version**: 2.2 — Added Tier 4 (Ontology) tokens propagating SCSS engine semantic intent; added `font.family.mono`; documented `value/fluid-clamp` transform and `font.fluid.*` tier  
**Last Updated**: 2026-03-28
