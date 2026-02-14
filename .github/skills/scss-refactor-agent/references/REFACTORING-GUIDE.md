# SCSS Refactoring Guide - Comprehensive Reference

**Version**: 2.1.0  
**For**: scss-refactor-agent skill  
**Purpose**: Detailed guide for migrating legacy SCSS to Genesis Ontological system

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Step-by-Step Migration](#step-by-step-migration)
3. [Common Patterns](#common-patterns)
4. [Troubleshooting](#troubleshooting)
5. [Validation](#validation)

---

## Quick Start

### Prerequisites

1. Node.js and npm installed
2. Repository cloned locally
3. Dependencies installed: `npm install`

### Basic Workflow

```bash
# 1. Test current state
npm run test:scss

# 2. Make changes to SCSS
# (edit your files)

# 3. Validate changes
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh your-file.scss

# 4. Test compilation
npm run test:scss

# 5. Run linter
npm run lint:scss
```

---

## Step-by-Step Migration

### Phase 1: Analysis

**Identify CSS Properties to Remove**:
- Layout: `margin`, `padding`, `display`, `flex`, `grid`
- Visual: `color`, `background`, `border`, `box-shadow`
- Typography: `font-size`, `font-weight`, `line-height`
- Positioning: `position`, `top`, `left`, `right`, `bottom`

**Classify by Ontological Category**:
- Layout/Spatial → `genesis-environment()`
- Visual Presence → `genesis-entity()`
- Typography → `genesis-cognition()`
- Interactions → `genesis-synapse()`
- State/Condition → `genesis-state()`
- Aesthetic Vibe → `genesis-atmosphere()`

### Phase 2: HTML Structure Mapping

**Example HTML**:
```html
<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">Title</h1>
    <time class="post-date">Date</time>
  </header>
  <div class="post-content">
    <p>Content...</p>
  </div>
</article>
```

**Matching SCSS Structure**:
```scss
.blog-post {
  // Layout logic
  
  .post-header {
    // Header styling
    
    .post-title {
      // Title styling
    }
    
    .post-date {
      // Date styling
    }
  }
  
  .post-content {
    // Content styling
  }
}
```

### Phase 3: Mixin Application

**Replace CSS with Ontological Mixins**:

```scss
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');  // Single column reading
  
  .post-header {
    @include genesis-entity('primary');     // Glassmorphism card
    
    .post-title {
      @include genesis-cognition('axiom');  // Large headline
    }
    
    .post-date {
      @include genesis-cognition('gloss');  // Small metadata
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse'); // Body text
  }
}
```

### Phase 4: Validation

```bash
# Run validation script
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh path/to/your-file.scss

# Should show:
# ✅ SCSS compilation successful
# ✅ Stylelint passed
# ✅ Zero-CSS compliant
# ✅ Uses N genesis mixins
```

---

## Common Patterns

### Pattern 1: Card Grid Layout

**Before**:
```scss
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  .card {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border-radius: 12px;
  }
}
```

**After**:
```scss
@import "ontology/index";

.card-grid {
  @include genesis-environment('distributed');  // Auto-fit grid
  
  .card {
    @include genesis-entity('primary');  // Glassmorphism
  }
}
```

**Result**: From 12 lines → 7 lines, zero raw CSS

---

### Pattern 2: Button with Hover

**Before**:
```scss
.cta-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

**After**:
```scss
@import "ontology/index";

.cta-button {
  @include genesis-synapse('execute');  // All states handled
}
```

**Result**: From 17 lines → 3 lines, all interactions included

---

### Pattern 3: Responsive Typography

**Before**:
```scss
.page-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 4rem;
  }
}
```

**After**:
```scss
@import "ontology/index";

.page-title {
  @include genesis-cognition('axiom');  // Responsive built-in
}
```

**Result**: From 14 lines → 3 lines, responsive scaling automatic

---

### Pattern 4: Form Layout

**Before**:
```scss
.contact-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #6366f1;
    }
  }
}
```

**After**:
```scss
@import "ontology/index";

.contact-form {
  @include genesis-environment('interaction-form');  // Responsive grid
  
  .form-input {
    @include genesis-synapse('input-primary');  // All states
  }
}
```

**Result**: From 22 lines → 7 lines, mobile-optimized

---

## Troubleshooting

### Issue: "SCSS doesn't compile after refactoring"

**Symptoms**: Error messages about undefined mixins

**Solution**:
```scss
// Make sure this is at the TOP of your file
@import "ontology/index";

// Or use modern @use syntax
@use "ontology" as *;
```

---

### Issue: "Visual output doesn't match original"

**Symptoms**: Colors, sizes, or spacing look different

**Analysis**:
1. Check if you're using the right ontological category
2. Consider combining multiple mixins
3. Remember: Ontology may intentionally improve on legacy design

**Example**:
```scss
// If a card needs both glassmorphism AND urgent styling
.urgent-card {
  @include genesis-entity('imperative');  // Visual urgency
  @include genesis-state('evolving');     // Active/updating
}
```

---

### Issue: "Validation script reports raw CSS properties"

**Symptoms**: Script shows ❌ for specific properties

**Solution**:
```scss
// ❌ WRONG
.my-element {
  margin: 2rem;        // Raw CSS property
  padding: 1rem;       // Raw CSS property
}

