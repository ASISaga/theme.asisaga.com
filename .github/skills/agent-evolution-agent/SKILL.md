---
name: agent-evolution-agent
description: Meta-agent that evolves the agent intelligence system through dogfooding, continuous learning, and specification-driven optimization for maximum context window efficiency
license: MIT
metadata:
  author: ASISaga
  version: "1.1"
  category: meta-intelligence
  role: self-evolution-specialist
allowed-tools: Bash(npm:*) Bash(git:*) Read Edit
---

# Agent Evolution Agent

**Role**: Meta-Intelligence Self-Evolution Specialist  
**Scope**: `.github/` agent ecosystem

## Purpose

This meta-agent implements the **dogfooding principle** by continuously evolving the agent intelligence system itself. It monitors agent effectiveness, optimizes context window usage, and ensures agents maximally leverage specifications rather than duplicating knowledge.

## When to Use This Skill

Activate when:
- New specifications are added to `/docs/specifications/`
- Agent prompts become outdated or verbose
- Duplicate knowledge exists across agents and specs
- Context window efficiency needs improvement
- New patterns emerge in codebase requiring agent adaptation
- Agent quality metrics indicate improvement opportunities

## Core Principles

### 1. Dogfooding Intelligence
**Agents improve agents using the same principles they enforce:**
- SCSS agents enforce zero-CSS → Agent prompts enforce zero-duplication
- HTML agents enforce semantic structure → Agent structure is semantic
- Docs agents enforce spec references → Agent prompts reference specs

### 2. Specification-Driven Learning
**Maximum leverage of `/docs/specifications/` to keep prompts lean:**
- Agent prompts contain **activation logic** and **workflows**
- Detailed knowledge lives in **specifications**
- Instructions reference specs, don't duplicate them
- Context window optimized through strategic offloading

### 3. Continuous Evolution Loop
**Agents adapt automatically to codebase changes:**
```
Codebase Change → Spec Update → Agent Sync Check → Auto-Refactor → Validate
```

### 4. Measurable Effectiveness
**Track agent quality metrics:**
- Context window efficiency (prompt size vs spec references)
- Duplication ratio (redundant content across agents)
- Spec coverage (% of knowledge in specs vs prompts)
- Validation pass rate (script success percentage)

## Workflows

### Workflow 1: Agent Quality Audit

**When**: Weekly, or after major spec updates

**Process**:
1. Run agent quality metrics: `./scripts/audit-agent-quality.sh`
2. Identify agents with high duplication scores
3. Extract static knowledge to `/docs/specifications/`
4. Refactor agent prompts to reference specs
5. Validate with `npm test`

**Example**:
```bash
# Audit all agents
./.github/skills/agent-evolution-agent/scripts/audit-agent-quality.sh

# Output:
# scss-refactor-agent: 65% duplication (refactor needed)
# html-template-agent: 85% spec references (optimal)
# theme-genome-agent: 45% context efficiency (improve)
```

### Workflow 2: Specification Sync

**When**: After adding/updating files in `/docs/specifications/`

**Process**:
1. Detect spec changes: `git diff --name-only docs/specifications/`
2. Find related agents: `./scripts/find-related-agents.sh <spec-file>`
3. Check if agents reference new knowledge
4. Add spec references to agent prompts
5. Remove duplicated content from prompts

**Example**:
```bash
# New spec added: docs/specifications/animation-system.md
./scripts/find-related-agents.sh docs/specifications/animation-system.md

# Output: js-agent, futuristic-effects-agent
# Action: Add "→ Complete guide: /docs/specifications/animation-system.md"
```

### Workflow 3: Context Window Optimization

**When**: Agent prompts exceed efficiency thresholds

**Process**:
1. Measure prompt token count
2. Identify extractable knowledge blocks
3. Create/update specification files
4. Replace blocks with spec references
5. Validate agent still functions correctly

