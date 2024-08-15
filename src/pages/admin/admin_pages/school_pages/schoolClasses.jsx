import apiClient from 'config/apiClient';
import { useSchoolContext } from 'context/SchoolContext';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import SchoolSidebar from './schoolSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaPlus } from 'react-icons/fa';

const initialClassState = {
    class_name: '',
    school_id: '',
}

const DisplayClassCard = ({ classes }) => {
    const [classData, setClassData] = useState([]);
    const [totalStudent, setTotalStudent] = useState(0);
    const [totalCourse, setTotalCourse] = useState(0);
    const [totalTeacher, setTotalTeacher] = useState(0);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await apiClient.get(`/class/${classes.id}`);
                if (response.data.status === "success") {
                    setClassData(response.data.data);
                    setTotalStudent(response.data.data.students?.length || 0);
                    setTotalCourse(response.data.data.courses?.length || 0);
                    setTotalTeacher(response.data.data.teachers?.length || 0);
                } else {
                    console.log("Error fetching data");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchClassData();
    }, [classes.id]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">{classData.class_name}</h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 bg-blue-100 p-3 rounded-md">
                    <FaUserGraduate className="text-blue-500 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-600">Students</p>
                        <p className="text-lg font-semibold">{totalStudent}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 p-3 rounded-md">
                    <FaBook className="text-green-500 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-600">Courses</p>
                        <p className="text-lg font-semibold">{totalCourse}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 bg-purple-100 p-3 rounded-md">
                    <FaChalkboardTeacher className="text-purple-500 text-2xl" />
                    <div>
                        <p className="text-sm text-gray-600">Teachers</p>
                        <p className="text-lg font-semibold">{totalTeacher}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SchoolClasses = () => {
    const { schoolId } = useSchoolContext();
    const { toast } = useToast();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [classResponse, setClassResponse] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [newClass, setNewClass] = useState({...initialClassState, school_id: schoolId});

    const fetchClasses = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/class/school/${schoolId}`);
            setClassResponse(response.data.data);
        } catch (error) {
            console.log("Error fetching classes", error);
            setClassResponse(null);
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
                <main className="p-8 ml-56">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Class Management</h1>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2">
                                    <FaPlus />
                                    <span>Add Class</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-indigo-600">Add New Class</DialogTitle>
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <DialogFooter className="mt-6">
                                    <Button onClick={addClass} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                                        Save Class
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : classResponse && classResponse.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classResponse.map((classes, index) => (
                                <DisplayClassCard key={index} classes={classes} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center">
                            <p className="font-bold">No Classes Found</p>
                            <p>Start by adding a new class using the 'Add Class' button above.</p>
                        </div>
                    )}
                </main>
            </div>
            <Toaster />
        </div>
    )
}

export default SchoolClasses;
