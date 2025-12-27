<script>
  document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#hero-intro-{{ section.id }}');
    if (!section) return;

    const imageWrap = section.querySelector('.hero-intro__image-wrap');

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      imageWrap,
      {
        width: '50%'
      },
      {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true
        }
      }
    );
  });
</script>
