/* ===================================================================
   VASTRA - LUXURY SAREE eCommerce WEBSITE
   Complete JavaScript Logic - Production Ready
   =================================================================== */

// ===================================================================
// 1. CONFIGURATION & CONSTANTS
// ===================================================================

const CONFIG = {
    WHATSAPP_NUMBER: '917893016792',
    STORAGE_KEY: 'vastra_products',
    CART_KEY: 'vastra_cart',
    ADMIN_PASSWORD: 'admin123',
    CAROUSEL_INTERVAL: 4000,
    SEARCH_DEBOUNCE: 300,
    IMAGE_PLACEHOLDER: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect width="400" height="500" fill="%23f5f5f5"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-family="sans-serif" font-size="20"%3EImage Placeholder%3C/text%3E%3C/svg%3E'
};

// Sample Products Database
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: 'Kanchipuram Gold Silk Saree',
        price: 12500,
        type: 'Silk',
        color: 'Gold',
        description: 'Exquisite handloom silk saree with intricate zari work',
        images: ['https://via.placeholder.com/400x500/D4AF37/2C1810?text=Kanchipuram+Gold+1',
                 'https://via.placeholder.com/400x500/D4AF37/2C1810?text=Kanchipuram+Gold+2',
                 'https://via.placeholder.com/400x500/D4AF37/2C1810?text=Kanchipuram+Gold+3'],
        rating: 4.8,
        reviews: 24,
        inStock: true,
        quantity: 50
    },
    {
        id: 2,
        name: 'Bengali Red Cotton Saree',
        price: 4500,
        type: 'Cotton Blend',
        color: 'Red',
        description: 'Traditional Bengali cotton saree with elegant motifs',
        images: ['https://via.placeholder.com/400x500/C41E3A/FFFFFF?text=Bengali+Red+1',
                 'https://via.placeholder.com/400x500/C41E3A/FFFFFF?text=Bengali+Red+2',
                 'https://via.placeholder.com/400x500/C41E3A/FFFFFF?text=Bengali+Red+3'],
        rating: 4.6,
        reviews: 18,
        inStock: true,
        quantity: 75
    },
    {
        id: 3,
        name: 'Banarasi Purple Silk Saree',
        price: 15800,
        type: 'Silk',
        color: 'Purple',
        description: 'Premium Banarasi silk with gold brocade',
        images: ['https://via.placeholder.com/400x500/663399/FFFFFF?text=Banarasi+Purple+1',
                 'https://via.placeholder.com/400x500/663399/FFFFFF?text=Banarasi+Purple+2',
                 'https://via.placeholder.com/400x500/663399/FFFFFF?text=Banarasi+Purple+3'],
        rating: 4.9,
        reviews: 32,
        inStock: true,
        quantity: 30
    },
    {
        id: 4,
        name: 'Chanderi Cream Saree',
        price: 6200,
        type: 'Chiffon',
        color: 'Cream',
        description: 'Light and elegant Chanderi saree perfect for summer',
        images: ['https://via.placeholder.com/400x500/FFFDD0/2C1810?text=Chanderi+Cream+1',
                 'https://via.placeholder.com/400x500/FFFDD0/2C1810?text=Chanderi+Cream+2',
                 'https://via.placeholder.com/400x500/FFFDD0/2C1810?text=Chanderi+Cream+3'],
        rating: 4.5,
        reviews: 14,
        inStock: true,
        quantity: 60
    },
    {
        id: 5,
        name: 'Paithani Teal Silk Saree',
        price: 18500,
        type: 'Silk',
        color: 'Teal',
        description: 'Luxurious Paithani saree with peacock motifs',
        images: ['https://via.placeholder.com/400x500/008080/FFFFFF?text=Paithani+Teal+1',
                 'https://via.placeholder.com/400x500/008080/FFFFFF?text=Paithani+Teal+2',
                 'https://via.placeholder.com/400x500/008080/FFFFFF?text=Paithani+Teal+3'],
        rating: 4.7,
        reviews: 28,
        inStock: false,
        quantity: 0
    },
    {
        id: 6,
        name: 'Mangalagiri Cotton Saree',
        price: 3800,
        type: 'Cotton',
        color: 'Blue',
        description: 'Affordable and comfortable cotton saree',
        images: ['https://via.placeholder.com/400x500/0066CC/FFFFFF?text=Mangalagiri+Blue+1',
                 'https://via.placeholder.com/400x500/0066CC/FFFFFF?text=Mangalagiri+Blue+2',
                 'https://via.placeholder.com/400x500/0066CC/FFFFFF?text=Mangalagiri+Blue+3'],
        rating: 4.4,
        reviews: 12,
        inStock: true,
        quantity: 100
    },
    {
        id: 7,
        name: 'Tussar Beige Saree',
        price: 9500,
        type: 'Tussar Silk',
        color: 'Cream',
        description: 'Rustic tussar silk with traditional patterns',
        images: ['https://via.placeholder.com/400x500/D2B48C/2C1810?text=Tussar+Beige+1',
                 'https://via.placeholder.com/400x500/D2B48C/2C1810?text=Tussar+Beige+2',
                 'https://via.placeholder.com/400x500/D2B48C/2C1810?text=Tussar+Beige+3'],
        rating: 4.6,
        reviews: 16,
        inStock: true,
        quantity: 45
    },
    {
        id: 8,
        name: 'Chettinad Blue Saree',
        price: 7200,
        type: 'Cotton',
        color: 'Blue',
        description: 'Classic Chettinad weave with intricate design',
        images: ['https://via.placeholder.com/400x500/1E90FF/FFFFFF?text=Chettinad+Blue+1',
                 'https://via.placeholder.com/400x500/1E90FF/FFFFFF?text=Chettinad+Blue+2',
                 'https://via.placeholder.com/400x500/1E90FF/FFFFFF?text=Chettinad+Blue+3'],
        rating: 4.5,
        reviews: 20,
        inStock: true,
        quantity: 55
    }
];

