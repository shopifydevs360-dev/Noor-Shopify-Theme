
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.gsap || !window.ScrollTrigger) {
      console.error('GSAP or ScrollTrigger not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      '.hero-intro__image-wrap',
      { width: '50%' },
      {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-intro',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
          markers: true // REMOVE after testing
        }
      }
    );
  });

