import { useState, useContext, useEffect } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import * as postServer from "../../server/itemstore";
import { formatDistanceToNow } from "date-fns";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  // State to manage comments
  const [comments, setComments] = useState([]);

  // State to manage the new comment input
  const [newComment, setNewComment] = useState("");
  const [Reviewer, setReviewer] = useState([]);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [editingCommentId, setEditingCommentId] = useState(null);

  // State to manage edited comment
  const [editedComment, setEditedComment] = useState({
    id: null,
    description: "",
  });

  const openEditPopup = (commentId) => {
    console.log("commentId", commentId);
    setEditingCommentId(commentId);
  };

  const handleKeyPress = (e, commentId) => {
    if (e.key === "Enter") {
      // Người dùng bấm Enter, gọi hàm handleEditComment
      handleEditComment(commentId);
      setEditingCommentId(null); // Kết thúc chỉnh sửa
    }
  };

  const handleMenuClick = (event, commentId, commentDescription) => {
    // Lưu trữ comment.id vào state
    setEditedComment({ id: commentId, description: commentDescription });

    // Mở Menu
    setAnchorEl(event.currentTarget);
  };

  const handleEditComment = async (commentId) => {
    const accessToken = JSON.parse(localStorage.getItem("access_token"));

    const updatedCommentData = {
      description: editDescription,
    };

    try {
      // Gọi API để cập nhật comment
      await postServer.updateComment(
        accessToken,
        commentId,
        updatedCommentData
      );

      // Cập nhật lại danh sách comments
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, description: editDescription }
          : comment
      );

      setComments(updatedComments);
      setEditDescription(null); // Kết thúc chỉnh sửa
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle adding a new comment
  const handleAddComment = async (postId) => {
    if (newComment.trim() === "") {
      return; // Do not add empty comments
    }
    const accessToken = JSON.parse(localStorage.getItem("access_token"));
    console.log("postId", postId);

    const commentData = {
      description: newComment,
      postId: postId,
    };

    await postServer.uploadComment(accessToken, commentData);

    const newCommentObject = {
      id: comments.id, // Generate a unique ID (replace with your logic)
      description: newComment,
      user: {
        username: currentUser.data.username,
        profilePic: `${currentUser.data.profilePic}`,
      },
      post: {
        id: "0a73500d-8f84-4a81-a50a-0479152e2a5d", // Replace with the actual post ID
        description: "Đại học sư phạm kỹ Thuật", // Replace with the actual post description
        imageURL: "post/1700901151754-maxresdefault.jpg", // Replace with the actual image URL
        videoURL: null, // Set to null if there is no video
        status: 1, // Replace with the actual post status
        fullAddress: "Xã Phú Mỹ, Huyện Phú Tân, Tỉnh Cà Mau", // Replace with the actual post address
        specificAddress: "32, Le Quy Don", // Replace with the actual post specific address
        createdAt: "2023-11-25T08:32:31.708Z", // Replace with the actual post createdAt
        updatedAt: "2023-11-25T08:32:31.768Z", // Replace with the actual post updatedAt
      },
      createdAt: new Date().toISOString(), // Assuming createdAt is a string in ISO format
      updatedAt: new Date().toISOString(), // Assuming updatedAt is a string in ISO format
    };

    // Update the comments state with the new comment
    setComments((prevComments) => [newCommentObject, ...prevComments]);

    // Clear the new comment input
    setNewComment("");
  };

  // Simulating API call to get comments by postId
  const getCommentsByPostId = async (postId) => {
    // Replace the following with your actual API call
    try {
      const response = await postServer.getCommentByPostId(postId);
      const data = response.listData;

      console.log("Fetched comments:", data);

      // Update comments state with the fetched data
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // const getPostByPostId = async (postId) => {
  //   // Replace the following with your actual API call
  //   try {
  //     const accessToken = JSON.parse(localStorage.getItem("access_token"));
  //     const response = await postServer.getPostByPostId(accessToken, postId);
  //     const data = response.data;

  //     console.log('dataPost', currentUser.data.username)
  //     // Update comments state with the fetched data
  //     setPostById(data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };

  const formatTimeDifference = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const getReviewerByPostId = async (postId) => {
    // Replace the following with your actual API call
    try {
      const response = await postServer.getReviewByPost(postId);
      const data = response.listData;

      // Update comments state with the fetched data
      setReviewer(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const closePopup = () => {
    setIsRatingPopupOpen(false);
  };

  useEffect(() => {
    // Call getCommentsByPostId when postId changes
    if (postId) {
      // getPostByPostId(postId);
      getReviewerByPostId(postId);
      getCommentsByPostId(postId);
    }
  }, [postId]);

  return (
    <div className="comments">
      {Reviewer.map((Reviewers) => (
        <div className="comment" key={Reviewers.id}>
          <img
            src={`http://localhost:3500/${Reviewers.user.profilePic}`}
            alt=""
          />
          <div className="info">
            <span>{Reviewers.user.username}</span>
            <p>{Reviewers.description}</p>
          </div>
          <div>
            {currentUser.data.username === Reviewers.user.username && (
              <div>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  // onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setIsRatingPopupOpen(!isRatingPopupOpen)}
                >
                  Edit
                </Button>
              </div>
            )}
            {currentUser.data.username !== Reviewers.user.username && (
              <Button
                variant="contained"
                size="small"
                // handle the action for the "Reviewer" button
              >
                Reviewer
              </Button>
            )}
          </div>
        </div>
      ))}
      <hr />
      <div className="write">
        <img
          src={`http://localhost:3500/${currentUser.data.profilePic}`}
          alt=""
        />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => handleAddComment(postId)}>Send</button>
      </div>
      {isRatingPopupOpen && (
        <>
          <div className="overlay" onClick={closePopup}></div>
          <div className="rating-popup">
            <input
              type="text"
              placeholder="Enter your comment here..."
              className="wide-input" // Add a class for custom styling
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              
            />
            <Button
              // onClick={handleSendRating}
              variant="contained"
              className="acsess_button"
              size="medium"
            >
              Send
            </Button>
          </div>
        </>
      )}
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img
            src={`http://localhost:3500/${comment.user.profilePic}`}
            alt=""
          />
          <div className="info">
            <span>{comment.user.username}</span>
            {editingCommentId === comment.id ? (
              <input
                type="text"
                placeholder="Enter your comment"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e, comment.id)}
                onBlur={() => {
                  setEditingCommentId(null);
                  setEditDescription(""); // Clear the editDescription state when losing focus
                }}
              />
            ) : (
              <p>{comment.description}</p>
            )}
          </div>
          <div className="menu_date">
            <span className="date">
              {formatTimeDifference(comment.createdAt)}
            </span>
            {currentUser.data.username === comment.user.username && (
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  style={{ color: "#fff" }}
                  onClick={(e) =>
                    handleMenuClick(e, comment.id, comment.description)
                  }
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => openEditPopup(editedComment.id)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      ))}
      {/* {isEditPopupOpen && (
        <>
          <div className="overlay" onClick={closeEditPopup}></div>
          <div className="rating-popup">
            <input
              type="text"
              placeholder="Edit your comment here..."
              className="wide-input"
              value={editedComment.description}
              onChange={(e) =>
                setEditedComment({
                  ...editedComment,
                  description: e.target.value,
                })
              }
            />
            <Button
              // onClick={() => handleEditComment(editedComment)}
              variant="contained"
              className="access_button"
              size="medium"
            >
              Save
            </Button>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Comments;
