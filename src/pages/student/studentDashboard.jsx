import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentSidebar from "./studentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Book,
  Star,
  Calendar,
  MessageSquare,
  CheckCircle,
  FileText,
} from "lucide-react";
import { baseURL } from "@/utils/axiosInstance";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);

  const feedbacks = [
    {
      id: 1,
      rating: 4.5,
      title: "Great Progress in Scratch Project",
      description:
        "Your recent Scratch project showed excellent use of loops and conditionals. Keep up the good work!",
      mentor: "Ujjawal Shah",
    },
    {
      id: 2,
      rating: 4,
      title: "Improving Problem-Solving Skills",
      description:
        "You've shown significant improvement in breaking down complex problems. Your algorithm design for the last assignment was particularly impressive.",
      mentor: "Siddhartha BK",
    },
    {
      id: 3,
      rating: 4.8,
      title: "Outstanding Creativity in Coding",
      description:
        "Your Scratch animation project was incredibly creative. You're doing an excellent job applying programming concepts to create engaging content.",
      mentor: "Anurag Sah",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const studentId = localStorage.getItem("student_id");
      try {
        // Fetch student data
        const studentResponse = await axios.get(
          `${baseURL}/student/${studentId}`
        );
        setStudentData(studentResponse.data.data);

        // Fetch class data
        if (studentResponse.data.data.class_id) {
          const classResponse = await axios.get(
            `${baseURL}/class/${studentResponse.data.data.class_id}`
          );
          setClassData(classResponse.data.data);
        }

        // Fetch attendance data
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const attendanceResponse = await axios.get(
          `${baseURL}/attendances/student/${studentId}/class/${studentResponse.data.data.class_id}/month/${year}/${month}`
        );
        setAttendanceData(attendanceResponse.data.data);

        // Fetch courses data
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

  const totalEnrolledCourses = studentData?.course_id?.length || 0;
  const totalStudents = classData?.students?.length || 0;
  const totalTeachers = classData?.teachers?.length || 0;
  const totalCourses = classData?.courses?.length || 0;

  const presentClasses =
    attendanceData?.attendances.filter((a) => a.status === "present").length ||
    0;
  const totalClasses = attendanceData?.attendances.length || 0;

  const assignments = [
    {
      id: 1,
      name: "Scratch Basics: Create a Simple Game",
      dueDate: "2024-09-05",
      course: "Introduction to Scratch",
    },
    {
      id: 2,
      name: "Scratch Animation Project",
      dueDate: "2024-09-10",
      course: "Advanced Scratch Techniques",
    },
    {
      id: 3,
      name: "Python Fundamentals Quiz",
      dueDate: "2024-09-15",
      course: "Python Programming",
    },
    {
      id: 4,
      name: "HTML/CSS Portfolio Project",
      dueDate: "2024-09-20",
      course: "Web Development Basics",
    },
    {
      id: 5,
      name: "Scratch Interactive Story",
      dueDate: "2024-09-25",
      course: "Storytelling with Scratch",
    },
    {
      id: 6,
      name: "JavaScript Mini-Game",
      dueDate: "2024-09-30",
      course: "Interactive Web Programming",
    },
    {
      id: 7,
      name: "Scratch Music Mixer",
      dueDate: "2024-10-05",
      course: "Multimedia with Scratch",
    },
    {
      id: 8,
      name: "Algorithms and Flowcharts",
      dueDate: "2024-10-10",
      course: "Computational Thinking",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Student Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Enrolled Courses
                </CardTitle>
                <Book className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrolledCourses}</div>
                <div className="text-sm text-gray-600">
                  Total Courses Enrolled
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <div className="text-sm text-gray-600">In Your Class</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Attendance
                </CardTitle>
                <CheckCircle className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{`${presentClasses}/${totalClasses}`}</div>
                <div className="text-sm text-gray-600">
                  Present / Total Classes
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Assignments
                </CardTitle>
                <FileText className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.length}</div>
                <div className="text-sm text-gray-600">Pending Assignments</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-6 w-6" />
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] overflow-y-auto">
                <div className="space-y-4">
                  {coursesData.map((course, index) => (
                    <div
                      key={course.id}
                      className="border-b border-gray-200 pb-2 mb-2 last:border-b-0"
                    >
                      <div className="text-lg font-bold">
                        {course.course_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Duration: {course.course_duration}
                      </div>
                      <div className="text-sm text-gray-600">
                        Content: {course.course_content}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="h-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-6 w-6" />
                  Upcoming Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] overflow-y-auto">
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="border-b border-gray-200 pb-2 mb-2 last:border-b-0"
                    >
                      <div className="text-lg font-bold">{assignment.name}</div>
                      <div className="text-sm text-gray-600">
                        Course: {assignment.course}
                      </div>
                      <div className="text-sm text-gray-600">
                        Due: {assignment.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Recent Feedbacks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-[19px]">{feedback.title}</span>
                      <span className="flex items-center">
                        <Star
                          className="h-5 w-5 text-yellow-400 mr-1"
                          fill="currentColor"
                        />
                        {feedback.rating}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {feedback.description}
                    </p>
                    <p className="text-sm font-semibold">
                      Mentor: {feedback.mentor}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
