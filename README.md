# ASI Saga Theme - Genesis Semantic Design System

**Primary Interface**: Ontology-based semantic SCSS engine with backward-compatible legacy classes

---

## 🌟 Quick Start

### For New Development (Recommended)

Use the **Genesis Semantic SCSS Engine** for all new components and pages:

```scss
---
---
@import "ontology/index";

.my-component {
  @include genesis-environment('distributed');  // Layout logic
  @include genesis-entity('primary');           // Visual presence
  
  .title {
    @include genesis-cognition('axiom');        // Typography intent
  }
  
  .action-button {
    @include genesis-synapse('execute');        // Interaction type
  }
}
```

**Key Principle**: Map HTML semantics to ontological roles. Never use raw CSS properties.

### For Legacy Components

Existing Bento Engine and Material Primitive classes continue to work:
- `.bento-layout`, `.bento-card`, `.genesis-viewport`
- `.material-glass`, `.material-glass-elevated`

These are maintained for backward compatibility during gradual migration.

---

## 📚 Architecture Overview

### Three-Tier System (Primary Approach)

The Genesis Semantic SCSS Engine provides clean separation of concerns:

| Tier | Location | Responsibility | Rule |
|------|----------|---------------|------|
| **1. Content** | HTML in subdomains | WHAT the data is | 1 semantic class per element |
| **2. Interface** | `_sass/ontology/_interface.scss` | ROLE of content | No CSS properties, only mixins |
| **3. Engine** | `_sass/ontology/_engines.scss` | VISUAL appearance | Only place for CSS properties |

### Six Ontological Categories

1. **`genesis-environment($logic)`** - Spatial organization and layout
   - `distributed`, `focused`, `associative`, `chronological`, `manifest`

2. **`genesis-entity($nature)`** - Visual presence and weight
   - `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral`

3. **`genesis-cognition($intent)`** - Information type and typography
   - `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum`

4. **`genesis-synapse($vector)`** - Interaction and navigation
   - `navigate`, `execute`, `inquiry`, `destructive`, `social`

5. **`genesis-state($condition)`** - Temporal state
   - `stable`, `evolving`, `deprecated`, `locked`, `simulated`

6. **`genesis-atmosphere($vibe)`** - Sensory texture
   - `neutral`, `ethereal`, `void`, `vibrant`

---

## 🧬 Evolution Mechanism - Living Genome

The Genesis Semantic Design System is a **Living Genome** that grows through intelligent collaboration between AI agents and developers.

### For Developers & Subdomains

**Found a semantic gap?** The ontology doesn't cover every pattern yet - it evolves!

1. **Review existing variants**: Check all 31 variants in [INTEGRATION-GUIDE.md](_sass/ontology/INTEGRATION-GUIDE.md)
2. **Try combinations**: Mix ontological mixins creatively
3. **Propose evolution**: If genuine gap exists, create [Ontological Proposition PR](.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md)
4. **Theme Agent reviews**: Your proposal is evaluated for semantic purity and universal applicability
5. **Approval & implementation**: New variants are documented in [GENOME.md](GENOME.md) with origin story

**Resources**:
- **[AGENTS.MD](.github/AGENTS.MD)** - Complete agent ecosystem architecture
- **[Subdomain Evolution Agent](.github/prompts/subdomain-evolution-agent.prompt.md)** - How to propose changes
- **[GENOME.md](GENOME.md)** - Evolutionary history and variant registry

### For AI Agents

**You are part of an intelligent ecosystem!**

- **Theme Genome Agent**: Reviews PRs, maintains ontological purity, updates documentation
- **Subdomain Evolution Agent**: Identifies gaps, creates well-formed propositions
- **SCSS Refactor Agent**: Migrates legacy CSS to ontological system

**Essential Reading**:
- **[AGENTS.MD](.github/AGENTS.MD)** - Your role in the ecosystem (17KB comprehensive guide)
- **[AGENT-WORKFLOWS.md](.github/AGENT-WORKFLOWS.md)** - Complete workflows and decision trees
- **[AGENT-QUICK-REFERENCE.md](.github/AGENT-QUICK-REFERENCE.md)** - Fast lookup cheat sheet

