// Products Filter JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize filter functionality
  initFilters();
  
  // Initialize search functionality
  initSearch();
  
  // Initialize mobile filter toggle
  initMobileFilterToggle();
  
  // Initialize price range filter
  initPriceFilter();
  
  // Initialize color swatches
  initColorSwatches();
});

// Initialize all filter checkboxes
function initFilters() {
  const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      applyFilters();
    });
  });
  
  // Clear all filters
  const clearFiltersBtn = document.querySelector('.clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function(e) {
      e.preventDefault();
      clearAllFilters();
    });
  }
}

// Apply selected filters
function applyFilters() {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  
  // Get all checked filters
  const checkedFilters = document.querySelectorAll('.filter-option input[type="checkbox"]:checked');
  const filterValues = Array.from(checkedFilters).map(checkbox => checkbox.value);
  
  // Update URL with filter parameters
  if (filterValues.length > 0) {
    params.set('filter.p.tag', filterValues.join('+'));
  } else {
    params.delete('filter.p.tag');
  }
  
  // Navigate to new URL
  window.location.href = `${url.pathname}?${params.toString()}`;
}

// Clear all filters
function clearAllFilters() {
  // Uncheck all filter checkboxes
  const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  filterCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Clear color swatches
  const colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach(swatch => {
    swatch.classList.remove('active');
  });
  
  // Reset price inputs
  const priceInputs = document.querySelectorAll('.price-input');
  priceInputs.forEach(input => {
    input.value = '';
  });
  
  // Navigate to base collection URL
  window.location.href = window.location.pathname;
}

// Initialize search functionality
function initSearch() {
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = this.querySelector('.search-input');
      if (searchInput.value.trim()) {
        const searchUrl = `${this.action}?q=${encodeURIComponent(searchInput.value)}&type=product`;
        window.location.href = searchUrl;
      }
    });
  }
}

// Initialize mobile filter toggle
function initMobileFilterToggle() {
  const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
  const filtersSidebar = document.getElementById('filtersSidebar');
  const closeFiltersBtn = document.querySelector('.close-filters');
  
  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.filter-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    document.body.appendChild(overlay);
  }
  
  // Toggle filters
  function toggleFilters() {
    if (filtersSidebar) {
      filtersSidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = filtersSidebar.classList.contains('active') ? 'hidden' : '';
    }
  }
  
  // Mobile filter toggle button
  if (mobileFilterToggle) {
    mobileFilterToggle.addEventListener('click', toggleFilters);
  }
  
  // Close filters button
  if (closeFiltersBtn) {
    closeFiltersBtn.addEventListener('click', toggleFilters);
  }
  
  // Close filters when clicking overlay
  overlay.addEventListener('click', toggleFilters);
}

// Initialize price range filter
function initPriceFilter() {
  const priceForm = document.querySelector('.price-form');
  if (priceForm) {
    const priceInputs = priceForm.querySelectorAll('.price-input');
    
    priceInputs.forEach(input => {
      input.addEventListener('change', function() {
        applyPriceFilter();
      });
    });
  }
}

// Apply price filter
function applyPriceFilter() {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  
  const minPriceInput = document.querySelector('.price-input[name="filter.v.price.gte"]');
  const maxPriceInput = document.querySelector('.price-input[name="filter.v.price.lte"]');
  
  if (minPriceInput && minPriceInput.value) {
    params.set('filter.v.price.gte', minPriceInput.value);
  } else {
    params.delete('filter.v.price.gte');
  }
  
  if (maxPriceInput && maxPriceInput.value) {
    params.set('filter.v.price.lte', maxPriceInput.value);
  } else {
    params.delete('filter.v.price.lte');
  }
  
  // Navigate to new URL
  window.location.href = `${url.pathname}?${params.toString()}`;
}

// Initialize color swatches
function initColorSwatches() {
  const colorSwatches = document.querySelectorAll('.color-swatch');
  
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      toggleColorFilter(color);
    });
  });
}

// Toggle color filter
function toggleColorFilter(color) {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  
  // Get current color filters
  let colorFilters = [];
  if (params.has('filter.p.tag')) {
    colorFilters = params.get('filter.p.tag').split('+');
  }
  
  // Toggle color in filter array
  const colorIndex = colorFilters.indexOf(color);
  if (colorIndex > -1) {
    colorFilters.splice(colorIndex, 1);
  } else {
    colorFilters.push(color);
  }
  
  // Update URL
  if (colorFilters.length > 0) {
    params.set('filter.p.tag', colorFilters.join('+'));
  } else {
    params.delete('filter.p.tag');
  }
  
  // Navigate to new URL
  window.location.href = `${url.pathname}?${params.toString()}`;
}

// Global function for mobile filter toggle (accessible from HTML)
function toggleMobileFilters() {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const overlay = document.querySelector('.filter-overlay');
  
  if (filtersSidebar) {
    filtersSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = filtersSidebar.classList.contains('active') ? 'hidden' : '';
  }
}

// View toggle functionality
function setView(viewType) {
  const productsContainer = document.getElementById('productsContainer');
  const viewButtons = document.querySelectorAll('.view-btn');
  
  // Update container class
  if (productsContainer) {
    productsContainer.className = viewType === 'list' ? 'products-list' : 'products-grid grid-desktop-' + 
      (document.querySelector('[data-grid-columns-desktop]')?.getAttribute('data-grid-columns-desktop') || '4') + 
      ' grid-mobile-' + 
      (document.querySelector('[data-grid-columns-mobile]')?.getAttribute('data-grid-columns-mobile') || '2');
  }
  
  // Update active button
  viewButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeButton = document.querySelector(`.view-btn[onclick*="${viewType}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Save preference to localStorage
  localStorage.setItem('preferredView', viewType);
}

// Load more products functionality
function loadMoreProducts() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    // Show loading state
    const originalText = loadMoreBtn.textContent;
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Get current page
    const url = new URL(window.location);
    const currentPage = parseInt(url.searchParams.get('page') || '1');
    const nextPage = currentPage + 1;
    
    // Update URL with next page
    url.searchParams.set('page', nextPage);
    
    // Fetch next page
    fetch(url.toString())
      .then(response => response.text())
      .then(html => {
        // Create a temporary DOM element to parse the response
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Extract product cards from the response
        const newProducts = tempDiv.querySelectorAll('.product-card');
        const productsContainer = document.getElementById('productsContainer');
        
        if (newProducts.length > 0 && productsContainer) {
          // Add new products to the container
          newProducts.forEach(product => {
            productsContainer.appendChild(product.cloneNode(true));
          });
          
          // Reset button
          loadMoreBtn.textContent = originalText;
          loadMoreBtn.disabled = false;
          
          // Update URL without page reload
          history.pushState({}, '', url.toString());
        } else {
          // No more products, hide the button
          loadMoreBtn.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error loading more products:', error);
        loadMoreBtn.textContent = originalText;
        loadMoreBtn.disabled = false;
      });
  }
}

// Initialize view preference on page load
document.addEventListener('DOMContentLoaded', function() {
  const preferredView = localStorage.getItem('preferredView');
  if (preferredView) {
    setView(preferredView);
  }
});