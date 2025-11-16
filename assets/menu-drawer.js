document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerToggle = document.querySelector('[data-drawer-toggle="menu-drawer"]');
  const closeButton = document.querySelector('[data-drawer-close]');
  const panelsContainer = document.querySelector('.drawer__panels-container');
  
  // Check if elements exist
  if (!drawer) {
    console.error('Drawer element not found');
    return;
  }
  
  if (!overlay) {
    console.error('Overlay element not found');
    return;
  }
  
  // Keep track of navigation history
  const navigationHistory = ['main'];
  
  // Function to open the drawer
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
    // Reset to main panel when opening
    showPanel('main', false);
  }
  
  // Function to close the drawer
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
    // Reset to main panel when closing
    setTimeout(() => {
      showPanel('main', false);
    }, 300);
  }
  
  // Function to show a specific panel
  function showPanel(panelId, addToHistory = true) {
    console.log('Showing panel:', panelId); // Debug log
    
    // Find the target panel
    const targetPanel = document.querySelector(`[data-panel="${panelId}"]`);
    if (!targetPanel) {
      console.error('Panel not found:', panelId);
      return;
    }
    
    // Add to navigation history if needed
    if (addToHistory) {
      navigationHistory.push(panelId);
    } else {
      // Reset history
      navigationHistory.length = 0;
      navigationHistory.push('main');
    }
    
    // Update the transform of the panels container
    const panelIndex = Array.from(document.querySelectorAll('.drawer__panel')).indexOf(targetPanel);
    panelsContainer.style.transform = `translateX(-${panelIndex * 100}%)`;
    
    // Update active states
    document.querySelectorAll('.drawer__panel').forEach(panel => {
      panel.classList.remove('active');
    });
    targetPanel.classList.add('active');
    
    // Update ARIA attributes
    document.querySelectorAll('[data-submenu-toggle]').forEach(toggle => {
      const submenuId = toggle.getAttribute('data-submenu-toggle');
      toggle.setAttribute('aria-expanded', submenuId === panelId);
    });
  }
  
  // Function to go back to the previous panel
  function goBack() {
    if (navigationHistory.length > 1) {
      navigationHistory.pop(); // Remove current panel
      const previousPanelId = navigationHistory[navigationHistory.length - 1];
      showPanel(previousPanelId, false);
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
  
  // Event delegation for submenu toggles and back buttons
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
      showPanel(backToPanel, false);
    }
  });
});