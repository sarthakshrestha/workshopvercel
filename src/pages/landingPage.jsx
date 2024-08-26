import React from "react";

import Navbar from "./navbar/navbar";
import Hero from "./section/hero";
import Videos from "./section/videos";
import System from "./section/system";
import Mentors from "./section/mentors";
import MakeADifference from "./section/makeadifference";
import Testimonials from "./section/testimonials";
import Bars from "./section/bars";
import ImageCarousel from "./section/wedo";
import TestimonialSection from "./section/testimonial1";
import EverythingInOnePlace from "./section/everything";
import Footer from "./footer/footer";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <Navbar />
      <Hero />
      {/* <Simple /> */}
      <Videos />
      {/* <Bars /> */}
      <System />
      <EverythingInOnePlace />
      {/* <Mentors /> */}
      {/* <ImageCarousel /> */}

      <MakeADifference />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
