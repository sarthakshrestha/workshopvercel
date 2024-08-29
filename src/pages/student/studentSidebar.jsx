import React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  Calendar,
  GraduationCap,
  LogOut,
  Home,
} from "lucide-react";
import { History, ClipboardList, FileCheck, CalendarCheck } from "lucide-react";
import Cookies from "js-cookie";

import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  const classesClick = () => {
    navigate("/student/classes");
  };

  
  const studentDashboard = () => {
    navigate("/student");
  };

  const studentProfile = () => {
    navigate("/student/profile");
  };

  const Attendance = () => {
    const studentId = localStorage.getItem("student_id");
    navigate(`/student/attendances/${studentId}`);
  };

  return (
    <aside className="w-56 h-screen bg-[#34496C] text-white shadow-lg font-archivo">
      <div className="p-4 flex items-center justify-center flex-col mt-10">
        <div className="mb-6">
          <img
            src={logo}
            alt="Digital Horizon"
            className="h-full w-full rounded-lg cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <nav className="flex-grow overflow-y-auto w-full">
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => studentDashboard()}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
            onClick={classesClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Classes
          </Button>
          {/* <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Courses
          </Button> */}
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
            onClick={(e) => navigate("/student/calendar")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Academic Calendar
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
            onClick={Attendance}
          >
            <History className="mr-2 h-5 w-5" />
            Attendance History
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
            onClick={studentProfile}
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
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

export default StudentSidebar;
