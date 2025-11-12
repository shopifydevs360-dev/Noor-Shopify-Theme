// theme.js

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  if (!header) return;
  
  const isScrollUpSticky = header.classList.contains('sticky--scroll-up');
  const isAlwaysSticky = header.classList.contains('sticky--always');
  
  // Only apply scroll behavior if sticky is enabled
  if (!isScrollUpSticky && !isAlwaysSticky) return;
  
  let lastScroll = 0;
  const body = document.body;

  // Function to update header state based on scroll position
  const updateHeaderState = () => {
    const currentScroll = window.pageYOffset;
    
    // When at the top of the page
    if (currentScroll <= 0) {
      body.classList.remove('scroll-up');
      body.classList.remove('scroll-down');
      // Remove fixed position at the top
      header.classList.remove('is-fixed');
      return;
    }
    
    // When scrolled down from the top, make header fixed
    header.classList.add('is-fixed');
    
    // For scroll-up behavior, handle show/hide based on scroll direction
    if (isScrollUpSticky) {
      // Scrolling down
      if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-up');
        body.classList.add('scroll-down');
      }
      // Scrolling up
      else if (currentScroll < lastScroll && !body.classList.contains('scroll-up')) {
        body.classList.remove('scroll-down');
        body.classList.add('scroll-up');
      }
    }
    
    lastScroll = currentScroll;
  };

  // Initial state check
  updateHeaderState();
  
  // Update header state on scroll
  window.addEventListener('scroll', updateHeaderState);
  
  // For always sticky, make it fixed immediately
  if (isAlwaysSticky) {
    header.classList.add('is-fixed');
  }
});