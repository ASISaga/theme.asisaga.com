---
name: blueprint-designer
description: Author and validate JSON blueprints in _design/ that represent the skeletal structural intent of UI components and page layouts, entirely decoupled from visual styling or framework-specific code.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: structural-architect
allowed-tools: Bash(node:*) Read Edit
---

# Blueprint Designer Skill

**Role**: Structural Architect  
**Scope**: `_design/includes/`, `_design/layouts/`, `_design/schema/`  
**Version**: 2.0 — Ontological Handshake + Bidirectional Sync

## Purpose

The Architect of Intent. Authors and validates software-agnostic JSON blueprints that represent the **skeletal structural intent** of UI components and page layouts. Blueprints are entirely decoupled from visual constants (Token DNA) and animation execution (Motion Physics). They act as the single source of truth that coordinates the application of those layers downstream.

## When to Use This Skill

Activate when:
- Creating a new UI component or page layout from scratch
- Adding a new component to `_design/includes/`
- Adding a new layout to `_design/layouts/`
- Validating existing blueprints for schema compliance
- Auditing blueprints for hardcoded visual values (incorruptibility check)

## Core Responsibilities

1. **Atomic Creation** — Generate `_design/includes/*.json` for reusable components
2. **Skeletal Layouts** — Generate `_design/layouts/*.json` for page-level structures
3. **Ontological Handshake** — Ensure every node carries `semantic-tag`, `motion-intent`, and `layout-variant`
4. **Incorruptibility** — Reject any hardcoded hex, px, or OKLCH literal in a blueprint node
5. **Depth Governance** — Enforce maximum nesting depth of 5 levels

## Authoring Protocol

### 1. Create a Component Blueprint

```json
{
  "$schema": "../schema/blueprint.schema.json",
  "id": "my-component",
  "name": "My Component",
  "version": "1.0.0",
  "description": "One-sentence structural purpose.",
  "type": "COMPONENT",
  "pluginData": {
    "asi-saga": {
      "semantic-tag": "section",
      "motion-intent": "entry/fade-in",
      "layout-variant": "entity/primary"
    }
  },
  "layoutMode": "VERTICAL",
  "itemSpacing": "spacing-md",
  "children": []
}
```

Save to: `_design/includes/my-component.json`

### 2. The Ontological Handshake (MANDATORY on every node)

| Field | Format | Example |
|-------|--------|---------|
| `semantic-tag` | HTML5 element name | `section`, `nav`, `article`, `h1` |
| `motion-intent` | `phase/behaviour` | `entry/fade-in`, `hover/glow`, `scroll/reveal` |
| `layout-variant` | `category/variant` | `entity/primary`, `atmosphere/vibrant`, `synapse/execute` |

→ All 89 variants: `docs/specifications/scss-ontology-system.md`

### 3. Naming Convention

- `name`: Human-readable Title Case → slugified to CSS class (`.node--my-component`)
- `id`: kebab-case, unique within the blueprint file
- File name: matches `id` (e.g., `my-component.json`)

### 4. Incorruptibility Rules

**FORBIDDEN** in any blueprint field:
- Hex colors: `#1a1a2e`, `#fff`
- Raw pixel values: `16px`, `1.5rem`
- OKLCH literals: `oklch(0.65 0.25 230)`
- Animation parameters: `0.3s ease-in-out`

**ALLOWED**:
- Token key references: `spacing-md`, `font-size-xl`
- Liquid expressions: `{{ page.title }}`, `{{ item.url }}`
- Structural HTML attributes: `aria-label`, `href`, `id`, `tabindex`

## Validation

```bash
# Validate all blueprints
.github/skills/blueprint-designer/scripts/validate-blueprint.sh

# Validate a single blueprint
.github/skills/blueprint-designer/scripts/validate-blueprint.sh _design/includes/hero.json
```

Checks: JSON syntax, required fields, semantic-tag enum, layout-variant format, motion-intent format, max depth 5, no hardcoded values.

## After Creating a Blueprint

Run the forward sync to make it available to Jekyll:

```bash
.github/skills/blueprint-to-code/scripts/blueprint-sync.sh
```

## Related Documentation

→ **Blueprint spec**: `.github/skills/blueprint-designer/references/BLUEPRINT-SPEC.md`  
→ **Node schema**: `_design/schema/node.schema.json`  
→ **Bidirectional sync**: `.github/skills/blueprint-to-code/SKILL.md`  
→ **Ontology variants**: `docs/specifications/scss-ontology-system.md`  
→ **Token DNA**: `.github/skills/style-dictionary/SKILL.md`  
→ **Motion physics**: `.github/skills/motion-physics/SKILL.md`

---

**Version**: 2.0 — Full Ontological Handshake + Incorruptibility Governance  
**Last Updated**: 2026-03-26
