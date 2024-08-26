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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Code, Book, Clock, Info } from "lucide-react";
import apiClient from "config/apiClient";

const CourseCard = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          {course.course_name}
        </CardTitle>
        <CardDescription className="text-lg font-semibold text-gray-600 flex items-center">
          {course.course_content}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-500  italic">
          "{course.description.substring(0, 100)}..."
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-800 flex items-center">
            <Clock className="mr-2" color="#4A5568" size={20} />
            Duration:{" "}
            <span className="text-gray-600 ml-1 font-bold">
              {course.course_duration}
            </span>
          </span>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full h-full bg-blue-900 hover:bg-blue-800 text-white"
        >
          <Info className="mr-2" size={16} />
          View Details
        </Button>
      </CardFooter>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{course.course_name}</DialogTitle>
            <DialogDescription>{course.course_content}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-700">{course.description}</p>
            <div className="mt-4 flex items-center space-x-2">
              <Clock size={16} />
              <span>Duration: {course.course_duration}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    course_content: "",
    course_duration: "",
    description: "",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
      setCourses([...courses, response.data.data]);
      setIsAddDialogOpen(false);
      setNewCourse({
        course_name: "",
        course_content: "",
        course_duration: "",
        description: "",
      });
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
        <div className="mb-4">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-900 hover:bg-blue-800 text-white"
          >
            Add Course
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Course</DialogTitle>
            <DialogDescription>
              Fill out the details of the new course below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Course Name"
              name="course_name"
              value={newCourse.course_name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Course Content"
              name="course_content"
              value={newCourse.course_content}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Course Duration"
              name="course_duration"
              value={newCourse.course_duration}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Description"
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddCourse}
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesPage;
