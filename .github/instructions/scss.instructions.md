---
applyTo: "**/*.{scss,sass,css},_sass/**,assets/css/**"
description: "SCSS guidance for the ASI Saga theme. Applies to theme `_sass` partials and subdomain SCSS files."
---

SCSS & Styling Instructions
This file contains rules for SCSS structure, modern CSS usage, responsive design, and color/contrast requirements.

## Structure & Entry Points
- All theme SCSS lives in `/_sass`.
- The main entry point is `assets/css/style.scss` (in the theme). It must import the theme's `_common.scss` first, then the subdomain `_main.scss`.
- Add component partials to `/_sass/components/` and page partials to `/_sass/pages/`.

## SCSS Rules
- Make additions in SCSS partials only; never edit compiled CSS directly.
- Use CSS custom properties (CSS variables) for runtime theming instead of SCSS variables where appropriate.
- Each HTML component must have exactly one SCSS class defined in its matching partial.
- Limit nesting to 3-4 levels and use the parent selector `&` for modifiers.

## Modern CSS Approach
- This theme uses modern CSS Grid and Flexbox instead of Bootstrap.
- Use CSS custom properties defined in `_sass/base/_css-variables.scss` for theming.
- Use the grid system from `_sass/base/_grid.scss` for layouts.
- Use utility classes from `_sass/base/_utilities-modern.scss` for common patterns.
- Interactive components (dropdowns, modals, collapse) use custom ES6 JavaScript.

## Layout & CSS Requirements (MANDATORY)
- All layout containers MUST use CSS containment: `contain: layout style; isolation: isolate;`.
- NEVER use `@extend` in Jekyll SCSS (causes build errors) — prefer explicit properties or mixins.
- All grid containers MUST be responsive: `grid-template-columns: repeat(auto-fit, minmax(300px,1fr))`.
- Never allow horizontal overflow; use `overflow-x: hidden` on body only when required and tested.
- All interactive elements MUST have visible focus indicators.

## Color & Contrast Rules (MANDATORY)
- Text colors MUST be solid and WCAG AA compliant.
- Do not use `rgba()` with opacity < 0.9 for text.
- Footer/header text on dark backgrounds MUST be `#ffffff`.
- Test color variables for WCAG AA compliance before committing.

## Responsive & Touch
- Mobile-first approach required.
- Test viewports at 375px, 768px, 1440px at minimum.
- Touch targets MUST be at least 44px.
- Minimum font size 16px.

## Best Practices
- Use modern CSS Grid and Flexbox for layouts.
- Prefer CSS custom properties for runtime theming.
- Use `@include` mixins rather than deep custom rules.
- Add descriptive comments in SCSS partials.
