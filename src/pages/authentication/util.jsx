import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Buffer } from 'buffer';

// Function to get the role from the token
export const getRoleFromToken = () => {
  const encryptedtoken = Cookies.get("access_token");
  if (encryptedtoken) {
    const token = Buffer.from(encryptedtoken, 'base64').toString('ascii');
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
