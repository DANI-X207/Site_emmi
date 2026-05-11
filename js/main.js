// ===========================
// SLJ Otaku Paradise - Main JS
// ===========================

let currentCategory = 'all';
let currentAnime = 'Tous les anime';
let currentSort = 'default';
let searchQuery = '';
let currentPage = 1;
const PRODUCTS_PER_PAGE = 9;

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Loaded - Starting initialization...");
  
  try {
    const user = typeof db !== 'undefined' ? db.getLoggedUser() : null;
    const adminNav = document.getElementById('nav-admin');
    const adminIcon = document.getElementById('admin-icon');
    if (user && user.role === 'admin') {
      if (adminNav) adminNav.style.display = 'block';
      if (adminIcon) adminIcon.style.display = 'flex';
    }

    // Set active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === currentPath) {
        a.classList.add('active');
      }
    });

    // Run safe inits
    if (typeof buildCategories === 'function') buildCategories();
    if (typeof buildAnimeFilters === 'function') buildAnimeFilters();
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof buildTestimonials === 'function') buildTestimonials();
    if (typeof initParticles === 'function') initParticles();
    if (typeof initCounters === 'function') initCounters();
    if (typeof initScrollEffects === 'function') initScrollEffects();
    if (typeof initSearch === 'function') initSearch();
    if (typeof initNewsletterForm === 'function') initNewsletterForm();
    if (typeof initCheckoutModal === 'function') initCheckoutModal();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initHeroSlider === 'function') initHeroSlider();
    if (typeof initBackToTop === 'function') initBackToTop();
    if (typeof initHourlySelection === 'function') initHourlySelection();
    if (typeof initFeaturedSlider === 'function') initFeaturedSlider();
    
    if (typeof cart !== 'undefined' && typeof cart.renderCount === 'function') cart.renderCount();

    // Session validation — detect if account was disabled/deleted by admin
    if (typeof db !== 'undefined' && typeof db.validateSession === 'function') {
      const sv = db.validateSession();
      if (sv !== true) {
        const msg = sv === 'deleted'
          ? '🚫 Votre compte a été supprimé par l\'administrateur.'
          : '🔒 Votre compte a été désactivé. Contactez l\'administrateur.';
        let toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1a1a1a;border:1px solid rgba(255,51,102,0.4);color:white;padding:16px 28px;border-radius:16px;font-weight:700;z-index:9999;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.6);';
        toast.textContent = msg;
        document.body.appendChild(toast);
        if (typeof db.logout === 'function') db.logout();
        setTimeout(() => window.location.href = 'vitrine.html', 2500);
        return;
      }
      // React instantly if admin changes user status in another tab
      window.addEventListener('storage', (e) => {
        if (e.key === 'slj_customers' && typeof db !== 'undefined') {
          db.customers = JSON.parse(e.newValue || '[]');
          const sv2 = db.validateSession();
          if (sv2 !== true) {
            const msg2 = sv2 === 'deleted'
              ? '🚫 Votre compte a été supprimé par l\'administrateur.'
              : '🔒 Votre compte a été désactivé. Contactez l\'administrateur.';
            let t = document.createElement('div');
            t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1a1a1a;border:1px solid rgba(255,51,102,0.4);color:white;padding:16px 28px;border-radius:16px;font-weight:700;z-index:9999;text-align:center;';
            t.textContent = msg2;
            document.body.appendChild(t);
            db.logout();
            setTimeout(() => window.location.href = 'vitrine.html', 2500);
          }
        }
      });
    }
  } catch (e) {
    console.error("Erreur lors de l'initialisation :", e);
  }
});

/* ---- Hero Slider ---- */
const heroSlides = (typeof db !== 'undefined' && db.heroSlides) ? db.heroSlides.filter(s => s.active) : [
  {
    badge: "🔥 Nouveautés Printemps 2026",
    title: "L'Univers Otaku à <span class='highlight'>Portée de Main</span>",
    subtitle: "Figurines, Vêtements & Accessoires — Tout ce que le vrai otaku désire",
    cta: "Explorer la boutique",
    ctaLink: "shop.html",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop"
  }
];

let currentSlide = 0;
let slideInterval;

function initHeroSlider() {
  const dots = document.querySelectorAll('.hero-dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });
  showSlide(0);
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }, 6000);
}

