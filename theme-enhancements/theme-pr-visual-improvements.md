---
description: "Theme PR — Visual improvements for saga.asisaga.com: new ontological variants + component enhancements"
target_repo: "ASISaga/theme.asisaga.com"
source_repo: "ASISaga/saga.asisaga.com"
date: "2026-03-21"
type: "theme-pr"
related_audit: ".github/prompts/frontend-audit-2026-03.md"
---

# 🎨 Theme PR: Visual Improvements for saga.asisaga.com

**Source**: saga.asisaga.com — frontend audit (2026-03-21)  
**Target**: ASISaga/theme.asisaga.com  
**Priority**: High — multiple critical frontend-skill failures identified  

---

## Context

A frontend-skill audit of saga.asisaga.com identified the following categories of visual failure:
- No real visual anchor in the hero (pure CSS gradient, no image)
- Blog listing is a generic card grid (violates "no cards" principle)
- Blog card titles use hero-scale `axiom` typography (32–56px per listing item)
- Post layout ignores the post's `image` front matter
- Missing featured-first editorial layout

The fix requires a combination of **new ontological variants** (this PR) and **theme component enhancements** (this PR). The subdomain will update its SCSS and HTML to use the new variants once merged.

---

## 🔧 Component Enhancements (No New Variants)

### Enhancement 1 — `transcendent-hero.html`: Add `image` parameter

**File**: `_includes/transcendent-hero.html`  
**Change**: Add `image` and `image_alt` parameters. When provided, render the image as a full-bleed background with the text column floating over a dark tonal area of the image.

**Proposed HTML change:**
```html
{% assign hero_image = include.image | default: "" %}
{% assign hero_image_alt = include.image_alt | default: "" %}

<section id="{{ hero_id }}" 
  class="transcendent-hero {{ hero_size }} {{ hero_style }} {{ background_type }}"
  {% if hero_image != "" %}style="--hero-image: url('{{ hero_image }}')"{% endif %}>

  {% if hero_image != "" %}
  <div class="transcendent-hero__image" role="img" aria-label="{{ hero_image_alt }}"></div>
  {% endif %}

  <!-- existing consciousness-background div remains for cases without image -->
  <div class="consciousness-background" {% if hero_image != "" %}aria-hidden="true"{% endif %}>
    ...
  </div>
  ...
```

**Proposed CSS in `_sass/components/sacred/transcendent-hero.scss`:**
```scss
.transcendent-hero {
  // When image is provided via CSS custom property
  &:has(.transcendent-hero__image) {
    // Full bleed: no inherited gutters
    position: relative;
    overflow: hidden;
    
    .consciousness-background {
      opacity: 0.4; // Reduce gradient overlay when real image is present
    }
  }
  
  &__image {
    position: absolute;
    inset: 0;
    background-image: var(--hero-image);
    background-size: cover;
    background-position: center 30%; // Position toward top for faces/key subjects
    z-index: 0;
    
    // Dark overlay scrim for text contrast
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        oklch(0.05 0.02 260 / 0.85) 0%,   // Strong dark left — text lives here
        oklch(0.05 0.02 260 / 0.50) 50%,
        oklch(0.05 0.02 260 / 0.25) 100%   // Image visible on right
      );
    }
  }
  
  // Text content must always sit above the image
  .transcendent-hero-content {
    position: relative;
    z-index: 1;
  }
}
```

**Rationale**: The hero currently has no visual anchor. With a real image, the brand name "ASI Saga" becomes unmistakable against a rich photographic backdrop. The left-to-right gradient scrim keeps WCAG AA contrast while showing the image on the right side.

---

### Enhancement 2 — `post.html` layout: Surface post `image` as hero

**File**: `_layouts/post.html`  
**Change**: When `page.image` is set in front matter, pass it to `transcendent-hero.html` at the top of the post, creating a rich visual opening for each article.

**Proposed HTML change:**
```html
---
layout: default
---

{% assign post_image = page.image | default: "" %}
{% if post_image != "" %}
{% include transcendent-hero.html
   title=page.title
   description=page.description
   image=post_image
   image_alt=page.title
   size="compact"
   button_text=""
%}
{% endif %}

<genesis-environment logic="focused">
  <genesis-entity nature="primary">
    <article class="post-layout">
      {% if post_image == "" %}
      {% include layouts/layout-header.html
         class_prefix="post"
         title=page.title
      %}
      {% endif %}
      ...
```

