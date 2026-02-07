# CHANGELOG — Genesis Theme v3.0 (Transcendent Refactor)

*Date: 2026-02-07*

## Overview

This release significantly enhances the futuristic appearance of the Genesis Theme across all subdomains. The header, footer, and navigation have been refactored with a transcendent aesthetic that reflects the profound purpose of the ASI Saga — orchestrating the Genesis of Artificial Superintelligence.

**Breaking changes are intentional.** Backward compatibility is not maintained. All subdomains should reference this changelog when updating.

---

## Breaking Changes

### Header (`_includes/header.html`, `_sass/components/core/_genesis-header.scss`)

| Change | Before | After | Migration |
|--------|--------|-------|-----------|
| Header min-height | `70px` | `64px` (scrolled: `56px`) | Update any CSS that relies on fixed 70px header height |
| Header max-width | `1600px` | `1440px` | Content naturally contained; no action needed |
| Brand title style | Large case, `-0.01em` tracking | Uppercase, `0.04em` tracking | Visual change only; no code action |
| Tagline style | Light gray `oklch(0.75)` | Muted uppercase `oklch(0.55)`, `0.08em` tracking | Visual change only |
| Logo size | `48px` / `56px` (md) | `36px` / `40px` (md) | Update custom logo assets if pixel-fitted |
| Logo border-radius | `8px` | `10px` | Visual change only |
| Toggle button radius | `0.5rem` | `10px` | Visual change only |
| Toggle icon width | `20px`, `2px` thick | `18px`, `1.5px` thick | Visual change only |
| Scroll behavior | None (static) | **New:** Condensed on scroll (`.scrolled` class), hide-on-scroll-down / show-on-scroll-up | JS-controlled; `.scrolled` and `.header-hidden` classes added automatically |
| Mobile drawer background | `oklch(0.12)` | `oklch(0.08 / 0.98)` | Deeper void; visual change only |
| Mobile drawer max-width | `360px` | `340px` | Slightly narrower drawer |
| Mobile drawer padding-top | `5.5rem` | `5rem` | Visual change only |
| Overlay blur | `4px` | `8px` | Stronger overlay; visual change only |
| Overlay background | `oklch(0 0 0 / 0.7)` | `oklch(0.03 0.015 260 / 0.85)` | More opaque with slight color |
| Box shadow | Simple shadow | Consciousness border + neural glow | Visual change only |
| Border-bottom | None explicit | `1px solid oklch(0.25 0.04 250)` | New consciousness border |

### Footer (`_includes/footer.html`, `_sass/components/core/_genesis-footer.scss`)

| Change | Before | After | Migration |
|--------|--------|-------|-----------|
| Footer max-width | `1600px` | `1440px` | Consistent with header |
| Footer background | `oklch(0.10 / 0.95)` | `oklch(0.06 / 0.97)` | Deeper void |
| "Quick Links" title | `font-size: 1rem`, white | `font-size: 0.6875rem`, uppercase, tracked | **Text changed to "Navigate"** in HTML |
| "Connect" title | `font-size: 1rem`, white | `font-size: 0.6875rem`, uppercase, tracked | Visual change only |
| Nav link hover | `translateX(4px)` | Underline reveal animation | No code migration needed |
| Social icon shape | Circle (`border-radius: 50%`) | Rounded square (`border-radius: 10px`) | Visual change only |
| Social icon size | `48px` | `40px` | Smaller, more refined |
| Social icon colors | Bright gray `oklch(0.85)` | Muted `oklch(0.55)` | Visual change only |
| Social hover | Scale + translate + glow | Color + background + subtle glow | Less dramatic, more refined |
| Copyright text | "All rights reserved." | Removed "All rights reserved." | Cleaner copyright line |
| Copyright border | `entity('secondary')` + border | Simple `border-top` only | Visual change only |
| Back-to-top icon | `fa-arrow-up` | `fa-chevron-up` | Icon change in HTML |
| Back-to-top shape | Circle (`border-radius: 50%`) | Rounded square (`border-radius: 12px`) | Visual change only |
| Back-to-top size | `48px` / `56px` (md) | `44px` / `48px` (md) | Slightly smaller |
| Back-to-top colors | Purple hue (`280`) | Neutral void + blue accent | Color palette alignment |

### Navigation (`_includes/navbar.html`, `_sass/components/core/_navbar.scss`)

