document.addEventListener("DOMContentLoaded", () => {
  initProductMedia();
});

function initProductMedia() {
  /* -------------------------
     Thumbnail Slider
  -------------------------- */
  const thumbs = document.querySelector('.product-media__thumbs');

  if (thumbs) {
    new Swiper(thumbs, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.product-media__thumbs .swiper-button-next',
        prevEl: '.product-media__thumbs .swiper-button-prev',
      },
      pagination: {
        el: '.product-media__thumbs .swiper-pagination',
        clickable: true,
      },
    });
  }

  /* -------------------------
     Lightbox
  -------------------------- */
  const lightbox = document.getElementById('mediaLightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.media-lightbox__close');
  const overlay = lightbox.querySelector('.media-lightbox__overlay');

  const lightboxSwiper = new Swiper('.media-lightbox__slider', {
    loop: true,
    navigation: {
      nextEl: '.media-lightbox .swiper-button-next',
      prevEl: '.media-lightbox .swiper-button-prev',
    },
    pagination: {
      el: '.media-lightbox .swiper-pagination',
      clickable: true,
    },
  });

  document.querySelectorAll('.js-open-lightbox').forEach((el, index) => {
    el.addEventListener('click', () => {
      lightbox.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      lightboxSwiper.slideToLoop(index, 0);
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
