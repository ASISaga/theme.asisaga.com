# CSS Size Optimization Guide

## Problem

The compiled CSS is 14MB (332k lines) with 36,641 selectors because:
1. All 75+ components are imported globally
2. Many components are never used on typical pages
3. No minification or optimization applied
4. Container queries expanded selector count (though reduced duplication)

## Root Cause Analysis

- **Container query migration** reduced media queries 98.5% (9,321 → 138) ✅
- **BUT** the raw number of components and selectors remained the same
- **36,641 selectors** create 14MB of uncompressed CSS
- Most selectors are from unused components

## Solution: PostCSS Optimization Pipeline

### Step 1: Install PostCSS Tools

```bash
npm install --save-dev \
  postcss postcss-cli cssnano \
  postcss-sort-media-queries \
  @fullhuman/postcss-purgecss
```

Or use the provided package file:
```bash
cp package-postcss.json package.json
npm install
```

### Step 2: Build Optimized CSS

```bash
# Compile SCSS to CSS
npm run build:css

# Optimize with PostCSS
npm run optimize:css

# Or do both
npm run build:optimize
```

### Step 3: Expected Results

**Before Optimization:**
- Size: 14MB uncompressed
- Lines: 332,310
- Selectors: 36,641
- Gzipped: ~2-3MB

**After PostCSS Optimization:**
- Size: 3-5MB uncompressed (60-70% reduction)
- Lines: ~100k-150k
- Selectors: Deduplicated and minified
- Gzipped: ~800KB-1.2MB

**With PurgeCSS (production):**
- Size: 1-2MB uncompressed (85-90% reduction)
- Only includes CSS actually used in HTML
- Gzipped: ~300-500KB

## Alternative: Component Lazy Loading

For more granular control, use the component groups:

1. **Core only** (2-3MB): `@import "core"`
2. **+ Content** (4-5MB): `@import "core"; @import "components-content"`
3. **+ Products** (6-7MB): Add `@import "components-products"`
4. **+ Sacred** (9-10MB): Add `@import "components-sacred"`
5. **Full** (14MB): `@import "common"`

Edit `assets/css/style.scss` to choose what to load.

## Recommended Workflow

### Development
Use full CSS for ease of development:
```scss
@import "common";
```

### Production
Use PostCSS optimization:
```bash
npm run build:optimize
```

Then link to `style.min.css` instead of `style.css`.

## Performance Impact

**Current (14MB uncompressed):**
- Gzipped: ~2-3MB
- Load time: ~1-2s on fast connection
- Not ideal but acceptable

**Optimized (3-5MB uncompressed):**
- Gzipped: ~800KB-1.2MB  
- Load time: ~300-600ms on fast connection
- Good performance

**With PurgeCSS (1-2MB uncompressed):**
- Gzipped: ~300-500KB
- Load time: ~150-300ms on fast connection
- Excellent performance

## Implementation Priority

1. **High Priority**: PostCSS minification (cssnano + sort-media-queries)
   - Easy to implement
   - 60-70% size reduction
   - No risk of breaking styles

2. **Medium Priority**: Component lazy loading
   - Requires careful testing
   - Good for very large sites
   - More maintenance overhead

3. **Low Priority**: PurgeCSS
   - Risk of removing needed styles
   - Requires comprehensive safelist
   - Best for production only

## Files Created

- `package-postcss.json` - NPM dependencies
- `postcss.config.js` - PostCSS configuration  
- `_sass/_core.scss` - Minimal core styles
- `_sass/_components-*.scss` - Component groups

## Next Steps

1. Run `npm install` with package-postcss.json
2. Run `npm run build:optimize`
3. Test the minified CSS
4. Update deployment to use minified version

---

**Note**: The container query migration was successful in reducing architectural complexity. The file size issue is a separate concern addressed by build-time optimization, not runtime architecture.
