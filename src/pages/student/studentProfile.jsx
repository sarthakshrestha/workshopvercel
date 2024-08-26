import React, { useState } from "react";
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
    student_id: "STU001",
    full_name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Student St, College Town, CT 12345",
    date_of_birth: "2000-01-01",
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-900 text-white p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Student Avatar"
                />
                <AvatarFallback className="text-2xl bg-blue-200 text-blue-800">
                  {studentData.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold">
                  {studentData.full_name}
                </CardTitle>
                <p className="text-sm opacity-80">
                  Student ID: {studentData.student_id}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Separator className="my-6" />
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  value={studentData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  name="date_of_birth"
                  value={studentData.date_of_birth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="shadow-sm"
                />
              </div>
            </div>
            <div className="mt-8">
              <Button
                onClick={handleEdit}
                className="w-full bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
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
