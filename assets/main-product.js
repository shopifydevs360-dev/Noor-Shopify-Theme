document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
  initMainProductCart();
});

/* =================================
   VARIANT PRICE UPDATE (UNCHANGED)
================================= */
function initVariantPriceUpdate() {
  const root = document.querySelector('.main-product');
  if (!root) return;

  const form = root.querySelector('form[action*="/cart/add"]');
  const priceItems = root.querySelectorAll('.variant-price-item');
  const variantInput = form?.querySelector('input[name="id"]');

  if (!form || !priceItems.length || !window.product || !variantInput) {
    console.warn('Variant price update: missing elements');
    return;
  }

  // Initial price
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

    variantInput.value = variant.id;
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

/* =================================
   MAIN PRODUCT – CART HANDLER (FIXED)
================================= */
function initMainProductCart() {
  const root = document.querySelector('.main-product');
  if (!root) return;

  const form = root.querySelector('.product-form');
  const actions = root.querySelector('.product-actions');
  const variantInput = form?.querySelector('input[name="id"]');

  if (!form || !actions || !variantInput) return;

  const behavior = actions.dataset.cartBehavior;

  /* -----------------------------
     ADD TO CART
  ----------------------------- */
  form.addEventListener('submit', e => {
    // ✅ Let Shopify handle normal redirect
    if (behavior === 'redirect') {
      return;
    }

    // ✅ Ajax modes only
    e.preventDefault();

    fetch('/cart/add.js', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(res => res.json())
      .then(() => {
        updateCartCount();
        if (behavior === 'ajax_drawer') {
          openBagDrawer();
        }
      })
      .catch(err => console.error(err));
  });

  /* -----------------------------
     BUY IT NOW
  ----------------------------- */
  const buyNowBtn = root.querySelector('.btn-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      fetch('/cart/add.js', {
        method: 'POST',
        body: new FormData(form)
      })
        .then(() => {
          window.location.href = '/checkout';
        })
        .catch(err => console.error(err));
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
