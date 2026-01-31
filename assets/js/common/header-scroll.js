/**
 * Header Scroll Enhancement
 * Adds transparent-to-opaque transition on scroll
 * Auto-hide header on scroll down, show on scroll up
 */

(function() {
  'use strict';
  
  const header = document.querySelector('.genesis-header, .site-header');
  if (!header) return;
  
  let lastScroll = 0;
  const scrollThreshold = 50;
  const hideThreshold = 10; // Minimum scroll distance to trigger hide/show
  let ticking = false;
  
  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Prevent negative scroll values (on some browsers/devices)
    if (currentScroll < 0) {
      ticking = false;
      return;
    }
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Auto-hide logic: hide on scroll down, show on scroll up
    const scrollDiff = currentScroll - lastScroll;
    
    // Only apply hide/show if scroll difference exceeds threshold
    if (Math.abs(scrollDiff) > hideThreshold) {
      if (scrollDiff > 0 && currentScroll > scrollThreshold) {
        // Scrolling down & past threshold - hide header
        header.classList.add('header-hidden');
      } else if (scrollDiff < 0) {
        // Scrolling up - show header
        header.classList.remove('header-hidden');
      }
      
      lastScroll = currentScroll;
    }
    
    ticking = false;
  }
  
  // Initial check
  handleScroll();
  
  // Listen for scroll events with requestAnimationFrame throttling
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
})();
