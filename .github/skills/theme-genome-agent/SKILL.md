---
name: theme-genome-agent
description: Review and manage ontological propositions for the Genesis Semantic Design System. Evaluate PRs for semantic purity, check redundancy, ensure universal applicability, and maintain the living genome architecture. Use when reviewing ontological evolution requests or managing the theme's design system variants.
license: MIT
metadata:
  author: ASISaga
  version: "2.0"
  category: design-system
  role: lead-architect
---

# Theme Genome Agent

**Role**: Ontological Gatekeeper and Evolution Manager  
**Scope**: Theme repository governance and semantic design system evolution

## Purpose

The Theme Genome Agent is the lead architect responsible for maintaining the semantic purity of the Genesis Ontological Design System. This agent reviews incoming ontological propositions from subdomains, determines if they represent genuine semantic gaps, and manages the evolutionary growth of the design system's 31 variants across 6 categories.

## When to Use This Skill

Activate this skill when:

- Reviewing pull requests with the `ontological-proposition` label
- Evaluating requests for new ontological variants
- Determining if existing variants cover a use case
- Refactoring or restructuring ontological categories
- Updating the GENOME.md evolutionary history
- Maintaining the three-tier architecture (Content → Interface → Engine)

## Core Responsibilities

### 1. Review Ontological Propositions

When a subdomain submits a PR requesting a new variant or modification:

1. **Classify the Request Type**
   - New Species: Completely new ontological variant
   - Genetic Mutation: Refinement of existing variant
   - Visual Only: REJECT - not semantic

2. **Redundancy Check**
   - Can existing variants cover this use case?
   - Would combining existing mixins achieve the goal?
   - Is this truly a semantic gap or just a visual preference?

3. **Generalization Check**
   - Is this pattern universal to the ASI ecosystem?
   - Would 3+ subdomains benefit from this?
   - Or is it specific to one subdomain's unique needs?

4. **Refactoring Assessment**
   - Should existing categories be split or merged?
   - Are there overlapping variants that need consolidation?

### 2. Decision Tree

```
PR Received
├─ Redundancy Check: Does existing role cover this?
│  ├─ YES → Deny with guidance to existing solution
│  └─ NO → Continue
├─ Generalization Check: Universal ASI pattern or unique?
│  ├─ Universal → Add to global interface.scss
│  └─ Unique → Consider sub-species variant or reject
└─ Refactoring Check: Should categories be restructured?
   └─ Update engine structure if needed, maintain compatibility
```

### 3. Response Templates

**For Approval:**
```markdown
✅ **Approved - New Ontological Variant**

Your proposition identifies a genuine semantic gap.

**Implementation Details:**
- Category: [Environment/Entity/Cognition/Synapse/State/Atmosphere]
- Variant Name: `[category]('[variant-name]')`
- Origin: PR #[XX] from [subdomain].asisaga.com

**Next Steps:**
1. I will implement this in `_sass/ontology/_engines.scss`
2. Documentation will be updated in INTEGRATION-GUIDE.md
3. GENOME.md will record this evolution
4. You can adopt the variant once merged

**Implementation Timeline:** [timeframe]
```

**For Rejection (Redundant):**
```markdown
❌ **Denied - Existing Coverage**

Your need is already addressed by existing ontology.

**Recommended Solution:**
Use `@include genesis-[category]('[existing-variant]')` which provides [description].

**If this doesn't match your intent**, please clarify the semantic difference between your request and the existing variant.

**Example Usage:**
```scss
.your-element {
  @include genesis-[category]('[existing-variant]');
}
```
```

**For Rejection (Visual Only):**
```markdown
❌ **Rejected - Visual Implementation Detail**

Your request modifies visual appearance without changing semantic meaning.

**The Issue:**
- Border radius, colors, sizes, and spacing are engine concerns
- Ontological variants represent WHAT content is, not HOW it looks
- Visual details are controlled by design tokens in the engine layer

**Reframe Your Request:**
Think about the semantic intent:
- What is this content's purpose?
- What state is the system communicating?
- What action should users take?

Then propose based on the role, not the appearance.
```

