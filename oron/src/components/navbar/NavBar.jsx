import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import * as Userserver from "../../server/userstore";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, currentUserId, setCurrentUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [profileImage, setProfileImage] = useState(currentUser.data.profilePic);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    if (query.trim() === "") {
      // If the search query is empty, reset recent searches
      setRecentSearches([]);
    } else {
      try {
        // Retrieve the access token from localStorage
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
  
        // Call the getUserByUsername function to get user by username
        const user = await Userserver.getUserByUsername(accessToken, query);
  
        // Set recent searches to the entire listData array
        setRecentSearches(user?.listData || []);
  
      } catch (error) {
        console.error('Error while fetching user by username:', error.message);
      }
    }
  };

  const handleUserClicks = ({ userId, username }) => {
    // Use the userId and username
    setCurrentUserId({ userId, username });
    console.log('userId', userId);
    console.log('username', username);
    navigate("/profileFriends")
    // Optionally, you may also want to close the recent searches dropdown
    setShowRecentSearches(false);
  };


  const handleSearchClick = () => {
    setShowRecentSearches(true);
  };

  // Hàm xử lý khi nhấp bên ngoài ô tìm kiếm
  const handleOutsideClick = (event) => {
    // Kiểm tra xem sự kiện click có phải là bên trong ô tìm kiếm hay không
    if (event.target.closest(".search")) {
      // Bạn có thể thêm xử lý khác ở đây nếu cần thiết
      return;
    }

    // Nếu không phải là bên trong ô tìm kiếm, đóng dropdown
    setShowRecentSearches(false);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Chuyển hướng đến trang đăng nhập (hoặc trang khác tùy thuộc vào yêu cầu của bạn)
    navigate("/login");
    // Đóng Menu sau khi logout
    handleClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // useEffect(() => {
  //   const fetchUserProfilePicture = async () => {
  //     try {
  //       // Retrieve the access token from localStorage
  //       const accessToken = JSON.parse(localStorage.getItem("access_token"));

  //       const profileUser = await Userserver.getProfile(accessToken);

  //       localStorage.setItem("user", JSON.stringify(profileUser));

  //       const user = JSON.parse(localStorage.getItem("user"));
  //       const pictureUser = user.data.profilePic

  //       const userProfile = `http://localhost:3500/user-profile/${pictureUser}`;

  //       setProfileImage(userProfile)

  //     } catch (error) {
  //       console.error('Error fetching user profile picture:', error);
  //     }
  //   };

  //   // Call the fetchUserProfilePicture function when the component mounts
  //   fetchUserProfilePicture();
  // }, [currentUser.data.profilePic]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>ORON Social</span>
        </Link>
        {/* <HomeOutlinedIcon/> */}
        { darkMode ? <WbSunnyOutlinedIcon onClick = {toggle}/>: 
        <DarkModeOutlinedIcon onClick = {toggle} /> 
         }
        {/* <GridViewOutlinedIcon/> */}
        <div className="search">
          <div className="search_input">
            <SearchOutlinedIcon />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
            />
          </div>
          {showRecentSearches && (
            <div className="recent-searches">
            {recentSearches.length > 0 ? (
              recentSearches.map((userData, index) => {
                return (
                  <div key={index} className="search-item" onClick={() => handleUserClicks({ userId: userData.id, username: userData.username })}>
                    {/* Assuming user data has properties like 'profilePic' and 'username' */}
                    <img
                      src={`http://localhost:3500/${userData.profilePic}`}
                      alt={`${userData.username} avatar`}
                      className="avatar"
                    />
                    <span>{userData.username}</span>
                  </div>
                );
              })
            ) : (
              <div>Không có tìm kiếm gần đây</div>
            )}
          </div>
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={handleUserClick}>
          <img
            src={`http://localhost:3500/${currentUser.data.profilePic}`}
            alt=""
          />
          <span>{currentUser.data.username}</span>
        </div>

        {/* Material-UI Menu component */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          
        >
          <MenuItem
            component={Link}
            to={`/profile/${currentUser.data.id}`}
            onClick={handleClose}
            className="custom-menu"
          >
            Profile
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>Option 2</MenuItem> */}
          <MenuItem className="custom-menu" onClick={handleLogout}>logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
