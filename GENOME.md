# 🧬 Genesis Genome - Evolutionary History

**System**: Genesis Semantic Design System  
**Repository**: theme.asisaga.com  
**Inception**: 2025-Q4  
**Current Version**: 4.0.0  
**Last Updated**: 2026-02-08

---

## 📖 About This Document

This GENOME.md tracks the **evolutionary history** of the Genesis Semantic SCSS Engine. Every ontological variant is documented with:

- **Origin**: Which subdomain PR proposed it
- **Intent**: Why it was needed (semantic gap)
- **Evolution**: How it has changed over time
- **Impact**: Adoption and usage metrics

This creates a **living history** of the design system's cognitive growth, showing how subdomains shaped the shared ontology.

---

## 🌟 Foundational Architecture (v1.0 - 2025-Q4)

### Initial Release - Six Ontological Categories

The Genesis Semantic Engine launched with a three-tier architecture and six core categories:

#### 1. Environment (Spatial Logic) - 5 variants
- `distributed` - Auto-fit Bento grid for autonomous entities
- `focused` - Single-column reading layout (max 70ch)
- `associative` - Flexbox network for connected content
- `chronological` - Vertical timeline/feed stream
- `manifest` - 12-column dashboard grid

**Design Intent**: Separate layout logic from visual styling, enable semantic spatial organization.

#### 2. Entity (Visual Presence) - 6 variants
- `primary` - Main content cards with glassmorphism
- `secondary` - Supporting content, lighter presence
- `imperative` - Urgent alerts with pulsing borders
- `latent` - Inactive/dormant content, reduced opacity
- `aggregate` - Container for multiple items
- `ancestral` - Archived/historical data, muted appearance

**Design Intent**: Represent content weight and state through visual hierarchy without raw CSS.

#### 3. Cognition (Information Type) - 6 variants
- `axiom` - Foundational headlines (2-3.5rem, bold)
- `discourse` - Standard body text (1-1.125rem, readable)
- `protocol` - Technical/code content (monospace)
- `gloss` - Annotations/metadata (0.8rem, muted)
- `motive` - Instructional/persuasive text (semibold, accent)
- `quantum` - Tags/chips (tiny, uppercase)

**Design Intent**: Typography based on semantic meaning, not arbitrary sizes.

#### 4. Synapse (Interaction Vector) - 5 variants
- `navigate` - Portal to different page (link styling)
- `execute` - Local state change/command (primary button)
- `inquiry` - Request for more data (secondary action)
- `destructive` - Permanent removal/reset (danger button)
- `social` - Social sharing connection (rounded, social colors)

**Design Intent**: Interaction intent over generic "button" or "link" classes.

#### 5. State (Temporal Condition) - 5 variants
- `stable` - Content in equilibrium (verified, normal)
- `evolving` - Currently updating/streaming (animated)
- `deprecated` - No longer current (strikethrough, warning)
- `locked` - Immutable, requires clearance (blur, lock icon)
- `simulated` - Projected/preview data (dashed border)

**Design Intent**: Represent temporal state and data confidence levels.

#### 6. Atmosphere (Sensory Texture) - 4 variants
- `neutral` - Standard system transparency (balanced)
- `ethereal` - High transparency, light (peaceful, minimal)
- `void` - Deep space, high contrast (dark, immersive)
- `vibrant` - High energy, saturated (colorful, neon)

**Design Intent**: Emotional tone and sensory experience as semantic layer.

---

## 🌱 Growth & Evolution

### v2.0.0 - Ontology System Launch (2026-01-15)

**Major Milestone**: Public release of Genesis Semantic Engine with evolutionary handshake protocol.

**Changes**:
- Formalized three-tier architecture (Content → Interface → Engine)
- Established Ontological Proposition PR process
- Created Theme Genome Agent for evolution management
- Documented all 31 variants in INTEGRATION-GUIDE.md
- Launched agent ecosystem (AGENTS.MD)

**Impact**:
- Foundation for subdomain evolution mechanism
- Enabled semantic-first development across ecosystem
- Created living genome documentation system

---

### v2.1.0 - Responsive Design Enhancements (2026-01-18)

**Milestone**: Comprehensive responsive design support across all ontological categories.

