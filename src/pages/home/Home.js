import React, { useContext } from "react";
import Auth from "../../Auth";
import { Redirect } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import "./styles/home.scss";

import logo from "../../assets/images/logos/logo.png";

function Home() {
    const { authUser, userState } = useContext(UserContext);

    if (authUser) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="container">
            <div className="body-wrapper">
                <div className="image-wrapper">
                    <img className="logo" src={logo} alt="logo" />
                </div>

                <h3>
                    <center>
                        Win Stuff, Trade Stuff, Share Stuff <br />
                        and
                        <span style={{ fontSize: "28px" }}> Get Paid</span>
                    </center>
                </h3>

                <Auth />
            </div>
        </div>
    );
}

export default Home;
