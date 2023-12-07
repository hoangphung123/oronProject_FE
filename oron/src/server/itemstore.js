import axios from 'axios';

const api_url = 'http://127.0.0.1:3500/api/v1';

export const getCategory = async (status) => {
    try {
      const response = await axios.get(`${api_url}/category/filter?status=${status}`);
      
      const categories = response.data; // Update this line based on your API response structure
      return categories;
    } catch (error) {
      console.error('Error while fetching categories:', error.message);
      throw error;
    }
}

export const createPost = async (accessToken, createData) => {
    try {
      const response = await axios.post(`${api_url}/post`, createData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
      });
  
      // Axios tự động kiểm tra response.ok
      const registeredUser = response.data;
      return registeredUser;
    } catch (error) {
      console.error('Error while registering user:', error.message);
      throw error;
    }
}

export const uploadPost = async (accessToken, file, id) => {
    try {
        // Create FormData object to send files as multipart/form-data
        const formData = new FormData();
        formData.append('file', file);

        // Use the 'id' parameter in the URL
        const response = await axios.post(
            `${api_url}/picture/upload/post/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const uploadedPicture = response.data;
        return uploadedPicture;
    } catch (error) {
        console.error('Error while uploading user picture:', error.message);
        throw error;
    }
}

  
export const getAllPost = async (limit) => {
    try {
        const response = await axios.get(`${api_url}/post/filter?limit=${limit}`);
        const posts = response.data; // Update this line based on your API response structure
        return posts;
    } catch (error) {
        console.error('Error while fetching posts:', error.message);
        throw error;
    }
}

export const getPostByUserId = async (userId, limit) => {
    try {
        const response = await axios.get(`${api_url}/post/filter?limit=${limit}&userId=${userId}`);
        const posts = response.data; // Update this line based on your API response structure
        return posts;
    } catch (error) {
        console.error(`Error while fetching posts for user with id ${userId}:`, error.message);
        throw error;
    }
}

export const getPostByUserIdStattus = async (userId, registration_status) => {
  try {
      const response = await axios.get(`${api_url}/post/filter?userId=${userId}&registration_status=${registration_status}`);
      const posts = response.data; // Update this line based on your API response structure
      return posts;
  } catch (error) {
      console.error(`Error while fetching posts for user with id ${userId}:`, error.message);
      throw error;
  }
}

export const getCommentByPostId = async (postId) => {
    try {
        const response = await axios.get(`${api_url}/comment/post/${postId}`);
        const comments = response.data; // Cập nhật dòng này dựa trên cấu trúc dữ liệu trả về từ API của bạn
        return comments;
    } catch (error) {
        console.error(`Error while fetching comments for post with id ${postId}:`, error.message);
        throw error;
    }
};

export const uploadComment= async (accessToken, formData) => {
    try {
        
        const response = await axios.post(
            `${api_url}/comment`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const uploadedComment= response.data;
        return uploadedComment;
    } catch (error) {
        console.error('Error while uploading user picture:', error.message);
        throw error;
    }
}

export const postRegistration = async (accessToken, registrationData) => {
    try {
        const response = await axios.post(
            `${api_url}/post-registration`,
            registrationData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const registrationResult = response.data;
        return registrationResult;
    } catch (error) {
        console.error('Error while posting registration:', error.message);
        throw error;
    }
}

export const getPostRegistrationByUserId = async (accessToken, creatorId, limit) => {
    try {
      const response = await axios.get(
        `${api_url}/post-registration/filter?creatorId=${creatorId}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const postRegistrations = response.data; // Cập nhật dòng này dựa trên cấu trúc dữ liệu trả về từ API của bạn
      return postRegistrations;
    } catch (error) {
      console.error(`Error while fetching post registrations for user with id ${creatorId}:`, error.message);
      throw error;
    }
}


export const getPostRegistrationByPostownerId = async (accessToken, postOwnerId, limit) => {
  try {
    const response = await axios.get(
      `${api_url}/post-registration/filter?postOwnerId=${postOwnerId}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const postRegistrations = response.data; // Cập nhật dòng này dựa trên cấu trúc dữ liệu trả về từ API của bạn
    return postRegistrations;
  } catch (error) {
    console.error(`Error while fetching post registrations for user with id ${postOwnerId}:`, error.message);
    throw error;
  }
}

export const getFriends = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/user/friends`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const friendsList = response.data;
      return friendsList;
    } catch (error) {
      console.error('Error while fetching friends list:', error.message);
      throw error;
    }
}

export const getFollowing = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/user/followings`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const followingList = response.data;
      return followingList;
    } catch (error) {
      console.error('Error while fetching friends list:', error.message);
      throw error;
    }
}

export const getFollower = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/user/followers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const followerList = response.data;
      return followerList;
    } catch (error) {
      console.error('Error while fetching friends list:', error.message);
      throw error;
    }
}

export const savePost = async (accessToken, postId) => {
  try {
      const response = await axios.post(
          `${api_url}/post/${postId}/save`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          }
      );

      const savedPost = response.data;
      return savedPost;
  } catch (error) {
      console.error(`Error while saving post with id ${postId}:`, error.message);
      throw error;
  }
}

export const getSavedPostsByUser = async (accessToken) => {
  try {
      const response = await axios.get(`${api_url}/post/saved/user`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      });

      const savedPosts = response.data; // Cập nhật dòng này dựa trên cấu trúc dữ liệu trả về từ API của bạn
      return savedPosts;
  } catch (error) {
      console.error('Error while fetching saved posts:', error.message);
      throw error;
  }
}

export const getRegistrationsByPostId = async (accessToken, postId, status) => {
  try {
    const response = await axios.get(`${api_url}/post-registration/filter?status=${status}&postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const registrations = response.data; // Update this line based on your API response structure
    return registrations;
  } catch (error) {
    console.error(`Error while fetching registrations for post with id ${postId}:`, error.message);
    throw error;
  }
}

