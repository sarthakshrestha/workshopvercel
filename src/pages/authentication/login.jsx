import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "../../gallery/Logo.png";
import Blur from "../../gallery/images/blur.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Buffer } from 'buffer';

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mentorLogin = () => {
    navigate("/mlogin");
  };

  const adminLogin = () => {
    navigate("/admin/login");
  };

  const studentLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/student/login", {
        email,
        password,
      });

      const { access_token, token_type } = response.data;
      const encryptedToken = Buffer.from(access_token).toString('base64');
      Cookies.set("access_token", encryptedToken , { expires: 7 });

      const decodedToken = jwtDecode(access_token);

      const studentId = decodedToken.id || decodedToken.sub;

      console.log("Student ID:", studentId);

      localStorage.setItem("student_id", studentId);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `${token_type} ${access_token}`;

      navigate("/student");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
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
          className="w-full h-full object-cover "
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
              className="h-auto w-96 "
              onClick={homeRedirect}
            />
          </div>

          <h2 className="text-4xl lg:text-4xl font-bold mb-6 text-gray-800 font-sans">
            Sign in{" "}
            <span className="text-regular lg:text-regular font-light mb-6 text-gray-800 font-sans">
              as a student
            </span>
          </h2>

          <form className="space-y-4" onSubmit={studentLogin}>
            {/* Email Field */}
            <div>
              <Label
                htmlFor="text"
                className="block font-medium text-gray-700 font-sans text-lg"
              >
                Student ID
              </Label>
              <Input
                type="text"
                id="text"
                placeholder="Enter your student ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-sans"
            >
              Sign In
            </Button>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm mt-2 font-sans">{error}</div>
            )}

            {/* Additional Options */}
            <div className="flex justify-between items-center mt-4 font-sans">
              <a
                href="#"
                className="text-blue-600 hover:underline font-sans"
                onClick={mentorLogin}
              >
                I mentor students.
              </a>
              <a
                href="#"
                className="text-blue-600 hover:underline font-sans"
                onClick={adminLogin}
              >
                I manage schools.
              </a>
              {/* <a href="#" className="text-blue-600 hover:underline font-sans">
                Help
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
