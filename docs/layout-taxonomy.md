# Layout Taxonomy

All layouts inherit from `default`, which provides the global scaffolding (HTML, head, body, header, footer, and a `.container` for content).  
Specialized layouts extend `default` to serve specific content archetypes.

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

# Hierarchy Overview