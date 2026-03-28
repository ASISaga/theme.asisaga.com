# Accessibility Audit Report

> **Generated**: 2026-03-28T05:34:14.274Z  
> **Tool**: axe-core / @axe-core/playwright  
> **Standard**: WCAG 2.1 Level AA  
> **Pages audited**: 16

## Executive Summary

| Metric | Count |
|--------|-------|
| Pages audited | 16 |
| Total violations | 103 |
| ├─ Critical | 5 |
| ├─ Serious  | 9 |
| ├─ Moderate | 89 |
| └─ Minor    | 0 |
| Passes (rules that passed) | 711 |
| Incomplete (needs manual review) | 48 |

---

## Page-by-Page Results

### Home (index.html)

**URL**: `http://localhost:4000/`  
**Violations**: 8  
**Passes**: 45  
**Incomplete**: 3

#### Violations

- **[SERIOUS]** `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Affected nodes (20):
    - `.samples-list > ul > li:nth-child(1) > strong`  
      HTML: `&lt;strong&gt;Application:&lt;/strong&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1
    - `li:nth-child(1) > ul > li:nth-child(1) > a`  
      HTML: `&lt;a href="/samples/application/chatroom.html"&gt;Chatroom&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `li:nth-child(1) > ul > li:nth-child(2) > a`  
      HTML: `&lt;a href="/samples/application/dashboard.html"&gt;Dashboard&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `li:nth-child(1) > ul > li:nth-child(3) > a`  
      HTML: `&lt;a href="/samples/application/search.html"&gt;Search&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `li:nth-child(1) > ul > li:nth-child(4) > a`  
      HTML: `&lt;a href="/samples/application/settings.html"&gt;Settings&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(2) > strong`  
      HTML: `&lt;strong&gt;Content-driven:&lt;/strong&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(2) > ul > li:nth-child(1) > a`  
      HTML: `&lt;a href="/samples/content-driven/archive.html"&gt;Archive&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(2) > ul > li:nth-child(2) > a`  
      HTML: `&lt;a href="/samples/content-driven/article.html"&gt;Article&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `li:nth-child(2) > ul > li:nth-child(3) > a`  
      HTML: `&lt;a href="/samples/content-driven/post.html"&gt;Post&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `li:nth-child(2) > ul > li:nth-child(4) > a`  
      HTML: `&lt;a href="/samples/content-driven/profile.html"&gt;Profile&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(3) > strong`  
      HTML: `&lt;strong&gt;Knowledge:&lt;/strong&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1
    - `a[href$="docs.html"]`  
      HTML: `&lt;a href="/samples/knowledge/docs.html"&gt;Docs&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="faq.html"]`  
      HTML: `&lt;a href="/samples/knowledge/faq.html"&gt;FAQ&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(4) > strong`  
      HTML: `&lt;strong&gt;Marketing:&lt;/strong&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(4) > ul > li:nth-child(1) > a`  
      HTML: `&lt;a href="/samples/marketing/landing.html"&gt;Landing&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(4) > ul > li:nth-child(2) > a`  
      HTML: `&lt;a href="/samples/marketing/gallery.html"&gt;Gallery&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="form.html"]`  
      HTML: `&lt;a href="/samples/marketing/form.html"&gt;Form&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.samples-list > ul > li:nth-child(5) > strong`  
      HTML: `&lt;strong&gt;Utility:&lt;/strong&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1
    - `a[href$="404.html"]`  
      HTML: `&lt;a href="/samples/utility/404.html"&gt;404&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="splash.html"]`  
      HTML: `&lt;a href="/samples/utility/splash.html"&gt;Splash&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-main-is-top-level` – Ensure the main landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-demo`  
      HTML: `&lt;main class="genesis-demo"&gt;`  
      Fix: Fix any of the following:   The main landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-no-duplicate-main` – Ensure the document has at most one main landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=playwright>  
  Affected nodes (1):
    - `#skip-target`  
      HTML: `&lt;main id="skip-target" tabindex="-1" class="genesis-main"&gt;`  
      Fix: Fix any of the following:   Document has more than one main landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (3):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `#skip-target`  
      HTML: `&lt;main id="skip-target" tabindex="-1" class="genesis-main"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 114

---

### Application – Chatroom

**URL**: `http://localhost:4000/samples/application/chatroom.html`  
**Violations**: 6  
**Passes**: 45  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `.chatroom-input`  
      HTML: `&lt;footer class="chatroom-input"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

- **[SERIOUS]** `scrollable-region-focusable` – Ensure elements that have scrollable content are accessible by keyboard  
  Help: <https://dequeuniversity.com/rules/axe/4.11/scrollable-region-focusable?application=playwright>  
  Affected nodes (1):
    - `.chatroom-messages`  
      HTML: `&lt;div class="chatroom-messages"&gt;`  
      Fix: Fix any of the following:   Element should have focusable content   Element should be focusable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 21

---

### Application – Dashboard

**URL**: `http://localhost:4000/samples/application/dashboard.html`  
**Violations**: 7  
**Passes**: 47  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `heading-order` – Ensure the order of headings is semantically correct  
  Help: <https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright>  
  Affected nodes (1):
    - `article[data-widget-id="widget-0"] > .dashboard-widget__header > h3`  
      HTML: `&lt;h3 class="dashboard-widget__title"&gt;Users&lt;/h3&gt;`  
      Fix: Fix any of the following:   Heading order invalid

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-complementary-is-top-level` – Ensure the complementary landmark or aside is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright>  
  Affected nodes (1):
    - `aside`  
      HTML: `&lt;aside class="dashboard__side-panel"&gt;`  
      Fix: Fix any of the following:   The null landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 2

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 53

---

### Application – Search

**URL**: `http://localhost:4000/samples/application/search.html`  
**Violations**: 9  
**Passes**: 44  
**Incomplete**: 3

