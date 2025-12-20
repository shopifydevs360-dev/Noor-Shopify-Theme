document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.js-product-carousel-{{ section.id }}');
  if (!section) return;

  const tabs = section.querySelectorAll('.js-slider-filter');
  const slides = section.querySelectorAll('.product-slide');

  /* ---------------- SWIPERS ---------------- */
  new Swiper(section.querySelector('.swiper-container-filter'), {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 40
  });

  const productSwiper = new Swiper(section.querySelector('.swiper-container-product'), {
    slidesPerView: 1.2,
    spaceBetween: 24,
    scrollbar: {
      el: section.querySelector('.swiper-scrollbar'),
      draggable: true
    },
    breakpoints: {
      768: { slidesPerView: 2.5 },
      1025: { slidesPerView: 3.5 }
    }
  });

  /* ---------------- INIT FIRST TAB ---------------- */
  const firstTab = tabs[0];
  const firstFilter = firstTab.dataset.filter;

  firstTab.closest('.related-product-caps').classList.add('active');

  slides.forEach(slide => {
    if (slide.dataset.collection === firstFilter) {
      slide.style.display = 'block';
    }
  });

  productSwiper.update();

  /* ---------------- TAB CLICK ---------------- */
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();

      const filter = tab.dataset.filter;

      /* active tab */
      section.querySelectorAll('.related-product-caps')
        .forEach(el => el.classList.remove('active'));
      tab.closest('.related-product-caps').classList.add('active');

      /* reset slides */
      slides.forEach(slide => {
        slide.style.display = '';
      });

      /* show matching slides */
      slides.forEach(slide => {
        if (slide.dataset.collection === filter) {
          slide.style.display = 'block';
        }
      });

      productSwiper.update();
      productSwiper.slideTo(0);
    });
  });
});