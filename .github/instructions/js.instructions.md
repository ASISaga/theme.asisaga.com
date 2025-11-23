---
applyTo: "**/*.js,assets/js/**"
description: "JavaScript guidance for the ASI Saga theme. Applies to shared and subdomain JS files under `assets/js`."
---

JavaScript & Interaction Instructions
This file contains guidance for shared JavaScript in the theme and integration rules for subdomain scripts.

## Entry Points & Structure
- All shared JS should live in the theme's `assets/js/common.js`.
- Each subdomain must have `assets/js/script.js` which imports `common.js` first, then subdomain-specific modules.
- Use ES6 modules and `import`/`export` syntax.

## Loading & Initialization
- Use `defer` or `type="module"` for script tags.
- Initialize interactive components in `DOMContentLoaded` or via module init functions.

## DOM Hooks & Eventing
- Use `data-*` attributes or ARIA attributes as DOM hooks — do not rely on classes for behavior.
- Use event delegation where possible for dynamic content.

## Accessibility & Progressive Enhancement
- Ensure all interactive widgets support keyboard and screen reader usage.
- Add ARIA attributes only when they add semantic value; prefer native controls.

## Code Quality
- Use kebab-case filenames and clear module names.
- Add JSDoc for public functions.
- Keep shared logic in `common.js`; subdomains should only contain page-specific code.

## Best Practices
- Avoid inline JS in templates.
- Use feature detection and graceful fallback for older browsers.
- Avoid direct DOM querying in many places; prefer well-scoped component initialization.
