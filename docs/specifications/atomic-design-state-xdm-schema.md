# Atomic Design, State-to-UI Mapping, XDM, and Schema.org

**Version**: 1.0.0  
**Status**: Active  
**Last Updated**: 2026-04-03

## Overview

This specification explains how four complementary methodologies — **Atomic Design**, **State-to-UI Mapping**, **Experience Data Models (XDM)**, and **Schema.org** — integrate with the Genesis Semantic Design System and the broader theme architecture. Each methodology occupies a distinct layer of the system:

| Methodology | Layer | Primary concern |
|-------------|-------|----------------|
| **Atomic Design** | Structure | How UI components are composed and assembled |
| **State-to-UI Mapping** | Behaviour | How application state drives visual presentation |
| **XDM** | Data model | How experience events and profile data are modelled |
| **Schema.org** | Semantics | How page content is described for machines |

All four work together and map cleanly onto the Genesis ontology categories. Understanding the relationship between them enables building UI components that are simultaneously composable, state-driven, structurally typed, and machine-readable.

---

## Scope

**Included**:
- Atomic Design hierarchy and its correspondence to Genesis ontology levels
- State-to-UI mapping patterns using `genesis-state` and JavaScript hooks
- XDM schema structure and how to model content for Adobe Experience Platform (AEP) compatibility
- Schema.org JSON-LD and microdata patterns for Jekyll includes and layouts
- Practical code examples in HTML (Liquid), SCSS, and JavaScript

**Excluded**:
- Engine-level SCSS implementation (see `_sass/ontology/engines/`)
- Motion and animation details (see `systems/motion/`)
- Full color token reference (see `specifications/scss-ontology-system.md`)

---

## Part 1 — Atomic Design

### 1.1 Methodology Overview

