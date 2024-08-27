import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle , CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, BookOpen, GraduationCap, LogIn } from "lucide-react";
import StudentSidebar from "./studentSidebar";
import axios from "axios";

const ClassesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classesData, setClassesData] = useState([]);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = localStorage.getItem("student_id");
        const studentResponse = await axios.get(`http://localhost:8000/student/${studentId}`);
        setStudentData(studentResponse.data.data);

        if (studentResponse.data.data.class_id) {
          const classResponse = await axios.get(`http://localhost:8000/class/${studentResponse.data.data.class_id}`);
          setClassesData([classResponse.data.data]); // Wrap in array if it's a single class
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredClasses = classesData.filter((classItem) =>
    classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Classes</h1>
        <div className="mb-6 flex">
          <Input
            placeholder="Search classes..."
            className="max-w-sm mr-2 border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <Card
              key={classItem.id}
              className="mb-6 border-blue-100 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="text-2xl font-semibold text-blue-800 ">
                  {classItem.class_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex  space-x-2 text-gray-700">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-center">Students: {classItem.students.length}</span>
                </div>
                <div className="flex  space-x-2 text-gray-700">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span className="text-center">Teachers: {classItem.teachers.length}</span>
                </div>
                <div className="flex  space-x-2 text-gray-700">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-center">Courses: {classItem.courses.length}</span>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 w-full text-white"
                  // onClick={() => handleEnterClass(classItem.id)}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Enter Class
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClassesDashboard;
