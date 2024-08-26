import React from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  School,
  Users,
  LogOut,
  Calendar,
  GraduationCap,
} from "lucide-react";
import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const adminDashboard = () => {
    navigate("/admin");
  };

  const homeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  const schools = () => {
    navigate("/admin/schools");
  };
  const mentors = () => {
    navigate("/admin/mentors");
  };
  const courses = () => {
    navigate("/admin/courses");
  };
  const events = () => {
    navigate("/admin/events");
  };

  return (
    <aside className="w-56 h-screen fixed bg-homeText text-white shadow-lg font-archivo">
      <div className="p-4 flex items-center justify-center flex-col mt-4">
        <div className="mb-6">
          <img
            src={logo}
            alt="Digital Horizon"
            className="h-full w-full rounded-lg cursor-pointer"
            onClick={homeClick}
          />
        </div>

        <nav className="flex-grow overflow-y-auto w-full">
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={adminDashboard}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={schools}
          >
            <School className="mr-2 h-5 w-5" />
            Schools
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={mentors}
          >
            <Users className="mr-2 h-5 w-5" />
            Mentors
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={courses}
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Courses
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={events}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Events
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
