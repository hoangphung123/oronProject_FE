import "./profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/authContext";
import { useContext, useState , useEffect} from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import * as Userserver from "../../server/userstore";
import * as Postserver from "../../server/itemstore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import {DarkModeContext} from "../../context/darkModeContext"
import { useNavigate } from "react-router-dom"
import { PostsContext } from "../../context/postContext";





const Profile = () => {
  const {currentUser, setCurrentUser } = useContext(AuthContext);
  const { darkMode, toggle } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const {setPosts} = useContext(PostsContext);

  const cameraIconColor = darkMode ? '#fff' : '#000';
  

  const api_url = 'http://127.0.0.1:3500/api/v1';

  const [coverImage, setCoverImage] = useState(
    "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  );
  const [profileImage, setProfileImage] = useState(currentUser.data.profilePic);

   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [isPopupOpenCover, setIsPopupOpenCover] = useState(false);
   const [selectedImage, setSelectedImage] = useState(null);
   const [selectedImages, setSelectedImages] = useState(null);
 
 
   const handleCoverImageUpload = async (e) => {
     try {
       const file = e.target.files[0];
       const formData = new FormData();
       formData.append("file", file); 
 
       formData.append("filename", file.name);
 
       const response = await axios.post(`${api_url}/picture/upload/local`, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
 
       console.log("Cover image uploaded:", response.data);
     } catch (error) {
       console.error("Error uploading cover image:", error);
     }
   };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    

    const imageUrl = URL.createObjectURL(file);
    console.log('file',imageUrl)
    setSelectedImage(imageUrl);
    setSelectedImages(file)
    
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

 
 
  const openPopup = () => {
     setIsPopupOpen(true);
  };
 
  const closePopup = () => {
     setIsPopupOpen(false);
  };

  const openPopupCover = () => {
    setIsPopupOpenCover(true);
  };

  const closePopupCover = () => {
    setIsPopupOpenCover(false);
  };

 

const handleSaveImage = async () => {
  try {
    if (selectedImages) {
      const accessToken = JSON.parse(localStorage.getItem("access_token") );
      
      if (!accessToken) {
        console.error('Access token not found in localStorage');
        return;
      }

      const uploadedPicture = await Userserver.uploadPictureUser(accessToken, selectedImages);
      setProfileImage(selectedImage);
      currentUser.data = { ...currentUser.data, profilePic: uploadedPicture.data.profilePic };
      // console.log('curentUser',currentUser)
      // navigate(`/profile/${currentUser.data.id}`)
      const profileUsers = await Userserver.getProfile(accessToken);
      
      setCurrentUser(profileUsers)
    }

    closePopup();
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

const handleSaveImageCover = async () => {
  try {
    if (selectedImages) {
      const accessToken = JSON.parse(localStorage.getItem("access_token") );
      
      if (!accessToken) {
        console.error('Access token not found in localStorage');
        return;
      }

      const uploadedPicture = await Userserver.uploadPictureUserCover(accessToken, selectedImages);
      setCoverImage(selectedImage);
      console.log('Image saved successfully:', uploadedPicture);
      const profileUsers = await Userserver.getProfile(accessToken);
      
      setCurrentUser(profileUsers)
    }

    closePopupCover();
  } catch (error) {
    console.error('Error saving image:', error);
  }
};



useEffect(() => {
  const fetchUserProfilePicture = async () => {
    try {
      // Retrieve the access token from localStorage
      const accessToken = JSON.parse(localStorage.getItem("access_token"));

      const profileUser = await Userserver.getProfile(accessToken);
        
      localStorage.setItem("user", JSON.stringify(profileUser));

      const user = JSON.parse(localStorage.getItem("user"));
      console.log(accessToken)
      const pictureUser = user.data.profilePic
      const backtureUser = user.data.backgroundPic
      console.log(user.data.profilePic)
      

      // Check if the access token is available
      if (!accessToken) {
        console.error('Access token not found in localStorage');
        // Handle the case where the access token is not available
        return;
      }

      const userProfile = `http://localhost:3500/${pictureUser}`;
      const userBackProfile = `http://localhost:3500/${backtureUser}`;
      setProfileImage(userProfile)
      setCoverImage(userBackProfile)

      
      
    } catch (error) {
      console.error('Error fetching user profile picture:', error);
    }
  };

  const GetPostByUserId = async () => {
    const userID = currentUser.data.id
    const response = await Postserver.getPostByUserId(userID, 9)
    
    setPosts(response.listData);
  }

  // Call the fetchUserProfilePicture function when the component mounts
  fetchUserProfilePicture();
  GetPostByUserId();
}, [currentUser.data.profilePic]);


  
  return (
    <div className={`profile ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <div className="images">
        <img src={coverImage} alt="" className="cover" />
        <img src={profileImage} alt="" className="profilePic"></img>
          <button className="uploadButtonPicCover" onClick={openPopupCover}>
            <FontAwesomeIcon icon={faCamera} size="2xl"  style={{ color: cameraIconColor }} />
          </button>
        <div className="open_popup">
          <button className="uploadButtonPic" onClick={openPopup}>
            <FontAwesomeIcon icon={faCamera} size="2xl"  style={{ color: cameraIconColor }} />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <>
        <div className="overlay" onClick={closePopup}></div>
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Enter OTP Code</h2>
            <div className="imageContainer">
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>image here</p>
              </div>
              {selectedImage && <img src={selectedImage} alt="Selected" />}
            </div>
            <div className="button_AS">
              <button className="Access_button" onClick={handleSaveImage} >Upload File
              </button>
              <button className="SendOTP_button" >Save Image
                </button>
            </div>
          </div>
        </div>
        </>
      )}
      {isPopupOpenCover && (
        <>
        <div className="overlay" onClick={closePopupCover}></div>
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopupCover}>
              &times;
            </span>
            <h2>SetImage</h2>
            <div className="imageContainer">
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>image here</p>
              </div>
              {selectedImage && <img src={selectedImage} alt="Selected" />}
            </div>
            <div className="button_AS">
              <button className="Access_button" onClick={handleSaveImageCover} >Upload File
              </button>
              <button className="SendOTP_button" >Save Image
                </button>
            </div>
          </div>
        </div>
        </>
      )}
      <div className="profileContainer">
            <div className="uInfo">
                  <div className="left">
                  </div>
                  <div className="center">
                      <span>{currentUser.data.username}</span>
                      <div className="info">
                          <div className="item">
                            <PlaceIcon/>
                            <span>Vietnam</span>
                          </div>
                          <div className="item">
                            <LanguageIcon/>
                            <span>tamnhu.dev</span>
                          </div>
                      </div>
                      {/* <button>follow</button> */}
                  </div>
                  <div className="right">
                      <EmailOutlinedIcon/>
                      <MoreVertIcon/>
                  </div>
            </div>
            <Posts/>
      </div>
      
    </div>
  );
};

export default Profile