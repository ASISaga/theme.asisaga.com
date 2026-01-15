# Ontology System Migration Guide

**Comprehensive guide for migrating existing components to the Genesis Semantic Engine**

---

## Overview

This guide helps you migrate existing components from:
- Legacy Bootstrap classes → Ontology system
- Bento Engine classes → Ontology system  
- Material Primitive classes → Ontology system
- Raw CSS in SCSS → Ontology mixins

**Goal**: Clean separation of content (HTML) and presentation (SCSS) using semantic ontological roles.

---

## Why Migrate?

### Benefits of Ontology System

1. **Style-Blind Development** - Focus on content semantics, not visual styling
2. **Single Source of Truth** - All styling centralized in theme engine
3. **Future-Proof** - Change entire design system without touching component code
4. **Semantic Clarity** - Code expresses intent and meaning, not implementation
5. **Automatic Consistency** - Visual coherence across all subdomains
6. **Easier Maintenance** - No CSS scattered across subdomain files

### What Changes

**Before (Legacy):**
- HTML contains styling classes (`.bento-card`, `.material-glass`)
- SCSS contains raw CSS properties (`padding: 2rem`, `color: #fff`)
- Mixed concerns in both HTML and SCSS

**After (Ontology):**
- HTML contains semantic class names (`.research-card`, `.post-header`)
- SCSS contains only ontological mixin calls
- Clean separation: HTML = structure, SCSS = semantic mapping

---

## Migration Process (5 Steps)

### Step 1: Audit Your HTML

Review HTML for semantic structure and meaningful class names.

**Questions to ask:**
- Do class names describe WHAT the element is? (✅ `.blog-post`, ❌ `.blue-box`)
- Are semantic HTML5 elements used? (`<article>`, `<section>`, `<header>`)
- Are classes unique and descriptive?

**Action items:**
- Rename non-semantic classes to meaningful names
- Use semantic HTML5 elements appropriately
- Ensure one semantic class per element (avoid class soup)

**Example transformation:**

```html
<!-- Before: Non-semantic -->
<div class="card blue-bg rounded shadow">
  <div class="title-lg bold">Title</div>
  <div class="text-sm muted">Description</div>
  <a class="btn btn-primary">Action</a>
</div>

<!-- After: Semantic -->
<article class="product-card">
  <h2 class="product-name">Title</h2>
  <p class="product-description">Description</p>
  <a class="buy-button">Action</a>
</article>
```

---

### Step 2: Create Ontology SCSS File

Create or update your SCSS file to import the ontology system.

