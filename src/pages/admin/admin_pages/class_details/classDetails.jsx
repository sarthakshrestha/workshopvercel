import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import SchoolSidebar from '../school_pages/schoolSidebar';
import apiClient from 'config/apiClient';
import LoadingSpinner from 'userDefined_components/loading_spinner/loadingSpinner';
import StudentList from './displayStudent';
import AddStudentButton from './addStudentButton';
import AssignCoursesButton from './assignCoursesButton';
import {Users, GraduationCap, BookOpen} from 'lucide-react';


const ClassDetails = () => {
    const { classId } = useParams();
    const { toast } = useToast();
    const [classData, setClassData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCourse, setTotalCourse] = useState(0);
    const [totalTeacher, setTotalTeacher] = useState(0);
    const [totalStudent, setTotalStudent] = useState(0);

    const fetchClassData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/class/${classId}`);
            console.log(response);
            // if (!response.ok) throw new Error('Failed to fetch class data');
            setClassData(response.data.data);
            setTotalStudent(response.data.data.students?.length || 0);
            setTotalCourse(response.data.data.courses?.length || 0);
            setTotalTeacher(response.data.data.teachers?.length || 0);
        } catch (error) {
            console.error('Error fetching class data:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    }, [classId])

    useEffect(() => {

        fetchClassData();
    }, [fetchClassData]);


    const handleAddStudent = async (newStudent) => {
        try {
            const addStudent = {
                ...newStudent,
                school_id: classData.school_id,
                class_id: classId,
                course_id: classData.course_id || []
            }
            const response = await apiClient.post('/student', addStudent);
            if (response.data.status === "success") {
                toast({
                    title: "Success",
                    description: "Student added successfully",
                });

                // Update the class data after adding the student
                const updatedClassData = {
                    ...classData,
                    students: [
                        ...classData.students.map(student => student.id),
                        response.data.message 
                    ] 
                };

                setClassData(updatedClassData);
                setTotalStudent(updatedClassData.students.length);
                // Optionally, you can also send a PUT request to the class endpoint to update the class data on the server
                await apiClient.put(`/class/${classId}`, updatedClassData);
                fetchClassData(); // Re-fetch class data to update the student list
            } else {
                toast({
                    title: "Error",
                    description: "Failed to add student. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error adding student:', error);
            toast({
                title: "Error",
                description: "An error occurred while adding the student. Please try again.",
                variant: "destructive",
            });
        }
    };


    const handleDeleteStudent = async (studentId) => {
        // Implement your deletion logic here
        try {
            const response = await apiClient.delete(`/student/${studentId}`);
            if (response.data.status === "success") {
                toast({
                    title: "Success",
                    description: "Student deleted successfully",
                });
                // Update the class data after deleting the student
                const updatedClassData = {
                    ...classData,
                    students: classData.students.filter(student => student.id !== studentId)
                };
                setClassData(updatedClassData);
                setTotalStudent(updatedClassData.students.length);

            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete student. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            toast({
                title: "Error",
                description: "An error occurred while deleting the student. Please try again.",
                variant: "destructive",
            });
        }
    };


    const handleEditStudent = () => {
        fetchClassData()
    };

    const handleAssignCourse = async (selectedCourses) => {
        try{
            if(classData.id){
            const updatedClassData = {
                ...classData,
                courses: selectedCourses,
                students: 
                    classData.students.map(student => student.id)
                
            };
            const classUpdateResponse = await apiClient.put(`/class/${classData.id}`, updatedClassData);
    
            if (classUpdateResponse.data.status !== "success") {
                throw new Error("Failed to update class data");
            }

            const updateStudentPromises = classData.students.map(student => 
                apiClient.put(`/student/${student.id}`, {
                    ...student,
                    course_id: [...selectedCourses]
                })
            );
    
            // setClassData(classUpdateResponse.data.data)
            fetchClassData();
            await Promise.all(updateStudentPromises);
    
            await fetchClassData();
    
            toast({
                title: "Success",
                description: "Courses assigned successfully",
            });
        };
    }
    catch (error) {
        console.error('Error assigning courses:', error);
        toast({
            title: "Error",
            description: "An error occurred while assigning courses. Please try again.",
            variant: "destructive",
        });
    }
};


    return (
        <div className="flex h-screen bg-gray-100">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-8">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : classData ? (
                        <>
                            <h1 className="text-3xl font-bold mb-6">{classData.class_name}</h1>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between ">
                                        <h2 className="text-lg font-semibold text-gray-700">Students</h2>
                                        <Users className="text-gray-600" size={28} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{totalStudent}</p>
                                    <p className='text-gray-600'>Total Students studing in the school</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between ">
                                        <h2 className="text-lg font-semibold text-gray-700">Teachers</h2>
                                        <GraduationCap className="text-gray-600" size={28} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{totalTeacher}</p>
                                    <p className='text-gray-600'>Total Teachers Teaching in the school</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex items-center justify-between ">
                                        <h2 className="text-lg font-semibold text-gray-700">Courses</h2>
                                        <BookOpen className="text-gray-600" size={28} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{totalCourse}</p>
                                    <p className='text-gray-600'>Total Courses being studied in the school</p>
                                </div>
                            </div>

                            <div className="flex space-x-4 mb-8">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-1/3">
                                    Assign Teacher
                                </button>
                                <AssignCoursesButton onAssignCourse={handleAssignCourse} class_data={classData}/>
                                <AddStudentButton onAddStudent={handleAddStudent} />
                            </div>

                            <StudentList students={classData.students} onEditStudent={handleEditStudent} onDeleteStudent={handleDeleteStudent} />        
                        </>
                    ) : (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center">
                            <p className="font-bold">No Class Data Found</p>
                            <p>There was an issue retrieving the class data. Please try again later.</p>
                        </div>
                    )}
                </main>
            </div>
            <Toaster duration="1000"/>
        </div>
    );
};

export default ClassDetails;
