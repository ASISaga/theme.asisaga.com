---
applyTo: ".github/**/*.md,.github/**/*.prompt.md,.github/skills/**/*"
description: "GitHub Copilot agent instructions - pointer to generic framework and theme-specific patterns"
---

# GitHub Agent Instructions

**This file is now a navigation pointer to separated generic and theme-specific instructions.**

## 📚 Instruction Files

### Generic Framework (Reusable Across Repositories)

→ **`.github/instructions/github-agent-system.instructions.md`**

Complete reusable framework for establishing GitHub Copilot agent intelligence systems:
- Ouroboros & dogfooding philosophy
- Five-pillar structure (agents, instructions, prompts, skills, copilot-instructions.md)
- Agent/prompt/skill templates
- Validation workflows
- Tool integration patterns
- Context window optimization
- Repository adaptation guide

**Copy this file to any repository** to establish best-practice Copilot agent ecosystem.

### Theme-Specific Patterns (This Repository Only)

→ **`.github/instructions/theme-specific.instructions.md`**

Genesis Ontological Design System theme-specific patterns:
- Ontological Proposition System
- Subdomain intelligence system (`.github/subdomain/`)
- Theme vs subdomain responsibilities
- Theme-specific npm scripts
- Theme-specific validation scripts

**DO NOT copy to other repositories** unless implementing similar theme/subdomain architecture.

## Quick Reference

**For generic agent work:**
- Read: `github-agent-system.instructions.md`
- Follow: Generic templates and patterns
- Copy: To other repositories as needed

**For theme-specific work:**
- Read: `theme-specific.instructions.md`
- Follow: Ontological Proposition System
- Coordinate: With subdomain repositories

**For detailed specifications:**
- Read: `/docs/specifications/github-copilot-agent-guidelines.md`
- Review: `.github/AGENTS.MD` for complete ecosystem

## Migration from v1.5

**v2.0 changes (2026-02-13):**
- Split into generic framework + theme-specific
- Generic content → `github-agent-system.instructions.md` (16KB, MIT licensed)
- Theme-specific content → `theme-specific.instructions.md` (10KB)
- This file → Navigation pointer
- Optimal context window usage
- Reusable across repositories

**What's where:**

| Content | v1.5 Location | v2.0 Location |
|---------|---------------|---------------|
| Generic framework | `github.instructions.md` | `github-agent-system.instructions.md` |
| Ontological Propositions | `github.instructions.md` | `theme-specific.instructions.md` |
| Subdomain references | `github.instructions.md` | `theme-specific.instructions.md` |
| Tool integration | `github.instructions.md` | Both (generic + theme-specific) |
| Templates | `github.instructions.md` | `github-agent-system.instructions.md` |

---

**Applies to**: `.github/**/*.md`, `.github/**/*.prompt.md`, `.github/skills/**/*`  
**Version**: 2.0.0 - Split into generic + theme-specific  
**Last Updated**: 2026-02-13
