# Layout Taxonomy

All layouts inherit from `default`, which provides the global scaffolding:  
- `<html>`, `<head>`, `<body>`  
- Site‑wide header and footer  
- A `.container` for content (unless overridden by a base template)

---

## 1. Root Layout
- **`default`**
  - Purpose: Root contract for all pages.
  - Provides: Global scaffolding, header, footer, and a `.container`.
  - Grid rules: No enforced rows/columns.

---

## 2. Base Templates (inherit from `default`)

### 2.1 `scrollable`
- Purpose: Standard vertical flow pages where content grows and the page scrolls naturally.
- Container: `.container` or `.container-fluid` depending on child layout.
- Behavior: Page scrolls with content.
- Examples: Blog posts, articles, landing pages, docs.

### 2.2 `fixed-height`
- Purpose: Application‑style layouts where the viewport height is constrained.
- Container: `.container-fluid` with flexbox or grid.
- Behavior: Header/footer pinned, central panel scrollable (`overflow-y: auto`).
- Examples: Dashboards, chatrooms, settings.

### 2.3 `minimal-base`
- Purpose: Utility or lightweight pages with minimal chrome.
- Container: `.container`.
- Behavior: No enforced grid, minimal includes.
- Examples: 404, splash, maintenance.

---

## 3. Specialized Layouts

### 3.1 Content‑Driven (inherit from `scrollable`)
- **`post`** → Blog posts, news entries.  
- **`article`** → Long‑form editorial or knowledge articles.  
- **`archive`** → Index pages listing posts, projects, or resources.  
- **`profile`** → Author or team member profile pages.  

### 3.2 Marketing (inherit from `scrollable`)
- **`landing`** → Campaign or marketing landing pages.  
- **`gallery`** → Image or media gallery pages.  
- **`form`** → Contact, signup, or feedback forms.  

### 3.3 Knowledge (inherit from `scrollable`)
- **`docs`** → Documentation or knowledge base pages.  
- **`faq`** → Frequently asked questions.  

### 3.4 Application & Interactive (inherit from `fixed-height`)
- **`dashboard`** → Data‑heavy or app‑like pages.  
- **`chatroom`** → Real‑time or threaded conversation pages.  
- **`search`** → Search results with filters.  
- **`settings`** → User or admin settings pages.  

### 3.5 Utility (inherit from `minimal-base`)
- **`minimal`** → Error, maintenance, or legal pages.  
- **`splash`** → Intro, coming soon, or lightweight splash pages.  

---

# Hierarchy Overview

default
├── Base Templates
│   ├── scrollable
│   │   ├── post
│   │   ├── article
│   │   ├── archive
│   │   ├── profile
│   │   ├── landing
│   │   ├── gallery
│   │   ├── form
│   │   ├── docs
│   │   └── faq
│   ├── fixed-height
│   │   ├── dashboard
│   │   ├── chatroom
│   │   ├── search
│   │   └── settings
│   └── minimal-base
│       ├── minimal
│       └── splash