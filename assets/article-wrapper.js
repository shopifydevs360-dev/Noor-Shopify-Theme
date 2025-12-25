document.addEventListener('DOMContentLoaded', initFeaturedArticles);
document.addEventListener('shopify:section:load', initFeaturedArticles);

function initFeaturedArticles() {
  document.querySelectorAll('.js-featured-articles').forEach(section => {
    const panels = section.querySelectorAll('.article-panel');
    if (panels.length < 2) return;

    let activeIndex = 0;
    let locked = false;

    panels[0].classList.add('is-active');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || locked) return;

          locked = true;

          setTimeout(() => {
            panels[activeIndex].classList.remove('is-active');
            activeIndex++;

            if (activeIndex < panels.length) {
              panels[activeIndex].classList.add('is-active');
            }

            locked = false;
          }, 300);
        });
      },
      { threshold: 0.7 }
    );

    observer.observe(section);
  });
}
