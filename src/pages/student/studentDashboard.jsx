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
  const [feedbacks, setFeedbacks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [studentData, setStudentData] = useState({
    id: "",
    student_name: "",
    age: "",
    phone_num: "",
    student_email: "",
    address: "",
  });

  // function convertToNepaliDate(date) {
  //   const nepaliMonths = [
  //     'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  //     'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  //   ];

  //   const daysInMonth = [
  //     30, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 29
  //   ];

  //   const gregorianDate = new Date(date);

  //   let nepaliYear = gregorianDate.getFullYear() + 56;
  //   let nepaliMonthIndex = (gregorianDate.getMonth() + 8) % 12;
  //   let nepaliDay = gregorianDate.getDate() + 15;

  //   if (nepaliDay > daysInMonth[nepaliMonthIndex]) {
  //     nepaliDay -= daysInMonth[nepaliMonthIndex];
  //     nepaliMonthIndex++;
  //     if (nepaliMonthIndex === 12) {
  //       nepaliMonthIndex = 0;
  //       nepaliYear++;
  //     }
  //   }

  //   const nepaliMonth = nepaliMonths[nepaliMonthIndex];

  //   return `${nepaliMonth} ${nepaliDay}, ${nepaliYear}`;
  // }

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
          const assignementsResponse = await axios.get(
            `${baseURL}/assignments/class/${studentResponse.data.data.class_id}`
          );
          setAssignments(assignementsResponse.data);
        }
        const coursePromises = studentResponse.data.data.course_id.map(
          (courseId) => axios.get(`${baseURL}/course/${courseId}`)
        );
        const courseResponses = await Promise.all(coursePromises);
        setCoursesData(courseResponses.map((response) => response.data.data));
        const feedbackResponse = await axios.get(
          `${baseURL}/feedback/for/${studentId}`
        );
        const feedbacksWithTeachers = await Promise.all(
          feedbackResponse.data.data.map(async (feedback) => {
            const teacherResponse = await axios.get(
              `${baseURL}/teacher/${feedback.feedback_by}`
            );
            return {
              ...feedback,
              teacherName: teacherResponse.data.data.name,
            };
          })
        );
        setFeedbacks(feedbacksWithTeachers);
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

  // const assignments = [
  //   {
  //     id: 1,
  //     name: "Scratch Basics: Create a Simple Game",
  //     dueDate: "2024-09-05",
  //     course: "Introduction to Scratch",
  //   },
  //   {
  //     id: 2,
  //     name: "Scratch Animation Project",
  //     dueDate: "2024-09-10",
  //     course: "Advanced Scratch Techniques",
  //   },
  //   {
  //     id: 3,
  //     name: "Python Fundamentals Quiz",
  //     dueDate: "2024-09-15",
  //     course: "Python Programming",
  //   },
  //   {
  //     id: 4,
  //     name: "HTML/CSS Portfolio Project",
  //     dueDate: "2024-09-20",
  //     course: "Web Development Basics",
  //   },
  //   {
  //     id: 5,
  //     name: "Scratch Interactive Story",
  //     dueDate: "2024-09-25",
  //     course: "Storytelling with Scratch",
  //   },
  //   {
  //     id: 6,
  //     name: "JavaScript Mini-Game",
  //     dueDate: "2024-09-30",
  //     course: "Interactive Web Programming",
  //   },
  //   {
  //     id: 7,
  //     name: "Scratch Music Mixer",
  //     dueDate: "2024-10-05",
  //     course: "Multimedia with Scratch",
  //   },
  //   {
  //     id: 8,
  //     name: "Algorithms and Flowcharts",
  //     dueDate: "2024-10-10",
  //     course: "Computational Thinking",
  //   },
  // ];

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Hello, look through your Dashboard
          </h1>
          <div className="grid md:grid-cols-3 gap-5 mb-0 w-full">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {assignments &&
                    assignments.length > 0 &&
                    assignments.map((assignment) => (
                      <div
                        key={assignment._id}
                        className="border-b border-gray-200 pb-2 mb-2 last:border-b-0"
                      >
                        <div className="text-lg font-bold">
                          {assignment.title}
                        </div>
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
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Recent Feedbacks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedbacks &&
                feedbacks.length > 0 &&
                feedbacks.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-[19px]">Feedback</span>
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
                        {feedback.feedback_description}
                      </p>

                      <p className="text-sm font-semibold mt-2">
                        From mentor: {feedback.teacherName}
                      </p>
                      <p className="text-sm text-end text-gray-600 mt-[5px]">
                        {
                          new Date(feedback.feedback_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                          /// convertToNepaliDate(feedback.feedback_date)
                        }
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
