// Wireframe2Code — bidirectional sync between blueprint JSON files and Figma nodes.
// Main thread: has access to the Figma document API.
// UI thread (ui.html): has access to browser APIs (FileReader, Blob, etc.).
//
// Genesis Design System integration: blueprints exported from theme.asisaga.com's
// _design/ directory carry a "figmaStyles" block computed from the ontological
// layout-variant by blueprint-sync-figma.sh. This file reads that block and applies
// fills, strokes, effects, corner-radius, opacity, and typography to every node
// on import. On export the figmaStyles are included in the JSON so that the
// round-trip _design/ → Figma → _design/ is lossless.

// ─── Constants ────────────────────────────────────────────────────────────────

const BLUEPRINT_SCHEMA = '../schema/blueprint.schema.json';
const DEFAULT_VERSION = '1.0.0';
const DEFAULT_FONT: FontName = { family: 'Inter', style: 'Regular' };

figma.showUI(__html__, { width: 340, height: 500 });

// ─── Types ────────────────────────────────────────────────────────────────────

type BlueprintNodeType = 'FRAME' | 'COMPONENT' | 'INSTANCE' | 'TEXT' | 'GROUP';
type LayoutModeValue = 'VERTICAL' | 'HORIZONTAL' | 'GRID' | 'NONE';

interface AsiSagaMetadata {
  'semantic-tag': string;
  'motion-intent': string;
  'layout-variant': string;
}

// ── Figma visual styles (computed by blueprint-sync-figma.sh) ─────────────────

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

// ── Core blueprint interfaces ─────────────────────────────────────────────────

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
  figmaStyles?: NodeFigmaStyles;  // Visual styles from Genesis ontological variant
}

interface BlueprintFile extends BlueprintNode {
  $schema: string;
  version: string;
  description?: string;
}

// ─── Spacing token ↔ pixel helpers ───────────────────────────────────────────

const SPACING_TOKENS: Record<string, number> = {
  'spacing-none': 0,
  'spacing-2xs': 2,
  'spacing-xs': 4,
  'spacing-sm': 8,
  'spacing-md': 16,
  'spacing-lg': 24,
  'spacing-xl': 32,
  'spacing-2xl': 48,
  'spacing-3xl': 64,
};

function resolveSpacingToken(token: string): number {
  return SPACING_TOKENS[token] ?? 0;
}

function pixelToSpacingToken(px: number): string {
  for (const [token, value] of Object.entries(SPACING_TOKENS)) {
    if (value === px) return token;
  }
  let best = 'spacing-none';
  let bestDiff = Infinity;
  for (const [token, value] of Object.entries(SPACING_TOKENS)) {
    const diff = Math.abs(value - px);
    if (diff < bestDiff) { bestDiff = diff; best = token; }
  }
  return best;
}

// ─── Node type helpers ────────────────────────────────────────────────────────

type ContainerNode = FrameNode | ComponentNode | GroupNode;

function isContainerNode(node: SceneNode): node is ContainerNode {
  return node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'GROUP';
}

function mapFigmaType(figmaType: string): BlueprintNodeType {
  switch (figmaType) {
    case 'FRAME':     return 'FRAME';
    case 'COMPONENT': return 'COMPONENT';
    case 'INSTANCE':  return 'INSTANCE';
    case 'TEXT':      return 'TEXT';
    case 'GROUP':     return 'GROUP';
    default:          return 'FRAME';
  }
}

function defaultAsiSaga(type: BlueprintNodeType): AsiSagaMetadata {
  return {
    'semantic-tag': type === 'TEXT' ? 'p' : 'div',
    'motion-intent': 'entry/fade-in',
    'layout-variant': 'entity/primary',
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '') || 'node';
}

// ─── Import: JSON → Figma ────────────────────────────────────────────────────

async function importBlueprint(blueprint: BlueprintFile): Promise<SceneNode> {
  const page = figma.currentPage;
  let rootNode = findByBlueprintId(page.children, blueprint.id);
  if (!rootNode) {
    rootNode = createFigmaNode(blueprint.type, page);
  }
  await applyBlueprintData(rootNode, blueprint);
  if (blueprint.children && isContainerNode(rootNode)) {
    await reconcileChildren(rootNode, blueprint.children);
  }
  return rootNode;
}

