# Component System Documentation

*Last Updated: 2026-02-10*

The Genesis Component System provides reusable, semantic web components and templates for the theme.

## Core Documentation

### Web Components

**[GENESIS-WEB-COMPONENTS-GUIDE.md](GENESIS-WEB-COMPONENTS-GUIDE.md)**
- Web components overview
- Custom element architecture
- Component lifecycle and patterns

**[JEKYLL-LAYOUTS-WEB-COMPONENTS.md](JEKYLL-LAYOUTS-WEB-COMPONENTS.md)**
- Jekyll integration patterns
- Layout composition
- Template inheritance

**[WEB-COMPONENTS-IMPLEMENTATION.md](WEB-COMPONENTS-IMPLEMENTATION.md)**
- Implementation guide
- Component creation
- Best practices

### Template System

**[WEB-COMPONENT-TEMPLATES.md](WEB-COMPONENT-TEMPLATES.md)**
- Template system architecture
- Reusable component templates
- Template composition

**[WEB-COMPONENT-TEMPLATES-QUICK-REFERENCE.md](WEB-COMPONENT-TEMPLATES-QUICK-REFERENCE.md)**
- Quick reference guide
- Common patterns
- Code snippets

### Implementation Patterns

**[SINGLE-CLASS-IMPLEMENTATION.md](SINGLE-CLASS-IMPLEMENTATION.md)**
- Single-class component pattern
- Semantic HTML + ontology SCSS
- Minimal markup approach

## Key Concepts

### Semantic Components
- Clean HTML structure with semantic class names
- Ontology SCSS for styling
- Progressive enhancement with JavaScript
- Accessibility-first design

### Component Architecture
- **Base Components** (`_includes/components/`) - Reusable building blocks
- **Custom Elements** - Native web components
- **Template System** - Parameterized Jekyll includes
- **Layout Components** - Page-level structures

### Available Components

Pre-built components in `_includes/components/`:
- `card.html` - Card component
- `alert.html` - Alert messages
- `alert-card.html` - Alert card variant
- `breadcrumb.html` - Breadcrumb navigation
- `pagination.html` - Pagination controls
- `stat.html` - Statistics display
- `tag-list.html` - Tag/label lists
- `product-card.html` - Product card
- `testimonial-card.html` - Testimonial card
- `template-loader.html` - Dynamic template loading

## Related Documentation

- **[Component Library Specification](../../specifications/component-library.md)** - Complete component reference
- **[HTML Semantic Patterns](../../specifications/html-semantic-patterns.md)** - Semantic HTML patterns
- **[Accessibility Specification](../../specifications/accessibility.md)** - A11y requirements

## Source Code

Component source locations:
- `_includes/components/` - Reusable component includes
- `_layouts/` - Jekyll layout templates
- `_sass/components/` - Component SCSS

---

**Back to**: [Systems Documentation](../README.md) | [Documentation Home](../../README.md)
