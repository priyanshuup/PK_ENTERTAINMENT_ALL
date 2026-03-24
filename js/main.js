/* ============================================================
   LUMIX — main.js  |  Shared utilities, navbar, footer
============================================================ */

/* ── Scroll reveal ──────────────────────────────────────── */
(function(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      if (e.target.classList.contains('reveal')) e.target.classList.add('visible');
      obs.unobserve(e.target);
    });
  }, { threshold:.07, rootMargin:'0px 0px -30px 0px' });

  function observe(root) {
    if (!root) return;
    if (root.classList?.contains('reveal')) obs.observe(root);
    root.querySelectorAll?.('.reveal').forEach(el => obs.observe(el));
  }
  document.addEventListener('DOMContentLoaded', () => observe(document.body));
  window.LUMIX_REVEAL = { observe };
})();

document.addEventListener('DOMContentLoaded', () => document.body.classList.add('page-enter'));

/* ── Smooth hash scroll ─────────────────────────────────── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const t = document.getElementById(a.getAttribute('href').slice(1));
  if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior:'smooth' }); }
});

/* ============================================================
   LUMIX namespace
============================================================ */
window.LUMIX = {

  /* ── Build nav HTML ──────────────────────────────────── */
  _nav(root) {
    const m = window.LUMIX_DATA?.meta || {};
    const ph = m.phone || '+91 98765 43210';
    const wa = m.whatsapp || 'https://wa.me/919876543210';

    return `
<!-- ░░ TOPBAR ░░ -->
<div id="topbar">
  <div class="topbar">
    <div class="topbar-items">
      <div class="topbar-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.61a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .88h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.42z"/></svg>
        <a href="tel:+919876543210">${ph}</a>
      </div>
      <div class="topbar-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        Mon–Sun, 9am – 10pm IST
      </div>
      <div class="topbar-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Mumbai, Maharashtra
      </div>
      <div class="topbar-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        500+ Events Successfully Delivered
      </div>
    </div>
    <div class="topbar-right">
      <span class="topbar-badge">⭐ 4.9 Rating · 280+ Reviews</span>
      <a href="${wa}" class="topbar-wa" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.103 1.512 5.835L.057 24l6.32-1.465A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.825 9.825 0 01-5.002-1.362l-.36-.213-3.728.865.882-3.623-.234-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
        WhatsApp Us
      </a>
    </div>
    <button id="topbar-close" class="topbar-close">✕</button>
  </div>
</div>

<!-- ░░ NAVBAR ░░ -->
<nav id="navbar">
  <div class="navbar-inner">

    <!-- Logo -->
    <a href="${root}index.html" class="nav-logo">
      <div class="nav-logo-mark">L</div>
      <div class="nav-logo-text">
        <span class="nav-logo-name">LUMIX</span>
        <span class="nav-logo-tag">Events · Mumbai</span>
      </div>
    </a>

    <!-- Primary links -->
    <div class="nav-links">

      <!-- HOME -->
      <div class="nav-item">
        <a href="${root}index.html" class="nav-link">Home</a>
      </div>

      <!-- ══ WEDDINGS — Rich 4-col mega ══════════════════ -->
      <div class="nav-item">
        <button class="nav-trigger">
          Weddings
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mega mega-wedding-full">

          <!-- Col 1: Wedding Planning -->
          <div class="mf-col">
            <div class="mf-col-head">
              <div class="mf-col-icon">💍</div>
              <div>
                <div class="mf-col-title">Wedding Planning</div>
                <div class="mf-col-sub">End-to-end coordination</div>
              </div>
            </div>
            <a href="${root}services/events.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Pre-Wedding Planning</div>
                <div class="mfl-sub">Venue selection, budgeting & vendor tie-ups</div>
              </div>
            </a>
            <a href="${root}services/events.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Mehendi & Haldi</div>
                <div class="mfl-sub">Décor, music & traditional arrangements</div>
              </div>
            </a>
            <a href="${root}services/events.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Sangeet Night</div>
                <div class="mfl-sub">DJ, choreography coordination & stage setup</div>
              </div>
            </a>
            <a href="${root}services/events.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Wedding Day Management</div>
                <div class="mfl-sub">Day-of coordinator & on-ground crew</div>
              </div>
            </a>
            <a href="${root}services/events.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Reception & After-Party</div>
                <div class="mfl-sub">Guest flow, catering & farewell planning</div>
              </div>
            </a>
            <a href="${root}services/events.html" class="mf-cta-sm">Full Wedding Planning →</a>
          </div>

          <!-- Divider -->
          <div class="mf-divider"></div>

          <!-- Col 2: Photography & Film -->
          <div class="mf-col">
            <div class="mf-col-head">
              <div class="mf-col-icon">📷</div>
              <div>
                <div class="mf-col-title">Photography & Film</div>
                <div class="mf-col-sub">From ₹12,000</div>
              </div>
            </div>
            <a href="${root}services/photography.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Candid Photography</div>
                <div class="mfl-sub">Real emotions, unstaged & authentic</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Drone Aerial Shots</div>
                <div class="mfl-sub">Breathtaking bird's-eye venue coverage</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Cinematic Film</div>
                <div class="mfl-sub">15–20 min 4K film with colour grading</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Pre-Wedding Shoot</div>
                <div class="mfl-sub">Outdoor/indoor styled couple sessions</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Luxury Albums</div>
                <div class="mfl-sub">Printed, bound & delivered to your door</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mf-cta-sm">View Photo Packages →</a>
          </div>

          <!-- Divider -->
          <div class="mf-divider"></div>

          <!-- Col 3: DJ & Decor -->
          <div class="mf-col">
            <div class="mf-col-head">
              <div class="mf-col-icon">🎧</div>
              <div>
                <div class="mf-col-title">DJ & Ambiance</div>
                <div class="mf-col-sub">Sound · Lights · Decor</div>
              </div>
            </div>
            <a href="${root}services/dj.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Sangeet & Mehendi DJ</div>
                <div class="mfl-sub">Bollywood, folk, trending mixes</div>
              </div>
            </a>
            <a href="${root}services/dj.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Reception DJ + MC</div>
                <div class="mfl-sub">Dance floor management & live hosting</div>
              </div>
            </a>
            <a href="${root}services/rentals.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">LED Backdrops & Arches</div>
                <div class="mfl-sub">Customised stage setups & photo walls</div>
              </div>
            </a>
            <a href="${root}services/rentals.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Moving Head Lights</div>
                <div class="mfl-sub">CHAUVET & Elation pro rigs</div>
              </div>
            </a>
            <a href="${root}services/rentals.html" class="mf-link">
              <div class="mfl-dot"></div>
              <div>
                <div class="mfl-name">Fog & CO₂ Effects</div>
                <div class="mfl-sub">Atmospheric entrance & floor effects</div>
              </div>
            </a>
            <a href="${root}services/dj.html" class="mf-cta-sm">DJ Packages →</a>
          </div>

          <!-- Sidebar: Stats + CTA -->
          <div class="mf-sidebar">
            <div class="mfs-label">By the Numbers</div>
            <div class="mfs-stats">
              <div class="mfs-stat">
                <div class="mfs-num">200+</div>
                <div class="mfs-lbl">Weddings</div>
              </div>
              <div class="mfs-stat">
                <div class="mfs-num">8 Yrs</div>
                <div class="mfs-lbl">Experience</div>
              </div>
              <div class="mfs-stat">
                <div class="mfs-num">98%</div>
                <div class="mfs-lbl">Satisfaction</div>
              </div>
            </div>
            <div class="mfs-divider"></div>
            <div class="mfs-label">Starting From</div>
            <div class="mfs-pricing">
              <div class="mfs-price-row"><span>Photography</span><span class="mfs-price-val">₹12,000</span></div>
              <div class="mfs-price-row"><span>DJ Services</span><span class="mfs-price-val">₹15,000</span></div>
              <div class="mfs-price-row"><span>Full Planning</span><span class="mfs-price-val">₹80,000</span></div>
            </div>
            <a href="${root}contact.html?service=Wedding" class="mfs-cta">💍 Plan My Wedding</a>
            <a href="${root}contact.html" class="mfs-wa">💬 WhatsApp Us</a>
          </div>

          <!-- Bottom strip -->
          <div class="mega-strip">
            <div class="mega-strip-tags">
              <span class="mega-strip-tag">Hindu Weddings</span>
              <span class="mega-strip-tag">Muslim Weddings</span>
              <span class="mega-strip-tag">Christian Weddings</span>
              <span class="mega-strip-tag">Destination Weddings</span>
              <span class="mega-strip-tag">Intimate Ceremonies</span>
            </div>
            <a href="${root}gallery.html" class="mega-strip-cta">
              Browse Wedding Portfolio
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- ══ PHOTOGRAPHY — Rich 2-col mega ══════════════ -->
      <div class="nav-item">
        <button class="nav-trigger">
          Photography
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mega mega-photo-rich">
          <div class="mpr-col">
            <div class="mpr-col-head">📦 Packages</div>
            <a href="${root}services/photography.html" class="mpr-pkg featured-pkg">
              <div class="mpr-pkg-badge">Most Popular</div>
              <div class="mpr-pkg-icon">🎞️</div>
              <div class="mpr-pkg-info">
                <div class="mpr-pkg-name">Story Lens</div>
                <div class="mpr-pkg-sub">Full Day · 2 Photographers · 400+ Photos + Reel</div>
                <div class="mpr-pkg-price">From ₹35,000</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mpr-pkg">
              <div class="mpr-pkg-icon">📷</div>
              <div class="mpr-pkg-info">
                <div class="mpr-pkg-name">Frame It</div>
                <div class="mpr-pkg-sub">4 Hours · 1 Photographer · 100+ Photos</div>
                <div class="mpr-pkg-price">From ₹12,000</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mpr-pkg">
              <div class="mpr-pkg-icon">🎬</div>
              <div class="mpr-pkg-info">
                <div class="mpr-pkg-name">Cinema Edit</div>
                <div class="mpr-pkg-sub">4 Crew · Drone · 15-min 4K Film · Albums</div>
                <div class="mpr-pkg-price">From ₹75,000</div>
              </div>
            </a>
            <a href="${root}services/photography.html" class="mpr-view-all">View All Packages →</a>
          </div>
          <div class="mpr-divider"></div>
          <div class="mpr-col">
            <div class="mpr-col-head">✨ What We Offer</div>
            <div class="mpr-feat"><span class="mprf-icon">🚁</span><div><strong>Drone Aerial Photography</strong><div class="mprf-sub">Licensed pilots, DJI Pro drones</div></div></div>
            <div class="mpr-feat"><span class="mprf-icon">🎬</span><div><strong>4K Cinematic Films</strong><div class="mprf-sub">Hollywood-style colour grading</div></div></div>
            <div class="mpr-feat"><span class="mprf-icon">📸</span><div><strong>Candid + Traditional</strong><div class="mprf-sub">Dual-photographer setup</div></div></div>
            <div class="mpr-feat"><span class="mprf-icon">📱</span><div><strong>Instagram Reels</strong><div class="mprf-sub">5 short-form reels, edit-ready</div></div></div>
            <div class="mpr-feat"><span class="mprf-icon">🖼️</span><div><strong>Luxury Photo Albums</strong><div class="mprf-sub">Printed, bound, home delivered</div></div></div>
            <div class="mpr-feat"><span class="mprf-icon">☁️</span><div><strong>Online Gallery Access</strong><div class="mprf-sub">Private link within 21 days</div></div></div>
            <div class="mpr-actions">
              <a href="${root}gallery.html" class="mpr-btn-ghost">Browse Portfolio</a>
              <a href="${root}contact.html?service=Photography" class="mpr-btn-gold">Book a Shoot</a>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ DJ & SOUND ══════════════════════════════════ -->
      <div class="nav-item">
        <button class="nav-trigger">
          DJ & Sound
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mega mega-dj">
          <div class="mdj-col">
            <div class="mdj-col-head">🎧 DJ Packages</div>
            <a href="${root}services/dj.html" class="mdj-pkg">
              <div class="mdj-pkg-icon">🥈</div>
              <div class="mdj-pkg-info">
                <div class="mdj-pkg-name">Silver Beat</div>
                <div class="mdj-pkg-sub">4 Hours · 1 DJ · Basic Sound & Lights</div>
                <div class="mdj-pkg-price">From ₹15,000</div>
              </div>
            </a>
            <a href="${root}services/dj.html" class="mdj-pkg popular">
              <div class="mdj-pkg-badge">⚡ Popular</div>
              <div class="mdj-pkg-icon">🥇</div>
              <div class="mdj-pkg-info">
                <div class="mdj-pkg-name">Gold Vibe</div>
                <div class="mdj-pkg-sub">8 Hours · 2 DJs · JBL Line Array · Moving Heads</div>
                <div class="mdj-pkg-price">From ₹28,000</div>
              </div>
            </a>
            <a href="${root}services/dj.html" class="mdj-pkg">
              <div class="mdj-pkg-icon">💎</div>
              <div class="mdj-pkg-info">
                <div class="mdj-pkg-name">Diamond Drop</div>
                <div class="mdj-pkg-sub">Full Event · 3 DJs · Pro Rig · MC Hosting</div>
                <div class="mdj-pkg-price">From ₹55,000</div>
              </div>
            </a>
            <a href="${root}services/dj.html" class="mdj-view-all">All DJ Packages & Pricing →</a>
          </div>
          <div class="mdj-divider"></div>
          <div class="mdj-col">
            <div class="mdj-col-head">🔊 Our Equipment</div>
            <div class="mdj-gear">
              <div class="mdj-gear-item"><span class="mdj-gear-icon">🎛️</span><div><strong>Pioneer XDJ-RX3</strong><div class="mdj-gear-sub">Club-standard decks, every show</div></div></div>
              <div class="mdj-gear-item"><span class="mdj-gear-icon">🔊</span><div><strong>JBL / QSC Line Arrays</strong><div class="mdj-gear-sub">Crystal clear, powerful sound</div></div></div>
              <div class="mdj-gear-item"><span class="mdj-gear-icon">💡</span><div><strong>CHAUVET Moving Heads</strong><div class="mdj-gear-sub">Professional stage lighting</div></div></div>
              <div class="mdj-gear-item"><span class="mdj-gear-icon">🌫️</span><div><strong>CO₂ Cannons & Fog</strong><div class="mdj-gear-sub">Atmospheric crowd effects</div></div></div>
              <div class="mdj-gear-item"><span class="mdj-gear-icon">🔴</span><div><strong>Laser Systems</strong><div class="mdj-gear-sub">RGB multi-beam laser shows</div></div></div>
            </div>
            <div class="mdj-events">
              <div class="mdj-events-label">Perfect For</div>
              <div class="mdj-event-tags">
                <span>💍 Sangeet</span><span>🎊 Receptions</span><span>🎂 Birthdays</span><span>🏢 Corporate</span><span>🎉 Private Parties</span>
              </div>
            </div>
            <a href="${root}contact.html?service=DJ+Services" class="mdj-cta">Book a DJ →</a>
          </div>
        </div>
      </div>

      <!-- ══ EVENTS dropdown ═════════════════════════════ -->
      <div class="nav-item">
        <button class="nav-trigger">
          Events
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="dropdown dd-events">
          <div class="dd-events-grid">
            <a href="${root}services/events.html" class="dde-card">
              <div class="dde-icon">💍</div>
              <div class="dde-name">Weddings</div>
              <div class="dde-sub">Full wedding management · All religions · All budgets</div>
              <div class="dde-price">From ₹80,000</div>
            </a>
            <a href="${root}services/events.html" class="dde-card">
              <div class="dde-icon">🏢</div>
              <div class="dde-name">Corporate Events</div>
              <div class="dde-sub">Conferences, product launches, team offsites & galas</div>
              <div class="dde-price">From ₹45,000</div>
            </a>
            <a href="${root}services/events.html" class="dde-card">
              <div class="dde-icon">🎂</div>
              <div class="dde-name">Birthday Parties</div>
              <div class="dde-sub">Kids birthdays to milestone celebrations</div>
              <div class="dde-price">From ₹18,000</div>
            </a>
            <a href="${root}services/events.html" class="dde-card">
              <div class="dde-icon">🎵</div>
              <div class="dde-name">Concerts & Shows</div>
              <div class="dde-sub">Live shows, DJ nights & ticketed events</div>
              <div class="dde-price">From ₹1,50,000</div>
            </a>
          </div>
          <div class="dd-events-footer">
            <span>Every event handled with a dedicated coordinator & on-ground crew</span>
            <a href="${root}contact.html">Plan Your Event →</a>
          </div>
        </div>
      </div>

      <!-- ══ RENTALS dropdown ════════════════════════════ -->
      <div class="nav-item">
        <button class="nav-trigger">
          Rentals
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="dropdown dd-rentals">
          <div class="ddr-head">
            <span>🔊 Equipment Rentals</span>
            <span class="ddr-tag">Mumbai Delivery · Daily Rates</span>
          </div>
          <div class="ddr-grid">
            <div class="ddr-cat">
              <div class="ddr-cat-title">🔊 Audio</div>
              <a href="${root}services/rentals.html" class="ddr-item"><span>PA / Speaker System</span><span class="ddr-price">₹1,500/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Subwoofer / Bass</span><span class="ddr-price">₹800/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>DJ Console (Pioneer)</span><span class="ddr-price">₹2,000/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Microphone Setup</span><span class="ddr-price">₹400/day</span></a>
            </div>
            <div class="ddr-cat">
              <div class="ddr-cat-title">💡 Lighting</div>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Moving Head Lights</span><span class="ddr-price">₹800/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Laser System (RGB)</span><span class="ddr-price">₹1,200/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>LED Par Can (set of 8)</span><span class="ddr-price">₹600/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Truss & Structure</span><span class="ddr-price">₹500/day</span></a>
            </div>
            <div class="ddr-cat">
              <div class="ddr-cat-title">🎊 Special FX & Décor</div>
              <a href="${root}services/rentals.html" class="ddr-item"><span>CO₂ Cannon</span><span class="ddr-price">₹1,000/use</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Fog / Haze Machine</span><span class="ddr-price">₹400/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>LED Backdrop (10x20)</span><span class="ddr-price">₹1,200/day</span></a>
              <a href="${root}services/rentals.html" class="ddr-item"><span>Confetti Cannon</span><span class="ddr-price">₹600/use</span></a>
            </div>
          </div>
          <div class="ddr-footer">
            <span>✅ All items include delivery, setup & pickup within Mumbai</span>
            <a href="${root}services/rentals.html">View Full Inventory →</a>
          </div>
        </div>
      </div>

      <!-- GALLERY -->
      <div class="nav-item">
        <a href="${root}gallery.html" class="nav-link">Gallery</a>
      </div>

      <!-- CONTACT -->
      <div class="nav-item">
        <a href="${root}contact.html" class="nav-link">Contact</a>
      </div>

    </div><!-- /nav-links -->

    <!-- Right actions -->
    <div class="nav-actions">
      <a href="tel:+919876543210" class="nav-phone" aria-label="Call us">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.61a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .88h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15.42z"/></svg>
        ${ph}
      </a>
      <div class="nav-divider"></div>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme" title="Switch theme">
        <span class="tt-sun">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </span>
        <span class="tt-moon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </span>
      </button>
      <a href="${root}contact.html" class="nav-cta">Get Free Quote</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div><!-- /navbar-inner -->
</nav>

<!-- Overlay -->
<div class="nav-overlay" id="nav-overlay"></div>

<!-- Mobile Drawer -->
<div class="m-drawer" id="m-drawer">
  <div class="m-drawer-head">
    <a href="${root}index.html" class="nav-logo">
      <div class="nav-logo-mark">L</div>
      <div class="nav-logo-text"><span class="nav-logo-name">LUMIX</span><span class="nav-logo-tag">Events · Mumbai</span></div>
    </a>
    <button class="m-drawer-close" id="drawer-close">✕</button>
  </div>
  <div class="m-drawer-body">
    <div class="m-section-lbl">💍 Weddings</div>
    <a href="${root}services/events.html"      class="m-nav-link"><span class="m-ni">📋</span>Wedding Planning</a>
    <a href="${root}services/photography.html" class="m-nav-link"><span class="m-ni">📷</span>Wedding Photography</a>
    <a href="${root}services/dj.html"          class="m-nav-link"><span class="m-ni">🎧</span>Sangeet & Reception DJ</a>
    <a href="${root}services/rentals.html"     class="m-nav-link"><span class="m-ni">🏮</span>Décor & Equipment</a>

    <div class="m-section-lbl">📷 Photography & Film</div>
    <a href="${root}services/photography.html" class="m-nav-link"><span class="m-ni">🎬</span>Cinematic Films</a>
    <a href="${root}services/photography.html" class="m-nav-link"><span class="m-ni">🚁</span>Drone Aerials</a>
    <a href="${root}services/photography.html" class="m-nav-link"><span class="m-ni">📸</span>Candid Coverage</a>

    <div class="m-section-lbl">🎉 Events & DJ</div>
    <a href="${root}services/dj.html"          class="m-nav-link"><span class="m-ni">🎧</span>DJ Services</a>
    <a href="${root}services/events.html"      class="m-nav-link"><span class="m-ni">🏢</span>Corporate Events</a>
    <a href="${root}services/events.html"      class="m-nav-link"><span class="m-ni">🎂</span>Birthday Parties</a>
    <a href="${root}services/rentals.html"     class="m-nav-link"><span class="m-ni">🔊</span>Equipment Rentals</a>

    <div class="m-section-lbl">Explore</div>
    <a href="${root}gallery.html"              class="m-nav-link"><span class="m-ni">🖼️</span>Portfolio Gallery</a>
    <a href="${root}contact.html"              class="m-nav-link"><span class="m-ni">📞</span>Contact Us</a>

    <div class="m-drawer-actions">
      <a href="${root}contact.html" class="btn btn-gold btn-lg" style="justify-content:center">Get a Free Quote →</a>
      <a href="${wa}"               class="btn btn-ghost btn-lg" style="justify-content:center" target="_blank">💬 WhatsApp Us</a>
    </div>
  </div>
</div>
    `;
  },

  /* ── Inject navbar ──────────────────────────────────── */
  injectNavbar()      { this._inject('navbar-placeholder', this._nav('')); },
  injectNavbarInner() { this._inject('navbar-placeholder', this._nav('../')); },
  _inject(id, html) {
    const ph = document.getElementById(id);
    if (!ph) return;
    const d = document.createElement('div');
    d.innerHTML = html;
    ph.replaceWith(...d.childNodes);
    this._bindNav();
  },

  /* ── Navbar behaviour ───────────────────────────────── */
  _bindNav() {
    const overlay = document.getElementById('nav-overlay');
    let open = null;

    const closeAll = () => {
      document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
      overlay?.classList.remove('show');
      open = null;
    };

    document.querySelectorAll('.nav-trigger').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const item = trigger.closest('.nav-item');
        const wasOpen = item.classList.contains('open');
        closeAll();
        if (!wasOpen) { item.classList.add('open'); open = item; overlay?.classList.add('show'); }
      });
    });

    document.addEventListener('click', closeAll);
    overlay?.addEventListener('click', closeAll);

    // Mobile
    const burger = document.getElementById('hamburger');
    const drawer = document.getElementById('m-drawer');
    const dClose = document.getElementById('drawer-close');
    burger?.addEventListener('click', () => { drawer?.classList.add('open'); burger.classList.add('open'); document.body.style.overflow = 'hidden'; });
    const closeDr = () => { drawer?.classList.remove('open'); burger?.classList.remove('open'); document.body.style.overflow = ''; };
    dClose?.addEventListener('click', closeDr);

    // Scroll
    window.addEventListener('scroll', () => {
      document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 20);
    }, { passive:true });

    // Topbar close
    document.getElementById('topbar-close')?.addEventListener('click', () => document.getElementById('topbar')?.remove());

    // Active link
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .m-nav-link').forEach(a => {
      const href = (a.getAttribute('href')||'').split('/').pop();
      if (href === page) a.classList.add('active');
    });

    // Escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeAll(); closeDr(); } });

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      LUMIX.toggleTheme();
    });
  },

  /* ── Footer ─────────────────────────────────────────── */
  injectFooter(root = '') {
    const ph = document.getElementById('footer-placeholder');
    if (!ph) return;
    const d = window.LUMIX_DATA?.meta || {};
    const yr = new Date().getFullYear();
    ph.outerHTML = `<footer>
  <div class="container">
    <div class="footer-top">
      <div class="ft-brand">
        <div class="ft-logo">
          <div class="ft-logo-mark">L</div>
          <span class="ft-logo-name">LUMIX</span>
        </div>
        <p class="ft-tagline">Mumbai's premium destination for DJ services, cinematic photography, flawless event management and professional equipment rentals.</p>
        <div class="ft-socials">
          <a href="${d.instagram||'#'}" class="ft-soc" aria-label="Instagram">📸</a>
          <a href="${d.facebook||'#'}"  class="ft-soc" aria-label="Facebook">📘</a>
          <a href="${d.youtube||'#'}"   class="ft-soc" aria-label="YouTube">▶️</a>
          <a href="${d.whatsapp||'#'}"  class="ft-soc" aria-label="WhatsApp" target="_blank">💬</a>
        </div>
      </div>
      <div class="ft-col">
        <h4>Weddings</h4>
        <ul>
          <li><a href="${root}services/events.html">Wedding Planning</a></li>
          <li><a href="${root}services/photography.html">Wedding Photography</a></li>
          <li><a href="${root}services/dj.html">Sangeet & Reception DJ</a></li>
          <li><a href="${root}services/rentals.html">Décor & Equipment</a></li>
          <li><a href="${root}contact.html?service=Wedding">Get Wedding Quote</a></li>
        </ul>
      </div>
      <div class="ft-col">
        <h4>Services</h4>
        <ul>
          <li><a href="${root}services/photography.html">Photography & Film</a></li>
          <li><a href="${root}services/dj.html">DJ Services</a></li>
          <li><a href="${root}services/events.html">Corporate Events</a></li>
          <li><a href="${root}services/events.html">Birthday Parties</a></li>
          <li><a href="${root}services/rentals.html">Equipment Rentals</a></li>
        </ul>
      </div>
      <div class="ft-col">
        <h4>Contact</h4>
        <ul>
          <li class="ft-contact-row"><span class="ft-contact-icon">📞</span><span>${d.phone||'+91 98765 43210'}</span></li>
          <li class="ft-contact-row"><span class="ft-contact-icon">✉️</span><span>${d.email||'hello@lumixevents.in'}</span></li>
          <li class="ft-contact-row"><span class="ft-contact-icon">📍</span><span>${d.address||'Andheri, Mumbai 400072'}</span></li>
          <li class="ft-contact-row"><span class="ft-contact-icon">⏰</span><span>7 Days · 9am–10pm IST</span></li>
          <li><a href="${root}gallery.html" style="color:var(--gold);font-weight:600">Browse Gallery →</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;width:100%">
      <span class="ft-copy">© ${yr} LUMIX Events. All rights reserved.</span>
      <div class="ft-legal"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
    </div>
  </div>
</footer>`;
  },

  /* ── Theme system ───────────────────────────────────── */
  initTheme() {
    // Dark is default; respect saved preference
    const saved = localStorage.getItem('lumix-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  },
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('lumix-theme', next);
  },

  /* ── Testimonials ───────────────────────────────────── */
  renderTestimonials(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = (window.LUMIX_DATA?.testimonials || []).map(t => `
      <div class="testi-card reveal">
        <div class="testi-stars">${'★'.repeat(t.stars)}</div>
        <p class="testi-quote">"${t.quote}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.initials}</div>
          <div><div class="testi-name">${t.name}</div><div class="testi-role">${t.role}</div></div>
        </div>
      </div>`).join('');
    window.LUMIX_REVEAL?.observe(el);
  },
};
