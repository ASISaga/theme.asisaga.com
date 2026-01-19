# Migration Guide: Adopting Responsive Design Enhancements (v2.1.0 - v2.2.0)

This guide helps subdomain developers migrate to use the new responsive design variants added in theme versions 2.1.0 and 2.2.0.

---

## Overview

The Genesis Ontological Design System now includes comprehensive responsive design support. Many enhancements are **automatic** (your site is already better), while others are **opt-in** (you can adopt them for even better results).

## Automatic Improvements ✅

These enhancements apply automatically when you update to v2.1.0+:

### 1. Touch-Optimized Interactions (v2.1.0)
All `genesis-synapse` variants now have WCAG-compliant touch targets:
- Buttons automatically 44x44px on mobile
- Links have expanded tap zones
- **No code changes needed** - your existing synapse mixins are enhanced

**Before v2.1.0**: Touch targets may have been too small on mobile  
**After v2.1.0**: All interactive elements WCAG 2.1 compliant

### 2. Responsive Typography (v2.1.0)
All `genesis-cognition` variants scale responsively:
- Mobile-optimized font sizes (16px minimum prevents iOS zoom)
- Fluid scaling from mobile → tablet → desktop
- **No code changes needed** - your existing cognition mixins are enhanced

**Before v2.1.0**: Typography may have been too small or too large on mobile  
**After v2.1.0**: Optimal readability across all devices

### 3. Responsive Grids (v2.1.0)
`genesis-environment('distributed')` now responsive by default:
- Mobile: Single column for clarity
- Tablet: 2 columns
- Desktop: Auto-fit with 300px minimum
- Ultrawide: Max 4 columns, centered 1600px
- **No code changes needed** - your existing grids adapt automatically

**Before v2.1.0**: Grids may have been too dense on mobile  
**After v2.1.0**: Optimal layout at every viewport

---

## Opt-In Enhancements 🚀

These new variants are available for you to adopt when refactoring:

### 1. Responsive Navigation (v2.2.0)

#### Before (Custom Implementation):
```scss
.site-header {
  // Custom responsive nav logic
  display: flex;
  position: sticky;
  
  @media (max-width: 767px) {
    flex-direction: column;
    // Mobile drawer logic...
  }
}
```

#### After (Ontology Way):
```scss
.site-header {
  @include genesis-environment('navigation-primary');
}
```

**What you get**:
- Desktop: Horizontal sticky header
- Mobile: Off-canvas drawer (toggle with `.nav-open` class)
- Glassmorphism styling
- Touch-optimized spacing
- **Requires JavaScript**: Toggle `.nav-open` class on hamburger click

#### Secondary Navigation:
```scss
.breadcrumbs {
  @include genesis-environment('navigation-secondary');
}
```

**Use for**: Breadcrumbs, footer navigation, section navigation

---

### 2. Form Layouts (v2.2.0)

#### Before (Bootstrap or Custom Grid):
```scss
.contact-form {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }
}
```

#### After (Ontology Way):
```scss
.contact-form-fields {
  @include genesis-environment('interaction-form');
}
```

**What you get**:
- Mobile: Single-column for clarity
- Desktop: Multi-column auto-fit (min 300px)
- Built-in label styling
- Use `.form-full-width` class for spanning elements (submit button, etc.)

#### Form Inputs:
```scss
.email-field {
  @include genesis-synapse('input-primary');
}
```

**What you get**:
- Mobile: 44px height (WCAG compliant)
- Desktop: 40px height
- 16px font size (prevents iOS zoom)
- Built-in states: hover, focus, disabled, error
- Glassmorphism styling

---

### 3. Hero Sections & Viewport-Relative Sizing (v2.2.0)

#### Before (Custom vh Logic):
```scss
.hero-section {
  height: 100vh;
  
  @media (max-width: 767px) {
    height: 70vh; // Avoid browser chrome
  }
}
```

#### After (Ontology Way):
```scss
.hero-section {
  @include genesis-atmosphere('viewport-aware');
}
```

**What you get**:
- Desktop: 100vh/100dvh
- Tablet: 85vh/85dvh
- Mobile: 70vh/70dvh (accounts for address bar)
- Auto-adjusts on short viewports (<600px height)
- Flexbox centering built-in

---

### 4. Scroll Animations (v2.2.0)

#### Before (Custom Animation):
```scss
.fade-in-section {
  opacity: 0;
  transform: translateY(30px);
  
  &.is-visible {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s ease-out;
  }
}
```

#### After (Ontology Way):
```scss
.fade-in-section {
  @include genesis-state('scroll-triggered');
}
```

**What you get**:
- Initial: `opacity: 0`, `translateY(30px)`
- Triggered: `opacity: 1`, `translateY(0)`
- Supports trigger classes: `.aos-animate`, `.scroll-triggered`, `.is-visible`
- Respects `prefers-reduced-motion`
- Mobile: Faster (0.4s), shorter distance (20px)
- Desktop: Richer (0.7s), longer distance (30px)
- **Requires JavaScript**: Add trigger class when element enters viewport

