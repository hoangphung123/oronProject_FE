import { useState, useContext, useEffect } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import * as postServer from "../../server/itemstore";
import { formatDistanceToNow } from 'date-fns';

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [editingComment, setEditingComment] = useState(null);
  // State to manage comments
  const [comments, setComments] = useState([]);

  // State to manage the new comment input
  const [newComment, setNewComment] = useState('');
  
  const handleEditComment = (commentId, currentContent) => {
    setEditingComment(commentId);
    setNewComment(currentContent);
  };

  // Function to handle updating a comment
  const handleUpdateComment = async (commentId) => {
    if (newComment.trim() === '') {
      return; // Do not update with empty comments
    }
    // Add your logic to update the comment using the commentId and newComment
    // ...

    // Reset the editing state
    setEditingComment(null);
    setNewComment('');
  };
  // Function to handle adding a new comment
  const handleAddComment = async (postId) => {
    if (newComment.trim() === '') {
      return; // Do not add empty comments
    }
    const accessToken = JSON.parse(localStorage.getItem("access_token") );
    console.log('postId',postId)

    const commentData = {
      description: newComment,
      postId: postId,
    }

    await postServer.uploadComment(accessToken,commentData)

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
    setComments((prevComments) => [newCommentObject, ...prevComments ]);

    // Clear the new comment input
    setNewComment('');
  };

  // Simulating API call to get comments by postId
  const getCommentsByPostId = async (postId) => {
    // Replace the following with your actual API call
    try {
      const response = await postServer.getCommentByPostId(postId);
      const data = response.listData;

      // Update comments state with the fetched data
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const formatTimeDifference = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  useEffect(() => {
    // Call getCommentsByPostId when postId changes
    if (postId) {
      getCommentsByPostId(postId);
    }
  }, [postId]);

  return (
    <div className="comments">
      <div className="write">
        <img src={`http://localhost:3500/${currentUser.data.profilePic}`} alt="" />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => handleAddComment(postId)}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={`http://localhost:3500/${comment.user.profilePic}`} alt="" />
          <div className="info">
            <span>{comment.user.username}</span>
            <p>{comment.description}</p>
          </div>
          
          {currentUser.data.id === comment.user.id && (
            <button onClick={() => handleEditComment(comment.id, comment.description)}>Edit</button>
          )}
          {editingComment === comment.id &&(
            <>
              <button onClick={() => handleUpdateComment(comment.id)} >Update</button>
              <button onClick={() => setEditingComment(null)}>Cancel</button>
            </>
          )}
          <span className="date">{formatTimeDifference(comment.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
