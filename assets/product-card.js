// Product Card Functionality
let cartBehavior = '{{ settings.cart_behavior }}';

// Initialize product cards
document.addEventListener('DOMContentLoaded', function() {
  initializeProductCards();
});

function initializeProductCards() {
  // Only initialize if we're using ajax
  if (cartBehavior === 'ajax' || cartBehavior === 'ajax_drawer') {
    console.log('Cart behavior:', cartBehavior);
  }
}

// Add to cart function
function addToCart(button) {
  const variantId = button.dataset.variantId;
  const productTitle = button.dataset.productTitle;
  
  // Show loading state
  const originalHTML = button.innerHTML;
  button.innerHTML = '<div class="loading-spinner"></div>';
  button.disabled = true;
  
  // Add to cart via Shopify Cart API
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  })
  .then(response => response.json())
  .then(data => {
    // Restore button
    button.innerHTML = originalHTML;
    button.disabled = false;
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification(`${productTitle} added to cart!`);
    
    // Handle cart behavior
    if (cartBehavior === 'ajax_drawer') {
      openCartDrawer();
    }
    // For 'ajax' mode, just show notification (already done above)
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    button.innerHTML = originalHTML;
    button.disabled = false;
    showNotification('Error adding product to cart', 'error');
  });
}

// Update cart count
function updateCartCount() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      // Update cart count in header if element exists
      const cartCountElements = document.querySelectorAll('.cart-count, .header-cart-count');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    })
    .catch(error => console.error('Error fetching cart:', error));
}

// Open cart drawer (you'll need to implement this based on your theme)
function openCartDrawer() {
  // Check if cart drawer exists in theme
  const cartDrawer = document.querySelector('[data-cart-drawer]') || 
                     document.querySelector('.cart-drawer') || 
                     document.querySelector('#cart-drawer');
  
  if (cartDrawer) {
    cartDrawer.classList.add('active');
    // Add overlay if needed
    const overlay = document.querySelector('.cart-overlay') || document.querySelector('[data-cart-overlay]');
    if (overlay) {
      overlay.classList.add('active');
    }
  } else {
    console.warn('Cart drawer not found. Please add a cart drawer component to your theme.');
    // Fallback: show notification with link to cart
    showNotification('Product added! <a href="/cart" style="color: inherit; text-decoration: underline;">View Cart</a>');
  }
}

// Show notification
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.cart-notification');
  existingNotifications.forEach(notif => notif.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `cart-notification cart-notification--${type}`;
  notification.innerHTML = `
    <div class="cart-notification__content">
      ${message}
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Wishlist toggle function
function toggleWishlist(button) {
  button.classList.toggle('active');
  // Integrate with your wishlist app here
  console.log('Wishlist toggled');
}