// ✅ CORRECT
.my-element {
  @include genesis-entity('primary');  // Handles margin/padding
}
```

---

### Issue: "Too much nesting (stylelint error)"

**Symptoms**: Stylelint complains about nesting depth > 3

**Solution**:
```scss
// ❌ WRONG (4 levels deep)
.page {
  .section {
    .container {
      .item {  // Too deep!
        @include genesis-entity('primary');
      }
    }
  }
}

// ✅ CORRECT (flatten structure)
.page-section {
  @include genesis-environment('focused');
}

.section-container {
  @include genesis-entity('aggregate');
}

.container-item {
  @include genesis-entity('primary');
}
```

---

## Validation

### Automated Validation Script

The validation script checks:

1. **SCSS Compilation**: Ensures your changes compile
2. **Stylelint**: Checks code quality
3. **Zero-CSS Compliance**: Looks for forbidden raw properties
4. **Ontological Usage**: Verifies genesis mixin usage

**Run it**:
```bash
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh your-file.scss
```

### Manual Checklist

Before committing:

- [ ] File imports ontology (`@import "ontology/index";`)
- [ ] No raw CSS properties (margin, padding, color, etc.)
- [ ] SCSS structure mirrors HTML DOM
- [ ] All styling via genesis mixins
- [ ] Compiles without errors (`npm run test:scss`)
- [ ] Passes stylelint (`npm run lint:scss`)
- [ ] Visual output verified in browser

---

## Advanced Patterns

### Combining Multiple Mixins

For rich semantic meaning:

```scss
.premium-feature-card {
  @include genesis-entity('primary');      // Glassmorphism
  @include genesis-state('stable');        // Verified/stable
  @include genesis-atmosphere('ethereal'); // Light vibe
}
```

### Progressive Enhancement

Adding effects on top of semantic foundation:

```scss
.hero-section {
  @include genesis-environment('focused');  // Layout
  @include genesis-atmosphere('viewport-aware'); // Full height
  
  .hero-title {
    @include genesis-cognition('axiom');    // Typography
  }
  
  .hero-cta {
    @include genesis-synapse('execute');     // Button
    @include hover-quantum;                  // Extra hover effect
  }
}
```

---

## Quick Reference

### All Environment Variants

```scss
@include genesis-environment('distributed');   // Auto-fit grid
@include genesis-environment('focused');       // Single column
@include genesis-environment('associative');   // Flexbox network
@include genesis-environment('chronological'); // Timeline
@include genesis-environment('manifest');      // Dashboard
@include genesis-environment('navigation-primary');   // Nav header
@include genesis-environment('navigation-secondary'); // Breadcrumbs
@include genesis-environment('interaction-form');     // Form layout
```

### All Entity Variants

```scss
@include genesis-entity('primary');       // Main glassmorphism
@include genesis-entity('secondary');     // Lighter presence
@include genesis-entity('imperative');    // Urgent alerts
@include genesis-entity('latent');        // Inactive/dim
@include genesis-entity('aggregate');     // Container
@include genesis-entity('ancestral');     // Archived
@include genesis-entity('image-adaptive');  // Responsive images
@include genesis-entity('embed-responsive'); // Responsive iframes
```

### All Cognition Variants

```scss
@include genesis-cognition('axiom');      // Headlines (large)
@include genesis-cognition('discourse');  // Body text
@include genesis-cognition('protocol');   // Code/technical
@include genesis-cognition('gloss');      // Small annotations
@include genesis-cognition('motive');     // Instructional
@include genesis-cognition('quantum');    // Tags/chips
```

### All Synapse Variants

```scss
@include genesis-synapse('navigate');     // Links
@include genesis-synapse('execute');      // Primary buttons
@include genesis-synapse('inquiry');      // Secondary actions
@include genesis-synapse('destructive');  // Danger buttons
@include genesis-synapse('social');       // Social buttons
@include genesis-synapse('input-primary'); // Form inputs
```

### All State Variants

```scss
@include genesis-state('stable');         // Normal/verified
@include genesis-state('evolving');       // Updating/loading
@include genesis-state('deprecated');     // Outdated
@include genesis-state('locked');         // Requires access
@include genesis-state('simulated');      // Preview/demo
@include genesis-state('scroll-triggered'); // Scroll animations
```

### All Atmosphere Variants

```scss
@include genesis-atmosphere('neutral');       // Balanced
@include genesis-atmosphere('ethereal');      // Light/peaceful
@include genesis-atmosphere('void');          // Dark/immersive
@include genesis-atmosphere('vibrant');       // Energetic
@include genesis-atmosphere('spacious-mobile'); // Touch-friendly spacing
@include genesis-atmosphere('dense-desktop');   // High-density layouts
@include genesis-atmosphere('viewport-aware');  // Full-height sections
```

---

**Version**: 2.1.0  
**Last Updated**: 2026-01-19  
**Maintained by**: scss-refactor-agent

For questions or issues, see `.github/AGENT-INDEX.md` or `.github/.github/docs/agent-philosophy.md`
