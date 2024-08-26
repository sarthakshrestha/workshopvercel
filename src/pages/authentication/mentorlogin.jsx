import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "../../gallery/Logo.png";
import Blur from "../../gallery/images/blur.jpg";
import { useNavigate } from "react-router-dom";

function MentorLogin() {
  const navigate = useNavigate();

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
                  id="password"
                  placeholder="Enter your password"
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
