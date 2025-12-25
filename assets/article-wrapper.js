document.addEventListener('DOMContentLoaded', initFeaturedArticles);
document.addEventListener('shopify:section:load', initFeaturedArticles);

function initFeaturedArticles() {
  document.querySelectorAll('.js-featured-articles').forEach(section => {
    const panels = section.querySelectorAll('.article-panel');
    if (panels.length < 2) return;

    let index = 0;
    let isActive = false;
    let isAnimating = false;

    panels[0].classList.add('is-active');

    function isSectionCentered() {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      return Math.abs(center - viewportCenter) < 60;
    }

    function onWheel(e) {
      if (!isActive || isAnimating) return;

      e.preventDefault(); // ⛔ stop page scroll BUT scrollbar remains

      isAnimating = true;
      panels[index].classList.remove('is-active');

      if (e.deltaY > 0) {
        if (index < panels.length - 1) {
          index++;
        } else {
          isActive = false; // release scroll
          isAnimating = false;
          return;
        }
      } else {
        if (index > 0) {
          index--;
        } else {
          isActive = false; // release scroll
          isAnimating = false;
          return;
        }
      }

      panels[index].classList.add('is-active');

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }

    window.addEventListener('scroll', () => {
      if (isSectionCentered()) {
        isActive = true;
      }
    });

    window.addEventListener('wheel', onWheel, { passive: false });
  });
}
