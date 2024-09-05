import { baseURL } from "@/utils/axiosInstance";

const config = {
  // baseURL: "https://school-api.wordscapepress.com/", // Base URL of your API
  baseURL: process.env.REACT_APP_BASE_URL,
};

export default config;
