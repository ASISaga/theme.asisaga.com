# Wireframe2Code — Genesis Design System Integration

This directory contains the updated plugin source file for the [Wireframe2Code Figma plugin](https://github.com/ASISaga/Wireframe2Code).

## What changed

`code.ts` in this directory is the complete, ready-to-use replacement for the plugin's `code.ts`. It adds full Genesis visual style support on top of the existing bidirectional blueprint sync.

### New capabilities

| Feature | Description |
|---------|-------------|
| `figmaStyles` import | Reads fills, strokes, effects, corner-radius, opacity, and typography from the `figmaStyles` block present in enriched `_design/` blueprints |
| `figmaStyles` export | Preserves the `figmaStyles` block on export so the round-trip `_design/ → Figma → _design/` is lossless |
| AutoLayout hints | Environment-variant `layoutHint` objects are applied to frame sizing modes |
| Typography | Cognition-variant `typography` objects set fontSize, fontWeight, lineHeight, letterSpacing, textColor, and fontFamily on TEXT nodes |

### New TypeScript additions

- **`NodeFigmaStyles` interface** — typed shape for the `figmaStyles` block
- **`applyFigmaStyles(node, styles)`** — helper that applies all visual style properties to a Figma scene node
- **`figmaStyles` field on `BlueprintNode`** — optional field carrying the Genesis visual styles
- **`applyBlueprintData`** — extended to call `applyFigmaStyles` and persist styles as plugin data
- **`exportBlueprintNode`** — extended to include `figmaStyles` from plugin data in the exported JSON

## How to apply

1. Open the [Wireframe2Code repository](https://github.com/ASISaga/Wireframe2Code)
2. Replace `code.ts` with the file from this directory
3. Compile TypeScript:
   ```bash
   npm run build
   # or: tsc
   ```
4. Reload the plugin in Figma (Plugins → Development → Wireframe2Code → Refresh)

## Blueprint workflow

### Importing into Figma

Blueprints come from `_design/layouts/` or `_design/includes/` in the theme repository. They contain `figmaStyles` computed by `blueprint-sync-figma.sh`:

```bash
# In the theme repository (theme.asisaga.com):
.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh
```

Then in Figma:
1. Open Wireframe2Code plugin
2. Paste the contents of `_design/layouts/<layout-name>.json`
3. Click **Import** — fills, borders, shadows, and typography are applied

### Exporting back from Figma

1. Select a root frame in Figma
2. Click **Export** in the plugin
3. Copy the downloaded JSON into `_design/layouts/<layout-name>.json`
4. Run forward sync to propagate to Jekyll:
   ```bash
   .github/skills/blueprint-to-code/scripts/blueprint-sync.sh
   ```

## Architecture

```
_design/layouts/*.json        ← Single source of truth (structure + figmaStyles)
    ↑ Wireframe2Code export         ↓ blueprint-sync.sh
Figma canvas              _data/design/layouts/*.json  →  Jekyll / node.html
    ↓ Wireframe2Code import         ↑ blueprint-sync-figma.sh
_design/layouts/*.json        ← enriched in-place with figmaStyles
```

## Related files in theme repository

| File | Purpose |
|------|---------|
| `.github/skills/blueprint-to-code/references/figma-styles-map.json` | Genesis variant → Figma style properties map |
| `.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh` | Enriches `_design/` blueprints with `figmaStyles` |
| `.github/skills/blueprint-to-code/SKILL.md` | Full skill documentation |
| `_design/schema/node.schema.json` | JSON schema including `figmaStyles` definition |
