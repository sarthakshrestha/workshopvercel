import React from "react";
import card from "../../gallery/images/card.png";

const TestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-10 sm:px-6 lg:px-8 p-10 lg:h-[700px]">
      <div className="max-w-7xl mx-auto mt-11">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side - Testimonial text */}
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-lg font-bold text-gray-900 mb-20">
              TESTIMONIALS
            </h2>
            <h3 className="text-6xl font-bold text-gray-800 mt-15 max-w-2xl font-sans">
              What People Say About Us.
            </h3>
          </div>

          {/* Right side - Card image */}
          <div className="lg:w-1/2">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src={card}
                alt="Testimonial Card"
                className="h-full w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
