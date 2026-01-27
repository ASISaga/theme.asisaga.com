# Scroll Jitter and Header Height Fix - Technical Summary

## Problem Statement
Subdomains using Jekyll layouts from the theme were experiencing:
1. **Jittery scroll behavior** - Page scrolling felt janky and not smooth
2. **Inconsistent header height** - Header height was not stable, causing layout shifts

## Root Cause Analysis

### Jittery Scroll
The jitter was caused by a combination of factors:

1. **Conflicting smooth scroll**: The `html` element had `scroll-behavior: smooth` which conflicted with the header's transform animations
2. **Inefficient transform**: Header was using 2D `translateY(-100%)` instead of hardware-accelerated `translate3d()`
3. **Missing hardware acceleration hints**: No `will-change` or `backface-visibility` properties
4. **Scroll handler inefficiency**: The scroll handler was updating `lastScroll` on every frame, causing more frequent class changes than necessary

### Header Height Issues
The header height was inconsistent due to:

1. **No minimum height**: The header relied only on padding for its height, which could cause layout shifts
2. **Missing CSS custom properties**: `--padding-nav` and `--space-nav` tokens were referenced but not defined, causing fallback values to be used

## Solutions Implemented

### 1. CSS Token Definitions (_sass/ontology/_tokens.scss)
Added missing CSS custom properties:
```scss
--padding-nav: clamp(1rem, 2vw, 1.5rem);
--space-nav: clamp(1rem, 2vw, 2rem);
```

### 2. Header Component Improvements (_sass/components/_header.scss)
```scss
.site-header {
  // Fixed minimum height to prevent layout shifts
  min-height: 70px;
  
  // Hardware acceleration for smoother transitions
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  
  // Improved transition timing
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
  
  &.header-hidden {
    // Use 3D transform for hardware acceleration
    transform: translate3d(0, -100%, 0);
  }
}
```

**Benefits**:
- `min-height: 70px` prevents layout shifts during scroll
- `will-change: transform` tells browser to optimize for transform animations
- `backface-visibility: hidden` enables GPU acceleration
- `translate3d()` instead of `translateY()` uses GPU compositing
- `cubic-bezier(0.4, 0, 0.2, 1)` provides a more natural easing curve

### 3. Scroll Handler Optimization (assets/js/common/header-scroll.js)
```javascript
// Only update lastScroll when threshold is met
if (Math.abs(scrollDiff) > hideThreshold) {
  // Apply hide/show logic
  lastScroll = currentScroll;
}

// Reset ticking flag immediately after handling
ticking = false;

// Use passive event listener
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });
```

**Benefits**:
- Only updates `lastScroll` when threshold is exceeded, reducing unnecessary class toggles
- Passive event listener improves scroll performance (browser doesn't wait for JS)
- Early `ticking` reset ensures no frames are skipped

### 4. Ambient Layer Adjustment (_sass/base/_ambient-layer.scss)
```scss
html {
  // Disable smooth scroll to prevent conflicts
  scroll-behavior: auto;
  
  // Allow opt-in smooth scroll when needed
  &.smooth-scroll {
    scroll-behavior: smooth;
  }
}
```

**Benefits**:
- Removes conflict between CSS smooth scroll and JS-driven header animations
- Provides opt-in smooth scroll for anchor links when desired
- Allows header animations to control their own timing

## Performance Improvements

### Before
- **Scroll jank**: Visible stuttering during scroll, especially on mobile
- **Layout shifts**: Header height changing during scroll transitions
- **Conflicting animations**: CSS smooth scroll fighting with JS header animations
- **CPU-bound transforms**: 2D transforms using CPU instead of GPU

### After
- **Smooth scrolling**: Hardware-accelerated animations using GPU
- **Stable layout**: Consistent 70px minimum header height
- **Independent animations**: Header scroll separate from page scroll behavior
- **GPU compositing**: 3D transforms offloaded to graphics hardware

## Testing Recommendations

### Manual Testing
1. Open `scroll-test.html` in a browser
2. Scroll down and up repeatedly
3. Verify header hides/shows smoothly
4. Check scroll indicator shows correct state
5. Test on multiple viewport sizes (375px, 768px, 1440px)
6. Test on mobile devices (iOS Safari, Chrome Android)

### Key Metrics to Verify
- Header maintains minimum 70px height
- No visible jitter during scroll
- Header appears/disappears smoothly
- No layout shifts when header state changes
- Scroll feels responsive and natural

### Browser Testing
- Chrome/Edge (Blink engine)
- Firefox (Gecko engine)
- Safari (WebKit engine)
- Mobile browsers (iOS Safari, Chrome Android)

## Browser Compatibility

All changes use well-supported CSS and JavaScript:
- `translate3d()` - Supported in all modern browsers since IE10
- `will-change` - Supported in all modern browsers since 2015
- `backface-visibility` - Supported with prefixes since 2012
- `cubic-bezier()` - Supported in all modern browsers
- Passive event listeners - Supported since Chrome 51, Firefox 49, Safari 10

## Files Modified

1. `_sass/ontology/_tokens.scss` - Added missing CSS custom properties
2. `_sass/components/_header.scss` - Added min-height and hardware acceleration
3. `assets/js/common/header-scroll.js` - Optimized scroll detection and event handling
4. `_sass/base/_ambient-layer.scss` - Changed scroll-behavior to prevent conflicts

## Files Added

1. `scroll-test.html` - Interactive test page for verifying scroll behavior

## Migration Notes

These changes are **fully backward compatible**:
- No HTML changes required
- Existing layouts continue to work
- CSS custom properties use fallback values
- JavaScript improvements are transparent to users

Subdomains using the theme will automatically benefit from these improvements with no code changes required.
