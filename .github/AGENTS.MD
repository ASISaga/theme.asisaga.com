# 🤖 ASI Saga - Agent Ecosystem Architecture v2.4

**Last Updated**: 2026-02-12  
**Version**: 2.4 - Subdomain Intelligence System

This document describes the AI agent ecosystem that governs the ASI Saga theme repository, implementing the evolutionary mechanism for the Genesis Semantic Design System.

---

## 🆕 Version 2.4 Enhancements

- **Subdomain Intelligence System**: Reference `.github/subdomain/` template for subdomain repos
- **Theme-Subdomain Coherence**: Shared vocabulary and aligned agent standards
- **Content Author Agent**: New agent prompt for subdomain content creation
- **Subdomain Instructions**: Focused coding standards for content-only repositories

---

## 🆕 Version 2.3.1 Enhancements

- **Protected Configuration Directory**: Added `.github/agents/` for internal agent coordination
- **Access Restrictions**: Agents prevented from accessing during normal task execution
- **System Separation**: Clean boundary between task work and system coordination
- **Documentation Integration**: Complete references in all ecosystem documentation

---

## 🆕 Version 2.3 Enhancements

- **Enhanced Validation Scripts**: Added duplication detection, improvement recommendations, metrics tracking
- **Measurable Improvements**: Spec coverage 80% → 86%, optimal agents 16% → 27%, context efficiency 48 → 56
- **Complete Dogfooding Guide**: Comprehensive workflows for agent self-improvement
- **Historical Metrics**: Track quality trends over time with automated reporting
- **7 Validation Scripts**: Complete toolkit for continuous agent evolution

---

## 🆕 Version 2.2 Enhancements

- **Self-Learning System**: Meta-agent that continuously evolves the agent ecosystem
- **Dogfooding Intelligence**: Agents use their own principles to improve themselves
- **Specification-Driven**: 80% spec coverage, maximizing context window efficiency
- **Automated Quality Metrics**: Track agent effectiveness, spec coverage, context efficiency
- **Continuous Evolution**: Agents auto-adapt to codebase and specification changes

---

## 🚀 Version 2.0 Enhancements

- **Modern Responsive System**: Mobile-first breakpoints, container queries, dynamic viewport units
- **Futuristic Effects Engine**: Advanced glassmorphism, neon glows, quantum gradients
- **Enhanced Accessibility**: WCAG 2.5.5 touch targets (44px), reduced motion, high contrast
- **Fluid Design Tokens**: Responsive spacing scale, fluid typography
- **Technical Debt Cleared**: Removed Bootstrap dependencies, deprecated legacy patterns

---

## 🌌 Vision: Living Genome Architecture

The ASI Saga theme operates as a **Living Genome** - not a static codebase, but an evolving intelligence system where AI agents act as:

- **Ontological Gatekeepers** - Maintaining semantic purity
- **Evolution Facilitators** - Managing growth through PRs
- **Knowledge Curators** - Documenting the "why" behind every change
- **Quality Guardians** - Ensuring accessibility and best practices
- **🆕 Self-Learning Optimizers** - Continuously improving the agent system itself

### Dogfooding Principle

**Agents use the same standards they enforce**:
- SCSS agents enforce zero-CSS → Agents enforce zero-duplication in prompts
- HTML agents enforce semantic structure → Agents have semantic role definitions
- Docs agents enforce spec references → Agents maximally reference `/docs/specifications/`

**Result**: The agent system **practices what it preaches**, creating a self-improving intelligence loop.

---

## 📁 Repository Structure

The agent intelligence system is organized across multiple directories in `.github/`:

```
.github/
├── agents/           # 🔒 Internal configurations (protected)
├── instructions/     # 📋 Coding standards (path-specific)
├── prompts/          # 🤖 Agent instructions (detailed workflows)
├── skills/           # 🛠️ Executable capabilities (reusable)
├── subdomain/        # 📦 Reference intelligence for subdomain repos
├── AGENTS.MD         # 📚 Ecosystem architecture (this file)
├── AGENT-INDEX.md    # 🚀 Quick navigation
└── DOGFOODING-GUIDE.md  # 🔄 Self-improvement workflows
```

