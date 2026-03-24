/* ============================================================
   LUMIX — Rentals Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  new Navbar();
  Modal.getInstance();

  const data      = window.LUMIX_DATA?.rentalItems || [];
  const container = document.getElementById('rentals-grid');
  let activeCat   = 'All';

  /* ---- Category filter -------------------------------- */
  const categories = ['All', ...new Set(data.map(i => i.category))];
  new Filter({
    container: '#rentals-filter',
    categories,
    onFilter: (cat) => { activeCat = cat; render(); },
  });

  /* ---- Render ----------------------------------------- */
  function render() {
    const items = Filter.filterItems(data, activeCat);
    Card.renderMany(items, container, {
      variant: 'rental',
      onClick: (item) => Modal.open(item),
    });
  }

  render();
  LUMIX.renderTestimonials('#rentals-testimonials');
});
