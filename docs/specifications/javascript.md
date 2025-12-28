# JavaScript Specification

## Overview

This specification defines JavaScript architecture, coding standards, and interaction patterns for the ASI Saga theme. The theme uses modern ES6 modules with a focus on accessibility, progressive enhancement, and maintainability.

## JavaScript Architecture

### Module Structure

```
assets/js/
├── common.js                 # Entry point (imports all modules)
├── chatroom-app.js          # Chatroom-specific application
├── common/                   # Shared modules
│   ├── analytics.js
│   ├── animations.js
│   ├── aos-init.js
│   ├── aos-url.js
│   ├── bootstrap.js
│   ├── card-template.js
│   ├── fontawesome.js
│   ├── footer.js
│   ├── header-scroll.js
│   ├── linkedin-auth.js
│   ├── navbar-keyboard.js
│   ├── opengraph.js
│   ├── seo-meta.js
│   ├── skip-link.js
│   ├── structured-data.js
│   └── twitter-card.js
└── vendor/                   # Third-party libraries
    ├── bootstrap.esm.js
    ├── bootstrap.esm.min.js
    └── popper.esm.js
```

### Entry Point Pattern

```javascript
// assets/js/common.js

// Accessibility modules
// import './common/skip-link.js';

// Header and navigation
import "./common/header-scroll.js";

// Bootstrap integration
import "./common/bootstrap.js";

// Footer functionality
import "./common/footer.js";

// SEO and meta tags
// import './common/seo-meta.js';
// import './common/opengraph.js';
// import './common/twitter-card.js';
// import './common/structured-data.js';

// Animations
// import "./common/animations.js";
```

**Key Principles**:
- Shared logic in `common.js`
- Feature-specific modules in `common/`
- Use ES6 `import`/`export` syntax
- Comment out unused modules to reduce bundle size

## ES6 Module Patterns

### Exporting

```javascript
// Module with named exports
// common/utils.js

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const CONFIG = {
  animationDuration: 300,
  debounceDelay: 250
};
```

```javascript
// Module with default export
// common/header-scroll.js

class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  handleScroll() {
    if (window.scrollY > 100) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
}

export default new HeaderScroll();
```

### Importing

```javascript
// Named imports
import { formatDate, debounce } from './common/utils.js';

// Default import
import HeaderScroll from './common/header-scroll.js';

// Mixed imports
import DefaultExport, { namedExport1, namedExport2 } from './module.js';

// Namespace import
import * as Utils from './common/utils.js';
```

## Loading & Initialization

### Script Loading

**Use `defer` or `type="module"` for script tags**:

```html
<!-- ✅ GOOD: Module script (deferred automatically) -->
<script type="module" src="{{ '/assets/js/common.js' | relative_url }}"></script>

<!-- ✅ GOOD: Defer attribute -->
<script defer src="{{ '/assets/js/legacy.js' | relative_url }}"></script>

<!-- ❌ BAD: Blocking script -->
<script src="{{ '/assets/js/app.js' | relative_url }}"></script>
```

### Initialization Pattern

```javascript
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeComponents();
});

function initializeComponents() {
  // Initialize each component
  initNavbar();
  initModals();
  initForms();
}

function initNavbar() {
  const navbar = document.querySelector('[data-component="navbar"]');
  if (!navbar) return;
  
  // Component logic here
}
```

### Module Initialization

```javascript
// Self-initializing module
// common/skip-link.js

class SkipLink {
  constructor() {
    this.skipLink = document.querySelector('.skip-link');
    if (this.skipLink) {
      this.init();
    }
  }
  
  init() {
    this.skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(this.skipLink.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SkipLink());
} else {
  new SkipLink();
}

export default SkipLink;
```

## DOM Hooks & Eventing

### Use Data Attributes for Behavior

**Use `data-*` attributes or ARIA attributes as DOM hooks — NOT classes**:

```html
<!-- ✅ GOOD: Data attributes for behavior -->
<button data-action="toggle-menu" data-target="#main-menu">
  Menu
</button>

<div data-component="modal" data-modal-id="welcome">
  Modal content
</div>

<!-- ❌ BAD: Classes for behavior -->
<button class="toggle-menu-button">Menu</button>
```

```javascript
// ✅ GOOD: Select by data attribute
const toggleButtons = document.querySelectorAll('[data-action="toggle-menu"]');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    toggleMenu(targetId);
  });
});

// ❌ BAD: Select by class
const toggleButtons = document.querySelectorAll('.toggle-menu-button');
```

### Event Delegation

**Use event delegation for dynamic content**:

