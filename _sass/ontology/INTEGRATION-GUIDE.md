# Ontology System Integration Guide

## Overview

The **Genesis Semantic SCSS Engine** is a three-tier architecture that enables subdomain repositories to remain "style-blind" while the theme repository acts as the "visual brain." This creates a clean separation between content semantics and visual presentation.

## Architecture Layers

### Tier 1: Content (Subdomain HTML)
- **Responsibility**: Defines WHAT the data is
- **Constraint**: No style attributes; 1 semantic class per element
- **Location**: Subdomain repositories

### Tier 2: Interface (Ontological API)
- **Responsibility**: Defines the ROLE of the content
- **Constraint**: Agnostic; no CSS properties allowed
- **Location**: `_sass/ontology/_interface.scss`

### Tier 3: Engine (Physical Manifestation)
- **Responsibility**: Defines the LOOK (OKLCH, Bento, Glassmorphism)
- **Constraint**: The ONLY place for raw CSS properties
- **Location**: `_sass/ontology/_engines.scss`

---

## Using the Ontology System in Subdomains

### Step 1: Import the Ontology Interface

In your subdomain's SCSS file (e.g., `assets/css/style.scss`):

```scss
---
---
@import "ontology/index";  // Import the complete ontology system

// Your semantic mappings go here
```

### Step 2: Map HTML to Ontological Roles

For each class in your HTML, determine its ontological role and apply the appropriate mixin:

```scss
.my-page-wrapper {
  @include genesis-environment('focused');  // Layout logic
  @include genesis-atmosphere('ethereal');  // Sensory vibe
  
  .my-content-card {
    @include genesis-entity('primary');     // Presence & weight
    
    .card-title {
      @include genesis-cognition('axiom');  // Information intent
    }
    
    .card-description {
      @include genesis-cognition('discourse'); // Body text
    }
    
    .action-button {
      @include genesis-synapse('execute');   // Interaction vector
    }
  }
}
```

---

## Complete Ontological API Reference

### 1. `genesis-environment($logic)`
**Defines spatial organization and layout logic**

- `'distributed'` - Autonomous entities in non-linear Bento grid (auto-fit responsive)
- `'focused'` - Singular narrative thread for deep reading (max 70ch, centered)
- `'associative'` - Network where connections outweigh nodes (flexbox wrap)
- `'chronological'` - Time-linear stream of sequential events (single column)
- `'manifest'` - High-density dashboard for system oversight (12-column grid)

**Example:**
```scss
.blog-post {
  @include genesis-environment('focused');  // Optimized for reading
}

.project-grid {
  @include genesis-environment('distributed');  // Card grid layout
}
```

---

### 2. `genesis-entity($nature)`
**Defines presence and visual weight of content blocks**

- `'primary'` - The fundamental object of the current view (glassmorphism, elevated)
- `'secondary'` - Supportive, contextual data (lighter glass, less prominent)
- `'imperative'` - System-critical, high-urgency signal (pulsing neon border, alert colors)
- `'latent'` - Backgrounded info awaiting activation (dimmed, grayscale filter)
- `'aggregate'` - A container summarizing multiple entities (larger padding, container styling)
- `'ancestral'` - Archived or historical data (muted, legacy appearance)
- `'image-adaptive'` ⭐ **NEW v2.1.0** - Responsive image that maintains aspect ratio
- `'embed-responsive'` ⭐ **NEW v2.1.0** - Embedded content (iframe, video) with aspect ratio

**Example:**
```scss
.main-card {
  @include genesis-entity('primary');      // Featured content
}

.sidebar-info {
  @include genesis-entity('secondary');    // Supporting context
}

.critical-alert {
  @include genesis-entity('imperative');   // Urgent notification
}

// New in v2.1.0: Media responsiveness
.hero-image-container {
  @include genesis-entity('image-adaptive');  // Responsive 16:9 image
}

.video-embed-container {
  @include genesis-entity('embed-responsive'); // YouTube/Vimeo responsive wrapper
}
```

---

### 3. `genesis-cognition($intent)`
**Defines information intent and typography**

- `'axiom'` - Foundational thesis or headline (large, bold, 2-3.5rem)
- `'discourse'` - Standard information exchange / prose (body text, 1-1.125rem, serif)
- `'protocol'` - Technical/mathematical proof / code (monospace, code styling)
- `'gloss'` - Minor annotations or citations (small, muted, 0.8-0.875rem)
- `'motive'` - Persuasive or instructional guidance (medium-bold, accent color)
- `'quantum'` - Small, high-density fragments / tags (tiny, uppercase, chip style)

**Example:**
```scss
.page-title {
  @include genesis-cognition('axiom');     // Large headline
}

.article-body {
  @include genesis-cognition('discourse'); // Reading text
}

.code-snippet {
  @include genesis-cognition('protocol');  // Technical content
}

.category-tag {
  @include genesis-cognition('quantum');   // Tag/chip
}
```

---

### 4. `genesis-synapse($vector)`
**Defines interaction and navigation patterns**

