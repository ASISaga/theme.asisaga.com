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
 * Design:
 *   - Each test writes its result as a JSON file under tests/.audit-results/
 *   - afterAll aggregates all JSON files and writes the markdown report
 *   - Tests FAIL on critical/serious axe violations (including color-contrast)
 *     so that regressions are caught in CI before they reach production.
 *   - The full markdown report is always written for documentation purposes.
 *
 * Gating policy:
 *   BLOCKED_RULES lists axe rule IDs that must have zero violations.
 *   Any serious or critical violation outside that list also fails the test.
 *   Moderate/minor violations are still recorded in the report but do not fail.
 */

// Axe rule IDs that are hard-blocked regardless of impact level.
// Add new rules here when a class of violations must be gated.
const BLOCKED_RULES = [
  'color-contrast',         // WCAG 1.4.3 — text must meet 4.5:1 on all surfaces
  'color-contrast-enhanced', // WCAG 1.4.6 — enhanced (AAA) ratio
];

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

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join('\n'), 'utf8');
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

      // ── Gate: fail on blocked rules and on any critical / serious violation ──
      //
      // BLOCKED_RULES (e.g. color-contrast) must have zero violations at any
      // impact level.  Beyond that, any critical or serious axe violation also
      // fails the test so regressions are caught in CI.
      //
      // The markdown report is still written (in afterAll) for full context.

      const blockedViolations = axeResults.violations.filter((v) =>
        BLOCKED_RULES.includes(v.id)
      );
      if (blockedViolations.length > 0) {
        const msgs = blockedViolations.flatMap((v) =>
          v.nodes.map((n) => `  [${v.id}] ${n.target.join(', ')}: ${n.failureSummary ?? ''}`)
        );
        expect(
          blockedViolations,
          `Blocked axe rule(s) have violations on "${pageInfo.label}":\n${msgs.join('\n')}`
        ).toHaveLength(0);
      }

      const gatedViolations = axeResults.violations.filter(
        (v) => !BLOCKED_RULES.includes(v.id) && (v.impact === 'critical' || v.impact === 'serious')
      );
      if (gatedViolations.length > 0) {
        const msgs = gatedViolations.flatMap((v) =>
          v.nodes.map((n) => `  [${v.impact}/${v.id}] ${n.target.join(', ')}: ${n.failureSummary ?? ''}`)
        );
        expect(
          gatedViolations,
          `Critical/serious axe violation(s) on "${pageInfo.label}":\n${msgs.join('\n')}`
        ).toHaveLength(0);
      }
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
