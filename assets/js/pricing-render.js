document.addEventListener('DOMContentLoaded', () => {
 if (!window.VENDERS_PRICING) return;
 const card = (item, i) => `<article class="card price-card ${i===1?'featured':''}"><span class="tag">${item.label}</span><h3>${item.name}</h3><div class="price"><small>Custom quote</small></div><p>${item.audience}</p><ul class="check-list"><li>${item.pages}</li><li>${item.items}</li><li>${item.revisions}</li>${item.scope.map(x=>`<li>${x}</li>`).join('')}</ul><p><strong>Included in scope:</strong> ${item.includes}</p><p><strong>Not included:</strong> ${item.excludes}</p><a class="btn small" href="contact.html?service=${encodeURIComponent(item.name)}">Request a quote</a></article>`;
 const host = document.querySelector('#pricing-cards');
 if (host) host.innerHTML = window.VENDERS_PRICING.map(card).join('');
 const preview = document.querySelector('#pricing-preview');
 if (preview) preview.innerHTML = window.VENDERS_PRICING.slice(0, 2).map((item, i) => `<article class="card"><span class="tag">${item.label}</span><div class="price" style="margin-top:15px"><small>Project quote</small></div><p>${item.name}</p><p>${i === 0 ? 'For a focused first impression.' : 'For a growing business that needs more detail.'}</p></article>`).join('');
});
