import React, { useState } from 'react';
import { useSchoolContext } from 'context/SchoolContext';
import SchoolSidebar from './schoolSidebar';
import CalendarComp from 'userDefined_components/calendar/CalendarComp';
import MonthlyEvent from 'userDefined_components/calendar/MonthlyEvent';
import TodayEvent from 'userDefined_components/calendar/TodayEvent';
import { FaCalendarAlt, FaListUl, FaClock } from 'react-icons/fa';

const SchoolCalendar = () => {
    const { schoolId } = useSchoolContext();
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="flex h-screen bg-gray-100">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <main className="p-8 ml-56">
                    <h1 className="text-4xl font-bold mb-8 text-indigo-800 flex items-center">
                        <FaCalendarAlt className="mr-4 text-indigo-600" />
                        School Calendar
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calendar Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <CalendarComp 
                                        date={selectedDate} 
                                        setDate={setSelectedDate}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Monthly Events Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-green-100 rounded-xl shadow-lg overflow-hidden h-full">
                                <div className="bg-green-600 text-white p-4 flex items-center">
                                    <FaListUl className="mr-2" />
                                    <h2 className="text-xl font-semibold">Monthly Events</h2>
                                </div>
                                <div className="p-4">
                                    <MonthlyEvent
                                        date={selectedDate}
                                        school_id={schoolId}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Daily Events Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-indigo-100 rounded-xl shadow-lg overflow-hidden h-full">
                                <div className="bg-indigo-600 text-white p-4 flex items-center">
                                    <FaClock className="mr-2" />
                                    <h2 className="text-xl font-semibold">Today's Events</h2>
                                </div>
                                <div className="p-4">
                                    <TodayEvent
                                        date={selectedDate}
                                        school_id={schoolId}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SchoolCalendar;
