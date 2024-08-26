import apiClient from 'config/apiClient';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import TeacherSidebar from '../teacherSidebar';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaUserGraduate, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ClassItem = ({ classData }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border-l-4 border-black shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{classData.class_name}</h3>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                    <FaUserGraduate className="mr-2 w-5 h-5 text-gray-700" />
                    <span>{classData.students?.length || 0} Students</span>
                </div>
                <div className="flex items-center">
                    <FaBook className="mr-2 w-5 h-5 text-gray-700" />
                    <span>{classData.courses?.length || 0} Courses</span>
                </div>
                <div className="flex items-center">
                    <FaChalkboardTeacher className="mr-2 w-6 h-6 text-gray-700" />
                    <span>{classData.teachers?.length || 0} Teachers</span>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Button
                    className="underline bg-white hover:bg-white text-black font-medium py-2 px-4 rounded-md transition duration-300"
                    onClick={() => navigate("/teacher/students/" + classData.id)}
                >
                    View Students
                </Button>
                <Button
                    className="underline bg-white hover:bg-white text-black font-medium py-2 px-4 rounded-md transition duration-300"
                    onClick={() => navigate("/teacher/attendances/" + classData.id)}
                >
                    Take Attendance
                </Button>
            </div>
        </div>
    );
};

const SchoolClasses = () => {
    const { schoolId } = useParams();
    const location = useLocation();
    const { toast } = useToast();
    const [classesData, setClassesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClassesData = async () => {
            setIsLoading(true);
            try {
                const searchParams = new URLSearchParams(location.search);
                const classIds = searchParams.get('classes')?.split(',') || [];

                const classPromises = classIds.map(classId =>
                    apiClient.get(`http://localhost:8000/class/${classId}`)
                );

                const classResponses = await Promise.all(classPromises);
                const classesData = classResponses.map(response => response.data.data);

                setClassesData(classesData);
            } catch (error) {
                console.error('Error fetching classes data:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch classes data. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchClassesData();
    }, [schoolId, location.search, toast]);

    return (
        <div className="flex h-screen bg-gray-100">
            <TeacherSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Class Management</h1>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-12 w-12 border-t-2 border-b-2 rounded-full"
                            />
                        </div>
                    ) : classesData.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {classesData.map((classData, index) => (
                                <ClassItem key={index} classData={classData} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md"
                        >
                            <p className="font-bold">No Classes Found</p>
                            <p>There are no classes associated with this school.</p>
                        </motion.div>
                    )}
                </main>
            </div>
            <Toaster duration={1000} />
        </div>
    )
}

export default SchoolClasses;
