import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tooltip from "@mui/material/Tooltip";
import Modal from "../../components/modal/modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/authContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import * as Itemserver from "../../server/itemstore";
import { PostsContext } from "../../context/postContext";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import AngryIcon from "@mui/icons-material/Angry";
import Popover from "@mui/material/Popover";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedPostUser, setSelectedPostUser] = useState(null);
  const { savePost, setSavePost } = useContext(PostsContext);
  const [likeds, setLikeds] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [likeAnchorEl, setLikeAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState(null);
  const [updatedTotalReactions, SetUpdatedTotalReactions] = useState(null);

  const handleInputChange = (e, inputField) => {
    const value = e.target.value;
    switch (inputField) {
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const imageUrl = URL.createObjectURL(file);
    console.log("file", imageUrl);
    setSelectedImage(file);
    setSelectedImages(imageUrl);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
    // Pass the post user information to the state
    setSelectedPostUser(post.user);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleSendClick = () => {};
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });
  const handleRegistrationClick = () => {
    // Check if the post belongs to the current user
    if (post.user.username === currentUser.data.username) {
      toast.error("This post belongs to you.");
    } else {
      setOpenModal(true);
    }
  };

  const handleSavePost = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const savedPost = await Itemserver.savePost(accessToken, post.id);

      const newData = {
        id: savedPost.id,
        description: savedPost.data.post.description,
        imageURL: savedPost.data.post.imageURL,
        videoURL: savedPost.videoURL,
        status: savedPost.status,
        fullAddress: savedPost.fullAddress,
        specificAddress: savedPost.specificAddress,
        user: {
          id: currentUser.data.id,
          username: post.user.username,
          name: currentUser.data.name,
          fullAddress: currentUser.data.fullAddress,
          specificAddress: currentUser.data.specificAddress,
          phoneNumber: currentUser.data.phoneNumber,
          email: currentUser.data.email,
          profilePic: `${currentUser.data.profilePic}`,
          backgroundPic: currentUser.data.backgroundPic,
          isVerifyPhone: currentUser.data.isVerifyPhone,
          isVerifyEmail: currentUser.data.isVerifyEmail,
          status: currentUser.data.status,
          updatedAt: currentUser.data.updatedAt,
          createdAt: currentUser.data.createdAt,
        },
        createdAt: savedPost.createdAt,
        updatedAt: savedPost.updatedAt,
      };

      // Update the save posts state with the new data
      setSavePost((prevSavePosts) => [newData, ...prevSavePosts]);

      console.log("Post saved successfully:", savedPost);
      // (Có thể thêm thông báo hoặc cập nhật UI ở đây nếu cần)
    } catch (error) {
      console.error("Error saving post:", error.message);
      // (Có thể thêm thông báo lỗi ở đây nếu cần)
    }
  };

  const handleLikeClick = (event) => {
    // Toggle between FavoriteOutlinedIcon and FavoriteBorderOutlinedIcon
    const updatedIcon = selectedIcon ? null : <FavoriteOutlinedIcon />;
    setSelectedIcon(updatedIcon);
  
    // Update total reactions based on the toggle
    const updatedTotalReactions = selectedIcon
      ? post.totalReactions
      : post.totalReactions + 1;
    SetUpdatedTotalReactions(updatedTotalReactions);
  
    setLikeAnchorEl(event.currentTarget);
    setPopoverId(event.currentTarget.id);
  };
  
  

  const handleIconSelect = (selectedIcon) => {
    setSelectedIcon(selectedIcon);
    setLikeAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`http://localhost:3500/${post.user.profilePic}`} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.user.username}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div>
            <Tooltip title="Registration">
              <PersonAddIcon
                className="PersonAddIcon"
                onClick={handleRegistrationClick}
              />
            </Tooltip>
            <MoreHorizIcon onClick={handleUserClick} />
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
              {selectedPostUser &&
                selectedPostUser.username === currentUser.data.username && (
                  <>
                    <MenuItem onClick={handleClose}>Edit Post</MenuItem>
                    <MenuItem onClick={handleClose}>Delete Post</MenuItem>
                  </>
                )}
              {selectedPostUser &&
                selectedPostUser.username !== currentUser.data.username && (
                  <>
                    <MenuItem onClick={handleSavePost}>Save Post</MenuItem>
                    <MenuItem onClick={openPopup}>Report Post</MenuItem>
                  </>
                )}
            </Menu>
            {isPopupOpen && (
              <>
                <div className="overlay" onClick={closePopup}></div>
                <div className="popup">
                  <div className="popup-title">
                    <h3>Báo cáo bài viết</h3>
                    <span className="close" onClick={closePopup}>
                      x
                    </span>
                  </div>
                  <div className="popup-content">
                    <div className="left">
                      <div className="left-container">
                        <h1>Tittle</h1>
                        <form>
                          <textarea
                            className="input_description"
                            type="text"
                            placeholder="Tittle"
                            value={description}
                            onChange={(e) =>
                              handleInputChange(e, "description")
                            }
                          />
                        </form>
                      </div>
                    </div>
                    <div className="right">
                      <h1>Thông tin bài viết</h1>
                      <form>
                        <textarea
                          className="input_description"
                          type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => handleInputChange(e, "description")}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="popup-action">
                    <Button
                      onClick={handleSendClick}
                      variant="contained"
                      className="acsess_button"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            postId={post.id}
          />
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={`http://localhost:3500/${post.imageURL}`} alt="" />
        </div>
        <div className="info">
          <div className="item" id="likeButton" onClick={handleLikeClick}>
            
            {selectedIcon ? selectedIcon : <FavoriteBorderOutlinedIcon />}
            
            {selectedIcon ? `${updatedTotalReactions} bạn và người khác` : `${post.totalReactions} người khác`}
          </div>

          <Popover
            id={popoverId}
            open={Boolean(likeAnchorEl)}
            anchorEl={likeAnchorEl}
            onClose={() => setLikeAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <FavoriteOutlinedIcon
                onClick={() => handleIconSelect(<FavoriteOutlinedIcon />)}
              />
              <MoodIcon onClick={() => handleIconSelect(<MoodIcon />)} />
              <EmojiEventsIcon
                onClick={() => handleIconSelect(<EmojiEventsIcon />)}
              />
            </div>
          </Popover>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.totalComments} comments
          </div>
          <div className="item">
            <Tooltip title="Share" arrow>
              {/* Add your Share icon here */}
            </Tooltip>
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
