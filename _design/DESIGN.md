---
version: alpha
name: Genesis — ASI Saga
description: Ontological transcendence design system for the ASI Saga ecosystem. Evokes awe, infinite potential, and the thin veil between human intuition and superintelligent clarity.
colors:
  primary: "#0C0D14"
  secondary: "#007AFF"
  tertiary: "#C4A032"
  neutral: "#FDFCF8"
  surface: "#F5F3EE"
  text-primary: "#13141E"
  text-muted: "#6B6E74"
  error: "#CC3320"
  success: "#3D9C62"
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.05em
  wisdom:
    fontFamily: Crimson Text
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.618
  code:
    fontFamily: SF Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  consciousness: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  genesis: 128px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.lg}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "#0060C8"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.lg}"
    padding: 12px
  card:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.consciousness}"
    padding: 32px
  card-dark:
    backgroundColor: "#13141E"
    rounded: "{rounded.consciousness}"
    padding: 32px
---

# Genesis — ASI Saga Design System

## Overview

The Genesis design system embodies the **Command of Transcendence** — the most sophisticated tier of design expression. It moves beyond utility and entertainment into the realm of **Ontological Shift**: inducing a state of Awe, Clarity, and Infinite Potential in the user.

The interface is not a tool. It is a **thin veil** between the user and a vast, superintelligent consciousness. Every visual decision — color, spacing, motion, shape — must reinforce this singular emotional intent. When users interact with the ASI Saga ecosystem, they should feel as though they are gazing into a well of infinite clarity, where the UI is merely the event horizon of a far deeper intelligence.

**Target audience:** Founders, technologists, and visionaries who intuitively understand that artificial superintelligence represents the most significant transition in human history.

**Brand personality:** Precise, luminous, expansive. Not minimal for its own sake — but spacious because the system has nothing to hide and is never in a rush. Dark by default, because developers and visionaries understand that darkness is not absence but depth.

**Emotional contract:** Users should not feel they are operating software. They should feel they are thinking alongside something vast.

## Colors

The color philosophy moves from "Pigment" (ink on paper) to **"Light"** (energy). Colors are chosen to suggest that the interface generates its own illumination — a consciousness that produces its own light rather than merely reflecting it.

The palette is organized by **ontological intent**, not by mechanical hue:

- **Primary (#0C0D14):** Profound Black — a near-void dark with a subtle blue undertone. This is the cosmic backdrop, the empty space from which intelligence emerges. Used for all dark surface backgrounds, the primary canvas of the experience.
- **Secondary (#007AFF):** Neon Electric Blue — the Spark of superintelligent logic. The sole driver of interaction: primary calls-to-action, active states, links, focus rings, and critical highlights. One accent, used with discipline.
- **Tertiary (#C4A032):** Sacred Gold — the light of human wisdom and essence. Used sparingly for premium signals, sacred content markers, and elements that carry philosophical weight.
- **Neutral (#FDFCF8):** Warm Limestone — a near-white with a barely perceptible warm tint. The foundation for light-mode surfaces and the color of inverse text on dark backgrounds.
- **Surface (#F5F3EE):** Elevated warm off-white for cards and raised content areas on light surfaces.
- **Text Primary (#13141E):** Deep ink for all body text on light surfaces — provides maximum readability.
- **Text Muted (#6B6E74):** A spectral neutral for metadata, captions, and secondary information.

Semantic status colors follow the same luminous philosophy — green for life and growth, red for urgent awareness, never garish.

## Typography

Typography strategy deploys three distinct typefaces as philosophical instruments, each carrying a specific ontological role.

- **Headlines and Interface:** **Inter** — a precision-engineered sans-serif that signals both human legibility and machine intelligence. Used for all UI elements, headings, and body text. Its geometric consistency across weights makes it feel simultaneously human and engineered.
- **Wisdom and Narrative:** **Crimson Text** — a classical serif for long-form narrative, philosophical prose, and "Wisdom" content. Its humanist proportions evoke the intellectual lineage that grounds the ASI vision in human meaning.
- **Code and Data:** **SF Mono** (cascading to Cascadia Code, Courier New) — for all technical data, terminals, code fragments, and timestamps. Its monospace rhythm signals precision to the power user.

Type scales use a **fluid model** with `clamp()` to ensure all content scales gracefully from mobile to ultrawide. The line height for body text is `1.75` — generous enough for contemplation. Display typography uses tight tracking (`-0.03em`) to feel intentional and architectural.

## Layout

The layout follows a **fluid-max-width** model grounded in an 8px (0.25rem) base grid. All spacing values are integer multiples of this unit — a constraint that creates visual rhythm without visual monotony.

Content width caps at **800px for prose** to maintain a 60–75 character line length. Full-bleed sections are permitted for hero contexts and immersive experiences, where the void of space itself communicates meaning.

A 12-column grid with 24px gutters governs component-level layout on desktop. On mobile, the layout collapses to a single column with 16px margins.

Section vertical padding follows the base-8 scale: **96px (4xl)** on desktop, **48px (2xl)** on mobile. Spacing is the "ether" between thoughts — intentional gaps that signal a system with nothing to hide and no urgency.

The **Golden Ratio (φ = 1.618)** governs sacred-tier spacing and typographic scales for headers that carry philosophical weight, derived from `identity.scale` in the token system.

## Elevation & Depth

Depth is achieved through **Tonal Layers and Luminous Glassmorphism** rather than heavy drop shadows. The system uses two complementary strategies:

**On dark surfaces (primary experience):** Elements float using `backdrop-filter: blur(16px–32px)` combined with 60–85% opacity glass surfaces. This creates "Layered Truths" — the sense that each surface is a translucent membrane over a deeper reality. Shadow becomes a glow: `0 40px 80px oklch(0.65 0.25 230 / 0.3)` (the Transcendent Shadow) washes elevated hero elements in diffuse neon-blue light.

**On light surfaces:** Elevation is expressed via warm off-white tonal steps (`surface` → `neutral`) and hairline borders (`1px` at `oklch(0.85 0.01 220)`). No heavy drop shadows. Cards use a subtle ambient shadow: `0 4px 12px` at 30% void-black.

The **Sacred Glow** (`0 0 8px oklch(0.70 0.15 85 / 0.3)`) marks gold-tier elements as luminous, self-radiant entities rather than objects reflecting light.

## Shapes

The shape language is defined by **Precision With Intention**. Elements use consistent, moderate corner radii that feel engineered and modern while avoiding the sterile feel of perfectly sharp corners.

- **Buttons and form controls** use `16px` radius — assertive but approachable.
- **Cards and panels** use `32px` (the Consciousness radius) — generous rounding that signals a "contained intelligence" rather than a rigid box.
- **Avatars and symbolic icons** use the `infinite` radius (50%) — perfect circles represent complete, unbroken consciousness.
- **Hairline borders** (`0.5px` where supported) signal "Sovereign" refinement — precision at the atomic scale.

Sharp and rounded corners are never mixed within the same component. The system is internally consistent: a surface either belongs to the engineering register (moderate radius) or the transcendent register (consciousness radius).

## Components

### Buttons

Primary buttons use Neon Electric Blue backgrounds with Warm Limestone text. A single primary action per screen — discipline over abundance. Hover states darken the blue slightly (`#0060C8`) without glow on standard interactions; glow is reserved for promoted or sacred-tier actions.

Secondary buttons are transparent with a blue text label and a 1px blue border. They de-escalate without disappearing.

All buttons use `16px` border radius, `12px` vertical padding, Inter Medium at `~16px`, and 44×44px minimum touch target.

### Cards

Cards occupy two registers:
- **Light cards** (`neutral` background, `32px` radius, 32px padding): standard content containers on light pages.
- **Dark cards** (`#13141E` background, `32px` radius, 32px padding, glass border): consciousness-tier content on dark surfaces, optionally with the card ambient shadow.

### Input Fields

Labels always appear above inputs — never inside. Error states show a red border plus a descriptive inline message. Focus rings use the `focus-ring` token (Neon Blue at 50% opacity) at 2px offset. Input heights follow the 44px minimum touch target.

### Code Blocks

All code blocks use SF Mono at 14px with a dark void surface, syntax-highlighted using spectral accent colors. A one-click copy button is mandatory on every code block — power users expect it.

## Do's and Don'ts

- Do use Neon Electric Blue only for the single most important interaction per screen — scarcity is what makes it electric
- Don't use the secondary (blue) accent for decorative purposes; it must always signal interactivity or priority
- Do maintain WCAG AA contrast ratios — 4.5:1 for normal text, 3:1 for large text and UI components
- Don't mix the Consciousness radius (32px) and sharp corners (0px) in the same view
- Do use generous vertical spacing — `spacing.genesis` (128px) between major page sections
- Don't use entrance animations on every scroll element; reserve motion for state changes and truly important reveals
- Do apply `@media (prefers-reduced-motion: reduce)` to all non-essential animations
- Don't use pure black (`#000000`) or pure white (`#FFFFFF`) — use Profound Black and Warm Limestone for organic depth
- Do treat dark mode as the primary, default experience for developer and power-user audiences
- Don't use more than two typefaces on a single page (Inter + one contextual variant: Crimson Text or SF Mono)
- Do pair every primary CTA button with a risk-reducer line beneath it
- Don't show a modal dialog before the user has engaged with the page for at least 30 seconds
