document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
});

function initVariantPriceUpdate() {
  const form = document.querySelector('form[action*="/cart/add"]');
  const priceItems = document.querySelectorAll('.variant-price-item');
  const variantInput = form?.querySelector('input[name="id"]');

  if (!form || !priceItems.length || !window.product || !variantInput) {
    console.warn('Variant price system: missing elements');
    return;
  }

  // Initial state (first selected variant)
  updatePriceByVariantId(variantInput.value);

  form.addEventListener('change', () => {
    const selectedOptions = [];

    form.querySelectorAll('.variant-group').forEach(group => {
      const checked = group.querySelector('input:checked');
      if (checked) selectedOptions.push(checked.value);
    });

    const variant = window.product.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (!variant) return;

    // Update hidden variant ID
    variantInput.value = variant.id;

    // Update visible price
    updatePriceByVariantId(variant.id);
  });

  function updatePriceByVariantId(variantId) {
    priceItems.forEach(item => {
      if (item.dataset.variantId === String(variantId)) {
        item.classList.remove('hide-price');
        item.classList.add('show-price');
      } else {
        item.classList.add('hide-price');
        item.classList.remove('show-price');
      }
    });
  }
}
