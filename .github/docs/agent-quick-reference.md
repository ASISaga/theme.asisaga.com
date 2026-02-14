# Agent Quick Reference Card

**Fast lookup for AI agents working with Genesis Semantic Design System**

**Version**: 2.0 | **Last Updated**: 2026-02-10

---

## Quick Decision Trees

### "Should I create an Ontological Proposition PR?"

```
Is this about WHAT (semantic) or HOW (visual)?
├─ HOW (colors/sizes/spacing) → ❌ NO PR, use existing mixins
└─ WHAT (semantic role/state/interaction) → Continue
    Can I combine existing mixins? → YES → ❌ Use combination
    Would 3+ subdomains use this? → NO → ❌ Domain-specific solution
                                  → YES → ✅ CREATE PR
```

### "Which ontological category?"

```
Spatial arrangement → Environment    Visual weight/presence → Entity
Information type → Cognition         Interaction/navigation → Synapse
Temporal state/condition → State     Emotional tone/vibe → Atmosphere
```

---

## Complete Ontology Cheat Sheet (31 variants)

### Environment (5) — Spatial Logic
```scss
@include genesis-environment('distributed');   // Auto-fit grid
@include genesis-environment('focused');       // Single column, max 70ch
@include genesis-environment('associative');   // Flexbox network
@include genesis-environment('chronological'); // Vertical timeline
@include genesis-environment('manifest');      // 12-column dashboard
```

### Entity (6) — Visual Presence
```scss
@include genesis-entity('primary');      // Main glassmorphism card
@include genesis-entity('secondary');    // Supporting, lighter
@include genesis-entity('imperative');   // Urgent, pulsing border
@include genesis-entity('latent');       // Inactive, dimmed
@include genesis-entity('aggregate');    // Container wrapper
@include genesis-entity('ancestral');    // Archived, muted
```

### Cognition (6) — Information Type
```scss
@include genesis-cognition('axiom');      // Headlines (2-3.5rem)
@include genesis-cognition('discourse');  // Body text (1-1.125rem)
@include genesis-cognition('protocol');   // Code/technical
@include genesis-cognition('gloss');      // Metadata (0.8rem)
@include genesis-cognition('motive');     // Instructional, accent
@include genesis-cognition('quantum');    // Tags/chips, tiny
```

### Synapse (5) — Interaction
```scss
@include genesis-synapse('navigate');     // Link to other page
@include genesis-synapse('execute');      // Action button
@include genesis-synapse('inquiry');      // Search/expand
@include genesis-synapse('destructive');  // Delete/remove
@include genesis-synapse('social');       // Share/connect
```

### State (5) — Temporal Condition
```scss
@include genesis-state('stable');         // Normal, verified
@include genesis-state('evolving');       // Updating/streaming
@include genesis-state('deprecated');     // Outdated warning
@include genesis-state('locked');         // Restricted access
@include genesis-state('simulated');      // Preview/demo data
```

### Atmosphere (4) — Sensory Texture
```scss
@include genesis-atmosphere('neutral');   // Balanced default
@include genesis-atmosphere('ethereal');  // Light, peaceful
@include genesis-atmosphere('void');      // Dark, immersive
@include genesis-atmosphere('vibrant');   // Energetic, neon
```

---

## v2.0 Additions

### Responsive Breakpoints
```scss
@include from(sm) { }  // ≥480px    @include tablet { }   // ≥768px
@include from(md) { }  // ≥768px    @include desktop { }  // ≥1024px
@include from(lg) { }  // ≥1024px   @include wide { }     // ≥1280px
@include from(xl) { }  // ≥1280px
@include from(2xl) { } // ≥1920px
```

### Futuristic Effects
```scss
@include glass-consciousness($blur: 24px, $opacity: 0.08);
@include glow-essence($color, $intensity: 1);
@include gradient-consciousness($angle: 135deg);
@include hover-quantum;
```

### Fluid Spacing: `$space-3xs` through `$space-3xl`

---

## Refactor Classification

```
Layout container → genesis-environment    Content block → genesis-entity
Text/heading → genesis-cognition          Link/button → genesis-synapse
Status indicator → genesis-state          Vibe/mood → genesis-atmosphere
```

### Verification Checklist
- [ ] Zero raw CSS properties (no px/rem/em/%, no color values)
- [ ] Structure mirrors HTML
- [ ] HTML untouched, visual fidelity maintained

---

## Agent Quick Tips

| Agent | Key Principle |
|-------|---------------|
| **Theme Genome** | Reject visual-only requests; Redundancy → Generalization → Refactoring |
| **Subdomain Evolution** | Try combinations before proposing new variants |
| **SCSS Refactor** | Structure mirrors HTML exactly; zero raw CSS |

---

## Essential Files

| Category | File |
|----------|------|
| Philosophy | `.github/docs/agent-philosophy.md` |
| Variant history | `GENOME.md` |
| Complete API | `_sass/ontology/INTEGRATION-GUIDE.md` |
| Review workflow | `.github/prompts/theme-genome-agent.prompt.md` |
| PR creation | `.github/prompts/subdomain-evolution-agent.prompt.md` |
| Migration guide | `.github/prompts/scss-refactor-agent.prompt.md` |
| SCSS rules | `.github/instructions/scss.instructions.md` |
| HTML patterns | `.github/instructions/html.instructions.md` |
| Decisions | `.github/docs/decision-matrices.md` |
| Workflows | `.github/docs/agent-workflows.md` |

---

## Quick Links

**Stuck on classification?** → `_sass/ontology/INTEGRATION-GUIDE.md`  
**Creating PR?** → `.github/prompts/subdomain-evolution-agent.prompt.md`  
**Reviewing PR?** → `.github/prompts/theme-genome-agent.prompt.md`  
**Need refactor help?** → `.github/prompts/scss-refactor-agent.prompt.md`
