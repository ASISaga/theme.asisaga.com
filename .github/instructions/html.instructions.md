---
applyTo: "**/*.{html,liquid},_includes/**,_layouts/**"
description: "HTML & Liquid templating for the ASI Saga semantic design system. Accessibility-first semantic HTML with Bento Engine layouts."
---

# Semantic Design System - HTML & Liquid Instructions

This file contains guidance for Jekyll templates using the semantic design system with Bento Engine layouts.

## 🌟 PRIMARY METHOD: Ontology-Based HTML + SCSS

**For all new development, use semantic HTML with ontological SCSS mapping.**

The Genesis Semantic Engine provides the best separation of concerns. Your HTML should:
1. Use meaningful, semantic class names (WHAT it is, not HOW it looks)
2. Employ semantic HTML5 elements appropriately
3. Have corresponding SCSS that maps classes to ontological roles

This approach keeps HTML clean and allows complete visual redesigns without touching HTML.

### 🧬 Part of Living Genome

Your HTML structure feeds the evolutionary system:

- **Semantic class names** enable clear SCSS mapping to ontological roles
- **Meaningful structure** helps identify gaps in current ontology
- **Content-first thinking** separates WHAT from HOW

When your HTML reveals a pattern not covered by existing ontology, you can propose evolution through the Ontological Proposition system (see `.github/AGENTS.MD`).

---

## Architecture Overview

### Primary: Ontology System (Recommended)
- **Semantic HTML** - Meaningful class names describing content role
- **SCSS mapping** - Classes mapped to ontological mixins
- **Zero inline styles** - All styling via SCSS ontology system
- **Complete separation** - HTML focuses on structure and semantics

### Legacy: Direct CSS Classes (Backward Compatible)
- **Bento Engine classes** - Layout and grid classes in HTML
- **Material Primitive classes** - Glassmorphism effects in HTML
- **Bootstrap compatibility** - For gradual migration
- **Maintained but deprecated** - Use ontology for new work

## Theme Structure
- Theme is the single source for layouts, includes, and shared site head
- Reusable UI components in `_includes/` with include parameters
- Layouts in `_layouts/` use semantic structure
- Keep pages focused and small; use includes for patterns

## 🎨 Visual Hierarchy Philosophy

**The Genesis Design System emphasizes purposeful visual hierarchy:**

### Color Usage Principles
- **Primary content**: Black text on white backgrounds (core readability)
- **Navigation/Chrome**: White text on black backgrounds (header, footer, nav)
- **Buttons/Actions**: Black backgrounds with white text, neon blue interaction feedback
- **Cards**: White or light gray backgrounds (when semantic distinction needed)
- **Accents**: Use neon blue and gold purposefully for emphasis and interaction
- **Avoid**: Excessive blue tints, unnecessary colored backgrounds, excessive nesting

### Hierarchy Guidelines
- **Purposeful nesting** - Only nest elements when semantically meaningful
- **Flat when possible** - Avoid unnecessary wrapper divs and nested boxes
- **Border radius** - Use as appropriate for the design aesthetic
- **Visual weight** - Each level should serve a clear purpose

### When to Use Cards
Cards should serve a **semantic purpose**, not just visual decoration:
- ✅ Grouping related content (product details, user profile)
- ✅ Clickable content blocks (blog post preview, service card)
- ✅ Distinct sections requiring visual separation
- ❌ Excessive nested cards creating "box soup"
- ❌ Cards used only for decoration without semantic meaning
- ❌ Multiple wrapper divs without purpose

### Glassmorphism Guidelines
Use glassmorphism **purposefully for specific UI needs**:
- ✅ Header/footer with backdrop blur (creates depth)
- ✅ Modal overlays requiring focus separation
- ✅ Floating navigation elements
- ✅ When blur adds functional value
- ❌ Excessive blur effects on all content
- ❌ Multiple colored glass layers

### Accent Color Usage
- **Neon blue**: Interaction feedback, hover states, focus rings, alerts
- **Gold**: Special highlights, premium features, sacred/important elements
- **Purpose**: Each accent should communicate something specific
- **Avoid**: Random color usage, accents without meaning

### Example: Purposeful vs. Excessive

