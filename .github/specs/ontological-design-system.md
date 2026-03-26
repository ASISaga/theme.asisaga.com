# Genesis Ontological Design System Specification

**Version**: 2.2.0  
**Status**: Active  
**Last Updated**: 2026-03-26

## Overview

The Genesis Ontological Design System is a semantic-first CSS framework built on SCSS mixins that prioritize meaning over appearance. It follows a three-tier architecture to maintain separation between pure semantic intent, visual implementation, and content application.

## Scope

This specification defines:
- The six semantic categories and their variants
- Three-tier architecture (Engine → Theme → Subdomains)
- Import rules and compilation patterns
- Ontological Proposition System for evolution

## Three-Tier Architecture

### 1. Engine Layer (`_sass/ontology/`)

Pure semantic mixins with zero implementation assumptions:
- No color values, spacing values, or visual specifics
- Only semantic variant names
- Provides the vocabulary for design intent

### 2. Theme Layer (`_sass/components/`, `_sass/layouts/`)

Visual implementation using ontology:
- Maps semantic mixins to actual CSS properties
- Defines the visual language
- Implements components and layouts

### 3. Subdomain Layer

Content pages with optional page-specific styling:
- Uses ontology mixins exclusively (no raw CSS)
- Page-specific SCSS in `_sass/main.scss`
- NO `@import` statements (ontology provided by theme)

## Six Semantic Categories

The ontology defines **89 total variants** across 6 categories. The 33 foundational variants form the core semantic vocabulary, while 56 evolved variants extend the system for specialized use cases discovered through subdomain development.

### 1. genesis-environment($logic) — 21 variants

**Purpose**: Layout structure and spatial organization

**Foundational variants** (7):
- `'distributed'` — Responsive auto-fit bento grid (card grids, portfolios, galleries)
- `'focused'` — Centered narrow column, 70ch reading width (blog posts, articles, docs)
- `'associative'` — Flex-wrap groupings (tag clouds, metadata rows, related items)
- `'chronological'` — Time-linear vertical stack (feeds, timelines, marketing sections)
- `'manifest'` — High-density 12-column dashboard grid (analytics, monitoring)
- `'convergent'` — Two-column sidebar + main content layout
- `'panelled'` — Multi-panel app shell (three+ columns)

**Evolved variants** (14):
- `'editorial-feed'` — Editorial content feed layout
- `'interaction-form'` — Form-based interaction layout
- `'navigation-accordion'` — Accordion navigation structure
- `'navigation-breadcrumb'` — Breadcrumb trail layout
- `'navigation-footer'` — Footer navigation layout
- `'navigation-pagination'` — Pagination controls layout
- `'navigation-primary'` — Primary navigation layout
- `'navigation-secondary'` — Secondary navigation layout
- `'navigation-sidebar'` — Sidebar navigation layout
- `'navigation-tabs'` — Tab navigation layout
- `'notification-center'` — Notification center layout
- `'comment-thread'` — Threaded comment layout
- `'community-feed'` — Community content feed
- `'user-grid'` — User/avatar grid layout

### 2. genesis-entity($nature) — 17 variants

**Purpose**: Visual presence and hierarchy

**Foundational variants** (6):
- `'primary'` — Main content or action
- `'secondary'` — Supporting content
- `'imperative'` — Critical or urgent
- `'latent'` — De-emphasized or hidden until interaction
- `'aggregate'` — Collection or summary
- `'ancestral'` — Historical or deprecated but preserved

**Evolved variants** (11):
- `'avatar'` — User avatar/profile image
- `'badge'` — Notification or status badge
- `'editorial'` — Editorial content entity
- `'embed-responsive'` — Responsive embed container
- `'ephemeral'` — Temporary/dismissible content
- `'image-adaptive'` — Adaptive image container
- `'notification'` — Notification entity
- `'reaction-picker'` — Emoji/reaction selector
- `'surface-glass'` — Glassmorphism surface
- `'transcendent'` — Elevated/transcendent visual treatment
- `'user-card'` — User profile card

### 3. genesis-cognition($intent) — 9 variants

**Purpose**: Typography and textual meaning

**Foundational variants** (6):
- `'axiom'` — Page titles, section headings (2–3.5rem bold, fluid scaling)
- `'discourse'` — Body text, prose paragraphs (1–1.125rem, serif, 1.6 line-height)
- `'protocol'` — Code blocks, technical content (monospace, code styling)
- `'gloss'` — Metadata, captions, timestamps (0.8–0.875rem, muted)
- `'motive'` — Calls to action, persuasive copy (semibold, accent color)
- `'quantum'` — Tags, chips, badges (tiny, uppercase, dense pill shape)

**Evolved variants** (3):
- `'heading'` — Sub-heading typography
- `'oracle'` — Instructional/wisdom text
- `'testimony'` — Testimonial/quote typography

