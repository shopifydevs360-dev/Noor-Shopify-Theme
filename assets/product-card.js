document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('[data-cart-behavior]');
  const cartBehavior = section?.dataset.cartBehavior || 'redirect';

  /* ------------------------------
     ADD TO CART (SINGLE VARIANT)
  ------------------------------ */
  document.querySelectorAll('.product-form').forEach(form => {
    form.addEventListener('submit', e => {
      if (cartBehavior === 'redirect') return;

      e.preventDefault();
      ajaxAddToCart(new FormData(form));
    });
  });

  /* ------------------------------
     QUICK ADD (MULTI VARIANT)
  ------------------------------ */
  document.querySelectorAll('.js-quick-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      if (cartBehavior === 'redirect') return;

      const variantId = button.dataset.variantId;
      if (!variantId) return;

      ajaxAddToCart({
        items: [{ id: variantId, quantity: 1 }]
      });
    });
  });

  /* ------------------------------
     AJAX ADD FUNCTION
  ------------------------------ */
  function ajaxAddToCart(payload) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': payload instanceof FormData
          ? undefined
          : 'application/json'
      },
      body: payload instanceof FormData
        ? payload
        : JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(item => {
        refreshCart(cartBehavior);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to add product');
      });
  }

  /* ------------------------------
     UPDATE CART UI
  ------------------------------ */
  function refreshCart(behavior) {
    fetch('/cart.js')
      .then(res => res.json())
      .then(cart => {
        const count = document.querySelector('.cart-count');
        if (count) count.textContent = cart.item_count;

        if (behavior === 'ajax_drawer') {
          openCartDrawer();
        }
      });
  }

  /* ------------------------------
     CART DRAWER (HOOK)
  ------------------------------ */
  function openCartDrawer() {
    document.body.classList.add('cart-drawer-open');
    document.dispatchEvent(new CustomEvent('cart:open'));
  }
});
