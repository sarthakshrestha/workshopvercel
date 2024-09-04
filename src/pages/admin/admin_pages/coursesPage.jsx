import React, { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Code, Book, Clock, Info, Plus } from "lucide-react";
import apiClient from "config/apiClient";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl min-w-[300px] h-[250px] border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Code className="mr-2" size={24} color="#2c5282" />
            {course.course_name}
          </h2>
        </div>
        <h3
          style={{ letterSpacing: "1px" }}
          className="text-lg font-semibold mb-3 text-gray-600 flex items-center"
        >
          <Book className="mr-2" size={20} color="#4299e1" />
          {course.course_content}
        </h3>
        <div className="flex justify-start items-center mt-4">
          <span
            className="text-sm font-medium text-gray-800 flex items-center"
            style={{ letterSpacing: "1px" }}
          >
            <Clock className="mr-2" color="#2c5282" size={20} />
            Duration:{" "}
            <span className="text-blue-600 ml-1 font-bold">
              {course.course_duration}
            </span>
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-white bg-blue-900 hover:bg-blue-800 px-3 py-1 rounded-full transition duration-300 text-sm font-medium flex items-center w-full justify-center mt-7">
              <Info className="w-4 h-4 mr-1" />
              <span>View Details</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                {course.course_name}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-lg">
                {course.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    course_content: "",
    course_duration: "",
    description: "",
    logo: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get("/course");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCourse = async () => {
    try {
      const response = await apiClient.post("/course", newCourse);
      console.log(response);
      setCourses([...courses, newCourse]);
      setNewCourse({
        course_name: "",
        course_content: "",
        course_duration: "",
        description: "",
        logo: "",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-10 ml-[220px] xl:ml-[270px]">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Courses
        </h1>
        <div className="mb-8 flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-lg transition duration-300 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
                  Add a New Course
                </DialogTitle>
                <DialogDescription className="text-gray-600 mb-4">
                  Fill out the details of the new course below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Course Name"
                  name="course_name"
                  value={newCourse.course_name}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Input
                  placeholder="Course Content"
                  name="course_content"
                  value={newCourse.course_content}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Input
                  placeholder="Course Duration"
                  name="course_duration"
                  value={newCourse.course_duration}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Input
                  placeholder="Description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <DialogFooter className="mt-6">
                <Button
                  onClick={handleAddCourse}
                  className="bg-blue-900 hover:bg-blue-800 w-full text-white py-2 rounded-lg transition duration-300"
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
