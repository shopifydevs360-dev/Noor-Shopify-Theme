const mediaThumbs = new Swiper('.product-media__thumbs', {
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
