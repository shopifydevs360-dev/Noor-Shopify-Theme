document.addEventListener('DOMContentLoaded', initPinnedArticles);
document.addEventListener('shopify:section:load', initPinnedArticles);

function initPinnedArticles() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-featured-articles]').forEach(section => {
    if (section.dataset.init) return;
    section.dataset.init = 'true';

    const swiperEl = section.querySelector('.article-swiper');
    const counters = section.querySelectorAll('.counter-item');

    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 700,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      allowTouchMove: false
    });

    const slidesCount = swiper.slides.length;
    const SCROLL_STEP = 400;

    // Counter sync
    swiper.on('slideChange', () => {
      counters.forEach(c => c.classList.remove('active-counter'));
      counters[swiper.activeIndex]?.classList.add('active-counter');
    });

    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        swiper.slideTo(+btn.dataset.index);
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${slidesCount * SCROLL_STEP}`,
      pin: true,
      scrub: true,

      onUpdate(self) {
        const index = Math.round(self.progress * (slidesCount - 1));
        if (swiper.activeIndex !== index) {
          swiper.slideTo(index);
        }
      }
    });
  });
}
