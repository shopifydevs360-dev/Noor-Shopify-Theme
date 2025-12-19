document.addEventListener("DOMContentLoaded", () => {
  initProductCardCartBehavior();
});

function initProductCardCartBehavior() {
  document.addEventListener("click", (e) => {
    const variantBtn = e.target.closest(".js-quick-add-to-cart");
    if (!variantBtn) return;

    const card = variantBtn.closest(".product-card");
    if (!card) return;

    const behavior = card.dataset.cartBehavior || "redirect";
    const variantId = variantBtn.dataset.variantId;

    if (behavior === "redirect") {
      window.location.href = `/cart/${variantId}:1`;
      return;
    }

    e.preventDefault();
    ajaxAddToCart(variantId, behavior, variantBtn);
  });

  document.addEventListener("submit", (e) => {
    const form = e.target.closest(".product-form");
    if (!form) return;

    const card = form.closest(".product-card");
    if (!card) return;

    const behavior = card.dataset.cartBehavior || "redirect";
    if (behavior === "redirect") return;

    e.preventDefault();
    const variantId = form.querySelector("[name='id']").value;
    const button = form.querySelector("button[type='submit']");
    ajaxAddToCart(variantId, behavior, button);
  });
}

function ajaxAddToCart(variantId, behavior, triggerEl) {
  triggerEl.classList.add("loading");
  triggerEl.disabled = true;

  fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: variantId, quantity: 1 })
  })
    .then((res) => res.json())
    .then((item) => {
      updateCartCount();

      if (behavior === "ajax_drawer") {
        if (typeof openCartDrawer === "function") {
          openCartDrawer();
        }
      }
    })
    .catch((err) => {
      console.error("Add to cart error:", err);
    })
    .finally(() => {
      triggerEl.classList.remove("loading");
      triggerEl.disabled = false;
    });
}

function updateCartCount() {
  fetch("/cart.js")
    .then((res) => res.json())
    .then((cart) => {
      document.querySelectorAll(".cart-count").forEach((el) => {
        el.textContent = cart.item_count;
      });
    });
}
