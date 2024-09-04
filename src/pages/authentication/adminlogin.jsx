import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "../../gallery/Logo.png";
import Blur from "../../gallery/images/blur.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance"; // Make sure to import your axios instance
import Cookies from "js-cookie";
import { isAdmin } from "./util";
import CryptoJS from 'crypto-js';

function AdminLogin() {
  const navigate = useNavigate();
  const SECRET_KEY = 'MRgnS4LVB8SvJWu1JexdRGlCOCrKfBQ9';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  isAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });

      const { access_token, token_type } = response.data;
      // Save access token in cookies
      const encryptedToken = CryptoJS.AES.encrypt(access_token, SECRET_KEY).toString();
      Cookies.set("access_token", encryptedToken, { expires: 7 });

      // Set the default Authorization header for future requests
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `${token_type} ${access_token}`;

      console.log("Successfully logged in");
      navigate(`/admin`);

      // Handle successful login, e.g., redirect
      // history.push('/dashboard'); // Uncomment and import 'useHistory' from 'react-router-dom' if using React Router
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const mentorLogin = () => {
    navigate("/mlogin");
  };

  const homeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half: Placeholder Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={Blur}
          alt="Placeholder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Half: Sign-In Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6 lg:p-12 max-sm:p-11">
        <div className="w-full max-w-md">
          {/* Logo at the top */}
          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="h-auto w-96"
              onClick={homeRedirect}
            />
          </div>

          <h2 className="text-4xl lg:text-4xl font-bold mb-6 text-gray-800 font-sans">
            Sign in{" "}
            <span className="text-regular lg:text-regular font-light mb-6 text-gray-800 font-sans">
              as an administrator.
            </span>
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <Label
                htmlFor="username"
                className="block font-medium text-gray-700 font-sans text-lg"
              >
                Email
              </Label>
              <Input
                type="username"
                id="username"
                placeholder="Enter your username"
                className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="block font-medium text-gray-700 font-sans text-lg"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mt-2 font-sans">{error}</div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-sans"
            >
              Sign In
            </Button>

            {/* Additional Options */}
            <div className="flex justify-between items-center mt-4 font-sans">
              <a href="#" className="text-blue-600 hover:underline font-sans">
                Help
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
