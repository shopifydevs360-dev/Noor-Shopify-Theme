document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.home-intro');
  const imageWrap = section.querySelector('.scaling-image-wrapper');

  if (!section || !imageWrap) return;

  /* IMAGE WIDTH ANIMATION */
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
        scrub: true,
        markers: false // set true if debugging
      }
    }
  );

  /* OPTIONAL: IMAGE SCALE (you already prepared data attrs) */
  const image = imageWrap.querySelector('img');

  if (image) {
    gsap.fromTo(
      image,
      { scale: 1.4 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true
        }
      }
    );
  }
});
