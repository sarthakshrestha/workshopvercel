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
        id: data.id,
        student_name: data.student_name,
        age: data.age,
        phone_num: data.phone_num,
        student_email: data.student_email,
        address: data.address,
        school_id: data.school_id,
        course_id: data.course_id,
        class_id: data.class_id,
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${baseURL}/student/${studentData.id}`, studentData);
      setIsEditing(false);
      fetchStudentData();
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const renderReadOnlyFields = () => (
    <>
      <div className="space-y-2">
        <div className="bg-[#F3F4F6] p-4 rounded-lg w-full">
          <p className="text-sm text-[#7B7B7B] ml-6">Age</p>
          <p className="text-xl ml-6">{studentData.age}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-[#F3F4F6] p-4 rounded-lg w-full">
          <p className="text-sm ml-6 text-[#7B7B7B]">Phone Number</p>
          <p className="text-xl ml-6">{studentData.phone_num}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-[#F3F4F6] p-4 rounded-lg w-full">
          <p className="text-sm ml-6 text-[#7B7B7B]">Student ID</p>
          <p className="text-xl ml-6">{studentData.student_email}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Avatar className="h-auto w-36 border-4 border-white shadow-lg mb-[-5rem]">
          <AvatarImage src={Arpit} alt="Student Avatar" />
          <AvatarFallback className="text-2xl bg-blue-200 text-blue-800">
            {studentData.student_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden bg-[#C0D1EE] p-9">
          <CardHeader className="text-zinc-900">
            <div className="flex mx-auto items-center space-x-4 mt-8">
              <div>
                <CardTitle className="text-3xl mt-5">
                  {studentData.student_name}
                </CardTitle>
              </div>
            </div>
            <div className="flex mx-auto items-center space-x-4">
              <div>
                <CardTitle className="text-lg mt-1 text-[#686868]">
                  {studentData.address}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 mx-auto flex">
            <div className="space-y-6 flex flex-col items-stretch w-full">
              {renderReadOnlyFields()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentsProfile;
