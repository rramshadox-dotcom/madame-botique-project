
const cardsData = [
    // --- New Arrival ---
    { id: 101, category: 'newArrival', img: 'new1.webp', title: '2 Pc Co-Ord Set', price: 6590, oldPrice: 0, desc: 'A black blended cord set with modern cuts.', rating: 4 },
    { id: 102, category: 'newArrival', img: 'new2.webp', title: '3 Pc Embroidered Suit', price: 5210, oldPrice: 0, desc: 'Light purple embroidered linen suit for elegant evenings.', rating: 5 },
    { id: 103, category: 'newArrival', img: 'new3.webp', title: '3 Pc Printed Marina Suit', price: 8390, oldPrice: 0, desc: 'Digital printed marina suit with vibrant colors.', rating: 4 },
    { id: 104, category: 'newArrival', img: 'new4.webp', title: 'Emerald Tide', price: 7990, oldPrice: 0, desc: 'Rich emerald green outfit perfect for formal gatherings.', rating: 5 },
    { id: 105, category: 'newArrival', img: 'new5.webp', title: 'Lilac Fields', price: 6290, oldPrice: 0, desc: 'Front-open kurta with fabric buttons and soft lilac hue.', rating: 4 },
    { id: 106, category: 'newArrival', img: 'new6.webp', title: 'Honey Beige', price: 7990, oldPrice: 0, desc: 'Chic mocha mousse co-ord set for a trendy look.', rating: 4 },
    { id: 107, category: 'newArrival', img: 'new7.webp', title: 'Hursil Dress', price: 11999, oldPrice: 0, desc: 'Soft solid black velvet fabric with premium stitching.', rating: 5 },

    // --- Winter Collection ---
    { id: 201, category: 'winter', img: 'kaddar2.webp', title: '3Pc Embroidered Co-ords', price: 7750, oldPrice: 0, desc: 'Three-piece khaddar with delicate embroidery.', rating: 5 },
    { id: 202, category: 'winter', img: 'velvet1.webp', title: 'Velvet Kaftan Shirt', price: 8499, oldPrice: 0, desc: 'Opulent velvet kaftan shirt for winter parties.', rating: 4 },
    { id: 203, category: 'winter', img: 'velvet2.webp', title: 'Velvet Solid Set', price: 6600, oldPrice: 0, desc: 'Sleek solid velvet set, warm and stylish.', rating: 4 },
    { id: 204, category: 'winter', img: 'velvet3.webp', title: 'Embroidered 2Pc Velvet', price: 10867, oldPrice: 0, desc: 'Two-piece velvet ensemble with intricate details.', rating: 5 },
    { id: 205, category: 'winter', img: 'jacquard1.webp', title: '2Pc Lemon Blossom Jacquard', price: 7990, oldPrice: 0, desc: 'Intricate embroidered leaves on premium jacquard.', rating: 4 },
    { id: 206, category: 'winter', img: 'kaddar5.jpg', title: 'Khaddar Printed Dress', price: 4250, oldPrice: 0, desc: 'Printed khaddar dress comfortable for daily wear.', rating: 4 },
    { id: 207, category: 'winter', img: 'jacquard2.webp', title: '2Pc Grey Dawn Jacquard', price: 5025, oldPrice: 0, desc: 'Captivating grey ensemble for a subtle look.', rating: 4 },
    { id: 208, category: 'winter', img: 'kaddar3.webp', title: 'Embroidered 2Pc Khaddar', price: 4515, oldPrice: 0, desc: 'Two-piece khaddar co-ords with classic embroidery.', rating: 5 },
    { id: 209, category: 'winter', img: 'kaddar4.webp', title: '3Pc Khaddar Classic', price: 6396, oldPrice: 0, desc: 'Classic three-piece khaddar suit.', rating: 4 },
    { id: 210, category: 'winter', img: 'kotrai.jpg', title: '3Pc Kotrai Embroidered', price: 5499, oldPrice: 0, desc: 'Printed khaddar dress showcasing lively hues.', rating: 4 },
    { id: 211, category: 'winter', img: 'kaddar1.webp', title: '2Pc Khaddar Coords', price: 9560, oldPrice: 0, desc: 'Timeless khaddar co-ords set.', rating: 5 },

    // --- Summer ---
    { id: 301, category: 'summer', img: 'pic1.webp', title: '3 Pc Printed Lawn Suit', price: 3890, oldPrice: 0, desc: 'White floral print shirt with matching dupatta & pants.', rating: 4 },
    { id: 302, category: 'summer', img: 'pic2.webp', title: 'Green Floral Kurta Set', price: 2890, oldPrice: 0, desc: 'Green floral print kurta set with pants & dupatta.', rating: 5 },
    { id: 303, category: 'summer', img: 'pic3.webp', title: 'Cotton Viscose Tunic', price: 1495, oldPrice: 0, desc: 'Purple kurta with light blue pant.', rating: 4 },
    { id: 304, category: 'summer', img: 'pic4.webp', title: 'Cotton Silk 3 Pc Suit', price: 1194, oldPrice: 0, desc: 'Royal blue 3-piece outfit with printed kurta.', rating: 5 },
    { id: 305, category: 'summer', img: 'pic5.webp', title: 'Textured Dobby Cord Set', price: 2994, oldPrice: 0, desc: 'Printed 2-piece suit with straight kurta.', rating: 4 },
    { id: 306, category: 'summer', img: 'pic6.webp', title: 'Neckline Embroidered Lawn', price: 4290, oldPrice: 0, desc: 'Printed long kurta with matching trousers.', rating: 4 },
    { id: 307, category: 'summer', img: 'pic7.webp', title: 'Blue Lawn Suit', price: 3890, oldPrice: 0, desc: 'Blue lawn suit: embroidered top, matching pants.', rating: 5 },
    { id: 308, category: 'summer', img: 'pic8.webp', title: 'Embroidered Cotton Suit', price: 5313, oldPrice: 0, desc: 'Dark blue embroidered kurta with chiffon dupatta.', rating: 5 },
    { id: 309, category: 'summer', img: 'pic9.webp', title: 'Grey Floral Lawn', price: 3493, oldPrice: 0, desc: 'White kurta with gray floral embroidery.', rating: 5 },
    { id: 310, category: 'summer', img: 'pic10.webp', title: 'Gold Floral Lawn', price: 2793, oldPrice: 0, desc: 'Off-white kurta with golden floral embroidery.', rating: 5 },

    // --- Accessories ---
    { id: 401, category: 'accessories', img: 'Muffler.webp', title: 'Yarn Dyed Muffler', price: 3290, oldPrice: 0, desc: 'Soft and warm yarn-dyed muffler.', rating: 4 },
    { id: 402, category: 'accessories', img: 'handbag1.webp', title: 'Maroon Handbag', price: 5990, oldPrice: 0, desc: 'Stylish maroon handbag with gold accents.', rating: 4 },
    { id: 403, category: 'accessories', img: 'cuff bangle.webp', title: 'Cuff Bangle Gold', price: 590, oldPrice: 0, desc: 'Elegant gold-tone bangle.', rating: 3 },
    { id: 404, category: 'accessories', img: 'scarf.webp', title: 'Printed Scarf', price: 2495, oldPrice: 0, desc: 'Lightweight printed scarf.', rating: 4 },
    { id: 405, category: 'accessories', img: 'Earrings1.webp', title: 'Golden Hoop Earrings', price: 698, oldPrice: 0, desc: 'Classic hoop earrings.', rating: 4 },
    { id: 406, category: 'accessories', img: 'necklace2.jpg', title: 'Stone Necklace', price: 2195, oldPrice: 0, desc: 'Layered necklace with rose & green stones.', rating: 4 },
    { id: 407, category: 'accessories', img: 'necklace1.webp', title: 'Brass Necklace', price: 1795, oldPrice: 0, desc: 'Elegant gold-plated brass necklace.', rating: 4 },
    { id: 408, category: 'accessories', img: 'Stone Earrings.webp', title: 'Pearl Pink Earrings', price: 1695, oldPrice: 0, desc: 'Elegant pearl earrings with pink stones.', rating: 4 },
    { id: 409, category: 'accessories', img: 'handbag2.webp', title: 'Black Shoulder Bag', price: 2990, oldPrice: 0, desc: 'Classic black shoulder bag.', rating: 4 },
    { id: 410, category: 'accessories', img: 'coat.webp', title: 'Brown Long Coat', price: 18990, oldPrice: 0, desc: 'Warm long coat made with premium wool.', rating: 5 },

    // --- Sale Collection ---
    { id: 501, category: 'sale', img: 'pic1.webp', title: 'Embroidered Lawn Suit', price: 3990, oldPrice: 5990, discount: '33% OFF', desc: 'Beautiful embroidered lawn suit on sale.', rating: 5 },
    { id: 502, category: 'sale', img: 'kaddar4.webp', title: 'Velvet Shawl', price: 2499, oldPrice: 3999, discount: '38% OFF', desc: 'Premium velvet shawl – limited offer.', rating: 4 },
    { id: 503, category: 'sale', img: 'new4.webp', title: 'Emerald Sale Suit', price: 3990, oldPrice: 5990, discount: '33% OFF', desc: 'Rich emerald suit on discount.', rating: 5 },
    { id: 504, category: 'sale', img: 'pic7.webp', title: 'Blue Lawn Sale', price: 2499, oldPrice: 3999, discount: '38% OFF', desc: 'Premium lawn suit – limited offer.', rating: 4 },
    { id: 505, category: 'sale', img: 'velvet2.webp', title: 'Velvet Set Sale', price: 3990, oldPrice: 5990, discount: '33% OFF', desc: 'Sleek velvet set on sale.', rating: 5 },
    { id: 506, category: 'sale', img: 'new3.webp', title: 'Marina Suit Sale', price: 2499, oldPrice: 3999, discount: '38% OFF', desc: 'Printed marina suit – limited offer.', rating: 4 },
];

