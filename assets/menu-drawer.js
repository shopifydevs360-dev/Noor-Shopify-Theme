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
  
  // Current panel state
  let currentPanel = 1;
  let panelHistory = [];
  
  // Open drawer
  drawerToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const drawerId = this.getAttribute('data-drawer-toggle');
      
      if (drawerId === 'menu-drawer') {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Reset all panels on open
        resetPanels();
        currentPanel = 1;
        panelHistory = [1];
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
      currentPanel = 1;
      panelHistory = [];
    });
  });
  
  // Close drawer when clicking on overlay
  drawerOverlay.addEventListener('click', function() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    
    // Reset panels after closing animation
    setTimeout(resetPanels, 300);
    currentPanel = 1;
    panelHistory = [];
  });
  
  // Panel navigation - forward
  panelToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPanel = parseInt(this.getAttribute('data-panel-toggle'));
      const parentTitle = this.getAttribute('data-parent-title');
      const submenu = this.nextElementSibling;
      const collectionHandle = this.getAttribute('data-collection-handle');
      
      if (targetPanel && submenu) {
        // Update panel history
        panelHistory.push(targetPanel);
        currentPanel = targetPanel;
        
        // Open the panel
        if (targetPanel === 4 && collectionHandle) {
          // Special handling for collection panel
          openCollectionPanel(parentTitle, collectionHandle);
        } else {
          openPanel(targetPanel, parentTitle, submenu);
        }
      }
    });
  });
  
  // Panel navigation - back
  panelBacks.forEach(back => {
    back.addEventListener('click', function() {
      const targetPanel = parseInt(this.getAttribute('data-panel-back'));
      
      if (targetPanel) {
        // Update panel history
        const currentIndex = panelHistory.indexOf(currentPanel);
        if (currentIndex > 0) {
          panelHistory = panelHistory.slice(0, currentIndex);
          currentPanel = panelHistory[panelHistory.length - 1];
        } else {
          currentPanel = targetPanel;
          panelHistory = [targetPanel];
        }
        
        closePanel(targetPanel);
      }
    });
  });
  
  // Close drawer when clicking outside (blank space)
  document.addEventListener('click', function(event) {
    if (drawer.classList.contains('open') && 
        !drawer.contains(event.target) && 
        !event.target.closest('[data-drawer-toggle]')) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      
      // Reset panels after closing animation
      setTimeout(resetPanels, 300);
      currentPanel = 1;
      panelHistory = [];
    }
  });
  
  // Handle ESC key to close drawer
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      
      // Reset panels after closing animation
      setTimeout(resetPanels, 300);
      currentPanel = 1;
      panelHistory = [];
    }
  });
  
  // Functions
  function openPanel(panelNumber, title, submenu) {
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
        
        const nextPanel = parseInt(this.getAttribute('data-panel-toggle'));
        const nextTitle = this.getAttribute('data-parent-title');
        const nextSubmenu = this.nextElementSibling;
        const collectionHandle = this.getAttribute('data-collection-handle');
        
        if (nextPanel && nextSubmenu) {
          // Update panel history
          panelHistory.push(nextPanel);
          currentPanel = nextPanel;
          
          // Open the panel
          if (nextPanel === 4 && collectionHandle) {
            // Special handling for collection panel
            openCollectionPanel(nextTitle, collectionHandle);
          } else {
            openPanel(nextPanel, nextTitle, nextSubmenu);
          }
        }
      });
    });
    
    // Show panel - Desktop only
    drawer.classList.add(`panel-${panelNumber}-open`);
  }
  
  function openCollectionPanel(title, collectionHandle) {
    const targetPanel = drawer.querySelector('[data-panel="4"]');
    const targetTitle = targetPanel.querySelector('.drawer__panel-title');
    const loadingElement = targetPanel.querySelector('.collection-products__loading');
    const gridElement = targetPanel.querySelector('.collection-products__grid');
    const emptyElement = targetPanel.querySelector('.collection-products__empty');
    
    // Set panel title
    targetTitle.textContent = title;
    
    // Show loading state
    loadingElement.style.display = 'block';
    gridElement.style.display = 'none';
    emptyElement.style.display = 'none';
    
    // Fetch collection products
    fetchCollectionProducts(collectionHandle)
      .then(products => {
        loadingElement.style.display = 'none';
        
        if (products.length > 0) {
          // Render products
          renderProducts(products, gridElement);
          gridElement.style.display = 'grid';
        } else {
          // Show empty state
          emptyElement.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error fetching collection products:', error);
        loadingElement.style.display = 'none';
        emptyElement.style.display = 'block';
      });
    
    // Show panel - Desktop only
    drawer.classList.add('panel-4-open');
  }
  
  function fetchCollectionProducts(collectionHandle) {
    // Use Shopify's AJAX API to fetch collection products
    return fetch(`/collections/${collectionHandle}?view=json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // The response should be a JSON array of products
        return data.products || [];
      });
  }
  
  function renderProducts(products, container) {
    container.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      const productImage = product.featured_image || 'https://via.placeholder.com/150x150';
      const productTitle = product.title;
      const productPrice = product.price ? formatMoney(product.price) : 'Price not available';
      const productUrl = product.url;
      
      productCard.innerHTML = `
        <a href="${productUrl}" class="product-card__link">
          <div class="product-card__image">
            <img src="${productImage}" alt="${productTitle}" loading="lazy">
          </div>
          <div class="product-card__info">
            <h4 class="product-card__title">${productTitle}</h4>
            <p class="product-card__price">${productPrice}</p>
          </div>
        </a>
      `;
      
      container.appendChild(productCard);
    });
  }
  
  function formatMoney(cents) {
    // Simple money formatting - adjust based on your store's currency
    return `$${(cents / 100).toFixed(2)}`;
  }
  
  function closePanel(panelNumber) {
    // Desktop: hide all panels after the target
    for (let i = panelNumber + 1; i <= 4; i++) {
      drawer.classList.remove(`panel-${i}-open`);
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