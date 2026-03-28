# Blueprint Specification

**Version**: 1.0.0  
**Status**: Active  
**Last Updated**: 2026-03-26

## Overview

An ASISaga Genesis blueprint is a **software-agnostic, structural skeleton** of a UI component or page layout. It declares structural intent only — it is deliberately blind to visual token values and animation execution parameters.

The blueprint system forms the **Architect layer** of the three-tier design-to-code bridge:

```
_design/ (Architect)       — structural intent, JSON blueprints
    ↓ blueprint-sync.sh
_data/design/ (Builder)    — Jekyll-readable, ref-resolved copies
    ↓ node.html
HTML output (Manifested)   — semantic + ontological HTML
    ↓ SCSS mixins + Motion.dev
Visual output              — Token DNA + Motion Physics applied
```

## File Locations

| Location | Purpose |
|----------|---------|
| `_design/schema/node.schema.json` | JSON Schema for a single blueprint node |
| `_design/schema/blueprint.schema.json` | JSON Schema for a blueprint file |
| `_design/includes/*.json` | Reusable component blueprints |
| `_design/layouts/*.json` | Page-level layout blueprints |
| `_data/design/includes/*.json` | Ref-resolved Jekyll data (auto-generated) |
| `_data/design/layouts/*.json` | Ref-resolved Jekyll data (auto-generated) |

## Blueprint Node Schema

Every node in a blueprint tree must carry:

```json
{
  "id": "kebab-case-id",
  "name": "Human Readable Name",
  "type": "COMPONENT",
  "pluginData": {
    "asi-saga": {
      "semantic-tag": "section",
      "motion-intent": "entry/fade-in",
      "layout-variant": "entity/primary"
    }
  }
}
```

### The Ontological Handshake

The three `pluginData.asi-saga` fields form the **Ontological Handshake** — the bridge between the Architect layer and the downstream layers:

| Field | Purpose | Examples |
|-------|---------|---------|
| `semantic-tag` | HTML5 semantic element | `header`, `section`, `article`, `nav`, `main` |
| `motion-intent` | Physics behaviour path | `entry/fade-in`, `hover/glow`, `scroll/reveal` |
| `layout-variant` | Genesis ontological variant | `entity/primary`, `atmosphere/vibrant`, `synapse/execute` |

### `semantic-tag` — Valid Values

All standard HTML5 sectioning, flow, and phrasing elements:

`html`, `body`, `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `div`, `span`, `h1`–`h6`, `p`, `a`, `button`, `form`, `fieldset`, `legend`, `label`, `input`, `textarea`, `select`, `ul`, `ol`, `li`, `img`, `figure`, `figcaption`, `time`, `address`, `blockquote`, `cite`

### `motion-intent` — Valid Phases

Format: `<phase>/<behaviour>`

| Phase | Purpose |
|-------|---------|
| `entry` | Element enters the viewport |
| `exit` | Element leaves the viewport |
| `hover` | Mouse/pointer interaction |
| `scroll` | Scroll-driven behaviour |
| `gesture` | Touch/pointer gesture |
| `idle` | Ambient, looping behaviour |

Examples: `entry/fade-in`, `entry/slide-up`, `hover/scale`, `hover/glow`, `scroll/reveal`, `gesture/swipe`, `idle/pulse`

### `layout-variant` — The 89 Genesis Variants

Format: `<category>/<variant>`

| Category | Attribute | Examples |
|----------|-----------|---------|
| `environment` | `logic` | `distributed`, `focused`, `associative`, `chronological`, `manifest` |
| `entity` | `nature` | `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral`, `transcendent` |
| `cognition` | `intent` | `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum` |
| `synapse` | `vector` | `navigate`, `execute`, `inquiry`, `destructive`, `social` |
| `state` | `condition` | `stable`, `evolving`, `deprecated`, `locked`, `simulated` |
| `atmosphere` | `vibe` | `neutral`, `ethereal`, `void`, `vibrant`, `sacred` |

→ Full 89-variant catalog: `docs/specifications/scss-ontology-system.md`

## Optional Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `layoutMode` | `VERTICAL \| HORIZONTAL \| GRID \| NONE` | Spatial flow for children |
| `itemSpacing` | `spacing-*` token key | Gap between children |
| `content` | string | Static text or Liquid expression |
| `attributes` | object | Additional HTML attributes |
| `ref` | string | Pointer to another blueprint (resolved during sync) |
| `children` | array | Child nodes (max depth: 5) |

## Nesting Rules

- **Maximum depth: 5 levels** — enforced by `validate-blueprint.sh`
- A `FRAME` may have any children
- A `TEXT` node should have no children
- An `INSTANCE` places a reusable `COMPONENT` — use `ref` or inline children

## Incorruptibility Rules

The blueprint layer **must remain blind** to:

1. **Token values** — No hex colors (`#fff`), no pixel values (`16px`), no raw OKLCH literals
2. **Motion parameters** — No durations (`0.3s`), no easing functions (`cubic-bezier(...)`)
3. **Framework-specific code** — No CSS class names that carry visual meaning