let cart = [];
let currentDetailProduct = null;
let selectedSize = null;


document.addEventListener("DOMContentLoaded", () => {
    initializeCart();
    initializeLogin();
    showHomepage(); 
    initializeMobileMenu();
    initializeCartDropdown();
    initializeSliders();
});

// Initialize cart from localStorage
function initializeCart() {
    try {
        const savedCart = localStorage.getItem("cart");
        cart = savedCart ? JSON.parse(savedCart) : [];
        updateCartUI();
    } catch (error) {
        console.error("Error loading cart:", error);
        cart = [];
    }
}

// Initialize mobile menu toggle
function initializeMobileMenu() {
    const toggleBtn = document.getElementById('toggle');
    const menu = document.getElementById('menu');
    
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }
}

// Initialize cart dropdown toggle
function initializeCartDropdown() {
    const cartIcon = document.getElementById('cartIcon');
    const cartDropdown = document.getElementById('cartDropdown');
    
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-btn')) {
                cartDropdown.classList.toggle('active');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartIcon.contains(e.target)) {
                cartDropdown.classList.remove('active');
            }
        });
    }
}


function initializeLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const signinText = document.getElementById('signinText');
    const loginModal = document.getElementById('loginModal');
    
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn) {
        const email = localStorage.getItem('email');
        if (signinText) {
            signinText.textContent = email || 'User';
            signinText.style.cursor = 'pointer';
            signinText.onclick = logout;
            signinText.removeAttribute('data-bs-toggle');
            signinText.removeAttribute('data-bs-target');
        }
    }
    

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const loginUsername = document.getElementById('loginUsername');
            const loginPassword = document.getElementById('loginPassword');
            
            const email = loginUsername ? loginUsername.value.trim() : '';
            const password = loginPassword ? loginPassword.value.trim() : '';
            
            if (!email || !password) {
                alert('Please enter email and password');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Save login state
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('email', email);
            
            // Update UI
            if (signinText) {
                signinText.textContent = email;
                signinText.style.cursor = 'pointer';
                signinText.onclick = logout;
                signinText.removeAttribute('data-bs-toggle');
                signinText.removeAttribute('data-bs-target');
            }
            
            // Clear form
            if (loginUsername) loginUsername.value = '';
            if (loginPassword) loginPassword.value = '';
            
            // Close modal
            if (loginModal) {
                loginModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
            }
            
            // Show alert
            alert('Welcome! Login successful');
        });
    }
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('email');
    
    const signinText = document.getElementById('signinText');
    signinText.textContent = 'Sign in';
    signinText.setAttribute('data-bs-toggle', 'modal');
    signinText.setAttribute('data-bs-target', '#loginModal');
    signinText.onclick = null;
    signinText.style.cursor = 'pointer';
    
    alert('You have been logged out');
}


