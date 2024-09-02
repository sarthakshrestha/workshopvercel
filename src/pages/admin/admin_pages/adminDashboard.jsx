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
        const totalCourses = await apiClient.get("/course");

        if (
          studentsResponse.data.status === "success" &&
          schoolsResponse.data.status === "success"
        ) {
          setTotalStudents(
            studentsResponse.data.data ? studentsResponse.data.data.length : 0
          );
          setTotalSchools(
            schoolsResponse.data.data ? schoolsResponse.data.data.length : 0
          );
          setTotalCourses(
            totalCourses.data.data ? totalCourses.data.data.length : 0
          );
        } else {
          console.error("Error fetching data");
        }

        // Static data for school course registration
        setSchoolCourseData([
          {
            schoolName: "School A",
            Python: 50,
            Java: 30,
            HTML: 20,
            React: 15,
            Node: 10,
          },
          {
            schoolName: "School B",
            Python: 40,
            Java: 35,
            HTML: 25,
            React: 20,
            Node: 15,
          },
          {
            schoolName: "School C",
            Python: 60,
            Java: 25,
            HTML: 15,
            React: 30,
            Node: 20,
          },
          {
            schoolName: "School D",
            Python: 45,
            Java: 40,
            HTML: 30,
            React: 25,
            Node: 15,
          },
        ]);

        // Static data for popular courses
        setPopularCourses([
          {
            courseName: "Python",
            students: 250,
            color: "rgba(59, 130, 246, 0.8)",
          },
          {
            courseName: "Java",
            students: 150,
            color: "rgba(16, 185, 129, 0.8)",
          },
          {
            courseName: "HTML",
            students: 125,
            color: "rgba(245, 158, 11, 0.8)",
          },
          {
            courseName: "React",
            students: 100,
            color: "rgba(99, 102, 241, 0.8)",
          },
          {
            courseName: "Node.js",
            students: 75,
            color: "rgba(20, 184, 166, 0.8)",
          },
        ]);
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
    labels: schoolCourseData.map((item) => item.schoolName),
    datasets: ["Python", "Java", "HTML", "React", "Node"].map(
      (course, index) => ({
        label: course,
        data: schoolCourseData.map((item) => item[course]),
        backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        },0.6)`,
      })
    ),
  };

  const popularCoursesChartData = {
    labels: popularCourses.map((course) => course.courseName),
    datasets: [
      {
        data: popularCourses.map((course) => course.students),
        backgroundColor: popularCourses.map((course) => course.color),
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
        <main className="p-6 ml-56">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <div className="text-sm text-gray-600">
                  Total Students Enrolled
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">Schools</CardTitle>
                <School className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSchools}</div>
                <div className="text-sm text-gray-600">
                  Total Partnered Schools
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">Courses</CardTitle>
                <Book className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCourses}</div>
                <div className="text-sm text-gray-600">
                  Total Courses Available
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Students Registered per Course in Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <Bar data={schoolCourseChartData} options={options} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  Most Popular Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 ">
                  <Pie
                    data={popularCoursesChartData}
                    options={pieChartOptions}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
