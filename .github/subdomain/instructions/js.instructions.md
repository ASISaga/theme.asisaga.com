---
applyTo: "assets/js/**/*.js"
description: "JavaScript standards for ASI Saga subdomain repositories — mandatory script.js with progressive enhancement"
---

# Subdomain JavaScript Instructions

## Mandatory File: assets/js/script.js

**REQUIRED**: Every subdomain must have `assets/js/script.js`. This file is called from the HTML `<head>` in the theme layouts and gets merged into the subdomain at build time by Jekyll.

### File Structure

```javascript
// assets/js/script.js
// This file is MANDATORY in all subdomains

// First, import common utilities from theme (if needed)
// import { animateFadeIn } from '/assets/js/common/motion-utils.js';

// Then add subdomain-specific enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Subdomain-specific progressive enhancements
});
```

**IMPORTANT**:
- `assets/js/script.js` must exist even if minimal
- Theme's `assets/js/common.js` is loaded first by layouts
- Your script.js can use utilities from theme's common.js
- Script is loaded via theme layouts, automatically included

## Philosophy: Progressive Enhancement

Core content must be accessible without JavaScript running. Use JS only to enhance the user experience. The mandatory `assets/js/script.js` file should gracefully enhance, not gate content.

## Core Rules

1. **Content works without JS** — Never gate content behind JavaScript
2. **`data-*` attributes for hooks** — Not CSS classes
3. **Keyboard accessible** — All interactions work with keyboard
4. **Screen reader friendly** — ARIA attributes where needed
5. **ES6 modules** — Use `import`/`export` syntax when needed
6. **Theme utilities available** — Can use utilities from theme's common.js

## DOM Hooks

Use `data-*` attributes to connect behavior:

```html
<button data-action="toggle" data-target="#details">Show Details</button>
<div id="details" data-state="hidden">Details content</div>
```

```javascript
document.querySelectorAll('[data-action="toggle"]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.target);
    const isHidden = target.dataset.state === 'hidden';
    target.dataset.state = isHidden ? 'visible' : 'hidden';
    button.setAttribute('aria-expanded', isHidden);
  });
});
```

## Semantic Interaction Mapping

Map interactions to `genesis-synapse` variants via `data-synapse` attributes:

```html
<a href="/about" data-synapse="navigate">About Us</a>
<button data-synapse="execute">Submit</button>
<button data-synapse="destructive">Delete</button>
```

## Accessibility

```javascript
// Ensure keyboard support
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    element.click();
  }
});

// Manage focus for dynamic content
newContent.setAttribute('tabindex', '-1');
newContent.focus();
```

## Code Quality

- Use kebab-case for filenames (`form-handler.js`)
- Add JSDoc for public functions
- Use feature detection before browser APIs
- Handle errors gracefully

## Quality Checklist

Before committing JavaScript:
- [ ] `assets/js/script.js` exists (mandatory)
- [ ] Content accessible without JS running
- [ ] DOM hooks use `data-*` attributes
- [ ] Keyboard accessible
- [ ] No inline scripts in HTML
- [ ] Error handling in place
- [ ] Progressive enhancement pattern followed
