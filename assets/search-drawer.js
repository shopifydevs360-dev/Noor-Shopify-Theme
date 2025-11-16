document.addEventListener("DOMContentLoaded", () => {
  const drawerToggleButtons = document.querySelectorAll("[data-drawer-toggle='search-drawer']");
  const drawer = document.getElementById("search-drawer");
  const overlay = document.getElementById("search-drawer-overlay");
  const closeButton = drawer.querySelector(".search-drawer__close");
  const inputField = drawer.querySelector("#search-input");

  // OPEN DRAWER
  function openDrawer() {
    drawer.classList.add("active");
    overlay.classList.add("active");

    // focus input after animation
    setTimeout(() => inputField?.focus(), 200);
  }

  // CLOSE DRAWER
  function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }

  // Button(s) that open the drawer
  drawerToggleButtons.forEach(btn => {
    btn.addEventListener("click", openDrawer);
  });

  // Close button
  closeButton.addEventListener("click", closeDrawer);

  // Click outside (overlay)
  overlay.addEventListener("click", closeDrawer);

  // Close with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
});