**❌ Excessive (Avoid)**:
```html
<!-- Too many nested boxes without purpose, excessive decoration -->
<div class="outer-wrapper blue-tint">
  <div class="rounded-box-outer">
    <div class="rounded-box-inner">
      <div class="rounded-card">
        <div class="card-wrapper">
          <div class="card-content rounded">
            <p>Content buried in unnecessary boxes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**✅ Purposeful (Use)**:
```html
<!-- Clean semantic structure, purposeful hierarchy -->
<article class="product-card">
  <h2 class="product-title">Product Name</h2>
  <p class="product-description">Clear description...</p>
  <span class="premium-badge">Premium</span>
  <button class="product-action">Buy Now</button>
</article>
```

With corresponding SCSS:
```scss
.product-card {
  @include genesis-entity('primary');     // White card with appropriate shadow
  
  .product-title {
    @include genesis-cognition('axiom'); // Black text, large
  }
  
  .premium-badge {
    color: oklch(0.70 0.15 85);          // Gold - purposeful emphasis
  }
  
  .product-action {
    @include genesis-synapse('execute');  // Black button, white text
  }
}
```

## Semantic Layout Patterns

### Primary Method: Ontology-Based

Use semantic class names in HTML, then map to ontological mixins in SCSS:

**HTML:**
```html
<main class="blog-post">
  <header class="post-header">
    <h1 class="post-title">My Article Title</h1>
    <time class="post-date">2026-01-15</time>
  </header>
  
  <article class="post-content">
    <p>Article body text goes here...</p>
  </article>
  
  <footer class="post-footer">
    <a href="/next" class="read-more">Read More</a>
  </footer>
</main>
```

**SCSS (in subdomain):**
```scss
---
---
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');  // Reading layout
  
  .post-header {
    @include genesis-entity('primary');     // Elevated card
    
    .post-title { @include genesis-cognition('axiom'); }
    .post-date { @include genesis-cognition('gloss'); }
  }
  
  .post-content {
    @include genesis-cognition('discourse');  // Body text
  }
  
  .post-footer {
    @include genesis-entity('secondary');     // Lighter card
    
    .read-more { @include genesis-synapse('navigate'); }
  }
}
```

### Legacy Method: Direct CSS Classes (Not Recommended)

For backward compatibility only:

**Container Selection:**
```html
<!-- Legacy Bento containers (deprecated, use ontology instead) -->
<div class="genesis-viewport">         <!-- Full-width, max 1600px -->
<div class="consciousness-viewport">   <!-- Content-focused, max 1200px -->
<div class="essence-viewport">         <!-- Narrow content, max 800px -->
```

**Grid Layouts:**
```html
<!-- Legacy Bento layouts (deprecated, use ontology instead) -->
<div class="bento-layout">            <!-- Auto-fit responsive grid -->
  <div class="bento-card">            <!-- Glassmorphism card -->
```

**Dashboard Layouts:**
```html
<!-- Legacy named grid (deprecated, use ontology instead) -->
<div class="bento-dashboard">
  <header class="bento-dashboard__header">...</header>
  <aside class="bento-dashboard__sidebar">...</aside>
  <main class="bento-dashboard__main">...</main>
</div>
```

**Component Cards:**
```html
<!-- Legacy Bento cards (deprecated, use ontology instead) -->
<div class="bento-card">               <!-- Base glassmorphism -->
<div class="bento-card bento-card--elevated">  <!-- Enhanced depth -->
<div class="bento-card bento-card--accent">    <!-- Gold-tinted -->
<div class="bento-card bento-card--neural">    <!-- Violet-tinted -->
```

## Accessibility-First HTML (MANDATORY)

### Landmark Elements
- **NEVER nest landmarks** (header, main, nav, footer, aside, section, article)
- Each page MUST have exactly ONE `<main id="skip-target">`
- Each page MUST have exactly ONE `<header>` and ONE `<footer>`
- Use `aria-label` to disambiguate duplicate landmarks
- First focusable element: skip link to #skip-target

### Semantic HTML Requirements
```html
<!-- Skip link (REQUIRED as first element) -->
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>

<!-- Main landmark (REQUIRED, exactly one per page) -->
<main id="skip-target" tabindex="-1">
  {{ content }}
</main>

