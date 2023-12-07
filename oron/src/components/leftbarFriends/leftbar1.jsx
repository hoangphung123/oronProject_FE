import "./leftbar1.scss";
import { PostsContext } from "../../context/postContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import * as Userserver from "../../server/userstore";
import * as Postserver from "../../server/itemstore";

const LeftBar1 = () => {
  const { friendsList, followingList, followerList } = useContext(PostsContext);
  const [selectedTab, setSelectedTab] = useState("following");
  const { currentUserId, setCurrentUserId, setCurrentUserProfile } = useContext(AuthContext);
  const { setPosts } = useContext(PostsContext);

  let dataToRender = [];

  // Determine which data to render based on the selectedTab
  if (selectedTab === "friends") {
    dataToRender = friendsList;
  } else if (selectedTab === "followers") {
    dataToRender = followerList;
  } else if (selectedTab === "following") {
    dataToRender = followingList;
  }

  const handleUserClick = async (userId, username) => {
    console.log(`Clicked on user with ID: ${userId} and Username: ${username}`);
    const updatedUserId = { userId, username };
    setCurrentUserId(updatedUserId);

    const accessToken = JSON.parse(localStorage.getItem("access_token"));

    const res = await Userserver.getUserByUsername(accessToken, currentUserId.username);

    setCurrentUserProfile(res)

    const response = await Postserver.getPostByUserId(
      currentUserId.userId,
      9
    );

    setPosts(response.listData);

    // Store the updated user data in localStorage
    localStorage.setItem("friends", JSON.stringify(updatedUserId));
  };

  return (
    <div className="leftBar1">
      <div className="container">
        <hr />
        <div className="tabs">
          <div
            className={`tab ${selectedTab === "friends" ? "active" : ""}`}
            onClick={() => setSelectedTab("friends")}
          >
            Friends
          </div>
          <div
            className={`tab ${selectedTab === "followers" ? "active" : ""}`}
            onClick={() => setSelectedTab("followers")}
          >
            Followers
          </div>
          <div
            className={`tab ${selectedTab === "following" ? "active" : ""}`}
            onClick={() => setSelectedTab("following")}
          >
            Following
          </div>
        </div>
        <div className="menu">
          {dataToRender.map((userData, index) => (
            <div
              className="user"
              key={index}
              onClick={() => handleUserClick(userData.id, userData.username)}
            >
              <div className="userInfos">
                <img
                  src={`http://localhost:3500/${userData.profilePic}`}
                  alt=""
                />
                <div className="online" />
                <span>{userData.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftBar1;