#### Violations

- **[SERIOUS]** `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Affected nodes (19):
    - `a[href$="layouts"]`  
      HTML: `&lt;a href="/docs/layouts"&gt;Getting Started with &lt;mark&gt;Jekyll&lt;/mark&gt; &lt;mark&gt;Layouts&lt;/mark&gt;&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `article:nth-child(1) > .search-result__meta > span:nth-child(1)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-folder" aria-hidden="true"&gt;&lt;/i&gt; Documentation&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(1) > .search-result__meta > span:nth-child(2)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-calendar" aria-hidden="true"&gt;&lt;/i&gt; Jan 15, 2024&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(1) > .search-result__meta > span:nth-child(3)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-user" aria-hidden="true"&gt;&lt;/i&gt; John Doe&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="layout-taxonomy"]`  
      HTML: `&lt;a href="/docs/layout-taxonomy"&gt;&lt;mark&gt;Layout&lt;/mark&gt; Taxonomy&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `article:nth-child(2) > .search-result__meta > span:nth-child(1)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-folder" aria-hidden="true"&gt;&lt;/i&gt; Documentation&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(2) > .search-result__meta > span:nth-child(2)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-calendar" aria-hidden="true"&gt;&lt;/i&gt; Jan 12, 2024&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(2) > .search-result__meta > span:nth-child(3)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-user" aria-hidden="true"&gt;&lt;/i&gt; Sarah Johnson&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="post"]`  
      HTML: `&lt;a href="/samples/post"&gt;Sample Post Using &lt;mark&gt;Layout&lt;/mark&gt;&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `article:nth-child(3) > .search-result__meta > span:nth-child(1)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-folder" aria-hidden="true"&gt;&lt;/i&gt; Sample&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(3) > .search-result__meta > span:nth-child(2)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-calendar" aria-hidden="true"&gt;&lt;/i&gt; Jan 15, 2024&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="quick-reference"]`  
      HTML: `&lt;a href="/docs/quick-reference"&gt;&lt;mark&gt;Layout&lt;/mark&gt; Quick Reference&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `article:nth-child(4) > .search-result__meta > span:nth-child(1)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-folder" aria-hidden="true"&gt;&lt;/i&gt; Documentation&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(4) > .search-result__meta > span:nth-child(2)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-calendar" aria-hidden="true"&gt;&lt;/i&gt; Jan 20, 2024&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="implementation-guide"]`  
      HTML: `&lt;a href="/docs/implementation-guide"&gt;Implementation Guide&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `article:nth-child(5) > .search-result__meta > span:nth-child(1)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-folder" aria-hidden="true"&gt;&lt;/i&gt; Documentation&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(5) > .search-result__meta > span:nth-child(2)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-calendar" aria-hidden="true"&gt;&lt;/i&gt; Jan 18, 2024&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(5) > .search-result__meta > span:nth-child(3)`  
      HTML: `&lt;span&gt;&lt;i class="far fa-user" aria-hidden="true"&gt;&lt;/i&gt; Mike Park&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `.search-pagination__link[href="#"]:nth-child(5)`  
      HTML: `&lt;a href="#" class="search-pagination__link"&gt;Next&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-complementary-is-top-level` – Ensure the complementary landmark or aside is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright>  
  Affected nodes (1):
    - `aside`  
      HTML: `&lt;aside class="search__sidebar" aria-label="Search filters"&gt;`  
      Fix: Fix any of the following:   The complementary landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

