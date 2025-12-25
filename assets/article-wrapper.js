document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

const SCROLL_STEP = 100;

function initArticleSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.classList.contains('swiper-initialized')) return;

    const section = swiperEl.closest('.featured-posts');
    const counters = section.querySelectorAll('.counter-item');

    let scrollAccumulator = 0;
    let isLocked = false;

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 700,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      allowTouchMove: false
    });

    // Counter sync
    swiper.on('slideChange', () => {
      counters.forEach(c => c.classList.remove('active-counter'));
      counters[swiper.activeIndex]?.classList.add('active-counter');
    });

    // Scroll lock helpers
    function lockScroll() {
      document.body.style.overflow = 'hidden';
      isLocked = true;
      scrollAccumulator = 0;
    }

    function unlockScroll() {
      document.body.style.overflow = '';
      isLocked = false;
      scrollAccumulator = 0;
    }

    // Intersection Observer (section middle)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            lockScroll();
          } else {
            unlockScroll();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    // Scroll driven slider
    window.addEventListener(
      'wheel',
      e => {
        if (!isLocked) return;

        e.preventDefault();
        scrollAccumulator += e.deltaY;

        // Scroll Down
        if (scrollAccumulator >= SCROLL_STEP) {
          if (swiper.activeIndex < swiper.slides.length - 1) {
            swiper.slideNext();
            scrollAccumulator = 0;
          } else {
            unlockScroll();
          }
        }

        // Scroll Up
        if (scrollAccumulator <= -SCROLL_STEP) {
          if (swiper.activeIndex > 0) {
            swiper.slidePrev();
            scrollAccumulator = 0;
          } else {
            unlockScroll();
          }
        }
      },
      { passive: false }
    );

    // Counter click
    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        swiper.slideTo(parseInt(btn.dataset.slide, 10));
      });
    });
  });
}
