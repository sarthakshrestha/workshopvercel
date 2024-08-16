import React, { useEffect, useState } from 'react';
import SchoolSidebar from './schoolSidebar';
import { useSchoolContext } from 'context/SchoolContext';
import apiClient from 'config/apiClient';

const initialSchoolState = {
    school_name: '',
    email: '',
    password: '',
    address: '',
    course_id: []
};

const SchoolProfile = () => {
    const { schoolId } = useSchoolContext();
    const [schoolData, setSchoolData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(initialSchoolState);

    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                const response = await apiClient.get(`/school/${schoolId}`);
                setSchoolData(response.data.data);
                setEditedData({
                    school_name: response.data.data.school_name,
                    email: response.data.data.email,
                    address: response.data.data.address,
                    password: '',
                    course_id: response.data.data.course_id || []
                });
            } catch (err) {
                setError('Failed to fetch school data');
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
            setEditedData({
                ...response.data.data,
                password: ''
            });
        } catch (err) {
            setError('Failed to update school data');
        }
    };

    if (error) return <div>{error}</div>;
    if (!schoolData) return null;

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
                                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                                    <img 
                                        src={logoImageUrl} 
                                        alt="School Logo" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-16">
                            <h2 className="text-3xl font-bold mb-2">{schoolData.school_name}</h2>
                            <p className="text-gray-600 mb-4">{schoolData.address}</p>
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                            {isEditing && (
                                <form className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school_name">
                                            School Name
                                        </label>
                                        <input
                                            type="text"
                                            id="school_name"
                                            name="school_name"
                                            value={editedData.school_name}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={editedData.email}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={editedData.password}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={editedData.address}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SchoolProfile;
