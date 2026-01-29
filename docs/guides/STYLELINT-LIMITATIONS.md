# Stylelint Limitations and Workarounds

This document outlines known limitations of stylelint in detecting SCSS/Sass errors and provides workarounds.

## Issue: Undefined Mixins and Variables Not Detected

### Problem
Stylelint **cannot detect undefined SCSS mixins or variables** at lint time. When you use `@include` with a mixin that doesn't exist, or reference an undefined variable, stylelint will not report an error.

### Example
```scss
// These will pass stylelint but fail at build time:
.my-class {
  @include non-existent-mixin;  // ❌ Stylelint won't catch this
  color: $undefined-variable;   // ❌ Stylelint won't catch this
}
```

### Why This Happens
The `stylelint-scss` plugin does not include rules to validate that mixins or variables exist before they are used. Available SCSS rules include:
- `scss/at-mixin-pattern` - validates mixin naming patterns
- `scss/at-mixin-no-risky-nesting-selector` - prevents risky nesting
- `scss/no-duplicate-mixins` - prevents duplicate mixin definitions

But there is **no** `scss/at-mixin-no-unknown` or `scss/no-undefined-variables` rule.

### Detection Scope
This limitation applies to:
- ✅ **Functions**: `function-no-unknown` rule exists (can detect some undefined functions)
- ❌ **Mixins**: No equivalent rule (cannot detect undefined mixins)
- ❌ **Variables**: Cannot reliably detect undefined variables
- ✅ **Properties**: `property-no-unknown` rule exists

## Solution: Sass Test Compilation (RECOMMENDED)

### Quick Start

Run the Sass test compilation to catch all undefined mixins, variables, and functions:

```bash
npm run test:scss
```

This compiles all theme SCSS files and reports any errors that stylelint cannot detect.

### How It Works

The test compilation:
1. Uses Dart Sass to compile `_sass/_test-compile.scss`
2. This file imports all theme SCSS (`@import "common"`)
3. Exercises all ontology variants to ensure they compile
4. Outputs to `/tmp/test-compile.css` (ignored by git)
5. Reports any compilation errors with file names and line numbers

### Example Output

**Success:**
```bash
> npm run test:scss

WARNING: 147 repetitive deprecation warnings omitted.
Run in verbose mode to see all warnings.
```

**Error (undefined variable):**
```bash
Error: Undefined variable.
   ╷
10 │   background-color: $gray-100;
   │                     ^^^^^^^^^
   ╵
  _sass/components/_testimonial.scss 10:21
```

**Error (missing mixin parameter):**
```bash
Error: Missing argument $text.
    ┌──> _sass/layouts/_faq.scss
79  │     @include button-variant($primary, $primary);
    │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ invocation
```

### Running Tests

**Standard test** (recommended for regular use):
```bash
npm run test:scss
```

**Verbose test** (for debugging):
```bash
npm run test:scss:verbose
```

**Combined linting and testing** (runs both stylelint and Sass compilation):
```bash
npm test
```

### Integration with Development Workflow

#### During Development
```bash
# Make SCSS changes
vim _sass/components/my-component.scss

# Test compilation (fast feedback)
npm run test:scss

# If successful, also run linter
npm run lint:scss
```

#### Before Committing
```bash
# Run both linter and test compilation
npm test

# Fix any errors reported
# Commit when both pass
```

#### In CI/CD Pipeline
Add to GitHub Actions workflow:
```yaml
- name: Install dependencies
  run: npm install

- name: Lint and test SCSS
  run: npm test
```

### Advantages Over Jekyll Build

| Aspect | Sass Test | Jekyll Build |
|--------|-----------|--------------|
| **Speed** | ~2-5 seconds | ~30-60 seconds |
| **Dependencies** | npm only | Ruby, Bundler, Jekyll |
| **Scope** | SCSS only | Entire site build |
| **CI Integration** | Simple npm script | Requires Ruby setup |
| **Error Messages** | Clean, focused | Mixed with other build output |

## Alternative Workarounds

### 1. Jekyll Build (Slower but Comprehensive)
The Sass compiler used by Jekyll will catch undefined mixins and variables:
```bash
bundle exec jekyll build
```

Error example:
```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
                    Undefined mixin 'background-cover'.
```

### 2. IDE Integration
Use IDE plugins that provide Sass/SCSS language support:
- **VS Code**: "SCSS IntelliSense" extension
- **WebStorm/PhpStorm**: Built-in SCSS support
- **Sublime Text**: "Sass" package

### 3. Pre-commit Hooks
Add a pre-commit hook to run the test:
```bash
#!/bin/bash
npm run test:scss
```

## Best Practices

1. **Run `npm run test:scss` frequently** during SCSS development for fast feedback

2. **Centralize Definitions**: Keep all mixins in dedicated files like `_sass/base/_semantic-mixins.scss` and variables in `_sass/base/_design-tokens.scss`

3. **Import Order Matters**: Ensure mixin and variable files are imported before they are used:
   ```scss
   @import "base/design-tokens";    // Define variables first
   @import "base/semantic-mixins";  // Define mixins second
   @import "components/hero";       // Use them here
   ```

4. **Comment Complex Usage**: Add comments explaining which file defines mixins/variables:
   ```scss
   // From _sass/base/_semantic-mixins.scss
   @include background-cover;
   
   // From _sass/base/_design-tokens.scss
   color: $text-primary;
   ```

5. **Test After Changes**: Always run `npm run test:scss` after modifying SCSS

## Files Added for Sass Testing

- **`_sass/_test-compile.scss`** - Main test file that imports all theme SCSS
- **`package.json`** - Updated with `test:scss`, `test:scss:verbose`, and `test` scripts
- **`.gitignore`** - Updated to ignore `/tmp/test-compile.css` output

## Related Issues

- Original issue: Stylelint cannot detect undefined mixins and variables
- Solution: Added Sass test compilation using Dart Sass
- Benefits: Catches undefined mixins, variables, functions, and incorrect mixin/function signatures

## See Also
- [Stylelint-SCSS Rules](https://github.com/stylelint-scss/stylelint-scss#list-of-rules)
- [Stylelint Documentation](https://stylelint.io/)
- [Dart Sass Documentation](https://sass-lang.com/dart-sass)
- [SCSS Instructions](.github/instructions/scss.instructions.md)

