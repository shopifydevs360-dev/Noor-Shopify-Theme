document.addEventListener("DOMContentLoaded", () => {
  const drawerToggleButtons = document.querySelectorAll("[data-drawer-toggle='search-drawer']");
  const drawer = document.getElementById("search-drawer");
  const overlay = document.getElementById("search-drawer-overlay");
  const closeButton = drawer.querySelector(".search-drawer__close");
  const inputField = drawer.querySelector("#search-input");
  const submitButton = drawer.querySelector(".search-drawer__submit");

  /* Predictive Search Elements */
  const predictiveContainer = document.getElementById("search-predictive");
  const suggestionsList = document.getElementById("predictive-suggestions-list");
  const productsList = document.getElementById("predictive-products-list");
  const queryText = document.getElementById("predictive-query-text");

  let predictiveTimer = null;

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

    // hide predictive dropdown
    predictiveContainer?.classList.add("hidden");
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
     LOAD PREDICTIVE RESULTS
  ========================= */
  function loadPredictiveSearch(query) {
    const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,collection&resources[limit]=5`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        predictiveContainer.classList.remove("hidden");
        queryText.textContent = query;

        /* ---------- Suggestions ---------- */
        suggestionsList.innerHTML = "";
        const queries = data?.queries || [];

        queries.forEach(t => {
          const li = document.createElement("li");
          li.textContent = t.text;

          li.addEventListener("click", () => {
            window.location.href = `/search?q=${encodeURIComponent(t.text)}`;
          });

          suggestionsList.appendChild(li);
        });

        /* ---------- Products ---------- */
        productsList.innerHTML = "";
        const products = data?.resources?.results?.products || [];

        products.forEach(p => {
          const item = document.createElement("div");
          item.className = "predictive-product-item";

          item.innerHTML = `
            <img src="${p.image}" alt="${p.title}">
            <div class="predictive-product-info">
              <a href="${p.url}">${p.title}</a>
              <div class="price">${p.price}</div>
            </div>
          `;

          productsList.appendChild(item);
        });
      });
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

  /* =========================
     INPUT: TRIGGER PREDICTIVE SEARCH
  ========================= */
  inputField.addEventListener("input", function () {
    const query = this.value.trim();

    if (query.length < 2) {
      predictiveContainer.classList.add("hidden");
      return;
    }

    clearTimeout(predictiveTimer);
    predictiveTimer = setTimeout(() => {
      loadPredictiveSearch(query);
    }, 250);
  });
});
