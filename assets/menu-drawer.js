document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerToggle = document.querySelector('[data-drawer-toggle="menu-drawer"]');
  const closeButton = document.querySelector('[data-drawer-close]');
  const submenuToggles = document.querySelectorAll('[data-submenu-toggle]');
  const backButtons = document.querySelectorAll('[data-back-to]');
  
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
    // Reset to main panel when opening
    showPanel('main');
  }
  
  // Function to close the drawer
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
    // Reset to main panel when closing
    setTimeout(() => {
      showPanel('main');
    }, 300);
  }
  
  // Function to show a specific panel
  function showPanel(panelId) {
    // Hide all panels
    const allPanels = document.querySelectorAll('.drawer__panel');
    allPanels.forEach(panel => {
      panel.hidden = true;
    });
    
    // Show the requested panel
    const targetPanel = document.querySelector(`[data-panel="${panelId}"]`);
    if (targetPanel) {
      targetPanel.hidden = false;
    }
    
    // Update ARIA attributes for submenu toggles
    submenuToggles.forEach(toggle => {
      const submenuId = toggle.getAttribute('aria-controls');
      const submenu = document.getElementById(submenuId);
      if (submenu) {
        toggle.setAttribute('aria-expanded', !submenu.hidden);
      }
    });
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
  
  // Event listeners for submenu toggles
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const submenuId = toggle.getAttribute('data-submenu-toggle');
      showPanel(submenuId);
    });
  });
  
  // Event listeners for back buttons
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      const backToPanel = button.getAttribute('data-back-to');
      showPanel(backToPanel);
    });
  });
});