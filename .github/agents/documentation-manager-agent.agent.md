# Documentation-Manager-Agent Internal Configuration

**Agent ID**: `documentation-manager-agent`  
**Version**: 2.3.1  
**Category**: Documentation  
**Role**: Quality Specialist  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Validates documentation structure, checks internal links, detects redundancy, and enforces metadata standards to maintain documentation quality.

### Scope
- `docs/**/*.md` (all documentation)
- `**/*.md` (markdown files)
- Documentation structure and organization
- Link integrity and metadata

### Activation Triggers
- Documentation created or updated
- Pre-commit validation
- Link integrity check scheduled
- Redundancy detection needed
- Metadata validation required

---

## Context Requirements

### Token Budget
- **Optimal**: 35,000 tokens
- **Maximum**: 70,000 tokens
- **Typical Usage**: 20,000-45,000 tokens

### Dependencies
- Documentation structure standards
- Version header requirements
- Archival policies

### Required Tools
- `bash` - Validation script execution
- `read` - Analyze documentation
- `edit` - Fix issues (with approval)
- `grep` - Pattern searching

---

## Coordination Metadata

### Routing Priority
**Medium** - Quality assurance (not blocking)

### Handoff Protocols

**Receives From**:
- All agents (when docs updated)
- `agent-evolution-agent` (when specs updated)

**Hands Off To**:
- `agent-evolution-agent` (spec changes trigger sync)

### Validation Workflow
1. Check documentation structure (organization)
2. Validate internal links (broken links)
3. Detect redundancy (duplicate content)
4. Validate metadata (version headers)
5. Enforce archival (completed work)

---

## Performance Characteristics

### Speed
- **Structure Validation**: 2-5 seconds
- **Link Checking**: 10-30 seconds (depends on file count)
- **Redundancy Detection**: 15-45 seconds
- **Metadata Validation**: 5-10 seconds

### Accuracy
- **Structure**: 100% (deterministic)
- **Link Integrity**: 98% (may miss dynamic links)
- **Redundancy**: 90% (similarity threshold 80%)
- **Metadata**: 100% (pattern matching)

### Resource Usage
- **Memory**: 150-300 MB
- **Disk I/O**: High (reads all markdown files)
- **CPU**: Low-moderate

---

## Configuration Overrides

### Feature Flags
```yaml
documentation-manager-agent:
  enabled: true
  features:
    structure_validation: true
    link_checking: true
    redundancy_detection: true
    metadata_validation: true
    archival_enforcement: true
    version_tracking: true
  limits:
    max_link_check_depth: 3
    similarity_threshold_percent: 80
  safeguards:
    prevent_duplicate_summaries: true
    enforce_version_headers: true
    require_archive_migration: true
```

### Quality Thresholds
- **Broken Links**: 0 (all must be valid)
- **Redundancy**: <80% similarity
- **Version Headers**: Required for specs
- **Archive Compliance**: Completed work moved

---

## Cross-References

### Related Files
- **Prompt**: N/A (instructions-based)
- **Skill**: `.github/skills/documentation-manager-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 249-274)
- **Routing**: `.github/agents/agent-routing.yml` (lines 80-92)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 133-154)

### Documentation
- `.github/instructions/docs.instructions.md` - Standards
- `/docs/specifications/architecture.md` - Doc organization

### Validation Scripts
```bash
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/
```

---

## Historical Context

### Achievements
- Zero broken links across documentation
- Structured documentation organization
- Eliminated duplicate summaries
- 100% metadata compliance in specs/

### Lessons Learned
1. **Update, Don't Replace**: Extend existing docs
2. **Archive Completed**: Move finished work to archive/
3. **Version Everything**: Track changes over time
4. **Cross-Reference**: Link related documentation

### Common Pitfalls
- Creating new summaries instead of updating
- Leaving completed docs in active area
- Missing version headers
- Broken internal links

---

## Agent-Specific Notes

### Unique Capabilities
- **Link Validation**: Comprehensive internal link checking
- **Redundancy Detection**: Similarity analysis
- **Metadata Enforcement**: Version header validation
- **Archive Management**: Completed work organization

### Coordination Preferences
- **Pre-Commit**: Run validations before merging
- **Batch Processing**: Validate entire doc tree
- **Non-Blocking**: Warnings don't prevent commits

### Pre-Commit Workflow
```bash
# Complete validation sequence
./.github/skills/documentation-manager-agent/scripts/validate-doc-structure.sh
./.github/skills/documentation-manager-agent/scripts/validate-doc-links.sh docs/
./.github/skills/documentation-manager-agent/scripts/detect-doc-redundancy.sh
./.github/skills/documentation-manager-agent/scripts/check-doc-metadata.sh docs/specifications/
```

---

**Access Level**: Documentation Read/Write  
**Protected**: Yes - Configuration metadata only  
**Maintainer**: Documentation Team  
**Review Frequency**: Pre-commit + weekly audit
