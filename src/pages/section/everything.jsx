import React from "react";
import Image from "../../gallery/Image.svg";
import DotPattern from "../../gallery/DotPattern.png";

function EverythingInOnePlace() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 max-sm:bottom-36 max-sm:relative max-sm:p-9 max-sm:h-[300px]">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-center mb-8 lg:mb-12">
        Everything
        <br />
        we do in a single place
      </h1>

      {/* Center the image */}
      <div className="flex flex-col items-center md:flex-row mx-auto justify-center md:space-x-8">
        <div className="mb-8 md:mb-0 relative flex justify-center items-center">
          <img
            src={Image}
            alt="Student presenting"
            className="rounded-lg shadow-lg object-cover w-full max-w-6xl mx-auto relative z-10"
          />
          <img
            src={DotPattern}
            alt="Dot Pattern"
            className="absolute top-0 left-0 right-6 h-auto w-32 -mt-4 -ml-4 z-0 max-sm:hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default EverythingInOnePlace;
