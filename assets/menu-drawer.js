document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const drawerToggles = document.querySelectorAll('[data-drawer-toggle="menu-drawer"]');
  const drawerClose = drawer.querySelector('[data-drawer-close]');

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Open drawer on toggle click
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent click from bubbling to document
      openDrawer();
    });
  });

  // Close drawer on close button click
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Close drawer on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // Close drawer if clicking outside the drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target)) {
      closeDrawer();
    }
  });

  // Optional: Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
});
