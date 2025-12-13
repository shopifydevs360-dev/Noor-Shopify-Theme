document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("m-sidebar");
  const triggers = document.querySelectorAll("[data-sidebar-toggle]");

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("is-active");
    });
  });
});
