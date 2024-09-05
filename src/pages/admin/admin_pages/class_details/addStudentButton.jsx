import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Contact } from "lucide-react";

const AddStudentButton = ({ onAddStudent }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_name: "",
    age: "",
    phone_num: "",
    address: "",
    class_id: "",
    school_id: "",
    studentId: "",
    course_id: "",
    profile_picture: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewStudent((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setNewStudent((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    const requiredFields = [
      "student_name",
      "age",
      "phone_num",
      "address",
      "studentId",
    ];
    for (const field of requiredFields) {
      if (!newStudent[field]?.trim()) {
        formIsValid = false;
        errors[field] = `${field.replace("_", " ")} is required`;
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        Object.keys(newStudent).forEach((key) => {
          if (key === "profile_picture") {
            if (newStudent[key]) {
              formData.append(key, newStudent[key]);
            }
          } else {
            formData.append(key, newStudent[key]);
          }
        });
        console.log("1", newStudent);
        await onAddStudent(newStudent);
        setNewStudent({
          student_name: "",
          age: "",
          phone_num: "",
          address: "",
          class_id: "",
          school_id: "",
          course_id: "",
          profile_picture: null,
        });
        setIsDialogOpen(false);
        toast({
          title: "Success",
          description: "Student added successfully",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add student. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewStudent({
      student_name: "",
      age: "",
      phone_num: "",
      address: "",
      class_id: "",
      school_id: "",
      studentId: "",
      course_id: "",
      profile_picture: null,
    });
  };

  const renderInputField = (key, value) => {
    if (["class_id", "school_id", "course_id"].includes(key)) {
      return null;
    }

    if (key === "profile_picture") {
      return (
        <div key={key}>
          <Label htmlFor={key} className="text-sm font-medium text-gray-700">
            Profile Picture
          </Label>
          <Input
            id={key}
            name={key}
            type="file"
            onChange={handleInputChange}
            accept="image/*"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-300 focus:ring focus:ring-zinc-200 focus:ring-opacity-50 ${
              errors[key] ? "border-red-500" : ""
            }`}
          />
          {newStudent[key] && (
            <img
              src={URL.createObjectURL(newStudent[key])}
              alt="Profile"
              className="mt-2 max-w-[200px] max-h-[200px] rounded-md mx-auto"
            />
          )}
          {errors[key] && (
            <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
          )}
        </div>
      );
    }

    return (
      <div key={key}>
        <Label htmlFor={key} className="text-sm font-medium text-gray-700">
          {key.replace("_", " ").charAt(0).toUpperCase() +
            key.replace("_", " ").slice(1)}
        </Label>

        <Input
          id={key}
          name={key}
          type={key === "age" ? "number" : "text"}
          value={value}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zinc-300 focus:ring focus:ring-zinc-200 focus:ring-opacity-50 ${
            errors[key] ? "border-red-500" : ""
          }`}
        />
        {errors[key] && (
          <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
        )}
      </div>
    );
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          handleDialogClose(); // Call the close handler when dialog is closed
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded w-1/3">
          <Contact className="mr-1" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-zinc-600">
            Add New Student
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 mx-auto ">
          {Object.entries(newStudent).map(([key, value]) =>
            renderInputField(key, value)
          )}
        </div>
        <DialogFooter className="mt-6">
          <Button
            onClick={handleDialogClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Add Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentButton;
