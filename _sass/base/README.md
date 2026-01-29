# Base Foundation

The base directory contains the foundational styling system for the ASI Saga theme.

## Structure

### Root Files
- `_fonts.scss` - Font loading and font-face declarations
- `_icons.scss` - Icon system configuration

### Subdirectories

#### `design/` - Visual Design Foundation
Design tokens, typography, colors, and theme variables that define the visual language.

#### `layout/` - Layout System  
Responsive grid system, containers, and layout structures.

#### `utilities/` - Utilities & Mixins
Sass mixins, helper functions, and accessibility tools.

#### `effects/` - Visual Effects
Animations, futuristic effects, and atmospheric layers.

## Import Order

Files are imported in a specific order in `_common.scss`:

1. Fonts and icons (foundation)
2. Design tokens and variables
3. Utilities and mixins
4. Layout system
5. Effects and animations

This order ensures dependencies are available when needed.