function showSlide(index) {
  const s = heroSlides[index];
  const badge = document.getElementById('hero-badge');
  const title = document.getElementById('hero-title');
  const subtitle = document.getElementById('hero-subtitle');
  const cta = document.getElementById('hero-cta');
  const heroImg1 = document.getElementById('hero-showcase-1');
  const heroImg2 = document.getElementById('hero-showcase-2');

  const elements = [badge, title, subtitle, cta, heroImg1, heroImg2].filter(el => el);
  elements.forEach(el => el.classList.add('fade-out'));

  setTimeout(() => {
    if (badge) badge.textContent = s.badge;
    if (title) title.innerHTML = s.title;
    if (subtitle) subtitle.textContent = s.subtitle;
    if (cta) { cta.textContent = s.cta; cta.href = s.ctaLink; }

    // Pick 2 random product images
    const allProducts = (typeof db !== 'undefined' && db.products) ? db.products : [];
    if (allProducts.length >= 2) {
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      if (heroImg1) heroImg1.src = getProductImage(shuffled[0]);
      if (heroImg2) heroImg2.src = getProductImage(shuffled[1]);
    }
    
    elements.forEach(el => {
      el.classList.remove('fade-out');
      el.classList.add('fade-in');
    });
    setTimeout(() => elements.forEach(el => el.classList.remove('fade-in')), 600);
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === index));
  }, 400);
  currentSlide = index;
}

function goToSlide(i) {
  clearInterval(slideInterval);
  showSlide(i);
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }, 5000);
}

/* ---- Categories ---- */
function buildCategories() {
  const container = document.getElementById('category-tabs');
  if (!container) return;
  container.innerHTML = categories.map(cat => `
    <button class="cat-tab ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}" onclick="filterByCategory('${cat.id}', this)">
      <span class="cat-icon">${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

function filterByCategory(catId, btn) {
  currentCategory = catId;
  currentPage = 1;
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  renderProducts();
}

/* ---- Anime Filters ---- */
function buildAnimeFilters() {
  const container = document.getElementById('anime-filters');
  if (!container) return;
  container.innerHTML = animeFilters.map(anime => `
    <button class="anime-pill ${anime === 'Tous les anime' ? 'active' : ''}" onclick="filterByAnime('${anime}', this)">
      ${anime}
    </button>
  `).join('');
}

function filterByAnime(anime, btn) {
  currentAnime = anime;
  currentPage = 1;
  document.querySelectorAll('.anime-pill').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  renderProducts();
}

/* ---- Search ---- */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    currentPage = 1;
    renderProducts();
  });
  const clearBtn = document.getElementById('search-clear');
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    renderProducts();
  });
}

/* ---- Sort ---- */
function setSort(val) {
  currentSort = val;
  currentPage = 1;
  renderProducts();
}

/* ---- Filter + Render Products ---- */
function getFilteredProducts() {
  const sourceProducts = (typeof db !== 'undefined' && db.products) ? db.products : products;
  let filtered = [...sourceProducts];

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (currentAnime !== 'Tous les anime') {
    filtered = filtered.filter(p => p.anime.toLowerCase().includes(currentAnime.toLowerCase().replace('dragon ball', 'dragon ball')));
  }

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.anime.toLowerCase().includes(searchQuery) ||
      p.tags.some(t => t.includes(searchQuery))
    );
  }

  switch (currentSort) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filtered.sort((a, b) => (b.badge === 'Nouveau' ? 1 : 0) - (a.badge === 'Nouveau' ? 1 : 0)); break;
  }

  return filtered;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('product-count');
  const paginationEl = document.getElementById('pagination');
  if (!grid) return;

  const filtered = getFilteredProducts();
  const total = filtered.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  if (countEl) countEl.textContent = `${total} produit${total > 1 ? 's' : ''} trouvé${total > 1 ? 's' : ''}`;

  if (total === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Aucun produit trouvé</h3>
        <p>Essayez d'autres filtres ou termes de recherche</p>
        <button class="btn-primary" onclick="resetFilters()">Réinitialiser les filtres</button>
      </div>`;
    if (paginationEl) paginationEl.innerHTML = '';
    return;
  }

  grid.innerHTML = pageItems.map(p => productCard(p)).join('');

  // Animate cards
  setTimeout(() => {
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 0.05}s`;
      card.classList.add('animate-in');
    });
  }, 10);

  // Pagination
  if (paginationEl) renderPagination(paginationEl, totalPages);
}

function getProductImage(p) {
  if (!p || !p.image || p.image.trim() === '' || p.image.includes('placeholder.png')) {
    // Dynamic placeholder based on category and name for a premium look
    return `https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=400&auto=format&fit=crop`; 
  }
  return p.image;
}

function productCard(p) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
  const ratingInfo = db.getProductRatingInfo(p.id);
  const stars = renderStars(ratingInfo.average);
  const img = getProductImage(p);

  return `
    <div class="product-card" onclick="openProductModal(${p.id})">
      <div class="product-img-wrap">
        <div class="product-img-overlay"></div>
        <img src="${img}" alt="${p.name}" loading="lazy" class="main-img">
        ${p.stock <= 0 ? '<div class="out-of-stock-overlay"><span>Stock Épuisé</span></div>' : ''}
        
        <div class="card-quick-actions">
           <button class="quick-action-btn" onclick="event.stopPropagation(); cart.add(${p.id})" title="Ajouter au panier">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
           </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-anime">${p.anime}</span>
          <span class="product-category-tag">${p.category}</span>
        </div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-footer">
          <div class="price-box">
            <span class="product-price">${Math.round(p.price)} FCFA</span>
            ${p.oldPrice ? `<span class="product-old-price">${Math.round(p.oldPrice)} FCFA</span>` : ''}
          </div>
          <div class="rating-box">
             ${stars}
          </div>
        </div>
      </div>
    </div>`;
}

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<span class="star full">★</span>';
    else if (i - 0.5 <= rating) html += '<span class="star half">★</span>';
    else html += '<span class="star empty">☆</span>';
  }
  return html;
}

function renderPagination(el, totalPages) {
  if (totalPages <= 1) { el.innerHTML = ''; return; }
  let html = '';
  if (currentPage > 1) html += `<button class="page-btn" onclick="goPage(${currentPage - 1})">‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }
  if (currentPage < totalPages) html += `<button class="page-btn" onclick="goPage(${currentPage + 1})">›</button>`;
  el.innerHTML = html;
}