**Rationale**: Posts that declare `image:` in front matter deserve that image to anchor the reading experience. "The Three Voices of AI" has a real banner — it should be the first thing a reader sees.

---

## 🧩 Ontological Propositions (New Variants)

---

### Proposition 1 — `genesis-cognition('heading')`

**🧩 Ontological Proposition**

**Source Node**: saga.asisaga.com

**Intent (The 'What')**: A secondary heading scale for article titles within listings, section titles, and content headings — semantically distinct from the thesis-level `axiom`.

**Context (The 'Why')**:  
The existing `axiom` variant uses `clamp(2rem, 5vw, 3.5rem)` — designed for a page's singular central headline. When used for every blog post title in a list of 10, the result is 10 identical 32–56px screaming headlines with no hierarchy. There is no heading variant in the 6-item Cognition category that addresses secondary/tertiary heading scales. `gloss` is too small (annotations). `discourse` has no heading weight. `axiom` is too large and should remain reserved for the primary page heading.

**Proposed Role:**
- **Type**: Cognition
- **Suggested Label**: `genesis-cognition('heading')`
- **Relationship**: Between `axiom` (primary thesis, 2–3.5rem) and `discourse` (body text, 1rem). Represents article titles, section headings, and h2-level content — the supporting information hierarchy below the single axiom.

**Use Cases:**

1. **saga.asisaga.com**: Blog listing post titles — currently wrongly using `axiom`; need a scale that reads clearly as titles but doesn't overpower the brand or each other in a list
2. **research.asisaga.com**: Research paper titles in an archive listing — same pattern: multiple titles competing at hero scale
3. **docs.asisaga.com**: Section headings in documentation — h2/h3 headings that structure long-form content
4. **community.asisaga.com**: Thread titles in discussion boards — must be readable, scannable, not overwhelming

**Universal Applicability:**
- **research.asisaga.com**: Article and paper headings in publication listings
- **docs.asisaga.com**: Documentation section headings (h2, h3 levels)
- **analytics.asisaga.com**: Widget/panel titles in dashboard layouts
- **community.asisaga.com**: Thread titles, comment headings in social content

**Suggested Implementation:**
```scss
/**
 * @category Cognition
 * @variant 'heading'
 * @origin PR from saga.asisaga.com (frontend-skill audit 2026-03)
 * @intent Secondary heading — article titles in listings, section h2/h3 headings
 * @since v5.0
 */
@else if $intent == 'heading' {
  // Secondary heading — article/section titles, below axiom, above discourse
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);  // 20–28px
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: oklch(0.10 0.01 250);  // Deep black, same as axiom
  font-family: var(--font-consciousness, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  
  @media (max-width: 767px) {
    font-size: 1.25rem;
    line-height: 1.3;
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.75rem;
  }
}
```

**Success Criteria:**
- [x] Not Redundant: `axiom` is 2–3.5rem (hero scale), `discourse` is 1rem body text — nothing exists at 1.25–1.75rem article/section title scale
- [x] Universal: Every subdomain that has listing pages or multi-section content needs this scale
- [x] Semantic: Describes the ROLE of the information (a secondary heading) not its appearance
- [x] Categorized: Cognition — describes information type/frequency
- [x] Well-Defined: Clear examples provided above

---

### Proposition 2 — `genesis-entity('editorial')`

**🧩 Ontological Proposition**

**Source Node**: saga.asisaga.com

**Intent (The 'What')**: An entity type for editorial content entries (blog posts, articles, research papers in a listing) that presents content WITHOUT card chrome — no border, no background surface — just structured content with internal spacing.

**Context (The 'Why')**:  
The existing `secondary` entity creates a visible card (light-grey background, border, padding). In an editorial/blog context this creates the "Generic SaaS card grid" failure. `latent` reduces opacity which is semantically wrong (the post is NOT inactive). `primary` is even heavier chrome. There is no card-less entity type in the current 6+10 variants — all entity variants apply a surface treatment (background, border, or shadow). An editorial listing item is a typographic entity, not a surface.

