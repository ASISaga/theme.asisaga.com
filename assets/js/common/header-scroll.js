/**
 * Header Scroll Enhancement
 * Adds transparent-to-opaque transition on scroll
 */

(function() {
  'use strict';
  
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScroll = 0;
  const scrollThreshold = 50;
  
  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }
  
  // Initial check
  handleScroll();
  
  // Listen for scroll events with throttling
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
})();
