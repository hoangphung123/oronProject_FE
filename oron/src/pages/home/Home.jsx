import Posts from "../../components/posts/Posts";
import "./home.scss";
import ShareBox from "../../components/sharebox/ShareBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import React, { useContext, useEffect } from "react";
import * as postserver from "../../server/itemstore"
import { PostsContext } from "../../context/postContext";
import { AuthContext } from "../../context/authContext";
import Carousel from "../../components/carousel/Carousel";
import Submenu from '../../components/Submenu/Submenu';




const Home = () => {
  const {currentUser} = useContext(AuthContext);
  const {setPostRegistrations, setSavePost, setFriendsList, setPostRegistrationsByowner} = useContext(PostsContext);
  const {setPosts} = useContext(PostsContext);
  const fetchPosts = async (limit) => {
    // Fetch posts with the specified limit parameter
    const response = await postserver.getAllPost(limit);
    const postData = response.listData;
    setPosts(postData);
  };

  const fetchPostsRegistation = async () => {
    try {
      setPostRegistrations(null)
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const userId = currentUser.data.id; // Thay thế bằng userId của người dùng cụ thể
      const limit = 3;
      const status = 1;
      const result = await postserver.getPostRegistrationByUserId(
        accessToken,
        userId,
        limit,
        status
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

  const fetchSavePost = async () => {
    try {
      setSavePost([])
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const result = await postserver.getSavedPostsByUser(
        accessToken,
      );
      setSavePost(result.listData);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error(
        "Error while fetching List Friends:",
        error.message
      );
    }
  };

  const fetchListFriends = async () => {
    try {
      setFriendsList([])
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const result = await postserver.getFriends(
        accessToken,
      );
      setFriendsList(result.listData);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error(
        "Error while fetching List Friends:",
        error.message
      );
    }
  };

  const fetchPostsRegistationByOwner = async () => {
    try {
      setPostRegistrationsByowner([])
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const userId = currentUser.data.id; // Thay thế bằng userId của người dùng cụ thể
      const limit = 3;
      const status = 1;
      const result = await postserver.getPostRegistrationByPostownerId(
        accessToken,
        userId,
        limit,
        status
      );
      setPostRegistrationsByowner(result.listData);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error(
        "Error while fetching post registrations:",
        error.message
      );
    }
  }

  

  // Fetch initial posts when the component mounts
  useEffect(() => {
    fetchPostsRegistationByOwner()
    fetchListFriends()
    fetchSavePost()
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
