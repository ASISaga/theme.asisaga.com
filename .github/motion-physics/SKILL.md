---
name: motion-physics
description: Implement Motion.dev (WAAPI) animations with Genesis token-driven spring physics, scroll reveals, and gesture support while respecting prefers-reduced-motion. Use when adding transitions, entrance animations, or gesture-driven motion to Genesis theme components.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: motion-specialist
allowed-tools: Bash(npm:*) Read Edit
---

# Motion Physics Skill

**Role**: Motion and Animation Specialist  
**Scope**: Motion.dev (WAAPI) animations, spring physics, gestures, ontology-integrated motion  
**Version**: 2.0 — Ontology-Integrated, Token-Driven

## Purpose

Implement physics-based, accessible animations using the Motion.dev library (5 KB WAAPI wrapper) synchronized with Genesis Ontological Design System semantic tokens. All motion constants are sourced from `_data/tokens.yml`; hardcoded durations and spring values are forbidden. Animations apply automatically when ontological mixins are used — subdomains need zero extra JavaScript.

## When to Use This Skill

Activate when:
- Adding entrance animations (fade-in, slide, scale) to components
- Implementing scroll-reveal or staggered-reveal effects
- Setting up hover/interactive effects on cards, buttons, or sacred elements
- Applying gesture support (swipe, drag, pinch) to mobile interfaces
- Implementing spring-physics-based UI transitions (chat bubbles, thread panels)
- Migrating legacy CSS `@keyframes` to Motion.dev

## Core Principles

1. **Token-Driven**: All `duration`, `stiffness`, and `damping` values pulled from `_data/tokens.yml` — no inline constants
2. **Intent Detection**: Derive animation path from semantic layout cues (`layoutAlign`, `data-motion-intent`) not hardcoded values
3. **WAAPI-First**: Prioritise `transform` + `opacity` via Web Animations API — keeps the main thread clear
4. **Ontology-Integrated**: Ontological mixins (`genesis-entity`, `genesis-synapse`, `genesis-state`) emit `data-motion-*` attributes consumed by `motion-utils.js`
5. **Accessibility**: `prefers-reduced-motion` collapses all durations to `0.001 s` — no exceptions
6. **No External Frameworks**: Vanilla `motion` library only — GSAP and Framer Motion are forbidden

## Motion Architecture

### Source Files

| File | Purpose |
|------|---------|
| `assets/js/common/motion-utils.js` | 18 core animation functions |
| `assets/js/common/motion-presets.js` | 50+ presets (entrance, exit, emphasis, transition) |
| `assets/js/common/motion-gestures.js` | Swipe, drag, pinch, double-tap, long-press |
| `assets/js/common/motion-migration.js` | CSS `@keyframes` → Motion conversion tools |
| `_includes/motion-library.html` | CDN loader (`window.Motion`) |

### Intent Detection

Derive the animation path from semantic layout cues:

| Intent | Detection | Spring Token |
|--------|-----------|--------------|
| `SENT` | `layoutAlign: "MAX"` or `[data-motion-intent="sent"]` | `tokens.motion.spring.snappy` |
| `RECEIVED` | `layoutAlign: "MIN"` or `[data-motion-intent="received"]` | `tokens.motion.spring.natural` |
| `SYSTEM` | `layoutAlign: "CENTER"` or `[data-motion-intent="system"]` | `tokens.motion.spring.soft` |

## Workflow: Adding Animations

### 1. Declarative (Recommended)

Use `data-motion` attributes — automatically initialized on page load:

```html
<!-- Sacred Animations -->
<div data-motion="sacred-rhythm">Heartbeat</div>
<div data-motion="consciousness-pulse">Pulsing glow</div>
<div data-motion="sacred-glow">Glowing effect</div>

<!-- Interactive Effects -->
<div data-motion="card-hover">Hover to lift</div>
<button data-motion="button-hover">Hover to pulse</button>

<!-- Scroll Reveal (staggered) -->
<div data-motion-group="stagger">
  <div data-motion="stagger-item">Item 1</div>
  <div data-motion="stagger-item">Item 2</div>
</div>
```

### 2. Programmatic

```javascript
import { animateFadeIn, setupCardHover, setupScrollReveal } from './common/motion-utils.js';
import { presets } from './common/motion-presets.js';

animateFadeIn(element, { duration: 1, delay: 0.2 });
setupCardHover(card);
setupScrollReveal(document.querySelectorAll('.reveal-on-scroll'));
```

### 3. Spring-Physics Transitions

```javascript
// Pull spring config from tokens — never hardcode
import tokens from '/_data/tokens.json';
const spring = tokens.motion.spring.snappy;

animate(element,
  { opacity: [0, 1], x: [offset, 0] },
  { stiffness: spring.stiffness, damping: spring.damping, mass: spring.mass }
);
```

### 4. Ontology-Integrated (Zero JS in Subdomains)

Ontological mixins emit the data attributes; the theme's `ontology-animations.js` handles the rest:

```scss
.product-card {
  @include genesis-entity('primary');
  // → auto-gets: fadeInUp entrance + card-hover lift

  .buy-button {
    @include genesis-synapse('execute');
    // → auto-gets: button-pulse hover
  }
}
```

→ **Complete integration guide**: `docs/systems/motion/ONTOLOGY-ANIMATION-INTEGRATION.md`

## Accessibility

All motion functions check `prefers-reduced-motion` before applying:

```javascript
import { prefersReducedMotion } from './common/motion-utils.js';

if (!prefersReducedMotion()) {
  setupScrollReveal(elements);
}
```

The `getAnimationOptions()` helper collapses `duration` to `0.001 s` and removes `delay` automatically when the user prefers reduced motion.

## Tool Integration

```bash
# Validate JS before committing
npm test

# Serve locally and test motion pages
bundle exec jekyll serve
# → /tests/motion/       motion-presets demo
# → /tests/motion/       gesture tests
```

## Validation

```bash
# Validate motion JS files exist
./.github/motion-physics/scripts/validate-motion.sh

# Visual smoke test — run jekyll and visit test pages
bundle exec jekyll serve --livereload
```

**Checklist before committing:**
- [ ] No hardcoded `duration`, `stiffness`, or `damping` (use token references)
- [ ] `prefers-reduced-motion` guard in every new animation function
- [ ] `transform` + `opacity` only (no `width`, `height`, `top`, `left`)
- [ ] `will-change` removed after animation completes
- [ ] All `data-motion` attributes tested with Motion disabled

## Related Documentation

→ **Motion integration guide**: `docs/systems/motion/MOTION-INTEGRATION.md`  
→ **Complete motion guide**: `docs/systems/motion/MOTION-COMPLETE-GUIDE.md`  
→ **Ontology animation integration**: `docs/systems/motion/ONTOLOGY-ANIMATION-INTEGRATION.md`  
→ **Animation system spec**: `docs/specifications/animation-system.md`  
→ **JS interaction patterns**: `docs/specifications/javascript-interaction-patterns.md`  
→ **Performance spec**: `docs/specifications/performance.md`  
→ **Accessibility spec**: `docs/specifications/accessibility.md`  
→ **Detailed reference**: `.github/motion-physics/references/MOTION-PHYSICS-GUIDE.md`  
→ **Skills spec**: `.github/specs/skills.md`

---

**Version History**:
- **v2.0** (2026-03-26): Full rewrite — proper frontmatter, ontology integration, token-driven protocol, 8-section structure per skills spec
- **v1.1.0**: Initial motion-physics-orchestrator (intent detection + token synchronization)
