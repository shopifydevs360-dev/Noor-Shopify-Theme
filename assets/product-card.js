document.addEventListener('DOMContentLoaded', function() {
  // Get the cart behavior from the data attribute on the main section
  const section = document.querySelector('.shopify-section[data-cart-behavior]');
  const cartBehavior = section ? section.dataset.cartBehavior : 'redirect';

  // AJAX Add to Cart
  const addToCartForms = document.querySelectorAll('.product-form');
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Only process if it's an AJAX form (not redirect)
      if (cartBehavior === 'redirect') return;

      e.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      
      // Show loading state
      submitButton.classList.add('loading');
      submitButton.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => response.json())
      .then(data => {
        // On success, update cart UI
        console.log('Product added to cart:', data);
        updateCartUI(data); 
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert(error.description || 'There was an error adding this product to your cart. Please try again.');
      })
      .finally(() => {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
      });
    });
  });

  // Placeholder for Wishlist functionality
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Wishlist functionality is not implemented. This would typically require an app or custom logic.');
    });
  });

  // Function to update the cart UI (e.g., cart drawer, cart count)
  function updateCartUI(addedItem) {
    // This is a placeholder. You would typically fetch the cart data
    // and update the UI elements like the cart count or open a cart drawer.
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        // Update cart count element if it exists
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
          cartCountElement.textContent = cart.item_count;
        }
        
        // Example: show a notification
        // showNotification(`${addedItem.title} has been added to your cart.`);
        
        // Example: open a cart drawer (you would need to implement this function)
        // if (typeof openCartDrawer === 'function') {
        //   openCartDrawer();
        // }
      });
  }
});