---
layout: docs
title: "Documentation Home"
search: true
breadcrumbs:
  - title: "Home"
    url: "/"
  - title: "Documentation"
    url: "/docs"
  - title: "Getting Started"
    url: "/docs/getting-started"
nav_items:
  - title: "Getting Started"
    url: "/docs/getting-started"
  - title: "Layouts"
    url: "/docs/layouts"
    children:
      - title: "Base Templates"
        url: "/docs/layouts/base"
      - title: "Specialized Layouts"
        url: "/docs/layouts/specialized"
  - title: "Components"
    url: "/docs/components"
  - title: "Customization"
    url: "/docs/customization"
prev:
  title: "Introduction"
  url: "/docs/introduction"
next:
  title: "Layout Basics"
  url: "/docs/layout-basics"
---

# Getting Started

Welcome to the documentation! This page demonstrates the **docs layout**, designed for documentation sites with sidebar navigation and breadcrumbs.

## Prerequisites

Before you begin, ensure you have:

- Jekyll 4.0 or higher
- Ruby 2.7 or higher
- Basic knowledge of Markdown and YAML

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/theme.git
cd theme
```

### Step 2: Install Dependencies

```bash
bundle install
```

### Step 3: Run the Development Server

```bash
bundle exec jekyll serve
```

Your site will be available at `http://localhost:4000`.

## Basic Usage

### Creating a Page

Create a new Markdown file in your project:

```markdown
---
layout: post
title: "My First Post"
---

# Hello World

This is my first post!
```

### Using Layouts

Choose from our comprehensive layout collection:

- **Content Layouts**: post, article, archive, profile
- **Marketing Layouts**: landing, gallery, form
- **Knowledge Layouts**: docs, faq
- **Application Layouts**: dashboard, chatroom, search, settings
- **Utility Layouts**: minimal, splash

## Configuration

Edit `_config.yml` to customize your site:

```yaml
title: Your Site Title
description: Your site description
theme: your-theme-name
```

## Next Steps

- Learn about [Layout Basics](/docs/layout-basics)
- Explore [Components](/docs/components)
- Check out [Customization Options](/docs/customization)

## Need Help?

If you encounter any issues:

1. Check the [FAQ](/faq)
2. Search the [documentation](/docs)
3. Open an issue on [GitHub](https://github.com/your-repo/theme/issues)
