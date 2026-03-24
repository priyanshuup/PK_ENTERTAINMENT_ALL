/* ============================================================
   LUMIX — Card, Modal, Filter Components
============================================================ */

/* ── CARD ──────────────────────────────────────────────── */
class Card {
  constructor(item, opts = {}) {
    this.item = item;
    this.variant = opts.variant || 'service';
    this.onClick = opts.onClick || null;
  }
  render() {
    if (this.variant === 'package') return this._pkg();
    if (this.variant === 'rental')  return this._rental();
    return this._service();
  }
  _service() {
    const { item } = this;
    const el = document.createElement('div');
    el.className = 'card reveal';
    el.innerHTML = `
      <div class="card-img">
        <div class="card-placeholder" style="background:${item.placeholderBg||'var(--bg-2)'}">
          <span>${item.placeholder||'✨'}</span><small>${item.name}</small>
        </div>
        ${item.tag ? `<div class="card-tag"><span class="badge badge-gold">${item.tag}</span></div>` : ''}
        <div class="card-overlay"><button class="card-overlay-btn">View Details</button></div>
      </div>
      <div class="card-body">
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
      <div class="card-footer">
        <div><div class="card-price">${item.price}</div><div class="card-price-note">${item.priceNote}</div></div>
        <button class="btn btn-ghost btn-sm">Details</button>
      </div>`;
    el.addEventListener('click', () => this.onClick?.(item));
    return el;
  }
  _pkg() {
    const { item } = this;
    const el = document.createElement('div');
    el.className = `pkg-card reveal${item.featured ? ' featured' : ''}`;
    const root = location.pathname.includes('/services/') ? '../' : '';
    el.innerHTML = `
      ${item.featured ? `<div class="pkg-featured-tag">${item.tag||'Popular'}</div>` : ''}
      <div class="pkg-icon">${item.icon||'✨'}</div>
      <div class="pkg-name">${item.name}</div>
      <div class="pkg-price">${item.price}</div>
      <div class="pkg-price-note">${item.priceNote}</div>
      <div class="pkg-div"></div>
      <ul class="pkg-features">
        ${item.features.map(f=>`<li class="pkg-feature"><span class="pkg-check">✓</span><span>${f}</span></li>`).join('')}
      </ul>
      <a href="${root}contact.html" class="btn btn-gold" style="width:100%;justify-content:center">Book Now →</a>`;
    el.addEventListener('click', () => this.onClick?.(item));
    return el;
  }
  _rental() {
    const { item } = this;
    const el = document.createElement('div');
    el.className = 'card reveal';
    const root = location.pathname.includes('/services/') ? '../' : '';
    el.innerHTML = `
      <div class="card-img">
        <div class="card-placeholder" style="background:${item.placeholderBg||'var(--bg-2)'};height:180px">
          <span style="font-size:3rem">${item.placeholder||'📦'}</span><small>${item.subcategory||''}</small>
        </div>
        ${item.tag ? `<div class="card-tag"><span class="badge badge-gold">${item.tag}</span></div>` : ''}
        <div class="card-overlay"><button class="card-overlay-btn">View Specs</button></div>
      </div>
      <div class="card-body">
        <div class="card-category">${item.category} · ${item.subcategory||''}</div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
      <div class="card-footer">
        <div><div class="card-price">${item.price}</div><div class="card-price-note">${item.priceNote}</div></div>
        <a href="${root}contact.html" class="btn btn-outline-gold btn-sm">Rent</a>
      </div>`;
    el.addEventListener('click', () => this.onClick?.(item));
    return el;
  }
  static renderMany(items, container, opts = {}) {
    if (!container) return;
    container.innerHTML = '';
    items.forEach((item, i) => {
      const el = new Card(item, opts).render();
      el.classList.add(`rev-${(i%6)+1}`);
      container.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(container);
  }
}
window.Card = Card;

/* ── MODAL ─────────────────────────────────────────────── */
class Modal {
  constructor() { this._build(); this._bind(); }
  _build() {
    if (document.getElementById('lumix-modal')) return;
    const el = document.createElement('div');
    el.id = 'lumix-modal';
    el.className = 'modal-backdrop';
    el.setAttribute('role', 'dialog');
    el.innerHTML = `
      <div class="modal">
        <button class="modal-close" id="modal-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="modal-img" id="m-img"></div>
        <div class="modal-body">
          <div class="modal-eyebrow" id="m-ey"></div>
          <h2 class="modal-title"   id="m-title"></h2>
          <p  class="modal-desc"    id="m-desc"></p>
          <div class="modal-price-row" id="m-price"></div>
          <div class="modal-meta"   id="m-meta"></div>
          <div id="m-feats"><div class="modal-feats-label">What's Included</div><div class="modal-tags" id="m-tags"></div></div>
          <div class="modal-actions" id="m-acts"></div>
        </div>
      </div>`;
    document.body.appendChild(el);
    this.bd = el;
  }
  _bind() {
    document.getElementById('modal-close')?.addEventListener('click', () => this.close());
    this.bd?.addEventListener('click', e => { if (e.target === this.bd) this.close(); });
    document.addEventListener('keydown', e => { if (e.key==='Escape') this.close(); });
  }
  open(item) {
    const img = document.getElementById('m-img');
    img.style.background = item.placeholderBg || 'var(--bg-2)';
    img.innerHTML = item.image ? `<img src="${item.image}" alt="${item.name}">` : `<span style="font-size:5rem">${item.placeholder||'✨'}</span>`;
    document.getElementById('m-ey').textContent    = item.category || '';
    document.getElementById('m-title').textContent = item.name;
    document.getElementById('m-desc').textContent  = item.description;
    const pr = document.getElementById('m-price');
    pr.innerHTML = item.price ? `<span class="modal-price">${item.price}</span><span class="modal-price-unit">${item.priceNote||''}</span>` : '';
    pr.style.display = item.price ? 'flex' : 'none';
    const mt = document.getElementById('m-meta');
    mt.innerHTML = (item.meta||[]).map(m=>`<div class="modal-meta-item"><span class="modal-meta-label">${m.label}</span><span class="modal-meta-value">${m.value}</span></div>`).join('');
    mt.style.display = item.meta?.length ? 'flex' : 'none';
    const ft = document.getElementById('m-feats');
    ft.style.display = item.features?.length ? 'block' : 'none';
    document.getElementById('m-tags').innerHTML = (item.features||[]).map(f=>`<span class="modal-tag">${f}</span>`).join('');
    const root = location.pathname.includes('/services/') ? '../' : '';
    document.getElementById('m-acts').innerHTML = `
      <a href="${root}contact.html" class="btn btn-gold btn-lg">Book Now →</a>
      <a href="https://wa.me/32483471544" class="btn btn-ghost" target="_blank">💬 WhatsApp</a>`;
    this.bd.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  close() { this.bd?.classList.remove('open'); document.body.style.overflow = ''; }
  static getInstance() { if (!Modal._i) Modal._i = new Modal(); return Modal._i; }
  static open(item) { Modal.getInstance().open(item); }
}
window.Modal = Modal;

/* ── FILTER ────────────────────────────────────────────── */
class Filter {
  constructor(cfg) {
    this.el       = typeof cfg.container === 'string' ? document.querySelector(cfg.container) : cfg.container;
    this.cats     = cfg.categories || ['All'];
    this.onFilter = cfg.onFilter || (() => {});
    this.active   = cfg.default || 'All';
    this._render();
  }
  _render() {
    if (!this.el) return;
    this.el.innerHTML = '';
    this.cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className   = `filter-btn${cat === this.active ? ' active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        this.el.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b===btn));
        this.active = cat;
        this.onFilter(cat);
      });
      this.el.appendChild(btn);
    });
  }
  static filterItems(items, cat, field = 'category') {
    return (!cat || cat === 'All') ? items : items.filter(i => i[field] === cat);
  }
}
window.Filter = Filter;
