# Ontology System Quick Start Guide

**Get started with the Genesis Semantic Engine in 5 minutes**

---

## What is the Ontology System?

The Genesis Semantic Engine is a **three-tier architecture** that lets you build components by describing WHAT they are, not HOW they look.

**Key concept**: Map semantic HTML classes to ontological roles via SCSS mixins. All visual styling handled automatically.

---

## 3-Step Setup

### Step 1: Create Semantic HTML

Use meaningful class names that describe the content's purpose:

```html
<article class="blog-post">
  <h1 class="post-title">My First Post</h1>
  <p class="post-content">Content goes here...</p>
  <a class="read-more">Continue Reading</a>
</article>
```

### Step 2: Create Ontology SCSS

Import ontology and map classes to semantic roles:

```scss
---
---
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');  // Layout
  
  .post-title {
    @include genesis-cognition('axiom');    // Typography
  }
  
  .post-content {
    @include genesis-cognition('discourse'); // Body text
  }
  
  .read-more {
    @include genesis-synapse('navigate');   // Link
  }
}
```

### Step 3: That's It!

No CSS properties needed. The theme engine provides all styling automatically.

---

## The Six Ontological Categories

Choose ONE mixin from each category as needed:

### 1. Layout - `genesis-environment($logic)`

Defines spatial organization:

```scss
@include genesis-environment('distributed');  // Grid layout
@include genesis-environment('focused');      // Single column
@include genesis-environment('associative');  // Flexible network
@include genesis-environment('chronological'); // Timeline
@include genesis-environment('manifest');     // Dashboard
```

### 2. Presence - `genesis-entity($nature)`

Defines visual weight (cards, glassmorphism):

```scss
@include genesis-entity('primary');      // Main content card
@include genesis-entity('secondary');    // Supporting card
@include genesis-entity('imperative');   // Urgent alert
@include genesis-entity('latent');       // Inactive/dimmed
@include genesis-entity('aggregate');    // Container
@include genesis-entity('ancestral');    // Archived
```

### 3. Typography - `genesis-cognition($intent)`

Defines text meaning and sizing:

```scss
@include genesis-cognition('axiom');      // Headlines (large, bold)
@include genesis-cognition('discourse');  // Body text (readable)
@include genesis-cognition('protocol');   // Code (monospace)
@include genesis-cognition('gloss');      // Small notes (muted)
@include genesis-cognition('motive');     // Instructional (accent)
@include genesis-cognition('quantum');    // Tiny tags/chips
```

### 4. Interaction - `genesis-synapse($vector)`

Defines actions and navigation:

```scss
@include genesis-synapse('navigate');     // Links to pages
@include genesis-synapse('execute');      // Action buttons
@include genesis-synapse('inquiry');      // Search/expand
@include genesis-synapse('destructive');  // Delete/danger
@include genesis-synapse('social');       // Social sharing
```

### 5. State - `genesis-state($condition)` *(optional)*

Defines temporal condition:

```scss
@include genesis-state('stable');        // Normal state
@include genesis-state('evolving');      // Live updating
@include genesis-state('deprecated');    // No longer current
@include genesis-state('locked');        // Restricted
@include genesis-state('simulated');     // Projected data
```

### 6. Atmosphere - `genesis-atmosphere($vibe)` *(optional)*

Defines sensory feel:

```scss
@include genesis-atmosphere('neutral');   // Standard
@include genesis-atmosphere('ethereal');  // Light, peaceful
@include genesis-atmosphere('void');      // Dark, immersive
@include genesis-atmosphere('vibrant');   // Energetic, colorful
```

---

## Common Patterns

### Blog Post / Article

```scss
.blog-post {
  @include genesis-environment('focused');     // Reading layout
  @include genesis-atmosphere('ethereal');     // Light vibe
  
  .post-header {
    @include genesis-entity('primary');        // Card
    
    .post-title { @include genesis-cognition('axiom'); }
    .post-date { @include genesis-cognition('gloss'); }
  }
  
  .post-body {
    @include genesis-cognition('discourse');   // Body text
  }
  
  .share-button {
    @include genesis-synapse('social');        // Social action
  }
}
```

### Product Grid

