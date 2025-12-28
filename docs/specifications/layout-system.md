# Layout System Specification

## Overview

The ASI Saga theme uses a hierarchical layout system built on Jekyll's layout inheritance. This specification documents the complete layout taxonomy, grid governance, and implementation patterns.

## Layout Hierarchy

```
default.html (Root)
├── Base Templates
│   ├── scrollable.html
│   │   ├── post.html
│   │   ├── article.html
│   │   ├── archive.html
│   │   ├── profile.html
│   │   ├── landing.html
│   │   ├── gallery.html
│   │   ├── form.html
│   │   ├── docs.html
│   │   └── faq.html
│   ├── fixed-height.html
│   │   ├── dashboard.html
│   │   ├── chatroom.html
│   │   ├── search.html
│   │   └── settings.html
│   └── minimal-base.html
│       ├── minimal.html
│       └── splash.html
└── app.html (Standalone)
```

## Root Layout

### default.html

**Purpose**: Root contract for all pages providing global scaffolding.

**Structure**:
```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en-US' }}">
  {% include head.html %}
  
  <body class="layout-container">
    <a href="#skip-target" class="skip-link">Skip to main content</a>
    
    <div class="page-layout">
      <div class="header-wrapper">
        {% include header.html %}
      </div>
      
      <main class="site-main" id="skip-target" tabindex="-1" role="main">
        <div class="content-wrapper">
          {{ content }}
        </div>
      </main>
      
      <div class="footer-wrapper">
        {% include footer.html %}
      </div>
    </div>
  </body>
</html>
```

**Provides**:
- HTML document structure
- Global `<head>` with meta tags, CSS, JS
- Site header and footer
- Main content container
- Skip-to-content link
- Accessibility landmarks

**Grid**: Container in content-wrapper (optional, depends on child layout)

**SCSS**: `_sass/layouts/_default.scss`

## Base Templates

### scrollable.html

**Purpose**: Standard vertical flow pages where content grows and the page scrolls naturally.

**Inherits**: `default.html`

**Structure**:
```liquid
---
layout: default
---

<div class="scrollable-layout">
  {{ content }}
</div>
```

**Behavior**:
- Page scrolls with content
- Natural document flow
- Flexible height

**Container**: `.container` or `.container-fluid` (depends on child layout)

**Use Cases**: Blog posts, articles, landing pages, documentation

**SCSS**: `_sass/layouts/_scrollable.scss`

```scss
.scrollable-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

### fixed-height.html

**Purpose**: Application-style layouts where the viewport height is constrained.

**Inherits**: `default.html`

**Structure**:
```liquid
---
layout: default
---

<div class="fixed-height-layout">
  {{ content }}
</div>
```

**Behavior**:
- Viewport height constraint
- Header/footer pinned
- Central panel scrollable (`overflow-y: auto`)
- No page scroll (content scrolls within container)

**Container**: `.container-fluid` with flexbox or grid

**Use Cases**: Dashboards, chatrooms, settings panels, search interfaces

**SCSS**: `_sass/layouts/_fixed-height.scss`

```scss
.fixed-height-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
```

### minimal-base.html

**Purpose**: Utility or lightweight pages with minimal chrome.

**Inherits**: `default.html`

**Structure**:
```liquid
---
layout: default
---

<div class="minimal-layout">
  {{ content }}
</div>
```

**Behavior**:
- Minimal includes
- Centered content
- No enforced grid

**Container**: `.container`

**Use Cases**: 404 pages, splash screens, maintenance pages

**SCSS**: `_sass/layouts/_minimal-base.scss`

```scss
.minimal-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
```

## Specialized Layouts

### Content-Driven Layouts

#### post.html

**Purpose**: Blog posts and news entries.

**Inherits**: `scrollable.html`

**Features**:
- Post metadata (date, author, tags)
- Post navigation (previous/next)
- Comment section support
- Share buttons

**Structure**:
```liquid
---
layout: scrollable
---

