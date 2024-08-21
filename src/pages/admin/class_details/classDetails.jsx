import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SchoolSidebar from '../admin_pages/school_pages/schoolSidebar';
import apiClient from 'config/apiClient';
import LoadingSpinner from 'userDefined_components/loading_spinner/loadingSpinner';

const ClassDetails = () => {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const[totalCourse, setTotalCourse] = useState(0);
    const[totalTeacher, setTotalTeacher] = useState(0);
    const[totalStudent, setTotalStudent] = useState(0);

    useEffect(() => {
        const fetchClassData = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
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
        };

        fetchClassData();
    }, [classId]);

    return (
        <div className="flex h-screen bg-gray-100">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-8 ml-56">
                    {isLoading ? (
                        <LoadingSpinner/>
                    ) : classData ? (
                        <>
                            <h1 className="text-3xl font-bold mb-6">{classData.class_name}</h1>
                            
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-xl font-semibold mb-2">Students</h2>
                                    <p className="text-3xl font-bold">{totalStudent}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-xl font-semibold mb-2">Teachers</h2>
                                    <p className="text-3xl font-bold">{totalTeacher}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <h2 className="text-xl font-semibold mb-2">Courses</h2>
                                    <p className="text-3xl font-bold">{totalCourse}</p>
                                </div>
                            </div>

                            <div className="flex space-x-4 mb-8">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Assign Teacher
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Assign Course
                                </button>
                                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                                    Add Student
                                </button>
                            </div>

                            <div className="bg-white rounded shadow">
                                <h2 className="text-2xl font-bold p-4 border-b">Students</h2>
                                {classData.students.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {classData.students.map((student) => (
                                                <tr key={student.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center mt-3">
                                        <p className="font-bold">No Students Found</p>
                                        <p>Start by adding new students to this class using the 'Add Student' button above.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center">
                            <p className="font-bold">No Class Data Found</p>
                            <p>There was an issue retrieving the class data. Please try again later.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ClassDetails;