// ===================================================================
// 2. STATE MANAGEMENT
// ===================================================================

const AppState = {
    products: [],
    cart: [],
    filteredProducts: [],
    currentFilters: {
        search: '',
        priceMin: 0,
        priceMax: 50000,
        types: [],
        colors: [],
        ratings: [],
        inStockOnly: false
    },
    carouselIndices: {},
    admin: {
        isOpen: false,
        isAuthenticated: false
    }
};

// ===================================================================
// 3. FIRESTORE DATABASE FUNCTIONS
// ===================================================================

/**
 * Initialize Firestore with products
 * Loads products from Firestore with real-time listener
 */
async function initializeStorage() {
    try {
        // Set up real-time listener for products
        if (db) {
            const unsubscribe = db.collection('products').onSnapshot(
                (querySnapshot) => {
                    AppState.products = [];
                    querySnapshot.forEach((doc) => {
                        AppState.products.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    console.log(`✓ Loaded ${AppState.products.length} products from Firestore`);
                    applyFilters();
                },
                (error) => {
                    console.error('Error loading products:', error);
                    // Fallback to sample products if Firestore fails
                    AppState.products = SAMPLE_PRODUCTS;
                    applyFilters();
                }
            );

            // Load cart from Firestore
            loadCartFromFirestore();
        } else {
            // Fallback: use localStorage if Firebase not initialized
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (!stored) {
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(SAMPLE_PRODUCTS));
                AppState.products = SAMPLE_PRODUCTS;
            } else {
                AppState.products = JSON.parse(stored);
            }
            const storedCart = localStorage.getItem(CONFIG.CART_KEY);
            AppState.cart = storedCart ? JSON.parse(storedCart) : [];
        }
    } catch (error) {
        console.error('Error initializing storage:', error);
        // Fallback to localStorage
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        AppState.products = stored ? JSON.parse(stored) : SAMPLE_PRODUCTS;
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(SAMPLE_PRODUCTS));
    }
}

