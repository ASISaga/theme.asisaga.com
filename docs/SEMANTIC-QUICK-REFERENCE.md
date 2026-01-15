# Semantic Design System - Quick Reference

## 🎨 Color Tokens

### Surface Tokens
```scss
$surface-primary      // Main backgrounds (deep void)
$surface-elevated     // Raised cards/sections
$surface-glass        // Glassmorphism surfaces
$surface-overlay      // Modal/overlay backgrounds
$surface-transcendent // Light mode surfaces
```

### Text Tokens
```scss
$text-primary         // Primary text (white on dark)
$text-secondary       // Muted/secondary text
$text-accent          // Highlighted text (gold)
$text-consciousness   // Neural/AI text (violet)
$text-life-force      // Growth text (emerald)
$text-transformation  // Transform text (amethyst)
$text-inverse         // Text on light backgrounds
```

### Accent Tokens
```scss
$accent-glow          // Primary highlights (neon pulse)
$accent-neural        // Neural/AI accents (violet)
$accent-quantum       // Tech accents (cyan)
$accent-essence       // Human essence (gold)
$accent-life          // Life force (emerald)
$accent-sovereign     // Transformation (amethyst)
```

---

## 📐 Layout Classes

### Viewports (Containers)
```html
<div class="genesis-viewport">        <!-- Max 1600px -->
<div class="consciousness-viewport">  <!-- Max 1200px -->
<div class="essence-viewport">        <!-- Max 800px -->
```

### Bento Layouts
```html
<div class="bento-layout">           <!-- Auto-fit grid -->
<div class="bento-dashboard">        <!-- Named grid areas -->
<div class="bento-gallery">          <!-- Image grid -->
<div class="bento-masonry">          <!-- Dense auto-flow -->
```

### Bento Cards
```html
<div class="bento-card">                    <!-- Base card -->
<div class="bento-card bento-card--elevated">  <!-- Enhanced depth -->
<div class="bento-card bento-card--accent">    <!-- Gold-tinted -->
<div class="bento-card bento-card--neural">    <!-- Violet-tinted -->
```

---

## 🔤 Typography Classes

### Display (Hero/Landing)
```html
<h1 class="display-xl">   <!-- 56-96px fluid -->
<h2 class="display-lg">   <!-- 48-80px fluid -->
<h3 class="display-md">   <!-- 40-64px fluid -->
```

### Headings
```html
<h1> or <div class="h1">  <!-- 40-64px fluid -->
<h2> or <div class="h2">  <!-- 32-48px fluid -->
<h3> or <div class="h3">  <!-- 24-36px fluid -->
<h4> or <div class="h4">  <!-- 20-30px fluid -->
<h5> or <div class="h5">  <!-- 18-24px fluid -->
<h6> or <div class="h6">  <!-- 16-20px fluid -->
```

### Body Text
```html
<p class="text-lg">       <!-- 18-20px fluid -->
<p>                       <!-- 16-18px fluid (default) -->
<p class="text-sm">       <!-- 14-16px fluid -->
<p class="text-xs">       <!-- 12-14px fluid -->
```

### Font Weights
```html
<span class="font-light">      <!-- 300 -->
<span class="font-normal">     <!-- 400 -->
<span class="font-medium">     <!-- 500 -->
<span class="font-semibold">   <!-- 600 -->
<span class="font-bold">       <!-- 700 -->
<span class="font-extrabold">  <!-- 800 -->
```

### Text Colors
```html
<span class="text-primary">        <!-- White on dark -->
<span class="text-accent">         <!-- Gold highlight -->
<span class="text-consciousness">  <!-- Violet -->
<span class="text-life-force">     <!-- Emerald -->
<span class="text-transformation"> <!-- Amethyst -->
```

---

## 🪟 Material Classes

### Glass Surfaces
```html
<div class="material-glass">          <!-- Base glass (12px blur) -->
<div class="material-glass-elevated"> <!-- Stronger (16px blur) -->
<div class="material-glass-subtle">   <!-- Lighter (8px blur) -->
<div class="material-glass-accent">   <!-- Gold-tinted glass -->
```

### Navigation Materials
```html
<header class="material-header">   <!-- Header with glass -->
<footer class="material-footer">   <!-- Footer with glass -->
```

### Overlay Materials
```html
<div class="material-overlay">     <!-- Full-screen overlay -->
<div class="material-modal">       <!-- Modal dialog -->
```

### Mask Effects
```html
<div class="mask-fade-bottom">     <!-- Fade to transparent at bottom -->
<div class="mask-fade-top">        <!-- Fade to transparent at top -->
<div class="mask-fade-edges">      <!-- Fade horizontal edges -->
<div class="mask-fade-radial">     <!-- Radial fade from center -->
```

---

## 🎛️ SCSS Mixins

### Layout Mixins
```scss
@include d-flex;                    // display: flex
@include flex-direction(column);    // flex-direction: column
@include justify-content(center);   // justify-content: center
@include align-items(center);       // align-items: center
```

### Spacing Mixins
```scss
@include padding-section;      // Large section padding (fluid)
@include padding-component;    // Component padding (fluid)
@include padding-element;      // Element padding (fluid)
@include padding-content;      // Content padding (fluid)
@include padding-tight;        // Tight padding (fluid)
```

### Button Mixins
```scss
@include button-variant($bg, $border, $text);
@include button-outline-variant($color);
```