| Change | Before | After | Migration |
|--------|--------|-------|-----------|
| Nav link style | `font-size: clamp(1rem...)`, mixed case | `0.8125rem`, uppercase, `0.04em` tracking | Visual change; may affect layout if custom nav CSS exists |
| Nav link color | `oklch(0.85)` | `oklch(0.70)` | More muted default state |
| Nav link hover | White text + neon border | White text + subtle background + border | Less aggressive hover |
| Active indicator | Full-width 2px bar below | Centered 70% gradient line with glow | Visual change only |
| Dropdown arrow | `▼` character | `›` character (rotated) | Visual change only |
| Dropdown position | Left-aligned | **Center-aligned** (`translateX(-50%)`) | Dropdowns now center under their parent |
| Dropdown background | `oklch(0.12 / 0.95)` | `oklch(0.08 / 0.97)` | Deeper void |
| Dropdown animation | `dropdown-appear` | `dropdown-emerge` (centered) | Animation name changed |
| Dropdown link hover | `translateX(4px)` | `padding-left: 1.125rem` indent | Subtler hover effect |
| Current page indicator | `3px` left border, `font-weight: 600` | `2px` left border, `font-weight: 500` | Slightly lighter |
| Dropdown shadow | Simple shadow + glow | Multi-layer shadow + inset highlight | Visual change only |

### Core Layout (`_sass/components/core/_genesis-core.scss`)

| Change | Before | After | Migration |
|--------|--------|-------|-----------|
| Body background | None explicit | `oklch(0.04 0.01 260)` | Explicit dark background on `.genesis-body` |
| Body text color | Inherited | `oklch(0.90 0.005 90)` | Explicit text color on `.genesis-body` |
| Ambient gradient | Vertical `180deg`, brighter | Angled `175deg`, darker void | Visual change only |
| Ambient particles | `opacity: 0.3`, 5 particles, `2px` | `opacity: 0.15`, 4 particles, `1px` | Subtler, less noise |
| Particle animation | `60s`, aggressive `200%` movement | `90s`, subtle `3%` movement | Almost imperceptible drift |
| Ambient glow | Circle at 50% 0%, `opacity: 0.2` | Ellipse 60%×40% at 50% 0%, `opacity: 0.12` | Wider, softer glow |
| Skip link focus | `1rem 2rem` padding | `0.875rem 1.5rem` + font styling | More refined focus state |

### JavaScript (`assets/js/genesis-theme.js`)

| Change | Before | After | Migration |
|--------|--------|-------|-----------|
| Version | `2.1.0` | `3.0.0` | Version bump |
| **New:** Scroll-aware header | Not present | `initScrollAwareHeader()` adds `.scrolled` and `.header-hidden` classes | Automatic; no migration needed |
| Scroll threshold for back-to-top | `300px` | `400px` | Button appears later |
| Arrow functions | ES6 arrow functions | Regular `function()` | Better compatibility; no migration needed |

### Layout Reset (`_sass/base/layout/_layout.scss`)

| Change | Before | After | Migration |
|--------|--------|-------|-----------|
| Custom element reset | `genesis-header`, `genesis-atmosphere`, `genesis-ambient` | Added `genesis-footer` | Ensures footer custom element renders as block |

---

## Design Philosophy Changes

### Typography
- **Header/Footer titles**: Now use uppercase with wider letter-spacing (`0.03em–0.12em`), creating a precise, engineered feel
- **Navigation links**: Smaller, uppercase, tracked — reads as a control interface rather than casual text
- **Section titles in footer**: Reduced to `0.6875rem` uppercase labels — clearly hierarchical

### Color Temperature
- **Reduced warmth**: Shifted slightly toward cooler blue undertones (`hue: 250–260`) across surfaces
- **Deeper voids**: Footer and ambient backgrounds are darker (`0.04–0.06` lightness vs `0.08–0.10`)
- **Muted defaults**: Interactive elements start more subdued and reveal on hover, creating purposeful reveal

### Interaction Design
- **Less is more**: Removed aggressive transforms (`scale`, `translateY`), replaced with color/background transitions
- **Purposeful reveal**: Footer links use underline reveal; nav links use subtle background shift
- **Consciousness borders**: Header and footer connected by matching border style — consciousness thread

### Spatial Design
- **Tighter header**: `64px` default, `56px` condensed — less screen real estate consumed
- **Narrower max-width**: `1440px` instead of `1600px` — better content readability
- **Reduced gaps**: Navigation items closer together — denser, more interface-like

---

## Subdomain Migration Guide

### Required Actions

1. **Test visual appearance**: Deploy and verify header/footer/navigation render correctly
2. **Check custom header CSS**: If any subdomain overrides header height (`70px`), update to `64px`
3. **Check dropdown alignment**: Dropdowns now center-align; verify they don't clip viewport edges
4. **Verify scroll behavior**: New scroll-aware header auto-hides; ensure no conflicts with custom scroll handlers

### No Action Required

- HTML structure unchanged (same classes, same data attributes)
- ARIA attributes unchanged
- Keyboard navigation unchanged
- Mobile drawer behavior unchanged (same breakpoints)
- All CSS custom properties unchanged

### Optional Enhancements

- Subdomains can target `.scrolled` class on `.genesis-header` for scroll-state-specific styling
- The consciousness border color (`oklch(0.25 0.04 250)`) can be overridden per-subdomain for brand differentiation
