#!/usr/bin/env node
/**
 * Genesis Design Token Builder
 *
 * Bidirectional translation between tokens.json and _variables.scss.
 * Preserves OKLCH color values and CSS functions without transformation.
 *
 * Usage:
 *   node script.mjs               -- tokens → _sass/base/design/_variables-generated.scss
 *   node script.mjs --reverse     -- _sass/base/design/ → tokens-extracted.json
 *   node script.mjs --diff        -- generate and show diff against production
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../../..');

const TOKENS_PATH     = join(__dirname, 'tokens.json');
const OUTPUT_STAGED   = join(repoRoot, '_sass/base/design/_variables-generated.scss');
const OUTPUT_TOKENS   = join(__dirname, 'tokens-extracted.json');
const SCSS_VARIABLES  = join(repoRoot, '_sass/base/design/_variables.scss');
const SCSS_COLORS     = join(repoRoot, '_sass/base/design/_colors.scss');

// ============================================================================
// FORWARD: tokens.json → _variables-generated.scss
// ============================================================================

/**
 * Flatten a nested token object into SCSS variable declarations.
 * Resolves {ref.path} token aliases within the same token tree.
 * @param {object} obj   - Token tree or subtree
 * @param {string} prefix - Current variable-name prefix
 * @param {object} root   - Full token root (for alias resolution)
 * @returns {string[]} SCSS lines
 */
function flattenTokens(obj, prefix = '', root = obj) {
  const lines = [];
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('_')) continue; // skip _comment fields
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object' && 'value' in val) {
      const resolved = resolveAlias(val.value, root);
      const comment  = val.comment ? ` // ${val.comment}` : '';
      lines.push(`$${name}: ${resolved};${comment}`);
    } else if (val && typeof val === 'object') {
      lines.push(...flattenTokens(val, name, root));
    }
  }
  return lines;
}

/**
 * Resolve Style Dictionary alias syntax: {path.to.token}
 * @param {string} value - Token value, possibly containing {alias}
 * @param {object} root  - Full token root
 * @returns {string} Resolved value
 */
function resolveAlias(value, root) {
  return String(value).replace(/\{([^}]+)\}/g, (_, path) => {
    const parts = path.split('.');
    let node = root;
    for (const part of parts) {
      node = node?.[part];
    }
    return node?.value ?? `{${path}}`; // leave unresolved aliases as-is
  });
}

function buildTokensToScss() {
  const tokens = JSON.parse(readFileSync(TOKENS_PATH, 'utf8'));
  const lines = [
    '// Do not edit directly — generated from tokens.json',
    '// Run: node .github/skills/style-dictionary/script.mjs',
    '// Source: .github/skills/style-dictionary/tokens.json',
    '',
  ];
  lines.push(...flattenTokens(tokens, '', tokens));
  writeFileSync(OUTPUT_STAGED, lines.join('\n') + '\n');
  console.log(`✓ Generated ${OUTPUT_STAGED}`);
  console.log('  Review diff: diff _sass/base/design/_variables.scss _sass/base/design/_variables-generated.scss');}

// ============================================================================
// REVERSE: _sass/base/design/ → tokens-extracted.json
// ============================================================================

const CATEGORY_MAP = {
  '$color-':         'color',
  '$surface-':       'surface',
  '$text-':          'text',
  '$accent-':        'accent',
  '$font-family-':   'font.family',
  '$font-weight-':   'font.weight',
  '$font-size-':     'font.size',
  '$line-height-':   'line-height',
  '$spacing-':       'spacing',
  '$genesis-spacing-': 'genesis-spacing',
  '$border-radius-': 'border-radius',
  '$shadow-':        'shadow',
  '$transition-':    'transition',
  '$z-index-':       'z-index',
  '$breakpoint-':    'breakpoint',
};

