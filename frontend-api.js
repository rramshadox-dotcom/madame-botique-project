/*
 * Madame Boutique Frontend API Client
 * Connects frontend to backend
 */

(function () {
  const API_URL = window.MADAME_API_URL || 'http://localhost:5000/api';

  async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(`${API_URL}${path}`, { ...options, headers });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Request failed');
      return data;
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  }

  window.MadameAPI = {
    url: API_URL,
    getProducts: (category = '') => apiRequest(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    getProduct: (id) => apiRequest(`/products/${id}`),
    register: (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    createOrder: (payload) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(payload) }),
    getOrders: () => apiRequest('/orders'),
    getOrder: (id) => apiRequest(`/orders/${id}`),
    submitContact: (payload) => apiRequest('/contact', { method: 'POST', body: JSON.stringify(payload) })
  };

  console.log('✓ Madame Boutique API Client loaded. Use window.MadameAPI to call backend.');
})();
