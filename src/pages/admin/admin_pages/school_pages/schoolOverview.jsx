import React, { useState } from 'react'
import SchoolSidebar from './schoolSidebar';
import { useSchoolContext } from 'context/SchoolContext';


const SchoolOverview = () => {
    const {schoolId , setSchoolId}= useSchoolContext();
     

    return (
        <div className="flex h-screen bg-gray-100">

            <SchoolSidebar/>
            <div className="flex-1 overflow-auto">
                <main className="p-6 ml-56">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>
                    <p>School ID: {schoolId}</p>
                </main>
            </div>
        </div>
    )
}

export default SchoolOverview;
