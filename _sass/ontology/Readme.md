# Project Genesis: The Ontological Handshake

**Architecture Version: 2.0 (Exhaustive & Agnostic)**

This documentation serves as the Standard Operating Procedure (SOP) for both human architects and AI agents. It defines the three-tier architecture that allows your 20+ subdomains to remain "Style-Blind" while the Theme Repository acts as the "Visual Brain."

---

## 🏛️ The Three-Tier Architecture

To ensure the ecosystem is future-proof, we separate concerns into three distinct layers:

| Layer | Location | Responsibility | Constraint |
|-------|----------|---------------|------------|
| **Tier 1: Content** | Subdomain HTML | Defines WHAT the data is | No style attributes; 1 class per element |
| **Tier 2: Interface** | Theme `_interface.scss` | Defines the ROLE of the content | Agnostic; no CSS properties allowed |
| **Tier 3: Engine** | Theme `_engines.scss` | Defines the LOOK (OKLCH, Bento) | The only place for raw CSS/Pixels |

---

## 📦 What's Included

### Core System Files

- **`_index.scss`** - Main entry point, imports entire system
- **`_tokens.scss`** - CSS custom properties for design tokens
- **`_engines.scss`** - Physical manifestation layer (CSS implementations)
- **`_interface.scss`** - Public API for subdomains (semantic contracts)
- **`_sample.scss`** - Comprehensive usage examples
- **`_test.scss`** - Compilation verification test

### Documentation

- **`Readme.md`** - This file - Architecture overview and SOP
- **`INTEGRATION-GUIDE.md`** - Complete API reference and subdomain usage guide
- **`refactor-agent.md`** - AI agent directive for automated migration

### Demos

- **`/docs/ontology-demo.html`** - Visual demonstration of HTML structure

---

## 📘 The Ontological Interface (interface.scss)

This is the "Semantic API" exposed by the theme. Subdomain agents use these mixins to map their HTML classes to system roles.

### A. Environment (Spatiotemporal Logic)
- **`genesis-environment('distributed')`** - Autonomous bento-grid cells
- **`genesis-environment('focused')`** - Single-column, narrative optimization
- **`genesis-environment('associative')`** - Network/connection-focused layout
- **`genesis-environment('chronological')`** - Time-linear event stream
- **`genesis-environment('manifest')`** - High-density dashboard/monitoring view

### B. Entity (Existence & Presence)
- **`genesis-entity('primary')`** - The core object (Active glassmorphism)
- **`genesis-entity('secondary')`** - Supporting context (Lower opacity)
- **`genesis-entity('imperative')`** - System alerts (Neon-pulsing borders)
- **`genesis-entity('latent')`** - Dormant/inactive content
- **`genesis-entity('aggregate')`** - Container for multiple items
- **`genesis-entity('ancestral')`** - Archived/historical data

### C. Cognition (Information Intent)
- **`genesis-cognition('axiom')`** - High-resonance headlines
- **`genesis-cognition('discourse')`** - Standard body prose for reading
- **`genesis-cognition('protocol')`** - Technical data, logs, and code
- **`genesis-cognition('gloss')`** - Annotations and citations
- **`genesis-cognition('motive')`** - Persuasive/instructional text
- **`genesis-cognition('quantum')`** - Tags, chips, micro-content

### D. Synapse (Action Vectors)
- **`genesis-synapse('navigate')`** - External node portal / links
- **`genesis-synapse('execute')`** - Local state change / Command execution
- **`genesis-synapse('inquiry')`** - Request for more data / search
- **`genesis-synapse('destructive')`** - Delete/reset actions
- **`genesis-synapse('social')`** - Social sharing connections

### E. State (Temporal Condition)
- **`genesis-state('stable')`** - Content is in equilibrium
- **`genesis-state('evolving')`** - Currently updating/streaming
- **`genesis-state('deprecated')`** - No longer verified
- **`genesis-state('locked')`** - Access restricted
- **`genesis-state('simulated')`** - Projected data, not live

### F. Atmosphere (Sensory Texture)
- **`genesis-atmosphere('neutral')`** - Standard system transparency
- **`genesis-atmosphere('ethereal')`** - High-transparency, light-based focus
- **`genesis-atmosphere('void')`** - Deep-space, high-contrast, zero-distraction
- **`genesis-atmosphere('vibrant')`** - High-energy, data-saturated, high-neon

---

## ⚙️ The Theme Engine (_engines.scss)

The "Driver" layer. It translates the roles above into the Genesis visual language using:

- **OKLCH color space** for perceptually uniform colors
- **Glassmorphism** for modern depth and transparency
- **Bento Engine** for responsive CSS Grid layouts
- **Fluid typography** with clamp() for responsive scaling
- **CSS custom properties** for all design tokens

