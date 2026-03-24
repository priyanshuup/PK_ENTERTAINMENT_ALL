/* ============================================================
   LUMIX — Navbar Component
   Handles: scroll effect, mobile menu toggle, active links
============================================================ */

class Navbar {
  constructor() {
    this.navbar  = document.getElementById('navbar');
    this.burger  = document.getElementById('hamburger');
    this.mobileNav = document.getElementById('mobile-nav');
    this._open = false;
    this._init();
  }

  _init() {
    if (!this.navbar) return;
    // Scroll effect
    window.addEventListener('scroll', () => this._onScroll(), { passive: true });
    this._onScroll();

    // Hamburger toggle
    if (this.burger) {
      this.burger.addEventListener('click', () => this._toggleMenu());
    }

    // Close on mobile link click
    this.mobileNav?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => this._closeMenu());
    });

    // Mark active link
    this._setActiveLink();
  }

  _onScroll() {
    if (window.scrollY > 40) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  _toggleMenu() {
    this._open ? this._closeMenu() : this._openMenu();
  }
  _openMenu() {
    this._open = true;
    this.burger?.classList.add('open');
    this.mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  _closeMenu() {
    this._open = false;
    this.burger?.classList.remove('open');
    this.mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  _setActiveLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === page || (page === 'index.html' && href === '#home')) {
        a.classList.add('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new Navbar());
