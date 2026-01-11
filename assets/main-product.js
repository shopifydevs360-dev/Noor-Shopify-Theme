document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[action*="/cart/add"]');
  const priceEl = document.querySelector('.variant-price-update');
  const compareEl = document.querySelector('.variant-compare-update');
  const variantInput = form.querySelector('input[name="id"]');

  if (!window.product || !form) {
    console.error('Product JSON or form missing');
    return;
  }

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

    // UPDATE VARIANT ID (THIS IS THE KEY)
    variantInput.value = variant.id;

    // UPDATE PRICE
    priceEl.textContent = Shopify.formatMoney(
      variant.price,
      Shopify.money_format
    );

    if (variant.compare_at_price > variant.price) {
      compareEl.textContent = Shopify.formatMoney(
        variant.compare_at_price,
        Shopify.money_format
      );
      compareEl.style.display = '';
      priceEl.classList.add('price--sale');
    } else {
      compareEl.style.display = 'none';
      priceEl.classList.remove('price--sale');
    }
  });
});
