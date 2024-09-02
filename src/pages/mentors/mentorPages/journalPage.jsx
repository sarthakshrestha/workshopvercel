import React, { useEffect, useState } from "react";
import MentorSidebar from "../mentorSidebar";
import apiClient from "config/apiClient";

const JournalPage = () => {
    const [journals, setJournals] = useState([]);
    const mentorId = localStorage.getItem("teacher_id");

    useEffect(() => {
        // Fetch journals from your API
        const fetchJournals = async () => {
            try {
                const response = await apiClient.get(`/journals/mentor/${mentorId}`);
                const data = response.data;

                if (data.status === "success") {
                    setJournals(data.data); 
                } else {
                    console.error("Failed to fetch journals");
                }
            } catch (error) {
                console.error("Error fetching journals: ", error);
            }
        };

        fetchJournals();
    }, [mentorId]);

    return (
        <div className="flex min-h-screen bg-blue-100">
            <MentorSidebar/>

            <div className="flex-1 p-10 ml-56">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Look Through Your Journals</h1>
                    <div className="flex items-center space-x-6">
                        {/* <div className="flex items-center">
                            <label htmlFor="month" className="text-lg font-medium flex items-center mr-2">
                                <i className="fa fa-calendar mr-2"></i> Month:
                            </label>
                            <select
                                id="month"
                                name="month"
                                className="px-4 py-2 rounded-md bg-teal-100 text-gray-700 border-none focus:outline-none"
                            >
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="April">May</option>
                                <option value="April">June</option>
                                <option value="April">July</option>
                                <option value="April">August</option>
                                <option value="April">September</option>
                                <option value="April">October</option>
                                <option value="April">November</option>
                                <option value="April">December</option>
                            </select>
                            <i className="fa fa-chevron-down ml-2"></i>
                        </div> */}
                    </div>
                </header>

                {/* Journal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {journals.map((journal, index) => (
                        <div
                            key={index}
                            className="relative bg-teal-500 text-white p-6 rounded-lg shadow-lg"
                        >
                            <p className="text-base mb-4">{journal.body}</p>
                            <p className="text-sm font-bold text-teal-200">
                                {journal.day_of_week}, {journal.month} {journal.day}, {journal.year}
                            </p>
                            <div className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-br-lg clip-corner"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JournalPage;
