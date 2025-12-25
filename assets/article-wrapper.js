document.addEventListener('DOMContentLoaded', initScrollSwiper);
document.addEventListener('shopify:section:load', initScrollSwiper);

function initScrollSwiper() {
  document.querySelectorAll('.featured-posts').forEach(section => {
    const swiperEl = section.querySelector('.article-swiper');
    if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

    const counters = section.querySelectorAll('.counter-item');
    const slidesCount = counters.length;

    const swiper = new Swiper(swiperEl, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 600,
      allowTouchMove: false,
    });

    let isLocked = false;
    let scrollAccumulated = 0;
    const SCROLL_STEP = 100;

    function updateCounter(index) {
      counters.forEach(c => c.classList.remove('active-counter'));
      counters[index]?.classList.add('active-counter');
    }

    swiper.on('slideChange', () => {
      updateCounter(swiper.activeIndex);
    });

    window.addEventListener(
      'wheel',
      e => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const viewportMiddle = window.innerHeight / 2;

        const isCentered =
          Math.abs(sectionMiddle - viewportMiddle) < 40;

        if (!isCentered && !isLocked) return;

        // Lock scrolling
        if (isCentered && !isLocked) {
          isLocked = true;
          scrollAccumulated = 0;
        }

        if (!isLocked) return;

        e.preventDefault();

        scrollAccumulated += e.deltaY;

        if (Math.abs(scrollAccumulated) >= SCROLL_STEP) {
          if (scrollAccumulated > 0 && swiper.activeIndex < slidesCount - 1) {
            swiper.slideNext();
          } else if (scrollAccumulated < 0 && swiper.activeIndex > 0) {
            swiper.slidePrev();
          } else {
            // Unlock when edges reached
            isLocked = false;
          }
          scrollAccumulated = 0;
        }
      },
      { passive: false }
    );
  });
}