**Proposed Role:**
- **Type**: Entity
- **Suggested Label**: `genesis-entity('editorial')`
- **Relationship**: Lighter than `secondary` (no surface). Sibling to `primary`/`secondary` but specifically for editorial content that relies on typography, whitespace, and optional thumbnail to create hierarchy rather than surface chrome.

**Use Cases:**

1. **saga.asisaga.com**: Blog post listing items — each post should be a clean typographic row with date, title, excerpt, and optional category tags. No card border.
2. **research.asisaga.com**: Research paper listings — academic content should feel precise and surface-less
3. **docs.asisaga.com**: Article index entries in documentation table of contents
4. **community.asisaga.com**: Discussion thread entries in a feed

**Universal Applicability:**
- **research.asisaga.com**: Clean research paper listings and author publication records
- **docs.asisaga.com**: Documentation article index entries
- **analytics.asisaga.com**: Report/dashboard listing rows in a saved-items list
- **community.asisaga.com**: Discussion thread entries

**Suggested Implementation:**
```scss
/**
 * @category Entity
 * @variant 'editorial'
 * @origin PR from saga.asisaga.com (frontend-skill audit 2026-03)
 * @intent Card-less editorial content entry for blog/article listings
 * @since v5.0
 */
@else if $nature == 'editorial' {
  // Editorial entry: typographic presence without card chrome
  background: transparent;
  border: none;
  border-top: 1px solid oklch(0.90 0.005 220);  // Subtle divider only
  padding: var(--padding-entity-secondary, clamp(1rem, 2vw, 1.5rem)) 0;
  box-shadow: none;
  border-radius: 0;  // No rounded corners — this is a document row, not a card
  
  // Optional featured treatment for first/hero items in editorial feed
  &.editorial-featured {
    border-top: 2px solid oklch(0.65 0.15 85);  // Gold accent for first item
    padding-top: var(--padding-entity-aggregate, clamp(2rem, 4vw, 3rem));
  }
  
  // Hover: subtle text emphasis, no surface change
  &:hover {
    background: transparent;
    border-top-color: oklch(0.75 0.10 85);
  }
  
  @media (prefers-contrast: high) {
    border-top-color: oklch(0.50 0 0);
    
    &.editorial-featured {
      border-top-color: oklch(0.60 0 0);
      border-top-width: 3px;
    }
  }
}
```

**Success Criteria:**
- [x] Not Redundant: No existing entity variant renders without a surface background. All current variants apply background colour, which is wrong for editorial listings.
- [x] Universal: Applies to any subdomain that has a list/index of editorial content
- [x] Semantic: Describes the entity role (an editorial content entry) not its visual treatment
- [x] Categorized: Entity — describes presence and weight in the system
- [x] Well-Defined: Clear distinction from `secondary` (surfaces) and `latent` (inactive/dimmed)

---

### Proposition 3 — `genesis-environment('editorial-feed')`

**🧩 Ontological Proposition**

**Source Node**: saga.asisaga.com

**Intent (The 'What')**: A blog/editorial listing layout that promotes the first item to a featured, full-width position and flows the remaining items in a compact readable list below it.

**Context (The 'Why')**:  
`chronological` stacks all items identically in a single column at equal visual weight. `distributed` (bento grid) treats all items as autonomous entities of equal prominence. Neither creates the editorial hierarchy where the most recent/primary item is visually dominant over the rest. This is a distinct semantic pattern: a list with one featured leader and a supporting tail — used in every major editorial publication, every news site, every editorial blog.

**Proposed Role:**
- **Type**: Environment
- **Suggested Label**: `genesis-environment('editorial-feed')`
- **Relationship**: Extends `chronological` (time-ordered) with a featured-first visual hierarchy

**Use Cases:**

1. **saga.asisaga.com**: Homepage blog listing — latest post featured full-width at top, remaining 9 posts as compact list entries below
2. **research.asisaga.com**: Latest research/publications page — featured recent paper prominent, older papers as reference list
3. **docs.asisaga.com**: What's-new or changelog page — latest release featured, prior releases as compact list
4. **community.asisaga.com**: Community discussion feed — pinned/featured discussion prominent over recent activity

**Universal Applicability:**
- **research.asisaga.com**: Publications index with most-recent featured prominently
- **docs.asisaga.com**: Changelog, release notes, or what's-new page
- **analytics.asisaga.com**: Report history with most-recent report featured at top
- **community.asisaga.com**: Discussion or announcement feed with pinned item featured

