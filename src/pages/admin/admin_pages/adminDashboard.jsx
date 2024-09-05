import React, { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import apiClient from "config/apiClient";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, School, BookOpen, TrendingUp, Book } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const colors = [
    "rgba(75, 192, 192, 0.8)", // Soft Teal
    "rgba(54, 162, 235, 0.8)", // Light Blue
    "rgba(153, 102, 255, 0.8)", // Lavender
    "rgba(255, 159, 64, 0.8)", // Soft Orange
    "rgba(255, 205, 86, 0.8)", // Soft Yellow
    "rgba(201, 203, 207, 0.8)", // Light Gray
    "rgba(99, 255, 132, 0.8)", // Light Green
    "rgba(255, 99, 132, 0.8)", // Soft Red
    "rgba(150, 75, 0, 0.8)", // Brown
    "rgba(128, 128, 128, 0.8)", // Medium Gray
  ];
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalSchools, setTotalSchools] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [schoolCourseData, setSchoolCourseData] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await apiClient.get("/student");
        const schoolsResponse = await apiClient.get("/school");
        const totalCoursesResponse = await apiClient.get("/course");
        const schoolCourseDataResponse = await apiClient.get(
          "/student_per_course"
        );
        const popularCoursesResponse = await apiClient.get("/popular_courses");

        if (
          studentsResponse.data.status === "success" &&
          schoolsResponse.data.status === "success" &&
          totalCoursesResponse.data.status === "success" &&
          schoolCourseDataResponse.data.status === "success" &&
          popularCoursesResponse.data.status === "success"
        ) {
          setTotalStudents(
            studentsResponse.data.data ? studentsResponse.data.data.length : 0
          );
          setTotalSchools(
            schoolsResponse.data.data ? schoolsResponse.data.data.length : 0
          );
          setTotalCourses(
            totalCoursesResponse.data.data
              ? totalCoursesResponse.data.data.length
              : 0
          );
          setSchoolCourseData(
            schoolCourseDataResponse.data.data
              ? schoolCourseDataResponse.data.data
              : []
          );
          setPopularCourses(
            popularCoursesResponse.data.data &&
              popularCoursesResponse.data.data.length > 0
              ? popularCoursesResponse.data.data.map((course, index) => ({
                  courseName: course.courseName,
                  students: course.students,
                  color: colors[index % colors.length], // Assign color from the colors array
                }))
              : []
          );
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const schoolCourseChartData = {
    labels:
      schoolCourseData && schoolCourseData.length > 0
        ? schoolCourseData.map((item) => item.schoolName)
        : [],
    datasets:
      schoolCourseData && schoolCourseData.length > 0
        ? Object.keys(schoolCourseData[0])
            .filter((key) => key !== "schoolName")
            .map((course, index) => ({
              label: course,
              data: schoolCourseData.map((item) => item[course]),
              backgroundColor: colors[index % colors.length], // Use predefined colors
            }))
        : [],
  };

  const popularCoursesChartData = {
    labels: popularCourses.map((course) => course.courseName),
    datasets: [
      {
        data: popularCourses.map((course) => course.students),
        backgroundColor: popularCourses.map(
          (course, index) => colors[index % colors.length]
        ),
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Statistics",
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Popular Courses",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const sum = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / sum) * 100).toFixed(2) + "%";
            return `${label}: ${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8 ml-56">
          <div className="grid grid-cols-4 md:grid-cols-5 gap-1 mb-8 ml-2">
            <div className="block">
              <div className="text-lg font-medium mb-2 text-center">
                Students Enrolled
              </div>
              <div className="text-6xl font-bold text-center">
                {totalStudents}
              </div>
            </div>
            <div className="block">
              <div className="text-lg font-medium mb-2 text-center">
                Partnered Schools
              </div>
              <div className="text-6xl font-bold text-center">
                {totalSchools}
              </div>
            </div>
            <div className="block">
              <div className="text-lg font-medium mb-2 text-center">
                Mentors Registered
              </div>
              <div className="text-6xl font-bold text-center">x</div>
            </div>
            <div className="block">
              <div className="h-[32rem]">
                <Pie
                  data={popularCoursesChartData}
                  options={pieChartOptions}
                  className="bg-none"
                />
              </div>
            </div>
          </div>
          <div className="gap-8">
            <h1 className="text-lg">Students per course</h1>
            <div className="h-96 w-[50%]">
              <Bar data={schoolCourseChartData} options={options} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
