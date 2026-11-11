(() => {
  const navButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  navButton.addEventListener('click', () => {
    const open = navButton.getAttribute('aria-expanded') !== 'true';
    navButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));

  const bagDialog = document.querySelector('#bag-dialog');
  const bagLines = document.querySelector('#bag-lines');
  const bagCount = document.querySelector('#bag-count');
  const bagTotal = document.querySelector('#bag-total');
  const emptyBag = document.querySelector('#empty-bag');
  const shopStatus = document.querySelector('#shop-status');
  let bag = [];
  try {
    bag = JSON.parse(sessionStorage.getItem('form01-demo-bag') || '[]');
    if (!Array.isArray(bag)) bag = [];
  } catch (error) {
    shopStatus.textContent = 'Your saved demo bag could not be restored in this browser session.';
  }
  const money = amount => `R${Number(amount).toLocaleString('en-ZA')}`;
  const saveBag = () => sessionStorage.setItem('form01-demo-bag', JSON.stringify(bag));
  const renderBag = () => {
    bagLines.replaceChildren();
    let quantityTotal = 0;
    let subtotal = 0;
    bag.forEach((item, index) => {
      const line = document.createElement('article');
      line.className = 'bag-line';
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = '';
      const description = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = item.name;
      const variant = document.createElement('small');
      variant.textContent = `${item.size} / ${item.colour}`;
      description.append(title, variant);
      const actions = document.createElement('div');
      actions.className = 'line-actions';
      const price = document.createElement('strong');
      price.textContent = money(item.price * item.quantity);
      const controls = document.createElement('div');
      controls.className = 'quantity-controls';
      const decrease = document.createElement('button');
      decrease.type = 'button';
      decrease.textContent = '−';
      decrease.setAttribute('aria-label', `Reduce ${item.name} quantity`);
      decrease.addEventListener('click', () => updateQuantity(index, -1));
      const quantity = document.createElement('span');
      quantity.textContent = item.quantity;
      const increase = document.createElement('button');
      increase.type = 'button';
      increase.textContent = '+';
      increase.setAttribute('aria-label', `Increase ${item.name} quantity`);
      increase.addEventListener('click', () => updateQuantity(index, 1));
      controls.append(decrease, quantity, increase);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove-line';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        bag.splice(index, 1);
        refreshBag();
      });
      actions.append(price, controls, remove);
      line.append(image, description, actions);
      bagLines.append(line);
      quantityTotal += item.quantity;
      subtotal += item.price * item.quantity;
    });
    bagCount.textContent = quantityTotal;
    bagTotal.textContent = money(subtotal);
    emptyBag.hidden = bag.length > 0;
  };
  const refreshBag = () => {
    saveBag();
    renderBag();
  };
  const updateQuantity = (index, delta) => {
    bag[index].quantity += delta;
    if (bag[index].quantity < 1) bag.splice(index, 1);
    refreshBag();
  };
  renderBag();
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
    const product = button.closest('[data-product]');
    const size = product.querySelector('[data-size]').value;
    const colour = product.querySelector('[data-colour]').value;
    if (!size) {
      product.querySelector('[data-size]').reportValidity();
      shopStatus.textContent = 'Choose a size or shoe size before adding this sample item.';
      return;
    }
    const existing = bag.find(item => item.id === product.dataset.id && item.size === size && item.colour === colour);
    if (existing) existing.quantity += 1;
    else bag.push({id: product.dataset.id, name: product.dataset.name, price: Number(product.dataset.price), image: product.dataset.image, size, colour, quantity: 1});
    refreshBag();
    shopStatus.textContent = `${product.dataset.name} / ${size} / ${colour} added to your demo bag.`;
  }));
  document.querySelector('[data-open-bag]').addEventListener('click', () => bagDialog.showModal());
  document.querySelector('[data-close-bag]').addEventListener('click', () => bagDialog.close());
  bagDialog.addEventListener('click', event => {
    if (event.target === bagDialog) bagDialog.close();
  });
  document.querySelector('#sort-products').addEventListener('change', event => {
    const products = [...document.querySelectorAll('[data-product]')];
    const mode = event.currentTarget.value;
    if (mode === 'featured') products.sort((a, b) => Number(a.dataset.id === 'drift-hoodie') * -1);
    else products.sort((a, b) => mode === 'price-low' ? Number(a.dataset.price) - Number(b.dataset.price) : Number(b.dataset.price) - Number(a.dataset.price));
    products.forEach(product => document.querySelector('#product-grid').append(product));
  });
  document.querySelector('#checkout-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (bag.length === 0) {
      document.querySelector('#checkout-status').textContent = 'Add a sample item before reviewing a demo order.';
      return;
    }
    const summary = bag.map(item => `${item.quantity} × ${item.name} (${item.size}, ${item.colour})`).join('; ');
    document.querySelector('#checkout-status').textContent = `Demo order summary: ${summary}. Sample subtotal ${bagTotal.textContent}. No payment, order, stock hold or delivery was created.`;
  });
})();
