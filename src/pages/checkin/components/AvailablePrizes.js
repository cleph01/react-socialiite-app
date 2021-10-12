import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";

import AvailablePrizeItem from "../components/AvailablePrizeItem";

import Divider from "@mui/material/Divider";

import "../styles/available_prize_list.scss";

function AvailablePrizes({ prizes, handleOpenClaimModal }) {
    console.log("Available Prizes: ", prizes);

    if (!prizes) {
        return <div>...Loading</div>;
    }

    return (
        <List className="prize-list-container">
            {prizes.map((prize, i) => (
                <div key={i}>
                    <AvailablePrizeItem
                        prize={prize}
                        handleOpenClaimModal={handleOpenClaimModal}
                    />
                    <Divider />
                </div>
            ))}
        </List>
    );
}

export default AvailablePrizes;
