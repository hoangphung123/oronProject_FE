import "./profileFriends.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/authContext";
import { useContext, useState, useEffect } from "react";
import * as Userserver from "../../server/userstore";
import * as Postserver from "../../server/itemstore";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/postContext";

const ProfileFriends = () => {
  const { currentUser, setCurrentUser, currentUserId, setCurrentUserId } =
    useContext(AuthContext);
  const { darkMode, toggle } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { setPosts } = useContext(PostsContext);

  const [coverImage, setCoverImage] = useState(
    "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  );
  const [profileImage, setProfileImage] = useState(currentUser.data.profilePic);
  const [profileUserName, setprofileUserName] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        // Retrieve the access token from localStorage
        const accessToken = JSON.parse(localStorage.getItem("access_token"));

        const profileUser = await Userserver.getUserByUsername(
          accessToken,
          currentUserId.username
        );

        console.log("profileUser", profileUser.listData[0].profilePic);

        const pictureUser = profileUser.listData[0].profilePic;
        const backtureUser = profileUser.listData[0].backgroundPic;
        const profileUserName = profileUser.listData[0].username;

        // Check if the access token is available
        if (!accessToken) {
          console.error("Access token not found in localStorage");
          // Handle the case where the access token is not available
          return;
        }

        const userProfile = `http://localhost:3500/${pictureUser}`;
        const userBackProfile = `http://localhost:3500/${backtureUser}`;
        setProfileImage(userProfile);
        setCoverImage(userBackProfile);
        setprofileUserName(profileUserName);
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    const GetPostByUserId = async () => {
      console.log("userId", currentUserId);
      const response = await Postserver.getPostByUserId(
        currentUserId.userId,
        9
      );

      setPosts(response.listData);
    };

    const fetchFollowing = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));

        const followings = await Userserver.getFollowings(accessToken);

        console.log('followings',currentUserId.userId,followings.listData[0].id)
        
        const isCurrentUserFollowing = followings.listData.some(
            (following) => following.id === currentUserId.userId
          );
      
          setIsFollowing(isCurrentUserFollowing);
        // Check if the currentUserId is in the list of followings
        
      } catch (error) {
        console.error("Error fetching user followings:", error);
      }
    };

    // Call the fetchUserProfilePicture function when the component mounts
    fetchFollowing();
    fetchUserProfilePicture();
    GetPostByUserId();
  }, [currentUser.data.profilePic]);

  const handleFollowButtonClick = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));

      // Call the follow/unfollow API based on the current state
      if (isFollowing===false) {
        await Userserver.createFollow(accessToken, currentUserId.userId);
        setIsFollowing(true);
      } else {
        console.log('access_token', accessToken )
        await Userserver.UnFollow(accessToken, currentUserId.userId)
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error handling follow button click:", error);
    }
  };

  return (
    <div className={`profile ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="images">
        <img src={coverImage} alt="" className="cover" />
        <img src={profileImage} alt="" className="profilePic"></img>
        {/* <button className="uploadButtonPicCover" onClick={openPopupCover}>
            <FontAwesomeIcon icon={faCamera} size="2xl"  style={{ color: cameraIconColor }} />
          </button>
        <div className="open_popup">
          <button className="uploadButtonPic" onClick={openPopup}>
            <FontAwesomeIcon icon={faCamera} size="2xl"  style={{ color: cameraIconColor }} />
          </button>
        </div> */}
      </div>
      <div className="profileContainers">
        <div className="uInfo">
          <div className="left"></div>
          <div className="center">
            <span>{profileUserName}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Vietnam</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>tamnhu.dev</span>
              </div>
            </div>
            <button onClick={handleFollowButtonClick}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default ProfileFriends;
