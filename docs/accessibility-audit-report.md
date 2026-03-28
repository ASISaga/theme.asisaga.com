# Accessibility Audit Report

**Tool**: [axe-core](https://github.com/dequelabs/axe-core) via [@axe-core/playwright](https://github.com/dequelabs/axe-core-packages/tree/develop/packages/playwright)
**Standards**: WCAG 2.0 A/AA, WCAG 2.1 A/AA, Best Practices
**Generated**: 2026-03-28T05:34:45.558Z
**Base URL**: http://localhost:4000

---

## Executive Summary

| Page | Critical | Serious | Moderate | Minor | Total Violations | Passes |
|------|----------|---------|----------|-------|-----------------|--------|
| [index](#index) | ✅ 0 | 🟠 1 | 🟡 7 | ✅ 0 | **8** | 45 |
| [application/chatroom](#application-chatroom) | ✅ 0 | 🟠 1 | 🟡 5 | ✅ 0 | **6** | 45 |
| [application/dashboard](#application-dashboard) | ✅ 0 | ✅ 0 | 🟡 7 | ✅ 0 | **7** | 47 |
| [application/search](#application-search) | ✅ 0 | 🟠 2 | 🟡 7 | ✅ 0 | **9** | 44 |
| [application/settings](#application-settings) | 🔴 1 | ✅ 0 | 🟡 7 | ✅ 0 | **8** | 46 |
| [content-driven/archive](#content-driven-archive) | ✅ 0 | 🟠 1 | 🟡 6 | ✅ 0 | **7** | 45 |
| [content-driven/article](#content-driven-article) | ✅ 0 | ✅ 0 | 🟡 4 | ✅ 0 | **4** | 44 |
| [content-driven/post](#content-driven-post) | ✅ 0 | 🟠 1 | 🟡 5 | ✅ 0 | **6** | 42 |
| [content-driven/profile](#content-driven-profile) | ✅ 0 | ✅ 0 | 🟡 5 | ✅ 0 | **5** | 42 |
| [knowledge/docs](#knowledge-docs) | ✅ 0 | 🟠 1 | 🟡 5 | ✅ 0 | **6** | 45 |
| [knowledge/faq](#knowledge-faq) | 🔴 2 | ✅ 0 | 🟡 6 | ✅ 0 | **8** | 46 |
| [marketing/landing](#marketing-landing) | ✅ 0 | 🟠 1 | 🟡 5 | ✅ 0 | **6** | 44 |
| [marketing/gallery](#marketing-gallery) | 🔴 2 | 🟠 1 | 🟡 5 | ✅ 0 | **8** | 42 |
| [marketing/form](#marketing-form) | ✅ 0 | ✅ 0 | 🟡 5 | ✅ 0 | **5** | 46 |
| [utility/404](#utility-404) | ✅ 0 | ✅ 0 | 🟡 5 | ✅ 0 | **5** | 42 |
| [utility/splash](#utility-splash) | ✅ 0 | ✅ 0 | 🟡 5 | ✅ 0 | **5** | 46 |

**Grand total violations**: 103 (5 critical, 9 serious)

---

## Detailed Results

### index

**URL**: http://localhost:4000/

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 1 |
| 🟡 Moderate | 7 |

**Violations**

#### 🟠 `color-contrast` — Elements must meet minimum color contrast ratio thresholds

- **Impact**: SERIOUS
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright)
- **Affected nodes**: 20

<details>
<summary>Affected nodes (20)</summary>

**Node 1**

Selector: `.samples-list > ul > li:nth-child(1) > strong`

```html
<strong>Application:</strong>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

**Node 2**

Selector: `li:nth-child(1) > ul > li:nth-child(1) > a`

```html
<a href="/samples/application/chatroom.html">Chatroom</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 3**

Selector: `li:nth-child(1) > ul > li:nth-child(2) > a`

```html
<a href="/samples/application/dashboard.html">Dashboard</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 4**

Selector: `li:nth-child(1) > ul > li:nth-child(3) > a`

```html
<a href="/samples/application/search.html">Search</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 5**

Selector: `li:nth-child(1) > ul > li:nth-child(4) > a`

```html
<a href="/samples/application/settings.html">Settings</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 6**

Selector: `.samples-list > ul > li:nth-child(2) > strong`

```html
<strong>Content-driven:</strong>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

**Node 7**

Selector: `.samples-list > ul > li:nth-child(2) > ul > li:nth-child(1) > a`

```html
<a href="/samples/content-driven/archive.html">Archive</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 8**

Selector: `.samples-list > ul > li:nth-child(2) > ul > li:nth-child(2) > a`

```html
<a href="/samples/content-driven/article.html">Article</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 9**

Selector: `li:nth-child(2) > ul > li:nth-child(3) > a`

```html
<a href="/samples/content-driven/post.html">Post</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 10**

Selector: `li:nth-child(2) > ul > li:nth-child(4) > a`

```html
<a href="/samples/content-driven/profile.html">Profile</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 11**

Selector: `.samples-list > ul > li:nth-child(3) > strong`

```html
<strong>Knowledge:</strong>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

**Node 12**

Selector: `a[href$="docs.html"]`

```html
<a href="/samples/knowledge/docs.html">Docs</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 13**

Selector: `a[href$="faq.html"]`

```html
<a href="/samples/knowledge/faq.html">FAQ</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 14**

Selector: `.samples-list > ul > li:nth-child(4) > strong`

```html
<strong>Marketing:</strong>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

**Node 15**

Selector: `.samples-list > ul > li:nth-child(4) > ul > li:nth-child(1) > a`

```html
<a href="/samples/marketing/landing.html">Landing</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 16**

Selector: `.samples-list > ul > li:nth-child(4) > ul > li:nth-child(2) > a`

```html
<a href="/samples/marketing/gallery.html">Gallery</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 17**

Selector: `a[href$="form.html"]`

```html
<a href="/samples/marketing/form.html">Form</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 18**

Selector: `.samples-list > ul > li:nth-child(5) > strong`

```html
<strong>Utility:</strong>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1

**Node 19**

Selector: `a[href$="404.html"]`

```html
<a href="/samples/utility/404.html">404</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 20**

Selector: `a[href$="splash.html"]`

```html
<a href="/samples/utility/splash.html">Splash</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-main-is-top-level` — Main landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the main landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-demo`

```html
<main class="genesis-demo">
```

Fix:   Fix any of the following:
    The main landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-no-duplicate-main` — Document should not have more than one main landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one main landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `#skip-target`

```html
<main id="skip-target" tabindex="-1" class="genesis-main">
```

Fix:   Fix any of the following:
    Document has more than one main landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 3

<details>
<summary>Affected nodes (3)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `#skip-target`

```html
<main id="skip-target" tabindex="-1" class="genesis-main">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 3**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### application/chatroom

**URL**: http://localhost:4000/samples/application/chatroom.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 1 |
| 🟡 Moderate | 5 |

**Violations**

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.chatroom-input`

```html
<footer class="chatroom-input">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

#### 🟠 `scrollable-region-focusable` — Scrollable region must have keyboard access

- **Impact**: SERIOUS
- **Description**: Ensure elements that have scrollable content are accessible by keyboard
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/scrollable-region-focusable?application=playwright](https://dequeuniversity.com/rules/axe/4.11/scrollable-region-focusable?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.chatroom-messages`

```html
<div class="chatroom-messages">
```

Fix:   Fix any of the following:
    Element should have focusable content
    Element should be focusable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### application/dashboard

**URL**: http://localhost:4000/samples/application/dashboard.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟡 Moderate | 7 |

**Violations**

#### 🟡 `heading-order` — Heading levels should only increase by one

- **Impact**: MODERATE
- **Description**: Ensure the order of headings is semantically correct
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `article[data-widget-id="widget-0"] > .dashboard-widget__header > h3`

```html
<h3 class="dashboard-widget__title">Users</h3>
```

Fix:   Fix any of the following:
    Heading order invalid

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-complementary-is-top-level` — Aside should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the complementary landmark or aside is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `aside`

```html
<aside class="dashboard__side-panel">
```

Fix:   Fix any of the following:
    The null landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### application/search

**URL**: http://localhost:4000/samples/application/search.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 2 |
| 🟡 Moderate | 7 |

**Violations**

#### 🟠 `color-contrast` — Elements must meet minimum color contrast ratio thresholds

- **Impact**: SERIOUS
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright)
- **Affected nodes**: 19

<details>
<summary>Affected nodes (19)</summary>

**Node 1**

Selector: `a[href$="layouts"]`

```html
<a href="/docs/layouts">Getting Started with <mark>Jekyll</mark> <mark>Layouts</mark></a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 2**

Selector: `article:nth-child(1) > .search-result__meta > span:nth-child(1)`

```html
<span><i class="far fa-folder" aria-hidden="true"></i> Documentation</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 3**

Selector: `article:nth-child(1) > .search-result__meta > span:nth-child(2)`

```html
<span><i class="far fa-calendar" aria-hidden="true"></i> Jan 15, 2024</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 4**

Selector: `article:nth-child(1) > .search-result__meta > span:nth-child(3)`

```html
<span><i class="far fa-user" aria-hidden="true"></i> John Doe</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 5**

Selector: `a[href$="layout-taxonomy"]`

```html
<a href="/docs/layout-taxonomy"><mark>Layout</mark> Taxonomy</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 6**

Selector: `article:nth-child(2) > .search-result__meta > span:nth-child(1)`

```html
<span><i class="far fa-folder" aria-hidden="true"></i> Documentation</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 7**

Selector: `article:nth-child(2) > .search-result__meta > span:nth-child(2)`

```html
<span><i class="far fa-calendar" aria-hidden="true"></i> Jan 12, 2024</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 8**

Selector: `article:nth-child(2) > .search-result__meta > span:nth-child(3)`

```html
<span><i class="far fa-user" aria-hidden="true"></i> Sarah Johnson</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 9**

Selector: `a[href$="post"]`

```html
<a href="/samples/post">Sample Post Using <mark>Layout</mark></a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 10**

Selector: `article:nth-child(3) > .search-result__meta > span:nth-child(1)`

```html
<span><i class="far fa-folder" aria-hidden="true"></i> Sample</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 11**

Selector: `article:nth-child(3) > .search-result__meta > span:nth-child(2)`

```html
<span><i class="far fa-calendar" aria-hidden="true"></i> Jan 15, 2024</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 12**

Selector: `a[href$="quick-reference"]`

```html
<a href="/docs/quick-reference"><mark>Layout</mark> Quick Reference</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 13**

Selector: `article:nth-child(4) > .search-result__meta > span:nth-child(1)`

```html
<span><i class="far fa-folder" aria-hidden="true"></i> Documentation</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 14**

Selector: `article:nth-child(4) > .search-result__meta > span:nth-child(2)`

```html
<span><i class="far fa-calendar" aria-hidden="true"></i> Jan 20, 2024</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 15**

Selector: `a[href$="implementation-guide"]`

```html
<a href="/docs/implementation-guide">Implementation Guide</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 16**

Selector: `article:nth-child(5) > .search-result__meta > span:nth-child(1)`

```html
<span><i class="far fa-folder" aria-hidden="true"></i> Documentation</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 17**

Selector: `article:nth-child(5) > .search-result__meta > span:nth-child(2)`

```html
<span><i class="far fa-calendar" aria-hidden="true"></i> Jan 18, 2024</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 18**

Selector: `article:nth-child(5) > .search-result__meta > span:nth-child(3)`

```html
<span><i class="far fa-user" aria-hidden="true"></i> Mike Park</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 19**

Selector: `.search-pagination__link[href="#"]:nth-child(5)`

```html
<a href="#" class="search-pagination__link">Next</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-complementary-is-top-level` — Aside should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the complementary landmark or aside is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `aside`

```html
<aside class="search__sidebar" aria-label="Search filters">
```

Fix:   Fix any of the following:
    The complementary landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

#### 🟠 `link-in-text-block` — Links must be distinguishable without relying on color

- **Impact**: SERIOUS
- **Description**: Ensure links are distinguished from surrounding text in a way that does not rely on color
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/link-in-text-block?application=playwright](https://dequeuniversity.com/rules/axe/4.11/link-in-text-block?application=playwright)
- **Affected nodes**: 4

<details>
<summary>Affected nodes (4)</summary>

**Node 1**

Selector: `.search-pagination__link--active`

```html
<a href="#" class="search-pagination__link search-pagination__link--active" aria-current="page">1</a>
```

Fix:   Fix any of the following:
    The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)
    The link has no styling (such as underline) to distinguish it from the surrounding text

**Node 2**

Selector: `.search-pagination__link[href="#"]:nth-child(3)`

```html
<a href="#" class="search-pagination__link">2</a>
```

Fix:   Fix any of the following:
    The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)
    The link has no styling (such as underline) to distinguish it from the surrounding text

**Node 3**

Selector: `.search-pagination__link[href="#"]:nth-child(4)`

```html
<a href="#" class="search-pagination__link">3</a>
```

Fix:   Fix any of the following:
    The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)
    The link has no styling (such as underline) to distinguish it from the surrounding text

**Node 4**

Selector: `.search-pagination__link[href="#"]:nth-child(5)`

```html
<a href="#" class="search-pagination__link">Next</a>
```

Fix:   Fix any of the following:
    The link has insufficient color contrast of 2.62:1 with the surrounding text. (Minimum contrast is 3:1, link text: #c99500, surrounding text: #fdfcf8)
    The link has no styling (such as underline) to distinguish it from the surrounding text

</details>

#### 🟡 `page-has-heading-one` — Page should contain a level-one heading

- **Impact**: MODERATE
- **Description**: Ensure that the page, or at least one of its frames contains a level-one heading
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright](https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `html`

```html
<html lang="en-US">
```

Fix:   Fix all of the following:
    Page must have a level-one heading

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### application/settings

**URL**: http://localhost:4000/samples/application/settings.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🔴 Critical | 1 |
| 🟡 Moderate | 7 |

**Violations**

#### 🔴 `aria-required-parent` — Certain ARIA roles must be contained by particular parents

- **Impact**: CRITICAL
- **Description**: Ensure elements with an ARIA role that require parent roles are contained by them
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright](https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright)
- **Affected nodes**: 5

<details>
<summary>Affected nodes (5)</summary>

**Node 1**

Selector: `.settings-nav-link--active`

```html
<a class="settings-nav-link settings-nav-link--active" href="#profile" data-tab-toggle="" aria-current="page" role="tab" aria-selected="true" tabindex="0">
                
                <i class="f
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 2**

Selector: `a[href$="#security"]`

```html
<a class="settings-nav-link" href="#security" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1">
                
                <i class="fas fa-lock" aria-hidden="true"></i>
       
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 3**

Selector: `a[href$="#notifications"]`

```html
<a class="settings-nav-link" href="#notifications" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1">
                
                <i class="fas fa-bell" aria-hidden="true"></i>
  
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 4**

Selector: `a[href$="#privacy"]`

```html
<a class="settings-nav-link" href="#privacy" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1">
                
                <i class="fas fa-shield-alt" aria-hidden="true"></i>
  
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 5**

Selector: `a[href$="#preferences"]`

```html
<a class="settings-nav-link" href="#preferences" data-tab-toggle="" role="tab" aria-selected="false" tabindex="-1">
                
                <i class="fas fa-cog" aria-hidden="true"></i>
     
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

</details>

#### 🟡 `heading-order` — Heading levels should only increase by one

- **Impact**: MODERATE
- **Description**: Ensure the order of headings is semantically correct
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `#profile > genesis-cognition[intent="motive"] > h3`

```html
<h3 class="settings-pane__heading">Profile</h3>
```

Fix:   Fix any of the following:
    Heading order invalid

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-complementary-is-top-level` — Aside should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the complementary landmark or aside is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `aside`

```html
<aside class="settings-sidebar" aria-label="Settings navigation">
```

Fix:   Fix any of the following:
    The complementary landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 3

<details>
<summary>Affected nodes (3)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-environment[logic="navigation-sidebar"]`

```html
<genesis-environment logic="navigation-sidebar" role="navigation" aria-label="Sidebar navigation" data-logic="navigation-sidebar" data-viewport="desktop">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 3**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### content-driven/archive

**URL**: http://localhost:4000/samples/content-driven/archive.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 1 |
| 🟡 Moderate | 6 |

**Violations**

#### 🟠 `color-contrast` — Elements must meet minimum color contrast ratio thresholds

- **Impact**: SERIOUS
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright)
- **Affected nodes**: 12

<details>
<summary>Affected nodes (12)</summary>

**Node 1**

Selector: `article:nth-child(3) > .archive-item__content > h3 > .archive-item__link`

```html
<a href="/samples/content-driven/sample-post.html" class="archive-item__link">Getting Started with Jekyll Layouts</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 2**

Selector: `time[datetime="2024-01-15"]`

```html
<time datetime="2024-01-15" class="archive-item__date">January 15, 2024</time>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 3**

Selector: `article:nth-child(3) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(1)`

```html
<span class="archive-item__tag">Jekyll</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 4**

Selector: `article:nth-child(3) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(2)`

```html
<span class="archive-item__tag">Tutorial</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 5**

Selector: `article:nth-child(4) > .archive-item__content > h3 > .archive-item__link`

```html
<a href="/samples/content-driven/sample-article.html" class="archive-item__link">The Architecture of Modern Web Layouts</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 6**

Selector: `time[datetime="2024-01-20"]`

```html
<time datetime="2024-01-20" class="archive-item__date">January 20, 2024</time>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 7**

Selector: `article:nth-child(4) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(1)`

```html
<span class="archive-item__tag">CSS</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 8**

Selector: `article:nth-child(4) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(2)`

```html
<span class="archive-item__tag">Architecture</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 9**

Selector: `a[href="#"]`

```html
<a href="#" class="archive-item__link">Building Responsive Galleries</a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.69 (foreground color: #c99500, background color: #ffffff, font size: 27.0pt (36px), font weight: normal). Expected contrast ratio of 3:1

**Node 10**

Selector: `time[datetime="2024-01-10"]`

```html
<time datetime="2024-01-10" class="archive-item__date">January 10, 2024</time>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 11**

Selector: `article:nth-child(5) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(1)`

```html
<span class="archive-item__tag">Gallery</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 12**

Selector: `article:nth-child(5) > .archive-item__content > .archive-item__tags > .archive-item__tag:nth-child(2)`

```html
<span class="archive-item__tag">Responsive</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

</details>

#### 🟡 `heading-order` — Heading levels should only increase by one

- **Impact**: MODERATE
- **Description**: Ensure the order of headings is semantically correct
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `article:nth-child(3) > .archive-item__content > h3`

```html
<h3 class="archive-item__title">
      <a href="/samples/content-driven/sample-post.html" class="archive-item__link">Getting Started with Jekyll Layouts</a>
    </h3>
```

Fix:   Fix any of the following:
    Heading order invalid

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### content-driven/article

**URL**: http://localhost:4000/samples/content-driven/article.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟡 Moderate | 4 |

**Violations**

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### content-driven/post

**URL**: http://localhost:4000/samples/content-driven/post.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 1 |
| 🟡 Moderate | 5 |

**Violations**

#### 🟠 `aria-prohibited-attr` — Elements must only use permitted ARIA attributes

- **Impact**: SERIOUS
- **Description**: Ensure ARIA attributes are not prohibited for an element's role
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright](https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `span[aria-label="Categories"]`

```html
<span class="post__taxonomy-label" aria-label="Categories">
      <i class="fas fa-folder" aria-hidden="true"></i>
    </span>
```

Fix:   Fix all of the following:
    aria-label attribute cannot be used on a span with no valid role attribute.

**Node 2**

Selector: `span[aria-label="Tags"]`

```html
<span class="post__taxonomy-label" aria-label="Tags">
      <i class="fas fa-tags" aria-hidden="true"></i>
    </span>
```

Fix:   Fix all of the following:
    aria-label attribute cannot be used on a span with no valid role attribute.

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.post__footer-cta`

```html
<footer class="post__footer-cta">
  
  <genesis-cognition intent="axiom">
    <h2 class="post__cta-title">Share this post</h2>
  </genesis-cognition>
  
  
  
  
  
  <genesis-synapse vector="execute"
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### content-driven/profile

**URL**: http://localhost:4000/samples/content-driven/profile.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟡 Moderate | 5 |

**Violations**

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### knowledge/docs

**URL**: http://localhost:4000/samples/knowledge/docs.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 1 |
| 🟡 Moderate | 5 |

**Violations**

#### 🟠 `color-contrast` — Elements must meet minimum color contrast ratio thresholds

- **Impact**: SERIOUS
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright)
- **Affected nodes**: 6

<details>
<summary>Affected nodes (6)</summary>

**Node 1**

Selector: `a[href$="getting-started"]`

```html
<a class="docs-nav-link" href="/docs/getting-started">
                Getting Started
              </a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 2**

Selector: `a[href$="layouts"]`

```html
<a class="docs-nav-link" href="/docs/layouts">
                Layouts
              </a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 3**

Selector: `a[href$="base"]`

```html
<a class="docs-nav-link" href="/docs/layouts/base">
                    Base Templates
                  </a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 4**

Selector: `a[href$="specialized"]`

```html
<a class="docs-nav-link" href="/docs/layouts/specialized">
                    Specialized
                  </a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 5**

Selector: `a[href$="components"]`

```html
<a class="docs-nav-link" href="/docs/components">
                Components
              </a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 6**

Selector: `a[href$="customization"]`

```html
<a class="docs-nav-link" href="/docs/customization">
                Customization
              </a>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 2.51 (foreground color: #00a0ff, background color: #eef3f4, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### knowledge/faq

**URL**: http://localhost:4000/samples/knowledge/faq.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🔴 Critical | 2 |
| 🟡 Moderate | 6 |

**Violations**

#### 🔴 `aria-required-children` — Certain ARIA roles must contain particular children

- **Impact**: CRITICAL
- **Description**: Ensure elements with an ARIA role that require child roles contain them
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=playwright](https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-navigation`

```html
<genesis-navigation type="tabs" data-type="tabs" data-orientation="horizontal" role="tablist">
```

Fix:   Fix any of the following:
    Element has children which are not allowed: [role=group]

</details>

#### 🔴 `aria-required-parent` — Certain ARIA roles must be contained by particular parents

- **Impact**: CRITICAL
- **Description**: Ensure elements with an ARIA role that require parent roles are contained by them
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright](https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright)
- **Affected nodes**: 4

<details>
<summary>Affected nodes (4)</summary>

**Node 1**

Selector: `.faq__category--active`

```html
<button type="button" class="faq__category faq__category--active" role="tab" tabindex="0" aria-selected="false">All</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 2**

Selector: `.faq__category[role="tab"][type="button"]:nth-child(2)`

```html
<button type="button" class="faq__category" role="tab" tabindex="-1" aria-selected="false">General</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 3**

Selector: `.faq__category[role="tab"][type="button"]:nth-child(3)`

```html
<button type="button" class="faq__category" role="tab" tabindex="-1" aria-selected="false">Technical</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 4**

Selector: `.faq__category[role="tab"][type="button"]:nth-child(4)`

```html
<button type="button" class="faq__category" role="tab" tabindex="-1" aria-selected="false">Licensing</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

</details>

#### 🟡 `heading-order` — Heading levels should only increase by one

- **Impact**: MODERATE
- **Description**: Ensure the order of headings is semantically correct
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright](https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `#faq-1`

```html
<h3 class="faq-item__header" id="faq-1">
    <button class="faq-item__button" type="button" data-collapse-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
      What ships with th
```

Fix:   Fix any of the following:
    Heading order invalid

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.faq__footer-cta`

```html
<footer class="faq__footer-cta">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### marketing/landing

**URL**: http://localhost:4000/samples/marketing/landing.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟠 Serious  | 1 |
| 🟡 Moderate | 5 |

**Violations**

#### 🟠 `color-contrast` — Elements must meet minimum color contrast ratio thresholds

- **Impact**: SERIOUS
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `blockquote:nth-child(1) > genesis-cognition[intent="gloss"] > cite`

```html
<cite>— Alex Chen, Front-end Engineer</cite>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.04 (foreground color: #fdfcf8, background color: #faf7ec, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 2**

Selector: `blockquote:nth-child(2) > genesis-cognition[intent="gloss"] > cite`

```html
<cite>— Maria Garcia, Design Systems Lead</cite>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.04 (foreground color: #fdfcf8, background color: #faf7ec, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.landing__footer-cta`

```html
<footer class="landing__footer-cta">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### marketing/gallery

**URL**: http://localhost:4000/samples/marketing/gallery.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🔴 Critical | 2 |
| 🟠 Serious  | 1 |
| 🟡 Moderate | 5 |

**Violations**

#### 🔴 `aria-required-children` — Certain ARIA roles must contain particular children

- **Impact**: CRITICAL
- **Description**: Ensure elements with an ARIA role that require child roles contain them
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=playwright](https://dequeuniversity.com/rules/axe/4.11/aria-required-children?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-navigation`

```html
<genesis-navigation type="tabs" data-type="tabs" data-orientation="horizontal" role="tablist">
```

Fix:   Fix any of the following:
    Element has children which are not allowed: [role=group]

</details>

#### 🔴 `aria-required-parent` — Certain ARIA roles must be contained by particular parents

- **Impact**: CRITICAL
- **Description**: Ensure elements with an ARIA role that require parent roles are contained by them
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright](https://dequeuniversity.com/rules/axe/4.11/aria-required-parent?application=playwright)
- **Affected nodes**: 4

<details>
<summary>Affected nodes (4)</summary>

**Node 1**

Selector: `.gallery__filter--active`

```html
<button class="gallery__filter gallery__filter--active" data-filter="all" role="tab" tabindex="0" aria-selected="false">All</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 2**

Selector: `button[data-filter="web"]`

```html
<button class="gallery__filter" data-filter="web" role="tab" tabindex="-1" aria-selected="false">Web</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 3**

Selector: `button[data-filter="mobile"]`

```html
<button class="gallery__filter" data-filter="mobile" role="tab" tabindex="-1" aria-selected="false">Mobile</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

**Node 4**

Selector: `button[data-filter="brand"]`

```html
<button class="gallery__filter" data-filter="brand" role="tab" tabindex="-1" aria-selected="false">Brand</button>
```

Fix:   Fix any of the following:
    Required ARIA parent role not present: tablist

</details>

#### 🟠 `color-contrast` — Elements must meet minimum color contrast ratio thresholds

- **Impact**: SERIOUS
- **Description**: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright)
- **Affected nodes**: 12

<details>
<summary>Affected nodes (12)</summary>

**Node 1**

Selector: `figure[data-category="web"]:nth-child(3) > figcaption > .gallery-item__title`

```html
<span class="gallery-item__title">E-commerce Platform</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 2**

Selector: `figure[data-category="web"]:nth-child(3) > figcaption > .gallery-item__description`

```html
<span class="gallery-item__description">End-to-end shopping experience</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 3**

Selector: `figure[data-category="mobile"]:nth-child(4) > figcaption > .gallery-item__title`

```html
<span class="gallery-item__title">Mobile Banking</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 4**

Selector: `figure[data-category="mobile"]:nth-child(4) > figcaption > .gallery-item__description`

```html
<span class="gallery-item__description">Secure, fast financial tools</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 5**

Selector: `figure[data-category="brand"]:nth-child(5) > figcaption > .gallery-item__title`

```html
<span class="gallery-item__title">Corporate Identity</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 6**

Selector: `figure[data-category="brand"]:nth-child(5) > figcaption > .gallery-item__description`

```html
<span class="gallery-item__description">Complete brand system</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 7**

Selector: `figure[data-category="web"]:nth-child(6) > figcaption > .gallery-item__title`

```html
<span class="gallery-item__title">Portfolio</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 8**

Selector: `figure[data-category="web"]:nth-child(6) > figcaption > .gallery-item__description`

```html
<span class="gallery-item__description">Curated creative showcase</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 9**

Selector: `figure[data-category="mobile"]:nth-child(7) > figcaption > .gallery-item__title`

```html
<span class="gallery-item__title">Fitness Tracker</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 10**

Selector: `figure[data-category="mobile"]:nth-child(7) > figcaption > .gallery-item__description`

```html
<span class="gallery-item__description">Health metrics at a glance</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 11**

Selector: `figure[data-category="brand"]:nth-child(8) > figcaption > .gallery-item__title`

```html
<span class="gallery-item__title">Startup Brand</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**Node 12**

Selector: `figure[data-category="brand"]:nth-child(8) > figcaption > .gallery-item__description`

```html
<span class="gallery-item__description">Tech identity from zero</span>
```

Fix:   Fix any of the following:
    Element has insufficient color contrast of 1.02 (foreground color: #fdfcf8, background color: #ffffff, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

</details>

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### marketing/form

**URL**: http://localhost:4000/samples/marketing/form.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟡 Moderate | 5 |

**Violations**

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.genesis-footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `.form__footer`

```html
<footer class="form__footer">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### utility/404

**URL**: http://localhost:4000/samples/utility/404.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟡 Moderate | 5 |

**Violations**

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---

### utility/splash

**URL**: http://localhost:4000/samples/utility/splash.html

**Violation Counts**

| Severity | Count |
|----------|-------|
| 🟡 Moderate | 5 |

**Violations**

#### 🟡 `landmark-banner-is-top-level` — Banner landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the banner landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-banner-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `header`

```html
<header class="genesis-header">
```

Fix:   Fix any of the following:
    The banner landmark is contained in another landmark.

</details>

#### 🟡 `landmark-contentinfo-is-top-level` — Contentinfo landmark should not be contained in another landmark

- **Impact**: MODERATE
- **Description**: Ensure the contentinfo landmark is at top level
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-contentinfo-is-top-level?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `footer`

```html
<footer class="genesis-footer">
```

Fix:   Fix any of the following:
    The contentinfo landmark is contained in another landmark.

</details>

#### 🟡 `landmark-no-duplicate-banner` — Document should not have more than one banner landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one banner landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-banner?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    Document has more than one banner landmark

</details>

#### 🟡 `landmark-no-duplicate-contentinfo` — Document should not have more than one contentinfo landmark

- **Impact**: MODERATE
- **Description**: Ensure the document has at most one contentinfo landmark
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-contentinfo?application=playwright)
- **Affected nodes**: 1

<details>
<summary>Affected nodes (1)</summary>

**Node 1**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    Document has more than one contentinfo landmark

</details>

#### 🟡 `landmark-unique` — Landmarks should have a unique role or role/label/title (i.e. accessible name) combination

- **Impact**: MODERATE
- **Description**: Ensure landmarks are unique
- **Help**: [https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright](https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright)
- **Affected nodes**: 2

<details>
<summary>Affected nodes (2)</summary>

**Node 1**

Selector: `genesis-header`

```html
<genesis-header sticky="true" class="sticky" role="banner">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

**Node 2**

Selector: `genesis-footer`

```html
<genesis-footer show-back-to-top="true" role="contentinfo">
```

Fix:   Fix any of the following:
    The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable

</details>

**Incomplete — Needs Manual Review**

- `aria-prohibited-attr` [SERIOUS]: Elements must only use permitted ARIA attributes
- `aria-valid-attr-value` [CRITICAL]: ARIA attributes must conform to valid values
- `color-contrast` [SERIOUS]: Elements must meet minimum color contrast ratio thresholds

---
