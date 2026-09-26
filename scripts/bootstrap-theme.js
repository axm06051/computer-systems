(() => {
  const key = "computer-systems-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;

  const get = () => localStorage.getItem(key) || "system";
  const resolved = mode => mode === "system" ? (media.matches ? "dark" : "light") : mode;

  const apply = mode => root.setAttribute("data-bs-theme", resolved(mode));

  const set = mode => {
    localStorage.setItem(key, mode);
    apply(mode);
    document.querySelectorAll("[data-theme]").forEach(button => {
      const selected = button.dataset.theme === mode;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  const controls = () => {
    if (document.getElementById("theme-controls")) return;

    const header = document.querySelector("header, #header, nav");
    if (!header) return;

    const controls = document.createElement("div");
    controls.id = "theme-controls";
    controls.className = "btn-group ms-auto";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Color theme");

    for (const mode of ["light", "dark", "system"]) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.theme = mode;
      button.className = "btn btn-outline-secondary btn-sm";
      button.textContent = mode[0].toUpperCase() + mode.slice(1);
      button.addEventListener("click", () => set(mode));
      controls.appendChild(button);
    }

    header.appendChild(controls);
    set(get());
  };

  apply(get());
  document.addEventListener("DOMContentLoaded", controls);
  media.addEventListener("change", () => {
    if (get() === "system") apply("system");
  });
})();
