import React, { useEffect, useState } from "react";
import MentorSidebar from "../mentorSidebar";
import apiClient from "config/apiClient";

const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
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

  const handleJournalClick = (journal) => {
    setSelectedJournal(journal);
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      <MentorSidebar />

      <div className="flex-1 p-10 ml-56">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold font-patrick">
            Look Through Your Journals{" "}
            <p className="text-2xl mt-2 font-semibold font-patrick">
              Click to view your entire journal entry!
            </p>
          </h1>

          <div className="flex items-center space-x-6">
            {/* Month Selector (commented out) */}
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
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <i className="fa fa-chevron-down ml-2"></i>
            </div> */}
          </div>
        </header>

        {/* Journal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-patrick">
          {journals &&
            journals.length > 0 &&
            journals.map((journal, index) => (
              <div
                key={index}
                className="relative bg-teal-500 text-white p-6 rounded-lg shadow-lg font-patrick text-3xl h-64 overflow-hidden cursor-pointer"
                onClick={() => handleJournalClick(journal)}
              >
                {/* Displaying the date at the top */}
                <p className="text-xl font-bold text-teal-200 font-patrick mb-4">
                  {journal.day_of_week}, {journal.month} {journal.day},{" "}
                  {journal.year}
                </p>

                {/* Displaying the journal body without truncation */}
                <p className="text-2xl pb-8 font-patrick">
                  {journal.body.split(" ").slice(0, 30).join(" ")}
                  {journal.body.split(" ").length > 30 && " ..."}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-br-lg clip-corner"></div>
              </div>
            ))}
        </div>

        {/* View Journal Modal */}
        {selectedJournal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 font-patrick mt-6">
                {selectedJournal.day_of_week}, {selectedJournal.month}{" "}
                {selectedJournal.day}, {selectedJournal.year}
              </h2>
              <p className="text-lg font-patrick mt-6">
                {selectedJournal.body}
              </p>
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-md mt-8 mx-auto items-center flex"
                onClick={() => setSelectedJournal(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
