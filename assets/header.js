// theme.js

document.addEventListener('DOMContentLoaded', () => {
  // Check if header has scroll-up sticky behavior
  const header = document.querySelector('.main-header');
  if (!header) return;
  
  const isScrollUpSticky = header.classList.contains('sticky--scroll-up');
  
  if (!isScrollUpSticky) return; // Only apply scroll behavior for scroll-up sticky
  
  let lastScroll = 0;
  const body = document.body;

  // Initial state: if page is loaded not at the top, hide header
  if (window.pageYOffset > 0) {
    body.classList.add('scroll-down');
  }

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Don't add class when at the top of the page
    if (currentScroll <= 0) {
      body.classList.remove('scroll-up');
      body.classList.remove('scroll-down');
      return;
    }

    // Scrolling down
    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
      body.classList.remove('scroll-up');
      body.classList.add('scroll-down');
    }

    // Scrolling up
    if (currentScroll < lastScroll && !body.classList.contains('scroll-up')) {
      body.classList.remove('scroll-down');
      body.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
  });
});