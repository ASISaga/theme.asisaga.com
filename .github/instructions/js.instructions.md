---
applyTo: "**/*.js,assets/js/**"
description: "JavaScript coding instructions for Genesis Semantic Design System"
---

# JavaScript Instructions

## Philosophy: Progressive Enhancement

JavaScript should **enhance** the semantic HTML and ontological SCSS foundation, never replace it.

- **Core content** accessible without JavaScript
- **Interactions** layered on top of semantic structure
- **Behavior hooks** via `data-*` attributes, not classes
- **Accessibility** maintained at all levels

## Animation Library: Motion

**All UI/UX animations use Motion library** (https://motion.dev):
- **Lightweight**: 5KB Web Animations API wrapper
- **Built-in reduced motion support**: Automatically respects user preferences
- **Declarative usage**: Use `data-motion` attributes
- **Performance**: GPU-accelerated transforms and opacity

**Three.js remains for 3D graphics** (particle systems, neural networks).

→ **Complete guide**: `/docs/MOTION-INTEGRATION.md`

### Quick Motion Usage

**Declarative (recommended):**
```html
<div data-motion="sacred-rhythm">Heartbeat animation</div>
<div data-motion="card-hover">Hover to lift</div>
<button data-motion="button-hover">Hover to pulse</button>
```

**Programmatic:**
```javascript
import { animateFadeIn, setupCardHover } from './common/motion-utils.js';

animateFadeIn(element, { duration: 1, delay: 0.2 });
setupCardHover(card);
```

## Entry Points & Structure

- Theme main entry: `assets/js/common.js` (loaded via `_includes/head.html`)
- Subdomain entry: `assets/js/script.js` (MANDATORY - loaded after `common.js`)
- Use ES6 modules and `import`/`export` syntax
- Shared JS in `assets/js/common/`

**Subdomain `script.js` requirement:**
- Every subdomain MUST have `assets/js/script.js`
- Loaded automatically by theme layouts after `common.js`
- Can use utilities from theme's `common.js`
- Progressive enhancement pattern required

## DOM Hooks & Eventing

- Use `data-*` attributes or ARIA attributes as DOM hooks - NOT classes
- Use event delegation for dynamic content
- Ensure keyboard and screen reader support
- Add ARIA only when it adds semantic value

## Semantic Interaction Patterns

Map interactions to `genesis-synapse` variants:

**Navigation** → `genesis-synapse('navigate')`:
```javascript
document.querySelectorAll('[data-synapse="navigate"]').forEach(link => {
  // Navigation enhancements
});
```

**Execution** → `genesis-synapse('execute')`:
```javascript
document.querySelectorAll('[data-synapse="execute"]').forEach(button => {
  // Execution feedback (loading states)
});
```

**Destructive** → `genesis-synapse('destructive')`:
```javascript
document.querySelectorAll('[data-synapse="destructive"]').forEach(button => {
  button.addEventListener('click', (e) => {
    if (!confirm('Are you sure?')) e.preventDefault();
  });
});
```

→ **Complete patterns**: `/docs/specifications/javascript-interaction-patterns.md`

## Integration with Ontological States

```javascript
function updateContentState(element, dataState) {
  element.classList.remove('state-stable', 'state-evolving', 'state-deprecated');
  
  if (dataState === 'loading') {
    element.classList.add('state-evolving');
  } else if (dataState === 'verified') {
    element.classList.add('state-stable');
  }
}
```

**SCSS mapping:**
```scss
.content-item {
  &.state-stable { @include genesis-state('stable'); }
  &.state-evolving { @include genesis-state('evolving'); }
  &.state-deprecated { @include genesis-state('deprecated'); }
}
```

## Code Quality

- Use kebab-case filenames and clear module names
- Add JSDoc for public functions
- Keep shared logic in `common.js`
- Avoid inline JS in templates
- Use feature detection and graceful fallback

## Web Component Accessibility Patterns (CRITICAL)

Genesis web components must follow these accessibility rules discovered through automated auditing:

### Landmark Deduplication

Custom elements wrapping semantic HTML landmarks must **not duplicate** the landmark role:

```javascript
// ✅ CORRECT: Remove role if inner element already provides it
_setAriaRole() {
  if (this.getAttribute('role') === 'banner') {
    this.removeAttribute('role');  // Inner <header> already implies banner
  }
}

// ❌ WRONG: Setting role that duplicates inner element's implicit landmark
_setAriaRole() {
  if (!this.hasAttribute('role')) {
    this.setAttribute('role', 'banner');  // Duplicate of inner <header>!
  }
}
```

**Applies to**: `genesis-header`, `genesis-footer`, `genesis-environment`

### Inner Landmark Detection

For `genesis-environment`, check for inner semantic elements before setting landmark roles:

```javascript
// ✅ CORRECT: Skip landmark role when inner element provides it
const landmarkSelectors = {
  navigation: 'nav, [role="navigation"]',
  form: 'form, [role="form"]',
};
const selector = landmarkSelectors[role];
if (selector && this.querySelector(selector)) {
  return;  // Inner landmark found — let it own the role
}
this.setAttribute('role', role);
```

### Tab Ownership Chain

When `genesis-navigation` sets up tabs, intermediate wrappers must become transparent:

```javascript
// ✅ CORRECT: tablist on component, presentation on wrappers
this.setAttribute('role', 'tablist');
tabs.forEach(tab => {
  tab.setAttribute('role', 'tab');
  let parent = tab.parentElement;
  while (parent && parent !== this) {
    if (!parent.getAttribute('role') || parent.getAttribute('role') === 'group') {
      parent.setAttribute('role', 'presentation');
    }
    parent = parent.parentElement;
  }
});
```

ARIA requires `role="tab"` to be owned by `role="tablist"`. Intermediate wrappers (`<div>`, `<ul>`, `<li>`, `role="group"`) break this chain. Setting them to `role="presentation"` makes them transparent in the accessibility tree.

## When to Propose New Synapse Variant

If you implement a repeated interaction pattern without clear synapse mapping:

**Examples:**
- Drag-and-drop reordering → `synapse('reorder')`
- Real-time collaboration cursors → `synapse('collaborate')`
- Undo/redo actions → `synapse('temporal')`

→ **Process**: `.github/prompts/subdomain-evolution-agent.prompt.md`

## Documentation References

**Interaction patterns:**
- `/docs/specifications/javascript-interaction-patterns.md` - Complete synapse mappings, Motion usage, state integration
- `/docs/specifications/javascript.md` - Architecture and module structure
- `/docs/MOTION-INTEGRATION.md` - Complete Motion library integration

**Related systems:**
- `/docs/specifications/scss-ontology-system.md` - Synapse variants for SCSS mapping
- `/docs/specifications/animation-system.md` - Animation architecture

**Evolution:**
- `.github/.github/docs/agent-philosophy.md` - Ontological Proposition system
- `.github/prompts/subdomain-evolution-agent.prompt.md` - Proposing new synapse variants
