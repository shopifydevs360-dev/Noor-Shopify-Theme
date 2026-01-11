document.addEventListener('DOMContentLoaded', () => {
  initMainProductVariantAndCart();
});

/* =================================
   MAIN PRODUCT – VARIANT + CART
================================= */
function initMainProductVariantAndCart() {
  const root = document.querySelector('.main-product');
  if (!root || !window.product) return;

  const form = root.querySelector('.product-form');
  const variantInput = form?.querySelector('input[name="id"]');

  const actions = root.querySelector('.product-actions');
  const behavior = actions?.dataset.cartBehavior || 'redirect';

  const addBtn = root.querySelector('[data-role="add-to-cart"]');
  const buyBtn = root.querySelector('[data-role="buy-now"]');
  const notifyBtn = root.querySelector('[data-role="notify"]');

  if (!form || !variantInput || !addBtn || !buyBtn || !notifyBtn) return;

  /* -----------------------------
     INITIAL STATE
  ----------------------------- */
  updateUI(getCurrentVariant());

  /* -----------------------------
     VARIANT CHANGE
  ----------------------------- */
  form.addEventListener('change', () => {
    const variant = getCurrentVariant();
    if (!variant) return;

    // 🔑 ALWAYS UPDATE VARIANT ID
    variantInput.value = variant.id;

    updateUI(variant);
  });

  /* -----------------------------
     ADD TO CART
  ----------------------------- */
  form.addEventListener('submit', e => {
    // Allow Shopify redirect normally
    if (behavior === 'redirect') return;

    e.preventDefault();

    fetch('/cart/add.js', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(res => res.json())
      .then(() => {
        updateCartCount();
        if (behavior === 'ajax_drawer') openBagDrawer();
      })
      .catch(console.error);
  });

  /* -----------------------------
     BUY IT NOW
  ----------------------------- */
  buyBtn.addEventListener('click', () => {
    fetch('/cart/add.js', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(() => {
        window.location.href = '/checkout';
      })
      .catch(console.error);
  });

  /* -----------------------------
     GET CURRENT VARIANT
  ----------------------------- */
  function getCurrentVariant() {
    const selectedOptions = [];

    form.querySelectorAll('.variant-group').forEach(group => {
      const checked = group.querySelector('input[type="radio"]:checked');
      if (checked) selectedOptions.push(checked.value);
    });

    return window.product.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );
  }

  /* -----------------------------
     BUTTON + STOCK UI
  ----------------------------- */
  function updateUI(variant) {
    if (!variant) return;

    const isOut = variant.inventory_quantity <= 0;
    const canPreorder = variant.inventory_policy === 'continue';

    // RESET
    addBtn.disabled = false;
    addBtn.textContent = 'Add to cart';
    buyBtn.textContent = 'Buy it now';
    buyBtn.classList.remove('hide');
    notifyBtn.classList.add('hide');

    /* PRE-ORDER */
    if (isOut && canPreorder) {
      addBtn.textContent = 'Pre-order';
      buyBtn.textContent = 'Pre-order';
      return;
    }

    /* OUT OF STOCK */
    if (isOut && !canPreorder) {
      addBtn.textContent = 'Out of stock';
      addBtn.disabled = true;

      buyBtn.classList.add('hide');
      notifyBtn.classList.remove('hide');
    }
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