function initializeSliders() {
    initializeHeroSlider();
    initializePartnersSlider();
}

function initializeHeroSlider() {
    let heroIndex = 1; // Default to SALE slide
    const slides = document.getElementById("slides");
    
    if (!slides) return;

    // Set initial position
    slides.style.transform = "translateX(-100%)";
    updateActiveOption();

    function updateActiveOption() {
        const options = document.querySelectorAll(".options-bar span");
        options.forEach(el => el.classList.remove("active"));

        const activeId = heroIndex === 0 ? "summer" : heroIndex === 1 ? "sale" : "winter";
        const activeEl = document.getElementById(activeId);
        if (activeEl) activeEl.classList.add("active");
    }

    // Navigation functions
    window.next = function() {
        heroIndex = (heroIndex + 1) % 3;
        slides.style.transform = `translateX(-${heroIndex * 100}%)`;
        updateActiveOption();
    };

    window.prev = function() {
        heroIndex = (heroIndex - 1 + 3) % 3;
        slides.style.transform = `translateX(-${heroIndex * 100}%)`;
        updateActiveOption();
    };

    window.goTo = function(i) {
        heroIndex = i;
        slides.style.transform = `translateX(-${heroIndex * 100}%)`;
        updateActiveOption();
    };

    // Auto-advance slider every 5 seconds
    setInterval(() => {
        window.next();
    }, 5000);
}

