import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import * as Userserver from "../../server/userstore"
import { useContext, useState, useEffect} from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(currentUser.data.profilePic);

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
        <Link to = "/" style={{textDecoration:"none"}}>
          <span>ORON Social</span>
        </Link>
        {/* <HomeOutlinedIcon/> */}
        { darkMode ? <WbSunnyOutlinedIcon onClick = {toggle}/>: 
        <DarkModeOutlinedIcon onClick = {toggle} /> 
         }
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..."/>
        </div>
      </div>
      <div className="right">
          <PersonOutlinedIcon/>
          <EmailOutlinedIcon/>
          <NotificationsOutlinedIcon/>
          <div className="user" onClick={handleUserClick}>
            <img src={`http://localhost:3500/${currentUser.data.profilePic}`} alt="" />
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
          <MenuItem component={Link} to={`/profile/${currentUser.data.id}`} onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>Option 2</MenuItem>
          <MenuItem onClick={handleLogout}>logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default NavBar