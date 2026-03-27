---
name: blueprint-to-code
description: Manage bidirectional synchronization between _design/ JSON blueprints and Jekyll _includes/_layouts code. Forward-syncs blueprints to _data/design/ for Jekyll. Reverse-extracts structural changes from HTML back to blueprints. Includes SCSS sync to keep genesis-core.scss selectors in step with blueprint layout-variants.
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: symmetry-engineer
allowed-tools: Bash(node:*) Bash(git:*) Read Edit
---

# Blueprint to Code Skill

**Role**: Engineer of Symmetry  
**Scope**: `_design/` ↔ `_data/design/` ↔ `_includes/` / `_layouts/` ↔ `_sass/components/core/_genesis-core.scss`  
**Version**: 2.1 — Deterministic Symmetry Loop + SCSS Sync

## Purpose

Maintains the **Deterministic Symmetry** between the `_design/` JSON blueprints (Architect layer) and the Jekyll HTML implementation (Builder layer). Manages both directions of the bidirectional synchronization loop:

- **Forward** (Blueprint → Code): Resolves `ref` fields and copies blueprints to `_data/design/` for Jekyll to consume via `_includes/node.html`
- **Reverse** (Code → Blueprint): Parses structural changes in `_includes/` or `_layouts/` and back-propagates them to `_design/` JSON
- **SCSS Sync** (Blueprint → SCSS): Ensures every `layout-variant` value used in any blueprint has a corresponding CSS attribute selector in `_sass/components/core/_genesis-core.scss`

## Why SCSS Sync Matters

The `_includes/node.html` renderer converts each blueprint node's `layout-variant` (e.g. `entity/latent`) into a Genesis custom element attribute (`<genesis-entity nature="latent">`). The `_genesis-core.scss` file uses `@each` loops to generate the CSS rules:

```scss
@each $nature in $genesis-entity-natures {
  genesis-entity[nature="#{$nature}"] {
    @include genesis-entity($nature);
  }
}
```

**If a variant is not listed in the `$genesis-*` SCSS variable, the rendered element has zero visual styles.** This is why the Figma plugin (and any browser rendering the node.html output) shows the node hierarchy in the left panel but displays no visual content on the canvas — the CSS selectors are missing.

## When to Use This Skill

Activate when:
- A new blueprint is created in `_design/` and needs to reach Jekyll
- A `ref` field needs to be resolved in `_data/design/`
- A `_includes/` or `_layouts/` file has been manually refined and needs back-propagation
- Verifying that `_design/` and `_data/design/` are in sync
- A new `layout-variant` value is introduced in any blueprint (run SCSS sync to add the selector)
- Visual content is absent on the Figma canvas or browser despite the node hierarchy being correct

## Synchronization Architecture

```
_design/includes/*.json     ←── Architect layer (source of truth)
_design/layouts/*.json      ←── Architect layer (source of truth)
         │
         │  blueprint-sync.sh (forward: resolve refs + copy)
         ▼
_data/design/includes/*.json  ──► Jekyll reads via site.data.design.*
_data/design/layouts/*.json   ──► _includes/node.html renders recursively
         │
         │  blueprint-extract.sh (reverse: structural extraction)
         ▼
_includes/*.html              ──► Manual refinements back-propagated
_layouts/*.html               ──► Structural changes only (not visual)
         │
         │  blueprint-sync-scss.sh (SCSS sync: layout-variants → selectors)
         ▼
_sass/components/core/_genesis-core.scss  ──► @each lists kept in step with blueprints
```

## Workflows

### 1. Forward Sync: _design/ → _data/design/

Run after editing any blueprint in `_design/`:

```bash
# Full sync (resolves all refs, copies all blueprints)
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh

# Dry run (preview changes without writing)
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh --dry-run
```

### 2. Reverse Extraction: _includes/ → _design/

Run after manually refining an include or layout file:

```bash
# Extract structural changes from a specific file
.github/skills/blueprint-to-code/scripts/blueprint-extract.sh _includes/header.html

# Extract from all includes and layouts (only those with an existing blueprint)
.github/skills/blueprint-to-code/scripts/blueprint-extract.sh --all-includes

# Dry run
.github/skills/blueprint-to-code/scripts/blueprint-extract.sh --all-includes --dry-run
```

After extraction, always run forward sync to propagate to `_data/design/`:

```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh
```

### 3. SCSS Sync: Blueprint layout-variants → _genesis-core.scss

Run after adding any new `layout-variant` value to a blueprint — or any time the visual canvas shows no content for a node that has a correct hierarchy:

```bash
# Check which blueprint variants are covered by SCSS selectors
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh

# Auto-fix: add missing variants to the @each lists in _genesis-core.scss
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh --fix

# Dry run (preview what --fix would change)
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh --dry-run
```

After running `--fix`, verify the SCSS compiles:

```bash
npm run test:scss
```

### 4. Using Blueprints in Jekyll

The `_includes/node.html` renderer walks any blueprint from `site.data.design.*`:

```liquid
{% comment %} Render a layout blueprint {% endcomment %}
{% assign bp = site.data.design.layouts.landing %}
{% include node.html node=bp %}

{% comment %} Render a component blueprint {% endcomment %}
{% assign card_bp = site.data.design.includes.card %}
{% include node.html node=card_bp %}
```

## Governance Boundaries

| Layer | This Skill Touches | This Skill Does NOT Touch |
|-------|--------------------|--------------------------|
| Structure | Element hierarchy, semantic tags, aria attributes | — |
| Visual — SCSS selector coverage | `$genesis-*` list variables in `_genesis-core.scss` | Token values (→ style-dictionary skill) |
| Visual — token values | — | Actual CSS property values inside mixins |
| Motion | — | Animation parameters (→ motion-physics skill) |

The Difference Engine in `blueprint-extract.sh` enforces this: only structural changes (element reordering, renaming, ARIA updates) are back-propagated. Color or spacing value changes are flagged and delegated.

## Execution Rules

1. **No Hardcoding** — Generated code contains zero static visual values
2. **Slugification** — `"Landing Hero CTA"` (JSON) → `.node--landing-hero-cta` (HTML class)
3. **Ref Resolution** — All `ref` fields resolved before writing to `_data/design/`
4. **Structural Only (reverse)** — `motion-intent` and `layout-variant` values preserved during extraction
5. **SCSS Coverage** — Every `layout-variant` used in any blueprint must appear in the corresponding `$genesis-*` SCSS list; run `blueprint-sync-scss.sh` whenever a new variant is introduced

## Validation

```bash
# 1. Validate blueprints before syncing
.github/skills/blueprint-designer/scripts/validate-blueprint.sh

# 2. Sync blueprints to _data/design/
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh

# 3. Verify all layout-variants have CSS selectors (run --fix if gaps are found)
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh

# 4. Confirm the SCSS still compiles cleanly
npm run test:scss
```

## Related Documentation

→ **Blueprint specification**: `.github/skills/blueprint-designer/references/BLUEPRINT-SPEC.md`  
→ **Recursive renderer**: `_includes/node.html`  
→ **Node schema**: `_design/schema/node.schema.json`  
→ **Blueprint designer**: `.github/skills/blueprint-designer/SKILL.md`  
→ **Token DNA**: `.github/skills/style-dictionary/SKILL.md`  
→ **Motion physics**: `.github/skills/motion-physics/SKILL.md`  
→ **Genesis custom element selectors**: `_sass/components/core/_genesis-core.scss`

---

**Version**: 2.1 — Added SCSS Sync workflow (blueprint-sync-scss.sh)  
**Last Updated**: 2026-03-27
