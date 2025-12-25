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
      },
    });

    /* -----------------------------
      Sync number navigation
    ----------------------------- */
    swiper.on('slideChange', () => {
      paginationItems.forEach(item =>
        item.classList.remove('is-active')
      );
      if (paginationItems[swiper.activeIndex]) {
        paginationItems[swiper.activeIndex].classList.add('is-active');
      }
    });

    paginationItems.forEach(item => {
      item.addEventListener('click', () => {
        swiper.slideTo(parseInt(item.dataset.slide, 10));
      });
    });

    /* -----------------------------
      Scroll locking logic (PRO)
    ----------------------------- */
    function sectionIsCentered() {
      const rect = wrapper.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      return Math.abs(center - viewportCenter) < 80;
    }

    function updateMousewheel() {
      const centered = sectionIsCentered();
      const atStart = swiper.isBeginning;
      const atEnd = swiper.isEnd;

      if (centered && !(atStart || atEnd)) {
        // Lock page scroll, allow swiper scroll
        swiper.mousewheel.enable();
      } else {
        // Release page scroll
        swiper.mousewheel.disable();
      }
    }

    window.addEventListener('scroll', updateMousewheel);
    swiper.on('slideChange', updateMousewheel);

    // Initial check
    updateMousewheel();
  });
}