- **[SERIOUS]** `link-in-text-block` – Ensure links are distinguished from surrounding text in a way that does not rely on color  
  Help: <https://dequeuniversity.com/rules/axe/4.11/link-in-text-block?application=playwright>  
  Affected nodes (4):
    - `.search-pagination__link--active`  
      HTML: `&lt;a href="#" class="search-pagination__link search-pagination__link--active" aria-current="page"&gt;1&lt;/a&gt;`  
      Fix: Fix any of the following:   The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)   The link has no styling (such as underline) to distinguish it from the surrounding text
    - `.search-pagination__link[href="#"]:nth-child(3)`  
      HTML: `&lt;a href="#" class="search-pagination__link"&gt;2&lt;/a&gt;`  
      Fix: Fix any of the following:   The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)   The link has no styling (such as underline) to distinguish it from the surrounding text
    - `.search-pagination__link[href="#"]:nth-child(4)`  
      HTML: `&lt;a href="#" class="search-pagination__link"&gt;3&lt;/a&gt;`  
      Fix: Fix any of the following:   The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)   The link has no styling (such as underline) to distinguish it from the surrounding text
    - `.search-pagination__link[href="#"]:nth-child(5)`  
      HTML: `&lt;a href="#" class="search-pagination__link"&gt;Next&lt;/a&gt;`  
      Fix: Fix any of the following:   The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)   The link has no styling (such as underline) to distinguish it from the surrounding text

- **[MODERATE]** `page-has-heading-one` – Ensure that the page, or at least one of its frames contains a level-one heading  
  Help: <https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright>  
  Affected nodes (1):
    - `html`  
      HTML: `&lt;html lang="en-US"&gt;`  
      Fix: Fix all of the following:   Page must have a level-one heading

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 13

---

### Application – Settings

**URL**: `http://localhost:4000/samples/application/settings.html`  
**Violations**: 8  
**Passes**: 46  
**Incomplete**: 3

#### Violations