```javascript
// ✅ GOOD: Event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-action="delete"]')) {
    handleDelete(e.target);
  }
});

// ❌ BAD: Individual listeners (doesn't work for dynamic content)
document.querySelectorAll('[data-action="delete"]').forEach(button => {
  button.addEventListener('click', handleDelete);
});
```

### Custom Events

```javascript
// Dispatch custom event
function notifyUpdate(data) {
  const event = new CustomEvent('dataUpdated', {
    detail: data,
    bubbles: true
  });
  document.dispatchEvent(event);
}

// Listen for custom event
document.addEventListener('dataUpdated', (e) => {
  console.log('Data updated:', e.detail);
  updateUI(e.detail);
});
```

## Accessibility & Progressive Enhancement

### Keyboard Support

**Ensure all interactive widgets support keyboard navigation**:

```javascript
// Keyboard navigation for custom dropdown
class Dropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('[data-dropdown-trigger]');
    this.menu = element.querySelector('[data-dropdown-menu]');
    this.items = Array.from(this.menu.querySelectorAll('[role="menuitem"]'));
    this.currentIndex = -1;
    
    this.init();
  }
  
  init() {
    this.trigger.addEventListener('click', () => this.toggle());
    this.trigger.addEventListener('keydown', (e) => this.handleTriggerKey(e));
    this.menu.addEventListener('keydown', (e) => this.handleMenuKey(e));
  }
  
  handleTriggerKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.open();
      this.focusFirstItem();
    }
  }
  
  handleMenuKey(e) {
    switch(e.key) {
      case 'Escape':
        this.close();
        this.trigger.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.focusNextItem();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusPreviousItem();
        break;
    }
  }
  
  focusFirstItem() {
    this.currentIndex = 0;
    this.items[0].focus();
  }
  
  focusNextItem() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.items[this.currentIndex].focus();
  }
  
  focusPreviousItem() {
    this.currentIndex = this.currentIndex <= 0 
      ? this.items.length - 1 
      : this.currentIndex - 1;
    this.items[this.currentIndex].focus();
  }
}
```

### Screen Reader Support

```javascript
// Announce dynamic changes to screen readers
function announceToScreenReader(message, priority = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Usage
announceToScreenReader('Item added to cart');
announceToScreenReader('Error: Please fill in all required fields', 'assertive');
```

### ARIA Management

```javascript
// Manage ARIA attributes
class Modal {
  open() {
    this.modal.setAttribute('aria-hidden', 'false');
    this.trigger.setAttribute('aria-expanded', 'true');
    
    // Trap focus
    this.previousFocus = document.activeElement;
    this.modal.focus();
  }
  
  close() {
    this.modal.setAttribute('aria-hidden', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    
    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }
}
```

### Feature Detection

```javascript
// Feature detection and graceful fallback
function initIntersectionObserver() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: Show all elements immediately
    document.querySelectorAll('[data-lazy]').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  });
  
  document.querySelectorAll('[data-lazy]').forEach(el => {
    observer.observe(el);
  });
}
```

## Code Quality Standards

### JSDoc Comments

```javascript
/**
 * Debounces a function call
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 * 
 * @example
 * const debouncedSearch = debounce(searchFunction, 300);
 * input.addEventListener('input', debouncedSearch);
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Error Handling

```javascript
// ✅ GOOD: Proper error handling
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    announceToScreenReader('Failed to load data. Please try again.', 'assertive');
    throw error;  // Re-throw if caller needs to handle it
  }
}

