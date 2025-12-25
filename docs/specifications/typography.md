# Typography Specification

## Overview

The ASI Saga theme uses a **consciousness-supporting typography system** that balances readability, visual hierarchy, and sacred aesthetics. The system is built on three font families, each serving a specific purpose.

## Font Families

### Consciousness Font (Interface)

**Font**: Inter, SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

**Purpose**: Interface elements, navigation, buttons, forms

**Characteristics**:
- Clean, modern sans-serif
- Excellent readability at all sizes
- Optimized for screen display

**Usage**:
```scss
$font-family-interface: 'Inter', -apple-system, BlinkMacSystemFont, 
                        'Segoe UI', Roboto, sans-serif;
```

### Wisdom Font (Content)

**Font**: Crimson Text, Georgia, "Times New Roman", serif

**Purpose**: Long-form content, articles, documentation

**Characteristics**:
- Elegant serif typeface
- Excellent for extended reading
- Classical, contemplative feel

**Usage**:
```scss
$font-family-content: 'Crimson Text', Georgia, 'Times New Roman', serif;
```

### Sacred Font (Emphasis)

**Font**: Montserrat, 'Helvetica Neue', Arial, sans-serif

**Purpose**: Headings, sacred emphasis, call-to-action text

**Characteristics**:
- Bold, geometric sans-serif
- Strong visual presence
- Works well for emphasis

**Usage**:
```scss
$font-family-sacred: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
```

## Typography Scale

### Base Settings

```scss
// _sass/base/_typography.scss

$font-size-base: 1rem;        // 16px
$line-height-base: 1.6;       // 25.6px
$font-weight-normal: 400;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### Sacred Ratio Scale

**Based on Golden Ratio (1.618)**:

```scss
// Font size scale
$font-size-xs: 0.75rem;      // 12px
$font-size-sm: 0.875rem;     // 14px
$font-size-base: 1rem;       // 16px (minimum)
$font-size-md: 1.125rem;     // 18px
$font-size-lg: 1.25rem;      // 20px
$font-size-xl: 1.5rem;       // 24px
$font-size-2xl: 2rem;        // 32px
$font-size-3xl: 2.5rem;      // 40px
$font-size-4xl: 3rem;        // 48px
$font-size-5xl: 4rem;        // 64px

// Headings (using golden ratio)
$h1-font-size: 2.618rem;     // ~42px
$h2-font-size: 2rem;         // 32px
$h3-font-size: 1.618rem;     // ~26px
$h4-font-size: 1.25rem;      // 20px
$h5-font-size: 1.125rem;     // 18px
$h6-font-size: 1rem;         // 16px
```

### Line Heights

**Heartbeat rhythm** for optimal consciousness absorption:

```scss
$line-height-tight: 1.2;     // Headings
$line-height-base: 1.6;      // Body text
$line-height-relaxed: 1.8;   // Long-form content
$line-height-loose: 2.0;     // Special emphasis
```

## Heading Hierarchy

### HTML Structure

```html
<h1>Page Title</h1>           <!-- One per page -->
  <h2>Major Section</h2>      
    <h3>Subsection</h3>
      <h4>Sub-subsection</h4>
        <h5>Minor heading</h5>
          <h6>Smallest heading</h6>
```

### Styling

```scss
// _sass/base/_typography.scss

h1, .h1 {
  font-family: $font-family-sacred;
  font-size: $h1-font-size;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  margin-bottom: 1.5rem;
  color: $cosmic-blue;
}

h2, .h2 {
  font-family: $font-family-sacred;
  font-size: $h2-font-size;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: $cosmic-blue;
}

h3, .h3 {
  font-family: $font-family-sacred;
  font-size: $h3-font-size;
  font-weight: $font-weight-semibold;
  line-height: $line-height-tight;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: $text-primary;
}

