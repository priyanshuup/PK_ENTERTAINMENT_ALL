/* ============================================================
   LUMIX — Card Component
   Renders a single card from a data item.
   Used by: Home, DJ, Photography, Events, Rentals pages.
============================================================ */

class Card {
  /**
   * @param {Object} item     - data item from LUMIX_DATA
   * @param {Object} options  - { variant, onClick }
   *   variant: 'service' | 'package' | 'rental'
   */
  constructor(item, options = {}) {
    this.item    = item;
    this.variant = options.variant || 'service';
    this.onClick = options.onClick || null;
  }

  /** Build and return the DOM element */
  render() {
    switch (this.variant) {
      case 'package':  return this._renderPackage();
      case 'rental':   return this._renderRental();
      default:         return this._renderService();
    }
  }

  /* ---- Service / Event card (image + text body) -------- */
  _renderService() {
    const { item } = this;
    const el = document.createElement('div');
    el.className = 'card reveal';
    el.setAttribute('data-id', item.id);
    el.innerHTML = `
      <div class="card-img-wrap">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
          : `<div class="card-placeholder" style="height:200px;background:${item.placeholderBg||'var(--clr-surface)'}">${item.placeholder||'📷'}</div>`
        }
        ${item.tag ? `<div class="card-tag"><span class="badge badge-gold">${item.tag}</span></div>` : ''}
        <div class="card-overlay">
          <button class="card-overlay-btn">View Details</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
      <div class="card-footer">
        <div>
          <div class="card-price">${item.price}</div>
          <div class="card-price-label">${item.priceNote}</div>
        </div>
        <button class="btn btn-sm btn-outline">Details</button>
      </div>
    `;
    el.addEventListener('click', () => this.onClick && this.onClick(item));
    return el;
  }

  /* ---- Package card (pricing-tier layout) -------------- */
  _renderPackage() {
    const { item } = this;
    const el = document.createElement('div');
    el.className = `package-card reveal${item.featured ? ' featured' : ''}`;
    el.setAttribute('data-id', item.id);
    el.innerHTML = `
      ${item.featured ? `<div class="package-featured-badge">${item.tag || 'Popular'}</div>` : ''}
      <div class="package-icon">${item.icon || '✨'}</div>
      <div class="package-name">${item.name}</div>
      <div class="package-price">${item.price}</div>
      <div class="package-price-note">${item.priceNote}</div>
      <div class="package-divider"></div>
      <ul class="package-features-list">
        ${item.features.map(f => `
          <li class="package-feature">
            <span class="package-feature-check">✓</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
      <button class="btn btn-primary" style="width:100%">Book Now</button>
    `;
    el.querySelector('.btn-primary').addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'contact.html';
    });
    el.addEventListener('click', () => this.onClick && this.onClick(item));
    return el;
  }

  /* ---- Rental card (equipment layout) ------------------ */
  _renderRental() {
    const { item } = this;
    const el = document.createElement('div');
    el.className = 'card reveal';
    el.setAttribute('data-id', item.id);
    el.innerHTML = `
      <div class="card-img-wrap">
        <div class="card-placeholder" style="height:180px;background:${item.placeholderBg||'var(--clr-surface)'}">
          <span style="font-size:3.5rem">${item.placeholder||'📦'}</span>
        </div>
        ${item.tag ? `<div class="card-tag"><span class="badge badge-gold">${item.tag}</span></div>` : ''}
        <div class="card-overlay">
          <button class="card-overlay-btn">View Specs</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-category">${item.category} · ${item.subcategory || ''}</div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
      <div class="card-footer">
        <div>
          <div class="card-price">${item.price}</div>
          <div class="card-price-label">${item.priceNote}</div>
        </div>
        <button class="btn btn-sm btn-outline">Rent Now</button>
      </div>
    `;
    el.querySelector('.btn-outline').addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'contact.html';
    });
    el.addEventListener('click', () => this.onClick && this.onClick(item));
    return el;
  }

  /* ---- Static helper: render many cards into a container --- */
  static renderMany(items, container, options = {}) {
    container.innerHTML = '';
    items.forEach((item, i) => {
      const card = new Card(item, options);
      const el   = card.render();
      // Stagger reveal delay
      el.classList.add(`reveal-delay-${(i % 5) + 1}`);
      container.appendChild(el);
    });
    // Trigger intersection observer for newly added cards
    if (window.LUMIX_REVEAL) window.LUMIX_REVEAL.observe(container);
  }
}

// Export to global scope (no bundler)
window.Card = Card;