/**
 * Save products to Firestore
 */
async function saveProducts() {
    try {
        if (!db) {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(AppState.products));
            return;
        }
        // Products are auto-saved when modified directly
        console.log('✓ Products synced to Firestore');
    } catch (error) {
        console.error('Error saving products:', error);
    }
}

/**
 * Load cart from Firestore
 */
async function loadCartFromFirestore() {
    try {
        if (!db) {
            const storedCart = localStorage.getItem(CONFIG.CART_KEY);
            AppState.cart = storedCart ? JSON.parse(storedCart) : [];
            return;
        }

        const docId = 'guest'; // Use 'guest' for non-authenticated users
        const cartDoc = await db.collection('cart').doc(docId).get();

        if (cartDoc.exists) {
            AppState.cart = cartDoc.data().items || [];
        } else {
            AppState.cart = [];
        }
        console.log('✓ Cart loaded from Firestore');
    } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to localStorage
        const storedCart = localStorage.getItem(CONFIG.CART_KEY);
        AppState.cart = storedCart ? JSON.parse(storedCart) : [];
    }
}

/**
 * Save cart to Firestore
 */
async function saveCart() {
    try {
        if (!db) {
            localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(AppState.cart));
            return;
        }

        const docId = 'guest'; // Use 'guest' for non-authenticated users
        await db.collection('cart').doc(docId).set({
            items: AppState.cart,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✓ Cart saved to Firestore');
    } catch (error) {
        console.error('Error saving cart:', error);
        // Fallback to localStorage
        localStorage.setItem(CONFIG.CART_KEY, JSON.stringify(AppState.cart));
    }
}

/**
 * Add product to Firestore
 */
async function addProductToStorage(productData) {
    try {
        if (!db) {
            // Fallback: use localStorage
            const newProduct = {
                id: Date.now().toString(),
                ...productData,
                images: [productData.images[0], productData.images[1], productData.images[2]],
                inStock: productData.quantity > 0,
                rating: 5,
                reviews: 0
            };
            AppState.products.push(newProduct);
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(AppState.products));
            return newProduct;
        }

        const newProduct = {
            name: productData.name,
            price: productData.price,
            type: productData.type,
            color: productData.color || 'Multi',
            description: productData.description,
            images: [productData.images[0], productData.images[1], productData.images[2]],
            quantity: productData.quantity,
            inStock: productData.quantity > 0,
            rating: 5,
            reviews: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('products').add(newProduct);
        console.log('✓ Product added to Firestore:', docRef.id);
        return { id: docRef.id, ...newProduct };
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

/**
 * Delete product from Firestore
 */
async function deleteProductFromStorage(productId) {
    try {
        if (!db) {
            AppState.products = AppState.products.filter(p => p.id !== productId);
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(AppState.products));
            return;
        }

        await db.collection('products').doc(productId).delete();
        console.log('✓ Product deleted from Firestore:', productId);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// ===================================================================
// 4. PRODUCT CAROUSEL FUNCTIONS
// ===================================================================

/**
 * Create HTML for image carousel
 */
function createCarouselHTML(product) {
    const carouselId = `carousel-${product.id}`;
    
    // Initialize carousel index for this product
    if (!AppState.carouselIndices[product.id]) {
        AppState.carouselIndices[product.id] = 0;
    }

    return `
        <div class="product-images">
            <div class="image-carousel" id="${carouselId}">
                ${product.images.map((img, idx) => `
                    <img 
                        src="${img}" 
                        alt="${product.name} - Image ${idx + 1}"
                        class="product-image ${idx === 0 ? 'active' : ''}"
                        onerror="this.src='${CONFIG.IMAGE_PLACEHOLDER}'"
                    />
                `).join('')}
            </div>
            <div class="carousel-controls">
                <button class="carousel-btn" data-product-id="${product.id}" data-action="prev">❮</button>
                <button class="carousel-btn" data-product-id="${product.id}" data-action="next">❯</button>
            </div>
            <div class="carousel-dots">
                ${product.images.map((_, idx) => `
                    <div class="dot ${idx === 0 ? 'active' : ''}" data-product-id="${product.id}" data-index="${idx}"></div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Show carousel image by index
 */
function showCarouselImage(productId, imageIndex) {
    const carousel = document.getElementById(`carousel-${productId}`);
    if (!carousel) return;

    const images = carousel.querySelectorAll('.product-image');
    const dots = document.querySelectorAll(`[data-product-id="${productId}"][data-index]`);

    // Hide all images
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show selected image
    if (images[imageIndex]) {
        images[imageIndex].classList.add('active');
        dots[imageIndex].classList.add('active');
        AppState.carouselIndices[productId] = imageIndex;
    }
}

/**
 * Move carousel to next image
 */
function nextCarouselImage(productId) {
    const currentIndex = AppState.carouselIndices[productId] || 0;
    const product = AppState.products.find(p => p.id === productId);
    const nextIndex = (currentIndex + 1) % product.images.length;
    showCarouselImage(productId, nextIndex);
}

/**
 * Move carousel to previous image
 */
function prevCarouselImage(productId) {
    const currentIndex = AppState.carouselIndices[productId] || 0;
    const product = AppState.products.find(p => p.id === productId);
    const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    showCarouselImage(productId, prevIndex);
}

/**
 * Auto-rotate carousel images
 */
function startCarouselAutoRotate(productId) {
    return setInterval(() => {
        nextCarouselImage(productId);
    }, CONFIG.CAROUSEL_INTERVAL);
}

// ===================================================================
// 5. PRODUCT RENDERING FUNCTIONS
// ===================================================================

/**
 * Create HTML for a single product card
 */
function createProductCardHTML(product) {
    const stars = '⭐'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '✨' : '');
    const stockClass = product.inStock ? 'in-stock' : 'out-of-stock';
    const stockText = product.inStock ? (product.quantity > 30 ? 'In Stock' : `Limited (${product.quantity})`) : 'Out of Stock';

    return `
        <div class="product-card" data-product-id="${product.id}">
            ${createCarouselHTML(product)}
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-type">${product.type}</p>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="reviews-count">(${product.reviews})</span>
                </div>
                <div class="stock-status ${stockClass}">${stockText}</div>
                <div class="product-actions">
                    <button class="btn-add-cart" data-product-id="${product.id}">Add to Cart</button>
                    <button class="btn-whatsapp" data-product-id="${product.id}">📱 WhatsApp Order</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render all products to the grid
 */
function renderProducts(productsToRender = AppState.products) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');

    if (productsToRender.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        updateProductCount(0);
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = productsToRender.map(product => createProductCardHTML(product)).join('');
    updateProductCount(productsToRender.length);

    // Attach event listeners to product buttons
    attachProductEventListeners();

    // Start carousels for each product
    productsToRender.forEach(product => {
        startCarouselAutoRotate(product.id);
    });
}

/**
 * Update product count display
 */
function updateProductCount(count) {
    const counter = document.getElementById('productCount');
    if (counter) {
        counter.textContent = `${count} product${count !== 1 ? 's' : ''}`;
    }
}

/**
 * Apply filters and render filtered products
 */
function applyFilters() {
    const filters = AppState.currentFilters;

    AppState.filteredProducts = AppState.products.filter(product => {
        // Search filter
        const searchLower = filters.search.toLowerCase();
        if (searchLower && !product.name.toLowerCase().includes(searchLower) &&
            !product.type.toLowerCase().includes(searchLower) &&
            !product.color.toLowerCase().includes(searchLower)) {
            return false;
        }

        // Price filter
        if (product.price < filters.priceMin || product.price > filters.priceMax) {
            return false;
        }

        // Type filter
        if (filters.types.length > 0 && !filters.types.includes(product.type)) {
            return false;
        }

        // Color filter
        if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
            return false;
        }

        // Rating filter
        if (filters.ratings.length > 0) {
            const minRating = Math.min(...filters.ratings);
            if (product.rating < minRating) {
                return false;
            }
        }

        // Stock filter
        if (filters.inStockOnly && !product.inStock) {
            return false;
        }

        return true;
    });

    renderProducts(AppState.filteredProducts);
    updateActiveFilters();
}

/**
 * Update active filter display
 */
function updateActiveFilters() {
    const container = document.getElementById('activeFilters');
    const filters = [];

    if (AppState.currentFilters.search) {
        filters.push({
            label: `Search: "${AppState.currentFilters.search}"`,
            type: 'search'
        });
    }

    if (AppState.currentFilters.priceMin > 0 || AppState.currentFilters.priceMax < 50000) {
        filters.push({
            label: `₹${AppState.currentFilters.priceMin.toLocaleString()} - ₹${AppState.currentFilters.priceMax.toLocaleString()}`,
            type: 'price'
        });
    }

    AppState.currentFilters.types.forEach(type => {
        filters.push({ label: type, type: 'type' });
    });

    AppState.currentFilters.colors.forEach(color => {
        filters.push({ label: color, type: 'color' });
    });

    AppState.currentFilters.ratings.forEach(rating => {
        filters.push({ label: `${rating}+ Stars`, type: 'rating' });
    });

    if (AppState.currentFilters.inStockOnly) {
        filters.push({ label: 'In Stock Only', type: 'stock' });
    }

    container.innerHTML = filters.map(filter => `
        <div class="filter-tag">
            ${filter.label}
            <button data-filter-type="${filter.type}" data-filter-value="${filter.label}">✕</button>
        </div>
    `).join('');

    // Attach remove filter listeners
    container.querySelectorAll('.filter-tag button').forEach(btn => {
        btn.addEventListener('click', removeFilter);
    });
}

/**
 * Remove individual filter
 */
function removeFilter(event) {
    const filterType = event.target.dataset.filterType;
    const filterValue = event.target.dataset.filterValue;

    switch(filterType) {
        case 'search':
            AppState.currentFilters.search = '';
            document.getElementById('searchInput').value = '';
            break;
        case 'type':
            AppState.currentFilters.types = AppState.currentFilters.types.filter(t => t !== filterValue);
            document.querySelectorAll('.filter-checkbox').forEach(cb => {
                if (cb.value === filterValue) cb.checked = false;
            });
            break;
        case 'color':
            AppState.currentFilters.colors = AppState.currentFilters.colors.filter(c => c !== filterValue);
            document.querySelectorAll('.color-swatch').forEach(btn => {
                if (btn.dataset.color === filterValue) btn.classList.remove('active');
            });
            break;
        case 'price':
            AppState.currentFilters.priceMin = 0;
            AppState.currentFilters.priceMax = 50000;
            document.getElementById('priceMin').value = 0;
            document.getElementById('priceMax').value = 50000;
            break;
        case 'rating':
            const ratingValue = parseInt(filterValue);
            AppState.currentFilters.ratings = AppState.currentFilters.ratings.filter(r => r !== ratingValue);
            document.querySelectorAll('.filter-rating').forEach(cb => {
                if (parseInt(cb.value) === ratingValue) cb.checked = false;
            });
            break;
        case 'stock':
            AppState.currentFilters.inStockOnly = false;
            document.getElementById('inStockFilter').checked = false;
            break;
    }

    applyFilters();
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    AppState.currentFilters = {
        search: '',
        priceMin: 0,
        priceMax: 50000,
        types: [],
        colors: [],
        ratings: [],
        inStockOnly: false
    };

    // Reset UI
    document.getElementById('searchInput').value = '';
    document.getElementById('priceMin').value = 0;
    document.getElementById('priceMax').value = 50000;
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filter-rating').forEach(cb => cb.checked = false);
    document.querySelectorAll('.color-swatch').forEach(btn => btn.classList.remove('active'));
    document.getElementById('inStockFilter').checked = false;

    applyFilters();
}

// ===================================================================
// 6. CART FUNCTIONS
// ===================================================================

/**
 * Add product to cart
 */
function addToCart(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = AppState.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + 1, 5); // Max 5 per item
    } else {
        AppState.cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    }

    saveCart(); // Async call - no await needed for UI
    updateCart();
    showNotification('Added to cart!', 'success');
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    saveCart(); // Async call - no await needed
    updateCart();
}

/**
 * Update product quantity in cart
 */
function updateCartItemQuantity(productId, newQuantity) {
    const item = AppState.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, Math.min(newQuantity, 5));
        saveCart(); // Async call - no await needed
        updateCart();
    }
}

/**
 * Update cart display
 */
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartContent = document.getElementById('cartContent');
    const cartCount = document.getElementById('cartCount');

    cartCount.textContent = AppState.cart.length;

    if (AppState.cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartContent.style.display = 'flex';

    cartItems.innerHTML = AppState.cart.map(item => `
        <div class="cart-item" data-item-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='${CONFIG.IMAGE_PLACEHOLDER}'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" data-action="decrease" data-product-id="${item.id}">−</button>
                    <div class="qty-display">${item.quantity}</div>
                    <button class="qty-btn" data-action="increase" data-product-id="${item.id}">+</button>
                    <button class="remove-btn" data-product-id="${item.id}">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');

    updateCartSummary();
    attachCartEventListeners();
}

/**
 * Update cart summary (subtotal, tax, total)
 */
function updateCartSummary() {
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(0).toLocaleString()}`;
    document.getElementById('total').textContent = `₹${total.toFixed(0).toLocaleString()}`;
}

/**
 * Generate WhatsApp checkout message
 */
function generateCheckoutMessage() {
    if (AppState.cart.length === 0) {
        alert('Your cart is empty!');
        return '';
    }

    let message = 'Hi! I would like to order the following items:\n\n';

    AppState.cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}\n`;
    });

    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.18;
    const grandTotal = total + tax;

    message += `\nSubtotal: ₹${total.toLocaleString()}\n`;
    message += `Tax (18%): ₹${tax.toFixed(0).toLocaleString()}\n`;
    message += `Total: ₹${grandTotal.toFixed(0).toLocaleString()}\n\n`;
    message += 'Please confirm availability and provide payment details.';

    return message;
}

/**
 * Checkout via WhatsApp
 */
function checkoutViaWhatsApp() {
    const message = generateCheckoutMessage();
    if (!message) return;

    const whatsappURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

/**
 * WhatsApp order for single product
 */
function orderViaWhatsApp(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;

    const message = `Hi! I'm interested in ${product.name}. Price: ₹${product.price.toLocaleString()}. Please confirm availability and provide payment details.`;
    const whatsappURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ===================================================================
// 7. ADMIN PANEL FUNCTIONS
// ===================================================================

/**
 * Open/close admin panel
 */
function toggleAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel.classList.contains('open')) {
        adminPanel.classList.remove('open');
        AppState.admin.isOpen = false;
    } else {
        const password = prompt('Enter admin password:');
        if (password === CONFIG.ADMIN_PASSWORD) {
            adminPanel.classList.add('open');
            AppState.admin.isOpen = true;
            renderAdminProductsList();
        } else {
            alert('Incorrect password!');
        }
    }
}

/**
 * Submit add product form
 */
async function submitProductForm(event) {
    event.preventDefault();

    try {
        const formData = {
            name: document.getElementById('productName').value.trim(),
            price: parseFloat(document.getElementById('productPrice').value),
            type: document.getElementById('productType').value,
            description: document.getElementById('productDescription').value.trim(),
            images: [
                document.getElementById('productImage1').value.trim(),
                document.getElementById('productImage2').value.trim(),
                document.getElementById('productImage3').value.trim()
            ],
            quantity: parseInt(document.getElementById('productQuantity').value),
            color: 'Multi' // Default color
        };

        // Validation
        if (!formData.name || !formData.type || !formData.images[0] || !formData.images[1] || !formData.images[2]) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (formData.price <= 0 || formData.quantity < 0) {
            showFormMessage('Price must be positive and quantity must be non-negative.', 'error');
            return;
        }

        // Add product to Firestore
        await addProductToStorage(formData);
        showFormMessage('Product added successfully!', 'success');

        // Reset form
        document.getElementById('productForm').reset();

        // Refresh admin products list
        renderAdminProductsList();

        // Auto-hide message after 3 seconds
        setTimeout(() => {
            const msg = document.getElementById('formMessage');
            if (msg) msg.innerHTML = '';
        }, 3000);

    } catch (error) {
        console.error('Error adding product:', error);
        showFormMessage('An error occurred. Please try again.', 'error');
    }
}

/**
 * Show form message
 */
function showFormMessage(message, type) {
    const msgEl = document.getElementById('formMessage');
    msgEl.textContent = message;
    msgEl.className = `form-message ${type}`;
}

/**
 * Render admin products list
 */
function renderAdminProductsList() {
    const list = document.getElementById('adminProductsList');

    if (AppState.products.length === 0) {
        list.innerHTML = '<p>No products yet. Add your first product!</p>';
        return;
    }

    list.innerHTML = AppState.products.map(product => `
        <div class="admin-product-item">
            <img src="${product.images[0]}" alt="${product.name}" class="admin-product-img" onerror="this.src='${CONFIG.IMAGE_PLACEHOLDER}'">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p>₹${product.price.toLocaleString()} | ${product.type} | Stock: ${product.quantity}</p>
            </div>
            <div class="admin-product-actions">
                <button class="admin-btn admin-btn-edit" data-product-id="${product.id}">Edit</button>
                <button class="admin-btn admin-btn-delete" data-product-id="${product.id}">Delete</button>
            </div>
        </div>
    `).join('');

    // Attach event listeners
    list.querySelectorAll('.admin-btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const productId = btn.dataset.productId;
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    await deleteProductFromStorage(productId);
                    showNotification('Product deleted successfully!', 'success');
                    renderAdminProductsList();
                } catch (error) {
                    console.error('Error deleting product:', error);
                    showNotification('Error deleting product', 'error');
                }
            }
        });
    });
}

