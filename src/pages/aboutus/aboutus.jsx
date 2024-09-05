import Navbar from "pages/navbar/navbar";
import React from "react";
import OurTeam from "./members";
import DotPattern from "../../gallery/DotPattern.png";
import MakeADifference from "pages/section/makeadifference";
import Footer from "footer/footer";
import EducationPhoto from "../../gallery/Education.png";
import Arpit from "../../gallery/members/Arpit.jpg";
import Image from "../../gallery/Image.svg";

function ChangeGameStory() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:mt-14 max-sm:p-14 max-sm:mt-4 ">
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        {/* Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 relative">
          <img
            src={Arpit}
            alt="Placeholder"
            className="rounded-lg shadow-lg object-cover w-full max-w-md mx-auto relative z-10"
          />
          <img
            src={DotPattern}
            alt="Dot Pattern"
            className="absolute top-0 bottom-[14%] left-[14%] h-auto w-32 -mt-4 -ml-4 z-0 max-sm:hidden"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-6xl md:text-6xl font-bold text-navy-blue mb-8 max-sm:text-5xl">
            Change the game through a{" "}
            <span className="text-blue-700">story</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
          </p>
          <p className="text-gray-600">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
          </p>
        </div>
      </div>
    </div>
  );
}

function NewStory() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:mt-14 max-sm:p-14 max-sm:mt-4 ">
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        {/* Image Section */}

        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-6xl md:text-6xl font-bold mb-4 text-navy-blue max-sm:text-5xl">
            Our Commitment to <span className="text-blue-700">Education</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
          </p>
          <p className="text-gray-600">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
            ipsum
          </p>
        </div>
        <div className="md:w-1/2 mb-6 md:mb-0 relative">
          <img
            src={EducationPhoto}
            alt="Placeholder"
            className="rounded-lg shadow-lg w-full max-w-2xl mx-auto relative z-10" // Changed max-w-md to max-w-lg
          />
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-12">
        <h1 className="text-7xl font-sans font-bold font-sans">About Us</h1>
      </div>
      <div className="flex justify-center items-center mt-4 max-sm:px-9">
        <p className="text-lg font-sans mt-2 max-w-2xl text-center">
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
          Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          Lorem Ipsum
        </p>
      </div>

      <ChangeGameStory />

      <NewStory />

      {/* <OurTeam /> */}
      <MakeADifference />

      <Footer />
    </div>
  );
}

export default AboutUs;
