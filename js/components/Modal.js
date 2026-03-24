/* ============================================================
   LUMIX — Modal Component
   Reusable detail modal for any item (service, rental, etc.).
   Usage: Modal.open(item)
============================================================ */

class Modal {
  constructor() {
    this._build();
    this._bindEvents();
    this._currentItem = null;
  }

  /* Build the modal DOM (appended to body once) */
  _build() {
    if (document.getElementById('lumix-modal')) return;
    const el = document.createElement('div');
    el.id = 'lumix-modal';
    el.className = 'modal-backdrop';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'modal-title');
    el.innerHTML = `
      <div class="modal" id="modal-inner">
        <button class="modal-close" id="modal-close-btn" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="modal-image" id="modal-image-wrap"></div>
        <div class="modal-body">
          <div class="modal-eyebrow" id="modal-eyebrow"></div>
          <h2 class="modal-title" id="modal-title"></h2>
          <p class="modal-desc" id="modal-desc"></p>
          <div class="modal-price-display" id="modal-price-wrap"></div>
          <div class="modal-meta" id="modal-meta"></div>
          <div class="modal-features" id="modal-features">
            <div class="modal-features-title">Includes</div>
            <div class="modal-features-list" id="modal-features-list"></div>
          </div>
          <div class="modal-actions" id="modal-actions"></div>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    this.backdrop = el;
    this.inner    = el.querySelector('#modal-inner');
  }

  _bindEvents() {
    const backdrop = document.getElementById('lumix-modal');
    if (!backdrop) return;

    // Close button
    backdrop.querySelector('#modal-close-btn').addEventListener('click', () => this.close());

    // Click outside
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  /** Open modal with a data item */
  open(item) {
    this._currentItem = item;
    this._populate(item);
    const backdrop = document.getElementById('lumix-modal');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus trap
    setTimeout(() => backdrop.querySelector('#modal-close-btn').focus(), 100);
  }

  close() {
    const backdrop = document.getElementById('lumix-modal');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    this._currentItem = null;
  }

  _populate(item) {
    // Image / placeholder
    const imgWrap = document.getElementById('modal-image-wrap');
    imgWrap.style.background = item.placeholderBg || 'var(--clr-bg-3)';
    imgWrap.innerHTML = item.image
      ? `<img src="${item.image}" alt="${item.name}">`
      : `<span style="font-size:5rem">${item.placeholder || '✨'}</span>`;

    // Text
    document.getElementById('modal-eyebrow').textContent = item.category || '';
    document.getElementById('modal-title').textContent   = item.name;
    document.getElementById('modal-desc').textContent    = item.description;

    // Price
    const priceWrap = document.getElementById('modal-price-wrap');
    if (item.price) {
      priceWrap.innerHTML = `
        <span class="modal-price-amount">${item.price}</span>
        <span class="modal-price-unit">${item.priceNote || ''}</span>
      `;
      priceWrap.style.display = 'flex';
    } else {
      priceWrap.style.display = 'none';
    }

    // Meta grid
    const metaEl = document.getElementById('modal-meta');
    if (item.meta && item.meta.length) {
      metaEl.innerHTML = item.meta.map(m => `
        <div class="modal-meta-item">
          <span class="modal-meta-label">${m.label}</span>
          <span class="modal-meta-value">${m.value}</span>
        </div>
      `).join('');
      metaEl.style.display = 'flex';
    } else {
      metaEl.style.display = 'none';
    }

    // Features / includes
    const featuresSection = document.getElementById('modal-features');
    const featuresList    = document.getElementById('modal-features-list');
    if (item.features && item.features.length) {
      featuresList.innerHTML = item.features.map(f =>
        `<span class="modal-feature-tag">${f}</span>`
      ).join('');
      featuresSection.style.display = 'block';
    } else {
      featuresSection.style.display = 'none';
    }

    // Actions
    const actions = document.getElementById('modal-actions');
    actions.innerHTML = `
      <a href="contact.html" class="btn btn-primary btn-lg">Book Now →</a>
      <a href="contact.html?inquiry=whatsapp" class="btn btn-outline">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    `;
  }

  /** Singleton accessor */
  static getInstance() {
    if (!Modal._instance) Modal._instance = new Modal();
    return Modal._instance;
  }

  /** Convenience static open */
  static open(item) {
    Modal.getInstance().open(item);
  }
}

window.Modal = Modal;
