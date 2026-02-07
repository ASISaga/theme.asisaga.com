/**
 * Genesis Theme - Transcendent Interactive System
 * 
 * Provides:
 * - Mobile navigation toggle with off-canvas drawer
 * - Dropdown navigation with keyboard support
 * - Scroll-aware header with condensed state
 * - Back-to-top button with smooth scroll
 * - Accessibility-first with ARIA state management
 * - Progressive enhancement (works without JS for core features)
 * 
 * @version 3.0.0
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
    initScrollAwareHeader();
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
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'genesis-nav-overlay';
    overlay.setAttribute('data-nav-overlay', '');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    
    function toggleNav(open) {
      const isOpen = typeof open === 'boolean' ? open : toggle.getAttribute('aria-expanded') !== 'true';
      
      toggle.setAttribute('aria-expanded', isOpen);
      menu.setAttribute('data-nav-open', isOpen);
      overlay.setAttribute('data-nav-open', isOpen);
      
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
      
      // Focus management
      if (isOpen) {
        const firstLink = menu.querySelector('a');
        if (firstLink) {
          setTimeout(function() { firstLink.focus(); }, 150);
        }
      } else {
        toggle.focus();
      }
    }
    
    toggle.addEventListener('click', function() { toggleNav(); });
    overlay.addEventListener('click', function() { toggleNav(false); });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggleNav(false);
      }
    });
    
    // Close on link click (mobile)
    var navLinks = menu.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth < 1024) {
          setTimeout(function() { toggleNav(false); }, 300);
        }
      });
    });
    
    // Close on resize to desktop
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 1024) {
          toggleNav(false);
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      }, 250);
    });
  }

  /**
   * Dropdown Navigation - Keyboard accessible
   */
  function initDropdownNavigation() {
    var dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    dropdownToggles.forEach(function(toggle) {
      var dropdownId = toggle.getAttribute('aria-controls');
      var dropdown = document.getElementById(dropdownId);
      
      if (!dropdown) return;
      
      var dropdownLinks = dropdown.querySelectorAll('a');
      
      function toggleDropdown(open) {
        var isOpen = typeof open === 'boolean' ? open : toggle.getAttribute('aria-expanded') !== 'true';
        
        toggle.setAttribute('aria-expanded', isOpen);
        dropdown.setAttribute('aria-hidden', !isOpen);
        
        dropdownLinks.forEach(function(link) {
          link.setAttribute('tabindex', isOpen ? '0' : '-1');
        });
        
        if (isOpen && dropdownLinks.length > 0) {
          setTimeout(function() { dropdownLinks[0].focus(); }, 100);
        }
      }
      
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDropdown();
      });
      
      toggle.addEventListener('keydown', function(e) {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        
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
      
      dropdownLinks.forEach(function(link, index) {
        link.addEventListener('keydown', function(e) {
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
              if (index === dropdownLinks.length - 1 && !e.shiftKey) {
                setTimeout(function() { toggleDropdown(false); }, 100);
              }
              break;
          }
        });
      });
      
      document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
          toggleDropdown(false);
        }
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          toggleDropdown(false);
          toggle.focus();
        }
      });
    });
  }

  /**
   * Scroll-Aware Header
   * Adds 'scrolled' class for condensed state when user scrolls down.
   * Hides header on scroll down, shows on scroll up.
   */
  function initScrollAwareHeader() {
    var header = document.querySelector('.genesis-header');
    if (!header) return;

    var lastScrollY = 0;
    var scrollThreshold = 80;
    var hideThreshold = 400;
    var ticking = false;

    function onScroll() {
      var currentScrollY = window.scrollY || window.pageYOffset;

      // Condensed state
      if (currentScrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show on scroll direction (only after passing hideThreshold)
      if (currentScrollY > hideThreshold) {
        if (currentScrollY > lastScrollY + 5) {
          // Scrolling down — hide
          header.classList.add('header-hidden');
        } else if (currentScrollY < lastScrollY - 5) {
          // Scrolling up — show
          header.classList.remove('header-hidden');
        }
      } else {
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    var button = document.querySelector('[data-back-to-top]');
    
    if (!button) return;
    
    function updateButtonVisibility() {
      var scrollY = window.scrollY || window.pageYOffset;
      var threshold = 400;
      
      if (scrollY > threshold) {
        button.classList.add('is-visible');
        button.setAttribute('aria-hidden', 'false');
      } else {
        button.classList.remove('is-visible');
        button.setAttribute('aria-hidden', 'true');
      }
    }
    
    button.addEventListener('click', function() {
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      
      setTimeout(function() {
        var skipTarget = document.getElementById('skip-target');
        if (skipTarget) {
          skipTarget.focus({ preventScroll: true });
        }
      }, prefersReducedMotion ? 0 : 500);
    });
    
    var scrollTimer;
    window.addEventListener('scroll', function() {
      if (scrollTimer) return;
      
      scrollTimer = setTimeout(function() {
        updateButtonVisibility();
        scrollTimer = null;
      }, 100);
    }, { passive: true });
    
    updateButtonVisibility();
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          
          targetElement.focus({ preventScroll: true });
          
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
