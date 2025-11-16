document.addEventListener('DOMContentLoaded', function() {
  // Check if RTL mode is enabled
  const isRTL = document.body.classList.contains('rtl');
  
  // Drawer functionality
  const drawerToggles = document.querySelectorAll('[data-drawer-toggle]');
  const drawerCloses = document.querySelectorAll('[data-drawer-close]');
  const drawer = document.getElementById('menu-drawer');
  const overlay = document.getElementById('drawer-overlay');
  
  // Store menu data for panel navigation
  const menuData = {
    level1: [],
    level2: {},
    level3: {}
  };
  
  // Initialize menu data from Shopify menu
  function initializeMenuData() {
    const menuLinks = {{ section.settings.menu.links | json }};
    
    menuLinks.forEach(link => {
      menuData.level1.push({
        title: link.title,
        url: link.url,
        hasChildren: link.links && link.links.length > 0,
        children: link.links || []
      });
      
      if (link.links && link.links.length > 0) {
        menuData.level2[link.title] = link.links.map(child => ({
          title: child.title,
          url: child.url,
          hasChildren: child.links && child.links.length > 0,
          children: child.links || []
        }));
        
        link.links.forEach(child => {
          if (child.links && child.links.length > 0) {
            menuData.level3[child.title] = child.links;
          }
        });
      }
    });
  }
  
  // Initialize menu data
  initializeMenuData();
  
  // Panel navigation
  function showPanel(panelNumber, parentTitle = '') {
    // Hide all panels
    document.querySelectorAll('.drawer__panel').forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Show selected panel
    const selectedPanel = document.querySelector(`.drawer__panel--level-${panelNumber}`);
    if (selectedPanel) {
      selectedPanel.classList.add('active');
      
      // Update panel title
      if (panelNumber > 1 && parentTitle) {
        const titleElement = document.getElementById(`panel-${panelNumber}-title`);
        if (titleElement) {
          titleElement.textContent = parentTitle;
        }
      }
      
      // Populate panel content
      if (panelNumber === 2 && parentTitle) {
        populateLevel2Menu(parentTitle);
      } else if (panelNumber === 3 && parentTitle) {
        populateLevel3Menu(parentTitle);
      }
    }
  }
  
  // Populate level 2 menu
  function populateLevel2Menu(parentTitle) {
    const menuContainer = document.getElementById('menu-level-2');
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    
    if (menuData.level2[parentTitle]) {
      menuData.level2[parentTitle].forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu__item';
        
        if (item.hasChildren) {
          li.classList.add('menu__item--has-children');
        }
        
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'menu__link';
        a.textContent = item.title;
        
        if (item.hasChildren) {
          a.setAttribute('data-panel-toggle', '3');
          a.setAttribute('data-panel-title', item.title);
          
          const arrow = document.createElement('span');
          arrow.className = 'menu__arrow';
          arrow.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          a.appendChild(arrow);
        }
        
        li.appendChild(a);
        menuContainer.appendChild(li);
      });
    }
  }
  
  // Populate level 3 menu
  function populateLevel3Menu(parentTitle) {
    const menuContainer = document.getElementById('menu-level-3');
    if (!menuContainer) return;
    
    menuContainer.innerHTML = '';
    
    if (menuData.level3[parentTitle]) {
      menuData.level3[parentTitle].forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu__item';
        
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'menu__link';
        a.textContent = item.title;
        
        li.appendChild(a);
        menuContainer.appendChild(li);
      });
    }
  }
  
  // Event delegation for panel toggles
  document.addEventListener('click', function(event) {
    const panelToggle = event.target.closest('[data-panel-toggle]');
    if (panelToggle) {
      event.preventDefault();
      const panelNumber = panelToggle.getAttribute('data-panel-toggle');
      const panelTitle = panelToggle.getAttribute('data-panel-title') || '';
      showPanel(panelNumber, panelTitle);
    }
  });
  
  // Drawer toggle functionality
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const drawerId = this.getAttribute('data-drawer-toggle');
      const targetDrawer = document.getElementById(drawerId);
      
      if (targetDrawer) {
        targetDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        if (overlay) {
          overlay.classList.add('active');
        }
        
        // Reset to first panel
        showPanel(1);
      }
    });
  });
  
  // Drawer close functionality
  drawerCloses.forEach(close => {
    close.addEventListener('click', function() {
      const targetDrawer = this.closest('.drawer');
      
      if (targetDrawer) {
        targetDrawer.classList.remove('open');
        document.body.style.overflow = '';
        
        if (overlay) {
          overlay.classList.remove('active');
        }
      }
    });
  });
  
  // Close drawer when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      const openDrawer = document.querySelector('.drawer.open');
      
      if (openDrawer) {
        openDrawer.classList.remove('open');
        document.body.style.overflow = '';
        overlay.classList.remove('active');
      }
    });
  }
  
  // Handle ESC key to close drawer
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openDrawer = document.querySelector('.drawer.open');
      
      if (openDrawer) {
        openDrawer.classList.remove('open');
        document.body.style.overflow = '';
        
        if (overlay) {
          overlay.classList.remove('active');
        }
      }
    }
  });
});