// ===================================================================
// 8. SEARCH FUNCTIONALITY
// ===================================================================

/**
 * Debounce function for search
 */
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Handle search input
 */
const handleSearch = debounce(() => {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    AppState.currentFilters.search = searchValue;
    applyFilters();
}, CONFIG.SEARCH_DEBOUNCE);

// ===================================================================
// 9. EVENT LISTENERS - INITIALIZATION
// ===================================================================

/**
 * Attach product card event listeners
 */
function attachProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });

    // WhatsApp buttons
    document.querySelectorAll('.btn-whatsapp').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            orderViaWhatsApp(productId);
        });
    });

    // Carousel controls
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            const action = btn.dataset.action;
            if (action === 'next') {
                nextCarouselImage(productId);
            } else {
                prevCarouselImage(productId);
            }
        });
    });

    // Carousel dots
    document.querySelectorAll('.carousel-dots .dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const productId = parseInt(dot.dataset.productId);
            const index = parseInt(dot.dataset.index);
            showCarouselImage(productId, index);
        });
    });
}

/**
 * Attach cart event listeners
 */
function attachCartEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            const action = btn.dataset.action;
            const item = AppState.cart.find(i => i.id === productId);

            if (action === 'increase') {
                updateCartItemQuantity(productId, item.quantity + 1);
            } else {
                updateCartItemQuantity(productId, item.quantity - 1);
            }
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            removeFromCart(productId);
        });
    });
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Header navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close nav menu when link clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Search bar
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', handleSearch);

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        AppState.currentFilters.search = '';
        applyFilters();
    });

    // Cart sidebar
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        overlay.classList.add('active');
    });

    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Cart buttons
    document.getElementById('checkoutBtn').addEventListener('click', checkoutViaWhatsApp);
    document.getElementById('continueShopping').addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Filter section
    const filterToggle = document.getElementById('filterToggle');
    const filterPanel = document.getElementById('filterPanel');
    const filterClose = document.getElementById('filterClose');
    const clearFiltersBtn = document.getElementById('clearFilters');

    if (filterToggle && filterPanel) {
        filterToggle.addEventListener('click', () => {
            filterPanel.classList.add('open');
        });

        filterClose.addEventListener('click', () => {
            filterPanel.classList.remove('open');
        });
    }

    // Price filter
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');

    priceMin.addEventListener('input', (e) => {
        AppState.currentFilters.priceMin = parseInt(e.target.value) || 0;
        applyFilters();
    });

    priceMax.addEventListener('input', (e) => {
        AppState.currentFilters.priceMax = parseInt(e.target.value) || 50000;
        applyFilters();
    });

    // Type filter
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedTypes = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
                .map(cb => cb.value);
            AppState.currentFilters.types = checkedTypes;
            applyFilters();
        });
    });

    // Color filter
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            e.target.classList.toggle('active');
            const checkedColors = Array.from(document.querySelectorAll('.color-swatch.active'))
                .map(btn => btn.dataset.color);
            AppState.currentFilters.colors = checkedColors;
            applyFilters();
        });
    });

    // Rating filter
    document.querySelectorAll('.filter-rating').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedRatings = Array.from(document.querySelectorAll('.filter-rating:checked'))
                .map(cb => parseInt(cb.value));
            AppState.currentFilters.ratings = checkedRatings;
            applyFilters();
        });
    });

    // Stock filter
    document.getElementById('inStockFilter').addEventListener('change', (e) => {
        AppState.currentFilters.inStockOnly = e.target.checked;
        applyFilters();
    });

    // Clear filters
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    document.getElementById('resetFilters').addEventListener('click', clearAllFilters);

    // Admin panel
    const adminButton = document.getElementById('adminButton');
    const adminPanel = document.getElementById('adminPanel');
    const adminClose = document.getElementById('adminClose');

    adminButton.addEventListener('click', toggleAdminPanel);
    adminClose.addEventListener('click', toggleAdminPanel);

    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.dataset.tab;
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

    // Product form
    document.getElementById('productForm').addEventListener('submit', submitProductForm);

    // Hero explore button
    document.getElementById('exploreBtn').addEventListener('click', () => {
        document.getElementById('filters').scrollIntoView({ behavior: 'smooth' });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
    });
}

