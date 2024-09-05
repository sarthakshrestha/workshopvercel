import React from "react";

function Mentors() {
  const mentors = [
    {
      name: "John Doe",
      role: "Frontend Tutor",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "Backend Tutor",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Mike Johnson",
      role: "Data Science Tutor",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Sarah Williams",
      role: "UI/UX Tutor",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 lg:mb-0 lg:w-1/2">
            Meet our mentors
          </h2>
          <p className="text-gray-600 lg:w-1/2">
            Digital Horizons employs a diverse range of people that bring a
            comprehensive set of skills and knowledge to the education we
            deliver.
          </p>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-max sm:w-auto">
            {mentors.map((mentor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-64 sm:w-auto"
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600">{mentor.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mentors;
