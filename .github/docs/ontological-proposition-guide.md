# Ontological Proposition Guide

**Last Updated**: 2026-02-14  
**Audience**: Subdomain developers, contributors

## Overview

This guide explains the **Request-Classification-Review** cycle for evolving the Genesis Ontological Design System through pull requests.

## Evolutionary Handshake Protocol

### Phase 1: Subdomain Identifies Gap

A subdomain agent discovers a semantic pattern not covered by current ontology.

**Example**: Need to represent "incomplete/calculating data" - not the same as `protocol` (which implies certainty).

**Before creating PR**:
1. Review existing 31 variants in `/docs/specifications/scss-ontology-system.md`
2. Check if combining existing mixins could work
3. Verify this is a semantic need, not just visual preference

### Phase 2: Ontological Proposition (PR Template)

Use the template at `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`:

```markdown
## 🧩 Ontological Proposition

**Source Node**: [e.g., quantum-logs.asisaga.com]
**Intent (The 'What')**: Defining cognitive frequency for 'Incomplete Data'
**Context (The 'Why')**: Standard 'protocol' mixin implies certainty. Need representation for non-deterministic computing states.

## 🔭 Proposed Role

- **Type**: Cognition
- **Suggested Label**: `cognition('speculation')`
- **Relationship**: Sister-state to `protocol` but with lower visual frequency (reduced opacity, animated shimmer)

## 📋 Use Cases

1. Real-time analytics during computation
2. Placeholder data being fetched
3. AI model predictions with uncertainty

## 🌐 Universal Applicability

- Research subdomain: Displaying incomplete experiments
- Analytics subdomain: Streaming data updates
- Documentation: Draft/preview content
```

**Key elements**:
- **Intent**: What semantic purpose does this serve?
- **Context**: Why existing mixins don't cover this?
- **Use cases**: Concrete examples of usage
- **Universal applicability**: How other subdomains could use this

### Phase 3: Theme Agent Review

The Theme Genome Agent performs systematic evaluation:

#### 1. Redundancy Check

Could existing mixins or combinations serve this purpose?

**Questions**:
- Does `cognition('protocol')` with `state('evolving')` solve this?
- Is there overlap with `state('simulated')`?
- Can visual styling be adjusted without new variant?

#### 2. Generalization Check

Is this pattern universal to the ASI ecosystem?

**Universal** (✅ Approve):
- Error states for forms
- Loading/calculating indicators
- Archived/historical content
- Navigation patterns

**Subdomain-specific** (🤔 Consider or ❌ Deny):
- Very niche use cases
- Could be achieved with subdomain-specific SCSS
- Only one subdomain would use it

#### 3. Semantic Validation

Is this truly semantic or just visual preference?

**Semantic** (✅):
- "Display urgent system notifications" (imperative entity)
- "Show incomplete data" (evolving state)
- "Mark deprecated APIs" (deprecated state)

**Visual only** (❌):
- "Make buttons blue"
- "Use 24px border radius"
- "Add gradient background"

#### 4. Decision

- **✅ Approve**: Add variant to ontological system
- **🔄 Refactor**: Suggest combining existing mixins
- **❌ Deny**: Point to existing solution or explain why it doesn't fit

### Phase 4: Implementation & Documentation

If approved, Theme Agent:

1. **Add mixin variant** to `_sass/ontology/_engines.scss`
2. **Document in interface** at `_sass/ontology/_interface.scss`
3. **Update GENOME.md** with PR origin and evolution history
4. **Update specs** at `/docs/specifications/scss-ontology-system.md`

**Example implementation**:
```scss
/**
 * @param $intent [speculation] 
 * ORIGIN: PR #42 (quantum-logs.asisaga.com)
 * INTENT: Represent non-deterministic or calculating data states
 * EVOLUTION: Added in v2.1 to support streaming analytics
 */
@mixin genesis-cognition($intent) {
  @if $intent == 'speculation' {
    opacity: 0.85;
    font-style: italic;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
      animation: shimmer 2s infinite;
    }
  }
}
```

## Decision Matrix for Subdomain Agents

**Should I Create a PR?**

| Scenario | Action | Reasoning |
|----------|--------|-----------|
| Need new color or spacing | ❌ NO PR | Visual details are engine concern |
| Need specific font size | ❌ NO PR | Typography handled by cognition mixins |
| Found semantic pattern gap | ✅ YES PR | Missing role = ontological evolution |
| Existing mixin doesn't match intent | ✅ YES PR | Propose refinement or new variant |
| Just want different styling | ❌ NO PR | Use existing mixins differently |

## Decision Matrix for Theme Agent

**Should I Accept This PR?**

| PR Content | Decision | Action |
|------------|----------|--------|
| "Make buttons blue" | ❌ REJECT | Not semantic; visual only |
| "Add error state for forms" | ✅ APPROVE | Valid semantic state |
| Requests already covered by existing mixin | ❌ REJECT | Guide to existing solution |
| Universal ASI pattern | ✅ APPROVE | Add to global interface |
| Subdomain-specific edge case | 🤔 CONSIDER | May add as engine variant or deny |

## Example Workflows

### Example 1: Adding "Archived" Content State

**Subdomain Discovery**:  
Documentation site needs to mark old API versions as deprecated.

**PR Submission**:
```markdown
## Ontological Proposition
**Source**: docs.asisaga.com
**Intent**: Represent archived/historical content
**Context**: Old documentation should remain accessible but clearly marked

**Proposed Role**:
- Type: Entity
- Label: `entity('ancestral')`
- Visual: Muted colors, reduced opacity, "archived" badge
```

**Theme Review**:
- Redundancy: ❌ Not covered by `state('deprecated')`
- Universal: ✅ All subdomains have historical content
- Decision: ✅ Approve and add to entity mixins

**Implementation**:
```scss
@if $nature == 'ancestral' {
  opacity: 0.6;
  filter: grayscale(0.5);
  border-color: var(--border-muted);
  position: relative;
  
  &::before {
    content: 'Archived';
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.25rem 0.5rem;
    background: var(--background-muted);
    font-size: 0.75rem;
  }
}
```

### Example 2: Rejecting Visual-Only Request

**Subdomain Request**:
"Make cards have rounded corners of 24px instead of 12px"

**Theme Response**:
```markdown
❌ **Rejected - Visual Implementation Detail**

Your request modifies visual appearance without changing semantic meaning.

**Guidance**:
- Border radius is an engine concern, controlled by design tokens
- If you need different visual weight, use existing entity variants:
  - `entity('primary')` - Standard elevation
  - `entity('secondary')` - Subtle presence
  - `entity('imperative')` - Enhanced prominence

If none of these match your semantic intent, please reframe as:
"We need a way to represent [WHAT], because [WHY]"
```

## Communication Channels

1. **GitHub PRs**: Primary evolution mechanism (use template)
2. **Issue Discussions**: Complex proposals needing community input
3. **Code Comments**: Document implementation decisions
4. **GENOME.md**: Historical record of system evolution

## References

**Related Documentation**:
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - PR template
- `/docs/specifications/scss-ontology-system.md` - All 31 variants
- `.github/specs/ontological-design-system.md` - Complete specification
- `.github/docs/decision-matrices.md` - Detailed decision trees
- `GENOME.md` - Evolutionary history

**Agent Resources**:
- `.github/prompts/theme-genome-agent.prompt.md` - Review workflows
- `.github/prompts/subdomain-evolution-agent.prompt.md` - Proposition creation
- `.github/skills/subdomain-evolution-agent/SKILL.md` - Agent skill definition

---

**Version**: 1.0  
**Purpose**: Guide ontological evolution through structured PR process
