# Navigation Mechanisms v2.3.0 - Genesis Ontological Design System

## Overview

Version 2.3.0 of the Genesis Ontological Design System introduces comprehensive support for all contemporary website navigation mechanisms. This enhancement adds **11 new variants** across three ontological categories (Environment, Synapse, and State), enabling semantic implementation of pagination, tabs, accordions, breadcrumbs, steppers, and more.

## What's New

### New Environment Variants (6 added)

Navigation layout patterns that define spatial organization:

1. **`navigation-tabs`** - Horizontal tab navigation for content switching
2. **`navigation-sidebar`** - Vertical sidebar navigation layout  
3. **`navigation-footer`** - Multi-column footer navigation layout
4. **`navigation-breadcrumb`** - Breadcrumb trail navigation layout
5. **`navigation-pagination`** - Pagination controls layout
6. **`navigation-accordion`** - Accordion/collapsible navigation layout

### New Synapse Variants (5 added)

Navigation interaction patterns that define user actions:

1. **`paginate`** - Pagination controls (numbered pages, prev/next)
2. **`toggle`** - Toggle/expand/collapse controls (accordion, mobile menu)
3. **`anchor`** - In-page anchor navigation (TOC, skip links, back to top)
4. **`tab`** - Tab switching controls for content panels
5. **`step`** - Multi-step process navigation (wizard, stepper)

### New State Variants (3 added)

Navigation state patterns that define temporal conditions:

1. **`active`** - Current/active navigation item state
2. **`expanded`** - Expanded state for toggleable navigation
3. **`collapsed`** - Collapsed state for toggleable navigation

## Contemporary Navigation Patterns Supported

### ✅ High Priority (Fully Implemented)

- [x] **Pagination** - Numbered page navigation with prev/next controls
- [x] **Breadcrumbs** - Hierarchical path navigation (Home > Category > Article)
- [x] **Tabs** - Horizontal content switching (Product Info | Reviews | Specs)
- [x] **Accordion** - Collapsible content sections (FAQ, mobile menus)
- [x] **Sticky Navigation** - Fixed position nav (via existing `navigation-primary`)
- [x] **Skip Links** - Accessibility navigation (Skip to content)
- [x] **Table of Contents** - In-page anchor navigation with scroll spy support
- [x] **Sidebar Navigation** - Vertical navigation menus
- [x] **Footer Navigation** - Multi-column footer links
- [x] **Stepper/Wizard** - Multi-step process navigation

### ✅ Medium Priority (Supported via Combinations)

- [x] **Hamburger Menu** - Mobile menu toggle (via `toggle` synapse)
- [x] **Dropdown/Mega Menu** - Hierarchical menus (via `toggle` + `navigation-primary`)
- [x] **Back to Top** - Quick return to page top (via `anchor` synapse)

## Implementation Examples

### 1. Pagination Navigation

```scss
.blog-pagination {
  @include genesis-environment('navigation-pagination');

  .page-link {
    @include genesis-synapse('paginate');
    
    // Active page automatically styled via [aria-current="page"]
    // Disabled state via .disabled or [aria-disabled="true"]
  }
}
```

**HTML:**
```html
<nav class="blog-pagination" aria-label="Page navigation">
  <a href="/page/1" class="page-link">← Previous</a>
  <a href="/page/1" class="page-link">1</a>
  <a href="/page/2" class="page-link" aria-current="page">2</a>
  <a href="/page/3" class="page-link">3</a>
  <a href="/page/3" class="page-link">Next →</a>
</nav>
```

### 2. Breadcrumb Trail

```scss
.page-breadcrumb {
  @include genesis-environment('navigation-breadcrumb');

  .breadcrumb-item {
    @include genesis-synapse('navigate');
  }
  
  .current-page {
    @include genesis-cognition('motive');
    @include genesis-state('active');
  }
}
```

**HTML:**
```html
<nav class="page-breadcrumb" aria-label="Breadcrumb">
  <a href="/" class="breadcrumb-item">Home</a>
  <span class="separator">/</span>
  <a href="/docs" class="breadcrumb-item">Docs</a>
  <span class="separator">/</span>
  <span class="current-page">Navigation</span>
</nav>
```

### 3. Tab Navigation

```scss
.product-tabs {
  .tab-list {
    @include genesis-environment('navigation-tabs');
  }

  .tab-button {
    @include genesis-synapse('tab');
    // Active tab via [aria-selected="true"]
  }
  
  .tab-panel {
    @include genesis-entity('primary');
  }
}
```

