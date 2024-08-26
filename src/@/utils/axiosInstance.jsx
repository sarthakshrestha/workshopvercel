import axios from "axios";
import Cookies from "js-cookie";

// export const baseURL = "https://erp-v2-7a15.onrender.com";
// export const baseURL = "http://localhost:8081";
export const baseURL = "https://school-api.wordscapepress.com";

const axiosInstance = axios.create({
  baseURL: "https://school-api.wordscapepress.com",
  // baseURL: "http://localhost:8081",
  // baseURL: "erp-api.wordscapepress.com",
  // baseURL: "https://erp-v2-7a15.onrender.com",
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
      window.location.href = "/login"; // Redirect to login on 401 error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
