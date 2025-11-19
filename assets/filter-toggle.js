/**
 * Filter Toggle JavaScript
 * Handles mobile and off-canvas filter toggles
 */

document.addEventListener('DOMContentLoaded', function() {
  initFilterToggles();
});

function initFilterToggles() {
  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.filter-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    document.body.appendChild(overlay);
  }

  // Add click event to overlay
  overlay.addEventListener('click', closeAllFilters);
}

// Toggle mobile filters
function toggleMobileFilters() {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const overlay = document.querySelector('.filter-overlay');
  const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
  
  if (filtersSidebar) {
    const isOpen = filtersSidebar.classList.contains('active');
    
    if (isOpen) {
      closeAllFilters();
    } else {
      openMobileFilters();
    }
  }
}

// Toggle desktop off-canvas filters
function toggleDesktopFilters() {
  const offCanvasFilters = document.querySelector('.filters-sidebar.off-canvas');
  const overlay = document.querySelector('.filter-overlay');
  
  if (offCanvasFilters) {
    const isOpen = offCanvasFilters.classList.contains('active');
    
    if (isOpen) {
      closeAllFilters();
    } else {
      openDesktopFilters();
    }
  }
}

// Open mobile filters
function openMobileFilters() {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const overlay = document.querySelector('.filter-overlay');
  const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
  
  if (filtersSidebar) {
    filtersSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add active class to mobile toggle button
    if (mobileFilterToggle) {
      mobileFilterToggle.classList.add('active');
    }
    
    // Add keyboard accessibility
    filtersSidebar.setAttribute('aria-hidden', 'false');
    filtersSidebar.querySelector('.close-filters').focus();
  }
}

// Open desktop off-canvas filters
function openDesktopFilters() {
  const offCanvasFilters = document.querySelector('.filters-sidebar.off-canvas');
  const overlay = document.querySelector('.filter-overlay');
  
  if (offCanvasFilters) {
    offCanvasFilters.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard accessibility
    offCanvasFilters.setAttribute('aria-hidden', 'false');
    offCanvasFilters.querySelector('.close-filters').focus();
  }
}

// Close all filters
function closeAllFilters() {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const offCanvasFilters = document.querySelector('.filters-sidebar.off-canvas');
  const overlay = document.querySelector('.filter-overlay');
  const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
  
  // Close mobile filters
  if (filtersSidebar) {
    filtersSidebar.classList.remove('active');
    filtersSidebar.setAttribute('aria-hidden', 'true');
  }
  
  // Close desktop off-canvas filters
  if (offCanvasFilters) {
    offCanvasFilters.classList.remove('active');
    offCanvasFilters.setAttribute('aria-hidden', 'true');
  }
  
  // Hide overlay
  if (overlay) {
    overlay.classList.remove('active');
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
  
  // Remove active class from mobile toggle button
  if (mobileFilterToggle) {
    mobileFilterToggle.classList.remove('active');
  }
  
  // Return focus to trigger button
  const activeTrigger = document.querySelector('.mobile-filter-toggle.active, .toolbar-actions .btn--secondary:focus');
  if (activeTrigger) {
    activeTrigger.focus();
  }
}

// Handle escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAllFilters();
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const offCanvasFilters = document.querySelector('.filters-sidebar.off-canvas');
  const overlay = document.querySelector('.filter-overlay');
  
  // Close filters on window resize if needed
  if (window.innerWidth > 768 && filtersSidebar && filtersSidebar.classList.contains('active')) {
    closeAllFilters();
  }
  
  // Adjust off-canvas position on resize
  if (offCanvasFilters && offCanvasFilters.classList.contains('active')) {
    // Ensure off-canvas stays in correct position after resize
    offCanvasFilters.style.right = '0';
  }
});

// Handle touch events for mobile swipe to close
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const offCanvasFilters = document.querySelector('.filters-sidebar.off-canvas');
  
  // Check if any filter is active
  const isFilterActive = (filtersSidebar && filtersSidebar.classList.contains('active')) || 
                         (offCanvasFilters && offCanvasFilters.classList.contains('active'));
  
  if (isFilterActive) {
    // Swipe right to close (for mobile filters)
    if (touchEndX - touchStartX > 100) {
      closeAllFilters();
    }
  }
}