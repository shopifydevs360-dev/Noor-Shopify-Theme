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
        sensitivity: 1,
        releaseOnEdges: true, // ✅ page scroll resumes at ends
        enabled: false        // 🔴 start disabled
      },
    });

    /* -----------------------------
      Counter sync
    ----------------------------- */
    swiper.on('slideChange', () => {
      counters.forEach(c => c.classList.remove('active-counter'));
      if (counters[swiper.activeIndex]) {
        counters[swiper.activeIndex].classList.add('active-counter');
      }
    });

    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        swiper.slideTo(parseInt(btn.dataset.slide, 10));
      });
    });

    /* -----------------------------
      Center-based activation logic
    ----------------------------- */
    function isSectionCentered() {
      const rect = wrapper.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // tolerance range (important)
      return Math.abs(sectionCenter - viewportCenter) < 80;
    }

    function updateSwiperControl() {
      const centered = isSectionCentered();

      if (
        centered &&
        !swiper.isBeginning &&
        !swiper.isEnd
      ) {
        // 🔒 Capture mousewheel → slide change
        swiper.mousewheel.enable();
      } else {
        // 🔓 Release mousewheel → page scroll
        swiper.mousewheel.disable();
      }
    }

    window.addEventListener('scroll', updateSwiperControl);
    swiper.on('slideChange', updateSwiperControl);

    // Initial state
    updateSwiperControl();
  });
}
