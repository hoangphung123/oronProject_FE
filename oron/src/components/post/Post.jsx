import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext, useEffect } from "react";
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
import * as Userserver from "../../server/userstore";
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
  const { savePost, setSavePost, setPosts } = useContext(PostsContext);
  const [likeds, setLikeds] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [likeAnchorEl, setLikeAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState(null);
  const [updatedTotalReactions, SetUpdatedTotalReactions] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [category, setCategory] = useState([]);
  const [wards, setwards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Công Khai");
  const Status = ["Công Khai", "Riêng tư", "Bạn bè"];

  const handleEditClick = () => {
    // Initialize edit states with the data of the selected post
    setSelectedStatus(post.status);
    setSelectedCategory(post.categoryId);
    setSelectedProvince(post.provinceId);
    setSelectedDistrict(post.districtId);
    setSelectedWard(post.wardId);
    setDescription(post.description)
    setSelectedImages(`http://localhost:3500/${post.imageURL}`)

    setIsEditPopupOpen(true);
  };

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

  const handleDeletePost = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      await Itemserver.deletePost(accessToken, post.id);

      const limit = 9;
      const response = await Itemserver.getAllPost(limit);
      const postData = response.listData;
      setPosts(postData);

      // Update UI or navigate to another page after successful deletion
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error.message);
      // Handle error, show a notification, or perform other actions
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await Itemserver.getCategory(1);
      console.log("listdata", response);
      const fetchedCategory = response.listData;

      setCategory(fetchedCategory);
    } catch (error) {
      toast.error(`Error fetching Category: ${error.message}`);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await Userserver.getAllProvinces();

      if (!response.error) {
        const fetchedProvinces = response.data.listData;
        setProvinces(fetchedProvinces);
      } else {
        toast.error(`Error fetching provinces: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching provinces: ${error.message}`);
    }
  };

  const fetchDistrictsByProvinceId = async (provinceId) => {
    try {
      const responses = await Userserver.getDistrictsByProvinceId(provinceId);
      if (!responses.error) {
        const fetchedDistricts = responses.data.listData;
        setDistricts(fetchedDistricts);
      } else {
        toast.error(`Error fetching provinces: ${responses.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching districts: ${error.message}`);
    }
  };

  const fetchWardsByDistrictId = async (districtId) => {
    try {
      const responses = await Userserver.getWardsByDistrictId(districtId);
      if (!responses.error) {
        const fetchedWards = responses.data.listData;
        setwards(fetchedWards);
      } else {
        toast.error(`Error fetching provinces: ${responses.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching districts: ${error.message}`);
    }
  };

  const handleSelectDistricts = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    fetchWardsByDistrictId(selectedDistrictId);
  };

  const handleSelectProvince = (e) => {
    const selectedProvinceId = e.target.value;
    setSelectedProvince(selectedProvinceId);
    fetchDistrictsByProvinceId(selectedProvinceId);
  };

  const handSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    fetchCategory();
    fetchProvinces();
  }, []);


  const handleUpdateClick = async () => {
    try {
      let statusValue;
      switch (selectedStatus) {
        case "Công Khai":
          statusValue = 1;
          break;
        case "Riêng tư":
          statusValue = 0;
          break;
        case "Bạn bè":
          statusValue = 2;
          break;
        default:
          statusValue = 1; // Default to "Công Khai" if none selected
          break;
      }
      // setLoading(true);
      const postData = {
        description: description,
        categoryId: selectedCategory,
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        status: statusValue,
      };

      const accessToken = JSON.parse(localStorage.getItem("access_token"));

      const registeredUser = await Itemserver.updatePost(
        accessToken,
        post.id,
        postData
      );

      const registeredUserId = registeredUser.data.id;

      console.log(selectedImage);

      await Itemserver.uploadPost(
        accessToken,
        selectedImage,
        registeredUserId
      );

      const limit = 9;
      const response = await Itemserver.getAllPost(limit);
      const postDatas = response.listData;
      setPosts(postDatas);

      setIsPopupOpen(false);
      toast.success(`Success: ${registeredUser.message}`);
      // setShowPopup(true);
    } catch (error) {
      toast.error(`Error: ${error.response.message}`);
    }
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
                    <MenuItem onClick={handleEditClick}>Edit Post</MenuItem>
                    <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
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
            {isEditPopupOpen  && (
              <>
                <div className="overlay" onClick={() => setIsEditPopupOpen(false)}></div>
                <div className="popup">
                  <div className="popup-title">
                    <div className="shareTop">
                      <img
                        className="shareProfileImg"
                        src={`http://localhost:3500/${currentUser.data.profilePic}`}
                        alt=""
                      />
                      <div className="shareTop-content">
                        <span>{currentUser.data.username}</span>
                        <select
                          className="selectStatus"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          {Status.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <h2>Tạo Bài viết</h2>
                    <span className="close"  onClick={() => setIsEditPopupOpen(false)}>
                      x
                    </span>
                  </div>
                  <div className="popup-avatar"></div>
                  <div className="popup-content">
                    <div className="left">
                      <div className="left-container">
                        <h1>Ảnh</h1>
                        <div className="imageContainer">
                          <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p className="imageContainer_p">+</p>
                          </div>
                          {selectedImages && (
                            <img src={selectedImages} alt="Selected" />
                          )}
                        </div>
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
                        <select
                          value={selectedCategory}
                          onChange={handSelectedCategory}
                        >
                          <option value="" disabled>
                            Category
                          </option>
                          {category.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedProvince}
                          onChange={handleSelectProvince}
                        >
                          <option value="" disabled>
                            Province
                          </option>
                          {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedDistrict}
                          onChange={handleSelectDistricts}
                        >
                          <option value="" disabled>
                            District
                          </option>
                          {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.name}
                            </option>
                          ))}
                        </select>
                        <select
                          value={selectedWard}
                          onChange={(e) => setSelectedWard(e.target.value)}
                        >
                          <option value="" disabled>
                            Ward
                          </option>
                          {wards.map((ward, index) => (
                            <option key={ward.id} value={ward.id}>
                              {ward.name}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                  </div>
                  <div className="popup-action">
                    <Button
                      onClick={handleUpdateClick}
                      variant="contained"
                      className="acsess_button"
                    >
                      Cập Nhật
                    </Button>
                  </div>
                </div>
              </>
            )}
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

            {selectedIcon
              ? `${updatedTotalReactions} bạn và người khác`
              : `${post.totalReactions} người khác`}
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
