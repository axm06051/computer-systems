(() => {
  const storageKey = "computer-systems-theme";
  const root = document.documentElement;

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    const resolved = theme === "system" ? systemTheme() : theme;
    root.setAttribute("data-md-color-scheme", resolved === "dark" ? "slate" : "default");
  }

  function current() {
    return localStorage.getItem(storageKey) || "system";
  }

  function set(theme) {
    localStorage.setItem(storageKey, theme);
    apply(theme);
    updateControls(theme);
  }

  function updateControls(theme) {
    document.querySelectorAll("[data-theme-choice]").forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.themeChoice === theme));
    });
  }

  function addControls() {
    if (document.querySelector("[data-theme-controls]")) return;
    const target = document.querySelector(".md-header__inner") || document.querySelector(".md-header");
    if (!target) return;

    const controls = document.createElement("div");
    controls.dataset.themeControls = "";
    controls.style.cssText = "display:flex;align-items:center;gap:.2rem;margin-left:.4rem";

    ["light", "dark", "system"].forEach((theme) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.themeChoice = theme;
      button.textContent = theme[0].toUpperCase() + theme.slice(1);
      button.title = `Use ${theme} mode`;
      button.style.cssText = "background:none;border:0;padding:.3rem .45rem;cursor:pointer;font:inherit;color:inherit";
      button.addEventListener("click", () => set(theme));
      controls.appendChild(button);
    });

    target.appendChild(controls);
    updateControls(current());
  }

  apply(current());
  document.addEventListener("DOMContentLoaded", addControls);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (current() === "system") apply("system");
  });
})();
