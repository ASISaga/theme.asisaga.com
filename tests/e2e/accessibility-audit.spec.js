import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Audit for Genesis Theme
 *
 * Uses axe-core to audit index.html and all sample pages linked from it.
 * Each test captures full axe results; a summary attachment is saved for
 * every page so the Playwright HTML report contains a detailed breakdown.
 *
 * Pages audited:
 *   - / (index.html)
 *   - /samples/application/chatroom.html
 *   - /samples/application/dashboard.html
 *   - /samples/application/search.html
 *   - /samples/application/settings.html
 *   - /samples/content-driven/archive.html
 *   - /samples/content-driven/article.html
 *   - /samples/content-driven/post.html
 *   - /samples/content-driven/profile.html
 *   - /samples/knowledge/docs.html
 *   - /samples/knowledge/faq.html
 *   - /samples/marketing/landing.html
 *   - /samples/marketing/gallery.html
 *   - /samples/marketing/form.html
 *   - /samples/utility/404.html
 *   - /samples/utility/splash.html
 */

/** Max characters to show for an HTML snippet in text and Markdown reports */
const HTML_SNIPPET_LENGTH_TEXT = 120;
const HTML_SNIPPET_LENGTH_MARKDOWN = 200;

/** All pages to audit — path relative to baseURL */
const AUDIT_PAGES = [
  { name: 'index', path: '/' },
  { name: 'application/chatroom', path: '/samples/application/chatroom.html' },
  { name: 'application/dashboard', path: '/samples/application/dashboard.html' },
  { name: 'application/search', path: '/samples/application/search.html' },
  { name: 'application/settings', path: '/samples/application/settings.html' },
  { name: 'content-driven/archive', path: '/samples/content-driven/archive.html' },
  { name: 'content-driven/article', path: '/samples/content-driven/article.html' },
  { name: 'content-driven/post', path: '/samples/content-driven/post.html' },
  { name: 'content-driven/profile', path: '/samples/content-driven/profile.html' },
  { name: 'knowledge/docs', path: '/samples/knowledge/docs.html' },
  { name: 'knowledge/faq', path: '/samples/knowledge/faq.html' },
  { name: 'marketing/landing', path: '/samples/marketing/landing.html' },
  { name: 'marketing/gallery', path: '/samples/marketing/gallery.html' },
  { name: 'marketing/form', path: '/samples/marketing/form.html' },
  { name: 'utility/404', path: '/samples/utility/404.html' },
  { name: 'utility/splash', path: '/samples/utility/splash.html' },
];

/**
 * Format a single axe violation into a readable string.
 * @param {import('axe-core').Result} v
 * @returns {string}
 */
function formatViolation(v) {
  const nodeLines = v.nodes.map((n, i) => {
    const selector = n.target?.join(', ') ?? '(unknown)';
    const html = n.html?.substring(0, HTML_SNIPPET_LENGTH_TEXT) ?? '';
    const failureSummary = n.failureSummary ?? '';
    return `    Node ${i + 1}: ${selector}\n      HTML: ${html}\n      Fix: ${failureSummary}`;
  });
  return [
    `  [${v.impact?.toUpperCase() ?? 'UNKNOWN'}] ${v.id}: ${v.help}`,
    `  Description: ${v.description}`,
    `  Help URL: ${v.helpUrl}`,
    `  Affected nodes (${v.nodes.length}):`,
    ...nodeLines,
  ].join('\n');
}

/**
 * Build a full report string for one page's axe results.
 * @param {string} pageLabel
 * @param {string} url
 * @param {import('axe-core').AxeResults} results
 * @returns {string}
 */
