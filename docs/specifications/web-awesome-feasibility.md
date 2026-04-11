# Web Awesome Integration Feasibility Assessment

*Last Updated: 2026-04-01 | Status: Active Proposal*

## 1. Executive Summary

**Web Awesome** (`@awesome.me/webawesome@3.4.0`) is a library of 59 framework-agnostic, web-standards-based UI components built by the team behind Font Awesome. It is the spiritual successor to Shoelace, rebuilt on [Lit](https://lit.dev/) with CSS custom properties for theming and full WCAG compliance.

This document assesses the feasibility, value addition, and integration strategy for adopting Web Awesome alongside the existing Genesis Ontological Design System in the `theme.asisaga.com` repository.

**Recommendation: Adopt selectively** — integrate Web Awesome for *leaf-level interactive primitives* (dialogs, tooltips, dropdowns, form controls, color pickers) while retaining Genesis web components for *structural ontological semantics* (environment, entity, cognition, synapse, state, atmosphere).

---

## 2. What Is Web Awesome?

| Attribute | Detail |
|-----------|--------|
| **Package** | `@awesome.me/webawesome` |
| **Version** | 3.4.0 (stable, 12 releases since beta) |
| **License** | MIT |
| **Source** | [github.com/shoelace-style/webawesome](https://github.com/shoelace-style/webawesome) |
| **Built with** | [Lit 3.x](https://lit.dev/) + esbuild |
| **Component count** | 59 components |
| **Tag prefix** | `wa-*` (e.g., `<wa-dialog>`, `<wa-button>`) |
| **Theming** | CSS custom properties (`--wa-*`) + CSS cascade layers |
| **Framework support** | Vanilla JS, React, Vue, Angular, Svelte, Jekyll/static HTML |
| **Bundle type** | ES modules with tree-shaking; CDN + npm |
| **Maintainers** | Cory LaViska (Shoelace creator), Zach Leatherman, Konnor Rogers, Font Awesome team |

### 2.1 Component Inventory (59 components)

**Interactive Primitives (the primary value for Genesis):**
- `wa-dialog` — Modal dialog with focus trap, escape handling, and overlay
- `wa-drawer` — Side panel overlay
- `wa-dropdown` + `wa-dropdown-item` — Accessible dropdown menus
- `wa-tooltip` — Hover/focus tooltips via Floating UI
- `wa-popover` + `wa-popup` — Declarative floating UI positioning
- `wa-tab-group` + `wa-tab` + `wa-tab-panel` — Accessible tab interface
- `wa-details` — Accordion/disclosure widget
- `wa-split-panel` — Resizable split pane

**Form Controls:**
- `wa-input`, `wa-textarea`, `wa-select`, `wa-option` — Text and selection inputs
- `wa-checkbox`, `wa-radio`, `wa-radio-group` — Toggle controls
- `wa-switch` — Toggle switch
- `wa-slider` — Range slider
- `wa-number-input` — Numeric input with increment/decrement
- `wa-color-picker` — Full-featured color picker
- `wa-rating` — Star rating input

**Display Components:**
- `wa-card` — Generic content card
- `wa-badge` — Badge/counter overlay
- `wa-tag` — Removable tag/chip
- `wa-callout` — Alert/notification banner
- `wa-avatar` — User avatar with initials fallback
- `wa-skeleton` — Loading skeleton placeholder
- `wa-spinner` — Loading indicator
- `wa-progress-bar`, `wa-progress-ring` — Progress indicators
- `wa-divider` — Semantic horizontal/vertical divider

**Navigation:**
- `wa-breadcrumb` + `wa-breadcrumb-item` — Breadcrumb navigation
- `wa-carousel` + `wa-carousel-item` — Image/content carousel

**Utility Components:**
- `wa-animation` — Declarative CSS animation wrapper
- `wa-animated-image` — Play/pause for animated images
- `wa-copy-button` — One-click clipboard copy
- `wa-qr-code` — QR code generator
- `wa-markdown` — Inline Markdown renderer
- `wa-include` — HTML include/partial loader
- `wa-relative-time` — Human-readable relative timestamps
- `wa-format-bytes`, `wa-format-date`, `wa-format-number` — Formatting utilities
- `wa-resize-observer`, `wa-mutation-observer`, `wa-intersection-observer` — Observer wrappers
- `wa-scroller` — Scroll container with shadow indicators
- `wa-comparison` — Before/after image comparison
- `wa-zoomable-frame` — Pinch-to-zoom container
- `wa-tree` + `wa-tree-item` — Hierarchical tree view
- `wa-button` + `wa-button-group` — Styled buttons

### 2.2 Architecture

```
@awesome.me/webawesome
├── dist/components/     # Individual ES module per component (tree-shakeable)
├── dist/styles/         # CSS themes as standalone files
│   ├── themes/default.css   # Light/dark theme via --wa-* custom properties
│   ├── themes/awesome.css   # Branded "Awesome" theme
│   ├── native.css           # Resets for native HTML elements
│   └── layers.css           # @layer wa-native, wa-utilities, wa-theme, ...
├── dist/translations/   # i18n locale files
├── dist/react/          # React wrappers (@lit/react)
└── dist/utilities/      # Shared helper modules
```

**Key architectural traits:**
- Each component is an **autonomous ES module** — import only what you use
- Styling via **CSS cascade layers** with 7-tier precedence: `wa-native → wa-utilities → wa-color-palette → wa-color-variant → wa-theme → wa-theme-dimension → wa-theme-overrides`
- ~200 **CSS custom properties** (`--wa-*`) for theming — fonts, spacing, colors, borders, shadows, transitions
- Shadow DOM encapsulation with `::part()` CSS escape hatches for deep styling
- Built-in **light/dark mode** via `.wa-light`/`.wa-dark` classes
- **Floating UI** (`@floating-ui/dom`) powers tooltips, dropdowns, popovers
- **Lit 3.x** reactive base class with SSR support
- Runtime dependencies: `lit@^3.2.1`, `@floating-ui/dom@^1.6.13`, `@ctrl/tinycolor@4.1.0`, `@shoelace-style/animations@^1.2.0`, `@shoelace-style/localize@^3.2.1`, `nanoid@^5.1.5`, `qr-creator@^1.0.0`

---

## 3. Current Genesis Architecture (Comparison Baseline)

### 3.1 Genesis Web Components (18)

**Structural/Ontological (6):** `genesis-environment`, `genesis-entity`, `genesis-cognition`, `genesis-synapse`, `genesis-state`, `genesis-atmosphere`

**Specialized (11):** `genesis-card`, `genesis-navigation`, `genesis-form`, `genesis-media`, `genesis-header`, `genesis-footer`, `genesis-navbar`, `genesis-search`, `genesis-accordion`, `genesis-dashboard`, `genesis-chat`

**Base class (1):** `genesis-element` (Motion integration, scroll observers, reduced motion)

### 3.2 Genesis UI Patterns (current state)

| Pattern | Genesis Status | Web Awesome Equivalent |
|---------|---------------|----------------------|
| **Modal/Dialog** | `content-modal.html` + JS class | `wa-dialog` ✅ |
| **Dropdown** | Navbar JS with `data-dropdown-toggle` | `wa-dropdown` ✅ |
| **Tabs** | `genesis-navigation type="tabs"` + JS | `wa-tab-group` ✅ |
| **Accordion** | `genesis-accordion` component | `wa-details` ✅ |
| **Tooltip** | ❌ Not implemented | `wa-tooltip` ✅ |
| **Popover** | ❌ Not implemented | `wa-popover` / `wa-popup` ✅ |
| **Carousel** | ❌ Not implemented | `wa-carousel` ✅ |
| **Color picker** | ❌ Not implemented | `wa-color-picker` ✅ |
| **Form inputs** | `genesis-form` (wrapper only) | `wa-input` / `wa-select` / etc. ✅ |
| **Progress** | ❌ Not implemented | `wa-progress-bar` / `wa-progress-ring` ✅ |
| **Skeleton loading** | ❌ Not implemented | `wa-skeleton` ✅ |
| **QR Code** | ❌ Not implemented | `wa-qr-code` ✅ |
| **Split panel** | ❌ Not implemented | `wa-split-panel` ✅ |
| **Tree view** | ❌ Not implemented | `wa-tree` ✅ |
| **Breadcrumb** | `genesis-navigation type="breadcrumb"` | `wa-breadcrumb` ✅ |
| **Copy button** | ❌ Not implemented | `wa-copy-button` ✅ |
| **Rating** | ❌ Not implemented | `wa-rating` ✅ |
| **Card** | `genesis-card` (ontology-aware) | `wa-card` (generic) |
| **Search** | `genesis-search` (live, filtered) | ❌ No equivalent |
| **Chat** | `genesis-chat` (messaging UI) | ❌ No equivalent |
| **Dashboard** | `genesis-dashboard` (widget grid) | ❌ No equivalent |

### 3.3 What Genesis Has That Web Awesome Does Not

- **Ontological semantic layer** — 6 SCSS engines that express *intent* (environment, entity, cognition, synapse, state, atmosphere) rather than visual primitives
- **OKLCH color system** — perceptually uniform colors with WCAG AA contrast guarantees
- **Design token pipeline** — DTCG format tokens → Style Dictionary v4 → SCSS variables
- **Motion library integration** — Web Animations API via Motion.dev with `prefers-reduced-motion` baked in
- **Jekyll-native layouts** — `_layouts/`, `_includes/`, Liquid templates deeply integrated
- **Domain-specific components** — `genesis-chat`, `genesis-search`, `genesis-dashboard` with specialized behavior

---

## 4. Value Addition Analysis

### 4.1 High-Value Components (Immediate Wins)

These components fill **real gaps** in the Genesis theme and would require significant effort to build from scratch:

| Component | Value | Effort to Build Manually |
|-----------|-------|-------------------------|
| `wa-dialog` | Focus trap, escape key, overlay, animation, stacking context — all built in. Replaces the handwritten `Modal` class in `ui-components.js` with a standards-compliant, tested implementation. | High (~2–3 days) |
| `wa-tooltip` | No tooltip exists in Genesis. Floating UI positioning, collision detection, arrow alignment. Critical for progressive disclosure in dashboard widgets and form help text. | High (~2 days) |
| `wa-popover` | Declarative floating panels for context menus, filter dropdowns, rich previews. | Medium (~1.5 days) |
| `wa-color-picker` | Full-featured color picker with hue/saturation/lightness, hex/rgb/hsl input. Useful for design token playground or theme customizer pages. | Very High (~5+ days) |
| `wa-skeleton` | Loading state placeholders. Currently Genesis has `genesis-state('evolving')` for loading states but no skeleton animation pattern. | Medium (~1 day) |
| `wa-split-panel` | Resizable panels for docs layouts, code editors, comparison views. | High (~2 days) |
| `wa-carousel` | Image carousel with swipe, pagination, autoplay, lazy loading. No equivalent in Genesis. | High (~3 days) |
| `wa-copy-button` | One-click code copy for `genesis-cognition('protocol')` code blocks. | Low (~0.5 day) |
| `wa-tree` | Hierarchical navigation for docs, settings, file browsers. | High (~2 days) |
| `wa-qr-code` | QR code generation for sharing URLs — useful for mobile companion features. | Medium (~1 day) |
| `wa-relative-time` | Human-readable "3 hours ago" timestamps that auto-update — useful for `genesis-chat` and timeline. | Low (~0.5 day) |

### 4.2 Form Control Enhancement

The current `genesis-form` is a **wrapper component** that adds layout and validation to native HTML inputs. Web Awesome form controls would provide:

- Consistent, styleable form primitives (`wa-input`, `wa-select`, `wa-checkbox`, `wa-switch`, `wa-slider`, `wa-rating`)
- Built-in validation states with accessible error messaging
- Custom trigger/format for `wa-select` (icons, avatars, multi-select)
- Range `wa-slider` with dual handles, tick marks
- `wa-number-input` with increment/decrement buttons

These would **compose inside** `genesis-form` rather than replace it:

```html
<genesis-form layout="vertical" validate="true">
  <wa-input label="Name" required></wa-input>
  <wa-select label="Role" placeholder="Select one">
    <wa-option value="admin">Admin</wa-option>
    <wa-option value="user">User</wa-option>
  </wa-select>
  <wa-switch>Enable notifications</wa-switch>
  <wa-button type="submit" variant="brand">Save</wa-button>
</genesis-form>
```

### 4.3 Theming Alignment

Web Awesome uses **CSS custom properties** (`--wa-*`) for all visual tokens. This aligns well with the Genesis approach:

| Genesis Token Category | Web Awesome Equivalent |
|-----------------------|----------------------|
| `$text-primary` / `--text-primary` | `--wa-color-text-normal` |
| `$text-secondary` | `--wa-color-text-quiet` |
| `$color-neon-blue` / `--accent-neon` | `--wa-color-brand-fill-loud` |
| `$font-family-consciousness` | `--wa-font-family-body` |
| `$font-family-wisdom` | `--wa-font-family-longform` |
| `$space-sm` ... `$space-xl` | `--wa-space-s` ... `--wa-space-xl` |
| `$radius-bento` tokens | `--wa-border-radius-s` / `m` / `l` |
| `$shadow-consciousness` | `--wa-shadow-s` / `m` / `l` |

A **Genesis → Web Awesome theme bridge** would map design tokens at build time, ensuring WA components visually match the ontological atmosphere:

```css
/* Genesis theme bridge for Web Awesome */
:root {
  --wa-font-family-body: var(--font-consciousness);
  --wa-font-family-longform: var(--font-wisdom);
  --wa-color-brand-fill-loud: var(--accent-neon);
  --wa-color-text-normal: var(--text-primary);
  --wa-color-text-quiet: var(--text-secondary);
  --wa-color-surface-default: var(--surface-primary);
  --wa-border-radius-m: var(--radius-bento);
  --wa-color-focus: var(--focus-ring);
}
```

---

## 5. Feasibility Assessment

### 5.1 Technical Compatibility

| Concern | Assessment | Risk |
|---------|-----------|------|
| **Jekyll static site** | WA components work as plain HTML custom elements — no build step needed for Jekyll. Load via `<script>` or ESM import. | ✅ Low |
| **Shadow DOM vs Genesis SCSS** | WA uses Shadow DOM (styles encapsulated). Genesis SCSS cannot penetrate Shadow DOM directly. Customization via `--wa-*` custom properties and `::part()` selectors. | ⚠️ Medium |
| **Tag name collision** | WA uses `wa-*` prefix; Genesis uses `genesis-*` prefix. **Zero collision risk.** | ✅ None |
| **Bundle size** | Tree-shakeable ESM. Individual component import (e.g., `import '@awesome.me/webawesome/dist/components/dialog/dialog.js'`) keeps size minimal. Full bundle ~240KB (CSS+JS gzipped ~60KB). | ⚠️ Medium |
| **Lit dependency** | WA depends on Lit 3.x (~16KB gzipped). Genesis components use vanilla `HTMLElement`. Lit adds a stable, well-maintained reactive layer. | ✅ Low |
| **Node.js / npm** | Already in `node_modules` path. `_config.yml` already includes `node_modules` in `sass.load_paths`. Adding WA is a single `npm install`. | ✅ Low |
| **Accessibility** | WA components are WCAG 2.1 AA compliant with ARIA attributes, keyboard navigation, focus management, screen reader support built in. Aligns with Genesis accessibility standards. | ✅ Positive |
| **Dark mode** | WA supports `.wa-dark` class. Genesis uses `genesis-atmosphere('void')` for dark sections. Bridge CSS can map `void` atmosphere to `.wa-dark` scope. | ✅ Low |
| **i18n** | WA includes localization via `@shoelace-style/localize` with 30+ languages. Genesis has no i18n — this is a value add. | ✅ Positive |

### 5.2 Integration Approach

**Recommended: Selective Import Pattern**

```html
<!-- In _includes/head.html — load WA base theme -->
<link rel="stylesheet" href="/assets/css/wa-genesis-bridge.css">

<!-- Cherry-pick components as needed per page -->
<script type="module">
  import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
  import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
  import '@awesome.me/webawesome/dist/components/copy-button/copy-button.js';
</script>
```

**NOT recommended: Full bundle import** — loading all 59 components when only 5–10 are needed wastes bandwidth.

### 5.3 Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Two component libraries** create cognitive overhead | Medium | Clear boundary: WA = interactive primitives, Genesis = ontological structure. Document the mapping in component-library.md. |
| **Shadow DOM limits Genesis SCSS reach** | Medium | Use `--wa-*` custom properties and `::part()` for styling. Create a `_sass/ontology/foundation/_webawesome-bridge.scss` that maps Genesis tokens → WA tokens. |
| **Dependency weight increases** | Low–Medium | Tree-shake aggressively — import individual components, not the bundle. Lit shared across all WA components, amortized to ~16KB. |
| **Version coupling with Font Awesome** | Low | WA has its own release cycle independent of FA. The `wa-icon` component can use FA icons but is optional. |
| **Upgrade friction** | Low | WA follows semver. Pin to `^3.4.0`. Breaking changes only in major versions. |
| **SSR/Jekyll hydration** | Low | WA components use declarative Shadow DOM fallback. In static Jekyll builds, components render client-side. `wa-include` can load partials, but Liquid templating handles this already. |

---

## 6. Proposed Integration Phases

### Phase 1: Foundation (Low Risk, High Value)

**Install and create theme bridge:**
1. `npm install @awesome.me/webawesome`
2. Create `_sass/ontology/foundation/_webawesome-bridge.scss` — map Genesis design tokens to `--wa-*` properties
3. Create `_includes/webawesome-loader.html` — conditional script loader for WA components
4. Add WA base theme CSS to asset pipeline

**Adopt 3 components:**
- `wa-dialog` — Replace handwritten Modal class in `ui-components.js`
- `wa-tooltip` — Add tooltip capability (no Genesis equivalent)
- `wa-copy-button` — Add copy-to-clipboard on code blocks

### Phase 2: Form Enhancement (Medium Risk, High Value)

**Enhance `genesis-form` with WA form controls:**
- `wa-input`, `wa-textarea`, `wa-select`, `wa-checkbox`, `wa-switch`
- Create form-specific bridge styles for Genesis ontological context
- Validate that `genesis-form validate="true"` works with WA form controls

### Phase 3: Rich Interactive Components (Medium Risk, Medium Value)

**Adopt as needed per layout:**
- `wa-carousel` for landing pages
- `wa-split-panel` for docs layout
- `wa-tree` for settings/documentation navigation
- `wa-color-picker` for theme customizer
- `wa-skeleton` for dashboard loading states
- `wa-relative-time` for chat and timeline

### Phase 4: Design System Convergence (Long-term)

**Align design tokens bidirectionally:**
- Extend `_design/tokens.json` with WA-compatible token mappings
- Generate `--wa-*` custom properties from Style Dictionary pipeline
- Create a Genesis theme variant for Web Awesome (`themes/genesis.css`)
- Document ontological mapping: which WA components map to which Genesis hierarchy levels

---

## 7. Impact on Existing Components

### 7.1 Components That Would Be Replaced

| Current | Replaced By | Rationale |
|---------|-------------|-----------|
| `Modal` class in `ui-components.js` | `wa-dialog` | WA dialog has focus trap, stacking context, transitions, ARIA roles built in. Genesis Modal is ~80 lines of custom JS that duplicates this. |
| `Collapse` class in `ui-components.js` | `wa-details` | WA details provides accessible disclosure with animation and keyboard support. |

### 7.2 Components That Would Be Augmented

| Current | Augmented With | Rationale |
|---------|---------------|-----------|
| `genesis-form` | `wa-input`, `wa-select`, etc. | WA form controls compose inside Genesis form wrapper. Genesis manages layout/validation; WA manages individual input UX. |
| `genesis-navigation type="tabs"` | `wa-tab-group` (optional) | WA tab-group provides pre-built tab UX. Genesis tabs could use WA internally if desired. |
| `genesis-accordion` | `wa-details` (optional) | WA details is simpler for single disclosure items; Genesis accordion handles multiple-panel coordination. |

### 7.3 Components That Would NOT Be Affected

All 6 ontological components, `genesis-card`, `genesis-header`, `genesis-footer`, `genesis-navbar`, `genesis-search`, `genesis-dashboard`, `genesis-chat`, `genesis-media` — these are domain-specific or structural and have no Web Awesome equivalent.

---

## 8. Dependency Analysis

### 8.1 New Dependencies

```
@awesome.me/webawesome@3.4.0
├── @ctrl/tinycolor@4.1.0              (color manipulation)
├── @floating-ui/dom@^1.6.13           (tooltip/popover positioning)
├── @lit/react@^1.0.8                  (React wrappers, tree-shakes out)
├── @shoelace-style/animations@^1.2.0  (CSS animations library)
├── @shoelace-style/localize@^3.2.1    (i18n localization)
├── composed-offset-position@^0.0.6    (CSS anchor positioning polyfill)
├── lit@^3.2.1                         (Web Components base class, ~16KB gz)
├── nanoid@^5.1.5                      (unique ID generation)
└── qr-creator@^1.0.0                  (QR code generation)
```

### 8.2 Size Impact (Selective Import)

| Import Strategy | JS Size (gzip) | CSS Size (gzip) |
|----------------|----------------|-----------------|
| Full bundle (all 59 components) | ~180KB | ~40KB |
| Phase 1 only (dialog + tooltip + copy-button) | ~35KB | ~8KB |
| Phase 1 + Phase 2 (+ form controls) | ~60KB | ~12KB |

The Lit runtime (~16KB gzip) is shared across all imported components.

### 8.3 Comparison to Current

The repository currently ships:
- `motion@^12.30.0` — ~5KB production dependency
- Font Awesome 6.7.2 — ~150KB+ CSS (all icons loaded)
- All Genesis JS components — ~45KB combined

Adding Phase 1 Web Awesome components would add ~35KB — a reasonable increment for the functionality gained.

---

## 9. Alternatives Considered

| Alternative | Pros | Cons | Verdict |
|-------------|------|------|---------|
| **Build everything in Genesis** | Full control, no dependencies | Enormous effort; reinventing well-solved patterns | ❌ Not recommended |
| **Shoelace (predecessor)** | Same API, well-known | Deprecated in favor of Web Awesome | ❌ Discontinued |
| **Headless UI** | Unstyled, maximum flexibility | Requires React/Vue; not web-standards | ❌ Framework-locked |
| **Radix Primitives** | Excellent a11y, composable | React-only | ❌ Framework-locked |
| **Lion Web Components** | ING Bank design system, a11y-first | Smaller community, fewer components | ⚠️ Possible |
| **Web Awesome** | Standards-based, 59 components, Font Awesome team, MIT, CSS custom properties | Shadow DOM limits, Lit dependency | ✅ **Best fit** |

Web Awesome is the strongest match because it shares the same philosophical principles as Genesis: web standards first, framework agnostic, accessible by default, customizable via CSS.

---

## 10. Conclusion

**Web Awesome is feasible and recommended for selective integration.**

The library fills specific interactive primitive gaps (dialogs, tooltips, form controls, carousels, color pickers) that would be expensive to build and maintain in Genesis. Its CSS custom property theming system aligns naturally with the Genesis token architecture. The `wa-*` prefix creates zero collision with `genesis-*` components.

The recommended approach is **phased adoption** starting with 3 high-value components (dialog, tooltip, copy-button) to validate the integration pattern and theme bridge before expanding to form controls and rich interactive components.

---

## References

- **Web Awesome Docs**: https://webawesome.com
- **Source Repository**: https://github.com/shoelace-style/webawesome
- **npm Package**: https://www.npmjs.com/package/@awesome.me/webawesome
- **Lit Documentation**: https://lit.dev
- **Floating UI**: https://floating-ui.com
- **Genesis Component Library**: `/docs/specifications/component-library.md`
- **Genesis Ontology System**: `/docs/specifications/scss-ontology-system.md`
- **Genesis Accessibility Standards**: `/docs/specifications/accessibility.md`
- **Genesis Design Tokens**: `_design/tokens.json`
