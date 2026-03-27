---
name: blueprint-to-code
description: Manage bidirectional synchronization between _design/ JSON blueprints and Jekyll _includes/_layouts code. Forward-syncs blueprints to _data/design/ for Jekyll. Reverse-extracts structural changes from HTML back to blueprints. Includes SCSS sync to keep genesis-core.scss selectors in step with blueprint layout-variants. Produces Figma-ready enriched blueprints in _data/design/figma/ for the Wireframe2Code plugin.
license: MIT
metadata:
  author: ASISaga
  version: "3.0"
  category: design-system
  role: symmetry-engineer
allowed-tools: Bash(node:*) Bash(git:*) Read Edit
---

# Blueprint to Code Skill

**Role**: Engineer of Symmetry  
**Scope**: `_design/` ↔ `_data/design/` ↔ `_includes/` / `_layouts/` ↔ SCSS ↔ Figma (Wireframe2Code)  
**Version**: 3.0 — Deterministic Symmetry Loop + SCSS Sync + Figma Visual Sync

## Purpose

Maintains the **Deterministic Symmetry** between the `_design/` JSON blueprints (Architect layer) and the Jekyll HTML implementation (Builder layer), and bridges to the Figma design canvas via the Wireframe2Code plugin. Manages four legs of the bidirectional sync loop:

- **Forward** (Blueprint → Code): Resolves `ref` fields and copies blueprints to `_data/design/` for Jekyll to consume via `_includes/node.html`
- **Reverse** (Code → Blueprint): Parses structural changes in `_includes/` or `_layouts/` and back-propagates them to `_design/` JSON
- **SCSS Sync** (Blueprint → SCSS): Ensures every `layout-variant` value used in any blueprint has a corresponding CSS attribute selector in `_sass/components/core/_genesis-core.scss`
- **Figma Visual Sync** (SCSS → Blueprint → Figma): Enriches `_data/design/figma/` blueprints with `figmaStyles` so the Wireframe2Code plugin can render fills, borders, shadows, and typography on the Figma canvas

## Why Figma Visual Sync Matters

The Wireframe2Code plugin (`code.ts`) creates Figma frames from blueprint JSON. Out of the box it only applies `layoutMode` and `itemSpacing` — the structural skeleton. Without `figmaStyles`, the Figma canvas shows blank white frames even though the node hierarchy is correct.

Each blueprint node carries a `layout-variant` (e.g. `entity/primary`, `cognition/axiom`) that points to a Genesis ontological variant. The SCSS ontology engines resolve those variants to concrete CSS properties. The `figma-styles-map.json` pre-computes those CSS properties in Figma API format (normalised RGB, effects objects, typography objects). The `blueprint-sync-figma.sh` script injects these as `figmaStyles` on every node in the Figma-ready copies.

**Architecture layers:**

| Layer | File | Purpose |
|-------|------|---------|
| Architect | `_design/layouts/*.json` | Authoritative structural blueprints — NO visual data |
| Builder | `_data/design/layouts/*.json` | Ref-resolved Jekyll data — NO visual data |
| Figma | `_data/design/figma/layouts/*.json` | Enriched with `figmaStyles` — FOR Wireframe2Code import |
| SCSS | `_sass/components/core/_genesis-core.scss` | `@each` lists kept in sync with blueprints |

## When to Use This Skill

Activate when:
- A new blueprint is created in `_design/` and needs to reach Jekyll and/or Figma
- A `ref` field needs to be resolved in `_data/design/`
- A `_includes/` or `_layouts/` file has been manually refined and needs back-propagation
- A new `layout-variant` value is introduced in any blueprint (run SCSS sync + Figma sync)
- The Figma canvas shows no visual content for a node (blank frames) — run Figma Visual Sync
- Verifying that `_design/` and `_data/design/` are in sync

## Synchronization Architecture

