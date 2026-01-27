/**
 * Header Scroll Enhancement
 * Adds transparent-to-opaque transition on scroll
 * Auto-hide header on scroll down, show on scroll up
 */

(function() {
  'use strict';
  
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScroll = 0;
  const scrollThreshold = 50;
  const hideThreshold = 10; // Minimum scroll distance to trigger hide/show
  
  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Prevent negative scroll values (on some browsers/devices)
    if (currentScroll < 0) return;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Auto-hide logic: hide on scroll down, show on scroll up
    if (Math.abs(currentScroll - lastScroll) > hideThreshold) {
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling down & past threshold - hide header
        header.classList.add('header-hidden');
      } else {
        // Scrolling up or at top - show header
        header.classList.remove('header-hidden');
      }
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