// ❌ BAD: Swallowing errors
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    // Silent failure - user doesn't know what happened
  }
}
```

### Null Checks

```javascript
// ✅ GOOD: Guard clauses
function initComponent(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Component not found: ${selector}`);
    return;
  }
  
  // Component logic
}

// ✅ GOOD: Optional chaining
const userName = user?.profile?.name ?? 'Guest';

// ❌ BAD: No null checks
function initComponent(selector) {
  const element = document.querySelector(selector);
  element.addEventListener('click', handleClick);  // Error if element is null
}
```

## Common Patterns

### Bootstrap Integration

```javascript
// common/bootstrap.js

// Dynamic Bootstrap imports
import { Modal, Dropdown, Collapse, Toast } from '../vendor/bootstrap.esm.min.js';

// Initialize Bootstrap components
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
  new Modal(document.querySelector(trigger.dataset.bsTarget));
});

document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(trigger => {
  new Dropdown(trigger);
});

// Export for use in other modules
export { Modal, Dropdown, Collapse, Toast };
```

### Header Scroll Effect

```javascript
// common/header-scroll.js

class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.site-header');
    if (!this.header) return;
    
    this.scrollThreshold = 100;
    this.init();
  }
  
  init() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  handleScroll() {
    if (window.scrollY > this.scrollThreshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new HeaderScroll());
} else {
  new HeaderScroll();
}

export default HeaderScroll;
```

### Form Validation

```javascript
// Form validation with accessibility
class FormValidator {
  constructor(form) {
    this.form = form;
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      if (!this.validate()) {
        e.preventDefault();
        this.showErrors();
      }
    });
  }
  
  validate() {
    this.errors = [];
    
    // Check required fields
    this.form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        this.errors.push({
          field: field,
          message: `${field.name} is required`
        });
      }
    });
    
    // Check email fields
    this.form.querySelectorAll('[type="email"]').forEach(field => {
      if (field.value && !this.isValidEmail(field.value)) {
        this.errors.push({
          field: field,
          message: 'Please enter a valid email address'
        });
      }
    });
    
    return this.errors.length === 0;
  }
  
  showErrors() {
    // Clear previous errors
    this.form.querySelectorAll('.error-message').forEach(el => el.remove());
    this.form.querySelectorAll('[aria-invalid]').forEach(el => {
      el.removeAttribute('aria-invalid');
    });
    
    // Show new errors
    this.errors.forEach(({ field, message }) => {
      field.setAttribute('aria-invalid', 'true');
      
      const errorId = `${field.id}-error`;
      field.setAttribute('aria-describedby', errorId);
      
      const errorEl = document.createElement('div');
      errorEl.id = errorId;
      errorEl.className = 'error-message';
      errorEl.textContent = message;
      errorEl.setAttribute('role', 'alert');
      
      field.parentNode.appendChild(errorEl);
    });
    
    // Focus first error
    if (this.errors.length > 0) {
      this.errors[0].field.focus();
    }
    
    // Announce to screen readers
    announceToScreenReader(
      `Form has ${this.errors.length} error${this.errors.length !== 1 ? 's' : ''}`,
      'assertive'
    );
  }
  
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

## Anti-Patterns to Avoid

### ❌ Don't Use Inline JavaScript

```html
<!-- Bad -->
<button onclick="alert('Hi')">Click</button>

<!-- Good -->
<button data-action="greet">Click</button>
```

### ❌ Don't Rely on Classes for Behavior

```javascript
// Bad
document.querySelectorAll('.clickable').forEach(...)

// Good
document.querySelectorAll('[data-clickable]').forEach(...)
```

### ❌ Don't Query DOM Repeatedly

```javascript
// ❌ Bad: Queries DOM every iteration
for (let i = 0; i < 100; i++) {
  document.querySelector('.container').appendChild(createItem(i));
}

// ✅ Good: Cache DOM reference
const container = document.querySelector('.container');
for (let i = 0; i < 100; i++) {
  container.appendChild(createItem(i));
}

// ✅ Better: Use DocumentFragment
const container = document.querySelector('.container');
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  fragment.appendChild(createItem(i));
}
container.appendChild(fragment);
```

### ❌ Don't Modify Global Scope

```javascript
// Bad
window.myFunction = function() { ... };
myGlobalVar = 'value';

// Good: Use modules
export function myFunction() { ... }
```

## Performance Best Practices

### Debouncing and Throttling

```javascript
// Debounce: Wait for pause in events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle: Limit execution rate
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const debouncedSearch = debounce(searchFunction, 300);
const throttledScroll = throttle(scrollHandler, 100);

input.addEventListener('input', debouncedSearch);
window.addEventListener('scroll', throttledScroll);
```

### RequestAnimationFrame for Visual Updates

```javascript
// ✅ Good: Use requestAnimationFrame
function updatePosition() {
  requestAnimationFrame(() => {
    element.style.transform = `translateX(${position}px)`;
  });
}

// ❌ Bad: Direct style manipulation in scroll handler
window.addEventListener('scroll', () => {
  element.style.transform = `translateX(${window.scrollY}px)`;
});
```

## File Naming

- Kebab-case: `header-scroll.js`, `form-validator.js`
- Clear, descriptive names
- Match functionality: `skip-link.js` for skip link functionality

## Testing

Before committing JavaScript changes:

- [ ] Test in target browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Check browser console for errors
- [ ] Verify feature detection fallbacks work
- [ ] Test with JavaScript disabled (progressive enhancement)

## Related Specifications

- [Accessibility Standards](./accessibility.md)
- [Component Library](./component-library.md)
- [HTML & Liquid](./html-liquid.md)
