import React, { useState, useEffect } from "react";
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
import StudentSidebar from "./studentSidebar";
import axios from "@/utils/axiosInstance";
import { baseURL } from "@/utils/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AssignmentPage = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({});
  const [classData, setClassData] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentId = localStorage.getItem("student_id");
      try {
        const studentResponse = await axios.get(
          `${baseURL}/student/${studentId}`
        );
        setStudentData(studentResponse.data.data);
        if (studentResponse.data.data.class_id) {
          const classResponse = await axios.get(
            `${baseURL}/class/${studentResponse.data.data.class_id}`
          );
          setClassData(classResponse.data.data);
        }

        if (studentResponse.data.data) {
          const assignmentsResponse = await axios.get(
            `${baseURL}/assignments/class/${studentResponse.data.data.class_id}`
          );
          setAssignments(assignmentsResponse.data);
        }
        const coursePromises = studentResponse.data.data.course_id.map(
          (courseId) => axios.get(`${baseURL}/course/${courseId}`)
        );
        const courseResponses = await Promise.all(coursePromises);
        setCoursesData(courseResponses.map((response) => response.data.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8">
        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center">Assignments</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] overflow-y-auto">
            <div className="space-y-4">
              {assignments &&
                assignments.length > 0 &&
                assignments.map((assignment) => (
                  <div
                    key={assignment._id}
                    className="border-b border-gray-200 pb-2 mb-2 last:border-b-0"
                  >
                    <div className="text-lg font-bold">{assignment.title}</div>
                    <div className="text-sm text-gray-600">
                      Description: {assignment.description}
                    </div>

                    <div className="text-sm text-gray-800 text-end mt-[10px]">
                      {new Date(assignment.start_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}{" "}
                      --{" "}
                      {new Date(assignment.end_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AssignmentPage;