<article class="post">
  <header class="post__header">
    <h1>{{ page.title }}</h1>
    {% include layouts/post/post-meta.html %}
  </header>
  
  <div class="post__content">
    {{ content }}
  </div>
  
  <footer class="post__footer">
    {% include layouts/post/post-navigation.html %}
  </footer>
</article>
```

**SCSS**: `_sass/layouts/_post.scss`

**Sample**: `_samples/content-driven/sample-post.md`

#### article.html

**Purpose**: Long-form editorial or knowledge articles.

**Inherits**: `scrollable.html`

**Features**:
- Table of contents
- Reading time estimate
- Author bio
- Related articles

**Differences from post.html**:
- More formal typography
- Wider content area
- Enhanced readability features

**SCSS**: `_sass/layouts/_article.scss`

#### archive.html

**Purpose**: Index pages listing posts, projects, or resources.

**Inherits**: `scrollable.html`

**Features**:
- Grid/list view toggle
- Filtering and sorting
- Pagination
- Category/tag filters

**Structure**:
```liquid
---
layout: scrollable
---

<div class="archive">
  <header class="archive__header">
    <h1>{{ page.title }}</h1>
  </header>
  
  <div class="archive__grid">
    {% for post in site.posts %}
      {% include layouts/archive/archive-item.html post=post %}
    {% endfor %}
  </div>
</div>
```

**SCSS**: `_sass/layouts/_archive.scss`

#### profile.html

**Purpose**: Author or team member profile pages.

**Inherits**: `scrollable.html`

**Features**:
- Profile photo
- Bio and credentials
- Social links
- Recent contributions

**SCSS**: `_sass/layouts/_profile.scss`

### Marketing Layouts

#### landing.html

**Purpose**: Campaign or marketing landing pages.

**Inherits**: `scrollable.html`

**Features**:
- Hero section
- Feature highlights
- Call-to-action sections
- Social proof (testimonials, logos)
- Lead capture forms

**Structure**:
```liquid
---
layout: scrollable
---

<div class="landing">
  {% include transcendent-hero.html 
     title=page.hero_title
     subtitle=page.hero_subtitle
  %}
  
  {% include layouts/landing/landing-features.html %}
  
  {% include cta.html 
     title="Ready to Begin?"
     button_text="Get Started"
  %}
</div>
```

**SCSS**: `_sass/layouts/_landing.scss`

**Sample**: `_samples/marketing/sample-landing.html`

#### gallery.html

**Purpose**: Image or media gallery pages.

**Inherits**: `scrollable.html`

**Features**:
- Responsive grid layout
- Lightbox support
- Image captions
- Filtering

**SCSS**: `_sass/layouts/_gallery.scss`

#### form.html

**Purpose**: Contact, signup, or feedback forms.

**Inherits**: `scrollable.html`

**Features**:
- Form validation
- Multi-step forms support
- Success/error messaging
- Accessible form controls

**SCSS**: `_sass/layouts/_form.scss`

### Knowledge Layouts

#### docs.html

**Purpose**: Documentation or knowledge base pages.

**Inherits**: `scrollable.html`

**Features**:
- Sidebar navigation
- Table of contents
- Code syntax highlighting
- Search integration
- Breadcrumbs

**Structure**:
```liquid
---
layout: scrollable
---

<div class="docs-layout">
  <aside class="docs-sidebar">
    <!-- Navigation -->
  </aside>
  
  <main class="docs-content">
    <div class="docs-toc">
      <!-- Table of contents -->
    </div>
    
    <article>
      {{ content }}
    </article>
  </main>
</div>
```

**SCSS**: `_sass/layouts/_docs.scss`

**Sample**: `_samples/knowledge/sample-docs.html`

#### faq.html

**Purpose**: Frequently asked questions.

**Inherits**: `scrollable.html`

**Features**:
- Accordion-style Q&A
- Search/filter
- Category organization

**Structure**:
```liquid
---
layout: scrollable
---

