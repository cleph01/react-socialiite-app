import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { db } from "../../firebase/firebase_config";
import ProfileTabs from "./profile_components/profile_body/ProfileTabs";

import ProfileBodyLeft from "./profile_components/profile_body/ProfileBodyLeft";

import ProfileBio from "./profile_components/profile_bio/ProfileBio";
import ProfileRecentActivity from "./profile_components/profile_recent_activity/ProfileRecentActivity.js";
import Nav from "../../components/nav_bar/Nav";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./styles/profile.scss";

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
    const [user, setUser] = useState();

    const { userId } = useParams();

    //every time a new post is added this code fires
    useEffect(() => {
        db.collection("user")
            .doc(userId)
            .onSnapshot((doc) => {
                setUser({
                    userId: doc.id,
                    userInfo: doc.data(),
                });
            });
    }, []);
    // const { user } = useContext(UserContext);

    console.log("Profile user: ", user);

    if (!user) {
        return <div>...Loading</div>;
    }

    return (
        <>
            <Nav />
            <div className="profile-container">
                <Card
                    sx={{
                        maxWidth: 350,
                    }}
                >
                    <CardContent className="card-content">
                        <div className="profile-body-wrapper">
                            <ProfileBodyLeft user={user} />
                        </div>
                        <ProfileBio />
                        <ProfileRecentActivity />
                        <ProfileTabs user={itemData} posts={itemData} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default Profile;