document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const searchDrawer = document.getElementById('search-drawer');
  const searchOverlay = document.getElementById('search-drawer-overlay');
  const searchToggle = document.querySelector('[data-drawer-toggle="search-drawer"]');
  const closeButton = document.querySelector('.search-drawer__close');
  
  // Check if elements exist
  if (!searchDrawer) {
    console.error('Search drawer element not found');
    return;
  }
  
  if (!searchOverlay) {
    console.error('Search overlay element not found');
    return;
  }
  
  // Function to open the search drawer
  function openSearchDrawer() {
    searchDrawer.classList.add('open');
    searchOverlay.classList.add('active');
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
  }
  
  // Function to close the search drawer
  function closeSearchDrawer() {
    searchDrawer.classList.remove('open');
    searchOverlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
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
});