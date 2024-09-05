import React from "react";
import Component from "../../gallery/Component.svg";
import monitor from "../../gallery/monitor icon.svg";
import login from "../../gallery/login icon.svg";
import assess from "../../gallery/assess icon.svg";

function System() {
  return (
    <div className="bg-white py-16 px-4 max-sm:p-11  ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-bold text-center text-gray-900 font-sans mb-12 max-sm:text-5xl">
          Working with our System is simple.
        </h2>

        <div className="grid gap-8 md:grid-cols-3 lg:hidden md:hidden">
          {/* Login Card */}
          <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row items-center max-sm:w-full max-sm:text-center ">
            <div className="flex-shrink-0 w-full sm:w-48 flex items-center justify-center p-2 max-sm:flex-col">
              <img
                src={login}
                alt="Login Icon"
                className="w-15 h-15 max-sm:w-15 max-sm:h-15 object-contain"
              />
            </div>
            <div className="lex flex-col justify-center w-full sm:w-2/3 bottom-16 relative">
              <h3 className="text-4xl sm:text-2xl font-bold text-gray-900 mb-4">
                Login
              </h3>
              <p className="text-gray-700 text-xl">
                Register at Digital Horizons and look through the mentors and
                students for login.
              </p>
            </div>
          </div>

          {/* Monitor Card */}
          <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row items-center max-sm:w-full max-sm:text-center bottom-20 relative">
            <div className="flex-shrink-0 w-full sm:w-48 flex items-center justify-center p-2 max-sm:flex-col">
              <img
                src={monitor}
                alt="Monitor Icon"
                className="w-15 h-15 max-sm:w-15 max-sm:h-15 object-contain"
              />
            </div>
            <div className="flex flex-col justify-center w-full sm:w-2/3 bottom-16 relative">
              <h3 className="text-4xl sm:text-2xl font-bold  text-gray-900 mb-4">
                Monitor
              </h3>
              <p className="text-gray-700 text-xl">
                Follow your students' progress aligned with your curriculum.
              </p>
            </div>
          </div>

          {/* Assess Card */}
          <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row items-center max-sm:w-full max-sm:text-center bottom-36 relative">
            <div className="flex-shrink-0 w-full sm:w-48 flex items-center justify-center p-2 max-sm:flex-col">
              <img
                src={assess}
                alt="Assess Icon"
                className="w-15 h-15 max-sm:w-15 max-sm:h-15 max-sm:w-auto object-contain mb-4"
              />
            </div>
            <div className="flex flex-col justify-center w-full sm:w-2/3 bottom-16 relative">
              <h3 className="text-4xl sm:text-2xl font-bold mb-4 text-gray-900 ">
                Assess
              </h3>
              <p className="text-gray-700 text-xl">
                Mentors assess the progress of students through a rigorous
                process.
              </p>
            </div>
          </div>
        </div>

        {/* Classroom Image Hidden on Smaller Devices */}
        <img
          src={Component}
          alt="Classroom"
          className="w-full h-full object-cover mt-12 max-sm:hidden"
        />
      </div>
    </div>
  );
}

export default System;
