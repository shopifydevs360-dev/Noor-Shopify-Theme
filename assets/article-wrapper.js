document.addEventListener('DOMContentLoaded', initArticleSwiper);
document.addEventListener('shopify:section:load', initArticleSwiper);

function initArticleSwiper() {
  document.querySelectorAll('.article-swiper').forEach(swiperEl => {
    if (swiperEl.classList.contains('swiper-initialized')) return;

    const wrapper = swiperEl.closest('.article-wrapper');
    const section = swiperEl.closest('.featured-posts');
    const counters = wrapper.querySelectorAll('.counter-item');
    
    // Variables for scroll-based interaction
    let isScrollingInSection = false;
    let scrollStartY = 0;
    let accumulatedScroll = 0;
    let currentSlide = 0;
    let isPageScrollLocked = false;
    
    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 700,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      allowTouchMove: false, // Disable touch/swipe
      mousewheel: false, // Disable mousewheel
      keyboard: false, // Disable keyboard navigation
    });

    // Sync number navigation
    swiper.on('slideChange', () => {
      counters.forEach(c => c.classList.remove('active-counter'));
      if (counters[swiper.activeIndex]) {
        counters[swiper.activeIndex].classList.add('active-counter');
      }
      currentSlide = swiper.activeIndex;
    });

    // Click number to slide
    counters.forEach(btn => {
      btn.addEventListener('click', () => {
        swiper.slideTo(parseInt(btn.dataset.slide, 10));
        currentSlide = parseInt(btn.dataset.slide, 10);
      });
    });
    
    // Check if element is in viewport center
    function isElementInViewportCenter(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      // Element is in center if its center point is within the viewport center
      const elementCenterY = rect.top + rect.height / 2;
      const viewportCenterY = windowHeight / 2;
      
      return Math.abs(elementCenterY - viewportCenterY) < 100; // 100px tolerance
    }
    
    // Lock page scroll
    function lockPageScroll() {
      if (isPageScrollLocked) return;
      isPageScrollLocked = true;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    }
    
    // Unlock page scroll
    function unlockPageScroll() {
      if (!isPageScrollLocked) return;
      isPageScrollLocked = false;
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    // Handle scroll events
    function handleScroll(e) {
      // Check if section is in viewport center
      if (isElementInViewportCenter(section)) {
        if (!isScrollingInSection) {
          // Just entered the section
          isScrollingInSection = true;
          scrollStartY = window.scrollY;
          accumulatedScroll = 0;
          lockPageScroll();
          return;
        }
        
        // Calculate scroll delta
        const scrollDelta = e.deltaY || (e.touches && e.touches[0].clientY - scrollStartY) || 0;
        accumulatedScroll += scrollDelta;
        
        // Determine slide change based on accumulated scroll
        const slideChangeThreshold = 100; // 100px per slide
        const slideChange = Math.floor(accumulatedScroll / slideChangeThreshold);
        
        if (slideChange !== 0) {
          const newSlide = currentSlide + slideChange;
          
          // Check bounds
          if (newSlide >= 0 && newSlide < swiper.slides.length) {
            swiper.slideTo(newSlide);
            accumulatedScroll = accumulatedScroll % slideChangeThreshold;
          } else if (newSlide < 0) {
            // Scrolled past the first slide, unlock and continue scrolling up
            unlockPageScroll();
            isScrollingInSection = false;
            window.scrollBy(0, scrollDelta);
          } else if (newSlide >= swiper.slides.length) {
            // Scrolled past the last slide, unlock and continue scrolling down
            unlockPageScroll();
            isScrollingInSection = false;
            window.scrollBy(0, scrollDelta);
          }
        }
      } else if (isScrollingInSection) {
        // Left the section while in scroll mode
        unlockPageScroll();
        isScrollingInSection = false;
      }
    }
    
    // Add scroll event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });
    
    // Clean up on section unload
    swiperEl.addEventListener('shopify:section:unload', () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      unlockPageScroll();
    });
  });
}