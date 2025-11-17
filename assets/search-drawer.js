document.addEventListener("DOMContentLoaded", () => {
  const drawerToggleButtons = document.querySelectorAll("[data-drawer-toggle='search-drawer']");
  const drawer = document.getElementById("search-drawer");
  const overlay = document.getElementById("search-drawer-overlay");
  const closeButton = drawer.querySelector(".search-drawer__close");
  const inputField = drawer.querySelector("#search-input");
  const submitButton = drawer.querySelector(".search-drawer__submit");
  const contentBox = drawer.querySelector("#search-drawer-content");

  /* =========================
     OPEN DRAWER
  ========================= */
  function openDrawer() {
    drawer.classList.add("active");
    overlay.classList.add("active");
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
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  /* =========================
     PREDICTIVE SEARCH
  ========================= */
  async function runPredictiveSearch(term) {
    if (term.length < 1) {
      contentBox.innerHTML = "";
      return;
    }

    const url = `/search/suggest.json?q=${encodeURIComponent(term)}&resources[type]=product&resources[limit]=6`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const products = data.resources?.results?.products ?? [];

      // Build suggestion keywords
      const suggestions = new Set();
      products.forEach((p) => {
        suggestions.add(p.title);
        p.tags?.forEach(tag => suggestions.add(tag));
      });

      renderDropdown({
        query: term,
        suggestions: [...suggestions],
        products
      });

    } catch (err) {
      console.error("Predictive search error:", err);
    }
  }

  /* =========================
     RENDER DROPDOWN CONTENT
  ========================= */
  function renderDropdown({ query, suggestions, products }) {
    contentBox.innerHTML = `
      <div class="search-dropdown">
        
        <div class="search-col">
          <h4>Suggestions</h4>
          <ul>
            ${suggestions
              .map(s => `<li><button class="suggest-item" data-value="${s}">${s}</button></li>`)
              .join("")}
          </ul>
        </div>

        <div class="search-col">
          <h4>Products</h4>
          <ul>
            ${
              products.length
                ? products
                    .map(
                      (p) => `
                <li class="predictive-product">
                  <a href="${p.url}">
                    <img src="${p.image}" alt="${p.title}" />
                    <span>${p.title}</span>
                  </a>
                </li>`
                    )
                    .join("")
                : `<li>No products found.</li>`
            }
          </ul>
        </div>

      </div>

      <p class="search-result-text">Results for "${query}"</p>
    `;

    // Clicking suggestion fills input & redirects
    contentBox.querySelectorAll(".suggest-item").forEach(btn => {
      btn.addEventListener("click", () => {
        inputField.value = btn.dataset.value;
        handleSearchSubmit();
      });
    });
  }

  /* =========================
     EVENT LISTENERS
  ========================= */

  drawerToggleButtons.forEach(btn => btn.addEventListener("click", openDrawer));
  closeButton.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  submitButton.addEventListener("click", handleSearchSubmit);

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  /* =========================
     INPUT LISTENER (1 letter)
  ========================= */
  inputField.addEventListener("input", () => {
    const value = inputField.value.trim();
    runPredictiveSearch(value);
  });
});
