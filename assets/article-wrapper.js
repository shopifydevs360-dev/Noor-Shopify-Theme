(function () {
  function initFeaturedPinnedArticles() {
    const section = document.querySelector(
      ".featured-posts.js-pinned-sections"
    );
    if (!section || section.dataset.initialized) return;

    section.dataset.initialized = "true";

    const panels = gsap.utils.toArray(
      section.querySelectorAll(".js-pin-panel-wrap")
    );
    if (!panels.length) return;

    const counters = section.querySelectorAll(
      ".featured-post-count [data-counter-index]"
    );

    const totalScroll = panels.length * 1000;
    const step = totalScroll / panels.length;

    // Initial states
    gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });

    panels.forEach((panel, index) => {
      const isFirst = index === 0;
      const isLast = index === panels.length - 1;

      ScrollTrigger.create({
        trigger: section,
        start: `top -=${step * index}`,
        end: `+=${step}`,

        onEnter: () => activatePanel(index),
        onEnterBack: () => activatePanel(index),

        onLeave: () => {
          if (!isLast) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.4 });
          }
        },

        onLeaveBack: () => {
          if (!isFirst) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.4 });
          }
        }
      });
    });

    function activatePanel(index) {
      gsap.to(panels[index], {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        overwrite: true
      });

      counters.forEach(c => c.classList.remove("active-counter"));
      counters[index]?.classList.add("active-counter");
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: `+=${totalScroll}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true
    });

    // CRITICAL: ensure GSAP recalculates positions
    ScrollTrigger.refresh();
  }

  // Initial load
  window.addEventListener("load", () => {
    if (window.gsap && window.ScrollTrigger) {
      initFeaturedPinnedArticles();
    }
  });

  // Shopify section reload support
  document.addEventListener("shopify:section:load", initFeaturedPinnedArticles);
})();