```scss
.product-grid {
  @include genesis-environment('distributed'); // Auto-fit grid
  
  .product-card {
    @include genesis-entity('primary');        // Card with glass
    
    .product-name { @include genesis-cognition('motive'); }
    .buy-button { @include genesis-synapse('execute'); }
  }
}
```

### Alert / Notification

```scss
.urgent-alert {
  @include genesis-entity('imperative');       // Pulsing border
  @include genesis-state('evolving');          // Animated
  @include genesis-atmosphere('vibrant');      // High-energy
  
  .alert-title { @include genesis-cognition('axiom'); }
  .dismiss-button { @include genesis-synapse('destructive'); }
}
```

### Dashboard

```scss
.analytics-dashboard {
  @include genesis-environment('manifest');    // Grid layout
  @include genesis-atmosphere('vibrant');      // Energetic
  
  .metric-card {
    @include genesis-entity('primary');
    @include genesis-state('evolving');        // Live data
    
    .metric-value { @include genesis-cognition('axiom'); }
    .metric-label { @include genesis-cognition('gloss'); }
  }
}
```

---

## Golden Rules

### ✅ Do This

- **Use semantic class names** - `.blog-post`, not `.blue-box`
- **Import ontology first** - `@import "ontology/index";`
- **Only use mixins** - No CSS properties in your SCSS
- **Combine mixins** - Multiple mixins = richer semantics
- **Mirror HTML structure** - SCSS nesting matches DOM

### ❌ Never Do This

- **No raw CSS** - No `padding`, `color`, `margin`, etc.
- **No unit values** - No `px`, `rem`, `%`
- **No color values** - No `#hex`, `rgb()`, `oklch()`
- **No visual class names** - No `.rounded-card`, `.shadow-lg`
- **No mixing approaches** - Don't mix with Bento/Material classes

---

## Complete Example

**HTML:**
```html
<main class="research-hub">
  <header class="hub-intro">
    <h1 class="hub-title">Research Papers</h1>
    <p class="hub-description">Latest AI research findings</p>
  </header>
  
  <section class="papers-grid">
    <article class="research-paper">
      <h2 class="paper-title">Consciousness in AI</h2>
      <code class="paper-id">REF-001</code>
      <p class="paper-abstract">This paper explores...</p>
      <a class="download-link">Download PDF</a>
    </article>
  </section>
</main>
```

**SCSS:**
```scss
---
---
@import "ontology/index";

.research-hub {
  @include genesis-environment('focused');
  
  .hub-intro {
    @include genesis-entity('primary');
    
    .hub-title { @include genesis-cognition('axiom'); }
    .hub-description { @include genesis-cognition('discourse'); }
  }
  
  .papers-grid {
    @include genesis-environment('distributed');
  }
  
  .research-paper {
    @include genesis-entity('primary');
    
    .paper-title { @include genesis-cognition('motive'); }
    .paper-id { @include genesis-cognition('protocol'); }
    .paper-abstract { @include genesis-cognition('discourse'); }
    .download-link { @include genesis-synapse('execute'); }
  }
}
```

**Result:** Fully styled, responsive, accessible component with zero CSS properties written!

---

## Next Steps

### Learn More

- **[Complete API Reference](/_sass/ontology/INTEGRATION-GUIDE.md)** - All categories explained
- **[Architecture Overview](/_sass/ontology/Readme.md)** - Three-tier system details
- **[Migration Guide](/docs/ONTOLOGY-MIGRATION-GUIDE.md)** - Convert existing components
- **[Sample Patterns](/_sass/ontology/_sample.scss)** - 6+ complete examples

### Try It

1. Create a new HTML file with semantic classes
2. Create matching SCSS with ontology imports
3. Add ontological mixins for each class
4. Watch it work without writing any CSS!

### Get Help

- Check [INTEGRATION-GUIDE.md](_sass/ontology/INTEGRATION-GUIDE.md) for detailed API docs
- See [_sample.scss](_sass/ontology/_sample.scss) for proven patterns
- Review this quick start for common use cases

---

**You're ready!** Start building semantic, style-blind components with the ontology system.

**Remember**: Describe WHAT it is (semantic role), not HOW it looks (visual properties).
