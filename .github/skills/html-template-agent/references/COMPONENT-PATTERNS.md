# HTML Component Patterns Catalog

**Version**: 2.1.0  
**For**: html-template-agent skill  
**Purpose**: Ready-to-use semantic HTML patterns for common web components

---

## Table of Contents

1. [Navigation Patterns](#navigation-patterns)
2. [Hero Sections](#hero-sections)
3. [Card Components](#card-components)
4. [Form Patterns](#form-patterns)
5. [Modal Dialogs](#modal-dialogs)
6. [Data Display](#data-display)
7. [Interactive Elements](#interactive-elements)
8. [Content Sections](#content-sections)

---

## Navigation Patterns

### Primary Site Navigation

**Semantic HTML with ARIA and accessibility features:**

```html
<header class="site-header" role="banner">
  <div class="site-header__container">
    <!-- Logo/Brand -->
    <a href="/" class="site-brand" aria-label="ASI Saga Home">
      <img src="/logo.svg" alt="ASI Saga" class="site-brand__logo">
    </a>
    
    <!-- Mobile Menu Toggle -->
    <button 
      class="nav-toggle" 
      aria-expanded="false" 
      aria-controls="primary-navigation"
      aria-label="Toggle navigation menu"
    >
      <span class="nav-toggle__icon"></span>
    </button>
    
    <!-- Primary Navigation -->
    <nav 
      id="primary-navigation" 
      class="primary-nav" 
      aria-label="Primary"
    >
      <ul class="primary-nav__list">
        <li class="primary-nav__item">
          <a href="/about" class="primary-nav__link">About</a>
        </li>
        <li class="primary-nav__item">
          <a href="/projects" class="primary-nav__link">Projects</a>
        </li>
        <li class="primary-nav__item primary-nav__item--active">
          <a href="/blog" class="primary-nav__link" aria-current="page">Blog</a>
        </li>
        <li class="primary-nav__item">
          <a href="/contact" class="primary-nav__link">Contact</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

**Corresponding SCSS (Ontology-Based):**
```scss
@import "ontology/index";

.site-header {
  @include genesis-environment('navigation-primary');
  @include genesis-entity('primary');
  
  .site-brand {
    @include genesis-synapse('navigate');
  }
  
  .nav-toggle {
    @include genesis-synapse('execute');
  }
  
  .primary-nav__link {
    @include genesis-synapse('navigate');
    
    &[aria-current="page"] {
      @include genesis-state('stable');
    }
  }
}
```

### Breadcrumb Navigation

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">Home</a>
    </li>
    <li class="breadcrumb__item">
      <a href="/blog" class="breadcrumb__link">Blog</a>
    </li>
    <li class="breadcrumb__item" aria-current="page">
      <span class="breadcrumb__current">Current Article</span>
    </li>
  </ol>
</nav>
```

### Tab Navigation

```html
<div class="tabs" role="tablist">
  <button 
    class="tabs__tab" 
    role="tab" 
    aria-selected="true" 
    aria-controls="panel-overview"
    id="tab-overview"
  >
    Overview
  </button>
  <button 
    class="tabs__tab" 
    role="tab" 
    aria-selected="false" 
    aria-controls="panel-details"
    id="tab-details"
  >
    Details
  </button>
  <button 
    class="tabs__tab" 
    role="tab" 
    aria-selected="false" 
    aria-controls="panel-specs"
    id="tab-specs"
  >
    Specifications
  </button>
</div>

<div 
  class="tabs__panel" 
  role="tabpanel" 
  id="panel-overview" 
  aria-labelledby="tab-overview"
>
  <h2>Overview</h2>
  <p>Content for overview...</p>
</div>

<div 
  class="tabs__panel" 
  role="tabpanel" 
  id="panel-details" 
  aria-labelledby="tab-details" 
  hidden
>
  <h2>Details</h2>
  <p>Content for details...</p>
</div>
```

---

## Hero Sections

### Full-Width Hero with CTA

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__content">
    <h1 id="hero-title" class="hero__title">
      Build the Future with AI
    </h1>
    <p class="hero__subtitle">
      Genesis Semantic Design System - A Living Ontological Architecture
    </p>
    <div class="hero__actions">
      <a href="/get-started" class="hero__cta-primary">
        Get Started
      </a>
      <a href="/learn-more" class="hero__cta-secondary">
        Learn More
      </a>
    </div>
  </div>
  
  <div class="hero__visual" aria-hidden="true">
    <!-- Background effects, no semantic content -->
  </div>
</section>
```

**Corresponding SCSS:**
```scss
.hero {
  @include genesis-environment('focused');
  @include genesis-atmosphere('viewport-aware');
  @include genesis-atmosphere('vibrant');
  
  .hero__title {
    @include genesis-cognition('axiom');
  }
  
  .hero__subtitle {
    @include genesis-cognition('discourse');
  }
  
  .hero__cta-primary {
    @include genesis-synapse('execute');
  }
  
  .hero__cta-secondary {
    @include genesis-synapse('inquiry');
  }
}
```

### Split Hero (Content + Image)

```html
<section class="split-hero">
  <div class="split-hero__content">
    <h1 class="split-hero__title">Transforming Ideas into Reality</h1>
    <p class="split-hero__description">
      Discover how our semantic design system empowers developers to create 
      accessible, beautiful, and performant web experiences.
    </p>
    <a href="/demo" class="split-hero__cta">View Demo</a>
  </div>
  
  <div class="split-hero__media">
    <img 
      src="/images/hero-visual.jpg" 
      alt="Genesis Design System interface demonstration" 
      class="split-hero__image"
    >
  </div>
</section>
```

---

## Card Components

### Blog Post Card

```html
<article class="blog-card">
  <a href="/blog/semantic-html" class="blog-card__link">
    <!-- Image -->
    <div class="blog-card__image-wrapper">
      <img 
        src="/images/semantic-html.jpg" 
        alt="Semantic HTML illustration" 
        class="blog-card__image"
        loading="lazy"
      >
    </div>
    
    <!-- Content -->
    <div class="blog-card__content">
      <!-- Metadata -->
      <div class="blog-card__meta">
        <time datetime="2026-01-29" class="blog-card__date">
          January 29, 2026
        </time>
        <span class="blog-card__category">Web Design</span>
      </div>
      
      <!-- Title -->
      <h3 class="blog-card__title">
        The Power of Semantic HTML in Modern Web Development
      </h3>
      
      <!-- Excerpt -->
      <p class="blog-card__excerpt">
        Learn why semantic HTML is the foundation of accessible, 
        SEO-friendly websites and how it integrates with ontological design systems.
      </p>
      
      <!-- Author -->
      <div class="blog-card__author">
        <img 
          src="/images/author.jpg" 
          alt="" 
          class="blog-card__author-avatar"
        >
        <span class="blog-card__author-name">Jane Smith</span>
      </div>
    </div>
  </a>
</article>
```

**Corresponding SCSS:**
```scss
.blog-card {
  @include genesis-entity('primary');
  
  .blog-card__image {
    @include genesis-entity('image-adaptive');
  }
  
  .blog-card__meta {
    @include genesis-cognition('gloss');
  }
  
  .blog-card__title {
    @include genesis-cognition('axiom');
  }
  
  .blog-card__excerpt {
    @include genesis-cognition('discourse');
  }
  
  .blog-card__link {
    @include genesis-synapse('navigate');
  }
}
```

### Feature Card with Icon

```html
<article class="feature-card">
  <div class="feature-card__icon" aria-hidden="true">
    <svg class="feature-card__icon-svg"><!-- Icon SVG --></svg>
  </div>
  
  <h3 class="feature-card__title">Accessibility First</h3>
  
  <p class="feature-card__description">
    Built with WCAG 2.2 AA compliance from the ground up, ensuring 
    your content is accessible to everyone.
  </p>
  
  <a href="/features/accessibility" class="feature-card__link">
    Learn more <span aria-hidden="true">→</span>
  </a>
</article>
```

### Product Card with Actions

```html
<article class="product-card">
  <div class="product-card__image-wrapper">
    <img 
      src="/products/item.jpg" 
      alt="Product name - Brief description" 
      class="product-card__image"
    >
    <span class="product-card__badge">New</span>
  </div>
  
  <div class="product-card__content">
    <h3 class="product-card__title">Product Name</h3>
    
    <div class="product-card__rating" aria-label="4.5 out of 5 stars">
      <span class="product-card__stars" aria-hidden="true">★★★★½</span>
      <span class="product-card__rating-count">(127 reviews)</span>
    </div>
    
    <p class="product-card__price">
      <span class="product-card__price-current">$49.99</span>
      <span class="product-card__price-original">$79.99</span>
    </p>
    
    <button class="product-card__add-to-cart">
      Add to Cart
    </button>
  </div>
</article>
```

---

## Form Patterns

### Contact Form (Accessible)

```html
<form class="contact-form" method="post" action="/contact">
  <!-- Name Field -->
  <div class="contact-form__field">
    <label for="contact-name" class="contact-form__label">
      Name <span class="required" aria-label="required">*</span>
    </label>
    <input 
      type="text" 
      id="contact-name" 
      name="name" 
      class="contact-form__input"
      required
      aria-required="true"
    >
  </div>
  
  <!-- Email Field -->
  <div class="contact-form__field">
    <label for="contact-email" class="contact-form__label">
      Email <span class="required" aria-label="required">*</span>
    </label>
    <input 
      type="email" 
      id="contact-email" 
      name="email" 
      class="contact-form__input"
      required
      aria-required="true"
      aria-describedby="email-hint"
    >
    <span id="email-hint" class="contact-form__hint">
      We'll never share your email with anyone else.
    </span>
  </div>
  
  <!-- Subject Field -->
  <div class="contact-form__field">
    <label for="contact-subject" class="contact-form__label">
      Subject
    </label>
    <select 
      id="contact-subject" 
      name="subject" 
      class="contact-form__select"
    >
      <option value="">Choose a topic...</option>
      <option value="general">General Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="feedback">Feedback</option>
    </select>
  </div>
  
  <!-- Message Field -->
  <div class="contact-form__field">
    <label for="contact-message" class="contact-form__label">
      Message <span class="required" aria-label="required">*</span>
    </label>
    <textarea 
      id="contact-message" 
      name="message" 
      class="contact-form__textarea"
      rows="5"
      required
      aria-required="true"
    ></textarea>
  </div>
  
  <!-- Checkbox -->
  <div class="contact-form__field contact-form__field--checkbox">
    <input 
      type="checkbox" 
      id="contact-newsletter" 
      name="newsletter" 
      class="contact-form__checkbox"
    >
    <label for="contact-newsletter" class="contact-form__checkbox-label">
      Subscribe to our newsletter
    </label>
  </div>
  
  <!-- Submit Actions -->
  <div class="contact-form__actions">
    <button type="submit" class="contact-form__submit">
      Send Message
    </button>
    <button type="reset" class="contact-form__reset">
      Clear Form
    </button>
  </div>
</form>
```

**Corresponding SCSS:**
```scss
.contact-form {
  @include genesis-environment('interaction-form');
  
  .contact-form__label {
    @include genesis-cognition('motive');
  }
  
  .contact-form__input,
  .contact-form__select,
  .contact-form__textarea {
    @include genesis-synapse('input-primary');
  }
  
  .contact-form__hint {
    @include genesis-cognition('gloss');
  }
  
  .contact-form__submit {
    @include genesis-synapse('execute');
  }
  
  .contact-form__reset {
    @include genesis-synapse('destructive');
  }
}
```

### Search Form

```html
<form class="search-form" role="search" method="get" action="/search">
  <label for="search-input" class="search-form__label">
    Search the site
  </label>
  <div class="search-form__input-group">
    <input 
      type="search" 
      id="search-input" 
      name="q" 
      class="search-form__input"
      placeholder="Enter keywords..."
      aria-label="Search query"
    >
    <button type="submit" class="search-form__button">
      <span class="sr-only">Submit search</span>
      <svg aria-hidden="true"><!-- Search icon --></svg>
    </button>
  </div>
</form>
```

---

## Modal Dialogs

### Accessible Modal Pattern

```html
<!-- Modal Trigger -->
<button 
  class="modal-trigger" 
  data-modal-target="example-modal"
  aria-haspopup="dialog"
>
  Open Modal
</button>

<!-- Modal Structure -->
<div 
  class="modal" 
  id="example-modal" 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title"
  hidden
>
  <!-- Backdrop -->
  <div class="modal__backdrop" data-dismiss="modal"></div>
  
  <!-- Dialog -->
  <div class="modal__dialog">
    <!-- Header -->
    <header class="modal__header">
      <h2 id="modal-title" class="modal__title">
        Modal Title
      </h2>
      <button 
        class="modal__close" 
        data-dismiss="modal"
        aria-label="Close dialog"
      >
        <span aria-hidden="true">×</span>
      </button>
    </header>
    
    <!-- Body -->
    <div class="modal__body">
      <p>Modal content goes here...</p>
    </div>
    
    <!-- Footer (Optional) -->
    <footer class="modal__footer">
      <button class="modal__action-primary">
        Confirm
      </button>
      <button class="modal__action-secondary" data-dismiss="modal">
        Cancel
      </button>
    </footer>
  </div>
</div>
```

**Corresponding SCSS:**
```scss
.modal {
  @include genesis-entity('primary');
  @include genesis-state('stable');
  
  .modal__backdrop {
    @include genesis-atmosphere('void');
  }
  
  .modal__title {
    @include genesis-cognition('axiom');
  }
  
  .modal__body {
    @include genesis-cognition('discourse');
  }
  
  .modal__action-primary {
    @include genesis-synapse('execute');
  }
  
  .modal__action-secondary {
    @include genesis-synapse('inquiry');
  }
  
  .modal__close {
    @include genesis-synapse('destructive');
  }
}
```

---

## Data Display

### Data Table (Accessible)

```html
<table class="data-table">
  <caption class="data-table__caption">
    Project Status Overview - Q1 2026
  </caption>
  
  <thead class="data-table__head">
    <tr>
      <th scope="col" class="data-table__header">Project Name</th>
      <th scope="col" class="data-table__header">Status</th>
      <th scope="col" class="data-table__header">Progress</th>
      <th scope="col" class="data-table__header">Due Date</th>
      <th scope="col" class="data-table__header">Actions</th>
    </tr>
  </thead>
  
  <tbody class="data-table__body">
    <tr class="data-table__row">
      <th scope="row" class="data-table__cell data-table__cell--header">
        Genesis v2.1
      </th>
      <td class="data-table__cell">
        <span class="status-badge status-badge--active">Active</span>
      </td>
      <td class="data-table__cell">
        <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar__fill" style="width: 75%">
            <span class="sr-only">75% complete</span>
          </div>
        </div>
      </td>
      <td class="data-table__cell">
        <time datetime="2026-02-15">Feb 15, 2026</time>
      </td>
      <td class="data-table__cell">
        <a href="/projects/genesis/edit" class="action-link">Edit</a>
      </td>
    </tr>
    
    <!-- More rows... -->
  </tbody>
</table>
```

### Definition List (Metadata)

```html
<dl class="metadata">
  <div class="metadata__item">
    <dt class="metadata__term">Author</dt>
    <dd class="metadata__definition">Jane Smith</dd>
  </div>
  
  <div class="metadata__item">
    <dt class="metadata__term">Published</dt>
    <dd class="metadata__definition">
      <time datetime="2026-01-29">January 29, 2026</time>
    </dd>
  </div>
  
  <div class="metadata__item">
    <dt class="metadata__term">Category</dt>
    <dd class="metadata__definition">Web Design</dd>
  </div>
  
  <div class="metadata__item">
    <dt class="metadata__term">Tags</dt>
    <dd class="metadata__definition">
      <ul class="tag-list">
        <li><a href="/tags/html" class="tag">HTML</a></li>
        <li><a href="/tags/accessibility" class="tag">Accessibility</a></li>
        <li><a href="/tags/ontology" class="tag">Ontology</a></li>
      </ul>
    </dd>
  </div>
</dl>
```

---

## Interactive Elements

### Accordion

```html
<div class="accordion">
  <!-- Item 1 -->
  <div class="accordion__item">
    <h3 class="accordion__header">
      <button 
        class="accordion__trigger" 
        aria-expanded="true" 
        aria-controls="accordion-panel-1"
        id="accordion-trigger-1"
      >
        What is the Genesis Semantic Design System?
        <span class="accordion__icon" aria-hidden="true"></span>
      </button>
    </h3>
    <div 
      class="accordion__panel" 
      id="accordion-panel-1" 
      role="region" 
      aria-labelledby="accordion-trigger-1"
    >
      <div class="accordion__content">
        <p>
          The Genesis Semantic Design System is a living ontological architecture 
          that separates content semantics from visual presentation...
        </p>
      </div>
    </div>
  </div>
  
  <!-- Item 2 -->
  <div class="accordion__item">
    <h3 class="accordion__header">
      <button 
        class="accordion__trigger" 
        aria-expanded="false" 
        aria-controls="accordion-panel-2"
        id="accordion-trigger-2"
      >
        How do I get started?
        <span class="accordion__icon" aria-hidden="true"></span>
      </button>
    </h3>
    <div 
      class="accordion__panel" 
      id="accordion-panel-2" 
      role="region" 
      aria-labelledby="accordion-trigger-2"
      hidden
    >
      <div class="accordion__content">
        <p>Getting started is easy...</p>
      </div>
    </div>
  </div>
</div>
```

### Alert Notifications

```html
<!-- Success Alert -->
<div class="alert alert--success" role="alert">
  <div class="alert__icon" aria-hidden="true">✓</div>
  <div class="alert__content">
    <h4 class="alert__title">Success!</h4>
    <p class="alert__message">Your changes have been saved successfully.</p>
  </div>
  <button class="alert__dismiss" aria-label="Dismiss alert">
    <span aria-hidden="true">×</span>
  </button>
</div>

<!-- Error Alert -->
<div class="alert alert--error" role="alert" aria-live="assertive">
  <div class="alert__icon" aria-hidden="true">⚠</div>
  <div class="alert__content">
    <h4 class="alert__title">Error</h4>
    <p class="alert__message">Please correct the errors before submitting.</p>
  </div>
</div>

<!-- Info Alert -->
<div class="alert alert--info" role="status">
  <div class="alert__icon" aria-hidden="true">ℹ</div>
  <div class="alert__content">
    <p class="alert__message">This feature is currently in beta.</p>
  </div>
</div>
```

**Corresponding SCSS:**
```scss
.alert {
  @include genesis-entity('primary');
  
  &--success {
    @include genesis-state('stable');
  }
  
  &--error {
    @include genesis-entity('imperative');
  }
  
  &--info {
    @include genesis-entity('secondary');
  }
  
  .alert__title {
    @include genesis-cognition('motive');
  }
  
  .alert__message {
    @include genesis-cognition('discourse');
  }
  
  .alert__dismiss {
    @include genesis-synapse('destructive');
  }
}
```

---

## Content Sections

### Testimonial

```html
<article class="testimonial">
  <blockquote class="testimonial__quote">
    <p class="testimonial__text">
      "The Genesis Design System transformed how we build accessible web experiences. 
      The ontological approach makes our code more maintainable and semantic."
    </p>
  </blockquote>
  
  <footer class="testimonial__footer">
    <img 
      src="/images/testimonials/john-doe.jpg" 
      alt="" 
      class="testimonial__avatar"
    >
    <div class="testimonial__author">
      <cite class="testimonial__name">John Doe</cite>
      <p class="testimonial__title">Lead Developer, TechCorp</p>
    </div>
  </footer>
</article>
```

### FAQ Item

```html
<article class="faq-item" itemscope itemtype="https://schema.org/Question">
  <h3 class="faq-item__question" itemprop="name">
    How does the ontological system work?
  </h3>
  
  <div class="faq-item__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <div itemprop="text">
      <p>
        The ontological system uses a three-tier architecture to separate 
        content semantics from visual presentation...
      </p>
    </div>
  </div>
</article>
```

### Call-to-Action Section

```html
<section class="cta-section" aria-labelledby="cta-title">
  <div class="cta-section__content">
    <h2 id="cta-title" class="cta-section__title">
      Ready to Get Started?
    </h2>
    <p class="cta-section__description">
      Join thousands of developers building accessible, beautiful web experiences 
      with the Genesis Semantic Design System.
    </p>
    <div class="cta-section__actions">
      <a href="/get-started" class="cta-section__button-primary">
        Start Building Now
      </a>
      <a href="/documentation" class="cta-section__button-secondary">
        View Documentation
      </a>
    </div>
  </div>
</section>
```

---

## Usage Guidelines

### When to Use Each Pattern

**Navigation Patterns**: Use for site-wide navigation, section navigation, or content organization.

**Hero Sections**: Use for landing pages, feature announcements, or product showcases.

**Card Components**: Use for blog posts, products, features, or any grid-based content display.

**Form Patterns**: Use for user input, search, contact forms, or data collection.

**Modal Dialogs**: Use for confirmations, alerts, or secondary content that requires focus.

**Data Display**: Use for structured information, tables, or metadata presentation.

**Interactive Elements**: Use for progressive disclosure, notifications, or dynamic content.

**Content Sections**: Use for testimonials, FAQs, or promotional content.

### Accessibility Checklist

For each component, ensure:

- [ ] Proper ARIA roles and attributes
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Semantic HTML elements used
- [ ] Alternative text for images
- [ ] Form labels properly associated
- [ ] Error messages accessible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Touch targets ≥ 44x44px
- [ ] Screen reader announcements appropriate

### Ontological Mapping

All HTML patterns should map to ontological SCSS mixins:

1. **Identify semantic role** - What IS this content?
2. **Choose ontological category** - Environment, Entity, Cognition, Synapse, State, Atmosphere
3. **Select appropriate variant** - Based on semantic meaning
4. **Apply mixin in SCSS** - Never use raw CSS properties

See [html-template-agent/SKILL.md](../SKILL.md) for complete ontological integration guide.

---

## Resources

- **Skill**: [html-template-agent/SKILL.md](../SKILL.md)
- **Template Guide**: [TEMPLATE-GUIDE.md](TEMPLATE-GUIDE.md)
- **Ontology Reference**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Instructions**: `.github/instructions/html.instructions.md`
- **WCAG Guidelines**: [W3C WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- **ARIA Practices**: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

**Version**: 2.1.0  
**Last Updated**: 2026-01-29  
**Maintained by**: html-template-agent skill