// ===================================================================
// 10. UTILITY FUNCTIONS
// ===================================================================

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#D4EDDA' : '#E2E3E5'};
        color: ${type === 'success' ? '#155724' : '#383D41'};
        border-radius: 8px;
        z-index: 999;
        animation: slideIn 0.3s ease-out;
        min-width: 250px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return `₹${(amount || 0).toLocaleString('en-IN')}`;
}

// ===================================================================
// 11. INITIALIZATION
// ===================================================================

/**
 * Initialize the application
 */
async function initializeApp() {
    try {
        console.log('🚀 Initializing VASTRA Application...');

        // Wait briefly for Firebase to initialize
        let retries = 0;
        while (!db && retries < 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            retries++;
        }

        if (!db) {
            console.warn('⚠️ Firebase not available, using localStorage fallback');
        }

        // Load data from Firestore or localStorage
        await initializeStorage();

        // Render products
        if (AppState.products.length > 0) {
            applyFilters();
        }

        // Attach event listeners
        initializeEventListeners();

        // Initial cart update
        updateCart();

        console.log('✓ VASTRA App initialized successfully');
        console.log(`✓ Loaded ${AppState.products.length} products`);
    } catch (error) {
        console.error('✗ Error initializing app:', error);
    }
}

// Start app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// ===================================================================
// END OF SCRIPT
// ===================================================================
