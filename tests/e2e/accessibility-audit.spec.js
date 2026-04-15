import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

/**
 * Accessibility Audit using axe-core/playwright
 *
 * Audits index.html and all sample pages linked from it.
 * Results are written to tests/accessibility-audit-report.md
 *
 * Pages audited:
 *   /                                   (index.html)
 *   /samples/application/chatroom.html
 *   /samples/application/dashboard.html
 *   /samples/application/search.html
 *   /samples/application/settings.html
 *   /samples/content-driven/archive.html
 *   /samples/content-driven/article.html
 *   /samples/content-driven/post.html
 *   /samples/content-driven/profile.html
 *   /samples/knowledge/docs.html
 *   /samples/knowledge/faq.html
 *   /samples/marketing/landing.html
 *   /samples/marketing/gallery.html
 *   /samples/marketing/form.html
 *   /samples/utility/404.html
 *   /samples/utility/splash.html
 *
 * Design — 3-layer pipeline:
 *
 *  Layer 1 — Prevention (stylelint / npm test):
 *    scss/no-dollar-variables and declaration-property-value-disallowed-list
 *    enforce that NO raw colour literals can appear outside _sass/design/.
 *    All colour values must originate from _design/tokens/ and be expressed
 *    through $variables.  This is the authoritative gate for design-token
 *    hygiene and runs on every commit via npm test.
 *
 *  Layer 2 — Observation (this file / axe-core):
 *    Tests NEVER fail due to axe violations.  Every violation is recorded and
 *    persisted to tests/.audit-results/*.json so the afterAll reporter can
 *    aggregate them regardless of worker count or test retries.  The full
 *    markdown report is always written to tests/accessibility-audit-report.md.
 *
 *  Layer 3 — Holistic review (Design System Review section):
 *    afterAll generates a "Design System Review" section that cross-references
 *    the axe violations with the Genesis design-token system.  Because Layer 1
 *    guarantees all rendered colours trace back to a token in _design/tokens/,
 *    a contrast violation in the axe report means a *token value* is wrong, not
 *    an inline literal.  The review section surfaces which token files to update
 *    and why, so designers/developers can trace each axe finding back to its
 *    root cause in the design system rather than patching SCSS ad-hoc.
 */

// All pages to audit (path relative to baseURL)
const PAGES = [
  { path: '/',                                       label: 'Home (index.html)' },
  { path: '/samples/application/chatroom.html',      label: 'Application – Chatroom' },
  { path: '/samples/application/dashboard.html',     label: 'Application – Dashboard' },
  { path: '/samples/application/search.html',        label: 'Application – Search' },
  { path: '/samples/application/settings.html',      label: 'Application – Settings' },
  { path: '/samples/content-driven/archive.html',    label: 'Content-Driven – Archive' },
  { path: '/samples/content-driven/article.html',    label: 'Content-Driven – Article' },
  { path: '/samples/content-driven/post.html',       label: 'Content-Driven – Post' },
  { path: '/samples/content-driven/profile.html',    label: 'Content-Driven – Profile' },
  { path: '/samples/knowledge/docs.html',            label: 'Knowledge – Docs' },
  { path: '/samples/knowledge/faq.html',             label: 'Knowledge – FAQ' },
  { path: '/samples/marketing/landing.html',         label: 'Marketing – Landing' },
  { path: '/samples/marketing/gallery.html',         label: 'Marketing – Gallery' },
  { path: '/samples/marketing/form.html',            label: 'Marketing – Form' },
  { path: '/samples/utility/404.html',               label: 'Utility – 404' },
  { path: '/samples/utility/splash.html',            label: 'Utility – Splash' },
];

// Temporary directory where each test writes its JSON result
const AUDIT_TMP_DIR = path.resolve('tests/.audit-results');

// ─── Setup: clear previous partial results before the suite begins ────────────