function initializePartnersSlider() {
    const track = document.getElementById("track");
    const partnerSlides = document.querySelectorAll(".partner");
    const leftBtn = document.querySelector(".partners-slider .arrow.left");
    const rightBtn = document.querySelector(".partners-slider .arrow.right");

    if (!track || partnerSlides.length === 0) return;

    let partnerIndex = 0;
    let visible = 3;
    let slideWidth = partnerSlides[0].offsetWidth;

    function setVisible() {
        if (window.innerWidth <= 600) visible = 1;
        else if (window.innerWidth <= 1024) visible = 2;
        else visible = 3;

        slideWidth = partnerSlides[0].offsetWidth;
        updateSlide();
    }

    function updateSlide() {
        track.style.transform = `translateX(-${partnerIndex * slideWidth}px)`;
    }

    // Auto Scroll
    let autoSlide = setInterval(() => {
        partnerIndex++;
        if (partnerIndex > partnerSlides.length - visible) partnerIndex = 0;
        updateSlide();
    }, 3000);

    // Arrow Controls
    if (rightBtn) {
        rightBtn.onclick = () => {
            partnerIndex++;
            if (partnerIndex > partnerSlides.length - visible) partnerIndex = 0;
            updateSlide();
        };
    }

    if (leftBtn) {
        leftBtn.onclick = () => {
            partnerIndex--;
            if (partnerIndex < 0) partnerIndex = partnerSlides.length - visible;
            updateSlide();
        };
    }

    // Pause on Hover
    track.addEventListener("mouseenter", () => clearInterval(autoSlide));
    track.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            partnerIndex++;
            if (partnerIndex > partnerSlides.length - visible) partnerIndex = 0;
            updateSlide();
        }, 3000);
    });

    window.addEventListener("resize", setVisible);
    setVisible();
}



// Show homepage with only sale section
function showHomepage() {
    const homeView = document.getElementById('home-view');
    const productView = document.getElementById('product-view');
    const contactView = document.getElementById('contact-view');
    const saleSection = document.getElementById('sale-section');
    const categoryHeader = document.querySelector('.category-header');
    const grid = document.getElementById('collection-grid');
    const gallerySection = document.getElementById('gallerySection');

    if (homeView) homeView.style.display = 'block';
    if (productView) productView.style.display = 'none';
    if (contactView) contactView.style.display = 'none';
    if (saleSection) saleSection.style.display = 'block';
    if (categoryHeader) categoryHeader.style.display = 'none';
    if (grid) grid.style.display = 'none';
    if (gallerySection) gallerySection.style.display = 'none';

    const menu = document.getElementById('menu');
    if (menu) menu.classList.remove('active');
}

