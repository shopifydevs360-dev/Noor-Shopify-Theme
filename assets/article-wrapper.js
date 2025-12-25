document.addEventListener('DOMContentLoaded', initArticleWrapper);
document.addEventListener('shopify:section:load', initArticleWrapper);

function initArticleWrapper() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.js-pinned-sections').forEach(section => {
    const panels = gsap.utils.toArray(
      section.querySelectorAll('.js-pin-panel-wrap')
    );
    const counters = section.querySelectorAll('[data-counter-index]');

    if (!panels.length) return;

    /* Reset (important for section reload) */
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section) st.kill();
    });

    gsap.set(panels, { autoAlpha: 0, y: 40 });
    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    const totalScroll = panels.length * 1000;
    const step = totalScroll / panels.length;

    panels.forEach((panel, index) => {
      const isFirst = index === 0;
      const isLast = index === panels.length - 1;

      ScrollTrigger.create({
        trigger: section,
        start: `top-=${step * index} top`,
        end: `+=${step}`,

        onEnter: () => activate(index),
        onEnterBack: () => activate(index),

        onLeave: () => {
          if (!isLast) gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.6 });
        },

        onLeaveBack: () => {
          if (!isFirst) gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.6 });
        }
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalScroll}`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true
    });

    function activate(index) {
      panels.forEach((p, i) => {
        gsap.to(p, {
          autoAlpha: i === index ? 1 : 0,
          y: i === index ? 0 : -20,
          duration: 0.6
        });
      });

      counters.forEach(c => c.classList.remove('active-counter'));
      if (counters[index]) counters[index].classList.add('active-counter');
    }
  });

  ScrollTrigger.refresh();
}
