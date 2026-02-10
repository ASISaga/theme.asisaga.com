# Subdomain-Evolution-Agent Internal Configuration

**Agent ID**: `subdomain-evolution-agent`  
**Version**: 2.3.1  
**Category**: Design System  
**Role**: Specialist  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Identifies semantic gaps in the ontology and creates well-formed propositions for new variants based on real subdomain usage patterns.

### Scope
- Subdomain repositories (e.g., research.asisaga.com)
- Ontological gap analysis
- Proposition creation
- Use case documentation

### Activation Triggers
- Repeated mixin combinations in subdomain
- Semantic pattern without clear ontological mapping
- New content type requiring unique representation
- Request from subdomain developers

---

## Context Requirements

### Token Budget
- **Optimal**: 40,000 tokens
- **Maximum**: 80,000 tokens
- **Typical Usage**: 25,000-50,000 tokens

### Dependencies
- `theme-genome-agent` (proposition reviewer)
- Subdomain codebase access
- Existing ontology knowledge

### Required Tools
- `bash` - Git operations, file analysis
- `read` - Analyze subdomain code
- `edit` - Create proposition documents

---

## Coordination Metadata

### Routing Priority
**High** - Identifies system evolution needs

### Handoff Protocols

**Receives From**:
- Subdomain developers (implicit)
- `agent-evolution-agent` (gap detection)

**Hands Off To**:
- `theme-genome-agent` (proposition review)

### Proposition Quality Gates
- [ ] Semantic intent clearly stated
- [ ] ≥3 use cases documented with examples
- [ ] Universal applicability assessed
- [ ] Existing ontology checked for redundancy
- [ ] No visual-only requests

---

## Performance Characteristics

### Speed
- **Gap Identification**: 5-10 minutes
- **Proposition Creation**: 15-30 minutes
- **Use Case Documentation**: 10-20 minutes

### Accuracy
- **Gap Detection**: 85% (may miss subtle patterns)
- **Redundancy Check**: 90%
- **Universal Assessment**: 80% (requires judgment)

### Resource Usage
- **Memory**: 200-400 MB
- **Disk I/O**: Moderate (reads subdomain files)
- **CPU**: Low

---

## Configuration Overrides

### Feature Flags
```yaml
subdomain-evolution-agent:
  enabled: true
  features:
    gap_identification: true
    proposition_creation: true
    use_case_documentation: true
    universality_assessment: true
    automatic_pr_creation: true
  limits:
    max_propositions_per_subdomain: 5
    cooldown_between_propositions_days: 7
  safeguards:
    require_multiple_use_cases: true
    block_subdomain_specific_requests: true
```

### Quality Thresholds
- **Minimum Use Cases**: 3
- **Semantic Clarity**: Required
- **Universal Applicability**: Assessed (documented)

---

## Cross-References

### Related Files
- **Prompt**: `.github/prompts/subdomain-evolution-agent.prompt.md`
- **Skill**: `.github/skills/subdomain-evolution-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 84-108)
- **Routing**: `.github/agents/agent-routing.yml` (lines 74-79)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 19-29)

### Documentation
- `.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md` - Template
- `.github/skills/subdomain-evolution-agent/references/PROPOSITION-GUIDE.md`

---

## Historical Context

### Achievements
- Successfully proposed 15+ variants
- 80% acceptance rate (high-quality propositions)
- Identified patterns across multiple subdomains

### Lessons Learned
1. **Multiple Use Cases**: ≥3 examples increases acceptance
2. **Think Universal**: Subdomain-specific requests get rejected
3. **Check Redundancy**: Always verify existing ontology first
4. **Semantic Framing**: "We need X because Y" not "Make it look Z"

### Common Pitfalls
- Visual-only requests (always rejected)
- Single use case (insufficient justification)
- Not checking for existing mixin combinations
- Vague semantic intent

---

## Agent-Specific Notes

### Unique Capabilities
- **Cross-Subdomain Pattern Recognition**: Sees patterns across repositories
- **Proposition Formulation**: Creates well-structured requests
- **Semantic Framing**: Translates visual needs into semantic roles

### Coordination Preferences
- **Collaborative**: Work with subdomain developers to refine
- **Patience**: Wait for patterns to emerge (avoid premature propositions)
- **Documentation-Heavy**: Over-document use cases

---

**Access Level**: Subdomain + Theme  
**Protected**: Yes - Configuration metadata only  
**Maintainer**: Subdomain Governance  
**Review Frequency**: Per proposition