**Suggested Implementation:**
```scss
/**
 * @category Environment
 * @variant 'editorial-feed'
 * @origin PR from saga.asisaga.com (frontend-skill audit 2026-03)
 * @intent Blog/editorial listing with featured-first hierarchy
 * @since v5.0
 */
@else if $logic == 'editorial-feed' {
  // Time-ordered editorial feed with prominent first item
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  
  // Featured first item spans full width and receives larger treatment
  > :first-child {
    // First child is featured — environment provides spacing/layout,
    // genesis-entity('editorial') with .editorial-featured handles the visual treatment
    padding-bottom: clamp(2rem, 4vw, 3rem);
    margin-bottom: clamp(1rem, 2vw, 1.5rem);
    position: relative;
    
    // Visual separator between featured and list
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        oklch(0.75 0.10 85 / 0.5),
        transparent
      );
    }
  }
  
  // Remaining items form a compact list
  > :not(:first-child) {
    // Compact list treatment — spacing tighter than featured item
    gap: 0;
  }
  
  // Desktop: featured item gets left ~65% width, allows optional side column
  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
    
    // Option: if layout supports featured + sidebar pattern, enable via modifier
    &.with-sidebar {
      grid-template-columns: 2fr 1fr;
      gap: clamp(2rem, 4vw, 3rem);
      
      // Featured item spans only the main column
      > :first-child {
        grid-column: 1;
        grid-row: 1 / span 3;
        padding-bottom: 0;
        
        &::after {
          display: none;
        }
      }
      
      // Remaining items fill the sidebar column
      > :not(:first-child) {
        grid-column: 2;
      }
    }
  }
  
  // Mobile: full single column, featured item slightly more padding
  @media (max-width: 767px) {
    gap: 0;
    
    > :first-child {
      padding-bottom: 1.5rem;
      margin-bottom: 0.75rem;
    }
  }
}
```

**Success Criteria:**
- [x] Not Redundant: `chronological` has no featured-first hierarchy. `distributed` is a bento grid, not a list. `focused` is for single narratives.
- [x] Universal: Every subdomain with any form of editorial listing benefits from this pattern
- [x] Semantic: Describes the STRUCTURE of the environment (editorial ordered feed with hierarchy)
- [x] Categorized: Environment — defines spatial organization of the digital dimension
- [x] Well-Defined: Concrete examples from multiple contexts

---

### Proposition 4 — `genesis-atmosphere('cosmic')`

**🧩 Ontological Proposition**

**Source Node**: saga.asisaga.com

**Intent (The 'What')**: A rich deep-space atmospheric backdrop for blog sections and mission-adjacent content — darker than the neutral page background, evoking the ASI Saga cosmic identity, without being as heavy or ceremony-specific as `sacred`.

**Context (The 'Why')**:  
The blog listing section on the homepage renders on the same neutral white background as everything else. For a site about Artificial Superintelligence and consciousness, the blog section deserves atmospheric depth — the feeling of reading from the edge of the known universe. The `void` atmosphere is too extreme (near-black, maximum contrast). The `sacred` atmosphere is ceremony-specific (gold accent line, reserved for genesis content). `neutral` is featureless. There is no in-between atmosphere that evokes cosmic depth without ceremony heaviness.

**Proposed Role:**
- **Type**: Atmosphere
- **Suggested Label**: `genesis-atmosphere('cosmic')`
- **Relationship**: Between `neutral` (featureless) and `void` (extreme black). Lighter than `void`, deeper than `neutral`, without the ceremony specificity of `sacred`.

**Use Cases:**

1. **saga.asisaga.com**: Blog listing section background — the section where all posts are listed should feel like the cosmos, not an office intranet
2. **research.asisaga.com**: Research archive section — deep-space feel appropriate for profound academic content
3. **docs.asisaga.com**: Content sections within long-form documentation where depth/context should feel expansive
4. **analytics.asisaga.com**: Background for AI insight panels or predictive sections

**Universal Applicability:**
- **research.asisaga.com**: Publication archive or abstract sections requiring depth without ceremony
- **docs.asisaga.com**: Overview or conceptual sections in documentation
- **analytics.asisaga.com**: AI/predictive analytics sections that benefit from a deep-space feel
- **community.asisaga.com**: Trending or "what's happening now" sections

