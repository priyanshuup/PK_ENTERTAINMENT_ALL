/* ============================================================
   LUMIX — Photography Services Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  new Navbar();
  Modal.getInstance();

  const packages  = window.LUMIX_DATA?.photographyPackages || [];
  const container = document.getElementById('photo-packages-grid');

  if (container) {
    container.className = 'package-grid';
    packages.forEach((pkg, i) => {
      const card = new Card(pkg, {
        variant: 'package',
        onClick: (item) => Modal.open(item),
      });
      const el = card.render();
      el.classList.add(`reveal-delay-${i + 1}`);
      container.appendChild(el);
    });
    if (window.LUMIX_REVEAL) window.LUMIX_REVEAL.observe(container);
  }

  /* ---- Gallery preview (photography only) ----------- */
  const preview = document.getElementById('photo-gallery-preview');
  if (preview) {
    const items = (window.LUMIX_DATA?.galleryItems || [])
      .filter(i => i.category === 'Photography')
      .slice(0, 6);

    preview.className = 'gallery-grid';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = `gallery-item ${item.size} reveal`;
      const h = item.size === 'tall' ? 320 : item.size === 'medium' ? 220 : 160;
      el.innerHTML = `
        <div class="gallery-placeholder" style="background:${item.bg};height:${h}px">
          <span>${item.placeholder}</span>
          <span style="font-size:0.65rem;letter-spacing:.14em;text-transform:uppercase;font-family:var(--font-body);color:var(--clr-text-muted)">${item.title}</span>
        </div>
        <div class="gallery-item-type">
          <span class="type-badge ${item.type}">${item.type === 'video' ? '▶ Video' : '📷 Photo'}</span>
        </div>
        <div class="gallery-item-overlay">
          <div class="gallery-item-cat">${item.category}</div>
          <div class="gallery-item-title">${item.title}</div>
        </div>
      `;
      preview.appendChild(el);
    });
    if (window.LUMIX_REVEAL) window.LUMIX_REVEAL.observe(preview);
  }

  LUMIX.renderTestimonials('#photo-testimonials');
});
