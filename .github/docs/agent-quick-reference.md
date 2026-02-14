# 🎯 Agent Quick Reference Card

**Fast lookup guide for AI agents working with Genesis Semantic Design System**

**Version 2.0** | Mobile-First Responsive + Futuristic Effects

---

## 🆕 Version 2.0 Quick Additions

### Responsive Breakpoints (Mobile-First)
```scss
@include from(sm) { }   // ≥480px  (large phones)
@include from(md) { }   // ≥768px  (tablets)
@include from(lg) { }   // ≥1024px (laptops)
@include from(xl) { }   // ≥1280px (desktops)
@include from(2xl) { }  // ≥1920px (large screens)

// Semantic aliases
@include tablet { }     // ≥768px
@include desktop { }    // ≥1024px
@include wide { }       // ≥1280px
```

### Futuristic Effects (New Mixins)
```scss
// Glassmorphism
@include glass-consciousness($blur: 24px, $opacity: 0.08);
@include glass-neural($opacity: 0.06);
@include glass-ethereal($opacity: 0.03);

// Glow Effects
@include glow-essence($color, $intensity: 1);
@include glow-neural($color, $intensity: 1);
@include glow-quantum($intensity: 1);

// Gradients
@include gradient-consciousness($angle: 135deg);
@include gradient-genesis($angle: 45deg);
@include gradient-void;

// Interactions
@include hover-quantum;
@include hover-neural-link;
@include ripple-consciousness;
```

### Fluid Spacing Scale
```scss
$space-3xs  // 0.125rem → 0.25rem
$space-2xs  // 0.25rem → 0.375rem
$space-xs   // 0.375rem → 0.5rem
$space-sm   // 0.5rem → 0.75rem
$space-md   // 0.75rem → 1rem
$space-lg   // 1rem → 1.5rem
$space-xl   // 1.5rem → 2rem
$space-2xl  // 2rem → 3rem
$space-3xl  // 3rem → 4rem
```

---

## 🔍 Quick Decision Trees

### "Should I create an Ontological Proposition PR?"

```
Is this about WHAT (semantic) or HOW (visual)?
├─ WHAT (semantic role/state/interaction) → Continue
└─ HOW (colors/sizes/spacing) → ❌ NO PR, use existing mixins

Can I combine existing mixins to achieve this?
├─ YES → ❌ NO PR, use combination
└─ NO → Continue

Would 3+ other subdomains use this?
├─ YES → ✅ CREATE PR
└─ NO → ❌ NO PR, domain-specific solution
```

### "Which ontological category does this belong to?"

```
Is it about...?
├─ Spatial arrangement → Environment
├─ Visual weight/presence → Entity
├─ Information type → Cognition
├─ Interaction/navigation → Synapse
├─ Temporal state/condition → State
└─ Emotional tone/vibe → Atmosphere
```

---

## 📋 Complete Ontology Cheat Sheet

### Environment (Spatial Logic) - 5 variants
```scss
@include genesis-environment('distributed');   // Auto-fit grid
@include genesis-environment('focused');       // Single column, max 70ch
@include genesis-environment('associative');   // Flexbox network
@include genesis-environment('chronological'); // Vertical timeline
@include genesis-environment('manifest');      // 12-column dashboard
```

### Entity (Visual Presence) - 6 variants
```scss
@include genesis-entity('primary');      // Main glassmorphism card
@include genesis-entity('secondary');    // Supporting, lighter
@include genesis-entity('imperative');   // Urgent, pulsing border
@include genesis-entity('latent');       // Inactive, dimmed
@include genesis-entity('aggregate');    // Container wrapper
@include genesis-entity('ancestral');    // Archived, muted
```

### Cognition (Information Type) - 6 variants
```scss
@include genesis-cognition('axiom');      // Headlines (2-3.5rem)
@include genesis-cognition('discourse');  // Body text (1-1.125rem)
@include genesis-cognition('protocol');   // Code/technical
@include genesis-cognition('gloss');      // Metadata (0.8rem)
@include genesis-cognition('motive');     // Instructional, accent
@include genesis-cognition('quantum');    // Tags/chips, tiny
```

### Synapse (Interaction) - 5 variants
```scss
@include genesis-synapse('navigate');     // Link to other page
@include genesis-synapse('execute');      // Action button
@include genesis-synapse('inquiry');      // Search/expand
@include genesis-synapse('destructive');  // Delete/remove
@include genesis-synapse('social');       // Share/connect
```

