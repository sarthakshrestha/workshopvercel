import React, { useState, useEffect } from "react";
import apiClient from "config/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import {
  User,
  Phone,
  Home,
  School,
  BookOpen,
  Mail,
  MapPin,
  AlertCircle,
} from "lucide-react";
import MentorSidebar from "../mentorSidebar";
import ProfilePictureAvatar  from "./profilePictureAvator"

const IndividualMentor = () => {
  const mentorId = localStorage.getItem("teacher_id");
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await apiClient.get(`/teacher/${mentorId}`);
        setTeacher(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch teacher data");
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [mentorId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl font-semibold mb-8">Error</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MentorSidebar />
      <main className="flex-1 overflow-auto p-6 ml-56">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Mentor Profile
        </h1>

        <Card className="shadow-lg mx-auto w-full md:w-96 lg:w-1/2 bg-[#C0D1EE]">
          <CardContent className="p-6">
            <ProfilePictureAvatar 
                    profilePicture={teacher.profile_picture}
                    studentName={teacher.name}
                  />
            <CardHeader className="text-[#353535]">
              <div className="flex mx-auto items-center space-x-4 ">
                <div>
                  <CardTitle className="text-3xl mt-5 ">
                    {teacher.name}
                  </CardTitle>
                </div>
              </div>
              <div className="flex mx-auto items-center space-x-4 ">
                <div>
                  <CardTitle className="text-lg mt-1 text-[#686868]">
                    {teacher.address}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <ul className="space-y-4">
              <li className="bg-[#F3F4F6] p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <User className="mr-2 w-5 h-5 text-gray-600" />
                  <span className="font-semibold">Username</span>
                </div>
                <span>{teacher.username}</span>
              </li>
              <li className="bg-[#F3F4F6] p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Phone className="mr-2 w-5 h-5 text-gray-600" />
                  <span className="font-semibold">Phone</span>
                </div>
                <span>{teacher.phone_num}</span>
              </li>
              <li className="bg-[#F3F4F6] p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Home className="mr-2 w-5 h-5 text-gray-600" />
                  <span className="font-semibold">Address</span>
                </div>
                <span>{teacher.address}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IndividualMentor;
