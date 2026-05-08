// ===========================
// SLJ Otaku Paradise - Mock Database
// ===========================

const ORDER_STATUS = ['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree'];
const ORDER_STATUS_LABELS = {
  en_attente:     'En attente',
  confirmee:      'Confirmée',
  en_preparation: 'En préparation',
  expediee:       'Expédiée',
  livree:         'Livrée',
  annulee:        'Annulée'
};

const db = {
  // --- Products ---
  products: [...products],

  // --- Announcements / Ads ---
  announcements: JSON.parse(localStorage.getItem('slj_announcements')) || [
    { id: 1, type: "banner", title: "🔥 Soldes Printemps 2026", content: "Jusqu'à -40% sur les figurines sélectionnées !", active: true, color: "#ff6b00", createdAt: "2026-05-01" },
    { id: 2, type: "promo",  title: "Livraison Gratuite",       content: "Livraison offerte dès 60€ d'achat.",                 active: true, color: "#ff6b00", createdAt: "2026-05-02" }
  ],

  // --- Customers ---
  customers: JSON.parse(localStorage.getItem('slj_customers')) || [
    { id: 1, username: "admin", password: "password123", email: "admin@otaku-paradise.com", phone: "+33 6 00 00 00 00", city: "Paris",  role: "admin",    active: true, createdAt: "2026-05-01" },
    { id: 2, username: "user1", password: "password123", email: "user1@gmail.com",          phone: "+33 6 11 22 33 44", city: "Lyon",   role: "customer", active: true, createdAt: "2026-05-04" }
  ],

  // --- Orders ---
  orders: JSON.parse(localStorage.getItem('slj_orders')) || [
    {
      id: "ORD-1001",
      customerId: 2,
      username: "user1",
      items: [{ productId: 1, name: "Figurine Goku Ultra Instinct", qty: 1, price: 49.99, image: "https://i.ebayimg.com/images/g/FqAAAeSwE2Bpvqww/s-l400.webp" }],
      total: 49.99,
      status: "livree",
      createdAt: 1714953600000,
      date: "2026-05-04",
      address: "12 Rue des Manga", city: "Lyon", postalCode: "69001",
      phone: "+33 6 11 22 33 44", email: "user1@gmail.com",
      cancelRequested: false, cancelRequestedAt: null
    },
    {
      id: "ORD-1002",
      customerId: 2,
      username: "user1",
      items: [{ productId: 2, name: "Figurine Tanjiro Kamado", qty: 2, price: 39.99, image: "https://i5.walmartimages.com/seo/Tanjiro-Kamado-Action-Figure-3-63-6-Inch-Demon-Slayer-Anime-Collectible-Figure_0367fc16-0382-41b0-bad8-2a329ffb3dd0.1e9c28a891c7754a20b35b9c688035bd.jpeg?odnHeight=576&odnWidth=576&odnBg=FFFFFF" }],
      total: 79.98,
      status: "en_attente",
      createdAt: 1746000000000,
      date: "2026-05-04",
      address: "12 Rue des Manga", city: "Lyon", postalCode: "69001",
      phone: "+33 6 11 22 33 44", email: "user1@gmail.com",
      cancelRequested: false, cancelRequestedAt: null
    }
  ],

  // ========================
  // --- Core Methods ---
  // ========================
  save() {
    localStorage.setItem('slj_customers',     JSON.stringify(this.customers));
    localStorage.setItem('slj_orders',        JSON.stringify(this.orders));
    localStorage.setItem('slj_products',      JSON.stringify(this.products));
    localStorage.setItem('slj_announcements', JSON.stringify(this.announcements));
  },

  // ========================
  // --- Auth Methods ---
  // ========================
  addCustomer(user) {
    user.id        = Date.now();
    user.role      = "customer";
    user.active    = true;
    user.createdAt = new Date().toISOString().split('T')[0];
    this.customers.push(user);
    this.save();
    return user;
  },

  authenticate(username, password) {
    const user = this.customers.find(c => c.username === username && c.password === password && c.active !== false);
    if (user) {
      localStorage.setItem('slj_logged_user', JSON.stringify(user));
      document.cookie = `slj_session=${user.id}; path=/; max-age=86400`;
      return user;
    }
    return null;
  },

  getLoggedUser() {
    const s = localStorage.getItem('slj_logged_user');
    return s ? JSON.parse(s) : null;
  },

  isLoggedIn() { return this.getLoggedUser() !== null; },

  logout() {
    localStorage.removeItem('slj_logged_user');
    document.cookie = "slj_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  },

  // ========================
  // --- Order Methods ---
  // ========================

  addOrder(order) {
    order.id              = "ORD-" + (1000 + this.orders.length + 1);
    order.date            = new Date().toISOString().split('T')[0];
    order.createdAt       = Date.now();
    order.status          = "en_attente";
    order.cancelRequested = false;
    order.cancelRequestedAt = null;
    this.orders.push(order);
    this.save();
    return order;
  },

  // Returns new status string or false
  advanceOrderStatus(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return false;
    const idx = ORDER_STATUS.indexOf(order.status);
    if (idx === -1 || idx >= ORDER_STATUS.length - 1) return false;
    order.status = ORDER_STATUS[idx + 1];
    this.save();
    return order.status;
  },

  // Legacy compat (admin uses this too)
  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) { order.status = newStatus; this.save(); return true; }
    return false;
  },

  // Customer requests cancellation (only if en_attente)
  requestCancelOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'en_attente' || order.cancelRequested) return false;
    order.cancelRequested    = true;
    order.cancelRequestedAt  = Date.now();
    this.save();
    return true;
  },

  // Customer undoes cancellation within 2 min
  undoCancelOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order || !order.cancelRequested) return false;
    const elapsed = Date.now() - order.cancelRequestedAt;
    if (elapsed >= 2 * 60 * 1000) return false; // too late
    order.cancelRequested    = false;
    order.cancelRequestedAt  = null;
    this.save();
    return true;
  },

  // Admin deletes order (completely remove from DB)
  adminDeleteOrder(orderId) {
    const idx = this.orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;
    this.orders.splice(idx, 1);
    this.save();
    return true;
  },

  // Cancel order (status -> annulee)
  cancelOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return false;
    order.status = 'annulee';
    order.cancelRequested = false;
    order.cancelRequestedAt = null;
    this.save();
    return true;
  },

  getUserOrders(userId) {
    return this.orders.filter(o => o.customerId === userId).sort((a, b) => b.createdAt - a.createdAt);
  },

  // ========================
  // --- User Admin Methods ---
  // ========================
  toggleUserStatus(userId) {
    const user = this.customers.find(c => c.id === userId);
    if (user && user.role !== 'admin') { user.active = !user.active; this.save(); return user.active; }
    return null;
  },

  deleteUser(userId) {
    const idx = this.customers.findIndex(c => c.id === userId);
    if (idx > -1 && this.customers[idx].role !== 'admin') { this.customers.splice(idx, 1); this.save(); return true; }
    return false;
  },

  // ========================
  // --- Announcement Methods ---
  // ========================
  addAnnouncement(ann) {
    ann.id = Date.now(); ann.createdAt = new Date().toISOString().split('T')[0]; ann.active = true;
    this.announcements.push(ann); this.save(); return ann;
  },
  updateAnnouncement(id, data) {
    const ann = this.announcements.find(a => a.id === id);
    if (ann) { Object.assign(ann, data); this.save(); return true; } return false;
  },
  toggleAnnouncement(id) {
    const ann = this.announcements.find(a => a.id === id);
    if (ann) { ann.active = !ann.active; this.save(); return ann.active; } return false;
  },
  deleteAnnouncement(id) {
    const idx = this.announcements.findIndex(a => a.id === id);
    if (idx > -1) { this.announcements.splice(idx, 1); this.save(); return true; } return false;
  },

  // ========================
  // --- Product Admin Methods ---
  // ========================
  addProduct(product) { product.id = Date.now(); this.products.push(product); this.save(); return product; },
  updateProduct(id, data) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx > -1) { this.products[idx] = { ...this.products[idx], ...data }; this.save(); return true; } return false;
  },
  deleteProduct(id) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx > -1) { this.products.splice(idx, 1); this.save(); return true; } return false;
  },

  // ========================
  // --- Stats ---
  // ========================
  // Returns true (valid), 'deactivated', or 'deleted'
  validateSession() {
    const user = this.getLoggedUser();
    if (!user) return true;
    const found = this.customers.find(c => c.id === user.id);
    if (!found) return 'deleted';
    if (found.active === false) return 'deactivated';
    return true;
  },

  getStats() {
    this.customers.forEach(c => { if (c.active === undefined) c.active = true; });
    // Exclude cancelled orders (cancelRequested) from revenue
    const activeOrders  = this.orders.filter(o => !o.cancelRequested);
    const totalRevenue  = activeOrders.reduce((s, o) => s + (o.total || 0), 0);
    const pending       = this.orders.filter(o => o.status === 'en_attente' && !o.cancelRequested).length;
    const delivered     = this.orders.filter(o => o.status === 'livree').length;
    const cancelPending = this.orders.filter(o => o.cancelRequested && (Date.now() - o.cancelRequestedAt) >= 2 * 60 * 1000).length;
    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders: this.orders.length,
      totalCustomers: this.customers.filter(c => c.role !== 'admin').length,
      totalProducts: this.products.length,
      pendingOrders: pending,
      deliveredOrders: delivered,
      cancelPending,
      activeAnnouncements: this.announcements.filter(a => a.active).length
    };
  },

  getUniqueAnimes() {
    const animes = this.products.map(p => p.anime).filter(a => a && a !== 'Multi-Anime');
    return [...new Set(animes)].sort();
  }
};
