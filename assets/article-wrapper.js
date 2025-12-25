// Modern Articles Wrapper
class ModernArticles {
  constructor() {
    this.section = document.querySelector('.js-pinned-sections');
    if (!this.section) return;

    this.cards = Array.from(document.querySelectorAll('.js-pin-panel-wrap'));
    this.dots = Array.from(document.querySelectorAll('.dot'));
    this.arrows = {
      prev: document.querySelector('.prev-arrow'),
      next: document.querySelector('.next-arrow')
    };

    this.currentIndex = 0;
    this.isAnimating = false;
    this.animationDuration = 600;

    this.init();
  }

  init() {
    if (this.cards.length <= 1) return;

    this.setupEventListeners();
    this.setupScrollTrigger();
    this.updateNavigation();
  }

  setupEventListeners() {
    // Dot navigation
    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        this.goToArticle(index);
      });
    });

    // Arrow navigation
    if (this.arrows.prev) {
      this.arrows.prev.addEventListener('click', () => this.goToPrev());
    }

    if (this.arrows.next) {
      this.arrows.next.addEventListener('click', () => this.goToNext());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.goToPrev();
      if (e.key === 'ArrowRight') this.goToNext();
    });
  }

  setupScrollTrigger() {
    if (!window.gsap || !window.ScrollTrigger) return;

    const cards = this.cards;
    const totalHeight = 1000 * cards.length;
    const sectionHeight = totalHeight / cards.length;

    cards.forEach((card, index) => {
      const isFirst = index === 0;
      const isLast = index === cards.length - 1;

      ScrollTrigger.create({
        trigger: this.section,
        start: `top -=${sectionHeight * index}`,
        end: `+=${sectionHeight}`,
        onEnter: () => this.activateCard(index),
        onEnterBack: () => this.activateCard(index),
        onLeave: () => {
          if (!isLast) this.deactivateCard(index);
        },
        onLeaveBack: () => {
          if (!isFirst) this.deactivateCard(index);
        }
      });
    });

    // Pin the section
    ScrollTrigger.create({
      trigger: this.section,
      start: 'top top',
      end: `+=${totalHeight}`,
      pin: true,
      scrub: 0.5,
      markers: false
    });
  }

  activateCard(index) {
    if (this.isAnimating || index === this.currentIndex) return;

    this.isAnimating = true;
    this.currentIndex = index;

    // Animate cards
    gsap.to(this.cards, {
      duration: this.animationDuration / 1000,
      opacity: 0.3,
      y: 20,
      ease: 'power2.out'
    });

    gsap.to(this.cards[index], {
      duration: this.animationDuration / 1000,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      onComplete: () => {
        this.isAnimating = false;
      }
    });

    this.updateNavigation();
  }

  deactivateCard(index) {
    if (index === this.currentIndex) return;

    gsap.to(this.cards[index], {
      duration: this.animationDuration / 1000,
      opacity: 0.3,
      y: 20,
      ease: 'power2.out'
    });
  }

  goToArticle(index) {
    if (this.isAnimating || index === this.currentIndex) return;

    // Calculate scroll position
    const sectionHeight = window.innerHeight;
    const scrollTo = this.section.offsetTop + (sectionHeight * index);

    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });

    this.activateCard(index);
  }

  goToPrev() {
    if (this.currentIndex > 0) {
      this.goToArticle(this.currentIndex - 1);
    }
  }

  goToNext() {
    if (this.currentIndex < this.cards.length - 1) {
      this.goToArticle(this.currentIndex + 1);
    }
  }

  updateNavigation() {
    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });

    // Update arrows
    if (this.arrows.prev) {
      this.arrows.prev.disabled = this.currentIndex === 0;
    }

    if (this.arrows.next) {
      this.arrows.next.disabled = this.currentIndex === this.cards.length - 1;
    }

    // Update cards
    this.cards.forEach((card, index) => {
      if (index === this.currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
  new ModernArticles();
});

// Initialize on Shopify theme events
if (typeof Shopify !== 'undefined') {
  document.addEventListener('shopify:section:load', (e) => {
    if (e.target.querySelector('.js-pinned-sections')) {
      new ModernArticles();
    }
  });
}