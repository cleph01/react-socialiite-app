import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import ProductBarView from "./ProductsBarView.js";

import "../../styles/product/search.scss";

const categories = [
    "Breakfast",
    "Burger",
    "Camera",
    "Coffee",
    "Hats",
    "Honey",
    "Basketball",
    "Fern",
    "Mushrooms",
    "Tomato basil",
    "Sea star",
    "Bike",
];

function Search(props) {
    const [values, setValues] = useState({
        category: "",
        search: "",
        results: [],
        searched: false,
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // create list function
    const list = (param) => {
        return new Promise();
    };
    const handleChange = (name) => (event) => {
        setValues({
            ...values,
            [name]: event.currentTarget,
        });
    };
    const search = () => {
        if (values.search) {
            list({
                search: values.search || undefined,
                category: values.category,
            }).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, results: data, searched: true });
                }
            });
        }
    };
    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault();
            search();
        }
    };
    return (
        <div>
            <Card
                className="card-container"
                style={{ backgroundColor: "#dcdcdc" }}
            >
                <div className="search-header">
                    <div className="select-category-btn" onClick={handleOpen}>
                        Select Category <ArrowDropDownIcon />
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onChange={handleChange("category")}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {categories.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                onClick={handleClose}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                    <TextField
                        className="search-element"
                        id="search"
                        label="Search products"
                        type="search"
                        onKeyDown={enterKey}
                        onChange={handleChange("search")}
                        margin="normal"
                    />
                    <div className="search-element search-btn" onClick={search}>
                        <SearchIcon />
                    </div>
                    <Divider />
                </div>

                <ProductBarView />
            </Card>
        </div>
    );
}

export default Search;
