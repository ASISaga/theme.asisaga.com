# Layout Taxonomy

This taxonomy defines the standard layouts for the site.  
Each layout specifies its purpose, container strategy, grid rules, and fixed includes.  
Use this as a reference when creating or assigning layouts.

---

## 1. `default`
- **Purpose**: Base layout for general pages.  
- **Container strategy**: `.container` for main content.  
- **Grid rules**: No enforced rows/columns.  
- **Fixed includes**: Header, footer.  

---

## 2. `post`
- **Purpose**: Blog posts, articles, news entries.  
- **Container strategy**: `.container` for readability.  
- **Grid rules**: Single column, optional sidebar.  
- **Fixed includes**: Blog header, blog footer.  

---

## 3. `landing`
- **Purpose**: Marketing or campaign landing pages.  
- **Container strategy**: Mix of `.container` and `.container-fluid` for edge‑to‑edge sections.  
- **Grid rules**: Rows/columns defined in includes (hero, features, CTA).  
- **Fixed includes**: Hero, CTA, footer.  

---

## 4. `docs`
- **Purpose**: Documentation or knowledge base pages.  
- **Container strategy**: `.container-fluid` for full width.  
- **Grid rules**: Fixed two‑column grid (sidebar + main content).  
- **Fixed includes**: Docs sidebar, footer.  

---

## 5. `dashboard`
- **Purpose**: Data‑heavy or app‑like pages.  
- **Container strategy**: `.container-fluid` for flexibility.  
- **Grid rules**: Universal row/column skeleton (e.g., 3–4 widget columns).  
- **Fixed includes**: Navigation, sidebar, footer.  

---

## 6. `minimal`
- **Purpose**: Utility pages such as 404, maintenance, or legal notices.  
- **Container strategy**: `.container`.  
- **Grid rules**: No rows/columns.  
- **Fixed includes**: Footer only.  

---

## 7. `archive`
- **Purpose**: Index pages listing posts, projects, or resources.  
- **Container strategy**: `.container`.  
- **Grid rules**: Rows/columns for card grids or lists.  
- **Fixed includes**: Header, footer.  

---

## 8. `profile`
- **Purpose**: Author or team member profile pages.  
- **Container strategy**: `.container`.  
- **Grid rules**: Two‑column layout (profile info + content).  
- **Fixed includes**: Header, footer.  

---

## 9. `gallery`
- **Purpose**: Image or media gallery pages.  
- **Container strategy**: `.container-fluid` for full‑bleed visuals.  
- **Grid rules**: Responsive multi‑column grid.  
- **Fixed includes**: Header, footer.  

---

## 10. `form`
- **Purpose**: Contact, signup, or feedback forms.  
- **Container strategy**: `.container`.  
- **Grid rules**: Centered single column, optional two‑column split.  
- **Fixed includes**: Header, footer.  

---

## 11. `search`
- **Purpose**: Search results pages.  
- **Container strategy**: `.container`.  
- **Grid rules**: Single column with optional sidebar for filters.  
- **Fixed includes**: Header, footer.  

---

## Rules Recap
1. Containers are always defined in layouts.  
2. Rows and columns are optional and only used when grid alignment is required.  
   - Place them in content or includes.  
   - Place them in layouts only if the grid is universal.  
3. Includes follow three categories:  
   - Simple includes → no grid.  
   - Fixed wireframes → defined in layouts.  
   - Complex/dynamic wireframes → defined in includes with their own grid.  

---

This taxonomy provides a modular, extensible set of layouts that map directly to common content archetypes. It ensures layouts remain lean, grid usage is intentional, and includes are reusable.