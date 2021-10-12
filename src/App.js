import { lazy, Suspense, useReducer, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase/firebase_config";
import * as ROUTES from "./constants/routes";

// START Lazy Rendering functions
const Home = lazy(() => import("./pages/home/Home.js"));

const Profile = lazy(() => import("./pages/profile/Profile.js"));
const Checkin = lazy(() => import("./pages/checkin/Checkin.js"));
const Wallet = lazy(() => import("./pages/wallet/Wallet.js"));
const MyShop = lazy(() => import("./pages/MyShop.js"));
const EditProfile = lazy(() => import("./pages/edit_profile/EditProfile.js"));
const AllShops = lazy(() => import("./pages/AllShops.js"));
const Shop = lazy(() => import("./pages/Shop.js"));
const NewShop = lazy(() => import("./pages/NewShop.js"));
const EditShop = lazy(() => import("./pages/EditShop.js"));
const NewProduct = lazy(() => import("./pages/NewProduct.js"));
const Market = lazy(() => import("./pages/Market.js"));
const Product = lazy(() => import("./pages/Product.js"));
const Auction = lazy(() => import("./components/auction/FeaturedAuction.js"));
const Auctions = lazy(() => import("./pages/Auctions.js"));
const Store = lazy(() => import("./pages/Store.js"));
const EditProduct = lazy(() => import("./pages/EditProduct.js"));
const EditPrize = lazy(() => import("./pages/EditLoyaltyPrize.js"));
// END Lazy Rendering functions

function App() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in...
                console.log(authUser);
                // this state survives a refresh
                // onAuthStateChanged listener uses cookie tracking
                // to persist this state (state by default is not persistent)
                setUser(authUser);

                // if (authUser.displayName) {
                //     // don't update username
                // } else {
                //     // update profile name
                //     return authUser.updateProfile({
                //         displayName: username,
                //     });
                // }
            } else {
                // user has logged out...
                setUser(null);
            }
        });
        return () => {
            // perform some cleanup actions
            // i.e. detaches the listener previously attached
            // from initial useEffect call since we are listening
            // to frontend changes to user & username variables
            unsubscribe();
        };
    }, [user]);

    return (
        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Switch>
                            <Route exact path={ROUTES.HOME} component={Home} />
                            <Route
                                exact
                                path={ROUTES.PROFILE}
                                component={Profile}
                            />

                            <Route path={ROUTES.CHECKIN} component={Checkin} />
                            <Route path={ROUTES.WALLET} component={Wallet} />
                            <Route path={ROUTES.MY_SHOPS} component={MyShop} />
                            <Route path={ROUTES.SHOPS} component={AllShops} />
                            <Route path={ROUTES.SHOP} component={Shop} />
                            <Route path={ROUTES.NEW_SHOP} component={NewShop} />
                            <Route
                                path={ROUTES.EDIT_SHOP}
                                component={EditShop}
                            />
                            <Route
                                path={ROUTES.NEW_PRODUCT}
                                component={NewProduct}
                            />
                            <Route
                                path={ROUTES.EDIT_PROFILE}
                                component={EditProfile}
                            />
                            <Route path={ROUTES.MARKET} component={Market} />
                            <Route path={ROUTES.PRODUCT} component={Product} />
                            <Route path={ROUTES.AUCTION} component={Auction} />
                            <Route
                                path={ROUTES.AUCTIONS}
                                component={Auctions}
                            />
                            <Route path={ROUTES.STORE} component={Store} />
                            <Route
                                path={ROUTES.EDIT_PRODUCT}
                                component={EditProduct}
                            />
                            <Route
                                path={ROUTES.EDIT_PRIZE}
                                component={EditPrize}
                            />
                        </Switch>
                    </Suspense>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
