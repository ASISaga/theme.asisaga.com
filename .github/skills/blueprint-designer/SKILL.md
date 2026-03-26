# Skill: Blueprint Designer
# ID: asisaga/blueprint-designer
# Version: 1.0.0

## 1. Purpose
The Architect of Intent. This skill governs the creation and structural validation of the JSON blueprints located in `_design/`.

## 2. Authoring Protocols
- **Atomic Creation:** Generate `_design/includes/*.json` for reusable components.
- **Skeletal Layouts:** Generate `_design/layouts/*.json` for page-level structures.
- **Naming Convention:** Use human-readable, semantic names (e.g., "Boardroom Header") that are later slugified for CSS.

## 3. Metadata Enrichment (The Handshake)
Every node created must include `pluginData.asi-saga` metadata:
- **`semantic-tag`:** Assign valid HTML5 (article, section, aside, nav).
- **`motion-intent`:** Assign a path to a physics token (e.g., `entry/fade-in`).
- **`layout-variant`:** Reference one of the 89 SCSS variants defined in the Surface layer.

## 4. Constraint Validation
- **Token Alignment:** Reject any layout spacing or typography not defined in `tokens.json`.
- **Nesting Rules:** Enforce a maximum depth of 5 levels to maintain mobile-first performance.
- **Incorruptibility:** If a designer attempts to hardcode a hex color or pixel value in the JSON, the skill must halt and suggest a Token reference instead.
