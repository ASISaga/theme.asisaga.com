// Back to top button functionality for site footer
// This script is loaded externally from footer.html

// Set the current year in the footer automatically
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    // Show button when page is scrolled down
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Add event listeners to footer navigation links for smooth scrolling or page navigation
// Show or hide footer sections based on user interaction or page state
// Dynamically update social media links in the footer
// Adjust footer layout for different screen sizes
