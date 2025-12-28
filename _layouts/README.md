**Layout Selector — theme.asisaga.com/_layouts**

Overview
This file is a human-focused selector for the theme's Jekyll layouts. Each layout section below explains: the unique selling point (USP), when to choose the layout, the key frontmatter variables that toggle features, accessibility notes or behavioral caveats, and a short example frontmatter snippet you can paste into a page.

Table of contents
- app.html
- default.html
- scrollable.html
- fixed-height.html
- post.html
- article.html
- archive.html
- docs.html
- faq.html
- form.html
- search.html
- gallery.html
- landing.html
- dashboard.html
- settings.html
- chatroom.html
- profile.html
- minimal-base.html
- minimal.html
- splash.html

Layout details

app.html
- USP: A small, dependable shell for pages that behave like a lightweight app — skip navigation, header and footer included.
- When to use: Use for single-view app pages or minimal wrappers where you don't want the full default chrome but still need site-level header/footer and accessibility anchors.
- Key frontmatter: none special — relies on includes `head.html`, `header.html`, `footer.html`.
- Accessibility/notes: Provides a `#skip-target` anchor for keyboard users.
- Example frontmatter:
```
layout: app
title: "My App Page"
```

default.html
- USP: The full-featured site scaffold used as the canonical page template — accessible, semantic, and used by other base templates.
- When to use: Use as the base for general-purpose pages, marketing pages, or anything that needs the full header/footer and main content wrappers.
- Key frontmatter: none required; other layouts often extend this one.
- Accessibility/notes: Adds `role="main"`, skip links, and consistent header/footer wrappers.
- Example frontmatter:
```
layout: default
title: "Overview"
```

scrollable.html
- USP: A container optimized for vertically scrolling content; ideal for articles and documentation flows.
- When to use: Content pages that naturally grow down the page (long reads, docs, lists).
- Key frontmatter: typically none, child layouts (post, article, docs) use this as their base.
- Accessibility/notes: Uses a fluid container to allow content to reflow; pair with a TOC for long content.
- Example frontmatter:
```
layout: scrollable
title: "Long Read"
```

fixed-height.html
- USP: Designed for app-like layouts where the header and footer are pinned and the central region scrolls independently.
- When to use: Dashboards, chat UIs, search with side filters, and settings panels where you need a fixed visible chrome.
- Key frontmatter: none by itself; used as the parent for `dashboard`, `chatroom`, `search`, `settings`.
- Accessibility/notes: Ensure internal scroll regions are keyboard-focusable and announce overflow if needed.
- Example frontmatter:
```
layout: fixed-height
title: "Admin Console"
```

post.html
- USP: A classic blog/post layout with metadata, tags/categories and sharing area.
- When to use: Blog posts, news items, short-form editorial pieces.
- Key frontmatter: `title`, `date`, `author`, `tags`, `categories`, `share` (boolean to show sharing UI).
- Accessibility/notes: Metadata is marked up with `time` elements and semantic headings.
- Example frontmatter:
```
layout: post
title: "Release Notes — v1.2"
date: 2025-12-13
author: "Jane Doe"
tags: [release, changelog]
share: true
```

article.html
- USP: Enhanced article presentation with optional table-of-contents and reading progress affordances.
- When to use: Long-form content, tutorials, research articles and knowledge-base entries.
- Key frontmatter: `toc` (true|auto|html), `subtitle`, `reading_time`, `related_articles`.
- Accessibility/notes: If `toc` is enabled, ensure internal anchors are meaningful and keyboard reachable.
- Example frontmatter:
```
layout: article
title: "Design Patterns for Agents"
toc: true
reading_time: 12
```

archive.html
- USP: Index/collection layout with filtering, sorting and view toggles for compact discovery experiences.
- When to use: Tag/category archives, project indexes, resource lists.
- Key frontmatter: `show_filters`, `show_sort`, `show_view_toggle`, `show_pagination`, `description`, `title`.
- Accessibility/notes: Control widgets should be reachable via keyboard and labeled (`aria-label`) for screen readers.
- Example frontmatter:
```
layout: archive
title: "All Projects"
show_filters: true
show_sort: true
show_pagination: true
```

docs.html
- USP: Documentation-focused layout with sidebar navigation, breadcrumb trails, and prev/next links.
- When to use: API docs, SDK guides, internal knowledge bases and developer docs.
- Key frontmatter: `search` (true to show search field), `nav_items` (array for sidebar), `breadcrumbs`, `prev`, `next`.
- Accessibility/notes: Sidebar should use semantic lists and use `aria-label` for navigation regions.
- Example frontmatter:
```
layout: docs
title: "API Reference"
search: true
```

faq.html
- USP: Concentrates FAQ interactions into a searchable, categorized list with accordion UI.
- When to use: Support pages, help centers, onboarding FAQ screens.
- Key frontmatter: `title`, `description`, `search`, `categories`, `contact_cta` (object with `text`/`url`/`description`).
- Accessibility/notes: Ensure accordion toggles use `aria-expanded` and keyboard interaction.
- Example frontmatter:
```
layout: faq
title: "Frequently Asked Questions"
search: true
categories: [General, Billing, Technical]
```

form.html
- USP: Purpose-built for multi-step or complex forms with a progress bar and step labels.
- When to use: Onboarding flows, multi-step signups, application forms and surveys.
- Key frontmatter: `show_progress` (true), `steps` (array), `help_text`, `privacy_link`.
- Accessibility/notes: Ensure each form step is properly described and errors are announced.
- Example frontmatter:
```
layout: form
title: "Sign Up"
show_progress: true
steps: ["Account", "Profile", "Confirm"]
```

