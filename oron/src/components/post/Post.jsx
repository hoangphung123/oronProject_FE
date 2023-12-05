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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/authContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDropzone } from "react-dropzone";
import Button from '@mui/material/Button';



const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [description, setDescription] = useState("");



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
    setSelectedImages(imageUrl)
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleSendClick = () => {

  };
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

  //TEMPORARY
  const liked = true;

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
              <PersonAddIcon className="PersonAddIcon" onClick={handleRegistrationClick} />
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
              <MenuItem onClick={handleClose}>Edit Post</MenuItem>
              <MenuItem onClick={handleClose}>Delete Post</MenuItem>
              <MenuItem onClick={openPopup}>Report Post</MenuItem>
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
                            onChange={(e) => handleInputChange(e, "description")}
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
                    <Button onClick={handleSendClick} variant="contained" className="acsess_button">Send</Button>
                  </div>
                </div>
              </>
            )}
          </div>
          <Modal open={openModal} onClose={() => setOpenModal(false)} postId={post.id} />
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={`http://localhost:3500/${post.imageURL}`} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
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
