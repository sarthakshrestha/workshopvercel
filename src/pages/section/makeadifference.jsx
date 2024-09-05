import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function MakeADifference() {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-sans h-[600px] mt-11 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 ">
          Make a difference with
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          teaching from Digital Horizons.
        </h2>
        <p className="text-xl max-sm:text-lg text-gray-600 mb-16 mt-20 max-sm:px-8 ">
          The future of your education is safe with us.
        </p>
        <Button
          className="bg-blue-600 font-light text-white text-lg py-8 max-sm:py-6 max-sm:text-base max-sm:px-10 px-14 rounded-xl hover:bg-blue-700 transition duration-300"
          onClick={handleContact}
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}

export default MakeADifference;
