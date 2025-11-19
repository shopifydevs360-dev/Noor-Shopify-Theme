document.addEventListener('DOMContentLoaded', function() {
  // AJAX Add to Cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart-js');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const form = this.closest('form');
      const formData = new FormData(form);
      
      // Show loading state
      button.classList.add('loading');
      button.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // On success, update cart UI (e.g., open cart drawer, update count)
        console.log('Product added to cart:', data);
        updateCartUI(); // You'll need to implement this function
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        alert('There was an error adding this product to your cart. Please try again.');
      })
      .finally(() => {
        // Remove loading state
        button.classList.remove('loading');
        button.disabled = false;
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
  function updateCartUI() {
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
        
        // Example: open a cart drawer
        // if (typeof openCartDrawer === 'function') {
        //   openCartDrawer();
        // }
      });
  }
});