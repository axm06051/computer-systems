(() => {
  const storagePrefix = "computer-systems:";
  const main = document.querySelector('.col-md-9[role="main"]');
  if (!main) return;

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const nav = document.querySelector('.bs-sidebar');
  const current = nav?.querySelector('.nav-link.active, .nav-link[aria-current="page"]');
  const header = document.querySelector('header.navbar, nav.navbar');

  // Keep the generated MkDocs navigation as the canonical book navigation.
  // Add only stable utility links to the real Bootstrap navbar.
  if (header) {
    const navList = header.querySelector('.navbar-nav');
    const utilities = [
      ["Roadmap", "ROADMAP.html"],
      ["Assets", "INTERACTIVE-ASSETS.html"],
    ];
    utilities.forEach(([label, path]) => {
      if (!navList || [...navList.querySelectorAll('a')].some(a => a.textContent.trim() === label)) return;
      const item = create('li', 'nav-item');
      const link = create('a', 'nav-link', label);
      link.href = new URL(path, document.baseURI).href;
      item.appendChild(link);
      navList.appendChild(item);
    });
  }

  const pageKey = `${storagePrefix}complete:${location.pathname}`;
  const toolbar = create('div', 'book-toolbar border rounded-3 p-2 mb-4');
  toolbar.setAttribute('aria-label', 'Book controls');
  const controls = create('div', 'd-flex flex-wrap align-items-center gap-2');
  const progressText = create('span', 'book-progress-text small text-body-secondary ms-auto');

  const complete = create('button', 'btn btn-sm btn-outline-secondary');
  complete.type = 'button';
  complete.textContent = 'Mark chapter complete';
  complete.setAttribute('aria-pressed', 'false');

  const focus = create('button', 'btn btn-sm btn-outline-secondary');
  focus.type = 'button';
  focus.textContent = 'Focus mode';
  focus.setAttribute('aria-pressed', 'false');

  const top = create('button', 'btn btn-sm btn-outline-secondary');
  top.type = 'button';
  top.textContent = 'Top';

  controls.append(complete, focus, top, progressText);
  toolbar.appendChild(controls);
  main.insertBefore(toolbar, main.firstChild);

  const updateComplete = () => {
    const done = localStorage.getItem(pageKey) === '1';
    complete.textContent = done ? 'Chapter complete' : 'Mark chapter complete';
    complete.classList.toggle('active', done);
    complete.setAttribute('aria-pressed', String(done));
  };

  complete.addEventListener('click', () => {
    const done = localStorage.getItem(pageKey) === '1';
    localStorage.setItem(pageKey, done ? '0' : '1');
    updateComplete();
  });

  focus.addEventListener('click', () => {
    document.body.classList.toggle('book-focus');
    const enabled = document.body.classList.contains('book-focus');
    focus.textContent = enabled ? 'Exit focus mode' : 'Focus mode';
    focus.setAttribute('aria-pressed', String(enabled));
  });

  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  updateComplete();

  const headings = [...main.querySelectorAll('h2, h3')].filter(h => h.id);
  if (headings.length > 1) {
    const outline = create('aside', 'book-outline border rounded-3 p-3 mb-4');
    const title = create('div', 'fw-semibold mb-2', 'On this page');
    const list = create('ul', 'list-unstyled mb-0');
    headings.forEach(heading => {
      const item = create('li', heading.tagName === 'H3' ? 'ms-3' : '');
      const link = create('a', 'd-block py-1 small text-decoration-none', heading.textContent);
      link.href = `#${heading.id}`;
      item.appendChild(link);
      list.appendChild(item);
    });
    outline.append(title, list);
    main.insertBefore(outline, toolbar.nextSibling);
  }

  main.querySelectorAll('pre').forEach(pre => {
    if (pre.parentElement.classList.contains('book-code')) return;
    const wrapper = create('div', 'book-code position-relative');
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    const copy = create('button', 'btn btn-sm btn-outline-secondary book-copy');
    copy.type = 'button';
    copy.textContent = 'Copy';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        copy.textContent = 'Copied';
        window.setTimeout(() => { copy.textContent = 'Copy'; }, 1200);
      } catch {
        copy.textContent = 'Copy failed';
        window.setTimeout(() => { copy.textContent = 'Copy'; }, 1200);
      }
    });
    wrapper.appendChild(copy);
  });

  const links = nav ? [...nav.querySelectorAll('a[href]')].filter(a => a.href.startsWith(location.origin)) : [];
  const currentIndex = current ? links.indexOf(current) : -1;
  if (currentIndex >= 0) {
    const pager = create('nav', 'book-pager d-flex justify-content-between gap-3 border-top mt-5 pt-4');
    pager.setAttribute('aria-label', 'Chapter navigation');
    const previous = links[currentIndex - 1];
    const next = links[currentIndex + 1];
    if (previous) {
      const link = create('a', 'btn btn-outline-secondary text-start', `← ${previous.textContent.trim()}`);
      link.href = previous.href;
      pager.appendChild(link);
    } else {
      pager.appendChild(create('span'));
    }
    if (next) {
      const link = create('a', 'btn btn-outline-secondary text-end ms-auto', `${next.textContent.trim()} →`);
      link.href = next.href;
      pager.appendChild(link);
    }
    main.appendChild(pager);
  }

  // The repository belongs in the footer, not in the primary reading navigation.
  const footer = document.querySelector('footer') || document.body.appendChild(create('footer', 'mt-5'));
  if (!footer.querySelector('[data-book-repository]')) {
    const wrapper = create('div', 'container-fluid px-0 d-flex flex-wrap justify-content-between align-items-center gap-2');
    const label = create('span', 'small text-body-secondary', 'Computer Systems: From Logic Gates to Operating Systems');
    const repo = create('a', 'small text-decoration-none', 'Source repository');
    repo.dataset.bookRepository = 'true';
    repo.href = 'https://github.com/axm06051/computer-systems';
    repo.target = '_blank';
    repo.rel = 'noopener noreferrer';
    wrapper.append(label, repo);
    footer.appendChild(wrapper);
  }

  const updateProgress = () => {
    const rect = main.getBoundingClientRect();
    const total = Math.max(1, main.scrollHeight - window.innerHeight);
    const value = Math.max(0, Math.min(100, ((-rect.top) / total) * 100));
    progressText.textContent = `${Math.round(value)}% read`;
  };
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  document.addEventListener('keydown', event => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (event.key === '/') {
      event.preventDefault();
      document.querySelector('#mkdocs-search-query, input[type="search"]')?.focus();
    }
    if (event.key === 't') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (event.key === 'f') focus.click();
  });
})();
