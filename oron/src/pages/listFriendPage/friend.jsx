import NavBar from "../../components/navbar/NavBar.jsx";
import LeftBar1 from "../../components/leftbarFriends/leftbar1.jsx";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext } from "react";
import FriendsComponent from "../profile/Profile.jsx"

const Friend = () => {
  const { darkMode } = useContext(DarkModeContext);

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
