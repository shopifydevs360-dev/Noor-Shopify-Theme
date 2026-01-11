document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
});

function initVariantPriceUpdate() {
  const priceEl = document.querySelector('.variant-price-update');
  const compareEl = document.querySelector('.variant-compare-update');
  const form = document.querySelector('form[action*="/cart/add"]');

  if (!form || !priceEl || !window.product) return;

  const optionGroups = form.querySelectorAll('.variant-group');

  optionGroups.forEach(group => {
    group.addEventListener('change', updatePrice);
  });

  function updatePrice() {
    const selectedOptions = [];

    optionGroups.forEach(group => {
      const checked = group.querySelector('input[type="radio"]:checked');
      if (checked) selectedOptions.push(checked.value);
    });

    const matchedVariant = window.product.variants.find(variant =>
      variant.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (!matchedVariant) return;

    // Update main price
    priceEl.textContent = Shopify.formatMoney(
      matchedVariant.price,
      Shopify.money_format
    );

    // Handle compare price
    if (compareEl) {
      if (
        matchedVariant.compare_at_price &&
        matchedVariant.compare_at_price > matchedVariant.price
      ) {
        compareEl.textContent = Shopify.formatMoney(
          matchedVariant.compare_at_price,
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