<!-- Images (REQUIRED alt attributes) -->
<img src="..." alt="Descriptive text">  <!-- Meaningful images -->
<img src="..." alt="">                   <!-- Decorative images only -->

<!-- Forms (REQUIRED label associations) -->
<label for="email">Email</label>
<input type="email" id="email" name="email">
```

### Interactive Elements
- All buttons/links must be keyboard focusable
- Use `data-*` or ARIA attributes as behavior hooks, not classes
- Add ARIA only when native semantics are insufficient
- Ensure visible focus styles (`:focus-visible`)

## Material Design Primitives

### Primary Method: Ontology-Based

Use semantic class names, map to ontological mixins in SCSS:

**HTML:**
```html
<div class="alert-panel">
  <h2 class="alert-title">Important Notice</h2>
  <p class="alert-message">System maintenance scheduled.</p>
  <button class="dismiss-action">Dismiss</button>
</div>
```

**SCSS:**
```scss
.alert-panel {
  @include genesis-entity('imperative');    // Urgent styling
  @include genesis-state('stable');         // Normal state
  
  .alert-title { @include genesis-cognition('axiom'); }
  .alert-message { @include genesis-cognition('discourse'); }
  .dismiss-action { @include genesis-synapse('destructive'); }
}
```

### Legacy Method: Direct Glassmorphism Classes (Not Recommended)

For backward compatibility only:

**Glassmorphism Surfaces:**
```html
<!-- Legacy Material classes (deprecated, use ontology instead) -->
<div class="material-glass">          <!-- Base glass surface -->
<div class="material-glass-elevated"> <!-- Stronger blur/depth -->
<div class="material-glass-subtle">   <!-- Lighter glass -->
<header class="material-header">      <!-- Header navigation -->
<footer class="material-footer">      <!-- Footer navigation -->
<div class="material-modal">          <!-- Modal dialogs -->
<div class="material-overlay">        <!-- Full-screen overlays -->
```

**Mask Effects:**
```html
<!-- Legacy mask utilities (deprecated, use ontology instead) -->
<div class="mask-fade-bottom">        <!-- Fade to transparent at bottom -->
<div class="mask-fade-top">           <!-- Fade to transparent at top -->
<div class="mask-fade-edges">         <!-- Fade horizontal edges -->
<div class="mask-fade-radial">        <!-- Radial fade from center -->
```

## Typography

### Primary Method: Ontology-Based

Use semantic elements and classes, map to cognition mixins in SCSS:

**HTML:**
```html
<article class="research-paper">
  <h1 class="paper-title">Neural Networks and Consciousness</h1>
  <p class="paper-abstract">This study explores...</p>
  <pre class="code-sample">const result = analyze(data);</pre>
  <aside class="paper-note">See also: related research</aside>
  <span class="paper-tag">AI</span>
  <span class="paper-tag">Consciousness</span>
</article>
```

**SCSS:**
```scss
.research-paper {
  .paper-title { @include genesis-cognition('axiom'); }      // Large headline
  .paper-abstract { @include genesis-cognition('discourse'); } // Body text
  .code-sample { @include genesis-cognition('protocol'); }    // Code/technical
  .paper-note { @include genesis-cognition('gloss'); }        // Small annotation
  .paper-tag { @include genesis-cognition('quantum'); }       // Tiny tag
}
```

### Legacy Method: Direct Typography Classes (Not Recommended)

For backward compatibility only:

```html
<!-- Legacy typography classes (deprecated, use ontology instead) -->
<h1 class="display-xl">Hero Headline</h1>  <!-- 56px-96px fluid -->
<h2 class="display-lg">Section Title</h2>  <!-- 48px-80px fluid -->
<p class="text-lg">Large body text</p>     <!-- 18px-20px fluid -->
<p class="text-sm">Small text</p>          <!-- 14px-16px fluid -->

