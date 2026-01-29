/**
 * Enhanced Showcase - Interactive Components
 * 
 * Provides accessible JavaScript interactions for:
 * - Accordion (ARIA-compliant expand/collapse)
 * - Tab Navigation (ARIA-compliant tab switching)
 * - Alert Dismissal
 * - Smooth Scroll Anchors
 * 
 * Follows Genesis Design System principles:
 * - Progressive enhancement (works without JS)
 * - Accessibility-first (keyboard navigation, ARIA states)
 * - Semantic interaction patterns
 * 
 * @version 1.0.0
 * @author ASISaga
 */

(function() {
  'use strict';

  /**
   * Initialize all interactive components when DOM is ready
   */
  function init() {
    initAccordion();
    initTabs();
    initAlertDismiss();
    initSmoothScroll();
    initScrollReveal();
  }

  /**
   * Accordion - ARIA-compliant expand/collapse
   */
  function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion__trigger');
    
    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const panelId = this.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const icon = this.querySelector('.accordion__icon');
        
        // Toggle expanded state
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
          // Collapse
          panel.hidden = true;
          if (icon) icon.textContent = '+';
        } else {
          // Expand
          panel.hidden = false;
          if (icon) icon.textContent = '−';
        }
      });
      
      // Keyboard support (Enter and Space)
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  /**
   * Tab Navigation - ARIA-compliant tab switching
   */
  function initTabs() {
    const tabLists = document.querySelectorAll('[role="tablist"]');
    
    tabLists.forEach(tabList => {
      const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
      const panels = tabs.map(tab => 
        document.getElementById(tab.getAttribute('aria-controls'))
      ).filter(panel => panel !== null);
      
      tabs.forEach((tab, index) => {
        // Click handler
        tab.addEventListener('click', function() {
          activateTab(this, tabs, panels);
        });
        
        // Keyboard navigation
        tab.addEventListener('keydown', function(e) {
          let targetTab = null;
          
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            targetTab = tabs[index + 1] || tabs[0]; // Wrap to first
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            targetTab = tabs[index - 1] || tabs[tabs.length - 1]; // Wrap to last
          } else if (e.key === 'Home') {
            e.preventDefault();
            targetTab = tabs[0];
          } else if (e.key === 'End') {
            e.preventDefault();
            targetTab = tabs[tabs.length - 1];
          }
          
          if (targetTab) {
            targetTab.focus();
            activateTab(targetTab, tabs, panels);
          }
        });
      });
    });
  }

  /**
   * Activate a specific tab and show its panel
   */
  function activateTab(activeTab, allTabs, allPanels) {
    const activeIndex = allTabs.indexOf(activeTab);
    
    // Deactivate all tabs
    allTabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      
      if (allPanels[index]) {
        allPanels[index].hidden = true;
      }
    });
    
    // Activate selected tab
    activeTab.setAttribute('aria-selected', 'true');
    activeTab.setAttribute('tabindex', '0');
    
    if (allPanels[activeIndex]) {
      allPanels[activeIndex].hidden = false;
    }
  }

  /**
   * Alert Dismissal - Accessible close buttons
   */
  function initAlertDismiss() {
    const dismissButtons = document.querySelectorAll('.alert__dismiss');
    
    dismissButtons.forEach(button => {
      button.addEventListener('click', function() {
        const alert = this.closest('.alert');
        
        if (alert) {
          // Fade out animation (respects prefers-reduced-motion)
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          if (prefersReducedMotion) {
            // Immediate removal
            alert.remove();
          } else {
            // Animated removal
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-10px)';
            alert.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
              alert.remove();
            }, 300);
          }
        }
      });
    });
  }

  /**
   * Smooth Scroll - For anchor links
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or the skip link
        if (targetId === '#' || targetId === '#skip-target') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Check for reduced motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          targetElement.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          
          // Set focus on target for keyboard users
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }

  /**
   * Scroll Reveal - Fade in elements as they enter viewport
   * Respects prefers-reduced-motion
   */
  function initScrollReveal() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      return;
    }
    
    // Use Intersection Observer for performance
    if ('IntersectionObserver' in window) {
      const revealElements = document.querySelectorAll('.blog-card, .feature-card, .product-card, .stat-card');
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger 100px before entering viewport
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add revealed class for animation
            entry.target.classList.add('is-revealed');
            
            // Stop observing once revealed
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      revealElements.forEach(element => {
        // Add initial hidden state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
      });
      
      // Add CSS for revealed state
      const style = document.createElement('style');
      style.textContent = `
        .is-revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }
})();
