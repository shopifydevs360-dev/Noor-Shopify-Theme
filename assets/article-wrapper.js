document.addEventListener('DOMContentLoaded', initArticleWrapper);
document.addEventListener('shopify:section:load', initArticleWrapper);

function initArticleWrapper() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.js-pinned-sections').forEach(section => {
    const panels = section.querySelectorAll('.js-pin-panel-wrap');
    const counters = section.querySelectorAll('[data-counter-index]');

    if (panels.length < 2) return;

    /* Kill previous triggers (Shopify editor safety) */
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section) st.kill();
    });

    /* Initial state */
    gsap.set(panels, { autoAlpha: 0, y: 40 });
    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    counters.forEach((c, i) =>
      c.classList.toggle('is-active', i === 0)
    );

    /* Timeline */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${panels.length * 1000}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true
      }
    });

    panels.forEach((panel, index) => {
      // show
      tl.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        onStart: () => activate(index),
        onReverseComplete: () => activate(index - 1)
      });

      // hide (except last)
      if (index !== panels.length - 1) {
        tl.to(panel, {
          autoAlpha: 0,
          y: -20,
          duration: 0.5
        });
      }
    });

    function activate(index) {
      counters.forEach(c => c.classList.remove('is-active'));
      if (counters[index]) counters[index].classList.add('is-active');
    }
  });

  ScrollTrigger.refresh();
}
