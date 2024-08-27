import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentSidebar from "./studentSidebar";
import CalendarComp from "userDefined_components/calendar/CalendarComp";
import MonthlyEvent from "userDefined_components/calendar/MonthlyEvent";
import TodayEvent from "userDefined_components/calendar/TodayEvent";
import { FaCalendarAlt, FaListUl, FaClock } from "react-icons/fa";
import { baseURL } from "@/utils/axiosInstance";

const SchoolCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schoolId, setSchoolId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentId = localStorage.getItem("student_id");
        if (!studentId) {
          throw new Error("Student ID not found in localStorage");
        }

        const response = await axios.get(
          `http://localhost:8000/student/${studentId}`
        );
        const { data } = response.data;
        setSchoolId(data.school_id);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <StudentSidebar />
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
              <TodayEvent date={selectedDate} school_id={schoolId} />
            </div>
            <div>
              <MonthlyEvent date={selectedDate} school_id={schoolId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchoolCalendar;
