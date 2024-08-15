import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, School, Users, Book, Calendar,GraduationCap } from 'lucide-react';
import logo from 'gallery/images/logo.png';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  
  const navigate = useNavigate();

  const adminDashboard = () => {navigate('/admin')};
  const schools = () => {navigate('/admin/schools')};
  const mentors = () => {navigate('/admin/mentors')};
  const courses = () => {navigate('/admin/courses')};
  return (
    <aside className="w-56 h-screen fixed bg-homeText text-white shadow-lg font-archivo">
      <div className="p-4 flex items-center justify-center flex-col">
        <div className="mb-6">
          <img src={logo} alt="Digital Horizon" className="h-full w-full rounded-lg cursor-pointer" />
        </div>

        <nav className="flex-grow overflow-y-auto w-full">
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => (adminDashboard())}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => (schools())}
          >
            <School className="mr-2 h-5 w-5" />
            Schools
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => (mentors())}
          >
            <Users className="mr-2 h-5 w-5" />
            Mentors
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => (courses())}
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Courses
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Events
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
