/**
 * Genesis Navigation Component
 * 
 * Specialized component for navigation elements with keyboard support.
 * 
 * Usage:
 *   <genesis-navigation type="primary|secondary|breadcrumb|tabs|sidebar">
 *     <nav>
 *       <a href="/">Home</a>
 *       <a href="/about">About</a>
 *     </nav>
 *   </genesis-navigation>
 * 
 * SCSS Integration:
 *   genesis-navigation {
 *     @include genesis-environment('navigation-primary');
 *   }
 */

import { GenesisElement } from './genesis-element.js';

export class GenesisNavigation extends GenesisElement {
  static get observedAttributes() {
    return ['type', 'orientation'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyNavigationBehavior();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._applyNavigationBehavior();
    }
  }

  _applyNavigationBehavior() {
    const type = this.getAttribute('type') || 'primary';
    const orientation = this.getAttribute('orientation') || 'horizontal';

    // Set data attributes for CSS targeting
    this.dataset.type = type;
    this.dataset.orientation = orientation;

    // Set ARIA role if not present
    const nav = this.querySelector('nav');
    if (nav && !nav.hasAttribute('role')) {
      nav.setAttribute('role', 'navigation');
    }

    // Apply type-specific behavior
    switch (type) {
      case 'tabs':
        this._setupTabs();
        break;
      case 'breadcrumb':
        this._setupBreadcrumb();
        break;
      case 'sidebar':
        this._setupSidebar();
        break;
      default:
        this._setupBasicNav();
    }

    // Keyboard navigation
    this._setupKeyboardNav();
  }

  _setupTabs() {
    const nav = this.querySelector('nav') || this;
    nav.setAttribute('role', 'tablist');

    const links = Array.from(this.querySelectorAll('a, button'));
    links.forEach((link, index) => {
      link.setAttribute('role', 'tab');
      link.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      const isSelected = link.classList.contains('active') || 
                        link.getAttribute('aria-current') === 'page';
      link.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }

  _setupBreadcrumb() {
    const nav = this.querySelector('nav') || this;
    nav.setAttribute('aria-label', 'Breadcrumb');

    const list = this.querySelector('ol, ul');
    if (list) {
      const items = Array.from(list.querySelectorAll('li'));
      items.forEach((item, index) => {
        const link = item.querySelector('a');
        if (link && index === items.length - 1) {
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  }

  _setupSidebar() {
    const nav = this.querySelector('nav') || this;
    nav.setAttribute('aria-label', 'Sidebar navigation');

    // Setup collapsible sections if present
    const sections = this.querySelectorAll('[data-collapsible]');
    sections.forEach(section => {
      const trigger = section.querySelector('[data-toggle]');
      const content = section.querySelector('[data-content]');
      
      if (trigger && content) {
        const isExpanded = !content.hasAttribute('hidden');
        trigger.setAttribute('aria-expanded', isExpanded.toString());
        trigger.setAttribute('aria-controls', content.id || '');
        
        trigger.addEventListener('click', () => {
          const expanded = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', (!expanded).toString());
          content.hidden = expanded;
        });
      }
    });
  }

  _setupBasicNav() {
    // Mark current page
    const currentUrl = window.location.pathname;
    const links = this.querySelectorAll('a');
    
    links.forEach(link => {
      if (link.getAttribute('href') === currentUrl) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  _setupKeyboardNav() {
    const links = Array.from(this.querySelectorAll('a, button'));
    if (links.length === 0) return;

    const orientation = this.getAttribute('orientation') || 'horizontal';
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

    links.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        let targetIndex = -1;

        switch (e.key) {
          case nextKey:
            e.preventDefault();
            targetIndex = (index + 1) % links.length;
            break;
          case prevKey:
            e.preventDefault();
            targetIndex = (index - 1 + links.length) % links.length;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = links.length - 1;
            break;
        }

        if (targetIndex >= 0) {
          // Update tabindex
          links.forEach((l, i) => {
            l.setAttribute('tabindex', i === targetIndex ? '0' : '-1');
          });
          links[targetIndex].focus();
        }
      });
    });
  }
}

// Register the custom element
if (!customElements.get('genesis-navigation')) {
  customElements.define('genesis-navigation', GenesisNavigation);
}
