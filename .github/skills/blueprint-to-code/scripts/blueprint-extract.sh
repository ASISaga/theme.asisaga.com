#!/usr/bin/env bash
# blueprint-extract.sh — Reverse Extraction: _includes/ / _layouts/ → _design/
#
# Parses Liquid/HTML files and back-propagates STRUCTURAL changes
# (element hierarchy, class names, aria attributes) to the _design/ JSON.
#
# Governance rule: Only structural changes are synced.
# Visual token changes (colors, spacing values) are delegated to style-dictionary.
# Motion parameter changes are delegated to motion-physics.
#
# This is the reverse leg of the Deterministic Symmetry loop.
# Run after manually refining any _includes/ or _layouts/ file.
#
# Usage:
#   # Extract a specific include:
#   .github/skills/blueprint-to-code/scripts/blueprint-extract.sh _includes/header.html
#
#   # Extract all includes that have a corresponding blueprint:
#   .github/skills/blueprint-to-code/scripts/blueprint-extract.sh --all-includes
#
#   # Dry run (show diff without writing):
#   .github/skills/blueprint-to-code/scripts/blueprint-extract.sh --all-includes --dry-run
#
# Requirements: node >= 18

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DESIGN_DIR="$REPO_ROOT/_design"
DRY_RUN=false
TARGET_FILE=""
ALL_INCLUDES=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)      DRY_RUN=true; shift ;;
    --all-includes) ALL_INCLUDES=true; shift ;;
    *)              TARGET_FILE="$1"; shift ;;
  esac
done

echo "🔄  Blueprint Reverse Extraction: code → _design/"
[[ "$DRY_RUN" == "true" ]] && echo "    Mode: DRY RUN (no files written)"
echo ""

# ── Node.js extractor ─────────────────────────────────────────────────────────
node - "$REPO_ROOT" "$DESIGN_DIR" "$TARGET_FILE" "$ALL_INCLUDES" "$DRY_RUN" <<'NODE_SCRIPT'
const fs   = require('fs');
const path = require('path');

const [,, repoRoot, designDir, targetFile, allIncludes, dryRun] = process.argv;
const isDry = dryRun === 'true';
const doAll = allIncludes === 'true';

/**
 * Parse a Liquid/HTML file and extract structural metadata.
 * Reads only element tags, class names, aria attributes, and data-* attributes.
 * Does NOT read inline styles, color values, or animation parameters.
 */
function extractStructure(htmlContent, sourceFile) {
  const fileName = path.basename(sourceFile, '.html');
  const id = fileName;

  // Extract top-level semantic tag from the first non-comment, non-genesis element
  const semanticTagMatch = htmlContent.match(/<(header|nav|main|section|article|aside|footer|div|form|ul|ol)\b/i);
  const semanticTag = semanticTagMatch ? semanticTagMatch[1].toLowerCase() : 'div';

  // Extract genesis wrapper variant (layout-variant from existing wrapper element)
  const genesisMatch = htmlContent.match(/<genesis-(atmosphere|entity|environment|synapse|state|cognition)\s+(\w+)="([^"]+)"/i);
  let layoutVariant = 'environment/distributed';
  if (genesisMatch) {
    const category = genesisMatch[1];
    const value    = genesisMatch[3];
    layoutVariant  = `${category}/${value}`;
  }

  // Extract motion-intent from existing data-motion attribute
  const motionMatch = htmlContent.match(/data-motion="([^"]+)"/);
  const motionIntent = motionMatch ? motionMatch[1] : 'entry/fade-in';

  // Count direct child blocks (sections, divs with class, articles)
  const childMatches = htmlContent.match(/<(section|article|div|nav|aside)\s+class="[^"]+"/gi) || [];

  return {
    id,
    name: id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    version: '1.0.0',
    description: `Extracted from ${path.relative(repoRoot, sourceFile)} — verify structural intent.`,
    type: 'COMPONENT',
    pluginData: {
      'asi-saga': {
        'semantic-tag': semanticTag,
        'motion-intent': motionIntent,
        'layout-variant': layoutVariant
      }
    },
    layoutMode: htmlContent.includes('flex') || htmlContent.includes('HORIZONTAL') ? 'HORIZONTAL' : 'VERTICAL',
    itemSpacing: 'spacing-md',
    children: []
  };
}

function processFile(srcFile) {
  if (!fs.existsSync(srcFile)) {
    console.error(`  ✗  File not found: ${srcFile}`);
    return;
  }

  const content  = fs.readFileSync(srcFile, 'utf8');
  const fileName = path.basename(srcFile, '.html');
  const subdir   = srcFile.includes('/_layouts/') ? 'layouts' : 'includes';
  const dstPath  = path.join(designDir, subdir, `${fileName}.json`);

  // Only extract if a corresponding blueprint already exists (structural sync)
  if (!fs.existsSync(dstPath)) {
    console.log(`  ⊘  ${subdir}/${fileName}.json — no blueprint exists, skipping (use blueprint-designer to create)`);
    return;
  }

  const existing  = JSON.parse(fs.readFileSync(dstPath, 'utf8'));
  const extracted = extractStructure(content, srcFile);

  // Merge: preserve existing metadata, update only structural fields.
  // Extraction metadata is stored in a separate sidecar comment, not in the JSON
  // (to avoid conflicting with additionalProperties: false in the schema).
  const merged = Object.assign({}, existing, {
    'pluginData': Object.assign({}, existing.pluginData, {
      'asi-saga': Object.assign({}, existing.pluginData['asi-saga'], {
        'semantic-tag':   extracted.pluginData['asi-saga']['semantic-tag'],
        'motion-intent':  existing.pluginData['asi-saga']['motion-intent'],  // preserve existing
        'layout-variant': existing.pluginData['asi-saga']['layout-variant']  // preserve existing
      })
    })
  });

  const output = JSON.stringify(merged, null, 2);
  const existingStr = JSON.stringify(existing, null, 2);

  if (output === existingStr) {
    console.log(`  ↔  ${subdir}/${fileName}.json — no structural change detected`);
  } else {
    if (!isDry) {
      fs.writeFileSync(dstPath, output, 'utf8');
    }
    console.log(`  ✓  ${subdir}/${fileName}.json — structural change propagated${isDry ? ' (dry run)' : ''}`);
  }
}

if (doAll) {
  // Process all includes that have a corresponding blueprint
  const includesDir = path.join(repoRoot, '_includes');
  const fs2 = require('fs');
  const walk = (dir) => {
    fs2.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      if (fs2.statSync(full).isDirectory()) walk(full);
      else if (f.endsWith('.html')) processFile(full);
    });
  };
  walk(includesDir);

  // Also process layouts
  const layoutsDir = path.join(repoRoot, '_layouts');
  if (fs2.existsSync(layoutsDir)) {
    fs2.readdirSync(layoutsDir)
      .filter(f => f.endsWith('.html'))
      .forEach(f => processFile(path.join(layoutsDir, f)));
  }
} else if (targetFile) {
  processFile(path.resolve(repoRoot, targetFile));
} else {
  console.error('  ✗  Provide a file path or --all-includes flag');
  process.exit(1);
}

console.log('');
console.log('✅  Extraction complete. Run blueprint-sync.sh to propagate to _data/design/');
NODE_SCRIPT
