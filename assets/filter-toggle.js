document.addEventListener('DOMContentLoaded', function() {
  const filterForm = document.getElementById('filters-form');
  if (!filterForm) return;

  // Listen for changes on any filter input
  const filterInputs = filterForm.querySelectorAll('input');
  filterInputs.forEach(input => {
    input.addEventListener('change', function() {
      applyFilters();
    });
  });

  function applyFilters() {
    const formData = new FormData(filterForm);
    const searchParams = new URLSearchParams();

    // Build the search parameters from the form data
    for (let [key, value] of formData.entries()) {
      if (key === 'filter.v.availability') {
        searchParams.append(key, value);
      } else {
        // For other filters, we need to group them under the same key
        if (searchParams.has(key)) {
          searchParams.append(key, value);
        } else {
          searchParams.set(key, value);
        }
      }
    }

    // Get the current URL without any parameters
    const currentUrl = window.location.origin + window.location.pathname;

    // Construct the new URL with the filter parameters
    let newUrl = currentUrl;
    if (searchParams.toString()) {
      newUrl += '?' + searchParams.toString();
    }

    // Reload the page with the new URL
    window.location.href = newUrl;
  }
});