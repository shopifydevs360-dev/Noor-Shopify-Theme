// Collection View & Filter Functionality
let currentView = localStorage.getItem('collectionView') || 'grid';

// Set initial view
document.addEventListener('DOMContentLoaded', function() {
  if (currentView === 'list') {
    setView('list');
  }
  initializeFilters();
});

// Toggle view
function setView(view) {
  currentView = view;
  localStorage.setItem('collectionView', view);
  
  const container = document.getElementById('productsContainer');
  container.className = view === 'grid' ? 'products-grid' : 'products-list';
  
  document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
  event.target.closest('.view-btn').classList.add('active');
}

// Toggle mobile filters
function toggleMobileFilters() {
  const sidebar = document.getElementById('filtersSidebar');
  sidebar.classList.toggle('active');
}

// Initialize filters
function initializeFilters() {
  // Handle checkbox filters
  document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const url = new URL(window.location);
      const tags = url.searchParams.getAll('tag');
      
      if (this.checked) {
        tags.push(this.value);
      } else {
        const index = tags.indexOf(this.value);
        if (index > -1) tags.splice(index, 1);
      }
      
      url.searchParams.delete('tag');
      tags.forEach(tag => url.searchParams.append('tag', tag));
      
      window.location.href = url.toString();
    });
  });

  // Handle color swatches
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      const color = this.dataset.color;
      const url = new URL(window.location);
      const tags = url.searchParams.getAll('tag');
      
      if (this.classList.contains('active')) {
        const index = tags.indexOf(color);
        if (index > -1) tags.splice(index, 1);
      } else {
        tags.push(color);
      }
      
      url.searchParams.delete('tag');
      tags.forEach(tag => url.searchParams.append('tag', tag));
      
      window.location.href = url.toString();
    });
  });

  // Handle price form
  const priceForm = document.querySelector('.price-form');
  if (priceForm) {
    priceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const url = new URL(window.location);
      const minPrice = this.querySelector('input[name="filter.v.price.gte"]').value;
      const maxPrice = this.querySelector('input[name="filter.v.price.lte"]').value;
      
      if (minPrice) {
        url.searchParams.set('filter.v.price.gte', minPrice);
      } else {
        url.searchParams.delete('filter.v.price.gte');
      }
      
      if (maxPrice) {
        url.searchParams.set('filter.v.price.lte', maxPrice);
      } else {
        url.searchParams.delete('filter.v.price.lte');
      }
      
      window.location.href = url.toString();
    });
  }
}

// Close mobile filters when clicking outside
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('filtersSidebar');
  const toggle = document.querySelector('.mobile-filter-toggle');
  
  if (window.innerWidth <= 1024 && 
      sidebar && 
      !sidebar.contains(e.target) && 
      !toggle.contains(e.target) &&
      sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 1024) {
    const sidebar = document.getElementById('filtersSidebar');
    if (sidebar) {
      sidebar.classList.remove('active');
    }
  }
});