- **[CRITICAL]** `aria-required-parent` – Ensure elements with an ARIA role that require parent roles are contained by them  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright>  
  Affected nodes (5):
    - `.settings-nav-link--active`  
      HTML: `&lt;a class="settings-nav-link settings-nav-link--active" href="#profile" data-tab-toggle="" aria-current="page" role="tab" aria-selected="true" tabindex="0"&gt;
                
                &lt;i class="fas fa-user" aria-hidden="true"&gt;&lt;/i&gt;
                
                Profile
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `a[href$="#security"]`  
      HTML: `&lt;a class="settings-nav-link" href="#security" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1"&gt;
                
                &lt;i class="fas fa-lock" aria-hidden="true"&gt;&lt;/i&gt;
                
                Security
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `a[href$="#notifications"]`  
      HTML: `&lt;a class="settings-nav-link" href="#notifications" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1"&gt;
                
                &lt;i class="fas fa-bell" aria-hidden="true"&gt;&lt;/i&gt;
                
                Notifications
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `a[href$="#privacy"]`  
      HTML: `&lt;a class="settings-nav-link" href="#privacy" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1"&gt;
                
                &lt;i class="fas fa-shield-alt" aria-hidden="true"&gt;&lt;/i&gt;
                
                Privacy
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `a[href$="#preferences"]`  
      HTML: `&lt;a class="settings-nav-link" href="#preferences" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1"&gt;
                
                &lt;i class="fas fa-cog" aria-hidden="true"&gt;&lt;/i&gt;
                
                Preferences
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist

- **[MODERATE]** `heading-order` – Ensure the order of headings is semantically correct  
  Help: <https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright>  
  Affected nodes (1):
    - `#profile > genesis-cognition[intent="motive"] > h3`  
      HTML: `&lt;h3 class="settings-pane__heading"&gt;Profile&lt;/h3&gt;`  
      Fix: Fix any of the following:   Heading order invalid

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-complementary-is-top-level` – Ensure the complementary landmark or aside is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright>  
  Affected nodes (1):
    - `aside`  
      HTML: `&lt;aside class="settings-sidebar" aria-label="Settings navigation"&gt;`  
      Fix: Fix any of the following:   The complementary landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (3):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-environment[logic="navigation-sidebar"]`  
      HTML: `&lt;genesis-environment logic="navigation-sidebar" role="navigation" aria-label="Sidebar navigation" data-logic="navigation-sidebar" data-viewport="desktop"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 23

---

### Content-Driven – Archive

**URL**: `http://localhost:4000/samples/content-driven/archive.html`  
**Violations**: 7  
**Passes**: 45  
**Incomplete**: 3

#### Violations

- **[SERIOUS]** `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Affected nodes (12):
    - `article:nth-child(3) > .archive-item__content > h3 > .archive-item__link`  
      HTML: `&lt;a href="/samples/content-driven/sample-post.html" class="archive-item__link"&gt;Getting Started with Jekyll Layouts&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `time[datetime="2024-01-15"]`  
      HTML: `&lt;time datetime="2024-01-15" class="archive-item__date"&gt;January 15, 2024&lt;/time&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(3) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(1)`  
      HTML: `&lt;span class="archive-item__tag"&gt;Jekyll&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(3) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(2)`  
      HTML: `&lt;span class="archive-item__tag"&gt;Tutorial&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(4) > .archive-item__content > h3 > .archive-item__link`  
      HTML: `&lt;a href="/samples/content-driven/sample-article.html" class="archive-item__link"&gt;The Architecture of Modern Web Layouts&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `time[datetime="2024-01-20"]`  
      HTML: `&lt;time datetime="2024-01-20" class="archive-item__date"&gt;January 20, 2024&lt;/time&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(4) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(1)`  
      HTML: `&lt;span class="archive-item__tag"&gt;CSS&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(4) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(2)`  
      HTML: `&lt;span class="archive-item__tag"&gt;Architecture&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href="#"]`  
      HTML: `&lt;a href="#" class="archive-item__link"&gt;Building Responsive Galleries&lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1
    - `time[datetime="2024-01-10"]`  
      HTML: `&lt;time datetime="2024-01-10" class="archive-item__date"&gt;January 10, 2024&lt;/time&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(5) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(1)`  
      HTML: `&lt;span class="archive-item__tag"&gt;Gallery&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `article:nth-child(5) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(2)`  
      HTML: `&lt;span class="archive-item__tag"&gt;Responsive&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

- **[MODERATE]** `heading-order` – Ensure the order of headings is semantically correct  
  Help: <https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright>  
  Affected nodes (1):
    - `article:nth-child(3) > .archive-item__content > h3`  
      HTML: `&lt;h3 class="archive-item__title"&gt;
      &lt;a href="/samples/content-driven/sample-post.html" class="archive-item__link"&gt;Getting Started with Jekyll Layouts&lt;/a&gt;
    &lt;/h3&gt;`  
      Fix: Fix any of the following:   Heading order invalid

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 11

