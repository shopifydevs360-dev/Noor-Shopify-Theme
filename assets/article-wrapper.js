document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.js-pinned-sections').forEach(section => {
    const panels = gsap.utils.toArray(
      section.querySelectorAll('.js-pin-panel-wrap')
    );
    const counters = section.querySelectorAll('[data-counter-index]');

    if (!panels.length) return;

    const PANEL_DURATION = 1;
    const TOTAL_DURATION = panels.length * PANEL_DURATION;

    /* ----------------------------------
      INITIAL STATE
    ---------------------------------- */
    gsap.set(panels, {
      autoAlpha: 0,
      y: 40,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    });

    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    counters.forEach((c, i) => {
      c.classList.toggle('is-active', i === 0);
    });

    /* ----------------------------------
      TIMELINE
    ---------------------------------- */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${TOTAL_DURATION * 1000}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    panels.forEach((panel, index) => {
      const isLast = index === panels.length - 1;

      tl.to(
        panel,
        {
          autoAlpha: 1,
          y: 0,
          duration: PANEL_DURATION,
          onStart: () => setActive(index),
          onReverseComplete: () => setActive(index - 1)
        },
        index * PANEL_DURATION
      );

      if (!isLast) {
        tl.to(
          panel,
          {
            autoAlpha: 0,
            y: -20,
            duration: PANEL_DURATION
          },
          index * PANEL_DURATION + PANEL_DURATION
        );
      }
    });

    /* ----------------------------------
      COUNTER SYNC
    ---------------------------------- */
    function setActive(index) {
      counters.forEach(c => c.classList.remove('is-active'));
      if (counters[index]) counters[index].classList.add('is-active');
    }

    /* ----------------------------------
      CLEANUP ON RESIZE
    ---------------------------------- */
    ScrollTrigger.addEventListener('refreshInit', () => {
      gsap.set(panels, { clearProps: 'all' });
    });
  });
});
