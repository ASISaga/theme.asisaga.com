---
name: blueprint-to-code
description: Manage bidirectional synchronization between _design/ JSON blueprints and Jekyll _includes/_layouts code. Forward-syncs blueprints to _data/design/ for Jekyll. Reverse-extracts structural changes from HTML back to blueprints.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: symmetry-engineer
allowed-tools: Bash(node:*) Bash(git:*) Read Edit
---

# Blueprint to Code Skill

**Role**: Engineer of Symmetry  
**Scope**: `_design/` ↔ `_data/design/` ↔ `_includes/` / `_layouts/`  
**Version**: 2.0 — Deterministic Symmetry Loop

## Purpose

Maintains the **Deterministic Symmetry** between the `_design/` JSON blueprints (Architect layer) and the Jekyll HTML implementation (Builder layer). Manages both directions of the bidirectional synchronization loop:

- **Forward** (Blueprint → Code): Resolves `ref` fields and copies blueprints to `_data/design/` for Jekyll to consume via `_includes/node.html`
- **Reverse** (Code → Blueprint): Parses structural changes in `_includes/` or `_layouts/` and back-propagates them to `_design/` JSON

## When to Use This Skill

Activate when:
- A new blueprint is created in `_design/` and needs to reach Jekyll
- A `ref` field needs to be resolved in `_data/design/`
- A `_includes/` or `_layouts/` file has been manually refined and needs back-propagation
- Verifying that `_design/` and `_data/design/` are in sync

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

### 3. Using Blueprints in Jekyll

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
| Visual | — | Token values (→ style-dictionary skill) |
| Motion | — | Animation parameters (→ motion-physics skill) |

The Difference Engine in `blueprint-extract.sh` enforces this: only structural changes (element reordering, renaming, ARIA updates) are back-propagated. Color or spacing value changes are flagged and delegated.

## Execution Rules

1. **No Hardcoding** — Generated code contains zero static visual values
2. **Slugification** — `"Landing Hero CTA"` (JSON) → `.node--landing-hero-cta` (HTML class)
3. **Ref Resolution** — All `ref` fields resolved before writing to `_data/design/`
4. **Structural Only (reverse)** — `motion-intent` and `layout-variant` values preserved during extraction

## Validation

```bash
# Validate blueprints before syncing
.github/skills/blueprint-designer/scripts/validate-blueprint.sh

# Then sync
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh
```

## Related Documentation

→ **Blueprint specification**: `.github/skills/blueprint-designer/references/BLUEPRINT-SPEC.md`  
→ **Recursive renderer**: `_includes/node.html`  
→ **Node schema**: `_design/schema/node.schema.json`  
→ **Blueprint designer**: `.github/skills/blueprint-designer/SKILL.md`  
→ **Token DNA**: `.github/skills/style-dictionary/SKILL.md`  
→ **Motion physics**: `.github/skills/motion-physics/SKILL.md`

---

**Version**: 2.0 — Deterministic Symmetry Loop with Forward/Reverse Sync  
**Last Updated**: 2026-03-26