**Suggested Implementation:**
```scss
/**
 * @category Atmosphere
 * @variant 'cosmic'
 * @origin PR from saga.asisaga.com (frontend-skill audit 2026-03)
 * @intent Deep-space atmospheric backdrop — deeper than neutral, lighter than void
 * @since v5.0
 */
@else if $vibe == 'cosmic' {
  // Deep cosmic background — expressive but not ceremonial
  background: 
    radial-gradient(
      ellipse at 20% 50%,
      oklch(0.12 0.04 260 / 0.8) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      oklch(0.10 0.03 250 / 0.6) 0%,
      transparent 50%
    ),
    oklch(0.09 0.02 255);  // Deep cosmic base
  color: oklch(0.92 0.005 90);  // Off-white text — softer than pure white
  position: relative;
  
  // Subtle star-field texture via noise (pure CSS, no images)
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(1px 1px at 20% 30%, oklch(0.99 0 0 / 0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 40% 70%, oklch(0.99 0 0 / 0.2) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 15%, oklch(0.99 0 0 / 0.25) 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 55%, oklch(0.99 0 0 / 0.2) 0%, transparent 100%),
      radial-gradient(1px 1px at 95% 85%, oklch(0.99 0 0 / 0.15) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }
  
  // Content above star texture
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (prefers-contrast: high) {
    background: oklch(0.05 0 0);
    color: oklch(0.99 0 0);
    
    &::before {
      display: none;
    }
  }
}
```

**Success Criteria:**
- [x] Not Redundant: `void` is extreme (near-black, max contrast). `sacred` is ceremony-specific (gold accent, genesis sections only). `neutral` has no background treatment. `cosmic` fills the semantic gap for expansive-but-not-extreme atmospheric depth.
- [x] Universal: The cosmos metaphor is central to the ASI Saga brand — every subdomain can use this for sections dealing with AI/ASI concepts at depth
- [x] Semantic: Describes the FEELING (expansive, deep, cosmic) not the CSS implementation
- [x] Categorized: Atmosphere — defines sensory texture of the node
- [x] Well-Defined: Distinguishes clearly from adjacent variants with concrete rationale

---

## 📋 Subdomain Implementation Plan

Once this PR is merged into the theme, `saga.asisaga.com` will update:

### `_sass/_blog-listing.scss`
```scss
.blog-listing {
  @include genesis-environment('editorial-feed');  // was: chronological
  @include genesis-atmosphere('cosmic');            // NEW: deep-space blog section

  .container {
    // Remove genesis-entity('primary') — no white frame around listing
  }
}

.blog-post-card {
  @include genesis-entity('editorial');            // was: entity('secondary') + state('stable')

  &__title {
    @include genesis-cognition('heading');          // was: axiom (too large)

    a {
      @include genesis-synapse('navigate');
    }
  }

  &__date {
    @include genesis-cognition('gloss');
  }

  &__excerpt {
    @include genesis-cognition('discourse');
  }

  &__categories {
    @include genesis-environment('distributed');
  }

  &__category {
    @include genesis-entity('latent');
    @include genesis-cognition('protocol');
  }

  &__link {
    @include genesis-synapse('navigate');
    @include genesis-cognition('motive');
  }
}
```

### `index.html`
- Remove redundant `section-header.html` include (or reduce to minimal divider)
- Pass latest post image to `transcendent-hero.html` when available
- Add `class="editorial-featured"` to the first blog card

---

## 🔍 Self-Review Checklist

- [x] All proposals reviewed against existing 31+ variants — no redundancy found
- [x] Each proposed variant articulates a distinct semantic pattern
- [x] At least 3 different subdomains identified for each new variant
- [x] Descriptions use semantic language, not visual/CSS language
- [x] All 4 proposed variants fit clearly into existing ontological categories
- [x] Concrete realistic examples from multiple contexts provided
- [x] Component enhancements are non-breaking (additive parameters only)

---

## 📚 References

- **Audit source**: `.github/prompts/frontend-audit-2026-03.md`
- **Current ontology**: Theme `_sass/ontology/INTEGRATION-GUIDE.md`
- **Component files**: Theme `_includes/transcendent-hero.html`, `_layouts/post.html`
- **Genesis Genome**: Theme `GENOME.md`
