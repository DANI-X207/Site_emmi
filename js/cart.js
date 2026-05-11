// ===========================
// SLJ Otaku Paradise - Cart Logic
// ===========================

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('slj_cart')) || [];
    this.renderCount();
  }

  getProducts() {
    return (typeof db !== 'undefined' && db.products) ? db.products : products;
  }

  save() {
    localStorage.setItem('slj_cart', JSON.stringify(this.items));
    this.renderCount();
  }

  add(productId) {
    const sourceProducts = this.getProducts();
    const product = sourceProducts.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ id: productId, qty: 1 });
    }
    this.save();
    this.showNotification(product.name);
    this.renderSidebar();
  }

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    this.renderSidebar();
  }

  updateQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.save();
    this.renderSidebar();
  }

  clear() {
    this.items = [];
    this.save();
    this.renderSidebar();
  }

  getTotal() {
    const sourceProducts = this.getProducts();
    return this.items.reduce((sum, item) => {
      const p = sourceProducts.find(pr => pr.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  renderCount() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  showNotification(name) {
    let notif = document.getElementById('cart-notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'cart-notif';
      document.body.appendChild(notif);
    }
    notif.innerHTML = `<span>🛒</span> <strong>${name}</strong> ajouté au panier !`;
    notif.classList.add('show');
    clearTimeout(this._notifTimer);
    this._notifTimer = setTimeout(() => notif.classList.remove('show'), 3000);
  }

  renderSidebar() {
    const body = document.getElementById('cart-body');
    const totalEl = document.getElementById('cart-total');
    if (!body) return;

    if (this.items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Votre panier est vide</p>
          <small>Découvrez nos produits otaku !</small>
        </div>`;
      if (totalEl) totalEl.textContent = '0.00 FCFA';
      return;
    }

    const sourceProducts = this.getProducts();
    body.innerHTML = this.items.map(item => {
      const p = sourceProducts.find(pr => pr.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-item" data-id="${p.id}">
          <div class="cart-item-img">
            <img src="${getProductImage(p)}" alt="${p.name}" onerror="this.src='images/logo.png'">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-anime">${p.anime}</div>
            <div class="cart-item-price">${(p.price * item.qty).toFixed(2)} FCFA</div>
            <div class="cart-item-controls">
              <button onclick="cart.updateQty(${p.id}, -1)" class="qty-btn">−</button>
              <span class="qty-val">${item.qty}</span>
              <button onclick="cart.updateQty(${p.id}, 1)" class="qty-btn">+</button>
              <button onclick="cart.remove(${p.id})" class="remove-btn">🗑️</button>
            </div>
          </div>
        </div>`;
    }).join('');

    if (totalEl) totalEl.textContent = this.getTotal().toFixed(2) + ' FCFA';
  }

  openSidebar() {
    this.renderSidebar();
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  checkout() {
    if (this.items.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    window.location.href = 'panier.html';
  }
}

const cart = new Cart();
