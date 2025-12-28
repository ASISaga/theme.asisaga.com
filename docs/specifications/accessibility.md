# Accessibility Standards

## Overview

The ASI Saga theme is built with **accessibility-first** principles, ensuring all users can access and interact with the content regardless of ability, device, or assistive technology. All components and patterns MUST meet WCAG 2.1 Level AA standards as a minimum.

## Core Principles

### 1. Perceivable

Users must be able to perceive the information being presented.

### 2. Operable

Users must be able to operate the interface.

### 3. Understandable

Users must be able to understand the information and the operation of the user interface.

### 4. Robust

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

## Semantic HTML (MANDATORY)

### Landmark Elements

#### Never Nest Landmarks

```html
<!-- ❌ BAD: Nested landmarks -->
<main>
  <header>
    <nav>...</nav>
  </header>
</main>

<!-- ✅ GOOD: Siblings -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

#### One Main Per Page

```html
<main id="skip-target" tabindex="-1" role="main">
  {{ content }}
</main>
```

- Must have `id="skip-target"` for skip link
- Must have `tabindex="-1"` to receive programmatic focus
- Should include explicit `role="main"` for older browsers

#### One Banner and One Contentinfo

```html
<header role="banner" aria-label="Site header">
  <!-- Site header content -->
</header>

<footer role="contentinfo" aria-label="Site footer">
  <!-- Site footer content -->
</footer>
```

#### Disambiguate Duplicate Landmarks

```html
<nav aria-label="Primary navigation">
  <!-- Main menu -->
</nav>

<nav aria-label="Footer navigation">
  <!-- Footer links -->
</nav>

<aside aria-label="Related content">
  <!-- Sidebar -->
</aside>
```

### Heading Hierarchy

**Maintain proper heading levels (h1-h6)**:

```html
<!-- ✅ GOOD: Logical hierarchy -->
<h1>Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
    <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
    <h3>Subsection 2.1</h3>

<!-- ❌ BAD: Skipping levels -->
<h1>Page Title</h1>
  <h4>Section 1</h4>  <!-- Skip h2, h3 -->
```

**Rules**:
- One `<h1>` per page (page title)
- Never skip heading levels
- Headings represent structure, not just visual style
- Use CSS to style headings, not different heading levels

## Skip Links (MANDATORY)

**Every page MUST have a skip link** as the first focusable element:

### HTML

```html
<a href="#skip-target" class="skip-link">Skip to main content</a>

<!-- Later in the page -->
<main id="skip-target" tabindex="-1">
  <!-- Content -->
</main>
```

### CSS

```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: $primary;
  color: $white;
  text-decoration: none;
  
  &:focus {
    top: 0;
  }
}
```

### JavaScript Enhancement

```javascript
// common/skip-link.js
document.querySelector('.skip-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector('#skip-target');
  if (target) {
    target.focus();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});
```

## Keyboard Navigation

### Focus Management

**All interactive elements MUST be keyboard accessible**:

```html
<!-- ✅ GOOD: Native button (keyboard accessible) -->
<button type="button">Click Me</button>

<!-- ❌ BAD: Div without keyboard support -->
<div onclick="handleClick()">Click Me</div>

<!-- ⚠️ ACCEPTABLE: If you must use div, make it accessible -->
<div 
  role="button" 
  tabindex="0" 
  onclick="handleClick()" 
  onkeypress="handleKeyPress(event)">
  Click Me
</div>
```

### Focus Indicators

**All focusable elements MUST have visible focus indicators**:

```scss
// Global focus styles
a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]) {
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}

// Component-specific focus styles
.btn {
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba($primary, 0.25);
  }
}
```

**Never remove focus styles without replacement**:

```scss
/* ❌ NEVER DO THIS */
button:focus {
  outline: none;
}

/* ✅ ACCEPTABLE: Replace with visible alternative */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px $primary;
}
```

### Tab Order

**Ensure logical tab order**:

```html
<!-- ✅ GOOD: Natural DOM order -->
<form>
  <input name="first_name" />
  <input name="last_name" />
  <input name="email" />
  <button type="submit">Submit</button>
</form>

<!-- ❌ BAD: Manipulating tab order -->
<form>
  <input name="first_name" tabindex="3" />
  <input name="last_name" tabindex="1" />  <!-- Don't do this -->
  <input name="email" tabindex="2" />
  <button type="submit">Submit</button>
