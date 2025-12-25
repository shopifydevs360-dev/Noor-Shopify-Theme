document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

function initArticleSwiper() {
  document.querySelectorAll('.article-wrapper').forEach(wrapper => {
    const swiperEl = wrapper.querySelector('.article-swiper');
    if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

    const paginationItems =
      wrapper.querySelectorAll('.article-pagination__item');

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 800,
      effect: 'fade',
      fadeEffect: { crossFade: true },

      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
        enabled: false, // 🔴 disabled by default
      },
    });

    /* ---------------------------
      Number pagination sync
    --------------------------- */
    swiper.on('slideChange', () => {
      paginationItems.forEach(el => el.classList.remove('is-active'));
      if (paginationItems[swiper.activeIndex]) {
        paginationItems[swiper.activeIndex].classList.add('is-active');
      }
    });

    paginationItems.forEach(item => {
      item.addEventListener('click', () => {
        swiper.slideTo(parseInt(item.dataset.slide, 10));
      });
    });

    /* ---------------------------
      Center detection
    --------------------------- */
    function isCentered() {
      const rect = wrapper.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      return Math.abs(center - viewportCenter) < 80;
    }

    function updateControl() {
      const centered = isCentered();

      if (
        centered &&
        !swiper.isBeginning &&
        !swiper.isEnd
      ) {
        swiper.mousewheel.enable();
      } else {
        swiper.mousewheel.disable();
      }
    }

    window.addEventListener('scroll', updateControl);
    swiper.on('slideChange', updateControl);

    updateControl();
  });
}
