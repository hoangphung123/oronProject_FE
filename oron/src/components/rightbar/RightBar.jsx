import "./rightbar.scss";
// import ProfileImg from "../../assets/profile/boyChild.jpg";
import { useContext} from "react";
// import { AuthContext } from "../../context/authContext";
import { PostsContext } from "../../context/postContext";
// import * as UserServices from "../../server/itemstore";
import { formatDistanceToNow } from 'date-fns';

const RightBar = () => {
  // const { currentUser } = useContext(AuthContext);
  const {postRegistrations} = useContext(PostsContext);
  const userDataArray = [
    {
      description: "Có ai thích phim ko",
      imageURL:
        "https://i.pinimg.com/564x/3b/1a/6f/3b1a6f3340cc082e698456137522057a.jpg",
    },
    {
      description: "Dư một chậu cây cảnh",
      imageURL:
        "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
    },
    // Add more user data as needed
  ];
  const FriendsDataArray = [
    {
      userid: 135,
      username: "hoanghuy",
      imageURL:
        "https://i.pinimg.com/564x/3b/1a/6f/3b1a6f3340cc082e698456137522057a.jpg",
    },
    {
      userid: 134,
      username: "DinhThinh",
      imageURL:
        "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
    },
    {
      userid: 136,
      username: "DucHuy",
      imageURL:
        "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
    },
    // Add more user data as needed
  ];

  const formatTimeDifference = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  // useEffect(() => {
  //   // Gọi hàm getPostRegistrationByUserId và cập nhật state khi có dữ liệu trả về
  //   const fetchData = async () => {
  //     try {
  //       const accessToken = JSON.parse(localStorage.getItem("access_token"));
  //       const userId = currentUser.data.id; // Thay thế bằng userId của người dùng cụ thể
  //       const limit = 3;
  //       const result = await UserServices.getPostRegistrationByUserId(
  //         accessToken,
  //         userId,
  //         limit
  //       );
  //       setPostRegistrations(result.listData);
  //     } catch (error) {
  //       // Xử lý lỗi nếu cần
  //       console.error(
  //         "Error while fetching post registrations:",
  //         error.message
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Registration for your posts</span>
          {userDataArray.map((userData, index) => (
            <div className="user" key={index}>
              {/* User */}
              <div className="userInfo">
                {/* Use the imageURL from user data */}
                <img src={userData.imageURL} alt="" />
                <span>{userData.description}</span>
              </div>
              <div className="buttons">
                <button>Detail</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Your registrations for oder post</span>
          {/* Check if postRegistrations is an array before mapping */}
          {Array.isArray(postRegistrations) && postRegistrations.length > 0 ? (
            postRegistrations.map((registration, index) => (
              <div className="user" key={index}>
                <div className="userInfo">
                  <img src={`http://localhost:3500/${registration.post.imageURL}`} alt="" />
                  <p>
                    <span>{registration.post.description} </span>
                    {registration.action}
                  </p>
                </div>
                <span>{formatTimeDifference(registration.createdAt)}</span>
              </div>
            ))
          ) : (
            <p>No registrations found.</p>
          )}
        </div>
        {/* Third Item */}
        <div className="item">
          <span>Online Friends</span>
          {/* Replace the hard-coded user data with FriendsDataArray */}
          {FriendsDataArray.map((friendData, index) => (
            <div className="user" key={index}>
              <div className="userInfo">
                <img src={friendData.imageURL} alt="" />
                <div className="online" />
                <span>{friendData.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
