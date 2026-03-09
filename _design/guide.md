# Website UI/UX Design Guide

*The actionable standard for building world-class websites — from first impression to conversion.*

---

## Part 1: First Impressions (The 5-Second Rule)

A visitor decides within 5 seconds whether to stay or leave. Every element above the fold must pass a single test: **"Can a stranger understand what this is and why it matters to them?"**

### 1.1 The Hero Section

**The Headline (H1)**

The H1 is your single most important sentence. Use the **Verb–Noun–Benefit** formula:

> "Automate [Task] using [Method] to save [Outcome]."

| ❌ Anti-pattern | ✅ Correct pattern |
|---|---|
| "The AI-driven synergy platform for tomorrow." | "Ship backend APIs in minutes, not weeks." |
| "Empowering teams with intelligent workflows." | "Cut support tickets by 40% using AI triage." |
| "Next-generation infrastructure for the cloud era." | "Deploy to 30 regions with a single CLI command." |

**The Sub-headline**

Directly below the H1, define the target audience with specificity:

> "Built for [Role] managing [Scale/Context]."

Example: *"Built for DevOps teams managing 100+ microservices."*

**The Hero Visual**

Choose the visual based on your product category:

- **SaaS / Tool:** Show the most impressive screen of your actual UI — a dashboard, a code diff, an output. Never use illustrations when a real screenshot is available.
- **Infrastructure / API:** Show a simple architecture diagram placing your product between the user and their data.
- **Consumer product:** Show the outcome, not the feature — a finished result, not a spinner.
- **Marketplace / Community:** Show real people or real content. Social proof as the hero image.

**The Primary CTA**

- One primary action. One.
- High-contrast button color — distinct from your background and body text.
- Label uses active verbs: "Start building", "Get started free", "Try it now".
- Place a **risk-reducer** directly beneath the button: *"No credit card required"* or *"Set up in 2 minutes"*.

---

## Part 2: Information Architecture

A page is a persuasion funnel. Visitors read in sections, not paragraphs. Structure content as a series of **trust-building modules** in this order:

### 2.1 The Modular Trust Flow

| # | Section | Purpose | Key Principle |
|---|---|---|---|
| 1 | **Header / Nav** | Orientation | Product · Pricing · Login. Hide "About Us" and "Careers" in the footer. |
| 2 | **Hero** | Value proposition | One sentence. One CTA. |
| 3 | **Social Proof (logos)** | Credibility signal | Show recognizable logos; include company size or stage if your audience cares. |
| 4 | **Testimonial / Quote** | Peer validation | Attribute to a *relevant peer* (e.g., a CTO quote if selling to CTOs). Avoid vague praise. |
| 5 | **How It Works** | De-risking | Exactly 3 steps. If it takes more than 3 steps to explain, the product is too complex. |
| 6 | **Feature Detail** | Depth for the interested | Use actual UI screenshots, not abstract icons. Every feature card needs a visual. |
| 7 | **Comparison / Differentiation** | Objection removal | Name the competitor. Show a feature matrix. Founders who avoid this create doubt. |
| 8 | **Pricing** | Commitment threshold | Always show a "Free" or "Starter" tier. Never hide pricing behind a "Contact Sales" wall at early stage. |
| 9 | **Footer CTA** | Last-chance conversion | Repeat the primary CTA. A visitor who scrolled to the footer is interested. |

### 2.2 Navigation Rules

- **Maximum 5 items** in the primary nav. Every item beyond 5 dilutes focus.
- **Sticky header** for pages longer than two viewports. Users should always be able to navigate without scrolling back.
- **No dropdowns on mobile.** Collapse to a single hamburger menu with a full-screen overlay.
- **Active state** is mandatory — users must always know where they are.
- Skip navigation link for accessibility (see Part 7).

### 2.3 Content Hierarchy

Apply the **F-pattern and Z-pattern** reading models:

