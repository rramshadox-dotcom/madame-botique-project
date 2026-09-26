// Enhanced script.js with Backend Integration
// Place this BEFORE the original script.js loads

(function() {
  // Backup: in-memory product data (fallback if API fails)
  const fallbackCardsData = [
    { id: 101, category: 'newArrival', img: 'new1.webp', title: '2 Pc Co-Ord Set', price: 6590, oldPrice: 0, desc: 'A black blended cord set with modern cuts.', rating: 4 },
    { id: 102, category: 'newArrival', img: 'new2.webp', title: '3 Pc Embroidered Suit', price: 5210, oldPrice: 0, desc: 'Light purple embroidered linen suit for elegant evenings.', rating: 5 },
    { id: 103, category: 'newArrival', img: 'new3.webp', title: '3 Pc Printed Marina Suit', price: 8390, oldPrice: 0, desc: 'Digital printed marina suit with vibrant colors.', rating: 4 },
    { id: 104, category: 'newArrival', img: 'new4.webp', title: 'Emerald Tide', price: 7990, oldPrice: 0, desc: 'Rich emerald green outfit perfect for formal gatherings.', rating: 5 },
    { id: 105, category: 'newArrival', img: 'new5.webp', title: 'Lilac Fields', price: 6290, oldPrice: 0, desc: 'Front-open kurta with fabric buttons and soft lilac hue.', rating: 4 },
    { id: 106, category: 'newArrival', img: 'new6.webp', title: 'Honey Beige', price: 7990, oldPrice: 0, desc: 'Chic mocha mousse co-ord set for a trendy look.', rating: 4 },
    { id: 107, category: 'newArrival', img: 'new7.webp', title: 'Hursil Dress', price: 11999, oldPrice: 0, desc: 'Soft solid black velvet fabric with premium stitching.', rating: 5 },
  ];

  // Load products from backend on page load
  async function loadProductsFromBackend() {
    if (!window.MadameAPI) {
      console.warn('Backend API not available, using fallback data');
      return fallbackCardsData;
    }
    
    try {
      const products = await window.MadameAPI.getProducts();
      console.log('✓ Loaded products from backend');
      return products;
    } catch (error) {
      console.warn('Backend error, using fallback data:', error.message);
      return fallbackCardsData;
    }
  }

  // Override cardsData after DOM is ready
  window.addEventListener('DOMContentLoaded', async () => {
    const products = await loadProductsFromBackend();
    window.cardsData = products;
    
    // Re-render if page already loaded
    if (window.filterCategory) {
      window.filterCategory('newArrival');
    }
  });
})();
