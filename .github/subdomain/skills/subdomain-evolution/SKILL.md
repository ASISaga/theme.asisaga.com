---
name: subdomain-evolution
description: Identify semantic gaps in the Genesis Ontological Design System and create well-formed propositions for new variants. Use when subdomain development reveals missing semantic patterns that cannot be expressed with current ontological mixin combinations.
license: MIT
metadata:
  author: ASISaga
  version: "1.0"
  category: design-system
  role: local-intelligence
allowed-tools: Bash Read Edit
---

# Subdomain Evolution

**Role**: Ontological Proposition Creator  
**Scope**: Semantic gap identification and proposition submission  
**Version**: 1.0

## Purpose

Identify semantic gaps in the Genesis Ontological Design System and create well-formed Ontological Propositions to submit as PRs to `theme.asisaga.com`. Acts as local intelligence observing real-world usage patterns.

## When to Use This Skill

Activate when:
- Implementing features that don't fit existing mixin variants
- Repeatedly combining the same mixins (missing abstraction)
- Discovering semantic patterns used across multiple components
- Needing state/interaction/layout types not in current ontology

**Don't use for:**
- Visual preferences ("different color") — use existing mixins
- One-off subdomain-specific features — not universal enough
- Patterns achievable with existing combinations — combine first

## Gap Verification Workflow

### 1. Review Current Ontology

Check all 6 categories (31+ variants):
- **Environment**: `distributed`, `focused`, `associative`, `chronological`, `manifest`
- **Entity**: `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral`
- **Cognition**: `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum`
- **Synapse**: `navigate`, `execute`, `inquiry`, `destructive`, `social`
- **State**: `stable`, `evolving`, `deprecated`, `locked`, `simulated`
- **Atmosphere**: `neutral`, `ethereal`, `void`, `vibrant`

### 2. Try Combinations

```scss
// Can creative combination serve the need?
.element {
  @include genesis-entity('primary');
  @include genesis-state('evolving');
  @include genesis-atmosphere('vibrant');
}
```

### 3. Confirm Genuine Gap

- [ ] Is this semantic (WHAT), not visual (HOW)?
- [ ] Cannot combine existing mixins to achieve this?
- [ ] Would 3+ subdomains use this pattern?
- [ ] Represents information intent, not visual style?

### 4. Create Proposition

**Required elements:**
- Source Node (subdomain name)
- Intent — WHAT it represents (one sentence)
- Context — WHY current ontology doesn't cover it
- Category + Suggested Label
- Use Cases (3+ concrete examples)
- Universal Applicability

### 5. Submit PR

Create PR to `theme.asisaga.com` with label `ontological-proposition`. Theme Genome Agent reviews.

## Quality Guidelines

**Strong Propositions:**
- ✅ Semantic, not visual
- ✅ Universal applicability (3+ subdomains)
- ✅ Clear category fit
- ✅ Demonstrates gap analysis
- ✅ 3+ distinct use cases

**Weak Propositions:**
- ❌ "I want blue buttons" — visual preference
- ❌ Single subdomain use case — not universal
- ❌ Combinable with existing mixins — use combination
- ❌ Vague semantic intent — be specific

## Resources

- `copilot-instructions.md` — Ontology quick reference
- `instructions/scss.instructions.md` — All current variants listed
- Theme's `.github/AGENTS.MD` — Full proposition process and review criteria

**Related Skills**: content-author, scss-compliance
