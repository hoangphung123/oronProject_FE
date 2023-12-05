import axios from 'axios';

const api_url = 'http://127.0.0.1:3500/api/v1';

export const getAllProvinces = async () => {
    try {
        const response = await axios.get(`${api_url}/address/provinces`);

      // Axios tự động kiểm tra response.ok
      const provinces = response.data;
      return provinces;
    } catch (error) {
      console.error('Error while fetching provinces:', error.message);
      throw error;
    }
}

export const getDistrictsByProvinceId = async (provinceId) => {
    try {
      const response = await axios.get(`${api_url}/address/districts/?provinceId=${provinceId}`);

      const districts = response.data; // Thay đổi đường dẫn tương ứng với cấu trúc API của bạn
      return districts;
    } catch (error) {
      console.error('Error while fetching districts:', error.message);
      throw error;
    }
}

export const getWardsByDistrictId = async (DistrictId) => {
    try {
      const response = await axios.get(`${api_url}/address/wards?districtId=${DistrictId}`);

      const wards = response.data; // Thay đổi đường dẫn tương ứng với cấu trúc API của bạn
      return wards;
    } catch (error) {
      console.error('Error while fetching districts:', error.message);
      throw error;
    }
}

export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${api_url}/auth/register`, userData);
  
      // Axios tự động kiểm tra response.ok
      const registeredUser = response.data;
      return registeredUser;
    } catch (error) {
      console.error('Error while registering user:', error.message);
      throw error;
    }
}

export const verifyCode = async (verificationData) => {
    try {
      const response = await axios.post(`${api_url}/auth/verification-register`, verificationData);
      const verifiedUser = response.data;
      return verifiedUser;
    } catch (error) {
      console.error('Error while verifying code:', error.message);
      throw error;
    }
};

export const ResendVerifyCode = async (ResendverificationData) => {
    try {
      const response = await axios.post(`${api_url}/auth/resend-register-verification-mail`, ResendverificationData);
      const verifiedUserResends = response.data;
      return verifiedUserResends;
    } catch (error) {
      console.error('Error while verifying code:', error.message);
      throw error;
    }
};

export const loginUser = async (loginData) => {
  try {
      const response = await axios.post(`${api_url}/auth/login`, loginData);
      const loggedInUser = response.data;
      return loggedInUser;
  } catch (error) {
      console.error('Error while logging in:', error.message);
      throw error;
  }
};

export const getProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = response.data;
    return userProfile;
  } catch (error) {
    console.error('Error while fetching user profile:', error.message);
    throw error;
  }
};

export const uploadPictureUser = async (accessToken, file) => {
  try {
      // Create FormData object to send files as multipart/form-data
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
          `${api_url}/picture/upload/user-profile`,
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
};

export const uploadPictureUserCover = async (accessToken, file) => {
  try {
      // Create FormData object to send files as multipart/form-data
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
          `${api_url}/picture/upload/user-background`,
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${accessToken}`,
              },
          }
      );

      const uploadedPictureCover = response.data;
      return uploadedPictureCover;
  } catch (error) {
      console.error('Error while uploading user picture:', error.message);
      throw error;
  }
};

export const getUserPic = async (accessToken, fileName) => {
  try {
    const response = await axios.get(
      `${api_url}/picture/user-profile/${fileName}`, // Use URL parameter for fileName
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userPic = response.data;
    return userPic;
  } catch (error) {
    console.error('Error while fetching user picture:', error.message);
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



