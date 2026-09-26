(() => {
  const storageKey = "computer-systems-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function systemTheme() {
    return media.matches ? "dark" : "light";
  }

  function current() {
    return localStorage.getItem(storageKey) || "system";
  }

  function apply(theme = current()) {
    root.setAttribute("data-md-color-scheme", theme === "system" ? systemTheme() === "dark" ? "slate" : "default" : theme === "dark" ? "slate" : "default");
    updateControls(theme);
  }

  function set(theme) {
    localStorage.setItem(storageKey, theme);
    apply(theme);
  }

  function updateControls(theme) {
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      const selected = button.dataset.themeChoice === theme;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("theme-choice-active", selected);
    });
  }

  function addControls() {
    if (document.querySelector("[data-theme-controls]")) return;
    const target = document.querySelector(".md-header__inner");
    if (!target) return;

    const controls = document.createElement("div");
    controls.dataset.themeControls = "";
    controls.setAttribute("aria-label", "Color theme");
    controls.className = "theme-controls";

    for (const theme of ["light", "dark", "system"]) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.themeChoice = theme;
      button.textContent = theme[0].toUpperCase() + theme.slice(1);
      button.title = `Use ${theme} mode`;
      button.addEventListener("click", () => set(theme));
      controls.append(button);
    }

    target.append(controls);
    updateControls(current());
  }

  apply();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addControls, { once: true });
  else addControls();
  media.addEventListener("change", () => {
    if (current() === "system") apply();
  });
})();