</form>
```

### Keyboard Event Handlers

```javascript
// Support both Enter and Space for custom buttons
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleActivation();
  }
});

// Arrow key navigation
element.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':
      e.preventDefault();
      focusPrevious();
      break;
    case 'ArrowDown':
      e.preventDefault();
      focusNext();
      break;
    case 'Escape':
      close();
      break;
  }
});
```

## Images and Media

### Alternative Text

**All images MUST have alt attributes**:

```html
<!-- ✅ GOOD: Meaningful alt text -->
<img src="logo.png" alt="ASI Saga - Consciousness Embedding Platform">

<!-- ✅ GOOD: Decorative image -->
<img src="decoration.svg" alt="">

<!-- ✅ GOOD: Complex image with longer description -->
<img 
  src="chart.png" 
  alt="Bar chart showing 50% growth in consciousness embedding"
  aria-describedby="chart-description">
<div id="chart-description" class="sr-only">
  Detailed description of the chart data...
</div>

<!-- ❌ BAD: Missing alt -->
<img src="logo.png">

<!-- ❌ BAD: Useless alt text -->
<img src="logo.png" alt="image">
```

### Video and Audio

```html
<!-- Video with captions and transcript -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
  <p>Your browser doesn't support HTML5 video. 
     <a href="video.mp4">Download the video</a>
  </p>
</video>

<!-- Audio with transcript -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <p>Your browser doesn't support HTML5 audio.
     <a href="podcast.mp3">Download the audio</a>
  </p>
</audio>
<div class="transcript">
  <h2>Transcript</h2>
  <p>Full text transcript of the audio...</p>
</div>
```

## Forms

### Labels

**All form inputs MUST have associated labels**:

```html
<!-- ✅ GOOD: Explicit label association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- ✅ GOOD: Implicit label association -->
<label>
  Email Address
  <input type="email" name="email" required>
</label>

<!-- ❌ BAD: No label -->
<input type="email" placeholder="Email Address">
```

### Required Fields

```html
<!-- Mark required fields -->
<label for="name">
  Name <span aria-label="required">*</span>
</label>
<input type="text" id="name" name="name" required aria-required="true">
```

### Field Instructions

```html
<!-- Associate instructions with field -->
<label for="password">Password</label>
<input 
  type="password" 
  id="password" 
  name="password" 
  aria-describedby="password-requirements">
<div id="password-requirements">
  Must be at least 8 characters with one number and one special character.
</div>
```

### Error Messages

```html
<!-- Associate errors with field -->
<label for="email">Email</label>
<input 
  type="email" 
  id="email" 
  name="email" 
  aria-invalid="true"
  aria-describedby="email-error">
<div id="email-error" role="alert">
  Please enter a valid email address.
</div>
```

### Fieldsets and Legends

```html
<!-- Group related fields -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input type="text" id="street" name="street">
  
  <label for="city">City</label>
  <input type="text" id="city" name="city">
</fieldset>
```

## ARIA (Use Sparingly)

### When to Use ARIA

**First Rule of ARIA**: If you can use a native HTML element, use it instead.

```html
<!-- ❌ Unnecessary ARIA -->
<div role="button" tabindex="0">Click Me</div>

<!-- ✅ Use native element -->
<button>Click Me</button>
```

### Common ARIA Patterns

#### Live Regions

```html
<!-- Polite announcements (e.g., auto-save) -->
<div role="status" aria-live="polite" aria-atomic="true">
  Draft saved.
</div>

<!-- Assertive announcements (e.g., errors) -->
<div role="alert" aria-live="assertive">
  Error: Form submission failed.
</div>
```

#### State Management

```html
<!-- Expandable section -->
<button 
  aria-expanded="false" 
  aria-controls="details">
  Show Details
</button>
<div id="details" hidden>
  Details content...
</div>

<!-- Selected item -->
<div role="listbox">
  <div role="option" aria-selected="true">Option 1</div>
  <div role="option" aria-selected="false">Option 2</div>
</div>
```

#### Hidden Content

```html
<!-- Visually hidden but available to screen readers -->
<span class="sr-only">Additional context for screen readers</span>

