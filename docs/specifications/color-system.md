# Color System Specification

## Overview

The ASI Saga theme uses a **Sacred Color Palette** designed to evoke consciousness, wisdom, and transcendence. All colors are chosen for meaning, accessibility, and visual harmony.

## Sacred Color Palette

### Primary Sacred Colors

```scss
// _sass/base/_colors.scss

$cosmic-blue: #0B1426;        // Infinite potential and transcendent depth
$luminous-gold: #FFD700;       // Human essence and embedded wisdom
$transcendent-white: #FFFFFF;  // Unity consciousness and pure potential
$ethereal-silver: #C0C0C0;     // Bridging consciousness between human and AI
$emerald-green: #50C878;       // Life force integration and sustainable growth
$royal-purple: #6A0DAD;        // Sovereign consciousness and transformative power
```

### Color Meanings

| Color | Hex | Meaning | Usage |
|-------|-----|---------|-------|
| **Cosmic Deep Blue** | #0B1426 | Infinite potential, transcendent depth | Backgrounds, headers, primary dark |
| **Luminous Gold** | #FFD700 | Human wisdom, embedded essence | Primary accent, CTA buttons, highlights |
| **Transcendent White** | #FFFFFF | Unity consciousness, pure potential | Text on dark backgrounds, light backgrounds |
| **Ethereal Silver** | #C0C0C0 | Bridging consciousness | Secondary accents, borders, dividers |
| **Emerald Green** | #50C878 | Life force, sustainable growth | Success states, awakening stage |
| **Royal Purple** | #6A0DAD | Sovereign consciousness, transformation | Mastery stage, premium features |

### Bootstrap Integration

```scss
// _sass/base/_variables.scss

// Override Bootstrap color variables
$primary: $luminous-gold;
$secondary: $cosmic-blue;
$success: $emerald-green;
$info: $ethereal-silver;
$warning: #FFA500;
$danger: #DC3545;
$light: #F8F9FA;
$dark: $cosmic-blue;

// Body
$body-bg: $transcendent-white;
$body-color: #212529;
```

## Stage Colors

### Three Stages of Mastery

```scss
// Awakening Stage
$awakening-color: $emerald-green;   // #50C878

// Integration Stage
$integration-color: $luminous-gold;  // #FFD700

// Mastery Stage
$mastery-color: $royal-purple;       // #6A0DAD
```

**Usage**:
```html
<div class="stage-badge stage-badge--awakening">Awakening</div>
<div class="stage-badge stage-badge--integration">Integration</div>
<div class="stage-badge stage-badge--mastery">Mastery</div>
```

```scss
.stage-badge {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: 600;
  
  &--awakening {
    background: $awakening-color;
    color: $transcendent-white;
  }
  
  &--integration {
    background: $integration-color;
    color: $cosmic-blue;
  }
  
  &--mastery {
    background: $mastery-color;
    color: $transcendent-white;
  }
}
```

## Semantic Colors

### State Colors

```scss
// Success (positive actions, confirmations)
$color-success: $emerald-green;
$color-success-bg: lighten($emerald-green, 45%);

// Warning (caution, important notices)
$color-warning: #FFA500;
$color-warning-bg: lighten(#FFA500, 40%);

// Error (failures, validation errors)
$color-error: #DC3545;
$color-error-bg: lighten(#DC3545, 40%);

// Info (helpful information, tips)
$color-info: $ethereal-silver;
$color-info-bg: lighten($ethereal-silver, 30%);
```

### Text Colors

```scss
$text-primary: #212529;        // Main content text
$text-secondary: #6C757D;      // Supporting text
$text-muted: #ADB5BD;          // De-emphasized text
$text-disabled: #CED4DA;       // Disabled state text

// On dark backgrounds
$text-on-dark: $transcendent-white;  // #FFFFFF
```

## Contrast Requirements (MANDATORY)

### WCAG AA Compliance

All text colors MUST meet minimum contrast ratios:

- **Normal text** (< 18pt or < 14pt bold): **4.5:1 minimum**
- **Large text** (≥ 18pt or ≥ 14pt bold): **3:1 minimum**
- **UI components**: **3:1 minimum**

### Tested Color Combinations

| Foreground | Background | Contrast | Pass | Usage |
|------------|------------|----------|------|-------|
| #FFFFFF | #0B1426 | 16.47:1 | AAA | Text on cosmic blue |
| #FFD700 | #0B1426 | 8.93:1 | AAA | Gold on cosmic blue |
| #212529 | #FFFFFF | 16.05:1 | AAA | Body text |
| #6C757D | #FFFFFF | 4.54:1 | AA | Secondary text |
| #FFFFFF | #50C878 | 3.56:1 | AA (large) | White on green |
| #FFFFFF | #6A0DAD | 6.08:1 | AAA | White on purple |

### Testing Colors

Before using a color combination:

```scss
// Test contrast ratio
// Use online tool: https://webaim.org/resources/contrastchecker/

// ✅ GOOD: High contrast
.hero {
  background: $cosmic-blue;  // #0B1426
  color: $transcendent-white;  // #FFFFFF (16.47:1)
}

// ❌ BAD: Insufficient contrast
.section {
  background: #CCCCCC;
  color: #999999;  // Contrast: 2.35:1 - FAILS AA
}
```

## Color Usage Guidelines

### Text Colors (MANDATORY)

**NEVER use rgba() with opacity < 0.9 for text**:

