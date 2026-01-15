---
applyTo: "**/*.{html,liquid},_includes/**,_layouts/**"
description: "HTML & Liquid templating for the ASI Saga semantic design system. Accessibility-first semantic HTML with Bento Engine layouts."
---

# Semantic Design System - HTML & Liquid Instructions

This file contains guidance for Jekyll templates using the semantic design system with Bento Engine layouts.

## Architecture Overview
- **NO Bootstrap classes** - Use semantic Bento Engine layouts
- **Accessibility-first** - Semantic HTML5 with ARIA where needed
- **Glassmorphism components** - Material design primitives
- **Container queries** - Components adapt to container size, not viewport

## Theme Structure
- Theme is the single source for layouts, includes, and shared site head
- Reusable UI components in `_includes/` with include parameters
- Layouts in `_layouts/` use semantic structure
- Keep pages focused and small; use includes for patterns

## Semantic Layout Patterns

### Container Selection
Replace Bootstrap containers with Bento viewports:
```liquid
<!-- Instead of: <div class="container"> -->
<div class="genesis-viewport">         <!-- Full-width, max 1600px -->
<div class="consciousness-viewport">   <!-- Content-focused, max 1200px -->
<div class="essence-viewport">         <!-- Narrow content, max 800px -->
```

### Grid Layouts
Replace Bootstrap .row/.col-* with Bento layouts:
```liquid
<!-- Instead of: <div class="row"><div class="col-md-6"> -->
<div class="bento-layout">            <!-- Auto-fit responsive grid -->
  <div class="bento-card">            <!-- Glassmorphism card -->
```

### Dashboard Layouts
Use named grid areas for complex layouts:
```liquid
<div class="bento-dashboard">
  <header class="bento-dashboard__header">...</header>
  <aside class="bento-dashboard__sidebar">...</aside>
  <main class="bento-dashboard__main">...</main>
</div>
```

### Component Cards
Use Bento cards with variants:
```liquid
<div class="bento-card">               <!-- Base glassmorphism -->
<div class="bento-card bento-card--elevated">  <!-- Enhanced depth -->
<div class="bento-card bento-card--accent">    <!-- Gold-tinted -->
<div class="bento-card bento-card--neural">    <!-- Violet-tinted -->
```

## Accessibility-First HTML (MANDATORY)

### Landmark Elements
- **NEVER nest landmarks** (header, main, nav, footer, aside, section, article)
- Each page MUST have exactly ONE `<main id="skip-target">`
- Each page MUST have exactly ONE `<header>` and ONE `<footer>`
- Use `aria-label` to disambiguate duplicate landmarks
- First focusable element: skip link to #skip-target

### Semantic HTML Requirements
```html
<!-- Skip link (REQUIRED as first element) -->
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>

<!-- Main landmark (REQUIRED, exactly one per page) -->
<main id="skip-target" tabindex="-1">
  {{ content }}
</main>

<!-- Images (REQUIRED alt attributes) -->
<img src="..." alt="Descriptive text">  <!-- Meaningful images -->
<img src="..." alt="">                   <!-- Decorative images only -->

<!-- Forms (REQUIRED label associations) -->
<label for="email">Email</label>
<input type="email" id="email" name="email">
```

### Interactive Elements
- All buttons/links must be keyboard focusable
- Use `data-*` or ARIA attributes as behavior hooks, not classes
- Add ARIA only when native semantics are insufficient
- Ensure visible focus styles (`:focus-visible`)

## Material Design Primitives

### Glassmorphism Surfaces
```html
<div class="material-glass">          <!-- Base glass surface -->
<div class="material-glass-elevated"> <!-- Stronger blur/depth -->
<div class="material-glass-subtle">   <!-- Lighter glass -->
<header class="material-header">      <!-- Header navigation -->
<footer class="material-footer">      <!-- Footer navigation -->
<div class="material-modal">          <!-- Modal dialogs -->
<div class="material-overlay">        <!-- Full-screen overlays -->
```

### Mask Effects
```html
<div class="mask-fade-bottom">        <!-- Fade to transparent at bottom -->
<div class="mask-fade-top">           <!-- Fade to transparent at top -->
<div class="mask-fade-edges">         <!-- Fade horizontal edges -->
<div class="mask-fade-radial">        <!-- Radial fade from center -->
```

## Typography Classes
```html
<h1 class="display-xl">Hero Headline</h1>  <!-- 56px-96px fluid -->
<h2 class="display-lg">Section Title</h2>  <!-- 48px-80px fluid -->
<p class="text-lg">Large body text</p>     <!-- 18px-20px fluid -->
<p class="text-sm">Small text</p>          <!-- 14px-16px fluid -->

<!-- Color utilities -->
<span class="text-accent">Highlighted</span>
<span class="text-consciousness">Neural AI</span>
<span class="text-life-force">Growth</span>
```

## Jekyll & Liquid Best Practices
- Use semantic HTML5 elements appropriately
- Parameterized includes: `{% include component.html param="value" %}`
- NO inline JS or CSS in templates
- Keep Liquid logic lightweight; heavy processing in build scripts
- Provide sensible defaults for missing data

## Component Development
- Break complex UI into small includes with clear parameters
- Document include parameters in file header comments
- Each component has ONE matching SCSS partial
- Components should be resilient to missing data

## Responsive Design
- Mobile-first approach
- Test at 375px, 768px, 1440px minimum
- Use Bento responsive utilities: `.bento-stack-mobile`, `.bento-hide-mobile`
- Container queries handle component density automatically

## Bootstrap Compatibility (Temporary)
Legacy components may still use Bootstrap classes via compatibility layer:
- `.container`, `.row`, `.col-*` are supported but deprecated
- Gradually migrate to `.bento-layout` and `.bento-card`
- Use semantic Bento classes for all new components

## Examples

### Before (Bootstrap):
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Content</div>
    <div class="col-md-6">Content</div>
  </div>
</div>
```

### After (Bento Engine):
```html
<div class="consciousness-viewport">
  <div class="bento-layout">
    <div class="bento-card">
      <div class="bento-card__header">
        <h3 class="bento-card__title">Title</h3>
      </div>
      <div class="bento-card__body">Content</div>
    </div>
  </div>
</div>
```
