import React from "react";
import arrow1 from "../../gallery/arrows/1.png";
import arrow2 from "../../gallery/arrows/2.png";

function Simple() {
  const steps = [
    {
      icon: "👤",
      title: "Invite students",
      description:
        "Register at DigitalHorizons, create a digital classroom, and invite students.",
    },
    {
      icon: "📊",
      title: "Monitor",
      description:
        "Follow your students' progress aligned with your curriculum.",
    },
    {
      icon: "✅",
      title: "Assess",
      description:
        "Grade students based on their progress throughout the study course.",
    },
  ];

  return (
    <div className="container mx-auto px-1 py-8 mb-16">
      <h1 className="text-4xl md:text-4xl font-bold text-center mt-14 mb-24 text-[#1e293b]">
        Working with our System is simple.
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-start relative">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col items-center mb-8 md:mb-0 w-full md:w-1/2 z-10 ${
                index === 0
                  ? "md:-mt-[-2rem]"
                  : index === 1
                  ? "md:mt-48"
                  : "md:mt-64"
              }`}
            >
              <div className="bg-[#3b82f6] rounded-lg p-4 mb-4 text-white text-2xl mt-2">
                {step.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center">
                {step.title}
              </h2>
              <p className="text-center text-sm px-4">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <img
                src={index === 0 ? arrow1 : arrow2}
                alt={`Arrow ${index + 1}`}
                className={`hidden md:block w-1/4 self-center md:mb-0 mb-[-120px] ${
                  index === 1 ? "mt-16" : ""
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Simple;
