document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

function initArticleSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.classList.contains('swiper-initialized')) return;

    const wrapper = swiperEl.closest('.article-wrapper');
    const counters = wrapper.querySelectorAll('.counter-item');

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 700,
      effect: 'fade',
      fadeEffect: { crossFade: true },

      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true, // IMPORTANT
      },
    });

    // Sync number navigation
    swiper.on('slideChange', () => {
      counters.forEach(c => c.classList.remove('active-counter'));
      if (counters[swiper.activeIndex]) {
        counters[swiper.activeIndex].classList.add('active-counter');
      }
    });

    // Click number to slide
    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        swiper.slideTo(parseInt(btn.dataset.slide, 10));
      });
    });
  });
}
