/*
 * Optional frontend API client.
 * Load this file before script.js and set window.MADAME_API_URL when the
 * frontend and backend are hosted on different origins.
 */
(function () {
  const API_URL = window.MADAME_API_URL || 'http://localhost:5000/api';

  async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  window.MadameAPI = {
    url: API_URL,
    getProducts: (category = '') => apiRequest(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    getProduct: (id) => apiRequest(`/products/${id}`),
    register: (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    createOrder: (payload, token) => apiRequest('/orders', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) }),
    submitContact: (payload) => apiRequest('/contact', { method: 'POST', body: JSON.stringify(payload) })
  };
})();