<div class="faq">
  <header class="faq__header">
    <h1>{{ page.title }}</h1>
  </header>
  
  <div class="faq__list">
    {% for item in page.faqs %}
      {% include layouts/faq/faq-item.html item=item %}
    {% endfor %}
  </div>
</div>
```

**SCSS**: `_sass/layouts/_faq.scss`

### Application Layouts

#### dashboard.html

**Purpose**: Data-heavy or app-like pages.

**Inherits**: `fixed-height.html`

**Features**:
- Widget grid
- Real-time data
- Customizable layout
- Responsive cards

**Structure**:
```liquid
---
layout: fixed-height
---

<div class="dashboard">
  <div class="dashboard__header">
    <h1>{{ page.title }}</h1>
  </div>
  
  <div class="dashboard__grid">
    {% for widget in page.widgets %}
      {% include layouts/dashboard/dashboard-widget.html widget=widget %}
    {% endfor %}
  </div>
</div>
```

**SCSS**: `_sass/layouts/_dashboard.scss`

**Sample**: `_samples/application/sample-dashboard.html`

#### chatroom.html

**Purpose**: Real-time or threaded conversation pages.

**Inherits**: `fixed-height.html`

**Features**:
- Fixed header
- Scrollable message area
- Sticky input at bottom
- Message threading
- Emoji support

**Structure**:
```liquid
---
layout: fixed-height
---

<div class="chatroom">
  {% include chatroom/header.html %}
  {% include chatroom/messages.html %}
  {% include chatroom/input.html %}
</div>
```

**SCSS**: `_sass/layouts/_chatroom.scss`

**JavaScript**: `assets/js/chatroom-app.js`

#### search.html

**Purpose**: Search results with filters.

**Inherits**: `fixed-height.html`

**Features**:
- Search input
- Filter sidebar
- Results list
- Pagination
- No results state

**SCSS**: `_sass/layouts/_search.scss`

#### settings.html

**Purpose**: User or admin settings pages.

**Inherits**: `fixed-height.html`

**Features**:
- Tab navigation
- Form sections
- Save/cancel actions
- Validation

**SCSS**: `_sass/layouts/_settings.scss`

### Utility Layouts

#### minimal.html

**Purpose**: Error, maintenance, or legal pages.

**Inherits**: `minimal-base.html`

**Features**:
- Centered content
- Simple messaging
- Minimal navigation

**SCSS**: `_sass/layouts/_minimal.scss`

**Sample**: `_samples/utility/404.html`

#### splash.html

**Purpose**: Intro, coming soon, or lightweight splash pages.

**Inherits**: `minimal-base.html`

**Features**:
- Full-screen design
- Countdown timer
- Email capture
- Social links
- Animated background

**Structure**:
```liquid
---
layout: minimal-base
---

<div class="splash">
  <div class="splash__content">
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
    
    {% if page.countdown_date %}
      {% include layouts/splash/splash-countdown.html date=page.countdown_date %}
    {% endif %}
    
    {% include cta.html 
       button_text="Notify Me"
       button_url="#signup"
    %}
  </div>
</div>
```

**SCSS**: `_sass/layouts/_splash.scss`

**Sample**: `_samples/utility/coming-soon.html`

## Grid Governance

### Container Placement

**MANDATORY RULE**: Containers in layouts only.

```liquid
<!-- ✅ GOOD: Container in layout -->
---
layout: default
---

<div class="container">
  {{ content }}
</div>

<!-- ❌ BAD: Container in content -->
<!-- In page content: -->
<div class="container">  <!-- Don't do this -->
  <p>Content</p>
</div>
```

### Rows and Columns

**Optional**: Use only when grid alignment is required.

**Placement Options**:

1. **In Content** (page-specific layouts):
```markdown
---
layout: post
---