function goPage(n) {
  currentPage = n;
  renderProducts();
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
}

function resetFilters() {
  currentCategory = 'all';
  currentAnime = 'Tous les anime';
  currentSort = 'default';
  searchQuery = '';
  currentPage = 1;
  document.getElementById('search-input').value = '';
  document.querySelectorAll('.cat-tab').forEach((b, i) => b.classList.toggle('active', i === 0));
  document.querySelectorAll('.anime-pill').forEach((b, i) => b.classList.toggle('active', i === 0));
  document.getElementById('sort-select').value = 'default';
  renderProducts();
}

/* ---- Wishlist ---- */
let wishlist = JSON.parse(localStorage.getItem('slj_wishlist')) || [];

function toggleWishlist(id, btn) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    btn.textContent = '♡';
    btn.classList.remove('active');
  } else {
    wishlist.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
  }
  localStorage.setItem('slj_wishlist', JSON.stringify(wishlist));
}

/* ---- Product Modal ---- */
function openProductModal(id) {
  const sourceProducts = (typeof db !== 'undefined' && db.products) ? db.products : products;
  const p = sourceProducts.find(pr => pr.id === id);
  if (!p) return;
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  const img = getProductImage(p);
  const ratingInfo = db.getProductRatingInfo(p.id);

  content.innerHTML = `
    <div class="modal-product-layout">
      <div class="modal-product-gallery">
        <img src="${img}" alt="${p.name}" class="modal-main-img">
        ${p.stock <= 0 ? '<div class="out-of-stock-overlay"><span>Stock Épuisé</span></div>' : ''}
      </div>
      <div class="modal-product-info">
        <div class="modal-meta-row">
          <span class="modal-anime-tag">${p.anime}</span>
          <span class="modal-category-tag">${p.category}</span>
        </div>
        <h2 class="modal-title">${p.name}</h2>
        <div class="modal-rating-row">
          <div class="stars">${renderStars(ratingInfo.average)}</div>
          <span class="modal-reviews-text">${ratingInfo.average}/5 — ${ratingInfo.count} avis clients</span>
        </div>
        
        <div class="modal-price-section">
          <span class="modal-current-price">${Math.round(p.price)} FCFA</span>
          ${p.oldPrice ? `<span class="modal-old-price">${Math.round(p.oldPrice)} FCFA</span>` : ''}
        </div>

        <p class="modal-description">${p.description || 'Un article incontournable pour tout collectionneur otaku. Qualité premium garantie.'}</p>
        
        <div class="modal-stock-status ${p.stock > 0 ? 'in' : 'out'}">
          ${p.stock > 0 ? `<span>●</span> En stock (${p.stock} unités)` : '<span>●</span> Stock Épuisé'}
        </div>

        <div class="modal-purchase-controls">
          <div class="qty-selector">
            <button class="qty-ctrl" id="modal-qty-minus">−</button>
            <span id="modal-qty" class="qty-val">1</span>
            <button class="qty-ctrl" id="modal-qty-plus">+</button>
          </div>
          <button class="btn-add-to-cart ${p.stock <= 0 ? 'disabled' : ''}" 
            onclick="${p.stock > 0 ? `addModalToCart(${p.id})` : ''}" 
            ${p.stock <= 0 ? 'disabled' : ''}>
            ${p.stock > 0 ? 'AJOUTER AU PANIER' : 'INDISPONIBLE'}
          </button>
        </div>

        <div class="modal-tags-list">
          ${(p.tags || []).map(t => `<span class="modal-tag">#${t}</span>`).join('')}
        </div>

        <div class="modal-comments-section">
          <h3>COMMENTAIRES (${(p.comments || []).length}/3)</h3>
          <div class="modal-comments-list" id="modal-comments-list">
            ${(p.comments || []).length > 0 
              ? p.comments.map(c => `
                <div class="modal-comment-item">
                  <div class="comment-header">
                    <div class="comment-user">${c.user}</div>
                    <div class="comment-stars">${renderStars(c.rating)}</div>
                    <div class="comment-date">${c.date}</div>
                  </div>
                  <div class="comment-text">${c.text}</div>
                </div>`).join('')
              : '<p class="no-comments" style="text-align:center; padding:20px; color:var(--gray); font-style:italic;">Soyez le premier à commenter !</p>'
            }
          </div>
          <div class="modal-comment-form">
            <div class="rating-picker" id="comment-rating-picker">
              <span onclick="setCommentRating(1)" class="active">★</span>
              <span onclick="setCommentRating(2)" class="active">★</span>
              <span onclick="setCommentRating(3)" class="active">★</span>
              <span onclick="setCommentRating(4)" class="active">★</span>
              <span onclick="setCommentRating(5)" class="active">★</span>
            </div>
            <div class="comment-input-row">
              <input type="text" id="new-comment-input" placeholder="Ajouter un commentaire..." maxlength="100">
              <button onclick="submitProductComment(${p.id})">Poster</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  let qty = 1;
  document.getElementById('modal-qty-minus')?.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    document.getElementById('modal-qty').textContent = qty;
  });
  document.getElementById('modal-qty-plus')?.addEventListener('click', () => {
    if (qty >= p.stock) {
        alert("Stock maximum atteint.");
        return;
    }
    qty++;
    document.getElementById('modal-qty').textContent = qty;
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function addModalToCart(id) {
  const qty = parseInt(document.getElementById('modal-qty')?.textContent || '1');
  const sourceProducts = (typeof db !== 'undefined' && db.products) ? db.products : products;
  const p = sourceProducts.find(x => x.id === id);
  
  if (p && qty > p.stock) {
      alert("Stock insuffisant.");
      return;
  }
  
  // Add to cart items
  const existing = cart.items.find(i => i.id === id);
  if (existing) {
      if (existing.qty + qty > p.stock) {
          alert("Vous avez déjà atteint la limite de stock dans votre panier.");
          return;
      }
      existing.qty += qty;
  } else {
      cart.items.push({ id: id, qty: qty });
  }
  
  cart.save();
  closeModal('product-modal');
  cart.openSidebar();
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Testimonials ---- */
function buildTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;
  
  // Show up to 6 testimonials for a better grid rendering
  const evenTestimonials = db.testimonials.slice(0, 6);
  
  container.innerHTML = evenTestimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <div class="testimonial-avatar">${t.avatar}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.anime}</div>
        </div>
        <div class="testimonial-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-date">${t.date}</div>
    </div>`).join('');
}

/* ---- Counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString('fr-FR') + suffix;
  }, 16);
}

/* ---- Scroll Effects ---- */
function initScrollEffects() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05 });

  const targets = document.querySelectorAll('.fade-up, .section-title, .feature-card, .testimonial-card, .product-card, .profile-card, .trending-card, .glass-card');
  targets.forEach(el => {
    observer.observe(el);
    // Force visibility if already in view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });

  // Sticky navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* ---- Particles ---- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const symbols = ['✦', '⭐', '🌸', '⚡', '🔥', '✨', '龍', '力'];

  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 16 + 8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.05,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px Arial`;
      ctx.fillStyle = '#ff6b00';
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.restore();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---- Newsletter ---- */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const msg = document.getElementById('newsletter-msg');
    if (msg) {
      msg.textContent = `✅ Merci ! ${email} est bien inscrit à notre newsletter.`;
      msg.style.color = '#00b386';
    }
    form.reset();
  });
}

