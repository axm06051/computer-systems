(() => {
  const key = 'computer-systems:theme';
  const media = matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  const modes = ['light', 'dark', 'system'];

  const getMode = () => localStorage.getItem(key) || 'system';
  const applyTheme = mode => root.dataset.bsTheme = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode;
  const syncButtons = mode => document.querySelectorAll('[data-theme]').forEach(button => {
    const active = button.dataset.theme === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const setMode = mode => { localStorage.setItem(key, mode); applyTheme(mode); syncButtons(mode); };

  applyTheme(getMode());
  document.addEventListener('DOMContentLoaded', () => {
    syncButtons(getMode());
    document.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.theme)));

    const main = document.getElementById('book-content');
    if (!main) return;

    const searchInput = document.getElementById('book-search-input');
    const searchResults = document.getElementById('book-search-results');
    const searchList = document.getElementById('book-search-list');
    let index = [];

    fetch(window.BOOK_CONFIG.searchIndex)
      .then(response => response.ok ? response.json() : [])
      .then(data => { index = data.docs || []; })
      .catch(() => {});

    searchInput?.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      searchList.replaceChildren();
      if (query.length < 2) { searchResults.classList.add('d-none'); return; }
      const matches = index.filter(item => `${item.title || ''} ${item.text || ''}`.toLowerCase().includes(query)).slice(0, 12);
      for (const item of matches) {
        const link = document.createElement('a');
        link.className = 'list-group-item list-group-item-action';
        link.href = item.location;
        link.innerHTML = `<div class="fw-semibold"></div><div class="small text-body-secondary"></div>`;
        link.children[0].textContent = item.title || item.location;
        link.children[1].textContent = (item.text || '').replace(/\s+/g, ' ').slice(0, 180);
        searchList.appendChild(link);
      }
      if (!matches.length) {
        const empty = document.createElement('div');
        empty.className = 'list-group-item text-body-secondary';
        empty.textContent = 'No matching pages.';
        searchList.appendChild(empty);
      }
      searchResults.classList.remove('d-none');
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('#book-search, #book-search-results')) searchResults?.classList.add('d-none');
    });

    const current = document.querySelector('.book-sidebar a[aria-current="page"]');
    const links = [...document.querySelectorAll('.book-sidebar a[href]')];
    const indexOfCurrent = current ? links.indexOf(current) : -1;
    const pager = document.getElementById('book-pager');
    if (pager && indexOfCurrent >= 0) {
      const add = (link, label) => {
        const a = document.createElement('a');
        a.className = 'btn btn-outline-secondary';
        a.href = link.href;
        a.textContent = `${label} ${link.textContent.trim()}`;
        pager.appendChild(a);
      };
      if (links[indexOfCurrent - 1]) add(links[indexOfCurrent - 1], '←');
      if (links[indexOfCurrent + 1]) { const next = links[indexOfCurrent + 1]; const a = document.createElement('a'); a.className = 'btn btn-outline-secondary ms-auto'; a.href = next.href; a.textContent = `${next.textContent.trim()} →`; pager.appendChild(a); }
    }

    document.querySelectorAll('pre').forEach(pre => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2';
      button.textContent = 'Copy';
      const wrapper = document.createElement('div');
      wrapper.className = 'position-relative';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
      button.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(pre.innerText); button.textContent = 'Copied'; } catch { button.textContent = 'Copy failed'; }
        setTimeout(() => button.textContent = 'Copy', 1200);
      });
    });

    document.addEventListener('keydown', event => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (event.key === '/') { event.preventDefault(); searchInput?.focus(); }
      if (event.key === 't') window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  media.addEventListener('change', () => { if (getMode() === 'system') applyTheme('system'); });
})();
