document.addEventListener('DOMContentLoaded', () => {
  initMainProductCart();
});

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

  /* -----------------------------
     ADD TO CART
  ----------------------------- */
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);

    if (behavior === 'redirect') {
      form.submit();
      return;
    }

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
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
  root.querySelector('.btn-buy-now').addEventListener('click', () => {
    const formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
      .then(() => {
        window.location.href = '/checkout';
      })
      .catch(err => console.error(err));
  });
}

/* =================================
   CART COUNT UPDATE (REUSED)
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
   OPEN BAG DRAWER (EXISTING SYSTEM)
================================= */
function openBagDrawer() {
  const trigger = document.querySelector(
    '[data-trigger-section="bag-drawer"]'
  );

  if (trigger) {
    trigger.click();
  }
}
