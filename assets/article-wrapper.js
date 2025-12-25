document.addEventListener('DOMContentLoaded', initScrollControlledSwiper);
document.addEventListener('shopify:section:load', initScrollControlledSwiper);

function initScrollControlledSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.swiper) return;

    const section = swiperEl.closest('.featured-posts');
    const wrapper = swiperEl.closest('.article-wrapper');
    const counters = wrapper.querySelectorAll('.counter-item');

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 700,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      allowTouchMove: false, // IMPORTANT
    });

    let isActive = false;
    let scrollAccumulated = 0;
    const SCROLL_STEP = 400;

    // Sync counters
    swiper.on('slideChange', () => {
      counters.forEach(c => c.classList.remove('active-counter'));
      counters[swiper.activeIndex]?.classList.add('active-counter');
    });

    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        swiper.slideTo(+btn.dataset.slide);
      });
    });

    // Intersection Observer — section center detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        isActive = entry.isIntersecting;
        document.body.classList.toggle('scroll-locked', isActive);
        scrollAccumulated = 0;
      },
      {
        root: null,
        threshold: 0.5, // section middle hits viewport middle
      }
    );

    observer.observe(section);

    // Scroll hijacking
    function onScroll(e) {
      if (!isActive) return;

      e.preventDefault();

      scrollAccumulated += e.deltaY;

      if (Math.abs(scrollAccumulated) < SCROLL_STEP) return;

      if (scrollAccumulated > 0) {
        // Scroll down
        if (swiper.activeIndex < swiper.slides.length - 1) {
          swiper.slideNext();
        } else {
          releaseScroll();
        }
      } else {
        // Scroll up
        if (swiper.activeIndex > 0) {
          swiper.slidePrev();
        } else {
          releaseScroll();
        }
      }

      scrollAccumulated = 0;
    }

    function releaseScroll() {
      isActive = false;
      document.body.classList.remove('scroll-locked');
    }

    window.addEventListener('wheel', onScroll, { passive: false });
  });
}
