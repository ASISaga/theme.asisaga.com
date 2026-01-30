# Quick Start: Enhanced Component Showcase

**Get started with the Enhanced Component Showcase in 5 minutes!**

---

## 🚀 What You'll Learn

In this quick start, you'll:
1. View the enhanced showcase page
2. Copy a component pattern
3. Create your own page using ontological SCSS
4. Validate your implementation

**Time Required**: 5-10 minutes

---

## Step 1: View the Showcase (1 min)

### Option A: Local Development
```bash
# Start Jekyll server
bundle exec jekyll serve

# Navigate to
http://localhost:4000/enhanced-showcase/
```

### Option B: Production
```
https://theme.asisaga.com/enhanced-showcase/
```

### What to Look For:
- ✅ Skip link at the top (try pressing Tab)
- ✅ Hero section with quantum gradient background
- ✅ Card grid that adapts to viewport size
- ✅ Interactive accordion (click to expand)
- ✅ Tab navigation (use Arrow keys)
- ✅ Alert components with different styles

---

## Step 2: Copy a Component (2 min)

Let's copy the **Blog Card** component as an example.

### From `enhanced-showcase.html`:
```html
<article class="blog-card">
  <a href="/blog/semantic-html" class="blog-card__link">
    <img 
      src="/assets/images/blog-thumb.jpg" 
      alt="Semantic HTML Best Practices" 
      class="blog-card__image"
    >
    <div class="blog-card__content">
      <h3 class="blog-card__title">Semantic HTML Best Practices</h3>
      <p class="blog-card__excerpt">
        Learn how to write meaningful, accessible HTML that follows web standards
      </p>
      <time class="blog-card__date" datetime="2026-01-29">
        January 29, 2026
      </time>
    </div>
  </a>
</article>
```

### From `assets/css/enhanced-showcase.scss`:
```scss
.blog-card {
  @include genesis-entity('primary');  // Glassmorphism card
  @include genesis-state('scroll-triggered');  // Fade-in on scroll
  
  &:hover {
    transform: translateY(-4px);
    transition: transform 0.3s ease;
  }
  
  .blog-card__link {
    @include genesis-synapse('navigate');  // Link styling
  }
  
  .blog-card__image {
    @include genesis-entity('image-adaptive');  // Responsive image
  }
  
  .blog-card__title {
    @include genesis-cognition('axiom');  // Large heading
  }
  
  .blog-card__excerpt {
    @include genesis-cognition('discourse');  // Body text
  }
  
  .blog-card__date {
    @include genesis-cognition('gloss');  // Small metadata
  }
}
```

---

## Step 3: Create Your Own Page (5 min)

### 3.1 Create HTML File

Create `my-page.html` in your subdomain:

```html
---
layout: default
title: My Custom Page
---

<!-- Skip link (REQUIRED first element) -->
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>

<!-- Main landmark (REQUIRED, exactly one) -->
<main id="skip-target" tabindex="-1" class="my-page">
  
  <!-- Hero Section -->
  <section class="my-hero" aria-labelledby="hero-title">
    <h1 id="hero-title" class="my-hero__title">Welcome to My Page</h1>
    <p class="my-hero__subtitle">Built with Genesis Design System</p>
    <a href="#content" class="my-hero__cta">Get Started</a>
  </section>
  
  <!-- Content Section -->
  <section id="content" class="my-content">
    <div class="card-grid">
      <!-- Paste the blog card here -->
      <article class="blog-card">
        <!-- ... blog card content ... -->
      </article>
      
      <!-- Add more cards -->
    </div>
  </section>
  
</main>
```

### 3.2 Create SCSS File

Create `assets/css/my-page.scss`:

```scss
---
---
@import "ontology/index";  // MUST be first import

.my-page {
  @include genesis-environment('focused');
  @include genesis-atmosphere('neutral');
}

.my-hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');
  @include genesis-atmosphere('void');  // Dark immersive
  
  .my-hero__title {
    @include genesis-cognition('axiom');
  }
  
  .my-hero__subtitle {
    @include genesis-cognition('discourse');
  }
  
  .my-hero__cta {
    @include genesis-synapse('execute');
  }
}

.my-content {
  @include genesis-environment('focused');
}

.card-grid {
  @include genesis-environment('distributed');  // Auto-responsive grid
}

// Blog card styles (paste from showcase)
.blog-card {
  @include genesis-entity('primary');
  @include genesis-state('scroll-triggered');
  
  // ... rest of blog card styles ...
}
```

---

## Step 4: Validate Your Work (2 min)

### 4.1 Validate HTML

```bash
# Run validation script
./.github/skills/html-template-agent/scripts/validate-html.sh my-page.html
```

**Expected Output**:
```
✅ Semantic HTML validated
✅ Accessibility checks passed
```

### 4.2 Test SCSS Compilation

```bash
# Test SCSS compiles without errors
npm run test:scss
```

### 4.3 Manual Checks

Open your page in a browser and test:

- [ ] **Tab key** - Skip link appears and works
- [ ] **Tab through page** - Focus indicators visible on all elements
- [ ] **Resize window** - Components adapt responsively
- [ ] **Mobile view** (DevTools) - Touch targets ≥ 44px
- [ ] **Keyboard only** - Can navigate and interact with everything

---

## 🎯 Common Patterns Cheat Sheet

### Card Component
```scss
.my-card {
  @include genesis-entity('primary');  // Glassmorphism
  
  .card-title { @include genesis-cognition('axiom'); }
  .card-text { @include genesis-cognition('discourse'); }
  .card-link { @include genesis-synapse('navigate'); }
}
```

### Hero Section
```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');  // Full height
  
  .hero-title { @include genesis-cognition('axiom'); }
  .hero-cta { @include genesis-synapse('execute'); }
}
```

### Form
```scss
.contact-form {
  @include genesis-environment('interaction-form');
  
  .form-label { @include genesis-cognition('motive'); }
  .form-input { @include genesis-synapse('input-primary'); }
  .form-submit { @include genesis-synapse('execute'); }
}
```

### Grid Layout
```scss
.product-grid {
  @include genesis-environment('distributed');  // Auto-responsive
  @include genesis-atmosphere('dense-desktop');  // High-density on desktop
}
```

---

## 🐛 Troubleshooting

### HTML validation fails
**Problem**: Missing skip link or main landmark  
**Solution**: Ensure your HTML has:
```html
<a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>
<main id="skip-target" tabindex="-1">
```

### SCSS doesn't compile
**Problem**: Missing ontology import  
**Solution**: Add to top of SCSS file:
```scss
---
---
@import "ontology/index";  // Must be first
```

### Components not responsive
**Problem**: Not using ontological environment mixins  
**Solution**: Use `genesis-environment()` for layouts:
```scss
.my-grid {
  @include genesis-environment('distributed');
}
```

### Touch targets too small
**Problem**: Using custom button sizes  
**Solution**: Use ontological synapse mixins:
```scss
.my-button {
  @include genesis-synapse('execute');  // Handles touch targets
}
```

---

## 📚 Next Steps

### Learn More
1. **Deep Dive**: Read `docs/ENHANCED-SHOWCASE-GUIDE.md`
2. **Visual Reference**: Check `docs/VISUAL-SHOWCASE.md`
3. **Ontology Guide**: Study `_sass/ontology/INTEGRATION-GUIDE.md`

### Explore Components
1. Review all 20+ components in showcase
2. Copy patterns that fit your needs
3. Customize with different ontological variants

### Advanced Topics
1. **Futuristic Effects**: Glassmorphism, neon glows, gradients
2. **Custom Animations**: Scroll-triggered reveals
3. **Responsive Patterns**: Container queries, fluid typography
4. **Accessibility**: ARIA patterns, keyboard navigation

---

## 🎓 Quick Reference

### Six Ontological Categories

1. **Environment** (Layout): `distributed`, `focused`, `associative`, `manifest`
2. **Entity** (Visual): `primary`, `secondary`, `imperative`, `image-adaptive`
3. **Cognition** (Typography): `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum`
4. **Synapse** (Interaction): `navigate`, `execute`, `inquiry`, `destructive`, `input-primary`
5. **State** (Temporal): `stable`, `evolving`, `deprecated`, `scroll-triggered`
6. **Atmosphere** (Sensory): `neutral`, `ethereal`, `void`, `vibrant`, `viewport-aware`, `spacious-mobile`, `dense-desktop`

### Essential Tools

```bash
# Validate HTML
./.github/skills/html-template-agent/scripts/validate-html.sh FILE

# Test SCSS
npm run test:scss

# Lint SCSS
npm run lint:scss

# Run all checks
npm test
```

---

## ✅ Success Checklist

After completing this quick start, you should have:

- [ ] Viewed the enhanced showcase page
- [ ] Copied a component pattern
- [ ] Created your own HTML page with skip link and main landmark
- [ ] Created matching SCSS file with ontological mixins
- [ ] Validated HTML (PASSED)
- [ ] Tested SCSS compilation (SUCCESS)
- [ ] Verified responsive behavior
- [ ] Checked keyboard navigation

**Congratulations!** You're now ready to build accessible, semantic web pages with the Genesis Design System! 🎉

---

## 💡 Pro Tips

1. **Start Simple**: Begin with one component, then add more
2. **Copy-Paste**: Use showcase components as templates
3. **Validate Early**: Run validation after each change
4. **Test Responsive**: Check mobile, tablet, desktop views
5. **Check Accessibility**: Always test with keyboard navigation
6. **Read Comments**: SCSS has helpful inline documentation
7. **Ask Questions**: Refer to comprehensive guides when stuck

---

**Time Spent**: 5-10 minutes  
**Components Learned**: 1+ components  
**Skills Acquired**: Ontological SCSS, semantic HTML, accessibility  
**Ready For**: Building production pages! 🚀

---

**Quick Start Version**: 1.0.0  
**Last Updated**: 2026-01-29  
**For**: Enhanced Component Showcase
