(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));

  const filterForm = document.querySelector('#property-filters');
  const properties = [...document.querySelectorAll('.property')];
  const resultCount = document.querySelector('#results-count');
  const emptyState = document.querySelector('#empty-state');
  const filterProperties = event => {
    if (event) event.preventDefault();
    const filters = new FormData(filterForm);
    let visible = 0;
    properties.forEach(property => {
      const minimumBedrooms = Number(filters.get('beds') || 0);
      const searchText = `${property.dataset.name} ${property.dataset.location}`.toLowerCase();
      const matches = (!filters.get('search') || searchText.includes(filters.get('search').toLowerCase()))
        && (!filters.get('status') || property.dataset.status === filters.get('status'))
        && (!filters.get('type') || property.dataset.type === filters.get('type'))
        && (!minimumBedrooms || Number(property.dataset.beds) >= minimumBedrooms);
      property.hidden = !matches;
      if (matches) visible += 1;
    });
    resultCount.textContent = `${visible} sample propert${visible === 1 ? 'y' : 'ies'}`;
    emptyState.hidden = visible > 0;
  };
  filterForm.addEventListener('submit', filterProperties);
  filterForm.addEventListener('input', filterProperties);

  const dialog = document.querySelector('#property-dialog');
  const image = document.querySelector('#dialog-image');
  const gallery = ['assets/villa.webp', 'assets/home-interior-3.webp', 'assets/home-interior-1.webp', 'assets/home-interior-2.webp'];
  let galleryIndex = 0;
  let selectedProperty;
  const renderGallery = () => {
    image.src = gallery[galleryIndex];
    image.alt = `Architectural reference image ${galleryIndex + 1} of ${gallery.length}; not a photograph of the sample listing`;
    document.querySelector('#gallery-count').textContent = `${galleryIndex + 1} / ${gallery.length}`;
  };
  document.querySelectorAll('[data-open-property]').forEach(button => button.addEventListener('click', () => {
    selectedProperty = button.closest('.property');
    galleryIndex = gallery.indexOf(selectedProperty.dataset.image);
    document.querySelector('#dialog-title').textContent = selectedProperty.dataset.name.replace(/\b\w/g, letter => letter.toUpperCase());
    document.querySelector('#dialog-price').textContent = `R${Number(selectedProperty.dataset.price).toLocaleString('en-ZA')}${selectedProperty.dataset.status === 'rent' ? ' / month' : ''}`;
    document.querySelector('#dialog-description').textContent = selectedProperty.dataset.description;
    renderGallery();
    dialog.showModal();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('.gallery-arrow.previous').addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + gallery.length) % gallery.length;
    renderGallery();
  });
  document.querySelector('.gallery-arrow.next').addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % gallery.length;
    renderGallery();
  });
  document.querySelector('#dialog-viewing').addEventListener('click', () => {
    document.querySelector('[name="property"]').value = selectedProperty.querySelector('h3').textContent;
    dialog.close();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  document.querySelector('#viewing-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    document.querySelector('#viewing-status').textContent = `Demo viewing request prepared for ${data.get('property')} on ${data.get('date')}. No agent was contacted and no viewing was booked.`;
    form.reset();
  });
})();
