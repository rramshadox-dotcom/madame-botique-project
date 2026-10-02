/**
 * Madame Boutique - Checkout & Authentication Module
 * Handles user authentication, checkout, and order placement
 * Integrates with existing cart system and backend API
 */

const MADAME_CONFIG = {
  API_URL: window.MADAME_API_URL || 'http://localhost:5000/api',
  AUTH_TOKEN_KEY: 'madame_auth_token',
  USER_KEY: 'madame_user'
};

// ==================== AUTHENTICATION ====================

function initAuthSystem() {
  console.log('🔐 Initializing authentication system');
  
  // Check if user is already logged in
  const token = localStorage.getItem(MADAME_CONFIG.AUTH_TOKEN_KEY);
  const user = localStorage.getItem(MADAME_CONFIG.USER_KEY);
  
  if (token && user) {
    window.MADAME_CURRENT_USER = JSON.parse(user);
    window.MADAME_AUTH_TOKEN = token;
    updateAuthUI();
  }
  
  // Setup event listeners
  setupAuthListeners();
}

function setupAuthListeners() {
  // Sign Up form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
  
  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Checkout form
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckout);
  }
  
  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

async function handleSignup(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = form.querySelector('[name="signup_name"]').value.trim();
  const email = form.querySelector('[name="signup_email"]').value.trim();
  const password = form.querySelector('[name="signup_password"]').value;
  const confirmPassword = form.querySelector('[name="signup_confirm_password"]').value;
  
  // Validation
  if (!name || !email || !password) {
    alert('❌ Please fill all fields');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('❌ Passwords do not match');
    return;
  }
  
  if (password.length < 6) {
    alert('❌ Password must be at least 6 characters');
    return;
  }
  
  if (!email.includes('@')) {
    alert('❌ Please enter a valid email');
    return;
  }
  
  try {
    console.log('📝 Attempting to sign up...');
    
    const response = await fetch(`${MADAME_CONFIG.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Sign up failed');
    }
    
    // Store auth data
    localStorage.setItem(MADAME_CONFIG.AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(MADAME_CONFIG.USER_KEY, JSON.stringify(data.user));
    
    window.MADAME_CURRENT_USER = data.user;
    window.MADAME_AUTH_TOKEN = data.token;
    
    alert('✅ Account created successfully! Welcome to Madame Boutique.');
    
    // Close signup modal
    const signupModal = document.getElementById('signupModal');
    if (signupModal) {
      const modal = bootstrap.Modal.getInstance(signupModal);
      if (modal) modal.hide();
    }
    
    // Clear form
    form.reset();
    
    // Update UI
    updateAuthUI();
    
    // Proceed to checkout if coming from there
    if (window.MADAME_CHECKOUT_PENDING) {
      window.MADAME_CHECKOUT_PENDING = false;
      showCheckoutModal();
    }
  } catch (error) {
    console.error('❌ Sign up error:', error);
    alert('❌ ' + error.message);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  
  const form = e.target;
  const email = form.querySelector('[name="login_email"]').value.trim();
  const password = form.querySelector('[name="login_password"]').value;
  
  if (!email || !password) {
    alert('❌ Please enter email and password');
    return;
  }
  
  try {
    console.log('🔓 Attempting to log in...');
    
    const response = await fetch(`${MADAME_CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Store auth data
    localStorage.setItem(MADAME_CONFIG.AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(MADAME_CONFIG.USER_KEY, JSON.stringify(data.user));
    
    window.MADAME_CURRENT_USER = data.user;
    window.MADAME_AUTH_TOKEN = data.token;
    
    alert('✅ Welcome back, ' + data.user.name + '!');
    
    // Close login modal
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      const modal = bootstrap.Modal.getInstance(loginModal);
      if (modal) modal.hide();
    }
    
    // Clear form
    form.reset();
    
    // Update UI
    updateAuthUI();
    
    // Proceed to checkout if coming from there
    if (window.MADAME_CHECKOUT_PENDING) {
      window.MADAME_CHECKOUT_PENDING = false;
      showCheckoutModal();
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    alert('❌ ' + error.message);
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    localStorage.removeItem(MADAME_CONFIG.AUTH_TOKEN_KEY);
    localStorage.removeItem(MADAME_CONFIG.USER_KEY);
    
    window.MADAME_CURRENT_USER = null;
    window.MADAME_AUTH_TOKEN = null;
    
    alert('✅ Logged out successfully');
    updateAuthUI();
    
    // Close any open auth modals
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const checkoutModal = document.getElementById('checkoutModal');
    
    if (loginModal && bootstrap.Modal.getInstance(loginModal)) {
      bootstrap.Modal.getInstance(loginModal).hide();
    }
    if (signupModal && bootstrap.Modal.getInstance(signupModal)) {
      bootstrap.Modal.getInstance(signupModal).hide();
    }
    if (checkoutModal && bootstrap.Modal.getInstance(checkoutModal)) {
      bootstrap.Modal.getInstance(checkoutModal).hide();
    }
  }
}

function updateAuthUI() {
  const authContainer = document.getElementById('authContainer');
  
  if (!authContainer) return;
  
  if (window.MADAME_CURRENT_USER) {
    // User is logged in
    authContainer.innerHTML = `
      <div class="auth-logged-in">
        <span class="user-name">👤 ${window.MADAME_CURRENT_USER.name}</span>
        <button class="auth-btn auth-btn-logout" id="logoutBtn">Logout</button>
      </div>
    `;
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  } else {
    // User is not logged in
    authContainer.innerHTML = `
      <button class="auth-btn auth-btn-login" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
      <button class="auth-btn auth-btn-signup" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
    `;
  }
}

// ==================== CHECKOUT ====================

function proceedToCheckout() {
  console.log('🛒 Proceeding to checkout...');
  
  // Check if cart has items
  if (!window.cart || window.cart.length === 0) {
    alert('❌ Your cart is empty. Please add products before checkout.');
    return;
  }
  
  // Check if user is logged in
  if (!window.MADAME_CURRENT_USER || !window.MADAME_AUTH_TOKEN) {
    // User not logged in - show login/signup modal
    alert('📝 Please login or create an account to proceed with checkout.');
    
    window.MADAME_CHECKOUT_PENDING = true;
    
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      new bootstrap.Modal(loginModal).show();
    }
    return;
  }
  
  // User is logged in - show checkout modal
  showCheckoutModal();
}

function showCheckoutModal() {
  console.log('📋 Showing checkout form...');
  
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    // Pre-fill email if logged in
    const emailField = document.querySelector('[name="checkout_email"]');
    const nameField = document.querySelector('[name="checkout_name"]');
    
    if (emailField && window.MADAME_CURRENT_USER) {
      emailField.value = window.MADAME_CURRENT_USER.email;
    }
    if (nameField && window.MADAME_CURRENT_USER) {
      nameField.value = window.MADAME_CURRENT_USER.name;
    }
    
    new bootstrap.Modal(checkoutModal).show();
  }
}

async function handleCheckout(e) {
  e.preventDefault();
  
  if (!window.MADAME_CURRENT_USER || !window.MADAME_AUTH_TOKEN) {
    alert('❌ You must be logged in to place an order.');
    return;
  }
  
  if (!window.cart || window.cart.length === 0) {
    alert('❌ Your cart is empty.');
    return;
  }
  
  // Get form data
  const form = e.target;
  const fullName = form.querySelector('[name="checkout_name"]').value.trim();
  const email = form.querySelector('[name="checkout_email"]').value.trim();
  const phone = form.querySelector('[name="checkout_phone"]').value.trim();
  const address = form.querySelector('[name="checkout_address"]').value.trim();
  const city = form.querySelector('[name="checkout_city"]').value.trim();
  const country = form.querySelector('[name="checkout_country"]').value.trim();
  const postalCode = form.querySelector('[name="checkout_postal"]').value.trim();
  const paymentMethod = form.querySelector('[name="checkout_payment"]').value;
  const orderNotes = form.querySelector('[name="checkout_notes"]')?.value.trim() || '';
  
  // Validation
  if (!fullName || !email || !phone || !address || !city || !country) {
    alert('❌ Please fill all required fields');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('❌ Please enter a valid email address');
    return;
  }
  
  if (!isValidPhone(phone)) {
    alert('❌ Please enter a valid phone number');
    return;
  }
  
  if (!paymentMethod) {
    alert('❌ Please select a payment method');
    return;
  }
  
  try {
    console.log('💳 Creating order...');
    
    // Prepare order data
    const orderData = {
      customerName: fullName,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
      paymentMethod,
      orderNotes,
      items: window.cart.map(item => ({
        name: item.name,
        quantity: parseInt(item.quantity) || 1,
        price: parseFloat(item.price) || 0
      }))
    };
    
    // Send to backend
    const response = await fetch(`${MADAME_CONFIG.API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.MADAME_AUTH_TOKEN}`
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order');
    }
    
    console.log('✅ Order created:', data);
    
    // Show success message
    showOrderSuccess(data);
    
    // Clear cart
    window.cart = [];
    localStorage.removeItem('cart');
    if (typeof updateCartUI === 'function') {
      updateCartUI();
    }
    
    // Close checkout modal
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
      const modal = bootstrap.Modal.getInstance(checkoutModal);
      if (modal) modal.hide();
    }
    
    // Clear form
    form.reset();
    
  } catch (error) {
    console.error('❌ Checkout error:', error);
    alert('❌ Error placing order: ' + error.message);
  }
}

