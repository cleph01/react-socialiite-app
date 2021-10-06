import React, { useContext, useEffect } from "react";
import Auth from "../components/Auth";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import { auth } from "../firebase/firebase_config";

import "../styles/home.scss";

import logo from "../assets/images/logos/logo.png";
import logo_text from "../assets/images/logos/logo_white_text.png";

function Home() {
    const history = useHistory();

    const { user } = useContext(UserContext);

    const handleSignOut = () => {
        auth.signOut();
        localStorage.removeItem("user");
    };

    user ? console.log("Home User Id:", user.uid) : console.log("No User");

    // useEffect(() => {
    //     if (user.uid) {
    //         history.push("/wallet");
    //     }
    // }, [user]);

    if (user) {
        return <Redirect to={`/wallet/${user.uid}`} />;
    }

    return (
        <div className="container">
            <div className="body-wrapper">
                <div className="image-wrapper">
                    <img className="logo" src={logo} alt="logo" />
                </div>

                <h3>Win Stuff, Trade Stuff, Share Stuff</h3>
                <h3>and Get Paid</h3>

                <Auth />
            </div>
        </div>
    );
}

export default Home;