- Place your most important content in the top-left and top-right corners.
- Left-align body text for reading. Center-align hero headlines only.
- Use progressive disclosure: summary first, detail on demand (expand/collapse or separate page).

---

## Part 3: Typography

Typography is the primary tool of clarity. Poor type choice is the fastest way to look amateurish.

### 3.1 Typeface Selection

| Use case | Recommended typefaces |
|---|---|
| Developer / technical tools | Inter, Geist, JetBrains Mono (for code), SF Pro |
| Consumer / brand-focused | Söhne, Canela, GT Walsheim, Instrument Serif (for contrast) |
| Neutral / enterprise | DM Sans, Neue Haas Grotesk, Helvetica Now |

**Rules:**
- Maximum **2 typefaces** per site: one for headings, one for body.
- Body text minimum **16px / 1rem**. Never go below 14px for any paragraph text.
- Line height for body: **1.5–1.7**. For headings: **1.0–1.2**.
- Line length (measure): **60–75 characters per line**. Use `max-width: 65ch` on prose containers.

### 3.2 Type Scale

Use a **modular scale** (ratio 1.25 or 1.333):

| Level | Usage | Size range |
|---|---|---|
| Display / Hero H1 | Page title, hero headline | 48–80px |
| H2 | Section heading | 32–48px |
| H3 | Subsection / card title | 24–32px |
| H4 | Label, feature title | 18–22px |
| Body | Paragraphs, descriptions | 16–18px |
| Small / Caption | Metadata, footnotes | 12–14px |

### 3.3 Fluid Typography

Scale type with the viewport using `clamp()`. Always wrap mixed viewport/root unit arithmetic inside `calc()` — required by both browsers and SCSS preprocessors:

```css
/* Hero headline: 48px on mobile → 80px on desktop */
font-size: clamp(3rem, calc(4vw + 1.5rem), 5rem);

/* Body: always readable */
font-size: clamp(1rem, calc(0.5vw + 0.875rem), 1.125rem);
```

> **SCSS note:** Never write `4vw + 1.5rem` outside of `calc()`. The Sass compiler rejects direct arithmetic between viewport units (`vw`, `vh`) and root-relative units (`rem`, `em`). Always use `calc()` as shown above.

---

## Part 4: Color System

### 4.1 Palette Architecture

Every site needs exactly **four color roles**:

| Role | Purpose | Count |
|---|---|---|
| **Background** | Page/surface base | 1–2 values (light + dark) |
| **Foreground** | Text and icons | 2–3 values (primary, secondary, muted) |
| **Brand / Accent** | CTAs, links, highlights | 1 primary + 1 hover state |
| **Semantic** | Status: success, warning, error, info | 4 values |

### 4.2 Contrast Requirements (WCAG AA minimum)

| Text type | Required contrast ratio |
|---|---|
| Normal body text (< 18px) | 4.5:1 |
| Large text (≥ 18px or bold ≥ 14px) | 3:1 |
| UI components and icons | 3:1 |

Use the **60-30-10 rule**: 60% neutral background, 30% secondary tone, 10% accent.

### 4.3 Dark Mode

For developer tools, dark mode is the default expectation, not a bonus feature.

- Dark background: `#0A0A0A` or `#111111` (true black creates harsh edges; use near-black).
- Foreground on dark: `#EDEDED` for primary, `#9E9E9E` for secondary.
- Never invert your brand color for dark mode — reduce its brightness instead.
- Test every state (hover, focus, disabled, error) in both light and dark.

---

## Part 5: Layout & Spacing

### 5.1 Grid System

- Use a **12-column grid** with consistent gutters (16–32px depending on breakpoint).
- Maximum content width: **1280px** for wide layouts, **800px** for prose.
- Section padding: minimum **80px vertical** on desktop, **48px** on mobile.

### 5.2 Spacing Scale

Use a **base-8 spacing system** (multiples of 8px):

`4 · 8 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128`

Never use arbitrary values like `13px` or `22px`. Consistency in spacing creates visual harmony.