**File location:** `assets/css/style.scss` (or your subdomain's main SCSS)

```scss
---
---
// REQUIRED: Import ontology system first
@import "ontology/index";

// Your semantic mappings go here
```

**Important:**
- Front matter (`---`) must be present for Jekyll processing
- Ontology import must be FIRST
- No other imports needed (ontology includes everything)

---

### Step 3: Map Classes to Ontological Roles

For each HTML class, determine its ontological role(s) and apply appropriate mixin(s).

**Decision tree:**

1. **What is the element's PRIMARY purpose?**
   - Layout/container? → `genesis-environment($logic)`
   - Content block/card? → `genesis-entity($nature)`
   - Text/typography? → `genesis-cognition($intent)`
   - Interactive element? → `genesis-synapse($vector)`

2. **Does it have a temporal state?**
   - Live updating? Deprecated? → `genesis-state($condition)`

3. **Does it have a specific vibe?**
   - Light? Dark? Energetic? → `genesis-atmosphere($vibe)`

**Mapping reference:**

| Element Type | Primary Mixin | Common Variants |
|--------------|---------------|-----------------|
| Layout wrapper | `genesis-environment()` | `distributed`, `focused`, `manifest` |
| Card/panel | `genesis-entity()` | `primary`, `secondary`, `imperative` |
| Heading | `genesis-cognition()` | `axiom` |
| Body text | `genesis-cognition()` | `discourse` |
| Code block | `genesis-cognition()` | `protocol` |
| Small text | `genesis-cognition()` | `gloss` |
| Tag/chip | `genesis-cognition()` | `quantum` |
| Link | `genesis-synapse()` | `navigate` |
| Button | `genesis-synapse()` | `execute` |
| Search/expand | `genesis-synapse()` | `inquiry` |
| Delete button | `genesis-synapse()` | `destructive` |
| Social button | `genesis-synapse()` | `social` |

---

### Step 4: Remove All Raw CSS

Delete all CSS properties from your SCSS. Only ontological mixins should remain.

**Properties to remove (everything!):**
- Layout: `display`, `position`, `flex`, `grid`, `float`
- Spacing: `margin`, `padding`, `gap`
- Sizing: `width`, `height`, `min-*`, `max-*`
- Typography: `font-size`, `font-weight`, `line-height`, `color`
- Visual: `background`, `border`, `border-radius`, `box-shadow`
- Effects: `opacity`, `filter`, `backdrop-filter`, `transform`
- All unit values: `px`, `rem`, `em`, `%`, `vh`, `vw`
- All color values: `#hex`, `rgb()`, `oklch()`, etc.

**Validation:**
```scss
// ❌ WRONG - Contains CSS properties
.my-card {
  padding: 2rem;              // NO!
  background: #1a1a2e;        // NO!
  border-radius: 12px;        // NO!
}

// ✅ CORRECT - Only ontology mixins
.my-card {
  @include genesis-entity('primary');  // YES!
}
```

---

### Step 5: Test and Validate

1. **Visual verification** - Does it look correct?
2. **Responsiveness** - Test at 375px, 768px, 1440px
3. **Accessibility** - Keyboard navigation, screen reader
4. **Code quality** - No CSS properties in SCSS file

**Checklist:**
- [ ] Imports `@import "ontology/index";` at top
- [ ] All HTML classes are semantic and meaningful
- [ ] SCSS contains ZERO CSS properties
- [ ] All styling via ontological mixins only
- [ ] Visual appearance matches original (or better)
- [ ] Responsive behavior works correctly
- [ ] Keyboard navigation and focus states work

---

## Migration Examples

### Example 1: Product Card

**Before (Bento + Material):**

HTML:
```html
<div class="bento-card bento-card--accent">
  <h3 class="text-lg font-bold text-accent">Product Name</h3>
  <p class="text-sm text-secondary">Product description goes here.</p>
  <button class="btn btn-primary">Buy Now</button>
</div>
```

SCSS:
```scss
.bento-card--accent {
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: oklch(0.88 0.18 95);
  border-radius: 8px;
  
  &:hover {
    background: oklch(0.92 0.18 95);
  }
}
```

**After (Ontology):**

HTML:
```html
<article class="product-card">
  <h3 class="product-name">Product Name</h3>
  <p class="product-description">Product description goes here.</p>
  <button class="buy-button">Buy Now</button>
</article>
```

SCSS:
```scss
---
---
@import "ontology/index";

.product-card {
  @include genesis-entity('primary');
  @include genesis-atmosphere('neutral');
  
  .product-name {
    @include genesis-cognition('motive');  // Persuasive text
  }
  
  .product-description {
    @include genesis-cognition('discourse');  // Body text
  }
  
  .buy-button {
    @include genesis-synapse('execute');  // Primary action
  }
}
```

---

### Example 2: Blog Post Layout

**Before (Bootstrap + Custom CSS):**

HTML:
```html
<div class="container">
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <article>
        <h1 class="display-3 mb-4">Blog Post Title</h1>
        <p class="text-muted mb-4">January 15, 2026</p>
        <div class="post-body">
          <p>Post content goes here...</p>
        </div>
        <a href="/blog" class="btn btn-link">← Back to Blog</a>
      </article>
    </div>
  </div>
</div>
```

SCSS:
```scss
.post-body {
  font-size: 1.125rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  max-width: 70ch;
  margin: 0 auto;
  
  p {
    margin-bottom: 1.5rem;
  }
}

.display-3 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
}

.text-muted {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}
```

**After (Ontology):**

HTML:
```html
<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">Blog Post Title</h1>
    <time class="post-date">January 15, 2026</time>
  </header>
  
  <div class="post-body">
    <p>Post content goes here...</p>
  </div>
  
  <footer class="post-footer">
    <a href="/blog" class="back-link">← Back to Blog</a>
  </footer>
</article>
```

SCSS:
```scss
---
---
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');  // Centered reading layout
  @include genesis-atmosphere('ethereal');  // Light, peaceful vibe
  
  .post-header {
    @include genesis-entity('primary');
    
    .post-title {
      @include genesis-cognition('axiom');  // Large headline
    }
    
    .post-date {
      @include genesis-cognition('gloss');  // Small muted text
    }
  }
  
  .post-body {
    @include genesis-cognition('discourse');  // Body prose
  }
  
  .post-footer {
    @include genesis-entity('secondary');
    
    .back-link {
      @include genesis-synapse('navigate');  // Navigation link
    }
  }
}
```

---

### Example 3: Dashboard Layout

**Before (Bento Dashboard + Custom CSS):**

HTML:
```html
<div class="bento-dashboard">
  <header class="bento-dashboard__header">
    <h1>Analytics Dashboard</h1>
  </header>
  
  <aside class="bento-dashboard__sidebar">
    <nav>Navigation</nav>
  </aside>
  
  <main class="bento-dashboard__main">
    <div class="metric-card">
      <div class="metric-value">1,234</div>
      <div class="metric-label">Active Users</div>
    </div>
  </main>
</div>
```

SCSS:
```scss
.bento-dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
  min-height: 100vh;
}

.metric-card {
  padding: 1.5rem;
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  
  .metric-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: oklch(0.88 0.18 95);
  }
  
  .metric-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.5rem;
  }
}
```

**After (Ontology):**

HTML:
```html
<div class="analytics-dashboard">
  <header class="dashboard-header">
    <h1 class="dashboard-title">Analytics Dashboard</h1>
  </header>
  
  <aside class="dashboard-sidebar">
    <nav class="dashboard-nav">Navigation</nav>
  </aside>
  
  <main class="dashboard-main">
    <article class="metric-card">
      <div class="metric-value">1,234</div>
      <div class="metric-label">Active Users</div>
    </article>
  </main>
</div>
```

SCSS:
```scss
---
---
@import "ontology/index";

.analytics-dashboard {
  @include genesis-environment('manifest');  // Dashboard grid
  @include genesis-atmosphere('vibrant');    // High-energy vibe
  
  .dashboard-header {
    @include genesis-entity('primary');
    
    .dashboard-title {
      @include genesis-cognition('axiom');
    }
  }
  
  .dashboard-sidebar {
    @include genesis-entity('secondary');
  }
  
  .dashboard-main {
    @include genesis-environment('distributed');  // Grid for cards
  }
  
  .metric-card {
    @include genesis-entity('primary');
    @include genesis-state('evolving');  // Live updating indicator
    
    .metric-value {
      @include genesis-cognition('axiom');  // Large number
    }
    
    .metric-label {
      @include genesis-cognition('gloss');  // Small label
    }
  }
}
```

---

### Example 4: Alert/Notification Component

**Before (Custom CSS):**

HTML:
```html
<div class="alert alert-urgent">
  <div class="alert-icon">⚠️</div>
  <div class="alert-content">
    <h3 class="alert-title">System Alert</h3>
    <p class="alert-message">Maintenance scheduled for tonight.</p>
  </div>
  <button class="alert-close">×</button>
</div>
```

SCSS:
```scss
.alert {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(26, 26, 46, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  
  &.alert-urgent {
    border-color: oklch(0.88 0.18 95);
    box-shadow: 0 0 20px oklch(0.88 0.18 95 / 0.3);
    animation: pulse 2s infinite;
  }
  
  .alert-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .alert-message {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .alert-close {
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.6);
    
    &:hover {
      color: oklch(0.88 0.18 95);
    }
  }
}
```

**After (Ontology):**

HTML (unchanged - already semantic):
```html
<div class="alert alert--urgent">
  <div class="alert-icon">⚠️</div>
  <div class="alert-content">
    <h3 class="alert-title">System Alert</h3>
    <p class="alert-message">Maintenance scheduled for tonight.</p>
  </div>
  <button class="alert-close">×</button>
</div>
```

SCSS:
```scss
---
---
@import "ontology/index";

.alert {
  @include genesis-entity('secondary');
  @include genesis-state('stable');
  @include genesis-environment('associative');  // Horizontal flex layout
  
  &--urgent {
    @include genesis-entity('imperative');  // Pulsing neon border
    @include genesis-state('evolving');     // Animated state
    @include genesis-atmosphere('vibrant'); // High-energy
  }
  
  .alert-title {
    @include genesis-cognition('motive');  // Instructional text
  }
  
  .alert-message {
    @include genesis-cognition('discourse');  // Body text
  }
  
  .alert-close {
    @include genesis-synapse('destructive');  // Dangerous action
  }
}
```

---

## Common Migration Patterns

### Layout Containers

| Before | After |
|--------|-------|
| `.container` | `genesis-environment('focused')` |
| `.row` + `.col-*` | `genesis-environment('distributed')` |
| `.bento-layout` | `genesis-environment('distributed')` |
| `.bento-dashboard` | `genesis-environment('manifest')` |
| Custom flexbox | `genesis-environment('associative')` |
| Timeline/feed | `genesis-environment('chronological')` |

### Cards & Panels

| Before | After |
|--------|-------|
| `.bento-card` | `genesis-entity('primary')` |
| `.material-glass` | `genesis-entity('primary')` |
| `.card`, `.panel` | `genesis-entity('primary')` |
| Sidebar/aside | `genesis-entity('secondary')` |
| Alert/warning | `genesis-entity('imperative')` |
| Disabled/inactive | `genesis-entity('latent')` |

### Typography

| Before | After |
|--------|-------|
| `<h1>`, `.display-*` | `genesis-cognition('axiom')` |
| `<p>`, body text | `genesis-cognition('discourse')` |
| `<code>`, `<pre>` | `genesis-cognition('protocol')` |
| `.text-sm`, footnotes | `genesis-cognition('gloss')` |
| Call-to-action text | `genesis-cognition('motive')` |
| Tags, badges, chips | `genesis-cognition('quantum')` |

### Interactive Elements

| Before | After |
|--------|-------|
| `<a>`, `.link` | `genesis-synapse('navigate')` |
| `.btn`, `.button` | `genesis-synapse('execute')` |
| `.btn-primary` | `genesis-synapse('execute')` |
| Search, expand buttons | `genesis-synapse('inquiry')` |
| Delete, remove buttons | `genesis-synapse('destructive')` |
| Share, social buttons | `genesis-synapse('social')` |

---

## Troubleshooting

### Issue: "My styles aren't applying"

**Cause:** Ontology import missing or incorrect

**Solution:**
```scss
---
---
@import "ontology/index";  // Must be first, with front matter
```

### Issue: "Layout doesn't look right"

**Cause:** Wrong environment mixin or missing parent container

**Solution:**
- Use `genesis-environment('distributed')` for grids
- Use `genesis-environment('focused')` for single-column content
- Ensure parent has appropriate environment mixin

### Issue: "Need custom styling not in ontology"

**Cause:** Missing semantic pattern in ontology system

**Solution:**
1. Try combining existing mixins for richer semantics
2. Check if variant exists (e.g., `imperative`, `vibrant`)
3. Submit request to extend ontology system
4. **Do NOT** add raw CSS - this breaks the abstraction

### Issue: "Migration breaks existing visuals"

**Cause:** Incorrect ontological mapping

**Solution:**
1. Review the ontological category definitions
2. Choose mixin based on semantic meaning, not visual appearance
3. Combine multiple mixins if needed
4. Test at different viewport sizes

---

## Best Practices

### Do's ✅

- **Do** use semantic, meaningful class names
- **Do** think about WHAT the element is, not HOW it looks
- **Do** combine multiple ontological mixins for rich meaning
- **Do** test responsiveness at multiple viewport sizes
- **Do** validate that SCSS contains zero CSS properties
- **Do** document your semantic mappings with comments

### Don'ts ❌

- **Don't** use visual class names (`.blue-box`, `.rounded-card`)
- **Don't** add raw CSS properties in subdomain SCSS
- **Don't** use hardcoded colors, sizes, or spacing values
- **Don't** mix legacy Bento classes with ontology in same component
- **Don't** skip the ontology import
- **Don't** break the three-tier architecture

---

## Resources

### Documentation

- **[Ontology Architecture Overview](/_sass/ontology/Readme.md)** - Three-tier system SOP
- **[Complete API Reference](/_sass/ontology/INTEGRATION-GUIDE.md)** - All categories and variants
- **[Implementation Summary](/_sass/ontology/IMPLEMENTATION-SUMMARY.md)** - System status
- **[AI Migration Agent](/_sass/ontology/refactor-agent.md)** - Automated conversion

### Examples

- **[Sample SCSS](/_sass/ontology/_sample.scss)** - 6+ complete usage patterns
- **[Visual Demo](/docs/ontology-demo.html)** - HTML structure demonstration
- **[This Migration Guide](/docs/ONTOLOGY-MIGRATION-GUIDE.md)** - You are here

### Quick References

- **[SCSS Instructions](/.github/instructions/scss.instructions.md)** - AI agent guidance
- **[HTML Instructions](/.github/instructions/html.instructions.md)** - Template best practices
- **[Semantic Quick Reference](/docs/SEMANTIC-QUICK-REFERENCE.md)** - Token and class reference

---

## Getting Help

### Before Asking

1. Read the [Integration Guide](_sass/ontology/INTEGRATION-GUIDE.md)
2. Check the [sample patterns](_sass/ontology/_sample.scss)
3. Review this migration guide examples
4. Validate your SCSS has zero CSS properties

### Common Questions

**Q: Can I mix ontology with Bento classes?**  
A: No. Choose one approach per component. Ontology is recommended for new work.

**Q: What if I need a style not covered by ontology?**  
A: First try combining existing mixins. If truly missing, request system extension rather than adding raw CSS.

**Q: Do I need to migrate everything at once?**  
A: No. Migrate component by component. Legacy and ontology can coexist during transition.

**Q: Will migrating break my existing pages?**  
A: No. Legacy classes remain supported. Migration is opt-in and gradual.

---

**Status**: ✅ Production Ready  
**Approach**: Gradual, component-by-component migration  
**Timeline**: At your own pace - no rush  
**Support**: Full backward compatibility maintained
