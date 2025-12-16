/* ======================================
   THEME INITIALIZER
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  initBodyScrollState();
});

/* ===============================
   BODY: SCROLLED STATE
================================ */
function initBodyScrollState() {
  const SCROLL_THRESHOLD = 100;
  const body = document.body;

  function onScroll() {
    body.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

