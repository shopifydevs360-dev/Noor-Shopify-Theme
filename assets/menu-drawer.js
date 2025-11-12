document.addEventListener('DOMContentLoaded', function() {
  // Drawer functionality
  const drawerToggles = document.querySelectorAll('[data-drawer-toggle]');
  const drawerCloses = document.querySelectorAll('[data-drawer-close]');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mainElement = document.querySelector('main');
  
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const drawerId = this.getAttribute('data-drawer-toggle');
      const drawer = document.getElementById(drawerId);
      
      if (drawer) {
        drawer.classList.add('open');
        drawerOverlay.classList.add('open');
        this.classList.add('active');
        
        // Shift main content to the left
        if (mainElement) {
          mainElement.classList.add('open');
        }
        
        // Add expanded class to menu drawer main when hovering over items with children
        if (drawerId === 'menu-drawer') {
          const menuItemsWithChildren = drawer.querySelectorAll('.menu__item--has-children');
          
          menuItemsWithChildren.forEach(item => {
            item.addEventListener('mouseenter', function() {
              const drawerMain = drawer.querySelector('.drawer__main');
              if (drawerMain) {
                drawerMain.classList.add('expanded');
              }
            });
            
            item.addEventListener('mouseleave', function() {
              const drawerMain = drawer.querySelector('.drawer__main');
              if (drawerMain) {
                drawerMain.classList.remove('expanded');
              }
            });
          });
        }
      }
    });
  });
  
  drawerCloses.forEach(close => {
    close.addEventListener('click', function() {
      const drawer = this.closest('.drawer');
      
      if (drawer) {
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        
        // Reset main content position
        if (mainElement) {
          mainElement.classList.remove('open');
        }
        
        // Reset menu trigger
        const menuTrigger = document.querySelector('.header__menu-trigger');
        if (menuTrigger) {
          menuTrigger.classList.remove('active');
        }
      }
    });
  });
  
  // Close drawer when clicking on overlay
  drawerOverlay.addEventListener('click', function() {
    const openDrawer = document.querySelector('.drawer.open');
    
    if (openDrawer) {
      openDrawer.classList.remove('open');
      this.classList.remove('open');
      
      // Reset main content position
      if (mainElement) {
        mainElement.classList.remove('open');
      }
      
      // Reset menu trigger
      const menuTrigger = document.querySelector('.header__menu-trigger');
      if (menuTrigger) {
        menuTrigger.classList.remove('active');
      }
    }
  });
  
  // Handle ESC key to close drawer
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openDrawer = document.querySelector('.drawer.open');
      
      if (openDrawer) {
        openDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        
        // Reset main content position
        if (mainElement) {
          mainElement.classList.remove('open');
        }
        
        // Reset menu trigger
        const menuTrigger = document.querySelector('.header__menu-trigger');
        if (menuTrigger) {
          menuTrigger.classList.remove('active');
        }
      }
    }
  });
});