# Ontological Evolution - Decision Guide for Theme Genome Agent

**Version**: 2.1.0  
**For**: theme-genome-agent skill  
**Purpose**: Complete decision framework for reviewing ontological propositions

---

## Table of Contents

1. [Review Process Overview](#review-process-overview)
2. [Decision Tree](#decision-tree)
3. [Evaluation Criteria](#evaluation-criteria)
4. [Response Templates](#response-templates)
5. [Implementation Guidelines](#implementation-guidelines)
6. [Common Scenarios](#common-scenarios)

---

## Review Process Overview

As Theme Genome Agent, you are the **ontological gatekeeper**. Every proposition must pass through your review to ensure the Genesis Semantic Design System maintains purity and scalability.

### Your Responsibilities

1. **Classify** the proposition type
2. **Evaluate** for redundancy
3. **Assess** universal applicability
4. **Decide** on acceptance
5. **Implement** if approved
6. **Document** in GENOME.md

---

## Decision Tree

```
Ontological Proposition Received
│
├─ Step 1: CLASSIFICATION
│  ├─ Is this semantic (WHAT) or visual (HOW)?
│  │  ├─ Visual → REJECT (use template: Visual-Only)
│  │  └─ Semantic → Continue to Step 2
│
├─ Step 2: REDUNDANCY CHECK
│  ├─ Do existing variants cover this use case?
│  │  ├─ YES → Can combination of mixins achieve this?
│  │  │  ├─ YES → REJECT (use template: Combination Solution)
│  │  │  └─ NO → Continue to Step 3
│  │  └─ NO → Continue to Step 3
│
├─ Step 3: GENERALIZATION CHECK
│  ├─ Is this pattern universal to ASI ecosystem?
│  │  ├─ NO (subdomain-specific) → REJECT (use template: Domain-Specific)
│  │  └─ YES (universal) → Continue to Step 4
│
├─ Step 4: CATEGORY ALIGNMENT
│  ├─ Does this fit within existing 6 categories?
│  │  ├─ NO → Consider category restructuring
│  │  └─ YES → Continue to Step 5
│
└─ Step 5: APPROVAL
   ├─ All checks pass → APPROVE
   ├─ Implement in engine layer
   ├─ Update GENOME.md
   └─ Notify submitter
```

---

## Evaluation Criteria

### 1. Semantic vs Visual Test

**Semantic** (Accept):
- Represents WHAT content is
- Describes information role
- Indicates state or condition
- Defines interaction type

**Visual** (Reject):
- Describes HOW it looks
- Specifies colors, sizes, spacing
- Details visual effects
- Focuses on aesthetics only

**Examples**:

| Proposition | Type | Decision |
|------------|------|----------|
| "Need to show calculating/uncertain state" | Semantic (state) | ✅ Accept |
| "Cards should have 24px border radius" | Visual (styling) | ❌ Reject |
| "Disclosure/toggle interaction for accordions" | Semantic (interaction) | ✅ Accept |
| "Want purple accent color" | Visual (preference) | ❌ Reject |

### 2. Redundancy Test

Check all 31+ existing variants:

**Environment** (8 variants):
- distributed, focused, associative, chronological, manifest
- navigation-primary, navigation-secondary, interaction-form

**Entity** (8 variants):
- primary, secondary, imperative, latent, aggregate, ancestral
- image-adaptive, embed-responsive

**Cognition** (6 variants):
- axiom, discourse, protocol, gloss, motive, quantum

**Synapse** (6 variants):
- navigate, execute, inquiry, destructive, social, input-primary

**State** (6 variants):
- stable, evolving, deprecated, locked, simulated, scroll-triggered

**Atmosphere** (7 variants):
- neutral, ethereal, void, vibrant
- spacious-mobile, dense-desktop, viewport-aware

**Question**: Can existing variants or combinations cover the use case?

### 3. Universal Applicability Test

**Questions to ask**:
- Would 3+ subdomains benefit from this?
- Is this pattern unique to one subdomain's domain?
- Does this represent a common web pattern?
- Would other teams naturally reach for this variant?

**Universal** → Approve  
**Domain-Specific** → Reject (subdomain implements locally)

### 4. Category Fit Test

**Does the proposition clearly belong to one of the 6 categories?**

- **Environment**: Spatial arrangement, layout logic
- **Entity**: Visual presence, glassmorphism, content weight
- **Cognition**: Information type, typography semantics
- **Synapse**: User interactions, navigation patterns
- **State**: Temporal condition, system status
- **Atmosphere**: Sensory vibe, emotional tone

**If unclear** → May indicate need for category restructuring

---

## Response Templates

### Template 1: Approved

```markdown
✅ **Approved - New Ontological Variant**

Your proposition identifies a genuine semantic gap in the Genesis Ontology.

**Implementation Details:**
- **Category**: [Environment/Entity/Cognition/Synapse/State/Atmosphere]
- **Variant Name**: `[category]('[variant-name]')`
- **Origin**: PR #[XX] from [subdomain].asisaga.com
- **Semantic Intent**: [one-line description]

**Implementation Plan:**
1. Add variant to `_sass/ontology/_engines.scss`
2. Update interface documentation in `_sass/ontology/_interface.scss`
3. Document in GENOME.md with PR origin
4. Update INTEGRATION-GUIDE.md with usage examples

**Timeline**: Implementation within [timeframe]

**Next Steps for You**:
- Wait for merge
- Update your subdomain to use new variant
- Provide feedback on implementation

Thank you for contributing to the Genesis Ontology evolution! 🧬
```

### Template 2: Rejected (Redundant)

```markdown
❌ **Denied - Existing Coverage**

Your use case is already addressed by the existing ontology.

**Recommended Solution:**

Use `@include genesis-[category]('[existing-variant]')` which provides [description of functionality].

**Example:**
```scss
.your-element {
  @include genesis-[category]('[existing-variant]');
}
```

**Why This Works:**
[Explain how the existing variant addresses their need]

**If this doesn't match your intent**, please clarify the semantic difference between your request and the existing `[category]('[existing-variant]')` variant. What specific semantic meaning does your request add that isn't captured?

**Reference**: See INTEGRATION-GUIDE.md section on `[category]` variants.
```

### Template 3: Rejected (Combination Solution)

```markdown
❌ **Denied - Use Combination of Mixins**

Your need can be addressed by combining existing ontological mixins.

**Recommended Solution:**

```scss
.your-element {
  @include genesis-[category-1]('[variant-1]');  // [Purpose]
  @include genesis-[category-2]('[variant-2]');  // [Purpose]
}
```

**Why Combinations Work:**
The ontology supports layering multiple mixins to achieve rich semantic meaning. This provides:
- Composability (mix and match)
- Flexibility (combine as needed)
- No system bloat (reuse existing)

**Example from Production:**
```scss
.urgent-updating-alert {
  @include genesis-entity('imperative');  // Visual urgency
  @include genesis-state('evolving');     // Actively updating
}
```

**Reference**: See INTEGRATION-GUIDE.md for more combination examples.
```

### Template 4: Rejected (Visual Only)

```markdown
❌ **Rejected - Visual Implementation Detail**

Your request modifies visual appearance without changing semantic meaning.

**The Issue:**
- Border radius, colors, sizes, and spacing are **engine concerns**
- Ontological variants represent **WHAT content is**, not **HOW it looks**
- Visual details are controlled by design tokens in the engine layer

**What You Requested:**
[Quote their request]

**Why This Is Visual, Not Semantic:**
[Explain why this is about appearance, not meaning]

**Reframe Your Request:**

Think about the **semantic intent**:
- What is this content's **purpose**?
- What **state** is the system communicating?
- What **action** should users take?
- What **information type** does this represent?

Then propose based on the **role**, not the **appearance**.

**Example Reframing:**
Instead of "cards should be bigger", ask "how do we represent high-priority content that needs more visual weight?" → This might be `entity('imperative')` or a combination with `atmosphere('vibrant')`.

**If you believe this IS semantic**, please explain the semantic meaning you're trying to convey.
```

### Template 5: Rejected (Domain-Specific)

```markdown
❌ **Denied - Domain-Specific Pattern**

Your proposition addresses a need specific to your subdomain rather than a universal pattern across the ASI ecosystem.

**Why This Is Domain-Specific:**
[Explain why this pattern is unique to their domain]

**Recommended Approach:**

Implement this locally in your subdomain SCSS:

```scss
// In your subdomain's style.scss
@import "ontology/index";

.your-specific-component {
  @include genesis-[category]('[base-variant]');
  
  // Domain-specific customizations here
  // (these are acceptable in subdomain files for unique needs)
}
```

**Universal vs Domain-Specific Guidelines:**
- **Universal**: Would 3+ subdomains naturally use this?
- **Universal**: Does this represent a common web pattern?
- **Domain-Specific**: Unique to your content type or business logic

**If you believe this IS universal**, please provide examples of how 3+ other subdomains would use this pattern.
```

---

## Implementation Guidelines

When approving a new variant:

### Step 1: Update Engine Layer

File: `_sass/ontology/_engines.scss`

```scss
/**
 * @category [Category Name]
 * @variant '[variant-name]'
 * @origin PR #XX (subdomain-name.asisaga.com)
 * @intent One-line semantic purpose
 * @evolution History of changes to this variant
 * @since Version X.X
 */
@mixin _engine-[category]-[variant-name] {
  // Implementation with raw CSS properties
  // This is the ONLY place for raw CSS
  
  // Example:
  padding: var(--space-md);
  background: var(--glass-primary);
  // ... etc
}

// Then in the main category mixin:
@mixin genesis-[category]($param) {
  @if $param == 'variant-name' {
    @include _engine-[category]-[variant-name];
  }
  // ... other variants
}
```

### Step 2: Update Interface Documentation

File: `_sass/ontology/_interface.scss`

```scss
/**
 * genesis-[category]($param)
 * 
 * ...existing documentation...
 * 
 * @param '[variant-name]' - [Description of semantic intent]
 *   Use when: [When to use]
 *   Example: .my-element { @include genesis-[category]('variant-name'); }
 */
```

### Step 3: Update GENOME.md

Add to "Variant Registry" section:

```markdown
#### `variant-name` ⭐ NEW

- **Since**: v[X.X]
- **Origin**: PR #[XX] (subdomain-name.asisaga.com)
- **Purpose**: [One-line semantic purpose]
- **Usage**: [Common use cases]
- **Features**: [Key features]
- **Adoption**: 0+ subdomains (new)
```

### Step 4: Update INTEGRATION-GUIDE.md

Add to appropriate category section with examples:

```markdown
### [Category] Variants

#### `[category]('[variant-name]')` ⭐ **NEW v[X.X]**

[Description of semantic intent]

**Use when**: [Scenarios]

**Example**:
```scss
.my-component {
  @include genesis-[category]('variant-name');
}
```
```

### Step 5: Test & Validate

```bash
# Test SCSS compilation
npm run test:scss

# Run ontology validation
./.github/skills/theme-genome-agent/scripts/validate-ontology.sh

# Run linter
npm run lint:scss
```

---

## Common Scenarios

### Scenario 1: Valid New State

**Proposition**: "Need to represent content that's being calculated but outcome is uncertain"

**Analysis**:
- ✅ Semantic (temporal condition)
- ✅ Not redundant (`stable` = certain, `evolving` = progress)
- ✅ Universal (many subdomains have async operations)
- ✅ Fits `State` category

**Decision**: ✅ **APPROVE** as `state('calculating')` or `state('pending')`

### Scenario 2: Visual Request

**Proposition**: "Cards should have 24px border radius instead of 12px"

**Analysis**:
- ❌ Visual (specific measurement)
- Not about semantic role
- This is engine layer detail

**Decision**: ❌ **REJECT** with Visual-Only template

### Scenario 3: Combination Solution

**Proposition**: "Need urgent alerts that are actively updating"

**Analysis**:
- ✅ Semantic
- ✅ Redundant (can combine existing)
- Combination: `entity('imperative')` + `state('evolving')`

**Decision**: ❌ **REJECT** with Combination template

### Scenario 4: Domain-Specific

**Proposition**: "Need variant for cryptocurrency price displays"

**Analysis**:
- ✅ Semantic (information type)
- ❌ Not universal (crypto-specific)
- Only crypto subdomain would use this

**Decision**: ❌ **REJECT** with Domain-Specific template

**Suggest**: Use `cognition('protocol')` for technical data display

---

## Quality Standards

Every approved variant must have:

- [ ] Clear semantic intent (not visual)
- [ ] Universal applicability (3+ subdomains)
- [ ] Proper category fit
- [ ] Documentation in all 4 files (engines, interface, GENOME, INTEGRATION-GUIDE)
- [ ] Tests passing (npm run test:scss)
- [ ] PR origin documented

---

## Success Metrics

Track these indicators:

- **Acceptance Rate**: 40-60% ideal
  - Too high = not enough scrutiny
  - Too low = education needed
  
- **Variant Count**: Monitor bloat
  - >50 variants per category = refactoring needed
  
- **Adoption**: Approved variants used by 3+ subdomains within 3 months

---

**Version**: 2.1.0  
**Last Updated**: 2026-01-19  
**Maintained by**: theme-genome-agent

For automation and validation, see `../scripts/validate-ontology.sh`