**HTML:**
```html
<div class="product-tabs">
  <div class="tab-list" role="tablist">
    <button class="tab-button" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
      Overview
    </button>
    <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
      Features
    </button>
  </div>
  
  <div class="tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    <p>Overview content...</p>
  </div>
  <div class="tab-panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <p>Features content...</p>
  </div>
</div>
```

### 4. Accordion (FAQ)

```scss
.faq-accordion {
  @include genesis-environment('navigation-accordion');

  .faq-question {
    @include genesis-synapse('toggle');
    @include genesis-cognition('motive');
  }
  
  .faq-answer {
    @include genesis-cognition('discourse');
    @include genesis-state('collapsed');
    
    &.expanded {
      @include genesis-state('expanded');
    }
  }
}
```

**HTML:**
```html
<div class="faq-accordion">
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false" aria-controls="answer-1">
      What is the Genesis Ontology?
      <span class="toggle-icon">▼</span>
    </button>
    <div class="faq-answer collapsed" id="answer-1">
      <p>The Genesis Ontology is a semantic design system...</p>
    </div>
  </div>
</div>
```

### 5. Sidebar Navigation

```scss
.docs-sidebar {
  @include genesis-environment('navigation-sidebar');

  .nav-link {
    @include genesis-synapse('navigate');
    
    &[aria-current="page"] {
      @include genesis-state('active');
    }
  }
  
  .section-title {
    @include genesis-cognition('motive');
  }
}
```

**HTML:**
```html
<nav class="docs-sidebar" aria-label="Documentation navigation">
  <div class="nav-section">
    <h3 class="section-title">Getting Started</h3>
    <a href="/intro" class="nav-link" aria-current="page">Introduction</a>
    <a href="/install" class="nav-link">Installation</a>
  </div>
</nav>
```

### 6. Footer Navigation

```scss
.site-footer-nav {
  @include genesis-environment('navigation-footer');

  .column-title {
    @include genesis-cognition('motive');
  }
  
  .footer-link {
    @include genesis-synapse('navigate');
  }
  
  .social-link {
    @include genesis-synapse('social');
  }
}
```

### 7. Multi-Step Wizard/Stepper

```scss
.checkout-wizard {
  @include genesis-environment('navigation-breadcrumb'); // Horizontal layout

  .wizard-step {
    @include genesis-synapse('step');
    
    // States automatically styled via:
    // [aria-current="step"] - Current step
    // .completed or [data-status="complete"] - Completed step
    // [aria-disabled="true"] or .disabled - Future step
  }
}
```

**HTML:**
```html
<nav class="checkout-wizard" aria-label="Checkout process">
  <a href="#" class="wizard-step completed" data-status="complete">
    <span class="step-number">1</span>
    <span class="step-label">Cart</span>
  </a>
  <a href="#" class="wizard-step active" aria-current="step">
    <span class="step-number">2</span>
    <span class="step-label">Shipping</span>
  </a>
  <a href="#" class="wizard-step disabled" aria-disabled="true">
    <span class="step-number">3</span>
    <span class="step-label">Payment</span>
  </a>
</nav>
```

### 8. Table of Contents (Anchor Navigation)

```scss
.article-toc {
  @include genesis-environment('navigation-sidebar');
  @include genesis-entity('secondary');

  .toc-title {
    @include genesis-cognition('motive');
  }

  .toc-link {
    @include genesis-synapse('anchor');
    // Active section via [aria-current="location"] or .active
  }
  
  .skip-link {
    @include genesis-synapse('anchor');
    // Add .skip-link class for accessibility positioning
  }
}
```

## Accessibility Features

All navigation mechanisms implement WCAG 2.5.5 guidelines:

- ✅ **Minimum 44x44px touch targets on mobile** (automatically applied)
- ✅ **Keyboard navigation support** (focus-visible states)
- ✅ **ARIA attributes** (aria-current, aria-selected, aria-expanded, etc.)
- ✅ **Semantic HTML** (nav, role="tablist", role="navigation")
- ✅ **Screen reader support** (aria-label, aria-labelledby, aria-controls)
- ✅ **Reduced motion support** (respects prefers-reduced-motion)

## Responsive Behavior

### Mobile (< 768px)
- **Pagination**: Shows fewer page numbers, prioritizes prev/next
- **Breadcrumbs**: Optional horizontal scrolling for long paths
- **Tabs**: Horizontal scrolling for overflow tabs
- **Sidebar**: Can convert to horizontal or hide via modifier classes
- **Footer**: Single column layout
- **All touch targets**: Minimum 44px height/width

