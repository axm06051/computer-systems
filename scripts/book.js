(() => {
  const THEME_KEY = "computer-systems:theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const getTheme = () => localStorage.getItem(THEME_KEY) || "system";
  const resolved = mode => mode === "system" && media.matches ? "dark" : mode === "system" ? "light" : mode;

  const applyTheme = mode => { root.dataset.theme = resolved(mode); };
  const setTheme = mode => {
    localStorage.setItem(THEME_KEY, mode);
    applyTheme(mode);
    document.querySelectorAll("[data-theme]").forEach(button => {
      const selected = button.dataset.theme === mode;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll("[data-theme-choice]").forEach(button => {
      const selected = button.dataset.themeChoice === mode;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  applyTheme(getTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#primary-nav");
    menu?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll("[data-theme-choice]").forEach(button => {
      button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
    });
    setTheme(getTheme());

    const searchDialog = document.querySelector("#search-dialog");
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.querySelector("#search-input");
    const results = document.querySelector("#search-results");
    const openSearch = () => {
      if (typeof searchDialog?.showModal === "function") searchDialog.showModal();
      else searchDialog?.setAttribute("open", "");
      searchButton?.setAttribute("aria-expanded", "true");
      searchInput?.focus();
    };
    searchButton?.addEventListener("click", openSearch);
    searchDialog?.addEventListener("close", () => searchButton?.setAttribute("aria-expanded", "false"));

    let indexPromise;
    const loadIndex = () => indexPromise ||= fetch(window.BOOK_CONFIG.searchIndex).then(response => {
      if (!response.ok) throw new Error(`Search index HTTP ${response.status}`);
      return response.json();
    });

    searchInput?.addEventListener("input", async () => {
      const query = searchInput.value.trim().toLowerCase();
      results.replaceChildren();
      if (query.length < 2) return;
      try {
        const index = await loadIndex();
        const documents = index.docs || index;
        const matches = documents.filter(doc => `${doc.title || ""} ${doc.text || ""}`.toLowerCase().includes(query)).slice(0, 12);
        if (!matches.length) {
          const empty = document.createElement("p");
          empty.className = "search-result";
          empty.textContent = "No results.";
          results.appendChild(empty);
          return;
        }
        matches.forEach(doc => {
          const link = document.createElement("a");
          link.className = "search-result";
          link.href = doc.location;
          const title = document.createElement("strong");
          title.textContent = doc.title || doc.location;
          link.appendChild(title);
          if (doc.text) {
            const text = document.createElement("div");
            text.textContent = doc.text.slice(0, 180);
            link.appendChild(text);
          }
          results.appendChild(link);
        });
      } catch (error) {
        const message = document.createElement("p");
        message.className = "search-result";
        message.textContent = "Search is temporarily unavailable.";
        results.appendChild(message);
        console.error(error);
      }
    });

    const sidebarLinks = [...document.querySelectorAll(".book-sidebar a[href]")];
    const current = sidebarLinks.find(link => link.classList.contains("active"));
    const currentIndex = current ? sidebarLinks.indexOf(current) : -1;
    const pager = document.querySelector("#book-pager");
    if (pager && currentIndex >= 0) {
      const previous = sidebarLinks[currentIndex - 1];
      const next = sidebarLinks[currentIndex + 1];
      if (previous) {
        const link = document.createElement("a");
        link.href = previous.href;
        link.textContent = `← ${previous.textContent.trim()}`;
        pager.appendChild(link);
      }
      if (next) {
        const link = document.createElement("a");
        link.href = next.href;
        link.textContent = `${next.textContent.trim()} →`;
        pager.appendChild(link);
      }
    }

    document.addEventListener("keydown", event => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
      if (event.key === "/") { event.preventDefault(); openSearch(); }
      if (event.key.toLowerCase() === "t") window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  media.addEventListener("change", () => { if (getTheme() === "system") applyTheme("system"); });
})();
