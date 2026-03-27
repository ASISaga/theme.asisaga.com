---
name: blueprint-to-code
description: Manage bidirectional synchronization between _design/ JSON blueprints and Jekyll _includes/_layouts code. _design/ is the single source of truth for both Jekyll and Figma. Forward-syncs blueprints to _data/design/ for Jekyll. Reverse-extracts structural changes from HTML back to blueprints. Keeps genesis-core.scss selectors in step with layout-variants. Enriches blueprints with figmaStyles for Wireframe2Code import.
license: MIT
metadata:
  author: ASISaga
  version: "4.0"
  category: design-system
  role: symmetry-engineer
allowed-tools: Bash(node:*) Bash(git:*) Read Edit
---

# Blueprint to Code Skill

**Role**: Engineer of Symmetry  
**Scope**: `_design/` ↔ `_data/design/` ↔ `_includes/` / `_layouts/` ↔ SCSS ↔ Figma (Wireframe2Code)  
**Version**: 4.0 — `_design/` as Single Source of Truth for Jekyll and Figma

## Purpose

Maintains the **Deterministic Symmetry** between the `_design/` JSON blueprints and both consumers:

- **Jekyll** (`_data/design/` → `_includes/node.html` renders HTML)
- **Figma** (Wireframe2Code plugin imports/exports `_design/` directly)

`_design/` is the **single authoritative layer** for both structural intent and Figma visual styles. There is no separate Figma-only layer.

## Architecture

```
                         ┌─────────────────────────────────┐
                         │  _design/layouts/*.json          │  ← Single Source of Truth
                         │  _design/includes/*.json         │    (structure + figmaStyles)
                         └───────────┬─────────────────────┘
                    ┌────────────────┤────────────────────────────────┐
                    │                │                                │
          blueprint-sync.sh   blueprint-sync-figma.sh    Wireframe2Code export
                    │           (enriches in-place)            (writes back here)
                    ▼                                               │
         _data/design/layouts/                               Figma canvas
         _data/design/includes/                     ↑ Wireframe2Code import
         (Jekyll data, figmaStyles                  │ (reads from _design/)
          carried along, ignored by node.html)      │
                    │                               │
         _includes/node.html                 blueprint-sync-figma.sh
         _layouts/*.html                     (run again to re-sync
         _sass/layouts/*.scss                 after Figma edits)
```

**Key principle**: `_design/` blueprints contain both structural fields (`pluginData`, `layoutMode`, `children`, etc.) and `figmaStyles` (Figma API visual properties). Jekyll's `node.html` ignores `figmaStyles`. The Wireframe2Code plugin reads and writes `figmaStyles`.

## When to Use This Skill

Activate when:
- A new blueprint is created in `_design/` and needs to reach Jekyll and/or Figma
- A `ref` field needs to be resolved in `_data/design/`
- A `_includes/` or `_layouts/` file has been manually refined and needs back-propagation
- A new `layout-variant` value is introduced (run SCSS sync + Figma sync)
- The Figma canvas shows blank frames — run `blueprint-sync-figma.sh` then re-import
- `figma-styles-map.json` is updated (re-run `blueprint-sync-figma.sh` to re-enrich `_design/`)

## Workflows

### 1. Forward Sync: _design/ → _data/design/

Run after editing any blueprint in `_design/` (structure or figmaStyles):

```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh
# Dry run:
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh --dry-run
```

### 2. Figma Visual Sync: enrich _design/ blueprints with figmaStyles

Run after editing `figma-styles-map.json` or adding new `layout-variant` values:

```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh
# Dry run:
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh --dry-run
```

Then run forward sync to propagate to `_data/design/`:
```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh
```

### 3. Import into Figma (Wireframe2Code)

1. Run `blueprint-sync-figma.sh` to ensure `_design/` blueprints have up-to-date `figmaStyles`
2. Open the Wireframe2Code plugin in Figma
3. Paste the contents of `_design/layouts/<layout-name>.json` into the import field
4. Click **Import** — structure and visual styles are both applied to the canvas

### 4. Export from Figma → _design/

