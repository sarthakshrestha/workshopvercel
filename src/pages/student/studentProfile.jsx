import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Edit, Save } from "lucide-react";
import { baseURL } from "@/utils/axiosInstance";
import StudentSidebar from "./studentSidebar";
import Arpit from "../../gallery/members/Arpit1.png";
import ProfilePictureAvatar from "pages/mentors/mentorPages/profilePictureAvator";
import DisplayProfile from "userDefined_components/profileimage/ProfileImage";

const StudentsProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    id: "",
    student_name: "",
    age: "",
    phone_num: "",
    student_email: "",
    address: "",
    studentId: "",
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const student_id = localStorage.getItem("student_id");
    try {
      const response = await axios.get(`${baseURL}/student/${student_id}`);
      const { data } = response.data;
      setStudentData({
        student_name: data.student_name,
        age: data.age,
        phone_num: data.phone_num,
        student_email: data.student_email,
        address: data.address,
        school_id: data.school_id,
        course_id: data.course_id,
        class_id: data.class_id,
        studentId: data.studentId,
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <StudentSidebar />
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-7xl font-semibold mt-4">
          {studentData.student_name}
        </h1>
        <h2 className="text-lg mt-5 text-[#607496]">{studentData.studentId}</h2>
        <h2 className="text-lg mt-2 text-[#607496]">{studentData.address}</h2>
        <h2 className="text-lg mt-2 text-[#607496]">{studentData.phone_num}</h2>
        <div className="mt-9">
          <DisplayProfile
            profilePicture={studentData?.profile_picture}
            studentName={studentData?.student_name}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsProfile;