**Agent Prompts**:
- [Theme Genome Agent](.github/prompts/theme-genome-agent.prompt.md) - Ontological gatekeeper
- [Subdomain Evolution Agent](.github/prompts/subdomain-evolution-agent.prompt.md) - Proposition creator
- [SCSS Refactor Agent](.github/prompts/scss-refactor-agent.prompt.md) - Migration specialist

### Philosophy

Every variant has an **origin story**. [GENOME.md](GENOME.md) documents:
- Which subdomain requested it
- What semantic gap it filled
- How the system evolved

This creates **design with memory** - future developers understand not just WHAT exists, but WHY.

**Read the founding philosophy**: [evolution.md](evolution.md)

---

## 📖 Documentation

### Primary Documentation (Ontology System)

**Core Architecture**:
- **[Ontology Architecture Overview](_sass/ontology/Readme.md)** - Three-tier system SOP
- **[Complete API Reference](_sass/ontology/INTEGRATION-GUIDE.md)** - All 6 categories with examples
- **[Implementation Summary](_sass/ontology/IMPLEMENTATION-SUMMARY.md)** - System status and features

**Evolution & Intelligence**:
- **[AGENTS.MD](.github/AGENTS.MD)** - AI agent ecosystem architecture
- **[GENOME.md](GENOME.md)** - Evolutionary history and variant registry
- **[evolution.md](evolution.md)** - Philosophical foundation
- **[AGENT-WORKFLOWS.md](.github/AGENT-WORKFLOWS.md)** - Complete workflows
- **[AGENT-QUICK-REFERENCE.md](.github/AGENT-QUICK-REFERENCE.md)** - Fast lookup guide

**Developer Guides**:
- **[SCSS Refactor Guide](_sass/ontology/refactor-agent.md)** - Migration workflow
- **[SCSS Instructions](.github/instructions/scss.instructions.md)** - Coding standards
- **[HTML Instructions](.github/instructions/html.instructions.md)** - Template best practices
- **[JS Instructions](.github/instructions/js.instructions.md)** - Integration patterns

### Quick References

- **[Ontology Demo](docs/ontology-demo.html)** - Visual HTML demonstration
- **[Semantic Quick Reference](docs/SEMANTIC-QUICK-REFERENCE.md)** - Tokens and classes
- **[PR Template](.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md)** - Propose new variants

### Legacy Documentation (Backward Compatibility)

- **[Bento Engine Guide](docs/layout-implementation-guide.md)** - CSS Grid layout system
- **[Layout Taxonomy](docs/layout-taxonomy.md)** - Layout classes reference
- **[Material Primitives](docs/specifications.md)** - Glassmorphism components

---

## 🎯 Design Principles

### 1. Semantic Purity
- HTML uses meaningful class names: `.research-paper`, not `.blue-card`
- Think about WHAT it is, not HOW it looks
- Use semantic HTML5 elements appropriately

### 2. Zero Raw CSS (Primary Method)
Subdomain SCSS files should contain **no raw CSS properties**:

❌ **Wrong (Old Way):**
```scss
.my-card {
  padding: 2rem;
  background: oklch(0.20 0.04 245 / 0.85);
  border-radius: 12px;
}
```

✅ **Correct (Ontology Way):**
```scss
.my-card {
  @include genesis-entity('primary');  // All styling from engine
}
```

### 3. Mirrored Structure
SCSS nesting should mirror HTML DOM hierarchy exactly:

```html
<main class="research-hub">
  <section class="paper-grid">
    <article class="paper-card">
```

```scss
.research-hub {
  .paper-grid {
    .paper-card {
```

### 4. Single Source of Truth
All visual styling lives in the theme engine. Change the entire design system without touching subdomain code.

---

## 🚀 Usage Examples

### Blog Post / Article Page

