import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Function to get the role from the token
export const getRoleFromToken = () => {
  const token = Cookies.get("access_token");
  if (token) {
    const decoded = jwtDecode(token);

    return decoded.role;
  } else {
    Cookies.remove("access_token");
    return null;
  }
};

export const isAdmin = () => {
  console.log("admin role");
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
  return getRoleFromToken() === "STUDENT";
};
