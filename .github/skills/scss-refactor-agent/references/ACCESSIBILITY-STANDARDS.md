# Web Accessibility Standards - WCAG Compliance Guide

**Version**: 1.0.0  
**For**: scss-refactor-agent skill  
**Purpose**: Comprehensive WCAG 2.2 AA compliance for Genesis Semantic Design System

---

## Table of Contents

1. [WCAG Overview](#wcag-overview)
2. [Perceivable](#perceivable)
3. [Operable](#operable)
4. [Understandable](#understandable)
5. [Robust](#robust)
6. [Testing & Validation](#testing--validation)

---

## WCAG Overview

### 1. WCAG 2.2 Levels

**Level A** (Minimum)
- Basic accessibility features
- Must-have for any website

**Level AA** (Target) ⭐
- Recommended standard for most sites
- Legal requirement in many jurisdictions
- Genesis Semantic Design System target

**Level AAA** (Enhanced)
- Highest level of accessibility
- Not achievable for all content types

### 2. Four Principles (POUR)

1. **Perceivable** - Information must be presentable to users
2. **Operable** - Interface must be operable by all users
3. **Understandable** - Information and operation must be understandable
4. **Robust** - Content must work with current and future technologies

### 3. Genesis Commitment

The Genesis Semantic Design System is built with **WCAG 2.2 AA compliance** as a core requirement:

- ✅ Semantic HTML foundation
- ✅ ARIA when needed (not overused)
- ✅ Keyboard navigation support
- ✅ Screen reader optimization
- ✅ Motion and contrast preferences
- ✅ Touch target standards (44×44px)

---

## Perceivable

### 1. Text Alternatives (1.1.1 - Level A)

**Requirement**: Provide text alternatives for non-text content

**Images**:
```html
<!-- ✅ Meaningful image -->
<img src="chart.png" alt="Sales increased 25% in Q4 2024">

<!-- ✅ Decorative image -->
<img src="decoration.png" alt="" role="presentation">

<!-- ❌ Missing alt -->
<img src="icon.png">
```

**Icon Fonts**:
```html
<!-- ✅ With accessible label -->
<button aria-label="Close dialog">
  <span class="icon-close" aria-hidden="true"></span>
</button>

<!-- ❌ Icon only, no label -->
<button>
  <span class="icon-close"></span>
</button>
```

**Genesis Pattern**:
```scss
// Icons are decorative, text provides meaning
.action-button {
  @include genesis-synapse('execute');
  
  .icon {
    // Visual only
    &::before {
      content: '→';
      aria-hidden: true;
    }
  }
  
  .label {
    // Text alternative
  }
}
```

### 2. Color Contrast (1.4.3 - Level AA)

**Requirements**:
- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **UI components**: 3:1 minimum

**Genesis Compliance**:
```scss
@mixin genesis-cognition($intent) {
  // Text always solid color (never transparent)
  color: var(--text-primary); // WCAG AA compliant
  
  // ❌ NEVER: opacity on text
  // opacity: 0.7; // Breaks contrast
}
```

**Testing**:
```scss
// Use OKLCH for predictable contrast
:root {
  --text-primary: oklch(0.95 0.01 0);      // Light text
  --surface-dark: oklch(0.15 0.01 270);   // Dark surface
  // Contrast ratio: ~15:1 (exceeds 4.5:1)
}
```

**High Contrast Mode**:
```scss
@media (prefers-contrast: high) {
  @mixin genesis-entity($nature) {
    // Disable glass effects
    backdrop-filter: none;
    background: var(--surface-solid);
    
    // Increase borders
    border: 2px solid var(--border-contrast);
  }
}
```

### 3. Text Spacing (1.4.12 - Level AA)

**Requirements**: Content must work when users override spacing:
- Line height: at least 1.5× font size
- Paragraph spacing: at least 2× font size
- Letter spacing: at least 0.12× font size
- Word spacing: at least 0.16× font size

**Genesis Implementation**:
```scss
@mixin genesis-cognition($intent) {
  @if $intent == 'discourse' {
    // Body text spacing
    line-height: 1.6;              // ✅ Exceeds 1.5
    letter-spacing: 0.01em;        // Allows user override
    word-spacing: normal;          // Allows user override
  }
}

// Paragraph spacing
p + p {
  margin-block-start: 1.5em; // ✅ 1.5× font size
}
```

### 4. Reflow (1.4.10 - Level AA)

**Requirement**: Content reflows to 320px width without horizontal scrolling

**Genesis Pattern**:
```scss
@mixin genesis-environment($logic) {
  @if $logic == 'focused' {
    // Reading layout scales to mobile
    max-inline-size: min(70ch, 100%);
    padding-inline: var(--space-discourse);
  }
}

// No fixed widths
.container {
  width: 100%; // ✅ Fluid
  max-width: 1200px;
  // Not: width: 1200px; ❌
}
```

### 5. Non-Text Content (1.4.11 - Level AA)

**Requirement**: UI components and graphics have 3:1 contrast

**Genesis Borders**:
```scss
@mixin genesis-entity($nature) {
  // Ensure visible boundaries
  border: 1px solid oklch(from var(--glass-base) calc(l * 0.8) c h);
  // Contrast ratio ≥ 3:1
}

@media (prefers-contrast: high) {
  @mixin genesis-entity($nature) {
    border: 2px solid var(--border-contrast);
    // Increased visibility
  }
}
```

---

## Operable

### 1. Keyboard Accessibility (2.1.1 - Level A)

**Requirement**: All functionality available via keyboard

**Genesis Focus Management**:
```scss
@mixin genesis-synapse($vector) {
  // Keyboard focusable
  &:focus {
    outline: 2px solid transparent; // Browser default
  }
  
  // Visible focus indicator
  &:focus-visible {
    outline: 2px solid var(--accent-focus);
    outline-offset: 2px;
  }
}
```

**Tab Order**:
```html
<!-- ✅ Logical tab order -->
<form>
  <input tabindex="0"> <!-- Natural order -->
  <input tabindex="0">
  <button tabindex="0">Submit</button>
</form>

<!-- ❌ Manipulated tab order -->
<div tabindex="1">  <!-- Don't use positive tabindex -->
```

**Skip Links**:
```html
<!-- ✅ Required: First focusable element -->
<a href="#skip-target" class="sr-only focus-visible">
  Skip to main content
</a>

<header>...</header>

<main id="skip-target" tabindex="-1">
  {{ content }}
</main>
```

```scss
// Skip link styles
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.sr-only.focus-visible:focus {
  // Visible when focused
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  padding: 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  background: var(--surface-primary);
  z-index: 9999;
}
```

### 2. Touch Target Size (2.5.5 - Level AAA / Best Practice)

**Requirement**: Minimum 44×44 CSS pixels for touch targets

**Genesis Compliance**:
```scss
@mixin genesis-synapse($vector) {
  // All interactive elements
  min-width: 44px;
  min-height: 44px;
  
  // Ensure clickable area with padding
  padding: var(--space-synapse); // At least 8px
}
```

**Spacing Between Targets**:
```scss
.button-group {
  display: flex;
  gap: var(--space-synapse); // ≥ 8px separation
  
  .button {
    @include genesis-synapse('execute');
    // 44×44px minimum ensured
  }
}
```

### 3. Motion Control (2.3.3 - Level AAA / 2.2.2 - Level A)

**Requirement**: Users can pause, stop, or hide moving content

**Genesis Animation Control**:
```scss
// Respect user preference
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// Pausable animations
@mixin genesis-atmosphere($vibe) {
  @if $vibe == 'vibrant' {
    transition: transform var(--motion-fluid);
    
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
```

### 4. Focus Order (2.4.3 - Level A)

**Requirement**: Focus order preserves meaning and operability

**HTML Structure**:
```html
<!-- ✅ Logical DOM order = tab order -->
<article>
  <h1>Title</h1>
  <p>Content</p>
  <a href="#">Read more</a>
</article>

<!-- ❌ Visual reordering via CSS -->
<article style="display: flex; flex-direction: column-reverse;">
  <!-- Visual order ≠ tab order -->
</article>
```

**Genesis Layouts**:
```scss
// Maintain logical order
@mixin genesis-environment($logic) {
  @if $logic == 'distributed' {
    display: grid;
    // Grid doesn't change source order
  }
}
```

### 5. Target Size (Enhanced) (2.5.8 - Level AAA)

**Requirement**: 24×24 CSS pixels minimum (or sufficient spacing)

**Genesis Enhanced**:
```scss
@mixin genesis-synapse($vector) {
  min-width: 44px;  // ✅ Exceeds 24px
  min-height: 44px;
  
  // Or ensure spacing
  margin: var(--space-synapse); // ≥ 8px
}
```

---

## Understandable

### 1. Language (3.1.1 - Level A)

**Requirement**: Page language must be programmatically determined

```html
<!-- ✅ Language declared -->
<html lang="en">

<!-- ✅ Sections in other language -->
<blockquote lang="es">
  <p>Hola mundo</p>
</blockquote>
```

### 2. Consistent Navigation (3.2.3 - Level AA)

**Requirement**: Navigation is consistent across pages

**Genesis Pattern**:
```html
<!-- Same order on every page -->
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
```

```scss
.main-nav {
  @include genesis-environment('associative');
  @include genesis-entity('primary');
  
  .nav-link {
    @include genesis-synapse('navigate');
  }
}
```

### 3. Input Purpose (1.3.5 - Level AA)

**Requirement**: Input purpose can be programmatically determined

```html
<!-- ✅ Autocomplete attributes -->
<input
  type="email"
  name="email"
  autocomplete="email"
  aria-label="Email address"
>

<input
  type="text"
  name="name"
  autocomplete="name"
  aria-label="Full name"
>
```

### 4. Error Identification (3.3.1 - Level A)

**Requirement**: Errors are clearly identified and described

```html
<!-- ✅ Error messaging -->
<div class="form-field" aria-describedby="email-error">
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    aria-invalid="true"
  >
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>
</div>
```

```scss
.form-field {
  @include genesis-entity('primary');
  
  &[aria-invalid="true"] {
    @include genesis-entity('imperative'); // Visual error state
  }
}

.error-message {
  @include genesis-cognition('gloss');
  color: var(--accent-warning);
}
```

---

## Robust

### 1. Parsing (4.1.1 - Level A)

**Requirement**: Markup is valid and well-formed

**Genesis HTML Standards**:
```html
<!-- ✅ Valid HTML5 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
</head>
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <article>...</article>
  </main>
  <footer>...</footer>
</body>
</html>
```

**Validation**:
- Use [W3C Validator](https://validator.w3.org/)
- No duplicate IDs
- Properly nested elements
- Closed tags

### 2. Name, Role, Value (4.1.2 - Level A)

**Requirement**: UI components have accessible names and roles

**Genesis ARIA Usage**:
```html
<!-- ✅ Semantic HTML (preferred) -->
<button>Submit</button>

<!-- ✅ ARIA when needed -->
<div
  role="button"
  tabindex="0"
  aria-label="Close dialog"
  @click="close"
  @keydown.enter="close"
>
  ×
</div>

<!-- ❌ Missing role/label -->
<div @click="close">×</div>
```

**Form Labels**:
```html
<!-- ✅ Associated label -->
<label for="username">Username</label>
<input type="text" id="username" name="username">

<!-- ✅ Implicit label -->
<label>
  Email
  <input type="email" name="email">
</label>

<!-- ❌ Missing label -->
<input type="text" placeholder="Username">
```

### 3. Status Messages (4.1.3 - Level AA)

**Requirement**: Status messages can be programmatically determined

```html
<!-- ✅ Live region for dynamic content -->
<div role="status" aria-live="polite" aria-atomic="true">
  <p>Form submitted successfully</p>
</div>

<!-- ✅ Alert for errors -->
<div role="alert" aria-live="assertive">
  <p>Error: Connection lost</p>
</div>
```

**Genesis Pattern**:
```scss
.status-message {
  @include genesis-entity('secondary');
  
  &[role="alert"] {
    @include genesis-entity('imperative');
  }
  
  &[role="status"] {
    @include genesis-state('stable');
  }
}
```

---

## Testing & Validation

### 1. Automated Testing

**Tools**:
```bash
# axe-core
npm install -D axe-core
# Use in browser console or CI

# Pa11y
npm install -g pa11y
pa11y https://example.com

# Lighthouse
npm install -g lighthouse
lighthouse https://example.com --only-categories=accessibility
```

**Genesis Validation Script**:
```bash
# HTML validation
./.github/skills/html-template-agent/scripts/validate-html.sh layout.html

# Includes accessibility checks:
# - Landmarks present
# - Skip link exists
# - Alt attributes
# - Label associations
```

### 2. Manual Testing

**Keyboard Navigation**:
- [ ] Tab through all interactive elements
- [ ] Shift+Tab moves backward
- [ ] Enter activates buttons/links
- [ ] Arrow keys navigate menus/radios
- [ ] Escape closes modals/menus
- [ ] No keyboard traps

**Screen Reader Testing**:
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with TalkBack (Android)

**Responsive Testing**:
- [ ] 400% zoom (1280px → 320px)
- [ ] Text spacing overrides
- [ ] Portrait and landscape
- [ ] Touch targets ≥ 44px

### 3. Browser Extensions

**Recommended**:
- **axe DevTools** - Automated testing
- **WAVE** - Visual feedback
- **Lighthouse** - Comprehensive audit
- **Color Contrast Analyzer** - Contrast checking

### 4. Genesis Compliance Checklist

**HTML Structure**:
- [ ] Valid HTML5
- [ ] Semantic landmarks (header, main, nav, footer)
- [ ] Exactly one `<main>` per page
- [ ] Skip link present and functional
- [ ] Heading hierarchy (h1-h6)
- [ ] No duplicate IDs

**Color & Contrast**:
- [ ] Text contrast ≥ 4.5:1 (normal)
- [ ] Large text contrast ≥ 3:1
- [ ] UI component contrast ≥ 3:1
- [ ] Focus indicators visible
- [ ] High contrast mode supported

**Keyboard & Focus**:
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Visible focus indicators
- [ ] No keyboard traps
- [ ] Skip navigation available

**Forms & Controls**:
- [ ] All inputs labeled
- [ ] Error messages clear
- [ ] Required fields indicated
- [ ] Touch targets ≥ 44×44px
- [ ] Autocomplete attributes

**Motion & Animation**:
- [ ] Reduced motion supported
- [ ] No auto-playing video
- [ ] Animations pausable
- [ ] No flashing content

**Responsive & Mobile**:
- [ ] Reflows to 320px width
- [ ] Touch targets accessible
- [ ] Pinch zoom not disabled
- [ ] Orientation supported

---

## Common Accessibility Patterns

### 1. Modal Dialogs

```html
<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-modal="true"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p>Are you sure?</p>
  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

```scss
.modal-dialog {
  @include genesis-entity('primary');
  
  &[aria-modal="true"] {
    // Focus trap active
    // Close with Escape key
  }
}
```

### 2. Accordion Panels

```html
<button
  aria-expanded="false"
  aria-controls="panel1"
>
  Section Title
</button>
<div id="panel1" hidden>
  Panel content
</div>
```

```scss
.accordion-header {
  @include genesis-synapse('inquiry');
  
  &[aria-expanded="true"] {
    @include genesis-state('stable');
  }
}
```

### 3. Tab Panels

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2">
    Tab 2
  </button>
</div>
<div role="tabpanel" id="panel1">Content 1</div>
<div role="tabpanel" id="panel2" hidden>Content 2</div>
```

```scss
.tab {
  @include genesis-synapse('navigate');
  
  &[aria-selected="true"] {
    @include genesis-state('stable');
  }
}
```

---

## Resources

### Official Standards
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508](https://www.section508.gov/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Pa11y](https://pa11y.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Genesis Resources
- `.github/instructions/html.instructions.md` - HTML standards
- `.github/instructions/scss.instructions.md` - SCSS standards
- `_sass/ontology/INTEGRATION-GUIDE.md` - Ontological API

---

**Version**: 1.0.0  
**Compliance Level**: WCAG 2.2 AA  
**Last Updated**: 2026-01-29  
**Maintained by**: scss-refactor-agent skill
