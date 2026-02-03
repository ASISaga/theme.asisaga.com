# Web Component Templates - Complete Documentation

## Overview

The Web Component Templates system provides a structured approach to creating reusable HTML components that are **not rendered on page load** but can be **dynamically instantiated via JavaScript**. This system enforces a strict **matching namespace pattern** across HTML, SCSS, and JavaScript files.

## Architecture

### Three-Tier Namespace Pattern

Every web component consists of three files with matching names:

```
component-name/
├── HTML:  _includes/web-component-templates/component-name.html
├── SCSS:  _sass/components/_component-name.scss
└── JS:    assets/js/components/component-name.js
```

This ensures:
- **Discoverability**: Easy to find all related files
- **Maintainability**: Clear structure for updates
- **Consistency**: Enforced naming conventions
- **Semantics**: Matching class names across technologies

### HTML Templates (Not Rendered)

Templates use HTML5 `<template>` tags which are:
- **Inert**: Content is not rendered on page load
- **Cloneable**: Can be instantiated multiple times
- **Isolated**: Does not interfere with page styles
- **Accessible**: Can be retrieved via `getElementById()`

**Location**: `_includes/web-component-templates/`

### SCSS Styling (Genesis Ontological)

Styling uses the Genesis Ontological Design System:
- **Semantic mixins**: `genesis-entity()`, `genesis-cognition()`, etc.
- **No raw CSS**: All styling through ontological interface
- **Purposeful hierarchy**: Follows design system principles
- **Responsive**: Mobile-first, container queries

**Location**: `_sass/components/web-components/`

### JavaScript Instantiation (ES6 Modules)

JavaScript provides factory functions to:
- **Clone templates**: Create new instances from templates
- **Populate data**: Fill in dynamic content
- **Append to DOM**: Insert instances into page
- **Handle interactions**: Setup event listeners

**Location**: `assets/js/common/`

## Usage Guide

### 1. Include Templates in Page

Add the template loader to any page that needs to instantiate components:

```liquid
---
layout: default
---

{% include web-component-templates/template-loader.html %}

<!-- Your page content here -->
<div id="products-container"></div>

<script type="module">
  // Import and use templates
  import { createProductCard } from '/assets/js/components/product-card.js';
  
  // Create instance
  const card = createProductCard({
    title: 'My Product',
    description: 'Product description',
    url: '/products/my-product'
  });
  
  // Append to DOM
  document.getElementById('products-container').appendChild(card);
</script>
```

### 2. Load Specific Templates Only

If you only need certain templates, create a custom loader:

```liquid
{% comment %}
Custom template loader - only load what you need
{% endcomment %}

<div id="web-component-templates" style="display: none;" aria-hidden="true">
  {% include web-component-templates/product-card.html %}
  {% include web-component-templates/alert-card.html %}
</div>
```

### 3. JavaScript Instantiation Patterns

#### Basic Instantiation

```javascript
import { createProductCard } from './product-card.js';

const card = createProductCard({
  title: 'Genesis AI Platform',
  description: 'Advanced AI capabilities',
  url: '/products/genesis-ai',
  image: '/images/genesis.jpg',
  demoUrl: 'https://demo.genesis.ai'  // Optional
});

document.querySelector('.container').appendChild(card);
```

#### Multiple Instances

```javascript
import { createProductCards } from './product-card.js';

const products = [
  { title: 'Product 1', description: '...', url: '/p1' },
  { title: 'Product 2', description: '...', url: '/p2' },
  { title: 'Product 3', description: '...', url: '/p3' }
];

const cards = createProductCards(products);
cards.forEach(card => {
  document.querySelector('.products-grid').appendChild(card);
});
```

#### Render to Container

```javascript
import { renderProductCards } from './product-card.js';

const products = [/* ... */];

// Append to existing content
renderProductCards('.products-grid', products, false);

// Replace existing content
renderProductCards('.products-grid', products, true);
```

#### Alert Convenience Methods

```javascript
import { showInfo, showSuccess, showWarning, showError } from './alert-card.js';

// Show info alert
showInfo('Operation in progress...', 'Info');

// Show success with auto-dismiss
showSuccess('Saved successfully!', 'Success', { 
  dismissible: true, 
  duration: 5000  // Auto-dismiss after 5 seconds
});

// Show error
showError('An error occurred.', 'Error', { 
  dismissible: true 
});
```