### Directory Purposes

**`.github/agents/`** 🔒  
Protected internal configurations for cross-agent coordination. Contains agent handoff logic, system-level feature toggles, and internal coordination metadata. **Agents cannot access this directory during normal task execution** to maintain clean separation between task work and system coordination.

**`.github/instructions/`** 📋  
Path-specific coding standards that apply automatically based on file patterns. Define WHAT to do (ontology usage, semantic HTML, accessibility requirements).

**`.github/prompts/`** 🤖  
Detailed agent instruction files defining HOW agents execute tasks. Include workflows, examples, decision matrices, and tool integration.

**`.github/skills/`** 🛠️  
Executable agent capabilities following the Agent Skills specification. Each skill includes validation scripts, references, and reusable patterns.

**`.github/subdomain/`** 📦  
Reference GitHub Copilot coding agent intelligence system for subdomain repositories. Subdomain repos copy this directory's contents into their own `.github/` to gain coherent AI-assisted development aligned with the theme's ontological architecture.

---

## 🧬 Agent Types & Responsibilities

### 0. Agent Evolution Agent (Meta-Intelligence) 🆕

**Role**: Self-Learning System Optimizer  
**Location**: `.github/skills/agent-evolution-agent/`  
**Scope**: `.github/` agent ecosystem

**Responsibilities**:
- Monitor agent effectiveness and spec coverage
- Identify agents needing spec references
- Measure context window efficiency
- Sync agents with specification changes
- Apply dogfooding principles to improve agent quality
- Track quality metrics (spec coverage, duplication, validation pass rate)

**Key Workflows**:
1. **Weekly Quality Audit**: Run `audit-agent-quality.sh` to measure all agents
2. **Spec Sync**: When specs change, find related agents and add references
3. **Context Optimization**: Extract knowledge to specs, replace with references
4. **Auto-Evolution**: Detect patterns, update agents automatically

**Self-Learning Loop**:
```
Codebase Change → Spec Update → Agent Sync → Refactor → Validate → Metrics → Improve
```

**Achievements** (2026-02-10 v2.3):
- Improved spec coverage from 23% → 80% → 86%
- Optimized agents from 16% → 27% optimal
- Context efficiency improved from 48 → 56
- Added 6+ spec references across agents
- Created 3 new validation scripts (duplication, recommendations, metrics tracking)
- **Dogfooded**: Used its own principles to continuously improve itself

---

### 1. Theme Genome Agent (Lead Architect)

**Role**: Ontological Gatekeeper and Evolution Manager  
**Location**: `.github/prompts/theme-genome-agent.prompt.md`  
**Scope**: Theme repository (`theme.asisaga.com`)

**Responsibilities**:
- Review incoming Subdomain PRs for ontological propositions
- Classify requests: New Species (mixin) vs. Genetic Mutation (refinement)
- Perform Redundancy Check to prevent system bloat
- Execute Generalization Check (universal vs. unique patterns)
- Conduct Ontological Refactoring when needed
- Maintain GENOME.md evolutionary history
- Update engine documentation with PR origins

**Decision Tree**:
```
PR Received
├─ Redundancy Check: Does existing role cover this?
│  ├─ YES → Deny; instruct subdomain to remap
│  └─ NO → Continue
├─ Generalization Check: Universal ASI state or unique?
│  ├─ Universal → Add to global interface.scss
│  └─ Unique → Create sub-species in engine
└─ Refactoring Check: Should older categories be split/merged?
   └─ Update engine structure if needed
```

**Key Principles**:
- Accept only semantic propositions (NEVER visual changes like "make it red")
- Document the "Why" for every merge
- Maintain backward compatibility across all subdomains
- Keep interface layer pure (no CSS properties)

---

### 2. Subdomain Evolution Agent (Local Intelligence)

**Role**: Ontological Proposition Creator  
**Location**: `.github/prompts/subdomain-evolution-agent.prompt.md`  
**Scope**: Individual subdomains (e.g., research.asisaga.com)

