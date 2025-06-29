/**
 * ASI Saga Animation and Interaction Script
 * This script provides various animations and interactive features for the ASI Saga website
 * Including parallax effects, micro-interactions, and timeline animations
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animations and interactions
  initNavbarScroll();
  initParallaxEffects();
  initHoverEffects();
  initTimelineInteractions();
  initPageTransitions();
  initScrollReveal();
  
  // Initialize accessibility features
  initAccessibilityFeatures();
  initReducedMotion();
});

/**
 * Makes the navbar transparent at top and solid on scroll
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.site-header');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

/**
 * Creates parallax scrolling effects for elements with the .parallax class
 */
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  // Skip parallax if prefers-reduced-motion is enabled
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    parallaxElements.forEach(element => {
      element.style.transform = 'none';  // Reset any transform
    });
    return;
  }
  
  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrollPosition * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

/**
 * Adds hover animations to interactive elements
 */
function initHoverEffects() {
  // Animate buttons on hover
  const buttons = document.querySelectorAll('.hero-button, .cta-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('pulse');
    });
    
    button.addEventListener('mouseleave', () => {
      button.classList.remove('pulse');
    });
  });

  // Animate cards on hover
  const cards = document.querySelectorAll('.product-card, .possibilities-card, .thoughtlab-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('card-hover');
    });
  });
}

/**
 * Handles interactions for the saga timeline
 */
function initTimelineInteractions() {
  const timelineMarkers = document.querySelectorAll('.timeline-marker');
  if (timelineMarkers.length === 0) return;
  
  timelineMarkers.forEach(marker => {
    marker.addEventListener('click', () => {
      // Close any open content
      document.querySelectorAll('.timeline-content.active').forEach(content => {
        content.classList.remove('active');
      });
      
      // Open the clicked content
      const contentId = marker.getAttribute('data-content-id');
      const contentElement = document.getElementById(contentId);
      
      if (contentElement) {
        contentElement.classList.add('active');
        
        // Smooth scroll to the content if needed
        contentElement.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Update active marker
      document.querySelectorAll('.timeline-marker.active').forEach(m => {
        m.classList.remove('active');
      });
      marker.classList.add('active');
    });
  });
}

/**
 * Adds smooth page transitions
 */
function initPageTransitions() {
  // Fade-in effect for the main content
  const mainContent = document.querySelector('.site-content');
  if (mainContent) {
    mainContent.classList.add('fade-in');
  }
}

/**
 * Reveals elements as they are scrolled into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if (revealElements.length === 0) return;

  const revealElementsOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('revealed');
      }
    });
  };
  
  window.addEventListener('scroll', revealElementsOnScroll);
  // Initial check in case elements are already in view
  revealElementsOnScroll();
}

/**
 * Initializes the hero carousel for the Possibilities page
 */
function initPossibilitiesCarousel() {
  const carousel = document.querySelector('.possibilities-carousel');
  if (!carousel) return;
  
  // Use Bootstrap's carousel API
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 5000,
    ride: 'carousel'
  });
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
          const modalBody = contentModal.querySelector('.modal-body');
          if (modalBody) {
            modalBody.innerHTML = modalContent.innerHTML;
            
            // Show modal using Bootstrap
            const modal = new bootstrap.Modal(contentModal);
            modal.show();
          }
        }
      }
    });
  });
}

/**
 * Initializes features to improve accessibility
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
  
  modal.addEventListener('keydown', function(e) {
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

/**
 * Adjusts animations if user prefers reduced motion
 */
function initReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable AOS animations
    if (typeof AOS !== 'undefined') {
      AOS.init({
        disable: true
      });
    }
    
    // Remove all animation classes
    document.querySelectorAll('.fade-in, .reveal-on-scroll, [data-aos]').forEach(element => {
      element.classList.remove('fade-in', 'reveal-on-scroll');
      element.removeAttribute('data-aos');
    });
    
    // Disable hover animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
      .pulse:hover, .card-hover:hover { 
        animation: none !important; 
        transform: none !important; 
      }
    `;
    document.head.appendChild(animationStyles);
  }
}
