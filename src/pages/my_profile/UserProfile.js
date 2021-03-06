import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase_config";
import ProfileTabs from "./profile_components/ProfileTabs";

import AvatarSocials from "./profile_components/AvatarSocials";

import ProfileBio from "./profile_components/ProfileBio";
import ProfileRecentActivity from "./profile_components/ProfileRecentActivity.js";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import ForumIcon from "@mui/icons-material/Forum";

import { InlineShareButtons } from "sharethis-reactjs";

import platform from "platform-detect/os.mjs";
import encodeurl from "encodeurl";

import { UserContext } from "../../contexts/UserContext";

import "./styles/profile.scss";

const style = {
    position: "absolute",
    color: "#37434f",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function UserProfile() {
    const { userState } = useContext(UserContext);

    const { otherUserId } = useParams();

    // State to Hold Other User Info
    const [otherUser, setOtherUser] = useState();

    // State to Hold Posts
    const [posts, setPosts] = useState();

    // State to Hold Following
    const [bizRelationships, setBizRelationships] = useState();

    // State to control Share Modal
    const [openShareModal, setOpenShareModal] = useState(false);

    const handleCloseShareModal = () => setOpenShareModal(false);

    const [shareBusiness, setShareBusiness] = useState();

    const handleOpenShareModal = (itemObj) => {
        setShareBusiness(itemObj);
        setOpenShareModal(true);
    };

    const handleFollow = () => {
        console.log("Handle Follow");
    };

    const handleUnFollow = () => {
        console.log("Handle UnFollow");
    };

    const encodeMsg = encodeurl(
        `Wanted to share this with you. Check them out. ${
            shareBusiness
                ? shareBusiness.businessName +
                  ": http://localhost:3000/shops/" +
                  shareBusiness.businessId
                : "undefined"
        }/${userState.userId}`
    );
    const smsMessage =
        platform.macos || platform.ios
            ? `sms:&body=${encodeMsg}`
            : `sms:?body=${encodeMsg}`;

    //every time a new post is added this code fires
    useEffect(() => {
        // Get User Info
        db.collection("user")
            .doc(otherUserId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setOtherUser(doc.data());
                } else {
                    return <div>User Not Found</div>;
                }
            })
            .catch((err) => {
                console.log("Error Getting Other User Info");
            });

        // Get Posts
        db.collection("user")
            .doc(otherUserId)
            .collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        postId: doc.id,
                        post: doc.data(),
                    }))
                );
            });

        // Get BizRelationsip Following
        db.collection("user")
            .doc(otherUserId)
            .collection("bizRelationship")
            .onSnapshot((snapshot) => {
                setBizRelationships(
                    snapshot.docs.map((doc) => ({
                        relationshipId: doc.id,
                        relationship: doc.data(),
                    }))
                );
            });
    }, []);

    if (!otherUser) {
        return <div>...Loading User Profile</div>;
    }

    console.log("Other user at User Profile: ", otherUser);

    return (
        <>
            <div className="profile-container">
                <Card
                    sx={{
                        maxWidth: 350,
                    }}
                >
                    <CardContent className="card-content">
                        <div className="profile-body-wrapper">
                            <AvatarSocials user={otherUser} />
                        </div>
                        <ProfileBio
                            user={otherUser}
                            otherUserId={otherUserId}
                            handleFollow={handleFollow}
                            handleUnFollow={handleUnFollow}
                        />
                        <ProfileRecentActivity userId={otherUserId} />
                        {posts ? (
                            <ProfileTabs
                                userId={otherUserId}
                                posts={posts}
                                bizRelationships={bizRelationships}
                                handleOpenShareModal={handleOpenShareModal}
                                followingFriends={otherUser.followingFriends}
                            />
                        ) : (
                            <div>...Loading Profile Bar</div>
                        )}
                    </CardContent>
                </Card>

                <Modal
                    open={openShareModal}
                    onClose={handleCloseShareModal}
                    aria-labelledby="modal2-modal-title"
                    aria-describedby="modal2-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal2-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                        >
                            Shout Out Your Favorite Shops and Get Paid!
                        </Typography>
                        <Typography
                            id="modal2-modal-description"
                            sx={{ mt: 2, textAlign: "center" }}
                        >
                            Click Below and Go Social !!
                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "15px",
                            }}
                        >
                            <InlineShareButtons
                                config={{
                                    alignment: "center", // alignment of buttons (left, center, right)
                                    color: "social", // set the color of buttons (social, white)
                                    enabled: true, // show/hide buttons (true, false)
                                    font_size: 16, // font size for the buttons
                                    labels: "cta", // button labels (cta, counts, null)
                                    language: "en", // which language to use (see LANGUAGES)
                                    networks: [
                                        // which networks to include (see SHARING NETWORKS)
                                        "whatsapp",
                                        "linkedin",
                                        "messenger",
                                        "facebook",
                                        "twitter",
                                    ],
                                    padding: 12, // padding within buttons (INTEGER)
                                    radius: 4, // the corner radius on each button (INTEGER)
                                    show_total: true,
                                    size: 40, // the size of each button (INTEGER)

                                    // OPTIONAL PARAMETERS
                                    // url: `https://smartseedtech.com/${
                                    //     shareBusiness
                                    //         ? shareBusiness.businessId
                                    //         : "undefined"
                                    // }`, // (defaults to current url)
                                    url: "https://www.chickenshacknyc.com/",
                                    description: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (defaults to og:description or twitter:description)
                                    title: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (defaults to og:title or twitter:title)
                                    message: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (only for email sharing)
                                    subject: `Business Name: ${
                                        shareBusiness
                                            ? shareBusiness.businessName
                                            : "undefined"
                                    }`, // (only for email sharing)
                                }}
                            />
                            <div>
                                <center>
                                    <h3>or Send a Text! </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "36px",
                                                marginRight: "20px",
                                            }}
                                        >
                                            {String.fromCodePoint(0x1f449)}
                                        </span>
                                        <a href={smsMessage}>
                                            <ForumIcon
                                                sx={{
                                                    color: "#1c76d2",
                                                    fontSize: "52px",
                                                }}
                                            />
                                        </a>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default UserProfile;
