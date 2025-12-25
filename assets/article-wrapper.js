document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

function initArticleSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.classList.contains('swiper-initialized')) return;

    const paginationItems =
      swiperEl.closest('.article-wrapper')
        .querySelectorAll('.article-pagination__item');

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 800,
      effect: 'fade',
      fadeEffect: { crossFade: true },

      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true, // 🔥 KEY FIX
        sensitivity: 1,
      },
    });

    // Sync number pagination
    swiper.on('slideChange', () => {
      paginationItems.forEach(item =>
        item.classList.remove('is-active')
      );
      if (paginationItems[swiper.activeIndex]) {
        paginationItems[swiper.activeIndex].classList.add('is-active');
      }
    });

    // Click number → go to slide
    paginationItems.forEach(item => {
      item.addEventListener('click', () => {
        swiper.slideTo(parseInt(item.dataset.slide, 10));
      });
    });
  });
}
