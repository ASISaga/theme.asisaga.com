#!/usr/bin/env node
/**
 * Genesis Design Token Builder — Style Dictionary v4 Config
 *
 * Forward translation: _design/tokens/*.json → _sass/design/_*-generated.scss
 * Generates separate files per concern:
 *   - _colors-generated.scss   (from 2-color.json)
 *   - _typography-generated.scss (from 3-typography.json)
 *   - _spacing-generated.scss  (from 4-spacing.json — spacing, borders, sizes, transitions, z-index)
 *   - _effects-generated.scss  (from 5-effects.json — shadows, glass, glows, easing, durations)
 *
 * Preserves OKLCH color values (no hex coercion).
 * Resolves identity-tier references transitively.
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
// Custom transform: value/fluid-clamp
// Applies to tokens with $type === "fluid-typography".
// Value must be an object: { min, max, minVP?, maxVP? } (all in rem strings).
//
// Computes a CSS clamp() using the UTOPIA linear-interpolation formula:
//   slope     = (maxSize - minSize) / (maxVP - minVP)   [unitless rem/rem]
//   intercept = minSize - slope × minVP                 [rem]
//   clamp(min, calc(slope×100vw ± intercept·rem), max)
//
// This guarantees the font is exactly `min` at `minVP` viewport width and
// exactly `max` at `maxVP` viewport width, scaling linearly in between.
//
// Default viewport range: 320px (20rem) → 1440px (90rem)
// ---------------------------------------------------------------------------
function fluidClamp({ min, max, minVP = '20rem', maxVP = '90rem' }) {
  const minSize = parseFloat(min);
  const maxSize = parseFloat(max);
  const minViewport = parseFloat(minVP);
  const maxViewport = parseFloat(maxVP);

  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const slopeVw = parseFloat((slope * 100).toFixed(4));
  const intercept = parseFloat((minSize - slope * minViewport).toFixed(4));

  const slopePart = `${slopeVw}vw`;
  const preferred = intercept >= 0
    ? `calc(${slopePart} + ${intercept}rem)`
    : `calc(${slopePart} - ${Math.abs(intercept)}rem)`;

  return `clamp(${min}, ${preferred}, ${max})`;
}

StyleDictionary.registerTransform({
  name: 'value/fluid-clamp',
  type: 'value',
  filter: (token) => token.$type === 'fluid-typography',
  transform: (token) => fluidClamp(token.$value),
});

// ---------------------------------------------------------------------------
// Custom format: scss/genesis-variables
// Outputs raw SCSS variable declarations without any color transformation,
// preserving OKLCH values exactly as authored in tokens.json.
// ---------------------------------------------------------------------------
function genesisFormat(headerComment) {
  return ({ dictionary }) => {
    const lines = [
      `// Do not edit directly — generated from _design/tokens/*.json`,
      `// Run: node .github/skills/style-dictionary/sd.config.mjs`,
      `// ${headerComment}`,
      '',
    ];
    for (const token of dictionary.allTokens) {
      const value = token.$value;
      const description = token.$description ?? '';
      lines.push(`$${token.name}: ${value};${description ? ` // ${description}` : ''}`);
    }
    return lines.join('\n') + '\n';
  };
}

StyleDictionary.registerFormat({
  name: 'scss/genesis-colors',
  format: genesisFormat('Color tokens — OKLCH palette primitives'),
});

StyleDictionary.registerFormat({
  name: 'scss/genesis-typography',
  format: genesisFormat('Typography tokens — families, weights, sizes, fluid scales, line-heights'),
});

StyleDictionary.registerFormat({
  name: 'scss/genesis-spacing',
  format: genesisFormat('Spacing tokens — spacing, border-radius, border-width, sizes, transitions, z-index'),
});

StyleDictionary.registerFormat({
  name: 'scss/genesis-effects',
  format: genesisFormat('Effects tokens — shadows, glass surfaces, glows, blur, easing, durations'),
});

// ---------------------------------------------------------------------------
// Custom transform group: scss/genesis
// Applies name/kebab (e.g. color.light.white → color-light-white).
// Includes value/fluid-clamp for fluid-typography tokens.
// Crucially excludes all color transforms — OKLCH values pass through unchanged.
// ---------------------------------------------------------------------------
StyleDictionary.registerTransformGroup({
  name: 'scss/genesis',
  transforms: ['name/kebab', 'value/fluid-clamp'],
});

// ---------------------------------------------------------------------------
// Token filters — categorize tokens into their output files
// ---------------------------------------------------------------------------
const isColor = (token) => token.path[0] === 'color' || token.path[0] === 'brand';
const isTypography = (token) => token.path[0] === 'font' || token.path[0] === 'line-height';
const isEffect = (token) => token.path[0] === 'effect';
const isSpacing = (token) => !isColor(token) && !isTypography(token) && !isEffect(token);

// ---------------------------------------------------------------------------
// Style Dictionary configuration
// ---------------------------------------------------------------------------
const sdConfig = {
  usesDtcg: true,
  source: [join(repoRoot, '_design/tokens/*.json')],
  platforms: {
    scss: {
      transformGroup: 'scss/genesis',
      buildPath: join(repoRoot, '_sass/design') + '/',
      files: [
        {
          destination: '_colors-generated.scss',
          format: 'scss/genesis-colors',
          filter: isColor,
        },
        {
          destination: '_typography-generated.scss',
          format: 'scss/genesis-typography',
          filter: isTypography,
        },
        {
          destination: '_spacing-generated.scss',
          format: 'scss/genesis-spacing',
          filter: isSpacing,
        },
        {
          destination: '_effects-generated.scss',
          format: 'scss/genesis-effects',
          filter: isEffect,
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
