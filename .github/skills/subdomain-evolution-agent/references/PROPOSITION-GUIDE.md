# Ontological Proposition Reference Guide

This guide provides comprehensive reference for creating well-formed ontological propositions to evolve the Genesis Semantic Design System.

## Table of Contents

1. [What is an Ontological Proposition](#what-is-an-ontological-proposition)
2. [When to Create a Proposition](#when-to-create-a-proposition)
3. [Gap Analysis Process](#gap-analysis-process)
4. [Semantic vs Visual Distinction](#semantic-vs-visual-distinction)
5. [Six Ontological Categories](#six-ontological-categories)
6. [Proposition Template](#proposition-template)
7. [Quality Checklist](#quality-checklist)
8. [Common Mistakes](#common-mistakes)
9. [Example Propositions](#example-propositions)
10. [Submission Process](#submission-process)

## What is an Ontological Proposition

An **Ontological Proposition** is a formal request to add a new semantic variant to the Genesis Design System. It must:

- **Represent WHAT content is** (semantic role), not HOW it looks (visual style)
- **Fill a genuine gap** in the current 31+ variants
- **Be universally applicable** across the ASI Saga ecosystem
- **Have clear use cases** demonstrating the need

**Not a proposition:**
- "I want blue buttons" (visual preference)
- "Cards should be bigger" (size preference)
- "This page needs custom styling" (one-off need)

## When to Create a Proposition

### Valid Reasons

✅ **Create a proposition when:**

1. **Repeated Pattern**: You use the same mixin combination in 3+ places
2. **Missing Semantic Role**: Content type exists but no variant represents it
3. **Ecosystem Need**: Pattern would benefit other subdomains
4. **Clear Intent**: The semantic meaning is distinct and nameable

**Example**: "We display data that's being calculated but not yet final - there's no state variant for 'uncertain/calculating'"

### Invalid Reasons

❌ **Don't create a proposition for:**

1. **Visual Preferences**: "I prefer purple accents"
2. **One-Off Needs**: "This specific page needs unique styling"
3. **Existing Combinations**: "I want primary card with focused layout" (already possible)
4. **Implementation Details**: "Change the blur value to 30px"

## Gap Analysis Process

### Step 1: Review All Existing Variants

Check `_sass/ontology/INTEGRATION-GUIDE.md` for the complete variant list:

**Environment** (8 variants):
- distributed, focused, associative, chronological, manifest, isolated, adaptive, orbital

**Entity** (8 variants):
- primary, secondary, imperative, latent, aggregate, ancestral, ephemeral, ambient

**Cognition** (6 variants):
- axiom, discourse, protocol, gloss, motive, quantum

**Synapse** (6 variants):
- navigate, execute, inquiry, destructive, social, composite

**State** (6 variants):
- stable, evolving, deprecated, locked, simulated, transitional

**Atmosphere** (7 variants):
- neutral, ethereal, void, vibrant, consciousness, neural, genesis

### Step 2: Try Combinations First

Before proposing new variant, try combining existing ones:

```scss
// Instead of proposing new variant, combine:
.urgent-calculating {
  @include genesis-entity('imperative');   // Urgent
  @include genesis-state('evolving');      // Currently changing
  @include genesis-atmosphere('vibrant');  // High-energy
}
```

If combination feels awkward or requires many mixins, you may have a genuine gap.

### Step 3: Apply Decision Matrix

```
Can I achieve this with existing variants?
├─ YES → Use existing, don't create PR
└─ NO → Continue

Can I combine 2-3 existing mixins?
├─ YES → Use combination, don't create PR
└─ NO → Continue

Is this about WHAT or HOW?
├─ HOW (visual) → Don't create PR
└─ WHAT (semantic) → Continue

Is this universal to ecosystem?
├─ YES → Create proposition
└─ NO → Use local solution
```

## Semantic vs Visual Distinction

### Semantic Indicators (Good)

These suggest a genuine semantic gap:

- **Information role**: "Data that represents X"
- **User intent**: "Action that signifies Y"
- **Content state**: "Information in condition Z"
- **Meaning**: "Represents the concept of..."

**Example**: "Content that represents user-contributed testimonials" → `entity('testimonial')`

### Visual Indicators (Bad)

These suggest visual preference, not semantic gap:

- **Size**: "Bigger", "smaller", "larger"
- **Color**: "Blue", "purple", "darker"
- **Shape**: "More rounded", "square"
- **Effects**: "More blur", "brighter glow"

**Example**: "Cards with more blur" → Not a semantic gap, adjust existing

### Conversion Exercise

Convert visual language to semantic thinking:

| Visual Request | Semantic Equivalent |
|----------------|---------------------|
| "Bigger headlines" | "Primary vs secondary importance" → Use `axiom` vs `motive` |
| "Red alert boxes" | "System-critical warnings" → Use `entity('imperative')` |
| "Faded old content" | "Archived/historical data" → Use `entity('ancestral')` |
| "Pulsing buttons" | "In-progress actions" → Use `state('evolving')` |

## Six Ontological Categories

### 1. Environment (Spatial Logic)

**Proposes**: Layout patterns, spatial arrangements

**Gap indicators**:
- "Content needs to flow in a way not covered"
- "Layout pattern used across multiple pages"

**Example**: `environment('archive')` - Chronological with metadata sidebar

### 2. Entity (Visual Presence)

**Proposes**: Content weight, glassmorphism variants

**Gap indicators**:
- "This content type has distinct visual importance"
- "Cards for this purpose need different weight"

**Example**: `entity('testimonial')` - Social proof styling

### 3. Cognition (Information Type)

**Proposes**: Typography based on semantic meaning

**Gap indicators**:
- "Text serves a purpose not covered"
- "Information type needs distinct typography"

**Example**: `cognition('speculation')` - Uncertain/calculated data

### 4. Synapse (Interaction)

**Proposes**: User actions, navigation patterns

**Gap indicators**:
- "User action type not represented"
- "Interaction pattern repeated everywhere"

**Example**: `synapse('reorder')` - Drag-and-drop rearrangement

### 5. State (Temporal Condition)

**Proposes**: Time-based or conditional states

**Gap indicators**:
- "Content has a state not represented"
- "Temporal condition needs visual identity"

**Example**: `state('calculating')` - In-progress computation

### 6. Atmosphere (Sensory Vibe)

**Proposes**: Emotional tone, aesthetic texture

**Gap indicators**:
- "Section needs distinct mood"
- "Sensory feeling not captured"

**Example**: `atmosphere('serene')` - Calm, meditative sections

## Proposition Template

Use this template for your PR description:

```markdown
## Proposed Variant

**Category**: [Environment/Entity/Cognition/Synapse/State/Atmosphere]  
**Variant Name**: `'variant-name'`  
**Mixin**: `@include genesis-[category]('variant-name')`

## Semantic Intent

[One clear sentence describing WHAT this represents, not HOW it looks]

Example: "Represents data that is currently being calculated but not yet certain or final."

## Origin

**Subdomain**: [subdomain-name.asisaga.com]  
**Use Cases**: [2+ specific examples where this is needed]

1. Real-time analytics dashboard showing live calculations
2. AI model predictions before confidence threshold reached
3. Weather forecasts updating as new data arrives

## Category Analysis

**Why this category?**

[Explain why you chose this category over others]

Example: "This is a State variant because it represents a temporal condition of data (calculating/uncertain), not a layout pattern (Environment) or interaction type (Synapse)."

## Justification

### Existing Variants Reviewed

I reviewed all current [category] variants:
- `variant1`: Doesn't fit because...
- `variant2`: Doesn't fit because...

### Why Combination Doesn't Work

I attempted these combinations:
```scss
// Tried this but it's not semantic:
@include genesis-state('evolving');  // Implies change, not uncertainty
@include genesis-entity('latent');   // Implies inactive, not calculating
```

### Universal Applicability

This pattern applies to:
- Research subdomain: Live experiment results
- Docs subdomain: API response time estimates
- Main site: User statistics calculations

### Semantic Distinctness

This represents a unique semantic role: data in an uncertain/calculating state, distinct from:
- `evolving` (changing but certain)
- `simulated` (projected, not live)
- `stable` (certain and final)

## Proposed Implementation

```scss
// Interface layer (_interface.scss)
@mixin genesis-state($condition) {
  @if $condition == 'calculating' {
    @include engine-state-calculating;
  }
}

// Engine layer (_engines.scss)
@mixin engine-state-calculating {
  opacity: 0.7;
  font-style: italic;
  border-left: 3px dashed var(--accent-neural);
  position: relative;
  
  &::after {
    content: '⏳';
    position: absolute;
    right: 8px;
    top: 8px;
    opacity: 0.5;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    animation: pulse-calculating 2s infinite;
  }
}
```

## Documentation Updates

I will update:
- [ ] `_sass/ontology/INTEGRATION-GUIDE.md` - Add to State variants
- [ ] `GENOME.md` - Document origin and rationale
- [ ] `.github/skills/README.md` - Update variant count

## Labels

- [x] `ontological-proposition`
- [x] `design-system`
```

## Quality Checklist

Before submitting, verify:

**Semantic Purity**:
- [ ] Describes WHAT, not HOW
- [ ] Uses semantic language (role, meaning, intent)
- [ ] Avoids visual terms (color, size, style)

**Gap Analysis**:
- [ ] Reviewed all existing variants in category
- [ ] Tried combining existing mixins
- [ ] Documented why combinations don't work
- [ ] Clear category classification

**Universal Applicability**:
- [ ] 2+ use cases provided
- [ ] Use cases span multiple contexts
- [ ] Would benefit other subdomains
- [ ] Not subdomain-specific

**Implementation**:
- [ ] Mixin name is semantic (not visual)
- [ ] Uses lowercase with hyphens
- [ ] Interface layer has no CSS properties
- [ ] Engine layer follows accessibility standards

**Documentation**:
- [ ] Origin subdomain documented
- [ ] PR has `ontological-proposition` label
- [ ] Clear semantic intent statement
- [ ] Justification addresses all concerns

## Common Mistakes

### Mistake 1: Visual Preference Disguised as Semantic

❌ **Wrong**:
> "Propose `entity('large-card')` for bigger cards"

✅ **Right**:
> "Propose `entity('featured')` for high-priority showcase content"

### Mistake 2: One-Off Subdomain Need

❌ **Wrong**:
> "Our research page needs a unique layout for experiment results"

✅ **Right**:
> "Scientific data presentation pattern used across research, docs, and blog"

### Mistake 3: Didn't Try Combinations

❌ **Wrong**:
> "Need new variant for urgent calculating data"

✅ **Right**:
> "Tried `imperative` + `evolving` but semantically awkward - calculating isn't urgent, it's uncertain"

### Mistake 4: Poor Semantic Naming

❌ **Wrong**:
> `entity('blue-glow')`, `state('faded')`, `cognition('big-text')`

✅ **Right**:
> `entity('testimonial')`, `state('deprecated')`, `cognition('axiom')`

## Example Propositions

### Example 1: New State Variant (Good)

**Variant**: `state('calculating')`  
**Intent**: "Represents data currently being computed but not yet final"  
**Use Cases**:
1. Real-time analytics showing live calculations
2. AI predictions before confidence threshold
3. Weather forecasts updating with new data

**Why Not Existing**:
- `evolving`: Implies changing but certain
- `simulated`: Implies projected, not live
- `stable`: Opposite condition

**Universal**: Applies to research, docs, dashboards, any real-time data

### Example 2: New Synapse Variant (Good)

**Variant**: `synapse('reorder')`  
**Intent**: "User action to rearrange items through drag-and-drop"  
**Use Cases**:
1. Task list prioritization
2. Photo gallery arrangement
3. Navigation menu customization

**Why Not Existing**:
- `execute`: Generic action, not specific to reordering
- `inquiry`: Request for data, not rearrangement

**Universal**: Any interface with user-customizable order

### Example 3: Visual Preference (Bad - Rejected)

**Variant**: `entity('more-blur')`  
**Intent**: "Cards with stronger glass effect"  
**Reason for Rejection**: This is a visual detail, not a semantic role. Adjust blur values in engine layer for existing `entity('primary')`.

### Example 4: Combination Works (Bad - Unnecessary)

**Variant**: `entity('urgent-primary')`  
**Intent**: "Important cards that need emphasis"  
**Reason for Rejection**: Use `entity('imperative')` which already exists for urgent/critical content.

## Submission Process

### 1. Create Proposition Document

Create `PROPOSITION.md` in your subdomain repository using the template above.

### 2. Validate Proposition

Run the validation script:

```bash
./.github/skills/subdomain-evolution-agent/scripts/validate-proposition.sh PROPOSITION.md
```

Address any warnings or errors.

### 3. Submit PR to Theme Repository

```bash
# In theme.asisaga.com repository
git checkout -b ontology/add-[variant-name]
# Copy PROPOSITION.md to PR description
# Add label: ontological-proposition
```

### 4. Respond to Review

Theme Genome Agent will review and either:
- **Approve**: Implement in engine layer
- **Request Changes**: Refine semantic justification
- **Reject (Redundant)**: Guide to existing solution
- **Reject (Visual)**: Educate on semantic thinking

### 5. Upon Approval

Theme Agent will:
1. Implement in `_sass/ontology/_engines.scss`
2. Update `GENOME.md` with origin
3. Update `INTEGRATION-GUIDE.md`
4. Notify you to adopt new variant

## Resources

- **SKILL.md** - Full agent instructions
- **_sass/ontology/INTEGRATION-GUIDE.md** - All current variants
- **GENOME.md** - Evolution history
- **.github/.github/docs/agent-philosophy.md** - Ecosystem overview
- **.github/prompts/theme-genome-agent.prompt.md** - Review criteria

---

**Version**: 2.1  
**Last Updated**: 2026-01-19  
**Maintained by**: subdomain-evolution-agent