Atomic Design (Brad Frost, 2013) decomposes a user interface into five levels of increasing complexity (see [atomicdesign.bradfrost.com](https://atomicdesign.bradfrost.com)):

```
Atoms → Molecules → Organisms → Templates → Pages
```

Each level is built exclusively from the levels below it, creating a clean compositional hierarchy.

### 1.2 Mapping to Genesis Ontology Levels

The Genesis ontology hierarchy (defined in `docs/specifications/ontology-html-mapping.md`) aligns naturally with Atomic Design levels:

| Atomic Design Level | Genesis Hierarchy Level | Example |
|--------------------|------------------------|---------|
| **Atom** | Level 4 — Leaf element | `<h1>`, `<p>`, `<a>`, `<button>`, `<time>` |
| **Molecule** | Level 3 — Component | `genesis-card`, `.post-meta`, `.stat` |
| **Organism** | Level 3–2 boundary | `genesis-header`, `.post-layout header`, dashboard widget |
| **Template** | Level 2 — Section / Layout | `_layouts/post.html`, `_layouts/dashboard.html` |
| **Page** | Level 1 — Page wrapper | A fully rendered Jekyll page with real content |

> **Key rule**: An atom uses `genesis-cognition` or `genesis-synapse`. A molecule/component uses `genesis-entity`. An organism uses `genesis-environment` (spatial logic). A template is a Jekyll layout file. A page is a subdomain HTML file.

### 1.3 Atoms — Leaf Elements

Atoms are the smallest indivisible units. In this repository they are HTML leaf elements styled with `genesis-cognition` (for text) or `genesis-synapse` (for interactions).

**SCSS example — atom definitions:**

```scss
// Headline atom
.atom-headline {
  @include genesis-cognition('axiom');
}

// Body text atom
.atom-body {
  @include genesis-cognition('discourse');
}

// Label atom (metadata, tags)
.atom-label {
  @include genesis-cognition('quantum');
}

// Primary action atom
.atom-action {
  @include genesis-synapse('execute');
}

// Navigation link atom
.atom-link {
  @include genesis-synapse('navigate');
}
```

**HTML example:**

```html
<h1 class="atom-headline">{{ page.title }}</h1>
<p class="atom-body">{{ page.excerpt }}</p>
<time class="atom-label" datetime="{{ page.date | date_to_xmlschema }}">
  {{ page.date | date: "%B %d, %Y" }}
</time>
<a class="atom-link" href="{{ post.url }}">Read more</a>
```

### 1.4 Molecules — Components

Molecules group atoms into a self-contained unit with a single function. They correspond to Level 3 components in the Genesis hierarchy and use `genesis-entity` for visual surface.

Existing molecules in this repository include:

| Molecule | Include | Entity variant |
|----------|---------|---------------|
| Post meta | `_includes/layouts/post/post-meta.html` | (none — pure typography) |
| Card | `_includes/components/card.html` | `primary` (configurable) |
| Stat | `_includes/components/stat.html` | `secondary` |
| Alert | `_includes/components/alert.html` | `imperative` |
| Tag list | `_includes/components/tag-list.html` | (none — quantum cognition) |
| Breadcrumb | `_includes/components/breadcrumb.html` | (navigation environment) |

**SCSS example — molecule (post-meta card):**

```scss
.molecule-post-meta {
  @include genesis-entity('secondary');     // Visual surface

  .molecule-post-meta__date,
  .molecule-post-meta__author {
    @include genesis-cognition('gloss');    // Annotation-level atoms
  }

  .molecule-post-meta__tag {
    @include genesis-cognition('quantum');  // Micro-label atoms
  }
}
```

**Creating a new molecule — Liquid include pattern:**

```html
{% comment %}
Post Meta Molecule
Displays author, date and reading-time atoms in a grouped surface.

Parameters:
- date: ISO date string
- author: Author display name
- reading_time: Minutes to read (integer)
- tags: Array of tag strings
{% endcomment %}

<div class="molecule-post-meta">
  {% if include.date %}
    <time class="molecule-post-meta__date"
          datetime="{{ include.date | date_to_xmlschema }}">
      {{ include.date | date: "%B %d, %Y" }}
    </time>
  {% endif %}

  {% if include.author %}
    <span class="molecule-post-meta__author">{{ include.author }}</span>
  {% endif %}

  {% if include.reading_time %}
    <span class="molecule-post-meta__reading-time">
      {{ include.reading_time }} min read
    </span>
  {% endif %}
</div>
```

### 1.5 Organisms — Structural Sections

Organisms are complex UI sections composed from multiple molecules and atoms. They define their own spatial logic and use `genesis-environment` for layout, optionally combined with `genesis-atmosphere` for emotional tone.

Existing organisms in this repository include:

| Organism | Include / Component | Environment variant |
|----------|--------------------|--------------------|
| Site header | `_includes/header.html` | `associative` |
| Hero section | `_includes/hero.html` | `focused` + `sacred` atmosphere |
| Landing features | `_includes/layouts/landing/landing-features.html` | `distributed` |
| Dashboard widget group | `_includes/layouts/dashboard/dashboard-widget.html` | `manifest` |
| Archive listing | `_includes/layouts/archive/archive-item.html` | `chronological` |

**SCSS example — organism (feature section):**

```scss
.organism-features {
  @include genesis-environment('distributed');   // Bento grid layout
  @include genesis-atmosphere('neutral');        // Standard tone

  .organism-features__item {
    @include genesis-entity('primary');          // Each item = molecule surface

    .organism-features__title {
      @include genesis-cognition('heading');     // H3 atom
    }

    .organism-features__description {
      @include genesis-cognition('discourse');   // Body atom
    }

    .organism-features__cta {
      @include genesis-synapse('execute');       // Action atom
    }
  }
}
```

### 1.6 Templates — Jekyll Layouts

Templates are reusable page skeletons. In this repository they live in `_layouts/`. Templates define the spatial structure of a full page type without real content — they use only layout and section-level constructs.

**Template anatomy:**

```
_layouts/post.html
├── <genesis-header>           (organism — universal)
├── <main id="skip-target">    (root landmark)
│   └── <div class="post-layout">    (Level 1 — environment + atmosphere)
│       ├── <header class="post-layout__header">  (Level 2 — environment)
│       │   ├── <h1 class="post-layout__title">   (Level 4 — cognition)
│       │   └── post-meta include                 (Level 3 — entity)
│       ├── <div class="post-layout__body">        (Level 2 — environment)
│       │   └── {{ content }}                      (injected page content)
│       └── post-navigation include               (Level 3 — entity)
└── <genesis-footer>           (organism — universal)
```

### 1.7 Pages — Subdomain Content Files

Pages are template instances with real content. In this repository's subdomain model, pages live in subdomain repositories as HTML files with Jekyll front matter.

```html
---
layout: post
title: "Understanding Consciousness"
date: 2026-01-15
author: ASI Saga Team
tags: [consciousness, AI, philosophy]
---

<p>Page-specific content injected into the post template...</p>
```

### 1.8 Directory Convention for Atomic Components

To make the Atomic Design level explicit in code, adopt this naming and directory convention:

```
_includes/
├── atoms/                  # Standalone HTML atoms (rare — usually just SCSS)
├── components/             # Molecules and organisms (existing directory)
│   ├── card.html           # Molecule
│   ├── alert.html          # Molecule
│   ├── breadcrumb.html     # Molecule/Organism
│   └── stat.html           # Molecule
├── layouts/                # Template sections (existing directory)
│   ├── post/
│   ├── landing/
│   └── dashboard/
└── organisms/              # Standalone reusable organisms
    ├── hero.html
    ├── header.html
    └── footer.html

_sass/
├── base/                   # Atom-level resets and typography
├── components/             # Molecule-level component styles
├── layouts/                # Organism and template-level layout styles
└── ontology/               # Mixin library (used by all levels)
```

---

## Part 2 — State-to-UI Mapping

### 2.1 What Is State-to-UI Mapping?

State-to-UI Mapping is the practice of defining an explicit, bidirectional contract between application state and visual presentation. Instead of ad-hoc class toggling, each named state maps to a specific `genesis-state` variant and a corresponding data attribute.

The system has three layers:

```
Application State → data-state attribute → genesis-state mixin → CSS output
```

### 2.2 The Five Genesis State Variants

| Variant | Meaning | Visual signal |
|---------|---------|---------------|
| `'stable'` | Content verified, in equilibrium | Full opacity, no filter |
| `'evolving'` | Currently updating or streaming | Animated gradient sweep |
| `'deprecated'` | No longer current, outdated | 50% opacity, grayscale, strikethrough |
| `'locked'` | Immutable, access restricted | 2px blur, pointer-events disabled |
| `'simulated'` | Projected / not live data | Dashed border, diagonal stripe pattern |

### 2.3 HTML Data Attribute Convention

Every stateful element carries a `data-state` attribute matching the variant name. This single attribute is the source of truth for both SCSS and JavaScript.

```html
<!-- Stable (default — no attribute needed, but explicit is better) -->
<div class="content-item" data-state="stable">…</div>

<!-- Content being fetched from an API -->
<div class="content-item" data-state="evolving">…</div>

<!-- Outdated / superseded content -->
<article class="content-item" data-state="deprecated">…</article>

<!-- Read-only, requires elevated permissions -->
<div class="content-item" data-state="locked">…</div>

<!-- Forecast / projected data, not confirmed -->
<div class="content-item" data-state="simulated">…</div>
```

### 2.4 SCSS Mapping Pattern

Map `data-state` to `genesis-state` inside the component's SCSS block. This keeps all state variants co-located with the component:

```scss
.content-item {
  @include genesis-entity('primary');        // Base visual surface (Level 3)

  // State variants — keyed to data-state attribute
  &[data-state="stable"]     { @include genesis-state('stable'); }
  &[data-state="evolving"]   { @include genesis-state('evolving'); }
  &[data-state="deprecated"] { @include genesis-state('deprecated'); }
  &[data-state="locked"]     { @include genesis-state('locked'); }
  &[data-state="simulated"]  { @include genesis-state('simulated'); }
}
```

For components with inner text that should also react to state (e.g., strikethrough on deprecated):

```scss
.content-item {
  @include genesis-entity('primary');

  &[data-state="deprecated"] {
    @include genesis-state('deprecated');

    .content-item__title {
      @include genesis-state('deprecated');  // Applies text-decoration: line-through
    }
  }

  &[data-state="evolving"] {
    @include genesis-state('evolving');
  }
}
```

### 2.5 JavaScript State Management

Use `assets/js/script.js` (subdomain entry point) or extend `assets/js/common.js` with a state manager module. The pattern uses a central `setState()` function that writes the `data-state` attribute and dispatches a custom event:

```javascript
/**
 * Set the visual state of a DOM element.
 * @param {Element} element - Target element
 * @param {'stable'|'evolving'|'deprecated'|'locked'|'simulated'} state
 */
function setState(element, state) {
  const validStates = ['stable', 'evolving', 'deprecated', 'locked', 'simulated'];
  if (!validStates.includes(state)) {
    console.warn(`Unknown state: ${state}. Must be one of: ${validStates.join(', ')}`);
    return;
  }
  element.dataset.state = state;
  element.dispatchEvent(new CustomEvent('genesis:statechange', {
    bubbles: true,
    detail: { state }
  }));
}

// Usage examples
const card = document.querySelector('[data-content-id="article-42"]');

// Before fetch
setState(card, 'evolving');

// After successful fetch
fetch('/api/articles/42')
  .then(r => r.json())
  .then(data => {
    card.querySelector('.content-item__title').textContent = data.title;
    setState(card, 'stable');
  })
  .catch(() => setState(card, 'deprecated'));
```

### 2.6 Synapse-State Interaction

`genesis-synapse` variants define how the user *acts*; `genesis-state` variants define the *condition* of the content being acted upon. They compose independently:

```html
<!-- A locked article with an "unlock" button -->
<article class="content-item" data-state="locked">
  <h2 class="content-item__title">Restricted Analysis</h2>
  <p class="content-item__body">…</p>
  <button class="content-item__unlock" data-synapse="execute">
    Request Access
  </button>
</article>
```

```scss
.content-item {
  @include genesis-entity('primary');

  &[data-state="locked"] {
    @include genesis-state('locked');    // Blur + pointer-events: none

    // Exception: the unlock button must remain interactive
    .content-item__unlock {
      pointer-events: auto;
      filter: none;
    }
  }

  .content-item__unlock {
    @include genesis-synapse('execute');
  }
}
```

### 2.7 State Mapping Table for Common UI Patterns

| UI Pattern | Typical state | Notes |
|-----------|--------------|-------|
| Content loading / skeleton | `evolving` | Remove when data arrives |
| Form submitting | `evolving` | Set on form or submit button |
| Published and current | `stable` | Default — no attribute required |
| Draft / not published | `simulated` | Dashed border signals it's not live |
| Superseded article | `deprecated` | Add deprecation notice in content |
| Paywall / gated content | `locked` | Keep CTA button interactive |
| Archived / legacy | `deprecated` | Link to replacement if available |
| A/B test variant | `simulated` | Signals this is a projected variant |

---

## Part 3 — Experience Data Models (XDM)

### 3.1 What Is XDM?

The **Experience Data Model** (XDM) is an open standard maintained by Adobe as part of the Adobe Experience Platform (AEP). It provides a shared vocabulary for customer experience data: profile attributes, events, relationships, and behaviours.

Key XDM schemas relevant to this repository:

| XDM Schema | Use case |
|-----------|---------|
| `XDM ExperienceEvent` | Page views, clicks, video plays, form submissions |
| `XDM Individual Profile` | Identified user attributes (name, email, preferences) |
| `XDM Web Details` | URL, referrer, browser environment |
| `XDM Product List Item` | E-commerce cart and order items |

Official reference: [https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html)

### 3.2 XDM and the Genesis Token Layer

The Genesis token system (`_design/tokens.json`) already uses a hierarchical, typed vocabulary inspired by DTCG. XDM extends this by providing a standardised data contract for **experience events** (what the user does) and **profile data** (who the user is).

The XDM layer sits above the token layer:

```
Design Tokens (_design/tokens.json)   — visual properties
Ontology Variants (_sass/ontology/)   — UI behaviour
Schema.org (_includes/seo/)           — content meaning for machines
XDM Events (assets/js/xdm/)          — experience events for AEP
```

### 3.3 Implementing XDM Event Tracking

Create a dedicated XDM module at `assets/js/common/xdm.js`:

```javascript
/**
 * XDM ExperienceEvent helper for Adobe Experience Platform (AEP)
 *
 * Send experience events using the Web SDK (alloy) or a custom endpoint.
 * This module builds XDM-compliant event payloads from DOM interactions.
 *
 * See: https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html
 */

const XDM_SCHEMA = 'https://ns.adobe.com/xdm/context/experienceevent';

/**
 * Build a base XDM ExperienceEvent payload.
 * @param {string} eventType - XDM event type (e.g. 'web.webpagedetails.pageViews')
 * @param {object} details - Event-specific XDM fields
 * @returns {object} XDM-compliant event payload
 */
function buildXdmEvent(eventType, details = {}) {
  return {
    _schema: XDM_SCHEMA,
    timestamp: new Date().toISOString(),
    eventType,
    web: {
      webPageDetails: {
        URL: window.location.href,
        name: document.title,
        isHomePage: window.location.pathname === '/'
      },
      webReferrer: {
        URL: document.referrer || ''
      }
    },
    environment: {
      type: 'browser',
      browserDetails: {
        userAgent: navigator.userAgent,
        cookiesEnabled: navigator.cookieEnabled,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      }
    },
    ...details
  };
}

/**
 * Track a page view event.
 * Call once per page load from assets/js/common.js or script.js.
 */
function trackPageView() {
  const event = buildXdmEvent('web.webpagedetails.pageViews', {
    web: {
      webPageDetails: {
        pageViews: { value: 1 }
      }
    }
  });
  sendXdmEvent(event);
}

/**
 * Track a link-click event (maps to genesis-synapse 'navigate').
 * @param {Element} link - The anchor element that was clicked
 */
function trackLinkClick(link) {
  const event = buildXdmEvent('web.webinteraction.linkClicks', {
    web: {
      webInteraction: {
        name: link.textContent.trim(),
        URL: link.href,
        type: link.dataset.synapse === 'navigate' ? 'other' : 'download',
        linkClicks: { value: 1 }
      }
    }
  });
  sendXdmEvent(event);
}

/**
 * Track a CTA click event (maps to genesis-synapse 'execute').
 * @param {Element} button - The button element that was clicked
 * @param {string} ctaName - Human-readable CTA name
 */
function trackCtaClick(button, ctaName) {
  const event = buildXdmEvent('web.webinteraction.linkClicks', {
    web: {
      webInteraction: {
        name: ctaName || button.textContent.trim(),
        type: 'call-to-action',
        linkClicks: { value: 1 }
      }
    }
  });
  sendXdmEvent(event);
}

/**
 * Send an XDM event.
 * Uses Adobe Web SDK (alloy) if available, otherwise logs to console in dev mode.
 * @param {object} xdmPayload - XDM-compliant event payload
 */
function sendXdmEvent(xdmPayload) {
  if (typeof window.alloy === 'function') {
    // Adobe Experience Platform Web SDK
    window.alloy('sendEvent', { xdm: xdmPayload });
  } else if (window.location.hostname === 'localhost') {
    // Development: log to console instead of failing silently
    console.debug('[XDM Event]', xdmPayload);
  }
}

export { buildXdmEvent, trackPageView, trackLinkClick, trackCtaClick, sendXdmEvent };
```

### 3.4 Wiring XDM to Genesis Synapse Hooks

Genesis synapse data attributes (`data-synapse`) map directly to XDM interaction types. Wire them in `assets/js/script.js` or `assets/js/common.js`:

```javascript
import { trackPageView, trackLinkClick, trackCtaClick } from './common/xdm.js';

// Page view on load
document.addEventListener('DOMContentLoaded', () => {
  trackPageView();

  // Navigate links → XDM link-click
  document.querySelectorAll('[data-synapse="navigate"]').forEach(link => {
    link.addEventListener('click', () => trackLinkClick(link));
  });

  // Execute buttons → XDM CTA click
  document.querySelectorAll('[data-synapse="execute"]').forEach(button => {
    button.addEventListener('click', () => trackCtaClick(button));
  });
});
```

### 3.5 XDM Profile Data Model

For identified-user contexts (e.g., the settings or profile layouts), model user attributes as XDM Individual Profile fields. Store these in `_data/xdm-profile-schema.json` as a reference:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://ns.adobe.com/xdm/context/profile",
  "title": "XDM Individual Profile",
  "description": "Represents an identified or partially-identified individual.",
  "type": "object",
  "properties": {
    "person": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object",
          "properties": {
            "firstName": { "type": "string" },
            "lastName":  { "type": "string" },
            "fullName":  { "type": "string" }
          }
        },
        "birthYear": { "type": "integer" },
        "gender":    { "type": "string", "enum": ["male", "female", "not_specified", "non_specific"] }
      }
    },
    "personalEmail": {
      "type": "object",
      "properties": {
        "address": { "type": "string", "format": "email" }
      }
    },
    "preferences": {
      "type": "object",
      "properties": {
        "theme":    { "type": "string", "enum": ["light", "dark", "system"] },
        "language": { "type": "string" }
      }
    }
  }
}
```

### 3.6 Storing XDM Schemas in `_design/`

The `_design/` directory already holds `tokens.json` and `schema/` blueprints. Add XDM schemas alongside them:

```
_design/
├── tokens.json                         # Design tokens (existing)
├── guide.md                            # UX guide (existing)
├── schema/                             # Blueprint schemas (existing)
│   ├── blueprint.schema.json
│   └── node.schema.json
└── xdm/                                # NEW: XDM schemas
    ├── experience-event.schema.json    # Page view, click events
    ├── individual-profile.schema.json  # User profile attributes
    └── README.md                       # XDM schema usage notes