**Origin**: www.asisaga.com subdomain  
**Validation**: Static code analysis + live browser testing (24 screenshots, 6 viewports, 4 pages)  
**Issues Addressed**: 60 WCAG touch target violations, 24 performance issues, typography readability gaps

**Changes**:

1. **Touch-Optimized Synapse Variants (Proposal #6 - CRITICAL)**
   - Enhanced all `genesis-synapse` variants with WCAG 2.1 compliant touch targets
   - `navigate`: 44x44px minimum on mobile with expanded tap zone
   - `execute`: 44x44px minimum on mobile, 42px on tablet
   - `inquiry`: 44x44px minimum on mobile
   - `destructive`: 44x44px minimum on mobile
   - `social`: 44x44px on mobile, 36x36px on desktop
   - **Impact**: Fixes all 60 WCAG violations detected in live testing

2. **Responsive Typography (Proposal #4 - HIGH PRIORITY)**
   - Enhanced all `genesis-cognition` variants with explicit mobile breakpoints
   - `axiom`: 32px mobile → 40px tablet → 56px desktop
   - `discourse`: 16px minimum on mobile (prevents iOS zoom)
   - `protocol`: 14px minimum for code readability
   - `gloss`: 14px minimum for accessibility
   - `motive`: 16px minimum on mobile
   - `quantum`: 12px acceptable for tags (non-primary content)
   - **Impact**: Improves readability across all viewport sizes

3. **Responsive Grid Behavior (Proposal #7 - HIGH PRIORITY)**
   - Enhanced `genesis-environment('distributed')` with responsive breakpoints
   - Mobile (≤767px): Single column for clarity
   - Tablet (768-1023px): 2 columns
   - Desktop (≥1024px): Auto-fit with 300px minimum
   - Ultrawide (≥1920px): Cap at 4 columns, max 1600px width
   - Enhanced `genesis-environment('manifest')` for dashboard grids
   - Mobile: 2-column simplified layout
   - Tablet: 6-column grid
   - Desktop: Full 12-column grid
   - **Impact**: Consistent responsive grid behavior across all subdomains

4. **Media Responsiveness (Proposal #5 - MEDIUM PRIORITY)**
   - Added `genesis-entity('image-adaptive')` for responsive images
   - Maintains 16:9 aspect ratio during load
   - Supports object-fit for proper sizing
   - Added `genesis-entity('embed-responsive')` for iframe/video embeds
   - Maintains aspect ratio across viewports
   - Eliminates need for inline styles
   - **Impact**: Fixes 24 oversized image instances, improves performance

5. **Content Density Variants (Proposal #3 - MEDIUM PRIORITY)**
   - Added `genesis-atmosphere('spacious-mobile')` for generous mobile spacing
   - Mobile: 3rem padding, 2.5rem margins
   - Tablet: 2.5rem padding, 2rem margins
   - Desktop: 2rem padding, 1.5rem margins
   - Added `genesis-atmosphere('dense-desktop')` for high-density layouts
   - Mobile: Single column, simple
   - Tablet: 2-column grid
   - Desktop: Auto-fit grid, min 250px
   - Ultrawide: Cap at 4 columns
   - **Impact**: Better mobile UX with touch-friendly spacing, efficient desktop layouts

**Semantic Purity Maintained**:
- ✅ Zero raw CSS in subdomains (all responsive behavior in theme mixins)
- ✅ Semantic class names in HTML unchanged
- ✅ Three-tier architecture preserved
- ✅ Non-breaking changes (enhancements to existing variants)
- ✅ Universal applicability (benefits all subdomains)

**Testing Results**:
- SCSS compilation: ✅ Passed
- Stylelint: ✅ Passed (18 pre-existing nesting warnings in other files)
- Live browser validation: 24 screenshots across 6 viewports
- WCAG 2.1 compliance: Touch targets now 44x44px minimum
- Typography: 16px minimum on mobile for primary content

**Migration Path**:
- **Non-breaking**: All enhancements improve existing behavior automatically
- **Opt-in**: New variants like `image-adaptive`, `spacious-mobile` are optional
- **Auto-enhanced**: Touch targets and typography improve without subdomain changes
- **Documentation**: Updated INTEGRATION-GUIDE.md with new variants and examples

**Adoption Forecast**:
- Immediate benefit: All existing subdomains get responsive touch targets and typography
- Optional adoption: Subdomains can refactor to use new media/density variants
- Best practices: All new subdomains start with complete responsive toolkit

---

### v2.2.0 - Advanced Responsive Patterns (2026-01-18)

**Milestone**: Implementation of deferred proposals - navigation, forms, and viewport awareness.

**Origin**: www.asisaga.com subdomain (deferred from v2.1.0)  
**Trigger**: User request to implement all proposals with breaking changes acceptable  
**Breaking Changes**: Configurable aspect ratios may require CSS custom property updates

**Changes**:

1. **Responsive Navigation Environment (Proposal #1)**
   - Added `genesis-environment('navigation-primary')` for main site navigation
   - Desktop: Horizontal sticky header with flex layout
   - Mobile: Off-canvas drawer (80% width, slide-in from left)
   - Includes glassmorphism styling on mobile drawer
   - Touch-optimized spacing (44px minimum)
   - Added `genesis-environment('navigation-secondary')` for contextual navigation
   - Desktop/Tablet: Full visibility with appropriate sizing
   - Mobile: Minimal representation with optional hiding via `.secondary-only` class
   - **Impact**: Consistent navigation patterns across all subdomains

2. **Form Interaction Environment (Proposal #2)**
   - Added `genesis-environment('interaction-form')` for form layouts
   - Mobile: Single-column for clarity
   - Tablet: 2-column auto-fit (min 250px)
   - Desktop: Multi-column auto-fit (min 300px)
   - Built-in label styling and full-width support via `.form-full-width` class
   - Added `genesis-synapse('input-primary')` for form inputs
   - Mobile: 44px minimum height (WCAG compliant)
   - Tablet: 42px height
   - Desktop: 40px height
   - 16px font size to prevent iOS zoom
   - Built-in states: hover, focus, disabled, invalid/error
   - **Impact**: Professional form UX out of the box, no custom styling needed

3. **Scroll & Viewport Awareness (Proposal #8)**
   - Added `genesis-state('scroll-triggered')` for scroll animations
   - Initial state: opacity 0, translateY(30px)
   - Triggered state: opacity 1, translateY(0)
   - Supports multiple trigger classes: `.aos-animate`, `.scroll-triggered`, `.is-visible`
   - Respects `prefers-reduced-motion` (accessibility)
   - Mobile: Faster animations (0.4s), shorter distance (20px)
   - Desktop: Richer animations (0.7s), longer distance (30px)
   - Added `genesis-atmosphere('viewport-aware')` for hero sections
   - Uses dynamic viewport height (dvh) for mobile browser chrome
   - Mobile: 70vh minimum (accounts for address bar)
   - Tablet: 85vh minimum
   - Desktop: 100vh full viewport
   - Auto-adjusts on short viewports (<600px height)
   - **Impact**: Modern scroll effects and viewport-filling sections

4. **Enhanced Media Responsiveness (Open Question Resolution)**
   - Enhanced `genesis-entity('image-adaptive')` with configurable aspect ratios
   - Default: 16:9 (56.25%)
   - Configurable via `--aspect-ratio` CSS custom property
   - Convenience classes: `.ratio-square`, `.ratio-4-3`, `.ratio-21-9`, `.ratio-portrait`
   - Enhanced `genesis-entity('embed-responsive')` with configurable aspect ratios
   - Default: 16:9 (56.25%)
   - Configurable via `--aspect-ratio` CSS custom property
   - Convenience classes: `.ratio-square`, `.ratio-4-3`, `.ratio-21-9`, `.ratio-9-16`
   - **Breaking Change**: Subdomains using custom aspect ratios must now use CSS custom properties
   - **Impact**: Flexible aspect ratios for all media types

**New Variants Added**: 5 total
- 3 environment variants: `navigation-primary`, `navigation-secondary`, `interaction-form`
- 1 synapse variant: `input-primary`
- 1 state variant: `scroll-triggered`
- 1 atmosphere variant: `viewport-aware`

**Enhanced Variants**: 2 total
- `image-adaptive`: Now supports configurable aspect ratios
- `embed-responsive`: Now supports configurable aspect ratios

**Breaking Changes**:
- ⚠️ Custom aspect ratios now require CSS custom property `--aspect-ratio` instead of fixed values
- ⚠️ Navigation drawer requires JavaScript for `.nav-open` class toggle
- ⚠️ Scroll-triggered animations require JavaScript to add trigger classes

**Migration Guide**:
```scss
// Before (v2.1.0):
.my-image-container {
  @include genesis-entity('image-adaptive');
  // Fixed 16:9 aspect ratio
}

// After (v2.2.0):
.my-image-container {
  @include genesis-entity('image-adaptive');
  --aspect-ratio: 75%; // Custom 4:3 aspect ratio
}
// OR use convenience class:
.my-image-container.ratio-4-3 {
  @include genesis-entity('image-adaptive');
}
```

**Testing Results**:
- SCSS compilation: ✅ Passed
- Stylelint: ✅ Passed (18 pre-existing nesting warnings in other files)
- All new variants compile successfully
- Backward compatible except for custom aspect ratios

**Documentation Updates**:
- INTEGRATION-GUIDE.md: Added all 5 new variants with examples
- Interface documentation: Updated all 4 categories
- Engine implementations: Added 5 new variants + enhanced 2

---

### v3.0.0 - Transcendent Refactor (2026-02-07)

**Milestone**: Significantly enhanced futuristic appearance of header, footer, and navigation.

**Origin**: theme.asisaga.com (all subdomains)  
**Validation**: SCSS compilation clean, CodeQL 0 alerts

**Changes**:
- Scroll-aware header with condensed state (`.scrolled`, `.header-hidden`)
- Consciousness borders connecting header and footer
- Deep void aesthetics in footer and ambient layers
- Uppercase tracked typography for navigation precision
- Center-aligned dropdown menus with emergence animation
- New `entity('surface-glass')` variant for dark glassmorphism headers

**Breaking Changes**: Header height (70→64px), max-width (1600→1440px), dropdown positioning, animation names. See `CHANGELOG-v3.0.md` for full migration tables.

---

### v4.0.0 - Ontological Transcendence (2026-02-08)

**Milestone**: Deepened the ontological library with 10 new semantic variants aligned to ASI Saga's transcendent purpose.

**Origin**: theme.asisaga.com (ontological evolution)  
**Validation**: SCSS compilation clean, all 41+ variants compile

**New Variants**:

1. **`cognition('oracle')`** - AI-generated or predictive content typography
   - Distinguishes machine-generated insights from human prose
   - Italic sans-serif with neon blue left accent border

2. **`cognition('testimony')`** - Quoted speech, testimonials, attributed statements
   - Pull-quotes, user testimonials, attributed citations
   - Italic serif with gold decorative opening quote

3. **`entity('transcendent')`** - Sacred, mission-critical prominence
   - Hero sections, genesis-level content, ASI Saga mission statements
   - Deep void background with consciousness border and dual glow

4. **`entity('ephemeral')`** - Transient, auto-dismissing content
   - Toast notifications, temporary alerts, flash messages
   - Animated entry/exit with reduced-motion support

5. **`state('emerging')`** - Newly created, fresh content
   - New posts, recent additions, just-published items
   - Green life-indicator dot with subtle glow

6. **`state('transcending')`** - In transformative transition
   - AI processing states, genesis-level transformations
   - Flowing gradient animation across content

7. **`synapse('invoke')`** - AI/generative action trigger
   - Prompt submission, model invocation, genesis triggers
   - Gradient background with consciousness border

8. **`synapse('consent')`** - Explicit user approval/permission
   - Cookie consent, terms acceptance, data sharing approval
   - Green affirmative border with hover fill

9. **`environment('convergent')`** - Sidebar + main content layout
   - Article with TOC, dashboard with sidebar, documentation pages
   - Responsive: stacked on mobile, sidebar+main on desktop

10. **`atmosphere('sacred')`** - Reverent, mission-critical tone
    - ASI Saga mission pages, genesis ceremony, transcendent content
    - Deep void gradient with gold consciousness thread

**Structural Enhancements**:
- Established singular `CHANGELOG.md` for theme-wide change tracking
- Enhanced `_layouts/` as primary theme usage mechanism
- Added 6 pre-built `_includes/components/` (card, alert, breadcrumb, pagination, stat, tag-list)
- Updated all layout templates with deeper ontological semantics

---

## 📊 Variant Registry

### Environment Variants

#### `distributed` 
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Auto-fit grid for autonomous content entities
- **Usage**: Blog grids, product catalogs, research paper listings
- **Adoption**: 15+ subdomains

#### `focused`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Single-column reading for long-form content
- **Usage**: Blog posts, documentation, research articles
- **Adoption**: 20+ subdomains

#### `associative`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Flexbox network for connected items
- **Usage**: Tag clouds, navigation menus, related links
- **Adoption**: 12+ subdomains

#### `chronological`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Vertical timeline/feed stream
- **Usage**: Activity feeds, changelogs, chronological archives
- **Adoption**: 8+ subdomains

#### `manifest`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: 12-column dashboard grid
- **Usage**: Analytics dashboards, monitoring panels
- **Adoption**: 5+ subdomains

#### `navigation-primary` ⭐ NEW
- **Since**: v2.2.0
- **Origin**: www.asisaga.com (Ontological Proposition #1)
- **Purpose**: Main site navigation (horizontal desktop → mobile drawer)
- **Usage**: Primary site navigation, header menus
- **Features**: Sticky header on desktop, off-canvas drawer on mobile, glassmorphism styling
- **Adoption**: 0+ subdomains (new)

#### `navigation-secondary` ⭐ NEW
- **Since**: v2.2.0
- **Origin**: www.asisaga.com (Ontological Proposition #1)
- **Purpose**: Contextual navigation (breadcrumbs, footer nav)
- **Usage**: Breadcrumb trails, section navigation, footer menus
- **Features**: Full visibility on desktop, condensed on tablet, minimal on mobile
- **Adoption**: 0+ subdomains (new)

#### `interaction-form` ⭐ NEW
- **Since**: v2.2.0
- **Origin**: www.asisaga.com (Ontological Proposition #2)
- **Purpose**: Form layout optimized for data entry
- **Usage**: Contact forms, registration forms, data entry interfaces
- **Features**: Single-column mobile, multi-column desktop, built-in label styling
- **Adoption**: 0+ subdomains (new)

#### `convergent` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Sidebar + main content layout for supported navigation
- **Usage**: Article with TOC, documentation with sidebar, dashboard with sidebar
- **Adoption**: 0+ subdomains (new)

---

### Entity Variants

#### `primary`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Main content objects with active glassmorphism
- **Usage**: Card components, content blocks, featured items
- **Adoption**: 20+ subdomains

#### `secondary`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Supporting contextual data, lighter presence
- **Usage**: Sidebars, supplementary info, metadata containers
- **Adoption**: 15+ subdomains

#### `imperative`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: System-critical urgent signals
- **Usage**: Error alerts, critical notifications, warnings
- **Adoption**: 18+ subdomains

#### `latent`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Dormant/inactive content representation
- **Usage**: Disabled features, coming soon sections, inactive states
- **Adoption**: 10+ subdomains

#### `aggregate`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Container for multiple child items
- **Usage**: Section wrappers, grouped content, collections
- **Adoption**: 12+ subdomains

#### `ancestral`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Archived/historical data with muted appearance
- **Usage**: Old blog posts, deprecated docs, version archives
- **Adoption**: 8+ subdomains

#### `image-adaptive` ⭐ NEW
- **Since**: v2.1.0
- **Origin**: www.asisaga.com (Ontological Proposition #5)
- **Purpose**: Responsive images that maintain aspect ratio
- **Usage**: Hero images, gallery items, content images
- **Features**: 16:9 aspect ratio preservation, object-fit cover, responsive wrapper
- **Adoption**: 0+ subdomains (new)

#### `embed-responsive` ⭐ NEW
- **Since**: v2.1.0
- **Origin**: www.asisaga.com (Ontological Proposition #5)
- **Purpose**: Embedded content (iframe, video) with aspect ratio maintenance
- **Usage**: YouTube embeds, Google Maps, third-party widgets
- **Features**: Eliminates inline styles, responsive 16:9 ratio, auto-sized embeds
- **Adoption**: 0+ subdomains (new)

#### `transcendent` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Sacred, mission-critical prominence for hero and genesis-level content
- **Usage**: Hero sections, ASI Saga mission statements, genesis ceremony content
- **Adoption**: 0+ subdomains (new)

#### `ephemeral` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Transient, auto-dismissing content with animated entry/exit
- **Usage**: Toast notifications, temporary alerts, flash messages
- **Adoption**: 0+ subdomains (new)

---

### Cognition Variants

#### `axiom`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Foundational headlines with high visual resonance
- **Usage**: Page titles, section headers, hero headlines
- **Adoption**: 20+ subdomains

#### `discourse`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Standard body prose, readable and balanced
- **Usage**: Paragraphs, descriptions, content text
- **Adoption**: 20+ subdomains

#### `protocol`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Technical/code content with monospace styling
- **Usage**: Code blocks, terminal output, technical specifications
- **Adoption**: 15+ subdomains

#### `gloss`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Minor annotations, citations, metadata
- **Usage**: Timestamps, bylines, footnotes, captions
- **Adoption**: 18+ subdomains

#### `motive`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Persuasive/instructional text
- **Usage**: Call-to-action text, instructional copy, prompts
- **Adoption**: 14+ subdomains

#### `quantum`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Tags, chips, micro-content
- **Usage**: Category tags, labels, badges, chips
- **Adoption**: 16+ subdomains

#### `oracle` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: AI-generated or predictive content typography
- **Usage**: Machine-generated insights, AI predictions, generative content
- **Adoption**: 0+ subdomains (new)

#### `testimony` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Quoted speech, testimonials, attributed statements
- **Usage**: Pull-quotes, user testimonials, attributed citations, reviews
- **Adoption**: 0+ subdomains (new)

---

### Synapse Variants

#### `navigate`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Portal to different page (link behavior)
- **Usage**: Text links, navigation items, read more links
- **Adoption**: 20+ subdomains

#### `execute`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Local state change or command execution
- **Usage**: Submit buttons, save actions, primary CTAs
- **Adoption**: 20+ subdomains

#### `inquiry`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Request for more information/data
- **Usage**: Search buttons, expand controls, load more
- **Adoption**: 12+ subdomains

#### `destructive`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Permanent removal or dangerous reset
- **Usage**: Delete buttons, remove actions, reset controls
- **Adoption**: 15+ subdomains

#### `social`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Social sharing connection
- **Usage**: Share buttons, social links, connect actions
- **Adoption**: 10+ subdomains

#### `input-primary` ⭐ NEW
- **Since**: v2.2.0
- **Origin**: www.asisaga.com (Ontological Proposition #2)
- **Purpose**: Primary form input with responsive touch optimization
- **Usage**: Text inputs, email fields, password fields, textareas
- **Features**: WCAG compliant touch targets, 16px font size (prevents iOS zoom), built-in states (hover, focus, disabled, error)
- **Adoption**: 0+ subdomains (new)

#### `invoke` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: AI/generative action trigger
- **Usage**: Prompt submission, model invocation, genesis triggers
- **Adoption**: 0+ subdomains (new)

#### `consent` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Explicit user approval/permission actions
- **Usage**: Cookie consent, terms acceptance, data sharing approval
- **Adoption**: 0+ subdomains (new)

---

### State Variants

#### `stable`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Content in equilibrium (verified, normal)
- **Usage**: Default state for verified content
- **Adoption**: 20+ subdomains

#### `evolving`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Currently updating or streaming
- **Usage**: Real-time data, loading states, progress indicators
- **Adoption**: 12+ subdomains

#### `deprecated`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: No longer verified or current
- **Usage**: Old API versions, outdated docs, legacy content
- **Adoption**: 8+ subdomains

#### `locked`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Immutable, requires special clearance
- **Usage**: Private content, restricted areas, premium features
- **Adoption**: 6+ subdomains

#### `simulated`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Projected/preview data, not live
- **Usage**: Demos, previews, placeholder content
- **Adoption**: 7+ subdomains

#### `scroll-triggered` ⭐ NEW
- **Since**: v2.2.0
- **Origin**: www.asisaga.com (Ontological Proposition #8)
- **Purpose**: Content with scroll-based animations
- **Usage**: Fade-in effects, parallax scrolling, reveal animations
- **Features**: Respects `prefers-reduced-motion`, mobile-optimized timing, multiple trigger class support
- **Adoption**: 0+ subdomains (new)

#### `emerging` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Newly created, fresh content indicator
- **Usage**: New posts, recent additions, just-published items
- **Adoption**: 0+ subdomains (new)

#### `transcending` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: In transformative transition (AI processing, genesis)
- **Usage**: Content undergoing fundamental change, AI processing states
- **Adoption**: 0+ subdomains (new)

---

### Atmosphere Variants

#### `neutral`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Standard balanced transparency
- **Usage**: Default atmosphere across most content
- **Adoption**: 20+ subdomains

#### `ethereal`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: High transparency, light and peaceful
- **Usage**: Reading-focused pages, documentation, calm interfaces
- **Adoption**: 15+ subdomains

#### `void`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: Deep space, high contrast, immersive
- **Usage**: Focus modes, media viewers, immersive experiences
- **Adoption**: 8+ subdomains

#### `vibrant`
- **Since**: v1.0
- **Origin**: Core architecture
- **Purpose**: High energy, data-saturated
- **Usage**: Dashboards, analytics, energetic landing pages
- **Adoption**: 10+ subdomains

#### `spacious-mobile` ⭐ NEW
- **Since**: v2.1.0
- **Origin**: www.asisaga.com (Ontological Proposition #3)
- **Purpose**: Generous spacing on mobile for touch-friendliness
- **Usage**: Hero sections, CTAs, touch-critical areas
- **Features**: 3rem padding on mobile → 2rem on desktop, responsive margins
- **Adoption**: 0+ subdomains (new)

#### `dense-desktop` ⭐ NEW
- **Since**: v2.1.0
- **Origin**: www.asisaga.com (Ontological Proposition #3)
- **Purpose**: High information density on large screens
- **Usage**: Team grids, product showcases, data dashboards
- **Features**: 1 column mobile → 2 columns tablet → auto-fit desktop (cap at 4 columns)
- **Adoption**: 0+ subdomains (new)

#### `viewport-aware` ⭐ NEW
- **Since**: v2.2.0
- **Origin**: www.asisaga.com (Ontological Proposition #8)
- **Purpose**: Content sized relative to viewport (hero sections)
- **Usage**: Hero sections, splash screens, full-height content
- **Features**: Uses dynamic viewport height (dvh), mobile browser chrome aware, auto-adjusts on short viewports
- **Adoption**: 0+ subdomains (new)

#### `sacred` ⭐ NEW
- **Since**: v4.0.0
- **Origin**: Ontological Transcendence
- **Purpose**: Reverent, mission-critical tone for transcendent content
- **Usage**: ASI Saga mission pages, genesis ceremony, transcendent content
- **Adoption**: 0+ subdomains (new)

---

## 🔮 Future Evolution

### Implemented in v2.2.0 (2026-01-18)

**Status**: ✅ Completed - All deferred proposals implemented

**Implemented from www.asisaga.com proposals**:
- ✅ Proposal #1: Responsive Navigation Environment
- ✅ Proposal #2: Form Interaction Environment
- ✅ Proposal #8: Scroll & Viewport Awareness
- ✅ Open Question: Configurable aspect ratios for media variants

**Breaking Changes**:
- Custom aspect ratios now use CSS custom properties
- Navigation drawer requires JavaScript for state management
- Scroll-triggered animations require JavaScript trigger classes

### Implemented in v2.1.0 (2026-01-18)

**Status**: ✅ Completed - Responsive design enhancements merged

**Implemented from www.asisaga.com proposals**:
- ✅ Proposal #6: Touch-Optimized Interactions (CRITICAL)
- ✅ Proposal #4: Responsive Typography Scaling (HIGH)
- ✅ Proposal #7: Grid Breakpoint Controls (HIGH)
- ✅ Proposal #5: Media Responsiveness (MEDIUM)
- ✅ Proposal #3: Content Density Variants (MEDIUM)

**Deferred for future versions**:
- ⏳ Proposal #1: Responsive Navigation Environment (needs design review)
- ⏳ Proposal #2: Form Interaction Environment (lower priority)
- ⏳ Proposal #8: Scroll & Viewport Awareness (enhancement feature)

### Proposed for v2.2 (Q2 2026)

*This section will track proposed variants under review*

**Expected patterns**:
- Navigation environment variants for mobile menu patterns
- Form interaction optimizations
- Viewport-aware atmosphere variants
- Additional state variants for edge cases

---

## 📈 Metrics & Health

### System Health (as of 2026-01-15)

- **Total Variants**: 31 across 6 categories
- **Active Subdomains**: 20+ consuming ontology
- **Zero-CSS Compliance**: Target 100% (baseline being established)
- **PR Acceptance Rate**: N/A (awaiting first propositions)
- **Documentation Coverage**: 100%

### Usage Patterns

**Most Used Categories**:
1. Environment (layout needs)
2. Entity (visual presence)
3. Cognition (typography)

**Growth Areas**:
- State variants (temporal conditions)
- Atmosphere variants (emotional tone)
- Synapse edge cases (complex interactions)

---

## 🎯 Evolutionary Goals

### Short Term (Q1 2026)
- [ ] Establish PR review cadence
- [ ] Document first evolutionary propositions
- [ ] Track subdomain adoption metrics
- [ ] Refine agent prompts based on real usage

### Medium Term (Q2-Q3 2026)
- [ ] Identify common mixin combinations (potential new variants)
- [ ] Deprecate unused variants if any
- [ ] Split bloated categories if needed
- [ ] Cross-pollinate successful patterns

### Long Term (Q4 2026+)
- [ ] Automated mixin suggestion system
- [ ] Visual regression testing
- [ ] Performance optimization
- [ ] Potential v3.0 architecture refinements

---

## 📚 Documentation Ecosystem

**Core Documents**:
- This file (GENOME.md) - Evolutionary history
- AGENTS.MD - Agent ecosystem architecture
- INTEGRATION-GUIDE.md - Complete API reference
- Refactor-agent.md - Migration workflow
- IMPLEMENTATION-SUMMARY.md - Technical status

**Agent Prompts**:
- theme-genome-agent.prompt.md - Lead architect
- subdomain-evolution-agent.prompt.md - Local intelligence
- Instruction files (html, scss, js) - Coding standards

---

## 🤝 Contributing to the Genome

### For Subdomains
1. Identify genuine semantic gap
2. Review existing 31 variants
3. Try combining mixins first
4. Use Ontological Proposition PR template
5. Engage with Theme Genome Agent feedback

### For Theme Maintainers
1. Review PRs with semantic purity lens
2. Update this GENOME.md for all changes
3. Maintain backward compatibility
4. Document the "why" thoroughly

## 🤝 Maintaining the Genome

### Maintenance Responsibility

**Primary Maintainer**: Theme Genome Agent (AI)  
**Backup**: Theme Repository Maintainers (Human)  
**Review Cadence**: Updated with every ontological change

### Update Triggers

This document MUST be updated when:
- ✅ New variant is added (via approved PR)
- ✅ Existing variant is refactored or deprecated
- ✅ Category structure changes
- ✅ Version number changes (minor/major releases)

### Update Process

1. **Automatic** (AI Agent):
   - Theme Genome Agent updates during PR merge
   - Adds variant to registry with origin PR
   - Documents in evolutionary history section
   - Updates metrics and adoption data

2. **Manual** (Human, if needed):
   - Edit GENOME.md directly
   - Follow existing format for new variants
   - Commit with clear message referencing PR
   - Notify Theme Genome Agent of manual update

### Synchronization Check

**Monthly**: Verify GENOME.md matches actual codebase
- All variants in `_engines.scss` documented in GENOME.md
- No orphaned documentation (variants removed from code)
- Usage metrics updated from analytics
- Adoption counts accurate

**Version**: Synchronized with ontology version  
**Last Review**: 2026-01-15
