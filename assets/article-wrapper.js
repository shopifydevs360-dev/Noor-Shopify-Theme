document.addEventListener('DOMContentLoaded', initFeaturedArticles);
document.addEventListener('shopify:section:load', initFeaturedArticles);

function initFeaturedArticles() {
  document.querySelectorAll('.js-featured-articles').forEach(section => {
    const panels = section.querySelectorAll('.article-panel');
    if (panels.length < 2) return;

    let index = 0;
    let ticking = false;

    section.addEventListener('wheel', e => {
      if (ticking) return;

      ticking = true;

      setTimeout(() => {
        panels[index].classList.remove('is-active');

        if (e.deltaY > 0 && index < panels.length - 1) {
          index++;
        } else if (e.deltaY < 0 && index > 0) {
          index--;
        }

        panels[index].classList.add('is-active');
        ticking = false;
      }, 400);
    }, { passive: true });
  });
}