```

---

## Part 4 — Schema.org

### 4.1 What Is Schema.org?

Schema.org is a collaborative vocabulary for structured data on the web, supported by Google, Bing, Yahoo, and Yandex. Adding Schema.org markup to HTML helps search engines understand page content, enabling rich results (knowledge panels, breadcrumbs, article dates, etc.).

In this repository, Schema.org markup is implemented as **JSON-LD** (preferred) injected into the `<head>` via Jekyll includes. Microdata attributes (`itemscope`, `itemtype`, `itemprop`) may be used when the markup is tightly coupled to the visible content.

### 4.2 Jekyll Include Architecture for Schema.org

Create a dedicated `_includes/seo/` directory that contains one include per Schema.org type:

```
_includes/seo/
├── schema-website.html        # WebSite — used in default.html
├── schema-organization.html   # Organization — used in default.html
├── schema-article.html        # Article / BlogPosting — used in post.html
├── schema-breadcrumb.html     # BreadcrumbList — used with breadcrumb include
├── schema-faq.html            # FAQPage — used in faq.html
├── schema-product.html        # Product — used in landing.html
└── schema-person.html         # Person — used in profile.html
```

Include them in layouts inside the `<head>` block:

```liquid
{% comment %} In _layouts/default.html {% endcomment %}
{% include seo/schema-website.html %}
{% include seo/schema-organization.html %}

