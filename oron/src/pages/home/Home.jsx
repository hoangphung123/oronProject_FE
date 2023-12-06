import Posts from "../../components/posts/Posts";
import "./home.scss";
import ShareBox from "../../components/sharebox/ShareBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import React, { useContext, useEffect, useState} from "react";
import * as postserver from "../../server/itemstore"
import { PostsContext } from "../../context/postContext";
import { AuthContext } from "../../context/authContext";
import Carousel from "../../components/carousel/Carousel";
import Submenu from '../../components/Submenu/Submenu';




const Home = () => {
  const { currentUser, currentUserId, setCurrentUserId } = useContext(AuthContext);
  const { setPostRegistrations } = useContext(PostsContext);
  const {setPosts} = useContext(PostsContext);
  const [Iduser, setIduser] = useState(0);
  const fetchPosts = async (limit) => {
    // Fetch posts with the specified limit parameter
    const response = await postserver.getAllPost(limit);
    const postData = response.listData;
    setPosts(postData);
  };

  const fetchPostsRegistation = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const userId = currentUser.data.id; // Thay thế bằng userId của người dùng cụ thể
      const limit = 3;
      const result = await postserver.getPostRegistrationByUserId(
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
  }

  // const fetchFriends = async () => {
  //   try {
  //     // Assuming you have an accessToken, you can get it from your authentication context or elsewhere
  //     const accessToken = JSON.parse(localStorage.getItem("access_token"));
  //     const friends = await postserver.getFriends(accessToken);
  //     const updatedUserId = {
  //       userId: friends.listData[0].id,
  //       username: friends.listData[0].username
  //     };
  //     localStorage.setItem("friends", JSON.stringify(updatedUserId));
  //     // setCurrentUserId(updatedUserId)
  //   } catch (error) {
  //     console.error("Error fetching friends:", error.message);
  //   }
  // };

  
  // useEffect(() => {
  //   fetchFriends();
  // },[currentUserId])
  

  // Fetch initial posts when the component mounts
  useEffect(() => {
    
    fetchPostsRegistation()
    fetchPosts(9); // Default limit is set to 2, change it as needed
  }, []);
  
  return (
    <div className="home">
      <Carousel />
      <Submenu />
      <ShareBox />
      <button className="button_next">
        <FontAwesomeIcon icon={faAngleRight} size="xl" />
      </button>
      <Posts />
    </div>
  );
};

export default Home;
