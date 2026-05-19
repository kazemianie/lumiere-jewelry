/* ═══════════════════════════════════════════════════════════
   LUMIÈRE Admin Panel — JavaScript
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ── Auth Guard ─────────────────────────────────────────── */
if (sessionStorage.getItem('lum_admin') !== 'yes') {
  location.href = 'index.html';
}

/* ── Default Product Data ───────────────────────────────── */
const DEFAULT_PRODUCTS = [
  { id:1,  name:'Diamond Solitaire Ring',     category:'rings',     price:2850, originalPrice:3800, image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80', badge:'Bestseller', rating:5,   reviews:248, desc:'1.5ct round brilliant diamond, 18k white gold',                   isNew:false },
  { id:2,  name:'Rose Gold Halo Ring',         category:'rings',     price:1950, originalPrice:null, image:'https://images.unsplash.com/photo-1573408301185-9519f94f8a6e?auto=format&fit=crop&w=600&q=80', badge:'New',        rating:4.8, reviews:95,  desc:'0.8ct diamond with halo setting, 18k rose gold',                isNew:true  },
  { id:3,  name:'Pearl Drop Necklace',         category:'necklaces', price:890,  originalPrice:1100, image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80', badge:'Sale',       rating:4.9, reviews:167, desc:'South Sea pearl with diamond bail, 18k yellow gold',            isNew:false },
  { id:4,  name:'Gold Chain Necklace',         category:'necklaces', price:650,  originalPrice:null, image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', badge:null,         rating:4.7, reviews:82,  desc:'18-inch venetian chain, 14k yellow gold',                       isNew:false },
  { id:5,  name:'Diamond Stud Earrings',       category:'earrings',  price:1200, originalPrice:1500, image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', badge:'Sale',       rating:5,   reviews:312, desc:'0.5ct total weight, 18k white gold push backs',                 isNew:false },
  { id:6,  name:'Gold Hoop Earrings',          category:'earrings',  price:480,  originalPrice:null, image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80', badge:'New',        rating:4.6, reviews:54,  desc:'30mm polished hoops, 14k yellow gold',                          isNew:true  },
  { id:7,  name:'Diamond Tennis Bracelet',     category:'bracelets', price:4200, originalPrice:5500, image:'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80', badge:'Bestseller', rating:5,   reviews:189, desc:'3ct total weight, 18k white gold, 7 inches',                    isNew:false },
  { id:8,  name:'Gold Bangle Bracelet',        category:'bracelets', price:780,  originalPrice:null, image:'https://images.unsplash.com/photo-1583835746434-cf1534674c9b?auto=format&fit=crop&w=600&q=80', badge:null,         rating:4.5, reviews:43,  desc:'Hammered-finish open bangle, 14k yellow gold',                  isNew:false },
  { id:9,  name:'Sapphire Cocktail Ring',      category:'rings',     price:3400, originalPrice:null, image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', badge:'New',        rating:4.9, reviews:28,  desc:'3ct Ceylon sapphire with diamond halo, platinum',               isNew:true  },
  { id:10, name:'Layered Diamond Necklace',    category:'necklaces', price:1650, originalPrice:null, image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80&sat=-20', badge:'New', rating:4.8, reviews:19, desc:'Multi-strand diamond station necklace, 18k gold',               isNew:true  },
  { id:11, name:'Emerald Drop Earrings',       category:'earrings',  price:2100, originalPrice:null, image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80&hue=120', badge:'New', rating:4.9, reviews:31, desc:'Colombian emeralds with diamond accents, 18k white gold',       isNew:true  },
  { id:12, name:'Diamond Cuff Bracelet',       category:'bracelets', price:2900, originalPrice:null, image:'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80&sat=-30', badge:'New', rating:4.7, reviews:15, desc:'Pavé diamond open cuff, 18k rose gold',                         isNew:true  },
];

const DEFAULT_SHIPPING = {
  freeThreshold:  150,
  standardRate:   9.99,
  standardLabel:  'Standard (5-7 days)',
  expressRate:    24.99,
  expressLabel:   'Express (2-3 days)',
};

const DEFAULT_STORE = {
  storeName:        'LUMIÈRE Fine Jewelry',
  announcementText: 'Free shipping on orders over $150 · Use code LUMIERE10 for 10% off',
  contactEmail:     'hello@lumierejewelry.com',
  promoCode:        'LUMIERE10',
  promoDiscount:    10,
};

/* ── Data Accessors ─────────────────────────────────────── */
function getProducts() {
  const stored = localStorage.getItem('lum_products');
  if (stored) return JSON.parse(stored);
  const init = DEFAULT_PRODUCTS.map(p => ({ ...p, stock: 10 }));
  localStorage.setItem('lum_products', JSON.stringify(init));
  return init;
}

function saveProducts(products) {
  localStorage.setItem('lum_products', JSON.stringify(products));
}

function getOrders() {
  return JSON.parse(localStorage.getItem('lum_orders') || '[]');
}

function saveOrders(orders) {
  localStorage.setItem('lum_orders', JSON.stringify(orders));
}

function getReviews() {
  return JSON.parse(localStorage.getItem('lum_reviews') || '[]');
}

function saveReviews(reviews) {
  localStorage.setItem('lum_reviews', JSON.stringify(reviews));
}

function getShipping() {
  return { ...DEFAULT_SHIPPING, ...JSON.parse(localStorage.getItem('lum_shipping') || '{}') };
}

function saveShipping(data) {
  localStorage.setItem('lum_shipping', JSON.stringify(data));
}

function getStoreSettings() {
  return { ...DEFAULT_STORE, ...JSON.parse(localStorage.getItem('lum_store') || '{}') };
}

function saveStoreSettings(data) {
  localStorage.setItem('lum_store', JSON.stringify(data));
}

function getCredentials() {
  return JSON.parse(localStorage.getItem('lum_creds') || '{"username":"admin","password":"admin"}');
}

/* ── Navigation ─────────────────────────────────────────── */
function showSection(name) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-sec]').forEach(n => n.classList.remove('active'));

  const sec = document.getElementById('sec-' + name);
  if (sec) sec.classList.add('active');

  const nav = document.querySelector('.nav-item[data-sec="' + name + '"]');
  if (nav) nav.classList.add('active');

  const titles = {
    overview: 'Overview',
    products: 'Products',
    reviews:  'Reviews',
    orders:   'Orders',
    finance:  'Finance',
    settings: 'Settings',
  };
  document.getElementById('topbarTitle').textContent = titles[name] || name;

  if (name === 'overview') renderOverview();
  if (name === 'products') renderProducts();
  if (name === 'reviews')  renderReviews();
  if (name === 'orders')   renderOrders();
  if (name === 'finance')  renderFinance();
  if (name === 'settings') renderSettings();
}

/* ── Overview ───────────────────────────────────────────── */
function renderOverview() {
  const orders   = getOrders();
  const products = getProducts();
  const reviews  = getReviews();

  const validOrders   = orders.filter(o => o.status !== 'cancelled');
  const totalRevenue  = validOrders.reduce((s, o) => s + o.total, 0);
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  document.getElementById('statRevenue').textContent  = fmt(totalRevenue);
  document.getElementById('statOrders').textContent   = orders.length;
  document.getElementById('statProducts').textContent = products.length;
  document.getElementById('statReviews').textContent  = pendingReviews;

  const badge = document.getElementById('reviewsBadge');
  badge.textContent    = pendingReviews;
  badge.style.display  = pendingReviews > 0 ? 'inline-flex' : 'none';

  renderRecentOrdersTable(orders.slice().reverse().slice(0, 5));
  renderStatusBreakdown(orders, 'overviewStatusBreakdown');
}

function renderRecentOrdersTable(orders) {
  const tbody = document.getElementById('recentOrdersBody');
  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--muted)">No orders yet</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td class="td-name">${esc(o.id)}</td>
      <td>${esc(o.customer.name)}</td>
      <td>${fmt(o.total)}</td>
      <td>${fmtDate(o.date)}</td>
      <td><span class="badge badge-${o.status}">${cap(o.status)}</span></td>
    </tr>
  `).join('');
}

function renderStatusBreakdown(orders, containerId) {
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const counts = {};
  statuses.forEach(s => { counts[s] = 0; });
  orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });

  const el = document.getElementById(containerId);
  if (!orders.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:.85rem">No orders yet.</p>';
    return;
  }
  el.innerHTML = statuses.map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--border)">
      <span class="badge badge-${s}">${cap(s)}</span>
      <strong>${counts[s]}</strong>
    </div>
  `).join('');
}

/* ── Products ───────────────────────────────────────────── */
let _productSearch = '';
let _editingId = null;

function renderProducts(search) {
  if (search !== undefined) _productSearch = search;
  const products = getProducts();
  const tbody = document.getElementById('productsBody');

  let list = products;
  if (_productSearch) {
    const q = _productSearch.toLowerCase();
    list = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.desc || '').toLowerCase().includes(q)
    );
  }

  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No products found</td></tr>';
    return;
  }

  tbody.innerHTML = list.map(p => `
    <tr>
      <td>
        <img class="td-img"
          src="${esc(p.image)}"
          alt="${esc(p.name)}"
          onerror="this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=80&q=60';this.onerror=null;"
        />
      </td>
      <td>
        <div class="td-name">${esc(p.name)}</div>
        <div class="td-muted">${esc(p.desc || '')}</div>
      </td>
      <td>${cap(p.category)}</td>
      <td>
        ${fmt(p.price)}
        ${p.originalPrice ? `<br><span class="td-muted" style="text-decoration:line-through">${fmt(p.originalPrice)}</span>` : ''}
      </td>
      <td>${p.stock ?? 10}</td>
      <td>${p.badge ? `<span class="badge badge-${badgeKey(p.badge)}">${esc(p.badge)}</span>` : '—'}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-outline btn-sm" onclick="openProductModal(${p.id})" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm"  onclick="confirmDeleteProduct(${p.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function badgeKey(b) {
  if (b === 'Sale')       return 'sale';
  if (b === 'New')        return 'new';
  if (b === 'Bestseller') return 'best';
  return 'new';
}

function openProductModal(id) {
  _editingId = id !== undefined ? id : null;
  const modal = document.getElementById('productModal');
  const title = document.getElementById('productModalTitle');

  if (_editingId !== null) {
    const p = getProducts().find(x => x.id === _editingId);
    if (!p) return;
    title.textContent = 'Edit Product';
    document.getElementById('pName').value     = p.name;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pPrice').value    = p.price;
    document.getElementById('pOriginal').value = p.originalPrice || '';
    document.getElementById('pStock').value    = p.stock ?? 10;
    document.getElementById('pBadge').value    = p.badge || '';
    document.getElementById('pDesc').value     = p.desc || '';
    document.getElementById('pImage').value    = p.image;
    document.getElementById('pIsNew').checked  = !!p.isNew;
    updateImgPreview();
  } else {
    title.textContent = 'Add Product';
    document.getElementById('productForm').reset();
    document.getElementById('pStock').value = '10';
    const preview = document.getElementById('pImgPreview');
    preview.src = '';
    preview.style.display = 'none';
  }
  openModal('productModal');
}

function updateImgPreview() {
  const url     = document.getElementById('pImage').value.trim();
  const preview = document.getElementById('pImgPreview');
  if (url) {
    preview.src = url;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }
}

function saveProduct() {
  const products = getProducts();
  const data = {
    name:          document.getElementById('pName').value.trim(),
    category:      document.getElementById('pCategory').value,
    price:         parseFloat(document.getElementById('pPrice').value) || 0,
    originalPrice: parseFloat(document.getElementById('pOriginal').value) || null,
    stock:         parseInt(document.getElementById('pStock').value)   || 0,
    badge:         document.getElementById('pBadge').value || null,
    desc:          document.getElementById('pDesc').value.trim(),
    image:         document.getElementById('pImage').value.trim(),
    isNew:         document.getElementById('pIsNew').checked,
  };

  if (!data.name || !data.price || !data.image) {
    showNotif('Please fill in all required fields', 'danger');
    return;
  }

  if (_editingId !== null) {
    const idx = products.findIndex(p => p.id === _editingId);
    if (idx !== -1) {
      products[idx] = {
        ...products[idx],
        ...data,
      };
    }
  } else {
    const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
    products.push({
      id:      maxId + 1,
      rating:  5,
      reviews: 0,
      ...data,
    });
  }

  saveProducts(products);
  closeModal('productModal');
  renderProducts();
  showNotif(_editingId !== null ? 'Product updated successfully' : 'Product added successfully', 'success');
}

function confirmDeleteProduct(id) {
  const p = getProducts().find(x => x.id === id);
  openConfirm(
    'Delete Product',
    `Are you sure you want to delete "${p ? p.name : 'this product'}"? This cannot be undone.`,
    () => {
      saveProducts(getProducts().filter(x => x.id !== id));
      renderProducts();
      showNotif('Product deleted', 'danger');
    }
  );
}

/* ── Reviews ────────────────────────────────────────────── */
let _reviewFilter = 'all';

function renderReviews(filter) {
  if (filter !== undefined) _reviewFilter = filter;
  const reviews = getReviews();

  document.querySelectorAll('.rev-filter-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.filter === _reviewFilter);
  });

  let list = reviews;
  if (_reviewFilter !== 'all') list = reviews.filter(r => r.status === _reviewFilter);

  const grid = document.getElementById('reviewsGrid');

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state"><i class="fas fa-star"></i><p>No ${_reviewFilter !== 'all' ? _reviewFilter + ' ' : ''}reviews yet.</p></div>`;
    return;
  }

  grid.innerHTML = list.map(r => `
    <div class="review-admin-card">
      <div class="rev-header">
        <div>
          <div class="rev-reviewer">${esc(r.reviewer)}</div>
          <div class="rev-product">${esc(r.productName || 'General')}</div>
        </div>
        <span class="badge badge-${r.status}">${cap(r.status)}</span>
      </div>
      <div class="rev-stars">${starHtml(r.rating)}</div>
      ${r.title ? `<div style="font-size:.85rem;font-weight:600">${esc(r.title)}</div>` : ''}
      <div class="rev-text">"${esc(r.text)}"</div>
      <div class="rev-date">${fmtDate(r.date)} &nbsp;·&nbsp; ${esc(r.email || '')}</div>
      <div class="rev-actions">
        ${r.status !== 'approved' ? `<button class="btn btn-success btn-sm" onclick="updateReview('${r.id}','approved')"><i class="fas fa-check"></i> Approve</button>` : ''}
        ${r.status !== 'rejected' ? `<button class="btn btn-danger btn-sm"  onclick="updateReview('${r.id}','rejected')"><i class="fas fa-times"></i> Reject</button>` : ''}
        <button class="btn btn-outline btn-sm" onclick="deleteReview('${r.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function updateReview(id, status) {
  const reviews = getReviews();
  const rev = reviews.find(r => r.id === id);
  if (rev) rev.status = status;
  saveReviews(reviews);
  renderReviews();
  showNotif(`Review ${status}`, 'success');
}

function deleteReview(id) {
  openConfirm('Delete Review', 'Are you sure you want to delete this review?', () => {
    saveReviews(getReviews().filter(r => r.id !== id));
    renderReviews();
    showNotif('Review deleted', 'danger');
  });
}

function starHtml(n) {
  return Array.from({ length: 5 }, (_, i) =>
    `<i class="${i < Math.round(n) ? 'fas' : 'far'} fa-star"></i>`
  ).join('');
}

/* ── Orders ─────────────────────────────────────────────── */
let _orderFilter = 'all';

function renderOrders(filter) {
  if (filter !== undefined) _orderFilter = filter;
  const orders = getOrders().slice().reverse();

  document.querySelectorAll('.ord-filter-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.filter === _orderFilter);
  });

  const list = _orderFilter === 'all' ? orders : orders.filter(o => o.status === _orderFilter);
  const tbody = document.getElementById('ordersBody');

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)">No ${_orderFilter !== 'all' ? _orderFilter + ' ' : ''}orders yet</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(o => `
    <tr>
      <td class="td-name">${esc(o.id)}</td>
      <td>
        <div class="td-name">${esc(o.customer.name)}</div>
        <div class="td-muted">${esc(o.customer.email)}</div>
      </td>
      <td>${o.items.reduce((s, i) => s + i.qty, 0)} item${o.items.length !== 1 ? 's' : ''}</td>
      <td>${fmt(o.total)}</td>
      <td>${fmtDate(o.date)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
          <span class="badge badge-${o.status}">${cap(o.status)}</span>
          <button class="btn btn-outline btn-sm" onclick="openOrderModal('${esc(o.id)}')"><i class="fas fa-eye"></i> View</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openOrderModal(id) {
  const order = getOrders().find(o => o.id === id);
  if (!order) return;

  const body = document.getElementById('orderModalBody');
  body.innerHTML = `
    <div class="order-detail-grid">
      <div><div class="detail-label">Order ID</div><div class="detail-value">${esc(order.id)}</div></div>
      <div><div class="detail-label">Date</div><div class="detail-value">${fmtDate(order.date)}</div></div>
      <div><div class="detail-label">Customer</div><div class="detail-value">${esc(order.customer.name)}</div></div>
      <div><div class="detail-label">Email</div><div class="detail-value">${esc(order.customer.email)}</div></div>
      <div><div class="detail-label">Phone</div><div class="detail-value">${esc(order.customer.phone || '—')}</div></div>
      <div><div class="detail-label">Shipping Method</div><div class="detail-value">${esc(order.shippingMethod === 'express' ? 'Express' : 'Standard')}</div></div>
      <div style="grid-column:1/-1"><div class="detail-label">Address</div><div class="detail-value">${esc(order.customer.address)}</div></div>
      ${order.trackingNumber ? `<div style="grid-column:1/-1"><div class="detail-label">Tracking</div><div class="detail-value">${esc(order.trackingNumber)}</div></div>` : ''}
    </div>

    <h4 style="margin:.5rem 0 .75rem;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)">Items</h4>
    <ul class="order-items-list">
      ${order.items.map(i => `
        <li>
          <span>${esc(i.name)} &times; ${i.qty}</span>
          <span>${fmt(i.price * i.qty)}</span>
        </li>
      `).join('')}
      <li class="order-total-row"><span>Subtotal</span><span>${fmt(order.subtotal)}</span></li>
      <li class="order-total-row"><span>Shipping</span><span>${order.shipping === 0 ? 'Free' : fmt(order.shipping)}</span></li>
      <li class="order-total-row grand"><span>Total</span><span>${fmt(order.total)}</span></li>
    </ul>

    <h4 style="margin:1.25rem 0 .75rem;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)">Update Order</h4>
    <div class="form-row" style="grid-template-columns:1fr 1fr">
      <div class="form-group">
        <label>Status</label>
        <select id="orderStatusSel">
          ${['pending','processing','shipped','delivered','cancelled'].map(s =>
            `<option value="${s}" ${order.status === s ? 'selected' : ''}>${cap(s)}</option>`
          ).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Tracking Number</label>
        <input type="text" id="orderTrackingIn" value="${esc(order.trackingNumber || '')}" placeholder="e.g. 1Z999AA1012345678" />
      </div>
    </div>
    <button class="btn btn-gold btn-full" onclick="updateOrder('${esc(order.id)}')">
      <i class="fas fa-save"></i> Update Order
    </button>
  `;

  document.getElementById('orderModalTitle').textContent = 'Order ' + order.id;
  openModal('orderModal');
}

function updateOrder(id) {
  const orders = getOrders();
  const order  = orders.find(o => o.id === id);
  if (!order) return;

  order.status         = document.getElementById('orderStatusSel').value;
  order.trackingNumber = document.getElementById('orderTrackingIn').value.trim();

  saveOrders(orders);
  closeModal('orderModal');
  renderOrders();
  showNotif('Order updated', 'success');
}

/* ── Finance ────────────────────────────────────────────── */
let _revenueChart = null;

function renderFinance() {
  const orders      = getOrders();
  const validOrders = orders.filter(o => o.status !== 'cancelled');

  const totalRev = validOrders.reduce((s, o) => s + o.total, 0);

  const now        = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthRev   = validOrders
    .filter(o => new Date(o.date) >= monthStart)
    .reduce((s, o) => s + o.total, 0);

  const avgOrder = validOrders.length ? totalRev / validOrders.length : 0;

  document.getElementById('finTotalRev').textContent  = fmt(totalRev);
  document.getElementById('finMonthRev').textContent  = fmt(monthRev);
  document.getElementById('finOrders').textContent    = validOrders.length;
  document.getElementById('finAvgOrder').textContent  = fmt(avgOrder);

  renderRevenueChart(validOrders);
  renderTopProducts(validOrders);
  renderStatusBreakdown(orders, 'orderStatusBreakdown');
}

function renderRevenueChart(orders) {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  const now     = new Date();
  const labels  = [];
  const data    = [];

  for (let i = 6; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end   = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    labels.push(start.toLocaleString('default', { month: 'short', year: '2-digit' }));
    const rev = orders
      .filter(o => { const d = new Date(o.date); return d >= start && d < end; })
      .reduce((s, o) => s + o.total, 0);
    data.push(rev);
  }

  if (_revenueChart) _revenueChart.destroy();

  _revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Revenue',
        data,
        backgroundColor: 'rgba(201, 169, 110, 0.75)',
        borderColor:     '#c9a96e',
        borderWidth:     2,
        borderRadius:    6,
      }],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' $' + ctx.raw.toLocaleString('en-US', { minimumFractionDigits: 2 }),
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f0ede6' },
          ticks: { callback: v => '$' + v.toLocaleString() },
        },
        x: { grid: { display: false } },
      },
    },
  });
}

