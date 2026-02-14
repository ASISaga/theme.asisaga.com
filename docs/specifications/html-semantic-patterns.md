# HTML Semantic Patterns Reference

*Complete reference for semantic HTML structure and ontological mapping*

## Visual Hierarchy Philosophy

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

✅ **Use cards for:**
- Grouping related content (product details, user profile)
- Clickable content blocks (blog post preview, service card)
- Distinct sections requiring visual separation

❌ **Avoid:**
- Excessive nested cards creating "box soup"
- Cards used only for decoration without semantic meaning
- Multiple wrapper divs without purpose

### Glassmorphism Guidelines

Use glassmorphism **purposefully for specific UI needs**:

✅ **Use for:**
- Header/footer with backdrop blur (creates depth)
- Modal overlays requiring focus separation
- Floating navigation elements
- When blur adds functional value

❌ **Avoid:**
- Excessive blur effects on all content
- Multiple colored glass layers

### Accent Color Usage

- **Neon blue**: Interaction feedback, hover states, focus rings, alerts
- **Gold**: Special highlights, premium features, sacred/important elements
- **Purpose**: Each accent should communicate something specific
- **Avoid**: Random color usage, accents without meaning

## Semantic Layout Patterns

### Blog Post Pattern

**HTML:**
```html
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

**SCSS (Ontology Mapping):**
```scss
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');
  @include genesis-atmosphere('ethereal');
  
  .post-header {
    @include genesis-entity('primary');
    
    .post-title { @include genesis-cognition('axiom'); }
    .post-date { @include genesis-cognition('gloss'); }
    
    .post-tags {
      @include genesis-environment('associative');
    }
    
    .post-tag {
      @include genesis-cognition('quantum');
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse');
  }
  
  .post-footer {
    @include genesis-entity('secondary');
    
    .post-share {
      @include genesis-environment('associative');
    }
    
    .share-twitter,
    .share-linkedin {
      @include genesis-synapse('social');
    }
    
    .back-link {
      @include genesis-synapse('navigate');
    }
  }
}
```

### Product Card Pattern

**HTML:**
```html
<article class="product-card">
  <h2 class="product-name">Product Name</h2>
  <p class="product-description">Description...</p>
  <span class="premium-badge">Premium</span>
  <button class="buy-button">Buy Now</button>
</article>
```

**SCSS:**
```scss
.product-card {
  @include genesis-entity('primary');
  
  .product-name { @include genesis-cognition('axiom'); }
  .product-description { @include genesis-cognition('discourse'); }
  
  .premium-badge {
    color: oklch(0.70 0.15 85);  // Gold emphasis
  }
  
  .buy-button {
    @include genesis-synapse('execute');
  }
}
```

### Alert Component Pattern

**HTML:**
```html
<div class="alert alert--urgent">
  <h3 class="alert__title">Important Notice</h3>
  <p class="alert__message">System maintenance scheduled.</p>
  <button class="alert__dismiss" aria-label="Dismiss alert">×</button>
</div>
```

**SCSS:**
```scss
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
  
  .alert__title { @include genesis-cognition('motive'); }
  .alert__message { @include genesis-cognition('discourse'); }
  .alert__dismiss { @include genesis-synapse('destructive'); }
}
```

## BEM-Style Naming Pattern

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

**SCSS Mapping:**
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

## Content-First Naming

**Think about WHAT the element represents:**
- ✅ `.research-paper`, `.paper-title`, `.paper-abstract`
- ✅ `.user-profile`, `.profile-avatar`, `.profile-bio`
- ✅ `.product-card`, `.product-name`, `.product-price`

**Avoid describing HOW it looks:**
- ❌ `.blue-box`, `.large-text`, `.rounded-card`
- ❌ `.with-shadow`, `.bold-heading`, `.small-label`

## Responsive Layout Pattern

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

## Component Development Best Practices

### Parameterized Include Pattern

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

### Component Guidelines

- Break complex UI into small includes with clear parameters
- Document include parameters in file header comments
- Each component has ONE matching SCSS partial (using ontology)
- Components should be resilient to missing data
- Use semantic class naming (BEM-style)

## Ontology Evolution Through HTML

When your HTML structure reveals a pattern not covered by existing ontology, you can propose evolution:

**Example naming triggers:**
- Content that's "currently calculating but not final"
- Elements representing "uncertain/in-progress calculation"
- UI showing "social proof" or "testimonials"

These gaps may warrant Ontological Propositions (see `.github/docs/agent-philosophy.md`).

## Documentation References

- **Ontology mapping**: `/docs/specifications/scss-ontology-system.md`
- **Component library**: `/docs/specifications/component-library.md`
- **Accessibility**: `/docs/specifications/accessibility.md`
- **Responsive design**: `/docs/specifications/responsive-design.md`
