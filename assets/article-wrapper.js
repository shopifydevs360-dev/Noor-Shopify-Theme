document.addEventListener('DOMContentLoaded', initFeaturedArticles);
document.addEventListener('shopify:section:load', initFeaturedArticles);

function initFeaturedArticles() {
  document.querySelectorAll('.js-featured-articles').forEach(section => {
    const panels = section.querySelectorAll('.article-panel');
    if (panels.length < 2) return;

    let index = 0;
    let isAnimating = false;
    let isActive = false;

    panels[0].classList.add('is-active');

    function sectionIsCentered() {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      return Math.abs(sectionCenter - viewportCenter) < 80;
    }

    // Activate only when section is centered
    window.addEventListener('scroll', () => {
      isActive = sectionIsCentered();
    });

    // IMPORTANT: wheel only on section (not window)
    section.addEventListener(
      'wheel',
      e => {
        if (!isActive || isAnimating) return;

        e.preventDefault(); // stops page scroll but keeps scrollbar visible
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
      },
      { passive: false }
    );
  });
}
