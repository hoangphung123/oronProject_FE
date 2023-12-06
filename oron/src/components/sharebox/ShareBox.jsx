import "./shareBox.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import PlaceIcon from "@mui/icons-material/Place";
import MoodIcon from "@mui/icons-material/Mood";
import { useDropzone } from "react-dropzone";
import * as UserService from "../../server/userstore";
import * as UserServices from "../../server/itemstore";
import { PostsContext } from "../../context/postContext";
import { ToastContainer, toast } from "react-toastify";
import Button from '@mui/material/Button';
// import Carousel from '../carousel/Carousel';



export default function Share() {
  const { currentUser } = useContext(AuthContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [statuss, setStatus] = useState([]);
  const [wards, setwards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [selectedWard, setSelectedWard] = useState("");
  const [description, setDescription] = useState("");
  const {setPosts} = useContext(PostsContext);
  const Status = ["Công Khai", "Riêng tư","Bạn bè"];

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const imageUrl = URL.createObjectURL(file);
    console.log("file", imageUrl);
    setSelectedImage(file);
    setSelectedImages(imageUrl)
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const fetchStatus = async () => {
    try {
      const response = await UserServices.getCategory(1);
      console.log("listdata", response);
      const fetchedStatus = response.listData;

      setStatus(fetchedStatus);
    } catch (error) {
      toast.error(`Error fetching provinces: ${error.message}`);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await UserService.getAllProvinces();

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
      const responses = await UserService.getDistrictsByProvinceId(provinceId);
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
      const responses = await UserService.getWardsByDistrictId(districtId);
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

  const handSelectedStatus = (e) => {
    setSelectedStatus(e.target.value);
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

  const handleSaveImageCover = async () => {
    try {
      if (selectedImage) {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));

        if (!accessToken) {
          console.error("Access token not found in localStorage");
          return;
        }

        // const uploadedPicture = await Userserver.uploadPictureUserCover(accessToken, selectedImages);
        // console.log('Image saved successfully:', uploadedPicture);
        // const profileUsers = await Userserver.getProfile(accessToken);

        // setCurrentUser(profileUsers)
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleRegisterClick = async () => {
    try {
      // setLoading(true);
      const postData = {
        description: description,
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
      };

      const accessToken = JSON.parse(localStorage.getItem("access_token"));


      const registeredUser = await UserServices.createPost(accessToken,postData);

      const registeredUserId = registeredUser.data.id;

      console.log(selectedImage)

      const uploadedPicturePost = await UserServices.uploadPost(accessToken, selectedImage, registeredUserId);

      const newData = {
        id: registeredUser.data.id,
        description: description,
        imageURL: `${uploadedPicturePost.data.imageURL}`,
        videoURL: null, // Bạn có thể cung cấp giá trị videoURL nếu có
        status: 1, // Thay đổi giá trị này nếu cần
        fullAddress: currentUser.data.fullAddress, // Lấy từ user hoặc post, tùy vào yêu cầu
        specificAddress: currentUser.data.specificAddress, // Tương tự như trên
        user: {
          id: currentUser.data.id,
          username: currentUser.data.username,
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
        category: null, // Thay đổi nếu có thông tin về category
        createdAt: new Date().toISOString(), // Hoặc sử dụng giá trị từ newPost nếu cần
        updatedAt: new Date().toISOString(), // Tương tự như trên
      };

      setPosts((prevPosts) => [newData, ...prevPosts]);

      toast.success(`Success: ${registeredUser.message}`);
      // setShowPopup(true);
    } catch (error) {
      toast.error(`Error: ${error.response.message}`);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchProvinces();
  }, []);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={`http://localhost:3500/${currentUser.data.profilePic}`}
            alt=""
          />
          <input
            placeholder="What's in your mind Thinh?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <PlaceIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <MoodIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={openPopup}>
            Share
          </button>
        </div>
        {isPopupOpen && (
          <>
            <div className="overlay" onClick={closePopup}></div>
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
                    <select className="statusSelect">
                      {Status.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <h2>Tạo Bài viết</h2>
                <span className="close" onClick={closePopup}>
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
                      value={selectedStatus}
                      onChange={handSelectedStatus}
                    >
                      <option value="" disabled>
                        Status
                      </option>
                      {statuss.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.name}
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
                <Button onClick={handleRegisterClick} variant="contained" className="acsess_button">Đăng</Button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}