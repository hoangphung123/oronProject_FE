import React, { createContext, useEffect, useState, useContext} from "react";
import * as postserver from "../server/itemstore"
import { AuthContext } from "./authContext";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [postRegistrations, setPostRegistrations] = useState([]);

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

  const fetchPosts = async (limit) => {
    // Fetch posts with the specified limit parameter
    const response = await postserver.getAllPost(limit);
    const postData = response.listData
    setPosts(postData);
  };

  // Fetch initial posts when the component mounts
  useEffect(() => {
    fetchPostsRegistation()
    fetchPosts(9); // Default limit is set to 2, change it as needed
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts, postRegistrations, setPostRegistrations }}>
      {children}
    </PostsContext.Provider>
  );
};


