/**
 * SLJ Otaku Paradise — Brand enhancements (logo + page chrome)
 */
(function () {
  const LOGO_SRC = 'images/logo.png';
  const WORDMARK = {
    primary: 'SLJ',
    secondary: 'OTAKU',
    tagline: 'Paradise',
  };

  const PAGE_TITLES = {
    'shop.html': { title: 'Boutique', sub: 'Figurines, vêtements & accessoires otaku' },
    'panier.html': { title: 'Mon panier', sub: 'Finalisez votre commande' },
    'commandes.html': { title: 'Mes commandes', sub: 'Suivez vos achats en temps réel' },
    'profile.html': { title: 'Mon profil', sub: 'Vos informations personnelles' },
    'parametres.html': { title: 'Paramètres', sub: 'Préférences & personnalisation' },
    'settings.html': { title: 'Réglages', sub: 'Configuration du compte' },
  };

  function createWordmark() {
    const wrap = document.createElement('span');
    wrap.className = 'logo-text';
    wrap.innerHTML =
      `<span class="logo-text-primary">${WORDMARK.primary}</span>` +
      `<span class="logo-text-secondary">${WORDMARK.secondary}</span>` +
      `<span class="logo-text-tagline">${WORDMARK.tagline}</span>`;
    return wrap;
  }

  function enhanceLogo(el) {
    if (!el || el.dataset.brandEnhanced) return;
    const img = el.querySelector('img');
    if (!img) return;

    el.dataset.brandEnhanced = '1';
    el.classList.add('brand-logo');
    img.alt = 'SLJ Otaku Paradise';

    if (!el.querySelector('.logo-mark')) {
      const mark = document.createElement('span');
      mark.className = 'logo-mark';
      img.parentNode.insertBefore(mark, img);
      mark.appendChild(img);
    }

    if (!el.querySelector('.logo-text') && el.tagName === 'A') {
      el.appendChild(createWordmark());
    } else if (!el.querySelector('.logo-text') && el.classList.contains('logo')) {
      el.classList.add('brand-logo-footer');
      el.appendChild(createWordmark());
    }
  }

  function addWatermark() {
    if (document.querySelector('.brand-watermark')) return;
    const wm = document.createElement('div');
    wm.className = 'brand-watermark';
    wm.setAttribute('aria-hidden', 'true');
    document.body.appendChild(wm);
  }

  function addPageStrip() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const meta = PAGE_TITLES[path];
    if (!meta || document.querySelector('.brand-page-strip')) return;
    if (document.querySelector('.hero')) return;

    const nav = document.getElementById('navbar');
    if (!nav) return;

    const strip = document.createElement('section');
    strip.className = 'brand-page-strip';
    strip.innerHTML = `
      <div class="container">
        <img src="${LOGO_SRC}" alt="" class="strip-logo" width="56" height="56">
        <div>
          <h1>${meta.title}</h1>
          <p>${meta.sub}</p>
        </div>
      </div>`;

    nav.insertAdjacentElement('afterend', strip);
    document.body.classList.add('has-brand-strip');

    const firstSection = document.querySelector('.page-header, .section-padding');
    if (firstSection) {
      if (firstSection.classList.contains('page-header')) firstSection.style.marginTop = '0';
      if (firstSection.classList.contains('section-padding') && firstSection.style.marginTop) {
        firstSection.style.marginTop = '0';
      }
    }
  }

  function enhancePageHeaders() {
    document.querySelectorAll('.page-header .container').forEach((container) => {
      if (container.querySelector('.brand-page-header-logo')) return;
      const h1 = container.querySelector('h1');
      if (!h1) return;
      const block = document.createElement('div');
      block.className = 'brand-page-header-logo';
      block.innerHTML = `<img src="${LOGO_SRC}" alt="SLJ Otaku Paradise">`;
      container.insertBefore(block, container.firstChild);
    });
  }

  function addAuthMobileBrand() {
    const panel = document.querySelector('.auth-form-panel .auth-form-inner');
    if (!panel || panel.querySelector('.auth-mobile-brand')) return;
    const block = document.createElement('div');
    block.className = 'auth-mobile-brand';
    block.innerHTML = `
      <img src="${LOGO_SRC}" alt="SLJ Otaku Paradise">
      <div class="logo-text-primary">${WORDMARK.primary}</div>
      <div class="logo-text-secondary">${WORDMARK.secondary} ${WORDMARK.tagline}</div>`;
    panel.insertBefore(block, panel.firstChild);
  }

  function enhanceFooterBottom() {
    document.querySelectorAll('.footer-bottom').forEach((fb) => {
      if (fb.querySelector('.footer-mini-logo')) return;
      const img = document.createElement('img');
      img.src = LOGO_SRC;
      img.alt = '';
      img.className = 'footer-mini-logo';
      img.width = 28;
      img.height = 28;
      const p = fb.querySelector('p');
      if (p) p.prepend(img, ' ');
    });
  }

  function init() {
    document.querySelectorAll('a.logo, .footer-info .logo, .admin-sidebar .logo').forEach(enhanceLogo);
    addWatermark();
    addPageStrip();
    enhancePageHeaders();
    addAuthMobileBrand();
    enhanceFooterBottom();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