### State (Temporal Condition) - 5 variants
```scss
@include genesis-state('stable');         // Normal, verified
@include genesis-state('evolving');       // Updating/streaming
@include genesis-state('deprecated');     // Outdated warning
@include genesis-state('locked');         // Restricted access
@include genesis-state('simulated');      // Preview/demo data
```

### Atmosphere (Sensory Texture) - 4 variants
```scss
@include genesis-atmosphere('neutral');   // Balanced default
@include genesis-atmosphere('ethereal');  // Light, peaceful
@include genesis-atmosphere('void');      // Dark, immersive
@include genesis-atmosphere('vibrant');   // Energetic, neon
```

---

## ⚡ Common Patterns (Copy-Paste Ready)

### Responsive Card Grid (v2.0)
```scss
.card-grid {
  @include genesis-environment('distributed');
  display: grid;
  gap: $space-lg;
  
  // Mobile: 1 column, Tablet: 2, Desktop: 3
  grid-template-columns: 1fr;
  @include tablet { grid-template-columns: repeat(2, 1fr); }
  @include desktop { grid-template-columns: repeat(3, 1fr); }
  
  .card {
    @include genesis-entity('primary');
    @include glass-consciousness;
    @include hover-quantum;
  }
}
```

### Futuristic Hero Section (v2.0)
```scss
.hero {
  min-height: 100dvh;
  @include gradient-consciousness;
  
  .hero-content {
    @include genesis-entity('primary');
    @include glass-elevated;
    padding: $space-xl;
    @include desktop { padding: $space-2xl; }
  }
  
  .hero-title {
    @include genesis-cognition('axiom');
    @include text-gradient-transcendent;
  }
  
  .hero-cta {
    @include genesis-synapse('execute');
    @include glow-essence(var(--genesis-gold));
  }
}
```

### Blog Post
```scss
.blog-post {
  @include genesis-environment('focused');
  @include genesis-atmosphere('ethereal');
  
  .post-header {
    @include genesis-entity('primary');
    .post-title { @include genesis-cognition('axiom'); }
    .post-date { @include genesis-cognition('gloss'); }
  }
  
  .post-content { @include genesis-cognition('discourse'); }
  .read-more { @include genesis-synapse('navigate'); }
}
```

### Card Grid
```scss
.card-grid {
  @include genesis-environment('distributed');
  
  .card {
    @include genesis-entity('primary');
    .card-title { @include genesis-cognition('motive'); }
    .card-text { @include genesis-cognition('discourse'); }
    .card-button { @include genesis-synapse('execute'); }
  }
}
```

### Alert Message
```scss
.alert {
  @include genesis-entity('imperative');
  @include genesis-state('stable');
  
  .alert-title { @include genesis-cognition('axiom'); }
  .alert-message { @include genesis-cognition('discourse'); }
  .dismiss-btn { @include genesis-synapse('destructive'); }
}
```

### Dashboard
```scss
.dashboard {
  @include genesis-environment('manifest');
  @include genesis-atmosphere('vibrant');
  
  .metric-card {
    @include genesis-entity('primary');
    @include genesis-state('evolving');
    .metric-value { @include genesis-cognition('axiom'); }
  }
}
```

---

## 🚫 Common Mistakes

### ❌ WRONG (Raw CSS)
```scss
.my-card {
  padding: 2rem;
  background: oklch(0.2 0.04 245 / 0.85);
  border-radius: 12px;
  font-size: 1.125rem;
}
```

### ✅ CORRECT (Ontological)
```scss
.my-card {
  @include genesis-entity('primary');
  @include genesis-cognition('discourse');
}
```

---

## 📝 PR Review Response Templates

### Approval
```markdown
✅ **Approved - Valid Semantic Extension**

**Classification**: 
- Category: [category]
- Variant: `[category]('[name]')`
- Type: Universal

**Implementation Plan**:
1. Add to _engines.scss with documentation
2. Update GENOME.md evolutionary history
3. Document in INTEGRATION-GUIDE.md

Proceeding with merge...
```

