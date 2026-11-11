(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-site-menu]');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.classList.toggle('is-open', open);
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menu.classList.remove('is-open');
    }));
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }

  document.querySelectorAll('[data-demo-image]').forEach(image => {
    image.addEventListener('error', () => {
      image.hidden = true;
      const fallback = image.parentElement.querySelector('[data-image-fallback]');
      if (fallback) fallback.hidden = false;
    }, { once: true });
  });

  document.querySelectorAll('[data-menu-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.menuFilter;
      document.querySelectorAll('[data-menu-filter]').forEach(filter => {
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      document.querySelectorAll('[data-menu-item]').forEach(item => {
        item.hidden = category !== 'all' && item.dataset.menuItem !== category;
      });
    });
  });
})();
