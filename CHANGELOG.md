# Changelog

All notable changes to the Genesis Ontological Design System theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-01-18

### Added - Advanced Responsive Patterns

**Origin**: www.asisaga.com subdomain responsive design analysis

#### Navigation Environment Variants
- `genesis-environment('navigation-primary')` - Main site navigation with mobile drawer pattern
  - Desktop: Horizontal sticky header
  - Mobile: Off-canvas drawer with glassmorphism
  - Touch-optimized spacing
  
- `genesis-environment('navigation-secondary')` - Contextual navigation (breadcrumbs, footer nav)
  - Responsive visibility and condensing

#### Form Interaction Variants
- `genesis-environment('interaction-form')` - Responsive form layouts
  - Mobile: Single-column clarity
  - Desktop: Multi-column efficiency
  
- `genesis-synapse('input-primary')` - Touch-optimized form inputs
  - Mobile: 44px minimum height (WCAG 2.1 compliant)
  - Desktop: 40px height
  - 16px font size (prevents iOS zoom)
  - Built-in states: hover, focus, disabled, error

#### Viewport & Scroll Variants
- `genesis-state('scroll-triggered')` - Scroll-based animations
  - Opacity and transform on scroll into view
  - Respects `prefers-reduced-motion`
  - Mobile: Faster animations (0.4s)
  - Desktop: Richer animations (0.7s)
  
- `genesis-atmosphere('viewport-aware')` - Dynamic viewport height for hero sections
  - Uses `dvh` for mobile browser chrome
  - Mobile: 70vh, Tablet: 85vh, Desktop: 100vh
  - Auto-adjusts for short viewports

### Enhanced
- Content density atmosphere variants with responsive spacing
- All environment variants now fully responsive by default

### Documentation
- Updated `GENOME.md` with complete v2.2.0 variant history
- Updated `_sass/ontology/INTEGRATION-GUIDE.md` with usage examples
- Added implementation examples to `_sass/ontology/_sample.scss`

### Files Modified
- `_sass/ontology/_engines.scss` - All new variant implementations
- `_sass/ontology/_interface.scss` - Public API updates

### Breaking Changes
None - All changes are additive enhancements.

---

## [2.1.0] - 2026-01-18

### Added - Core Responsive Design Foundation

**Origin**: www.asisaga.com subdomain responsive design analysis

#### Touch-Optimized Interactions (CRITICAL - WCAG 2.1 Compliance)
Enhanced all `genesis-synapse` variants with responsive touch targets:
- `navigate`: 44x44px minimum with expanded tap zone on mobile
- `execute`: 44x44px minimum on mobile, 42px on tablet
- `inquiry`: 44x44px minimum on mobile  
- `destructive`: 44x44px minimum on mobile
- `social`: 44x44px on mobile, 36x36px on desktop

**Impact**: Fixes all WCAG touch target violations across all subdomains automatically.

#### Responsive Typography Scaling
Enhanced all `genesis-cognition` variants with explicit mobile breakpoints:
- `axiom`: 32px mobile → 40px tablet → 56px desktop
- `discourse`: 16px minimum on mobile (prevents iOS zoom)
- `protocol`: 14px minimum for code readability
- `gloss`: 14px minimum for accessibility
- `motive`: 16px minimum on mobile
- `quantum`: 12px for tags (acceptable for non-primary content)

**Impact**: Improved mobile readability, prevents iOS zoom on form inputs.

#### Semantic Grid Breakpoint Controls
Enhanced `genesis-environment` grid variants with responsive behavior:
- `distributed`: Mobile (1 col) → Tablet (2 cols) → Desktop (auto-fit, min 300px) → Ultrawide (max 4 cols, 1600px width)
- `manifest`: Mobile (2 cols) → Tablet (6 cols) → Desktop (12 cols)

**Impact**: Consistent responsive grid behavior without custom breakpoint logic in subdomains.

#### Semantic Media Responsiveness
- `genesis-entity('image-adaptive')` - Responsive images with aspect ratio preservation
  - Maintains 16:9 aspect ratio during load
  - Uses `object-fit: cover` for proper sizing
  
- `genesis-entity('embed-responsive')` - Responsive iframes and embeds
  - Maintains aspect ratio for videos, maps, embeds
  - Eliminates need for inline styles
  - Default 16:9 aspect ratio

**Impact**: Fixes oversized image instances, provides semantic media handling.

### Documentation
- Updated `GENOME.md` with v2.1.0 variant history and origin stories
- Updated `_sass/ontology/INTEGRATION-GUIDE.md` with new variant documentation
- Created comprehensive documentation in `/theme-pr-ontology-enhancements/` directory

### Files Modified
- `_sass/ontology/_engines.scss` - All responsive enhancements

### Breaking Changes
None - All changes improve existing behavior or are additive.

---

## [2.0.0] - Prior to 2026-01-18

### Genesis Ontological Design System - Initial Implementation

**Complete three-tier semantic SCSS architecture**:

#### Six Ontological Categories
1. **`genesis-environment($logic)`** - Spatial organization (5 variants)
2. **`genesis-entity($nature)`** - Visual presence (6 variants)
3. **`genesis-cognition($intent)`** - Information type (6 variants)
4. **`genesis-synapse($vector)`** - Interaction patterns (5 variants)
5. **`genesis-state($condition)`** - Temporal state (5 variants)
6. **`genesis-atmosphere($vibe)`** - Sensory texture (4 variants)

#### Architecture
- Three-tier separation: Content (HTML) → Interface (SCSS mixins) → Engine (CSS properties)
- Zero raw CSS principle for subdomains
- Single source of truth for all visual styling
- Complete design token system with OKLCH color space

#### Backward Compatibility
- Bento Engine layout system
- Material Design glassmorphism primitives
- Bootstrap utility compatibility layer

#### Documentation System
- `GENOME.md` - Evolutionary history tracker
- `evolution.md` - Philosophical foundation
- Agent-based ontological evolution workflow
- Complete API reference and integration guides

#### Components & Layouts
- Comprehensive component library
- Responsive layout system
- Accessibility-first approach
- Performance-optimized implementations

---

## Format Notes

### Change Types
- **Added**: New features or variants
- **Changed**: Changes to existing functionality
- **Deprecated**: Features marked for future removal
- **Removed**: Features that have been removed
- **Fixed**: Bug fixes
- **Enhanced**: Improvements to existing features
- **Security**: Security-related changes

### Origin Attribution
When a change originates from a subdomain ontological proposition, it is noted with:
- **Origin**: [subdomain-name].asisaga.com
- **Proposal**: Link to proposal documentation if applicable

---

**Current Version**: v2.2.0  
**Status**: Production Ready  
**Last Updated**: 2026-01-19
