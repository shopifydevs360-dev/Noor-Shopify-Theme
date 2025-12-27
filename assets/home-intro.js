document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) {
    console.error('GSAP or ScrollTrigger not found');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const maskImage = document.querySelector('.hero-reveal__image');
  const section = document.querySelector('.hero-reveal');

  if (!maskImage || !section) return;

  gsap.fromTo(
    maskImage,
    { width: '50%' },
    {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom center',
        scrub: true
        // markers: true
      }
    }
  );
});
