document.addEventListener('DOMContentLoaded', () => {
  initProductMedia();
});

function initProductMedia() {

  /* =========================
     INLINE SLIDER
  ========================= */
  const thumbs = document.querySelector('.product-media__thumbs');
  if (thumbs) {
    new Swiper(thumbs, {
      loop: true,
      navigation: {
        nextEl: '.product-media__thumbs .swiper-button-next',
        prevEl: '.product-media__thumbs .swiper-button-prev'
      },
      pagination: {
        el: '.product-media__thumbs .swiper-pagination',
        clickable: true
      }
    });
  }

  /* =========================
     LIGHTBOX
  ========================= */
  const lightbox = document.getElementById('mediaLightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.media-lightbox__close');
  const overlay = lightbox.querySelector('.media-lightbox__overlay');
  const sliderEl = lightbox.querySelector('.media-lightbox__slider');

  const lightboxSwiper = new Swiper(sliderEl, {
    loop: true,
    navigation: {
      nextEl: '.media-lightbox .swiper-button-next',
      prevEl: '.media-lightbox .swiper-button-prev'
    },
    pagination: {
      el: '.media-lightbox .swiper-pagination',
      clickable: true
    }
  });

  /* =========================
     OPEN LIGHTBOX
  ========================= */
  document.querySelectorAll('.js-open-lightbox').forEach(img => {
    img.addEventListener('click', () => {
      const index = parseInt(img.dataset.index, 10) || 0;

      lightbox.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';

      lightboxSwiper.slideToLoop(index, 0);
      resetZoom();
    });
  });

  /* =========================
     CLOSE
  ========================= */
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    resetZoom();
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* =========================
     ZOOM + PAN
  ========================= */
  let zoomLevel = 0;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let activeImg = null;
  let dragging = false;

  sliderEl.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img) return;

    zoomLevel = (zoomLevel + 1) % 3;

    if (zoomLevel === 0) {
      resetZoom();
    } else {
      const scale = zoomLevel === 1 ? 1.6 : 2.5;
      activeImg = img;
      img.classList.add('is-zoomed');
      img.style.transform = `scale(${scale}) translate(0px, 0px)`;
      sliderEl.swiper.allowTouchMove = false;
    }
  });

  sliderEl.addEventListener('mousedown', e => {
    if (!activeImg || zoomLevel === 0) return;
    dragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
  });

  window.addEventListener('mousemove', e => {
    if (!dragging || !activeImg) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    const scale = zoomLevel === 1 ? 1.6 : 2.5;
    activeImg.style.transform =
      `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
  });

  function resetZoom() {
    sliderEl.querySelectorAll('img').forEach(img => {
      img.classList.remove('is-zoomed');
      img.style.transform = 'scale(1) translate(0,0)';
    });

    zoomLevel = 0;
    currentX = 0;
    currentY = 0;
    activeImg = null;
    sliderEl.swiper.allowTouchMove = true;
  }
}
