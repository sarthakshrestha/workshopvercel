import React, { useEffect, useState } from 'react';
import SchoolSidebar from './schoolSidebar';
import { useSchoolContext } from 'context/SchoolContext';
import apiClient from 'config/apiClient';

const SchoolProfile = () => {
    const { schoolId } = useSchoolContext();
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        school_name: '',
        email: '',
        password: '',
        address: ''
    });

    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                const response = await apiClient.get(`/school/${schoolId}`);
                setSchoolData(response.data.data);
                setEditedData({
                    school_name: response.data.data.school_name,
                    email: response.data.data.email,
                    address: response.data.data.address,
                    password: ''
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch school data');
                setLoading(false);
            }
        };

        if (schoolId) {
            fetchSchoolData();
        }
    }, [schoolId]);

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            handleSubmit();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const updatedData = Object.fromEntries(
                Object.entries(editedData).filter(([_, value]) => value !== '')
            );
            
            await apiClient.put(`/school/${schoolId}`, updatedData);
            const response = await apiClient.get(`/school/${schoolId}`);
            setSchoolData(response.data.data);
        } catch (err) {
            setError('Failed to update school data');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!schoolData) return <div>No school data available</div>;

    const bannerImageUrl = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80";
    const logoImageUrl = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80";

    return (
        <div className="flex h-screen bg-gray-100">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-6 ml-56">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800">School Profile</h1>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full max-w-3xl mx-auto mb-8">
                        <div className="relative">
                            <img
                                src={bannerImageUrl}
                                alt="School Banner"
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute -bottom-10 left-4">
                                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg" style={{ boxShadow: '0 0 0 2px black' }}>
                                    <img
                                        src={logoImageUrl}
                                        alt="School Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-16">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-600">School Name:</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="school_name"
                                            value={editedData.school_name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    ) : (
                                        <p>{schoolData.school_name}</p>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-600">Email:</p>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    ) : (
                                        <p>{schoolData.email}</p>
                                    )}
                                </div>
                                {isEditing && (
                                    <div>
                                        <p className="font-semibold text-gray-600">Password:</p>
                                        <input
                                            type="password"
                                            name="password"
                                            value={editedData.password}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold text-gray-600">Address:</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={editedData.address}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    ) : (
                                        <p>{schoolData.address}</p>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={handleEdit}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isEditing ? 'Save Changes' : 'Edit Information'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SchoolProfile;
