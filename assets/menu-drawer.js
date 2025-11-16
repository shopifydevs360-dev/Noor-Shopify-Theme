document.addEventListener('DOMContentLoaded', function() {
  // Check if RTL mode is enabled
  const isRTL = document.body.classList.contains('rtl');
  
  // Drawer functionality
  const drawerToggles = document.querySelectorAll('[data-drawer-toggle]');
  const drawerCloses = document.querySelectorAll('[data-drawer-close]');
  const drawer = document.getElementById('menu-drawer');
  const drawerOverlay = drawer.querySelector('.drawer__overlay');
  
  // Panel navigation
  const panelToggles = document.querySelectorAll('[data-panel-toggle]');
  const panelBacks = document.querySelectorAll('[data-panel-back]');
  
  // Mobile detection
  const isMobile = window.innerWidth <= 767;
  
  // Open drawer
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const drawerId = this.getAttribute('data-drawer-toggle');
      
      if (drawerId === 'menu-drawer') {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Reset all panels on open
        resetPanels();
      }
    });
  });
  
  // Close drawer
  drawerCloses.forEach(close => {
    close.addEventListener('click', function() {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      
      // Reset panels after closing animation
      setTimeout(resetPanels, 300);
    });
  });
  
  // Close drawer when clicking on overlay
  drawerOverlay.addEventListener('click', function() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    
    // Reset panels after closing animation
    setTimeout(resetPanels, 300);
  });
  
  // Panel navigation - forward
  panelToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPanel = this.getAttribute('data-panel-toggle');
      const parentTitle = this.getAttribute('data-parent-title');
      const submenu = this.nextElementSibling;
      
      if (targetPanel && submenu) {
        openPanel(targetPanel, parentTitle, submenu, isMobile);
      }
    });
  });
  
  // Panel navigation - back
  panelBacks.forEach(back => {
    back.addEventListener('click', function() {
      const targetPanel = this.getAttribute('data-panel-back');
      
      if (targetPanel) {
        closePanel(targetPanel, isMobile);
      }
    });
  });
  
  // Close drawer when clicking outside
  document.addEventListener('click', function(event) {
    if (drawer.classList.contains('open') && 
        !drawer.contains(event.target) && 
        !event.target.closest('[data-drawer-toggle]')) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      
      // Reset panels after closing animation
      setTimeout(resetPanels, 300);
    }
  });
  
  // Handle ESC key to close drawer
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      
      // Reset panels after closing animation
      setTimeout(resetPanels, 300);
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const newIsMobile = window.innerWidth <= 767;
    
    // If we switch between mobile and desktop, reset panels
    if (isMobile !== newIsMobile) {
      resetPanels();
    }
  });
  
  // Functions
  function openPanel(panelNumber, title, submenu, isMobileView) {
    const targetPanel = drawer.querySelector(`[data-panel="${panelNumber}"]`);
    const targetList = targetPanel.querySelector('.menu__list');
    const targetTitle = targetPanel.querySelector('.drawer__panel-title');
    
    // Set panel title
    targetTitle.textContent = title;
    
    // Clone submenu content to target panel
    targetList.innerHTML = '';
    const clonedContent = submenu.cloneNode(true);
    targetList.appendChild(clonedContent);
    
    // Add event listeners to new elements
    const newPanelToggles = targetList.querySelectorAll('[data-panel-toggle]');
    newPanelToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const nextPanel = this.getAttribute('data-panel-toggle');
        const nextTitle = this.getAttribute('data-parent-title');
        const nextSubmenu = this.nextElementSibling;
        
        if (nextPanel && nextSubmenu) {
          openPanel(nextPanel, nextTitle, nextSubmenu, isMobileView);
        }
      });
    });
    
    // Show panel
    if (isMobileView) {
      // Mobile: slide in from right
      targetPanel.classList.add('active');
    } else {
      // Desktop: show side by side
      drawer.classList.add(`panel-${panelNumber}-open`);
    }
  }
  
  function closePanel(panelNumber, isMobileView) {
    const targetPanel = drawer.querySelector(`[data-panel="${panelNumber}"]`);
    
    if (isMobileView) {
      // Mobile: just hide current panel
      const currentPanel = drawer.querySelector('.drawer__panel.active');
      if (currentPanel) {
        currentPanel.classList.remove('active');
      }
    } else {
      // Desktop: hide all panels after the target
      for (let i = parseInt(panelNumber) + 1; i <= 4; i++) {
        drawer.classList.remove(`panel-${i}-open`);
      }
    }
  }
  
  function resetPanels() {
    // Remove all panel states
    drawer.classList.remove('panel-2-open', 'panel-3-open', 'panel-4-open');
    
    // Remove active class from all panels
    drawer.querySelectorAll('.drawer__panel').forEach(panel => {
      panel.classList.remove('active');
    });
  }
});