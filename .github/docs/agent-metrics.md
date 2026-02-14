# Agent Metrics & System Health

**Last Updated**: 2026-02-14  
**Audience**: Agent developers, system maintainers

## Overview

This document defines metrics for measuring agent ecosystem health and tracking continuous improvement.

## Core Metrics

### 1. Spec Coverage

**Definition**: Percentage of agent/prompt files that properly reference specification documents.

**Target**: ≥80%

**Measurement**:
```bash
cd .github/skills/agent-evolution-agent/scripts
./check-spec-coverage.sh
```

**Calculation**:
```
Spec Coverage = (Files with spec references / Total agent files) × 100
```

**Good indicators**:
- 📈 Agent files include `→ **Specification**: .github/specs/...` references
- 📈 Agents point to `/docs/specifications/` for technical details
- 📈 No duplication of spec content in agent files

**Bad indicators**:
- 📉 Agents duplicate technical content from specs
- 📉 Missing or broken references
- 📉 Specs exist but agents don't reference them

### 2. Context Efficiency

**Definition**: Information density per token in agent files.

**Target**: ≥50 (higher is better)

**Measurement**:
```bash
./measure-context-efficiency.sh
```

**Calculation**:
```
Context Efficiency = (Unique information points / Total tokens) × 100
```

**Optimization strategies**:
- Extract repeated content to specs/docs
- Replace verbose explanations with references
- Remove redundant examples
- Use tables instead of prose where appropriate

### 3. Duplication Score

**Definition**: Percentage of content repeated across multiple agent files.

**Target**: <10%

**Measurement**:
```bash
./detect-duplication.sh
```

**Common duplications**:
- Ontological variant lists (should reference ontological-design-system.md)
- npm commands (should reference conventional-tools.md)
- Workflow descriptions (should be in docs/)
- Code examples (consolidate in specs/)

**Resolution**:
1. Extract to appropriate spec/doc file
2. Replace with reference in all agent files
3. Re-run validation

### 4. Validation Pass Rate

**Definition**: Percentage of agent files passing all quality checks.

**Target**: ≥90%

**Checks include**:
- YAML frontmatter valid
- Required fields present
- References resolve correctly
- No broken links
- Follows naming conventions
- Proper file structure

**Measurement**:
```bash
./validate-all-agents.sh
```

### 5. Optimal Agent Percentage

**Definition**: Percentage of agents meeting "optimal" criteria.

**Target**: ≥25%

**Optimal criteria**:
- ✅ Spec coverage >80%
- ✅ Context efficiency >50
- ✅ File size <200 lines
- ✅ Clear references
- ✅ No duplication
- ✅ All validations pass

**Improvement path**:
- Identify sub-optimal agents
- Refactor to meet criteria
- Update metrics

### 6. Agent Usage Tracking

**Definition**: How frequently each agent is invoked.

**Purpose**: Identify underutilized or overused agents.

**Indicators**:
- Never used → Consider deprecation or better documentation
- Overused → May need splitting into specialized agents
- Balanced usage → Good distribution of responsibilities

## Health Indicators

### Healthy Evolution

**Signs**:
- 📈 New variants proposed from multiple subdomains
- 📈 High acceptance rate (>70% PRs approved)
- 📈 Existing variants being combined creatively
- 📈 Documentation stays current (<30 days since update)
- 📈 Metrics trending upward over time
- 📈 Agent files getting smaller (consolidation)
- 📈 Spec files getting richer (knowledge extraction)

### Unhealthy Patterns

**Signs**:
- 📉 Many visual-only PRs rejected (education needed)
- 📉 Duplicate variants with same semantic purpose
- 📉 Interface bloat (>50 variants per category)
- 📉 Outdated documentation (>90 days old)
- 📉 Metrics stagnating or declining
- 📉 Agent files growing (duplication creep)
- 📉 Broken references accumulating

## Quarterly Review Checklist

### For Theme Genome Agent

**Variant Usage Analysis**:
- [ ] Which variants are never used? → Consider deprecation
- [ ] Which are overused? → May need splitting
- [ ] Are new variants being proposed? → Good sign
- [ ] Are combinations being used creatively? → System working

**Subdomain Feedback**:
- [ ] Is rejection rate <30%? → Good semantic understanding
- [ ] Are subdomains working around gaps? → Missing variants
- [ ] Is documentation helping? → Track questions/issues
- [ ] Are patterns being reused? → Successful evolution

**Code Quality**:
- [ ] Are subdomain SCSS files pure? (zero raw CSS)
- [ ] Is documentation accurate and complete?
- [ ] Are all references valid?
- [ ] Is GENOME.md up to date?

### For Agent Evolution Agent

