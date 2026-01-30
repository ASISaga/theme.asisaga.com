# Genesis Theme Refactoring Guide

**Version**: 2.0.0  
**Date**: 2026-01-29  
**Objective**: State-of-the-art web design with breaking changes

---

## 🎯 Overview

The Genesis Theme has been comprehensively refactored to use state-of-the-art web design patterns with 100% ontological SCSS, advanced visual effects, and full WCAG AA accessibility compliance.

**Breaking Changes**: Yes - new `genesis-*` class names throughout  
**Backward Compatibility**: Legacy classes still functional (phased migration supported)

---

## 🚀 What's New

### Modern Layout System

**Before** (Old):
```html
<body class="layout-container">
  <header class="site-header">...</header>
  <main class="page-content">...</main>
  <footer class="site-footer">...</footer>
</body>
```

**After** (New):
```html
<body class="genesis-body">
  <a href="#skip-target" class="skip-link sr-only focus-visible">Skip to main content</a>
  <header class="genesis-header">...</header>
  <main id="skip-target" class="genesis-main">...</main>
  <footer class="genesis-footer">...</footer>
  <div class="genesis-ambient" aria-hidden="true">...</div>
</body>
```

### Key Improvements

1. **Semantic Structure** - Proper HTML5 landmarks
2. **Accessibility** - WCAG AA skip links, ARIA states
3. **Visual Effects** - Ambient background with particles
4. **Glassmorphism** - Header/footer with backdrop-filter
5. **Responsive** - Mobile-first with off-canvas navigation

---

## 📦 New Components

### 1. Genesis Core (`_genesis-core.scss`)

**Purpose**: Foundation layout and utilities

**Features**:
- `.genesis-body` - Flexbox layout container
- `.genesis-main` - Main content area with flex-grow
- `.skip-link` - WCAG AA compliant skip navigation
- `.sr-only` - Screen reader only utility
- `.genesis-ambient` - Animated background effects

**Example**:
```html
<body class="genesis-body">
  <!-- Automatically: min-height 100vh, flex column -->
  <main class="genesis-main">
    <!-- Automatically: flex-grow 1, spacious mobile padding -->
  </main>
</body>
```

### 2. Genesis Header (`_genesis-header.scss`)

**Purpose**: Modern sticky navigation with glassmorphism

**Features**:
- Sticky positioning with glassmorphism
- Mobile off-canvas drawer navigation
- Touch-optimized toggle (44x44px)
- Gradient text effects on logo
- ARIA-compliant state management

**Responsive Behavior**:
- **Mobile** (<1024px): Off-canvas drawer (80% width, slide-in)
- **Desktop** (≥1024px): Inline horizontal navigation

**Example**:
```html
<header class="genesis-header">
  <div class="genesis-header__container">
    <a class="genesis-header__brand" href="/">
      <img class="genesis-header__logo" src="..." alt="">
      <div class="genesis-header__text">
        <span class="genesis-header__title">Site Title</span>
        <span class="genesis-header__tagline">Tagline</span>
      </div>
    </a>
    
    <button class="genesis-header__toggle" 
            aria-expanded="false" 
            data-nav-toggle>
      <span class="genesis-header__toggle-icon"></span>
    </button>
    
    <nav class="genesis-header__nav" data-nav-menu>
      <!-- Navigation items -->
    </nav>
  </div>
</header>
```

### 3. Genesis Footer (`_genesis-footer.scss`)

**Purpose**: Responsive grid footer with social links

**Features**:
- Responsive 3-column grid (1 → 2 → 3 columns)
- Social icon buttons with hover effects
- Back-to-top button with quantum effects
- Copyright bar with border separator

**Grid Layout**:
- **Mobile**: 1 column (brand, nav, social stacked)
- **Tablet**: 2 columns
- **Desktop**: 3 columns (2fr 1fr 1fr)

