import apiClient from "config/apiClient";
import { useSchoolContext } from "context/SchoolContext";
import React, { useEffect, useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SchoolSidebar from "./schoolSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";

const initialClassState = {
  class_name: "",
  school_id: "",
};

const SchoolClasses = () => {
  const { schoolId } = useSchoolContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [classResponse, setClassResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newClass, setNewClass] = useState({
    ...initialClassState,
    school_id: schoolId,
  });

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/class/school/${schoolId}`);
      const classesWithDetails = await Promise.all(
        response.data.data.map(async (classItem) => {
          const detailsResponse = await apiClient.get(`/class/${classItem.id}`);
          return {
            ...classItem,
            ...detailsResponse.data.data,
          };
        })
      );
      setClassResponse(classesWithDetails);
    } catch (error) {
      console.log("Error fetching classes", error);
      setClassResponse([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    setNewClass((prev) => ({ ...prev, school_id: schoolId }));
  }, [schoolId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value, school_id: schoolId }));
  };

  const sortedClasses = useMemo(() => {
    return [...classResponse].sort((a, b) =>
      a.class_name.localeCompare(b.class_name)
    );
  }, [classResponse]);

  const addClass = async () => {
    try {
      const response = await apiClient.post("/class", newClass);
      if (response.data.status === "success") {
        setNewClass({ ...initialClassState, school_id: schoolId });
        fetchClasses();
        toast({
          title: "Success",
          description: "Class Added Successfully",
        });
        setIsAddDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add class. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding class:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while adding the class. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (classId) => {
    navigate(`/admin/schools/classes/${classId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SchoolSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Class Management
            </h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="flex items-center">
                    <FaPlus className="mr-2" />
                    <span>Add Class</span>
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Label htmlFor="class_name">Class Name</Label>
                  <Input
                    id="class_name"
                    name="class_name"
                    value={newClass.class_name}
                    onChange={handleInputChange}
                  />
                </div>
                <DialogFooter className="mt-6">
                  <Button onClick={addClass}>Save Class</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : sortedClasses && sortedClasses.length > 0 ? (
            <Table className="bg-white">
              <TableHeader className="bg-gray-500 text-white hover:text-white">
                <TableRow>
                  <TableHead className="text-white">Class Name</TableHead>
                  <TableHead className="text-white">Students</TableHead>
                  <TableHead className="text-white">Courses</TableHead>
                  <TableHead className="text-white">Mentors</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedClasses.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>{classItem.class_name}</TableCell>
                    <TableCell>{classItem.students?.length || 0}</TableCell>
                    <TableCell>{classItem.courses?.length || 0}</TableCell>
                    <TableCell>{classItem.teachers?.length || 0}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewDetails(classItem.id)}
                        variant="outline"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                No Classes Found. Start by adding a new class using the 'Add
                Class' button above.
              </p>
            </motion.div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default SchoolClasses;
