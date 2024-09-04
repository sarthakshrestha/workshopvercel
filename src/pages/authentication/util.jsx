import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import CryptoJS from 'crypto-js';

// Function to get the role from the token
export const getRoleFromToken = () => {
  const SECRET_KEY = 'MRgnS4LVB8SvJWu1JexdRGlCOCrKfBQ9';
  const encryptedtoken = Cookies.get("access_token");
  if (encryptedtoken) {
    const bytes = CryptoJS.AES.decrypt(encryptedtoken, SECRET_KEY);
    const token = bytes.toString(CryptoJS.enc.Utf8);
    const decoded = jwtDecode(token);
    console.log("role from admin", decoded.role);
    return decoded.role;
  } else {
    Cookies.remove("access_token");
    return null;
  }
};

export const isAdmin = () => {
  return getRoleFromToken() === "ADMIN";
};

// Function to check if the user is a mentor
export const isMentor = () => {
  return getRoleFromToken() === "MENTOR";
};

// Function to check if the user is logged in
export const isLoggedIn = () => {
  const token = Cookies.get("access_token");
  return token ? true : false;
};

// Function to check if the user is a student
export const isStudent = () => {
  console.log("Check");
  return getRoleFromToken() === "STUDENT";
};
