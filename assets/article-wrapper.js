// Initialize on DOM load and section load
document.addEventListener('DOMContentLoaded', initArticleWrapper);
document.addEventListener('shopify:section:load', initArticleWrapper);

function initArticleWrapper() {
  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger library not loaded');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Find all article wrapper sections
  document.querySelectorAll('.js-pinned-sections').forEach(section => {
    // Get all panels and counters in this section
    const panels = gsap.utils.toArray(
      section.querySelectorAll('.js-pin-panel-wrap')
    );
    const counters = section.querySelectorAll('[data-counter-index]');

    // Skip if there's only one panel or no panels
    if (panels.length <= 1) return;

    // Kill any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section) st.kill();
    });

    // Set initial states - all panels invisible except the first one
    gsap.set(panels, { autoAlpha: 0, y: 40 });
    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    // Calculate scroll parameters
    const sectionHeight = section.offsetHeight;
    const totalScroll = panels.length * window.innerHeight; // Each panel takes up full viewport height
    const step = totalScroll / panels.length;

    // Create ScrollTrigger for each panel
    panels.forEach((panel, index) => {
      const isFirst = index === 0;
      const isLast = index === panels.length - 1;

      ScrollTrigger.create({
        trigger: section,
        start: `top top+=${step * index}`,
        end: `top top+=${step * (index + 1)}`,
        scrub: 0.5, // Smooth scrubbing
        
        onEnter: () => activatePanel(index),
        onEnterBack: () => activatePanel(index),
        
        onLeave: () => {
          if (!isLast) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.6 });
          }
        },
        
        onLeaveBack: () => {
          if (!isFirst) {
            gsap.to(panel, { autoAlpha: 0, y: -20, duration: 0.6 });
          }
        }
      });
    });

    // Pin the whole section
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalScroll}`,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      anticipatePin: 1
    });

    // Function to activate a specific panel
    function activatePanel(index) {
      // Animate all panels to their appropriate states
      panels.forEach((panel, i) => {
        if (i === index) {
          gsap.to(panel, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        } else {
          gsap.to(panel, {
            autoAlpha: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });

      // Update counter states
      counters.forEach(c => c.classList.remove('is-active'));
      if (counters[index]) counters[index].classList.add('is-active');
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  });

  // Refresh all ScrollTriggers
  ScrollTrigger.refresh();
}

// Handle Shopify section unload
document.addEventListener('shopify:section:unload', function(e) {
  if (e.target.querySelector('.js-pinned-sections')) {
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === e.target.querySelector('.js-pinned-sections')) {
        st.kill();
      }
    });
  }
});