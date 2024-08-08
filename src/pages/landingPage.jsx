import React from 'react';
import MotionCard from '@/components/ui/motionCard';
import { Users, Video, BookOpen, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "gallery/images/logo.png";
import homepage from "gallery/images/homepage.png";


const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-navBar">
        <div className="flex text-2xl font-bold text-navBar-foreground">
          <img src={logo} alt="Logo" className='h-14 w-full'/>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-[5rem] text-navBar-foreground text-m">
            <li className='cursor-pointer'>About</li>
            <li className='cursor-pointer'>Courses</li>
            <li className='cursor-pointer'>Team</li>
            <li className='cursor-pointer'>Testimonials</li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button className='bg-joinButton hover:bg-joinButton-hover rounded-full px-5'>Join Us</Button>
        </div>
      </header>

      <section className="flex flex-col md:flex-row justify-between items-center p-12 bg-white relative min-h-screen overflow-hidden">
        <div className="w-full md:w-1/2 mb-12 md:mb-0 z-10 p-8">
          <div className='flex space-x-8'>
            <h1 className="text-6xl font-extrabold mb-6 text-homeText">Best</h1>
            <h1 className="text-6xl font-extrabold mb-6 text-joinButton">Digital</h1>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 text-homeText">Online Courses</h1>
          <p className="mb-6 text-lg text-gray-700">Unlock your potential with our comprehensive online courses designed to help you succeed in your career and personal growth.</p>
          <Button size="lg" className="bg-homeText text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-homeText-hover transition duration-300">Get Started</Button>
        </div>
        <div className="w-full md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0 h-full z-20">
          <img 
            src={homepage} 
            alt="Student studying" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* Stats Section */}
      <section className="p-8 bg-sectionBackground">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Video, title: "100+", description: "Video Courses" },
            { icon: Users, title: "500+", description: "Students" },
            { icon: BookOpen, title: "50+", description: "Subjects" },
            { icon: Award, title: "100%", description: "Satisfaction" },
          ].map((stat, index) => (
            <MotionCard 
              key={index}
              icon={stat.icon}
              title={stat.title}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </section>


      {/* Commitment Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-8 bg-background">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Our Commitment to Education</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/api/placeholder/400/300" alt="Classroom" className="rounded-lg w-full" />
        </div>
      </section>

      {/* Team Section */}
      <section className="p-8 bg-secondary">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((member) => (
            <Card key={member}>
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={`/api/placeholder/150/150?text=Member ${member}`} alt={`Team Member ${member}`} />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="font-bold">Member Name</h3>
                <p>Position</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 bg-primary text-primary-foreground text-center">
        <p>&copy; 2024 Digital Horizon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;