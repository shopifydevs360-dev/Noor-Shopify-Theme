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

  const ANIMATION_DELAY = 200;

  setTimeout(() => {
    hamburger.classList.add("loaded");
  }, ANIMATION_DELAY);
}


/* ===============================
   SIDEBAR DRAWER CONTROLLER
================================ */
function initSidebarDrawers() {
  const triggers = document.querySelectorAll("[data-trigger-section]");
  const overlay = document.getElementById("js-open-overlay");
  const expandedArea = document.getElementById("area-expended");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const sectionName = trigger.dataset.triggerSection;

      openDrawer(sectionName, overlay, expandedArea);
      toggleTriggerText(sectionName);
    });
  });
}

/* ===============================
   OPEN DRAWER
================================ */
function openDrawer(sectionName, overlay, expandedArea) {
  // Close all drawers first
  document.querySelectorAll("[data-open-section]").forEach(drawer => {
    drawer.classList.add("hide");
  });

  // Open requested drawer
  const activeDrawer = document.querySelector(
    `[data-open-section="${sectionName}"]`
  );

  if (activeDrawer) {
    activeDrawer.classList.remove("hide");
  }

  // Show overlay
  overlay?.classList.remove("hide");

  // Expand sidebar area
  expandedArea?.classList.add("expended-area-active");
}

/* ===============================
   TOGGLE OPEN / CLOSE TEXT
================================ */
function toggleTriggerText(sectionName) {
  // Reset all trigger texts
  document.querySelectorAll("[data-open-item]").forEach(el => {
    el.classList.remove("hide");
  });

  document.querySelectorAll("[data-close-item]").forEach(el => {
    el.classList.add("hide");
  });

  // Toggle current trigger
  const openText = document.querySelector(
    `[data-open-item="${sectionName}-open-item"]`
  );
  const closeText = document.querySelector(
    `[data-close-item="${sectionName}-close-item"]`
  );

  openText?.classList.add("hide");
  closeText?.classList.remove("hide");
}