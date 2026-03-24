/* ============================================================
   LUMIX — Filter Component
   Renders a filter bar and applies filtering to a list.
   Usage:
     const filter = new Filter({
       container: '#filter-bar',
       categories: ['All', 'DJ', 'Events', ...],
       onFilter: (active) => { ... }
     });
============================================================ */

class Filter {
  /**
   * @param {Object} config
   *   container  {string|Element}  - selector or element for filter bar
   *   categories {string[]}        - filter labels
   *   onFilter   {Function}        - callback(activeCategory)
   *   default    {string}          - default active category (default: 'All')
   */
  constructor(config) {
    this.containerEl = typeof config.container === 'string'
      ? document.querySelector(config.container)
      : config.container;
    this.categories  = config.categories || ['All'];
    this.onFilter    = config.onFilter || (() => {});
    this.active      = config.default || 'All';
    this._render();
  }

  _render() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';
    this.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className  = `filter-btn${cat === this.active ? ' active' : ''}`;
      btn.textContent = cat;
      btn.setAttribute('data-cat', cat);
      btn.addEventListener('click', () => this._setActive(cat, btn));
      this.containerEl.appendChild(btn);
    });
  }

  _setActive(cat, clickedBtn) {
    // Update button states
    this.containerEl.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b === clickedBtn);
    });
    this.active = cat;
    this.onFilter(cat);
  }

  /** Programmatically set active */
  setActive(cat) {
    const btn = this.containerEl.querySelector(`[data-cat="${cat}"]`);
    if (btn) this._setActive(cat, btn);
  }

  /** Add a new category dynamically */
  addCategory(cat) {
    if (!this.categories.includes(cat)) {
      this.categories.push(cat);
      this._render();
    }
  }

  /** Static helper: filter an array by category field */
  static filterItems(items, category, field = 'category') {
    if (!category || category === 'All') return items;
    return items.filter(item => item[field] === category);
  }
}

window.Filter = Filter;
