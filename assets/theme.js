// theme.js

document.addEventListener('DOMContentLoaded', () => {
  let lastScroll = 0;
  const body = document.body;

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
