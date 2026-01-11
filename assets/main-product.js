document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
});

function initVariantPriceUpdate() {
  const form = document.querySelector('form[action*="/cart/add"]');
  const priceItems = document.querySelectorAll('.variant-price-item');
  const variantInput = form?.querySelector('input[name="id"]');

  if (!form || !priceItems.length || !window.product || !variantInput) {
    console.warn('Variant price update: missing elements');
    return;
  }

  // Show initial price
  togglePrice(variantInput.value);

  form.addEventListener('change', () => {
    const selectedOptions = [];

    form.querySelectorAll('.variant-group').forEach(group => {
      const checked = group.querySelector('input[type="radio"]:checked');
      if (checked) selectedOptions.push(checked.value);
    });

    const variant = window.product.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (!variant) return;

    // Update variant ID
    variantInput.value = variant.id;

    // Toggle price
    togglePrice(variant.id);
  });

  function togglePrice(variantId) {
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


