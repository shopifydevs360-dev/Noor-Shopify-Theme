document.addEventListener("DOMContentLoaded", () => {
  const drawerToggleButtons = document.querySelectorAll("[data-drawer-toggle='search-drawer']");
  const drawer = document.getElementById("search-drawer");
  const overlay = document.getElementById("search-drawer-overlay");
  const closeButton = drawer.querySelector(".search-drawer__close");
  const inputField = drawer.querySelector("#search-input");
  const submitButton = drawer.querySelector(".search-drawer__submit");

  /* =========================
     OPEN DRAWER
  ========================= */
  function openDrawer() {
    drawer.classList.add("active");
    overlay.classList.add("active");

    // focus after animation
    setTimeout(() => inputField?.focus(), 200);
  }

  /* =========================
     CLOSE DRAWER
  ========================= */
  function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }

  /* =========================
     SEARCH REDIRECT FUNCTION
  ========================= */
  function handleSearchSubmit() {
    const query = inputField.value.trim();
    if (!query) return;

    const url = `/search?q=${encodeURIComponent(query)}`;
    window.location.href = url;
  }

  /* =========================
     EVENT LISTENERS
  ========================= */

  // Open drawer on trigger
  drawerToggleButtons.forEach(btn => {
    btn.addEventListener("click", openDrawer);
  });

  // Close drawer
  closeButton.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Submit button click
  submitButton.addEventListener("click", handleSearchSubmit);

  // Enter key in input field
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }
  });

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
});
