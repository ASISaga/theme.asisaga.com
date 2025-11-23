---
applyTo: "**/*.{html,liquid},_includes/**,_layouts/**"
description: "HTML & Liquid templating and accessibility-first HTML guidance for the ASI Saga theme. Applies to all HTML, Liquid and Markdown content files and includes/layouts."
---

Theme HTML & Liquid Instructions
This file contains guidance for Jekyll templates, Liquid includes, semantic HTML, and accessibility rules that apply to the theme's HTML and Liquid files.

## Theme Structure
- The theme is the single source for layouts, includes, and shared site head content.
- Place reusable UI components in `_includes` and parameterize them with include parameters.
- Keep pages focused and small; use includes for repeated patterns.

## Jekyll & Liquid
- Use semantic HTML5 elements (header, main, nav, footer, article, section) appropriately.
- Use `{% include component.html param="value" %}` for parameterized includes.
- Avoid inline JS or CSS in templates; keep behavior in `assets/js` and styles in `/_sass`.
- Keep Liquid logic lightweight in templates; heavy processing belongs in build scripts or data files.

## Accessibility-First HTML (MANDATORY)
### Semantic HTML Requirements
- NEVER nest landmark elements (header, main, nav, footer, aside, section, article).
- Each page MUST have exactly ONE `main` landmark with `id="skip-target"`.
- Each page MUST have exactly ONE banner (`header`) and ONE contentinfo (`footer`).
- Use `aria-label` to disambiguate duplicate landmarks when necessary.
- All images MUST have meaningful `alt` attributes (use `alt=""` only for purely decorative images).
- All form inputs MUST have associated `<label>` elements.
- Add a skip-to-main link as the first focusable element: `<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>`.

## Interactive Elements & ARIA
- Use ARIA roles only where native semantics are insufficient.
- Use data/ARIA attributes as behavior hooks, not class names.
- Ensure interactive elements are keyboard focusable and have visible focus styles.

## Best Practices
- Break complex UI into small includes with clear parameters.
- Document include parameters in the include file header comment.
- Keep HTML components resilient to missing data (provide sensible defaults).
