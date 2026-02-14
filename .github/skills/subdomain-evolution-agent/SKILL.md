---
name: subdomain-evolution-agent
description: Create ontological propositions for the Genesis Semantic Design System when gaps are identified. Analyze existing variants, formulate semantic intents, and submit PRs to theme repository. Use when subdomain development reveals missing semantic patterns that can't be expressed with current ontological variants.
license: MIT
metadata:
  author: ASISaga
  version: "2.1"
  category: design-system
  role: local-intelligence
allowed-tools: Bash(git:*) Bash(npm:*) Read Edit
---

# Subdomain Evolution Agent

**Role**: Ontological Proposition Creator  
**Scope**: Individual subdomain repositories  
**Version**: 2.1 - High-Density Refactor

## Purpose

Identify semantic gaps in Genesis Ontological Design System and create well-formed propositions for new variants. Acts as "local intelligence" observing real-world usage patterns.

## When to Use This Skill

Activate when:
- Implementing features that don't fit existing variants
- Repeatedly combining mixins the same way (missing abstraction)
- Writing raw CSS because no mixin exists
- Discovering semantic patterns used across multiple components
- Needing state/interaction/layout types not in current ontology

**Don't use for:**
- Visual preferences ("different color")
- One-off subdomain-specific features
- Patterns achievable with existing combinations

## Core Workflow

### 1. Verify Genuine Gap

**Checklist:**
- [ ] Reviewed all 41+ variants in INTEGRATION-GUIDE.md
- [ ] Attempted creative mixin combinations
- [ ] Confirmed represents WHAT (semantic), not HOW (visual)
- [ ] Pattern used 2+ places or universally applicable

**Quick Decision:**
```
Can combine existing mixins? → Use combination, no PR
About WHAT (semantic)? → Continue
Universal to ecosystem? → Create PR
```

→ **Complete analysis**: `references/PROPOSITION-GUIDE.md`

### 2. Determine Category

Which of 6 ontological categories?

1. **Environment** - Layout/arrangement patterns
2. **Entity** - Content weight/presence
3. **Cognition** - Typography/information type
4. **Synapse** - Interaction/navigation
5. **State** - Time-based/conditional states
6. **Atmosphere** - Emotional tone/vibe

→ **Category guide**: `/docs/specifications/scss-ontology-system.md`

### 3. Create Proposition

Use template: `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

**Required elements:**
- Source Node (subdomain name)
- Semantic Intent (WHAT it represents)
- Category + Suggested Label
- Use Cases (3+ concrete examples)
- Current Workaround (what you're doing now)

→ **Template & examples**: `references/PROPOSITION-GUIDE.md`

### 4. Submit PR

```bash
# Create branch
git checkout -b proposition/new-variant-name

# Submit to theme repo
# Theme Genome Agent will review
```

## Quality Guidelines

**Strong Proposition:**
- ✅ Semantic, not visual
- ✅ Universal applicability
- ✅ 3+ distinct use cases
- ✅ Clear category fit
- ✅ Demonstrates gap analysis

**Weak Proposition:**
- ❌ "I want blue buttons"
- ❌ Single subdomain use case
- ❌ Combinable with existing mixins
- ❌ Vague semantic intent

→ **Quality criteria**: `references/PROPOSITION-GUIDE.md`

## Common Patterns

**Valid Gaps:**
- Calculating/uncertain content → `state('computing')`
- Historical/archived data → `state('archived')`
- Real-time collaboration → `synapse('collaborate')`
- Social proof elements → `entity('testimonial')`

**Invalid (Use Existing):**
- "Larger text" → `cognition('axiom')` already scales
- "Blue background" → Use atmosphere combinations
- "Rounded corners" → Entity variants handle this

## Validation

Before submitting:
```bash
# Check theme repo builds
npm test

# Review existing variants
cat _sass/ontology/INTEGRATION-GUIDE.md | grep "genesis-"
```

## Resources

**Complete Proposition System**:
- `references/PROPOSITION-GUIDE.md` - **Complete proposition creation guide**
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - PR template

**Ontology Reference**:
- `/docs/specifications/scss-ontology-system.md` - All 41+ variants, categories
- `_sass/ontology/INTEGRATION-GUIDE.md` - API reference
- `GENOME.md` - Variant evolution history
- `/docs/specifications/scss-styling.md` - SCSS patterns and standards

**Related**:
- `.github/skills/theme-genome-agent/SKILL.md` - Proposition review process
- `.github/AGENT-WORKFLOWS.md` - Workflow 1: Subdomain identifies gap
- `.github/docs/ontological-proposition-guide.md` - Proposition creation guide
- `/docs/specifications/github-copilot-agent-guidelines.md` - Agent standards

**Related Skills**: theme-genome-agent, scss-refactor-agent

---

**Version History**:
- **v2.1** (2026-02-10): High-density refactor - 366→148 lines, enhanced spec references
- **v2.0**: Initial subdomain evolution system
