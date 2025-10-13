# Layout Taxonomy

All layouts inherit from `default`, which provides the global scaffolding (HTML, head, body, header, footer, and a `.container` for content).  
Specialized layouts extend `default` to serve specific content archetypes.

# Hierarchy Overview

default
├── Content-Driven
│   ├── post
│   ├── article
│   ├── archive
│   └── profile
├── Marketing
│   ├── landing
│   ├── gallery
│   └── form
├── Knowledge
│   ├── docs
│   └── faq
├── Application & Interactive
│   ├── dashboard
│   ├── chatroom
│   ├── search
│   └── settings
└── Utility
    ├── minimal
    └── splash

---

## 1. Base Layout
- **`default`**
  - Purpose: Root layout for all pages.
  - Provides: Global scaffolding, header, footer, and a `.container`.
  - Grid rules: No enforced rows/columns.

---

## 2. Content-Driven Layouts
- **`post`**
  - Purpose: Blog posts, news entries.
  - Container: `.container` for readability.
  - Grid: Single column, optional sidebar.
  - Includes: Blog header, blog footer.

- **`article`**
  - Purpose: Long-form editorial or knowledge articles.
  - Container: `.container`.
  - Grid: Single column with optional inline media grids.
  - Includes: Article header (title, author, metadata), footer.

- **`archive`**
  - Purpose: Index pages listing posts, projects, or resources.
  - Container: `.container`.
  - Grid: Rows/columns for card grids or lists.
  - Includes: Header, footer.

- **`profile`**
  - Purpose: Author or team member profile pages.
  - Container: `.container`.
  - Grid: Two-column layout (profile info + content).
  - Includes: Header, footer.

---

## 3. Marketing Layouts
- **`landing`**
  - Purpose: Campaign or marketing landing pages.
  - Container: Mix of `.container` and `.container-fluid`.
  - Grid: Rows/columns defined in includes (hero, features, CTA).
  - Includes: Hero, CTA, footer.

- **`gallery`**
  - Purpose: Image or media gallery pages.
  - Container: `.container-fluid` for full-bleed visuals.
  - Grid: Responsive multi-column grid.
  - Includes: Header, footer.

- **`form`**
  - Purpose: Contact, signup, or feedback forms.
  - Container: `.container`.
  - Grid: Centered single column, optional two-column split.
  - Includes: Header, footer.

---

## 4. Knowledge & Documentation Layouts
- **`docs`**
  - Purpose: Documentation or knowledge base.
  - Container: `.container-fluid`.
  - Grid: Fixed two-column grid (sidebar + main content).
  - Includes: Docs sidebar, footer.

- **`faq`**
  - Purpose: Frequently asked questions.
  - Container: `.container`.
  - Grid: Single column with collapsible sections.
  - Includes: Header, footer.

---

## 5. Application & Interactive Layouts
- **`dashboard`**
  - Purpose: Data-heavy or app-like pages.
  - Container: `.container-fluid`.
  - Grid: Universal row/column skeleton (e.g., 3–4 widget columns).
  - Includes: Navigation, sidebar, footer.

- **`chatroom`**
  - Purpose: Real-time or threaded conversation pages.
  - Container: `.container-fluid`.
  - Grid: Two-column grid (chat stream + sidebar).
  - Includes: Chat header, footer, optional sidebar.

- **`search`**
  - Purpose: Search results pages.
  - Container: `.container`.
  - Grid: Single column with optional sidebar for filters.
  - Includes: Header, footer.

- **`settings`**
  - Purpose: User or admin settings pages.
  - Container: `.container`.
  - Grid: Two-column layout (nav + form).
  - Includes: Header, footer.

---

## 6. Utility Layouts
- **`minimal`**
  - Purpose: Utility pages (404, maintenance, legal).
  - Container: `.container`.
  - Grid: No rows/columns.
  - Includes: Footer only.

- **`splash`**
  - Purpose: Intro or coming-soon pages.
  - Container: `.container-fluid`.
  - Grid: Centered single column.
  - Includes: Logo, CTA.

---

# Layout Selection Guide

Use this guide to choose the correct layout for a new page.  
All layouts inherit from `default`.

---

## Step 1: Identify the Content Type
1. **Is this a general page with no special structure?**  
   → Use `default`.

2. **Is this editorial content?**  
   - Blog post or news entry → Use `post`.  
   - Long-form article or knowledge piece → Use `article`.  
   - Index of posts, projects, or resources → Use `archive`.  
   - Author or team profile → Use `profile`.

3. **Is this a marketing or promotional page?**  
   - Campaign or landing page → Use `landing`.  
   - Media-heavy showcase → Use `gallery`.  
   - Contact, signup, or feedback form → Use `form`.

4. **Is this documentation or knowledge support?**  
   - Documentation or knowledge base → Use `docs`.  
   - Frequently asked questions → Use `faq`.

5. **Is this an application or interactive page?**  
   - Data dashboard → Use `dashboard`.  
   - Real-time or threaded conversation → Use `chatroom`.  
   - Search results → Use `search`.  
   - User or admin settings → Use `settings`.

6. **Is this a utility or special-purpose page?**  
   - Error, maintenance, or legal → Use `minimal`.  
   - Intro, splash, or coming soon → Use `splash`.

---

## Step 2: Confirm Structural Needs
- **Does the page need a universal grid (e.g., sidebar + main)?**  
  → Choose a layout that enforces it (`docs`, `dashboard`, `chatroom`).  

- **Does the page need flexible sections with different grids?**  
  → Use a layout that delegates grid to includes (`landing`, `gallery`).  

- **Does the page need no grid at all?**  
  → Use `default`, `minimal`, or `splash`.

---

## Step 3: Apply Governance Rules
- Containers are always defined in layouts.  
- Rows and columns are only added in content or includes, unless the layout enforces a universal grid.  
- Includes are modular:  
  - Simple = no grid.  
  - Fixed = in layouts.  
  - Complex/dynamic = in includes with their own grid.  

---

## Quick Reference
- **Editorial** → `post`, `article`, `archive`, `profile`  
- **Marketing** → `landing`, `gallery`, `form`  
- **Knowledge** → `docs`, `faq`  
- **Application** → `dashboard`, `chatroom`, `search`, `settings`  
- **Utility** → `minimal`, `splash`