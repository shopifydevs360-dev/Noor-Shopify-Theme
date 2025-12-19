document.addEventListener('click', function (e) {
  const btn = e.target.closest('.js-add-to-cart');
  if (!btn) return;

  e.preventDefault();

  const variantId = btn.dataset.variantId;

  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  })
  .then(res => res.json())
  .then(() => {
    // open cart drawer OR update cart
  });
});
