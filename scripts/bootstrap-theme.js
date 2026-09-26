(() => {
  const key = "computer-systems-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;

  const mode = () => localStorage.getItem(key) || "system";
  const resolved = value => value === "system" ? (media.matches ? "dark" : "light") : value;
  const apply = value => root.setAttribute("data-bs-theme", resolved(value));

  const sync = () => {
    const value = mode();
    apply(value);
    document.querySelectorAll("#theme-controls [data-theme]").forEach(button => {
      const selected = button.dataset.theme === value;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  const install = () => {
    if (document.getElementById("theme-controls")) return;

    const siteName = document.getElementById("site_name");
    const host = siteName?.parentElement;
    if (!host) return;

    const controls = document.createElement("div");
    controls.id = "theme-controls";
    controls.className = "btn-group";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Color theme");

    for (const value of ["light", "dark", "system"]) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.theme = value;
      button.className = "btn btn-outline-secondary btn-sm";
      button.textContent = value[0].toUpperCase() + value.slice(1);
      button.addEventListener("click", () => {
        localStorage.setItem(key, value);
        sync();
      });
      controls.appendChild(button);
    }

    host.appendChild(controls);
    sync();
  };

  apply(mode());
  document.addEventListener("DOMContentLoaded", install);
  media.addEventListener("change", () => {
    if (mode() === "system") sync();
  });
})();
