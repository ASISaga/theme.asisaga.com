# Agent-Evolution-Agent Internal Configuration

**Agent ID**: `agent-evolution-agent`  
**Version**: 2.3.0  
**Category**: Meta-Intelligence  
**Role**: Lead Architect  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Self-learning system optimizer that continuously evolves the agent ecosystem through dogfooding principles.

### Scope
- `.github/` agent ecosystem files
- Agent quality metrics and validation
- Specification synchronization
- Context efficiency optimization

### Activation Triggers
- Weekly quality audit scheduled
- Specification files updated in `/docs/specifications/`
- Agent prompt or skill files modified
- Quality metrics below threshold
- Manual invocation for ecosystem improvements

---

## Context Requirements

### Token Budget
- **Optimal**: 50,000 tokens
- **Maximum**: 100,000 tokens
- **Typical Usage**: 30,000-60,000 tokens

### Dependencies
- Access to all `.github/` files
- Read access to `/docs/specifications/`
- Execution of validation scripts
- Git history for trend analysis

### Required Tools
- `bash` - Script execution
- `read` - File inspection
- `edit` - Agent file updates
- `grep` - Pattern searching
- Python (for YAML validation)

---

## Coordination Metadata

### Routing Priority
**High** - Meta-intelligence operations are priority for system health

### Handoff Protocols

**Receives From**:
- `documentation-manager-agent` (when specs updated)
- All agents (for quality feedback)

**Hands Off To**:
- `scss-refactor-agent` (spec improvements)
- `documentation-manager-agent` (doc updates)
- `theme-genome-agent` (critical issues)

### Workflow Chains
1. **Quality Improvement Loop**:
   - Audit → Track → Detect → Recommend → Implement → Verify
2. **Spec Sync**:
   - Detect spec change → Find related agents → Update references → Validate
3. **Context Optimization**:
   - Measure efficiency → Identify bloat → Extract to specs → Update agents

---

## Performance Characteristics

### Speed
- **Audit Execution**: 10-30 seconds for full ecosystem
- **Spec Sync**: 5-15 seconds per agent
- **Metrics Tracking**: 2-5 seconds

### Accuracy
- **Quality Detection**: 98% (validated against manual audits)
- **Duplication Detection**: 100% (deterministic)
- **Spec Coverage**: 95% (may miss indirect references)

### Resource Usage
- **Memory**: 200-500 MB during audits
- **Disk I/O**: Moderate (reads all agent files)
- **CPU**: Low-moderate (mostly text processing)

---

## Configuration Overrides

### Feature Flags (from feature-flags.yml)
```yaml
agent-evolution-agent:
  enabled: true
  features:
    auto_quality_audit: true
    auto_spec_sync: true
    duplication_detection: true
    metrics_tracking: true
    improvement_recommendations: true
    self_dogfooding: true
  limits:
    max_agents_per_audit: 20
    metric_history_days: 90
    recommendation_count: 10
```

### Quality Thresholds (from quality-thresholds.yml)
- **Spec Coverage Target**: 80% minimum, 100% excellence
- **Context Efficiency**: 75 minimum, 90 excellence
- **Zero Duplication**: Mandatory (enforced)
- **Validation Pass Rate**: 95% minimum

---

## Cross-References

### Related Files
- **Prompt**: N/A (meta-agent, no prompt file)
- **Skill**: `.github/skills/agent-evolution-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 14-41)
- **Routing**: `.github/agents/agent-routing.yml` (lines 115-125)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 243-268)

### Documentation
- `.github/DOGFOODING-GUIDE.md` - Complete workflows
- `.github/skills/agent-evolution-agent/scripts/README.md` - Script documentation
- `/docs/specifications/agent-self-learning-system.md` - Architecture

### Validation Scripts
```bash
./.github/skills/agent-evolution-agent/scripts/audit-agent-quality.sh
./.github/skills/agent-evolution-agent/scripts/track-metrics.sh
./.github/skills/agent-evolution-agent/scripts/detect-duplication.sh
./.github/skills/agent-evolution-agent/scripts/recommend-improvements.sh
./.github/skills/agent-evolution-agent/scripts/sync-agents-with-specs.sh
./.github/skills/agent-evolution-agent/scripts/find-related-agents.sh
./.github/skills/agent-evolution-agent/scripts/measure-context-efficiency.sh
```

---

## Historical Context

### Achievements (as of v2.3)
- Improved spec coverage from 23% → 86%
- Optimized agents from 16% → 27% optimal
- Context efficiency improved from 48 → 56
- Achieved zero duplication across ecosystem
- Created 7 validation scripts

### Lessons Learned
1. **Dogfooding is Essential**: Agents improve by applying their own standards
2. **Metrics Drive Improvement**: What gets measured gets optimized
3. **Zero Duplication**: Strict enforcement prevents documentation drift
4. **Spec References**: More references = better context efficiency

### Common Pitfalls
- Over-optimization leading to overly complex agents
- Ignoring edge cases in smaller agents
- Not updating metrics after significant changes
- Forgetting to track trends over time

---

## Agent-Specific Notes

### Unique Capabilities
- **Self-Dogfooding**: Only agent that can improve itself
- **Ecosystem-Wide View**: Sees all agents holistically
- **Historical Trends**: Tracks quality over time
- **Automated Improvements**: Can update other agents

### Coordination Preferences
- **Batch Processing**: Prefer auditing all agents together
- **Weekly Cadence**: Regular scheduled audits
- **Incremental Updates**: Small, frequent improvements over big refactors

### Future Enhancements
- AI-driven spec suggestion (experimental)
- Predictive quality degradation detection
- Auto-generation of improvement PRs
- Cross-repository agent learning

---

**Access Level**: Meta-Intelligence Only  
**Protected**: Yes - Agents cannot access during normal tasks  
**Maintainer**: Agent Evolution System  
**Review Frequency**: Monthly
