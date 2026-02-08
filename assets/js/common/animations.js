/**
 * ASI Saga Animation and Interaction Script (Motion-Powered)
 * This script provides various animations and interactive features for the ASI Saga website
 * Using Motion library (https://motion.dev) for all UI/UX animations
 * 
 * Motion provides:
 * - Lightweight (5KB) Web Animations API wrapper
 * - Built-in reduced motion support
 * - Timeline support
 * - Gesture support
 * 
 * Load Motion from CDN before this script:
 * <script src="https://cdn.jsdelivr.net/npm/motion@12/dist/motion.js"></script>
 */
// Motion Library bridge
// Loads Motion as a module and exposes it globally for compatibility.
import * as Motion from 'https://cdn.jsdelivr.net/npm/motion@12.32.0/dist/motion.js';
window.Motion = Motion;


import {
  initMotionAnimations,
  setupNavbarScroll,
  setupParallax,
  setupScrollReveal,
  setupCardHover,
  setupButtonHover,
  setupTimelineInteraction,
  animatePageTransition,
} from './motion-utils.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Motion-based animations
  initMotionAnimations();

  // Initialize all animations and interactions
  initNavbarScroll();
  initParallaxEffects();
  initHoverEffects();
  initTimelineInteractions();
  initPageTransitions();
  initScrollReveal();

  // Initialize accessibility features
  initAccessibilityFeatures();
});

/**
 * Makes the navbar transparent at top and solid on scroll
 * Using Motion for smooth animated transitions
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.site-header');
  if (!navbar) return;

  setupNavbarScroll(navbar);
}

/**
 * Creates parallax scrolling effects for elements with the .parallax class
 * Using Motion's scroll() function for smooth performance
 */
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length === 0) return;

  parallaxElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
    setupParallax(element, { speed });
  });
}

/**
 * Adds hover animations to interactive elements
 * Using Motion for smooth hover transitions
 */
function initHoverEffects() {
  // Animate buttons on hover
  const buttons = document.querySelectorAll('.hero-button, .cta-button');
  buttons.forEach(button => {
    setupButtonHover(button);
  });

  // Animate cards on hover
  const cards = document.querySelectorAll('.product-card, .possibilities-card, .thoughtlab-card');
  cards.forEach(card => {
    setupCardHover(card);
  });
}

/**
 * Handles interactions for the saga timeline
 * Using Motion for smooth timeline transitions
 */
function initTimelineInteractions() {
  const timelineMarkers = document.querySelectorAll('.timeline-marker');
  if (timelineMarkers.length === 0) return;

  timelineMarkers.forEach(marker => {
    const contentId = marker.getAttribute('data-content-id');
    const contentElement = document.getElementById(contentId);

    if (contentElement) {
      setupTimelineInteraction(marker, contentElement);

      // Update active marker on click
      marker.addEventListener('click', () => {
        document.querySelectorAll('.timeline-marker.active').forEach(m => {
          m.classList.remove('active');
        });
        marker.classList.add('active');
      });
    }
  });
}

/**
 * Adds smooth page transitions
 * Using Motion for page fade-in effect
 */
function initPageTransitions() {
  const mainContent = document.querySelector('.site-content');
  if (mainContent) {
    animatePageTransition(mainContent);
  }
}

/**
 * Reveals elements as they are scrolled into view
 * Using Motion's inView() observer for performance
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length === 0) return;

  setupScrollReveal(revealElements);
}

/**
 * Initializes the hero carousel for the Possibilities page
 * Note: Carousel requires custom implementation (Bootstrap removed)
 */
function initPossibilitiesCarousel() {
  const carousel = document.querySelector('.possibilities-carousel');
  if (!carousel) return;

  // Carousel initialization would require custom implementation
  // Bootstrap was removed - this is a placeholder
  console.warn('Carousel requires custom implementation - Bootstrap removed');
}

/**
 * Initializes interactive modules for the Possibilities page
 */
