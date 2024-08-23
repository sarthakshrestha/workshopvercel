import React, { useState } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const AddStudentButton = ({ onAddStudent }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        student_name: '',
        age: '',
        phone_num: '',
        address: '',
        class_id: '',
        school_id: '',
        course_id: []
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        const requiredFields = ['student_name', 'age', 'phone_num', 'address'];
        for (const field of requiredFields) {
            if (!newStudent[field].trim()) {
                formIsValid = false;
                errors[field] = `${field.replace('_', ' ')} is required`;
            }
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await onAddStudent(newStudent);
                setNewStudent({
                    student_name: '',
                    age: '',
                    phone_num: '',
                    address: '',
                    class_id: '',
                    school_id: '',
                    course_id: []
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

    const renderInputField = (key, value) => {
        if (['class_id', 'school_id', 'course_id'].includes(key)) {
            return null; // Don't render input for these fields
        }

        return (
            <div key={key}>
                <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                    {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                </Label>

                <Input
                    id={key}
                    name={key}
                    type={key}
                    value={value}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 ${errors[key] ? 'border-red-500' : ''}`}
                />
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
            </div>
        );
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-1/3">
                    Add Student
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-purple-600">Add New Student</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    {Object.entries(newStudent).map(([key, value]) => renderInputField(key, value))}
                </div>
                <DialogFooter className="mt-6">
                    <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        Add Student
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddStudentButton;
