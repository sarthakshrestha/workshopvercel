import React, { useState, useEffect } from 'react';
import SchoolSidebar from './schoolSidebar';
import { useSchoolContext } from 'context/SchoolContext';
import apiClient from 'config/apiClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";


const CourseCard = ({ course, isAssigned, onToggle }) => {
    return (
        <div
            className={`p-4 border rounded-lg mb-4 cursor-pointer ${isAssigned ? 'bg-blue-100' : ''}`}
            onClick={() => onToggle(course.id)}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{course.course_name}</h3>
                <Checkbox checked={isAssigned} />
            </div>
            <p className="text-sm text-gray-600">{course.description}</p>
        </div>
    );
};

const SchoolCourses = () => {
    const { schoolId } = useSchoolContext();
    const [courseList, setCourseList] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const[currentSchoolData, setCurrentSchoolData] = useState();
    const { toast } = useToast();

    const initialSchoolState = {
        school_name: '',
        email: '',
        password: '',
        address: '',
        course_id: []
    };

    useEffect(() => {
        fetchData();
    }, [schoolId]);

    const fetchData = async () => {
        try {
            const schoolResponse = await apiClient.get(`/school/${schoolId}`);
            const courseResponse = await apiClient.get('/course');
            setCurrentSchoolData(schoolResponse.data.data);
            setCourseList(schoolResponse.data.data.course_id || []);
            setAllCourses(courseResponse.data.data);
            setSelectedCourses(schoolResponse.data.data.course_id || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: "Error",
                description: "Failed to fetch courses. Please try again.",
                variant: "destructive",
            });
        }
    };

    const toggleCourse = (courseId) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const assignCourses = async () => {
        try {
    
            // Create an updated school object, spreading the current data and updating course_id
            const updatedSchoolData = {
                ...initialSchoolState,
                ...currentSchoolData,
                course_id: selectedCourses
            };

            delete updatedSchoolData.id;
    
            // Send the PUT request with the full updated school data
            const response = await apiClient.put(`/school/${schoolId}`, updatedSchoolData);
    
            if (response.data.status === "success") {
                toast({
                    title: "Success",
                    description: "Courses updated successfully",
                });
                setCourseList(selectedCourses);
                setIsDialogOpen(false);
                fetchData();
            }
        } catch (error) {
            console.error('Error assigning courses:', error);
            toast({
                title: "Error",
                description: "Failed to update courses. Please try again.",
                variant: "destructive",
            });
        }
    };
    

    return (
        <div className="flex h-screen">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-6 ml-56">
                    <h1 className="text-2xl font-bold mb-6">Course Management</h1>
                    <Button onClick={() => setIsDialogOpen(true)}>Manage Courses</Button>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Assign Courses</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 max-h-96 overflow-y-auto">
                                {allCourses.map(course => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        isAssigned={selectedCourses.includes(course.id)}
                                        onToggle={toggleCourse}
                                    />
                                ))}
                            </div>
                            <DialogFooter>
                                <Button onClick={assignCourses}>Save Changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Assigned Courses</h2>
                        {courseList.map(courseId => {
                            const course = allCourses.find(c => c.id === courseId);
                            return course ? (
                                <div key={courseId} className="p-4 border rounded-lg mb-4">
                                    <h3 className="text-lg font-semibold">{course.course_name}</h3>
                                    <p className="text-sm text-gray-600">{course.description}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                </main>
            </div>
            <Toaster duration={1000} />
        </div>
    );
};

export default SchoolCourses;
