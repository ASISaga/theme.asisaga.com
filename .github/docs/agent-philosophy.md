# Agent Intelligence Philosophy

**Last Updated**: 2026-02-14  
**Audience**: Agent developers, contributors

## Vision: Living Genome Architecture

The ASI Saga theme operates as a **Living Genome** - not a static codebase, but an evolving intelligence system where AI agents act as:

- **Ontological Gatekeepers** - Maintaining semantic purity
- **Evolution Facilitators** - Managing growth through PRs
- **Knowledge Curators** - Documenting the "why" behind every change
- **Quality Guardians** - Ensuring accessibility and best practices
- **Self-Learning Optimizers** - Continuously improving the agent system itself

## Dogfooding Principle

**Agents use the same standards they enforce**:

- SCSS agents enforce zero-CSS → Agents enforce zero-duplication in prompts
- HTML agents enforce semantic structure → Agents have semantic role definitions
- Docs agents enforce spec references → Agents maximally reference `/docs/specifications/`

**Result**: The agent system **practices what it preaches**, creating a self-improving intelligence loop.

## Core Principles

### 1. Tool Leverage

Orchestrate existing automation, never duplicate. Reference repository documents, npm scripts, and validation tools rather than reimplementing logic.

**Examples**:
- Use `npm test` rather than describing test commands
- Reference `/docs/specifications/` rather than duplicating technical details
- Invoke validation scripts rather than manually checking

### 2. Path Specificity

Instructions auto-load based on file patterns. Detailed coding standards live in `.github/instructions/` with `applyTo` glob patterns, keeping copilot-instructions.md concise.

**Benefits**:
- Context-appropriate guidance
- No overwhelming agents with irrelevant details
- Easier maintenance and updates

### 3. Context Efficiency

Reference specs/docs, eliminate redundancy. Maximize useful information within GitHub Copilot's context window by pointing to detailed documentation rather than duplicating it.

**Metrics**:
- Spec coverage: Percentage of agents with proper references
- Context efficiency: Information density per token
- Duplication rate: Repeated content across files

### 4. Ouroboros Pattern

Agents evolve themselves through continuous use. The agent-evolution-agent uses its own principles to improve the agent ecosystem, creating a recursive improvement loop.

**Self-Learning Loop**:
```
Codebase Change → Spec Update → Agent Sync → Refactor → Validate → Metrics → Improve
```

## Agent Intelligence Architecture

**Five-pillar structure**:

1. **Instructions** (`.github/instructions/`) - Path-activated coding standards
2. **Specifications** (`.github/specs/`) - Detailed technical frameworks
3. **Documentation** (`.github/docs/`) - Implementation guides and references
4. **Agents** (`.github/agents/`, `.github/prompts/`) - Executable intelligence
5. **Skills** (`.github/skills/`) - Reusable capabilities

Each pillar has a specific purpose and cross-references the others to maintain coherence without duplication.

## Semantic Purity

At the heart of the Genesis Ontological Design System is **semantic thinking** - separating "what it is" from "how it looks."

**Agents must**:
- Think in roles and purposes, not visual attributes
- Document intent, not implementation
- Maintain the three-tier architecture (Content → Interface → Engine)

**Example transformations**:
- ❌ "Make buttons blue" → ✅ "Represent primary actions"
- ❌ "Larger text" → ✅ "Emphasize key information (axiom cognition)"
- ❌ "Rounded corners" → ✅ "Visual entity classification"

## Evolution Over Perfection

The system should grow organically based on real needs:

- Accept imperfection as starting point
- Document every evolution with reasoning
- Allow old decisions to be revisited
- Prioritize patterns used by multiple contexts
- Refactor when complexity outweighs clarity

## Quality Indicators

**Healthy system**:
- 📈 Agents reference specs consistently
- 📈 Low duplication across files
- 📈 High context efficiency
- 📈 Clear separation of concerns
- 📈 Self-improvement metrics trending positive

**Unhealthy patterns**:
- 📉 Agents duplicating spec content
- 📉 Copilot-instructions.md growing beyond 200 lines
- 📉 Missing or broken cross-references
- 📉 Agents unable to find relevant information
- 📉 Metrics stagnating or declining

## Active Implementation

**Dogfooding is now automated** - not just philosophy:

### CI/CD Workflow
`.github/workflows/agent-quality.yml` runs automatically:
- Every PR affecting agent files
- Weekly on Sunday (continuous improvement)
- Manual workflow dispatch

**Validates**:
- Agent quality metrics
- Duplication detection
- Spec synchronization
- Improvement recommendations

### NPM Scripts
```bash
npm run dogfood              # Complete validation suite
npm run validate:agents      # Quality audit
npm run audit:agents         # Get recommendations
npm run metrics:agents       # Track trends
```

### Metrics Tracking
`.github/metrics/` stores historical data:
- Baseline established: 2026-02-14
- 26 agents analyzed
- 52% spec coverage (target: ≥90%)
- 39/100 context efficiency (target: ≥85)
- 16 agents need improvement

**Goal**: Ouroboros loop - agents continuously improving agents

## References

**Related Documentation**:
- `.github/specs/agent-intelligence-framework.md` - Complete framework specification
- `.github/docs/dogfooding-guide.md` - Self-improvement workflows
- `.github/docs/agent-metrics.md` - Measuring system health
- `.github/docs/conventional-tools.md` - All validation commands
- `.github/docs/agent-onboarding.md` - Training new agents in these principles
- `.github/workflows/agent-quality.yml` - Automated quality checks

---

**Version**: 1.1 - Added active implementation section  
**Last Updated**: 2026-02-14  
**Purpose**: Define philosophical foundation for agent intelligence system
