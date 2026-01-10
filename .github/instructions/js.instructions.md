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

## Modern Interactive Components
- This theme uses custom ES6 JavaScript components instead of Bootstrap.
- Core components are in `assets/js/common/`:
  - `dropdown.js` - Dropdown menus with keyboard navigation
  - `collapse.js` - Collapsible content and accordions
  - `modal.js` - Modal dialogs with focus trapping
- These components are initialized automatically on page load via `bootstrap.js`.

## Loading & Initialization
- Use `defer` or `type="module"` for script tags.
- Initialize interactive components in `DOMContentLoaded` or via module init functions.

## DOM Hooks & Eventing
- Use `data-*` attributes as DOM hooks — do not rely on classes for behavior.
- Supported attributes:
  - `data-toggle="dropdown"` - For dropdown toggles
  - `data-toggle="collapse"` - For collapse/accordion toggles
  - `data-toggle-target="#id"` - Specifies collapse target
  - `data-toggle="modal"` - For modal triggers
  - `data-dismiss="modal"` - For modal close buttons
- Use event delegation where possible for dynamic content.

## Accessibility & Progressive Enhancement
- Ensure all interactive widgets support keyboard navigation.
- All components include proper ARIA attributes.
- Add ARIA attributes only when they add semantic value; prefer native controls.
- Focus management is handled automatically in modal and dropdown components.

## Code Quality
- Use kebab-case filenames and clear module names.
- Add JSDoc for public functions.
- Keep shared logic in `common.js`; subdomains should only contain page-specific code.

## Best Practices
- Avoid inline JS in templates.
- Use feature detection and graceful fallback for older browsers.
- Avoid direct DOM querying in many places; prefer well-scoped component initialization.
- Export component classes for reuse in subdomain code when needed.