{% comment %} In _layouts/post.html {% endcomment %}
{% include seo/schema-article.html %}
{% include seo/schema-breadcrumb.html %}
```

### 4.3 WebSite Schema

**File**: `_includes/seo/schema-website.html`

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": {{ site.title | jsonify }},
  "url": {{ site.url | jsonify }},
  "description": {{ site.description | jsonify }},
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{{ site.url }}/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 4.4 Organization Schema

**File**: `_includes/seo/schema-organization.html`

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": {{ site.title | jsonify }},
  "url": {{ site.url | jsonify }},
  "logo": {
    "@type": "ImageObject",
    "url": "{{ site.url }}/assets/images/logo.png"
  },
  "sameAs": [
    {% if site.github_username %}"https://github.com/{{ site.github_username }}"{% endif %}
  ]
}
</script>
```

### 4.5 Article / BlogPosting Schema

**File**: `_includes/seo/schema-article.html`

Used in `_layouts/post.html` and `_layouts/article.html`.

```liquid
{% assign author_name = page.author | default: site.author %}
{% assign word_count = content | number_of_words %}
{% assign reading_minutes = word_count | divided_by: 200 | plus: 1 %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{{ page.schema_type | default: 'BlogPosting' }}",
  "headline": {{ page.title | jsonify }},
  "description": {{ page.description | default: page.excerpt | strip_html | truncate: 160 | jsonify }},
  "datePublished": "{{ page.date | date_to_xmlschema }}",
  "dateModified": "{{ page.last_modified_at | default: page.date | date_to_xmlschema }}",
  "author": {
    "@type": "Person",
    "name": {{ author_name | jsonify }}
  },
  "publisher": {
    "@type": "Organization",
    "name": {{ site.title | jsonify }},
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}/assets/images/logo.png"
    }
  },
  "url": "{{ site.url }}{{ page.url }}",
  "wordCount": {{ word_count }},
  "timeRequired": "PT{{ reading_minutes }}M"
  {% if page.image %},
  "image": {
    "@type": "ImageObject",
    "url": "{{ site.url }}{{ page.image }}"
  }
  {% endif %}
  {% if page.tags %},
  "keywords": {{ page.tags | join: ', ' | jsonify }}
  {% endif %}
}
</script>
```

