document.addEventListener("DOMContentLoaded", () => {
  initSidebarScrollBehavior();
  initHamburgerAnimation();
});

/* ===============================
   SIDEBAR: SCROLL STATE
================================ */
function initSidebarScrollBehavior() {
  const sidebar = document.getElementById("js-sidebar");
  if (!sidebar) return;

  const TOGGLE_POINT = 100;

  window.addEventListener("scroll", () => {
    toggleSidebarState(sidebar, TOGGLE_POINT);
  });
}

function toggleSidebarState(sidebar, togglePoint) {
  if (window.scrollY > togglePoint) {
    sidebar.classList.remove("expended");
    sidebar.classList.add("minimal");
  } else {
    sidebar.classList.remove("minimal");
    sidebar.classList.add("expended");
  }
}

/* ===============================
   HAMBURGER: LOAD ANIMATION
================================ */
function initHamburgerAnimation() {
  const hamburger = document.querySelector(".hamburger");
  if (!hamburger) return;

  const ANIMATION_DELAY = 0;

  setTimeout(() => {
    hamburger.classList.add("loaded");
  }, ANIMATION_DELAY);
}
