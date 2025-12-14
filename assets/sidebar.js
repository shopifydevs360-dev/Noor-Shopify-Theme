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

      openDrawer(sectionName, overlay, expandedArea);
      toggleTriggerText(sectionName);
      setActiveTrigger(trigger);
    });
  });

  // Overlay click closes everything
  overlay?.addEventListener("click", () => {
    closeAllDrawers(overlay, expandedArea);
  });
}

/* ===============================
   OPEN DRAWER
================================ */
function openDrawer(sectionName, overlay, expandedArea) {
  closeAllDrawers(overlay, expandedArea);

  const drawer = document.querySelector(
    `[data-open-section="${sectionName}"]`
  );

  if (!drawer) return;

  drawer.classList.add(`${sectionName}-open`);

  overlay?.classList.remove("hide");
  expandedArea?.classList.add("expended-area-active");
}

/* ===============================
   CLOSE ALL DRAWERS
================================ */
function closeAllDrawers(overlay, expandedArea) {
  document.querySelectorAll("[data-open-section]").forEach(drawer => {
    drawer.classList.add("hide");

    // remove dynamic open class
    const sectionName = drawer.dataset.openSection;
    drawer.classList.remove(`${sectionName}-open`);
  });

  document.querySelectorAll("[data-trigger-section]").forEach(trigger => {
    trigger.classList.remove("is-active");
  });

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
   TRIGGER STATE
================================ */
function setActiveTrigger(activeTrigger) {
  document.querySelectorAll("[data-trigger-section]").forEach(trigger => {
    trigger.classList.remove("is-active");
  });

  activeTrigger.classList.add("is-active");
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

  document.querySelector(
    `[data-open-item="${sectionName}-open-item"]`
  )?.classList.add("hide");

  document.querySelector(
    `[data-close-item="${sectionName}-close-item"]`
  )?.classList.remove("hide");
}
