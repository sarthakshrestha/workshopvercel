import React from "react";
import bw from "../../gallery/images/1.jpg";

function Videos() {
  return (
    <section className="w-full relative h-screen">
      <img src={bw} alt="Classroom" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center font-sans z-10 px-4">
          Our Commitment to Education
        </h2>
      </div>
    </section>
  );
}

export default Videos;
