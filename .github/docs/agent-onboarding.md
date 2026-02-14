# Agent Onboarding & Training

**Last Updated**: 2026-02-14  
**Audience**: New agents, contributors learning the system

## Overview

This guide provides a structured onboarding path for new agents (AI or human) joining the ASI Saga agent ecosystem.

## Onboarding Checklist

### Phase 1: Foundation (Required)

- [ ] Read `.github/docs/` - Core principles
- [ ] Read `.github/copilot-instructions.md` - High-level architecture
- [ ] Review directory structure in `.github/`
- [ ] Understand separation of concerns (instructions vs specs vs docs)

### Phase 2: Specifications (Required)

- [ ] Read `.github/specs/agent-intelligence-framework.md` - Complete framework
- [ ] Read `.github/specs/ontological-design-system.md` - Design system spec
- [ ] Read `.github/specs/genesis-theme-repository.md` - Repository specifics
- [ ] Review `/docs/specifications/scss-ontology-system.md` - All 31 variants

### Phase 3: Agent System (Required)

- [ ] Review all agents in `.github/agents/`
- [ ] Review all prompts in `.github/prompts/`
- [ ] Review all skills in `.github/skills/`
- [ ] Understand handoff protocols between agents

### Phase 4: Workflows (Required)

- [ ] Read `.github/docs/ontological-proposition-guide.md` - PR workflow
- [ ] Read `.github/docs/decision-matrices.md` - Quick decisions
- [ ] Read `.github/docs/workflow-examples.md` - Practical examples
- [ ] Practice with refactor examples

### Phase 5: Quality & Evolution (Recommended)

- [ ] Read `.github/docs/agent-metrics.md` - Quality measurement
- [ ] Read `.github/docs/dogfooding-guide.md` - Self-improvement
- [ ] Read `.github/docs/agent-communication.md` - Inter-agent protocols
- [ ] Run validation scripts to understand checks

## Training Scenarios

### Scenario 1: Visual Request Recognition

**Setup**: Subdomain requests "dark mode toggle"

**Your Task**: Determine if this is ontological evolution or visual implementation.

<details>
<summary>Click to reveal answer</summary>

**Correct Response**: 
This is a valid ontological request IF framed semantically.

**Good framing**:
- "Need atmosphere variants for different visual moods" → Propose `atmosphere('void')` for dark mode
- Already exists in ontology! Use `genesis-atmosphere('void')`

**Bad framing**:
- "Make background black and text white" → Reject as visual only

**Action**: Guide submitter to use existing `genesis-atmosphere` variants.

**Reference**: `.github/docs/decision-matrices.md` - "Should I Create a PR?"
</details>

---

### Scenario 2: Identifying Semantic Gaps

**Setup**: Subdomain needs to show "incomplete data being calculated"

**Your Task**: Determine if existing ontology covers this or if new variant needed.

<details>
<summary>Click to reveal answer</summary>

**Analysis**:
- `cognition('protocol')` - Implies certainty, not right
- `state('evolving')` - Indicates change, but not specific to data calculation
- `state('simulated')` - For simulated/test data, not real incomplete data

**Check combinations**:
- `cognition('protocol') + state('evolving')` - Could work!
- Or propose new: `state('calculating')` or `cognition('speculation')`

**Correct Response**:
1. First try combination of existing mixins
2. If insufficient, propose new variant with proper semantic framing
3. Document use case and universal applicability

**Reference**: `.github/docs/ontological-proposition-guide.md`
</details>

---

### Scenario 3: SCSS Refactoring

**Setup**: Convert this legacy CSS to ontological mixins:

```scss
.alert-box {
  background: #ff0000;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
}
```

**Your Task**: Identify semantic purpose and apply correct mixins.

<details>
<summary>Click to reveal answer</summary>

**Analysis**:
- Red background + bold = urgency/importance
- Alert/notification pattern
- Should grab user attention

**Ontological classification**:
- Visual prominence: `entity('imperative')` - urgent/important
- Could also use: `state('stable')` if confirmed alert vs `state('evolving')` if changing

**Correct conversion**:
```scss
.alert-box {
  @include genesis-entity('imperative');
  @include genesis-cognition('protocol'); // If showing system message
}
```

**Why these choices**:
- `imperative` entity = demands attention (visual)
- `protocol` cognition = system communication (semantic)

**Reference**: `.github/docs/decision-matrices.md` - "How Should I Convert This CSS?"
</details>

---

### Scenario 4: Headline Sizing Request

**Setup**: "We need bigger headlines"

**Your Task**: Respond appropriately to this request.

<details>
<summary>Click to reveal answer</summary>

