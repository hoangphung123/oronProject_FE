import NavBar from "../../components/navbar/NavBar.jsx";
import LeftBar from "../../components/leftbar/LeftBar.jsx";
import { Outlet } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext, useEffect, useState } from "react";
import * as Userserver from "../../server/itemstore.js";
import { AuthContext } from "../../context/authContext.js";
import "./detailSavePost.scss";
import Button from "@mui/material/Button";
import { PostsContext } from "../../context/postContext";

const DetailSavePost = () => {
  const { darkMode } = useContext(DarkModeContext);
  //   const { currentUser, currentUserId, setCurrentUserId } =useContext(AuthContext);
  const [savePostss, setSavePostss] = useState([]);
  const { setSavePost } = useContext(PostsContext);

  const handleUnsavePost = async (postId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const result = await Userserver.unsavePost(accessToken, postId);

      const results = await Userserver.getSavedPostsByUser(accessToken);
      setSavePostss(results.listData);
      setSavePost(results.listData)
      // Xử lý kết quả nếu cần
      console.log("Post unsaved successfully", result);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("Error while unsaving post:", error.message);
    }
  };

  const fetchSavePost = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const result = await Userserver.getSavedPostsByUser(accessToken);
      setSavePostss(result.listData);
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("Error while fetching List Friends:", error.message);
    }
  };

  useEffect(() => {
    fetchSavePost();
  }, []);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div className="items" style={{ flex: 6 }}>
          <div className="item_saves">
            {savePostss.map((post, index) => (
              <div className="rectangle-boxs" key={index}>
                <div className="rectangle-content">
                  <div className="squares">
                    <img
                      className="square_imgs"
                      src={`http://localhost:3500/${post.imageURL}`}
                      alt=""
                    />
                  </div>
                  <div className="text-containers">
                    <div className="Decripstions">{post.description}</div>
                    <div className="infor-containers">
                      <img
                        className="img-avatar"
                        src={`http://localhost:3500/${post.user.profilePic}`}
                        alt=""
                      />
                      <div className="Names">
                        Đã lưu từ bài viết của {post.user.username}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outlined"
                  color="error"
                  className="button-delete"
                  onClick={() => handleUnsavePost(post.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <Outlet />
        </div>
        <div className="items" style={{ flex: 0.2 }}></div>
      </div>
    </div>
  );
};

export default DetailSavePost;