- `'navigate'` - Portal to a different semantic coordinate (link, underline on hover)
- `'execute'` - Local function or state modification (button, primary action)
- `'inquiry'` - A request for more data / expand / search (secondary button, outlined)
- `'destructive'` - Permanent removal or system reset (danger button, red tones)
- `'social'` - Neural link to other observers (social sharing button, rounded)

**Example:**
```scss
.read-more-link {
  @include genesis-synapse('navigate');     // Link to another page
}

.submit-button {
  @include genesis-synapse('execute');      // Primary action
}

.search-button {
  @include genesis-synapse('inquiry');      // Search/expand
}

.delete-button {
  @include genesis-synapse('destructive');  // Dangerous action
}
```

---

### 5. `genesis-state($condition)`
**Defines temporal state and system condition**

- `'stable'` - System is in equilibrium (normal state, no special styling)
- `'evolving'` - Content is being updated/streamed (animated progress bar)
- `'deprecated'` - Information is no longer verified (strikethrough, warning icon)
- `'locked'` - Data is immutable and requires clearance (blur effect, lock icon)
- `'simulated'` - Data is a projection, not live (dashed border, diagonal stripes)

**Example:**
```scss
.live-data {
  @include genesis-state('evolving');      // Currently updating
}

.archived-post {
  @include genesis-state('deprecated');    // No longer current
}

.private-content {
  @include genesis-state('locked');        // Access restricted
}
```

---

### 6. `genesis-atmosphere($vibe)`
**Defines sensory texture and emotional tone**

- `'neutral'` - Standard system transparency (no special atmosphere)
- `'ethereal'` - High-transparency, light-based focus (bright, minimal)
- `'void'` - Deep-space, high-contrast, zero-distraction (dark, immersive)
- `'vibrant'` - High-energy, data-saturated, high-neon (colorful, energetic)
- `'spacious-mobile'` ⭐ **NEW v2.1.0** - Generous spacing on mobile for touch-friendliness
- `'dense-desktop'` ⭐ **NEW v2.1.0** - High information density on large screens

**Example:**
```scss
.meditation-space {
  @include genesis-atmosphere('ethereal');  // Light, peaceful
}

.code-editor {
  @include genesis-atmosphere('void');      // Dark, focused
}

.analytics-dashboard {
  @include genesis-atmosphere('vibrant');   // Energetic, data-rich
}

// New in v2.1.0: Content density variants
.hero-section {
  @include genesis-atmosphere('spacious-mobile'); // Touch-friendly mobile spacing
}

.team-grid {
  @include genesis-atmosphere('dense-desktop');   // 1 col mobile → 4 cols desktop
}
```

---

## Design Principles

### 1. Zero Raw CSS in Subdomain SCSS
**Never use raw CSS properties like `margin`, `padding`, `color`, `font-size` in subdomain SCSS files.**

❌ **Wrong:**
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
}
```

✅ **Correct:**
```scss
.my-card {
  @include genesis-entity('primary');  // All styling comes from engine
}
```

### 2. Semantic Class Names
Use meaningful, content-focused class names that describe WHAT something is, not HOW it looks.

❌ **Wrong:** `.blue-box`, `.rounded-button`, `.big-text`

✅ **Correct:** `.research-paper`, `.submit-action`, `.page-title`

### 3. Mirrored Structure
Your SCSS nesting should perfectly mirror your HTML DOM hierarchy.

```html
<main class="research-hub">
  <header class="intro-section">
    <h1 class="hub-title">Neural Logic Research</h1>
  </header>
