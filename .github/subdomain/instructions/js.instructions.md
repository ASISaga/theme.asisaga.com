---
applyTo: "**/*.js,assets/js/**"
description: "JavaScript standards for ASI Saga subdomain repositories — progressive enhancement"
---

# Subdomain JavaScript Instructions

## Philosophy: Progressive Enhancement

JavaScript is optional in subdomain repositories. Core content must be accessible without it. Use JS only to enhance the user experience.

## File Setup

If JavaScript is needed, create `assets/js/script.js`:

```javascript
// Subdomain-specific progressive enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Enhancements loaded after DOM is ready
});
```

## Core Rules

1. **Content works without JS** — Never gate content behind JavaScript
2. **`data-*` attributes for hooks** — Not CSS classes
3. **Keyboard accessible** — All interactions work with keyboard
4. **Screen reader friendly** — ARIA attributes where needed
5. **ES6 modules** — Use `import`/`export` syntax

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
- [ ] Content accessible without JS
- [ ] DOM hooks use `data-*` attributes
- [ ] Keyboard accessible
- [ ] No inline scripts in HTML
- [ ] Error handling in place
