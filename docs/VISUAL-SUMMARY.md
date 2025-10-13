# Visual Layout Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                       default.html                          │
│              (Root Layout - Pre-existing)                   │
│  Provides: <html>, <head>, <body>, header, footer         │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
        ┌───────────▼──────────┐   ┌───▼───────┐
        │   BASE TEMPLATES     │   │ app.html  │
        │    (3 new files)     │   │(existing) │
        └──────────────────────┘   └───────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
    ┌───▼───┐ ┌──▼───┐ ┌───▼────────┐
    │scroll │ │fixed │ │minimal-base│
    │-able  │ │height│ │            │
    └───┬───┘ └──┬───┘ └─────┬──────┘
        │        │           │
    ────┴────────┴───────────┴────────
    │            │           │        │
    │            │           │        │
┌───▼─────┐  ┌──▼─────┐  ┌──▼───┐ ┌──▼───┐
│CONTENT  │  │MARKET  │  │KNOW  │ │UTIL  │
│-DRIVEN  │  │-ING    │  │-LEDGE│ │-ITY  │
│(4)      │  │(3)     │  │(2)   │ │(2)   │
└─────────┘  └────────┘  └──────┘ └──────┘
    │            │           │        │
    │            │           │        │
┌───▼─────┐  ┌──▼─────┐  ┌──▼───┐ ┌──▼───┐
│• post   │  │•landing│  │• docs│ │•mini │
│• article│  │•gallery│  │• faq │ │ -mal │
│• archive│  │• form  │  └──────┘ │•spla │
│• profile│  └────────┘           │ -sh  │
└─────────┘                        └──────┘

┌─────────────────────────────────────────┐
│      APPLICATION LAYOUTS (4)            │
│      (inherit from fixed-height)        │
│                                         │
│  • dashboard  • chatroom               │
│  • search     • settings               │
└─────────────────────────────────────────┘
```

## Component Structure

```
_includes/layouts/
├── 📁 post/
│   ├── 📄 post-meta.html          → Metadata display
│   └── 📄 post-navigation.html    → Prev/next links
│
├── 📁 article/
│   └── 📄 article-toc.html        → Table of contents
│
├── 📁 archive/
│   └── 📄 archive-item.html       → List item card
│
├── 📁 profile/
│   └── 📄 profile-stats.html      → User statistics
│
├── 📁 landing/
│   └── 📄 landing-features.html   → Feature grid
│
├── 📁 gallery/
│   └── 📄 gallery-item.html       → Gallery card
│
├── 📁 form/
│   └── 📄 form-field.html         → Reusable field
│
├── 📁 faq/
│   └── 📄 faq-item.html          → Accordion item
│
├── 📁 dashboard/
│   └── 📄 dashboard-widget.html   → Metric widget
│
└── 📁 splash/
    └── 📄 splash-countdown.html   → Timer component
```

## Sample Pages Structure

```
_samples/
├── 📄 README.md                    → Usage guide
│
├── 📁 content-driven/             → Blog & Content
│   ├── 📝 sample-post.md
│   ├── 📝 sample-article.md
│   ├── 📝 sample-archive.md
│   └── 📝 sample-profile.md
│
├── 📁 marketing/                  → Promotional
│   ├── 📝 sample-landing.md
│   ├── 📝 sample-gallery.md
│   └── 📝 sample-form.md
│
├── 📁 knowledge/                  → Documentation
│   ├── 📝 sample-docs.md
│   └── 📝 sample-faq.md
│
├── 📁 application/                → Interactive Apps
│   ├── 📝 sample-dashboard.md
│   ├── 📝 sample-chatroom.md
│   ├── 📝 sample-search.md
│   └── 📝 sample-settings.md
│
└── 📁 utility/                    → Special Purpose
    ├── 📝 sample-404.md
    └── 📝 sample-splash.md
