# Agent Communication Protocols

**Last Updated**: 2026-02-14  
**Audience**: All agents, system architects

## Overview

This document defines how agents communicate with each other, with human developers, and with the broader ecosystem.

## Communication Channels

### 1. GitHub Pull Requests (Primary Evolution Mechanism)

**Purpose**: Propose and review ontological changes

**Workflow**:
1. Subdomain agent identifies semantic gap
2. Creates PR using `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`
3. Theme Genome Agent reviews and responds
4. Iterative refinement through PR comments
5. Approval, modification request, or rejection
6. Implementation and documentation

**Best practices**:
- Use structured template for consistency
- Provide concrete examples
- Document reasoning clearly
- Respond within 48 hours
- Keep discussion focused on semantics

**Reference**: `.github/docs/ontological-proposition-guide.md`

---

### 2. Code Comments (Decision Documentation)

**Purpose**: Document inline reasoning for future agents

**Format**:
```scss
/**
 * @category Entity
 * @variant 'ancestral'
 * @origin PR #145 (docs.asisaga.com)
 * @intent Represent historical/archived content
 * @evolution Added in v2.8 to support documentation archives
 * @since 2.8.0
 */
@if $nature == 'ancestral' {
  // Implementation
}
```

**What to document**:
- Why this variant was added
- What PR/subdomain requested it
- How it differs from similar variants
- When it was added/modified
- Evolution history if changed

**What NOT to document**:
- Implementation details (self-evident from code)
- Obvious CSS properties
- Temporary workarounds

---

### 3. GENOME.md (Historical Record)

**Purpose**: Maintain evolutionary history of design system

**Structure**:
```markdown
# Genesis Genome - Evolutionary History

## v2.8 - Archived Content Support (2026-02)

### New Variants
- `entity('ancestral')` - PR #145 from docs.asisaga.com
  - **Why**: Support historical/archived content distinction
  - **Impact**: Adopted by 4 subdomains within 2 weeks
  - **Related**: Differs from `state('deprecated')` by indicating valid historical content

### Refinements
- Enhanced `cognition('protocol')` with better contrast
  - **Why**: Accessibility feedback from community.asisaga.com
  - **Impact**: WCAG AAA compliance achieved

### Deprecations
- None this version
```

**Update frequency**: After each accepted PR

**Maintained by**: Theme Genome Agent

---

### 4. GitHub Issues (Complex Proposals & Discussions)

**Purpose**: Discuss complex changes requiring community input

**When to use**:
- Breaking changes to ontology
- Major refactoring proposals
- System-wide architectural changes
- Disambiguation of similar variants
- Multi-subdomain coordination

**When NOT to use**:
- Simple variant proposals (use PR)
- Bug reports (use standard issue template)
- Support questions (use Discussions)

**Format**:
```markdown
## Proposal: [Brief Description]

**Context**: Why is this being proposed?

**Problem**: What issue are we solving?

**Proposed Solution**: How should we solve it?

**Alternatives Considered**: What else was evaluated?

**Impact Analysis**:
- Subdomains affected: [list]
- Breaking changes: [yes/no and details]
- Migration effort: [low/medium/high]

**Decision Needed**: [Specific question for discussion]
```

---

### 5. Specification Updates (Knowledge Sharing)

**Purpose**: Keep all agents synchronized with latest patterns

**Process**:
1. Significant change made to system
2. Update relevant spec in `.github/specs/`
3. Agent Evolution Agent notified (or auto-detects)
4. Related agents updated to reference new spec
5. Documentation updated
6. Validation confirms consistency

**Notification methods**:
- Git commits trigger spec sync check
- Weekly automated audits
- Manual review for major changes

---

### 6. Agent Handoff Files (Internal Coordination)

**Purpose**: Protected configurations for cross-agent coordination

**Location**: `.github/agents/` (protected directory)

