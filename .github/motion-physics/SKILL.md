---
name: motion-physics-orchestrator
description: Translates W3C DTCG tokens and Figma layout intents into high-performance Vanilla Motion (WAAPI) implementations. Use this for chat bubbles, thread transitions, and UI state changes.
---

# Motion Physics Orchestrator (v1.1.0)

## 1. Intent Detection (The Handshake)
Instead of manual mapping, use **Ontological Inference** from the Figma JSON keys to determine the motion path:
- **SENT_INTENT:** Identified by `layoutAlign: "MAX"` or `name: "*Sent*"`. 
  - *Action:* Originate from Right (+X), Spring: `tokens.motion.spring.snappy`.
- **RECEIVED_INTENT:** Identified by `layoutAlign: "MIN"` or `name: "*Received*"`. 
  - *Action:* Originate from Left (-X), Spring: `tokens.motion.spring.natural`.
- **SYSTEM_INTENT:** Identified by `layoutAlign: "CENTER"`.
  - *Action:* Scale/Fade from Center, Spring: `tokens.motion.spring.soft`.

## 2. Token Synchronization (The DNA)
- **Source of Truth:** All constants MUST be pulled from `_data/tokens.yml`.
- **Forbidden:** Never use hardcoded `duration`, `stiffness`, or `damping` in JS files.
- **Spring Mapping:** - If token `$type` is `motion`, map `$value` keys (stiffness, damping, mass) directly to the `animate()` options object.

## 3. Implementation Protocol (The Nervous System)
Maintain `assets/js/common/motion-init.js` as a global observer:
1. **Observer:** Use `IntersectionObserver` to trigger animations only when nodes enter the viewport.
2. **Execution:** - Extract config from HTML `data-motion-intent`.
   - Call the Vanilla `motion` library: `animate(element, { opacity: [0, 1], x: [offset, 0] }, physicsConfig)`.
3. **Performance:** Prioritize **WAAPI** (Web Animations API) for opacity and transforms to keep the main thread clear for ASI logic.

## 4. Incorruptibility Rules
- **Rule 1:** If a requested animation does not have a corresponding token in `tokens.json`, fail the build and alert the user.
- **Rule 2:** All motion must respect the `prefers-reduced-motion` media query.
- **Rule 3:** No external animation frameworks (GSAP, Framer Motion React) are permitted. Vanilla `motion` only.
