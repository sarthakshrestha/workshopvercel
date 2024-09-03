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

const MentorProfile = () => {
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
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <MentorSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 ml-56">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Mentor Profile
          </h1>

          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center">
              <img
                src={teacher.profile_picture || "/default-avatar.png"}
                alt={teacher.name}
                className="w-40 h-40 rounded-full mb-4 shadow-md"
              />
              <h2 className="text-2xl font-semibold mb-4">{teacher.name}</h2>
              <ul className="w-full">
                <li className="flex items-center mb-2">
                  <User className="mr-2 w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Username</p>
                    <p>{teacher.username}</p>
                  </div>
                </li>
                <li className="flex items-center mb-2">
                  <Phone className="mr-2 w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>{teacher.phone_num}</p>
                  </div>
                </li>
                <li className="flex items-center mb-2">
                  <Home className="mr-2 w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>{teacher.address}</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default MentorProfile;
