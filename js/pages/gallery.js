/* ============================================================
   LUMIX — Gallery Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbar();
  LUMIX.injectFooter('');
  new Navbar();

  const data     = window.LUMIX_DATA?.galleryItems || [];
  const gridEl   = document.getElementById('gallery-grid');
  const countEl  = document.getElementById('gallery-count-text');
  let   currentCat  = 'All';
  let   currentType = 'All';

  /* ---- Category filter -------------------------------- */
  new Filter({
    container: '#gallery-filter-cat',
    categories: ['All', 'Events', 'DJ', 'Photography'],
    onFilter: (cat) => { currentCat = cat; renderGallery(); },
  });

  /* ---- Type filter ------------------------------------ */
  new Filter({
    container: '#gallery-filter-type',
    categories: ['All', 'Photos', 'Videos'],
    onFilter: (type) => { currentType = type; renderGallery(); },
  });

  /* ---- View toggle ------------------------------------ */
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gridEl.className = btn.dataset.view === 'list'
        ? 'gallery-grid list-view'
        : 'gallery-grid';
    });
  });

  /* ---- Render ----------------------------------------- */
  function renderGallery() {
    let items = data;

    if (currentCat !== 'All') {
      items = items.filter(i => i.category === currentCat);
    }
    if (currentType === 'Photos') {
      items = items.filter(i => i.type === 'photo');
    } else if (currentType === 'Videos') {
      items = items.filter(i => i.type === 'video');
    }

    if (countEl) {
      countEl.innerHTML = `Showing <strong>${items.length}</strong> of <strong>${data.length}</strong> items`;
    }

    gridEl.innerHTML = '';

    if (items.length === 0) {
      gridEl.innerHTML = `
        <div class="gallery-empty" style="grid-column:1/-1">
          <div class="gallery-empty-icon">🔍</div>
          <p class="gallery-empty-text">No items found for this filter.</p>
        </div>`;
      return;
    }

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = `gallery-item ${item.size} reveal`;
      const h = item.size === 'tall' ? 360 : item.size === 'medium' ? 240 : 170;
      el.innerHTML = `
        <div class="gallery-placeholder" style="background:${item.bg};height:${h}px">
          <span>${item.placeholder}</span>
          <span style="font-size:0.65rem;letter-spacing:.14em;text-transform:uppercase;font-family:var(--font-body);color:var(--clr-text-muted)">${item.title}</span>
        </div>
        <div class="gallery-item-type">
          <span class="type-badge ${item.type}">${item.type === 'video' ? '▶ Video' : '📷 Photo'}</span>
        </div>
        ${item.type === 'video' ? `
          <div class="video-play">
            <div class="play-circle">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>` : ''}
        <div class="gallery-item-overlay">
          <div class="gallery-item-cat">${item.category}</div>
          <div class="gallery-item-title">${item.title}</div>
        </div>
      `;
      gridEl.appendChild(el);
    });

    if (window.LUMIX_REVEAL) window.LUMIX_REVEAL.observe(gridEl);
  }

  renderGallery();
});
