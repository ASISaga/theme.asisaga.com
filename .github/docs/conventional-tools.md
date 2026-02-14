# Conventional Tools Reference

**Last Updated**: 2026-02-14  
**Audience**: Developers, Copilot Coding Agents

## Introduction

This document catalogs all conventional (non-AI) software tools, utilities, linters, scripts, and npm commands that GitHub Copilot coding agents leverage in this repository. These tools provide automated validation, testing, and build processes that agents orchestrate rather than duplicate.

## Philosophy: Tool Leverage

**AI agents SUPERCHARGE existing tools** through orchestration:

- **Never duplicate**: Reference npm scripts, don't reimplement
- **Automate validation**: Use linters and validators already configured
- **Compose workflows**: Chain existing tools for complex tasks
- **Continuous feedback**: Run tools frequently during development

## npm Scripts

All automation is accessible through npm scripts defined in `package.json`:

### Primary Test Commands

```bash
npm test                    # Run all tests (SCSS compilation + linting)
npm run test:scss           # Sass compilation check (catches undefined mixins/vars)
npm run lint:scss           # Stylelint for code quality
npm run test:e2e            # Playwright E2E tests (live site)
npm run test:e2e:local      # Playwright E2E tests (local Jekyll server)
```

### Detailed SCSS Testing

```bash
npm run test:scss:verbose   # Verbose Sass compilation with detailed output
npm run lint:scss:fix       # Auto-fix Stylelint issues
npm run lint:scss:report    # Verbose linting report
```

### E2E Testing Variants

```bash
npm run test:e2e:headed     # Run Playwright with browser visible
npm run test:e2e:ui         # Run Playwright in UI mode (interactive)
npm run test:e2e:report     # Show HTML test report
```

### Recommended Workflow

**Before committing:**
```bash
npm test                    # Fast check (SCSS + lint)
```

**During development:**
```bash
npm run test:scss           # Quick compilation check
npm run lint:scss:fix       # Auto-fix style issues
```

**Full validation:**
```bash
npm test                    # SCSS + lint
npm run test:e2e:local      # E2E tests (requires Jekyll running)
```

## Tool Details

### 1. Sass Compiler (`sass`)

**Purpose**: Compiles SCSS to CSS and validates syntax

**Key features:**
- Catches undefined variables (`$undefined-var`)
- Detects undefined mixins (`@include non-existent`)
- Validates SCSS syntax and structure
- Faster than Stylelint for compilation errors

**Configuration:**
- Load path: `_sass/`
- Test file: `_sass/_test-compile.scss`
- Output: `/tmp/test-compile.css` (not committed)

**When agents should use:**
- After making SCSS changes
- Before committing SCSS files
- When debugging "undefined mixin" errors
- Fast validation loop during development

### 2. Stylelint (`stylelint`)

**Purpose**: Enforces code quality and style standards for SCSS

**Configuration file:** `.stylelintrc.yml`

**Key rules enforced:**
- **No `@extend`**: Forbidden (causes Jekyll build errors)
- **Max nesting depth**: 3 levels maximum
- **Import rules**: Specific patterns allowed/disallowed
- **Code style**: Indentation, spacing, naming conventions
- **SCSS best practices**: Property order, selector patterns

**Limitations**: 
- Cannot validate Sass compilation (missing vars/mixins)
- Slower than Sass compiler
- Use Sass compiler first, Stylelint second

→ **Details**: `/docs/guides/STYLELINT.md`, `/docs/guides/STYLELINT-LIMITATIONS.md`

**When agents should use:**
- After Sass compilation passes
- Before committing SCSS changes
- To enforce code quality standards
- Auto-fix mode for quick style corrections

### 3. Playwright (`@playwright/test`)

**Purpose**: E2E testing and visual regression testing

**Configuration file:** `playwright.config.js`

**Test categories** (24 test cases across):
1. Semantic HTML structure (4 tests)
2. Accessibility landmarks (4 tests)
3. Component structure (4 tests)
4. Responsive behavior (3 tests)
5. CSS/styling (2 tests)
6. Content presence (3 tests)
7. JavaScript/interactivity (2 tests)
8. Performance/loading (2 tests)

**Test files:**
- `tests/e2e/structural-regression.spec.js` - Main structural tests
- `tests/e2e/dimensions-navbar.spec.js` - Dimension tests
- `tests/e2e/navbar-visual.spec.js` - Navbar visual tests

