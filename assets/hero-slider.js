class HeroSlider extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('.hero-slider__inner');
    this.slides = this.querySelectorAll('.hero-slide');
    this.prevButton = this.querySelector('.hero-slider__arrow--prev');
    this.nextButton = this.querySelector('.hero-slider__arrow--next');
    this.dots = this.querySelectorAll('.hero-slider__dot');
    
    this.autoplay = this.dataset.autoplay === 'true';
    this.autoplaySpeed = parseInt(this.dataset.speed);
    this.loop = this.dataset.loop === 'true';
    this.autoplayInterval = null;
    this.currentSlide = 0;
    this.sliderEvent = new CustomEvent('slideChanged', { bubbles: true, detail: { currentSlide: this.currentSlide } });

    if (this.slides.length > 1) {
      this.init();
    }
  }

  init() {
    this.setupEventListeners();
    this.goToSlide(0, false); // Initialize the first slide
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  setupEventListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.nextSlide());
    }
    if (this.dots.length > 0) {
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });
    }

    // Pause on hover
    this.addEventListener('mouseenter', () => this.stopAutoplay());
    this.addEventListener('mouseleave', () => {
      if (this.autoplay) this.startAutoplay();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  goToSlide(index, animate = true) {
    // --- LOOP LOGIC ---
    if (!this.loop) {
      // If looping is disabled, stop at the ends
      if (index < 0) index = 0;
      if (index >= this.slides.length) index = this.slides.length - 1;
    } else {
      // If looping is enabled, wrap around
      if (index < 0) {
        index = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        index = 0;
      }
    }
    
    this.currentSlide = index;
    const offset = -index * 100;
    
    // The transition is now handled purely by CSS
    if (!animate) {
        this.slider.style.transition = 'none';
    } else {
        // Ensure the transition is enabled for animated slides
        this.slider.style.transition = '';
    }

    this.slider.style.transform = `translateX(${offset}%)`;
    
    this.updateDots();
    this.dispatchEvent(this.sliderEvent);
  }

  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentSlide - 1);
  }

  updateDots() {
    if (this.dots.length > 0) {
      this.dots.forEach((dot, index) => {
        if (index === this.currentSlide) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.removeAttribute('aria-current');
        }
      });
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}

customElements.define('hero-slider', HeroSlider);