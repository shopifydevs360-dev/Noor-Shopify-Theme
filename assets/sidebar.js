document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("js-sidebar");
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

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  if (!hamburger) return;

  // Delay slightly to allow initial animation to play
  setTimeout(() => {
    hamburger.classList.add("loaded");
  }, 800);
});

