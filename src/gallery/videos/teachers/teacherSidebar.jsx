import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, School, Users, Book, Calendar,GraduationCap } from 'lucide-react';
import logo from 'gallery/images/logo.png';
import { useNavigate } from 'react-router-dom';

const TeacherSidebar = () => {
  
  const navigate = useNavigate();

  const teacherDashboard = () => {navigate('/teacher/dashboard')};
  const schools = () => {navigate('/teacher/school')};
  return (
    <aside className="w-56 h-screen bg-homeText text-white shadow-lg font-archivo">
      <div className="p-4 flex items-center justify-center flex-col">
        <div className="mb-6">
          <img src={logo} alt="Digital Horizon" className="h-full w-full rounded-lg cursor-pointer" />
        </div>

        <nav className="flex-grow overflow-y-auto w-full">
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => (teacherDashboard())}
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
          
        </nav>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