function showHome(category = 'newArrival') {
    // Show/hide views
    const homeView = document.getElementById('home-view');
    const productView = document.getElementById('product-view');
    const contactView = document.getElementById('contact-view');
    const gallerySection = document.getElementById('gallerySection');
    const grid = document.getElementById('collection-grid');
    const saleSection = document.getElementById('sale-section');

    if (homeView) homeView.style.display = 'block';
    if (productView) productView.style.display = 'none';
    if (contactView) contactView.style.display = 'none';

    // Close mobile menu if open
    const menu = document.getElementById('menu');
    if (menu) menu.classList.remove('active');

    // Update category heading
    updateCategoryHeading(category);

    // Hide sale section when showing product categories
    if (saleSection) saleSection.style.display = 'none';

    // Handle gallery vs products
    if (category === 'gallery') {
        if (gallerySection) gallerySection.style.display = 'block';
        if (grid) grid.style.display = 'none';
        // Hide category header for gallery
        const categoryHeader = document.querySelector('.category-header');
        if (categoryHeader) categoryHeader.style.display = 'none';
    } else {
        if (gallerySection) gallerySection.style.display = 'none';
        if (grid) grid.style.display = 'flex';
        // Show category header for products
        const categoryHeader = document.querySelector('.category-header');
        if (categoryHeader) categoryHeader.style.display = 'block';
        
        filterCategory(category);
    }

    // Smooth scroll to products section instead of top
    if (homeView) {
        homeView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Update category heading based on selected category
function updateCategoryHeading(category) {
    const categoryTitle = document.getElementById('categoryTitle');
    const categorySubtitle = document.getElementById('categorySubtitle');
    
    if (!categoryTitle || !categorySubtitle) return;

    const headings = {
        'newArrival': {
            title: 'New Arrivals',
            subtitle: 'Discover our latest collection of elegant fashion pieces'
        },
        'sale': {
            title: 'Sale Collection',
            subtitle: "Don't miss out on our exclusive deals and discounts"
        },
        'summer': {
            title: 'Summer Collection',
            subtitle: 'Light and breezy outfits perfect for warm weather'
        },
        'winter': {
            title: 'Winter Collection',
            subtitle: 'Cozy and elegant pieces for the cold season'
        },
        'accessories': {
            title: 'Accessories',
            subtitle: 'Complete your look with our stunning accessories'
        },
        'all': {
            title: 'All Products',
            subtitle: 'Browse our complete collection'
        }
    };

    const heading = headings[category] || headings['newArrival'];
    categoryTitle.textContent = heading.title;
    categorySubtitle.textContent = heading.subtitle;
}

function showContact() {
    const homeView = document.getElementById('home-view');
    const productView = document.getElementById('product-view');
    const contactView = document.getElementById('contact-view');
    const menu = document.getElementById('menu');

    if (productView) productView.style.display = 'none';
    if (contactView) contactView.style.display = 'block';
    if (menu) menu.classList.remove('active');

    // Scroll to contact section
    if (contactView) {
        contactView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function filterCategory(category) {
    const grid = document.getElementById('collection-grid');
    const gallery = document.getElementById('gallerySection');
    
    if (!grid) return;

    // Clear existing content
    grid.innerHTML = "";

    // Hide gallery when showing products
    if (gallery) gallery.style.display = 'none';
    grid.style.display = 'flex';

    // Filter products by category
    const filtered = cardsData.filter(p => p.category === category || category === 'all');

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No products found in this category.</p></div>';
        return;
    }

    // Render each product card
    filtered.forEach(p => {
        const stars = generateStars(p.rating);
        const priceHTML = generatePriceHTML(p);
        const badge = p.oldPrice > 0 ? `<span class="sale-badge">${p.discount || 'SALE'}</span>` : '';

        grid.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    ${badge}
                    <img src="${p.img}" class="card-img-top" alt="${p.title}" onclick="openProduct(${p.id})" style="cursor: pointer;">
                    <div class="card-body text-center">
                        <div class="star-rating">${stars}</div>
                        <h5 class="card-title" style="font-size:16px; font-weight:600;">${p.title}</h5>
                        <p class="card-text">${priceHTML}</p>
                        <button class="btn btn-pink btn-sm mt-2" onclick="openProduct(${p.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    console.log(`Loaded ${filtered.length} products for category: ${category}`);
}

// Helper function to generate star rating HTML
function generateStars(rating) {
    return '<i class="fa-solid fa-star"></i>'.repeat(rating) + 
           '<i class="fa-regular fa-star"></i>'.repeat(5 - rating);
}


function generatePriceHTML(product) {
    if (product.oldPrice > 0) {
        return `<span class="old-price">PKR ${product.oldPrice}</span> <span class="sale-price">PKR ${product.price}</span>`;
    }
    return `<span class="sale-price">PKR ${product.price}</span>`;
}


function openProduct(id) {
    const product = cardsData.find(p => p.id === id);
    if (!product) return;

    currentDetailProduct = product;
    selectedSize = null;

    // Populate details
    const detailImg = document.getElementById('detail-img');
    const detailTitle = document.getElementById('detail-title');
    const detailPrice = document.getElementById('detail-price');
    const detailDesc = document.getElementById('detail-desc');
    const detailRating = document.getElementById('detail-rating');

    if (detailImg) detailImg.src = product.img;
    if (detailTitle) detailTitle.innerText = product.title;
    if (detailPrice) detailPrice.innerText = `PKR ${product.price}`;
    if (detailDesc) detailDesc.innerText = product.desc;
    if (detailRating) detailRating.innerHTML = generateStars(product.rating);

    // Reset size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('btn-dark', 'text-white');
        btn.classList.add('btn-outline-dark');
    });

    // Switch views
    const homeView = document.getElementById('home-view');
    const contactView = document.getElementById('contact-view');
    const productView = document.getElementById('product-view');

    if (homeView) homeView.style.display = 'none';
    if (contactView) contactView.style.display = 'none';
    if (productView) {
        productView.style.display = 'block';
        // Scroll immediately to product view
        setTimeout(() => {
            productView.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 0);
    }

    loadRelated(product.category);
}

// Size selection
function selectSize(btn, size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(b => {
        b.classList.remove('btn-dark', 'text-white');
        b.classList.add('btn-outline-dark');
    });
    btn.classList.remove('btn-outline-dark');
    btn.classList.add('btn-dark', 'text-white');
}

// Load related products
function loadRelated(cat) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;

    relatedContainer.innerHTML = "";
    
    const related = cardsData
        .filter(p => p.category === cat && p.id !== currentDetailProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        relatedContainer.innerHTML = '<p class="text-muted text-center col-12">No related products found.</p>';
        return;
    }

    related.forEach(p => {
        const stars = generateStars(p.rating);

        relatedContainer.innerHTML += `
            <div class="col-6 col-md-3 mb-3">
                <div class="card h-100">
                    <img src="${p.img}" class="card-img-top" style="height:200px; object-fit:cover; cursor:pointer;" onclick="openProduct(${p.id})">
                    <div class="card-body text-center p-2">
                        <div class="star-rating" style="font-size:12px;">${stars}</div>
                        <h6 class="card-title" style="font-size:14px; margin-bottom:5px;">${p.title}</h6>
                        <small class="fw-bold text-pink">PKR ${p.price}</small>
                        
                        <div class="d-grid gap-2 mt-2">
                             <button class="btn btn-theme btn-sm" style="font-size:12px; padding:2px 5px;" onclick="openProduct(${p.id})">View</button>
                             <button class="btn btn-pink btn-sm" style="font-size:12px; padding:2px 5px;" onclick="addRelatedToCart(${p.id})">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToCartFromDetail() {
    if (!currentDetailProduct) return;

    // Validate size (except accessories and sale items)
    if (!selectedSize && currentDetailProduct.category !== 'accessories') {
        alert("Please select a size first!");
        return;
    }

    const item = {
        id: currentDetailProduct.id,
        title: currentDetailProduct.title,
        price: currentDetailProduct.price,
        img: currentDetailProduct.img,
        size: selectedSize || "One Size"
    };

    cart.push(item);
    saveCart();
    updateCartUI();
    alert("Added to cart!");
}

function addRelatedToCart(id) {
    const product = cardsData.find(p => p.id === id);
    if (!product) return;

    const item = {
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img,
        size: "One Size"
    };

    cart.push(item);
    saveCart();
    updateCartUI();
    alert("Added to cart!");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart:", error);
    }
}

function updateCartUI() {
    const countBadge = document.getElementById('cartCount');
    if (countBadge) countBadge.innerText = cart.length;
    
    const dropdown = document.getElementById('cartDropdown');
    if (!dropdown) return;

    if (cart.length === 0) {
        dropdown.innerHTML = '<p class="text-center m-0">Cart is empty</p>';
        return;
    }

    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}">
                <div style="flex:1">
                    <div style="font-size:13px; font-weight:600;">${item.title}</div>
                    <div style="font-size:12px;">Size: ${item.size} | PKR ${item.price}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });
    
    html += `<div class="text-end fw-bold pt-2 border-top">Total: PKR ${total.toLocaleString()}</div>`;
    html += `<button class="btn btn-pink w-100 mt-2 btn-sm">Checkout</button>`;
    dropdown.innerHTML = html;
}


function togglePassword() {
    const pass = document.getElementById("loginPassword");
    if (pass) {
        pass.type = pass.type === "password" ? "text" : "password";
    }
}

// Make functions globally accessible
window.showHome = showHome;
window.showContact = showContact;
window.openProduct = openProduct;
window.selectSize = selectSize;
window.addToCartFromDetail = addToCartFromDetail;
window.addRelatedToCart = addRelatedToCart;
window.removeFromCart = removeFromCart;
window.togglePassword = togglePassword;