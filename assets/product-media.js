document.addEventListener("DOMContentLoaded", () => {
  initProductMedia();
});

/* ---------------------------------
   PRODUCT MEDIA
---------------------------------- */
function initProductMedia() {
  initProductMediaSlider();
  initProductMediaLightbox();
}

/* ---------------------------------
   SWIPER SLIDER
---------------------------------- */
function initProductMediaSlider() {
  const slider = document.querySelector('.product-media__thumbs');
  if (!slider || typeof Swiper === 'undefined') return;

  new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,

    navigation: {
      nextEl: slider.querySelector('.swiper-button-next'),
      prevEl: slider.querySelector('.swiper-button-prev'),
    },

    pagination: {
      el: slider.querySelector('.swiper-pagination'),
      clickable: true,
    },

    grabCursor: true,
  });
}

/* ---------------------------------
   LIGHTBOX + ZOOM
---------------------------------- */
function initProductMediaLightbox() {
  const images = document.querySelectorAll('.js-thumb, .js-zoom-image');
  if (!images.length) return;

  let lightbox, swiper;

  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.dataset.full || img.src));
  });

  function openLightbox(startSrc) {
    if (!lightbox) createLightbox();

    const wrapper = lightbox.querySelector('.swiper-wrapper');
    wrapper.innerHTML = '';

    images.forEach(img => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';

      const image = document.createElement('img');
      image.src = img.dataset.full || img.src;

      slide.appendChild(image);
      wrapper.appendChild(slide);
    });

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    swiper = new Swiper(lightbox.querySelector('.swiper'), {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: lightbox.querySelector('.swiper-button-next'),
        prevEl: lightbox.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: lightbox.querySelector('.swiper-pagination'),
        clickable: true,
      },
    });

    const index = [...images].findIndex(img =>
      (img.dataset.full || img.src) === startSrc
    );
    if (index >= 0) swiper.slideToLoop(index);
  }

  function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'media-lightbox';

    lightbox.innerHTML = `
      <div class="media-lightbox__overlay"></div>
      <div class="media-lightbox__content">
        <button class="media-lightbox__close">&times;</button>
        <div class="swiper">
          <div class="swiper-wrapper"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    `;

    document.body.appendChild(lightbox);

    lightbox.querySelector('.media-lightbox__close')
      .addEventListener('click', closeLightbox);
    lightbox.querySelector('.media-lightbox__overlay')
      .addEventListener('click', closeLightbox);
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';

    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  }
}