export const getPostRegisByPostOwnerId = async (accessToken, postOwnerId, status) => {
  try {
      const response = await axios.get(
          `${api_url}/post-registration/filter?status=${status}&postOwnerId=${postOwnerId}`,
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          }
      );
      const postRegistrations = response.data; // Cập nhật dòng này dựa trên cấu trúc dữ liệu trả về từ API của bạn
      return postRegistrations;
  } catch (error) {
      console.error(`Error while fetching post registrations for post with id ${postOwnerId} and status ${status}:`, error.message);
      throw error;
  }
}

export const deleteRegisById = async (accessToken, regisId, data) => {
  try {
    const response = await axios.patch(
      `${api_url}/post-registration/${regisId}`,
      data,  // Dữ liệu body được truyền vào PATCH
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const deletedRegis = response.data;
    return deletedRegis;
  } catch (error) {
    console.error(`Error while deleting registration with id ${regisId}:`, error.message);
    throw error;
  }
}

export const deleteRegisByIds = async (accessToken, regisId) => {
  try {
    const response = await axios.delete(
      `${api_url}/post-registration/${regisId}`,  // Dữ liệu body được truyền vào PATCH
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const deletedRegis = response.data;
    return deletedRegis;
  } catch (error) {
    console.error(`Error while deleting registration with id ${regisId}:`, error.message);
    throw error;
  }
}


export const deletePost = async (accessToken, postId) => {
  try {
    const response = await axios.delete(
      `${api_url}/post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const deletedPost = response.data; // Update this line based on your API response structure
    return deletedPost;
  } catch (error) {
    console.error(`Error while deleting post with id ${postId}:`, error.message);
    throw error;
  }
}

export const updatePost = async (accessToken, postId, updateData) => {
  try {
    const response = await axios.patch(
      `${api_url}/post/${postId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const updatedPost = response.data; // Update this line based on your API response structure
    return updatedPost;
  } catch (error) {
    console.error(`Error while updating post with id ${postId}:`, error.message);
    throw error;
  }
}









