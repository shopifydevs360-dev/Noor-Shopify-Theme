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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      sidebar.classList.remove("expended");
      sidebar.classList.add("minimal");
    } else {
      sidebar.classList.remove("minimal");
      sidebar.classList.add("expended");
    }
  });
}

/* ===============================
   HAMBURGER ANIMATION
================================ */
function initHamburgerAnimation() {
  const hamburger = document.querySelector(".hamburger");
  if (!hamburger) return;

  setTimeout(() => hamburger.classList.add("loaded"), 200);
}

/* ===============================
   DRAWER CONTROLLER
================================ */
function initSidebarDrawers() {
  const triggers = document.querySelectorAll("[data-trigger-section]");
  const overlay = document.getElementById("js-open-overlay");
  const expandedArea = document.getElementById("area-expended");

  let isSwitching = false;

  triggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (isSwitching) return;

      const sectionName = trigger.dataset.triggerSection;
      const isActive = trigger.classList.contains("is-active");
      const openDrawerEl = document.querySelector(
        '[data-open-section][class*="-open"]'
      );

      // CLOSE ONLY
      if (isActive) {
        fullyCloseDrawers(overlay, expandedArea);
        return;
      }

      // SWITCH DRAWER
      if (openDrawerEl) {
        isSwitching = true;

        closeDrawerOnly(); // ❗ no overlay reset

        setTimeout(() => {
          openDrawer(sectionName, overlay, expandedArea);
          toggleTriggerText(sectionName);
          setActiveTrigger(trigger);
          isSwitching = false;
        }, DRAWER_CLOSE_DELAY);
      } else {
        // OPEN DIRECTLY
        openDrawer(sectionName, overlay, expandedArea);
        toggleTriggerText(sectionName);
        setActiveTrigger(trigger);
      }
    });
  });

  overlay?.addEventListener("click", () => {
    fullyCloseDrawers(overlay, expandedArea);
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

  drawer.classList.add(`${sectionName}-open`);
  overlay.classList.remove("hide");
  expandedArea.classList.add("expended-area-active");
}

/* ===============================
   CLOSE DRAWER (ANIMATION ONLY)
================================ */
function closeDrawerOnly() {
  document.querySelectorAll("[data-open-section]").forEach(drawer => {
    const sectionName = drawer.dataset.openSection;
    drawer.classList.remove(`${sectionName}-open`);
  });

  document.querySelectorAll("[data-trigger-section]").forEach(trigger => {
    trigger.classList.remove("is-active");
  });
}

/* ===============================
   FULL CLOSE (OVERLAY + UI)
================================ */
function fullyCloseDrawers(overlay, expandedArea) {
  closeDrawerOnly();

  document.querySelectorAll("[data-open-item]").forEach(el => {
    el.classList.remove("hide");
  });

  document.querySelectorAll("[data-close-item]").forEach(el => {
    el.classList.add("hide");
  });

  overlay.classList.add("hide");
  expandedArea.classList.remove("expended-area-active");
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
   TOGGLE TEXT
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