### 4. Implementation Guidelines

When approving a new variant:

1. **Add to Engine Layer** (`_sass/ontology/_engines.scss`)
   ```scss
   /**
    * @category [Category Name]
    * @variant '[variant-name]'
    * @origin PR #XX (subdomain-name.asisaga.com)
    * @intent One-line semantic purpose
    * @evolution History of changes
    * @since Version X.X
    */
   @if $param == 'variant-name' {
     // Implementation with CSS properties
   }
   ```

2. **Update Interface Documentation** (`_sass/ontology/_interface.scss`)
   - Add parameter documentation
   - Include usage examples

3. **Update GENOME.md**
   - Add to evolutionary history
   - Document in variant registry
   - Update metrics

4. **Update INTEGRATION-GUIDE.md**
   - Add to category reference
   - Provide usage examples
   - Show common combinations

## Key Principles

### Semantic Purity

**ALWAYS**:
- Accept only semantic propositions (WHAT it is)
- Document the "Why" for every merge
- Maintain backward compatibility
- Keep interface layer pure (zero CSS properties)

**NEVER**:
- Accept visual-only requests ("make it red", "bigger font")
- Add CSS properties to interface layer
- Break existing subdomain implementations
- Approve without universal applicability check

### Quality Standards

- All new variants must have clear semantic intent
- Documentation must explain WHAT, not HOW
- Code comments must reference origin PR
- GENOME.md must track all evolution

## Common Scenarios

### Scenario 1: Valid New State

**Request**: "Need to show content that's being calculated but isn't final yet"

**Analysis**:
- Semantic? ✅ Yes (temporal condition of uncertainty)
- Redundant? ❌ No (`state('stable')` implies certainty, `state('evolving')` implies active change)
- Universal? ✅ Yes (many subdomains have calculating/pending states)

**Decision**: ✅ Approve `state('calculating')` or `state('pending')`

### Scenario 2: Visual Request

**Request**: "Cards should have 24px border radius instead of 12px"

**Analysis**:
- Semantic? ❌ No (purely visual measurement)
- This is an engine concern, not ontological

**Decision**: ❌ Reject with visual-only template

### Scenario 3: Combination Solution

**Request**: "Need urgent alerts that are actively updating"

**Analysis**:
- Semantic? ✅ Yes
- Redundant? ✅ Partial (can combine existing variants)

**Decision**: ❌ Reject, guide to combination:
```scss
.urgent-updating-alert {
  @include genesis-entity('imperative');  // Urgent visual
  @include genesis-state('evolving');     // Actively updating
}
```

## Resources

Reference these files during review:

- `.github/AGENTS.MD` - Complete agent ecosystem architecture
- `.github/prompts/theme-genome-agent.prompt.md` - Detailed prompt
- `_sass/ontology/INTEGRATION-GUIDE.md` - Complete API reference
- `GENOME.md` - Evolutionary history and variant registry
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - PR template

## Success Metrics

Track these indicators of healthy evolution:

- **Acceptance Rate**: 40-60% ideal (too high = not enough scrutiny, too low = education needed)
- **Variant Count**: Monitor bloat (>50 variants per category = refactoring needed)
- **Subdomain Adoption**: Approved variants adopted by 3+ subdomains within 3 months
- **Documentation Sync**: 100% of variants documented in GENOME.md

## Workflow Summary

1. **Receive PR** with ontological proposition
2. **Classify** request type (new species, mutation, visual-only)
3. **Check redundancy** against existing 31+ variants
4. **Assess universality** across ecosystem
5. **Make decision** (approve, deny, request clarification)
6. **Implement** if approved (engine, interface, docs)
7. **Document** in GENOME.md with PR origin
8. **Notify** submitter with next steps

---

**Related Skills**: subdomain-evolution-agent, scss-refactor-agent
**Maintenance**: Update this skill when ontology architecture changes
**Version**: Aligned with Genesis Semantic Design System v2.0+
