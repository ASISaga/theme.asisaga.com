#!/usr/bin/env node
/**
 * Genesis Design Token Builder — Style Dictionary v4 Config
 *
 * Forward translation: _design/tokens.json → _sass/base/design/_variables-generated.scss
 * Preserves OKLCH color values (no hex coercion).
 * Resolves sys-layer aliases and identity-tier references transitively.
 *
 * Usage:
 *   node .github/skills/style-dictionary/sd.config.mjs
 *   npx style-dictionary build --config .github/skills/style-dictionary/sd.config.mjs
 */

import StyleDictionary from 'style-dictionary';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '../../..');

// ---------------------------------------------------------------------------
// Custom format: scss/genesis-variables
// Outputs raw SCSS variable declarations without any color transformation,
// preserving OKLCH values exactly as authored in tokens.json.
// ---------------------------------------------------------------------------
StyleDictionary.registerFormat({
  name: 'scss/genesis-variables',
  format: ({ dictionary }) => {
    const lines = [
      '// Do not edit directly — generated from _design/tokens.json',
      '// Run: node .github/skills/style-dictionary/sd.config.mjs',
      '// Source: _design/tokens.json',
      '',
    ];
    for (const token of dictionary.allTokens) {
      const value = token.$value;
      const description = token.$description ?? '';
      lines.push(`$${token.name}: ${value};${description ? ` // ${description}` : ''}`);
    }
    return lines.join('\n') + '\n';
  },
});

// ---------------------------------------------------------------------------
// Custom transform group: scss/genesis
// Only applies name/kebab (e.g. color.light.white → color-light-white).
// Crucially excludes all color transforms — OKLCH values pass through unchanged.
// ---------------------------------------------------------------------------
StyleDictionary.registerTransformGroup({
  name: 'scss/genesis',
  transforms: ['name/kebab'],
});

// ---------------------------------------------------------------------------
// Style Dictionary configuration
// ---------------------------------------------------------------------------
const sdConfig = {
  usesDtcg: true,
  source: [join(repoRoot, '_design/tokens.json')],
  platforms: {
    scss: {
      transformGroup: 'scss/genesis',
      buildPath: join(repoRoot, '_sass/base/design') + '/',
      files: [
        {
          destination: '_variables-generated.scss',
          format: 'scss/genesis-variables',
        },
      ],
    },
  },
  log: { verbosity: 'default' },
};

// Build when run directly (node sd.config.mjs).
// When imported as a config by `npx style-dictionary build --config`, this
// block is skipped and the default export is used as the configuration.
if (process.argv[1] === __filename) {
  const sd = new StyleDictionary(sdConfig);
  await sd.buildAllPlatforms();
}

export default sdConfig;