/** Find the first direct child whose blueprintId plugin-data matches `id`. */
function findByBlueprintId(
  nodes: readonly SceneNode[],
  id: string,
): SceneNode | null {
  for (const n of nodes) {
    if (n.getPluginData('blueprintId') === id) return n;
  }
  return null;
}

/** Create a new Figma node of the blueprint type and append it to `parent`. */
function createFigmaNode(
  type: BlueprintNodeType,
  parent: ChildrenMixin,
): SceneNode {
  let node: SceneNode;
  switch (type) {
    case 'TEXT':
      node = figma.createText();
      break;
    case 'COMPONENT':
      node = figma.createComponent();
      break;
    // INSTANCE and GROUP are represented as frames with blueprintType stored
    // in plugin data because Figma instances require a source component and
    // groups cannot be created empty.
    case 'FRAME':
    case 'INSTANCE':
    case 'GROUP':
    default:
      node = figma.createFrame();
      break;
  }
  parent.appendChild(node);
  return node;
}

/** Write all blueprint-node fields onto a Figma node. */
async function applyBlueprintData(
  node: SceneNode,
  data: BlueprintNode,
): Promise<void> {
  node.name = data.name;
  node.setPluginData('blueprintId', data.id);
  node.setPluginData('blueprintType', data.type);
  node.setPluginData('asiSaga', JSON.stringify(data.pluginData['asi-saga']));

  if (data.attributes !== undefined) {
    node.setPluginData('attributes', JSON.stringify(data.attributes));
  }
  if (data.content !== undefined) {
    node.setPluginData('blueprintContent', data.content);
  }
  if (data.ref !== undefined) {
    node.setPluginData('blueprintRef', data.ref);
  }

  // Auto-layout for frame / component nodes
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const frame = node as FrameNode;
    if (data.layoutMode === 'VERTICAL' || data.layoutMode === 'HORIZONTAL') {
      frame.layoutMode = data.layoutMode;
    } else if (data.layoutMode !== undefined) {
      frame.layoutMode = 'NONE';
    }
    if (data.itemSpacing) {
      node.setPluginData('itemSpacingToken', data.itemSpacing);
      frame.itemSpacing = resolveSpacingToken(data.itemSpacing);
    }
  }

  // Text content
  if (node.type === 'TEXT' && data.content) {
    await figma.loadFontAsync(DEFAULT_FONT);
    (node as TextNode).characters = data.content;
  }

  // Persist figmaStyles as plugin data for round-trip export fidelity
  if (data.figmaStyles !== undefined) {
    node.setPluginData('figmaStyles', JSON.stringify(data.figmaStyles));
  }

  // Apply Genesis visual styles to the Figma node
  if (data.figmaStyles) {
    await applyFigmaStyles(node, data.figmaStyles);
  }
}

/**
 * Apply figmaStyles from an enriched blueprint node to a Figma scene node.
 * Called after structural properties are set so it can override defaults.
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
          return {
            type: 'SOLID',
            color: paint.color,
            opacity: (paint as SolidPaint).opacity ?? 1,
          } as Paint;
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
      // Fallback to Inter Regular if the specified font is not available
      await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
      textNode.fontName = { family: 'Inter', style: 'Regular' };
    }

    if (typo.fontSize)      textNode.fontSize      = typo.fontSize;
    if (typo.fontWeight)    textNode.fontWeight    = typo.fontWeight;
    if (typo.lineHeight)    textNode.lineHeight    = typo.lineHeight as LineHeight;
    if (typo.letterSpacing) textNode.letterSpacing = typo.letterSpacing as LetterSpacing;
    if (typo.textTransform) textNode.textCase      = typo.textTransform as TextCase;

    if (typo.textColor && 'fills' in textNode) {
      textNode.fills = [{ type: 'SOLID', color: typo.textColor, opacity: 1 }];
    }
  }
}

/** Sync the Figma children of `parent` to match `childrenData`. */
async function reconcileChildren(
  parent: ContainerNode,
  childrenData: BlueprintNode[],
): Promise<void> {
  // Snapshot before we start mutating
  const existing = [...parent.children];
  const seenIds = new Set<string>();

  for (let i = 0; i < childrenData.length; i++) {
    const childData = childrenData[i];
    seenIds.add(childData.id);

    let childNode = findByBlueprintId(existing, childData.id);
    if (!childNode) {
      childNode = createFigmaNode(childData.type, parent);
    }
    parent.insertChild(i, childNode); // reorder to correct position
    await applyBlueprintData(childNode, childData);

    if (childData.children && isContainerNode(childNode)) {
      await reconcileChildren(childNode, childData.children);
    }
  }

  // Remove nodes whose blueprintIds are no longer present in the JSON
  for (const existingChild of existing) {
    const bpId = existingChild.getPluginData('blueprintId');
    if (bpId && !seenIds.has(bpId)) {
      existingChild.remove();
    }
  }
}

