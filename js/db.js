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
  products: JSON.parse(localStorage.getItem('slj_products')) || [...products],

  // --- Announcements / Ads ---
  announcements: JSON.parse(localStorage.getItem('slj_announcements')) || [
    { id: 1, type: "banner", title: "🔥 Soldes Printemps 2026", content: "Jusqu'à -40% sur les figurines sélectionnées !", active: true, color: "#ff6b00", createdAt: "2026-05-01" },
    { id: 2, type: "promo",  title: "Livraison Gratuite",       content: "Livraison offerte dès 60 FCFA d'achat.",                 active: true, color: "#ff6b00", createdAt: "2026-05-02" }
  ],

  // --- Hero Slides (Banners) ---
  heroSlides: JSON.parse(localStorage.getItem('slj_hero_slides')) || [
    { id: 1, badge: "🔥 Nouveautés Printemps 2026", title: "L'Univers Otaku à <span class='highlight'>Portée de Main</span>", subtitle: "Figurines, Vêtements & Accessoires — Tout ce que le vrai otaku désire", cta: "Explorer la boutique", ctaLink: "shop.html", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop", active: true },
    { id: 2, badge: "⚡ Offres Exclusives", title: "Jusqu'à <span class='highlight'>-30%</span> sur les Figurines", subtitle: "Profitez de nos promotions limitées sur les meilleures figurines anime du moment", cta: "Voir les promos", ctaLink: "shop.html", image: "https://images.unsplash.com/photo-1601814933824-fd0b5c98d4ec?q=80&w=800&auto=format&fit=crop", active: true }
  ],

  // --- Admin Notifications ---
  adminNotifications: JSON.parse(localStorage.getItem('slj_admin_notifications')) || [],

  // --- Promotional Ads (Small cards) ---
  ads: JSON.parse(localStorage.getItem('slj_ads')) || [
    { id: 1, title: 'Nouveautés', subtitle: 'Collection Printemps', color: '#00d2ff', bg: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600', active: true }
  ],

  // --- Customers ---
  customers: JSON.parse(localStorage.getItem('slj_customers')) || [
    { id: 1, username: "admin", password: "password123", email: "admin@otaku-paradise.com", phone: "+33 6 00 00 00 00", city: "Paris",  role: "admin",    active: true, createdAt: "2026-05-01" },
    { id: 2, username: "user1", password: "password123", email: "user1@gmail.com",          phone: "+33 6 11 22 33 44", city: "Lyon",   role: "customer", active: true, createdAt: "2026-05-04" }
  ],

  // --- Testimonials ---
  testimonials: JSON.parse(localStorage.getItem('slj_testimonials')) || [
    { id: 1, name: "Yuki S.", role: "Collectionneur", text: "Meilleure boutique pour les figurines ! La qualité est incroyable.", avatar: "👤", rating: 5 },
    { id: 2, name: "Marc D.", role: "Fan d'Anime", text: "Livraison super rapide et emballage très soigné. Je recommande !", avatar: "👤", rating: 5 },
    { id: 3, name: "Sora K.", role: "Cosplayer", text: "Les accessoires sont d'un réalisme bluffant. Parfait pour mes conventions.", avatar: "👤", rating: 4 },
    { id: 4, name: "Elena R.", role: "Otaku", text: "Une sélection de posters magnifiques. Mon salon ressemble enfin à mon sanctuaire.", avatar: "👤", rating: 5 },
    { id: 5, name: "Kira M.", role: "Dragon Ball Fan", text: "Livraison ultra rapide, qualité de la figurine Goku incroyable !", avatar: "👤", rating: 5 },
    { id: 6, name: "Sasha L.", role: "Naruto Fan", text: "Le hoodie Dragon Ball est parfait. La qualité est top.", avatar: "👤", rating: 5 }
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
    localStorage.setItem('slj_testimonials',  JSON.stringify(this.testimonials));
    localStorage.setItem('slj_hero_slides',   JSON.stringify(this.heroSlides));
    localStorage.setItem('slj_ads',           JSON.stringify(this.ads));
    localStorage.setItem('slj_admin_notifications', JSON.stringify(this.adminNotifications));
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

    // Add admin notification
    this.adminNotifications.unshift({
      id: Date.now(),
      type: 'user_signup',
      message: `Nouvel utilisateur inscrit : "${user.username}".`,
      date: new Date().toLocaleString(),
      read: false
    });

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

  updateUserProfile(userId, data) {
    const idx = this.customers.findIndex(c => c.id === userId);
    if (idx === -1) return false;
    const oldUser = { ...this.customers[idx] };
    this.customers[idx] = { ...this.customers[idx], ...data };
    
    // 1. Update orders linked to this user
    this.orders.forEach(o => {
      if (o.userId === userId) {
        o.email = data.email || o.email;
        o.phone = data.phone || o.phone;
        o.city  = data.city  || o.city;
      }
    });

    // 2. Add admin notification
    this.adminNotifications.unshift({
      id: Date.now(),
      type: 'user_update',
      message: `L'utilisateur "${oldUser.username}" a mis à jour son profil.`,
      date: new Date().toLocaleString(),
      read: false
    });

    // Update current session
    const loggedUser = this.getLoggedUser();
    if (loggedUser && loggedUser.id === userId) {
      localStorage.setItem('slj_logged_user', JSON.stringify(this.customers[idx]));
    }
    
    this.save();
    return true;
  },

  // ========================
  // --- Order Methods ---
  // ========================

  addOrder(order) {
    // Robust ID generation
    const lastNum = this.orders.length > 0 ? parseInt(this.orders[this.orders.length-1].id.split('-')[1]) : 1000;
    order.id              = "ORD-" + (lastNum + 1);
    order.date            = new Date().toISOString().split('T')[0];
    order.createdAt       = Date.now();
    order.status          = "en_attente";
    order.cancelRequested = false;
    order.cancelRequestedAt = null;
    order.userConfirmedReceipt = false;
    order.stockDecremented = false;

    this.orders.push(order);

    // 2. Add admin notification
    this.adminNotifications.unshift({
      id: Date.now(),
      type: 'order_placed',
      message: `Nouvelle commande ${order.id} de ${order.username} (${order.total} FCFA).`,
      date: new Date().toLocaleString(),
      read: false
    });

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

  confirmOrderReceipt(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'livree' || order.userConfirmedReceipt) return false;
    
    order.userConfirmedReceipt = true;
    
    // Check if we should decrement stock
    if (order.status === 'livree' && order.userConfirmedReceipt && !order.stockDecremented) {
        this.decrementStockForOrder(order);
    }
    
    this.save();
    return true;
  },

  decrementStockForOrder(order) {
    if (order.stockDecremented) return;
    
    order.items.forEach(item => {
        const product = this.products.find(p => p.id === item.productId);
        if (product) {
            product.stock = Math.max(0, (product.stock || 0) - item.qty);
        }
    });
    order.stockDecremented = true;
  },

  // Override updateOrderStatus to check for stock decrement too
  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) { 
        order.status = newStatus; 
        if (order.status === 'livree' && order.userConfirmedReceipt && !order.stockDecremented) {
            this.decrementStockForOrder(order);
        }
        this.save(); 
        return true; 
    }
    return false;
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

  // Hero Slides
  addHeroSlide(slide) {
    slide.id = Date.now(); slide.active = true;
    this.heroSlides.push(slide); this.save(); return slide;
  },
  updateHeroSlide(id, data) {
    const ann = this.heroSlides.find(a => a.id === id);
    if (ann) { Object.assign(ann, data); this.save(); return true; } return false;
  },
  toggleHeroSlide(id) {
    const ann = this.heroSlides.find(a => a.id === id);
    if (ann) { ann.active = !ann.active; this.save(); return ann.active; } return false;
  },
  deleteHeroSlide(id) {
    const idx = this.heroSlides.findIndex(a => a.id === id);
    if (idx > -1) { this.heroSlides.splice(idx, 1); this.save(); return true; } return false;
  },

  // Promo Ads
  addAd(ad) {
    ad.id = Date.now(); ad.active = true;
    this.ads.push(ad); this.save(); return ad;
  },
  updateAd(id, data) {
    const ann = this.ads.find(a => a.id === id);
    if (ann) { Object.assign(ann, data); this.save(); return true; } return false;
  },
  toggleAd(id) {
    const ann = this.ads.find(a => a.id === id);
    if (ann) { ann.active = !ann.active; this.save(); return ann.active; } return false;
  },
  deleteAd(id) {
    const idx = this.ads.findIndex(a => a.id === id);
    if (idx > -1) { this.ads.splice(idx, 1); this.save(); return true; } return false;
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
  addProductComment(productId, text, rating) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return false;
    if (!p.comments) p.comments = [];
    p.comments.push({
      id: Date.now(),
      user: this.getLoggedUser()?.username || 'Anonyme',
      text: text,
      rating: parseInt(rating) || 5,
      date: new Date().toLocaleDateString('fr-FR')
    });
    if (p.comments.length > 3) p.comments.shift();
    this.save();
    return true;
  },

  getProductRatingInfo(productId) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return { average: 0, count: 0 };
    
    // Use hardcoded base ratings + dynamic comments
    const baseRating = p.rating || 5;
    const baseReviews = p.reviews || 0;
    
    const comments = p.comments || [];
    if (comments.length === 0) return { average: baseRating, count: baseReviews };
    
    const sum = (baseRating * baseReviews) + comments.reduce((s, c) => s + c.rating, 0);
    const totalCount = baseReviews + comments.length;
    
    return {
      average: parseFloat((sum / totalCount).toFixed(1)),
      count: totalCount
    };
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
    // Exclude cancelled orders from revenue
    const activeOrders  = this.orders.filter(o => o.status !== 'annulee' && !o.cancelRequested);
    const totalRevenue  = activeOrders.reduce((s, o) => s + (o.total || 0), 0);
    const pending       = this.orders.filter(o => o.status === 'en_attente' && !o.cancelRequested).length;
    const delivered     = this.orders.filter(o => o.status === 'livree').length;
    const cancelPending = this.orders.filter(o => o.cancelRequested && (Date.now() - o.cancelRequestedAt) >= 2 * 60 * 1000).length;
    return {
      totalRevenue: Math.round(totalRevenue),
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
