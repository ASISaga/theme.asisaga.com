#!/usr/bin/env bash
# blueprint-sync-scss.sh — SCSS Sync: _design/ layout-variants → _genesis-core.scss
#
# Extracts every layout-variant value from all blueprints in _design/ and
# checks whether the corresponding CSS attribute selector is present in
# _sass/components/core/_genesis-core.scss.  Any variant that is referenced
# by a blueprint but absent from the SCSS @each lists causes the Figma plugin
# (and any node.html-rendered page) to display that node without visual styles.
#
# Usage:
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh --fix
#   .github/skills/blueprint-to-code/scripts/blueprint-sync-scss.sh --dry-run
#
# Flags:
#   --fix      Automatically add missing variants to the relevant SCSS lists.
#   --dry-run  Print what would change without writing any file.
#
# Requirements: node >= 18

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
DESIGN_DIR="$REPO_ROOT/_design"
GENESIS_CORE="$REPO_ROOT/_sass/components/core/_genesis-core.scss"

FIX=false
DRY_RUN=false
for arg in "$@"; do
  case "$arg" in
    --fix)     FIX=true ;;
    --dry-run) DRY_RUN=true ;;
  esac
done

echo "🔄  Blueprint ↔ SCSS Sync Check"
echo "    Blueprints : $DESIGN_DIR"
echo "    SCSS target: $GENESIS_CORE"
[[ "$FIX"     == "true" ]] && echo "    Mode       : AUTO-FIX"
[[ "$DRY_RUN" == "true" ]] && echo "    Mode       : DRY RUN"
echo ""

# ── Node.js checker/fixer ─────────────────────────────────────────────────────
node - "$DESIGN_DIR" "$GENESIS_CORE" "$FIX" "$DRY_RUN" <<'NODE_SCRIPT'
const fs   = require('fs');
const path = require('path');

const [,, designDir, coreScss, doFix, dryRun] = process.argv;
const shouldFix = doFix  === 'true';
const isDry     = dryRun === 'true';

// ── 1. Collect every layout-variant value from all blueprints ─────────────

const usedVariants = {};  // { category: Set<variant> }

function collectVariants(node) {
  if (!node || typeof node !== 'object') return;
  const lv = node.pluginData?.['asi-saga']?.['layout-variant'];
  if (lv) {
    const parts    = lv.split('/');
    const category = parts[0];
    const variant  = parts[1];
    if (category && variant) {
      if (!usedVariants[category]) usedVariants[category] = new Set();
      usedVariants[category].add(variant);
    }
  }
  if (Array.isArray(node.children)) node.children.forEach(collectVariants);
}

['includes', 'layouts'].forEach(sub => {
  const dir = path.join(designDir, sub);
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).filter(f => f.endsWith('.json')).forEach(f => {
    try {
      const bp = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      collectVariants(bp);
    } catch (e) {
      console.error(`  ✗  Failed to parse ${sub}/${f}: ${e.message}`);
    }
  });
});

// ── 2. Parse SCSS lists from _genesis-core.scss ───────────────────────────

const scssSource = fs.readFileSync(coreScss, 'utf8');

// Map from category name to the SCSS variable name that holds its variants
const categoryToVar = {
  environment: '$genesis-environment-logics',
  entity:      '$genesis-entity-natures',
  cognition:   '$genesis-cognition-intents',
  synapse:     '$genesis-synapse-vectors',
  state:       '$genesis-state-conditions',
  atmosphere:  '$genesis-atmosphere-vibes',
};

/**
 * Extract the items in a SCSS list variable.
 * Returns a Set<string> of quoted values inside the parentheses.
 */
