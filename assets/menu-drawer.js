document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerToggle = document.querySelector('[data-drawer-toggle="menu-drawer"]');
  const closeButton = document.querySelector('[data-drawer-close]');
  
  // Function to open the drawer
  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('active');
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Function to close the drawer
  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }
  
  // Event listener for the menu trigger button
  if (drawerToggle) {
    drawerToggle.addEventListener('click', openDrawer);
  }
  
  // Event listener for the close button
  if (closeButton) {
    closeButton.addEventListener('click', closeDrawer);
  }
  
  // Event listener for clicking on the overlay
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }
  
  // Event listener for ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
});