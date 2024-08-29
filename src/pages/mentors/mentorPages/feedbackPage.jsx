import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MentorSidebar from "../mentorSidebar";
import StarRating from "./starRating";

function Feedback() {
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    comment: "",
    mentorName: "",
    school: "",
    class: "",
    student: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);

  // Mock data for dropdowns
  const schools = ["School A", "School B", "School C"];
  const classes = ["Class 1", "Class 2", "Class 3"];
  const student = ["Mentor 1", "Mentor 2", "Mentor 3"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setNewFeedback((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackList((prev) => [...prev, newFeedback]);
    setNewFeedback({
      rating: 0,
      comment: "",
      mentorName: "",
      school: "",
      class: "",
      student: "",
    });
  };

  return (
    <div className="flex">
      <MentorSidebar />
      <div className="flex-1 ml-56 p-6">
        <h2 className="text-2xl font-bold mb-4">Feedback</h2>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Give Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 mt-1">
                  Rating
                </label>
                <StarRating
                  rating={newFeedback.rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newFeedback.comment}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="school"
                  className="block text-sm font-medium text-gray-700"
                >
                  School
                </label>
                <select
                  id="school"
                  name="school"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newFeedback.school}
                  onChange={handleInputChange}
                >
                  <option value="">Select a school</option>
                  {schools.map((school, index) => (
                    <option key={index} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class
                </label>
                <select
                  id="class"
                  name="class"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newFeedback.class}
                  onChange={handleInputChange}
                >
                  <option value="">Select a class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="mentor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mentor
                </label>
                <select
                  id="mentor"
                  name="mentor"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newFeedback.mentor}
                  onChange={handleInputChange}
                >
                  <option value="">Select a mentor</option>
                  {student.map((mentor, index) => (
                    <option key={index} value={mentor}>
                      {mentor}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Feedback
              </button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback List</CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackList.map((feedback, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p>Rating: {feedback.rating}</p>
                <p>Comment: {feedback.comment}</p>
                <p>School: {feedback.school}</p>
                <p>Class: {feedback.class}</p>
                <p>Student: {feedback.student}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Feedback;