h4, h5, h6 {
  font-family: $font-family-interface;
  font-weight: $font-weight-semibold;
  line-height: $line-height-base;
}
```

### Responsive Headings

```scss
// Scale down on mobile
@media (max-width: 768px) {
  h1, .h1 {
    font-size: $h2-font-size;  // 32px
  }
  
  h2, .h2 {
    font-size: $h3-font-size;  // 26px
  }
  
  h3, .h3 {
    font-size: $h4-font-size;  // 20px
  }
}
```

## Body Text

### Paragraphs

```scss
p {
  font-family: $font-family-content;
  font-size: $font-size-base;
  line-height: $line-height-base;
  margin-bottom: 1rem;
  color: $text-primary;
}

// Long-form content
.article-content p,
.docs-content p {
  font-size: $font-size-md;      // 18px for better readability
  line-height: $line-height-relaxed;  // 1.8
  margin-bottom: 1.5rem;
}
```

### Text Modifiers

```scss
// Emphasis
strong, .font-weight-bold {
  font-weight: $font-weight-bold;
}

em, .font-italic {
  font-style: italic;
}

// Semantic emphasis
.text-muted {
  color: $text-muted;
  font-size: $font-size-sm;
}

.text-small {
  font-size: $font-size-sm;  // 14px
}

.text-large {
  font-size: $font-size-lg;  // 20px
}

