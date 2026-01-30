/**
 * Genesis Theme - Modern Interactive Components
 * 
 * Provides:
 * - Mobile navigation toggle with off-canvas drawer
 * - Dropdown navigation with keyboard support
 * - Back-to-top button with smooth scroll
 * - Accessibility-first with ARIA state management
 * - Progressive enhancement (works without JS for core features)
 * 
 * @version 2.1.0
 * @author ASISaga
 */

(function() {
  'use strict';

  /**
   * Initialize all interactive components
   */
  function init() {
    initMobileNavigation();
    initDropdownNavigation();
    initBackToTop();
    initSmoothScroll();
  }

  /**
   * Mobile Navigation - Off-canvas drawer
   */
  function initMobileNavigation() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');
    
    if (!toggle || !menu) return;
    
    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'genesis-nav-overlay';
    overlay.setAttribute('data-nav-overlay', '');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    
    // Toggle navigation
    function toggleNav(open) {
      const isOpen = typeof open === 'boolean' ? open : toggle.getAttribute('aria-expanded') !== 'true';
      
      toggle.setAttribute('aria-expanded', isOpen);
      menu.setAttribute('data-nav-open', isOpen);
      overlay.setAttribute('data-nav-open', isOpen);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      // Focus management
      if (isOpen) {
        // Focus first link in menu
        const firstLink = menu.querySelector('a');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      } else {
        // Return focus to toggle button
        toggle.focus();
      }
    }
    
    // Click events
    toggle.addEventListener('click', () => toggleNav());
    overlay.addEventListener('click', () => toggleNav(false));
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggleNav(false);
      }
    });
    
    // Close on link click (mobile)
    const navLinks = menu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          setTimeout(() => toggleNav(false), 300);
        }
      });
    });
    
    // Close on resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          toggleNav(false);
          document.body.style.overflow = '';
        }
      }, 250);
    });
  }

  /**
   * Dropdown Navigation - Keyboard accessible
   */
  function initDropdownNavigation() {
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    dropdownToggles.forEach(toggle => {
      const dropdownId = toggle.getAttribute('aria-controls');
      const dropdown = document.getElementById(dropdownId);
      
      if (!dropdown) return;
      
      const dropdownLinks = dropdown.querySelectorAll('a');
      
      // Toggle dropdown
      function toggleDropdown(open) {
        const isOpen = typeof open === 'boolean' ? open : toggle.getAttribute('aria-expanded') !== 'true';
        
        toggle.setAttribute('aria-expanded', isOpen);
        dropdown.setAttribute('aria-hidden', !isOpen);
        
        // Manage tabindex for keyboard navigation
        dropdownLinks.forEach(link => {
          link.setAttribute('tabindex', isOpen ? '0' : '-1');
        });
        
        // Focus first item when opening
        if (isOpen && dropdownLinks.length > 0) {
          setTimeout(() => dropdownLinks[0].focus(), 100);
        }
      }
      
      // Click/tap to toggle
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDropdown();
      });
      
      // Keyboard navigation
      toggle.addEventListener('keydown', (e) => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        
        switch(e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            toggleDropdown();
            break;
          case 'ArrowDown':
            e.preventDefault();
            if (!isOpen) {
              toggleDropdown(true);
            } else if (dropdownLinks.length > 0) {
              dropdownLinks[0].focus();
            }
            break;
          case 'Escape':
            if (isOpen) {
              e.preventDefault();
              toggleDropdown(false);
              toggle.focus();
            }
            break;
        }
      });
      
      // Keyboard navigation within dropdown
      dropdownLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
          switch(e.key) {
            case 'ArrowDown':
              e.preventDefault();
              if (index < dropdownLinks.length - 1) {
                dropdownLinks[index + 1].focus();
              }
              break;
            case 'ArrowUp':
              e.preventDefault();
              if (index > 0) {
                dropdownLinks[index - 1].focus();
              } else {
                toggle.focus();
              }
              break;
            case 'Escape':
              e.preventDefault();
              toggleDropdown(false);
              toggle.focus();
              break;
            case 'Tab':
              // Close dropdown when tabbing away
              if (index === dropdownLinks.length - 1 && !e.shiftKey) {
                setTimeout(() => toggleDropdown(false), 100);
              }
              break;
          }
        });
      });
      
      // Close on click outside
      document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
          toggleDropdown(false);
        }
      });
      
      // Close on Escape globally
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          toggleDropdown(false);
          toggle.focus();
        }
      });
    });
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const button = document.querySelector('[data-back-to-top]');
    
    if (!button) return;
    
    // Show/hide based on scroll position
    function updateButtonVisibility() {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 300;  // Show after 300px scroll
      
      if (scrollY > threshold) {
        button.classList.add('is-visible');
        button.setAttribute('aria-hidden', 'false');
      } else {
        button.classList.remove('is-visible');
        button.setAttribute('aria-hidden', 'true');
      }
    }
    
    // Scroll to top
    button.addEventListener('click', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      
      // Focus skip link target after scroll
      setTimeout(() => {
        const skipTarget = document.getElementById('skip-target');
        if (skipTarget) {
          skipTarget.focus({ preventScroll: true });
        }
      }, prefersReducedMotion ? 0 : 500);
    });
    
    // Update on scroll (throttled)
    let scrollTimer;
    window.addEventListener('scroll', () => {
      if (scrollTimer) return;
      
      scrollTimer = setTimeout(() => {
        updateButtonVisibility();
        scrollTimer = null;
      }, 100);
    }, { passive: true });
    
    // Initial check
    updateButtonVisibility();
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          // Scroll to target
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          
          // Set focus on target
          targetElement.focus({ preventScroll: true });
          
          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      });
    });
  }

  /**
   * Initialize when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
