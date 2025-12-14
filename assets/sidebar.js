document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("is-sidebar");
  if (!sidebar) return;

  const togglePoint = 100;

  window.addEventListener("scroll", () => {
    if (window.scrollY > togglePoint) {
      sidebar.classList.remove("expended");
      sidebar.classList.add("minimal");
    } else {
      sidebar.classList.remove("minimal");
      sidebar.classList.add("expended");
    }
  });
});
