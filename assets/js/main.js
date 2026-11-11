(() => {
  const config = window.VENDERS_CONFIG || {};
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('.industry-card').forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  }));
  document.querySelectorAll('[data-tiktok]').forEach(link => {
    if (config.tiktokUrl) { link.href = config.tiktokUrl; link.target = '_blank'; link.rel = 'noopener'; }
    else { link.href = 'contact.html'; link.textContent = 'Ask about our content plans'; }
  });
  const demoPreviews = {
    'glow-studio': {
      brand: 'glow studio',
      nav: 'Treatments&nbsp;&nbsp; Studio&nbsp;&nbsp; Visit',
      eyebrow: 'BEAUTY · WELLNESS',
      headline: 'A softer kind<br>of self-care.',
      action: 'BOOK A VISIT',
      image: 'demos/glow-studio/assets/glow-room.jpg',
      alt: 'A beauty treatment in a softly lit studio',
      details: [['FACIALS', 'from R520'], ['NAIL CARE', 'from R280'], ['BROWS', 'from R240']],
      tone: 'glow'
    },
    'karoo-kitchen': {
      brand: 'KAROO / KITCHEN',
      nav: 'Menu&nbsp;&nbsp; Our kitchen&nbsp;&nbsp; Find us',
      eyebrow: 'FRESH FROM THE KITCHEN',
      headline: 'Good food,<br>gathered well.',
      action: 'VIEW THE MENU',
      image: 'demos/karoo-kitchen/assets/karoo-hero.jpg',
      alt: 'A freshly cooked Karoo-inspired meal ready to share',
      details: [['LAMB ROLL', 'R95'], ['VEG BOWL', 'R78'], ['OPEN TODAY', '11—20']],
      tone: 'karoo'
    },
    'veld-build': {
      brand: 'V/B &nbsp; VELD &amp; BEAM',
      nav: 'Services&nbsp;&nbsp; Projects&nbsp;&nbsp; About',
      eyebrow: 'RENOVATION · JOINERY · REPAIRS',
      headline: 'Thoughtful updates.<br>Built to last.',
      action: 'REQUEST A QUOTE',
      image: 'demos/veld-build/assets/veld-facade.jpg',
      alt: 'Completed contemporary home improvement project',
      details: [['RENOVATIONS', 'Planned well'], ['JOINERY', 'Made to fit'], ['QUOTES', 'Clear scope']],
      tone: 'veld'
    },
    'wizard-motors': {
      brand: 'WIZARD MOTORS',
      nav: 'Vehicles&nbsp;&nbsp; Our approach&nbsp;&nbsp; Enquire',
      eyebrow: 'A CONSIDERED COLLECTION',
      headline: 'Find the one<br>that fits.',
      action: 'EXPLORE STOCK',
      image: 'demos/wizard-motors/assets/cyan-car.jpg',
      alt: 'Vintage coupe shown as an illustrative vehicle reference',
      details: [['SAMPLE STOCK', '3 vehicles'], ['FILTERS', 'Find your fit'], ['ENQUIRIES', 'No pressure']],
      tone: 'wizard'
    },
    'form-01': {
      brand: 'FORM / 01',
      nav: 'Collection&nbsp;&nbsp; Point of view&nbsp;&nbsp; Info',
      eyebrow: 'A UNIFORM FOR YOUR OWN DIRECTION',
      headline: 'Less noise.<br>More you.',
      action: 'SHOP THE EDIT',
      image: 'demos/form-01/assets/portrait-mark.jpg',
      alt: 'Streetwear campaign portrait used as illustrative reference imagery',
      details: [['THE EDIT', '4 pieces'], ['SAMPLE PRICE', 'From R420'], ['BAG', 'Demo only']],
      tone: 'form'
    },
    'haven-property-group': {
      brand: 'HAVEN / PROPERTY',
      nav: 'Homes&nbsp;&nbsp; Buying guide&nbsp;&nbsp; Contact',
      eyebrow: 'A MORE CONSIDERED PROPERTY SEARCH',
      headline: 'Find space<br>for what’s next.',
      action: 'EXPLORE HOMES',
      image: 'demos/haven-property-group/assets/villa.webp',
      alt: 'Contemporary villa used as illustrative property reference imagery',
      details: [['SAMPLE LISTINGS', '3 homes'], ['SEARCH', 'Filter details'], ['VIEWINGS', 'Enquiry only']],
      tone: 'haven'
    },
    'kalahari-house': {
      brand: 'KALAHARI HOUSE',
      nav: 'The stay&nbsp;&nbsp; Rooms&nbsp;&nbsp; Find us',
      eyebrow: 'A QUIETER WAY TO GET AWAY',
      headline: 'Space to<br>slow down.',
      action: 'EXPLORE THE STAY',
      image: 'demos/kalahari-house/assets/desert-evening.jpg',
      alt: 'Arid-region lodge landscape used as illustrative accommodation reference imagery',
      details: [['ROOMS', '2 concepts'], ['SAMPLE RATE', 'From R4,200'], ['STAYS', 'Request only']],
      tone: 'kalahari'
    }
  };
  if (!document.body.classList.contains('home-page')) {
    document.querySelectorAll('.showcase-visual').forEach(preview => {
      const demoLink = preview.closest('article')?.querySelector('a[href*="demos/"]');
      const slug = demoLink?.getAttribute('href').match(/demos\/([^/]+)\//)?.[1];
      const content = slug && demoPreviews[slug];
      if (!content) return;

      preview.classList.add('showcase-preview', `preview-${content.tone}`);
      preview.closest('.card')?.classList.add('preview-card');
      preview.setAttribute('role', 'group');
      const previewNames = {
        glow: 'Glow Studio',
        karoo: 'Karoo Kitchen',
        veld: 'Veld and Beam',
        wizard: 'Wizard Motors',
        form: 'FORM / 01',
        haven: 'Haven Property Group',
        kalahari: 'Kalahari House'
      };
      preview.setAttribute('aria-label', `${previewNames[content.tone]} website preview`);
      preview.innerHTML = `
      <div class="preview-browser">
        <div class="preview-chrome" aria-hidden="true"><i></i><i></i><i></i><span>venders.co / demo</span></div>
        <div class="preview-site">
          <div class="preview-site-nav"><strong>${content.brand}</strong><span>${content.nav}</span><b>${content.action}</b></div>
          <div class="preview-hero">
            <div class="preview-copy"><small>${content.eyebrow}</small><strong>${content.headline}</strong><span class="preview-action">${content.action} <i aria-hidden="true">↗</i></span></div>
            <figure class="preview-photo"><img src="${content.image}" alt="${content.alt}" loading="lazy" decoding="async"><span class="image-fallback" hidden>Photography preview unavailable</span></figure>
          </div>
          <div class="preview-details">${content.details.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join('')}</div>
        </div>
      </div>`;
      const image = preview.querySelector('.preview-photo img');
      image.addEventListener('error', () => {
        image.hidden = true;
        preview.querySelector('.image-fallback').hidden = false;
        preview.querySelector('.preview-photo').classList.add('image-unavailable');
      }, { once: true });
    });
  }
  const serviceField = document.querySelector('#service');
  if (serviceField) {
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService && [...serviceField.options].some(option => option.value === requestedService || option.text === requestedService)) {
      serviceField.value = requestedService;
    }
  }
  const form = document.querySelector('#enquiry-form');
  if (form) {
    const status = document.querySelector('#form-status');
    const output = document.querySelector('#enquiry-output');
    const actions = document.querySelector('#form-actions');
    const prepareButton = form.querySelector('[data-prepare-enquiry]');
    if (prepareButton) prepareButton.addEventListener('click', () => form.requestSubmit());
    let message = '';
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      message = `VENDERS.CO enquiry\nName: ${data.get('name')}\nBusiness: ${data.get('business') || 'Not provided'}\nEmail: ${data.get('email') || 'Not provided'}\nPhone/WhatsApp: ${data.get('phone')}\nIndustry: ${data.get('industry')}\nService: ${data.get('service')}\nBudget: ${data.get('budget') || 'Not specified'}\nTimeline: ${data.get('timeline') || 'Flexible'}\nPreferred contact: ${data.get('preferred')}\nProject: ${data.get('project')}`;
      status.textContent = 'Your enquiry has not been sent or stored. Choose a contact option below, or copy the message and share it yourself.';
      output.hidden = false; output.textContent = message; actions.hidden = false;
      const wa = document.querySelector('#whatsapp-action');
      const email = document.querySelector('#email-action');
      if (config.whatsappNumber) { wa.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`; wa.hidden = false; }
      if (config.email) { email.href = `mailto:${config.email}?subject=${encodeURIComponent('Website project enquiry')}&body=${encodeURIComponent(message)}`; email.hidden = false; }
      document.querySelector('#copy-action').onclick = async () => {
        try { await navigator.clipboard.writeText(message); status.textContent = 'Enquiry copied. It has not been sent; paste it into your preferred contact app.'; }
        catch { status.textContent = 'Select and copy the enquiry text below. It has not been sent.'; }
      };
    });
  }
})();
