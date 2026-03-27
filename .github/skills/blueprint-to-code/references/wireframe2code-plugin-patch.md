# Wireframe2Code Plugin Patch: Visual Style Application

**Repository**: https://github.com/ASISaga/Wireframe2Code  
**File to patch**: `code.ts`  
**Purpose**: Make the Figma plugin read and apply the `figmaStyles` field from enriched blueprint JSON nodes, so that visual properties (fills, strokes, shadows, typography) are rendered on the Figma canvas when importing a blueprint.

## Context

The `blueprint-sync-figma.sh` script enriches `_data/design/figma/` blueprints by injecting a `figmaStyles` object on every node. This object is derived from the Genesis ontological styles map and contains Figma API-compatible property values.

When the plugin imports a blueprint that contains `figmaStyles`, it must apply those values using the Figma scene API.

## Blueprint node shape after enrichment

```json
{
  "id": "chatroom-app",
  "name": "Chatroom App",
  "type": "FRAME",
  "pluginData": {
    "asi-saga": {
      "semantic-tag": "div",
      "motion-intent": "entry/fade-in",
      "layout-variant": "entity/primary"
    }
  },
  "layoutMode": "VERTICAL",
  "itemSpacing": "spacing-none",
  "figmaStyles": {
    "fills": [{ "type": "SOLID", "color": { "r": 0.988, "g": 0.988, "b": 0.973 }, "opacity": 1 }],
    "strokes": [{ "type": "SOLID", "color": { "r": 0.835, "g": 0.847, "b": 0.867 }, "opacity": 1 }],
    "strokeWeight": 1,
    "cornerRadius": 8,
    "effects": [
      { "type": "DROP_SHADOW", "color": { "r": 0.031, "g": 0.039, "b": 0.094, "a": 0.1 }, "offset": { "x": 0, "y": 1 }, "radius": 4, "spread": 0, "visible": true, "blendMode": "NORMAL" }
    ]
  }
}
```

---

## 1. Extend the `BlueprintNode` interface

Add `figmaStyles` as an optional field to the existing `BlueprintNode` interface:

```typescript
// ── Figma visual styles (injected by blueprint-sync-figma.sh) ────────────────

interface FigmaColor {
  r: number;  // 0–1
  g: number;
  b: number;
}

interface FigmaColorWithAlpha extends FigmaColor {
  a: number;
}

interface SolidPaint {
  type: 'SOLID';
  color: FigmaColor;
  opacity?: number;
}

interface GradientStop {
  color: FigmaColorWithAlpha;
  position: number;  // 0–1
}

interface GradientPaint {
  type: 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL';
  gradientStops: GradientStop[];
  gradientTransform: number[][];
}

type FigmaPaint = SolidPaint | GradientPaint;

interface FigmaDropShadowEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  color: FigmaColorWithAlpha;
  offset: { x: number; y: number };
  radius: number;
  spread: number;
  visible: boolean;
  blendMode: string;
}

interface FigmaLayerBlurEffect {
  type: 'LAYER_BLUR';
  radius: number;
  visible: boolean;
}

type FigmaEffect = FigmaDropShadowEffect | FigmaLayerBlurEffect;

interface FigmaTypography {
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: { value: number; unit: 'PERCENT' | 'PIXELS' | 'AUTO' };
  letterSpacing?: { value: number; unit: 'PERCENT' | 'PIXELS' };
  textColor?: FigmaColor;
  textTransform?: 'UPPER' | 'LOWER' | 'TITLE' | 'ORIGINAL';
  fontFamily?: string;
  fontStyle?: string;
}

interface FigmaLayoutHint {
  layoutMode?: 'VERTICAL' | 'HORIZONTAL' | 'NONE';
  primaryAxisSizingMode?: 'AUTO' | 'FIXED';
  counterAxisSizingMode?: 'AUTO' | 'FIXED';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  maxWidth?: number;
}

interface NodeFigmaStyles {
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  strokeWeight?: number;
  cornerRadius?: number;
  opacity?: number;
  effects?: FigmaEffect[];
  typography?: FigmaTypography;
  layoutHint?: FigmaLayoutHint;
  clipsContent?: boolean;
}

// ── Updated BlueprintNode interface ──────────────────────────────────────────

interface BlueprintNode {
  id: string;
  name: string;
  type: BlueprintNodeType;
  pluginData: { 'asi-saga': AsiSagaMetadata };
  layoutMode?: LayoutModeValue;
  itemSpacing?: string;
  content?: string;
  attributes?: Record<string, string>;
  ref?: string;
  children?: BlueprintNode[];
  figmaStyles?: NodeFigmaStyles;  // ← NEW: injected by blueprint-sync-figma.sh
}
```

