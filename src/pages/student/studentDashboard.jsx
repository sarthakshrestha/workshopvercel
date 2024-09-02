import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentSidebar from "./studentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfilePicture from "../../gallery/Mentor.jpg";
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
import Assignments from "assets/Assignments.svg";
import Attendance from "assets/Attendance.svg";
import Students from "assets/Students.svg";
import Courses from "assets/Courses.svg";

const StudentDashboard = () => {
  const [classData, setClassData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [studentData, setStudentData] = useState({
    id: "",
    student_name: "",
    age: "",
    phone_num: "",
    student_email: "",
    address: "",
  });

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
            Hello, look through your Dashboard
          </h1>
          <div className="grid md:grid-cols-4 gap-6 mb-0 w-full">
            <Card className="flex items-center justify-between py-4 px-6 h-[180px]">
              <div className="flex flex-col items-start text-left">
                <CardTitle className="text-xl font-medium mb-1">
                  Total Students
                </CardTitle>
                <div className="text-6xl font-bold">{totalStudents}</div>
                <div className="text-sm text-gray-600 mt-4">In Your Class</div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <img
                  src={Students}
                  alt="Total Students"
                  className="h-12 w-12"
                />
              </div>
            </Card>

            <Card className="flex items-center justify-between py-4 px-6 h-[180px]">
              <div className="flex flex-col items-start text-left mr-4">
                <CardTitle className="text-xl font-medium mb-1">
                  Attendance
                </CardTitle>
                <div className="text-6xl font-bold">{`${presentClasses}/${totalClasses}`}</div>
                <div className="text-sm text-gray-600 mt-4">
                  Present / Total Classes
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={Attendance} alt="Attendance" className="h-14 w-14" />
              </div>
            </Card>

            <Card className="flex items-center justify-between py-4 px-6 h-[180px]">
              <div className="flex flex-col items-start text-left mr-4">
                <CardTitle className="text-xl font-medium mb-1">
                  Assignments
                </CardTitle>
                <div className="text-6xl font-bold">{assignments.length}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Pending Assignments
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={Assignments}
                  alt="Assignments"
                  className="h-14 w-14"
                />
              </div>
            </Card>
            <Card className=" bg-none border-none ">
              <CardHeader className="flex flex-col items-center bg-gray-100 shadow-none border-none">
                <img
                  src={ProfilePicture}
                  alt="Mentor"
                  className="w-32 h-32 rounded-full"
                />
                <span className="mt-2 text-lg font-semibold">
                  {" "}
                  {studentData.student_name}
                </span>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Card className="h-[300px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="flex-shrink-0 mr-2">
                    <img src={Courses} alt="Courses" className="h-12 w-12" />
                  </div>
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
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src={Assignments}
                      alt="Assignments"
                      className="h-12 w-12"
                    />
                  </div>
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
