# Mobile "White Pillar" Layout Fix - Summary

## Problem Solved

The layout was exhibiting a "White Pillar" effect on mobile devices where:
- Genesis Blocks section with white/vibrant atmosphere background
- Inner `.container` element applying horizontal padding via `genesis-environment('focused')`
- Background "pinched" by padding, creating black gutters at viewport edges
- Result: White background column in center with black bars on sides (pillar effect)

## Technical Root Cause

```
Before Fix:
┌────────────────────────────────────┐ Viewport
│ ██                             ██ │ Black (body background)
│ ██ ┌─────────────────────┐ ██ │
│ ██ │ White Background    │ ██ │ <- Pinched!
│ ██ │ (Section Atmosphere)│ ██ │
│ ██ │   Content Padding   │ ██ │
│ ██ └─────────────────────┘ ██ │
│ ██                             ██ │
└────────────────────────────────────┘
   ^                              ^
   Container padding (1.5rem) creates black gutters
```

The `.container` class uses `@include genesis-environment('focused')` which applies:
```scss
padding-inline: var(--padding-inline, clamp(1rem, 3vw, 2rem));
```

This creates a "choke point" where:
1. CSS backgrounds extend behind the padding
2. But content stays inside the padding
3. Result: White atmosphere visible but constrained by padding

## Solution Implemented

De-coupled atmosphere from layout padding using the pattern:
**Atmosphere = Viewport Width (100%); Entities = Content Width (Viewport - Gutters)**

```
After Fix:
┌────────────────────────────────────┐ Viewport
│ White Background (Full Bleed)      │ <- Reaches edges!
│ ┌────────────────────────────────┐ │
│ │  Content with proper padding   │ │
│ │  (Genesis Blocks Wrapper)      │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
   ^                                ^
   No black gutters - atmosphere extends to viewport
```

### Code Changes

**File: `_sass/components/sacred/_genesis-blocks.scss`**

1. **Section De-coupling** - Ensure atmosphere can reach edges:
```scss
.genesis-blocks-section {
  @include section-spacing-large;
  position: relative;
  
  // DE-COUPLED ATMOSPHERE PATTERN
  width: 100%;
  margin-inline: 0;
  padding-inline: 0;  // No horizontal padding on atmosphere carrier
  
  // Override container padding to prevent white pillar
  .container {
    position: relative;
    z-index: 2;
    padding-inline: 0;  // Remove padding from container
    max-width: none;
  }
}
```

2. **New Wrapper Class** - Apply padding to content, not atmosphere:
```scss
.genesis-blocks-wrapper {
  // Horizontal padding for content safety (mobile-first)
  padding-inline: clamp(1rem, 3vw, 2rem);
  
  // Max width constraint for readability
  max-width: 1200px;
  margin-inline: auto;
  
  // Ensure full width usage within max-width
  width: 100%;
}
```

## Usage Pattern Change

### Before (Broken):
```html
<section class="genesis-blocks-section">
  <div class="container">  <!-- padding-inline pinches atmosphere -->
    <div class="genesis-blocks">
      <article class="genesis-block">...</article>
    </div>
  </div>
</section>
```

### After (Fixed):
```html
<section class="genesis-blocks-section">
  <div class="genesis-blocks-wrapper">  <!-- padding only for content -->
    <div class="genesis-blocks">
      <article class="genesis-block">...</article>
    </div>
  </div>
</section>
```

## Key Benefits

1. **Full-Bleed Atmosphere**: White/colored backgrounds now extend to viewport edges
2. **Proper Content Padding**: Touch-friendly spacing maintained via wrapper
3. **Clean Mobile Experience**: No more black gutters/"pillar" effect
4. **Semantic Architecture**: Clear separation between atmosphere and content boundaries
5. **Backward Compatible**: Old `.container` usage still works, just not optimal

## Testing

A comprehensive test page was created: `mobile-white-pillar-test.html`

Test demonstrates:
- **BEFORE**: Section using `.container` - shows white pillar with black gutters
- **AFTER**: Section using `.genesis-blocks-wrapper` - shows full-bleed white

To test:
1. Open `mobile-white-pillar-test.html` in browser
2. Resize to mobile width (375px) or use DevTools device emulation
3. Compare the two sections
4. Red dashed lines show viewport edges for reference

## Architectural Pattern

This fix implements the **"Constrained Entity / Unconstrained Atmosphere"** pattern:

- **Atmosphere Carrier** (Section): No horizontal padding, full viewport width
- **Content Wrapper** (Wrapper): Horizontal padding for touch safety
- **Entity Elements** (Blocks/Cards): Inherit padding from wrapper

This ensures:
- Backgrounds/atmospheres can bleed to edges when desired
- Content maintains proper spacing for readability
- Touch targets meet WCAG 2.5.5 requirements (44px minimum)

## Related Files

- `_sass/components/sacred/_genesis-blocks.scss` - Main implementation
- `_sass/ontology/engines/_environment.scss` - Environment mixin definitions
- `_sass/ontology/engines/_atmosphere.scss` - Atmosphere mixin definitions
- `mobile-white-pillar-test.html` - Visual test/demonstration

## Migration Notes

For existing implementations:
1. Replace `<div class="container">` with `<div class="genesis-blocks-wrapper">`
2. Or keep `.container` if you want the constrained look (not recommended for atmosphere sections)
3. Test on mobile to verify full-bleed effect

No breaking changes - existing markup still works, just not optimal.
