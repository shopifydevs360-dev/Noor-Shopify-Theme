document.addEventListener('DOMContentLoaded', function() {
  // Check if RTL mode is enabled
  const isRTL = document.body.classList.contains('rtl');
  
  // Drawer functionality
  const drawerToggles = document.querySelectorAll('[data-drawer-toggle]');
  const drawerCloses = document.querySelectorAll('[data-drawer-close]');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const menuDrawer = document.getElementById('menu-drawer');
  
  // Toggle drawer
  function toggleDrawer(drawerId, isOpen) {
    const drawer = document.getElementById(drawerId);
    
    if (drawer) {
      if (isOpen) {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
        drawerOverlay.classList.add('active');
      } else {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
        drawerOverlay.classList.remove('active');
        
        // Reset mobile submenus
        const activeSubmenus = drawer.querySelectorAll('.menu__submenu.active');
        activeSubmenus.forEach(submenu => {
          submenu.classList.remove('active');
        });
      }
    }
  }
  
  // Drawer toggle events
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const drawerId = this.getAttribute('data-drawer-toggle');
      toggleDrawer(drawerId, true);
    });
  });
  
  // Drawer close events
  drawerCloses.forEach(close => {
    close.addEventListener('click', function() {
      const drawer = this.closest('.drawer');
      if (drawer) {
        toggleDrawer(drawer.id, false);
      }
    });
  });
  
  // Mobile submenu toggle
  if (window.innerWidth <= 767) {
    const submenuToggles = document.querySelectorAll('[data-toggle-submenu]');
    
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const submenuId = this.getAttribute('data-toggle-submenu');
        const submenu = document.querySelector(`[data-submenu="${submenuId}"]`);
        
        if (submenu) {
          submenu.classList.add('active');
        }
      });
    });
    
    // Back button for mobile submenus
    const backButtons = document.querySelectorAll('[data-back-button]');
    
    backButtons.forEach(button => {
      button.addEventListener('click', function() {
        const submenu = this.closest('.menu__submenu');
        if (submenu) {
          submenu.classList.remove('active');
        }
      });
    });
  }
  
  // Handle ESC key to close drawer
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openDrawer = document.querySelector('.drawer.open');
      if (openDrawer) {
        toggleDrawer(openDrawer.id, false);
      }
    }
  });
});