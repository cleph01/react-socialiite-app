/**
 *  Auth Routes
 *  Public
 */
// Display a Publics Facing Home Page
const HOME = "/";
// Display the Login Page
const LOGIN = "/login";

/**
 * Dashboard Routes
 * Private
 */
// Display User Dasboard
const DASHBOARD = "/dashboard/:userId";

/**
 *  User Profile
 *  Private
 */
// Display User Profile Details
const PROFILE = "/profile/:userId";
// Edit User Profile Details
const EDIT_PROFILE = "/profile/edit/:userId"; // Private Route

/**
 *  Digital Wallet Routes
 *  Private
 */
// Display User's Digital Wallet
const WALLET = "/wallet/:userId";

/**
 *  Shops Community
 *  Public Routes
 */
// Display All Shops on Socialiite
const SHOPS = "/shops/all";
// Shop Profile Page - Allow for Referrer Tracking When CTA Follow
const SHOP = "/shops/:shopId/:userId?";

/**
 *  Store QR Code Routes
 *  Public Routes
 */
// Display QR Code on Store tablet
const STORE = "/store/:shopId";
// Display the Checkin Page after QR code Scan
const CHECKIN = "/checkin/:shopId";

/**
 *  User Ownerd Shop Routes
 *  Private Routes
 */
// Display All User Owned Shops
const MY_SHOPS = "/seller/shops"; // private route
// Add New Shop to Owner's Shop List
const NEW_SHOP = "/seller/shop/new"; // private route"
// Edit Existhing Shop Profile Details
const EDIT_SHOP = "/seller/shop/edit/:shopId"; // private route
// Add New Loyalty Prize
const NEW_PRIZE = "/seller/:shopId/prizes/new"; // private route
// Edit Existing Loyalty Prize
const EDIT_PRIZE = "/seller/:shopId/:prizeId/edit-prize"; // private route

// Market
// const MARKET = "/market";

// const CART = "/cart";
// const PRODUCT = "/product/:productId";

// Auction
// const AUCTIONS = "/auctions/all";
// const AUCTION = "/auction/:auctionId";
// const MY_AUCTION = "/myauctions";
// const NEW_AUCTION = "/auction/new";
// const EDIT_AUCTION = "/auction/edit/:auctionId";

// Stripe
// const STRIPE_CONNECT = "/seller/stripe/connect";

// Order
// const ORDER = "/order/:orderId";
// const SHOP_ORDER = "/seller/orders/:shop/:shopId"; //private route

// My Shop
// const NEW_PRODUCT = "/seller/:shopId/products/new"; // private route
// const EDIT_PRODUCT = "/seller/:shopId/:productId/edit"; // private route

// Stripe connect
// const STRIPE = "/seller/stripe/connect";

export {
    HOME,
    LOGIN,
    DASHBOARD,
    PROFILE,
    EDIT_PROFILE,
    WALLET,
    SHOPS,
    SHOP,
    STORE,
    CHECKIN,
    MY_SHOPS,
    NEW_SHOP,
    EDIT_SHOP,
    NEW_PRIZE,
    EDIT_PRIZE,
};