**Files**:
- `agent-handoff.yml` - Workflow transitions between agents
- `agent-capabilities.yml` - What each agent can do
- `agent-routing.yml` - Which agent handles what
- `quality-thresholds.yml` - Quality gates
- `feature-flags.yml` - System-level toggles

**Access**: Only during system-level operations, not task execution

**Example handoff**:
```yaml
# When PR is created with 'ontological-proposition' label
- trigger: pr_created
  label: ontological-proposition
  handoff:
    from: subdomain-evolution-agent
    to: theme-genome-agent
    context:
      - pr_number
      - source_subdomain
      - proposed_variant
    validation:
      - check_template_used
      - verify_semantic_framing
```

---

## Agent-to-Agent Protocols

### Subdomain Evolution ↔ Theme Genome

**Scenario**: Proposing new ontological variant

**Protocol**:
1. **Subdomain** prepares proposition
2. **Subdomain** submits PR with template
3. **Theme** acknowledges within 48h
4. **Theme** performs evaluation (redundancy, generalization, semantic)
5. **Theme** responds with decision + reasoning
6. **Subdomain** implements if approved, or refines if requested
7. **Theme** merges and updates documentation

**Communication style**:
- Professional and constructive
- Focus on semantic clarity
- Provide examples and use cases
- Reference existing patterns

---

### SCSS Refactor ↔ HTML Template

**Scenario**: Refactoring subdomain codebase

**Protocol**:
1. **HTML** ensures semantic structure is sound
2. **HTML** provides class naming that reflects purpose
3. **SCSS** analyzes HTML and creates mirrored SCSS
4. **SCSS** applies ontological mixins
5. **HTML** verifies visual result matches intent
6. **Both** validate together

**Communication style**:
- Collaborative iteration
- Share semantic interpretation
- Align on meaning before styling

---

### JavaScript Integration ↔ All Others

**Scenario**: Adding interactive behavior

**Protocol**:
1. **HTML** provides semantic structure with data attributes
2. **SCSS** applies visual states (hover, focus, active)
3. **JavaScript** adds progressive enhancement
4. **JavaScript** verifies accessibility
5. **All** test together

**Communication style**:
- Respect progressive enhancement
- Don't override semantic HTML
- Coordinate state management

---

### Agent Evolution ↔ All Agents

**Scenario**: System quality improvement

**Protocol**:
1. **Evolution** runs quality audits
2. **Evolution** identifies issues
3. **Evolution** notifies relevant agent
4. **Target agent** acknowledges and plans fix
5. **Evolution** validates after fix
6. **Evolution** updates metrics

**Communication style**:
- Data-driven feedback
- Constructive suggestions
- Recognition of improvements

---

## Agent-to-Human Protocols

### Providing Guidance

**DO**:
- ✅ Explain the "why" behind decisions
- ✅ Provide concrete examples
- ✅ Reference documentation
- ✅ Suggest alternatives
- ✅ Encourage semantic thinking

**DON'T**:
- ❌ Just say "no" without explanation
- ❌ Use jargon without defining it
- ❌ Assume knowledge level
- ❌ Be condescending
- ❌ Dismiss questions

**Example good response**:
```markdown
Thanks for the PR! This request is currently framed as a visual change 
("make cards have 24px border radius"), but our ontological system focuses 
on semantic purpose.

Could you help me understand the semantic intent? For example:
- Do these cards represent more important content? → Try entity('imperative')
- Are they interactive elements? → Try synapse('execute') or synapse('navigate')
- Do they need different visual hierarchy? → Try entity('primary') vs entity('secondary')

Border radius itself is controlled by the engine layer and changes based on 
the entity variant you choose.

See .github/docs/ontological-proposition-guide.md for more guidance on 
semantic framing. Happy to help refine this!
```

---

### Requesting Clarification

**When to ask**:
- Ambiguous semantic intent
- Multiple valid interpretations
- Missing use case information
- Unclear universal applicability

