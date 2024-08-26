import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import javascriptImg from "../../gallery/images/javascript.svg";
import pythonImg from "../../gallery/images/python.svg";
import javaImg from "../../gallery/images/java.svg";

function Offers() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(1);
  const courses = [
    {
      name: "JavaScript",
      img: javascriptImg,
      description:
        "JavaScript is a versatile language used for web development, server-side programming, and more.",
    },
    {
      name: "Python",
      img: pythonImg,
      description:
        "Python is a powerful language known for its simplicity and readability, great for data science, AI, and more.",
    },
    {
      name: "Java",
      img: javaImg,
      description:
        "Java is a high-level, class-based, and object-oriented language used in a wide range of applications.",
    },
  ];

  const handleCourseClick = (index) => {
    setSelectedCourseIndex(index);
  };

  const getOrderedCourses = () => {
    const orderedCourses = [...courses];
    const selected = orderedCourses.splice(selectedCourseIndex, 1)[0];
    orderedCourses.splice(1, 0, selected);
    return orderedCourses;
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-12 text-gray-800 font-poppins">
          What courses we can offer to mentor on
        </h2>

        <div className="flex flex-col items-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-8 mt-2">
            <AnimatePresence>
              {getOrderedCourses().map((course, index) => (
                <motion.div
                  key={course.name}
                  className={`cursor-pointer ${
                    index === 1 ? "z-10" : "opacity-70"
                  }`}
                  onClick={() =>
                    handleCourseClick(
                      courses.findIndex((c) => c.name === course.name)
                    )
                  }
                  initial={{ scale: index === 1 ? 1.5 : 1 }}
                  animate={{
                    scale: index === 1 ? 1.5 : 1,
                    opacity: index === 1 ? 1 : 0.7,
                    x: index === 1 ? 0 : index === 0 ? -50 : 50,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: index === 1 ? 1.6 : 1.1 }}
                >
                  <motion.img
                    src={course.img}
                    alt={course.name}
                    className="w-16 sm:w-24 md:w-32"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="w-full max-w-2xl mt-8">
            {courses[selectedCourseIndex] && (
              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 font-poppins">
                  {courses[selectedCourseIndex].name}
                </h3>
                <p className="text-lg text-gray-600 mb-6 font-poppins">
                  {courses[selectedCourseIndex].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
