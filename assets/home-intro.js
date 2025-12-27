document.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.home-intro');
  const imageWrap = section?.querySelector('.scaling-image-wrapper');
  const image = imageWrap?.querySelector('img');

  if (!section || !imageWrap) return;

  /* IMAGE WIDTH SCROLL */
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
        markers: false
      }
    }
  );

  /* IMAGE SCALE SCROLL */
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