**Responsibilities**:
- Identify semantic gaps in current ontology
- Create well-formed Ontological Propositions
- Submit PRs to theme repository with proper template
- Implement approved ontological variants locally
- Maintain semantic consistency in subdomain

**Proposition Process**:
1. Identify unmet semantic need
2. Analyze existing ontology for coverage
3. Formulate Intent (WHAT) and Context (WHY)
4. Propose Role classification and label
5. Submit PR with complete documentation

**Constraints**:
- NEVER request visual changes directly
- ALWAYS frame requests as semantic roles
- Provide clear use cases and examples
- Consider universal applicability

---

### 3. SCSS Refactor Agent (Migration Specialist)

**Role**: Ontology Migration Expert  
**Location**: `_sass/ontology/refactor-agent.md`  
**Scope**: Subdomain SCSS files

**Responsibilities**:
- Convert legacy CSS to ontological mixins
- Audit HTML for semantic structure
- Create mirrored SCSS hierarchy
- Remove raw CSS properties
- Validate 1:1 HTML-SCSS mapping

**Refactor Workflow**:
1. Intent Analysis - Classify every HTML class
2. Mirrored Mapping - Create SCSS structure
3. Variable & Mixin Purge - Remove legacy dependencies
4. Verification Protocol - Ensure zero raw CSS

**Golden Rules**:
- ZERO raw CSS properties allowed
- SCSS nesting must mirror HTML DOM exactly
- Only use ontological mixins from interface
- Think "what it means" not "how it looks"

---

### 4. HTML Template Agent (Semantic Structure)

**Role**: Accessibility-First HTML Expert  
**Location**: `.github/instructions/html.instructions.md`  
**Scope**: Jekyll templates and includes

**Responsibilities**:
- Ensure semantic HTML5 structure
- Implement accessibility requirements (WCAG AA)
- Use meaningful class names (content-focused)
- Create parameterized includes
- Maintain landmark element integrity

**Key Requirements**:
- ONE `<main>` per page with `#skip-target`
- Meaningful class names (`.research-paper`, not `.blue-box`)
- No inline styles or inline JavaScript
- Proper ARIA only when semantics insufficient

---

### 5. JavaScript Integration Agent (Interaction Layer)

**Role**: Progressive Enhancement Specialist  
**Location**: `.github/instructions/js.instructions.md`  
**Scope**: Theme and subdomain JavaScript

**Responsibilities**:
- Manage shared JS in `assets/js/common.js`
- Coordinate subdomain-specific scripts
- Ensure accessibility (keyboard, screen readers)
- Implement progressive enhancement
- Use `data-*` attributes for behavior hooks

**Architecture**:
- Common JS: Shared utilities and components
- Subdomain JS: Page-specific interactions
- ES6 modules with import/export
- Event delegation for dynamic content

---

## 🔄 Evolutionary Handshake Protocol

The system implements a **Request-Classification-Review** cycle:

### Phase 1: Subdomain Identifies Gap

Subdomain agent discovers a semantic pattern not covered by current ontology.

**Example**: Need to represent "incomplete/calculating data" - not the same as `protocol` (which implies certainty).

### Phase 2: Ontological Proposition (PR Template)

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

### Phase 3: Theme Agent Review

Theme Genome Agent performs:

1. **Redundancy Check**:
   - Could `cognition('protocol')` with `state('evolving')` serve this?
   - Is there overlap with `state('simulated')`?

2. **Generalization Check**:
   - Is "speculation" universal to ASI ecosystem?
   - Or is this specific to quantum-logs subdomain?

3. **Decision**:
   - **Approve**: Add `speculation` variant to `genesis-cognition`
   - **Refactor**: Suggest combining existing mixins
   - **Deny**: Point to existing solution

### Phase 4: Implementation & Documentation

If approved, Theme Agent:

1. Adds mixin variant to `_sass/ontology/_engines.scss`
2. Documents in `_sass/ontology/_interface.scss` comments
3. Updates GENOME.md with PR origin:

