(function () {
  const SCROLL_THRESHOLD = 100;
  const body = document.body;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  }

  // Run once on load (important for page refresh mid-scroll)
  handleScroll();

  // Listen to scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
})();