**Example**:
```html
<footer class="genesis-footer">
  <div class="genesis-footer__container">
    <div class="genesis-footer__grid">
      <div class="genesis-footer__brand">...</div>
      <nav class="genesis-footer__nav">...</nav>
      <div class="genesis-footer__social">...</div>
    </div>
    <div class="genesis-footer__copyright">...</div>
  </div>
  <button class="genesis-back-to-top" data-back-to-top>↑</button>
</footer>
```

### 4. Genesis Theme JS (`genesis-theme.js`)

**Purpose**: Interactive components with accessibility

**Features**:
- Mobile navigation toggle
- Back-to-top button (shows after 300px scroll)
- Smooth scroll for anchor links
- ARIA state management
- Respects prefers-reduced-motion
- Progressive enhancement

**API**:
```javascript
// Automatically initialized on DOM ready
// Uses data attributes for hooks:
// - [data-nav-toggle] - Navigation toggle button
// - [data-nav-menu] - Navigation menu
// - [data-back-to-top] - Back to top button
```

---

## 🎨 Visual Effects

### Glassmorphism

**Applied to**:
- Header (blur: 24px, opacity: 0.85)
- Footer (blur: 16px, opacity: 0.9)
- Navigation drawer (blur: 20px)

**SCSS Pattern**:
```scss
.element {
  backdrop-filter: blur(24px) saturate(180%);
  background: oklch(0.15 0.04 280 / 0.85);
  border: 1px solid oklch(0.5 0.2 280 / 0.2);
  box-shadow: 
    0 4px 24px oklch(0.10 0.08 280 / 0.3),
    0 0 48px oklch(0.5 0.2 280 / 0.15);
}
```

**High Contrast Fallback**:
```scss
@media (prefers-contrast: high) {
  .element {
    background: oklch(0.10 0 0);
    backdrop-filter: none;
    border: 2px solid oklch(0.5 0 0);
    box-shadow: none;
  }
}
```

### Quantum Gradients

**Text Gradients**:
```scss
.element {
  background: linear-gradient(135deg, 
    oklch(0.85 0.15 280),
    oklch(0.75 0.20 45)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Background Gradients**:
```scss
.ambient-layer {
  background: linear-gradient(180deg,
    oklch(0.10 0.03 280) 0%,
    oklch(0.05 0.02 270) 50%,
    oklch(0.08 0.03 260) 100%
  );
}
```

### Ambient Particles

**CSS-Only Animation**:
```scss
.genesis-ambient__particles {
  background-image: 
    radial-gradient(2px 2px at 20% 30%, oklch(0.8 0.1 280) 0%, transparent 100%),
    radial-gradient(2px 2px at 60% 70%, oklch(0.8 0.1 45) 0%, transparent 100%);
  background-size: 200% 200%;
  
  @media (prefers-reduced-motion: no-preference) {
    animation: particlesDrift 60s ease-in-out infinite;
  }
}
```

---

## ♿ Accessibility Features

### WCAG AA Compliance

**Skip Link**:
```html
<a href="#skip-target" class="skip-link sr-only focus-visible">
  Skip to main content
