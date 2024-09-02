import React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  Calendar,
  GraduationCap,
  NotebookPen,
  LogOut,
  Home,
} from "lucide-react";
import { History } from "lucide-react";
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

  const Assignment = () => {
    navigate(`/student/assignment`);
  };

  return (
    <aside className="w-56 bg-[#34496C] text-white shadow-lg font-archivo h-screen">
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
            className={`w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/student"
                ? "bg-white text-black"
                : ""
            }`}
            onClick={(e) => studentDashboard()}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/classes")
                ? "bg-white text-black"
                : ""
            }`}
            onClick={classesClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Classes
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/calendar")
                ? "bg-white text-black"
                : ""
            }`}
            onClick={(e) => navigate("/student/calendar")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Academic Calendar
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/attendances")
                ? "bg-white text-black"
                : ""
            }`}
            onClick={Attendance}
          >
            <History className="mr-2 h-5 w-5" />
            Attendance History
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/attendances")
                ? "bg-white text-black"
                : ""
            }`}
            onClick={Assignment}
          >
            <NotebookPen className="mr-2 h-5 w-5" />
            Assignments
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/profile")
                ? "bg-white text-black"
                : ""
            }`}
            onClick={studentProfile}
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/student/logout"
                ? "bg-white text-black"
                : ""
            }`}
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
