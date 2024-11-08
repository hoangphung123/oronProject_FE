import React from "react";
import "./FriendComponent.scss";

const FriendComponent = () => {
    const friends = [
        { name: "Phung", avatar: "https://example.com/avatar1.jpg" },
        { name: "Huy Hoang", avatar: "https://example.com/avatar2.jpg" },
        { name: "Xuan Loc", avatar: "https://example.com/avatar3.jpg" },
        // Thêm bạn bè khác ở đây...
    ];

    return (
        <div className="friend-component">
            <h2>Friends</h2>
            <div className="friend-list">
                {friends.map((friend, index) => (
                    <div key={index} className="friend-card">
                        <img src={friend.avatar} alt={friend.name} className="avatar" />
                        <span>{friend.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendComponent;
