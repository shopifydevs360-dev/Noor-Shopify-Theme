document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerToggle = document.querySelector('[data-drawer-toggle="menu-drawer"]');
  const closeButton = document.querySelector('[data-drawer-close]');
  
  // Check if elements exist
  if (!drawer) {
    console.error('Drawer element not found');
    return;
  }
  
  if (!overlay) {
    console.error('Overlay element not found');
    return;
  }
  
  // Function to open the drawer
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
  }
  
  // Function to close the drawer
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  // Event listener for the menu trigger button
  if (drawerToggle) {
    drawerToggle.addEventListener('click', openDrawer);
  } else {
    console.error('Drawer toggle button not found');
  }
  
  // Event listener for the close button
  if (closeButton) {
    closeButton.addEventListener('click', closeDrawer);
  } else {
    console.error('Close button not found');
  }
  
  // Event listener for clicking on the overlay
  overlay.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeDrawer();
  });
  
  // Event listener for ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
});