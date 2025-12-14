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

  setTimeout(() => {
    hamburger.classList.add("loaded");
  }, 200);
}

/* ===============================
   SIDEBAR DRAWER CONTROLLER
================================ */
function initSidebarDrawers() {
  const triggers = document.querySelectorAll("[data-trigger-section]");
  const overlay = document.getElementById("js-open-overlay");
  const expandedArea = document.getElementById("area-expended");
  
  let isTransitioning = false; // Flag to prevent multiple simultaneous transitions

  triggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      // If already transitioning, ignore the click
      if (isTransitioning) return;

      const sectionName = trigger.dataset.triggerSection;
      const isActive = trigger.classList.contains("is-active");

      if (isActive) {
        // 👉 CLOSE current drawer
        closeAllDrawers(overlay, expandedArea);
      } else {
        // 👉 Check if any drawer is currently open
        const isAnyDrawerOpen = document.querySelector('[data-open-section].is-open') || 
                               document.querySelector('[data-trigger-section].is-active');
        
        if (isAnyDrawerOpen) {
          // 👉 A drawer is open, close it first with delay
          isTransitioning = true;
          closeAllDrawers(overlay, expandedArea);
          
          // Wait 0.4s before opening new drawer
          setTimeout(() => {
            openDrawer(sectionName, overlay, expandedArea);
            toggleTriggerText(sectionName);
            setActiveTrigger(trigger);
            isTransitioning = false;
          }, 400);
        } else {
          // 👉 No drawer is open, open immediately
          openDrawer(sectionName, overlay, expandedArea);
          toggleTriggerText(sectionName);
          setActiveTrigger(trigger);
        }
      }
    });
  });

  // Overlay click closes everything
  overlay?.addEventListener("click", () => {
    if (!isTransitioning) {
      closeAllDrawers(overlay, expandedArea);
    }
  });
}

/* ===============================
   OPEN DRAWER
================================ */
function openDrawer(sectionName, overlay, expandedArea) {
  const drawer = document.querySelector(
    `[data-open-section="${sectionName}"]`
  );

  if (!drawer) return;

  // Mark drawer as open
  drawer.classList.add(`${sectionName}-open`, 'is-open');
  overlay?.classList.remove("hide");
  expandedArea?.classList.add("expended-area-active");
}

/* ===============================
   CLOSE ALL DRAWERS
================================ */
function closeAllDrawers(overlay, expandedArea) {
  // Remove is-open class from all drawers
  document.querySelectorAll("[data-open-section]").forEach(drawer => {
    const sectionName = drawer.dataset.openSection;
    drawer.classList.remove(`${sectionName}-open`, 'is-open');
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

  document
    .querySelector(`[data-open-item="${sectionName}-open-item"]`)
    ?.classList.add("hide");

  document
    .querySelector(`[data-close-item="${sectionName}-close-item"]`)
    ?.classList.remove("hide");
}