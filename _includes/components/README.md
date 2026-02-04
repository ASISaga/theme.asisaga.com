# Web Component Templates

This directory contains HTML/Liquid templates for Web Components that are NOT rendered on page load but can be instantiated later via JavaScript.

## Purpose

Templates in this directory serve as reusable HTML structures that:
- Are wrapped in `<template>` tags (HTML5 standard)
- Do not render when the page loads
- Can be cloned and instantiated multiple times via JavaScript
- Follow the matching namespace pattern: HTML → SCSS → JavaScript

## Namespace Pattern

Each web component follows a consistent naming convention across all three technologies:

```
HTML Template:  _includes/components/component-name.html
SCSS Styling:   _sass/components/_component-name.scss
JavaScript:     assets/js/components/component-name.js
```

## Usage

### In Jekyll/Liquid Pages

To include templates on a page (but not render them):

```liquid
{% include components/template-loader.html %}
```

This loads all templates into hidden `<template>` tags.

### In JavaScript

To instantiate a template:

```javascript
import { instantiateTemplate } from './template-utils.js';

// Get the template content
const template = document.getElementById('template-component-name');
const instance = instantiateTemplate(template, {
  title: 'My Title',
  description: 'My Description'
});

// Append to DOM
document.querySelector('.container').appendChild(instance);
```

## Available Templates

- `product-card.html` - Product card with image, title, description, and actions
- `testimonial-card.html` - Testimonial with quote, author name, and company
- `alert-card.html` - Alert/notification card with icon, message, and dismiss button

## Creating New Templates

1. Create HTML template file in this directory
2. Use `<template id="template-name">` wrapper
3. Use semantic class names with BEM pattern
4. Create matching SCSS in `_sass/components/`
5. Create matching JavaScript helper in `assets/js/components/`
6. Add to `template-loader.html` include
7. Document in this README
