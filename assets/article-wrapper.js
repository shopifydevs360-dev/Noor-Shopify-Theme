document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

function initArticleSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.classList.contains('swiper-initialized')) return;

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 700,

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true, // ✅ allow page scroll after last slide
        enabled: false,       // 🔴 disabled by default
      },

      // REMOVE dot pagination if not needed
      // pagination: {
      //   el: swiperEl.querySelector('.swiper-pagination'),
      //   clickable: true,
      // },
    });

    /* --------------------------------
       Enable swiper only when centered
    -------------------------------- */
    function isSwiperCentered() {
      const rect = swiperEl.getBoundingClientRect();
      const swiperCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      return Math.abs(swiperCenter - viewportCenter) < 80;
    }

    function updateSwiperControl() {
      if (isSwiperCentered()) {
        swiper.mousewheel.enable();
      } else {
        swiper.mousewheel.disable();
      }
    }

    window.addEventListener('scroll', updateSwiperControl);
    swiper.on('slideChange', updateSwiperControl);

    // Initial check
    updateSwiperControl();
  });
}