// ─── Export: Figma → JSON ────────────────────────────────────────────────────

function exportBlueprintFile(node: SceneNode): BlueprintFile {
  const nodeData = exportBlueprintNode(node);
  const description = node.getPluginData('blueprintDescription');
  const result: BlueprintFile = {
    $schema: BLUEPRINT_SCHEMA,
    version: node.getPluginData('blueprintVersion') || DEFAULT_VERSION,
    ...nodeData,
  };
  if (description) result.description = description;
  return result;
}

function exportBlueprintNode(node: SceneNode): BlueprintNode {
  const id = node.getPluginData('blueprintId') || slugify(node.name);
  const storedType = node.getPluginData('blueprintType');
  const type = (storedType || mapFigmaType(node.type)) as BlueprintNodeType;

  const asiSagaRaw = node.getPluginData('asiSaga');
  let asiSaga: AsiSagaMetadata;
  try {
    asiSaga = asiSagaRaw ? (JSON.parse(asiSagaRaw) as AsiSagaMetadata) : defaultAsiSaga(type);
  } catch {
    asiSaga = defaultAsiSaga(type);
  }

  const result: BlueprintNode = {
    id,
    name: node.name,
    type,
    pluginData: { 'asi-saga': asiSaga },
  };

  // Layout
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const frame = node as FrameNode;
    result.layoutMode = frame.layoutMode as LayoutModeValue;
    if (frame.layoutMode !== 'NONE') {
      const spacingToken = node.getPluginData('itemSpacingToken');
      result.itemSpacing = spacingToken || pixelToSpacingToken(frame.itemSpacing);
    }
  }

  // Text content
  if (node.type === 'TEXT') {
    const chars = (node as TextNode).characters;
    const stored = node.getPluginData('blueprintContent');
    const content = chars || stored;
    if (content) result.content = content;
  } else {
    const stored = node.getPluginData('blueprintContent');
    if (stored) result.content = stored;
  }

  // Attributes
  const attrRaw = node.getPluginData('attributes');
  if (attrRaw) {
    try {
      result.attributes = JSON.parse(attrRaw) as Record<string, string>;
    } catch { /* skip malformed data */ }
  }

  // Ref
  const ref = node.getPluginData('blueprintRef');
  if (ref) result.ref = ref;

  // figmaStyles — preserved from plugin data for round-trip fidelity
  // This ensures _design/ blueprints exported from Figma include the visual styles.
  const figmaStylesRaw = node.getPluginData('figmaStyles');
  if (figmaStylesRaw) {
    try {
      result.figmaStyles = JSON.parse(figmaStylesRaw) as NodeFigmaStyles;
    } catch { /* skip malformed data */ }
  }

  // Children
  if (isContainerNode(node) && node.children.length > 0) {
    result.children = node.children.map(child => exportBlueprintNode(child));
  }

  return result;
}

// ─── UI message handler ───────────────────────────────────────────────────────

figma.ui.onmessage = async (msg: { type: string; data?: unknown }) => {
  switch (msg.type) {
    case 'import': {
      try {
        const node = await importBlueprint(msg.data as BlueprintFile);
        figma.currentPage.selection = [node];
        figma.viewport.scrollAndZoomIntoView([node]);
        figma.ui.postMessage({
          type: 'import-success',
          name: (msg.data as BlueprintFile).name,
        });
      } catch (err) {
        figma.ui.postMessage({
          type: 'error',
          message: err instanceof Error ? err.message : String(err),
        });
      }
      break;
    }

    case 'export': {
      const sel = figma.currentPage.selection;
      if (sel.length === 0) {
        figma.ui.postMessage({ type: 'error', message: 'Select a node to export first.' });
        return;
      }
      try {
        const blueprint = exportBlueprintFile(sel[0]);
        figma.ui.postMessage({ type: 'export-success', data: blueprint });
      } catch (err) {
        figma.ui.postMessage({
          type: 'error',
          message: err instanceof Error ? err.message : String(err),
        });
      }
      break;
    }

    case 'close':
      figma.closePlugin();
      break;
  }
};