<!-- Legacy color utilities (deprecated, use ontology instead) -->
<span class="text-accent">Highlighted</span>
<span class="text-consciousness">Neural AI</span>
<span class="text-life-force">Growth</span>
```

## Jekyll & Liquid Best Practices
- Use semantic HTML5 elements appropriately
- Parameterized includes: `{% include component.html param="value" %}`
- NO inline JS or CSS in templates
- Keep Liquid logic lightweight; heavy processing in build scripts
- Provide sensible defaults for missing data

## Component Development

### Primary Method: Ontology-Based Components

When creating new reusable components:

1. **Use semantic HTML** with meaningful class names
2. **Create matching SCSS** using ontology mixins
3. **Document parameters** in include file header
4. **Keep components resilient** to missing data

**Example: Alert Component**

`_includes/alert.html`:
```liquid
{% comment %}
Alert Component (Ontology-Based)
Parameters:
- type: 'urgent' | 'info' | 'warning' (default: 'info')
- title: Alert heading text
- message: Alert body text
- dismissible: true | false (default: false)
{% endcomment %}

<div class="alert alert--{{ include.type | default: 'info' }}">
  {% if include.title %}
  <h3 class="alert__title">{{ include.title }}</h3>
  {% endif %}
  
  {% if include.message %}
  <p class="alert__message">{{ include.message }}</p>
  {% endif %}
  
  {% if include.dismissible %}
  <button class="alert__dismiss" aria-label="Dismiss alert">×</button>
  {% endif %}
</div>
```

Corresponding SCSS (in subdomain or theme):
```scss
@import "ontology/index";

.alert {
  @include genesis-entity('primary');
  @include genesis-state('stable');
  
  &--urgent {
    @include genesis-entity('imperative');
    @include genesis-atmosphere('vibrant');
  }
  
  &--info {
    @include genesis-entity('secondary');
    @include genesis-atmosphere('neutral');
  }
  
  &--warning {
    @include genesis-entity('secondary');
    @include genesis-atmosphere('ethereal');
  }
  
  .alert__title { @include genesis-cognition('motive'); }
  .alert__message { @include genesis-cognition('discourse'); }
  .alert__dismiss { @include genesis-synapse('destructive'); }
}
```

### Best Practices

- Break complex UI into small includes with clear parameters
- Document include parameters in file header comments
- Each component has ONE matching SCSS partial (using ontology)
- Components should be resilient to missing data
- Use semantic class naming (BEM-style: `.component`, `.component__element`, `.component--modifier`)

## Responsive Design

### Primary Method: Ontology-Based Responsiveness

The ontology system handles responsiveness automatically through:
- Fluid typography (clamp() values scale with viewport)
- Responsive grids (`genesis-environment('distributed')` auto-fits)
- Container queries (components adapt to their container)

You generally **don't need** responsive utility classes with ontology.

**HTML stays clean:**
```html
<div class="product-grid">
  <article class="product-card">
    <h2 class="product-name">Product Name</h2>
    <p class="product-description">Description...</p>
    <button class="buy-button">Buy Now</button>
  </article>
</div>
```

**SCSS handles all responsiveness:**
```scss
.product-grid {
  @include genesis-environment('distributed');  // Auto-responsive grid
  
  .product-card {
    @include genesis-entity('primary');  // Responsive padding/spacing
    
    .product-name { @include genesis-cognition('axiom'); }     // Fluid scale
    .product-description { @include genesis-cognition('discourse'); }
    .buy-button { @include genesis-synapse('execute'); }
  }
}
```

### Testing Guidelines
- Mobile-first approach required
- Test at 375px, 768px, 1440px minimum
- Touch targets automatically ≥ 44px via ontology
- Minimum font size: 16px (enforced by ontology fluid scales)

### Legacy: Bento Responsive Utilities (Not Recommended)

For backward compatibility only:
```html
<!-- Legacy responsive utilities (deprecated, ontology handles this) -->
<div class="bento-stack-mobile">  <!-- Stack on mobile -->
<div class="bento-hide-mobile">   <!-- Hide on mobile -->
```

## Legacy Systems (Backward Compatibility Only)

**Note**: These are maintained for backward compatibility but NOT recommended for new development.

### Bootstrap Compatibility (Temporary)
Legacy components may still use Bootstrap classes via compatibility layer:
- `.container`, `.row`, `.col-*` are supported but deprecated
- Gradually migrate to ontology-based approach
- Use semantic HTML + ontology SCSS for all new components

### Migration Path

**Before (Bootstrap/Bento):**
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="bento-card">Content</div>
    </div>
    <div class="col-md-6">
      <div class="bento-card">Content</div>
    </div>
  </div>
</div>
```

**After (Ontology - Recommended):**

