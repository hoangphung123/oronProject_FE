import "./leftbar.scss"
import Friends from "../../assets/1.png";
import Gallery from "../../assets/8.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import * as Userserver from "../../server/userstore"
const LeftBar = () => {
  const {currentUser} = useContext(AuthContext)
  const [profileImage, setProfileImage] = useState(currentUser.data.profilePic);
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
    <div className="leftBar">
      <div className="container">
         {/* First Group Items */}
        <div className="menu">
        <div className="user">
          {/* Link to navigate to the user's profile */}
          <Link to={`/profile/${currentUser.id}`}>
            <img src={`http://localhost:3500/${currentUser.data.profilePic}`} alt="" />
          </Link>
          <span>{currentUser.data.username}</span>
        </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
              <img src={Gallery} alt="" />
              <span>Gallery</span>
          </div>
        </div>
        <hr/>
      </div>
    </div>
  )
}

export default LeftBar