document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger library not loaded');
    return;
  }

  const articleCards = document.querySelectorAll('.js-article-card');
  const counterItems = document.querySelectorAll('.featured-posts__counter-item');
  
  if (articleCards.length === 0) return;

  // Set initial state for all articles except the first one
  gsap.set(Array.from(articleCards).slice(1), { autoAlpha: 0, y: 40 });

  const totalHeight = 1000 * articleCards.length;
  const sectionHeight = totalHeight / articleCards.length;

  // Create scroll triggers for each article
  articleCards.forEach((article, index) => {
    const isFirst = index === 0;
    const isLast = index === articleCards.length - 1;

    ScrollTrigger.create({
      trigger: ".featured-posts",
      start: `top -=${sectionHeight * index}`,
      end: `+=${sectionHeight}`,
      onEnter: () => showArticle(index),
      onEnterBack: () => showArticle(index),
      onLeave: () => {
        if (!isLast) {
          gsap.to(article, { autoAlpha: 0, y: -20, duration: 0.6 });
        }
      },
      onLeaveBack: () => {
        if (!isFirst) {
          gsap.to(article, { autoAlpha: 0, y: -20, duration: 0.6 });
        }
      },
    });
  });

  // Main pinning scroll trigger
  ScrollTrigger.create({
    trigger: ".featured-posts",
    start: "top top",
    end: `+=${totalHeight}`,
    pin: true,
    scrub: true,
  });

  function showArticle(index) {
    // Animate the article
    gsap.to(articleCards[index], { autoAlpha: 1, y: 0, duration: 0.6 });
    
    // Update counter
    document.querySelector('.featured-posts__counter-item.is-active')?.classList.remove('is-active');
    document.querySelector(`.featured-posts__counter-item[data-counter-index="${index}"]`)?.classList.add('is-active');
  }
});