HTML:
```html
<div class="content-grid">
  <article class="content-card">Content</article>
  <article class="content-card">Content</article>
</div>
```

SCSS:
```scss
@import "ontology/index";

.content-grid {
  @include genesis-environment('distributed');  // Auto-fit grid
  
  .content-card {
    @include genesis-entity('primary');  // Glassmorphism card
  }
}
```

## Complete Example: Blog Post Page

### HTML (Semantic & Clean)

```html
---
layout: default
title: "My Blog Post"
---

<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <time class="post-date" datetime="{{ page.date }}">
      {{ page.date | date: "%B %d, %Y" }}
    </time>
    <div class="post-tags">
      {% for tag in page.tags %}
      <span class="post-tag">{{ tag }}</span>
      {% endfor %}
    </div>
  </header>
  
  <div class="post-content">
    {{ content }}
  </div>
  
  <footer class="post-footer">
    <div class="post-share">
      <span class="share-label">Share:</span>
      <a href="#" class="share-twitter">Twitter</a>
      <a href="#" class="share-linkedin">LinkedIn</a>
    </div>
    
    <a href="/blog" class="back-link">← Back to Blog</a>
  </footer>
</article>
```

### SCSS (Ontology Mapping)

```scss
---
---
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');     // Reading-optimized
  @include genesis-atmosphere('ethereal');     // Light, peaceful
  
  .post-header {
    @include genesis-entity('primary');        // Elevated card
    
    .post-title { 
      @include genesis-cognition('axiom');     // Large headline
    }
    
    .post-date { 
      @include genesis-cognition('gloss');     // Small metadata
    }
    
    .post-tags {
      @include genesis-environment('associative'); // Horizontal flex
    }
    
    .post-tag {
      @include genesis-cognition('quantum');   // Tiny chip
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse');   // Body prose
  }
  
  .post-footer {
    @include genesis-entity('secondary');      // Lighter card
    
    .post-share {
      @include genesis-environment('associative');
    }
    
    .share-label {
      @include genesis-cognition('gloss');
    }
    
    .share-twitter,
    .share-linkedin {
      @include genesis-synapse('social');      // Social buttons
    }
    
    .back-link {
      @include genesis-synapse('navigate');    // Navigation link
    }
  }
}
```

### Result
- Clean, semantic HTML focusing on structure
- Complete visual styling via ontology SCSS
- Fully responsive without media queries
- Accessible and keyboard-navigable
- Single source of truth for styling
- Easy to redesign without touching HTML

## Semantic Class Naming Best Practices

### Content-First Naming

**Think about WHAT the element represents**:
- ✅ `.research-paper`, `.paper-title`, `.paper-abstract`
- ✅ `.user-profile`, `.profile-avatar`, `.profile-bio`
- ✅ `.product-card`, `.product-name`, `.product-price`

**Avoid describing HOW it looks**:
- ❌ `.blue-box`, `.large-text`, `.rounded-card`
- ❌ `.with-shadow`, `.bold-heading`, `.small-label`

### BEM-Style Structure (Recommended)

Use Block-Element-Modifier pattern for clarity:

```html
<!-- Block: main component -->
<article class="research-paper">
  
  <!-- Elements: parts of the block -->
  <header class="research-paper__header">
    <h1 class="research-paper__title">Title</h1>
    <time class="research-paper__date">Date</time>
  </header>
  
  <!-- Modifiers: variations -->
  <div class="research-paper__content research-paper__content--draft">
    Content...
  </div>
</article>
```

Then map in SCSS:
```scss
.research-paper {
  @include genesis-environment('focused');
  
  &__header {
    @include genesis-entity('primary');
  }
  
  &__title {
    @include genesis-cognition('axiom');
  }
  
  &__content {
    @include genesis-cognition('discourse');
    
    &--draft {
      @include genesis-state('simulated');
    }
  }
}
```

### Naming Triggers Evolution

When you struggle to name an element semantically, you may have found an ontological gap:

**Example**: You have content that's "currently calculating but not final"
- Existing: `protocol` (technical) + `stable` (normal state)
- Gap: No semantic variant for "uncertain/in-progress calculation"
- Solution: Propose `cognition('speculation')` or `state('calculating')`

This is when you create an Ontological Proposition (see `.github/AGENTS.MD`).
