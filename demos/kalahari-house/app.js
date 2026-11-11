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

  const dialog = document.querySelector('#room-dialog');
  const roomImage = document.querySelector('#room-image');
  let selectedRoom;
  document.querySelectorAll('[data-open-room]').forEach(button => button.addEventListener('click', () => {
    selectedRoom = button.closest('.room-card');
    document.querySelector('#room-title').textContent = selectedRoom.dataset.room;
    document.querySelector('#room-rate').textContent = `${selectedRoom.dataset.rate} / night · sample rate`;
    document.querySelector('#room-details').textContent = selectedRoom.dataset.details;
    roomImage.src = selectedRoom.dataset.image;
    roomImage.alt = `${selectedRoom.dataset.room} accommodation reference image; not an image of the fictional room`;
    dialog.showModal();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('#room-enquire').addEventListener('click', () => {
    const roomField = document.querySelector('[name="room"]');
    roomField.value = selectedRoom.dataset.room;
    roomField.dispatchEvent(new Event('change', {bubbles: true}));
    dialog.close();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  const form = document.querySelector('#stay-form');
  const arrival = form.elements.arrival;
  const departure = form.elements.departure;
  const roomField = form.elements.room;
  const guestField = form.elements.guests;
  const guestOptions = [...guestField.options].filter(option => option.value);
  const updateGuestCapacity = () => {
    const room = [...document.querySelectorAll('.room-card')].find(card => card.dataset.room === roomField.value);
    const capacity = room ? Number(room.dataset.capacity) : Infinity;
    guestField.setCustomValidity('');
    guestOptions.forEach(option => { option.disabled = Number(option.value) > capacity; });
    if (Number(guestField.value) > capacity) guestField.value = '';
  };
  roomField.addEventListener('change', updateGuestCapacity);
  const today = new Date();
  const isoDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  arrival.min = isoDate;
  arrival.addEventListener('change', () => {
    departure.min = arrival.value;
    if (departure.value && departure.value <= arrival.value) departure.value = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (departure.value <= arrival.value) {
      departure.setCustomValidity('Departure must be after arrival.');
      departure.reportValidity();
      departure.addEventListener('input', () => departure.setCustomValidity(''), {once: true});
      return;
    }
    const room = [...document.querySelectorAll('.room-card')].find(card => card.dataset.room === roomField.value);
    if (!room || Number(guestField.value) > Number(room.dataset.capacity)) {
      guestField.setCustomValidity('Choose a guest count within the selected room capacity.');
      guestField.reportValidity();
      return;
    }
    const data = new FormData(form);
    document.querySelector('#stay-status').textContent = `Sample stay request: ${data.get('room')}, ${data.get('guests')} guest(s), ${data.get('arrival')} to ${data.get('departure')}. No availability check or reservation was made.`;
    form.reset();
    updateGuestCapacity();
    departure.min = arrival.min;
  });
})();
