/* ============================================================
   LUMIX — Home Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbar();
  LUMIX.injectFooter('');

  // Re-init navbar after injection
  new Navbar();

  // Init modal singleton
  Modal.getInstance();

  /* ---- Render service overview cards -------- */
  const servicesGrid = document.getElementById('services-overview-grid');
  if (servicesGrid) {
    const overviewItems = [
      {
        id: 'ov-dj',
        icon: '🎧',
        title: 'DJ Services',
        desc: 'From intimate house parties to 5000-person concerts. Professional DJ, sound systems, and lighting.',
        link: 'services/dj.html',
      },
      {
        id: 'ov-photo',
        icon: '📷',
        title: 'Photography',
        desc: 'Cinematic wedding films, portrait shoots, and event coverage that tells your story.',
        link: 'services/photography.html',
      },
      {
        id: 'ov-events',
        icon: '🎉',
        title: 'Event Handling',
        desc: 'Weddings, corporate galas, concerts and private parties — end-to-end management.',
        link: 'services/events.html',
      },
      {
        id: 'ov-rental',
        icon: '🔊',
        title: 'Equipment Rental',
        desc: 'PA systems, moving heads, lasers, backdrops, fog machines and more — daily or event rental.',
        link: 'services/rentals.html',
      },
    ];

    overviewItems.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = `service-card reveal reveal-delay-${i + 1}`;
      card.innerHTML = `
        <div class="service-icon">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <a href="${item.link}" class="service-card-link">
          Explore
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      `;
      card.addEventListener('click', () => { window.location.href = item.link; });
      servicesGrid.appendChild(card);
    });
  }

  /* ---- Render featured DJ packages ---------- */
  const djContainer = document.getElementById('home-dj-grid');
  if (djContainer) {
    djContainer.className = 'package-grid';
    const packages = window.LUMIX_DATA?.djPackages || [];
    packages.forEach((pkg, i) => {
      const card = new Card(pkg, {
        variant: 'package',
        onClick: (item) => Modal.open(item),
      });
      const el = card.render();
      el.classList.add(`reveal-delay-${i + 1}`);
      djContainer.appendChild(el);
    });
    if (window.LUMIX_REVEAL) window.LUMIX_REVEAL.observe(djContainer);
  }

  /* ---- Render gallery preview --------------- */
  const galleryPreview = document.getElementById('home-gallery-preview');
  if (galleryPreview) {
    const items = (window.LUMIX_DATA?.galleryItems || []).slice(0, 6);
    galleryPreview.className = 'gallery-grid';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = `gallery-item ${item.size} reveal`;
      el.innerHTML = `
        <div class="gallery-placeholder" style="background:${item.bg};height:${item.size === 'tall' ? '320' : item.size === 'medium' ? '220' : '160'}px">
          <span>${item.placeholder}</span>
          <span style="font-size:0.7rem;letter-spacing:.12em;text-transform:uppercase;font-family:var(--font-body)">${item.title}</span>
        </div>
        <div class="gallery-item-type">
          <span class="type-badge ${item.type}">${item.type === 'video' ? '▶ Video' : '📷 Photo'}</span>
        </div>
        <div class="gallery-item-overlay">
          <div class="gallery-item-cat">${item.category}</div>
          <div class="gallery-item-title">${item.title}</div>
        </div>
      `;
      galleryPreview.appendChild(el);
    });
    if (window.LUMIX_REVEAL) window.LUMIX_REVEAL.observe(galleryPreview);
  }

  /* ---- Testimonials ------------------------- */
  LUMIX.renderTestimonials('#home-testimonials-grid');
});