</main>
```

```scss
.research-hub {
  @include genesis-environment('focused');
  
  .intro-section {
    @include genesis-entity('primary');
    
    .hub-title {
      @include genesis-cognition('axiom');
    }
  }
}
```

### 4. Single Responsibility
Apply one primary mixin from each category as needed:
- One `genesis-environment` per layout container
- One `genesis-entity` per content block
- One `genesis-cognition` per text element
- One `genesis-synapse` per interactive element
- Optional `genesis-state` and `genesis-atmosphere` modifiers

---

## Validation Checklist

Before committing subdomain SCSS, verify:

- [ ] **Semantic Purity**: HTML uses semantic tags (`<article>`, `<section>`, etc.) correctly
- [ ] **Property Isolation**: SCSS contains NO raw CSS properties (no `px`, `rem`, `color`, `display`, etc.)
- [ ] **Role Alignment**: Buttons mapped to `synapse`, titles to `axiom`, etc.
- [ ] **Theme Inheritance**: Subdomain relies entirely on `_engines.scss` for visual weight
- [ ] **Mirrored Structure**: SCSS nesting matches HTML DOM hierarchy exactly

---

## Common Patterns

### Blog Post / Article
```scss
.blog-post {
  @include genesis-environment('focused');
  @include genesis-atmosphere('ethereal');
  
  .post-header {
    @include genesis-entity('primary');
    
    .post-title { @include genesis-cognition('axiom'); }
    .post-meta { @include genesis-cognition('gloss'); }
  }
  
  .post-content {
    @include genesis-cognition('discourse');
  }
}
```

### Dashboard / Analytics
```scss
.dashboard {
  @include genesis-environment('manifest');
  @include genesis-atmosphere('vibrant');
  
  .metric-card {
    @include genesis-entity('primary');
    @include genesis-state('evolving');
  }
}
```

### Product Grid
```scss
.product-grid {
  @include genesis-environment('distributed');
  
  .product-card {
    @include genesis-entity('primary');
    
    .product-name { @include genesis-cognition('motive'); }
    .buy-button { @include genesis-synapse('execute'); }
  }
}
```

---

## Advanced: Combining Mixins

You can combine multiple ontological mixins on the same element for rich semantic meaning:

```scss
.live-alert-panel {
  @include genesis-entity('imperative');      // Urgent visual weight
  @include genesis-state('evolving');         // Currently updating
  @include genesis-atmosphere('vibrant');     // High-energy vibe
  
  .alert-title {
    @include genesis-cognition('axiom');      // Large headline
  }
  
  .dismiss-action {
    @include genesis-synapse('destructive');  // Dangerous action
  }
}
```

---

## ⭐ Responsive Design Enhancements (v2.1.0)

### Automatic Responsive Behavior

**All existing variants are now responsive by default** - no changes needed to your code!

#### Touch Targets (WCAG 2.1 Compliant)
All `genesis-synapse` variants now have **44x44px minimum touch targets on mobile**:

```scss
.my-button {
  @include genesis-synapse('execute'); // Automatically 44x44px on mobile
}

.nav-link {
  @include genesis-synapse('navigate'); // Automatically touch-friendly
}
```

#### Responsive Typography
All `genesis-cognition` variants now scale appropriately:

```scss
.page-title {
  @include genesis-cognition('axiom');
  // Mobile: 32px → Tablet: 40px → Desktop: 56px (automatic)
}

.body-text {
  @include genesis-cognition('discourse');
  // Always ≥16px on mobile (prevents iOS zoom)
}
```

#### Responsive Grids
`genesis-environment('distributed')` now adapts automatically:

```scss
.product-grid {
  @include genesis-environment('distributed');
  // Mobile: 1 column → Tablet: 2 columns → Desktop: auto-fit
}
```

### New Responsive Variants

#### Media Responsiveness

Replace inline styles and fixed dimensions with semantic media variants:

**Before (inline styles):**
```html
<iframe src="map" width="100%" height="450" style="border:0;"></iframe>
```

**After (semantic):**
```html
<div class="map-container">
  <iframe src="map" allowfullscreen loading="lazy"></iframe>
</div>
```

```scss
.map-container {
  @include genesis-entity('embed-responsive'); // Maintains 16:9 ratio
}
```

**Image optimization:**
```scss
.hero-image-wrapper {
  @include genesis-entity('image-adaptive');
  // Maintains aspect ratio, object-fit cover, responsive
}
```

#### Content Density

Control spacing and layout density across viewports:

```scss
.hero-section {
  @include genesis-atmosphere('spacious-mobile');
  // 3rem padding mobile → 2rem desktop
  // Generous touch-friendly spacing
}

.team-showcase {
  @include genesis-atmosphere('dense-desktop');
  // 1 column mobile → 2 columns tablet → auto-fit desktop
  // Cap at 4 columns on ultrawide
}
```

### Migration Benefits

- ✅ **WCAG 2.1 compliance** - All touch targets now meet accessibility standards
- ✅ **Better mobile UX** - Typography scales, spacing adapts
- ✅ **Performance** - Media responsive variants support proper image sizing
- ✅ **No code changes needed** - Existing code gets automatic improvements
- ✅ **Zero raw CSS** - All responsive behavior in semantic mixins

---

## Troubleshooting

### "My styles aren't applying"
- Ensure you imported `@import "ontology/index";` at the top of your SCSS file
- Check that your class names in HTML match your SCSS selectors
- Verify the theme repository has the latest ontology system (v2.1.0+)

### "I need a custom style not covered by the API"
- First, check if combining existing mixins achieves your goal
- Consider if your use case represents a missing semantic pattern
- Submit a request to extend the ontology system rather than adding raw CSS

### "The layout doesn't look right"
- Ensure you're using the correct `genesis-environment` for your content type
- Check that parent containers have appropriate environment mixins applied
- Verify responsive behavior by testing at different viewport sizes

---

## Support & Resources

- **Full Examples**: See `_sass/ontology/_sample.scss` for comprehensive usage patterns
- **Architecture Details**: Read `_sass/ontology/Readme.md` for SOP documentation
- **Engine Source**: Examine `_sass/ontology/_engines.scss` to understand visual implementation
- **Migration Help**: See `_sass/ontology/refactor-agent.md` for AI-assisted migration

---

**Remember**: The ontology system is designed to grow with your needs. If you find a semantic pattern that isn't covered, that's an opportunity to expand the system rather than break the abstraction.