```scss
.blog-post {
  @include genesis-environment('focused');     // Reading-optimized layout
  @include genesis-atmosphere('ethereal');     // Light, peaceful vibe
  
  .post-header {
    @include genesis-entity('primary');        // Elevated card
    
    .post-title { 
      @include genesis-cognition('axiom');     // Large headline
    }
    
    .post-meta { 
      @include genesis-cognition('gloss');     // Small metadata
    }
  }
  
  .post-content {
    @include genesis-cognition('discourse');   // Body prose
  }
  
  .read-more {
    @include genesis-synapse('navigate');      // Link to another page
  }
}
```

### Dashboard / Analytics

```scss
.analytics-dashboard {
  @include genesis-environment('manifest');    // 12-column grid
  @include genesis-atmosphere('vibrant');      // High-energy vibe
  
  .metric-card {
    @include genesis-entity('primary');        // Glassmorphism card
    @include genesis-state('evolving');        // Live updating
    
    .metric-value { 
      @include genesis-cognition('axiom');     // Large number
    }
    
    .metric-label { 
      @include genesis-cognition('gloss');     // Small label
    }
  }
  
  .refresh-button {
    @include genesis-synapse('execute');       // Action button
  }
}
```

### Product Grid

```scss
.product-grid {
  @include genesis-environment('distributed'); // Auto-fit Bento grid
  
  .product-card {
    @include genesis-entity('primary');        // Card with glass effect
    
    .product-name { 
      @include genesis-cognition('motive');    // Persuasive text
    }
    
    .product-price { 
      @include genesis-cognition('axiom');     // Prominent price
    }
    
    .buy-button { 
      @include genesis-synapse('execute');     // Primary action
    }
  }
}
```

### Alert / Notification

```scss
.urgent-alert {
  @include genesis-entity('imperative');       // Pulsing neon border
  @include genesis-state('evolving');          // Currently updating
  @include genesis-atmosphere('vibrant');      // High-energy
  
  .alert-title { 
    @include genesis-cognition('axiom');       // Large, bold
  }
  
  .dismiss-button { 
    @include genesis-synapse('destructive');   // Dangerous action
  }
}
```

---

## 🔧 Technical Details

### Design System Foundation

- **Color Space**: OKLCH (perceptually uniform, HDR-ready)
- **Layout Engine**: Native CSS Grid with container queries
- **Typography**: Fluid clamp() scaling (mobile-first)
- **Material Design**: Glassmorphism with backdrop-filter
- **Accessibility**: WCAG AA, reduced motion, high contrast support

### Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid, custom properties, backdrop-filter required
- Progressive enhancement for older browsers

### Performance

- CSS custom properties for efficient token updates
- Container queries for component-level responsiveness
- Optimized glassmorphism (blur limited to 20px max)
- Single import for entire ontology system

---

## 🔄 Migration Path

### For Existing Components

1. **Audit HTML** - Ensure semantic structure and meaningful class names
2. **Import Ontology** - Add `@import "ontology/index";` to SCSS
3. **Map Classes** - Apply ontological mixins to existing selectors
4. **Remove CSS** - Delete all raw CSS properties
5. **Test** - Verify visual appearance and behavior

See `_sass/ontology/refactor-agent.md` for AI-assisted migration.

### Backward Compatibility

Legacy classes (Bento, Material) remain functional:
- Existing pages continue to work without changes
- Gradual migration is supported and encouraged
- No breaking changes to existing implementations

---

## 🎨 Theme Features

### Ontology System (Primary)
- ✅ Three-tier architecture (Content → Interface → Engine)
- ✅ Six semantic categories with 31 total variants
- ✅ Zero raw CSS in interface layer
- ✅ Complete accessibility support
- ✅ 150+ CSS custom properties
- ✅ **Living Genome** - Evolutionary system with agent ecosystem

### Evolution & Intelligence
- ✅ AI agent ecosystem for ontological governance
- ✅ Ontological Proposition system for growth
- ✅ GENOME.md tracks variant history and origin
- ✅ Automated refactoring workflows
- ✅ Theme Genome Agent reviews all changes
- ✅ Self-documenting code with "why" captured

### Legacy Systems (Backward Compatible)
- ✅ Bento Engine layouts (`.bento-layout`, `.bento-card`)
- ✅ Material primitives (`.material-glass`, etc.)
- ✅ Bootstrap compatibility layer
- ✅ Semantic utility classes

