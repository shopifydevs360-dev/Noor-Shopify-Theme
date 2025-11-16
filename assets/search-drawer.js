document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const searchDrawer = document.getElementById('search-drawer');
  const searchOverlay = document.getElementById('search-drawer-overlay');
  const searchToggle = document.querySelector('[data-drawer-toggle="search-drawer"]');
  const closeButton = document.querySelector('.search-drawer__close');
  const searchInput = document.getElementById('search-input');
  const searchSubmit = document.querySelector('.search-drawer__submit');
  const searchResults = document.getElementById('search-results');
  
  // Check if elements exist
  if (!searchDrawer) {
    console.error('Search drawer element not found');
    return;
  }
  
  if (!searchOverlay) {
    console.error('Search overlay element not found');
    return;
  }
  
  // Search debounce function
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // Function to open the search drawer
  function openSearchDrawer() {
    searchDrawer.classList.add('open');
    searchOverlay.classList.add('active');
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
    // Focus on search input
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  }
  
  // Function to close the search drawer
  function closeSearchDrawer() {
    searchDrawer.classList.remove('open');
    searchOverlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
    // Clear search input
    searchInput.value = '';
    // Reset to initial state
    showInitialContent();
  }
  
  // Function to show initial content
  function showInitialContent() {
    const initialContent = `
      <div class="search-drawer__initial">
        <h3 class="search-drawer__title">{{ 'general.search.popular' | t }}</h3>
        <ul class="search-drawer__popular">
          {% assign popular_searches = section.settings.popular_searches | split: ',' %}
          {% for search_term in popular_searches %}
            <li class="search-drawer__popular-item">
              <a href="{{ routes.search_url }}?q={{ search_term | strip | url_encode }}" class="search-drawer__popular-link">
                {{ search_term | strip }}
              </a>
            </li>
          {% endfor %}
        </ul>
      </div>
    `;
    searchResults.innerHTML = initialContent;
  }
  
  // Function to show loading state
  function showLoading() {
    searchResults.innerHTML = `
      <div class="search-drawer__loading">
        <div class="search-drawer__loading-spinner"></div>
      </div>
    `;
  }
  
  // Function to show no results
  function showNoResults(query) {
    searchResults.innerHTML = `
      <div class="search-drawer__no-results">
        <p class="search-drawer__no-results-text">{{ 'general.search.no_results_html' | t: terms: query }}</p>
        <a href="{{ routes.search_url }}" class="search-drawer__no-results-button">{{ 'general.search.browse_all_products' | t }}</a>
      </div>
    `;
  }
  
  // Function to perform search
  async function performSearch(query) {
    if (!query || query.length < 2) {
      showInitialContent();
      return;
    }
    
    showLoading();
    
    try {
      const response = await fetch(`${window.Shopify.routes.root}search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`);
      const data = await response.json();
      
      if (data.resources.results.products.length > 0) {
        renderSearchResults(data.resources.results.products, query);
      } else {
        showNoResults(query);
      }
    } catch (error) {
      console.error('Error searching:', error);
      showNoResults(query);
    }
  }
  
  // Function to render search results
  function renderSearchResults(products, query) {
    let productsHtml = '<div class="search-drawer__products">';
    
    products.forEach(product => {
      const price = product.price_min ? product.price_min : '0';
      const compareAtPrice = product.compare_at_price_min ? product.compare_at_price_min : null;
      
      productsHtml += `
        <a href="${product.url}" class="search-drawer__product">
          <img src="${product.featured_image.url}" alt="${product.featured_image.alt}" class="search-drawer__product-image">
          <h4 class="search-drawer__product-title">${product.title}</h4>
          <div class="search-drawer__product-price">
            ${formatMoney(price)}
            ${compareAtPrice && compareAtPrice > price ? `<span class="search-drawer__product-compare-price">${formatMoney(compareAtPrice)}</span>` : ''}
          </div>
        </a>
      `;
    });
    
    productsHtml += '</div>';
    
    productsHtml += `
      <div class="search-drawer__view-all">
        <a href="${window.Shopify.routes.root}search?q=${encodeURIComponent(query)}" class="search-drawer__view-all-button">
          {{ 'general.search.view_all_results' | t }}
        </a>
      </div>
    `;
    
    searchResults.innerHTML = productsHtml;
  }
  
  // Function to format money (simplified version)
  function formatMoney(cents) {
    const amount = cents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: '{{ shop.currency }}'
    }).format(amount);
  }
  
  // Debounced search function
  const debouncedSearch = debounce(performSearch, 300);
  
  // Event listener for the search trigger button
  if (searchToggle) {
    searchToggle.addEventListener('click', openSearchDrawer);
  } else {
    console.error('Search toggle button not found');
  }
  
  // Event listener for the close button
  if (closeButton) {
    closeButton.addEventListener('click', closeSearchDrawer);
  }
  
  // Event listener for clicking on the overlay
  searchOverlay.addEventListener('click', closeSearchDrawer);
  
  // Event listener for ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && searchDrawer.classList.contains('open')) {
      closeSearchDrawer();
    }
  });
  
  // Event listener for search input
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      debouncedSearch(this.value);
    });
    
    // Event listener for form submission
    searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (this.value.trim()) {
          window.location.href = `${window.Shopify.routes.root}search?q=${encodeURIComponent(this.value)}`;
        }
      }
    });
  }
  
  // Event listener for search submit button
  if (searchSubmit) {
    searchSubmit.addEventListener('click', function() {
      if (searchInput.value.trim()) {
        window.location.href = `${window.Shopify.routes.root}search?q=${encodeURIComponent(searchInput.value)}`;
      }
    });
  }
});