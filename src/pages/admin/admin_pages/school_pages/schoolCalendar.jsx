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
                <h1 className="text-3xl font-bold mt-[15px] text-gray-800 flex items-center justify-center animate-fade-in">
                    <FaCalendarAlt className="mr-4 text-gray-600" />
                    School Calendar
                </h1>
                <main className="p-4">
                    <div className="grid grid-cols-2 gap-[15px] animate-fade-in-up">
                        <div>
        
                            <div className="mb-[15px] min-h-[37vh]">
                                <CalendarComp
                                    date={selectedDate}
                                    setDate={setSelectedDate}
                                    className="w-full"
                                />
                            </div>
                            <TodayEvent
                                date={selectedDate}
                                school_id={schoolId}
                            />
                        </div>

                        {/* Monthly Events Column */}
                        <div>
                            <MonthlyEvent
                                date={selectedDate}
                                school_id={schoolId}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SchoolCalendar;