---

## 2. Add `applyFigmaStyles` helper function

Add this helper after `applyBlueprintData`:

```typescript
/**
 * Apply figmaStyles from an enriched blueprint node to a Figma scene node.
 * Called after applyBlueprintData so it can override defaults set there.
 */
async function applyFigmaStyles(
  node: SceneNode,
  styles: NodeFigmaStyles,
): Promise<void> {
  // ── Fills ─────────────────────────────────────────────────────────────────
  if (styles.fills !== undefined && node.type !== 'TEXT') {
    if ('fills' in node) {
      (node as GeometryMixin).fills = styles.fills.map(paint => {
        if (paint.type === 'SOLID') {
          const p: SolidPaint = {
            type: 'SOLID',
            color: paint.color,
            opacity: (paint as SolidPaint).opacity ?? 1,
          };
          return p as Paint;
        }
        if (paint.type === 'GRADIENT_LINEAR' || paint.type === 'GRADIENT_RADIAL') {
          const gp = paint as GradientPaint;
          return {
            type: paint.type,
            gradientTransform: gp.gradientTransform as Transform,
            gradientStops: gp.gradientStops.map(stop => ({
              color: stop.color,
              position: stop.position,
            })),
          } as Paint;
        }
        return paint as unknown as Paint;
      });
    }
  }

  // ── Strokes ───────────────────────────────────────────────────────────────
  if (styles.strokes !== undefined && 'strokes' in node) {
    (node as GeometryMixin).strokes = styles.strokes.map(paint => ({
      type: 'SOLID',
      color: (paint as SolidPaint).color,
      opacity: (paint as SolidPaint).opacity ?? 1,
    })) as Paint[];

    if (styles.strokeWeight !== undefined && 'strokeWeight' in node) {
      (node as GeometryMixin).strokeWeight = styles.strokeWeight;
    }
  }

  // ── Corner radius ─────────────────────────────────────────────────────────
  if (styles.cornerRadius !== undefined && node.type === 'FRAME') {
    (node as FrameNode).cornerRadius = styles.cornerRadius;
  }

  // ── Opacity ───────────────────────────────────────────────────────────────
  if (styles.opacity !== undefined && 'opacity' in node) {
    (node as BlendMixin).opacity = styles.opacity;
  }

  // ── Effects ───────────────────────────────────────────────────────────────
  if (styles.effects !== undefined && 'effects' in node) {
    (node as BlendMixin).effects = styles.effects.map(effect => {
      if (effect.type === 'LAYER_BLUR') {
        return {
          type: 'LAYER_BLUR',
          radius: effect.radius,
          visible: effect.visible,
        } as Effect;
      }
      // DROP_SHADOW / INNER_SHADOW
      const se = effect as FigmaDropShadowEffect;
      return {
        type: se.type === 'INNER_SHADOW' ? 'INNER_SHADOW' : 'DROP_SHADOW',
        color: se.color,
        offset: se.offset,
        radius: se.radius,
        spread: se.spread,
        visible: se.visible,
        blendMode: se.blendMode as BlendMode,
      } as Effect;
    });
  }

  // ── clipsContent ─────────────────────────────────────────────────────────
  if (styles.clipsContent !== undefined && node.type === 'FRAME') {
    (node as FrameNode).clipsContent = styles.clipsContent;
  }

  // ── AutoLayout hints from environment variants ────────────────────────────
  if (styles.layoutHint && node.type === 'FRAME') {
    const frame = node as FrameNode;
    const hint  = styles.layoutHint;
    if (hint.layoutMode) {
      frame.layoutMode = hint.layoutMode;
    }
    if (hint.primaryAxisSizingMode) {
      frame.primaryAxisSizingMode = hint.primaryAxisSizingMode as 'AUTO' | 'FIXED';
    }
    if (hint.counterAxisSizingMode) {
      frame.counterAxisSizingMode = hint.counterAxisSizingMode as 'AUTO' | 'FIXED';
    }
    if (hint.layoutWrap && 'layoutWrap' in frame) {
      (frame as FrameNode & { layoutWrap: string }).layoutWrap = hint.layoutWrap;
    }
  }

  // ── Typography ────────────────────────────────────────────────────────────
  if (styles.typography && node.type === 'TEXT') {
    const textNode = node as TextNode;
    const typo     = styles.typography;

    const fontName: FontName = {
      family: typo.fontFamily ?? 'Inter',
      style:  typo.fontStyle  ?? 'Regular',
    };
    try {
      await figma.loadFontAsync(fontName);
      textNode.fontName = fontName;
    } catch {
      // Fallback to Inter Regular if font not available
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      textNode.fontName = { family: 'Inter', style: 'Regular' };
    }

    if (typo.fontSize)     textNode.fontSize     = typo.fontSize;
    if (typo.fontWeight)   textNode.fontWeight   = typo.fontWeight;
    if (typo.lineHeight)   textNode.lineHeight   = typo.lineHeight as LineHeight;
    if (typo.letterSpacing) textNode.letterSpacing = typo.letterSpacing as LetterSpacing;
    if (typo.textTransform) textNode.textCase     = typo.textTransform as TextCase;

    if (typo.textColor && 'fills' in textNode) {
      textNode.fills = [{ type: 'SOLID', color: typo.textColor, opacity: 1 }];
    }
  }
}
```

