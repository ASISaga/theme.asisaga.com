#!/usr/bin/env node

/**
 * Static Layout Renderer
 * 
 * This script generates static HTML files from Jekyll layouts for testing purposes.
 * It simulates what Jekyll would do by combining layouts with test content.
 */

const fs = require('fs');
const path = require('path');

// Test data for each layout
const layoutData = {
  archive: {
    title: 'Test Archive Layout',
    description: 'This is a test page for the archive layout',
    show_filters: true,
    show_sort: true,
    show_view_toggle: true,
    show_pagination: true,
    content: '<h2>Archive Content</h2><p>This is sample content for testing the archive layout.</p>'
  },
  article: {
    title: 'Test Article Layout',
    subtitle: 'A comprehensive guide to testing',
    date: '2026-01-20',
    author: 'Test Author',
    reading_time: '5',
    toc: '<ul><li><a href="#section-1">Section 1</a></li></ul>',
    related_articles: true,
    content: '<h2>Section 1</h2><p>This is a test article.</p>'
  },
  dashboard: {
    title: 'Test Dashboard',
    actions: ['New Item', 'Export', 'Settings'],
    content: '<h2>Dashboard Widgets</h2><p>Dashboard content here.</p>'
  },
  default: {
    title: 'Test Default Layout',
    content: '<h2>Default Layout Test</h2><p>This is the default layout.</p>'
  },
  gallery: {
    title: 'Test Gallery Layout',
    description: 'A collection of images',
    categories: [
      { name: 'Nature', slug: 'nature' },
      { name: 'Architecture', slug: 'architecture' }
    ],
    content: '<p>Gallery items go here.</p>'
  },
  landing: {
    title: 'Test Landing Page',
    hero: {
      title: 'Welcome to Our Platform',
      subtitle: 'The best solution',
      cta: { text: 'Get Started', url: '#' }
    },
    final_cta: {
      title: 'Ready to Begin?',
      description: 'Join us',
      text: 'Sign Up Now',
      url: '#'
    },
    content: '<h2>Features</h2>'
  },
  profile: {
    title: 'Test Profile',
    name: 'John Doe',
    role: 'Senior Developer',
    bio: 'Developer bio',
    social_links: [
      { platform: 'twitter', url: '#' },
      { platform: 'github', url: '#' }
    ],
    stats: true,
    skills: ['JavaScript', 'Python', 'React'],
    content: '<h2>About Me</h2>'
  },
  post: {
    title: 'Test Blog Post',
    date: '2026-01-20',
    author: 'Test Author',
    categories: ['Technology'],
    content: '<h2>Introduction</h2><p>Blog post content.</p>'
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Common questions',
    content: '<h2>Getting Started</h2><h3>How do I start?</h3><p>Answer here.</p>'
  },
  docs: {
    title: 'Documentation Test',
    content: '<h2>Documentation</h2><p>API reference content.</p>'
  },
  search: {
    title: 'Search Test',
    content: '<h2>Search Results</h2>'
  },
  settings: {
    title: 'Settings Test',
    content: '<h2>User Settings</h2>'
  },
  splash: {
    title: 'Splash Page Test',
    content: '<h2>Welcome</h2>'
  },
  form: {
    title: 'Form Test',
    content: '<h2>Contact Form</h2>'
  },
  app: {
    title: 'App Layout Test',
    content: '<h2>Application Interface</h2>'
  },
  chatroom: {
    title: 'Chatroom Test',
    content: '<h2>Chat Interface</h2>'
  },
  minimal: {
    title: 'Minimal Layout Test',
    error_code: '404',
    description: 'Page not found',
    show_home_link: true,
    content: '<h2>Minimal Design</h2>'
  },
  'minimal-base': {
    title: 'Minimal Base Layout Test',
    content: '<h2>Minimal Base</h2>'
  },
  'fixed-height': {
    title: 'Fixed Height Test',
    content: '<h2>Fixed Height Layout</h2>'
  },
  scrollable: {
    title: 'Scrollable Layout Test',
    content: '<h2>Scrollable Content</h2>'
  }
};

// Simple template processor
function processTemplate(template, data) {
  let result = template;
  
  // Replace {{ content }}
  result = result.replace(/\{\{\s*content\s*\}\}/g, data.content || '');
  
  // Replace {{ page.* }} variables
  result = result.replace(/\{\{\s*page\.(\w+)\s*\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : '';
  });
  
  // Remove {% if %} blocks if condition is false
  result = result.replace(/\{%\s*if\s+page\.(\w+)\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g, (match, key, content) => {
    return data[key] ? content : '';
  });
  
  // Remove {% for %} loops (simplified - just remove)
  result = result.replace(/\{%\s*for\s+.*?%\}[\s\S]*?\{%\s*endfor\s*%\}/g, '');
  
  // Remove remaining liquid tags
  result = result.replace(/\{%.*?%\}/g, '');
  result = result.replace(/\{\{.*?\}\}/g, '');
  
  return result;
}

// Create a simple HTML wrapper
function createSimpleHTML(title, bodyClass, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="${bodyClass}">
  <a href="#skip-target" class="sr-only focus-visible">Skip to main content</a>
  
  <header role="banner">
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
    </nav>
  </header>
  
  <main id="skip-target" tabindex="-1" role="main" class="page-content">
    ${content}
  </main>
  
  <footer role="contentinfo">
    <p>&copy; 2026 ASI Saga Theme Test</p>
  </footer>
</body>
</html>`;
}

// Generate static HTML for each layout
function generateLayoutHTML(layoutName, data) {
  const layoutPath = path.join(__dirname, '_layouts', `${layoutName}.html`);
  
  if (!fs.existsSync(layoutPath)) {
    console.log(`Layout not found: ${layoutName}`);
    return null;
  }
  
  let layoutContent = fs.readFileSync(layoutPath, 'utf-8');
  
  // Remove front matter
  layoutContent = layoutContent.replace(/^---[\s\S]*?---\n/, '');
  
  // Process the template
  const processedContent = processTemplate(layoutContent, data);
  
  // Determine body class
  const bodyClass = layoutName === 'default' ? 'layout-container' : 
                    layoutName === 'app' ? 'app-layout' : 
                    `${layoutName}-page`;
  
  // Create complete HTML
  const html = createSimpleHTML(data.title, bodyClass, processedContent);
  
  return html;
}

// Main execution
function main() {
  const outputDir = path.join(__dirname, 'test-layouts-static');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate HTML for each layout
  for (const [layoutName, data] of Object.entries(layoutData)) {
    const html = generateLayoutHTML(layoutName, data);
    
    if (html) {
      const outputPath = path.join(outputDir, `${layoutName}.html`);
      fs.writeFileSync(outputPath, html, 'utf-8');
      console.log(`Generated: ${layoutName}.html`);
    }
  }
  
  console.log(`\nGenerated ${Object.keys(layoutData).length} static layout files in ${outputDir}`);
}

main();
