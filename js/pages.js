/* ============================================================
   LUMIX — Page Scripts
============================================================ */

/* ── HOME ──────────────────────────────────────────────── */
function initHome() {
  LUMIX.initTheme();
  LUMIX.injectNavbar();
  LUMIX.injectFooter('');
  Modal.getInstance();

  /* Services overview cards */
  const svcGrid = document.getElementById('svc-overview');
  if (svcGrid) {
    [
      { icon:'💍', name:'Weddings', desc:'Venue, décor, vendors, photography, DJ — your dream wedding handled with one team.', link:'services/events.html' },
      { icon:'📷', name:'Photography', desc:'Cinematic films, candid captures, drone aerials and stunning portraits.', link:'services/photography.html' },
      { icon:'🎧', name:'DJ & Sound', desc:'Pioneer rigs, line arrays and immersive light shows for any event size.', link:'services/dj.html' },
      { icon:'🔊', name:'Equipment Rental', desc:'PA systems, moving heads, lasers, backdrops and more — daily rates.', link:'services/rentals.html' },
    ].forEach((s, i) => {
      const el = document.createElement('a');
      el.href = s.link;
      el.className = `svc-card reveal rev-${i+1}`;
      el.innerHTML = `
        <div class="svc-icon">${s.icon}</div>
        <div class="svc-name">${s.name}</div>
        <p class="svc-desc">${s.desc}</p>
        <div class="svc-link">Explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>`;
      svcGrid.appendChild(el);
    });
    svcGrid.className = 'svc-grid';
  }

  /* DJ mini-rows */
  const djRows = document.getElementById('home-dj-rows');
  if (djRows) {
    (window.LUMIX_DATA?.djPackages || []).forEach((pkg, i) => {
      const el = document.createElement('a');
      el.href = 'services/dj.html';
      el.className = `dj-pkg-row reveal rev-${i+1}`;
      el.innerHTML = `
        <div class="dj-pkg-left">
          <span class="dj-pkg-emoji">${pkg.icon}</span>
          <div><div class="dj-pkg-name">${pkg.name}</div><div class="dj-pkg-detail">${pkg.meta?.[0]?.value||''} · Up to ${pkg.meta?.[1]?.value||''} guests</div></div>
        </div>
        <div class="dj-pkg-price">${pkg.price}</div>`;
      djRows.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(djRows);
  }

  /* Gallery preview (first 6 items) */
  const galPrev = document.getElementById('home-gallery-preview');
  if (galPrev) {
    const items = (window.LUMIX_DATA?.galleryItems || []).slice(0, 6);
    galPrev.className = 'gallery-grid';
    items.forEach(item => {
      const h = item.size==='tall'?340:item.size==='medium'?230:175;
      const el = document.createElement('div');
      el.className = `g-item ${item.size} reveal`;
      el.innerHTML = `
        <div class="g-placeholder" style="background:${item.bg};height:${h}px">
          <span>${item.placeholder}</span><small>${item.title}</small>
        </div>
        <span class="g-type-badge ${item.type}">${item.type==='video'?'▶ Video':'📷 Photo'}</span>
        <div class="g-overlay">
          <div class="g-cat">${item.category}</div>
          <div class="g-title">${item.title}</div>
        </div>`;
      galPrev.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(galPrev);
  }

  LUMIX.renderTestimonials('#home-testimonials');
}

/* ── GALLERY ────────────────────────────────────────────── */
function initGallery() {
  LUMIX.initTheme();
  LUMIX.injectNavbar();
  LUMIX.injectFooter('');
  const data = window.LUMIX_DATA?.galleryItems || [];
  const grid = document.getElementById('gallery-grid');
  const countEl = document.getElementById('gallery-count');
  let curCat = 'All', curType = 'All';

  new Filter({ container:'#gal-cat',  categories:['All','Weddings','DJ','Photography','Events'], onFilter: c => { curCat  = c; render(); } });
  new Filter({ container:'#gal-type', categories:['All','Photos','Videos'],                     onFilter: t => { curType = t; render(); } });

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b===btn));
      grid.className = btn.dataset.view === 'list' ? 'gallery-grid list-view' : 'gallery-grid';
    });
  });

  function render() {
    let items = Filter.filterItems(data, curCat);
    if (curType==='Photos') items = items.filter(i=>i.type==='photo');
    if (curType==='Videos') items = items.filter(i=>i.type==='video');
    if (countEl) countEl.innerHTML = `<strong>${items.length}</strong> of <strong>${data.length}</strong> items`;
    grid.innerHTML = '';
    if (!items.length) { grid.innerHTML = `<div class="g-empty" style="grid-column:1/-1"><div class="g-empty-icon">🔍</div><p>No items match this filter.</p></div>`; return; }
    items.forEach(item => {
      const h = item.size==='tall'?360:item.size==='medium'?250:180;
      const el = document.createElement('div');
      el.className = `g-item ${item.size} reveal`;
      el.innerHTML = `
        <div class="g-placeholder" style="background:${item.bg};height:${h}px">
          <span>${item.placeholder}</span><small>${item.title}</small>
        </div>
        <span class="g-type-badge ${item.type}">${item.type==='video'?'▶ Video':'📷 Photo'}</span>
        ${item.type==='video'?`<div class="g-play"><div class="g-play-btn"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg></div></div>`:''}
        <div class="g-overlay"><div class="g-cat">${item.category}</div><div class="g-title">${item.title}</div></div>`;
      grid.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(grid);
  }
  render();
}

/* ── DJ ─────────────────────────────────────────────────── */
function initDJ() {
  LUMIX.initTheme();
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  Modal.getInstance();
  const container = document.getElementById('dj-packages-grid');
  if (container) {
    container.className = 'package-grid';
    (window.LUMIX_DATA?.djPackages||[]).forEach((pkg,i) => {
      const el = new Card(pkg, { variant:'package', onClick: item => Modal.open(item) }).render();
      el.classList.add(`rev-${i+1}`);
      container.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(container);
  }
  LUMIX.renderTestimonials('#dj-testimonials');
}

/* ── PHOTOGRAPHY ────────────────────────────────────────── */
function initPhotography() {
  LUMIX.initTheme();
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  Modal.getInstance();
  const container = document.getElementById('photo-packages-grid');
  if (container) {
    container.className = 'package-grid';
    (window.LUMIX_DATA?.photographyPackages||[]).forEach((pkg,i) => {
      const el = new Card(pkg, { variant:'package', onClick: item => Modal.open(item) }).render();
      el.classList.add(`rev-${i+1}`);
      container.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(container);
  }
  const prev = document.getElementById('photo-gallery-preview');
  if (prev) {
    const items = (window.LUMIX_DATA?.galleryItems||[]).filter(i => i.category==='Photography'||i.category==='Weddings').slice(0,6);
    prev.className = 'gallery-grid';
    items.forEach(item => {
      const h = item.size==='tall'?320:item.size==='medium'?220:165;
      const el = document.createElement('div');
      el.className = `g-item ${item.size} reveal`;
      el.innerHTML = `<div class="g-placeholder" style="background:${item.bg};height:${h}px"><span>${item.placeholder}</span><small>${item.title}</small></div><span class="g-type-badge ${item.type}">${item.type==='video'?'▶ Video':'📷 Photo'}</span><div class="g-overlay"><div class="g-cat">${item.category}</div><div class="g-title">${item.title}</div></div>`;
      prev.appendChild(el);
    });
    window.LUMIX_REVEAL?.observe(prev);
  }
  LUMIX.renderTestimonials('#photo-testimonials');
}

/* ── EVENTS ─────────────────────────────────────────────── */
function initEvents() {
  LUMIX.initTheme();
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  Modal.getInstance();
  const container = document.getElementById('events-grid');
  const data = window.LUMIX_DATA?.eventServices || [];
  let active = 'All';
  new Filter({ container:'#events-filter', categories:['All','Wedding','Corporate','Private','Concert'],
    onFilter: cat => {
      active = cat;
      const items = cat==='All' ? data : data.filter(i => i.name.toLowerCase().includes(cat.toLowerCase())||i.id.includes(cat.toLowerCase()));
      Card.renderMany(items.length?items:data, container, { variant:'service', onClick: item=>Modal.open(item) });
    }
  });
  Card.renderMany(data, container, { variant:'service', onClick: item=>Modal.open(item) });
  LUMIX.renderTestimonials('#events-testimonials');
}

/* ── RENTALS ────────────────────────────────────────────── */
function initRentals() {
  LUMIX.initTheme();
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  Modal.getInstance();
  const data = window.LUMIX_DATA?.rentalItems || [];
  const container = document.getElementById('rentals-grid');
  const cats = ['All', ...new Set(data.map(i=>i.category))];
  new Filter({ container:'#rentals-filter', categories:cats, onFilter: cat => {
    Card.renderMany(Filter.filterItems(data, cat), container, { variant:'rental', onClick:item=>Modal.open(item) });
  }});
  Card.renderMany(data, container, { variant:'rental', onClick:item=>Modal.open(item) });
  LUMIX.renderTestimonials('#rentals-testimonials');
}

/* ── CONTACT ────────────────────────────────────────────── */
function initContact() {
  LUMIX.initTheme();
  LUMIX.injectNavbar();
  LUMIX.injectFooter('');
  const form = document.getElementById('contact-form');
  if (!form) return;
  document.querySelectorAll('.svc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.svc-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('svc-input').value = btn.dataset.svc;
    });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const sb = form.querySelector('[type="submit"]');
    sb.disabled = true; sb.textContent = 'Sending…';
    setTimeout(() => { document.getElementById('form-success').style.display='flex'; form.style.display='none'; }, 1400);
  });
  const p = new URLSearchParams(location.search);
  const s = p.get('service');
  if (s) { const b = document.querySelector(`[data-svc="${s}"]`); if (b) b.click(); }
}

/* ── Auto-init ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home')        initHome();
  if (page === 'gallery')     initGallery();
  if (page === 'dj')          initDJ();
  if (page === 'photography') initPhotography();
  if (page === 'events')      initEvents();
  if (page === 'rentals')     initRentals();
  if (page === 'contact')     initContact();
});
