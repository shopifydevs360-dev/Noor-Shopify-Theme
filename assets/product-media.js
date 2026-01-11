document.addEventListener("DOMContentLoaded", () => {
  initProductMedia();
});

function initProductMedia() {
  /* =================================================
     INLINE PRODUCT MEDIA SLIDER
  ================================================= */
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

  /* =================================================
     LIGHTBOX SETUP
  ================================================= */
  const lightbox = document.getElementById('mediaLightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.media-lightbox__close');
  const overlay = lightbox.querySelector('.media-lightbox__overlay');
  const sliderEl = lightbox.querySelector('.media-lightbox__slider');

  const lightboxSwiper = new Swiper(sliderEl, {
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

  /* =================================================
     OPEN LIGHTBOX — IMAGES ONLY
  ================================================= */
  document.querySelectorAll('.js-open-lightbox').forEach((el, index) => {
    el.addEventListener('click', (e) => {
      if (el.tagName !== 'IMG') return; // 🔒 videos ignored

      e.preventDefault();
      e.stopPropagation();

      lightbox.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      lightboxSwiper.slideToLoop(index, 0);
      resetAllZoom(lightbox);
    });
  });

  /* =================================================
     CLOSE LIGHTBOX
  ================================================= */
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    resetAllZoom(lightbox);
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* =================================================
     ZOOM SYSTEM (3-STEP)
  ================================================= */
  lightbox.addEventListener('click', (e) => {
    const img = e.target.closest('.swiper-slide img');
    if (!img) return;

    toggleZoom(img);
  });

  enableDrag(lightbox);
}

/* =================================================
   ZOOM LOGIC
================================================= */
function toggleZoom(img) {
  const level = parseInt(img.dataset.zoomLevel || '0', 10);

  if (level === 0) {
    setZoom(img, 1.6, 1);
  } else if (level === 1) {
    setZoom(img, 2.5, 2);
  } else {
    resetZoom(img);
  }
}

function setZoom(img, scale, level) {
  img.dataset.zoomLevel = level;
  img.dataset.x = 0;
  img.dataset.y = 0;

  img.style.cursor = 'grab';
  img.style.transition = 'transform 0.25s ease';
  img.style.transform = `scale(${scale}) translate(0px, 0px)`;

  const swiper = img.closest('.swiper')?.swiper;
  if (swiper) swiper.allowTouchMove = false; // 🚫 disable Swiper drag
}

function resetZoom(img) {
  img.dataset.zoomLevel = 0;
  img.dataset.x = 0;
  img.dataset.y = 0;

  img.style.cursor = 'zoom-in';
  img.style.transition = 'transform 0.25s ease';
  img.style.transform = 'scale(1) translate(0px, 0px)';

  const swiper = img.closest('.swiper')?.swiper;
  if (swiper) swiper.allowTouchMove = true; // ✅ re-enable Swiper
}

/* =================================================
   RESET ALL ZOOM (ON CLOSE / SLIDE CHANGE)
================================================= */
function resetAllZoom(container) {
  container.querySelectorAll('img').forEach(img => {
    resetZoom(img);
  });
}

/* =================================================
   DRAG / PAN (MOUSE + TOUCH)
================================================= */
function enableDrag(lightbox) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentImg = null;

  lightbox.addEventListener('mousedown', startDrag);
  lightbox.addEventListener('touchstart', startDrag, { passive: false });

  function startDrag(e) {
    const img = e.target.closest('.swiper-slide img');
    if (!img || img.dataset.zoomLevel === '0') return;

    isDragging = true;
    currentImg = img;

    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX - (parseFloat(img.dataset.x) || 0);
    startY = point.clientY - (parseFloat(img.dataset.y) || 0);

    img.style.cursor = 'grabbing';
  }

  document.addEventListener('mousemove', moveDrag);
  document.addEventListener('touchmove', moveDrag, { passive: false });

  function moveDrag(e) {
    if (!isDragging || !currentImg) return;
    e.preventDefault();

    const point = e.touches ? e.touches[0] : e;
    const x = point.clientX - startX;
    const y = point.clientY - startY;

    currentImg.dataset.x = x;
    currentImg.dataset.y = y;

    const scale =
      currentImg.dataset.zoomLevel === '2' ? 2.5 : 1.6;

    currentImg.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`;
  }

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  function endDrag() {
    if (!currentImg) return;
    currentImg.style.cursor = 'grab';
    isDragging = false;
    currentImg = null;
  }
}
