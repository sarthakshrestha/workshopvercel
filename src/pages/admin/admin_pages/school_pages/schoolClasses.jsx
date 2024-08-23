import apiClient from 'config/apiClient';
import { useSchoolContext } from 'context/SchoolContext';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import SchoolSidebar from './schoolSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const initialClassState = {
    class_name: '',
    school_id: '',
}

const ClassItem = ({ classes }) => {
    const navigate = useNavigate();
    const [classData, setClassData] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await apiClient.get(`/class/${classes.id}`);
                if (response.data.status === "success") {
                    setClassData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchClassData();
    }, [classes.id]);

    const handleNavigateToClass = () => {
        navigate(`/admin/schools/classes/${classes.id}`);
    };

    return (
        <motion.div 
            layout
            className="bg-white border-l-4 border-black shadow-md p-4 mb-4 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, height: isExpanded ? '150px' : '60px' }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">{classData.class_name}</h3>
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FaEllipsisV />
                </motion.button>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600">
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="flex justify-center items-center"
                        >
                            <Button 
                                onClick={handleNavigateToClass}
                                className="mt-4 underline bg-white hover:bg-white text-black font-medium py-2 px-4 rounded-md transition duration-300"
                            >
                                View Details
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const SchoolClasses = () => {
    const { schoolId } = useSchoolContext();
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [classResponse, setClassResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newClass, setNewClass] = useState({...initialClassState, school_id: schoolId});

    const fetchClasses = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/class/school/${schoolId}`);
            setClassResponse(response.data.data);
        } catch (error) {
            console.log("Error fetching classes", error);
            setClassResponse([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
        setNewClass(prev => ({ ...prev, school_id: schoolId }));
    }, [schoolId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass(prev => ({ ...prev, [name]: value, school_id: schoolId }));
    };

    const addClass = async () => {
        try {
            const response = await apiClient.post('/class', newClass);
            if (response.data.status === "success") {
                setNewClass({...initialClassState, school_id: schoolId});
                fetchClasses();
                toast({
                    title: "Success",
                    description: "Class Added Successfully",
                });
                setIsAddDialogOpen(false);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to add class. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error adding class:', error);
            toast({
                title: "Error",
                description: "An error occurred while adding the class. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Class Management</h1>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button className="text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center">
                                        <FaPlus className="mr-2" />
                                        <span>Add Class</span>
                                    </Button>
                                </motion.div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-white">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-gray-800">Add New Class</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4">
                                    <Label htmlFor="class_name" className="text-sm font-medium text-gray-700">
                                        Class Name
                                    </Label>
                                    <Input
                                        id="class_name"
                                        name="class_name"
                                        value={newClass.class_name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                    />
                                </div>
                                <DialogFooter className="mt-6">
                                    <Button onClick={addClass} className="text-white font-medium py-2 px-4 rounded-md transition duration-300">
                                        Save Class
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-12 w-12 border-t-2 border-b-2 rounded-full"
                            />
                        </div>
                    ) : classResponse && classResponse.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {classResponse.map((classes, index) => (
                                <ClassItem key={index} classes={classes} />
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
                            <p>Start by adding a new class using the 'Add Class' button above.</p>
                        </motion.div>
                    )}
                </main>
            </div>
            <Toaster duration={1000} />
        </div>
    )
}

export default SchoolClasses;