**Incorrect Response**:
❌ Add `font-size: 3rem` override in subdomain

**Correct Response**:
✅ "Use `genesis-cognition('axiom')` which provides primary heading typography. Headlines should already be properly sized. If you need hierarchical distinction, you have:
- `axiom` - Primary headings (largest)
- `discourse` - Body text
- `protocol` - System messages
- `gloss` - Secondary/metadata text (smallest)

If none of these match your semantic need, please describe WHAT type of information needs emphasis and WHY, not just 'bigger'."

**Principle**: Guide toward semantic thinking, not visual solutions.

**Reference**: `.github/docs/` - Semantic Purity
</details>

---

### Scenario 5: Multiple Mixins

**Setup**: Card needs layout, visual style, and state indication

**Your Task**: Apply multiple ontological categories correctly.

<details>
<summary>Click to reveal answer</summary>

**Correct approach**:

```scss
.product-card {
  @include genesis-environment('distributed'); // Layout in grid
  @include genesis-entity('primary');          // Standard visual prominence
  @include genesis-state('stable');            // Confirmed/verified product
  
  .product-title {
    @include genesis-cognition('axiom');       // Main heading
  }
  
  .product-price {
    @include genesis-cognition('protocol');    // Key data point
  }
  
  .buy-button {
    @include genesis-synapse('execute');       // Primary action
  }
}
```

**Why this works**:
- Multiple mixins can be combined
- Each mixin serves distinct semantic purpose
- No raw CSS properties
- Clear semantic hierarchy

**Reference**: `/docs/specifications/scss-ontology-system.md` - Combining Mixins
</details>

---

## Agent Role Specialization

### If You're a Theme Genome Agent

**Focus on**:
- PR review and evaluation
- Ontological purity maintenance
- System evolution management
- Documentation governance

**Key skills**:
- Semantic analysis
- Pattern recognition
- Redundancy detection
- Documentation

**Training path**:
1. Study all approved PRs in history
2. Analyze rejected PRs to understand why
3. Practice redundancy checks
4. Learn GENOME.md maintenance

### If You're a Subdomain Evolution Agent

**Focus on**:
- Identifying semantic gaps
- Creating well-formed propositions
- Subdomain-specific needs
- Pattern communication

**Key skills**:
- Semantic framing
- Use case documentation
- Universal applicability analysis
- Clear communication

**Training path**:
1. Review existing ontology thoroughly
2. Practice identifying gaps vs existing coverage
3. Study approved proposition examples
4. Learn to write semantic justifications

### If You're an SCSS Refactor Agent

**Focus on**:
- CSS to mixin conversion
- Semantic classification
- Zero-CSS enforcement
- HTML-SCSS mapping

**Key skills**:
- Pattern recognition
- Semantic analysis
- Mixin selection
- Validation

**Training path**:
1. Study `_sass/ontology/refactor-agent.md`
2. Practice on example files
3. Learn validation tools
4. Master the verification protocol

### If You're an HTML Template Agent

**Focus on**:
- Semantic HTML structure
- Accessibility compliance
- Meaningful class names
- Template patterns

**Key skills**:
- HTML5 semantics
- WCAG guidelines
- BEM methodology
- Jekyll/Liquid

**Training path**:
1. Study accessibility requirements
2. Review semantic patterns guide
3. Practice meaningful naming
4. Learn template parameterization

### If You're a JavaScript Integration Agent

**Focus on**:
- Progressive enhancement
- Interaction patterns
- Accessibility
- State management

**Key skills**:
- ES6 modules
- Event handling
- Synapse mapping
- A11y testing

**Training path**:
1. Study interaction patterns spec
2. Learn Motion library integration
3. Master synapse variant mapping
4. Practice progressive enhancement

### If You're an Agent Evolution Agent

**Focus on**:
- System quality metrics
- Spec coverage improvement
- Duplication elimination
- Continuous improvement

**Key skills**:
- Metrics analysis
- Refactoring
- Documentation
- Validation scripting

**Training path**:
1. Master all validation scripts
2. Understand dogfooding principles
3. Learn metrics interpretation
4. Practice self-improvement workflows

## Competency Assessment

### Level 1: Beginner

**Knowledge**:
- ✅ Understands three-tier architecture
- ✅ Can identify the 6 ontological categories
- ✅ Knows difference between semantic and visual
- ✅ Familiar with basic workflow

**Skills**:
- Can classify HTML elements semantically
- Can identify obvious semantic gaps
- Understands when to use vs not use raw CSS

**Next steps**: Practice with guided scenarios, shadow experienced agents

### Level 2: Intermediate

