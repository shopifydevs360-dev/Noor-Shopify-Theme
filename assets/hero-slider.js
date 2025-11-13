  document.addEventListener('DOMContentLoaded', function() {
    const swiperContainer = document.querySelector('[data-section-id="{{ section.id }}"]');
    if (!swiperContainer) return;

    const swiper = new Swiper(swiperContainer, {
      loop: {{ section.settings.loop_sliders | json }},
      autoplay: {
        delay: {{ section.settings.change_sliders_every | times: 1000 }},
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      effect: 'slide', // Can be 'fade', 'cube', etc.
      speed: 500,

      // Navigation
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Disable navigation/pagination if hidden in settings
      navigation: {{ section.settings.show_navigation | json }} ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      } : false,
      pagination: {{ section.settings.show_pagination | json }} ? {
        el: '.swiper-pagination',
        clickable: true,
      } : false,
    });
  });