<div class="row">
  <div class="col-md-8">
    Main content
  </div>
  <div class="col-md-4">
    Sidebar
  </div>
</div>
```

2. **In Includes** (reusable grid sections):
```liquid
<!-- _includes/feature-grid.html -->
<div class="row">
  {% for feature in include.features %}
    <div class="col-md-4">
      {{ feature.title }}
    </div>
  {% endfor %}
</div>
```

3. **In Layouts** (universal structure):
```liquid
<!-- Only if grid structure is universal across all pages -->
<div class="row">
  <aside class="col-lg-3">
    {% include sidebar.html %}
  </aside>
  <main class="col-lg-9">
    {{ content }}
  </main>
</div>
```

## Page Selection

Pages select their layout via front matter:

```yaml
---
layout: post
title: "My First Blog Post"
date: 2024-12-25
author: "Genesis Architect"
---

Content goes here...
```

## Layout Best Practices

### 1. Inheritance

Use layout inheritance to reduce duplication:

```liquid
<!-- ✅ GOOD: Inherit from base template -->
---
layout: scrollable
---

<article class="post">
  {{ content }}
</article>

<!-- ❌ BAD: Duplicate scaffolding -->
<!DOCTYPE html>
<html>
  <!-- Entire structure duplicated -->
</html>
```

### 2. Single Content Slot

Each layout should have exactly one `{{ content }}` insertion point:

```liquid
<!-- ✅ GOOD: One content slot -->
<div class="layout">
  {{ content }}
</div>

<!-- ❌ BAD: Multiple content slots -->
<div class="header-content">
  {{ content }}
</div>
<div class="main-content">
  {{ content }}  <!-- Same variable twice doesn't work as expected -->
</div>
```

### 3. Semantic Wrappers

Use semantic class names for layout wrappers:

```liquid
<!-- ✅ GOOD: Semantic class names -->
<div class="post-layout">
  <article class="post">
    {{ content }}
  </article>
</div>

<!-- ❌ BAD: Generic names -->
<div class="wrapper">
  <div class="inner">
    {{ content }}
  </div>
</div>
```

### 4. Conditional Includes

Include optional components based on page front matter:

```liquid
{% if page.show_toc %}
  {% include table-of-contents.html %}
{% endif %}

{% if page.related_posts %}
  {% include related-posts.html posts=page.related_posts %}
{% endif %}
```

## Responsive Layouts

All layouts MUST be responsive:

```scss
.docs-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 250px 1fr;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: 300px 1fr 200px;
  }
}
```

## Layout Testing

When creating or modifying layouts:

1. **Create sample page** in `_samples/`
2. **Test inheritance** - Verify parent layout features work
3. **Test responsive** - All breakpoints (375px, 768px, 1440px)
4. **Test accessibility** - Keyboard nav, screen reader
5. **Test content variations** - Short content, long content, no content
6. **Verify grid** - Container placement, responsive columns

## Layout Checklist

- [ ] Layout file created in `_layouts/`
- [ ] Front matter specifies parent layout
- [ ] SCSS partial created in `_sass/layouts/`
- [ ] SCSS imported in `_common.scss`
- [ ] Single `{{ content }}` insertion point
- [ ] Responsive at all breakpoints
- [ ] Accessibility verified
- [ ] Sample page created in `_samples/`
- [ ] Documented in layout taxonomy
- [ ] Grid rules followed

## Related Documentation

- [Layout Grid Governance](../layout-grid-governance.md) - Container, row, column rules
- [Layout Taxonomy](../layout-taxonomy.md) - Complete hierarchy
- [Layout Implementation Guide](../layout-implementation-guide.md) - Usage examples

## Related Specifications

- [Architecture](./architecture.md)
- [Component Library](./component-library.md)
- [HTML & Liquid](./html-liquid.md)
- [SCSS & Styling](./scss-styling.md)