### Tablet (768px - 1023px)
- **Pagination**: Balanced sizing (40px touch targets)
- **Footer**: 2-column layout
- **Sidebar**: Sticky positioning begins
- **Touch targets**: 42px minimum

### Desktop (1024px+)
- **Pagination**: Compact sizing (36px touch targets)
- **Footer**: 3-4 column auto-fit layout
- **Sidebar**: Full sticky positioning with scroll
- **Touch targets**: Standard web sizing

## JavaScript Integration

While the ontology provides all styling, some navigation patterns require JavaScript for interactivity:

### Tab Switching
```javascript
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Toggle aria-selected and show/hide panels
  });
});
```

### Accordion Toggle
```javascript
document.querySelectorAll('.accordion-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    // Toggle .expanded class on content
  });
});
```

### Scroll Spy (TOC)
```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add .active class to corresponding TOC link
    }
  });
});
```

## Visual Demonstration

A complete visual demonstration of all navigation mechanisms is available at:

**File:** `/navigation-demo.html`

This demo page includes:
- Live examples of all 8 navigation patterns
- SCSS implementation code snippets
- Responsive behavior demonstrations
- Accessibility features highlighted

## Migration Guide

### From Legacy Bootstrap/Bento Classes

**Before:**
```html
<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item active">
      <a class="page-link" href="#">1</a>
    </li>
  </ul>
</nav>
```

**After (Ontology v2.3.0):**
```html
<nav class="blog-pagination" aria-label="Page navigation">
  <a href="#" class="page-link" aria-current="page">1</a>
</nav>
```

**SCSS:**
```scss
.blog-pagination {
  @include genesis-environment('navigation-pagination');

  .page-link {
    @include genesis-synapse('paginate');
  }
}
```

### Benefits of Migration

1. **Semantic clarity** - Navigation intent is explicit in class names
2. **Automatic responsive behavior** - No media queries needed in subdomains
3. **Accessibility baked in** - WCAG compliance by default
4. **Consistent theming** - All navigation uses the same design tokens
5. **Reduced bundle size** - No Bootstrap dependency needed

## Design Tokens Used

All navigation mechanisms leverage the existing design token system:

### Spacing
- `--space-nav` - Navigation gap spacing
- `--space-tabs` - Tab spacing
- `--space-sidebar` - Sidebar item spacing
- `--space-pagination` - Pagination spacing
- `--space-accordion` - Accordion spacing

### Colors
- `--text-link` - Default link color
- `--accent-neon` - Active/hover state
- `--glass-light` - Navigation backgrounds
- `--border-subtle` - Navigation borders

### Motion
- `--motion-snap` - Quick transitions (0.2s)
- Respects `prefers-reduced-motion: reduce`

## Browser Support

All navigation mechanisms are tested and supported in:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

## Performance Considerations

### CSS Performance
- Uses CSS Grid and Flexbox (hardware accelerated)
- Minimal use of `position: sticky` (well-supported)
- No heavy box-shadows or filters on scroll elements

### JavaScript Performance
- Navigation state managed via ARIA attributes (no state libraries needed)
- Intersection Observer for scroll spy (efficient, native API)
- Event delegation recommended for dynamic navigation

## Further Reading

- **Complete API Reference**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Usage Examples**: `_sass/ontology/_sample.scss`
- **Architecture**: `_sass/ontology/Readme.md`
- **Visual Demo**: `/navigation-demo.html`

## Version History

### v2.3.0 (Current)
- Added 6 new environment variants for navigation layouts
- Added 5 new synapse variants for navigation interactions
- Added 3 new state variants for navigation states
- Created comprehensive documentation and examples
- Created visual demonstration page

### v2.2.0
- Added `navigation-primary` and `navigation-secondary` environments
- Added `input-primary` synapse variant
- Added `scroll-triggered` state variant

### v2.1.0
- Added responsive image and embed entity variants
- Added viewport-aware atmosphere variants

## Contributing

When proposing new navigation patterns, use the Ontological Proposition template:

`.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

Ensure new patterns:
1. Have semantic intent (WHAT, not HOW)
2. Are universally applicable across subdomains
3. Cannot be achieved by combining existing mixins
4. Follow WCAG 2.5.5 accessibility guidelines

## License

Part of the Genesis Ontological Design System - ASISaga Theme
