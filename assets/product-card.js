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
     MULTI VARIANT ONLY
  ---------------------------------- */
  document.querySelectorAll('.variant-quick-add').forEach(button => {
    button.addEventListener('click', function () {
      if (this.disabled) return;

      const variantId = this.dataset.variantId;
      if (!variantId) return;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/cart/add';

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'id';
      input.value = variantId;

      form.appendChild(input);
      document.body.appendChild(form);

      form.submit();
    });
  });

});
