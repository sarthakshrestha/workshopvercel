import React, { useState, useEffect } from 'react';
import AdminSidebar from '../adminSidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Code, Book, Clock } from 'lucide-react'; 
import javascript from '../../../gallery/images/javascript.png';
import python from '../../../gallery/images/PythonProgramming.jpg';
import apiClient from 'config/apiClient';

const CourseCard = ({ course }) => {
  const [showDescription, setShowDescription] = useState(false);

  const getCourseImage = (courseName) => {
    if (courseName.toLowerCase().includes('javascript')) {
      return javascript;
    }
    return python;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl min-w-[300px] ${showDescription ? 'h-auto' : 'h-[335px]'}`}>
      <img
        src={getCourseImage(course.course_name)}
        alt={course.course_name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 flex items-center">
          <Code className="mr-2"  size={24} />
          {course.course_name}
        </h2>
        <h3 style={{ letterSpacing: "1.5px" }} className="text-lg font-semibold mb-2 text-gray-600 flex items-center">
          <Book className="mr-2"  size={20} />
          {course.course_content}
        </h3>
        {showDescription && (
          <p className="text-gray-500 mb-4 ">--- {course.description}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-medium text-gray-800 flex items-center" style={{ letterSpacing: "1px" }}>
            <Clock className="mr-1" color="black" size={23} />
            Duration: <span className="text-gray-800 ml-1">{course.course_duration}</span>
          </span>
          <Button
            onClick={() => setShowDescription(!showDescription)}
            className="text-white bg-homeText hover:bg-[#434311] px-2 py-1 rounded transition duration-300 text-sm font-medium flex items-center"
          >
            {showDescription ? (
              <>
                <span>Hide Details</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Learn More</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_name: '',
    course_content: '',
    course_duration: '',
    description: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get('/course');
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddCourse = async () => {
    try {
      // Replace the below URL with your backend endpoint for adding courses
      const response = await apiClient.post('/course', newCourse);
      setCourses([...courses, response.data.data]);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-10 ml-[220px] xl:ml-[270px]">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Courses</h1>
        <div className="mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white bg-homeText hover:bg-[#434311] px-4 py-2 rounded transition duration-300">
                Add Course
              </Button>
            </DialogTrigger>
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
                <Button onClick={handleAddCourse} className="bg-homeText w-full hover:bg-[#434311]">
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
          {courses.length > 0 && courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
