document.addEventListener('DOMContentLoaded', () => {
  initProductMediaSlider();
  initProductMediaLightbox();
});

/* =================================================
   INLINE PRODUCT MEDIA SLIDER
================================================= */
function initProductMediaSlider() {
  const sliderEl = document.querySelector('.product-media__thumbs');
  if (!sliderEl) return;

  new Swiper(sliderEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,

    navigation: {
      nextEl: '.product-media__thumbs .swiper-button-next',
      prevEl: '.product-media__thumbs .swiper-button-prev',
    },

    pagination: {
      el: '.product-media__thumbs .swiper-pagination',
      clickable: true,
    },

    grabCursor: true,
    watchSlidesProgress: true,
  });
}

/* =================================================
   LIGHTBOX — IMAGES ONLY
================================================= */
function initProductMediaLightbox() {
  const imageTriggers = document.querySelectorAll(
    '.product-media img.js-thumb, .product-media img.js-zoom-image'
  );

  if (!imageTriggers.length) return;

  imageTriggers.forEach(img => {
    img.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      openMediaLightbox(img);
    });
  });
}

/* =================================================
   OPEN LIGHTBOX
================================================= */
function openMediaLightbox(clickedImage) {
  let lightbox = document.querySelector('.media-lightbox');

  if (!lightbox) {
    lightbox = createMediaLightbox();
    document.body.appendChild(lightbox);
  }

  const swiperWrapper = lightbox.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = '';

  const allImages = document.querySelectorAll('.product-media img[data-full], .product-media img.js-zoom-image');

  let startIndex = 0;

  allImages.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const image = document.createElement('img');
    image.src = img.dataset.full || img.src;
    image.alt = img.alt || '';

    slide.appendChild(image);
    swiperWrapper.appendChild(slide);

    if (img === clickedImage) {
      startIndex = index;
    }
  });

  lightbox.classList.add('is-open');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  initLightboxSwiper(lightbox, startIndex);
}

/* =================================================
   CREATE LIGHTBOX MARKUP
================================================= */
function createMediaLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'media-lightbox';

  lightbox.innerHTML = `
    <div class="media-lightbox__overlay"></div>

    <div class="media-lightbox__content">
      <button class="media-lightbox__close" aria-label="Close">&times;</button>

      <div class="swiper">
        <div class="swiper-wrapper"></div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  `;

  /* Close events */
  lightbox.querySelector('.media-lightbox__overlay')
    .addEventListener('click', closeMediaLightbox);

  lightbox.querySelector('.media-lightbox__close')
    .addEventListener('click', closeMediaLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMediaLightbox();
  });

  return lightbox;
}

/* =================================================
   LIGHTBOX SWIPER
================================================= */
function initLightboxSwiper(lightbox, startIndex) {
  const swiperEl = lightbox.querySelector('.swiper');

  if (swiperEl.swiper) {
    swiperEl.swiper.destroy(true, true);
  }

  new Swiper(swiperEl, {
    initialSlide: startIndex,
    loop: true,

    navigation: {
      nextEl: '.media-lightbox .swiper-button-next',
      prevEl: '.media-lightbox .swiper-button-prev',
    },

    pagination: {
      el: '.media-lightbox .swiper-pagination',
      clickable: true,
    },

    grabCursor: true,
  });
}

/* =================================================
   CLOSE LIGHTBOX
================================================= */
function closeMediaLightbox() {
  const lightbox = document.querySelector('.media-lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('is-open');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}