### 4. genesis-synapse($vector) — 19 variants

**Purpose**: Interaction and user actions

**Foundational variants** (5):
- `'navigate'` — Links and navigation
- `'execute'` — Buttons and actions
- `'inquiry'` — Forms and input
- `'destructive'` — Delete or remove actions
- `'social'` — Share and connect

**Evolved variants** (14):
- `'anchor'` — In-page anchor link
- `'comment'` — Comment/reply action
- `'consent'` — Consent/agreement interaction
- `'input-primary'` — Primary input field
- `'invoke'` — Invocation/trigger action
- `'mention'` — @mention interaction
- `'notify'` — Notification trigger
- `'paginate'` — Pagination control
- `'react'` — Reaction/emoji interaction
- `'share'` — Content sharing action
- `'step'` — Stepper/wizard step
- `'tab'` — Tab switching interaction
- `'toggle'` — Toggle switch
- `'vote'` — Upvote/downvote interaction

### 5. genesis-state($condition) — 14 variants

**Purpose**: Temporal states and status

**Foundational variants** (5):
- `'stable'` — Normal, default state
- `'evolving'` — Loading, in progress
- `'deprecated'` — Outdated but accessible
- `'locked'` — Disabled or restricted
- `'simulated'` — Preview or demo mode

**Evolved variants** (9):
- `'active'` — Currently active/selected state
- `'collapsed'` — Collapsed/minimized state
- `'expanded'` — Expanded/open state
- `'emerging'` — Transitioning into view
- `'mentioned'` — Highlighted by @mention
- `'reacted'` — Has received reactions
- `'scroll-triggered'` — Activated by scroll position
- `'transcending'` — Elevated/transcending state
- `'unread'` — Unread/new content indicator

### 6. genesis-atmosphere($vibe) — 9 variants

**Purpose**: Mood and emotional tone

**Foundational variants** (4):
- `'neutral'` — Default, balanced
- `'ethereal'` — Light, airy
- `'void'` — Dark, mysterious
- `'vibrant'` — Energetic, bold

**Evolved variants** (5):
- `'cosmic'` — Cosmic/space-inspired atmosphere
- `'sacred'` — Sacred/spiritual tone
- `'dense-desktop'` — Desktop-optimized density
- `'spacious-mobile'` — Mobile-optimized spacing
- `'viewport-aware'` — Responsive viewport-based atmosphere

### Variant Summary

| Category | Foundational | Evolved | Total |
|----------|-------------|---------|-------|
| Environment | 7 | 14 | **21** |
| Entity | 6 | 11 | **17** |
| Cognition | 6 | 3 | **9** |
| Synapse | 5 | 14 | **19** |
| State | 5 | 9 | **14** |
| Atmosphere | 4 | 5 | **9** |
| **Total** | **33** | **56** | **89** |

## Usage Example

```scss
.blog-post {
  @include genesis-environment('focused');    // Level 1: narrow reading column
  @include genesis-atmosphere('neutral');     // Level 1: standard tone

  .post-header {
    @include genesis-environment('associative');  // Level 2: horizontal section
  }

  .post-title {
    @include genesis-cognition('axiom');      // Level 4: page heading
  }

  .post-meta {
    @include genesis-environment('associative');  // Level 2: metadata section
  }

  .post-date,
  .post-author {
    @include genesis-cognition('gloss');      // Level 4: metadata leaf elements
  }

  .post-content {
    @include genesis-environment('focused');  // Level 2: body section
  }

  .post-body-text {
    @include genesis-cognition('discourse');  // Level 4: prose paragraphs
  }

  .read-more {
    @include genesis-synapse('navigate');     // Level 4: navigation link
  }
}
```

## HTML Hierarchy Rules

Every HTML element falls into one of four hierarchy levels. Each level has permitted and forbidden mixin categories.

| Level | Element type | Required | Forbidden |
|-------|-------------|----------|-----------|
| **1 — Page Layout** | Outermost content wrapper | `genesis-environment()` + `genesis-atmosphere()` | `genesis-entity()`, `genesis-cognition()`, `genesis-synapse()` |
| **2 — Section** | `<header>`, `<footer>`, `<section>`, `<aside>`, `<nav>` | `genesis-environment()` | `genesis-entity()`, `genesis-cognition()` |
| **3 — Component** | Cards, widgets, alerts, form groups | `genesis-entity()` | `genesis-cognition()` |
| **4 — Leaf** | `<h1>`–`<h6>`, `<p>`, `<a>`, `<button>`, `<span>`, `<time>` | `genesis-cognition()` or `genesis-synapse()` | `genesis-environment()`, `genesis-atmosphere()`, `genesis-entity()` |

**Key violations to avoid:**
- ❌ `genesis-entity()` on structural containers (Level 1/2) — entity is for component-level visual objects only
- ❌ `genesis-cognition()` on containers — cognition is for text elements only
- ❌ `genesis-atmosphere()` on leaf elements — atmosphere is for containers

