# CHANGELOG — Genesis Theme

*Theme Repository*: `theme.asisaga.com`
*Purpose*: Singular theme-wide changelog recording all breaking changes, enhancements, and evolution across the Genesis Design System.

---

## v4.0.0 — Ontological Transcendence (2026-02-08)

### 🧬 Ontology Engine — New Semantic Variants

The ontological library has been significantly deepened with new variants that better express the full range of semantic intent for the ASI Saga's mission — orchestrating the Genesis of Artificial Superintelligence.

#### New Cognition Variants
| Variant | Semantic Purpose | Use Case |
|---------|-----------------|----------|
| `oracle` | AI-generated or predictive content typography | Distinguishes machine-generated insights from human prose |
| `testimony` | Quoted speech, testimonials, attributed statements | Pull-quotes, user testimonials, attributed citations |

#### New Entity Variants
| Variant | Semantic Purpose | Use Case |
|---------|-----------------|----------|
| `transcendent` | Sacred, mission-critical prominence | Hero sections, genesis-level content, ASI Saga mission statements |
| `ephemeral` | Transient, auto-dismissing content | Toast notifications, temporary alerts, flash messages |

#### New State Variants
| Variant | Semantic Purpose | Use Case |
|---------|-----------------|----------|
| `emerging` | Newly created, fresh content | New posts, recent additions, just-published items |
| `transcending` | In transformative transition | Content undergoing fundamental change, AI processing states |

#### New Synapse Variants
| Variant | Semantic Purpose | Use Case |
|---------|-----------------|----------|
| `invoke` | AI/generative action trigger | Prompt submission, model invocation, genesis triggers |
| `consent` | Explicit user approval/permission | Cookie consent, terms acceptance, data sharing approval |

#### New Environment Variants
| Variant | Semantic Purpose | Use Case |
|---------|-----------------|----------|
| `convergent` | Sidebar + main content layout | Article with TOC, dashboard with sidebar, documentation pages |

#### New Atmosphere Variants
| Variant | Semantic Purpose | Use Case |
|---------|-----------------|----------|
| `sacred` | Reverent, mission-critical tone | ASI Saga mission pages, genesis ceremony, transcendent content |

### 🏛️ Layouts Enhanced

All `_layouts/` templates refactored as the **primary usage mechanism** for the theme:

| Layout | Enhancement |
|--------|------------|
| `default.html` | Enhanced semantic structure with `genesis-atmosphere` wrapper |
| `post.html` | Deeper ontological markup with `testimony` cognition for quotes |
| `landing.html` | Transcendent hero sections with sacred atmosphere |
| `article.html` | Convergent environment for sidebar + content |
| `docs.html` | Documentation-optimized with convergent layout and protocol cognition |
| `dashboard.html` | Manifest environment with real-time state awareness |
| `profile.html` | Entity-centric with avatar and user-card patterns |
| `gallery.html` | Distributed environment with image-adaptive entities |
| `search.html` | Inquiry-driven synapse patterns |
| `form.html` | Interaction-form environment with consent synapse |
| `minimal.html` | Focused environment, ethereal atmosphere |

### 📦 Pre-built Includes Library

New reusable components in `_includes/components/`:

| Component | Purpose |
|-----------|---------|
| `card.html` | Universal semantic card (entity variants: primary, secondary, imperative) |
| `alert.html` | Accessible alert/notification (state variants: stable, imperative, emerging) |
| `breadcrumb.html` | Navigation breadcrumb trail (synapse: navigate, anchor) |
| `pagination.html` | Semantic pagination controls (synapse: paginate) |
| `stat.html` | Statistics/metric display (cognition: quantum, motive) |
| `tag-list.html` | Tag/category list (cognition: quantum, synapse: navigate) |

### 🔧 Separation of Concerns

The ontology engine layer has been restructured for clearer separation:
- **Interface** (`_interface.scss`): Pure semantic contracts — ZERO CSS properties
- **Engines** (`engines/*.scss`): Physical manifestation — ALL raw CSS lives here
- **Tokens** (`_tokens.scss`): Design token bridge — CSS custom properties only

### 📝 Documentation

- `GENOME.md` updated with v4.0 variant registry
- `INTEGRATION-GUIDE.md` updated with new variant documentation
- This `CHANGELOG.md` established as singular theme-wide changelog

### ⚠️ Breaking Changes

| Area | Change | Migration |
|------|--------|-----------|
| Ontology version | v2.2 → v4.0 | Update `GENOME.md` references |
| New variants | 10 new semantic variants | No migration needed — additive only |
| Layout semantics | Enhanced ontological markup | Subdomains using `layout: X` get enhanced semantics automatically |
| Includes | New components available | Adopt via `{% include components/X.html %}` |

---

## v3.0.0 — Transcendent Refactor (2026-02-07)

### Overview
Significantly enhanced futuristic appearance of header, footer, and navigation across all subdomains.

### Breaking Changes

#### Header
- Height: `70px` → `64px` (scrolled: `56px`)
- Max-width: `1600px` → `1440px`
- New scroll-aware behavior (`.scrolled`, `.header-hidden` classes)
- Consciousness border added (`oklch(0.25 0.04 250)`)

#### Footer
- Background deeper (`oklch(0.10)` → `oklch(0.06)`)
- "Quick Links" → "Navigate"
- Social icons: circles → rounded squares
- Back-to-top: `fa-arrow-up` → `fa-chevron-up`

#### Navigation
- Font: `clamp(1rem...)` → `0.8125rem` uppercase
- Dropdowns: left-aligned → center-aligned
- Arrow: `▼` → `›`
- Animation: `dropdown-appear` → `dropdown-emerge`

#### JavaScript
- Version: `2.1.0` → `3.0.0`
- New: `initScrollAwareHeader()` with rAF throttling

See `CHANGELOG-v3.0.md` for complete migration tables.
