import React, { useContext } from "react";
import Auth from "../../Auth";
import { Redirect } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import "./styles/home.scss";

import logo from "../../assets/images/logos/logo.png";

function Home() {
    const { user } = useContext(UserContext);

    user ? console.log("Home User Id:", user.uid) : console.log("No User");

    if (user) {
        return <Redirect to={`/dashboard/${user.uid}`} />;
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