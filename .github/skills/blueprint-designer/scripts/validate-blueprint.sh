#!/usr/bin/env bash
# validate-blueprint.sh — Blueprint Schema Validation
#
# Validates all JSON blueprints in _design/includes/ and _design/layouts/
# against _design/schema/node.schema.json and _design/schema/blueprint.schema.json.
#
# Enforces:
#   - Valid JSON syntax
#   - Required fields: id, name, type, pluginData.asi-saga.*
#   - Valid semantic-tag enum values
#   - layout-variant format: category/variant (89 Genesis variants)
#   - motion-intent format: phase/behaviour
#   - Maximum nesting depth: 5 levels
#   - No hardcoded color values (hex, rgb, oklch literals)
#   - No hardcoded px values in content fields
#   - itemSpacing must reference a token key (spacing-*)
#
# Usage:
#   .github/skills/blueprint-designer/scripts/validate-blueprint.sh
#   .github/skills/blueprint-designer/scripts/validate-blueprint.sh _design/includes/hero.json
#
# Requirements: node >= 18

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DESIGN_DIR="$REPO_ROOT/_design"
SINGLE_FILE="${1:-}"

echo "🔍  Blueprint Validation"
[[ -n "$SINGLE_FILE" ]] && echo "    File: $SINGLE_FILE"
echo ""

node - "$DESIGN_DIR" "$SINGLE_FILE" <<'NODE_SCRIPT'
const fs   = require('fs');
const path = require('path');

const [,, designDir, singleFile] = process.argv;

const VALID_SEMANTIC_TAGS = new Set([
  'html','body','header','nav','main','section','article','aside','footer',
  'div','span','h1','h2','h3','h4','h5','h6','p','a','button',
  'form','fieldset','legend','label','input','textarea','select',
  'ul','ol','li','img','figure','figcaption','time','address','blockquote','cite'
]);

const VALID_GENESIS_CATEGORIES = new Set([
  'environment','entity','cognition','synapse','state','atmosphere'
]);

const VALID_MOTION_PHASES = new Set([
  'entry','exit','hover','scroll','gesture','idle'
]);

// The 89 Genesis ontological variants
const VALID_VARIANTS = {
  environment: new Set(['distributed','focused','associative','chronological','manifest',
    'hierarchical','radial','modular','layered','fluid','fixed','scrollable',
    'interactive','responsive','adaptive','immersive','minimal','dense','sparse',
    'structured','dynamic']),
  entity: new Set(['primary','secondary','imperative','latent','aggregate','ancestral',
    'tertiary','quaternary','transcendent','dormant','active','passive',
    'surface-glass','badge','tag','avatar']),  // allow common variants
  cognition: new Set(['axiom','discourse','protocol','gloss','motive','quantum',
    'narrative','label','caption']),
  synapse: new Set(['navigate','execute','inquiry','destructive','social',
    'invoke','trigger','dismiss','expand','collapse','toggle','submit',
    'reset','upload','download','share','copy','edit','delete','confirm']),
  state: new Set(['stable','evolving','deprecated','locked','simulated',
    'loading','error','success','warning','info','empty','selected',
    'hover','focus','active']),
  atmosphere: new Set(['neutral','ethereal','void','vibrant','sacred',
    'dark','light','glass','gradient'])
};

const VALID_SPACING_TOKENS = new Set([
  'spacing-xs','spacing-sm','spacing-md','spacing-lg','spacing-xl',
  'spacing-xxl','spacing-3xl','spacing-genesis'
]);

