document.addEventListener("DOMContentLoaded", () => {
  initAjaxAddToCart();
  initVariantAjaxAddToCart();
  initMainProductVariantButtons();
});

/* ---------------------------------
   SINGLE PRODUCT – AJAX MODE
---------------------------------- */
function initAjaxAddToCart() {
  document.querySelectorAll(
    '.cart-button-wrapper.btn-action--ajax .product-form,' +
    '.cart-button-wrapper.btn-action--ajax_drawer .product-form'
  ).forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const wrapper = this.closest('.cart-button-wrapper');
      const isDrawer = wrapper.classList.contains('btn-action--ajax_drawer');

      fetch('/cart/add.js', {
        method: 'POST',
        body: new FormData(this)
      })
        .then(res => res.json())
        .then(() => {
          updateCartCount();
          if (isDrawer) openBagDrawer();
        })
        .catch(err => console.error(err));
    });
  });
}

/* ---------------------------------
   MULTI VARIANT – AJAX MODE
---------------------------------- */
function initVariantAjaxAddToCart() {
  document.querySelectorAll(
    '.cart-button-wrapper.btn-action--ajax .variant-btn,' +
    '.cart-button-wrapper.btn-action--ajax_drawer .variant-btn'
  ).forEach(button => {
    button.addEventListener('click', function () {
      if (this.disabled) return;

      const wrapper = this.closest('.cart-button-wrapper');
      const isDrawer = wrapper.classList.contains('btn-action--ajax_drawer');

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.dataset.variantId,
          quantity: 1
        })
      })
        .then(res => res.json())
        .then(() => {
          updateCartCount();
          if (isDrawer) openBagDrawer();
        })
        .catch(err => console.error(err));
    });
  });
}

/* ---------------------------------
   MAIN PRODUCT – VARIANT BUTTON LOGIC
---------------------------------- */
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

/* ---------------------------------
   UPDATE BUTTON STATES BY VARIANT
---------------------------------- */
function updateButtonsByVariant(variant) {
  if (!variant) return;

  const root = document.querySelector('.main-product');
  if (!root) return;

  const addBtn = root.querySelector('[data-role="add-to-cart"]');
  const buyBtn = root.querySelector('[data-role="buy-now"]');
  const notifyBtn = root.querySelector('[data-role="notify"]');

  if (!addBtn || !buyBtn || !notifyBtn) return;

  const isAvailable = variant.available;
  const canPreorder = variant.inventory_policy === 'continue';

  // RESET
  addBtn.disabled = false;
  addBtn.textContent = 'Add to cart';
  addBtn.classList.remove('btn--disabled', 'btn--preorder');
  buyBtn.classList.remove('hide');
  notifyBtn.classList.add('hide');

  if (isAvailable) {
    // Normal state
    return;
  }

  if (canPreorder) {
    addBtn.textContent = 'Pre-order';
    addBtn.classList.add('btn--preorder');
    return;
  }

  // Out of stock (no continue selling)
  addBtn.textContent = 'Out of stock';
  addBtn.disabled = true;
  addBtn.classList.add('btn--disabled');

  buyBtn.classList.add('hide');
  notifyBtn.classList.remove('hide');
}

/* ---------------------------------
   CART COUNT UPDATE
---------------------------------- */
function updateCartCount() {
  fetch('/cart.js')
    .then(res => res.json())
    .then(cart => {
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.item_count;
      });
    });
}

/* ---------------------------------
   OPEN BAG DRAWER (EXISTING SYSTEM)
---------------------------------- */
function openBagDrawer() {
  const trigger = document.querySelector(
    '[data-trigger-section="bag-drawer"]'
  );

  if (trigger) {
    trigger.click();
  }
}