```

## Documentation Structure

```
docs/
├── 📘 specifications.md            → Root specification
│   ├── Links to all docs
│   └── Implementation status
│
├── 📗 layout-taxonomy.md          → Layout hierarchy
│   └── Defines structure
│
├── 📙 layout-grid-governance.md   → Grid rules
│   └── Container/row/column usage
│
├── 📕 layout-implementation-guide.md  → Comprehensive guide
│   ├── All 18 layouts documented
│   ├── Front matter options
│   ├── Usage examples
│   └── ~14,000 characters
│
├── 📓 layout-quick-reference.md   → Cheat sheet
│   ├── Quick lookup tables
│   ├── Code snippets
│   └── ~6,400 characters
│
└── 📔 IMPLEMENTATION-SUMMARY.md   → This summary
    ├── Overview of everything
    ├── File organization
    └── ~12,000 characters
```

## Enhanced Header Flow

```
┌─────────────────────────────────────────┐
│         HEADER COMPONENT                │
│  (Transparent → Opaque on scroll)       │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🌐 Logo   📝 Title & Tagline    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        NAVBAR COMPONENT          │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │ Link 1  Link 2  Link 3  │    │   │
│  │  │         ▼                │    │   │
│  │  │    [Dropdown Menu]       │    │   │
│  │  │  • Subitem 1            │    │   │
│  │  │  • Subitem 2            │    │   │
│  │  └─────────────────────────┘    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Mobile: [☰ Toggle]                    │
└─────────────────────────────────────────┘
         │
    (scroll down)
         ↓
┌─────────────────────────────────────────┐
│    HEADER (Scrolled State)              │
│    background: rgba(11,20,38,0.95)      │
│    box-shadow: 0 2px 15px rgba(0,0,0,.2)│
└─────────────────────────────────────────┘
```

## Feature Highlights

### 🎨 Design System
```
Colors:          Typography:        Spacing:
━━━━━━━━━━━━━    ━━━━━━━━━━━━━━    ━━━━━━━━━━━
Cosmic Blue      Inter Font         Golden Ratio
Luminous Gold    Crimson Text       Sacred Scale
Silver Bridge    Montserrat         Bootstrap Grid
Emerald Green    Golden Ratio       Flex & Grid
Royal Purple     Scaling           
```

### 📱 Responsive Breakpoints
```
xs    sm     md      lg      xl     xxl
│─────│──────│───────│───────│──────│
0    576px  768px   992px  1200px 1400px

Mobile  Tablet   Desktop  Wide    Ultra-wide
```

### ♿ Accessibility Features
```
✓ WCAG 2.1 AA Compliant
✓ Semantic HTML
✓ ARIA Labels
✓ Keyboard Navigation
✓ High Contrast Colors
✓ Skip Links
✓ Screen Reader Support
```

### ⚡ Performance
```
✓ No @extend (direct styles)
✓ Throttled scroll listeners
✓ Optimized selectors
✓ Minimal JavaScript
✓ Backdrop blur fallbacks
✓ Efficient animations
```

## Usage Pattern

```yaml
# Step 1: Choose Layout
layout: post  # or article, landing, docs, etc.

# Step 2: Configure Front Matter
title: "Your Title"
date: 2024-01-15
# ... layout-specific options

# Step 3: Add Content
---
Your markdown content here...

# Step 4: Use Includes (optional)
{% include layouts/post/post-meta.html 
  date=page.date
  author=page.author
%}
```

## File Count Summary

```
┌──────────────────────────────────────┐
│         IMPLEMENTATION               │
├──────────────────────────────────────┤
│ Layouts:        20 (18 new + 2 old) │
│ Includes:       11                   │
│ Samples:        15                   │
│ Documentation:   5                   │
│ SCSS Enhanced:   2                   │
│ JS Added:        1                   │
├──────────────────────────────────────┤
│ TOTAL FILES:    54                   │
└──────────────────────────────────────┘
```

## Quick Start

```bash
# 1. View samples locally
bundle exec jekyll serve

# 2. Navigate to samples
http://localhost:4000/samples/[category]/sample-[name].html

# 3. Copy sample as template
cp _samples/content-driven/sample-post.md _posts/my-post.md

# 4. Edit front matter and content
# 5. Build and deploy!
```

---

**Implementation Status: ✅ COMPLETE**

All layouts created, documented, and tested with working samples.
Ready for production use.
