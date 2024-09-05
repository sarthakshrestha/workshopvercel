import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import apiClient from "config/apiClient";
import { BookOpen } from "lucide-react";

const CourseCard = ({ course, isAssigned, onToggle }) => {
  return (
    <div
      className={`p-4 border rounded-lg mb-4 cursor-pointer ${
        isAssigned ? "bg-blue-100" : ""
      }`}
      onClick={() => onToggle(course.id)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{course.course_name}</h3>
        <Checkbox checked={isAssigned} onClick={(e) => e.stopPropagation()} />
      </div>
      <p className="text-sm text-gray-600">{course.description}</p>
    </div>
  );
};

const AssignCoursesButton = ({ onAssignCourse, class_data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [schoolCourses, setSchoolCourses] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [schoolCourseIds, setSchoolCourseIds] = useState([]);
  const { toast } = useToast();

  const fetchSchoolCourses = useCallback(async () => {
    try {
      const response = await apiClient.get(`/school/${class_data.school_id}`);
      setSchoolCourseIds(response.data.data.course_id || []);
    } catch (error) {
      console.error("Error fetching school courses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch school courses. Please try again.",
        variant: "destructive",
      });
    }
  }, [class_data.school_id]);

  const fetchAllCourses = useCallback(async () => {
    try {
      if (schoolCourseIds.length === 0) return;

      const courseData = await apiClient.post("/course_list", schoolCourseIds);
      setAllCourses(courseData.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
        variant: "destructive",
      });
    }
  }, [schoolCourseIds]);

  const updateCourseLists = useCallback(() => {
    const assignedCourses = class_data.courses.map((course) => course.id) || [];
    // console.log(assignedCourses)
    setCourseList(assignedCourses);
    setSelectedCourses(assignedCourses);
  }, [class_data]);

  useEffect(() => {
    fetchSchoolCourses();
  }, [fetchSchoolCourses]);

  useEffect(() => {
    if (schoolCourseIds.length > 0) {
      fetchAllCourses();
    }
  }, [schoolCourseIds, fetchAllCourses]);

  useEffect(() => {
    updateCourseLists();
  }, [updateCourseLists]);

  const fetchData = useCallback(() => {
    try {
      fetchSchoolCourses().then(fetchAllCourses(schoolCourses));
      updateCourseLists();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again.",
        variant: "destructive",
      });
    }
  }, [class_data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleCourse = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSave = () => {
    onAssignCourse(selectedCourses);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-800 text-white font-bold px-4 py-2 rounded hover:bg-zinc-600 w-1/3">
          <BookOpen className="mr-2" />
          Assign Courses
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-zinc-600">
            Assign New Courses
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-96 overflow-y-auto">
          {allCourses &&
            allCourses.length > 0 &&
            allCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isAssigned={selectedCourses.includes(course.id)}
                onToggle={toggleCourse}
              />
            ))}
        </div>
        <DialogFooter className="mt-6">
          <Button
            onClick={handleSave}
            className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCoursesButton;
