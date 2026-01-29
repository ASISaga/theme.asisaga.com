# CSS Architecture Patterns

**Version**: 1.0.0  
**For**: scss-refactor-agent skill  
**Purpose**: Scalable CSS architecture patterns for maintainable codebases

---

## Table of Contents

1. [Architecture Philosophies](#architecture-philosophies)
2. [Naming Conventions](#naming-conventions)
3. [File Organization](#file-organization)
4. [Component Patterns](#component-patterns)
5. [State Management](#state-management)
6. [Theming Strategies](#theming-strategies)
7. [Scale & Maintainability](#scale--maintainability)

---

## Architecture Philosophies

### 1. Genesis Three-Tier Architecture

**The Genesis Approach**: Radical separation of concerns

**Tier 1: Content (HTML)**
- Defines WHAT the data is
- Semantic HTML5 with meaningful class names
- No styling information in markup
- Lives in subdomain repositories

**Tier 2: Interface (Ontological Mixins)**
- Defines the ROLE of content
- Semantic mixins with zero CSS properties
- Abstraction layer between content and presentation
- Lives in `_sass/ontology/_interface.scss`

**Tier 3: Engine (Visual Implementation)**
- Defines the LOOK (colors, spacing, effects)
- The ONLY place for raw CSS properties
- Physical manifestation of design tokens
- Lives in `_sass/ontology/_engines.scss`

**Benefits**:
- Complete visual redesigns without touching HTML
- Subdomain developers never write CSS properties
- Single source of truth for all visual styling
- Design system evolution without breaking changes

**Example Flow**:
```html
<!-- Tier 1: Content HTML -->
<article class="blog-post">
  <header class="post-header">
    <h1 class="post-title">Article Title</h1>
  </header>
</article>
```

```scss
// Tier 2: Semantic mapping (subdomain SCSS)
@import "ontology/index";

.blog-post {
  @include genesis-environment('focused');  // Role: reading layout
}

.post-header {
  @include genesis-entity('primary');       // Role: main surface
}

.post-title {
  @include genesis-cognition('axiom');      // Role: headline
}
```

```scss
// Tier 3: Visual implementation (theme engine)
@mixin genesis-cognition($intent) {
  @if $intent == 'axiom' {
    // Actual CSS properties here
    font-size: clamp(2rem, 4vw + 1rem, 3.5rem);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
  }
}
```

### 2. Traditional Methodologies (Comparison)

#### BEM (Block Element Modifier)

**Structure**:
```scss
.block {}                    // Component
.block__element {}          // Part of component
.block__element--modifier {} // Variation
```

**Pros**:
- Clear naming convention
- Prevents specificity issues
- Self-documenting

**Cons**:
- Verbose class names
- Still couples HTML to styling
- No abstraction of visual properties

**Genesis Integration**:
```scss
// BEM structure for HTML organization
.research-paper {}
.research-paper__title {}
.research-paper__abstract {}

// Genesis mixins for styling abstraction
.research-paper {
  @include genesis-environment('focused');
  
  &__title {
    @include genesis-cognition('axiom');
  }
  
  &__abstract {
    @include genesis-cognition('discourse');
  }
}
```

#### SMACSS (Scalable and Modular Architecture for CSS)

**Categories**:
1. **Base** - Element defaults
2. **Layout** - Page structure
3. **Module** - Reusable components
4. **State** - Dynamic states
5. **Theme** - Visual variations

**Genesis Alignment**:
- Base → CSS resets + design tokens
- Layout → `genesis-environment()` mixins
- Module → `genesis-entity()` mixins
- State → `genesis-state()` mixins
- Theme → Engine layer implementation

#### ITCSS (Inverted Triangle CSS)

**Layers** (Specificity pyramid):
1. Settings - Variables
2. Tools - Mixins/functions
3. Generic - Resets
4. Elements - Type selectors
5. Objects - Layout patterns
6. Components - UI components
7. Utilities - Helper classes

**Genesis Mapping**:
```
Settings    → _sass/ontology/_tokens.scss
Tools       → _sass/ontology/_interface.scss
Generic     → _sass/base/_reset.scss
Elements    → _sass/base/_typography.scss
Objects     → genesis-environment() implementations
Components  → genesis-entity() implementations
Utilities   → (Avoided - use mixins instead)
```

#### OOCSS (Object-Oriented CSS)

**Principles**:
1. Separate structure from skin
2. Separate container from content

**Genesis Implementation**:
```scss
// Structure (environment)
.card-layout {
  @include genesis-environment('distributed');
}

// Skin (entity)
.card-visual {
  @include genesis-entity('primary');
}

// Content (cognition)
.card-text {
  @include genesis-cognition('discourse');
}
```

### 3. Atomic CSS vs Semantic CSS

#### Atomic CSS (Utility-First)

**Example** (Tailwind):
```html
<div class="flex items-center justify-between p-4 bg-blue-500 rounded-lg">
```

**Pros**:
- Fast development
- No naming decisions
- Small CSS bundle

**Cons**:
- Couples styling to HTML
- Hard to maintain
- Visual changes require HTML edits

#### Semantic CSS (Genesis Approach)

**Example**:
```html
<div class="navigation-bar">
```

```scss
.navigation-bar {
  @include genesis-environment('associative');
  @include genesis-entity('primary');
}
```

**Pros**:
- Clean, meaningful HTML
- Complete visual flexibility
- Single source of truth
- Design system alignment

**Cons**:
- Requires SCSS knowledge
- More initial setup

**Genesis Balance**:
- Semantic HTML class names
- Ontological mixin abstraction
- No utility classes needed

---

## Naming Conventions

### 1. Semantic Class Naming

**Principle**: Name describes WHAT it is, not HOW it looks

**✅ Good Examples**:
```scss
.research-paper      // Content type
.user-profile       // Content type
.navigation-menu    // Purpose
.search-results     // Function
.article-metadata   // Information type
```

**❌ Bad Examples**:
```scss
.blue-box          // Visual description
.large-text        // Visual description
.left-sidebar      // Positional
.mt-4              // Utility class
```

### 2. BEM Convention (Genesis Compatible)

**Structure**:
```scss
.component-name {}                      // Block
.component-name__element {}            // Element
.component-name__element--modifier {}  // Modifier
```

**Genesis Application**:
```scss
.blog-post {
  @include genesis-environment('focused');
  
  &__header {
    @include genesis-entity('primary');
  }
  
  &__title {
    @include genesis-cognition('axiom');
  }
  
  &__title--draft {
    @include genesis-state('simulated');
  }
}
```

### 3. State Classes

**Convention**: Prefix with state indicator

```scss
// Boolean states
.is-active {}
.is-disabled {}
.is-loading {}

// Visual states (avoid - use Genesis states)
.has-error {}    // → @include genesis-state('deprecated');
.has-warning {}  // → @include genesis-state('evolving');
```

**Genesis Approach**:
```scss
.form-field {
  @include genesis-entity('primary');
  
  &.is-valid {
    @include genesis-state('stable');
  }
  
  &.is-error {
    @include genesis-entity('imperative');
  }
}
```

### 4. JavaScript Hooks

**Convention**: Prefix with `js-` for JavaScript selectors

```html
<button class="action-button js-submit">Submit</button>
```

```scss
// Style with semantic class
.action-button {
  @include genesis-synapse('execute');
}

// Never style .js-* classes
// .js-submit {} ❌
```

**Benefits**:
- Separates behavior from presentation
- Safe to change styles without breaking JS
- Clear developer intent

---

## File Organization

### 1. Genesis File Structure

```
_sass/
├── base/                    # Foundation
│   ├── _reset.scss         # CSS reset
│   ├── _design-tokens.scss # Sass variables
│   └── _typography.scss    # Base type styles
├── ontology/               # Three-tier system
│   ├── _index.scss         # Public import
│   ├── _tokens.scss        # CSS custom properties
│   ├── _interface.scss     # Tier 2 mixins (zero CSS)
│   └── _engines.scss       # Tier 3 implementation
├── components/             # Legacy components (migrating)
│   ├── _card.scss
│   └── _button.scss
├── layouts/                # Legacy layouts (migrating)
│   ├── _grid.scss
│   └── _header.scss
└── _common.scss            # Theme entry point
```

### 2. Import Order

**Critical**: Import in correct order to prevent conflicts

```scss
// Theme entry (_common.scss)
@import "base/reset";
@import "base/design-tokens";
@import "ontology/index";      // Ontology system
@import "base/typography";
@import "components/**";
@import "layouts/**";
```

**Subdomain entry** (standalone SCSS):
```scss
---
---
@import "ontology/index";  // MUST be first import

// Your subdomain styles here
```

### 3. Partial Naming

**Convention**:
- Prefix with underscore: `_component.scss`
- Kebab-case: `_multi-word-name.scss`
- Semantic names: `_blog-post.scss` not `_styles.scss`

### 4. Component Co-location

**Pattern**: Keep related files together

```
components/
├── card/
│   ├── _card.scss           # Styles
│   ├── card.html           # Template (if applicable)
│   ├── card.test.scss      # Tests
│   └── README.md           # Documentation
```

---

## Component Patterns

### 1. Single Responsibility Components

**Principle**: Each component does one thing well

**Example**:
```scss
// ✅ Good: Focused component
.search-input {
  @include genesis-synapse('inquiry');
}

.search-button {
  @include genesis-synapse('execute');
}

// ❌ Bad: Kitchen sink component
.search-widget {
  // Too many responsibilities
}
```

### 2. Composition Over Inheritance

**Pattern**: Build complex UIs from simple components

```scss
// Base components
.card {
  @include genesis-entity('primary');
}

.card-header {
  @include genesis-environment('associative');
}

.card-title {
  @include genesis-cognition('axiom');
}

// Compose in HTML
```

```html
<div class="card">
  <header class="card-header">
    <h2 class="card-title">Title</h2>
  </header>
</div>
```

### 3. Variants vs Modifiers

**Variants**: Different types with different semantics

```scss
.button {
  @include genesis-synapse('execute');
  
  // Variant: Different semantic purpose
  &--destructive {
    @include genesis-synapse('destructive');
  }
}
```

**Modifiers**: Visual variations of same semantic component

```scss
.card {
  @include genesis-entity('primary');
  
  // Modifier: Size variation
  &--compact {
    // Override specific properties if needed
    // (Better: propose new ontological variant)
  }
}
```

### 4. Container Components

**Pattern**: Wrapper components that provide context

```scss
.article-layout {
  @include genesis-environment('focused');
  
  // All children inherit reading-optimized context
}

.dashboard-layout {
  @include genesis-environment('manifest');
  
  // All children get dashboard grid context
}
```

---

## State Management

### 1. State Categories

**Visual States** (Genesis Built-in):
```scss
// Temporal states
@include genesis-state('stable');      // Normal
@include genesis-state('evolving');    // Updating
@include genesis-state('deprecated');  // Outdated
@include genesis-state('locked');      // Restricted
@include genesis-state('simulated');   // Draft/Preview
```

**Interactive States** (CSS pseudo-classes):
```scss
.button {
  @include genesis-synapse('execute');
  
  &:hover {
    // Hover enhancements
  }
  
  &:active {
    // Active state
  }
  
  &:disabled {
    @include genesis-state('latent');
  }
}
```

**Data States** (JavaScript-driven):
```scss
.data-card {
  @include genesis-entity('primary');
  
  &.is-loading {
    @include genesis-state('evolving');
  }
  
  &.is-error {
    @include genesis-entity('imperative');
  }
}
```

### 2. State Transitions

**Best Practice**: Smooth state changes with transitions

```scss
.component {
  @include genesis-entity('primary');
  
  // Transition state changes
  transition: var(--motion-fluid);
  
  &.is-active {
    @include genesis-state('stable');
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none; // Respect accessibility
  }
}
```

### 3. Loading States

**Pattern**: Skeleton screens and loading indicators

```scss
.content-placeholder {
  @include genesis-entity('secondary');
  @include genesis-state('evolving');
  
  // Pulse animation for loading
  animation: pulse 2s ease-in-out infinite;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## Theming Strategies

### 1. CSS Custom Properties (Genesis Approach)

**Strategy**: Define theme tokens as CSS variables

```scss
// Light theme (default)
:root {
  --glass-base: oklch(0.95 0.01 0);
  --text-primary: oklch(0.1 0.01 0);
  --accent-consciousness: oklch(0.75 0.15 270);
}

// Dark theme
@media (prefers-color-scheme: dark) {
  :root {
    --glass-base: oklch(0.15 0.01 270);
    --text-primary: oklch(0.95 0.01 0);
    --accent-consciousness: oklch(0.8 0.18 270);
  }
}

// High contrast theme
@media (prefers-contrast: high) {
  :root {
    --glass-opacity: 1;
    --border-width: 2px;
  }
}
```

### 2. Data Attribute Theming

**Alternative**: Theme switching via data attributes

```html
<html data-theme="dark">
```

```scss
:root {
  // Default theme
}

[data-theme="dark"] {
  // Dark theme overrides
}

[data-theme="high-contrast"] {
  // High contrast overrides
}
```

### 3. Theme Variants

**Genesis Engine Layer** handles theme implementation:

```scss
@mixin genesis-entity($nature) {
  @if $nature == 'primary' {
    background: oklch(from var(--glass-base) l c h / var(--glass-opacity));
    backdrop-filter: blur(calc(var(--glass-blur) * 1px));
    
    // Themes automatically applied via custom properties
  }
}
```

---

## Scale & Maintainability

### 1. Documentation Standards

**Component Documentation**:
```scss
/**
 * Blog Post Component
 * 
 * @description Main article layout for blog content
 * @usage @include genesis-environment('focused')
 * @since v2.0
 * 
 * @example
 *   .blog-post {
 *     @include genesis-environment('focused');
 *     @include genesis-entity('primary');
 *   }
 */
```

### 2. Code Review Checklist

**Before Committing SCSS**:
- [ ] Zero raw CSS properties in subdomain files
- [ ] Semantic class names used
- [ ] SCSS nesting mirrors HTML structure
- [ ] Max 3 nesting levels
- [ ] No `@extend` usage
- [ ] Linter passes (`npm run lint:scss`)
- [ ] Compilation succeeds (`npm run test:scss`)
- [ ] Validation passes (skill validation script)

### 3. Refactoring Guidelines

**When to Refactor**:
- Component used in 3+ places
- Duplicate styles detected
- New ontological variant approved
- Accessibility improvements needed

**How to Refactor**:
1. Identify semantic intent
2. Find appropriate Genesis mixin
3. Replace CSS properties with mixin
4. Test compilation and linting
5. Verify visual output unchanged

### 4. Performance Monitoring

**Metrics to Track**:
- CSS bundle size (target: < 50KB gzipped)
- Number of selectors
- Specificity scores
- Unused CSS percentage

**Tools**:
```bash
# Check CSS size
npm run build:css
ls -lh _site/assets/css/*.css

# Analyze with coverage tools
# (Chrome DevTools > Coverage tab)
```

### 5. Deprecation Strategy

**Pattern**: Gradual migration with warnings

```scss
// Legacy mixin (deprecated)
@mixin old-card-style {
  @warn "old-card-style is deprecated. Use genesis-entity('primary') instead.";
  @include genesis-entity('primary');
}

// New mixin (recommended)
@mixin genesis-entity($nature) {
  // Current implementation
}
```

### 6. Breaking Change Management

**When Ontology Updates**:
1. Announce change in GENOME.md
2. Provide migration guide
3. Support old variant for 1 major version
4. Update all examples and documentation
5. Notify subdomain maintainers

---

## Best Practices Summary

### DO ✅

- Use semantic class names describing content role
- Follow Genesis three-tier architecture
- Keep SCSS nesting max 3 levels
- Use CSS custom properties for theming
- Document component purpose and usage
- Test across viewports and themes
- Validate with automated scripts
- Respect accessibility preferences

### DON'T ❌

- Use visual descriptors in class names
- Write raw CSS properties in subdomain SCSS
- Use `@extend` (causes Jekyll build errors)
- Nest deeper than 3 levels
- Ignore linter warnings
- Skip accessibility testing
- Use utility classes (use mixins instead)
- Hardcode values (use design tokens)

---

## Resources

### Genesis Documentation
- `_sass/ontology/INTEGRATION-GUIDE.md` - Complete ontological API
- `.github/instructions/scss.instructions.md` - SCSS coding standards
- `GENOME.md` - Evolutionary history

### Methodology References
- [BEM Methodology](http://getbem.com/)
- [SMACSS](http://smacss.com/)
- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [OOCSS](https://github.com/stubbornella/oocss/wiki)

---

**Version**: 1.0.0  
**Aligned with**: Genesis Semantic Design System v2.1+  
**Last Updated**: 2026-01-29  
**Maintained by**: scss-refactor-agent skill
