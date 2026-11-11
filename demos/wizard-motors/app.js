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

  const filterForm = document.querySelector('#inventory-filters');
  const vehicles = [...document.querySelectorAll('.vehicle')];
  const resultCount = document.querySelector('#results-count');
  const emptyState = document.querySelector('#empty-state');
  const formatPrice = value => `R${Number(value).toLocaleString('en-ZA')}`;
  filterForm.addEventListener('input', () => {
    const filters = new FormData(filterForm);
    let visible = 0;
    vehicles.forEach(vehicle => {
      const matches = (!filters.get('search') || vehicle.dataset.name.toLowerCase().includes(filters.get('search').toLowerCase()))
        && (!filters.get('make') || vehicle.dataset.make === filters.get('make'))
        && (!filters.get('body') || vehicle.dataset.body === filters.get('body'))
        && (!filters.get('transmission') || vehicle.dataset.transmission === filters.get('transmission'))
        && (!filters.get('price') || Number(vehicle.dataset.price) <= Number(filters.get('price')));
      vehicle.hidden = !matches;
      if (matches) visible += 1;
    });
    resultCount.textContent = `${visible} illustrative vehicle${visible === 1 ? '' : 's'}`;
    emptyState.hidden = visible !== 0;
  });

  const dialog = document.querySelector('#vehicle-dialog');
  const dialogImage = document.querySelector('#dialog-image');
  const imagePosition = document.querySelector('#gallery-position');
  let selectedVehicle;
  let galleryIndex = 0;
  const gallery = ['assets/cyan-car.jpg', 'assets/road-car.jpg', 'assets/mirror-car.jpg'];
  const renderGalleryImage = () => {
    dialogImage.src = gallery[galleryIndex];
    dialogImage.alt = `Illustrative vehicle photograph ${galleryIndex + 1} of ${gallery.length}; not guaranteed to depict the sample vehicle`;
    imagePosition.textContent = `${galleryIndex + 1} / ${gallery.length}`;
  };
  document.querySelectorAll('[data-open-vehicle]').forEach(button => button.addEventListener('click', () => {
    selectedVehicle = button.closest('.vehicle');
    galleryIndex = gallery.indexOf(selectedVehicle.dataset.image);
    document.querySelector('#dialog-title').textContent = selectedVehicle.dataset.name;
    document.querySelector('#dialog-price').textContent = formatPrice(selectedVehicle.dataset.price);
    document.querySelector('#dialog-mileage').textContent = `${Number(selectedVehicle.dataset.mileage).toLocaleString('en-ZA')} km`;
    document.querySelector('#dialog-specs').textContent = `${selectedVehicle.dataset.body.toUpperCase()} / ${selectedVehicle.dataset.transmission}`;
    renderGalleryImage();
    dialog.showModal();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('.gallery-arrow.previous').addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + gallery.length) % gallery.length;
    renderGalleryImage();
  });
  document.querySelector('.gallery-arrow.next').addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % gallery.length;
    renderGalleryImage();
  });
  document.querySelector('#dialog-enquire').addEventListener('click', () => {
    document.querySelector('[name="vehicle"]').value = selectedVehicle.dataset.name;
    dialog.close();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelector('#enquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    document.querySelector('#form-status').textContent = `Demo enquiry prepared: ${data.get('type')} for ${data.get('vehicle') || 'a sample vehicle'}. Nothing was sent or stored.`;
    form.reset();
  });
})();