```scss
/**
 * @param $intent [speculation] 
 * ORIGIN: PR #42 (quantum-logs.asisaga.com)
 * INTENT: Represent non-deterministic or calculating data states
 * EVOLUTION: Added in v2.1 to support streaming analytics
 */
@mixin genesis-cognition($intent) {
  @if $intent == 'speculation' {
    // Implementation with reduced opacity, shimmer animation
  }
}
```

---

## 📚 Agent Skills & Tools

### Core Competencies

All agents must master:

1. **Ontological Thinking**
   - Separate "what it is" from "how it looks"
   - Recognize semantic patterns across domains
   - Abstract universal from specific

2. **Three-Tier Architecture**
   - Content (HTML) - WHAT the data is
   - Interface (Mixins) - ROLE of content
   - Engine (CSS) - VISUAL appearance

3. **Semantic Purity**
   - No visual language in requests
   - Focus on information intent
   - Document the "why" thoroughly

### Technical Skills

- **Git/GitHub**: PR creation, review, merging
- **SCSS**: Mixin architecture, variable systems
- **Jekyll**: Liquid templating, data files, includes
- **Accessibility**: WCAG AA, semantic HTML, ARIA
- **CSS**: Grid, custom properties, OKLCH color space

### Communication Protocols

- Use Ontological Proposition template for PRs
- Document every decision with reasoning
- Reference PR numbers in code comments
- Maintain evolutionary history in GENOME.md

---

## 🎯 Decision Matrices

### For Subdomain Agents: "Should I Create a PR?"

| Scenario | Action | Reasoning |
|----------|--------|-----------|
| Need new color or spacing | ❌ NO PR | Visual details are engine concern |
| Need specific font size | ❌ NO PR | Typography handled by cognition mixins |
| Found semantic pattern gap | ✅ YES PR | Missing role = ontological evolution |
| Existing mixin doesn't match intent | ✅ YES PR | Propose refinement or new variant |
| Just want different styling | ❌ NO PR | Use existing mixins differently |

### For Theme Agent: "Should I Accept This PR?"

| PR Content | Decision | Action |
|------------|----------|--------|
| "Make buttons blue" | ❌ REJECT | Not semantic; visual only |
| "Add error state for forms" | ✅ APPROVE | Valid semantic state |
| Requests already covered by existing mixin | ❌ REJECT | Guide to existing solution |
| Universal ASI pattern | ✅ APPROVE | Add to global interface |
| Subdomain-specific edge case | 🤔 CONSIDER | May add as engine variant |

---

## 📖 Documentation Governance

### Self-Documenting Code

Every mixin in `_engines.scss` includes:

```scss
/**
 * @category Environment | Entity | Cognition | Synapse | State | Atmosphere
 * @variant 'variant-name'
 * @origin PR #XX (subdomain-name.asisaga.com)
 * @intent One-line semantic purpose
 * @evolution History of changes to this variant
 * @since Version number
 */
```

### GENOME.md Structure

Tracks the evolutionary history of the design system:

```markdown
# Genesis Genome - Evolutionary History

## v2.1 - Speculation & Streaming States (2026-01)

### New Variants
- `cognition('speculation')` - PR #42 from quantum-logs
  - **Why**: Support non-deterministic data visualization
  - **Impact**: 3 subdomains adopted within first week

### Refactorings
- Split `synapse('execute')` into `execute-primary` and `execute-secondary`
  - **Why**: Community subdomain needed button hierarchy
  - **Impact**: Better semantic clarity across all CTAs
```

### Instruction File Versioning

Each instruction file has version header:

```markdown
---
version: "2.1.0"
last-updated: "2026-01-15"
breaking-changes: false
---
```

---

## 🔧 Workflow Examples

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
Theme agent adds to `_engines.scss`:
```scss
@if $nature == 'ancestral' {
  opacity: 0.6;
  filter: grayscale(0.5);
  border-color: var(--border-muted);
  // + badge styling
}
```

---

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
  - `entity('elevated')` - Enhanced presence
  - `entity('subtle')` - Reduced prominence