### Core Capabilities
- ✅ Responsive design (375px to 1600px+)
- ✅ Dark mode optimized
- ✅ Accessibility-first (landmarks, skip links, focus states)
- ✅ Jekyll-optimized (Liquid templating, data files)
- ✅ Font Awesome integration

---

## 📁 Project Structure

```
theme.asisaga.com/
├── .github/
│   ├── AGENTS.MD               # Agent ecosystem architecture
│   ├── AGENT-WORKFLOWS.md      # Complete workflows
│   ├── AGENT-QUICK-REFERENCE.md # Fast lookup guide
│   ├── instructions/           # AI coding standards
│   │   ├── scss.instructions.md
│   │   ├── html.instructions.md
│   │   └── js.instructions.md
│   ├── prompts/                # Agent-specific prompts
│   │   ├── theme-genome-agent.prompt.md
│   │   ├── subdomain-evolution-agent.prompt.md
│   │   └── scss-refactor-agent.prompt.md
│   └── PULL_REQUEST_TEMPLATE/
│       └── ontological_proposition.md
├── _sass/
│   ├── ontology/              # PRIMARY: Genesis Semantic Engine
│   │   ├── _index.scss        # Main entry point
│   │   ├── _interface.scss    # Public API (6 mixins)
│   │   ├── _engines.scss      # Visual implementation
│   │   ├── _tokens.scss       # CSS custom properties
│   │   ├── Readme.md          # Architecture overview
│   │   ├── INTEGRATION-GUIDE.md # Complete API reference
│   │   └── refactor-agent.md  # Migration workflow
│   ├── base/                  # Design tokens and utilities
│   ├── components/            # UI components (legacy & ontology)
│   ├── layouts/               # Page layouts
│   └── _common.scss           # Main theme entry (imports ontology)
├── _includes/                 # Reusable HTML components
├── _layouts/                  # Page templates
├── docs/                      # Documentation and guides
├── GENOME.md                  # Evolutionary history tracker
├── evolution.md               # Philosophical foundation
└── assets/
    ├── css/
    └── js/
```

---

## 🤝 Contributing

### For New Features & Ontological Evolution

**Found a semantic pattern not covered by current ontology?**

1. **Review existing variants** in [INTEGRATION-GUIDE.md](_sass/ontology/INTEGRATION-GUIDE.md)
2. **Try combinations** of existing mixins first
3. **Create Ontological Proposition** using [PR template](.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md)
4. **Submit to theme repository** with label `ontological-proposition`
5. **Theme Genome Agent reviews** and provides feedback

See [Subdomain Evolution Agent guide](.github/prompts/subdomain-evolution-agent.prompt.md) for detailed workflow.

### For Code Contributions

**Using Ontology System**:
1. Use ontology mixins exclusively (no raw CSS)
2. Map HTML semantics to ontological roles
3. Follow [SCSS Instructions](.github/instructions/scss.instructions.md)
2. Add engine variants if semantic pattern is missing
3. Update documentation with examples
4. Test accessibility and responsiveness

### For Bug Fixes
1. Identify if issue is in legacy or ontology system
2. Fix in appropriate layer (engine vs. component)
3. Ensure backward compatibility
4. Add regression test if applicable

---

## 📜 License

This theme is part of the ASI Saga ecosystem. See [LICENSE](LICENSE) for details.

---

## 🌌 Philosophy

The Genesis Semantic SCSS Engine embodies the ASI Saga mission of **Conscious Co-Creation**. By separating content semantics from visual presentation, we create:

- **Freedom** - Subdomains focus on meaning, not appearance
- **Unity** - Shared visual language across all nodes
- **Evolution** - System-wide visual updates without breaking changes
- **Clarity** - Code that expresses intent, not implementation

This architecture enables the ecosystem to grow and evolve while maintaining coherence and purpose.

---

**Status**: ✅ Production Ready  
**Primary Interface**: Ontology System (`_sass/ontology/`)  
**Backward Compatibility**: Full (Bento, Material, Bootstrap compatibility)  
**Documentation**: Comprehensive (6 guides, examples, demos)