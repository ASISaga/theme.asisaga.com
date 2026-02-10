# Agent Evolution Agent

**Version**: 1.0  
**Category**: Meta-Intelligence  
**Status**: Production Active

## Overview

The Agent Evolution Agent is a meta-intelligence system that continuously improves the GitHub Copilot agent ecosystem through **dogfooding** - applying the same principles agents enforce to improve themselves.

## Quick Start

```bash
# Audit all agents
./.github/skills/agent-evolution-agent/scripts/audit-agent-quality.sh

# Find agents that should reference a spec
./.github/skills/agent-evolution-agent/scripts/find-related-agents.sh docs/specifications/scss-ontology-system.md

# Measure context efficiency
./.github/skills/agent-evolution-agent/scripts/measure-context-efficiency.sh .github/prompts/theme-genome-agent.prompt.md

# Check agent-spec synchronization
./.github/skills/agent-evolution-agent/scripts/sync-agents-with-specs.sh
```

## Achievements (2026-02-10)

**Before Self-Learning System**:
- Spec Coverage: 23%
- Optimal Agents: 4/18 (22%)
- Manual improvement process

**After Self-Learning System**:
- Spec Coverage: **80%** (+248% improvement)
- Optimal Agents: **9/18 (50%)** (+125% improvement)
- Automated quality tracking
- Systematic evolution

## Structure

```
agent-evolution-agent/
├── SKILL.md                                    # Skill definition
├── README.md                                   # This file
├── scripts/
│   ├── audit-agent-quality.sh                 # Quality metrics
│   ├── find-related-agents.sh                 # Spec matching
│   ├── measure-context-efficiency.sh          # Efficiency scoring
│   └── sync-agents-with-specs.sh              # Sync checking
└── references/
    └── SELF-LEARNING-ARCHITECTURE.md          # Architecture doc
```

## Documentation

**Primary Documentation**:
- `SKILL.md` - Complete skill definition with workflows
- `references/SELF-LEARNING-ARCHITECTURE.md` - Architecture and learning loop
- `/docs/specifications/agent-self-learning-system.md` - Comprehensive specification

**Related Documentation**:
- `.github/AGENTS.MD` - Ecosystem overview (updated with v2.2)
- `.github/AGENT-INDEX.md` - Quick navigation (updated with meta-intelligence)
- `/docs/specifications/github-copilot-agent-guidelines.md` - Agent standards

## Validation Scripts

### audit-agent-quality.sh

Analyzes all agents for:
- Line counts
- Spec references
- Spec coverage percentage
- Optimal vs needs improvement categorization

### find-related-agents.sh

Given a spec file, finds agents that:
- Mention keywords from the spec
- Should reference it but don't
- Already reference it correctly

### measure-context-efficiency.sh

Calculates efficiency score (0-100) based on:
- Line count vs optimal target
- Spec reference count
- Spec reference density
- Overall context optimization

### sync-agents-with-specs.sh

Checks all specs to ensure:
- Related agents reference them
- No orphaned specifications
- Documentation is synchronized

## Usage Examples

### Weekly Quality Review

```bash
# Run audit
./scripts/audit-agent-quality.sh

# Review "needs improvement" agents
# Extract knowledge to /docs/specifications/
# Add spec references
# Re-run audit to verify

# Example improvement:
# Before: scss-refactor-agent | Lines: 485 | Spec Refs: 0
# After:  scss-refactor-agent | Lines: 485 | Spec Refs: 4
```

### New Specification Added

```bash
# Created: /docs/specifications/animation-system.md

# Find related agents
./scripts/find-related-agents.sh docs/specifications/animation-system.md

# Output shows:
# → futuristic-effects-agent.prompt.md should reference
# → responsive-design-agent.prompt.md should reference

# Add references to those agents
# Verify with sync check
./scripts/sync-agents-with-specs.sh
```

### Optimize Verbose Agent

```bash
# Check efficiency
./scripts/measure-context-efficiency.sh .github/prompts/subdomain-evolution-agent.prompt.md

# Output: Score 65/100 - NEEDS IMPROVEMENT
# Recommendations:
# • Extract detailed content to specs
# • Add more spec references

# Extract knowledge, add references
# Re-measure
./scripts/measure-context-efficiency.sh .github/prompts/subdomain-evolution-agent.prompt.md

# Output: Score 82/100 - EXCELLENT
```

## Metrics Dashboard

Current metrics (2026-02-10):

```
Agent Ecosystem Health

Spec Coverage:        ████████░░ 80% ✓
Optimal Agents:       █████░░░░░ 50% ✓  
Average Spec Refs:    ████░░░░░░ 4.2 ✓

By Category:
• Instruction Files:  60% optimal (3/5)
• Agent Prompts:      0% optimal (0/6)  ← Line count issue
• Agent Skills:       86% optimal (6/7)

Top Performers:
• theme-genome-agent (SKILL): 6 refs, 100% coverage
• agent-evolution-agent (SKILL): 6 refs, 100% coverage  
• futuristic-effects-agent (prompt): 7 refs, 100% coverage
```

## Dogfooding in Action

**The agent uses its own principles**:

1. **Zero-Duplication**: SKILL.md references external docs, doesn't duplicate
2. **Spec References**: Has 6 spec references itself (100% coverage)
3. **Validation**: Uses its own audit scripts to measure itself
4. **Continuous Evolution**: Tracks its own metrics and improves

**Example**: This very README references specs rather than duplicating content!

## Future Enhancements

**Phase 2** (Planned):
- GitHub Actions integration for auto-audits on PR
- Auto-generate improvement PRs
- Metrics dashboard visualization

**Phase 3** (Future):
- ML-based pattern detection
- Predictive spec updates
- Cross-repository learning

## Troubleshooting

**Script not finding references**:
- Ensure format: `→ Complete guide: /docs/specifications/<file>.md`
- Check with: `grep "/docs/specifications/" <file>`

**Audit shows unexpected results**:
- Run with debug: `bash -x ./scripts/audit-agent-quality.sh`
- Check line count: `wc -l <file>`

**Sync check too broad**:
- Keyword matching is intentionally broad
- Manually review flagged agents
- Ignore false positives

## Contributing

When modifying this meta-agent:

1. **Run self-audit**: `./scripts/audit-agent-quality.sh | grep agent-evolution`
2. **Maintain spec coverage**: Keep ≥6 spec references
3. **Test all scripts**: Ensure they work after changes
4. **Update metrics**: Document improvements
5. **Dogfood**: Apply your own principles!

---

**Maintained by**: ASISaga  
**Related**: theme-genome-agent, subdomain-evolution-agent, all agent skills  
**Documentation**: See `SKILL.md` and `/docs/specifications/agent-self-learning-system.md`