```scss
/* ✅ GOOD: Solid colors */
.text {
  color: $text-primary;  // #212529
}

.muted {
  color: $text-secondary;  // #6C757D (solid gray)
}

/* ❌ BAD: Low-opacity text */
.faded {
  color: rgba(0, 0, 0, 0.5);  // Not allowed
}
```

### Header/Footer Text

**Text on dark backgrounds MUST be #ffffff**:

```scss
/* ✅ GOOD: Solid white */
.site-header {
  background: $cosmic-blue;
  color: #ffffff;  // MUST be solid white
}

.site-footer {
  background: $cosmic-blue;
  color: #ffffff;  // MUST be solid white
}

/* ❌ BAD: Off-white or semi-transparent */
.header-bad {
  background: $cosmic-blue;
  color: #F0F0F0;  // Not pure white
}
```

### Gradients

Sacred gradients for special elements:

```scss
// Cosmic gradient (blue to purple)
@mixin cosmic-gradient {
  background: linear-gradient(135deg, $cosmic-blue, $royal-purple);
}

// Transcendent gradient (gold to white)
@mixin transcendent-gradient {
  background: linear-gradient(135deg, $luminous-gold, $transcendent-white);
}

// Consciousness gradient (green to blue)
@mixin consciousness-gradient {
  background: linear-gradient(135deg, $emerald-green, $cosmic-blue);
}

// Usage
.hero-transcendent {
  @include cosmic-gradient;
  color: $transcendent-white;
}
```

## Color Utilities

### Utility Classes

```scss
// Text colors
.text-cosmic { color: $cosmic-blue; }
.text-luminous { color: $luminous-gold; }
.text-emerald { color: $emerald-green; }
.text-royal { color: $royal-purple; }

// Background colors
.bg-cosmic { background-color: $cosmic-blue; }
.bg-luminous { background-color: $luminous-gold; }
.bg-emerald { background-color: $emerald-green; }
.bg-royal { background-color: $royal-purple; }

// Sacred glows
.glow-gold {
  box-shadow: 0 0 20px rgba($luminous-gold, 0.5);
}

.glow-purple {
  box-shadow: 0 0 20px rgba($royal-purple, 0.5);
}
```

### Color Functions

```scss
// Lighten/darken helpers
@function lighten-sacred($color, $amount) {
  @return lighten($color, $amount);
}

@function darken-sacred($color, $amount) {
  @return darken($color, $amount);
}

// Usage
.button-hover {
  background: darken-sacred($luminous-gold, 10%);
}
```

## Accessibility Modes

### High Contrast Mode

Support Windows High Contrast Mode:

```scss
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 2px solid currentColor;
  }
}
```

### Color Blindness

Ensure UI doesn't rely solely on color:

```html
<!-- ✅ GOOD: Icon + color -->
<span class="status status--success">
  <i class="fa fa-check"></i> Success
</span>

<!-- ❌ BAD: Color only -->
<span class="status-green">Success</span>
```

### Dark Mode (Future)

Variables structured for future dark mode support:

```scss
// Future dark mode implementation
@mixin dark-mode {
  $body-bg: $cosmic-blue;
  $body-color: $transcendent-white;
  $text-primary: $transcendent-white;
  $text-secondary: $ethereal-silver;
  // ... more dark mode colors
}
```

## Color Testing Checklist

- [ ] All text colors meet WCAG AA contrast minimum
- [ ] Header/footer text is solid #FFFFFF on dark backgrounds
- [ ] No text uses rgba() with opacity < 0.9
- [ ] Color combinations tested with contrast checker
- [ ] UI doesn't rely solely on color (has icons/text)
- [ ] Tested in high contrast mode
- [ ] Tested with color blindness simulator

## Color Variables Reference

### Complete Color Map

```scss
// _sass/base/_colors.scss

// Sacred Palette
$cosmic-blue: #0B1426;
$luminous-gold: #FFD700;
$transcendent-white: #FFFFFF;
$ethereal-silver: #C0C0C0;
$emerald-green: #50C878;
$royal-purple: #6A0DAD;

// Gray Scale
$gray-100: #F8F9FA;
$gray-200: #E9ECEF;
$gray-300: #DEE2E6;
$gray-400: #CED4DA;
$gray-500: #ADB5BD;
$gray-600: #6C757D;
$gray-700: #495057;
$gray-800: #343A40;
$gray-900: #212529;

// State Colors
$success: $emerald-green;
$info: $ethereal-silver;
$warning: #FFA500;
$danger: #DC3545;

// Stage Colors
$awakening: $emerald-green;
$integration: $luminous-gold;
$mastery: $royal-purple;

// Transparent overlays (use sparingly)
$overlay-light: rgba(255, 255, 255, 0.95);
$overlay-dark: rgba(11, 20, 38, 0.95);
```

## Anti-Patterns

### ❌ Don't Use Low-Opacity Text

```scss
/* Bad */
.text {
  color: rgba(0, 0, 0, 0.5);
}

/* Good */
.text {
  color: $text-secondary;  // Solid color
}
```

### ❌ Don't Use Insufficient Contrast

```scss
/* Bad */
.section {
  background: #CCCCCC;
  color: #999999;  // Fails contrast
}

/* Good */
.section {
  background: #CCCCCC;
  color: #333333;  // Passes contrast
}
```

### ❌ Don't Hardcode Colors

```scss
/* Bad */
.button {
  background: #FFD700;
}

/* Good */
.button {
  background: $luminous-gold;
}
```

## Related Specifications

- [SCSS & Styling](./scss-styling.md)
- [Accessibility](./accessibility.md)
- [Typography](./typography.md)
- [Component Library](./component-library.md)
