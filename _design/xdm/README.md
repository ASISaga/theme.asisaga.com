# XDM (Experience Data Model) Schemas

This directory holds JSON Schema files that model Adobe Experience Platform (AEP) XDM types used by this theme.

## Files

| File | XDM Schema | Purpose |
|------|-----------|---------|
| `experience-event.schema.json` | `XDM ExperienceEvent` | Page views, clicks, form submissions |
| `individual-profile.schema.json` | `XDM Individual Profile` | User attributes, preferences |

## How to Use

1. Reference these schemas when building XDM event payloads in `assets/js/common/xdm.js`.
2. Use `individual-profile.schema.json` as the contract for profile data in `_layouts/settings.html` and `_layouts/profile.html`.
3. Validate event payloads against `experience-event.schema.json` during development.

## Relation to Other Design Artefacts

```
_design/
├── tokens.json                    # Visual design tokens (colors, spacing, typography)
├── schema/                        # Blueprint JSON schemas for _design/ tooling
└── xdm/                           # XDM data schemas for experience event tracking
```

XDM schemas live here (not in `_data/`) because they are **design-time contracts**, not runtime data files consumed by Jekyll.

## Further Reading

→ `docs/specifications/atomic-design-state-xdm-schema.md` § Part 3 — Experience Data Models (XDM)  
→ [Adobe XDM Reference](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html)