**Knowledge**:
- ✅ Knows all 31 ontological variants
- ✅ Understands when to combine mixins
- ✅ Familiar with PR review process
- ✅ Can navigate specs and docs

**Skills**:
- Can refactor simple CSS to mixins
- Can write basic ontological propositions
- Can review PRs for semantic validity
- Can use validation tools

**Next steps**: Handle simple PRs, refactor real code, contribute to docs

### Level 3: Advanced

**Knowledge**:
- ✅ Deep understanding of ontological philosophy
- ✅ Knows edge cases and complex patterns
- ✅ Understands system evolution principles
- ✅ Familiar with all validation tools

**Skills**:
- Can handle complex PR reviews
- Can identify subtle semantic issues
- Can refactor complex legacy code
- Can propose system improvements

**Next steps**: Mentor others, evolve the system, handle complex scenarios

### Level 4: Expert

**Knowledge**:
- ✅ Complete mastery of ontological system
- ✅ Understands historical evolution
- ✅ Can explain rationale for all decisions
- ✅ Knows all edge cases and workarounds

**Skills**:
- Can evaluate any PR independently
- Can refactor any codebase
- Can design new system components
- Can improve the agent system itself

**Current role**: System architect, trainer, evolution leader

## Resources by Learning Style

### Visual Learners

- **Test pages**: Explore `/tests/ontology/` demos
- **Before/after examples**: See `/docs/archive/refactorings/`
- **Diagrams**: Review architecture diagrams in specs

### Reading Learners

- **Specifications**: Complete technical details in `.github/specs/`
- **Documentation**: Implementation guides in `.github/docs/`
- **Examples**: Code samples throughout specs and docs

### Hands-On Learners

- **Practice refactoring**: Use files in `/tests/` directory
- **Run validation**: Execute scripts in `.github/skills/*/scripts/`
- **Build locally**: `npm run build` and see results
- **Test changes**: `npm test` to validate

### Interactive Learners

- **Review real PRs**: Study closed ontological proposition PRs
- **Pair with experienced agent**: Shadow their decision making
- **Ask questions**: Open discussions for clarification
- **Contribute**: Start with small documentation improvements

## Certification Path

### Junior Agent

**Requirements**:
- [ ] Complete Phase 1-3 of onboarding checklist
- [ ] Pass all 5 training scenarios correctly
- [ ] Successfully refactor 3 example files
- [ ] Demonstrate understanding in interview

### Agent

**Requirements**:
- [ ] Complete full onboarding checklist
- [ ] Successfully review 5 PRs with feedback
- [ ] Refactor complex legacy codebase
- [ ] Contribute documentation improvement
- [ ] Show Level 2 competency

### Senior Agent

**Requirements**:
- [ ] 6+ months experience as Agent
- [ ] Led significant refactoring project
- [ ] Proposed and implemented system improvement
- [ ] Mentored 2+ junior agents
- [ ] Show Level 3 competency

### Lead/Architect Agent

**Requirements**:
- [ ] 12+ months as Senior Agent
- [ ] Designed major system evolution
- [ ] Regular contributions to specs/framework
- [ ] Community recognition
- [ ] Show Level 4 competency

## Quick Reference Card

**Print and keep handy**:

```
ONTOLOGICAL CATEGORIES (6)
━━━━━━━━━━━━━━━━━━━━━━━━
Environment → Layout logic
Entity → Visual presence  
Cognition → Information type
Synapse → Interaction
State → Temporal condition
Atmosphere → Sensory vibe

DECISION SHORTCUTS
━━━━━━━━━━━━━━━━━━
Visual only? → REJECT
Semantic gap? → CONSIDER PR
Existing coverage? → USE IT
Urgent? → entity('imperative')
Historical? → entity('ancestral')
Title? → cognition('axiom')
Button? → synapse('execute')

VALIDATION
━━━━━━━━━━━━━━━━━━
npm test → Run all tests
npm run test:scss → SCSS only
npm run lint:scss → Style check

REFERENCES
━━━━━━━━━━━━━━━━━━
Variants: /docs/specifications/scss-ontology-system.md
Philosophy: .github/docs/agent-philosophy.md
Decisions: .github/docs/decision-matrices.md
Examples: .github/docs/workflow-examples.md
```

## References

**Onboarding Materials**:
- `.github/copilot-instructions.md` - Start here
- `.github/docs/` - Core principles
- `.github/specs/agent-intelligence-framework.md` - Complete framework
- All files in `.github/docs/` - Implementation guides

**Practice Resources**:
- `/tests/` - Test pages and examples
- `GENOME.md` - Evolution history
- Closed PRs - Real-world examples

---

**Version**: 1.0  
**Purpose**: Structured onboarding and training for new agents
