/* ═══════════════════════════════════════════════════════════
   LUMIÈRE Fine Jewelry — Main Script
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Product Data ───────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    category: 'rings',
    price: 2850,
    originalPrice: 3800,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
    rating: 5,
    reviews: 248,
    desc: '1.5ct round brilliant diamond, 18k white gold',
    isNew: false,
  },
  {
    id: 2,
    name: 'Rose Gold Halo Ring',
    category: 'rings',
    price: 1950,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94f8a6e?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    rating: 4.8,
    reviews: 95,
    desc: '0.8ct diamond with halo setting, 18k rose gold',
    isNew: true,
  },
  {
    id: 3,
    name: 'Pearl Drop Necklace',
    category: 'necklaces',
    price: 890,
    originalPrice: 1100,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
    rating: 4.9,
    reviews: 167,
    desc: 'South Sea pearl with diamond bail, 18k yellow gold',
    isNew: false,
  },
  {
    id: 4,
    name: 'Gold Chain Necklace',
    category: 'necklaces',
    price: 650,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    badge: null,
    rating: 4.7,
    reviews: 82,
    desc: '18-inch venetian chain, 14k yellow gold',
    isNew: false,
  },
  {
    id: 5,
    name: 'Diamond Stud Earrings',
    category: 'earrings',
    price: 1200,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
    rating: 5,
    reviews: 312,
    desc: '0.5ct total weight, 18k white gold push backs',
    isNew: false,
  },
  {
    id: 6,
    name: 'Gold Hoop Earrings',
    category: 'earrings',
    price: 480,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    rating: 4.6,
    reviews: 54,
    desc: '30mm polished hoops, 14k yellow gold',
    isNew: true,
  },
  {
    id: 7,
    name: 'Diamond Tennis Bracelet',
    category: 'bracelets',
    price: 4200,
    originalPrice: 5500,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
    rating: 5,
    reviews: 189,
    desc: '3ct total weight, 18k white gold, 7 inches',
    isNew: false,
  },
  {
    id: 8,
    name: 'Gold Bangle Bracelet',
    category: 'bracelets',
    price: 780,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1583835746434-cf1534674c9b?auto=format&fit=crop&w=600&q=80',
    badge: null,
    rating: 4.5,
    reviews: 43,
    desc: 'Hammered-finish open bangle, 14k yellow gold',
    isNew: false,
  },
  /* ── New Arrivals ──────────────────────────────────────── */
  {
    id: 9,
    name: 'Sapphire Cocktail Ring',
    category: 'rings',
    price: 3400,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    rating: 4.9,
    reviews: 28,
    desc: '3ct Ceylon sapphire with diamond halo, platinum',
    isNew: true,
  },
  {
    id: 10,
    name: 'Layered Diamond Necklace',
    category: 'necklaces',
    price: 1650,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80&sat=-20',
    badge: 'New',
    rating: 4.8,
    reviews: 19,
    desc: 'Multi-strand diamond station necklace, 18k gold',
    isNew: true,
  },
  {
    id: 11,
    name: 'Emerald Drop Earrings',
    category: 'earrings',
    price: 2100,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80&hue=120',
    badge: 'New',
    rating: 4.9,
    reviews: 31,
    desc: 'Colombian emeralds with diamond accents, 18k white gold',
    isNew: true,
  },
  {
    id: 12,
    name: 'Diamond Cuff Bracelet',
    category: 'bracelets',
    price: 2900,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80&sat=-30',
    badge: 'New',
    rating: 4.7,
    reviews: 15,
    desc: 'Pavé diamond open cuff, 18k rose gold',
    isNew: true,
  },
];

