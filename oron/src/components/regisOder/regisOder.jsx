import "./regisOder.scss";
// import ProfileImg from "../../assets/profile/boyChild.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { PostsContext } from "../../context/postContext";
import * as UserServices from "../../server/itemstore";
import { formatDistanceToNow } from "date-fns";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisOder = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    postRegistrations,
    setPostRegistrations,
    friendsList,
    setFriendsList,
  } = useContext(PostsContext);
  const [registrationUpdated, setRegistrationUpdated] = useState(false);
  const formatTimeDifference = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const handleDelete = async (regisId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const deletedRegis = await UserServices.deleteRegisByIds(
        accessToken,
        regisId,
      );

      const userId = currentUser.data.id; // Thay thế bằng userId của người dùng cụ thể
      const limit = 3;
      const result = await UserServices.getPostRegistrationByUserId(
        accessToken,
        userId,
        limit
      );
      setPostRegistrations(result.listData);

      console.log("Registration deleted successfully:", deletedRegis);
    } catch (error) {
      console.error("Error deleting registration:", error.message);
      // Xử lý lỗi nếu cần thiết
      toast.error("Error deleting registration");
    }
  };

  useEffect(() => {
    console.log("postRegistrations", postRegistrations);
    // Gọi hàm getPostRegistrationByUserId và cập nhật state khi có dữ liệu trả về
    const fetchData = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        const userId = currentUser.data.id; // Thay thế bằng userId của người dùng cụ thể
        const limit = 3;
        const result = await UserServices.getPostRegistrationByUserId(
          accessToken,
          userId,
          limit
        );
        setPostRegistrations(result.listData);
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error(
          "Error while fetching post registrations:",
          error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="regisOder">
      <div className="container">
        <div className="item">
          <span>Your registrations for oder post</span>
          {/* Check if postRegistrations is an array before mapping */}
          {Array.isArray(postRegistrations) && postRegistrations.length > 0 ? (
            postRegistrations.map((registration, index) => (
              <div className="user" key={index}>
                <div className="userInfo">
                  <img
                    src={`http://localhost:3500/${registration.post.imageURL}`}
                    alt=""
                  />
                  <p>
                    <span>{registration.post.description} </span>
                    {registration.action}
                  </p>
                </div>
                {registration.status === 1 && (
                  <Button
                    onClick={() => handleDelete(registration.id)}
                    color="error"
                  >
                    Cancel
                  </Button>
                )}
                {registration.status === 3 && <Button>Received</Button>}
              </div>
            ))
          ) : (
            <p>No registrations found.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisOder;