**System Metrics**:
- [ ] Run full audit: `./audit-agent-quality.sh`
- [ ] Check trends: Are metrics improving?
- [ ] Identify worst performers: Which agents need work?
- [ ] Track progress: Compare to last quarter

**Quality Improvements**:
- [ ] Extract new specs from repeated agent content
- [ ] Update agents to reference new specs
- [ ] Consolidate documentation
- [ ] Fix broken references

**Self-Improvement**:
- [ ] Apply dogfooding: Is agent-evolution-agent optimal?
- [ ] Update validation scripts
- [ ] Improve metrics tracking
- [ ] Document learnings

## Measurement Commands

### Quick Health Check

```bash
# Overall system health
cd .github/skills/agent-evolution-agent/scripts
./quick-health-check.sh

# Outputs summary:
# - Spec coverage: 85% ✅
# - Context efficiency: 58 ✅
# - Duplication: 7% ✅
# - Validation pass rate: 92% ✅
# - Optimal agents: 28% ✅
```

### Detailed Analysis

```bash
# Full metrics report
./generate-metrics-report.sh > /tmp/metrics-$(date +%Y%m%d).json

# Historical comparison
./compare-metrics.sh /tmp/metrics-20260101.json /tmp/metrics-20260214.json
```

### Individual Agent Check

```bash
# Check specific agent
./audit-single-agent.sh theme-genome-agent

# Outputs:
# - Spec coverage: YES ✅
# - Context efficiency: 62 ✅
# - File size: 178 lines ✅
# - Duplication: 3% ✅
# - Status: OPTIMAL ✅
```

## Historical Tracking

### Metrics Log Format

```json
{
  "date": "2026-02-14",
  "spec_coverage": 85,
  "context_efficiency": 58,
  "duplication": 7,
  "validation_pass_rate": 92,
  "optimal_agents": 28,
  "total_agents": 9,
  "total_specs": 5,
  "total_docs": 11,
  "agents": {
    "theme-genome-agent": {
      "optimal": true,
      "spec_coverage": 90,
      "context_efficiency": 62,
      "size_lines": 178
    }
  }
}
```

### Trend Analysis

Track key metrics over time:

| Date | Spec Cov | Context Eff | Duplication | Optimal % |
|------|----------|-------------|-------------|-----------|
| 2026-01-01 | 23% | 35 | 45% | 11% |
| 2026-01-15 | 56% | 42 | 28% | 16% |
| 2026-02-01 | 80% | 48 | 15% | 22% |
| 2026-02-10 | 86% | 56 | 8% | 27% |
| 2026-02-14 | 85% | 58 | 7% | 28% |

**Analysis**: Steady improvement across all metrics ✅

## Improvement Workflows

### When Spec Coverage Falls Below 80%

1. Run: `./find-agents-without-specs.sh`
2. For each agent:
   - Identify what specs should be referenced
   - Add references: `→ **Specification**: .github/specs/...`
   - Remove duplicated content
3. Re-run: `./check-spec-coverage.sh`
4. Verify improvement

### When Context Efficiency Falls Below 50

1. Run: `./detect-duplication.sh`
2. Extract duplicated content to specs/docs
3. Replace with references in agents
4. Run: `./measure-context-efficiency.sh`
5. Verify improvement

### When Validation Pass Rate Falls Below 90%

1. Run: `./validate-all-agents.sh --verbose`
2. Fix each validation error:
   - Missing YAML fields
   - Broken references
   - Invalid formatting
3. Re-run validation
4. Track resolution rate

## Automated Alerts

### Threshold Violations

Set up monitoring (e.g., GitHub Actions):

```yaml
# .github/workflows/agent-metrics.yml
name: Agent Metrics Monitor
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  workflow_dispatch:

jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check Metrics
        run: |
          cd .github/skills/agent-evolution-agent/scripts
          ./quick-health-check.sh --strict
          # Fails if any metric below threshold
```

## References

**Related Documentation**:
- `.github/docs/agent-philosophy.md` - Core principles including metrics
- `.github/docs/dogfooding-guide.md` - Self-improvement workflows
- `.github/skills/agent-evolution-agent/SKILL.md` - Validation tools
- `.github/specs/agent-intelligence-framework.md` - Framework spec

**Validation Scripts**:
- `.github/skills/agent-evolution-agent/scripts/audit-agent-quality.sh`
- `.github/skills/agent-evolution-agent/scripts/check-spec-coverage.sh`
- `.github/skills/agent-evolution-agent/scripts/detect-duplication.sh`
- `.github/skills/agent-evolution-agent/scripts/measure-context-efficiency.sh`

---

**Version**: 1.0  
**Purpose**: Define and track agent ecosystem quality metrics