### Glass Mixins
```scss
@include glass-surface($opacity: 0.75, $blur: 12px);
@include glass-border($opacity: 0.4);
@include glass-glow($color, $intensity: 0.15);
```

### Responsive Mixins
```scss
@include breakpoint-sm { /* 576px+ */ }
@include breakpoint-md { /* 768px+ */ }
@include breakpoint-lg { /* 992px+ */ }
@include breakpoint-xl { /* 1200px+ */ }

@include mobile-only { /* <768px */ }
@include tablet-and-up { /* 768px+ */ }
@include desktop-and-up { /* 992px+ */ }
```

### Accessibility Mixins
```scss
@include focus-visible;        // Focus ring styles
@include reduced-motion { }    // Disable animations
@include high-contrast { }     // High contrast mode
```

---

## 📏 Fluid Typography Variables

```scss
// Display Scales
$font-display-xl: clamp(3.5rem, 8vw + 1rem, 6rem);
$font-display-lg: clamp(3rem, 6vw + 1rem, 5rem);
$font-display-md: clamp(2.5rem, 5vw + 0.5rem, 4rem);

// Heading Scales
$font-h1: clamp(2.5rem, 5vw + 1rem, 4rem);
$font-h2: clamp(2rem, 4vw + 0.5rem, 3rem);
$font-h3: clamp(1.5rem, 3vw + 0.5rem, 2.25rem);
$font-h4: clamp(1.25rem, 2.5vw + 0.25rem, 1.875rem);
$font-h5: clamp(1.125rem, 2vw + 0.25rem, 1.5rem);
$font-h6: clamp(1rem, 1.5vw + 0.25rem, 1.25rem);

// Body Scales
$font-body-lg: clamp(1.125rem, 1vw + 0.5rem, 1.25rem);
$font-body: clamp(1rem, 0.5vw + 0.75rem, 1.125rem);
$font-body-sm: clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
$font-body-xs: clamp(0.75rem, 0.25vw + 0.5rem, 0.875rem);
```

---

## 🎯 Common Patterns

### Dashboard Layout
```html
<div class="consciousness-viewport">
  <div class="bento-dashboard">
    <header class="bento-dashboard__header">
      <h1>Dashboard</h1>
    </header>
    <aside class="bento-dashboard__sidebar">
      <!-- Navigation -->
    </aside>
    <main class="bento-dashboard__main">
      <!-- Main content -->
    </main>
  </div>
</div>
```

### Card Grid
```html
<div class="consciousness-viewport">
  <div class="bento-layout">
    <div class="bento-card">
      <div class="bento-card__header">
        <h3 class="bento-card__title">Card Title</h3>
        <p class="bento-card__subtitle">Subtitle</p>
      </div>
      <div class="bento-card__body">
        <p>Card content goes here</p>
      </div>
      <div class="bento-card__footer">
        <button class="btn btn-primary">Action</button>
      </div>
    </div>
  </div>
</div>
```

### Hero Section
```html
<section class="genesis-viewport">
  <div class="material-glass">
    <h1 class="display-xl text-accent">Hero Headline</h1>
    <p class="text-lg text-secondary">Supporting text</p>
    <button class="btn btn-primary">Call to Action</button>
  </div>
</section>
```

---

## 🔄 Migration Cheat Sheet

### Bootstrap → Bento Engine

```html
<!-- Bootstrap -->               <!-- Bento Engine -->
<div class="container">         → <div class="consciousness-viewport">
<div class="container-fluid">   → <div class="genesis-viewport">
<div class="row">               → <div class="bento-layout">
<div class="col-md-6">          → <div> (auto-fit grid)
<div class="card">              → <div class="bento-card">
```

### Bootstrap → Utility Classes

```html
<!-- Bootstrap -->               <!-- Semantic -->
<div class="d-flex">            → <div class="d-flex">
<div class="justify-content-center"> → <div class="justify-content-center">
<button class="btn btn-primary"> → <button class="btn btn-primary">
<p class="text-center">         → <p class="text-center">
```

---

## 🚀 Quick Start Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic Design System</title>
</head>
<body>
  <!-- Skip link -->
  <a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>
  
  <!-- Header -->
  <header class="material-header">
    <div class="consciousness-viewport">
      <h1 class="h3">Site Title</h1>
    </div>
  </header>
  
  <!-- Main -->
  <main id="skip-target" tabindex="-1">
    <div class="consciousness-viewport">
      <div class="bento-layout">
        <div class="bento-card">
          <div class="bento-card__header">
            <h2 class="bento-card__title">Card Title</h2>
          </div>
          <div class="bento-card__body">
            <p>Content goes here</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="material-footer">
    <div class="consciousness-viewport">
      <p class="text-sm">&copy; 2026 ASI Saga</p>
    </div>
  </footer>
</body>
</html>
```

---

## 📚 Resources

- **Full Documentation**: `docs/SEMANTIC-REFACTOR.md`
- **SCSS Instructions**: `.github/instructions/scss.instructions.md`
- **HTML Instructions**: `.github/instructions/html.instructions.md`
- **Design Tokens**: `_sass/base/_design-tokens.scss`
- **Mixins**: `_sass/base/_semantic-mixins.scss`
- **Bento Engine**: `_sass/layouts/_bento-engine.scss`

---

**Version**: 1.0.0  
**Last Updated**: January 2026