/** Infer Style Dictionary type from variable value */
function inferType(value) {
  if (/oklch\(|#[0-9a-f]{3,8}|rgb\(|hsl\(/i.test(value)) return 'color';
  if (/rem$|px$|em$|%$/.test(value.trim())) return 'sizing';
  if (/cubic-bezier|ease|linear/.test(value)) return 'transition';
  if (/^\d+(\.\d+)?$/.test(value.trim())) return 'number';
  return 'other';
}

/** Set a nested key path on an object, creating intermediaries as needed */
function setNestedPath(obj, pathParts, tokenEntry) {
  let node = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (!node[part]) node[part] = {};
    node = node[part];
  }
  node[pathParts[pathParts.length - 1]] = tokenEntry;
}

/**
 * Parse SCSS variable declarations from file content.
 * Handles multi-line values and inline comments.
 * @param {string} content - Raw SCSS file content
 * @returns {Array<{name: string, value: string, comment: string}>}
 */
function parseScssVars(content) {
  const vars = [];
  // Join lines, then match $name: value; patterns (values may span lines with parens)
  const normalized = content
    .replace(/\/\/[^\n]*/g, m => m) // keep inline comments temporarily
    .split('\n');

  let current = null;
  let depth = 0;

  for (const rawLine of normalized) {
    const line = rawLine.trim();
    if (!current) {
      const match = line.match(/^(\$[\w-]+)\s*:\s*(.*)/);
      if (!match) continue;
      current = { name: match[1], valueParts: [match[2]], comment: '' };
      depth = (match[2].match(/\(/g) || []).length - (match[2].match(/\)/g) || []).length;
    } else {
      current.valueParts.push(line);
      depth += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
    }

    if (current && (depth <= 0 || (current.valueParts.join('').includes(';')))) {
      let raw = current.valueParts.join(' ').trim().replace(/;.*$/, '');
      // Extract trailing comment from last part
      const commentMatch = current.valueParts[current.valueParts.length - 1].match(/\/\/\s*(.+)$/);
      if (commentMatch) {
        current.comment = commentMatch[1].trim();
        raw = raw.replace(/\/\/.*$/, '').trim();
      }
      vars.push({ name: current.name, value: raw, comment: current.comment });
      current = null;
      depth = 0;
    }
  }
  return vars;
}

/** Map SCSS variable name to token category and key path */
function categoriseVar(scssName) {
  for (const [prefix, category] of Object.entries(CATEGORY_MAP)) {
    if (scssName.startsWith(prefix)) {
      const suffix = scssName.slice(prefix.length);
      const pathParts = suffix.split('-').filter(Boolean);
      return { category, pathParts };
    }
  }
  // Fallback: top-level key
  const key = scssName.replace(/^\$/, '');
  return { category: 'misc', pathParts: [key] };
}

function buildScssToTokens() {
  const sources = [SCSS_COLORS, SCSS_VARIABLES];
  const result = {};
  const seen = new Set();

  for (const srcPath of sources) {
    if (!existsSync(srcPath)) {
      console.warn(`⚠ Source not found: ${srcPath}`);
      continue;
    }
    const content = readFileSync(srcPath, 'utf8');
    const vars = parseScssVars(content);

    for (const { name, value, comment } of vars) {
      if (seen.has(name)) continue; // first-file wins (colors before variables)
      seen.add(name);

      const { category, pathParts } = categoriseVar(name);
      const entry = { value, type: inferType(value) };
      if (comment) entry.comment = comment;

      if (!result[category]) result[category] = {};
      setNestedPath(result[category], pathParts, entry);
    }
  }

  writeFileSync(OUTPUT_TOKENS, JSON.stringify(result, null, 2) + '\n');
  console.log(`✓ Extracted tokens to ${OUTPUT_TOKENS}`);
  console.log('  Review, then copy to tokens.json if satisfied.');
}

// ============================================================================
// DIFF helper
// ============================================================================
function showDiff() {
  buildTokensToScss();
  try {
    const diff = execSync(`diff "${SCSS_VARIABLES}" "${OUTPUT_STAGED}"`, { encoding: 'utf8' });
    if (!diff.trim()) {
      console.log('✓ No differences — tokens.json and _variables.scss are in sync.');
    } else {
      console.log(diff);
    }
  } catch (e) {
    if (e.stdout) console.log(e.stdout);
  }
}

// ============================================================================
// Entry point
// ============================================================================
const args = process.argv.slice(2);
if (args.includes('--reverse')) {
  buildScssToTokens();
} else if (args.includes('--diff')) {
  showDiff();
} else {
  buildTokensToScss();
}
