(() => {
  const storageKey = "computer-systems-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const resolvedTheme = mode => mode === "system" ? (media.matches ? "dark" : "light") : mode;

  const applyTheme = mode => {
    document.documentElement.setAttribute("data-bs-theme", resolvedTheme(mode));
  };

  const updateButtons = mode => {
    document.querySelectorAll("[data-book-theme]").forEach(button => {
      const selected = button.dataset.bookTheme === mode;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  const setTheme = mode => {
    localStorage.setItem(storageKey, mode);
    applyTheme(mode);
    updateButtons(mode);
  };

  const buildControls = () => {
    if (document.getElementById("theme-controls")) return;

    const navbar = document.querySelector(".navbar-collapse");
    if (!navbar) return;

    const list = document.createElement("ul");
    list.id = "theme-controls";
    list.className = "nav navbar-nav ms-lg-2";
    list.setAttribute("aria-label", "Color theme");

    const item = document.createElement("li");
    item.className = "nav-item dropdown";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "btn btn-sm btn-outline-secondary dropdown-toggle";
    toggle.setAttribute("data-bs-toggle", "dropdown");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Theme";

    const menu = document.createElement("ul");
    menu.className = "dropdown-menu dropdown-menu-end";

    for (const mode of ["light", "dark", "system"]) {
      const menuItem = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dropdown-item d-flex justify-content-between align-items-center";
      button.dataset.bookTheme = mode;
      button.textContent = mode === "system" ? "System" : mode[0].toUpperCase() + mode.slice(1);
      button.addEventListener("click", () => setTheme(mode));
      menuItem.appendChild(button);
      menu.appendChild(menuItem);
    }

    item.append(toggle, menu);
    list.appendChild(item);
    navbar.appendChild(list);
    updateButtons(localStorage.getItem(storageKey) || "system");
  };

  const initial = localStorage.getItem(storageKey) || "system";
  applyTheme(initial);

  document.addEventListener("DOMContentLoaded", buildControls);

  media.addEventListener("change", () => {
    if ((localStorage.getItem(storageKey) || "system") === "system") applyTheme("system");
  });
})();
