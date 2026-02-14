# Agent Metrics & System Health

**Last Updated**: 2026-02-14  
**Audience**: Agent developers, system maintainers

## Overview

Metrics for measuring agent ecosystem health and tracking continuous improvement.

## Core Metrics

| Metric | Target | Command |
|--------|--------|---------|
| **Spec Coverage** — % of agent files referencing specs | ≥80% | `./check-spec-coverage.sh` |
| **Context Efficiency** — Info density per token | ≥50 | `./measure-context-efficiency.sh` |
| **Duplication Score** — % content repeated across files | <10% | `./detect-duplication.sh` |
| **Validation Pass Rate** — % files passing quality checks | ≥90% | `./validate-all-agents.sh` |
| **Optimal Agent %** — % agents meeting all criteria | ≥25% | `./quick-health-check.sh` |

All scripts located in: `.github/skills/agent-evolution-agent/scripts/`

### Optimal Agent Criteria

Spec coverage >80%, context efficiency >50, file size <200 lines, clear references, no duplication, all validations pass.

## Health Indicators

**Healthy**: Variants proposed from multiple subdomains, >70% PR acceptance, creative mixin combinations, docs current (<30 days), agent files getting smaller, spec files getting richer.

**Unhealthy**: Many visual-only PRs rejected, duplicate variants, interface bloat (>50 variants/category), outdated docs (>90 days), broken references accumulating.

## Quarterly Review

### Theme Genome Agent
- [ ] Identify unused variants (deprecation candidates) and overused ones (splitting candidates)
- [ ] Check rejection rate (<30% = good semantic understanding)
- [ ] Verify GENOME.md is current and subdomain SCSS is pure

### Agent Evolution Agent
- [ ] Run full audit: `./audit-agent-quality.sh`
- [ ] Compare trends to last quarter
- [ ] Extract repeated content to specs, fix broken references
- [ ] Self-check: Is agent-evolution-agent itself optimal?

## Measurement Commands

```bash
# Quick health check (all metrics)
cd .github/skills/agent-evolution-agent/scripts
./quick-health-check.sh

# Full report
./generate-metrics-report.sh > /tmp/metrics-$(date +%Y%m%d).json

# Single agent audit
./audit-single-agent.sh theme-genome-agent

# Historical comparison
./compare-metrics.sh /tmp/metrics-old.json /tmp/metrics-new.json
```

## Improvement Workflows

- **Spec coverage <80%**: Run `./find-agents-without-specs.sh`, add spec references, remove duplicated content
- **Context efficiency <50**: Run `./detect-duplication.sh`, extract to specs/docs, replace with references
- **Validation <90%**: Run `./validate-all-agents.sh --verbose`, fix YAML fields, broken references, formatting

## References

- `.github/docs/dogfooding-guide.md` — Self-improvement workflows
- `.github/skills/agent-evolution-agent/SKILL.md` — Validation tools
- `.github/specs/agent-intelligence-framework.md` — Framework spec

---

**Version**: 1.0  
**Purpose**: Define and track agent ecosystem quality metrics