## Available Templates

### Product Card

**Files**:
- HTML: `_includes/web-component-templates/product-card.html`
- SCSS: `_sass/components/_product-card.scss`
- JS: `assets/js/components/product-card.js`

**Data Structure**:
```javascript
{
  title: string,          // Required - Product name
  description: string,    // Required - Product description
  url: string,            // Required - Learn more URL
  image: string,          // Optional - Product image URL
  demoUrl: string         // Optional - Demo URL
}
```

**API**:
- `createProductCard(data)` - Create single instance
- `createProductCards(dataArray)` - Create multiple instances
- `renderProductCards(container, dataArray, replace)` - Render to container

### Testimonial Card

**Files**:
- HTML: `_includes/web-component-templates/testimonial-card.html`
- SCSS: `_sass/components/_testimonial-card.scss`
- JS: `assets/js/components/testimonial-card.js`

**Data Structure**:
```javascript
{
  text: string,       // Required - Testimonial quote
  name: string,       // Required - Author name
  company: string,    // Optional - Author company
  avatar: string      // Optional - Author avatar URL
}
```

**API**:
- `createTestimonialCard(data)` - Create single instance
- `createTestimonialCards(dataArray)` - Create multiple instances
- `renderTestimonialCards(container, dataArray, replace)` - Render to container

### Alert Card

**Files**:
- HTML: `_includes/web-component-templates/alert-card.html`
- SCSS: `_sass/components/_alert-card.scss`
- JS: `assets/js/components/alert-card.js`

**Data Structure**:
```javascript
{
  type: 'info' | 'success' | 'warning' | 'error',  // Optional - Default: 'info'
  title: string,                                    // Optional - Alert heading
  message: string,                                  // Required - Alert text
  dismissible: boolean                              // Optional - Default: false
}
```

**API**:
- `createAlertCard(data)` - Create single instance
- `showAlert(data, container, duration)` - Show and auto-dismiss
- `showInfo(message, title, options)` - Convenience method
- `showSuccess(message, title, options)` - Convenience method
- `showWarning(message, title, options)` - Convenience method
- `showError(message, title, options)` - Convenience method

## Creating New Templates

### Step 1: Create HTML Template

Create file in `_includes/web-component-templates/component-name.html`:

```liquid
{% comment %}
Component Name Template
Brief description of the component

Namespace:
  HTML:  component-name.html
  SCSS:  _sass/components/_component-name.scss
  JS:    assets/js/components/component-name.js

Data attributes for JavaScript population:
  - data-field1: Description
  - data-field2: Description
{% endcomment %}

<template id="template-component-name">
  <div class="wc-component-name">
    <h3 class="wc-component-name__title"></h3>
    <p class="wc-component-name__description"></p>
  </div>
</template>
```

**Naming conventions**:
- Template ID: `template-{component-name}`
- Root class: `wc-{component-name}` (wc = web component)
- Child classes: `wc-{component-name}__{element}` (BEM pattern)
- Modifiers: `wc-{component-name}--{modifier}`

### Step 2: Create SCSS Styling

Create file in `_sass/components/_component-name.scss`:

```scss
/**
 * Web Component: Component Name - SCSS
 * 
 * Namespace:
 *   HTML:  _includes/web-component-templates/component-name.html
 *   SCSS:  _sass/components/_component-name.scss
 *   JS:    assets/js/components/component-name.js
 * 
 * Brief description of styling approach.
 * Uses Genesis Ontological mixins for semantic styling.
 */

.wc-component-name {
  @include genesis-entity('primary');
  @include genesis-state('stable');
  
  .wc-component-name__title {
    @include genesis-cognition('axiom');
  }
  
  .wc-component-name__description {
    @include genesis-cognition('discourse');
  }
}
```

**Rules**:
- MUST use Genesis Ontological mixins
- NO raw CSS properties (margin, padding, color, etc.)
- Follow semantic naming (WHAT, not HOW)
- Include namespace comment header

### Step 3: Create JavaScript Factory

Create file in `assets/js/components/component-name.js`:

```javascript
/**
 * Web Component: Component Name
 * 
 * Namespace:
 *   HTML:  _includes/web-component-templates/component-name.html
 *   SCSS:  _sass/components/_component-name.scss
 *   JS:    assets/js/components/component-name.js
 * 
 * Usage:
 *   import { createComponentName } from './web-component-component-name.js';
 *   
 *   const instance = createComponentName({
 *     title: 'Title',
 *     description: 'Description'
 *   });
 *   
 *   document.querySelector('.container').appendChild(instance);
 */

import { instantiateTemplate } from './template-utils.js';

/**
 * Create a component name instance
 * @param {Object} data - Component data
 * @param {string} data.title - Component title
 * @param {string} data.description - Component description
 * @returns {Element} - Component element
 */
export function createComponentName(data) {
  const template = document.getElementById('template-component-name');
  const component = instantiateTemplate(template);
  
  if (!component) {
    console.error('Component name template not found');
    return null;
  }
  
  // Populate title
  const title = component.querySelector('.wc-component-name__title');
  if (title && data.title) {
    title.textContent = data.title;
  }
  
  // Populate description
  const description = component.querySelector('.wc-component-name__description');
  if (description && data.description) {
    description.textContent = data.description;
  }
  
  return component;
}

export default {
  createComponentName,
};
```

### Step 4: Add to Index Files

**Add to SCSS index** (`_sass/components/_index.scss`):

```scss
@import "product-card";
@import "testimonial-card";
@import "alert-card";
@import "component-name";  // Add your new component
```

**Add to template loader** (`_includes/web-component-templates/template-loader.html`):

```liquid
<div id="web-component-templates" style="display: none;" aria-hidden="true">
  {% include web-component-templates/product-card.html %}
  {% include web-component-templates/testimonial-card.html %}
  {% include web-component-templates/alert-card.html %}
  {% include web-component-templates/component-name.html %}
</div>
```

### Step 5: Update Documentation

Update the README files:
- `_includes/web-component-templates/README.md`
- `docs/WEB-COMPONENT-TEMPLATES.md`

## Template Utilities API

The `template-utils.js` module provides low-level utilities for template manipulation:

### cloneTemplate(template)

Clone a template element.

```javascript
import { cloneTemplate } from './template-utils.js';

const template = document.getElementById('template-product-card');
const fragment = cloneTemplate(template);
```

### populateTemplate(fragment, data)

Populate a cloned template with data.

```javascript
import { populateTemplate } from './template-utils.js';

const element = populateTemplate(fragment, {
  title: 'My Title',
  description: 'My Description'
});
```

### instantiateTemplate(template, data)

Clone and populate in one step.

```javascript
import { instantiateTemplate } from './template-utils.js';

const instance = instantiateTemplate('template-product-card', {
  title: 'My Product'
});
```

### instantiateMultiple(template, dataArray)

Create multiple instances from array of data.

```javascript
import { instantiateMultiple } from './template-utils.js';

const instances = instantiateMultiple('template-product-card', [
  { title: 'Product 1' },
  { title: 'Product 2' },
  { title: 'Product 3' }
]);
```

### appendTemplate(container, template, data)

Instantiate and append to container in one step.

```javascript
import { appendTemplate } from './template-utils.js';

appendTemplate('.products-grid', 'template-product-card', {
  title: 'My Product'
});
```

### replaceWithTemplates(container, template, dataArray)

Replace container contents with instantiated templates.

```javascript
import { replaceWithTemplates } from './template-utils.js';

replaceWithTemplates('.products-grid', 'template-product-card', [
  { title: 'Product 1' },
  { title: 'Product 2' }
]);
```

## Best Practices

### 1. Semantic Class Naming

Use BEM pattern with meaningful names:

```html
<!-- ✅ GOOD: Semantic, describes WHAT -->
<div class="wc-product-card">
  <h3 class="wc-product-card__title"></h3>
  <div class="wc-product-card__actions">
    <button class="wc-product-card__button wc-product-card__button--primary"></button>
  </div>
</div>

<!-- ❌ BAD: Generic, describes HOW -->
<div class="card blue-box">
  <h3 class="big-text"></h3>
  <div class="flex-row">
    <button class="btn btn-blue"></button>
  </div>
</div>
```