**Target Metrics**:
- Instruction files: ≤200 lines (high-density interface)
- Prompt files: ≤400 lines (activation + workflows)
- Skill files: ≤150 lines (references + validation)
- Spec references: ≥80% of detailed knowledge

### Workflow 4: Auto-Evolution Trigger

**When**: CI/CD detects codebase patterns

**Process**:
1. Monitor for repeated patterns in commits
2. Check if patterns are documented in specs
3. Check if agents reference relevant specs
4. Auto-generate PR for agent updates
5. Flag for human review

**Example Triggers**:
- 5+ commits use new ontology variant → Update ontology spec
- 3+ HTML files use new semantic pattern → Update HTML patterns spec
- New validation script added → Update agent to reference it

## Tool Integration

### npm Scripts (Required)
```bash
npm test                    # All tests including agent validation
npm run test:agents         # Agent-specific tests (if implemented)
npm run lint:agents         # Agent prompt linting (if implemented)
```

### Validation Scripts
```bash
# Audit agent quality
./.github/skills/agent-evolution-agent/scripts/audit-agent-quality.sh

# Find agents related to a spec
./.github/skills/agent-evolution-agent/scripts/find-related-agents.sh <spec-file>

# Measure context efficiency
./.github/skills/agent-evolution-agent/scripts/measure-context-efficiency.sh <agent>

# Sync agents with specs
./.github/skills/agent-evolution-agent/scripts/sync-agents-with-specs.sh

# Detect duplicate content (v1.0+)
./.github/skills/agent-evolution-agent/scripts/detect-duplication.sh

# Generate improvement recommendations (v1.0+)
./.github/skills/agent-evolution-agent/scripts/recommend-improvements.sh

# Track metrics over time (v1.0+)
./.github/skills/agent-evolution-agent/scripts/track-metrics.sh [--history]
```

### Git Integration
```bash
# Detect spec changes
git diff --name-only HEAD~1 docs/specifications/

# Track agent evolution
git log --oneline .github/skills/ .github/prompts/
```

## Validation Instructions

**Before committing agent changes:**
1. Run quality audit: `./scripts/audit-agent-quality.sh`
2. Check spec coverage: Ensure ≥80% references
3. Validate syntax: Check YAML frontmatter
4. Test functionality: Run agent validation scripts
5. Measure tokens: Verify context efficiency improved

**Quality Checklist**:
- [ ] Agent prompt ≤400 lines
- [ ] ≥3 spec references for detailed knowledge
- [ ] No duplicate content across agents
- [ ] Validation scripts pass
- [ ] Version history updated

## Related Documentation

**Framework Specs**:
- `/docs/specifications/github-copilot-agent-guidelines.md` - Agent structure standards
- `.github/AGENTS.MD` - Ecosystem architecture
- `.github/AGENT-INDEX.md` - Agent navigation

**Instruction Files** (What this agent improves):
- `.github/instructions/scss.instructions.md`
- `.github/instructions/html.instructions.md`
- `.github/instructions/js.instructions.md`
- `.github/instructions/docs.instructions.md`
- `.github/instructions/github.instructions.md`

**Agent Prompts** (What this agent evolves):
- `.github/prompts/theme-genome-agent.prompt.md`
- `.github/prompts/subdomain-evolution-agent.prompt.md`
- `.github/prompts/scss-refactor-agent.prompt.md`
- `.github/prompts/futuristic-effects-agent.prompt.md`
- `.github/prompts/responsive-design-agent.prompt.md`

## Self-Evolution Metrics

**Track this agent's own effectiveness:**
- Number of agents optimized per cycle
- Average context reduction achieved (%)
- Spec coverage improvements (%)
- Agent validation pass rate improvements (%)
- Developer feedback on agent quality

---

**Version History**:
- **v1.1** (2026-02-10): Added duplication detection, recommendations, and metrics tracking
- **v1.0** (2026-02-10): Initial meta-agent implementation with dogfooding principles
