#!/usr/bin/env bash
# blueprint-sync.sh — Forward Sync: _design/ → _data/design/
#
# Reads JSON blueprints from _design/includes/ and _design/layouts/,
# resolves any "ref" fields by inlining the referenced blueprint,
# and writes fully-resolved copies to _data/design/ for Jekyll consumption.
#
# This is the forward leg of the Deterministic Symmetry loop.
# Run after editing any file in _design/.
#
# Usage:
#   .github/skills/blueprint-to-code/scripts/blueprint-sync.sh
#   .github/skills/blueprint-to-code/scripts/blueprint-sync.sh --dry-run
#
# Requirements: node >= 18

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DESIGN_DIR="$REPO_ROOT/_design"
DATA_DIR="$REPO_ROOT/_data/design"
DRY_RUN=false

[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

echo "🔄  Blueprint Forward Sync: _design/ → _data/design/"
echo "    Source  : $DESIGN_DIR"
echo "    Target  : $DATA_DIR"
[[ "$DRY_RUN" == "true" ]] && echo "    Mode    : DRY RUN (no files written)"
echo ""

# Ensure target directories exist
mkdir -p "$DATA_DIR/includes" "$DATA_DIR/layouts"

# ── Node.js resolver ──────────────────────────────────────────────────────────
node - "$DESIGN_DIR" "$DATA_DIR" "$DRY_RUN" <<'NODE_SCRIPT'
const fs   = require('fs');
const path = require('path');

const [,, designDir, dataDir, dryRun] = process.argv;
const isDry = dryRun === 'true';

/** Load a JSON file and return its parsed contents */
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`  ✗  Failed to parse: ${filePath}\n     ${e.message}`);
    process.exit(1);
  }
}

/** Recursively resolve all "ref" fields in a blueprint node */
function resolveRefs(node, designDir) {
  if (!node || typeof node !== 'object') return node;

  // If this node has a ref, inline the referenced blueprint
  if (node.ref) {
    const refPath = path.join(designDir, `${node.ref}.json`);
    if (!fs.existsSync(refPath)) {
      console.error(`  ✗  Unresolved ref: "${node.ref}" (file not found: ${refPath})`);
      process.exit(1);
    }
    const refBlueprint = loadJSON(refPath);
    // Resolve the referenced blueprint recursively, then inline its structure.
    // Only pull structural fields from the ref: type, pluginData, layoutMode,
    // itemSpacing, content, attributes, children.
    // The referencing node's id and name always take precedence.
    const resolvedRef = resolveRefs(refBlueprint, designDir);
    const merged = {
      id:          node.id,
      name:        node.name,
      version:     node.version     || resolvedRef.version,
      description: node.description || resolvedRef.description,
      type:        node.type        || resolvedRef.type,
      pluginData:  node.pluginData  || resolvedRef.pluginData,
      layoutMode:  node.layoutMode  || resolvedRef.layoutMode,
      itemSpacing: node.itemSpacing || resolvedRef.itemSpacing,
      content:     node.content     !== undefined ? node.content : resolvedRef.content,
      attributes:  Object.assign({}, resolvedRef.attributes, node.attributes),
      children:    node.children    || resolvedRef.children
    };
    // Remove undefined fields for a clean output
    Object.keys(merged).forEach(k => merged[k] === undefined && delete merged[k]);
    return merged;
  }

  // Recurse into children
  if (Array.isArray(node.children)) {
    node = Object.assign({}, node, {
      children: node.children.map(child => resolveRefs(child, designDir))
    });
  }

  return node;
}

let synced = 0;
let skipped = 0;

/** Process all blueprints in a subdirectory */
function processDirectory(subdir) {
  const srcDir = path.join(designDir, subdir);
  const dstDir = path.join(dataDir, subdir);

  if (!fs.existsSync(srcDir)) return;

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const dstPath = path.join(dstDir, file);

    const blueprint = loadJSON(srcPath);
    const resolved  = resolveRefs(blueprint, designDir);

    // Add a comment indicating this file is auto-generated
    const output = JSON.stringify(resolved, null, 2);
    const existing = fs.existsSync(dstPath) ? fs.readFileSync(dstPath, 'utf8') : null;

    if (existing === output) {
      console.log(`  ↔  ${subdir}/${file} — unchanged`);
      skipped++;
    } else {
      if (!isDry) {
        fs.mkdirSync(dstDir, { recursive: true });
        fs.writeFileSync(dstPath, output, 'utf8');
      }
      console.log(`  ✓  ${subdir}/${file} — synced${isDry ? ' (dry run)' : ''}`);
      synced++;
    }
  });
}

processDirectory('includes');
processDirectory('layouts');

console.log('');
console.log(`✅  Sync complete: ${synced} updated, ${skipped} unchanged`);
NODE_SCRIPT
