/* ============================================================
   LUMIX — Events Services Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbarInner();
  LUMIX.injectFooter('../');
  new Navbar();
  Modal.getInstance();

  const data      = window.LUMIX_DATA?.eventServices || [];
  const container = document.getElementById('events-grid');
  let   activeCat = 'All';

  /* ---- Filter by event type ----------------------- */
  const categories = ['All', ...new Set(data.map(i => i.name))];
  new Filter({
    container: '#events-filter',
    categories: ['All', 'Wedding', 'Corporate', 'Private Party', 'Concert'],
    onFilter: (cat) => {
      activeCat = cat;
      render();
    },
  });

  function render() {
    let items = data;
    if (activeCat !== 'All') {
      // Match by name partial or category
      items = data.filter(i =>
        i.name.toLowerCase().includes(activeCat.toLowerCase()) ||
        i.id.toLowerCase().includes(activeCat.toLowerCase().replace(' ', '-'))
      );
      if (!items.length) items = data; // fallback
    }
    Card.renderMany(items, container, {
      variant: 'service',
      onClick: (item) => Modal.open(item),
    });
  }

  render();
  LUMIX.renderTestimonials('#events-testimonials');
});
