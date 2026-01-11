document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
});

function initVariantPriceUpdate() {
  const priceEl = document.querySelector('.variant-price-update');
  const compareEl = document.querySelector('.variant-compare-update');
  const form = document.querySelector('form[action*="/cart/add"]');

  if (!priceEl || !form || !window.product) return;

  form.addEventListener('change', () => {
    const selectedOptions = [];

    form.querySelectorAll('input[type="radio"]:checked, select').forEach(el => {
      selectedOptions.push(el.value);
    });

    const variant = window.product.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (!variant) return;

    // Update price
    priceEl.textContent = Shopify.formatMoney(
      variant.price,
      Shopify.money_format
    );

    // Handle compare price
    if (compareEl) {
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        compareEl.textContent = Shopify.formatMoney(
          variant.compare_at_price,
          Shopify.money_format
        );
        compareEl.style.display = '';
      } else {
        compareEl.style.display = 'none';
      }
    }

    // Update price style
    priceEl.classList.toggle(
      'price--sale',
      variant.compare_at_price > variant.price
    );
    priceEl.classList.toggle(
      'price--regular',
      !(variant.compare_at_price > variant.price)
    );
  });
}
