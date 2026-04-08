# theme.asisaga.com — Chatroom Component for Boardroom (Dual-Mode)

## Objective

Extend the `<chatroom>` Web Component to support the dual-mode boardroom
interface: rendering both structured workflow payloads (step-by-step
narratives with actions and navigation) and dynamic discussion messages
(free-form CXO debates with MCP app graphical UI elements).

In addition, provide a `<workflow-editor>` Web Component that enables
authorised users to configure any registered workflow file through a
step-wise, form-based interface — without writing raw YAML.

## Context

The `<chatroom>` component is the universal rendering layer for the
boardroom.  It handles:
- Text messages (standard chat bubbles) for dynamic discussions
- MCP app payloads (`boardroom_ui`) for structured workflow steps
- Any graphical UI elements sent via MCP app payloads (charts, forms, etc.)

The `<workflow-editor>` component is the step-wise configuration surface for
workflow YAML files.  It communicates directly with the `workflow-editor-*`
endpoints provided by the `business-infinity` backend and renders each
workflow step as a structured form — not a free-text editor.

Both components must work identically regardless of which workflow is active
or whether the session is a dynamic discussion.

## Requirements

### 1. MCP App Payload Handler

Add a handler for `mcp_app` payloads with `app_id: "boardroom_ui"` that
extracts:
- `narrative` — displayed as the primary agent message bubble
- `response` — displayed as the agent response bubble
- `actions[]` — array of `{label, description, url}` rendered as action buttons
- `navigation` — `{next, back}` step IDs rendered as navigation buttons

### 2. Generic MCP App Rendering

Support rendering any MCP app payload beyond `boardroom_ui`:
- Extensible handler registry for different `app_id` values
- Default renderer for unknown app IDs (display as formatted JSON)
- Support for graphical UI elements (charts, dashboards, forms) as they
  are added to the system

### 3. Shoelace Action Buttons

For each action in the payload:
```html
<small>{description}</small>
<sl-button variant="primary">{label}</sl-button>
```
On click, execute `window.open(url, '_blank')`.

### 4. Navigation Controls

Render navigation buttons when `next` or `back` step IDs are present:
```html
<sl-button variant="default" @click="sendCommand('cmd:back')">Back</sl-button>
<sl-button variant="default" @click="sendCommand('cmd:next')">Next</sl-button>
```

Navigation sends text commands through the chat stream to AOS, which routes
them to the active `workflow-orchestration` instance.

### 5. Step Progress Indicator

Accept `step_id` and `total_steps` attributes and render a progress indicator
(e.g. step dots or "3 of 9") within the chatroom header.  Hide when not in
structured workflow mode.

### 6. Owner Agent Display

Accept an `owner` attribute and display the workflow owner's name/role in
the chat header (e.g. "CMO — David Ogilvy").  Show "Boardroom" when no
owner is set (dynamic discussion mode).

### 7. Conversation Replay

On reconnect, replay the full conversation from `subconscious.asisaga.com`:
- Render text messages as chat bubbles
- Render MCP app payloads using the appropriate handler
- Restore scroll position and step state

### 8. Boardroom Theme Variant

Expose a `theme="boardroom"` attribute that applies:
- Formal typography (serif headings, system sans-serif body)
- Dark gradient background
- Brand accent colours
- Reduced border radii
- Smooth step transition animations

### 9. Workflow Editor Component (`<workflow-editor>`)

Provide a `<workflow-editor>` Web Component that renders a step-wise,
form-based interface for configuring workflow YAML files.  The component
communicates with the `business-infinity` backend and presents each step
as a structured form — not a raw text editor.

#### 9.1 Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `api-endpoint` | string | Base URL of the `business-infinity` API (e.g. `https://business-infinity.azurewebsites.net/api/workflows`) |
| `access-token` | string | Google Identity Services JWT for authenticated requests |

#### 9.2 Initialisation

On connect, the component calls `{api-endpoint}/workflow-editor-list` and
renders a workflow selection panel.

#### 9.3 Workflow Selection Panel

A list of workflow cards, one per registered workflow, each showing:
- Workflow ID
- Owner agent (e.g. "Founder", "CMO")
- Total step count

Clicking a card calls `{api-endpoint}/workflow-editor-get` with
`{"workflow_id": "…"}` and loads the step editor panel.

#### 9.4 Step Editor Layout

A two-panel layout within the component:

**Step List (left panel)**
- Ordered list of all step IDs for the loaded workflow.
- Steps are reorderable by drag-and-drop (use the HTML Drag and Drop API
  or a Shoelace-compatible library).