### 4.6 BreadcrumbList Schema

**File**: `_includes/seo/schema-breadcrumb.html`

Used alongside `_includes/components/breadcrumb.html` to provide machine-readable navigation context.

```liquid
{% assign crumbs = page.breadcrumbs %}
{% if crumbs %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {% for crumb in crumbs %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "name": {{ crumb.title | jsonify }},
      "item": "{{ site.url }}{{ crumb.url }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
{% endif %}
```

**Front matter to enable breadcrumbs on a page:**

```yaml
---
layout: post
title: "Understanding Consciousness"
breadcrumbs:
  - title: Home
    url: /
  - title: Blog
    url: /blog/
  - title: "Understanding Consciousness"
    url: /blog/understanding-consciousness/
---
```

### 4.7 FAQPage Schema

**File**: `_includes/seo/schema-faq.html`

Used in `_layouts/faq.html`.

```liquid
{% if page.faqs %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {% for faq in page.faqs %}
    {
      "@type": "Question",
      "name": {{ faq.question | jsonify }},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": {{ faq.answer | jsonify }}
      }
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
{% endif %}
```

**Front matter for FAQ page:**

```yaml
---
layout: faq
title: "Frequently Asked Questions"
faqs:
  - question: "What is ASI Saga?"
    answer: "ASI Saga is a consciousness-focused design system for building next-generation web experiences."
  - question: "How do I get started?"
    answer: "Start with the Quick Start Navigation guide at /docs/guides/QUICK-START-NAVIGATION.md"
---
```