```
_design/includes/*.json      ←── Architect layer (source of truth, structural only)
_design/layouts/*.json       ←── Architect layer (source of truth, structural only)
         │
         │  blueprint-sync.sh (forward: resolve refs + copy)
         ▼
_data/design/includes/*.json ──► Jekyll reads via site.data.design.*
_data/design/layouts/*.json  ──► _includes/node.html renders recursively
         │
         │  blueprint-extract.sh (reverse: structural extraction)
         ▼
_includes/*.html             ──► Manual refinements back-propagated
_layouts/*.html              ──► Structural changes only (not visual)
         │
         │  blueprint-sync-scss.sh (SCSS sync: layout-variants → @each selectors)
         ▼
_sass/components/core/_genesis-core.scss  ──► CSS selectors kept in step
         │
         │  blueprint-sync-figma.sh (Figma visual sync: SCSS → figmaStyles → JSON)
         ▼
_data/design/figma/layouts/*.json  ──► Import into Wireframe2Code Figma plugin
_data/design/figma/includes/*.json ──► Import into Wireframe2Code Figma plugin
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

Run after adding any new `layout-variant` value to a blueprint:

```bash
# Check which blueprint variants are covered by SCSS selectors
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh

# Auto-fix: add missing variants to the @each lists in _genesis-core.scss
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh --fix
```

### 4. Figma Visual Sync: SCSS → figmaStyles → _data/design/figma/

Run after any blueprint or SCSS change to update the Figma-ready blueprints:

```bash
# Enrich all blueprints with figmaStyles and write to _data/design/figma/
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh

# Dry run (preview which files would change)
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh --dry-run
```

**Then import into Figma:**
1. Open the Wireframe2Code plugin in Figma
2. Copy the contents of `_data/design/figma/layouts/<layout-name>.json`
3. Paste into the plugin's import field and click **Import**
4. The frames will render with fills, borders, shadows, and typography from the Genesis design system

**The Wireframe2Code plugin must be updated** to read `figmaStyles` and apply it via the Figma API. See the companion patch:

```
.github/skills/blueprint-to-code/references/wireframe2code-plugin-patch.md
```

### 5. Using Blueprints in Jekyll

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
| SCSS selector coverage | `$genesis-*` list variables in `_genesis-core.scss` | Token values inside mixins |
| Figma visual data | `figmaStyles` injection via `figma-styles-map.json` | Figma Variables / Component Sets |
| Motion | — | Animation parameters (→ motion-physics skill) |

## Execution Rules

1. **No Hardcoding** — Generated code contains zero static visual values in the authoritative blueprints
2. **Slugification** — `"Landing Hero CTA"` (JSON) → `.node--landing-hero-cta` (HTML class)
3. **Ref Resolution** — All `ref` fields resolved before writing to `_data/design/`
4. **Structural Only (reverse)** — `motion-intent` and `layout-variant` values preserved during extraction
5. **SCSS Coverage** — Every `layout-variant` in any blueprint must appear in the corresponding `$genesis-*` list
6. **Figma Separation** — `_data/design/figma/` is the only layer that carries `figmaStyles`; authoritative `_design/` blueprints remain visual-data-free

## Validation

```bash
# 1. Validate blueprints before syncing
.github/skills/blueprint-designer/scripts/validate-blueprint.sh

# 2. Sync blueprints to _data/design/
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh

# 3. Verify all layout-variants have CSS selectors (run --fix if gaps are found)
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh

# 4. Enrich Figma-ready copies with visual styles
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh

# 5. Confirm SCSS compiles cleanly
npm run test:scss
```

## References

→ **Figma styles map**: `.github/skills/blueprint-to-code/references/figma-styles-map.json`  
→ **Wireframe2Code plugin patch**: `.github/skills/blueprint-to-code/references/wireframe2code-plugin-patch.md`  
→ **Blueprint specification**: `.github/skills/blueprint-designer/references/BLUEPRINT-SPEC.md`  
→ **Recursive renderer**: `_includes/node.html`  
→ **Node schema**: `_design/schema/node.schema.json`  
→ **Blueprint designer**: `.github/skills/blueprint-designer/SKILL.md`  
→ **Token DNA**: `.github/skills/style-dictionary/SKILL.md`  
→ **Motion physics**: `.github/skills/motion-physics/SKILL.md`  
→ **Genesis custom element selectors**: `_sass/components/core/_genesis-core.scss`  
→ **Wireframe2Code plugin**: https://github.com/ASISaga/Wireframe2Code

---

**Version**: 3.0 — Added Figma Visual Sync (blueprint-sync-figma.sh + figma-styles-map.json)  
**Last Updated**: 2026-03-27
