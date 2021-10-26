import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";

import { db } from "../../../firebase/firebase_config";

import FollowListItem from "./FollowListItem";

import Divider from "@mui/material/Divider";

import "./styles/follow_list.scss";

function FollowList({ bizRelationships, handleOpenShareModal }) {
    const [businessList, setBusinessList] = useState([]);
    const [prizes, setPrizes] = useState([]);
    const [numPrizes, setNumPrizes] = useState([]);

    const getItems = (item_ids, callback) => {
        let itemRefs = item_ids.map((id) => {
            return db.collection("shops").doc(id).get();
        });
        Promise.all(itemRefs)
            .then((docs) => {
                let items = docs.map((doc) => {
                    return { businessId: doc.id, businessInfo: doc.data() };
                });
                callback(items);
            })
            .catch((error) => console.log(error));
    };

    const handleSettingBusinessList = (items) => {
        setBusinessList(
            items.map((item) => ({
                businessId: item.businessId,
                businessInfo: item.businessInfo,
            }))
        );
    };

    const getPrizes = (item_ids, callback) => {
        let itemRefs = item_ids.map((id) => {
            return db
                .collection("shops")
                .doc(id)
                .collection("loyaltyPrizes")
                .get();
        });
        Promise.all(itemRefs)
            .then((docs) => {
                let items = docs.map((doc) => {
                    return doc.docs;
                });
                callback(items);
            })
            .catch((error) => console.log(error));
    };

    const handleSettingPrizes = (items) => {
        items.forEach((docs, index) => {
            setNumPrizes((prevState) => {
                return [...prevState, docs.length];
            });
            // console.log("Remap Doc: ", docs.length);

            // How to set value from Collection
            // docs.forEach((item) => {
            //     setPrizes((prevState) => {
            //         return [
            //             ...prevState,
            //             { prizeId: item.id, prizeInfo: item.data() },
            //         ];
            //     });
            // });
        });
    };

    useEffect(() => {
        const bizIds = bizRelationships.map(
            (relationship) => relationship.relationshipId
        );

        getItems(bizIds, handleSettingBusinessList);

        getPrizes(bizIds, handleSettingPrizes);
    }, []);

    if (!bizRelationships) {
        return <div>...Loading</div>;
    }

    return (
        <List className="prize-list-container">
            {businessList.map((business, i) => (
                <div key={i}>
                    <FollowListItem
                        business={business}
                        handleOpenShareModal={handleOpenShareModal}
                        numPrizes={numPrizes[i]}
                    />
                    <Divider />
                </div>
            ))}
        </List>
    );
}

export default FollowList;