### 4.8 Product Schema

**File**: `_includes/seo/schema-product.html`

Used in landing and product pages.

```liquid
{% if page.product %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ page.product.name | jsonify }},
  "description": {{ page.product.description | jsonify }},
  "brand": {
    "@type": "Brand",
    "name": {{ site.title | jsonify }}
  }
  {% if page.product.image %},
  "image": "{{ site.url }}{{ page.product.image }}"
  {% endif %}
  {% if page.product.price %},
  "offers": {
    "@type": "Offer",
    "price": "{{ page.product.price }}",
    "priceCurrency": "{{ page.product.currency | default: 'USD' }}",
    "availability": "https://schema.org/InStock"
  }
  {% endif %}
}
</script>
{% endif %}
```

### 4.9 Person Schema

**File**: `_includes/seo/schema-person.html`

Used in `_layouts/profile.html`.

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": {{ page.profile_name | default: page.title | jsonify }},
  "description": {{ page.bio | default: page.description | jsonify }}
  {% if page.avatar %},
  "image": "{{ site.url }}{{ page.avatar }}"
  {% endif %}
  {% if page.profile_url %},
  "url": "{{ site.url }}{{ page.profile_url }}"
  {% endif %}
  {% if page.social_links %},
  "sameAs": [
    {% for link in page.social_links %}
    {{ link.url | jsonify }}{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
  {% endif %}
}
</script>
```

### 4.10 Schema.org and Atomic Design Alignment

Schema.org types align with Atomic Design levels in a complementary way:

| Atomic Level | Genesis Level | Schema.org Type | Example |
|-------------|--------------|----------------|---------|
| Atom | Level 4 | `@type: Date`, `@type: Person` | `<time itemprop="datePublished">` |
| Molecule | Level 3 | `@type: Review`, `@type: ImageObject` | Review card component |
| Organism | Level 2–3 | `@type: Article`, `@type: Product` | Full article section |
| Template | Level 1–2 | `@type: WebPage`, `@type: BlogPosting` | Layout-level JSON-LD |
| Page | Level 1 | `@type: WebSite`, `@type: FAQPage` | Page-specific JSON-LD in `<head>` |

---

## Part 5 — Unified Implementation Workflow

The four methodologies work together in this layered workflow:

### Step 1 — Model the data (XDM + Schema.org)

Before writing any HTML or SCSS, decide:

1. **What Schema.org type** best describes this content? (e.g., `BlogPosting`, `Product`, `FAQPage`)
2. **What XDM event** should be tracked when a user interacts? (e.g., `web.webpagedetails.pageViews`, `web.webinteraction.linkClicks`)
3. **What XDM profile fields** are relevant? (e.g., `person.name`, `preferences.theme`)

Write or update the relevant schema include and XDM event call.

### Step 2 — Identify the Atomic level

Classify each UI element:

- Is it a standalone text or action element? → **Atom** (cognition or synapse mixin)
- Is it a self-contained visual unit grouping atoms? → **Molecule** (entity mixin)
- Is it a complex section grouping molecules? → **Organism** (environment + atmosphere mixin)
- Is it a full page skeleton? → **Template** (Jekyll layout file)
- Is it a real content page? → **Page** (subdomain HTML with front matter)

### Step 3 — Map states

For every molecule and organism that can change over time, define the complete state set:

```scss
.my-component {
  @include genesis-entity('primary');                       // Base visual
  &[data-state="stable"]     { @include genesis-state('stable'); }
  &[data-state="evolving"]   { @include genesis-state('evolving'); }
  &[data-state="deprecated"] { @include genesis-state('deprecated'); }
}
```

### Step 4 — Write the HTML

Using the Schema.org type as a guide for semantic element choice, write the Liquid template. Include JSON-LD in the `<head>` via the appropriate `_includes/seo/*.html` include.

### Step 5 — Wire XDM events

Add `data-synapse` attributes to interactive elements and wire the corresponding XDM event calls in JavaScript.

### Full example — Blog Post

**Front matter:**
```yaml
---
layout: post
title: "The Architecture of Consciousness"
date: 2026-03-01
author: "Dr. A. Kumar"
image: /assets/images/posts/consciousness.jpg
tags: [consciousness, architecture, AI]
breadcrumbs:
  - title: Home
    url: /
  - title: Blog
    url: /blog/
  - title: "The Architecture of Consciousness"
    url: /blog/consciousness-architecture/
---
```

**`_layouts/post.html` (relevant excerpt):**
```liquid
---
layout: default
---
{% include seo/schema-article.html %}
{% include seo/schema-breadcrumb.html %}

<div class="post-layout" data-state="stable">
  <header class="post-layout__header">
    <h1 class="post-layout__title">{{ page.title }}</h1>
    {% include layouts/post/post-meta.html
       date=page.date
       author=page.author
       reading_time=page.reading_time
       tags=page.tags %}
    {% include components/breadcrumb.html %}
  </header>

  <div class="post-layout__body">
    {{ content }}
  </div>
</div>
```

**`_sass/layouts/_post.scss` (relevant excerpt):**
```scss
.post-layout {
  @include genesis-environment('focused');     // Level 1 — 70ch reading column
  @include genesis-atmosphere('neutral');      // Level 1 — standard tone

  // State variants
  &[data-state="stable"]   { @include genesis-state('stable'); }
  &[data-state="evolving"] { @include genesis-state('evolving'); }

  .post-layout__header {
    @include genesis-environment('associative');  // Level 2 — flex meta row
  }

  .post-layout__title {
    @include genesis-cognition('axiom');           // Level 4 — headline atom
  }

  .post-layout__body {
    @include genesis-cognition('discourse');       // Level 4 — body prose atom
  }
}
```

**`assets/js/script.js` (XDM wiring):**
```javascript
import { trackPageView, trackLinkClick } from './common/xdm.js';

document.addEventListener('DOMContentLoaded', () => {
  trackPageView();

  document.querySelectorAll('[data-synapse="navigate"]').forEach(link => {
    link.addEventListener('click', () => trackLinkClick(link));
  });
});
```

---

## Validation Checklist

Before merging any new layout or component, verify:

### Atomic Design
- [ ] Every leaf element uses only `genesis-cognition` or `genesis-synapse`
- [ ] Every component-level element uses `genesis-entity`
- [ ] Every section-level element uses `genesis-environment` (+ optionally `genesis-atmosphere`)
- [ ] No `genesis-entity` on Level 1/2 structural containers
- [ ] No `genesis-cognition` on containers

### State-to-UI Mapping
- [ ] Every stateful element has a `data-state` attribute
- [ ] SCSS maps all relevant `data-state` values to `genesis-state` variants
- [ ] JavaScript uses `setState()` (or direct `element.dataset.state`) — no ad-hoc class toggling
- [ ] Interactive elements inside `locked` components have `pointer-events: auto` and `filter: none`

### XDM
- [ ] Page view is tracked on `DOMContentLoaded`
- [ ] All `[data-synapse="execute"]` buttons track CTA clicks
- [ ] All `[data-synapse="navigate"]` links track link clicks
- [ ] XDM payloads match the `ExperienceEvent` schema structure

### Schema.org
- [ ] Every page includes at least `schema-website.html` and `schema-organization.html` (via `default.html`)
- [ ] Post and article layouts include `schema-article.html`
- [ ] Pages with breadcrumbs include `schema-breadcrumb.html`
- [ ] FAQ layouts include `schema-faq.html`
- [ ] Profile layouts include `schema-person.html`
- [ ] JSON-LD is valid (test with [Google Rich Results Test](https://search.google.com/test/rich-results))

---

## References

| Resource | Location |
|----------|----------|
| Genesis ontology levels | `docs/specifications/ontology-html-mapping.md` |
| Genesis state mixin | `_sass/ontology/engines/_state.scss` |
| Genesis synapse mixin | `_sass/ontology/engines/_synapse.scss` |
| Design token schema | `_design/tokens.json` |
| Blueprint schemas | `_design/schema/` |
| Accessibility spec | `docs/specifications/accessibility.md` |
| JavaScript patterns | `docs/specifications/javascript-interaction-patterns.md` |
| Component library | `docs/specifications/component-library.md` |
| HTML semantic patterns | `docs/specifications/html-semantic-patterns.md` |
| [Atomic Design (Brad Frost, 2013)](https://atomicdesign.bradfrost.com) | [https://atomicdesign.bradfrost.com](https://atomicdesign.bradfrost.com) |
| XDM Reference | [https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html) |
| Schema.org | [https://schema.org](https://schema.org) |
| Google Rich Results Test | [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results) |
