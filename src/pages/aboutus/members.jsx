import React from "react";
import Manasha from "../../gallery/members/Manasha.jpg";
import Sarthak from "../../gallery/members/Sarthak.jpg";
import Arpit from "../../gallery/members/Arpit.jpg";

const TeamMember = ({ name, role, image }) => (
  <div className="bg-white rounded-2xl overflow-hidden flex-shrink-0 w-64 border">
    <img
      className="w-full  object-cover object-center rounded-2xl"
      src={image}
      alt={name}
    />
    <div className="p-4">
      <p className="text-blue-500 text-center">{role}</p>
      <h3 className="text-xl mb-1 text-center">{name}</h3>
    </div>
  </div>
);

const OurTeam = () => {
  const teamMembers = [
    { name: "Arpit Sharma", role: "Backend Developer", image: Arpit },
    { name: "Sarthak Shrestha", role: "Tech Lead", image: Sarthak },
    { name: "Manasha Koirala", role: "UX/UI", image: Manasha },
    {
      name: "Spandan Bhattarai",
      role: "Front end Developer",
      image: "https://via.placeholder.com/300x300.png?text=Spandan+Bhattarai",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-5">Meet The Team</h2>
        <h3 className="mx-auto text-lg text-center mb-12 text-gray-500">
          Our teams of professional to serve you
        </h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-2 pb-4 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
