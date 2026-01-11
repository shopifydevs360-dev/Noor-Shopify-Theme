document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
});

function initVariantPriceUpdate() {
  const priceEl = document.querySelector('.variant-price-update');
  const compareEl = document.querySelector('.variant-compare-update');
  const form = document.querySelector('.product-block form[action*="/cart/add"]');

  if (!form || !priceEl || !window.product) {
    console.warn('Variant price update: missing elements or product JSON');
    return;
  }

  const optionGroups = form.querySelectorAll('.variant-group');
  if (!optionGroups.length) return;

  optionGroups.forEach(group => {
    group.addEventListener('change', updatePrice);
  });

  function updatePrice() {
    const selectedOptions = [];

    optionGroups.forEach(group => {
      const checked = group.querySelector('input[type="radio"]:checked');
      if (checked) selectedOptions.push(checked.value);
    });

    const variant = window.product.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (!variant) return;

    // Update main price
    priceEl.textContent = Shopify.formatMoney(
      variant.price,
      Shopify.money_format
    );

    // Update compare price
    if (compareEl) {
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
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
    }
  }
}