/* ---- Checkout Modal ---- */
function initCheckoutModal() {
  const form = document.getElementById('checkout-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('checkout-msg');
    if (msg) {
      msg.innerHTML = `<div class="success-order"><div class="success-icon">🎉</div><h3>Commande confirmée !</h3><p>Merci pour votre commande. Un email de confirmation vous sera envoyé.</p></div>`;
    }
    cart.clear();
    setTimeout(() => closeModal('checkout-modal'), 4000);
  });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('nav-links');
  burger?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    burger.classList.toggle('active');
  });
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      burger?.classList.remove('active');
    });
  });
}

/* ---- Back to Top ---- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn?.classList.toggle('show', window.scrollY > 400);
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Global close on overlay click ---- */
document.addEventListener('click', e => {
  if (e.target.id === 'cart-overlay') cart.closeSidebar();
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.closest('.modal-overlay')?.id || '');
  }
});

/* ---- Hourly Selection Logic ---- */
function initHourlySelection() {
  const container = document.getElementById('hourly-products-grid');
  if (!container) return;

  const now = new Date();
  const sourceProducts = (typeof db !== 'undefined' && db.products) ? db.products : products;
  
  const hourSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + now.getHours();
  
  const shuffled = [...sourceProducts].sort((a, b) => {
    const scoreA = Math.sin(a.id * hourSeed) * 10000;
    const scoreB = Math.sin(b.id * hourSeed) * 10000;
    return scoreA - scoreB;
  });

  const selection = shuffled.slice(0, 4); // Show 4 products (even)
  container.innerHTML = selection.map(p => productCard(p)).join('');

  updateTimer();
  setInterval(updateTimer, 1000); 
}

