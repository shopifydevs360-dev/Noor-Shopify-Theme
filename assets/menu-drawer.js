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
    console.log('Showing panel:', panelId); // Debug log
    
    // Remove active class from all panels
    const allPanels = document.querySelectorAll('.drawer__panel');
    allPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Add active class to the requested panel
    const targetPanel = document.querySelector(`[data-panel="${panelId}"]`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      console.log('Panel found and activated:', panelId); // Debug log
    } else {
      console.error('Panel not found:', panelId); // Debug log
    }
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
  
  // Event delegation for submenu toggles
  document.addEventListener('click', function(e) {
    // Check if clicked element is a submenu toggle
    const submenuToggle = e.target.closest('[data-submenu-toggle]');
    if (submenuToggle) {
      e.preventDefault();
      const submenuId = submenuToggle.getAttribute('data-submenu-toggle');
      console.log('Submenu toggle clicked:', submenuId); // Debug log
      showPanel(submenuId);
    }
    
    // Check if clicked element is a back button
    const backButton = e.target.closest('[data-back-to]');
    if (backButton) {
      e.preventDefault();
      const backToPanel = backButton.getAttribute('data-back-to');
      console.log('Back button clicked:', backToPanel); // Debug log
      showPanel(backToPanel);
    }
  });
});