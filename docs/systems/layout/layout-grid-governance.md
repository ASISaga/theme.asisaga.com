# Layout & Grid Governance

This document defines how to use **containers, rows, columns, and includes** in this Jekyll + Bootstrap project.  
Follow these rules to keep the system consistent, modular, and easy to maintain.

---

## Containers
- Place containers in **layouts only**.  
- Use them to provide consistent horizontal padding and alignment across all pages.  
- Do not repeat containers in includes or page content.  

---

## Rows & Columns
- Rows and columns are **optional**.  
- Use them only when grid alignment is required.  
- Placement rules:
  - Inside `{{ content }}` → for page‑specific layouts.  
  - Inside includes → for reusable grid sections (e.g., features, footers).  
  - Inside layouts → only if the grid structure is universal across all pages (e.g., fixed sidebar + main content).  

---

## Includes
- **Simple includes** (logo, CTA button, nav link):  
  - Do not wrap in rows/columns.  
  - Drop directly into layouts or content.  

- **Fixed wireframe includes** (e.g., a 3‑column footer that never changes):  
  - Define in layouts.  
  - Encode once to avoid duplication.  

- **Complex/dynamic wireframe includes** (e.g., features grid, testimonial carousel):  
  - Define in `_includes`.  
  - Encapsulate their own rows/columns.  
  - Reuse across multiple layouts.  

---

## Layouts
- Define multiple layouts as needed (`default`, `post`, `landing`, `dashboard`, etc.).  
- Each layout must:
  - Provide containers and global scaffolding.  
  - Include a single `{{ content }}` slot.  
  - Contain fixed wireframes (header, footer, sidebar) if required.  

- Pages select their layout via front matter:
  ```yaml
  ---
  layout: post
  title: "My First Blog Post"
  ---