### Rejection - Visual Only
```markdown
❌ **Rejected - Visual Implementation Detail**

This modifies appearance without semantic meaning.

**Guidance**: Use existing variants:
- `entity('primary')` for standard cards
- `entity('secondary')` for supporting content

Please reframe as: "We need to represent [WHAT], because [WHY]"
```

### Rejection - Already Covered
```markdown
🔄 **Covered by Existing Ontology**

This is achievable by combining:

```scss
.your-element {
  @include genesis-entity('primary');
  @include genesis-state('evolving');
}
```

Does this meet your needs?
```

---

## 🔧 Refactor Agent Quick Commands

### Classify Element
```
Layout container → genesis-environment
Content block → genesis-entity
Text/heading → genesis-cognition
Link/button → genesis-synapse
Status indicator → genesis-state
Vibe/atmosphere → genesis-atmosphere
```

### Verification Checklist
```
[ ] Only import: ontology/index
[ ] Zero raw CSS properties
[ ] No px/rem/em/% values
[ ] No color values
[ ] Structure mirrors HTML
[ ] HTML untouched
[ ] Visual fidelity maintained
```

---

## 📚 Essential Files

**Must Read First**:
- `.github/AGENTS.MD` - Agent architecture (17KB)
- `GENOME.md` - Variant history (13KB)
- `_sass/ontology/INTEGRATION-GUIDE.md` - Complete API (11KB)

**Agent Prompts**:
- `.github/prompts/theme-genome-agent.prompt.md` - Review workflow
- `.github/prompts/subdomain-evolution-agent.prompt.md` - PR creation
- `.github/prompts/scss-refactor-agent.prompt.md` - Migration guide

**Templates**:
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - PR format

**Instructions**:
- `.github/instructions/scss.instructions.md` - SCSS rules
- `.github/instructions/html.instructions.md` - HTML patterns
- `.github/instructions/js.instructions.md` - JS integration

---

## 🎯 Agent-Specific Quick Tips

### Theme Genome Agent
**Primary Tasks**: Review PRs, maintain ontological purity, update GENOME.md  
**Key Principle**: Reject visual-only requests firmly but kindly  
**Decision Tree**: Redundancy → Generalization → Refactoring  

### Subdomain Evolution Agent
**Primary Tasks**: Identify gaps, create propositions, implement approved variants  
**Key Principle**: Try combinations before proposing new variants  
**Self-Check**: Semantic role vs. visual preference?  

### SCSS Refactor Agent
**Primary Tasks**: Migrate legacy CSS to ontology  
**Key Principle**: Structure must mirror HTML exactly  
**Golden Rule**: Zero raw CSS properties  

---

## 🚀 Quick Start Commands

### Starting SCSS Refactor
```scss
---
---
@import "ontology/index";

// Map HTML classes to semantic roles below
```

### Checking Ontology Coverage
```bash
# Review all 31 variants
Open: _sass/ontology/INTEGRATION-GUIDE.md

# Check variant usage history
Open: GENOME.md (section: Variant Registry)

# See examples
Open: _sass/ontology/_sample.scss
```

### Creating Proposition
```bash
# Use template
Open: .github/PULL_REQUEST_TEMPLATE/ontological_proposition.md

# Follow guide
Open: .github/prompts/subdomain-evolution-agent.prompt.md

# Submit with label
Label: ontological-proposition
```

---

## 💡 Philosophy Reminders

**Think Semantically**:
- WHAT is this? (not HOW does it look?)
- WHY does it need special treatment?
- WHO else would need this pattern?

**Document Intent**:
- Every variant has origin story
- Every decision has reasoning
- Every change updates GENOME.md

**Evolve Consciously**:
- System grows organically
- Quality over quantity
- Universal over specific
- Semantic over visual

---

## 🔗 Emergency Links

**Stuck on classification?** → INTEGRATION-GUIDE.md (Examples section)  
**Need refactor help?** → scss-refactor-agent.prompt.md (Decision Matrix)  
**Creating PR?** → subdomain-evolution-agent.prompt.md (Training Examples)  
**Reviewing PR?** → theme-genome-agent.prompt.md (Review Checklist)  
**Visual regression?** → AGENT-WORKFLOWS.md (Validation section)  
**Agent development?** → instructions/github.instructions.md (Copilot guidelines)

---

**Print this card** | Keep handy during agent work sessions  
**Version**: 2.0 | **Last Updated**: 2026-02-10

*Quick reference for conscious evolution* 🧬