---

### Content-Driven – Article

**URL**: `http://localhost:4000/samples/content-driven/article.html`  
**Violations**: 4  
**Passes**: 44  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 17

---

### Content-Driven – Post

**URL**: `http://localhost:4000/samples/content-driven/post.html`  
**Violations**: 6  
**Passes**: 42  
**Incomplete**: 3

#### Violations

- **[SERIOUS]** `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Affected nodes (2):
    - `span[aria-label="Categories"]`  
      HTML: `&lt;span class="post__taxonomy-label" aria-label="Categories"&gt;
      &lt;i class="fas fa-folder" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;`  
      Fix: Fix all of the following:   aria-label attribute cannot be used on a span with no valid role attribute.
    - `span[aria-label="Tags"]`  
      HTML: `&lt;span class="post__taxonomy-label" aria-label="Tags"&gt;
      &lt;i class="fas fa-tags" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;`  
      Fix: Fix all of the following:   aria-label attribute cannot be used on a span with no valid role attribute.

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `.post__footer-cta`  
      HTML: `&lt;footer class="post__footer-cta"&gt;
  
  &lt;genesis-cognition intent="axiom"&gt;
    &lt;h2 class="post__cta-title"&gt;Share this post&lt;/h2&gt;
  &lt;/genesis-cognition&gt;
  
  
  
  
  
  &lt;genesis-synapse vector="execute"&gt;
    &lt;a href="#share" class="post__cta-button"&gt;Share&lt;/a&gt;
  &lt;/genesis-synapse&gt;
  
&lt;/footer&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 19

---

### Content-Driven – Profile

**URL**: `http://localhost:4000/samples/content-driven/profile.html`  
**Violations**: 5  
**Passes**: 42  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 18

---

### Knowledge – Docs

**URL**: `http://localhost:4000/samples/knowledge/docs.html`  
**Violations**: 6  
**Passes**: 45  
**Incomplete**: 3

#### Violations

- **[SERIOUS]** `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Affected nodes (6):
    - `a[href$="getting-started"]`  
      HTML: `&lt;a class="docs-nav-link" href="/docs/getting-started"&gt;
                Getting Started
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="layouts"]`  
      HTML: `&lt;a class="docs-nav-link" href="/docs/layouts"&gt;
                Layouts
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="base"]`  
      HTML: `&lt;a class="docs-nav-link" href="/docs/layouts/base"&gt;
                    Base Templates
                  &lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="specialized"]`  
      HTML: `&lt;a class="docs-nav-link" href="/docs/layouts/specialized"&gt;
                    Specialized
                  &lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="components"]`  
      HTML: `&lt;a class="docs-nav-link" href="/docs/components"&gt;
                Components
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `a[href$="customization"]`  
      HTML: `&lt;a class="docs-nav-link" href="/docs/customization"&gt;
                Customization
              &lt;/a&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 18

---

### Knowledge – FAQ

**URL**: `http://localhost:4000/samples/knowledge/faq.html`  
**Violations**: 8  
**Passes**: 46  
**Incomplete**: 3

#### Violations

- **[CRITICAL]** `aria-required-children` – Ensure elements with an ARIA role that require child roles contain them  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=playwright>  
  Affected nodes (1):
    - `genesis-navigation`  
      HTML: `&lt;genesis-navigation type="tabs" data-type="tabs" data-orientation="horizontal" role="tablist"&gt;`  
      Fix: Fix any of the following:   Element has children which are not allowed: [role=group]

- **[CRITICAL]** `aria-required-parent` – Ensure elements with an ARIA role that require parent roles are contained by them  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright>  
  Affected nodes (4):
    - `.faq__category--active`  
      HTML: `&lt;button type="button" class="faq__category faq__category--active" role="tab" tabindex="0" aria-selected="false"&gt;All&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `.faq__category[role="tab"][type="button"]:nth-child(2)`  
      HTML: `&lt;button type="button" class="faq__category" role="tab" tabindex="-1" aria-selected="false"&gt;General&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `.faq__category[role="tab"][type="button"]:nth-child(3)`  
      HTML: `&lt;button type="button" class="faq__category" role="tab" tabindex="-1" aria-selected="false"&gt;Technical&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `.faq__category[role="tab"][type="button"]:nth-child(4)`  
      HTML: `&lt;button type="button" class="faq__category" role="tab" tabindex="-1" aria-selected="false"&gt;Licensing&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist

