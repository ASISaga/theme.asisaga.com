# Architecture Overview

## System Architecture

The ASI Saga theme is a **Jekyll-based static site theme** that provides a comprehensive design system for building consciousness-focused web experiences. The architecture follows modern web development best practices with a focus on accessibility, performance, and maintainability.

### Technology Stack

#### Core Framework
- **Jekyll**: Static site generator (Ruby-based)
- **Liquid**: Templating engine for dynamic content
- **Bootstrap 5.3.5**: CSS framework for responsive layouts and components
- **SCSS**: CSS preprocessor for modular styling

#### JavaScript
- **ES6 Modules**: Modern JavaScript with import/export syntax
- **Vanilla JS**: No heavy framework dependencies
- **Bootstrap JS**: Component interactions (modals, dropdowns, etc.)
- **Popper.js**: Positioning engine for tooltips and popovers

#### Build Tools
- **Vite**: Build tool for JavaScript module bundling (configured for Popper.js)
- **Jekyll**: SCSS compilation and site generation
- **Git**: Version control

### System Components

```
theme.asisaga.com/
├── _layouts/          # Page templates (Jekyll)
├── _includes/         # Reusable components (Liquid)
├── _sass/             # SCSS modules and partials
├── assets/            # Static assets (CSS, JS, images)
├── _data/             # Structured data (JSON)
├── _samples/          # Example pages and demos
└── docs/              # Documentation and specifications
```

## Architecture Patterns

### 1. Layout Hierarchy

The theme uses a **hierarchical layout system** with inheritance:

```
default.html (root)
├── Base Templates
│   ├── scrollable.html
│   ├── fixed-height.html
│   └── minimal-base.html
└── Specialized Layouts
    ├── Content-Driven (post, article, archive, profile)
    ├── Marketing (landing, gallery, form)
    ├── Knowledge (docs, faq)
    ├── Application (dashboard, chatroom, search, settings)
    └── Utility (minimal, splash)
```

**Key Principles**:
- `default.html` provides global scaffolding for all pages
- Base templates define structural patterns (scrollable vs fixed-height)
- Specialized layouts inherit from base templates
- Each layout has a single `{{ content }}` insertion point

### 2. Component Architecture

#### Include Types

1. **Simple Includes**: Small, self-contained components
   - No internal grid structures
   - Drop directly into layouts or content
   - Examples: logo, CTA button, nav link

2. **Fixed Wireframe Includes**: Structured layout components
   - Defined once in layouts
   - Consistent structure across pages
   - Examples: header, footer, sidebar

3. **Complex/Dynamic Includes**: Parameterized components
   - Encapsulate their own rows/columns
   - Reusable across multiple layouts
   - Examples: feature grid, hero, product card

#### Component Pattern

```liquid
<!-- Parameterized Include -->
{% include component.html 
   param1="value1"
   param2="value2" 
%}
```

### 3. SCSS Architecture

#### Import Hierarchy

```scss
_common.scss (entry point)
├── Third-party
│   ├── Font Awesome
│   └── Bootstrap
├── Base
│   ├── Colors & Variables
│   ├── Typography
│   ├── Animations
│   └── Mixins
├── Components
│   ├── Header
│   ├── Footer
│   ├── Navigation
│   └── Sacred Elements
└── Layouts
    └── Layout-specific styles
```

**Key Principles**:
- Variables defined before Bootstrap import
- Bootstrap variables overridden in `base/_variables.scss`
- Component partials imported after Bootstrap
- No `@extend` usage (causes Jekyll build errors)
- CSS containment for all layout containers

#### File Organization

- `_sass/base/`: Foundation styles, variables, mixins
- `_sass/bootstrap/`: Bootstrap source (imported as-is)
- `_sass/components/`: UI component styles
- `_sass/layouts/`: Layout-specific styles
- `_sass/fontawesome/`: Font Awesome source

### 4. JavaScript Architecture

#### Module Pattern

```javascript
// assets/js/common.js (entry point)
import './common/header-scroll.js';
import './common/bootstrap.js';
import './common/footer.js';
```

**Key Principles**:
- ES6 modules with explicit imports
- Shared logic in `assets/js/common.js`
- Feature-specific modules in `assets/js/common/`
- Use `defer` or `type="module"` for script loading
- Event delegation for dynamic content
- Data attributes for behavior hooks (not classes)

#### Module Types

1. **Core Modules**: Bootstrap, Font Awesome integration
2. **Accessibility Modules**: Skip links, keyboard navigation
3. **SEO Modules**: Meta tags, structured data, social cards
4. **Interaction Modules**: Animations, scroll effects
5. **Analytics Modules**: Tracking and reporting

