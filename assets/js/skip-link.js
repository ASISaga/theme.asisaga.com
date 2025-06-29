// Accessibility: Skip to main content link
// This script dynamically inserts a skip link at the top of the body for accessibility

document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.getElementById('skip-target');
  if (mainContent) {
    const skipLink = document.createElement('a');
    skipLink.href = '#skip-target';
    skipLink.className = 'skip-link';
    skipLink.innerText = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
});