- **[MODERATE]** `heading-order` – Ensure the order of headings is semantically correct  
  Help: <https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright>  
  Affected nodes (1):
    - `#faq-1`  
      HTML: `&lt;h3 class="faq-item__header" id="faq-1"&gt;
    &lt;button class="faq-item__button" type="button" data-collapse-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1"&gt;
      What ships with the theme?
    &lt;/button&gt;
  &lt;/h3&gt;`  
      Fix: Fix any of the following:   Heading order invalid

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `.faq__footer-cta`  
      HTML: `&lt;footer class="faq__footer-cta"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 9

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 28

---

### Marketing – Landing

**URL**: `http://localhost:4000/samples/marketing/landing.html`  
**Violations**: 6  
**Passes**: 44  
**Incomplete**: 3

#### Violations

- **[SERIOUS]** `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Affected nodes (2):
    - `blockquote:nth-child(1) > genesis-cognition[intent="gloss"] > cite`  
      HTML: `&lt;cite&gt;— Alex Chen, Front-end Engineer&lt;/cite&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.04 (foreground color: #fdfcf8, background color: #faf7ec, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `blockquote:nth-child(2) > genesis-cognition[intent="gloss"] > cite`  
      HTML: `&lt;cite&gt;— Maria Garcia, Design Systems Lead&lt;/cite&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.04 (foreground color: #fdfcf8, background color: #faf7ec, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `.landing__footer-cta`  
      HTML: `&lt;footer class="landing__footer-cta"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 10

---

### Marketing – Gallery

**URL**: `http://localhost:4000/samples/marketing/gallery.html`  
**Violations**: 8  
**Passes**: 42  
**Incomplete**: 3

#### Violations

- **[CRITICAL]** `aria-required-children` – Ensure elements with an ARIA role that require child roles contain them  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=playwright>  
  Affected nodes (1):
    - `genesis-navigation`  
      HTML: `&lt;genesis-navigation type="tabs" data-type="tabs" data-orientation="horizontal" role="tablist"&gt;`  
      Fix: Fix any of the following:   Element has children which are not allowed: [role=group]

- **[CRITICAL]** `aria-required-parent` – Ensure elements with an ARIA role that require parent roles are contained by them  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright>  
  Affected nodes (4):
    - `.gallery__filter--active`  
      HTML: `&lt;button class="gallery__filter gallery__filter--active" data-filter="all" role="tab" tabindex="0" aria-selected="false"&gt;All&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `button[data-filter="web"]`  
      HTML: `&lt;button class="gallery__filter" data-filter="web" role="tab" tabindex="-1" aria-selected="false"&gt;Web&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `button[data-filter="mobile"]`  
      HTML: `&lt;button class="gallery__filter" data-filter="mobile" role="tab" tabindex="-1" aria-selected="false"&gt;Mobile&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist
    - `button[data-filter="brand"]`  
      HTML: `&lt;button class="gallery__filter" data-filter="brand" role="tab" tabindex="-1" aria-selected="false"&gt;Brand&lt;/button&gt;`  
      Fix: Fix any of the following:   Required ARIA parent role not present: tablist

- **[SERIOUS]** `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Affected nodes (12):
    - `figure[data-category="web"]:nth-child(3) > figcaption > .gallery-item__title`  
      HTML: `&lt;span class="gallery-item__title"&gt;E-commerce Platform&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="web"]:nth-child(3) > figcaption > .gallery-item__description`  
      HTML: `&lt;span class="gallery-item__description"&gt;End-to-end shopping experience&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="mobile"]:nth-child(4) > figcaption > .gallery-item__title`  
      HTML: `&lt;span class="gallery-item__title"&gt;Mobile Banking&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="mobile"]:nth-child(4) > figcaption > .gallery-item__description`  
      HTML: `&lt;span class="gallery-item__description"&gt;Secure, fast financial tools&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="brand"]:nth-child(5) > figcaption > .gallery-item__title`  
      HTML: `&lt;span class="gallery-item__title"&gt;Corporate Identity&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="brand"]:nth-child(5) > figcaption > .gallery-item__description`  
      HTML: `&lt;span class="gallery-item__description"&gt;Complete brand system&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="web"]:nth-child(6) > figcaption > .gallery-item__title`  
      HTML: `&lt;span class="gallery-item__title"&gt;Portfolio&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="web"]:nth-child(6) > figcaption > .gallery-item__description`  
      HTML: `&lt;span class="gallery-item__description"&gt;Curated creative showcase&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="mobile"]:nth-child(7) > figcaption > .gallery-item__title`  
      HTML: `&lt;span class="gallery-item__title"&gt;Fitness Tracker&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="mobile"]:nth-child(7) > figcaption > .gallery-item__description`  
      HTML: `&lt;span class="gallery-item__description"&gt;Health metrics at a glance&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="brand"]:nth-child(8) > figcaption > .gallery-item__title`  
      HTML: `&lt;span class="gallery-item__title"&gt;Startup Brand&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
    - `figure[data-category="brand"]:nth-child(8) > figcaption > .gallery-item__description`  
      HTML: `&lt;span class="gallery-item__description"&gt;Tech identity from zero&lt;/span&gt;`  
      Fix: Fix any of the following:   Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 13

---

### Marketing – Form

**URL**: `http://localhost:4000/samples/marketing/form.html`  
**Violations**: 5  
**Passes**: 46  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `.genesis-footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `.form__footer`  
      HTML: `&lt;footer class="form__footer"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 5

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 23

---

### Utility – 404

**URL**: `http://localhost:4000/samples/utility/404.html`  
**Violations**: 5  
**Passes**: 42  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 1

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 16

---

### Utility – Splash

**URL**: `http://localhost:4000/samples/utility/splash.html`  
**Violations**: 5  
**Passes**: 46  
**Incomplete**: 3

#### Violations

- **[MODERATE]** `landmark-banner-is-top-level` – Ensure the banner landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright>  
  Affected nodes (1):
    - `header`  
      HTML: `&lt;header class="genesis-header"&gt;`  
      Fix: Fix any of the following:   The banner landmark is contained in another landmark.

- **[MODERATE]** `landmark-contentinfo-is-top-level` – Ensure the contentinfo landmark is at top level  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright>  
  Affected nodes (1):
    - `footer`  
      HTML: `&lt;footer class="genesis-footer"&gt;`  
      Fix: Fix any of the following:   The contentinfo landmark is contained in another landmark.

- **[MODERATE]** `landmark-no-duplicate-banner` – Ensure the document has at most one banner landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright>  
  Affected nodes (1):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   Document has more than one banner landmark

- **[MODERATE]** `landmark-no-duplicate-contentinfo` – Ensure the document has at most one contentinfo landmark  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright>  
  Affected nodes (1):
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   Document has more than one contentinfo landmark

- **[MODERATE]** `landmark-unique` – Ensure landmarks are unique  
  Help: <https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright>  
  Affected nodes (2):
    - `genesis-header`  
      HTML: `&lt;genesis-header sticky="true" class="sticky" role="banner"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable
    - `genesis-footer`  
      HTML: `&lt;genesis-footer show-back-to-top="true" role="contentinfo"&gt;`  
      Fix: Fix any of the following:   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

#### Incomplete (needs manual review)

- `aria-prohibited-attr` – Ensure ARIA attributes are not prohibited for an element's role  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright>  
  Nodes: 6

- `aria-valid-attr-value` – Ensure all ARIA attributes have valid values  
  Help: <https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright>  
  Nodes: 5

- `color-contrast` – Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds  
  Help: <https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright>  
  Nodes: 21

---

## Unique Violations (Deduplicated)

| Rule | Impact | Affected Pages | Description |
|------|--------|----------------|-------------|
| `aria-required-parent` | critical | Application – Settings, Knowledge – FAQ, Marketing – Gallery | Ensure elements with an ARIA role that require parent roles are contained by them |
| `aria-required-children` | critical | Knowledge – FAQ, Marketing – Gallery | Ensure elements with an ARIA role that require child roles contain them |
| `color-contrast` | serious | Home (index.html), Application – Search, Content-Driven – Archive, Knowledge – Docs, Marketing – Landing, Marketing – Gallery | Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds |
| `scrollable-region-focusable` | serious | Application – Chatroom | Ensure elements that have scrollable content are accessible by keyboard |
| `link-in-text-block` | serious | Application – Search | Ensure links are distinguished from surrounding text in a way that does not rely on color |
| `aria-prohibited-attr` | serious | Content-Driven – Post | Ensure ARIA attributes are not prohibited for an element's role |
| `landmark-banner-is-top-level` | moderate | Home (index.html), Application – Chatroom, Application – Dashboard, Application – Search, Application – Settings, Content-Driven – Archive, Content-Driven – Article, Content-Driven – Post, Content-Driven – Profile, Knowledge – Docs, Knowledge – FAQ, Marketing – Landing, Marketing – Gallery, Marketing – Form, Utility – 404, Utility – Splash | Ensure the banner landmark is at top level |
| `landmark-contentinfo-is-top-level` | moderate | Home (index.html), Application – Chatroom, Application – Dashboard, Application – Search, Application – Settings, Content-Driven – Archive, Content-Driven – Article, Content-Driven – Post, Content-Driven – Profile, Knowledge – Docs, Knowledge – FAQ, Marketing – Landing, Marketing – Gallery, Marketing – Form, Utility – 404, Utility – Splash | Ensure the contentinfo landmark is at top level |
| `landmark-main-is-top-level` | moderate | Home (index.html) | Ensure the main landmark is at top level |
| `landmark-no-duplicate-banner` | moderate | Home (index.html), Application – Chatroom, Application – Dashboard, Application – Search, Application – Settings, Content-Driven – Archive, Content-Driven – Article, Content-Driven – Post, Content-Driven – Profile, Knowledge – Docs, Knowledge – FAQ, Marketing – Landing, Marketing – Gallery, Marketing – Form, Utility – 404, Utility – Splash | Ensure the document has at most one banner landmark |
| `landmark-no-duplicate-contentinfo` | moderate | Home (index.html), Application – Chatroom, Application – Dashboard, Application – Search, Application – Settings, Content-Driven – Archive, Content-Driven – Post, Content-Driven – Profile, Knowledge – Docs, Knowledge – FAQ, Marketing – Landing, Marketing – Gallery, Marketing – Form, Utility – 404, Utility – Splash | Ensure the document has at most one contentinfo landmark |
| `landmark-no-duplicate-main` | moderate | Home (index.html) | Ensure the document has at most one main landmark |
| `landmark-unique` | moderate | Home (index.html), Application – Chatroom, Application – Dashboard, Application – Search, Application – Settings, Content-Driven – Archive, Content-Driven – Article, Content-Driven – Post, Content-Driven – Profile, Knowledge – Docs, Knowledge – FAQ, Marketing – Landing, Marketing – Gallery, Marketing – Form, Utility – 404, Utility – Splash | Ensure landmarks are unique |
| `heading-order` | moderate | Application – Dashboard, Application – Settings, Content-Driven – Archive, Knowledge – FAQ | Ensure the order of headings is semantically correct |
| `landmark-complementary-is-top-level` | moderate | Application – Dashboard, Application – Search, Application – Settings | Ensure the complementary landmark or aside is at top level |
| `page-has-heading-one` | moderate | Application – Search | Ensure that the page, or at least one of its frames contains a level-one heading |

## Recommendations

Address violations in impact order: **critical → serious → moderate → minor**.

Each violation entry links to the axe-core help URL for remediation guidance.

> Incomplete results require manual inspection with assistive technologies (e.g., VoiceOver, NVDA).
