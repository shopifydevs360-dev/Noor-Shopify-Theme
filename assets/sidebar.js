document.addEventListener("DOMContentLoaded", () => {
  initSidebarScrollBehavior();
  initHamburgerAnimation();
  initSidebarDrawers(); 
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

document.addEventListener("DOMContentLoaded", () => {
  initSidebarScrollBehavior();
  initHamburgerAnimation();
  initSidebarDrawers();
});


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
      const drawer = document.querySelector(
        `[data-open-section="${sectionName}"]`
      );

      if (!drawer) return;

      const isOpen = drawer.classList.contains(`${sectionName}-open`);

      if (isOpen) {
        closeAllDrawers(overlay, expandedArea);
      } else {
        openDrawer(sectionName, trigger, overlay, expandedArea);
      }
    });
  });

  // Overlay closes everything
  overlay?.addEventListener("click", () => {
    closeAllDrawers(overlay, expandedArea);
  });
}

/* ===============================
   OPEN DRAWER
================================ */
function openDrawer(sectionName, trigger, overlay, expandedArea) {
  closeAllDrawers(overlay, expandedArea);

  const drawer = document.querySelector(
    `[data-open-section="${sectionName}"]`
  );

  if (!drawer) return;

  drawer.classList.add(`${sectionName}-open`);
  trigger.classList.add("is-active");

  toggleTriggerText(sectionName);

  overlay?.classList.remove("hide");
  expandedArea?.classList.add("expended-area-active");
}

/* ===============================
   CLOSE ALL DRAWERS
================================ */
function closeAllDrawers(overlay, expandedArea) {
  // Close drawers
  document.querySelectorAll("[data-open-section]").forEach(drawer => {
    const sectionName = drawer.dataset.openSection;
    drawer.classList.remove(`${sectionName}-open`);
  });

  // Reset triggers
  document.querySelectorAll("[data-trigger-section]").forEach(trigger => {
    trigger.classList.remove("is-active");
  });

  // Reset trigger text
  document.querySelectorAll("[data-open-item]").forEach(el => {
    el.classList.remove("hide");
  });

  document.querySelectorAll("[data-close-item]").forEach(el => {
    el.classList.add("hide");
  });

  overlay?.classList.add("hide");
  expandedArea?.classList.remove("expended-area-active");
}

/* ===============================
   TOGGLE OPEN / CLOSE TEXT
================================ */
function toggleTriggerText(sectionName) {
  document.querySelectorAll("[data-open-item]").forEach(el => {
    el.classList.remove("hide");
  });

  document.querySelectorAll("[data-close-item]").forEach(el => {
    el.classList.add("hide");
  });

  document
    .querySelector(`[data-open-item="${sectionName}-open-item"]`)
    ?.classList.add("hide");

  document
    .querySelector(`[data-close-item="${sectionName}-close-item"]`)
    ?.classList.remove("hide");
}
