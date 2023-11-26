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

export const getPostRegistrationByUserId = async (accessToken, userId, limit) => {
    try {
      const response = await axios.get(
        `${api_url}/post-registration/filter?userId=${userId}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const postRegistrations = response.data; // Cập nhật dòng này dựa trên cấu trúc dữ liệu trả về từ API của bạn
      return postRegistrations;
    } catch (error) {
      console.error(`Error while fetching post registrations for user with id ${userId}:`, error.message);
      throw error;
    }
}

