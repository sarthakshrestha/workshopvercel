import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "../../gallery/Logo.png";
import Blur from "../../gallery/images/blur.jpg";
import { useNavigate } from "react-router-dom";
import { isMentor } from "./util";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import CryptoJS from 'crypto-js';



function MentorLogin() {
  const navigate = useNavigate();
  const SECRET_KEY = 'MRgnS4LVB8SvJWu1JexdRGlCOCrKfBQ9';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  isMentor();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/mentor/login", {
        email,
        password,
      });
      console.log("doing")
      const { access_token, token_type } = response.data;
      console.log("doing1")
      const decodedToken = jwtDecode(access_token);
      console.log("doing2")
      const teacherId = decodedToken.id || decodedToken.sub;
      console.log("doing3")
      console.log("Teacher ID:", teacherId);

      localStorage.setItem("teacher_id", teacherId);
      console.log("doing4")
      const encryptedToken = CryptoJS.AES.encrypt(access_token, SECRET_KEY).toString();
      Cookies.set("access_token", encryptedToken, { expires: 7 });

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `${token_type} ${access_token}`;

      navigate("/mentor/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const homeRedirect = () => {
    navigate("/");
  };

  return (
    <div>
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
        <div className="flex w-full lg:w-1/2 justify-center items-center p-6 lg:p-12">
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
                as a mentor
              </span>
            </h2>

            <form className="space-y-4">
              {/* Email Field */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 font-sans"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
                />
              </div>

              {/* Password Field */}
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 font-sans"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  id="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-sans"
              >
                Sign In
              </Button>

              {/* Additional Options */}
              <div className="flex justify-between items-center mt-4 font-sans">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline font-sans"
                >
                  Forgot Password
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorLogin;
