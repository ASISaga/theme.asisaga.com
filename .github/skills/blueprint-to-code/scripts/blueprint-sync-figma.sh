#!/usr/bin/env bash
# blueprint-sync-figma.sh — Figma Visual Sync: _data/design/ → _data/design/figma/
#
# Enriches every blueprint in _data/design/ with a "figmaStyles" block on each
# node, resolving the node's layout-variant to Figma API-compatible fill, stroke,
# effect, cornerRadius, opacity, and typography properties.
#
# The enriched blueprints are written to _data/design/figma/ and are the files
# imported into the Wireframe2Code Figma plugin. The authoritative _design/ source
# files remain untouched (incorruptibility principle).
#
# Usage:
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh --dry-run
#
# Requirements: node >= 18
#
# Companion: The Wireframe2Code plugin (code.ts) must be updated to read the
# "figmaStyles" field and apply it. See:
#   .github/skills/blueprint-to-code/references/wireframe2code-plugin-patch.md

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DATA_DIR="$REPO_ROOT/_data/design"
FIGMA_DIR="$REPO_ROOT/_data/design/figma"
STYLES_MAP="$REPO_ROOT/.github/skills/blueprint-to-code/references/figma-styles-map.json"
DRY_RUN=false

[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

echo "🎨  Blueprint Figma Visual Sync: _data/design/ → _data/design/figma/"
echo "    Source styles map : $STYLES_MAP"
echo "    Target            : $FIGMA_DIR"
[[ "$DRY_RUN" == "true" ]] && echo "    Mode              : DRY RUN (no files written)"
echo ""

if [[ ! -f "$STYLES_MAP" ]]; then
  echo "  ✗  Styles map not found: $STYLES_MAP"
  echo "     Run from the repository root or ensure the skill is installed."
  exit 1
fi

# Ensure target directories exist
mkdir -p "$FIGMA_DIR/includes" "$FIGMA_DIR/layouts"

# ── Node.js enricher ──────────────────────────────────────────────────────────
node - "$DATA_DIR" "$FIGMA_DIR" "$STYLES_MAP" "$DRY_RUN" <<'NODE_SCRIPT'
const fs   = require('fs');
const path = require('path');

const [,, dataDir, figmaDir, stylesMapPath, dryRun] = process.argv;
const isDry = dryRun === 'true';

// ── Load the styles map ───────────────────────────────────────────────────
const stylesMap = JSON.parse(fs.readFileSync(stylesMapPath, 'utf8'));

/**
 * Resolve a layout-variant string (e.g. "entity/primary") to a figmaStyles
 * object from the styles map. Returns null if the variant is unknown.
 */
function resolveStyles(layoutVariant) {
  if (!layoutVariant) return null;
  const parts    = layoutVariant.split('/');
  const category = parts[0];
  const variant  = parts[1];
  if (!category || !variant) return null;
  const catMap = stylesMap[category];
  if (!catMap || catMap.$comment) {
    // Category exists but has only a $comment (e.g. environment, cognition);
    // fall through to check the actual variant key
  }
  if (!catMap) return null;
  const styles = catMap[variant];
  if (!styles) return null;
  // Omit internal comments
  const { $comment, ...clean } = styles;
  return clean;
}

/**
 * Walk a blueprint node tree and inject figmaStyles on every node that
 * carries a layout-variant. Does NOT mutate the source — returns a new tree.
 */
function enrichNode(node) {
  if (!node || typeof node !== 'object') return node;

  const enriched = Object.assign({}, node);
  const variant  = node.pluginData?.['asi-saga']?.['layout-variant'];
  const styles   = resolveStyles(variant);

  if (styles) {
    enriched.figmaStyles = styles;
  }

  if (Array.isArray(node.children)) {
    enriched.children = node.children.map(child => enrichNode(child));
  }

  return enriched;
}

let synced  = 0;
let skipped = 0;
let unknown = [];

/** Enrich all blueprints in one subdirectory */
function processDirectory(subdir) {
  const srcDir = path.join(dataDir, subdir);
  const dstDir = path.join(figmaDir, subdir);

  if (!fs.existsSync(srcDir)) return;

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const dstPath = path.join(dstDir, file);

    let blueprint;
    try {
      blueprint = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    } catch (e) {
      console.error(`  ✗  Failed to parse ${subdir}/${file}: ${e.message}`);
      return;
    }

    // Collect any unresolved variants for the summary
    const variantsInFile = new Set();
    function collectVariants(n) {
      if (!n || typeof n !== 'object') return;
      const v = n.pluginData?.['asi-saga']?.['layout-variant'];
      if (v && !resolveStyles(v)) variantsInFile.add(v);
      if (Array.isArray(n.children)) n.children.forEach(collectVariants);
    }
    collectVariants(blueprint);
    variantsInFile.forEach(v => unknown.push(`${subdir}/${file}: ${v}`));

    const enriched = enrichNode(blueprint);
    const output   = JSON.stringify(enriched, null, 2);
    const existing = fs.existsSync(dstPath) ? fs.readFileSync(dstPath, 'utf8') : null;

    if (existing === output) {
      console.log(`  ↔  ${subdir}/${file} — unchanged`);
      skipped++;
    } else {
      if (!isDry) {
        fs.mkdirSync(dstDir, { recursive: true });
        fs.writeFileSync(dstPath, output, 'utf8');
      }
      console.log(`  ✓  ${subdir}/${file} — enriched${isDry ? ' (dry run)' : ''}`);
      synced++;
    }
  });
}

processDirectory('includes');
processDirectory('layouts');

console.log('');
console.log(`✅  Figma sync complete: ${synced} updated, ${skipped} unchanged`);

if (unknown.length > 0) {
  console.log('');
  console.log(`⚠   ${unknown.length} node(s) had unresolved layout-variants (no figmaStyles injected):`);
  unknown.forEach(u => console.log(`    → ${u}`));
  console.log('    Add entries to: .github/skills/blueprint-to-code/references/figma-styles-map.json');
}
NODE_SCRIPT
