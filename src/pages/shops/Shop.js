import React, { useState, useEffect, useContext, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import YouTubeEmbed from "./components/YouTubeEmbed.js";
import AvailablePrizes from "./components/AvailablePrizes";

import { firebase, db } from "../../firebase/firebase_config";

import IconButton from "@mui/material/IconButton";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import ForumIcon from "@mui/icons-material/Forum";

import { InlineShareButtons } from "sharethis-reactjs";

import platform from "platform-detect/os.mjs";

import encodeurl from "encodeurl";

import "./styles/shop.scss";

import Nav from "../../components/nav_bar/Nav.js";

// const logoUrl = shop._id
//           ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
//           : '/api/shops/defaultphoto'

function Shop() {
    const { user } = useContext(UserContext);

    const { shopId } = useParams();

    const [business, setBusiness] = useState();

    const [userBizRelationship, setUserBizRelationship] = useState();

    const [prizes, setPrizes] = useState();

    const [walletPrize, setwalletPrize] = useState();
    const [shop, setShop] = useState("");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Get Business Info
        db.collection("shops")
            .doc(shopId)
            .get()
            .then((doc) => {
                setBusiness(doc.data());
            })
            .catch((err) => {
                console.log("Error getting Business Info: ", err);
            });

        db.collection("shops")
            .doc(shopId)
            .collection("loyaltyPrizes")
            .get()
            .then((doc) => {
                console.log("docs: ", doc);
                setPrizes(
                    doc.docs.map((doc) => ({
                        prizeId: doc.id,
                        prize: doc.data(),
                    }))
                );
            })
            .catch((err) => {
                console.log("Error getting Prizes: ", err);
            });
    }, []);

    // State to control Add Prize to Wallet Modal
    const [openClaimModal, setOpenClaimModal] = useState(false);

    // State to control Share Modal
    const [openShareModal, setOpenShareModal] = useState(false);

    const [goStatus, setGoStatus] = useState({
        fetchingDistance: false,
        gotDistance: false,
    });

    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpenClaimModal = (itemObj) => {
        if (goStatus.gotDistance && user) {
            setOpenClaimModal(true);
            setwalletPrize(itemObj);

            console.log("Wallet Prize: ", walletPrize);
        } else {
            setAlertMsg({
                message: "Please Provide Your Location and Be logged in",
                severity: "error",
            });

            setOpenSnackBar(true);
        }
    };
    const handleCloseClaimModal = () => setOpenClaimModal(false);

    const handleOpenShareModal = () => {
        setOpenShareModal(true);
    };

    const handleCloseShareModal = () => setOpenShareModal(false);

    const handleAddToWallet = () => {
        console.log("Add to wallet invoked: ", walletPrize);

        if (
            walletPrize.prizeDetails.pointThreshold <=
            userBizRelationship.relationshipInfo.pointSum
        ) {
            //Add Prize to Wallet and Update pointsSum in Biz Relationship
            let walletRef = db
                .collection("user")
                .doc(user.uid)
                .collection("wallet");

            walletRef
                .add({
                    businessId: shopId,
                    businessName: business.businessName,
                    emoji: walletPrize.prizeDetails.emoji,
                    itemDescription: walletPrize.prizeDetails.itemDescription,
                    itemId: walletPrize.prizeId,
                    redeemed: false,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((docRef) => {
                    console.log("Prize Added to Wallet with ID: ", docRef.id);

                    // Decrement Points Sum from BizRelationship
                    let userRef = db
                        .collection("user")
                        .doc(user.uid)
                        .collection("bizRelationship")
                        .doc(userBizRelationship.realtionshipId);

                    userRef
                        .update({
                            pointSum: firebase.firestore.FieldValue.increment(
                                -walletPrize.prizeDetails.pointThreshold
                            ),
                        })
                        .then(() => {
                            console.log("PointSum successfully updated!");
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating PointSume: ", error);
                        });

                    setAlertMsg({
                        message: "Item Added to Wallet.",
                        severity: "success",
                    });
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            setAlertMsg({
                message: "Not Enouguh Points.",
                severity: "error",
            });
        }

        setOpenClaimModal(false);
        setOpenSnackBar(true);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    const encodeMsg = encodeurl(
        `Wanted to share this with you. Check them out. http://localhost:3000/shop/${shopId}/${
            user ? user.uid : "undefined"
        }`
    );
    const smsMessage =
        platform.macos || platform.ios
            ? `sms:&body=${encodeMsg}`
            : `sms:?body=${encodeMsg}`;

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    console.log("Shop Id: ", shopId);

    console.log("Business info: ", business);
    console.log("Prizes: ", prizes);
    console.log("User: ", user || "undefined");
    console.log("Wallet Prize: ", walletPrize);

    if (!business) {
        return <div>...Loading</div>;
    }

    return (
        <div className="container">
            <Nav />

            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            loading="lazy"
                            alt={business.businessName}
                            src={business.logoUrl}
                            sx={{
                                /* bgcolor: red[500],*/
                                width: 50,
                                height: 50,
                                margin: "auto",
                                padding: "10px",
                                border: "1px solid #f0f0f0",
                            }}
                        />
                    }
                    action={
                        <IconButton aria-label="add to favorites">
                            <LocalFireDepartmentIcon />
                        </IconButton>
                    }
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                <CardContent>
                    <YouTubeEmbed youtubeId={business.youtubeId} />
                    <h3>About Us </h3>

                    <div>{business.description}</div>

                    <h3>Free Prizes </h3>
                    <AvailablePrizes
                        prizes={prizes}
                        handleOpenClaimModal={handleOpenClaimModal}
                        storeId={shopId}
                        handleOpenShareModal={handleOpenShareModal}
                    />

                    <br />
                </CardContent>
            </Card>

            <Modal
                open={openClaimModal}
                onClose={handleCloseClaimModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                    >
                        Sure About Adding To Your Wallet?
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Your Points Will Be Adjusted and Can't be Reversed.
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary" onClick={handleAddToWallet}>
                            Add to Wallet
                        </Button>
                        <Button color="error" onClick={handleCloseClaimModal}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>

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
                                url: `https://smartseedtech.com/${shopId}`, // (defaults to current url)

                                description: `Business Name: ${business.businessName}`, // (defaults to og:description or twitter:description)
                                title: `Business Name: ${business.businessName}`, // (defaults to og:title or twitter:title)
                                message: `Business Name: ${business.businessName}`, // (only for email sharing)
                                subject: `Business Name: ${business.businessName}`, // (only for email sharing)
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

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={alertMsg.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertMsg.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}

export default Shop;