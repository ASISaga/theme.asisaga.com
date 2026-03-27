#!/usr/bin/env bash
# blueprint-sync-figma.sh — Figma Visual Sync: enrich _design/ blueprints with figmaStyles
#
# Reads every blueprint in _design/includes/ and _design/layouts/, resolves each
# node's layout-variant against figma-styles-map.json, injects a "figmaStyles"
# block, and writes the enriched JSON back to _design/ in-place.
#
# _design/ is the single source of truth for BOTH Jekyll and Figma. The Wireframe2Code
# Figma plugin imports blueprints directly from _design/. When the plugin exports a
# design back from Figma, the exported JSON (which contains figmaStyles) is placed into
# _design/ and blueprint-sync.sh is run to propagate forward to _data/design/ and
# _includes/_layouts/.
#
# Usage:
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh --dry-run
#
# Requirements: node >= 18
#
# After running, always propagate to _data/design/ via:
#   .github/skills/blueprint-to-code/scripts/blueprint-sync.sh

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DESIGN_DIR="$REPO_ROOT/_design"
STYLES_MAP="$REPO_ROOT/.github/skills/blueprint-to-code/references/figma-styles-map.json"
DRY_RUN=false

[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

echo "🎨  Blueprint Figma Visual Sync: enriching _design/ with figmaStyles"
echo "    Source styles map : $STYLES_MAP"
echo "    Target            : $DESIGN_DIR"
[[ "$DRY_RUN" == "true" ]] && echo "    Mode              : DRY RUN (no files written)"
echo ""

if [[ ! -f "$STYLES_MAP" ]]; then
  echo "  ✗  Styles map not found: $STYLES_MAP"
  echo "     Run from the repository root or ensure the skill is installed."
  exit 1
fi

# ── Node.js enricher ──────────────────────────────────────────────────────────
node - "$DESIGN_DIR" "$STYLES_MAP" "$DRY_RUN" <<'NODE_SCRIPT'
const fs   = require('fs');
const path = require('path');

const [,, designDir, stylesMapPath, dryRun] = process.argv;
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
  if (!catMap) return null;
  const styles = catMap[variant];
  if (!styles) return null;
  // Omit internal comments
  const { $comment, ...clean } = styles;
  return clean;
}

/**
 * Walk a blueprint node tree and inject/update figmaStyles on every node that
 * carries a layout-variant. Does NOT mutate the source — returns a new tree.
 */
function enrichNode(node) {
  if (!node || typeof node !== 'object') return node;

  const enriched = Object.assign({}, node);
  const variant  = node.pluginData?.['asi-saga']?.['layout-variant'];
  const styles   = resolveStyles(variant);

  if (styles) {
    enriched.figmaStyles = styles;
  } else if ('figmaStyles' in enriched) {
    // Remove stale figmaStyles if the variant was removed or became unknown
    delete enriched.figmaStyles;
  }

  if (Array.isArray(node.children)) {
    enriched.children = node.children.map(child => enrichNode(child));
  }

  return enriched;
}

let synced  = 0;
let skipped = 0;
let unknown = [];

/** Enrich all blueprints in one subdirectory (in-place in _design/) */
function processDirectory(subdir) {
  const dir = path.join(designDir, subdir);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    const filePath = path.join(dir, file);

    let blueprint;
    try {
      blueprint = JSON.parse(fs.readFileSync(filePath, 'utf8'));
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
    const existing = fs.readFileSync(filePath, 'utf8');

    if (existing === output) {
      console.log(`  ↔  ${subdir}/${file} — unchanged`);
      skipped++;
    } else {
      if (!isDry) {
        fs.writeFileSync(filePath, output, 'utf8');
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