---

## 3. Call `applyFigmaStyles` inside `applyBlueprintData`

At the end of the existing `applyBlueprintData` function, add a call to the new helper:

```typescript
async function applyBlueprintData(
  node: SceneNode,
  data: BlueprintNode,
): Promise<void> {
  // ... existing code unchanged ...

  // ── Apply figmaStyles if present (visual enrichment from blueprint-sync-figma.sh) ──
  if (data.figmaStyles) {
    await applyFigmaStyles(node, data.figmaStyles);
  }
}
```

---

## 4. Export: preserve `figmaStyles` round-trip

In `exportBlueprintNode`, preserve the `figmaStyles` field if it is already stored as plugin data, so the export → import round-trip is lossless:

```typescript
function exportBlueprintNode(node: SceneNode): BlueprintNode {
  // ... existing code ...

  // Preserve figmaStyles for round-trip fidelity
  const figmaStylesRaw = node.getPluginData('figmaStyles');
  if (figmaStylesRaw) {
    try {
      result.figmaStyles = JSON.parse(figmaStylesRaw) as NodeFigmaStyles;
    } catch { /* skip malformed data */ }
  }

  return result;
}
```

And in `applyBlueprintData`, store `figmaStyles` as plugin data so the export can retrieve it:

```typescript
if (data.figmaStyles !== undefined) {
  node.setPluginData('figmaStyles', JSON.stringify(data.figmaStyles));
}
```

---

## Testing the patch

1. Run the enrichment script to produce Figma-ready blueprints:
   ```bash
   .github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh
   ```
2. Open the plugin in Figma (`Plugins → Wireframe2Code`).
3. Copy the contents of `_data/design/figma/layouts/chatroom.json` and paste into the import field.
4. Click **Import**. Each frame should now display fills, borders, and shadows matching the Genesis design system.
5. Select any imported node and click **Export** — the exported JSON should include `figmaStyles`.

---

## Related files

- **Styles map**: `.github/skills/blueprint-to-code/references/figma-styles-map.json`  
- **Enrichment script**: `.github/skills/blueprint-to-code/scripts/blueprint-sync-figma.sh`  
- **Skill**: `.github/skills/blueprint-to-code/SKILL.md`  
- **Blueprint spec**: `.github/skills/blueprint-designer/references/BLUEPRINT-SPEC.md`