/* ── State ──────────────────────────────────────────────── */
const state = {
  cart:     JSON.parse(localStorage.getItem('lum_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('lum_wish') || '[]'),
};

function saveCart()    { localStorage.setItem('lum_cart', JSON.stringify(state.cart)); }
function saveWishlist(){ localStorage.setItem('lum_wish', JSON.stringify(state.wishlist)); }

/* ── DOM References ─────────────────────────────────────── */
const $  = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const header         = $('#header');
const annBar         = $('#announcementBar');
const annClose       = $('#annClose');
const hamburger      = $('#hamburger');
const mobileNav      = $('#mobileNav');
const mobileNavClose = $('#mobileNavClose');
const pageOverlay    = $('#pageOverlay');
const searchBtn      = $('#searchBtn');
const searchOverlay  = $('#searchOverlay');
const searchClose    = $('#searchClose');
const searchInput    = $('#searchInput');
const searchResults  = $('#searchResults');
const cartBtn        = $('#cartBtn');
const cartDrawer     = $('#cartDrawer');
const cartClose      = $('#cartClose');
const cartContinue   = $('#cartContinue');
const cartBadge      = $('#cartBadge');
const cartHeadCount  = $('#cartHeadCount');
const cartBody       = $('#cartBody');
const cartEmpty      = $('#cartEmpty');
const cartList       = $('#cartList');
const cartFoot       = $('#cartFoot');
const cartTotal      = $('#cartTotal');
const cartStart      = $('#cartStartShopping');
const featuredGrid   = $('#featuredGrid');
const newArrivalsGrid= $('#newArrivalsGrid');
const filterBtns     = $$('.filter-btn');
const nlForm         = $('#nlForm');
const toast          = $('#toast');

/* ════════════════════════════════════════════════════════════
   UTILITIES
   ════════════════════════════════════════════════════════════ */
function fmt(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function stars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fas fa-star"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt"></i>' : '') +
    '<i class="far fa-star"></i>'.repeat(empty)
  );
}

function badgeClass(b) {
  if (!b) return '';
  if (b === 'Sale')       return 'sale';
  if (b === 'New')        return 'new';
  if (b === 'Bestseller') return 'best';
  return '';
}

let toastTimer;
function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className   = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ════════════════════════════════════════════════════════════
   PRODUCT CARD RENDERER
   ════════════════════════════════════════════════════════════ */
function renderCard(product) {
  const wished = state.wishlist.includes(product.id);
  const li = document.createElement('article');
  li.className   = 'product-card reveal';
  li.dataset.id  = product.id;
  li.dataset.cat = product.category;

  li.innerHTML = `
    <div class="product-img-wrap">
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=60';this.onerror=null;"
      />
      ${product.badge ? `<span class="product-badge ${badgeClass(product.badge)}">${product.badge}</span>` : ''}
      <button
        class="product-wishlist${wished ? ' active' : ''}"
        data-id="${product.id}"
        aria-label="${wished ? 'Remove from wishlist' : 'Add to wishlist'}"
        aria-pressed="${wished}"
      ><i class="${wished ? 'fas' : 'far'} fa-heart"></i></button>
    </div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <div class="product-rating">
        <div class="stars-s" aria-label="${product.rating} out of 5 stars">${stars(product.rating)}</div>
        <span>(${product.reviews})</span>
      </div>
      <div class="product-price-row">
        <div>
          <span class="product-price">${fmt(product.price)}</span>
          ${product.originalPrice ? `<span class="product-original">${fmt(product.originalPrice)}</span>` : ''}
        </div>
        <button class="product-add-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Bag</button>
      </div>
    </div>
  `;
  return li;
}

/* ════════════════════════════════════════════════════════════
   RENDER GRIDS
   ════════════════════════════════════════════════════════════ */
function renderFeatured(filter = 'all') {
  featuredGrid.innerHTML = '';
  const list = filter === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === filter);
  if (list.length === 0) {
    featuredGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">No products found.</p>';
    return;
  }
  list.forEach(p => featuredGrid.appendChild(renderCard(p)));
  observeReveal();
}

function renderNewArrivals() {
  newArrivalsGrid.innerHTML = '';
  PRODUCTS.filter(p => p.isNew).forEach(p => newArrivalsGrid.appendChild(renderCard(p)));
  observeReveal();
}

