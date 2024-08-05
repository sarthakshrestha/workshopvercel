import React from 'react';
import { Users, Video, BookOpen, Award, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-navBar">
        <div className="text-2xl font-bold text-navBar-foreground">Digital Horizon</div>
        <nav className="hidden md:block">
          <ul className="flex space-x-[5rem] text-navBar-foreground text-m">
            <li>About</li>
            <li>Courses</li>
            <li>Team</li>
            <li>Testimonials</li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button className='bg-joinButton rounded-full px-5'>Join Us</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center p-8 bg-secondary">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Best Digital Online Courses</h1>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Button size="lg">Get Started</Button>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/api/placeholder/400/300" alt="Student studying" className="rounded-lg w-full" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-background">
        {[
          { icon: Video, title: "100+", description: "Video Courses" },
          { icon: Users, title: "500+", description: "Students" },
          { icon: BookOpen, title: "50+", description: "Subjects" },
          { icon: Award, title: "100%", description: "Satisfaction" },
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <stat.icon className="h-8 w-8 mb-2" />
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Popular Courses Section */}
      <section className="p-8 bg-secondary">
        <h2 className="text-3xl font-bold mb-6">Most Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((course) => (
            <Card key={course}>
              <CardHeader>
                <img src={`/api/placeholder/300/200?text=Course ${course}`} alt={`Course ${course}`} className="w-full mb-4 rounded" />
                <CardTitle>Course Title {course}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Brief description of the course goes here.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>
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