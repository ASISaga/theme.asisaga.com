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
  
  const mobilePortraitMax = 767.98; // Aligns with $breakpoint-md-max (768px - 0.02) in SCSS
  const mobilePortraitQuery = `(max-width: ${mobilePortraitMax}px) and (orientation: portrait)`;
  const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = reducedMotionMedia.matches;
  const mobilePortraitMedia = window.matchMedia(mobilePortraitQuery);
  let isMobilePortrait = mobilePortraitMedia.matches;

  reducedMotionMedia.addEventListener('change', (event) => {
    reducedMotion = event.matches;
  });

  mobilePortraitMedia.addEventListener('change', (event) => {
    isMobilePortrait = event.matches;
  });

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
    const canAutoHide = !reducedMotion && !isMobilePortrait;
    const wasHidden = header.classList.contains('header-hidden');
    
    // Only apply hide/show if scroll difference exceeds threshold
    if (!canAutoHide) {
      if (wasHidden) {
        header.classList.remove('header-hidden');
      }
      lastScroll = currentScroll;
      ticking = false;
      return;
    }

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