**Viewports tested:**
- Desktop: 1440x900
- Mobile: iPhone 12 (390x844)
- Tablet: iPad Pro (1024x1366)

**Environment variables:**
- `TEST_LOCAL=1` - Test against `localhost:4000` instead of live site

**When agents should use:**
- After HTML/layout changes
- Before committing component changes
- To validate responsive behavior
- To ensure accessibility compliance

→ **Details**: `/docs/PLAYWRIGHT-TESTING.md`

## Agent Validation Scripts

Custom validation scripts in `.github/skills/*/scripts/`:

```bash
./.github/skills/[skill-name]/scripts/validate-*.sh
```

**Examples:**
- Validate SCSS ontology usage
- Check documentation structure
- Verify agent file formats
- Test subdomain templates

**When agents should use:**
- When working on agent system files
- Before committing skill/agent changes
- During agent ecosystem validation

## CI/CD Integration

**GitHub Actions workflow:** `.github/workflows/playwright.yml`

**Triggers:**
- Push/PR to main branch
- Weekly on Sundays
- Manual workflow dispatch

**Artifacts:**
- HTML test reports (30-day retention)
- Screenshots on failure (7-day retention)

→ **Details**: `/docs/PLAYWRIGHT-TESTING.md` (CI/CD Integration section)

## Build Tools

### Jekyll

**Purpose**: Static site generator for theme builds

**Configuration:** `_config.yml`

**Not invoked via npm** - Agents should not run Jekyll directly. Use existing test infrastructure instead.

### Vite (Optional)

**Configuration files:**
- `vite.config.js` - General Vite config
- `vite.animations.config.js` - Animation-specific config

**Not actively used** - Future enhancement for advanced builds

## Dependencies

### DevDependencies

```json
{
  "@playwright/test": "^1.58.2",
  "sass": "^1.97.2",
  "stylelint": "^16.12.0",
  "stylelint-config-standard-scss": "^13.1.0",
  "stylelint-order": "^6.0.4",
  "stylelint-scss": "^6.10.0"
}
```

### Dependencies

```json
{
  "motion": "^12.30.0"
}
```

## Quick Reference for Agents

### When making SCSS changes:
```bash
npm run test:scss       # First: Check compilation
npm run lint:scss:fix   # Second: Auto-fix style issues
npm test                # Third: Full validation
```

### When making HTML/layout changes:
```bash
npm run test:e2e:local  # Requires Jekyll running on :4000
# OR
npm run test:e2e        # Test against live site
```

### When making JavaScript changes:
```bash
npm run test:e2e:local  # E2E tests validate JS functionality
```

### When making documentation changes:
```bash
# No specific tools - manual review
```

### Before committing anything:
```bash
npm test                # Always run before commit
```

## Best Practices for Agents

1. **Run tools early and often** - Don't wait until the end
2. **Use appropriate tool** - Sass for compilation, Stylelint for quality
3. **Read error messages** - Tools provide specific guidance
4. **Auto-fix when available** - Use `lint:scss:fix` to save time
5. **Don't duplicate tools** - Reference existing scripts
6. **Compose workflows** - Chain commands with `&&`

## Error Interpretation

### Common Sass Errors

**"Undefined variable"**
```
Error: Undefined variable: "$undefined-var"
```
→ Check variable is defined and imported

**"Undefined mixin"**
```
Error: Undefined mixin: "genesis-environment"
```
→ Check mixin is defined and ontology imported

### Common Stylelint Errors

**"@extend is not allowed"**
```
at-rule-disallowed-list: @extend is not allowed
```
→ Remove `@extend`, use mixins instead

**"Expected nesting depth to be no more than 3"**
```
max-nesting-depth: Expected nesting depth to be no more than 3
```
→ Flatten selector structure

## Related Documentation

- **Stylelint guide**: `/docs/guides/STYLELINT.md`
- **Stylelint limitations**: `/docs/guides/STYLELINT-LIMITATIONS.md`
- **Playwright testing**: `/docs/PLAYWRIGHT-TESTING.md`
- **Test organization**: `/tests/README.md`

---

**Version**: 1.0.0  
**Mechanism**: Reference this file from `copilot-instructions.md` instead of duplicating tool lists
