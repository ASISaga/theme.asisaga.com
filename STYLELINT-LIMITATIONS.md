# Stylelint Limitations and Workarounds

This document outlines known limitations of stylelint in detecting SCSS/Sass errors and provides workarounds.

## Issue: Undefined Mixins Not Detected

### Problem
Stylelint **cannot detect undefined SCSS mixins** at lint time. When you use `@include` with a mixin that doesn't exist, stylelint will not report an error.

### Example
```scss
// This will pass stylelint but fail at build time:
.my-class {
  @include non-existent-mixin;  // ❌ Stylelint won't catch this
}
```

### Why This Happens
The `stylelint-scss` plugin does not include a rule to validate that mixins exist before they are included. Available SCSS rules include:
- `scss/at-mixin-pattern` - validates mixin naming patterns
- `scss/at-mixin-no-risky-nesting-selector` - prevents risky nesting
- `scss/no-duplicate-mixins` - prevents duplicate mixin definitions

But there is **no** `scss/at-mixin-no-unknown` or similar rule.

### Detection Scope
This limitation applies to:
- ✅ **Functions**: `function-no-unknown` rule exists (can detect undefined functions)
- ❌ **Mixins**: No equivalent rule (cannot detect undefined mixins)
- ✅ **Variables**: Can be detected with proper configuration
- ✅ **Properties**: `property-no-unknown` rule exists

### Workarounds

#### 1. Always Run Jekyll Build Before Committing
The Sass compiler (used by Jekyll) **will** catch undefined mixins:
```bash
bundle exec jekyll build
```

Error example:
```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
                    Undefined mixin 'background-cover'.
```

#### 2. Use CI/CD Pipeline
Set up GitHub Actions or other CI to run Jekyll build on every commit:
```yaml
- name: Build site
  run: bundle exec jekyll build
```

#### 3. IDE Integration
Use IDE plugins that provide Sass/SCSS language support:
- **VS Code**: "SCSS IntelliSense" extension
- **WebStorm/PhpStorm**: Built-in SCSS support
- **Sublime Text**: "Sass" package

#### 4. Pre-commit Hooks
Add a pre-commit hook to run Jekyll build:
```bash
#!/bin/bash
bundle exec jekyll build --trace
```

### Best Practices

1. **Centralize Mixin Definitions**: Keep all mixins in dedicated files like `_sass/base/_semantic-mixins.scss`

2. **Import Order Matters**: Ensure mixin files are imported before they are used:
   ```scss
   @import "base/semantic-mixins";  // Define mixins first
   @import "components/hero";       // Use mixins here
   ```

3. **Comment Mixin Usage**: Add comments explaining which file defines the mixin:
   ```scss
   // From _sass/base/_semantic-mixins.scss
   @include background-cover;
   ```

4. **Regular Build Testing**: Run builds frequently during development, not just before commits

### Related Issue
- Original issue: "Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss': Undefined mixin 'background-cover'"
- Resolution: Added missing mixin definition to `_sass/base/_semantic-mixins.scss`

### Future Improvements
If stylelint-scss adds support for detecting undefined mixins in the future, update `.stylelintrc.yml`:
```yaml
# When available:
scss/at-mixin-no-unknown: true
```

## See Also
- [Stylelint-SCSS Rules](https://github.com/stylelint-scss/stylelint-scss#list-of-rules)
- [Stylelint Documentation](https://stylelint.io/)
- [SCSS Instructions](.github/instructions/scss.instructions.md)