After editing in Figma:
1. Select the root frame in Figma
2. Click **Export** in the Wireframe2Code plugin
3. Copy the exported JSON into `_design/layouts/<layout-name>.json`
4. Run forward sync to propagate changes to Jekyll:
   ```bash
   .github/skills/blueprint-to-code/scripts/blueprint-sync.sh
   ```
5. Review any structural changes and update `_includes/` or `_layouts/` if needed

### 5. Reverse Extraction: HTML → _design/

Run after manually refining an include or layout HTML file:

```bash
# Extract structural changes from a specific file
.github/skills/blueprint-to-code/scripts/blueprint-extract.sh _includes/header.html

# Extract from all includes and layouts
.github/skills/blueprint-to-code/scripts/blueprint-extract.sh --all-includes

# Dry run
.github/skills/blueprint-to-code/scripts/blueprint-extract.sh --all-includes --dry-run
```

After extraction, always run forward sync:
```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh
```

### 6. SCSS Sync: Blueprint layout-variants → _genesis-core.scss

Run after adding any new `layout-variant` value to a blueprint:

```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh
# Auto-fix missing variants:
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh --fix
```

### 7. Using Blueprints in Jekyll

The `_includes/node.html` renderer walks any blueprint from `site.data.design.*`:

```liquid
{% assign bp = site.data.design.layouts.landing %}
{% include node.html node=bp %}
```

`node.html` reads `pluginData`, `layoutMode`, `children`, and `content`. It ignores `figmaStyles`.

## Governance Boundaries

| Layer | This Skill Touches | This Skill Does NOT Touch |
|-------|--------------------|--------------------------|
| Structure | Element hierarchy, semantic tags, aria attributes | — |
| figmaStyles | `figmaStyles` injection via `figma-styles-map.json` | Figma Variables / Component Sets |
| SCSS selectors | `$genesis-*` list variables in `_genesis-core.scss` | Token values inside mixins |
| Motion | — | Animation parameters (→ motion-physics skill) |

## Execution Rules

1. **Single Source of Truth** — `_design/` is the only authoritative location; `_data/design/` is always derived from it
2. **figmaStyles in _design/** — `figmaStyles` live in `_design/` blueprints; they are NOT manually edited
3. **No Hardcoding** — `figmaStyles` are always regenerated from `figma-styles-map.json`
4. **Slugification** — `"Landing Hero CTA"` → `.node--landing-hero-cta`
5. **Ref Resolution** — All `ref` fields resolved before writing to `_data/design/`
6. **SCSS Coverage** — Every `layout-variant` in any blueprint must appear in the corresponding `$genesis-*` list

## Validation

```bash
# 1. Validate blueprint JSON schemas
.github/skills/blueprint-designer/scripts/validate-blueprint.sh

# 2. Enrich _design/ blueprints with figmaStyles
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh

# 3. Sync _design/ → _data/design/
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh

# 4. Verify all layout-variants have CSS selectors
.github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh

# 5. Confirm SCSS compiles cleanly
npm run test:scss
```

## References

→ **Figma styles map**: `.github/skills/blueprint-to-code/references/figma-styles-map.json`  
→ **Wireframe2Code plugin source**: `.github/skills/blueprint-to-code/references/wireframe2code/code.ts`  
→ **Wireframe2Code copy instructions**: `.github/skills/blueprint-to-code/references/wireframe2code/README.md`  
→ **Blueprint specification**: `.github/skills/blueprint-designer/references/BLUEPRINT-SPEC.md`  
→ **Node schema** (includes figmaStyles definition): `_design/schema/node.schema.json`  
→ **Recursive renderer**: `_includes/node.html`  
→ **Blueprint designer**: `.github/skills/blueprint-designer/SKILL.md`  
→ **Token DNA**: `.github/skills/style-dictionary/SKILL.md`  
→ **Motion physics**: `.github/skills/motion-physics/SKILL.md`  
→ **Genesis custom element selectors**: `_sass/components/core/_genesis-core.scss`  
→ **Wireframe2Code plugin**: https://github.com/ASISaga/Wireframe2Code

---

**Version**: 4.0 — _design/ as single source of truth; figmaStyles live in _design/; wireframe2code/ code files replace patch markdown  
**Last Updated**: 2026-03-27
