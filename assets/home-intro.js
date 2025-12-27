document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.home-intro');
  const imageWrap = document.querySelector('.home-intro__image');

  if (!section || !imageWrap) return;

  gsap.fromTo(
    imageWrap,
    { width: '50%' },
    {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom center',
        scrub: true
        // markers: true // enable if debugging
      }
    }
  );
});
