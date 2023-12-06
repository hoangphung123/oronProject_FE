import React, { useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import NavBar from "../../components/navbar/NavBar.jsx";
import "./ranking.scss";
import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext } from "react";
import avata from './avata.jpg';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Ranking = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedQuantity, setSelectedQuantity] = useState(5);

    const handleChangeWeek = (event) => {
        setSelectedWeek(event.target.value);
    };

    const handleChangeQuantity = (event) => {
        setSelectedQuantity(event.target.value);
    };

    const rows: GridRowsProp = [
        { id: 1, col1: 'Top 1', col2: 'Hoang', col3: '5', col4: '5' },
        // Other rows...
    ];

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Top', width: 150 },
        { field: 'col2', headerName: 'Name', width: 150 },
        { field: 'col3', headerName: 'Posts', width: 150 },
        { field: 'col4', headerName: 'Rating', width: 150 },
    ];

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <div className='ranking'>
                <NavBar />
                    <h1> TOP RANKING IN WEEK</h1>
                <div className="container">
                    <div className="left-container">
                        <div className="select-row-container">
                            {/* Week Select */}
                            <FormControl style={{ width: '100px' }}>
                                <InputLabel id="week-select-label">Select Week</InputLabel>
                                <Select
                                    labelId="week-select-label"
                                    id="week-select"
                                    value={selectedWeek}
                                    onChange={handleChangeWeek}
                                    MenuProps={{
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left",
                                        },
                                    }}
                                >
                                    {[...Array(52).keys()].map((week) => (
                                        <MenuItem key={week + 1} value={week + 1}>{week + 1}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Quantity Select */}
                            <FormControl style={{ width: '150px', marginLeft: '20px' }}>
                                <InputLabel id="quantity-select-label">Select Quantity</InputLabel>
                                <Select
                                    labelId="quantity-select-label"
                                    id="quantity-select"
                                    value={selectedQuantity}
                                    onChange={handleChangeQuantity}
                                    MenuProps={{
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left",
                                        },
                                    }}
                                >
                                    {[5, 10, 15, 20].map((quantity) => (
                                        <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                    <div className="right-container">
                        <div className="profile">
                            <h2>Top 1 in week</h2>
                            <img src={avata} alt="Profile" />
                            <h3>Huynh Dinh Thinh</h3>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="star">&#9733;</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ranking;