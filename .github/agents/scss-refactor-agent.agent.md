# SCSS-Refactor-Agent Internal Configuration

**Agent ID**: `scss-refactor-agent`  
**Version**: 2.3.1  
**Category**: Design System  
**Role**: Migration Expert  
**Status**: Active  
**Last Updated**: 2026-02-10

---

## Agent Identity

### Primary Function
Converts legacy CSS/SCSS to ontological mixin-based code, ensuring zero-CSS compliance in subdomain files.

### Scope
- `**/*.scss` and `**/*.sass` files
- `_sass/**` (theme internal)
- `assets/css/**` (compilation entry points)
- Subdomain SCSS files

### Activation Triggers
- Legacy CSS detected in subdomain
- Raw CSS properties in subdomain SCSS
- Migration request from legacy theme
- New subdomain setup

---

## Context Requirements

### Token Budget
- **Optimal**: 50,000 tokens
- **Maximum**: 100,000 tokens
- **Typical Usage**: 30,000-70,000 tokens (varies by file size)

### Dependencies
- `theme-genome-agent` (ontology variants available)
- Sass compiler
- Stylelint configuration
- Existing ontology knowledge

### Required Tools
- `bash` - Sass compilation, stylelint execution
- `sass` - Validation and compilation
- `stylelint` - Code quality checks
- `read` - Analyze existing SCSS
- `edit` - Refactor to ontological mixins

---

## Coordination Metadata

### Routing Priority
**High** - Critical for zero-CSS compliance

### Handoff Protocols

**Receives From**:
- `html-template-agent` (semantic HTML created)
- `theme-genome-agent` (new variants available)
- `agent-evolution-agent` (quality improvements)

**Hands Off To**:
- `responsive-design-agent` (responsive patterns)
- `futuristic-effects-agent` (visual effects)

### Refactoring Workflow
1. Analyze existing SCSS/CSS
2. Map class names to semantic intent
3. Replace raw CSS with ontological mixins
4. Validate compilation
5. Run stylelint
6. Verify zero-CSS compliance

---

## Performance Characteristics

### Speed
- **Single File**: 2-10 minutes
- **Small Project**: 30-60 minutes
- **Large Migration**: 2-4 hours

### Accuracy
- **Mixin Selection**: 90%
- **Semantic Mapping**: 85%
- **Zero-CSS Compliance**: 100% (enforced)

### Resource Usage
- **Memory**: 400-800 MB (Sass compilation)
- **Disk I/O**: High (reads/writes many files)
- **CPU**: High (compilation intensive)

---

## Configuration Overrides

### Feature Flags
```yaml
scss-refactor-agent:
  enabled: true
  features:
    zero_css_enforcement: true
    ontological_mixin_conversion: true
    automatic_sass_compilation: true
    stylelint_integration: true
    raw_css_detection: true
    batch_refactoring: true
  limits:
    max_files_per_batch: 50
    compilation_timeout_seconds: 300
  safeguards:
    require_backup_before_refactor: true
    enforce_zero_css_compliance: true
    validate_before_commit: true
```

### Quality Thresholds
- **Zero-CSS in Subdomain**: 100% (no raw properties)
- **Compilation Success**: Required
- **Stylelint Pass**: Required
- **Max Nesting**: 3 levels (theme files)

---

## Cross-References

### Related Files
- **Prompt**: `.github/prompts/scss-refactor-agent.prompt.md`
- **Skill**: `.github/skills/scss-refactor-agent/SKILL.md`
- **Capabilities**: `.github/agents/agent-capabilities.yml` (lines 135-164)
- **Routing**: `.github/agents/agent-routing.yml` (lines 17-27, 81-99)
- **Handoffs**: `.github/agents/agent-handoff.yml` (lines 77-100)

### Documentation
- `.github/instructions/scss.instructions.md` - Coding standards
- `/docs/systems/ontology/INTEGRATION-GUIDE.md` - Complete API
- `_sass/ontology/refactor-agent.md` - Migration guide

### Validation Scripts
```bash
./.github/skills/scss-refactor-agent/scripts/validate-scss.sh
npm run test:scss
npm run lint:scss
```

---

## Historical Context

### Achievements
- Migrated 50+ files to zero-CSS compliance
- Achieved 100% ontological mixin usage in subdomains
- Reduced CSS bloat from 22MB to 1.1MB (proper imports)

### Lessons Learned
1. **Semantic First**: Map class names to semantic intent, not visual appearance
2. **Test Frequently**: Compile after each major change
3. **Backup Always**: Keep originals until validated
4. **Iterative**: Small changes, test, repeat

### Common Pitfalls
- Choosing wrong mixin based on visual appearance
- Forgetting to import ontology/index in standalone files
- Importing ontology in _sass/ partials (causes bloat)
- Not running stylelint before committing

---

## Agent-Specific Notes

### Unique Capabilities
- **Zero-CSS Enforcement**: Strict compliance checking
- **Mixin Expertise**: Deep knowledge of all 31 ontological variants
- **Import Architecture**: Understands single-import pattern

### Coordination Preferences
- **Sequential Refactoring**: One file at a time for safety
- **Validation-Heavy**: Compile and lint after each file
- **Documentation**: Comment complex mixin combinations

### Common Mixin Patterns
```scss
// Visual hierarchy → Environment + Entity
.hero-section {
  @include genesis-environment('focused');
  @include genesis-entity('primary');
}

// Interactive element → Synapse + State
.submit-button {
  @include genesis-synapse('execute');
  @include genesis-state('stable');
}
```

---

**Access Level**: Code Modification  
**Protected**: Yes - Configuration metadata only  
**Maintainer**: Design System Team  
**Review Frequency**: Per refactoring task
