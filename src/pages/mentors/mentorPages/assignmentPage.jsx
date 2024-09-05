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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash, Plus, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import MentorSidebar from "../mentorSidebar";
import apiClient from "config/apiClient";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";

function AssignmentPage() {
  const teacherId = localStorage.getItem("teacher_id");
  const { classId } = useParams();
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    class_id: classId,
    teacher_id: teacherId,
  });

  const [assignmentList, setAssignmentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classDetails, setClassDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  const handleInputChange = (name, value) => {
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditing) {
        // Only send the updated fields in the dictionary
        const updatedFields = {};
        if (
          assignment.title !==
          assignmentList.find((item) => item._id === assignment._id).title
        ) {
          updatedFields.title = assignment.title;
        }
        if (
          assignment.description !==
          assignmentList.find((item) => item._id === assignment._id).description
        ) {
          updatedFields.description = assignment.description;
        }
        if (
          assignment.start_date !==
          assignmentList.find((item) => item._id === assignment._id).start_date
        ) {
          updatedFields.start_date = assignment.start_date;
        }
        if (
          assignment.end_date !==
          assignmentList.find((item) => item._id === assignment._id).end_date
        ) {
          updatedFields.end_date = assignment.end_date;
        }
        response = await apiClient.put(
          `/assignments/${assignment._id}`,
          updatedFields
        );
        setAssignmentList((prevList) =>
          prevList.map((item) =>
            item._id === assignment._id ? response.data : item
          )
        );
      } else {
        response = await apiClient.post("/assignments", assignment);
        setAssignmentList((prevList) => [...prevList, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleEdit = (assignmentToEdit) => {
    setAssignment(assignmentToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (assignmentId) => {
    try {
      await apiClient.delete(`/assignments/${assignmentId}`);
      setAssignmentList((prevList) =>
        prevList.filter((item) => item._id !== assignmentId)
      );
    } catch (error) {
      console.error("Error deleting assignment:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const resetForm = () => {
    setAssignment({
      title: "",
      description: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      class_id: classId,
      teacher_id: teacherId,
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [classResponse, assignmentsResponse] = await Promise.all([
          apiClient.get(`/class/${classId}`),
          apiClient.get(`/assignments/class/${classId}`),
        ]);
        setClassDetails(classResponse.data.data);
        setAssignmentList(assignmentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show an error message to the user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classId]);

  const handleDateSelect = (field, date) => {
    if (date) {
      setAssignment((prev) => ({
        ...prev,
        [field]: format(date, "yyyy-MM-dd"),
      }));
    } else {
      // If date is undefined (clicked on already selected date), clear the field
      setAssignment((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setAssignmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const confirmDelete = async () => {
    await handleDelete(assignmentToDelete);
    handleCloseDeleteDialog();
  };

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <MentorSidebar />
      <div className="flex-1 p-10 ml-56">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Assignments for {classDetails?.class_name}
        </h2>

        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="mb-6 bg-[#34496C]">Add Assignment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {isEditing ? "Edit" : "Create"} Assignment
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={assignment.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="start_date" className="text-sm font-medium">
                    Start Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                          !assignment.start_date && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {assignment.start_date ? (
                          format(new Date(assignment.start_date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          assignment.start_date
                            ? new Date(assignment.start_date)
                            : undefined
                        }
                        onSelect={(date) => {
                          handleDateSelect("start_date", date);
                          setIsModalOpen(false);
                        }}
                        onClose={() => setIsModalOpen(false)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="end_date" className="text-sm font-medium">
                    End Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                          !assignment.end_date && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {assignment.end_date ? (
                          format(new Date(assignment.end_date), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          assignment.end_date
                            ? new Date(assignment.end_date)
                            : undefined
                        }
                        onSelect={(date) => handleDateSelect("end_date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={assignment.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full mt-1"
                  rows={4}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Update" : "Create"} Assignment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this Assignment?
            </DialogDescription>
            <DialogFooter>
              <Button
                className="bg-green-800 hover:bg-green-700"
                onClick={confirmDelete}
              >
                <Check /> Yes
              </Button>
              <Button
                className="bg-red-800 hover:bg-red-700"
                onClick={handleCloseDeleteDialog}
              >
                <X /> No
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : assignmentList && assignmentList.length > 0 ? (
            assignmentList.map((assignment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white">
                    <CardTitle className="text-xl font-bold">
                      {assignment.title}
                    </CardTitle>
                    <p className="text-sm mt-2">
                      {format(new Date(assignment.start_date), "MMMM d, yyyy")}{" "}
                      - {format(new Date(assignment.end_date), "MMMM d, yyyy")}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between p-6">
                    <p className="text-gray-700 mb-4">
                      {assignment.description}
                    </p>
                    <div className="flex justify-end space-x-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(assignment)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          handleOpenDeleteDialog(assignment._id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-xl font-semibold">
                No assignments available yet
              </p>
              <p className="mt-2">Create your first assignment!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentPage;
