document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
  initMainProductCart();
});

/* =================================
   VARIANT PRICE UPDATE (EXTENDED)
================================= */
function initVariantPriceUpdate() {
  const root = document.querySelector('.main-product');
  if (!root) return;

  const form = root.querySelector('form[action*="/cart/add"]');
  const priceItems = root.querySelectorAll('.variant-price-item');
  const variantInput = form?.querySelector('input[name="id"]');

  const addToCartBtn = root.querySelector('[data-role="add-to-cart"]');
  const buyNowBtn = root.querySelector('[data-role="buy-now"]');
  const notifyBtn = root.querySelector('[data-role="notify"]');

  if (!form || !priceItems.length || !window.product || !variantInput || !addToCartBtn) {
    console.warn('Variant price update: missing elements');
    return;
  }

  togglePrice(variantInput.value);
  toggleStockUI(variantInput.value);

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

    variantInput.value = variant.id;
    togglePrice(variant.id);
    toggleStockUI(variant.id);
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

  function toggleStockUI(variantId) {
    const variant = window.product.variants.find(v => v.id == variantId);
    if (!variant) return;

    const inStock = variant.inventory_quantity > 0;
    const backorder = !inStock && variant.inventory_policy === 'continue';

    if (inStock) {
      addToCartBtn.textContent = 'Add to cart';
      addToCartBtn.disabled = false;
    } else {
      addToCartBtn.textContent = 'Out of stock';
      addToCartBtn.disabled = true;
    }

    if (inStock) {
      buyNowBtn.textContent = 'Buy it now';
      buyNowBtn.classList.remove('hide');
      notifyBtn.classList.add('hide');
    } else if (backorder) {
      buyNowBtn.textContent = 'Pre-order';
      buyNowBtn.classList.remove('hide');
      notifyBtn.classList.add('hide');
    } else {
      buyNowBtn.classList.add('hide');
      notifyBtn.classList.remove('hide');
    }
  }
}

/* =================================
   MAIN PRODUCT – CART HANDLER
================================= */
function initMainProductCart() {
  const root = document.querySelector('.main-product');
  if (!root) return;

  const form = root.querySelector('.product-form');
  const actions = root.querySelector('.product-actions');
  const variantInput = form?.querySelector('input[name="id"]');

  if (!form || !actions || !variantInput) return;

  const behavior = actions.dataset.cartBehavior;

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (behavior === 'redirect') {
      form.submit();
      return;
    }

    if (form.querySelector('[data-role="add-to-cart"]').disabled) return;

    const formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(() => {
        updateCartCount();
        if (behavior === 'ajax_drawer') openBagDrawer();
      });
  });

  const buyNowBtn = root.querySelector('.btn-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (buyNowBtn.classList.contains('hide')) return;

      const formData = new FormData(form);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      }).then(() => {
        window.location.href = '/checkout';
      });
    });
  }
}

/* =================================
   CART COUNT UPDATE
================================= */
function updateCartCount() {
  fetch('/cart.js')
    .then(res => res.json())
    .then(cart => {
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.item_count;
      });
    });
}

/* =================================
   OPEN BAG DRAWER
================================= */
function openBagDrawer() {
  const trigger = document.querySelector('[data-trigger-section="bag-drawer"]');
  if (trigger) trigger.click();
}
