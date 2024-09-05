import axios from "axios";
import Cookies from "js-cookie";

// export const baseURL = "https://school-api.wordscapepress.com";
export const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  // baseURL: "https://school-api.wordscapepress.com",
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fixing the response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Corrected syntax error here
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