function buildPageReport(pageLabel, url, results) {
  const lines = [];
  lines.push(`${'='.repeat(80)}`);
  lines.push(`PAGE: ${pageLabel}`);
  lines.push(`URL:  ${url}`);
  lines.push(`${'='.repeat(80)}`);

  // Summary counts
  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious  = results.violations.filter(v => v.impact === 'serious');
  const moderate = results.violations.filter(v => v.impact === 'moderate');
  const minor    = results.violations.filter(v => v.impact === 'minor');

  lines.push('');
  lines.push('SUMMARY');
  lines.push('-------');
  lines.push(`  Total violations : ${results.violations.length}`);
  lines.push(`  Critical         : ${critical.length}`);
  lines.push(`  Serious          : ${serious.length}`);
  lines.push(`  Moderate         : ${moderate.length}`);
  lines.push(`  Minor            : ${minor.length}`);
  lines.push(`  Passes           : ${results.passes.length}`);
  lines.push(`  Incomplete       : ${results.incomplete.length}`);
  lines.push('');

  if (results.violations.length === 0) {
    lines.push('✅ No violations found.');
  } else {
    lines.push('VIOLATIONS');
    lines.push('----------');
    results.violations.forEach((v, i) => {
      lines.push(`\n${i + 1}. ${formatViolation(v)}`);
    });
  }

  if (results.incomplete.length > 0) {
    lines.push('');
    lines.push('INCOMPLETE (Needs Manual Review)');
    lines.push('--------------------------------');
    results.incomplete.forEach((v, i) => {
      lines.push(`\n${i + 1}. [${v.impact?.toUpperCase() ?? 'UNKNOWN'}] ${v.id}: ${v.help}`);
      lines.push(`   ${v.description}`);
    });
  }

  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Accessibility Audit — axe-core', () => {

  for (const { name, path } of AUDIT_PAGES) {
    test(`[a11y] ${name}`, async ({ page }, testInfo) => {
      await page.goto(path);
      // Wait for the page to be fully loaded
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        // Audit the full page
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

      // Build human-readable report for this page
      const pageReport = buildPageReport(name, page.url(), results);

      // Attach report to the Playwright test result so it appears in the HTML report
      await testInfo.attach(`a11y-report-${name.replace(/\//g, '-')}`, {
        contentType: 'text/plain',
        body: pageReport,
      });

      // Attach raw JSON results for machine-readable consumption
      await testInfo.attach(`a11y-results-${name.replace(/\//g, '-')}.json`, {
        contentType: 'application/json',
        body: JSON.stringify(results, null, 2),
      });

      // Fail the test if there are critical or serious violations
      const blocking = results.violations.filter(v =>
        v.impact === 'critical' || v.impact === 'serious'
      );

      if (blocking.length > 0) {
        const summary = blocking.map(v =>
          `[${v.impact?.toUpperCase()}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`
        ).join('\n');
        // Use a soft assertion so all pages are still audited even when one fails
        expect.soft(blocking.length, `Critical/serious a11y violations on ${name}:\n${summary}`).toBe(0);
      }
    });
  }

  // -----------------------------------------------------------------------
  // Consolidated report test — runs last, writes docs/accessibility-audit-report.md
  //
  // Note: This test re-audits all pages in a single browser session to collect
  // all results into one coherent Markdown document. The individual per-page
  // tests above serve a different purpose: isolated Playwright reporting with
  // retries and soft assertions. The duplication is intentional — individual
  // tests catch regressions page-by-page, while this test produces the
  // human-readable audit report artifact.
  // -----------------------------------------------------------------------
  test('generate consolidated audit report', async ({ page }, testInfo) => {
    const fs = await import('fs');
    const path = await import('path');

    const allPageResults = [];

    for (const pageSpec of AUDIT_PAGES) {
      await page.goto(pageSpec.path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

      allPageResults.push({ ...pageSpec, url: page.url(), results });
    }

    // Build consolidated markdown report
    const reportLines = [];
    const now = new Date().toISOString();

    reportLines.push('# Accessibility Audit Report');
    reportLines.push('');
    reportLines.push('**Tool**: [axe-core](https://github.com/dequelabs/axe-core) via [@axe-core/playwright](https://github.com/dequelabs/axe-core-packages/tree/develop/packages/playwright)');
    reportLines.push(`**Standards**: WCAG 2.0 A/AA, WCAG 2.1 A/AA, Best Practices`);
    reportLines.push(`**Generated**: ${now}`);
    reportLines.push(`**Base URL**: ${process.env.TEST_LOCAL ? 'http://localhost:4000' : 'https://asisaga.github.io/theme.asisaga.com'}`);
    reportLines.push('');
    reportLines.push('---');
    reportLines.push('');

    // Executive summary table
    reportLines.push('## Executive Summary');
    reportLines.push('');
    reportLines.push('| Page | Critical | Serious | Moderate | Minor | Total Violations | Passes |');
    reportLines.push('|------|----------|---------|----------|-------|-----------------|--------|');

    let grandTotal = 0;
    let grandCritical = 0;
    let grandSerious = 0;

    for (const { name, url, results } of allPageResults) {
      const critical = results.violations.filter(v => v.impact === 'critical').length;
      const serious  = results.violations.filter(v => v.impact === 'serious').length;
      const moderate = results.violations.filter(v => v.impact === 'moderate').length;
      const minor    = results.violations.filter(v => v.impact === 'minor').length;
      const total    = results.violations.length;
      const passes   = results.passes.length;

      grandTotal    += total;
      grandCritical += critical;
      grandSerious  += serious;

      const critCell = critical > 0 ? `🔴 ${critical}` : '✅ 0';
      const seriCell = serious  > 0 ? `🟠 ${serious}`  : '✅ 0';
      const modCell  = moderate > 0 ? `🟡 ${moderate}` : '✅ 0';
      const minCell  = minor    > 0 ? `🔵 ${minor}`    : '✅ 0';
      const totCell  = total    > 0 ? `**${total}**`   : '✅ 0';

      // Anchor link to detail section
      const anchor = name.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase();
      reportLines.push(`| [${name}](#${anchor}) | ${critCell} | ${seriCell} | ${modCell} | ${minCell} | ${totCell} | ${passes} |`);
    }

    reportLines.push('');
    reportLines.push(`**Grand total violations**: ${grandTotal} (${grandCritical} critical, ${grandSerious} serious)`);
    reportLines.push('');
    reportLines.push('---');
    reportLines.push('');

    // Detailed section per page
    reportLines.push('## Detailed Results');
    reportLines.push('');

    for (const { name, url, results } of allPageResults) {
      reportLines.push(`### ${name}`);
      reportLines.push('');
      reportLines.push(`**URL**: ${url}`);
      reportLines.push('');

      if (results.violations.length === 0) {
        reportLines.push('✅ **No violations found.**');
        reportLines.push('');
        reportLines.push(`- Passes: ${results.passes.length}`);
        reportLines.push(`- Incomplete (manual review): ${results.incomplete.length}`);
        reportLines.push('');
      } else {
        const critical = results.violations.filter(v => v.impact === 'critical');
        const serious  = results.violations.filter(v => v.impact === 'serious');
        const moderate = results.violations.filter(v => v.impact === 'moderate');
        const minor    = results.violations.filter(v => v.impact === 'minor');

        reportLines.push('**Violation Counts**');
        reportLines.push('');
        reportLines.push(`| Severity | Count |`);
        reportLines.push(`|----------|-------|`);
        if (critical.length > 0) reportLines.push(`| 🔴 Critical | ${critical.length} |`);
        if (serious.length  > 0) reportLines.push(`| 🟠 Serious  | ${serious.length} |`);
        if (moderate.length > 0) reportLines.push(`| 🟡 Moderate | ${moderate.length} |`);
        if (minor.length    > 0) reportLines.push(`| 🔵 Minor    | ${minor.length} |`);
        reportLines.push('');

        reportLines.push('**Violations**');
        reportLines.push('');

        for (const v of results.violations) {
          const impact = v.impact?.toUpperCase() ?? 'UNKNOWN';
          const emoji = { CRITICAL: '🔴', SERIOUS: '🟠', MODERATE: '🟡', MINOR: '🔵' }[impact] ?? '⚪';
          reportLines.push(`#### ${emoji} \`${v.id}\` — ${v.help}`);
          reportLines.push('');
          reportLines.push(`- **Impact**: ${impact}`);
          reportLines.push(`- **Description**: ${v.description}`);
          reportLines.push(`- **Help**: [${v.helpUrl}](${v.helpUrl})`);
          reportLines.push(`- **Affected nodes**: ${v.nodes.length}`);
          reportLines.push('');
          reportLines.push('<details>');
          reportLines.push(`<summary>Affected nodes (${v.nodes.length})</summary>`);
          reportLines.push('');
          for (const [i, node] of v.nodes.entries()) {
            const selector = node.target?.join(', ') ?? '(unknown)';
            const html = (node.html ?? '').substring(0, HTML_SNIPPET_LENGTH_MARKDOWN);
            const fix = (node.failureSummary ?? '').split('\n').map(l => `  ${l}`).join('\n');
            reportLines.push(`**Node ${i + 1}**`);
            reportLines.push('');
            reportLines.push(`Selector: \`${selector}\``);
            reportLines.push('');
            reportLines.push('```html');
            reportLines.push(html);
            reportLines.push('```');
            reportLines.push('');
            reportLines.push(`Fix: ${fix}`);
            reportLines.push('');
          }
          reportLines.push('</details>');
          reportLines.push('');
        }

        if (results.incomplete.length > 0) {
          reportLines.push('**Incomplete — Needs Manual Review**');
          reportLines.push('');
          for (const v of results.incomplete) {
            const impact = v.impact?.toUpperCase() ?? 'UNKNOWN';
            reportLines.push(`- \`${v.id}\` [${impact}]: ${v.help}`);
          }
          reportLines.push('');
        }
      }

      reportLines.push('---');
      reportLines.push('');
    }

    // Write report to docs/
    const reportPath = path.resolve(
      process.cwd(),
      'docs',
      'accessibility-audit-report.md'
    );
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf8');

    // Also attach as a Playwright artifact
    await testInfo.attach('accessibility-audit-report.md', {
      contentType: 'text/markdown',
      body: reportLines.join('\n'),
    });

    console.log(`\nAccessibility audit report written to: ${reportPath}`);

    // Soft-fail summary: fail test if any critical/serious violations exist across all pages
    if (grandCritical + grandSerious > 0) {
      expect.soft(
        grandCritical + grandSerious,
        `Found ${grandCritical} critical and ${grandSerious} serious violations across all pages. See docs/accessibility-audit-report.md`
      ).toBe(0);
    }
  });
});