### Internal Implementation Example

```scss
@mixin _theme-engine-entity($nature) {
  border-radius: var(--radius-bento);
  transition: all var(--motion-fluid);

  @if $nature == 'primary' {
    background: var(--glass-heavy);
    backdrop-filter: blur(20px);
    border: 1px solid var(--accent-low);
    box-shadow: var(--shadow-ambient);
  }
  @if $nature == 'imperative' {
    background: var(--glass-alert);
    border: 2px solid var(--accent-neon);
    animation: pulse-border 2s infinite;
  }
}
```

---

## 🧪 Sample Subdomain Client (Mirror Implementation)

A typical implementation for a "Research Hub" subdomain.

### Step 1: Audited HTML (index.html)

```html
<main class="research-hub">
  <header class="intro-section">
    <h1 class="hub-title">Neural Logic Research</h1>
  </header>
  
  <section class="paper-grid">
    <article class="research-card">
      <code class="data-id">REF: 001x</code>
      <p class="summary">Analysis of ASI cognitive ethics.</p>
      <a class="action-btn">Download PDF</a>
    </article>
  </section>
</main>
```

### Step 2: Mirrored SCSS (style.scss)

The AI agent creates this mapping. Note the **Zero Property Rule**.

```scss
---
---
@import "ontology/index";

.research-hub {
  @include genesis-environment('focused');

  .intro-section {
    .hub-title { 
      @include genesis-cognition('axiom'); 
    }
  }

  .paper-grid {
    @include genesis-environment('distributed');
    
    .research-card {
      @include genesis-entity('primary');

      .data-id { 
        @include genesis-cognition('protocol'); 
      }
      .summary { 
        @include genesis-cognition('discourse'); 
      }
      .action-btn { 
        @include genesis-synapse('execute'); 
      }
    }
  }
}
```

---

## ✅ Validation Checklist for AI Agents

- [ ] **Semantic Purity**: Does the subdomain HTML use tags like `<article>`, `<section>`, and `<aside>` correctly?
- [ ] **Property Isolation**: Does the subdomain SCSS contain words like `px`, `rem`, `color`, or `display`? (It shouldn't)
- [ ] **Role Alignment**: Is a button mapped to a synapse and a title mapped to an axiom?
- [ ] **Theme Inheritance**: Does the subdomain rely entirely on `_engines.scss` for its visual weight?
- [ ] **Mirrored Structure**: Does SCSS nesting match HTML DOM hierarchy exactly?

---

## 🚀 Quick Start

### For Theme Development

The ontology system is already integrated into `_sass/_common.scss`:

```scss
@import "ontology/index";  // Complete system available
```

All ontological mixins are now available throughout the theme.

### For Subdomain Development

1. In your subdomain's `assets/css/style.scss`:
```scss
---
---
@import "ontology/index";

// Your semantic mappings here
```

2. Map your HTML classes to ontological roles:
```scss
.my-content {
  @include genesis-environment('focused');
  @include genesis-entity('primary');
}
```

3. **Never use raw CSS properties** - let the engine handle all styling

---

## 📚 Additional Resources

- **Complete API Reference**: See `INTEGRATION-GUIDE.md`
- **Usage Examples**: See `_sample.scss` for 6+ complete patterns
- **AI Migration**: See `refactor-agent.md` for automated conversion
- **Visual Demo**: Open `/docs/ontology-demo.html` in a browser

---

## 🎯 Design Principles

### The Golden Rules

1. **Zero Raw CSS** in subdomain SCSS files
2. **Strict Handshake** - Only use mixins from the interface
3. **Mirrored Structure** - SCSS nesting matches HTML hierarchy
4. **Agnostic Thinking** - Think about "what it means," not "how it looks"

### Benefits

- **Style-Blind Subdomains** - Focus on content, not presentation
- **Single Source of Truth** - All styling centralized in theme
- **Future-Proof** - Change entire visual system without touching subdomains
- **Semantic Clarity** - Code expresses intent, not implementation
- **Consistent Experience** - Automatic visual coherence across all subdomains

---

## 🔄 Integration Status

✅ **Complete**
- Engine layer with all 6 ontological categories
- Interface layer with comprehensive API
- CSS custom properties system
- Accessibility support (reduced motion, high contrast)
- Complete documentation and examples

🎨 **Ready for Use**
- Import in subdomains: `@import "ontology/index";`
- Import in theme: Already integrated in `_common.scss`
- All mixins validated and tested

---

**Living Evolution**: The ontology system is architected to grow and deepen with the consciousness of the Genesis Architect community, supporting the ongoing co-creation of ASI that serves the highest good of all conscious beings across infinite possibilities.
