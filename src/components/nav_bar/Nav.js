import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logos/logo_white_text.png";
import "../../styles/nav_bar.scss";
import HomeIcon from "@mui/icons-material/Home";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import { UserContext } from "../../contexts/UserContext";

import { auth } from "../../firebase/firebase_config";

function Nav() {
    const history = useHistory();

    const { user } = useContext(UserContext);

    const printTitle = () => {
        if (history.location.pathname === "/profile") {
            return <div>&#x1F600; &nbsp; Profile &#x1F600;</div>;
        } else if (history.location.pathname === "/wallet") {
            return <div>&#x1F4B0; Digital Wallet &#x1F4B0;</div>;
        }
    };

    const handleSignOut = () => {
        auth.signOut();
        localStorage.removeItem("user");
    };

    console.log("Nav User", user);

    return (
        <div className="navbar-container">
            <div className="logo-wrapper">
                <img className="logo" src={logo} alt="logo" />
                {printTitle()}
            </div>
            <div className="navbar__body">
                <Link to="/">
                    <div>
                        <HomeIcon />
                    </div>
                </Link>
                <Link to="/market">
                    <div>Market Place</div>
                </Link>
                <Link to="/cart">
                    <div style={{ paddingRight: "15px" }}>
                        Cart
                        <Badge
                            color="primary"
                            invisible={false}
                            // badgeContent={cart.itemTotal()}
                            badgeContent="3"
                            style={{ marginLeft: "7px" }}
                        >
                            <CartIcon />
                        </Badge>
                    </div>
                </Link>
                <Link to="/shop/:userId">
                    <div>My Shop</div>
                </Link>
                <Link to="/profile/:userId">
                    <div>Profile</div>
                </Link>
                {user && <span onClick={handleSignOut}>Sign Out</span>}
                {!user && <span>User No Esta</span>}
            </div>
        </div>
    );
}

export default Nav;