→ **Full hierarchy specification**: `docs/specifications/ontology-html-mapping.md`

## Visual Design Element Semantic Ownership

Each visual CSS concern maps from a **semantic purpose** through an owning ontological category. Never set a property outside its owning category.

| Semantic Purpose | Owner | Visual Design Element | CSS Properties |
|-----------------|-------|---------------------|---------------|
| **Responsive spatial rhythm** — gaps signal section boundaries | Environment | White space (between elements) | `gap`, `margin` (via grid/flex) |
| **Component breathing room** — variant-weight padding per component density | Entity | Spacing (within elements) | `padding` |
| **Content flow architecture** — `distributed`=auto-fit grids, `focused`=70ch, `manifest`=12-col | Environment | Layout / grid | `display`, `grid-*`, `flex-*`, `place-*`, `max-width` |
| **Page mood and component surface** — OKLCH palette per atmosphere/entity variant | Atmosphere + Entity | Color palette | `background`, `color` (via tokens) |
| **Information voice and reading intent** — `axiom`=headlines, `discourse`=body, `protocol`=code | Cognition | Typography | `font-size`, `font-weight`, `font-family`, `line-height`, `letter-spacing`, `text-transform` |
| **Component edge treatment and shape** — 1px subtle, 2px neon accent, 999px pill | Entity | Borders | `border`, `border-radius` |
| **Ambient depth and spatial layering** — glow, inset shadow, neon glow per atmosphere | Atmosphere | Shading / shadows | `box-shadow` |
| **Lifecycle transitions and temporal signaling** — `evolving`=sweep gradient, `scroll-triggered`=fade-in-up | State | Animations | `animation`, `transition`, `@keyframes` |
| **Content availability and lifecycle visibility** — `stable`=full, `deprecated`=50% + grayscale, `locked`=blur | State | Opacity / filters | `opacity`, `filter` |
| **Action-specific interaction feedback** — `navigate`=hover underline, `execute`=neon glow, 44px touch targets | Synapse | Hover / focus states | `:hover`, `:focus`, `cursor`, `transition` |

→ **Full ownership table with CSS implementation details**: `docs/specifications/ontology-html-mapping.md`

## Import Rules

### Theme Repository

**Single import point** in `_sass/_common.scss`:
```scss
@import "ontology/index";  // Line 64
```

**DO NOT import in**:
- Component files (`_sass/components/*.scss`)
- Layout files (`_sass/layouts/*.scss`)
- Any other `_sass/` file (ontology already available)

### Subdomain Repositories

**NO imports** - ontology provided by theme via `remote_theme`:
- `_sass/main.scss` has NO front matter
- `_sass/main.scss` has NO `@import` statements
- Ontology mixins available automatically
- Use mixins directly

## Ontological Proposition System

### Purpose

Evolutionary mechanism for extending the ontology when subdomains encounter use cases not expressible with existing variants.

### Process

1. **Subdomain Evolution Agent** identifies semantic gap
   - Reviews existing 89 variants (33 foundational + 56 evolved)
   - Confirms gap can't be solved by combination
   - Creates Ontological Proposition PR

2. **Theme Genome Agent** reviews proposition
   - **Semantic purity**: Named by WHAT, not HOW
   - **No redundancy**: Doesn't overlap existing variants
   - **Universal applicability**: Useful beyond one use case

3. **If approved**, implement in theme
   - Add variant to `_sass/ontology/`
   - Update `GENOME.md` with variant history
   - Document in `/docs/specifications/scss-ontology-system.md`
   - Update subdomain intelligence with new variant

### Validation Criteria

**Semantic Purity Examples**:
- ✅ Named by purpose: `'chronicle'`, `'ephemeral'`, `'resonant'`
- ❌ Named by appearance: `'blue-glossy'`, `'rounded-shadow'`

**Non-Redundancy**:
- ✅ Fills genuine gap in ontology
- ❌ Overlaps existing variants or combinations

**Universal Applicability**:
- ✅ Useful across multiple contexts/subdomains
- ❌ Solves only one specific use case

## Testing & Validation

```bash
npm test              # All tests (compilation + lint)
npm run test:scss     # SCSS compilation check
npm run lint:scss     # Stylelint validation
```

## Complete Reference

→ **Ontology-to-HTML mapping**: `docs/specifications/ontology-html-mapping.md`  
→ **Full ontology documentation**: `/docs/specifications/scss-ontology-system.md`  
→ **Integration guide**: `_sass/ontology/INTEGRATION-GUIDE.md`  
→ **Genome history**: `GENOME.md`

---

**Related Specifications**:
- `.github/specs/theme-subdomain-architecture.md`
- `.github/specs/agent-intelligence-framework.md`