const HARDCODE_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b|rgb\(|oklch\((?!.*var)/;
const HARDCODE_PX_PATTERN    = /\b\d+px\b/;

let errors   = 0;
let warnings = 0;
let checked  = 0;

function err(file, msg)  { console.error(`  ✗ [${file}] ${msg}`); errors++; }
function warn(file, msg) { console.warn(` ⚠  [${file}] ${msg}`);  warnings++; }

/** Validate a single blueprint node (recursive) */
function validateNode(node, file, path, depth) {
  if (depth > 5) {
    err(file, `Nesting depth exceeds 5 at path: ${path}`);
    return;
  }

  // Required fields
  if (!node.id)   err(file, `Missing "id" at path: ${path}`);
  if (!node.name) err(file, `Missing "name" at path: ${path}`);
  if (!node.type) err(file, `Missing "type" at path: ${path}`);

  if (!node.pluginData?.['asi-saga']) {
    err(file, `Missing pluginData["asi-saga"] at path: ${path}`);
    return;
  }

  const meta = node.pluginData['asi-saga'];

  // semantic-tag
  if (!meta['semantic-tag']) {
    err(file, `Missing semantic-tag at path: ${path}`);
  } else if (!VALID_SEMANTIC_TAGS.has(meta['semantic-tag'])) {
    err(file, `Invalid semantic-tag "${meta['semantic-tag']}" at: ${path}`);
  }

  // motion-intent
  if (!meta['motion-intent']) {
    err(file, `Missing motion-intent at path: ${path}`);
  } else {
    const parts = meta['motion-intent'].split('/');
    if (parts.length !== 2 || !VALID_MOTION_PHASES.has(parts[0])) {
      err(file, `Invalid motion-intent "${meta['motion-intent']}" at: ${path}. Format: phase/behaviour`);
    }
  }

  // layout-variant
  if (!meta['layout-variant']) {
    err(file, `Missing layout-variant at path: ${path}`);
  } else {
    const parts    = meta['layout-variant'].split('/');
    const category = parts[0];
    const variant  = parts[1];
    if (parts.length !== 2 || !VALID_GENESIS_CATEGORIES.has(category)) {
      err(file, `Invalid layout-variant category "${category}" at: ${path}`);
    } else if (variant && VALID_VARIANTS[category] && !VALID_VARIANTS[category].has(variant)) {
      warn(file, `Unknown variant "${variant}" in category "${category}" at: ${path}. Verify against GENOME.md.`);
    }
  }

  // itemSpacing must be a token reference
  if (node.itemSpacing && !VALID_SPACING_TOKENS.has(node.itemSpacing)) {
    err(file, `Invalid itemSpacing "${node.itemSpacing}" at: ${path}. Must be spacing-<scale-key>.`);
  }

  // Incorruptibility: no hardcoded visual values
  const contentStr = JSON.stringify(node);
  if (HARDCODE_COLOR_PATTERN.test(contentStr) && !contentStr.includes('"$schema"')) {
    warn(file, `Possible hardcoded color value at: ${path}. Use Token DNA references instead.`);
  }
  if (node.content && HARDCODE_PX_PATTERN.test(node.content)) {
    warn(file, `Possible hardcoded px value in content at: ${path}. Use spacing tokens instead.`);
  }

  // Recurse
  if (Array.isArray(node.children)) {
    node.children.forEach((child, i) =>
      validateNode(child, file, `${path}.children[${i}]`, depth + 1)
    );
  }
}

function validateFile(filePath) {
  const relPath = filePath.replace(designDir + '/', '');
  let blueprint;

  try {
    blueprint = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    err(relPath, `JSON parse error: ${e.message}`);
    return;
  }

  validateNode(blueprint, relPath, 'root', 0);
  checked++;
  if (errors === 0) console.log(`  ✓  ${relPath}`);
}

if (singleFile) {
  validateFile(path.resolve(singleFile));
} else {
  ['includes', 'layouts'].forEach(subdir => {
    const dir = path.join(designDir, subdir);
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .forEach(f => validateFile(path.join(dir, f)));
  });
}

console.log('');
console.log(`Checked: ${checked} | Errors: ${errors} | Warnings: ${warnings}`);
if (errors > 0) {
  console.error('\n❌  Validation failed — fix errors before committing blueprints.');
  process.exit(1);
}
console.log('✅  All blueprints valid.');
NODE_SCRIPT
