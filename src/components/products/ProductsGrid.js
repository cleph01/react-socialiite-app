import React from "react";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import ImageList from "@mui/material/ImageList";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import { makeStyles } from "@mui/styles";

import AddToCart from "../cart/AddToCart";

import PropTypes from "prop-types";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "space-around",
//         overflow: "hidden",
//         background: "snow",
//         textAlign: "left",
//         padding: "0 8px",
//     },
//     container: {
//         minWidth: "100%",
//         paddingBottom: "14px",
//     },
//     imageList: {
//         width: "100%",
//         minHeight: 200,
//         padding: "16px 0 10px",
//     },
//     title: {
//         padding: `10px`,
//         color: "snow",
//         width: "100%",
//     },
//     item: {
//         textAlign: "center",
//     },
//     image: {
//         height: "100%",
//     },
//     tileBar: {
//         backgroundColor: "rgba(0, 0, 0, 0.72)",
//         textAlign: "left",
//     },
//     tileTitle: {
//         fontSize: "1.1em",
//         marginBottom: "5px",
//         color: "rgb(189, 222, 219)",
//         display: "block",
//     },
// }));

const itemData = [
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        name: "@bkristastucchio",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
        name: "@rollelflex_graphy726",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
        name: "@helloimnik",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
        name: "@nolanissac",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
        name: "@hjrc33",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
        name: "@arwinneil",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
        name: "@tjdragotta",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Fern",
        name: "@katie_wasserman",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Mushrooms",
        name: "@silverdalex",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
        name: "@shelleypauls",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
        name: "@peterlaster",
    },
    {
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
        name: "@southside_customs",
    },
];

function Products(props) {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {itemData.length > 0 ? (
                <ImageList sx={{ width: "100%", height: 450 }} cols={3}>
                    {itemData.map((product, i) => (
                        <ImageListItem
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Link to={"/product/" + product._id}>
                                <img
                                    // src={"/api/product/image/" + product._id}
                                    src={`${product.img}?w=246  &fit=crop&auto=format`}
                                    srcSet={`${product.img}?w=246&fit=crop&auto=format&dpr=2 2x`}
                                    alt={product.name}
                                    loading="lazy"
                                />
                            </Link>
                            <ImageListItemBar
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    color: "snow",
                                }}
                                title={
                                    <Link
                                        to={"/product/" + product._id}
                                        style={{
                                            textDecoration: "none",
                                            color: "snow",
                                        }}
                                    >
                                        {product.name}
                                    </Link>
                                }
                                subtitle={<span>$ {product.price}</span>}
                                actionIcon={<AddToCart item={product} />}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                props.searched && (
                    <Typography variant="subheading" component="h4">
                        No products found! :(
                    </Typography>
                )
            )}
        </div>
    );
}

export default Products;