function parseScssListVar(scss, varName) {
  const escaped = varName.replace('$', '\\$');
  const re = new RegExp(`${escaped}:\\s*\\(([^)]+)\\)`, 's');
  const m  = scss.match(re);
  if (!m) return new Set();
  return new Set(
    m[1].split(',')
        .map(v => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
  );
}

const scssLists = {};
Object.entries(categoryToVar).forEach(([cat, varName]) => {
  scssLists[cat] = parseScssListVar(scssSource, varName);
});

// ── 3. Identify gaps ──────────────────────────────────────────────────────

const gaps = {};  // { category: [missing variant, ...] }

Object.entries(usedVariants).forEach(([cat, variants]) => {
  const covered = scssLists[cat] || new Set();
  variants.forEach(v => {
    if (!covered.has(v)) {
      if (!gaps[cat]) gaps[cat] = [];
      gaps[cat].push(v);
    }
  });
});

const gapCount = Object.values(gaps).reduce((n, arr) => n + arr.length, 0);

if (gapCount === 0) {
  // Print full coverage summary
  Object.entries(usedVariants).sort().forEach(([cat, variants]) => {
    console.log(`  ✓  ${cat}: ${[...variants].sort().join(', ')}`);
  });
  console.log('');
  console.log('✅  All blueprint layout-variants are covered by SCSS selectors.');
  process.exit(0);
}

// ── 4. Report gaps ────────────────────────────────────────────────────────

console.log('Blueprint layout-variant coverage:');
Object.entries(usedVariants).sort().forEach(([cat, variants]) => {
  const covered = scssLists[cat] || new Set();
  variants.forEach(v => {
    const ok = covered.has(v) ? '✓' : '✗';
    console.log(`  ${ok}  ${cat}/${v}`);
  });
});

console.log('');
console.log(`❌  ${gapCount} variant(s) are used in blueprints but have NO CSS selector in _genesis-core.scss:`);
Object.entries(gaps).forEach(([cat, vs]) => {
  vs.forEach(v => console.log(`    → ${cat}/${v}  (add '${v}' to ${categoryToVar[cat]})`));
});

if (!shouldFix) {
  console.log('');
  console.log('Run with --fix to auto-add the missing entries to the SCSS lists.');
  process.exit(1);
}

// ── 5. Auto-fix: insert missing variants into the SCSS lists ──────────────

let updated = scssSource;

Object.entries(gaps).forEach(([cat, missing]) => {
  const varName = categoryToVar[cat];
  const escaped = varName.replace('$', '\\$');
  const listRe  = new RegExp(`(${escaped}:\\s*\\()([^)]+)(\\))`, 's');
  const match   = updated.match(listRe);
  if (!match) {
    console.warn(`  ⚠  Could not find ${varName} in SCSS — skipping auto-fix for ${cat}`);
    return;
  }

  const existingItems = match[2];

  // Detect the quote character used for the existing list items (single or double)
  const quoteChar = existingItems.includes("'") ? "'" : '"';

  // Detect the indentation prefix of a typical list item (leading whitespace)
  const indentMatch = existingItems.match(/\n([ \t]+)/);
  const indent      = indentMatch ? indentMatch[1] : '  ';

  // Find the position just after the final quoted value (handles both ' and ")
  const lastQuoteIdx = Math.max(
    existingItems.lastIndexOf("'"),
    existingItems.lastIndexOf('"')
  );
  const insertPos = lastQuoteIdx + 1;  // just after the last closing quote

  const newEntries = missing.map(v => `\n${indent}${quoteChar}${v}${quoteChar},`).join('');
  const newItems   = existingItems.slice(0, insertPos) + newEntries + existingItems.slice(insertPos);
  updated = updated.replace(listRe, `$1${newItems}$3`);
  console.log(`  ✓  Added to ${varName}: ${missing.map(v => `${quoteChar}${v}${quoteChar}`).join(', ')}`);
});

if (isDry) {
  console.log('');
  console.log('DRY RUN — no files written.');
  process.exit(0);
}

fs.writeFileSync(coreScss, updated, 'utf8');
console.log('');
console.log(`✅  ${coreScss} updated. Run \`npm run test:scss\` to verify compilation.`);
NODE_SCRIPT