/* ════════════════════════════════════════════════════════════
   FILTER
   ════════════════════════════════════════════════════════════ */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFeatured(btn.dataset.filter);
  });
});

/* ════════════════════════════════════════════════════════════
   CART
   ════════════════════════════════════════════════════════════ */
function cartTotal_() {
  return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount_() {
  return state.cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = cartCount_();
  cartBadge.textContent = count;
  cartBadge.classList.toggle('visible', count > 0);
  cartHeadCount.textContent = `(${count})`;

  if (state.cart.length === 0) {
    cartList.innerHTML  = '';
    cartEmpty.style.display = 'flex';
    cartList.style.display  = 'none';
    cartFoot.style.display  = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartList.style.display  = 'flex';
    cartFoot.style.display  = 'flex';
    renderCartItems();
  }
  cartTotal.textContent = fmt(cartTotal_());
  saveCart();
}

function renderCartItems() {
  cartList.innerHTML = '';
  state.cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.id = item.id;
    li.innerHTML = `
      <img class="cart-item-img"
        src="${item.image}"
        alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=80&q=60';this.onerror=null;"
      />
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-desc">${item.desc}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
          <span class="qty-val" aria-live="polite">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.5rem">
        <span class="cart-item-price">${fmt(item.price * item.qty)}</span>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name} from cart"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      image: product.image,
      desc:  product.desc,
      qty:   1,
    });
  }
  updateCartUI();
  showToast(`${product.name} added to your bag`);
}

function changeQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart.splice(state.cart.indexOf(item), 1);
  }
  updateCartUI();
}

function removeFromCart(productId) {
  const idx = state.cart.findIndex(i => i.id === productId);
  if (idx === -1) return;
  const name = state.cart[idx].name;
  state.cart.splice(idx, 1);
  updateCartUI();
  showToast(`${name} removed from your bag`, 'info');
}

/* Cart event delegation */
cartList.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  const rem = e.target.closest('.cart-item-remove');
  if (btn) {
    const id    = Number(btn.dataset.id);
    const delta = btn.dataset.action === 'inc' ? 1 : -1;
    changeQty(id, delta);
  }
  if (rem) removeFromCart(Number(rem.dataset.id));
});

/* ════════════════════════════════════════════════════════════
   WISHLIST
   ════════════════════════════════════════════════════════════ */
function toggleWishlist(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const idx = state.wishlist.indexOf(productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    showToast(`${product.name} added to wishlist`, 'info');
  } else {
    state.wishlist.splice(idx, 1);
    showToast(`${product.name} removed from wishlist`, 'info');
  }
  saveWishlist();
  /* Update all wishlist buttons for this product */
  $$(`[data-id="${productId}"].product-wishlist`).forEach(btn => {
    const active = state.wishlist.includes(productId);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
    btn.querySelector('i').className = active ? 'fas fa-heart' : 'far fa-heart';
  });
}

/* ════════════════════════════════════════════════════════════
   DELEGATED CLICK — products grids
   ════════════════════════════════════════════════════════════ */
function handleGridClick(e) {
  const addBtn  = e.target.closest('.product-add-btn');
  const wishBtn = e.target.closest('.product-wishlist');
  if (addBtn)  addToCart(Number(addBtn.dataset.id));
  if (wishBtn) toggleWishlist(Number(wishBtn.dataset.id));
}
featuredGrid.addEventListener('click',    handleGridClick);
newArrivalsGrid.addEventListener('click', handleGridClick);
searchResults.addEventListener('click',   handleGridClick);

/* ════════════════════════════════════════════════════════════
   DRAWERS — open / close helpers
   ════════════════════════════════════════════════════════════ */
function openDrawer(el) {
  el.classList.add('open');
  el.setAttribute('aria-hidden', 'false');
  pageOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeDrawer(el) {
  el.classList.remove('open');
  el.setAttribute('aria-hidden', 'true');
  /* Only hide overlay if no other drawer is open */
  if (!$$('.cart-drawer.open, .mobile-nav.open').length) {
    pageOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
}

/* Cart */
cartBtn.addEventListener('click', () => openDrawer(cartDrawer));
cartClose.addEventListener('click', () => closeDrawer(cartDrawer));
cartContinue && cartContinue.addEventListener('click', () => closeDrawer(cartDrawer));
cartStart && cartStart.addEventListener('click', () => closeDrawer(cartDrawer));

/* Mobile Nav */
hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('open');
  if (isOpen) {
    closeDrawer(mobileNav);
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  } else {
    openDrawer(mobileNav);
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
});
mobileNavClose.addEventListener('click', () => {
  closeDrawer(mobileNav);
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
});
/* Close mobile nav on link click */
$$('.mobile-nav nav a').forEach(a => a.addEventListener('click', () => {
  closeDrawer(mobileNav);
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}));

/* Page overlay closes all drawers */
pageOverlay.addEventListener('click', () => {
  closeDrawer(cartDrawer);
  closeDrawer(mobileNav);
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  closeSearch();
});

/* ════════════════════════════════════════════════════════════
   SEARCH
   ════════════════════════════════════════════════════════════ */
function openSearch() {
  searchOverlay.classList.add('open');
  searchOverlay.setAttribute('aria-hidden', 'false');
  searchInput.value = '';
  searchResults.innerHTML = '';
  setTimeout(() => searchInput.focus(), 100);
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  searchOverlay.classList.remove('open');
  searchOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

searchBtn.addEventListener('click',  openSearch);
searchClose.addEventListener('click', closeSearch);

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';

  if (q.length < 2) return;

  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = '<p class="search-no-results">No results found. Try a different search.</p>';
    return;
  }

  matches.forEach(p => {
    const card = renderCard(p);
    searchResults.appendChild(card);
  });
  observeReveal();
});

/* Close search on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (searchOverlay.classList.contains('open')) closeSearch();
    if (cartDrawer.classList.contains('open'))   closeDrawer(cartDrawer);
    if (mobileNav.classList.contains('open'))    { closeDrawer(mobileNav); hamburger.classList.remove('open'); }
  }
});

/* ════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR
   ════════════════════════════════════════════════════════════ */
annClose.addEventListener('click', () => {
  annBar.style.maxHeight = annBar.offsetHeight + 'px';
  annBar.offsetHeight; /* force reflow */
  annBar.style.maxHeight = '0';
  annBar.style.padding   = '0';
  annBar.style.overflow  = 'hidden';
});

/* ════════════════════════════════════════════════════════════
   STICKY HEADER — shadow on scroll
   ════════════════════════════════════════════════════════════ */
const scrollHandler = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', scrollHandler, { passive: true });

/* ════════════════════════════════════════════════════════════
   REVEAL ON SCROLL (IntersectionObserver)
   ════════════════════════════════════════════════════════════ */
let revealObserver;

function observeReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$('.reveal').forEach(el => revealObserver.observe(el));
}

/* Also observe static elements (trust, categories, reviews, etc.) */
function observeStaticSections() {
  const targets = $$('.trust-item, .cat-card, .review-card, .about-content, .about-img, .nl-inner, .footer-col, .footer-brand');
  targets.forEach(el => el.classList.add('reveal'));
  observeReveal();
}

/* ════════════════════════════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════════════════════════════ */
nlForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#nlEmail').value.trim();
  if (!email) return;
  /* Basic email format check */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    showToast('Please enter a valid email address.', 'info');
    return;
  }
  nlForm.reset();
  showToast('Thank you for subscribing to LUMIÈRE!');
});

/* ════════════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
   ════════════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const id = anchor.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const headerH = header.offsetHeight + 12;
  window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
});

/* ════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════ */
function init() {
  renderFeatured();
  renderNewArrivals();
  updateCartUI();
  observeStaticSections();
}

document.addEventListener('DOMContentLoaded', init);