### 2. Ontological Styling Only

Never use raw CSS properties in web component SCSS:

```scss
// ✅ GOOD: Ontological mixins
.wc-product-card {
  @include genesis-entity('primary');
  
  .wc-product-card__title {
    @include genesis-cognition('axiom');
  }
}

// ❌ BAD: Raw CSS properties
.wc-product-card {
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  
  .wc-product-card__title {
    font-size: 2rem;
    font-weight: 700;
  }
}
```

### 3. ES6 Module Exports

Use named exports for clarity:

```javascript
// ✅ GOOD: Named exports
export function createProductCard(data) { /* ... */ }
export function createProductCards(dataArray) { /* ... */ }
export default { createProductCard, createProductCards };

// ❌ BAD: Only default export
export default function(data) { /* ... */ }
```

### 4. Error Handling

Always validate template existence:

```javascript
export function createProductCard(data) {
  const template = document.getElementById('template-product-card');
  
  if (!template) {
    console.error('Product card template not found');
    return null;
  }
  
  const component = instantiateTemplate(template);
  
  if (!component) {
    console.error('Failed to instantiate template');
    return null;
  }
  
  // ... populate component
  
  return component;
}
```

### 5. Accessibility

Ensure templates are accessible:

```html
<template id="template-product-card">
  <article class="wc-product-card" role="article">
    <img class="wc-product-card__image" alt="" loading="lazy">
    <h3 class="wc-product-card__title"></h3>
    <p class="wc-product-card__description"></p>
    <a class="wc-product-card__button" role="button">Learn More</a>
  </article>
</template>
```

- Use semantic HTML elements (`<article>`, `<figure>`, etc.)
- Include ARIA roles where appropriate
- Ensure images have alt attributes (populate via JS)
- Use `loading="lazy"` for images

## Testing

### Manual Testing Checklist

When creating a new template:

- [ ] Template renders correctly when instantiated
- [ ] All data fields populate properly
- [ ] SCSS styling applies correctly
- [ ] Responsive behavior works (mobile → desktop)
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Multiple instances work correctly
- [ ] No console errors
- [ ] Namespace matches across all files

### Demo Page

Use the demo page for interactive testing:

```
web-component-templates-demo.html
```

This page includes:
- Live demonstrations of all templates
- Interactive buttons to create instances
- Code examples
- Technical architecture overview

## Troubleshooting

### Template not found

**Error**: `Template not found` in console

**Solution**: Ensure template loader is included:

```liquid
{% include web-component-templates/template-loader.html %}
```

### Styles not applying

**Error**: Component has no styling

**Solution**: 
1. Check SCSS is imported in `_sass/components/_index.scss`
2. Verify `_common.scss` imports web-components index
3. Run `npm run test:scss` to check compilation

### JavaScript module errors

**Error**: `Cannot find module` or import errors

**Solution**:
1. Use correct relative paths in imports
2. Ensure file names match exactly (case-sensitive)
3. Use `type="module"` in script tags:

```html
<script type="module">
  import { createProductCard } from '/assets/js/components/product-card.js';
</script>
```

### Data not populating

**Error**: Template instantiates but fields are empty

**Solution**:
1. Check class names match between HTML and JavaScript
2. Verify data object has correct property names
3. Check querySelector selectors are correct
4. Use browser DevTools to inspect element

## Resources

- **Template Loader**: `_includes/web-component-templates/template-loader.html`
- **Template Utils**: `assets/js/common/template-utils.js`
- **Demo Page**: `web-component-templates-demo.html`
- **Genesis Ontology**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **SCSS Instructions**: `.github/instructions/scss.instructions.md`
- **HTML Instructions**: `.github/instructions/html.instructions.md`
- **JS Instructions**: `.github/instructions/js.instructions.md`

## Version History

### v1.0.0 (2026-02-03)

Initial release of Web Component Templates system:
- Template infrastructure
- Three starter templates (product-card, testimonial-card, alert-card)
- JavaScript utilities
- SCSS integration
- Documentation
- Demo page

---

**Maintained by**: ASI Saga  
**License**: MIT  
**Last Updated**: 2026-02-03
