/*
 * Madame Boutique - Complete E-Commerce App
 * Handles all frontend logic: products, auth, cart, checkout
 */

class MadameBoutique {
  constructor() {
    this.API_URL = window.MADAME_API_URL || 'http://localhost:5000/api';
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = localStorage.getItem('authToken');
    this.currentUser = null;
    this.products = [];
    this.init();
  }

  // =============== INITIALIZATION ===============
  async init() {
    console.log('🚀 Initializing Madame Boutique');
    this.setupEventListeners();
    this.updateCartUI();
    this.checkAuthState();
    await this.loadProducts();
    this.renderProducts('all');
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        const category = link.getAttribute('data-category');
        if (category) {
          e.preventDefault();
          this.renderProducts(category);
        }
      });
    });

    // Auth modals
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());

    // Checkout
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));
  }

  // =============== AUTHENTICATION ===============
  checkAuthState() {
    if (this.token && this.user) {
      this.currentUser = this.user;
      this.updateUserUI();
    } else {
      this.clearUserUI();
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;
    const name = form.querySelector('[name="name"]')?.value || email;

    try {
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      this.setAuth(data.token, data.user);
      alert('✓ Registration successful!');
      this.closeModal('registerModal');
      form.reset();
    } catch (error) {
      alert('❌ ' + error.message);
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;

    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      this.setAuth(data.token, data.user);
      alert('✓ Login successful!');
      this.closeModal('loginModal');
      form.reset();
    } catch (error) {
      alert('❌ ' + error.message);
    }
  }

  setAuth(token, user) {
    this.token = token;
    this.user = user;
    this.currentUser = user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.updateUserUI();
  }

  logout() {
    this.token = null;
    this.user = null;
    this.currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.clearUserUI();
    alert('✓ Logged out');
  }

  updateUserUI() {
    const signinText = document.querySelector('.signin-text');
    if (signinText && this.currentUser) {
      signinText.innerHTML = `
        <span class="dropdown">
          <span class="dropdown-toggle" data-bs-toggle="dropdown">
            ${this.currentUser.name || this.currentUser.email}
          </span>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" onclick="app.showMyOrders(event)">My Orders</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="app.logout()">Logout</a></li>
          </ul>
        </span>
      `;
    }
  }

  clearUserUI() {
    const signinText = document.querySelector('.signin-text');
    if (signinText) {
      signinText.innerHTML = '<span data-bs-toggle="modal" data-bs-target="#loginModal">Sign in</span>';
    }
  }

  // =============== PRODUCTS ===============
  async loadProducts() {
    try {
      const response = await fetch(`${this.API_URL}/products`);
      if (!response.ok) throw new Error('Failed to load products');
      this.products = await response.json();
      console.log(`✓ Loaded ${this.products.length} products`);
    } catch (error) {
      console.error('❌ Product load error:', error);
      // Fallback to empty array
      this.products = [];
    }
  }

  renderProducts(category = 'all') {
    let filtered = this.products;

    if (category !== 'all') {
      filtered = this.products.filter(p => p.category === category);
    }

    const container = document.getElementById('productsContainer') || document.querySelector('.cards');
    if (!container) {
      console.warn('Products container not found');
      return;
    }

    container.innerHTML = filtered.map(product => `
      <div class="card product-card" data-product-id="${product._id}">
        <img src="${product.image}" alt="${product.name}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description || ''}</p>
          <div class="price-section">
            ${product.oldPrice ? `<span class="old-price">Rs ${product.oldPrice}</span>` : ''}
            <span class="price">Rs ${product.price}</span>
          </div>
          ${product.discount ? `<span class="badge bg-danger">${product.discount}% OFF</span>` : ''}
          <div class="stock-status">
            ${product.stock > 0 ? `<span class="badge bg-success">In Stock</span>` : `<span class="badge bg-danger">Out of Stock</span>`}
          </div>
          <button class="btn btn-primary w-100 mt-2" onclick="app.addToCart('${product._id}')">Add to Cart</button>
        </div>
      </div>
    `).join('');
  }

  // =============== CART ===============
  addToCart(productId) {
    const product = this.products.find(p => p._id === productId);
    if (!product) {
      alert('❌ Product not found');
      return;
    }

    if (product.stock <= 0) {
      alert('❌ Out of stock');
      return;
    }

    const existingItem = this.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.stock
      });
    }

    this.saveCart();
    alert('✓ Added to cart');
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(i => i.productId === productId);
    if (!item) return;
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else if (quantity > item.stock) {
      alert(`❌ Only ${item.stock} in stock`);
    } else {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;

    if (this.cart.length === 0) {
      cartContainer.innerHTML = '<p>Cart is empty</p>';
      return;
    }

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + tax;

    cartContainer.innerHTML = `
      <div class="cart-items-list">
        ${this.cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="60">
            <div class="item-details">
              <h6>${item.name}</h6>
              <p>Rs ${item.price} x <input type="number" value="${item.quantity}" min="1" max="${item.stock}" onchange="app.updateQuantity('${item.productId}', this.value)" style="width: 50px;"></p>
            </div>
            <button class="btn btn-sm btn-danger" onclick="app.removeFromCart('${item.productId}')">Remove</button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <p>Subtotal: Rs ${subtotal.toFixed(2)}</p>
        <p>Tax (15%): Rs ${tax.toFixed(2)}</p>
        <h5>Total: Rs ${total.toFixed(2)}</h5>
      </div>
    `;
  }

  // =============== CHECKOUT ===============
  checkoutAvailable() {
    if (this.cart.length === 0) {
      alert('❌ Cart is empty');
      return false;
    }
    if (!this.currentUser) {
      alert('❌ Please login to checkout');
      this.openModal('loginModal');
      return false;
    }
    return true;
  }

  async handleCheckout(e) {
    e.preventDefault();

    if (!this.checkoutAvailable()) return;

    const form = e.target;
    const fullName = form.querySelector('[name="fullName"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const address = form.querySelector('[name="address"]').value;
    const city = form.querySelector('[name="city"]').value;
    const country = form.querySelector('[name="country"]').value;
    const postalCode = form.querySelector('[name="postalCode"]').value;
    const paymentMethod = form.querySelector('[name="paymentMethod"]').value;

    // Calculate order total
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const orderData = {
      customerName: fullName,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
      paymentMethod,
      items: this.cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal,
      tax,
      total,
      status: 'pending'
    };

    try {
      const response = await fetch(`${this.API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Order creation failed');
      }

      const order = await response.json();
      this.showOrderSuccess(order);
      this.cart = [];
      this.saveCart();
      this.closeModal('checkoutModal');
      form.reset();
    } catch (error) {
      alert('❌ ' + error.message);
    }
  }

  showOrderSuccess(order) {
    const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
    const content = document.getElementById('orderSuccessContent');
    if (content) {
      content.innerHTML = `
        <div class="alert alert-success">
          <h4>✓ Order Placed Successfully!</h4>
          <p><strong>Order #:</strong> ${order.orderNumber || order._id}</p>
          <p><strong>Total:</strong> Rs ${order.total}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p>You will receive confirmation at ${order.email}</p>
        </div>
      `;
    }
    modal.show();
  }

  // =============== ORDERS ===============
  async showMyOrders(e) {
    e.preventDefault();
    if (!this.currentUser) {
      alert('❌ Please login');
      return;
    }

    try {
      const response = await fetch(`${this.API_URL}/orders`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      if (!response.ok) throw new Error('Failed to load orders');
      const orders = await response.json();
      this.displayOrders(orders);
    } catch (error) {
      alert('❌ ' + error.message);
    }
  }

  displayOrders(orders) {
    const modal = new bootstrap.Modal(document.getElementById('ordersModal') || this.createOrdersModal());
    const content = document.getElementById('ordersContent') || document.querySelector('.orders-list');
    if (orders.length === 0) {
      content.innerHTML = '<p>No orders yet</p>';
    } else {
      content.innerHTML = orders.map(order => `
        <div class="order-card">
          <h6>Order #${order.orderNumber || order._id}</h6>
          <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Total: Rs ${order.total}</p>
          <p>Status: <span class="badge bg-info">${order.status}</span></p>
        </div>
      `).join('');
    }
    modal.show();
  }

  // =============== UTILITIES ===============
  openModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  }

  closeModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }
}

// Initialize app
const app = new MadameBoutique();
