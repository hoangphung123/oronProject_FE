import React from 'react';
import './ranking.scss';
import NavBar from "../../components/navbar/NavBar";
import LeftBar from '../../components/leftbar/LeftBar';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";




const HighScore = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavBar />
            <div className= "background" style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    {/* <div className="background"> */}
                        <div className="container">
                            <div className="ranking_container">
                                <div className="ranking_column first_one">
                                    <div className="user_name">
                                        <h1 className="name">Loc</h1>
                                    </div>
                                    <div className="rating1">&#129352;</div>
                                    <div className="point">
                                        <h1 className="score">4.5</h1>
                                        <div className="rating">
                                            {/* Repeat the star icon for each star */}
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="ranking_column second_one">
                                    <div className="user_name">
                                        <h1 className="name">Hoang</h1>
                                    </div>
                                    <div className="rating1">&#129351;</div>
                                    <div className="point">
                                        <h1 className="score">5</h1>
                                        <div className="rating">
                                            {/* Repeat the star icon for each star */}
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ranking_column third_one">
                                    <div className="user_name">
                                        <h1 className="name">Thinh</h1>
                                    </div>
                                    <div className="rating3">&#129353;</div>
                                    <div className="point">
                                        <h1 className="score">4</h1>
                                        <div className="rating">
                                            {/* Repeat the star icon for each star */}
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9733;</span>
                                            <span>&#9734;</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </div>

    );
};

export default HighScore;
