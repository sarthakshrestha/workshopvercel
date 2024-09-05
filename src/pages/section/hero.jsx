import React from "react";
import { Button } from "@/components/ui/button";
import Circle from "../../gallery/Circle.svg";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const contactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen justify-between items-center p-4 sm:p-6 md:p-12 relative  overflow-hidden">
      <div className="absolute inset-0 "></div>
      {/* Text Section */}
      <div className="w-full md:w-2/3 mb-8 md:mb-0 z-10 p-2 md:p-8 mt-4">
        <div className="flex flex-col space-y-4 lg:mb-16">
          <h1 className="text-6xl max-sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold lg:mb-8 font-sans text-zinc-800 lg:leading-snug max-sm:mb-7">
            Where Young Minds Code Their Future
          </h1>
          <p className="text-xl mt-5 sm:text-base md:text-lg lg:text-3xl lg:mb-20 text-gray-700 font-sans max-w-2xl lg:leading-snug">
            Through immersive, hands-on mentorship, we equip students with the
            practical skills, creativity, and confidence needed to excel in a
            rapidly evolving tech landscape.
          </p>
          <div>
            <Button
              className="bg-blue-500 text-white font-regular text-lg lg:text-xl p-4 lg:p-8 rounded-xl shadow-lg hover:bg-buttonColor-hover transition duration-300 font-sans flex items-center justify-center lg:mt-16 w-full sm:w-auto max-sm:hidden"
              onClick={contactClick}
            >
              Start Learning
            </Button>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="w-full flex justify-center items-center mt-8 md:hidden">
          <img
            src={Circle}
            alt="Circle"
            className="w-[60%] h-auto object-contain max-sm:w-full"
          />
        </div>
      </div>

      {/* Desktop Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 lg:mb-28 hidden md:flex lg:mr-12">
        <img
          src={Circle}
          alt="Circle"
          className="w-auto h-auto max-w-[80%] xl:max-w-full object-contain"
        />
      </div>
    </section>
  );
}

export default Hero;