**How to ask**:
```markdown
I want to make sure I understand your need correctly. Could you clarify:

1. What type of information is this representing?
   - System status, user data, navigation, etc.?

2. How is it different from [existing variant]?
   - I see we have `state('evolving')` - does that not cover this?

3. Can you provide a concrete example?
   - Show HTML markup or describe user scenario?

This will help me determine the right ontological classification.
```

---

### Rejecting Requests

**Structure**:
1. Acknowledge the request
2. Explain why it doesn't fit
3. Provide guidance on alternatives
4. Offer to help reframe
5. Include references

**Example**:
```markdown
Thanks for this proposal! I'm going to **decline this PR** because it focuses 
on visual implementation rather than semantic purpose.

**Why this doesn't fit our ontological model**:
Our system separates "what content means" (ontology) from "how it looks" (engine). 
Requesting specific colors, sizes, or styling violates this separation.

**Alternatives to consider**:
- If you need visual prominence: `entity('imperative')`
- If you need user attention: `state('evolving')` with animation
- If you need hierarchy: `cognition('axiom')` vs `cognition('discourse')`

**How to reframe semantically**:
Instead of "make buttons blue", try "represent primary actions more prominently 
than secondary actions" - then we can discuss the right ontological variant.

**Resources**:
- Semantic thinking guide: .github/docs/agent-philosophy.md
- PR template: .github/PULL_REQUEST_TEMPLATE/ontological_proposition.md

Would you like help reframing this as a semantic proposal?
```

---

## Ecosystem-Wide Communication

### Subdomain Coordination

**Scenario**: Multiple subdomains need same pattern

**Protocol**:
1. First subdomain proposes variant
2. Theme approves and implements
3. Theme notifies other subdomain maintainers
4. Subdomains adopt when ready
5. Track adoption metrics

**Communication channel**: GitHub Discussions or shared issue

---

### Breaking Changes

**Protocol**:
1. Identify breaking change need
2. Open GitHub Issue for discussion
3. Document migration path
4. Announce across all channels
5. Provide migration period (90 days minimum)
6. Implement with clear versioning
7. Support during migration

**Communication**:
- GitHub Issue: Technical discussion
- Documentation: Migration guide
- CHANGELOG: Version notes
- GENOME.md: Evolution record

---

### Community Contributions

**Welcome**:
- Documentation improvements
- Bug fixes
- Accessibility enhancements
- Test coverage
- Validation scripts

**Require discussion first**:
- New ontological variants
- Breaking changes
- Architectural changes
- Major refactoring

**Process**:
1. Contributor opens issue describing proposal
2. Agents and maintainers discuss
3. Consensus reached or refined
4. Contributor implements with guidance
5. Review and merge

---

## Conflict Resolution

### Disagreement Between Agents

**Process**:
1. Each agent states position with reasoning
2. Reference relevant specs/docs
3. Identify point of disagreement
4. Escalate to human maintainer if needed
5. Document decision for future reference

**Example**:
```markdown
**Subdomain Agent**: This should be `state('evolving')` because data is changing
**Theme Agent**: I think `entity('latent')` is better because it's about visibility

**Resolution**: After reviewing specs, we agree this is about temporal state 
(changing over time) not visual prominence, so `state('evolving')` is correct. 
Updated decision-matrices.md to clarify this distinction.
```

---

### Updating Communication Protocols

**When protocols need changes**:
1. Open issue with proposal
2. Discuss impact on all agents
3. Update this document
4. Update affected agents
5. Announce change
6. Monitor adoption

---

## References

**Related Documentation**:
- `.github/docs/ontological-proposition-guide.md` - PR workflow
- `.github/docs/decision-matrices.md` - Quick decisions
- `.github/docs/agent-workflows.md` - Workflows and practical examples

**Templates**:
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`
- Issue templates in `.github/ISSUE_TEMPLATE/`

---

**Version**: 1.0  
**Purpose**: Define clear communication protocols for agent ecosystem
