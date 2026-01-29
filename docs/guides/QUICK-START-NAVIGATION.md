# Quick Start Guide - Navigation Mechanisms v2.3.0

## 5-Minute Setup

### 1. Import the Ontology

In your subdomain's SCSS file:

```scss
---
---
@import "ontology/index";  // Import Genesis Ontology System
```

### 2. Choose Your Pattern

Pick the navigation pattern you need:

| Need | Use This | Example |
|------|----------|---------|
| Numbered pages | `genesis-synapse('paginate')` | Blog pagination |
| Breadcrumb trail | `genesis-environment('navigation-breadcrumb')` | Home > Docs > API |
| Content tabs | `genesis-synapse('tab')` | Product Info \| Reviews |
| Collapsible FAQ | `genesis-synapse('toggle')` | Expandable Q&A |
| Side menu | `genesis-environment('navigation-sidebar')` | Docs navigation |
| Multi-column footer | `genesis-environment('navigation-footer')` | Company links |
| Multi-step wizard | `genesis-synapse('step')` | Checkout flow |
| In-page TOC | `genesis-synapse('anchor')` | Jump links |

### 3. Copy-Paste Example

#### Pagination (Most Common)

**SCSS:**
```scss
.my-pagination {
  @include genesis-environment('navigation-pagination');

  .page-link {
    @include genesis-synapse('paginate');
  }
}
```

**HTML:**
```html
<nav class="my-pagination" aria-label="Page navigation">
  <a href="/page/1" class="page-link">← Prev</a>
  <a href="/page/1" class="page-link">1</a>
  <a href="/page/2" class="page-link" aria-current="page">2</a>
  <a href="/page/3" class="page-link">3</a>
  <a href="/page/3" class="page-link">Next →</a>
</nav>
```

**Done!** You now have:
- ✅ Responsive pagination
- ✅ 44px touch targets on mobile
- ✅ Accessibility (WCAG 2.5.5)
- ✅ Consistent theming

## Common Patterns

### Tabs with Panels

```scss
.product-tabs {
  .tab-list {
    @include genesis-environment('navigation-tabs');
  }

  .tab-button {
    @include genesis-synapse('tab');
  }
}
```

### Accordion/FAQ

```scss
.faq {
  @include genesis-environment('navigation-accordion');

  .question {
    @include genesis-synapse('toggle');
  }
  
  .answer {
    @include genesis-state('collapsed');
    
    &.open {
      @include genesis-state('expanded');
    }
  }
}
```

### Breadcrumbs

```scss
.breadcrumb {
  @include genesis-environment('navigation-breadcrumb');

  a {
    @include genesis-synapse('navigate');
  }
  
  .current {
    @include genesis-state('active');
  }
}
```

## Need More Examples?

- **16 full examples**: `_sass/ontology/_sample.scss`
- **Visual demos**: Open `navigation-demo.html` in browser
- **Complete docs**: `NAVIGATION-MECHANISMS-v2.3.0.md`
- **API reference**: `_sass/ontology/INTEGRATION-GUIDE.md`

## Tips

1. **Use semantic class names** - `.product-tabs` not `.blue-box`
2. **One mixin category per element** - Environment for layout, Synapse for interaction
3. **ARIA attributes** - Let the ontology style them automatically
4. **No custom CSS** - Everything is in the ontology mixins

## Getting Help

- Review examples in `_sass/ontology/_sample.scss`
- Check the visual demo at `navigation-demo.html`
- See full documentation in `NAVIGATION-MECHANISMS-v2.3.0.md`
- Consult `.github/AGENTS.MD` for ontological evolution process
