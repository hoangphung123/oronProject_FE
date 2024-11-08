import React from "react";
import "./MyProfileComponent.scss";

const MyProfileComponent = () => {
    const userInfo = {
        name: "Dinh Thinh",
        birthday: "04/06/2002",
        address: "Details address",
        contact: "Email or phone number",
    };

    return (
        <div className="my-profile-component">
            <h2>My Profile</h2>
            <div className="profile-details">
                <div className="detail-item">
                    <strong>Name:</strong> <span>{userInfo.name}</span>
                </div>
                <div className="detail-item">
                    <strong>Birthday:</strong> <span>{userInfo.birthday}</span>
                </div>
                <div className="detail-item">
                    <strong>Address:</strong> <span>{userInfo.address}</span>
                </div>
                <div className="detail-item">
                    <strong>Contact:</strong> <span>{userInfo.contact}</span>
                </div>
            </div>
        </div>
    );
};

export default MyProfileComponent;
