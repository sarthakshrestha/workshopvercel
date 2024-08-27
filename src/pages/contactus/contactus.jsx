import Footer from "pages/footer/footer";
import Navbar from "pages/navbar/navbar";
import React from "react";
import Maps from "../../gallery/Maps.png";

function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex rounded-2xl">
            <div className="md:w-1/2 lg:p-20 max-sm:p-4 rounded-2xl">
              <h2 className="text-4xl font-bold mb-4 flex text-center w-full mx-[30%] font-sans">
                <span className="mr-2">Get in</span>
                <span className="text-blue-500">touch</span>
              </h2>
              <p className="text-gray-600 mb-14 mt-14"></p>
              <form>
                <input
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="Contact name"
                />
                <input
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  type="tel"
                  placeholder="Contact Phone"
                />
                <input
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  type="email"
                  placeholder="E-mail"
                />
                <textarea
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  placeholder="Your Message"
                  rows="4"
                ></textarea>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                  SUBMIT
                </button>
              </form>
              <div className="flex justify-between mt-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span className="text-blue-500">01-4951016</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="text-blue-500">
                    hub@thedigitalhorizons.com
                  </span>
                </div>
              </div>
            </div>
            {/* Updated Image Section with Blue Background */}
            <div className="md:w-1/2 h-96 md:h-auto relative max-sm:bg-white max-sm:mx-auto max-sm:flex max-sm:px-50% rounded-2xl">
              <div className="absolute inset-y-0 right-0 w-1/2 lg:bg-blue-600 md:bg-blue-600  z-1"></div>
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={Maps}
                  alt="Map placeholder"
                  className="absolute w-auto h-full object-cover p-11 right-1 rounded-2xl"
                />
              </div>
              <div className="absolute top-4 left-2 bg-white px-2 py-5 rounded shadow mt-5 ml-5">
                <p className="text-sm">Digital Horizons,</p>
                <p className="text-sm">Dhana Mana Bhawan</p>
                <p className="text-sm">Gyaneshwor, Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
