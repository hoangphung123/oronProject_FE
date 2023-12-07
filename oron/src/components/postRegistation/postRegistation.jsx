import "./postRegistation.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
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
import { PostsContext } from "../../context/postContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [showRegisteredUsers, setShowRegisteredUsers] = useState(false);
  const [userDataArray, setUserDataArray] = useState([]);
  const [registrationUpdated, setRegistrationUpdated] = useState(false); // Thêm state này

  const handleDelete = async (regisId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const data = {
        // message: "Lovely",
        status: 2,
      };
      const deletedRegis = await Itemserver.deleteRegisById(
        accessToken,
        regisId,
        data
      );
      setRegistrationUpdated((prev) => !prev); // Đảo ngược giá trị để kích thích việc render lại component
      // Cập nhật state hoặc thực hiện các công việc khác sau khi xóa thành công
      console.log("Registration deleted successfully:", deletedRegis);
    } catch (error) {
      console.error("Error deleting registration:", error.message);
      // Xử lý lỗi nếu cần thiết
      toast.error("Error deleting registration");
    }
  };

  const handleAccept = async (regisId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const data = {
        // message: "Lovely",
        status: 4,
      };
      const deletedRegis = await Itemserver.deleteRegisById(
        accessToken,
        regisId,
        data
      );
      setRegistrationUpdated((prev) => !prev); // Đảo ngược giá trị để kích thích việc render lại component
      // Cập nhật state hoặc thực hiện các công việc khác sau khi xóa thành công
      console.log("Registration deleted successfully:", deletedRegis);
    } catch (error) {
      console.error("Error deleting registration:", error.message);
      // Xử lý lỗi nếu cần thiết
      toast.error("Error deleting registration");
    }
  };

  const RegisteredUsersComponent = ({ postId }) => {
    // Filter user data for the specific post
    const postUsers = userDataArray.filter((user) => user.post.id === postId);

    return (
      <div className="registered-users">
        {postUsers.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-detailss">
              <img
                className="user-item_img"
                src={`http://localhost:3500/${user.user.profilePic}`}
                alt=""
              />
              <div className="user-details">
                <span className="username">{user.user.username}</span>
                <span className="message">{user.message}</span>
              </div>
            </div>
            <div>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                size="small"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
              <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={() => handleAccept(user.id)}>
                accept
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  //   const userDataArray = [
  //     {
  //       id: "a35987a0-b24a-4c71-a650-9b249b728afb",
  //       message: "Please give it for me",
  //       status: 1,
  //       user: {
  //         id: "af4c1a21-ef27-48bc-8d32-f36ac992a3a8",
  //         username: "Hianghuy",
  //         name: "Hoàng",
  //         fullAddress: "Xã Phú Mỹ, Huyện Phú Tân, Tỉnh Cà Mau",
  //         specificAddress: "32, Le Quy Don",
  //         phoneNumber: "0978987233",
  //         email: "phunghoanghuy8@gmail.com",
  //         profilePic: "user-profile/1700900775246-nui.png",
  //         backgroundPic: "user-background/1700901040880-tenlua.png",
  //         isVerifyPhone: false,
  //         isVerifyEmail: true,
  //         status: "ACTIVE",
  //         updatedAt: "2023-12-07T05:29:39.811Z",
  //         createdAt: "2023-11-20T18:05:02.630Z",
  //       },
  //       post: {
  //         id: "01d81283-fe62-44a6-ab16-0d0b9668f2fc",
  //         description: "dâdadadadaa",
  //         imageURL: "post/1700889447864-maxresdefault.jpg",
  //         videoURL: null,
  //         status: 1,
  //         fullAddress: "Xã Yên Mỹ, Huyện Chợ Đồn, Tỉnh Bắc Kạn",
  //         specificAddress: "32,lequydon",
  //         createdAt: "2023-11-25T05:17:27.834Z",
  //         updatedAt: "2023-11-25T05:17:27.889Z",
  //       },
  //       createdAt: "2023-12-07T05:29:48.485Z",
  //       updatedAt: "2023-12-07T05:29:48.485Z",
  //     },
  //     {
  //       id: "a35987a0-b24a-4c71-a650-9b249b728afb",
  //       message: "Please give it for me",
  //       status: 1,
  //       user: {
  //         id: "af4c1a21-ef27-48bc-8d32-f36ac992a3a8",
  //         username: "Hianghuy",
  //         name: "Hoàng",
  //         fullAddress: "Xã Phú Mỹ, Huyện Phú Tân, Tỉnh Cà Mau",
  //         specificAddress: "32, Le Quy Don",
  //         phoneNumber: "0978987233",
  //         email: "phunghoanghuy8@gmail.com",
  //         profilePic: "user-profile/1700900775246-nui.png",
  //         backgroundPic: "user-background/1700901040880-tenlua.png",
  //         isVerifyPhone: false,
  //         isVerifyEmail: true,
  //         status: "ACTIVE",
  //         updatedAt: "2023-12-07T05:29:39.811Z",
  //         createdAt: "2023-11-20T18:05:02.630Z",
  //       },
  //       post: {
  //         id: "01d81283-fe62-44a6-ab16-0d0b9668f2fc",
  //         description: "dâdadadadaa",
  //         imageURL: "post/1700889447864-maxresdefault.jpg",
  //         videoURL: null,
  //         status: 1,
  //         fullAddress: "Xã Yên Mỹ, Huyện Chợ Đồn, Tỉnh Bắc Kạn",
  //         specificAddress: "32,lequydon",
  //         createdAt: "2023-11-25T05:17:27.834Z",
  //         updatedAt: "2023-11-25T05:17:27.889Z",
  //       },
  //       createdAt: "2023-12-07T05:29:48.485Z",
  //       updatedAt: "2023-12-07T05:29:48.485Z",
  //     },
  //     // Add more user data as needed
  //   ];

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        const registrations = await Itemserver.getRegistrationsByPostId(
          accessToken,
          post.post.id,
          1
        );
        setUserDataArray(registrations.listData);
      } catch (error) {
        console.error("Error fetching registrations:", error.message);
      }
    };

    fetchRegistrations();
  }, [post.post.id, registrationUpdated]);

  return (
    <div className="postRegistation">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={`http://localhost:3500/${currentUser.data.profilePic}`}
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{currentUser.data.username}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
        </div>
        <div className="content">
          <p>{post.post.description}</p>
          <img src={`http://localhost:3500/${post.post.imageURL}`} alt="" />
        </div>
        <div className="info">
          <div
            className="item"
            onClick={() => setShowRegisteredUsers(!showRegisteredUsers)}
          >
            <TextsmsOutlinedIcon />
            {showRegisteredUsers
              ? "Registered Users for this post"
              : "Registation for this post"}
          </div>
        </div>
        {showRegisteredUsers && (
          <RegisteredUsersComponent postId={post.post.id} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
