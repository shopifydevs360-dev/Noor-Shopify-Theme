document.addEventListener('DOMContentLoaded', () => {
  initVariantPriceUpdate();
  initMainProductCart();
  initMainProductVariantButtons();
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

  /* ADD TO CART */
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (behavior === 'redirect') {
      form.submit();
      return;
    }

    fetch('/cart/add.js', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(res => res.json())
      .then(() => {
        updateCartCount();
        if (behavior === 'ajax_drawer') openBagDrawer();
      })
      .catch(err => console.error(err));
  });

  /* BUY IT NOW */
  const buyNowBtn = root.querySelector('[data-role="buy-now"]');
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
   VARIANT BUTTON STATE LOGIC (FIXED)
================================= */
function initMainProductVariantButtons() {
  const root = document.querySelector('.main-product');
  if (!root || !window.product) return;

  const form = root.querySelector('form[action*="/cart/add"]');
  const variantInput = form?.querySelector('input[name="id"]');
  if (!form || !variantInput) return;

  // Initial state
  const initialVariant = window.product.variants.find(
    v => v.id == variantInput.value
  );
  updateButtonsByVariant(initialVariant);

  // On variant change
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
    updateButtonsByVariant(variant);
  });
}

/* =================================
   UPDATE BUTTON STATES BY VARIANT
   (SHOPIFY-CORRECT LOGIC)
================================= */
function updateButtonsByVariant(variant) {
  if (!variant) return;

  const root = document.querySelector('.main-product');
  if (!root) return;

  const addBtn = root.querySelector('[data-role="add-to-cart"]');
  const buyBtn = root.querySelector('[data-role="buy-now"]');
  const notifyBtn = root.querySelector('[data-role="notify"]');

  if (!addBtn || !buyBtn || !notifyBtn) return;

  const isOutOfStock = variant.inventory_quantity <= 0;
  const canPreorder = variant.inventory_policy === 'continue';

  /* RESET */
  addBtn.disabled = false;
  addBtn.textContent = 'Add to cart';
  addBtn.classList.remove('btn--disabled', 'btn--preorder');
  buyBtn.classList.remove('hide');
  notifyBtn.classList.add('hide');

  /* PRE-ORDER */
  if (isOutOfStock && canPreorder) {
    addBtn.textContent = 'Pre-order';
    addBtn.classList.add('btn--preorder');
    return;
  }

  /* OUT OF STOCK (DENY) */
  if (isOutOfStock && !canPreorder) {
    addBtn.textContent = 'Out of stock';
    addBtn.disabled = true;
    addBtn.classList.add('btn--disabled');

    buyBtn.classList.add('hide');
    notifyBtn.classList.remove('hide');
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
  const trigger = document.querySelector(
    '[data-trigger-section="bag-drawer"]'
  );
  if (trigger) trigger.click();
}
