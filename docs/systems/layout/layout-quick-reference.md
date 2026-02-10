# Layout Quick Reference

Quick reference guide for choosing and using layouts in this Jekyll theme.

## Layout Selection Guide

| Content Type | Recommended Layout | Use Case |
|-------------|-------------------|----------|
| Blog post | `post` | Regular blog entries, news articles |
| Long article | `article` | In-depth content with table of contents |
| Post listing | `archive` | Blog index, project list, resource directory |
| User profile | `profile` | Team member pages, author bios |
| Product page | `landing` | Marketing campaigns, product launches |
| Photo gallery | `gallery` | Image collections, portfolio showcases |
| Contact form | `form` | Contact pages, signup forms, surveys |
| Documentation | `docs` | Technical docs, user guides, API reference |
| FAQ page | `faq` | Support pages, help centers |
| Analytics | `dashboard` | Admin panels, metrics displays |
| Chat interface | `chatroom` | Discussion threads, support chat |
| Search results | `search` | Site search, filtered results |
| User settings | `settings` | Account configuration, preferences |
| 404 page | `minimal` | Error pages, maintenance notices |
| Coming soon | `splash` | Launch pages, under construction |

## Front Matter Cheat Sheet

### Post Layout
```yaml
---
layout: post
title: "Post Title"
date: 2024-01-15
author: "Author Name"
tags: ["tag1", "tag2"]
categories: ["category"]
share: true
---
```

### Article Layout
```yaml
---
layout: article
title: "Article Title"
subtitle: "Subtitle"
author: "Author"
date: 2024-01-15
reading_time: 10
toc: true
---
```

### Landing Layout
```yaml
---
layout: landing
hero:
  title: "Hero Title"
  subtitle: "Subtitle"
  cta:
    text: "Button Text"
    url: "/link"
---
```

### Docs Layout
```yaml
---
layout: docs
title: "Doc Title"
search: true
breadcrumbs:
  - title: "Home"
    url: "/"
prev:
  title: "Previous"
  url: "/prev"
next:
  title: "Next"
  url: "/next"
---
```

### Dashboard Layout
```yaml
---
layout: dashboard
title: "Dashboard"
actions: ["Export", "Refresh"]
---
```

### Minimal/404 Layout
```yaml
---
layout: minimal
title: "404"
error_code: "404"
description: "Page not found"
show_home_link: true
---
```

## Include Components

### Post Components
```liquid
{% include layouts/post/post-meta.html 
  date=page.date
  author=page.author
  tags=page.tags
%}

{% include layouts/post/post-navigation.html 
  prev=page.prev
  next=page.next
%}
```

### Gallery Components
```liquid
{% include layouts/gallery/gallery-item.html
  thumbnail="/path/to/thumb.jpg"
  full_image="/path/to/full.jpg"
  title="Image Title"
  category="web-design"
%}
```

### Form Components
```liquid
{% include layouts/form/form-field.html
  id="email"
  label="Email Address"
  type="email"
  required=true
%}
```

### Dashboard Components
```liquid
{% include layouts/dashboard/dashboard-widget.html
  title="Total Users"
  value="12,543"
  change=12.5
  icon="fas fa-users"
%}
```

### FAQ Components
```liquid
{% include layouts/faq/faq-item.html
  id="1"
  question="Question text?"
  answer="Answer text"
  parent="faqAccordion"
%}
```

## CSS Classes Reference

### Container Classes
- `.container` - Fixed-width centered container
- `.container-fluid` - Full-width container
- `.scrollable-layout` - Scrollable content wrapper
- `.fixed-height-layout` - Fixed height wrapper

### Typography Classes
- `.display-1` to `.display-6` - Large display headings
- `.h1` to `.h6` - Heading styles
- `.lead` - Lead paragraph
- `.text-muted` - Muted text color

### Layout Classes
- `.row` - Bootstrap grid row
- `.col-*` - Bootstrap grid columns
- `.d-flex` - Flexbox container
- `.justify-content-*` - Flex justify content
- `.align-items-*` - Flex align items

### Component Classes
- `.card` - Card container
- `.badge` - Badge element
- `.btn` - Button
- `.nav` - Navigation list
- `.navbar` - Navigation bar

## Responsive Breakpoints

| Breakpoint | Size | Class Infix |
|-----------|------|-------------|
| Extra small | <576px | (none) |
| Small | ≥576px | `sm` |
| Medium | ≥768px | `md` |
| Large | ≥992px | `lg` |
| Extra large | ≥1200px | `xl` |
| Extra extra large | ≥1400px | `xxl` |

## Color Palette

| Color | Variable | Usage |
|-------|----------|-------|
| Cosmic Deep Blue | `$cosmic-deep-blue` | Primary color |
| Luminous Gold | `$luminous-gold` | Accent/CTA |
| Transcendent White | `$transcendent-white` | Background |
| Ethereal Silver | `$ethereal-silver` | Secondary |
| Emerald Green | `$emerald-green` | Success |
| Royal Purple | `$royal-purple` | Special emphasis |

## Common Patterns

### Hero Section
```html
<section class="hero bg-primary text-white py-5">
  <div class="container">
    <h1 class="display-3">Hero Title</h1>
    <p class="lead">Subtitle text</p>
    <a href="#" class="btn btn-light">Call to Action</a>
  </div>
</section>
```

### Feature Grid
```html
<section class="features py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h3>Feature Title</h3>
            <p>Feature description</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Two-Column Layout
```html
<div class="container">
  <div class="row">
    <div class="col-lg-8">
      Main content
    </div>
    <aside class="col-lg-4">
      Sidebar content
    </aside>
  </div>
</div>
```

## File Locations

- **Layouts**: `_layouts/`
- **Includes**: `_includes/layouts/`
- **Samples**: `_samples/`
- **SCSS**: `_sass/components/`
- **JavaScript**: `assets/js/common/`
- **Documentation**: `docs/`

## Quick Tips

1. **Always specify a layout** in front matter
2. **Use includes** for reusable components
3. **Test responsiveness** on multiple screen sizes
4. **Follow naming conventions** for consistency
5. **Check sample pages** in `_samples/` for examples
6. **Maintain accessibility** with proper ARIA labels
7. **Optimize images** before adding to galleries
8. **Use semantic HTML** for better SEO
9. **Leverage front matter** instead of hardcoding
10. **Keep content separate** from presentation

## Next Steps

- Read the [Layout Implementation Guide](./layout-implementation-guide.md)
- Review [Layout Taxonomy](./layout-taxonomy.md)
- Check [Layout Grid Governance](./layout-grid-governance.md)
- Explore sample pages in `_samples/`
- Customize SCSS variables in `_sass/base/_variables.scss`
