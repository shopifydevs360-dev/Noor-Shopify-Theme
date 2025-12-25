document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

function initArticleSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.classList.contains('swiper-initialized')) return;

    new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
      },
      pagination: {
        el: swiperEl.querySelector('.swiper-pagination'),
        clickable: true,
      },
      speed: 700,
    });
  });
}
