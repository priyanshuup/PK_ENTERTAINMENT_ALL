/* ============================================================
   LUMIX — DJ Services Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  new Navbar();
  Modal.getInstance();

  const packages  = window.LUMIX_DATA?.djPackages || [];
  const container = document.getElementById('dj-packages-grid');

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

  LUMIX.renderTestimonials('#dj-testimonials');
});