---

### 5. Responsive Images & Embeds (v2.1.0)

#### Before (Inline Styles or Custom CSS):
```html
<div style="position: relative; padding-bottom: 56.25%;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" ...>
</div>
```

#### After (Ontology Way):

**HTML**:
```html
<div class="video-embed">
  <iframe src="..."></iframe>
</div>
```

**SCSS**:
```scss
.video-embed {
  @include genesis-entity('embed-responsive');
}
```

**What you get**:
- Maintains 16:9 aspect ratio
- No inline styles needed
- Works for iframes, videos, embeds

#### Responsive Images:
```scss
.hero-image {
  @include genesis-entity('image-adaptive');
}
```

**What you get**:
- Maintains aspect ratio during load
- `object-fit: cover` for proper sizing
- Responsive wrapper

---

## Migration Checklist

### Phase 1: Update Theme (Automatic Improvements)
- [ ] Update `_config.yml` theme version to v2.1.0 or v2.2.0
- [ ] Test site on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Verify touch targets are now 44x44px on mobile
- [ ] Verify typography is readable on all devices
- [ ] Verify grids adapt properly at all breakpoints

### Phase 2: Adopt New Variants (Opt-In Enhancements)
- [ ] Refactor navigation to use `genesis-environment('navigation-primary')`
- [ ] Refactor forms to use `genesis-environment('interaction-form')` and `genesis-synapse('input-primary')`
- [ ] Refactor hero sections to use `genesis-atmosphere('viewport-aware')`
- [ ] Refactor scroll animations to use `genesis-state('scroll-triggered')`
- [ ] Refactor embedded media to use `genesis-entity('embed-responsive')`
- [ ] Remove inline styles and custom breakpoint logic
- [ ] Remove Bootstrap utility classes where applicable

### Phase 3: Testing
- [ ] Test on mobile Safari (iOS) - verify no zoom on input focus
- [ ] Test on Android Chrome - verify touch targets work well
- [ ] Test keyboard navigation (Tab, Enter, Space)
- [ ] Test screen reader (navigate links, forms, buttons)
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Verify Lighthouse scores (Performance, Accessibility)

### Phase 4: Documentation
- [ ] Update subdomain README with new variants used
- [ ] Document any JavaScript required (nav toggle, scroll observers)
- [ ] Add comments explaining semantic intent of each variant

---

## JavaScript Requirements

Some variants require JavaScript for full functionality:

### Navigation Drawer Toggle
```javascript
// Toggle mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  navigation.classList.toggle('nav-open');
});
```

### Scroll-Triggered Animations
```javascript
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Trigger once
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(el => {
  observer.observe(el);
});
```

---

## Common Questions

### Q: Do I have to migrate everything at once?
**A**: No! The enhancements are **non-breaking**. Automatic improvements apply immediately, and you can adopt opt-in variants gradually during normal refactoring.

### Q: What if I have custom responsive logic?
**A**: Keep it if it works! The ontology provides **semantic patterns** for common use cases. If your custom logic serves a unique need, maintain it. Consider proposing a new ontological variant if the pattern is universal.

### Q: Can I mix old and new patterns?
**A**: Yes! The system is backward compatible. You can have some components using Bento/Material classes and others using the new responsive variants.

### Q: How do I know which variant to use?
**A**: Think **semantically**:
- "Is this navigation?" → `genesis-environment('navigation-primary')`
- "Is this a form for data entry?" → `genesis-environment('interaction-form')`
- "Is this a hero section?" → `genesis-atmosphere('viewport-aware')`
- "Does this animate on scroll?" → `genesis-state('scroll-triggered')`

### Q: What about older browsers?
**A**: Modern features degrade gracefully:
- `dvh` falls back to `vh`
- CSS Grid falls back to block layout
- Glassmorphism falls back to solid backgrounds
- All features tested in Chrome, Firefox, Safari, Edge

---

## Examples & References

**Complete API Reference**: See `_sass/ontology/INTEGRATION-GUIDE.md`  
**Implementation Examples**: See `theme-pr-ontology-enhancements/IMPLEMENTATION_EXAMPLES.md`  
**Visual Guide**: See `theme-pr-ontology-enhancements/VISUAL_GUIDE.md`  
**Changelog**: See `CHANGELOG.md` for all v2.1.0 and v2.2.0 changes

---

## Support

**Found a responsive pattern not covered?**
1. Review existing variants in [INTEGRATION-GUIDE.md](_sass/ontology/INTEGRATION-GUIDE.md)
2. Try combining existing mixins
3. Create [Ontological Proposition](.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md)
4. Submit to theme repository

**Questions or issues?**
- Check `GENOME.md` for variant history and rationale
- Review `evolution.md` for philosophical foundation
- Create issue in theme repository with label `responsive-design`

---

**Last Updated**: 2026-01-19  
**Theme Version**: v2.2.0  
**Migration Difficulty**: Easy (mostly automatic)