function initInteractiveModules() {
  const modules = document.querySelectorAll('.interactive-module');
  if (modules.length === 0) return;

  modules.forEach(module => {
    module.addEventListener('click', () => {
      const contentId = module.getAttribute('data-content-id');
      const modalContent = document.getElementById(contentId);

      if (modalContent) {
        // Display modal with content
        const contentModal = document.getElementById('contentModal');
        if (contentModal) {
          const modalBody = contentModal.querySelector('.modal__body');
          if (modalBody) {
            modalBody.innerHTML = modalContent.innerHTML;

            // Show modal using modern UI component
            if (contentModal._modalInstance) {
              const title = module.getAttribute('data-title') || 'Future Possibility';
              contentModal._modalInstance.setContent(title, modalContent.innerHTML);
              contentModal._modalInstance.show();
            }
          }
        }
      }
    });
  });
}

/**
 * Initializes features to improve accessibility
 * Motion library automatically handles reduced motion preferences
 */
function initAccessibilityFeatures() {
  // Make all interactive elements focusable
  ensureFocusableElements();

  // Add ARIA labels to elements that need them
  addMissingAriaLabels();

  // Make modals accessible
  initAccessibleModals();

  // Adds keyboard navigation to interactive components
  initKeyboardNavigation();
}

/**
 * Ensures all interactive elements can receive focus
 */
function ensureFocusableElements() {
  // Find elements that can be clicked but might not be focusable
  const interactiveElements = document.querySelectorAll('[data-content-id], .card-hover, .hero-scroll-icon');

  interactiveElements.forEach(element => {
    // If element doesn't have a tabindex and is not a native focusable element
    if (!element.hasAttribute('tabindex') &&
      !['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
      element.setAttribute('tabindex', '0');

      // If it doesn't have a role, add one
      if (!element.hasAttribute('role')) {
        element.setAttribute('role', 'button');
      }

      // Add keyboard event listener for enter and space
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click(); // Simulate click
        }
      });
    }
  });
}

/**
 * Adds ARIA labels to elements that need them
 */
function addMissingAriaLabels() {
  // Add aria-labels to icons that are used as UI controls
  const iconButtons = document.querySelectorAll('i[class*="fa-"]:not([aria-hidden="true"])');
  iconButtons.forEach(icon => {
    icon.setAttribute('aria-hidden', 'true');
  });

  // Add descriptions to timeline markers
  const timelineMarkers = document.querySelectorAll('.timeline-marker');
  timelineMarkers.forEach(marker => {
    const title = marker.getAttribute('data-title') || 'Timeline item';
    marker.setAttribute('aria-label', title);
  });
}

/**
 * Makes modals accessible according to WCAG standards
 */
function initAccessibleModals() {
  // Find all modals
  const modals = document.querySelectorAll('.modal');

  modals.forEach(modal => {
    const modalId = modal.getAttribute('id');

    // Set correct ARIA attributes
    if (modalId) {
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');

      // Find the header if exists
      const modalTitle = modal.querySelector('.modal-title');
      if (modalTitle) {
        const titleId = `${modalId}-title`;
        modalTitle.setAttribute('id', titleId);
        modal.setAttribute('aria-labelledby', titleId);
      }

      // Trap focus inside modal when open
      modal.addEventListener('shown.bs.modal', trapFocusInModal);
    }
  });
}

/**
 * Traps keyboard focus inside modal when open
 * @param {Event} event - The modal shown event
 */
function trapFocusInModal(event) {
  const modal = event.target;
  const focusableElements = modal.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  firstElement.focus();

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

/**
 * Adds keyboard navigation to interactive components
 */
function initKeyboardNavigation() {
  // Add keyboard navigation to tabs
  const tabLists = document.querySelectorAll('[role="tablist"]');
  tabLists.forEach(tabList => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

    tabList.addEventListener('keydown', (e) => {
      const index = tabs.indexOf(document.activeElement);
      if (index !== -1) {
        let nextIndex;

        switch (e.key) {
          case 'ArrowLeft':
            nextIndex = index === 0 ? tabs.length - 1 : index - 1;
            break;
          case 'ArrowRight':
            nextIndex = index === tabs.length - 1 ? 0 : index + 1;
            break;
          default:
            return;
        }

        e.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }
    });
  });
}