function showOrderSuccess(order) {
  const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
  const content = document.getElementById('orderSuccessContent');
  
  if (content) {
    const orderStatus = order.status || 'pending';
    const orderNumber = order.orderNumber || order._id;
    const total = order.total ? order.total.toFixed(2) : '0.00';
    
    content.innerHTML = `
      <div class="order-success">
        <div class="success-icon">✅</div>
        <h3>Order Placed Successfully!</h3>
        <p>Thank you for your purchase, ${window.MADAME_CURRENT_USER?.name}!</p>
        
        <div class="order-details">
          <div class="detail-row">
            <span class="label">Order Number:</span>
            <span class="value">${orderNumber}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Amount:</span>
            <span class="value">Rs ${total}</span>
          </div>
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value badge bg-info">${orderStatus}</span>
          </div>
          <div class="detail-row">
            <span class="label">Confirmation sent to:</span>
            <span class="value">${order.email || window.MADAME_CURRENT_USER?.email}</span>
          </div>
        </div>
        
        <p class="success-message">We will contact you soon with delivery details.</p>
      </div>
    `;
  }
  
  modal.show();
}

// ==================== UTILITIES ====================

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  // Remove spaces and special characters
  const cleaned = phone.replace(/\D/g, '');
  // Accept 10+ digit phone numbers
  return cleaned.length >= 10;
}

function openAuthModal(type) {
  if (type === 'login') {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
  } else if (type === 'signup') {
    const modal = new bootstrap.Modal(document.getElementById('signupModal'));
    modal.show();
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthSystem);
} else {
  initAuthSystem();
}
