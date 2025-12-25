document.addEventListener('DOMContentLoaded', initScrollSlider);
document.addEventListener('shopify:section:load', initScrollSlider);

function initScrollSlider() {
  document.querySelectorAll('[data-scroll-slider]').forEach(section => {
    if (section.dataset.initialized) return;
    section.dataset.initialized = 'true';

    const swiperEl = section.querySelector('.article-swiper');
    const counters = section.querySelectorAll('.counter-item');
    const slidesCount = swiperEl.querySelectorAll('.swiper-slide').length;

    const swiper = new Swiper(swiperEl, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      slidesPerView: 1,
      allowTouchMove: false,
      speed: 600
    });

    let activeIndex = 0;
    let isLocked = false;
    let lastScrollY = window.scrollY;
    let scrollAccumulator = 0;
    const SCROLL_STEP = 100;

    function updateCounters(index) {
      counters.forEach(c => c.classList.remove('active-counter'));
      counters[index]?.classList.add('active-counter');
    }

    function isSectionCentered() {
      const rect = section.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;
      return rect.top <= viewportMiddle && rect.bottom >= viewportMiddle;
    }

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      if (!isSectionCentered()) {
        isLocked = false;
        scrollAccumulator = 0;
        document.body.classList.remove('scroll-locked');
        return;
      }

      isLocked = true;
      document.body.classList.add('scroll-locked');
      scrollAccumulator += delta;

      if (scrollAccumulator >= SCROLL_STEP && activeIndex < slidesCount - 1) {
        activeIndex++;
        swiper.slideTo(activeIndex);
        updateCounters(activeIndex);
        scrollAccumulator = 0;
      }

      if (scrollAccumulator <= -SCROLL_STEP && activeIndex > 0) {
        activeIndex--;
        swiper.slideTo(activeIndex);
        updateCounters(activeIndex);
        scrollAccumulator = 0;
      }

      if (
        (activeIndex === slidesCount - 1 && scrollAccumulator > 0) ||
        (activeIndex === 0 && scrollAccumulator < 0)
      ) {
        isLocked = false;
        document.body.classList.remove('scroll-locked');
      }
    });

    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        activeIndex = Number(btn.dataset.slide);
        swiper.slideTo(activeIndex);
        updateCounters(activeIndex);
      });
    });
  });
}
