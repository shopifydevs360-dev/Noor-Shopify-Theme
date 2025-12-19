document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------
     SINGLE VARIANT (FORM SUBMIT)
  ---------------------------------- */
  document.querySelectorAll('.product-form').forEach(form => {
    form.addEventListener('submit', function () {
      // Let Shopify submit normally
      // Shopify will add product and redirect automatically
    });
  });

  /* ---------------------------------
     MULTI VARIANT (BUTTON CLICK)
  ---------------------------------- */
  document.querySelectorAll('.js-quick-add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const variantId = this.dataset.variantId;
      if (!variantId || this.disabled) return;

      // Create a form dynamically
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/cart/add';

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'id';
      input.value = variantId;

      form.appendChild(input);
      document.body.appendChild(form);

      // Submit and redirect to cart
      form.submit();
    });
  });

});
