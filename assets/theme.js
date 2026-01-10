/* ======================================
   THEME INITIALIZER
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  initBodyScrollState();
  initPromoBarState();
});

document.addEventListener("shopify:section:load", () => {
  initPromoBarState();
});

/* ===============================
   BODY: SCROLLED STATE
================================ */
function initBodyScrollState() {
  const SCROLL_THRESHOLD = 100;
  const body = document.body;

  function onScroll() {
    body.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ===============================
   BODY: PROMO BAR STATE
================================ */
function initPromoBarState() {
  const body = document.body;
  const promoBar = document.getElementById("announcement-bar");

  body.classList.toggle("has-promo-bar", !!promoBar);
}

/* ===============================
   FOOTER: NEWSLETTER FORM
================================ */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.js-newsletter-form');
  if (!forms.length) return;

  forms.forEach(form => {
    const checkbox = form.querySelector('.js-newsletter-checkbox');
    const submitBtn = form.querySelector('.js-newsletter-submit');
    const messageBox = form.querySelector('.js-newsletter-message');

    if (!checkbox || !submitBtn || !messageBox) return;

    // Initial state
    submitBtn.disabled = !checkbox.checked;

    checkbox.addEventListener('change', () => {
      submitBtn.disabled = !checkbox.checked;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      messageBox.hidden = true;
      messageBox.textContent = '';

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Newsletter submission failed');
        }

        messageBox.textContent =
          'Thank you! Check your inbox for your 15% off code.';
        messageBox.classList.remove('is-error');
        messageBox.classList.add('is-success');
        messageBox.hidden = false;

        form.reset();
        submitBtn.disabled = true;

      } catch (error) {
        messageBox.textContent =
          'Something went wrong. Please try again.';
        messageBox.classList.remove('is-success');
        messageBox.classList.add('is-error');
        messageBox.hidden = false;

        submitBtn.disabled = !checkbox.checked;
      }
    });
  });
}
