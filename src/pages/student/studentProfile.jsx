import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Edit, Save } from "lucide-react";
import StudentSidebar from "./studentSidebar";

const StudentProfile = () => {
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
      const response = await axios.get(`http://localhost:8000/student/${student_id}`);
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/student/${studentData.id}`, studentData);
      setIsEditing(false);
      fetchStudentData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="Student Avatar" />
                <AvatarFallback className="text-2xl bg-blue-200 text-blue-800">
                  {studentData.student_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold">
                  {studentData.student_name}
                </CardTitle>
                {/* <p className="text-sm opacity-80">Student ID: {studentData.id}</p> */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Separator className="my-6" />
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Name</label>
                <Input
                  type="text"
                  name="student_name"
                  value={studentData.student_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Age</label>
                <Input
                  type="number"
                  name="age"
                  value={studentData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <Input
                  type="tel"
                  name="phone_num"
                  value={studentData.phone_num}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <Input
                  type="email"
                  name="student_email"
                  value={studentData.student_email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Address</label>
                <Input
                  type="text"
                  name="address"
                  value={studentData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
            </div>
            <div className="mt-8">
              <Button
                onClick={isEditing ? handleSave : handleEdit}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Edit Information
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