search.html
- USP: Search-focused layout that exposes a main search bar, results count and faceted filters.
- When to use: Site search results, filtered directories, and discovery pages.
- Key frontmatter: `query`, `results_count`, `filters` (array of filter groups).
- Accessibility/notes: Use semantic form controls and label search input; update live region for results count if results change dynamically.
- Example frontmatter:
```
layout: search
title: "Search Results"
query: "agents"
```

gallery.html
- USP: Media-first grid layout ready for image galleries, masonry grids or lightbox viewers.
- When to use: Portfolios, media libraries, photo galleries.
- Key frontmatter: `title`, `description`, `categories` (for filters).
- Accessibility/notes: Provide meaningful `alt` text for images and keyboard-accessible lightbox controls.
- Example frontmatter:
```
layout: gallery
title: "Photo Gallery"
categories: [Events, Conferences]
```

landing.html
- USP: Conversion-optimized hero and CTA-focused template for marketing and campaign pages.
- When to use: Product landing pages, campaign microsites, event signups and promo pages.
- Key frontmatter: `hero` (object: `title`, `subtitle`, `cta`, `image`), `final_cta`.
- Accessibility/notes: Keep hero CTAs reachable and provide alternative content for media-rich hero sections.
- Example frontmatter:
```
layout: landing
hero:
	title: "Launch Event"
	subtitle: "Join us for the big reveal"
	cta:
		text: "Register"
		url: "/register"
```

dashboard.html
- USP: Compact application canvas for KPIs, widgets and in-page actions.
- When to use: Analytics dashboards, admin consoles, internal tooling pages.
- Key frontmatter: `title`, `actions` (array of action labels/buttons); widgets are added in page content.
- Accessibility/notes: Ensure dynamic widgets are reachable and use ARIA where content updates asynchronously.
- Example frontmatter:
```
layout: dashboard
title: "Team Dashboard"
actions: ["Export", "Refresh"]
```

settings.html
- USP: Tabbed settings layout with a left-hand navigation and save/cancel actions.
- When to use: User account settings, org settings, feature toggles pages.
- Key frontmatter: `tabs` (array of `{id, title, icon}`), `title`.
- Accessibility/notes: Tabs should be keyboard navigable and use `role="tablist"`/`role="tab"` semantics.
- Example frontmatter:
```
layout: settings
title: "Account Settings"
tabs:
	- id: profile
		title: Profile
	- id: security
		title: Security
```

chatroom.html
- USP: A placeholder for a `chatroom-app` web component with many configurable attributes passed from frontmatter.
- When to use: Real-time chat pages, threaded discussions or message boards that rely on a web component.
- Key frontmatter: `title`, `participants`, `show_avatar`, `avatar_url`, `placeholder`, `max_length`, `api_endpoint`, `auto_refresh`, `refresh_interval`, `show_toolbar`, `show_typing_indicator`, `show_connection_status`.
- Accessibility/notes: The embedded chat component must expose ARIA roles and keyboard handling; test with screen readers.
- Example frontmatter:
```
layout: chatroom
title: "Team Chat"
api_endpoint: "/api/chat"
auto_refresh: true
```

profile.html
- USP: Author or team profile layout that surfaces an image, bio, social links and optional stats/skills.
- When to use: Team pages, contributor bios, speaker profiles.
- Key frontmatter: `profile_image`, `name`, `role`, `bio`, `social_links` (array), `stats`, `skills`.
- Accessibility/notes: Provide `alt` text for `profile_image` and use semantic headings.
- Example frontmatter:
```
layout: profile
name: "Alex Smith"
role: "Product Manager"
profile_image: /assets/img/alex.jpg
```

minimal-base.html
- USP: Minimal wrapper with centered container for lightweight pages that need no extra chrome.
- When to use: Legal pages, minimalist landing scrims, simple notices.
- Key frontmatter: none special.
- Example frontmatter:
```
layout: minimal-base
title: "Legal"
```

minimal.html
- USP: Centered minimal layout layered on top of `minimal-base` for error/maintenance pages.
- When to use: 404, maintenance notices, simple splash/holding pages.
- Key frontmatter: `error_code`, `title`, `description`, `show_home_link`.
- Accessibility/notes: Keep contrast high and provide an obvious link back to home if appropriate.
- Example frontmatter:
```
layout: minimal
error_code: 404
title: "Page not found"
show_home_link: true
```

splash.html
- USP: Full-screen splash with optional countdown and email capture for launch or pre-release experiences.
- When to use: Coming-soon pages, teaser pages, event countdowns and email capture forms.
- Key frontmatter: `logo`, `title`, `subtitle`, `countdown` (object), `email_capture` (object with `button_text`), `social_links`.
- Accessibility/notes: Ensure countdown timers are announced or provide non-animated fallbacks for reduced-motion users.
- Example frontmatter:
```
layout: splash
title: "We're launching soon"
email_capture:
	button_text: "Notify Me"
```

Guidance & best practices
- Choose `default.html` as the canonical shell for pages that should look like the rest of the site. Use `app.html` when you prefer a lighter shell without additional page wrappers.
- For long-form content prefer `article.html` or `post.html` (depending on metadata needs). For documentation use `docs.html` to gain built-in sidebar and navigation.
- Use the `fixed-height.html` family when building dashboard-like pages where header/footer should remain visible while content scrolls.
- Keep frontmatter small and declarative — layouts read simple YAML keys to toggle functionality. When in doubt, inspect the corresponding layout file to see which variables it expects.

Related files
- Layout directory: [Website/theme.asisaga.com/_layouts](Website/theme.asisaga.com/_layouts)

Next steps
- Tell me which layout(s) you want example page files for and I will generate ready-to-use frontmatter plus a minimal content stub.
