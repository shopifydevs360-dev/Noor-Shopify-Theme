document.addEventListener('DOMContentLoaded', initArticleScrollSwiper);
document.addEventListener('shopify:section:load', initArticleScrollSwiper);

function initArticleScrollSwiper() {
  document.querySelectorAll('.featured-posts').forEach(section => {
    const swiperEl = section.querySelector('.article-swiper');
    if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

    const counters = section.querySelectorAll('.counter-item');
    const totalSlides = counters.length;

    const swiper = new Swiper(swiperEl, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 600,
      allowTouchMove: false
    });

    let isPinned = false;
    let scrollProgress = 0;
    const STEP = 100;
    let lastScrollY = window.scrollY;

    function updateCounter(index) {
      counters.forEach(c => c.classList.remove('active-counter'));
      counters[index]?.classList.add('active-counter');
    }

    swiper.on('slideChange', () => {
      updateCounter(swiper.activeIndex);
    });

    function sectionIsCentered() {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      return Math.abs(sectionCenter - viewportCenter) < 20;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (isPinned) return;

        if (sectionIsCentered()) {
          isPinned = true;
          scrollProgress = 0;
          lastScrollY = window.scrollY;

          // lock scroll position
          document.body.style.overflow = 'hidden';
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'wheel',
      e => {
        if (!isPinned) return;

        e.preventDefault();
        scrollProgress += e.deltaY;

        if (Math.abs(scrollProgress) >= STEP) {
          if (scrollProgress > 0 && swiper.activeIndex < totalSlides - 1) {
            swiper.slideNext();
          } else if (scrollProgress < 0 && swiper.activeIndex > 0) {
            swiper.slidePrev();
          } else {
            // unlock scroll at edges
            isPinned = false;
            document.body.style.overflow = '';
          }
          scrollProgress = 0;
        }
      },
      { passive: false }
    );
  });
}