function renderTopProducts(orders) {
  const salesMap = {};
  orders.forEach(o => {
    o.items.forEach(i => {
      if (!salesMap[i.id]) salesMap[i.id] = { units: 0, revenue: 0, name: i.name };
      salesMap[i.id].units   += i.qty;
      salesMap[i.id].revenue += i.price * i.qty;
    });
  });

  const sorted = Object.values(salesMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const list   = document.getElementById('topProductsList');
  const maxRev = sorted[0]?.revenue || 1;

  if (!sorted.length) {
    list.innerHTML = '<li style="text-align:center;color:var(--muted);padding:1rem;font-size:.85rem">No sales data yet</li>';
    return;
  }

  list.innerHTML = sorted.map((p, i) => `
    <li class="top-product-item">
      <span class="tp-rank">${i + 1}</span>
      <div class="tp-info">
        <div class="tp-name">${esc(p.name)}</div>
        <div class="tp-units">${p.units} unit${p.units !== 1 ? 's' : ''} sold</div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${(p.revenue / maxRev * 100).toFixed(1)}%"></div>
        </div>
      </div>
      <span class="tp-revenue">${fmt(p.revenue)}</span>
    </li>
  `).join('');
}

/* ── Settings ───────────────────────────────────────────── */
function renderSettings() {
  const sh = getShipping();
  const st = getStoreSettings();
  const cr = getCredentials();

  document.getElementById('sFreeThreshold').value  = sh.freeThreshold;
  document.getElementById('sStandardRate').value   = sh.standardRate;
  document.getElementById('sStandardLabel').value  = sh.standardLabel;
  document.getElementById('sExpressRate').value    = sh.expressRate;
  document.getElementById('sExpressLabel').value   = sh.expressLabel;

  document.getElementById('sStoreName').value      = st.storeName;
  document.getElementById('sEmail').value          = st.contactEmail;
  document.getElementById('sAnnouncement').value   = st.announcementText;
  document.getElementById('sPromoCode').value      = st.promoCode;
  document.getElementById('sPromoDiscount').value  = st.promoDiscount;

  document.getElementById('sNewUsername').value    = cr.username;
  document.getElementById('sNewPassword').value    = '';
  document.getElementById('sConfirmPassword').value = '';
}

function saveShippingForm() {
  saveShipping({
    freeThreshold: parseFloat(document.getElementById('sFreeThreshold').value) || 150,
    standardRate:  parseFloat(document.getElementById('sStandardRate').value)  || 9.99,
    standardLabel: document.getElementById('sStandardLabel').value  || 'Standard (5-7 days)',
    expressRate:   parseFloat(document.getElementById('sExpressRate').value)   || 24.99,
    expressLabel:  document.getElementById('sExpressLabel').value   || 'Express (2-3 days)',
  });
  showNotif('Shipping settings saved', 'success');
}

function saveStoreForm() {
  saveStoreSettings({
    storeName:        document.getElementById('sStoreName').value.trim(),
    contactEmail:     document.getElementById('sEmail').value.trim(),
    announcementText: document.getElementById('sAnnouncement').value.trim(),
    promoCode:        document.getElementById('sPromoCode').value.trim().toUpperCase(),
    promoDiscount:    parseInt(document.getElementById('sPromoDiscount').value) || 0,
  });
  showNotif('Store settings saved', 'success');
}

function saveCredentials() {
  const username = document.getElementById('sNewUsername').value.trim();
  const password = document.getElementById('sNewPassword').value;
  const confirm  = document.getElementById('sConfirmPassword').value;

  if (!username) { showNotif('Username cannot be empty', 'danger'); return; }
  if (password && password !== confirm) { showNotif('Passwords do not match', 'danger'); return; }

  const creds = { username };
  if (password) creds.password = password;
  else creds.password = getCredentials().password;

  localStorage.setItem('lum_creds', JSON.stringify(creds));
  document.getElementById('sNewPassword').value    = '';
  document.getElementById('sConfirmPassword').value = '';
  showNotif('Credentials updated', 'success');
}

function clearAllOrders() {
  openConfirm('Clear All Orders', 'This will permanently delete all orders. Are you sure?', () => {
    saveOrders([]);
    showNotif('All orders cleared', 'danger');
    renderOrders();
  });
}

function clearAllReviews() {
  openConfirm('Clear All Reviews', 'This will permanently delete all reviews. Are you sure?', () => {
    saveReviews([]);
    showNotif('All reviews cleared', 'danger');
    renderReviews();
  });
}

function resetProducts() {
  openConfirm('Reset Products', 'This will restore all products to the original 12 defaults. Are you sure?', () => {
    const init = DEFAULT_PRODUCTS.map(p => ({ ...p, stock: 10 }));
    saveProducts(init);
    renderProducts();
    showNotif('Products reset to defaults', 'success');
  });
}

/* ── Modal Helpers ──────────────────────────────────────── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

let _confirmCb = null;

function openConfirm(title, message, callback) {
  document.getElementById('confirmTitle').textContent   = title;
  document.getElementById('confirmMessage').textContent = message;
  _confirmCb = callback;
  openModal('confirmModal');
}

document.getElementById('confirmOk').addEventListener('click', () => {
  if (_confirmCb) _confirmCb();
  closeModal('confirmModal');
  _confirmCb = null;
});

document.getElementById('confirmCancel').addEventListener('click', () => {
  closeModal('confirmModal');
  _confirmCb = null;
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

/* ── Notification ───────────────────────────────────────── */
let _notifTimer;
function showNotif(msg, type) {
  const el = document.getElementById('adminNotif');
  el.textContent = msg;
  el.className = 'admin-notif ' + (type || 'success') + ' show';
  clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ── Sidebar / Nav ──────────────────────────────────────── */
document.querySelectorAll('.nav-item[data-sec]').forEach(item => {
  item.addEventListener('click', () => {
    showSection(item.dataset.sec);
    if (window.innerWidth <= 900) closeSidebar();
  });
});

document.getElementById('sidebarToggle').addEventListener('click', openSidebar);

document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('lum_admin');
  location.href = 'index.html';
});

/* ── Review filter pills ────────────────────────────────── */
document.querySelectorAll('.rev-filter-pill').forEach(btn => {
  btn.addEventListener('click', () => renderReviews(btn.dataset.filter));
});

/* ── Order filter pills ─────────────────────────────────── */
document.querySelectorAll('.ord-filter-pill').forEach(btn => {
  btn.addEventListener('click', () => renderOrders(btn.dataset.filter));
});

/* ── Product search ─────────────────────────────────────── */
document.getElementById('productSearch').addEventListener('input', e => {
  renderProducts(e.target.value.trim());
});

/* ── Utility Functions ──────────────────────────────────── */
function fmt(n) {
  return '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str == null ? '' : String(str);
  return d.innerHTML;
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

function fmtDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ── Init ───────────────────────────────────────────────── */
(function init() {
  getProducts(); // ensure initialized
  showSection('overview');
})();