<!-- Hidden from everyone -->
<div aria-hidden="true">Decorative content</div>
```

### Screen Reader Only Class

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

## Color and Contrast (MANDATORY)

### Contrast Ratios

**WCAG AA Requirements**:
- **Normal text** (< 18pt or < 14pt bold): Minimum 4.5:1
- **Large text** (≥ 18pt or ≥ 14pt bold): Minimum 3:1
- **UI components and graphics**: Minimum 3:1

```scss
// ✅ GOOD: High contrast
.dark-section {
  background: #0B1426;  // Cosmic Deep Blue
  color: #FFFFFF;       // White (Contrast: 16.47:1)
}

// ❌ BAD: Insufficient contrast
.muted-text {
  background: #FFFFFF;
  color: #AAAAAA;       // Light gray (Contrast: 2.32:1) - FAILS
}
```

### Text Colors

**Text colors MUST be solid (no low-opacity overlays)**:

```scss
/* ✅ GOOD: Solid colors */
.text {
  color: #000000;
}

.muted-text {
  color: #6C757D;  // Gray with sufficient contrast
}

/* ❌ BAD: Low-opacity text */
.faded-text {
  color: rgba(0, 0, 0, 0.5);  // Opacity < 0.9 not allowed
}
```

### Interactive Elements

**Interactive elements must have 3:1 contrast with surroundings**:

```scss
.btn {
  // Button must contrast with background
  background: $primary;
  color: $white;
  border: 2px solid transparent;
  
  &:focus-visible {
    // Focus indicator must be visible
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}
```

## Responsive and Touch

### Touch Targets

**Minimum touch target size: 44x44 pixels**:

```scss
.btn,
.nav-link,
[role="button"] {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
}
```

### Font Sizes

**Minimum font size: 16px**:

```scss
body {
  font-size: 1rem;  // 16px
}

.small-text {
  font-size: 0.875rem;  // 14px - use sparingly
}

/* ❌ Avoid smaller than 14px */
```

### Responsive Text

```scss
// Allow user to zoom up to 200%
body {
  font-size: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;  // 18px
  }
}

// Use relative units
.heading {
  font-size: 2rem;  // Scales with root font size
}
```

## Motion and Animation

### Respect User Preferences

**MANDATORY: Support `prefers-reduced-motion`**:

```scss
// Default animations
.element {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
}

// Respect reduced motion preference
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Safe Animations

- Avoid rapid flashing (3+ flashes per second)
- Avoid parallax scrolling for essential content
- Provide pause/stop controls for auto-playing content

## Testing Checklist

### Automated Testing

- [ ] Run WAVE browser extension
- [ ] Run axe DevTools
- [ ] Validate HTML (W3C Validator)
- [ ] Check color contrast (WebAIM Contrast Checker)

### Manual Testing

- [ ] Navigate entire site with keyboard only
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Zoom to 200% and verify usability
- [ ] Test with browser extensions disabled
- [ ] Test in high contrast mode
- [ ] Verify all images have alt text
- [ ] Check heading hierarchy
- [ ] Verify form labels and error messages

### Device Testing

- [ ] Test on mobile device (touch navigation)
- [ ] Test with different viewport sizes
- [ ] Test landscape and portrait orientations
- [ ] Verify touch targets are adequate

## Common Accessibility Patterns

### Modal Dialog

```html
<div 
  role="dialog" 
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  aria-modal="true">
  
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog content...</p>
  
  <button data-action="close">Close</button>
</div>
```

```javascript
// Trap focus in modal
class Modal {
  open() {
    this.previousFocus = document.activeElement;
    this.modal.removeAttribute('hidden');
    this.trapFocus();
    this.modal.querySelector('h2').focus();
  }
  
  close() {
    this.modal.setAttribute('hidden', '');
    this.previousFocus.focus();
  }
  
  trapFocus() {
    const focusableElements = this.modal.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
}
```

### Accordion

```html
<div class="accordion">
  <h3>
    <button 
      aria-expanded="false" 
      aria-controls="section1">
      Section 1
    </button>
  </h3>
  <div id="section1" hidden>
    Section 1 content...
  </div>
</div>
```

### Tabs

```html
<div role="tablist" aria-label="Sample Tabs">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Tab 2
  </button>
</div>

<div role="tabpanel" id="panel1" aria-labelledby="tab1">
  Panel 1 content...
</div>
<div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>
  Panel 2 content...
</div>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

## Related Specifications

- [HTML & Liquid](./html-liquid.md)
- [SCSS & Styling](./scss-styling.md)
- [JavaScript](./javascript.md)
- [Component Library](./component-library.md)