### 5.3 Density Principles

| Context | Density rule |
|---|---|
| Marketing / landing pages | Generous spacing — white space is premium |
| Dashboards / tools | Compact — maximize information density |
| Mobile | Increase touch target size, not information density |

---

## Part 6: Interaction Design

### 6.1 Motion Principles

Motion should **communicate**, not decorate.

| ✅ Use motion for | ❌ Never use motion for |
|---|---|
| State changes (loading → loaded) | Entrance animations on every element |
| Transitions between views | Scroll-jacked animations |
| Drawing attention to new content | Fade-in text on scroll |
| Confirming a user action | Loops that play without user intent |

**The scroll-jacking rule:** Never take control of the user's scroll speed. Users who lose control of scrolling immediately feel distrust. All animations must be triggered by natural scroll position, never by controlling scroll velocity.

**Reduced motion:** Always implement `@media (prefers-reduced-motion: reduce)`. Remove all non-essential animations for users who request it.

### 6.2 Micro-interactions

Every interactive element must have a **visible state** for each condition:

| State | Visual indicator |
|---|---|
| Default | Base style |
| Hover | Color shift or underline (not just cursor change) |
| Focus | Visible outline (2px solid, offset 2px) — never remove |
| Active / Pressed | Scale down 2% or darken 10% |
| Disabled | 40% opacity, `cursor: not-allowed` |
| Loading | Spinner or skeleton, not blank space |
| Error | Red border + descriptive inline message |
| Success | Green confirmation + next-action prompt |

### 6.3 Forms

- Label above input, always. Never placeholder-only labels.
- **Inline validation:** Show errors as the user moves to the next field, not only on submit.
- Group related fields visually.
- Single-column forms convert better than multi-column on mobile.
- Submit button at the bottom, full-width on mobile.
- Password fields must have a show/hide toggle.

---

## Part 7: Accessibility

Accessibility is not optional. It is a quality signal, a legal requirement in many jurisdictions, and directly improves SEO and usability for all users.

### 7.1 Structural Requirements

