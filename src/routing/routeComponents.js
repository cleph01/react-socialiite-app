import { lazy } from "react";

// Auth
const Home = lazy(() => import("../pages/home/Home.js"));
const Login = lazy(() => import("../pages/auth/Login.js"));

// user Dashboard
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.js"));

// user Profile
const Profile = lazy(() => import("../pages/profile/Profile.js"));
const EditProfile = lazy(() => import("../pages/edit_profile/EditProfile.js"));

// Digital Wallet
const Wallet = lazy(() => import("../pages/wallet/Wallet.js"));

// Shops Directory
const AllShops = lazy(() => import("../pages/AllShops.js"));
const Shop = lazy(() => import("../pages/shops/Shop.js"));

// QR / Checkin
const Store = lazy(() => import("../pages/Store.js"));
const Checkin = lazy(() => import("../pages/checkin/Checkin.js"));

// Shop Related
const MyShop = lazy(() => import("../pages/MyShop.js"));
const NewShop = lazy(() => import("../pages/NewShop.js"));
const EditShop = lazy(() => import("../pages/shops/EditShop.js"));
const NewPrize = lazy(() =>
    import("../pages/loyalty_prize/NewLoyaltyPrize.js")
);
const EditPrize = lazy(() =>
    import("../pages/loyalty_prize/EditLoyaltyPrize.js")
);

// const NewProduct = lazy(() => import("../pages/NewProduct.js"));
// const Market = lazy(() => import("../pages/Market.js"));
// const Product = lazy(() => import("../pages/Product.js"));
// const Auction = lazy(() => import("../components/auction/FeaturedAuction.js"));
// const Auctions = lazy(() => import("../pages/Auctions.js"));

// const EditProduct = lazy(() => import("../pages/EditProduct.js"));

export {
    Home,
    Login,
    Dashboard,
    Profile,
    EditProfile,
    Wallet,
    AllShops,
    Shop,
    Store,
    Checkin,
    MyShop,
    NewShop,
    EditShop,
    NewPrize,
    EditPrize,
};