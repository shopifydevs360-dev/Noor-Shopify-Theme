document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const drawerToggleButtons = document.querySelectorAll("[data-drawer-toggle='search-drawer']");
  const drawer = document.getElementById("search-drawer");
  const overlay = document.getElementById("search-drawer-overlay");
  const closeButton = drawer.querySelector(".search-drawer__close");
  const inputField = drawer.querySelector("#search-input");
  const submitButton = drawer.querySelector(".search-drawer__submit");

  const dropdown = document.getElementById("search-predictive");
  const suggestionsList = document.getElementById("predictive-suggestions-list");
  const productsList = document.getElementById("predictive-products-list");
  const bottomQuery = document.getElementById("predictive-query-text");

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
    hideDropdown();
  }

  /* =========================
     SHOW + HIDE DROPDOWN
  ========================= */
  function showDropdown() {
    dropdown.classList.remove("hidden");
  }

  function hideDropdown() {
    dropdown.classList.add("hidden");
  }

  /* =========================
     SEARCH SUBMIT REDIRECT
  ========================= */
  function handleSearchSubmit() {
    const query = inputField.value.trim();
    if (!query) return;

    const url = `/search?q=${encodeURIComponent(query)}`;
    window.location.href = url;
  }

  /* =========================
     FETCH PREDICTIVE RESULTS
  ========================= */
  async function fetchPredictiveSearch(query) {
    try {
      const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,collection`;
      const res = await fetch(url);
      const data = await res.json();

      return data.resources;
    } catch (err) {
      console.error("Predictive search error:", err);
      return null;
    }
  }

  /* =========================
     RENDER PREDICTIVE RESULTS
  ========================= */
  function renderPredictiveResults(data, query) {
    suggestionsList.innerHTML = "";
    productsList.innerHTML = "";
    bottomQuery.textContent = query;

    // SUGGESTIONS
    if (data.queries?.length) {
      data.queries.forEach(item => {
        suggestionsList.innerHTML += `<li>${item.text}</li>`;
      });
    } else {
      suggestionsList.innerHTML = `<li>No suggestions</li>`;
    }

    // PRODUCTS
    if (data.products?.length) {
      data.products.forEach(product => {
        productsList.innerHTML += `
          <a class="predictive-product-item" href="${product.url}">
            <img src="${product.featured_image?.url}" alt="${product.title}">
            <span>${product.title}</span>
          </a>
        `;
      });
    } else {
      productsList.innerHTML = `<p>No products found</p>`;
    }

    showDropdown();
  }

  /* =========================
     INPUT LISTENER (TRIGGER ON 1 LETTER)
  ========================= */
  inputField.addEventListener("input", async () => {
    const query = inputField.value.trim();

    if (query.length < 1) {
      hideDropdown();
      return;
    }

    const results = await fetchPredictiveSearch(query);
    if (!results) return;

    renderPredictiveResults(results, query);
  });

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

});
