document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.js-pinned-sections').forEach(section => {
    const panels = section.querySelectorAll('.js-pin-panel-wrap');
    const counters = section.querySelectorAll('.counter-item');

    if (!panels.length) return;

    gsap.set(panels, { autoAlpha: 0, y: 40 });
    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    const scrollLength = panels.length * 1000;
    const step = scrollLength / panels.length;

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top-=${step * index} top`,
        end: `+=${step}`,
        onEnter: () => activatePanel(index),
        onEnterBack: () => activatePanel(index),
        onLeave: () => {
          if (index !== panels.length - 1) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.5 });
          }
        },
        onLeaveBack: () => {
          if (index !== 0) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.5 });
          }
        }
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${scrollLength}`,
      pin: true,
      scrub: true
    });

    function activatePanel(index) {
      panels.forEach((p, i) => {
        gsap.to(p, {
          autoAlpha: i === index ? 1 : 0,
          y: i === index ? 0 : -20,
          duration: 0.6
        });
      });

      counters.forEach(c => c.classList.remove('is-active'));
      if (counters[index]) counters[index].classList.add('is-active');
    }
  });
});
