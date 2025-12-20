document.addEventListener("DOMContentLoaded", () => {
  initAjaxAddToCart();
  initVariantAjaxAddToCart();
});

/* ---------------------------------
   SINGLE PRODUCT – AJAX MODE
---------------------------------- */
function initAjaxAddToCart() {
  document.querySelectorAll(
    '.cart-button-wrapper.btn-action--ajax .product-form,' +
    '.cart-button-wrapper.btn-action--ajax_drawer .product-form'
  ).forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(() => {
          // success – cart updated
          // drawer hook will go here later
        })
        .catch(error => {
          console.error('Add to cart error:', error);
        });
    });
  });
}

/* ---------------------------------
   MULTI VARIANT – AJAX MODE
---------------------------------- */
function initVariantAjaxAddToCart() {
  document.querySelectorAll(
    '.cart-button-wrapper.btn-action--ajax .variant-btn,' +
    '.cart-button-wrapper.btn-action--ajax_drawer .variant-btn'
  ).forEach(button => {
    button.addEventListener('click', function () {
      if (this.disabled) return;

      const variantId = this.dataset.variantId;
      if (!variantId) return;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      })
        .then(res => res.json())
        .then(() => {
          // success – cart updated
          // drawer hook will go here later
        })
        .catch(error => {
          console.error('Add to cart error:', error);
        });
    });
  });
}
