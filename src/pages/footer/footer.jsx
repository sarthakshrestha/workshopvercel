import React, { useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";
import logo from "gallery/WhiteLogo.png";
import Arrow from "gallery/Arrow.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Function to scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const gotopage = () => {
    navigate("/contact");
  };

  useEffect(() => {
    // Ensure the scroll to top function is available globally
    window.scrollToTop = scrollToTop;
  }, []);

  return (
    <footer className="bg-[#1D293F] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and tagline */}
          <div className="mb-8 md:mb-0">
            {/* Placeholder for logo */}
            <div className="flex-1 flex justify-center md:justify-start items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-auto w-auto md:max-h-[110px] lg:max-h-[225px] object-contain"
              />
            </div>
          </div>
          <div className="max-sm:px-6">
            {/* Navigation links */}
            <div className="max-sm:px-4">
              {/* Navigation links */}
              <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-24 sm:gap-y-12">
                <div className="w-1/3 sm:w-auto">
                  <h3 className="font-normal mb-12 max-sm:mb-0 text-lg sm:text-xl">
                    Company
                  </h3>
                  <ul className="space-y-3 sm:space-y-9 mt-2 sm:mt-6">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-300 text-sm sm:text-base font-light text-gray-300"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-1/3 sm:w-auto ml-11">
                  <h3 className="font-normal text-lg sm:text-xl mb-12 max-sm:mb-0">
                    Learn More
                  </h3>
                  <ul className="space-y-3 sm:space-y-9 mt-2 sm:mt-6">
                    <li>
                      <a
                        href="#"
                        className="hover:text-gray-300 text-sm sm:text-base font-light text-gray-300"
                      >
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="max-sm:mt-5">
                  <div className="w-1/3 sm:w-auto max-sm:w-full max-sm:mx-auto max-sm:flex-col">
                    <h3 className="font-normal text-lg sm:text-xl mb-12 max-sm:mb-2">
                      Contact
                    </h3>
                    <p className="mb-2 sm:mb-6 text-sm sm:text-base text-gray-300">
                      info@digitalhorizons.com
                    </p>
                    <div className="mt-4 sm:mt-8 flex space-x-4 sm:space-x-9">
                      <a href="#" className="text-white hover:text-gray-300">
                        <FaLinkedin size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-gray-300">
                        <FaFacebook size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-gray-300">
                        <FaInstagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToTop}
                  className=" bottom-5 right-5 p-2 rounded-full text-white max-sm:text-center max-sm:mx-auto max-sm:flex max-sm:mt-9 max-sm:mb-14 lg:hidden"
                >
                  <img
                    src={Arrow}
                    alt="Logo"
                    className="h-auto w-auto md:max-h-[110px] lg:max-h-[225px] object-contain mr-12"
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className=" bottom-5 right-5 p-2 rounded-full text-white max-sm:text-center max-sm:mx-auto max-sm:flex max-sm:mt-9 max-sm:mb-14 max-sm:hidden"
          >
            <img
              src={Arrow}
              alt="Logo"
              className="h-auto w-auto md:max-h-[110px] lg:max-h-[225px] object-contain mr-12"
            />
          </button>
        </div>

        {/* Scroll to Top Button */}

        {/* Copyright */}
      </div>
    </footer>
  );
};

export default Footer;