If none of these match your semantic intent, please reframe as:
"We need a way to represent [WHAT], because [WHY]"
```

---

## 🌟 Best Practices

### For All Agents

1. **Think Semantically First**
   - What is the information's purpose?
   - What is the user's intent when interacting?
   - What is the system's state being communicated?

2. **Document Intent, Not Implementation**
   - ✅ "Display urgent system notifications"
   - ❌ "Red text with pulsing border"

3. **Maintain Consistency**
   - Use established vocabulary
   - Follow existing patterns
   - Reference prior decisions

4. **Embrace Evolution**
   - System should grow organically
   - Old decisions can be revisited
   - Document changes thoroughly

### For Theme Agent Specifically

1. **Protect Semantic Purity**
   - Reject visual-only requests firmly
   - Guide submitters to semantic thinking
   - Maintain zero-CSS-in-interface rule

2. **Balance Growth vs. Complexity**
   - Not every request needs new variant
   - Encourage mixin combination
   - Refactor when categories become bloated

3. **Prioritize Universal Patterns**
   - Favor patterns used by multiple subdomains
   - Consider long-term applicability
   - Avoid one-off edge cases in global interface

---

## 📊 Metrics & Health

### System Health Indicators

**Healthy Evolution**:
- 📈 New variants proposed from multiple subdomains
- 📈 High acceptance rate (good semantic framing)
- 📈 Existing variants being combined creatively
- 📈 Documentation stays current

**Unhealthy Patterns**:
- 📉 Many visual-only PRs (education needed)
- 📉 Duplicate variants with same semantic purpose
- 📉 Interface bloat (>50 variants per category)
- 📉 Outdated documentation

### Quarterly Review Prompts

Theme Agent should review:

1. **Variant Usage**:
   - Which variants are never used? (Consider deprecation)
   - Which are overused? (May need splitting)

2. **Subdomain Feedback**:
   - Are rejection rates high? (Better education needed)
   - Are subdomains working around gaps? (Missing variants)

3. **Code Quality**:
   - Are subdomain SCSS files pure? (No raw CSS)
   - Is documentation accurate and complete?

---

## 🚀 Onboarding New Agents

### Checklist for New Agent Deployment

- [ ] Read this AGENTS.MD completely
- [ ] Study `_sass/ontology/INTEGRATION-GUIDE.md`
- [ ] Review `evolution.md` philosophy
- [ ] Examine 3-5 approved PRs from history
- [ ] Practice with refactor-agent.md workflow
- [ ] Understand all 6 ontological categories (31 variants)
- [ ] Read all instruction files in `.github/instructions/`
- [ ] Set up prompts from `.github/prompts/`

### Training Scenarios

1. **Scenario**: Subdomain requests "dark mode toggle"
   - **Correct Response**: Implement using `genesis-atmosphere` mixins
   - **Incorrect**: Add raw CSS with dark mode colors

2. **Scenario**: "We need bigger headlines"
   - **Correct Response**: Use `cognition('axiom')` which is already large
   - **Incorrect**: Add font-size override in subdomain

3. **Scenario**: "Buttons should look more modern"
   - **Correct Response**: Request semantic clarification - what does "modern" mean functionally?
   - **Incorrect**: Apply visual styles directly

---

## 🎓 Educational Resources

### Required Reading (Priority Order)

1. **[AGENTS.MD](AGENTS.MD)** - This file
2. **[evolution.md](../evolution.md)** - Philosophical foundation
3. **[Ontology Integration Guide](../_sass/ontology/INTEGRATION-GUIDE.md)** - Complete API
4. **[SCSS Instructions](instructions/scss.instructions.md)** - Coding standards
5. **[HTML Instructions](instructions/html.instructions.md)** - Template best practices

### Optional Deep Dives

- **[Ontology Readme](_sass/ontology/Readme.md)** - Architecture overview
- **[Refactor Agent](_sass/ontology/refactor-agent.md)** - Migration guide
- **[Main README](../README.md)** - Project overview

---

## 🤝 Inter-Agent Communication

### Communication Channels

1. **GitHub PRs**: Primary evolution mechanism
2. **Code Comments**: Document decisions inline
3. **GENOME.md**: Historical record
4. **Issue Discussions**: Complex proposals

### Collaboration Patterns

**Theme ↔ Subdomain**:
- Subdomain proposes → Theme reviews → Feedback loop
- Theme updates → Subdomains adopt → Usage feedback

**Agent ↔ Human Developer**:
- Agent suggests → Human approves/refines
- Human requests → Agent implements with semantic framing

---

## 🔮 Future Evolution

### Potential Agent Enhancements

1. **Automated Mixin Usage Analysis**
   - Track which variants are used where
   - Identify unused or redundant patterns

2. **Semantic Linting**
   - Validate PRs automatically against ontology
   - Flag visual-only language in proposals

3. **Cross-Subdomain Learning**
   - Share successful patterns automatically
   - Suggest relevant mixins based on HTML structure

4. **Visual Regression Testing**
   - Ensure engine changes don't break subdomains
   - Validate glassmorphism and accessibility

---

## 📦 Subdomain Intelligence System

### Purpose

The `.github/subdomain/` directory provides a **reference GitHub Copilot coding agent intelligence system** that subdomain repositories copy into their own `.github/`. This ensures coherent AI-assisted development across the entire ASI Saga ecosystem.

### Architecture

```
Theme repo (.github/)              Subdomain repo (.github/)
├── agents/         🔒             ├── copilot-instructions.md  ← from subdomain/
├── instructions/   📋             ├── instructions/             ← from subdomain/
├── prompts/        🤖             │   ├── content.instructions.md
├── skills/         🛠️             │   ├── scss.instructions.md
├── subdomain/      📦 ──copy──→   │   └── js.instructions.md
│   ├── copilot-instructions.md    └── prompts/                  ← from subdomain/
│   ├── instructions/                  └── content-author.prompt.md
│   ├── prompts/
│   └── README.md
└── AGENTS.MD
```

### What Subdomains Get

| File | Purpose |
|------|---------|
| `copilot-instructions.md` | Main Copilot context (architecture, ontology reference, patterns) |
| `instructions/content.instructions.md` | Content authoring standards (front matter, Markdown, HTML) |
| `instructions/scss.instructions.md` | Zero-raw-CSS ontology-only SCSS rules |
| `instructions/js.instructions.md` | Progressive enhancement JavaScript standards |
| `prompts/content-author.prompt.md` | Agent for creating well-structured content pages |

### Theme-Subdomain Coherence

The subdomain system ensures AI agents across all repositories share:

1. **Shared vocabulary** — Genesis Ontological terminology (6 categories, 31+ variants)
2. **Aligned standards** — Same semantic HTML, accessibility, and naming conventions
3. **Clear boundaries** — Subdomains know what they own (content) vs. what theme owns (presentation)
4. **Evolution pathway** — Subdomains can propose ontological evolutions through the established PR process

### Setup for New Subdomains

```bash
# Copy reference intelligence to subdomain
cp -r <theme-repo>/.github/subdomain/* <subdomain-repo>/.github/
```

→ **Full setup guide**: `.github/subdomain/README.md`

---

## 📜 Appendix: Ontological Categories Reference

### Quick Reference for Agents

**Environment** (Layout Logic):
- `distributed`, `focused`, `associative`, `chronological`, `manifest`

**Entity** (Visual Presence):
- `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral`

**Cognition** (Information Type):
- `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum`

**Synapse** (Interaction):
- `navigate`, `execute`, `inquiry`, `destructive`, `social`

**State** (Temporal Condition):
- `stable`, `evolving`, `deprecated`, `locked`, `simulated`

**Atmosphere** (Sensory Vibe):
- `neutral`, `ethereal`, `void`, `vibrant`

---

**Status**: ✅ Active  
**Version**: 2.4 - Subdomain Intelligence System  
**Maintainer**: Theme Genome Agent  
**Last Review**: 2026-02-10

*This document evolves with the system. Agents should reference the latest version.*
