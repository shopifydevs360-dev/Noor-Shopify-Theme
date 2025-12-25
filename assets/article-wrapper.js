document.addEventListener('DOMContentLoaded', initArticleScrollInteraction);
document.addEventListener('shopify:section:load', initArticleScrollInteraction);

function initArticleScrollInteraction() {
  const sections = document.querySelectorAll('.featured-posts');
  
  sections.forEach(section => {
    const swiperEl = section.querySelector('.article-swiper');
    if (!swiperEl) return;
    
    // Initialize Swiper
    const swiper = new Swiper(swiperEl, {
      direction: 'vertical',
      slidesPerView: 1,
      speed: 500,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      allowTouchMove: false,
      mousewheel: false,
      simulateTouch: false
    });
    
    const counters = section.querySelectorAll('.counter-item');
    const totalSlides = swiper.slides.length;
    let isSectionLocked = false;
    let currentSlide = 0;
    let scrollAccumulator = 0;
    const SCROLL_THRESHOLD = 100; // 100px per slide change
    
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
      });
    });
    
    // Scroll handler
    function handleScroll() {
      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionMiddle = windowHeight / 2;
      
      // Check if section is in the middle of the viewport
      const isInMiddle = (
        sectionRect.top <= sectionMiddle &&
        sectionRect.bottom >= sectionMiddle
      );
      
      if (isInMiddle && !isSectionLocked) {
        // Entering the locked state
        isSectionLocked = true;
        section.classList.add('section-locked');
        scrollAccumulator = 0;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else if (!isInMiddle && isSectionLocked) {
        // Exiting the locked state
        isSectionLocked = false;
        section.classList.remove('section-locked');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        scrollAccumulator = 0;
      }
    }
    
    // Wheel handler for slide changes
    function handleWheel(e) {
      if (!isSectionLocked) return;
      
      // Prevent default scrolling
      e.preventDefault();
      
      // Accumulate scroll delta
      scrollAccumulator += Math.abs(e.deltaY);
      
      // Check if we've accumulated enough scroll for a slide change
      if (scrollAccumulator >= SCROLL_THRESHOLD) {
        const direction = e.deltaY > 0 ? 1 : -1; // 1 = down, -1 = up
        
        if (direction === 1 && currentSlide < totalSlides - 1) {
          // Scroll down - go to next slide
          swiper.slideNext();
          scrollAccumulator = 0;
        } else if (direction === -1 && currentSlide > 0) {
          // Scroll up - go to previous slide
          swiper.slidePrev();
          scrollAccumulator = 0;
        } else if (
          (direction === 1 && currentSlide === totalSlides - 1) ||
          (direction === -1 && currentSlide === 0)
        ) {
          // Reached the end, unlock section
          isSectionLocked = false;
          section.classList.remove('section-locked');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          scrollAccumulator = 0;
        }
      }
    }
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    section.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup function
    const cleanup = () => {
      window.removeEventListener('scroll', handleScroll);
      section.removeEventListener('wheel', handleWheel);
    };
    
    // Store cleanup reference
    section._scrollCleanup = cleanup;
  });
}

// Cleanup function for section reload
function cleanupArticleScrollInteraction() {
  document.querySelectorAll('.featured-posts').forEach(section => {
    if (section._scrollCleanup) {
      section._scrollCleanup();
    }
  });
}