// JavaScript for keyboard navigation in dropdown menus for the navbar component
// Handles dropdown toggles and keyboard accessibility

document.addEventListener('DOMContentLoaded', function() {
  // Handle keyboard navigation in dropdown menus
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('keydown', function(e) {
      // Open dropdown on arrow down or enter
      if ((e.key === 'ArrowDown' || e.key === 'Enter') && !toggle.getAttribute('aria-expanded') === 'true') {
        e.preventDefault();
        toggle.click();
        
        // Focus first dropdown item
        const dropdown = document.querySelector(`[aria-labelledby="${toggle.id}"]`);
        if (dropdown) {
          const firstItem = dropdown.querySelector('a');
          if (firstItem) firstItem.focus();
        }
      }
    });
  });
  
  // Handle keyboard navigation within dropdown items
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  
  dropdownItems.forEach((item, index, items) => {
    item.addEventListener('keydown', function(e) {
      // Handle arrow navigation within dropdown
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = items[index + 1];
        if (nextItem) nextItem.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (index === 0) {
          // If first item, go back to toggle
          const toggleId = item.closest('.dropdown-menu').getAttribute('aria-labelledby');
          document.getElementById(toggleId).focus();
        } else {
          const prevItem = items[index - 1];
          if (prevItem) prevItem.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        // Close dropdown and focus toggle
        const toggleId = item.closest('.dropdown-menu').getAttribute('aria-labelledby');
        const toggle = document.getElementById(toggleId);
        toggle.click();
        toggle.focus();
      }
    });
  });
});
