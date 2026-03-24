/* ============================================================
   LUMIX — Contact Page Script
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  LUMIX.injectNavbar();
  LUMIX.injectFooter('');
  new Navbar();

  const form = document.getElementById('contact-form');
  if (!form) return;

  /* ---- Service type selector ----------------------- */
  document.querySelectorAll('.service-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.service-select-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('service-type-input').value = btn.dataset.service;
    });
  });

  /* ---- Form submit --------------------------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Simulate async submit
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'flex';
      form.reset();
      document.querySelectorAll('.service-select-btn').forEach(b => b.classList.remove('active'));
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1400);
  });

  /* ---- Pre-select service from URL param ----------- */
  const params = new URLSearchParams(window.location.search);
  const svc = params.get('service');
  if (svc) {
    const btn = document.querySelector(`[data-service="${svc}"]`);
    if (btn) btn.click();
  }
});
