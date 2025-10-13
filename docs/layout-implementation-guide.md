# Layout Implementation Guide

This guide provides comprehensive documentation for all layouts in this Jekyll theme, including usage examples, customization options, and best practices.

## Table of Contents

1. [Overview](#overview)
2. [Base Template Layouts](#base-template-layouts)
3. [Content-Driven Layouts](#content-driven-layouts)
4. [Marketing Layouts](#marketing-layouts)
5. [Knowledge Layouts](#knowledge-layouts)
6. [Application Layouts](#application-layouts)
7. [Utility Layouts](#utility-layouts)
8. [Sample Includes](#sample-includes)
9. [Customization](#customization)

---

## Overview

This theme provides a comprehensive collection of Jekyll layouts organized hierarchically. All layouts inherit from the `default` layout, which provides global scaffolding including the HTML structure, header, footer, and container.

### Layout Hierarchy

```
default
├── Base Templates
│   ├── scrollable (standard vertical flow)
│   │   ├── Content-Driven: post, article, archive, profile
│   │   ├── Marketing: landing, gallery, form
│   │   └── Knowledge: docs, faq
│   ├── fixed-height (app-style constrained height)
│   │   └── Application: dashboard, chatroom, search, settings
│   └── minimal-base (lightweight utility pages)
│       └── Utility: minimal, splash
```

---

## Base Template Layouts

### Scrollable Layout

**Purpose**: Standard vertical flow pages where content grows naturally and the page scrolls.

**File**: `_layouts/scrollable.html`

**Usage**:
```yaml
---
layout: scrollable
---
Your content here
```

**Characteristics**:
- Uses `.container-fluid` for full-width responsiveness
- Page scrolls naturally with content
- Ideal for content-driven pages

### Fixed-Height Layout

**Purpose**: Application-style layouts where viewport height is constrained.

**File**: `_layouts/fixed-height.html`

**Usage**:
```yaml
---
layout: fixed-height
---
Your application content
```

**Characteristics**:
- Uses flexbox for height constraint
- Central panel is scrollable (`overflow-y: auto`)
- Header/footer remain pinned
- Ideal for dashboards and interactive apps

### Minimal-Base Layout

**Purpose**: Utility or lightweight pages with minimal chrome.

**File**: `_layouts/minimal-base.html`

**Usage**:
```yaml
---
layout: minimal-base
---
Minimal content
```

**Characteristics**:
- Uses `.container` for centered content
- No enforced grid structure
- Minimal visual elements
- Ideal for error pages, splash pages

---

## Content-Driven Layouts

### Post Layout

**Purpose**: Blog posts and news entries with article-style formatting.

**File**: `_layouts/post.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15
author: "Author Name"
tags: ["Tag1", "Tag2"]
categories: ["Category1"]
share: true
reading_time: 5
---
```

**Features**:
- Post metadata display (date, author, reading time)
- Tag and category badges
- Social sharing options
- Responsive single-column layout

**Sample Includes**:
- `post-meta.html` - Displays post metadata
- `post-navigation.html` - Previous/next post links

**Example**: See `_samples/content-driven/sample-post.md`

---

### Article Layout

**Purpose**: Long-form editorial or knowledge articles with enhanced readability.

**File**: `_layouts/article.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: article
title: "Article Title"
subtitle: "Article Subtitle"
author: "Author Name"
date: 2024-01-20
reading_time: 15
toc: true
related_articles: true
---
```

**Features**:
- Sidebar table of contents (desktop only)
- Enhanced typography for long-form reading
- Related articles section
- Reading progress indicator (optional)

**Sample Includes**:
- `article-toc.html` - Table of contents component

**Example**: See `_samples/content-driven/sample-article.md`

---

### Archive Layout

**Purpose**: Index pages listing posts, projects, or resources with filtering and sorting.

**File**: `_layouts/archive.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: archive
title: "Blog Archive"
description: "Browse all posts"
show_filters: true
show_sort: true
show_view_toggle: true
show_pagination: true
---
```

**Features**:
- Filter and sort controls
- Grid/list view toggle
- Pagination support
- Item preview cards

**Sample Includes**:
- `archive-item.html` - Single archive item display

**Example**: See `_samples/content-driven/sample-archive.md`

---

### Profile Layout

**Purpose**: Author or team member profile pages with bio and activity.

**File**: `_layouts/profile.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: profile
name: "Full Name"
role: "Job Title"
profile_image: "/path/to/image.jpg"
bio: "Short biography"
social_links:
  - platform: "github"
    url: "https://github.com/username"
  - platform: "linkedin"
    url: "https://linkedin.com/in/username"
stats: true
skills: ["Skill1", "Skill2", "Skill3"]
---
```

**Features**:
- Profile header with photo
- Social links
- Statistics display
- Skills showcase
- Activity/content section

**Sample Includes**:
- `profile-stats.html` - Statistics display component

**Example**: See `_samples/content-driven/sample-profile.md`

---

## Marketing Layouts

### Landing Layout

**Purpose**: Campaign or marketing landing pages with conversion focus.

**File**: `_layouts/landing.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: landing
title: "Landing Page Title"
hero:
  title: "Hero Title"
  subtitle: "Hero Subtitle"
  cta:
    text: "Call to Action"
    url: "/signup"
  image: "/path/to/hero-image.jpg"
final_cta:
  title: "Final CTA Title"
  description: "Closing message"
  text: "Button Text"
  url: "/signup"
---
```

**Features**:
- Hero section with CTA
- Features grid
- Testimonials section
- Final CTA section

**Sample Includes**:
- `landing-features.html` - Feature grid component

**Example**: See `_samples/marketing/sample-landing.md`

---

### Gallery Layout

**Purpose**: Image or media gallery pages with grid display and lightbox.

**File**: `_layouts/gallery.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: gallery
title: "Gallery Title"
description: "Gallery description"
categories:
  - name: "Category Name"
    slug: "category-slug"
---
```

**Features**:
- Responsive grid layout
- Category filtering
- Lightbox support (requires additional JS)
- Image captions

**Sample Includes**:
- `gallery-item.html` - Single gallery item

**Example**: See `_samples/marketing/sample-gallery.md`

---

### Form Layout

**Purpose**: Contact, signup, or feedback forms with validation.

**File**: `_layouts/form.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: form
title: "Contact Us"
description: "Form description"
show_progress: false
steps: ["Step 1", "Step 2", "Step 3"]
help_text: "Help message"
privacy_link: "/privacy"
---
```

**Features**:
- Progress indicator (multi-step forms)
- Form validation
- Responsive field layouts
- Help text and privacy links

**Sample Includes**:
- `form-field.html` - Reusable form field component

**Example**: See `_samples/marketing/sample-form.md`

---

## Knowledge Layouts

### Docs Layout

**Purpose**: Documentation or knowledge base pages with navigation.

**File**: `_layouts/docs.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: docs
title: "Documentation Title"
search: true
breadcrumbs:
  - title: "Home"
    url: "/"
  - title: "Docs"
    url: "/docs"
nav_items:
  - title: "Getting Started"
    url: "/docs/start"
    children:
      - title: "Installation"
        url: "/docs/install"
prev:
  title: "Previous Page"
  url: "/docs/prev"
next:
  title: "Next Page"
  url: "/docs/next"
---
```

**Features**:
- Sidebar navigation
- Breadcrumb trail
- Previous/next links
- Search functionality
- Table of contents (right sidebar)

**Example**: See `_samples/knowledge/sample-docs.md`

---

### FAQ Layout

**Purpose**: Frequently asked questions with accordion interface.

**File**: `_layouts/faq.html`

**Inherits from**: `scrollable`

**Front Matter Options**:
```yaml
---
layout: faq
title: "Frequently Asked Questions"
description: "Find answers to common questions"
search: true
categories: ["General", "Technical", "Billing"]
contact_cta:
  description: "Still have questions?"
  text: "Contact Support"
  url: "/contact"
---
```

**Features**:
- Accordion-style Q&A
- Category filtering
- Search functionality
- Contact CTA section

**Sample Includes**:
- `faq-item.html` - Single FAQ item with accordion

**Example**: See `_samples/knowledge/sample-faq.md`

---

## Application Layouts

### Dashboard Layout

**Purpose**: Data-heavy or app-like pages with metrics and widgets.

**File**: `_layouts/dashboard.html`

**Inherits from**: `fixed-height`

**Front Matter Options**:
```yaml
---
layout: dashboard
title: "Dashboard Title"
actions: ["Export", "Refresh", "Settings"]
---
```

**Features**:
- Widget grid system
- Real-time data display
- Action buttons
- Fixed header with scrollable content

**Sample Includes**:
- `dashboard-widget.html` - Metric card/widget component

**Example**: See `_samples/application/sample-dashboard.md`

---

### Chatroom Layout

**Purpose**: Real-time or threaded conversation pages.

**File**: `_layouts/chatroom.html`

**Inherits from**: `fixed-height`

**Front Matter Options**:
```yaml
---
layout: chatroom
title: "Chatroom Name"
participants: 42
---
```

**Features**:
- Fixed header and input area
- Scrollable message list
- Participant count
- Real-time message support (requires additional JS)

---

### Search Layout

**Purpose**: Search results with filters and faceted navigation.

**File**: `_layouts/search.html`

**Inherits from**: `fixed-height`

**Front Matter Options**:
```yaml
---
layout: search
query: "search term"
results_count: 125
filters:
  - name: "Date Range"
  - name: "Content Type"
---
```

**Features**:
- Search bar
- Filter sidebar
- Results list
- Result count display

---

### Settings Layout

**Purpose**: User or admin settings pages with tabbed interface.

**File**: `_layouts/settings.html`

**Inherits from**: `fixed-height`

**Front Matter Options**:
```yaml
---
layout: settings
title: "Settings"
tabs:
  - title: "Profile"
    id: "profile"
    icon: "fas fa-user"
  - title: "Security"
    id: "security"
    icon: "fas fa-lock"
---
```

**Features**:
- Sidebar navigation
- Tabbed content areas
- Save/cancel actions
- Form sections

---

## Utility Layouts

### Minimal Layout

**Purpose**: Error, maintenance, or legal pages with minimal design.

**File**: `_layouts/minimal.html`

**Inherits from**: `minimal-base`

**Front Matter Options**:
```yaml
---
layout: minimal
title: "404 - Page Not Found"
error_code: "404"
description: "Error description"
show_home_link: true
---
```

**Features**:
- Centered content
- Error code display
- Home link option
- Minimal visual elements

**Example**: See `_samples/utility/sample-404.md`

---

### Splash Layout

**Purpose**: Intro, coming soon, or lightweight splash pages.

**File**: `_layouts/splash.html`

**Inherits from**: `minimal-base`

**Front Matter Options**:
```yaml
---
layout: splash
title: "Coming Soon"
subtitle: "We're working on something amazing"
logo: "/path/to/logo.png"
countdown: true
email_capture:
  button_text: "Notify Me"
social_links:
  - platform: "twitter"
    url: "https://twitter.com/example"
---
```

**Features**:
- Full-screen design
- Countdown timer
- Email capture form
- Social links
- Logo display

**Sample Includes**:
- `splash-countdown.html` - Countdown timer component

**Example**: See `_samples/utility/sample-splash.md`

---

## Sample Includes

All sample includes are organized in subdirectories matching their layout types:

- `_includes/layouts/post/` - Post-specific components
- `_includes/layouts/article/` - Article-specific components
- `_includes/layouts/archive/` - Archive-specific components
- `_includes/layouts/profile/` - Profile-specific components
- `_includes/layouts/landing/` - Landing page components
- `_includes/layouts/gallery/` - Gallery components
- `_includes/layouts/form/` - Form components
- `_includes/layouts/faq/` - FAQ components
- `_includes/layouts/dashboard/` - Dashboard widgets
- `_includes/layouts/splash/` - Splash page components

### Using Includes

Example of including a component:

```liquid
{% include layouts/post/post-meta.html 
  date=page.date
  author=page.author
  reading_time=5
  tags=page.tags
%}
```

---

## Customization

### SCSS Variables

Key variables for customization are defined in `_sass/base/_variables.scss`:

```scss
// Colors
$cosmic-deep-blue: #0B1426;
$luminous-gold: #FFD700;
$transcendent-white: #FFFFFF;

// Typography
$font-family-consciousness: 'Inter', sans-serif;
$font-size-base: 1rem;

// Spacing
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
```

### Header Customization

The header is enhanced with:
- Transparent background with backdrop blur
- Scroll-based opacity changes
- Responsive breakpoints
- Futuristic hover effects

Customize in `_sass/components/_header.scss`.

### Navbar Customization

The navbar features:
- Gradient hover effects
- Smooth transitions
- Responsive dropdowns
- Active state indicators

Customize in `_sass/components/_navbar.scss`.

---

## Best Practices

1. **Choose the Right Layout**: Select the layout that best matches your content type and user flow.

2. **Use Front Matter**: Leverage front matter options to configure layouts without modifying templates.

3. **Component Reuse**: Use includes for reusable components across different layouts.

4. **Responsive Design**: All layouts are responsive by default. Test on multiple devices.

5. **Accessibility**: Layouts follow WCAG 2.1 guidelines. Maintain accessibility when adding custom content.

6. **Performance**: Layouts are optimized for performance. Avoid adding heavy scripts or large images without optimization.

---

## Support

For issues, questions, or feature requests:
- Review the [Layout Taxonomy](./layout-taxonomy.md)
- Check the [Layout Grid Governance](./layout-grid-governance.md)
- See sample pages in `_samples/` directory
- Open an issue on GitHub