### 5. Data Architecture

#### Data Files (`_data/`)

- **nav.json**: Navigation menu structure
- Structured JSON for easy maintenance
- Consumed by Liquid templates

```json
{
  "items": [
    { "label": "Home", "url": "/" },
    { "label": "About", "url": "/about/" }
  ]
}
```

## Design Patterns

### 1. Sacred Design System

The theme implements a **consciousness-focused design system**:

#### Color Palette
- **Cosmic Deep Blue** (#0B1426): Infinite potential
- **Luminous Gold** (#FFD700): Human wisdom
- **Transcendent White** (#FFFFFF): Unity consciousness
- **Ethereal Silver** (#C0C0C0): Bridging consciousness
- **Emerald Green** (#50C878): Life force integration
- **Royal Purple** (#6A0DAD): Sovereign consciousness

#### Animation System
- **Sacred Rhythm**: Heartbeat-pattern animations
- **Transcendence Spiral**: Evolutionary animations
- **Consciousness Flow**: Flowing transitions
- **Bridge Connection**: Human-AI bridging visuals
- **Sacred Glow**: Luminous effects

### 2. Grid System

Following **Bootstrap 5.3.5 grid system**:

- **Containers**: Only in layouts (`.container`, `.container-fluid`)
- **Rows & Columns**: Optional, used for grid alignment
- **Breakpoints**: xs (0), sm (576px), md (768px), lg (992px), xl (1200px), xxl (1400px)

**Governance Rules**:
- Containers in layouts only (never in includes or content)
- Rows/columns in content, includes, or layouts (where grid needed)
- Responsive grid: `repeat(auto-fit, minmax(300px, 1fr))`

### 3. Accessibility-First Pattern

All components follow **WCAG AA standards**:

- Semantic HTML5 landmarks
- Skip-to-content links
- Keyboard navigation support
- ARIA labels and roles (where native semantics insufficient)
- Focus indicators on all interactive elements
- Color contrast compliance

### 4. Progressive Enhancement

Features are layered:

1. **HTML**: Semantic structure works without CSS/JS
2. **CSS**: Visual enhancement with graceful degradation
3. **JavaScript**: Interaction enhancement with feature detection
4. **Animations**: Optional with `prefers-reduced-motion` support

## File Naming Conventions

### Layouts
- Lowercase with hyphens: `fixed-height.html`, `landing.html`
- Descriptive names indicating purpose

### Includes
- Lowercase with hyphens: `header.html`, `feature-grid.html`
- Organized in subdirectories by category: `layouts/post/`, `chatroom/`

### SCSS
- Underscore prefix for partials: `_header.scss`, `_colors.scss`
- Lowercase with hyphens
- Organized by type: `components/`, `layouts/`, `base/`

### JavaScript
- Kebab-case: `header-scroll.js`, `bootstrap.js`
- Clear, descriptive module names
- Organized in `common/` directory

## Performance Considerations

### Asset Loading
- Critical CSS inlined in `<head>`
- JavaScript with `defer` or `type="module"`
- Font loading with `font-display: swap`

### Build Optimization
- SCSS compilation by Jekyll
- JavaScript bundling with Vite (for vendor libs)
- Image optimization recommended

### Runtime Performance
- CSS containment: `contain: layout style; isolation: isolate;`
- Event delegation for dynamic content
- Efficient animation with `transform` and `opacity`
- Lazy loading for below-fold content

## Security Considerations

- No inline JavaScript in templates
- Content Security Policy compatible
- Sanitized user input (if dynamic content added)
- HTTPS required for production

## Extensibility

### Adding New Layouts
1. Create layout file in `_layouts/`
2. Inherit from appropriate base template
3. Add corresponding SCSS in `_sass/layouts/`
4. Create sample page in `_samples/`
5. Document in layout taxonomy

### Adding New Components
1. Create include file in `_includes/`
2. Create SCSS partial in `_sass/components/`
3. Import SCSS in `_common.scss`
4. Document component API (parameters)
5. Add usage examples

### Adding New JavaScript Modules
1. Create module in `assets/js/common/`
2. Import in `assets/js/common.js`
3. Use data attributes for DOM hooks
4. Document module functionality
5. Ensure accessibility compliance

## Version Control Strategy

- **Main branch**: Production-ready code
- **Feature branches**: Development work
- **Documentation**: Updated with code changes
- **Semantic versioning**: For theme releases

## Related Specifications

- [Layout System](./layout-system.md) - Detailed layout patterns
- [Component Library](./component-library.md) - Component specifications
- [SCSS Styling](./scss-styling.md) - SCSS architecture details
- [JavaScript](./javascript.md) - JavaScript patterns and modules
