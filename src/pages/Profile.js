import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ProfileTabs from "../components/profile_components/profile_body/ProfileTabs";
import ProfileHeader from "../components/profile_components/profile_header/ProfileHeader";
import ProfileBodyLeft from "../components/profile_components/profile_body/ProfileBodyLeft";
import ProfileBodyRight from "../components/profile_components/profile_body/ProfileBodyRight";
import ProfileBio from "../components/profile_components/profile_bio/ProfileBio";
import ProfileRecentActivity from "../components/profile_components/profile_recent_activity/ProfileRecentActivity.js";
import Nav from "../components/nav_bar/Nav";

import "../styles/profile/profile.scss";

const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
        author: "@rollelflex_graphy726",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
        author: "@helloimnik",
    },
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
        author: "@nolanissac",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
        author: "@hjrc33",
    },
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
        author: "@arwinneil",
    },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
        author: "@tjdragotta",
    },
    {
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Fern",
        author: "@katie_wasserman",
    },
    {
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Mushrooms",
        author: "@silverdalex",
    },
    {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
        author: "@shelleypauls",
    },
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
        author: "@peterlaster",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
        author: "@southside_customs",
    },
];

function Profile() {
    const { user } = useContext(UserContext);

    console.log("Profile user: ", user);

    if (!user){ return <div>...Loading</div>}

    return (
        <div className="profile-container">
            <Nav />
            {/* <ProfileHeader /> */}
            <div className="profile-body-wrapper">
                <ProfileBodyLeft user={user} />
                <ProfileBodyRight user={user} />
            </div>
            <ProfileBio />
            <ProfileRecentActivity />
            <ProfileTabs user={itemData} posts={itemData} />
        </div>
    );
}

export default Profile;
