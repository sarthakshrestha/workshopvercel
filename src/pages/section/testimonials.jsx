import React from "react";
import { Heart, User } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "CS Teacher at Nova College - Ram",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Student - Dave",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Student - Alison Cheung",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      name: "Student - Justin Thompson",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Blue circle background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-blue-500 mr-5" />
            <span className="text-5xl">Teachers and Students Love us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
              </div>
              <div className="flex items-center mt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