// Sacred emphasis
.text-sacred {
  font-family: $font-family-sacred;
  font-weight: $font-weight-bold;
  color: $luminous-gold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Lists

```scss
ul, ol {
  font-family: $font-family-content;
  font-size: $font-size-base;
  line-height: $line-height-base;
  margin-bottom: 1rem;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.5rem;
  }
  
  // Nested lists
  ul, ol {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

// Definition lists
dl {
  dt {
    font-weight: $font-weight-semibold;
    margin-top: 1rem;
  }
  
  dd {
    margin-left: 2rem;
    margin-bottom: 0.5rem;
  }
}
```

## Links

```scss
a {
  color: $luminous-gold;
  text-decoration: underline;
  text-decoration-color: rgba($luminous-gold, 0.3);
  text-underline-offset: 0.2em;
  transition: all 0.3s ease;
  
  &:hover {
    color: darken($luminous-gold, 10%);
    text-decoration-color: currentColor;
  }
  
  &:focus-visible {
    outline: 2px solid $luminous-gold;
    outline-offset: 2px;
    text-decoration: none;
  }
}

// Link in body text
.content a,
article a {
  color: $primary;
  font-weight: $font-weight-semibold;
}
```

## Code Typography

```scss
// Inline code
code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875em;
  padding: 0.2em 0.4em;
  background: $gray-100;
  border-radius: 0.25rem;
  color: $danger;
}

// Code blocks
pre {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: $font-size-sm;
  line-height: 1.5;
  padding: 1rem;
  background: $gray-900;
  color: $transcendent-white;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  
  code {
    background: transparent;
    padding: 0;
    color: inherit;
  }
}
```

## Blockquotes

```scss
blockquote {
  font-family: $font-family-content;
  font-size: $font-size-lg;
  font-style: italic;
  line-height: $line-height-relaxed;
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-left: 4px solid $luminous-gold;
  background: rgba($luminous-gold, 0.05);
  color: $text-secondary;
  
  p:last-child {
    margin-bottom: 0;
  }
  
  cite {
    display: block;
    margin-top: 1rem;
    font-size: $font-size-base;
    font-style: normal;
    color: $text-muted;
    
    &::before {
      content: '— ';
    }
  }
}
```

## Special Typography

### Sacred Text

```scss
.sacred-text {
  font-family: $font-family-sacred;
  font-size: $font-size-2xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  text-align: center;
  color: $luminous-gold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 3rem 0;
  
  // Sacred glow effect
  text-shadow: 0 0 20px rgba($luminous-gold, 0.5);
}
```

### Lead Paragraph

```scss
.lead {
  font-size: $font-size-xl;
  font-weight: $font-weight-normal;
  line-height: $line-height-relaxed;
  color: $text-secondary;
  margin-bottom: 2rem;
}
```

### Display Text

```scss
.display-1 {
  font-family: $font-family-sacred;
  font-size: $font-size-5xl;  // 64px
  font-weight: $font-weight-bold;
  line-height: 1.1;
}

.display-2 {
  font-family: $font-family-sacred;
  font-size: $font-size-4xl;  // 48px
  font-weight: $font-weight-bold;
  line-height: 1.1;
}

.display-3 {
  font-family: $font-family-sacred;
  font-size: $font-size-3xl;  // 40px
  font-weight: $font-weight-bold;
  line-height: 1.2;
}
```

## Accessibility

### Minimum Font Size

**16px minimum** for body text:

```scss
body {
  font-size: $font-size-base;  // 1rem = 16px
}

// ✅ Acceptable for small text (use sparingly)
.small-text {
  font-size: $font-size-sm;  // 14px
}

// ❌ Avoid smaller than 14px
```

### Color Contrast

All text must meet WCAG AA contrast requirements:

```scss
// ✅ GOOD: High contrast
.text-on-light {
  color: $text-primary;  // #212529 on white (16.05:1)
}

.text-on-dark {
  color: $transcendent-white;  // #FFFFFF on cosmic blue (16.47:1)
}

// ❌ BAD: Insufficient contrast
.low-contrast {
  color: #999999;  // on #CCCCCC (2.35:1) - FAILS
}
```

### Readable Line Length

**45-75 characters per line** for optimal readability:

```scss
.content-wrapper {
  max-width: 65ch;  // ~75 characters
  margin: 0 auto;
}

.article-content {
  max-width: 55ch;  // Narrower for better readability
}
```

## Responsive Typography

### Mobile-First Scaling

```scss
body {
  font-size: 1rem;  // 16px mobile
  
  @media (min-width: 768px) {
    font-size: 1.0625rem;  // 17px tablet
  }
  
  @media (min-width: 1200px) {
    font-size: 1.125rem;  // 18px desktop
  }
}
```

### Fluid Typography

Using `clamp()` for smooth scaling:

```scss
h1 {
  font-size: clamp(2rem, 5vw, 2.618rem);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}

.lead {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
}
```

## Typography Utilities

```scss
// Font families
.font-interface { font-family: $font-family-interface; }
.font-content { font-family: $font-family-content; }
.font-sacred { font-family: $font-family-sacred; }

// Font weights
.font-weight-normal { font-weight: $font-weight-normal; }
.font-weight-semibold { font-weight: $font-weight-semibold; }
.font-weight-bold { font-weight: $font-weight-bold; }

// Font sizes
.text-xs { font-size: $font-size-xs; }
.text-sm { font-size: $font-size-sm; }
.text-base { font-size: $font-size-base; }
.text-lg { font-size: $font-size-lg; }
.text-xl { font-size: $font-size-xl; }

// Text alignment
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

// Text transform
.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }

// Line height
.line-height-tight { line-height: $line-height-tight; }
.line-height-base { line-height: $line-height-base; }
.line-height-relaxed { line-height: $line-height-relaxed; }
```

## Best Practices

### Content Hierarchy

```html
<!-- ✅ GOOD: Clear hierarchy -->
<h1>Main Title</h1>
<p class="lead">Introduction paragraph</p>
<h2>Section Title</h2>
<p>Body content...</p>

<!-- ❌ BAD: Skipping levels -->
<h1>Title</h1>
<h4>Subsection</h4>  <!-- Skipped h2, h3 -->
```

### Readability

```scss
// ✅ GOOD: Comfortable reading
.article {
  max-width: 65ch;
  font-size: 1.125rem;  // 18px
  line-height: 1.8;
}

// ❌ BAD: Too wide, small text
.article-bad {
  width: 100%;
  font-size: 0.875rem;  // 14px
  line-height: 1.2;
}
```

## Testing Checklist

- [ ] All body text ≥ 16px
- [ ] Heading hierarchy never skips levels
- [ ] Color contrast meets WCAG AA
- [ ] Line length ≤ 75 characters
- [ ] Line height adequate for reading
- [ ] Text scales properly on mobile
- [ ] Links are distinguishable
- [ ] Focus indicators visible on all text links

## Related Specifications

- [Color System](./color-system.md)
- [Accessibility](./accessibility.md)
- [SCSS & Styling](./scss-styling.md)
- [Responsive Design](./responsive-design.md)
