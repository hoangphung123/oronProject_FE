import NavBar from "../../components/navbar/NavBar.jsx";
import LeftBar1 from "../../components/leftbarFriends/leftbar1.jsx";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext, useEffect } from "react";
import FriendsComponent from "../profileFriendUser/profileFriendUser.jsx"
import * as Userserver from "../../server/itemstore.js"
import { AuthContext } from "../../context/authContext.js";

const Friend = () => {
  const { darkMode } = useContext(DarkModeContext);
  const {currentUserId, setCurrentUserId } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Assuming you have an accessToken, you can get it from your authentication context or elsewhere
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        const friends = await Userserver.getFriends(accessToken);
        setCurrentUserId({ userId: friends.listData[0].id, username: friends.listData[0].username });
        localStorage.setItem("friends", JSON.stringify(currentUserId));
      } catch (error) {
        console.error("Error fetching friends:", error.message);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftBar1 />
        <div style={{ flex: 6 }}>
        <FriendsComponent/>
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Friend;
