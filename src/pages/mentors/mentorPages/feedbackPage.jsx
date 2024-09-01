import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StarRating from "./starRating";
import MentorSidebar from "../mentorSidebar";
import apiClient from "config/apiClient";
import { motion } from "framer-motion";

function Feedback() {
  const teacherId = localStorage.getItem("teacher_id");
  const { studentId } = useParams();
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    feedback_description: "",
    feedback_date: new Date().toISOString().split('T')[0],
    feedback_by: teacherId,
    feedback_for: studentId
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (name, value) => {
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setNewFeedback((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/feedback', newFeedback);
      setFeedbackList((prevList) => {
        if (!Array.isArray(prevList)) {
          console.warn('prevList is not an array, initializing as empty array');
          return [newFeedback];
        }
        return [...prevList, newFeedback];
      });
      setNewFeedback({
        rating: 0,
        feedback_description: "",
        feedback_date: new Date().toISOString().split('T')[0],
        feedback_by: teacherId,
        feedback_for: studentId
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error posting feedback:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [studentResponse, teacherResponse, feedbackResponse] = await Promise.all([
          apiClient.get(`student/${studentId}`),
          apiClient.get(`teacher/${teacherId}`),
          apiClient.get(`/feedback/for/${studentId}`)
        ]);
        setStudent(studentResponse.data.data);
        setTeacher(teacherResponse.data.data);
        setFeedbackList(feedbackResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studentId, teacherId]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <MentorSidebar />
      <div className="flex-1 p-10 ml-56">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Feedback for {student?.student_name}</h2>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-[#34496C]">Add Feedback</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Give Feedback</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="block text-sm font-medium mb-2">Rating</Label>
                <StarRating rating={newFeedback.rating} onRatingChange={handleRatingChange} />
              </div>
              <div>
                <Label htmlFor="feedback_description" className="block text-sm font-medium mb-2">Comment</Label>
                <Textarea
                  id="feedback_description"
                  value={newFeedback.feedback_description}
                  onChange={(e) => handleInputChange("feedback_description", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <Button type="submit" className="w-full">Submit Feedback</Button> 
            </form>
          </DialogContent>
        </Dialog>

        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">Feedback History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {feedbackList && feedbackList.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {feedbackList.map((feedback, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {teacher?.name?.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{teacher?.name}</h3>
                          <p className="text-sm text-gray-500">{feedback.feedback_date || new Date().toISOString().split('T')[0]}</p>
                        </div>
                      </div>
                      <StarRating rating={feedback.rating} readonly className="text-yellow-400" />
                    </div>
                    <p className="text-gray-700 mt-2 italic">&ldquo;{feedback.feedback_description}&rdquo;</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-semibold">No feedback available yet</p>
                <p className="mt-2">Be the first to provide feedback!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Feedback;
