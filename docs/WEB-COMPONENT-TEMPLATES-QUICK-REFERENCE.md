# Web Component Templates - Quick Reference

## Quick Start

### 1. Include templates in page

```liquid
{% include web-component-templates/template-loader.html %}
```

### 2. Instantiate in JavaScript

```html
<script type="module">
  import { createProductCard } from '/assets/js/components/product-card.js';
  
  const card = createProductCard({
    title: 'My Product',
    description: 'Description',
    url: '/products/my-product'
  });
  
  document.querySelector('.container').appendChild(card);
</script>
```

## Namespace Pattern

```
component-name:
  HTML:  _includes/web-component-templates/component-name.html
  SCSS:  _sass/components/_component-name.scss
  JS:    assets/js/components/component-name.js
```

## Available Templates

### Product Card

```javascript
import { createProductCard } from './product-card.js';

createProductCard({
  title: 'Product Name',
  description: 'Product description',
  url: '/products/product',
  image: '/images/product.jpg',  // Optional
  demoUrl: 'https://demo.url'    // Optional
});
```

### Testimonial Card

```javascript
import { createTestimonialCard } from './testimonial-card.js';

createTestimonialCard({
  text: 'Testimonial quote',
  name: 'Author Name',
  company: 'Company Name',  // Optional
  avatar: '/avatar.jpg'     // Optional
});
```

### Alert Card

```javascript
import { showSuccess } from './alert-card.js';

showSuccess(
  'Operation completed!',
  'Success',
  { dismissible: true, duration: 5000 }
);
```

## Common Patterns

### Create Multiple Instances

```javascript
import { createProductCards } from './product-card.js';

const products = [
  { title: 'Product 1', description: '...', url: '/p1' },
  { title: 'Product 2', description: '...', url: '/p2' }
];

const cards = createProductCards(products);
cards.forEach(card => container.appendChild(card));
```

### Render to Container

```javascript
import { renderProductCards } from './product-card.js';

renderProductCards('.products-grid', products, true);
```

### Alert Types

```javascript
import { showInfo, showSuccess, showWarning, showError } from './alert-card.js';

showInfo('Info message', 'Title');
showSuccess('Success message', 'Title', { dismissible: true });
showWarning('Warning message', 'Title');
showError('Error message', 'Title', { duration: 5000 });
```

## Creating New Templates

### 1. HTML Template

`_includes/web-component-templates/my-component.html`:

```html
<template id="template-my-component">
  <div class="wc-my-component">
    <h3 class="wc-my-component__title"></h3>
  </div>
</template>
```

### 2. SCSS Styling

`_sass/components/_my-component.scss`:

```scss
.wc-my-component {
  @include genesis-entity('primary');
  
  .wc-my-component__title {
    @include genesis-cognition('axiom');
  }
}
```

### 3. JavaScript Factory

`assets/js/components/my-component.js`:

```javascript
import { instantiateTemplate } from './template-utils.js';

export function createMyComponent(data) {
  const template = document.getElementById('template-my-component');
  const component = instantiateTemplate(template);
  
  if (!component) return null;
  
  const title = component.querySelector('.wc-my-component__title');
  if (title && data.title) {
    title.textContent = data.title;
  }
  
  return component;
}
```

### 4. Add to Index

In `_sass/components/_index.scss`:

```scss
@import "my-component";
```

In `_includes/web-component-templates/template-loader.html`:

```liquid
{% include web-component-templates/my-component.html %}
```

## Demo Page

Test your templates interactively:

```
web-component-templates-demo.html
```

## Resources

- **Full Documentation**: `docs/WEB-COMPONENT-TEMPLATES.md`
- **Template Directory**: `_includes/web-component-templates/`
- **SCSS Directory**: `_sass/components/web-components/`
- **JavaScript Utilities**: `assets/js/common/template-utils.js`

---

For complete documentation, see `docs/WEB-COMPONENT-TEMPLATES.md`
