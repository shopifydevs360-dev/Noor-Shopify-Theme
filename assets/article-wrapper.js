document.addEventListener('DOMContentLoaded', initPinnedArticles);
document.addEventListener('shopify:section:load', initPinnedArticles);

function initPinnedArticles() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.pinned-sections').forEach(section => {
    const panels = gsap.utils.toArray(
      section.querySelectorAll('.pin-panel-wrap')
    );
    const counters = section.querySelectorAll(
      '.featured-post-count [data-counter-index]'
    );

    if (panels.length < 2) return;

    // Initial state
    gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });

    const scrollLength = panels.length * 1000;

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top -=${index * 1000}`,
        end: `+=1000`,
        scrub: true,

        onEnter: () => activatePanel(index),
        onEnterBack: () => activatePanel(index),

        onLeave: () => {
          if (index < panels.length - 1) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.4 });
          }
        },

        onLeaveBack: () => {
          if (index > 0) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.4 });
          }
        },
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${scrollLength}`,
      pin: true,
      scrub: true,
    });

    function activatePanel(index) {
      panels.forEach((panel, i) => {
        if (i === index) {
          gsap.to(panel, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      });

      counters.forEach(c => c.classList.remove('active-counter'));
      if (counters[index]) {
        counters[index].classList.add('active-counter');
      }
    }
  });
}