- An `<sl-button variant="default" size="small">+ Add Step</sl-button>`
  appends a blank step with a generated ID.
- Each step row has a `<sl-icon-button name="trash">` delete icon.
- The currently selected step is highlighted.

**Step Form (right panel)**
Renders the fields of the currently selected step.  The template below uses
framework-agnostic pseudo-code (`*for`, `{binding}`) to illustrate the
required structure; use whichever templating mechanism the component library
adopts (e.g. Lit `html`, reactive properties, or plain DOM manipulation):

```html
<!-- Step ID -->
<sl-input label="Step ID" [readonly for existing steps] value="{step_id}">
</sl-input>

<!-- Narrative -->
<sl-textarea label="Narrative" rows="4" value="{step.narrative}">
</sl-textarea>

<!-- Response -->
<sl-textarea label="Response" rows="4" value="{step.response}">
</sl-textarea>

<!-- Actions (repeating group) -->
<section class="wf-actions">
  <header>
    Actions
    <sl-button variant="default" size="small" @click="addAction()">+ Add Action</sl-button>
  </header>
  <!-- One group per action — iterate over step.actions -->
  <div class="wf-action-row">
    <sl-input label="Label"       value="{action.label}"></sl-input>
    <sl-input label="Description" value="{action.description}"></sl-input>
    <sl-input label="URL"         value="{action.url}"></sl-input>
    <sl-icon-button name="trash"  @click="removeAction(index)"></sl-icon-button>
  </div>
</section>

<!-- Navigation -->
<section class="wf-navigation">
  <sl-select label="Next step" value="{step.navigation.next}">
    <sl-option value="">— none —</sl-option>
    <!-- Populate with current step IDs -->
    <sl-option value="{id}">{id}</sl-option>
  </sl-select>
  <sl-select label="Back step" value="{step.navigation.back}">
    <sl-option value="">— none —</sl-option>
    <sl-option value="{id}">{id}</sl-option>
  </sl-select>
</section>
```

#### 9.5 Save and Validation

A `<sl-button variant="primary">Save Workflow</sl-button>` at the top of
the step editor.  On click:

1. **Client-side validation** — For every step, check that `narrative`,
   `response`, and `actions` are present.  Highlight invalid steps in the
   step list with a warning icon.
2. If valid, POST the complete workflow structure to
   `{api-endpoint}/workflow-editor-save`.
3. Display a `<sl-alert variant="success">` on success or
   `<sl-alert variant="danger">` on failure, with the error message from the
   backend.

#### 9.6 Workflow Metadata Fields

Above the step list, render:

```html
<sl-input label="Workflow ID" readonly value="{workflow_id}"></sl-input>
<sl-input label="Version"     value="{version}"></sl-input>
<sl-select label="Owner">
  <sl-option value="founder">Founder</sl-option>
  <sl-option value="coo">COO</sl-option>
  <sl-option value="cmo">CMO</sl-option>
  <sl-option value="ceo">CEO</sl-option>
</sl-select>
```

#### 9.7 CSS Custom Properties

Expose the following CSS custom properties for host-level theming:

| Property | Default | Description |
|----------|---------|-------------|
| `--wfe-sidebar-width` | `260px` | Width of the step list panel |
| `--wfe-form-gap` | `1rem` | Gap between form fields |
| `--wfe-accent` | `var(--sl-color-primary-600)` | Highlight colour for selected step |

#### 9.8 Accessibility

- All form fields must have visible labels (via `sl-input`/`sl-textarea`
  `label` attribute, which renders a `<label>` inside the Shadow DOM).
- The step list must be keyboard-navigable (arrow keys move selection,
  `Enter` opens the step form, `Delete` removes the step after confirmation).
- The save button must be disabled while a save request is in flight and
  announce its state via `aria-busy`.

## Dependencies

- `@modelcontextprotocol/sdk` — SSE client transport for MCP payloads
- Shoelace — UI components (`sl-button`, `sl-input`, `sl-textarea`,
  `sl-select`, `sl-option`, `sl-alert`, `sl-icon-button`, `sl-progress-bar`)

## References

→ **Frontend prompt**: `docs/workflow/prompts/frontend.md`
→ **Workflow YAML samples**: `docs/workflow/samples/`
→ **Boardroom schema**: `docs/workflow/boardroom.yaml`
→ **Communication protocol**: `docs/workflow/Communication.md`
→ **Multi-repo roadmap**: `docs/multi-repository-implementation.md`
