import React from "react";
import "./FriendComponent.scss";
import { Search } from "lucide-react";

const FriendComponent = () => {
  const friends = [
    { name: "Phung", avatar: "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg" },
    { name: "Huy Hoang", avatar: "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg" },
    { name: "Xuan Loc", avatar: "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg" },
    // Thêm bạn bè khác ở đây...
  ];

  return (
    <div className="friend-component">
      <div className="Friend_title">
        <h2>Friends</h2>
        <div className="Friend_relative">
          <Search className="Friend_search" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="Friend_input"
            // value={searchTerm}
            // onChange={handleSearch}
          />
        </div>
      </div>
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
