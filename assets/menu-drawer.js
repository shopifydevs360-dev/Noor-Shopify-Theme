document.addEventListener('DOMContentLoaded', () => {
  // Select the drawer and overlay
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  
  // Select all drawer toggle buttons (in case you have multiple triggers)
  const drawerToggles = document.querySelectorAll('[data-drawer-toggle="menu-drawer"]');
  const drawerClose = drawer.querySelector('[data-drawer-close]');

  // Function to open the drawer
  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  // Function to close the drawer
  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
  };

  // Add click events to open drawer
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', openDrawer);
  });

  // Close drawer when clicking close button
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Close drawer when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // Optional: Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
});