- Every page has exactly **one `<h1>`**.
- Heading levels are sequential — never skip from `<h2>` to `<h4>`.
- Every page has a **skip-to-content link** as the first focusable element.
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`.
- Never nest landmark elements inside each other (`<nav>` inside `<nav>`).

### 7.2 Images and Media

- All `<img>` elements have an `alt` attribute.
- Decorative images use `alt=""`.
- Informational images use descriptive alt text (describe what the image communicates, not what it contains).
- Video must have captions. Auto-play video must be muted.

### 7.3 Keyboard Navigation

- Every interactive element is reachable by Tab key.
- Focus order follows the visual reading order.
- No keyboard traps.
- Modal dialogs trap focus inside while open; restore focus on close.
- Custom interactive components (dropdowns, sliders, tabs) implement the appropriate **ARIA pattern** from WAI-ARIA Authoring Practices.

### 7.4 Touch Targets

- Minimum touch target size: **44×44px** (WCAG 2.5.5).
- Spacing between adjacent touch targets: minimum **8px**.
- Never rely on hover states as the sole interaction on mobile.

---

## Part 8: Performance

Slow sites lose users and revenue. Performance is a design decision.

### 8.1 Core Web Vitals Targets

| Metric | Target | What it measures |
|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | How fast the main content appears |
| **INP** (Interaction to Next Paint) | ≤ 200ms | How fast the page responds to input |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | How much content unexpectedly shifts |

### 8.2 Image Optimization

- Use **WebP** for photographs, **SVG** for icons and illustrations.
- Specify explicit `width` and `height` attributes on every `<img>` to prevent layout shift.
- Use `loading="lazy"` for images below the fold.
- Use `fetchpriority="high"` on the hero image.
- Serve images at exactly the display size (responsive images with `srcset`).

### 8.3 Loading Strategy

- **Critical CSS** (above-the-fold styles) inlined in `<head>`.
- Non-critical JS loaded with `defer` or `async`.
- Third-party scripts (analytics, chat) loaded after first user interaction.
- Fonts: use `font-display: swap` and preload the primary typeface.

---

## Part 9: Mobile-First Design

Design for the smallest screen first. Expand outward.

### 9.1 Responsive Breakpoints

| Name | Width | Typical device |
|---|---|---|
| `xs` | 0–575px | Small phones |
| `sm` | 576–767px | Large phones |
| `md` | 768–991px | Tablets |
| `lg` | 992–1199px | Small laptops |
| `xl` | 1200–1399px | Desktops |
| `2xl` | 1400px+ | Large monitors |

### 9.2 Mobile-Specific Rules

- **Single column** as default. Add columns at larger breakpoints.
- Navigation collapses to a full-screen overlay or bottom sheet on mobile.
- Tables that can't be simplified become horizontally scrollable (never squish columns).
- Font sizes never below `1rem` on mobile.
- Avoid `position: fixed` elements that eat vertical space on mobile browsers.
- Test with real devices, not only browser emulation.

---

## Part 10: Content Strategy

Design without good content fails. Content strategy is part of UI/UX.

### 10.1 Voice and Tone

| Tone dimension | Principle |
|---|---|
| **Clarity** | If a 12-year-old can't understand the sentence, rewrite it. |
| **Confidence** | State benefits directly. Avoid hedging language ("may", "might", "could"). |
| **Specificity** | Replace vague claims with numbers. "Fast" → "Responds in < 200ms". |
| **Audience-first** | Write what the user gains, not what you built. |

### 10.2 Writing Formulas

**Hero headline:** `[Verb] [Noun] [Benefit]`
> "Automate compliance checks to ship faster."

**Feature description:** `[Feature name]. [What it does]. [Why it matters.]`
> "Parallel execution. Run 1,000 test suites simultaneously. Ship on Friday without waiting until Monday."

**Social proof:** `[Specific outcome] + [Attribution with role and company]`
> "Reduced deploy time from 45 minutes to 4." — Sarah Chen, CTO at Vercel

**CTA micro-copy:** Pair the button with a risk-reducer:
> [Start building free] *No credit card required. Cancel anytime.*

### 10.3 Error Messages

Error messages are UX. They are not edge cases.

| ❌ Bad | ✅ Good |
|---|---|
| "An error occurred." | "We couldn't save your changes. Check your internet connection and try again." |
| "Invalid input." | "Password must be at least 8 characters and include a number." |
| "403 Forbidden." | "You don't have access to this page. [Request access →]" |

---

## Part 11: Technical UX for Developer Audiences

When building for a technical audience (developers, DevOps, data engineers), apply the **Linear/Stripe standard**:

- **Code snippets in the hero.** Show a real API call or CLI command — it immediately signals "this is for people like me."
- **Dark mode by default.** It's not a feature for developer tools; it's the baseline expectation.
- **Keyboard shortcuts visible in the UI.** Show `Cmd+K`, `/`, or `?` in the interface. It signals a power-user tool, not a toy.
- **Performance as marketing.** If your product is fast, say exactly how fast: "Sub-200ms inference." Put this in the hero.
- **Docs quality = product quality.** Developer tools are judged by their documentation. Great docs are a conversion channel.
- **Copy-to-clipboard everywhere.** Code blocks, API keys, environment variables — every copyable value needs a one-click copy button.

---

## Part 12: Anti-Patterns

The following patterns are reliable signals that a site was built without user research or design expertise.

### 12.1 Copy Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| "Leverage synergies to empower workflows" | Meaningless — says nothing specific | Name the actual task and outcome |
| "We're on a mission to transform [industry]" | About you, not the user | "You get [outcome] in [timeframe]" |
| ✨ emoji to signal AI | Overused — reader immediately detects generic content | Show the AI's output, not the fact it uses AI |
| Three paragraphs before the point | Users scan, they don't read | Headline first, context second |

### 12.2 Visual Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Scroll-jacking (controlling scroll speed) | Users lose control — immediate trust loss | Standard scroll, use scroll-triggered class changes only |
| Text fade-in on every scroll | Slows down scanning; feels like a loading bug | Reserve entrance animations for truly important reveals |
| Generic stock photos of "smiling people at laptop" | Looks inauthentic — disconnects product from people | Use actual product screenshots or illustrated diagrams |
| More than 3 typefaces on a page | Visual noise — communicates inconsistency | Max 2 typefaces per site |
| Carousels / sliders for primary content | Most users never advance slides — content disappears | Display content statically or use tabs |
| Modals on page load | Blocks the user before they've seen anything | Never show a modal before 30 seconds of engagement |

### 12.3 Interaction Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Removing focus outlines (`outline: none`) | Makes site unusable for keyboard users | Use custom styled focus rings instead |
| Hover-only interactions on mobile | Hover doesn't exist on touchscreens | All functionality must be accessible via tap/click |
| Custom scroll containers with no visible scrollbar | Users don't know content is scrollable | Preserve or style native scrollbars |
| Infinite scroll with no way to return to position | Losing place on back navigation frustrates users | Add pagination or preserve scroll position in URL/state |
| Disabling browser back button behavior | Breaks the fundamental mental model of the web | Never intercept or disable history navigation |

---

## Part 13: The Design Review Checklist

Use this list before every launch and major update.

### First Impression (5 seconds)
- [ ] H1 uses Verb–Noun–Benefit structure
- [ ] Sub-headline defines the target audience specifically
- [ ] Hero visual shows the actual product output
- [ ] Primary CTA has one clear label with a risk-reducer below it
- [ ] Page explains itself without any prior context

### Information Architecture
- [ ] Navigation has 5 or fewer items
- [ ] Page follows the Modular Trust Flow sequence
- [ ] Pricing is visible without requiring "Contact Sales"
- [ ] Social proof includes role/company attribution, not just a name
- [ ] A "How it Works" section exists with exactly 3 steps

### Typography & Color
- [ ] Body text is ≥ 16px
- [ ] Line length ≤ 75 characters
- [ ] All text passes WCAG AA contrast (4.5:1 for body, 3:1 for large)
- [ ] No more than 2 typefaces used
- [ ] Color communicates meaning, not just decoration

### Interaction
- [ ] All interactive elements have hover, focus, active, and disabled states
- [ ] Focus rings are visible and clearly styled
- [ ] All forms have labels above inputs
- [ ] Form errors appear inline with descriptive messages
- [ ] No scroll-jacking or entrance animations on every element

### Accessibility
- [ ] One `<h1>` per page, sequential heading levels
- [ ] Skip-to-content link is first focusable element
- [ ] All images have `alt` attributes
- [ ] Entire interface is keyboard navigable
- [ ] Touch targets are ≥ 44×44px

### Performance
- [ ] LCP ≤ 2.5s (verified in Lighthouse or PageSpeed Insights)
- [ ] CLS ≤ 0.1
- [ ] Hero image uses `fetchpriority="high"` and explicit dimensions
- [ ] Fonts use `font-display: swap`
- [ ] No layout shift caused by late-loading images or fonts

### Mobile
- [ ] Tested on real devices at 375px and 768px
- [ ] No horizontal overflow at any breakpoint
- [ ] Navigation works without hover
- [ ] Form inputs are full-width and easy to tap

### Content
- [ ] No placeholder lorem ipsum text
- [ ] Error messages are descriptive and actionable
- [ ] All claims are specific (numbers, timeframes, names)
- [ ] CTAs use active verbs

---

*This guide synthesizes principles from leading design systems (Linear, Stripe, Vercel), YC Design Reviews, WCAG 2.2, and Core Web Vitals standards. Treat it as a living document — update it as standards evolve.*

**Version**: 1.0  
**Last Updated**: 2026-03-09
