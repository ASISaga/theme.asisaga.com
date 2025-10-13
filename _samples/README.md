# Sample Pages Directory

This directory contains sample pages demonstrating each layout type in the theme. Use these samples as templates and learning resources for creating your own pages.

## Directory Structure

```
_samples/
├── content-driven/      # Content-focused layouts
│   ├── sample-post.md
│   ├── sample-article.md
│   ├── sample-archive.md
│   └── sample-profile.md
├── marketing/           # Marketing and promotional layouts
│   ├── sample-landing.md
│   ├── sample-gallery.md
│   └── sample-form.md
├── knowledge/           # Documentation and help layouts
│   ├── sample-docs.md
│   └── sample-faq.md
├── application/         # Interactive application layouts
│   ├── sample-dashboard.md
│   ├── sample-chatroom.md
│   ├── sample-search.md
│   └── sample-settings.md
└── utility/             # Utility and special-purpose layouts
    ├── sample-404.md
    └── sample-splash.md
```

## How to Use Samples

### 1. View Live Examples

These sample pages can be built and viewed locally:

```bash
bundle exec jekyll serve
```

Then navigate to:
- `/samples/content-driven/sample-post.html`
- `/samples/marketing/sample-landing.html`
- etc.

### 2. Copy and Customize

Copy any sample file as a starting point for your own pages:

```bash
cp _samples/content-driven/sample-post.md _posts/2024-01-15-my-post.md
```

### 3. Learn from Examples

Each sample demonstrates:
- Proper front matter configuration
- Layout-specific features
- Include component usage
- Content structure best practices

## Sample Descriptions

### Content-Driven Samples

- **sample-post.md**: Blog post with metadata, tags, and formatting
- **sample-article.md**: Long-form article with table of contents
- **sample-archive.md**: List page with filtering and sorting
- **sample-profile.md**: User profile with bio and social links

### Marketing Samples

- **sample-landing.md**: Marketing page with hero, features, and CTAs
- **sample-gallery.md**: Image gallery with categories and filtering
- **sample-form.md**: Contact form with validation and fields

### Knowledge Samples

- **sample-docs.md**: Documentation page with navigation and breadcrumbs
- **sample-faq.md**: FAQ page with accordion interface

### Application Samples

- **sample-dashboard.md**: Analytics dashboard with widgets and metrics
- **sample-chatroom.md**: Real-time chat interface with messages
- **sample-search.md**: Search results page with filters
- **sample-settings.md**: User settings with tabbed interface

### Utility Samples

- **sample-404.md**: Error page with minimal design
- **sample-splash.md**: Coming soon page with countdown

## Key Features Demonstrated

### Front Matter Options

Each sample shows different front matter configurations:

```yaml
# Post example
layout: post
title: "Post Title"
date: 2024-01-15
author: "Author Name"
tags: ["Jekyll", "Tutorial"]

# Landing example
layout: landing
hero:
  title: "Hero Title"
  cta:
    text: "Get Started"
    url: "/signup"

# Docs example
layout: docs
search: true
breadcrumbs:
  - title: "Home"
    url: "/"
```

### Include Components

Samples demonstrate using layout-specific includes:

```liquid
{% include layouts/post/post-meta.html 
  date=page.date
  author=page.author
%}

{% include layouts/gallery/gallery-item.html
  thumbnail="path/to/image.jpg"
  title="Image Title"
%}
```

### Content Structure

Samples show proper content organization:
- Headings hierarchy
- Responsive images
- Lists and tables
- Code blocks
- Callouts and alerts

## Customization Tips

### 1. Modify Front Matter

Change front matter values to customize behavior:

```yaml
# Enable/disable features
show_filters: true
search: true
toc: true

# Configure appearance
hero:
  image: "/custom/image.jpg"
categories: ["Custom", "Categories"]
```

### 2. Add Custom Content

Insert your own content while maintaining structure:

```markdown
## Your Custom Section

Your custom content here...

{% include your-custom-include.html %}
```

### 3. Adjust Styling

Override styles with custom CSS classes:

```html
<div class="custom-section py-5">
  <h2 class="custom-heading">Custom Styled Content</h2>
</div>
```

## Sample URLs

When built, samples are accessible at:

| Sample | URL |
|--------|-----|
| Post | `/samples/content-driven/sample-post.html` |
| Article | `/samples/content-driven/sample-article.html` |
| Archive | `/samples/content-driven/sample-archive.html` |
| Profile | `/samples/content-driven/sample-profile.html` |
| Landing | `/samples/marketing/sample-landing.html` |
| Gallery | `/samples/marketing/sample-gallery.html` |
| Form | `/samples/marketing/sample-form.html` |
| Docs | `/samples/knowledge/sample-docs.html` |
| FAQ | `/samples/knowledge/sample-faq.html` |
| Dashboard | `/samples/application/sample-dashboard.html` |
| Chatroom | `/samples/application/sample-chatroom.html` |
| Search | `/samples/application/sample-search.html` |
| Settings | `/samples/application/sample-settings.html` |
| 404 | `/samples/utility/sample-404.html` |
| Splash | `/samples/utility/sample-splash.html` |

## Best Practices

1. **Start with a sample**: Don't create pages from scratch - copy a sample
2. **Preserve structure**: Keep the demonstrated content structure
3. **Test responsiveness**: View samples on different screen sizes
4. **Check front matter**: Ensure all required front matter is present
5. **Use includes**: Leverage includes for reusable components
6. **Follow conventions**: Maintain naming and organization patterns
7. **Validate content**: Check that your content works with the layout

## Getting Help

For more information:
- Read the [Layout Implementation Guide](../docs/layout-implementation-guide.md)
- Check the [Layout Quick Reference](../docs/layout-quick-reference.md)
- Review [Layout Taxonomy](../docs/layout-taxonomy.md)
- See [Layout Grid Governance](../docs/layout-grid-governance.md)

## Contributing

To add new samples:
1. Create a new `.md` file in the appropriate subdirectory
2. Use an existing sample as a template
3. Add comprehensive front matter
4. Demonstrate all layout features
5. Include helpful comments
6. Test the sample page locally
7. Document any new features

---

**Note**: These samples use placeholder images from `placeholder.com`. Replace with your own images in production.