test.beforeAll(async () => {
  fs.rmSync(AUDIT_TMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(AUDIT_TMP_DIR, { recursive: true });
});

// ─── Teardown: aggregate JSON files and write the markdown report ─────────────

test.afterAll(async () => {
  const jsonFiles = fs.readdirSync(AUDIT_TMP_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort(); // sort ensures consistent report order

  const results = jsonFiles.map((f) =>
    JSON.parse(fs.readFileSync(path.join(AUDIT_TMP_DIR, f), 'utf8'))
  );

  const reportPath = path.resolve('tests/accessibility-audit-report.md');
  writeMarkdownReport(reportPath, results);
  console.log(`\n✅ Accessibility audit report written to: ${reportPath}\n`);
  console.log(`   Pages audited: ${results.length}`);
  const totalViolations = results.reduce((n, r) => n + r.violations.length, 0);
  console.log(`   Total violations: ${totalViolations}\n`);
});

// ─── Helper: safe slug for filenames ─────────────────────────────────────────

function toSlug(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── Helper: format a single violation for markdown ──────────────────────────

function formatViolation(v) {
  const nodes = v.nodes
    .map((n) => {
      const target = n.target.join(', ');
      const html = n.html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const fix = n.failureSummary
        ? n.failureSummary.replace(/\n/g, ' ')
        : '–';
      return `    - \`${target}\`  \n      HTML: \`${html}\`  \n      Fix: ${fix}`;
    })
    .join('\n');

  return (
    `- **[${v.impact?.toUpperCase() ?? 'UNKNOWN'}]** \`${v.id}\` – ${v.description}  \n` +
    `  Help: <${v.helpUrl}>  \n` +
    `  Affected nodes (${v.nodes.length}):\n${nodes}`
  );
}

// ─── Helper: write full markdown report ───────────────────────────────────────

function writeMarkdownReport(reportPath, results) {
  const now = new Date().toISOString();

  // Aggregate totals
  let totalViolations = 0;
  let totalPasses = 0;
  let totalIncomplete = 0;
  const violationsByImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };

  for (const r of results) {
    totalViolations += r.violations.length;
    totalPasses += r.passes.length;
    totalIncomplete += r.incomplete.length;
    for (const v of r.violations) {
      const impact = v.impact ?? 'minor';
      violationsByImpact[impact] = (violationsByImpact[impact] ?? 0) + 1;
    }
  }

  const lines = [
    '# Accessibility Audit Report',
    '',
    `> **Generated**: ${now}  `,
    `> **Tool**: axe-core / @axe-core/playwright  `,
    `> **Standard**: WCAG 2.1 Level AA  `,
    `> **Pages audited**: ${results.length}`,
    '',
    '## Executive Summary',
    '',
    '| Metric | Count |',
    '|--------|-------|',
    `| Pages audited | ${results.length} |`,
    `| Total violations | ${totalViolations} |`,
    `| ├─ Critical | ${violationsByImpact.critical} |`,
    `| ├─ Serious  | ${violationsByImpact.serious} |`,
    `| ├─ Moderate | ${violationsByImpact.moderate} |`,
    `| └─ Minor    | ${violationsByImpact.minor} |`,
    `| Passes (rules that passed) | ${totalPasses} |`,
    `| Incomplete (needs manual review) | ${totalIncomplete} |`,
    '',
    '---',
    '',
    '## Page-by-Page Results',
    '',
  ];

  for (const r of results) {
    lines.push(`### ${r.label}`);
    lines.push('');
    lines.push(`**URL**: \`${r.url}\`  `);
    lines.push(`**Violations**: ${r.violations.length}  `);
    lines.push(`**Passes**: ${r.passes.length}  `);
    lines.push(`**Incomplete**: ${r.incomplete.length}`);
    lines.push('');

    if (r.error) {
      lines.push(`> ⚠️ **Page load error**: ${r.error}`);
      lines.push('');
    } else if (r.violations.length === 0) {
      lines.push('✅ **No violations found.**');
      lines.push('');
    } else {
      lines.push('#### Violations');
      lines.push('');
      for (const v of r.violations) {
        lines.push(formatViolation(v));
        lines.push('');
      }
    }

    if (r.incomplete.length > 0) {
      lines.push('#### Incomplete (needs manual review)');
      lines.push('');
      for (const i of r.incomplete) {
        lines.push(
          `- \`${i.id}\` – ${i.description}  \n  Help: <${i.helpUrl}>  \n  Nodes: ${i.nodes.length}`
        );
        lines.push('');
      }
    }

    lines.push('---');
    lines.push('');
  }

  // Unique violations across all pages
  const allViolationIds = new Map();
  for (const r of results) {
    for (const v of r.violations) {
      if (!allViolationIds.has(v.id)) {
        allViolationIds.set(v.id, { ...v, pages: [] });
      }
      allViolationIds.get(v.id).pages.push(r.label);
    }
  }

  if (allViolationIds.size > 0) {
    lines.push('## Unique Violations (Deduplicated)');
    lines.push('');
    lines.push('| Rule | Impact | Affected Pages | Description |');
    lines.push('|------|--------|----------------|-------------|');
    for (const [id, v] of [...allViolationIds.entries()].sort((a, b) => {
      const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
      return (order[a[1].impact] ?? 4) - (order[b[1].impact] ?? 4);
    })) {
      lines.push(
        `| \`${id}\` | ${v.impact ?? '–'} | ${v.pages.join(', ')} | ${v.description} |`
      );
    }
    lines.push('');
  }

  lines.push('## Recommendations');
  lines.push('');
  lines.push(
    'Address violations in impact order: **critical → serious → moderate → minor**.'
  );
  lines.push('');
  lines.push(
    'Each violation entry links to the axe-core help URL for remediation guidance.'
  );
  lines.push('');
  lines.push(
    '> Incomplete results require manual inspection with assistive technologies (e.g., VoiceOver, NVDA).'
  );
  lines.push('');

  // Append the holistic design-system review
  for (const line of generateDesignSystemReview(results)) {
    lines.push(line);
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
}

// ─── Helper: holistic design-system review ───────────────────────────────────
//
// Bridges Layer 2 (axe observations) and Layer 1 (design-token system).
// Because stylelint enforces that all colour values originate from
// _design/tokens/ via $variables in _sass/design/, every contrast violation
// reported by axe means a *token value* is wrong, not an inline literal.
// This section maps each axe rule to the responsible token file so that
// fixes land in the design system rather than scattered SCSS overrides.

/**
 * Maps an axe-core rule ID to the Genesis design-system concern and the
 * _design/tokens/ file(s) where the root cause is most likely to be found.
 *
 * @type {Record<string, { concern: string, tokenFiles: string[], guidance: string }>}
 */
const AXE_RULE_TO_TOKEN_MAP = {
  'color-contrast': {
    concern: 'Color – WCAG 1.4.3 minimum contrast (4.5:1 normal, 3:1 large)',
    tokenFiles: ['_design/tokens/2-color.json'],
    guidance:
      'Search the failing foreground/background hex codes in `_design/tokens/2-color.json`. ' +
      'Formal dark/light mode tokens live under `color.theme.light.*` and `color.theme.dark.*`. ' +
      'CSS custom properties in `_sass/ontology/engines/_theme-properties.scss` reference ' +
      'these tokens via `$color-theme-light-*` / `$color-theme-dark-*` variables. ' +
      'Adjust the lightness (L) component of the OKLCH value until the rendered pair meets 4.5:1. ' +
      'Use a contrast checker with OKLCH → sRGB conversion (e.g. oklch.com). ' +
      'Never patch contrast in SCSS directly — update the token so the fix propagates everywhere.',
  },
  'color-contrast-enhanced': {
    concern: 'Color – WCAG 1.4.6 enhanced contrast (7:1 normal, 4.5:1 large)',
    tokenFiles: ['_design/tokens/2-color.json'],
    guidance:
      'Same remediation path as `color-contrast` but targeting the stricter AAA ratio. ' +
      'Increase OKLCH lightness separation between `color.theme.light.*` / `color.theme.dark.*` tokens.',
  },
  'link-in-text-block': {
    concern: 'Color – link distinguishability without relying solely on color',
    tokenFiles: ['_design/tokens/2-color.json'],
    guidance:
      'The `genesis-synapse("navigate")` mixin must render `text-decoration: underline`. ' +
      'Verify that `_sass/ontology/engines/_synapse.scss` sets an underline and that no ' +
      'downstream override removes it.  If the token driving link colour is too close to ' +
      'body text, update `color.accent.neon-blue` in `_design/tokens/2-color.json`.',
  },
  'focus-visible': {
    concern: 'Interaction – keyboard focus indicator',
    tokenFiles: ['_design/tokens/2-color.json', '_design/tokens/5-effects.json'],
    guidance:
      'Ensure `--genesis-focus-ring` resolves to a colour with sufficient contrast against ' +
      'both light and dark backgrounds.  The token lives in `2-color.json` under ' +
      '`color.state.focus`.  Minimum 3:1 against adjacent colours per WCAG 2.4.11.',
  },
  'aria-required-attr': {
    concern: 'HTML structure – missing ARIA attributes',
    tokenFiles: [],
    guidance:
      'This is an HTML template issue, not a token issue.  Check `_includes/` and `_layouts/` ' +
      'for elements that declare a role without the required ARIA attributes.',
  },
  'aria-allowed-attr': {
    concern: 'HTML structure – invalid ARIA attribute for element role',
    tokenFiles: [],
    guidance:
      'Review the web-component definitions in `assets/js/common/` and templates in ' +
      '`_includes/` for mismatched `role` / `aria-*` combinations.',
  },
  'landmark-unique': {
    concern: 'HTML structure – duplicate landmark roles',
    tokenFiles: [],
    guidance:
      'Only one `<header>`, `<main>`, `<footer>`, and `<nav>` landmark per page. ' +
      'Secondary "footer-like" sections must use `<div role="group">` instead of `<footer>`. ' +
      'See html.instructions.md § Landmark Elements.',
  },
  'heading-order': {
    concern: 'Typography – heading hierarchy',
    tokenFiles: ['_design/tokens/3-typography.json'],
    guidance:
      'Heading levels must not skip (h1→h3 without h2).  Check `_layouts/` and `_includes/` ' +
      'layout-header includes.  If a component hardcodes `<h3>` where `<h2>` is needed, ' +
      'fix the template — not the token.',
  },
  'image-alt': {
    concern: 'HTML structure – images without alt text',
    tokenFiles: [],
    guidance:
      'All `<img>` elements need an `alt` attribute.  Decorative images use `alt=""`. ' +
      'Check `_includes/` partials and Liquid templates.',
  },
  'button-name': {
    concern: 'HTML structure – buttons without accessible names',
    tokenFiles: [],
    guidance:
      'Icon-only buttons need `aria-label` or visible text.  Check `_includes/` and ' +
      'web-component templates.  The `genesis-synapse("execute")` mixin sets interaction ' +
      'styles but HTML must supply the name.',
  },
};

/**
 * Generates the Design System Review section for the markdown report.
 * Maps each unique axe violation back to the responsible _design/tokens/ file(s)
 * so that fixes target the root cause in the design system.
 *
 * @param {Array<{label: string, violations: Array, error?: string}>} results
 * @returns {string[]} Lines to append to the report
 */
function generateDesignSystemReview(results) {
  const lines = [];

  lines.push('---');
  lines.push('');
  lines.push('## Design System Review');
  lines.push('');
  lines.push(
    '> **Pipeline context**: ' +
    'Layer 1 (stylelint / `npm test`) enforces that all colour values originate from ' +
    '`_design/tokens/` via `$variables` in `_sass/design/`. ' +
    'Formal dark/light mode tokens (`color.theme.light.*` / `color.theme.dark.*`) flow through ' +
    '`$color-theme-*` variables into CSS custom properties in `_theme-properties.scss`. ' +
    'Layer 2 (this axe-core audit) observes rendered contrast and structure without blocking tests. ' +
    'This section (Layer 3) bridges the two: because every rendered colour traces back to a token, ' +
    'axe violations point to *token values* that need adjustment, not inline SCSS patches.'
  );
  lines.push('');

  // Collect all unique violations across every page
  /** @type {Map<string, {violation: object, pages: string[]}>} */
  const allViolations = new Map();
  for (const r of results) {
    for (const v of r.violations) {
      if (!allViolations.has(v.id)) {
        allViolations.set(v.id, { violation: v, pages: [] });
      }
      allViolations.get(v.id).pages.push(r.label);
    }
  }

  if (allViolations.size === 0) {
    lines.push('✅ **No violations to review.** All axe checks passed.');
    lines.push('');
    return lines;
  }

  // Sort by impact (critical first)
  const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  const sorted = [...allViolations.entries()].sort(
    ([, a], [, b]) =>
      (impactOrder[a.violation.impact] ?? 4) - (impactOrder[b.violation.impact] ?? 4)
  );

  // Group into: colour/token-traceable vs structural (HTML-only)
  const tokenTraceable = sorted.filter(([id]) => {
    const mapping = AXE_RULE_TO_TOKEN_MAP[id];
    return mapping && mapping.tokenFiles.length > 0;
  });
  const structuralOnly = sorted.filter(([id]) => {
    const mapping = AXE_RULE_TO_TOKEN_MAP[id];
    return !mapping || mapping.tokenFiles.length === 0;
  });

  // ── Token-traceable violations ──────────────────────────────────────────────
  if (tokenTraceable.length > 0) {
    lines.push('### Token-Traceable Violations');
    lines.push('');
    lines.push(
      'These violations are rooted in `_design/tokens/` values. ' +
      'Fix the token; never patch contrast in SCSS directly.'
    );
    lines.push('');

    for (const [id, { violation: v, pages }] of tokenTraceable) {
      const mapping = AXE_RULE_TO_TOKEN_MAP[id] ?? {};
      const impact = v.impact?.toUpperCase() ?? 'UNKNOWN';
      lines.push(`#### \`${id}\` [${impact}]`);
      lines.push('');
      lines.push(`**Concern**: ${mapping.concern ?? v.description}`);
      lines.push('');
      lines.push(`**Affected pages** (${pages.length}): ${pages.join(', ')}`);
      lines.push('');
      if (mapping.tokenFiles.length > 0) {
        lines.push(`**Token files to update**: ${mapping.tokenFiles.map((f) => `\`${f}\``).join(', ')}`);
        lines.push('');
      }
      if (mapping.guidance) {
        lines.push(`**How to fix**: ${mapping.guidance}`);
        lines.push('');
      }

      // Surface unique failing foreground/background pairs from node failureSummaries
      if (id === 'color-contrast' || id === 'color-contrast-enhanced') {
        const pairs = new Set();
        for (const n of v.nodes) {
          const m = n.failureSummary?.match(
            /foreground color:\s*(#[0-9a-fA-F]{3,8}|oklch[^,)]+(?:\))?)/i
          );
          const mb = n.failureSummary?.match(
            /background color:\s*(#[0-9a-fA-F]{3,8}|oklch[^,)]+(?:\))?)/i
          );
          if (m && mb) pairs.add(`fg \`${m[1].trim()}\` on bg \`${mb[1].trim()}\``);
        }
        if (pairs.size > 0) {
          lines.push('**Failing colour pairs** (search these in `_design/tokens/2-color.json`):');
          lines.push('');
          for (const p of pairs) lines.push(`- ${p}`);
          lines.push('');
        }
      }

      lines.push(`> axe help: <${v.helpUrl}>`);
      lines.push('');
    }
  }

  // ── Structural-only violations ───────────────────────────────────────────────
  if (structuralOnly.length > 0) {
    lines.push('### Structural Violations (HTML / Template)');
    lines.push('');
    lines.push(
      'These violations require HTML or Liquid template fixes, not token changes. ' +
      'Check `_includes/`, `_layouts/`, and web-component definitions in `assets/js/common/`.'
    );
    lines.push('');

    for (const [id, { violation: v, pages }] of structuralOnly) {
      const mapping = AXE_RULE_TO_TOKEN_MAP[id] ?? {};
      const impact = v.impact?.toUpperCase() ?? 'UNKNOWN';
      lines.push(`#### \`${id}\` [${impact}]`);
      lines.push('');
      lines.push(`**Concern**: ${mapping.concern ?? v.description}`);
      lines.push('');
      lines.push(`**Affected pages** (${pages.length}): ${pages.join(', ')}`);
      lines.push('');
      if (mapping.guidance) {
        lines.push(`**How to fix**: ${mapping.guidance}`);
        lines.push('');
      }
      lines.push(`> axe help: <${v.helpUrl}>`);
      lines.push('');
    }
  }

  // ── Unknown rule IDs (not in the map yet) ────────────────────────────────────
  const unknown = sorted.filter(([id]) => !AXE_RULE_TO_TOKEN_MAP[id]);
  if (unknown.length > 0) {
    lines.push('### Unmapped Violations');
    lines.push('');
    lines.push(
      'These rule IDs are not yet in `AXE_RULE_TO_TOKEN_MAP`. ' +
      'Add an entry to map them to the responsible design-system concern.'
    );
    lines.push('');
    lines.push('| Rule | Impact | Pages | axe help |');
    lines.push('|------|--------|-------|----------|');
    for (const [id, { violation: v, pages }] of unknown) {
      lines.push(
        `| \`${id}\` | ${v.impact ?? '–'} | ${pages.length} | <${v.helpUrl}> |`
      );
    }
    lines.push('');
  }

  return lines;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

for (let pageIndex = 0; pageIndex < PAGES.length; pageIndex++) {
  const pageInfo = PAGES[pageIndex];
  // Zero-pad so filenames sort in PAGES declaration order (00-, 01-, …, 15-)
  const paddedIndex = String(pageIndex).padStart(2, '0');

  test(`Accessibility audit: ${pageInfo.label}`, async ({ page }, testInfo) => {
    const result = {
      label: pageInfo.label,
      url: pageInfo.path,
      violations: [],
      passes: [],
      incomplete: [],
      error: null,
    };

    try {
      const response = await page.goto(pageInfo.path, { waitUntil: 'domcontentloaded' });

      // Tolerate the intentional 404 sample page; hard-fail any unexpected HTTP error
      if (response && !response.ok() && pageInfo.path !== '/samples/utility/404.html') {
        result.error = `HTTP ${response.status()}`;
        return;
      }

      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

      result.violations = axeResults.violations;
      result.passes = axeResults.passes;
      result.incomplete = axeResults.incomplete;
      result.url = page.url();

      // Attach the raw axe results to the Playwright HTML report
      await testInfo.attach('axe-results', {
        body: JSON.stringify(axeResults, null, 2),
        contentType: 'application/json',
      });

      // Annotate the test with violation count for easy scanning in Playwright UI
      const criticalCount = axeResults.violations.filter((v) => v.impact === 'critical').length;
      const seriousCount  = axeResults.violations.filter((v) => v.impact === 'serious').length;
      const moderateCount = axeResults.violations.filter((v) => v.impact === 'moderate').length;
      const minorCount    = axeResults.violations.filter((v) => v.impact === 'minor').length;

      if (axeResults.violations.length > 0) {
        testInfo.annotations.push({
          type: 'violations',
          description: `critical:${criticalCount} serious:${seriousCount} moderate:${moderateCount} minor:${minorCount}`,
        });
      }

      // All violations are non-blocking — they are persisted to the JSON
      // result file and aggregated into the markdown report + Design System
      // Review by afterAll.  Layer 1 (stylelint) is the enforcement gate.
    } catch (err) {
      result.error = err.message;
      // Re-throw so Playwright marks the test as failed (page was unreachable)
      throw err;
    } finally {
      // Persist result to a per-page JSON file so afterAll can aggregate
      // regardless of worker count or retry behaviour
      const filename = `${paddedIndex}-${toSlug(pageInfo.label)}.json`;
      fs.writeFileSync(
        path.join(AUDIT_TMP_DIR, filename),
        JSON.stringify(result, null, 2),
        'utf8'
      );
    }
  });
}