</a>
```

**Behavior**:
- Hidden by default (off-screen)
- Visible on keyboard focus
- Minimum 44x44px touch target
- Enhanced with `genesis-entity('imperative')` styling

**Landmarks**:
```html
<header class="genesis-header" role="banner">
<main id="skip-target" tabindex="-1" class="genesis-main">
<footer class="genesis-footer" role="contentinfo">
```

**Touch Targets**:
- All buttons/links: ≥44x44px on mobile
- Navigation toggle: 44x44px
- Social icons: 44x44px
- Back-to-top: 48x56px (mobile→desktop)

**ARIA States**:
```html
<button aria-expanded="false" aria-controls="genesis-nav">
<nav id="genesis-nav" aria-label="Primary navigation">
<button aria-label="Back to top">
```

**Screen Reader Support**:
```html
<span class="sr-only">Menu</span>
<i class="fas fa-icon" aria-hidden="true"></i>
```

**Motion Preferences**:
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Breakpoints

```scss
// Mobile-first approach
// Base styles: < 480px
@include from(sm) { }   // ≥480px (large phones)
@include from(md) { }   // ≥768px (tablets)
@include from(lg) { }   // ≥1024px (laptops)
@include from(xl) { }   // ≥1280px (desktops)
```

### Header Responsive

**Mobile** (<1024px):
- Off-canvas drawer (80% width, 320px max)
- Hamburger toggle visible
- Full-screen overlay on open
- Body scroll locked when open

**Desktop** (≥1024px):
- Inline horizontal navigation
- No toggle button
- No overlay
- Normal scroll behavior

### Footer Responsive

**Mobile** (<768px):
- Single column stack
- Brand → Navigation → Social

**Tablet** (768px-1023px):
- 2 columns
- Brand spans full width, then Nav + Social

**Desktop** (≥1024px):
- 3 columns: 2fr 1fr 1fr
- Brand (wide), Navigation, Social

---

## 🔄 Migration Guide

### For Existing Themes

**Step 1**: Update layouts
```diff
- <body class="layout-container">
+ <body class="genesis-body">
+   <a href="#skip-target" class="skip-link sr-only focus-visible">Skip to main content</a>
```

**Step 2**: Update header
```diff
- <header class="site-header">
+ <header class="genesis-header">
-   <div class="site-header__nav collapse" id="site-nav">
+   <nav class="genesis-header__nav" data-nav-menu>
```

**Step 3**: Update footer
```diff
- <footer class="site-footer">
+ <footer class="genesis-footer">
```

**Step 4**: Include JavaScript
```html
<script src="/assets/js/genesis-theme.js" defer></script>
```

**Step 5**: Test
- Keyboard navigation
- Screen reader (NVDA/JAWS)
- Mobile devices
- Reduced motion

### Backward Compatibility

Legacy classes still work:
- `.site-header` → Still styled (old SCSS)
- `.layout-container` → Still styled (old SCSS)
- `.page-content` → Still styled (old SCSS)

**Recommendation**: Migrate to new classes for full benefits

---

## 🧪 Testing Checklist

### Accessibility
- [ ] Skip link visible on Tab key
- [ ] All interactive elements keyboard-accessible
- [ ] Screen reader announces all content correctly
- [ ] Touch targets ≥44px on mobile
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Works with high contrast mode
- [ ] Respects reduced motion

### Responsive
- [ ] Test at 375px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (laptop)
- [ ] Test at 1440px (desktop)
- [ ] Navigation drawer works on mobile
- [ ] Footer grid adapts properly

### Visual
- [ ] Glassmorphism renders (blur visible)
- [ ] Gradients render smoothly
- [ ] Ambient particles animate
- [ ] Back-to-top appears after scroll
- [ ] Hover effects work

### Performance
- [ ] JavaScript loads deferred
- [ ] Scroll events throttled
- [ ] No layout shift on load
- [ ] Smooth scroll performs well

---

## 📚 Resources

### Documentation
- **Genesis Ontology Guide**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Futuristic Effects**: `.github/skills/futuristic-effects-agent/`
- **Responsive Design**: `.github/skills/responsive-design-agent/`
- **HTML Templates**: `.github/skills/html-template-agent/`

### Files
- **Core**: `_sass/components/core/_genesis-core.scss`
- **Header**: `_sass/components/core/_genesis-header.scss`
- **Footer**: `_sass/components/core/_genesis-footer.scss`
- **JavaScript**: `assets/js/genesis-theme.js`

### Agent Skills
- `html-template-agent` - Semantic HTML guidance
- `scss-refactor-agent` - Ontological SCSS patterns
- `responsive-design-agent` - Mobile-first patterns
- `futuristic-effects-agent` - Visual effects

---

**Version**: 2.0.0  
**Status**: Production Ready  
**Breaking Changes**: Yes (new class names)  
**Backward Compatible**: Legacy classes still work