function updateTimer() {
  const timerEl = document.getElementById('timer-val');
  if (!timerEl) return;

  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  
  const diff = nextHour - now;
  
  if (diff <= 0) {
    window.location.reload(); 
    return;
  }

  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  
  timerEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function scrollTrending(dir) {
  const slider = document.querySelector('.trending-slider');
  if (slider) {
    slider.scrollBy({ left: dir * 350, behavior: 'smooth' });
  }
}

function initFeaturedSlider() {
  const track = document.getElementById('featured-track');
  if (!track) return;

  const sourceProducts = (typeof db !== 'undefined' && db.products) ? db.products : products;
  
  const ads = (typeof db !== 'undefined' && db.ads) ? db.ads.filter(a => a.active) : [
    { type: 'ad', title: 'Nouveautés', subtitle: 'Collection Printemps', color: '#00d2ff', bg: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600' }
  ];

  const featuredProducts = sourceProducts.slice(0, 6);
  
  let html = '';
  
  // Mix Ads and Products
  featuredProducts.forEach((p, i) => {
    html += `
      <div class="trending-card" style="--bg: url('${getProductImage(p)}')" onclick="openProductModal(${p.id})">
        <div class="trending-content">
           <span style="background: rgba(0,0,0,0.6); padding: 5px 10px; border-radius: 5px;">VOIR LE PRODUIT</span>
        </div>
      </div>
    `;
    if (i === 1) html += renderAdCard(ads[0]); // Position 3
  });

  track.innerHTML = html;
}

function renderAdCard(ad) {
  return `
    <div class="trending-card ad-card" style="--bg: url('${ad.bg}'); border-color: ${ad.color};">
      <div class="trending-content">
         <span style="color: ${ad.color}; font-weight: 900;">OFFRE</span>
         <h3 style="font-size: 2rem;">${ad.title}</h3>
         <p>${ad.subtitle}</p>
      </div>
    </div>
  `;
}

let currentCommentRating = 5;

function setCommentRating(rating) {
  currentCommentRating = rating;
  const stars = document.querySelectorAll('#comment-rating-picker span');
  stars.forEach((s, idx) => {
    if (idx < rating) s.classList.add('active');
    else s.classList.remove('active');
  });
}

function submitProductComment(productId) {
  const input = document.getElementById('new-comment-input');
  if (!input || !input.value.trim()) return;

  if (db.addProductComment(productId, input.value.trim(), currentCommentRating)) {
    openProductModal(productId); // Refresh modal
    currentCommentRating = 5; // Reset
  }
}
