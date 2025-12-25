document.addEventListener('DOMContentLoaded', initFeaturedArticles);
document.addEventListener('shopify:section:load', initFeaturedArticles);

function initFeaturedArticles() {
  document.querySelectorAll('.js-featured-articles').forEach(section => {
    const panels = section.querySelectorAll('.article-panel');
    if (panels.length < 2) return;

    let index = 0;
    let locked = false;
    let scrolling = false;

    panels[0].classList.add('is-active');

    function lockScroll() {
      if (locked) return;
      locked = true;
      document.body.classList.add('is-scroll-locked');
    }

    function unlockScroll() {
      if (!locked) return;
      locked = false;
      document.body.classList.remove('is-scroll-locked');
    }

    function sectionIsCentered() {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      return Math.abs(sectionCenter - windowCenter) < 50;
    }

    window.addEventListener('scroll', () => {
      if (sectionIsCentered()) {
        lockScroll();
      }
    });

    window.addEventListener(
      'wheel',
      e => {
        if (!locked || scrolling) return;

        scrolling = true;

        panels[index].classList.remove('is-active');

        if (e.deltaY > 0) {
          // scroll down
          if (index < panels.length - 1) {
            index++;
          } else {
            unlockScroll(); // end reached
            scrolling = false;
            return;
          }
        } else {
          // scroll up
          if (index > 0) {
            index--;
          } else {
            unlockScroll(); // start reached
            scrolling = false;
            return;
          }
        }

        panels[index].classList.add('is-active');

        setTimeout(() => {
          scrolling = false;
        }, 500);
      },
      { passive: false }
    );
  });
}
