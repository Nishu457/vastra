/* ===================================================================
   VASTRA - FIREBASE CONFIGURATION
   Production Ready Firebase Setup
   =================================================================== */

/**
 * Firebase Configuration
 * These credentials are safe to expose on the client (restricted by Security Rules)
 */
const firebaseConfig = {
    apiKey: "AIzaSyBFxWMGaWq78VpL2jSY56ERAsjPbJck8tU",
    authDomain: "saree-9e891.firebaseapp.com",
    projectId: "saree-9e891",
    storageBucket: "saree-9e891.firebasestorage.app",
    messagingSenderId: "178440597887",
    appId: "1:178440597887:web:3350f7bdf64aeacace2a4a",
    measurementId: "G-BE2KMYD2R9"
};

/**
 * Initialize Firebase with error handling
 */
let db, auth;

try {
    // Initialize Firebase App
    const app = firebase.initializeApp(firebaseConfig);
    console.log('✓ Firebase App initialized');

    // Initialize Firestore Database
    db = firebase.firestore(app);
    console.log('✓ Firestore Database initialized');

    // Initialize Authentication
    auth = firebase.auth(app);
    console.log('✓ Firebase Auth initialized');

    // Initialize Analytics (optional)
    firebase.analytics(app);
    console.log('✓ Firebase Analytics initialized');

} catch (error) {
    console.error('✗ Firebase Initialization Error:', error);
}

/**
 * Firestore Collections Reference
 */
const COLLECTIONS = {
    PRODUCTS: 'products',
    CART: 'cart',
    ORDERS: 'orders',
    USERS: 'users',
    ADMIN: 'admin'
};

/* ===================================================================
   DATABASE STRUCTURE (Collections)
   =================================================================== */

/**
 * PRODUCTS Collection
 * Document Structure:
 * {
 *   id: auto-generated (docId from Firestore)
 *   name: string
 *   price: number
 *   type: string (Silk, Cotton, Chiffon, etc)
 *   color: string
 *   description: string
 *   images: array of URLs
 *   quantity: number (stock)
 *   inStock: boolean
 *   rating: number (0-5)
 *   reviews: number
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */

/**
 * CART Collection
 * Document Structure (per user):
 * {
 *   userId: string (or "guest")
 *   items: array of {
 *     productId: string
 *     name: string
 *     price: number
 *     image: string
 *     quantity: number
 *   }
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */

/**
 * ORDERS Collection
 * Document Structure:
 * {
 *   orderId: auto-generated
 *   userId: string (or "guest")
 *   items: array of products ordered
 *   subtotal: number
 *   tax: number
 *   total: number
 *   status: string (pending, confirmed, shipped, delivered)
 *   paymentMethod: string
 *   shippingAddress: object
 *   whatsappMessage: string
 *   createdAt: timestamp
 *   updatedAt: timestamp
 * }
 */

/**
 * USERS Collection
 * Document Structure:
 * {
 *   uid: string (Firebase Auth UID)
 *   email: string
 *   displayName: string
 *   phone: string
 *   address: object {
 *     street: string
 *     city: string
 *     state: string
 *     zipcode: string
 *     country: string
 *   }
 *   createdAt: timestamp
 *   lastLogin: timestamp
 * }
 */

/**
 * ADMIN Collection
 * Document Structure:
 * {
 *   adminId: string
 *   email: string
 *   role: string (admin, superadmin)
 *   permissions: array
 *   createdAt: timestamp
 * }
 */

console.log('✓ Firebase Configuration loaded');