✅ **Allowed** in blueprints:
- Token key references: `spacing-md`, `font-size-lg`
- Structural HTML attributes: `aria-label`, `href`, `id`, `tabindex`
- Liquid expressions: `{{ page.title }}`, `{{ item.url }}`
- Data-* attributes that carry intent (not values)

❌ **Forbidden** in blueprints:
- `"#1a1a2e"`, `"oklch(0.65 0.25 230)"`, `"rgba(0,0,0,0.5)"`
- `"margin: 16px"`, `"font-size: 1.5rem"`
- `"background-color: var(--color-accent)"` (use layout-variant instead)

## `ref` Resolution

A `ref` field inlines another blueprint at that position during the `blueprint-sync.sh` forward sync. The `_data/design/` copies always have refs resolved.

```json
{
  "id": "site-header",
  "ref": "includes/header"
}
```

After resolution:
```json
{
  "id": "site-header",
  "name": "Site Header",
  "type": "COMPONENT",
  "pluginData": { "asi-saga": { ... } },
  "children": [ ... ]
}
```

## Naming Convention

Node `name` values use **Title Case** human-readable labels. The `node.html` renderer slugifies them for CSS:

| Blueprint `name` | Generated CSS class |
|-----------------|-------------------|
| `"Site Header"` | `.node--site-header` |
| `"Landing Hero CTA"` | `.node--landing-hero-cta` |
| `"KPI Value"` | `.node--kpi-value` |

## Custom Element Mapping (node.html)

The `layout-variant` category determines which Genesis custom element wraps the semantic element:

| Category | Custom Element | Attribute |
|----------|---------------|-----------|
| `atmosphere` | `<genesis-atmosphere>` | `vibe` |
| `entity` | `<genesis-entity>` | `nature` |
| `environment` | `<genesis-environment>` | `logic` |
| `synapse` | `<genesis-synapse>` | `vector` |
| `state` | `<genesis-state>` | `condition` |
| `cognition` | `<genesis-cognition>` | `intent` |

Example: `"layout-variant": "entity/primary"` → `<genesis-entity nature="primary"><section ...>`

## Validation

Run before committing any blueprint change:

```bash
.github/skills/blueprint-designer/scripts/validate-blueprint.sh
```

Validates: JSON syntax, required fields, semantic-tag enum, layout-variant format, motion-intent format, max depth, no hardcoded visual values.

## Bidirectional Sync

```
_design/ blueprints  ──(blueprint-sync.sh)──►  _data/design/  ──►  Jekyll / node.html
         ▲                                                                    │
         │                                                                    │
         └──────────────(blueprint-extract.sh)◄──────── _includes/ / _layouts/
```

| Script | Direction | Trigger |
|--------|-----------|---------|
| `blueprint-sync.sh` | `_design/` → `_data/design/` | After editing a blueprint |
| `blueprint-extract.sh` | `_includes/` → `_design/` | After refining a layout or include |

→ Full workflow: `.github/skills/blueprint-to-code/SKILL.md`

## Related Documentation

→ **Node schema**: `_design/schema/node.schema.json`  
→ **Blueprint schema**: `_design/schema/blueprint.schema.json`  
→ **Recursive renderer**: `_includes/node.html`  
→ **Ontology system**: `docs/specifications/scss-ontology-system.md`  
→ **Token DNA**: `_design/tokens.json`  
→ **Motion physics**: `.github/skills/motion-physics/SKILL.md`  
→ **HTML hierarchy rules**: `docs/specifications/ontology-html-mapping.md`
