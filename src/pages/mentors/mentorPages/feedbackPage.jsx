import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import StarRating from "./starRating";
import MentorSidebar from "../mentorSidebar";

function Feedback() {
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    comment: "",
    studentName: "",
    school: "",
    class: "",
    student: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for dropdowns
  const schools = ["School A", "School B", "School C"];
  const classes = ["Class 1", "Class 2", "Class 3"];
  const students = ["student 1", "student 2", "student 3"];

  const handleInputChange = (name, value) => {
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
      studentName: "",
      school: "",
      class: "",
      student: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <MentorSidebar />
      <div className="flex-1 ml-56 p-6">
        <h2 className="text-2xl font-bold mb-4">Feedback</h2>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Add Feedback</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Give Feedback</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="block text-sm font-medium mb-2 mt-1">
                  Rating
                </Label>
                <StarRating
                  rating={newFeedback.rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={newFeedback.comment}
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="school">School</Label>
                <Select
                  value={newFeedback.school}
                  onValueChange={(value) => handleInputChange("school", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school, index) => (
                      <SelectItem key={index} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="class">Class</Label>
                <Select
                  value={newFeedback.class}
                  onValueChange={(value) => handleInputChange("class", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls, index) => (
                      <SelectItem key={index} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="student">Student</Label>
                <Select
                  value={newFeedback.student}
                  onValueChange={(value) => handleInputChange("student", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student, index) => (
                      <SelectItem key={index} value={student}>
                        {student}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Submit Feedback</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Card className="mt-6">
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
