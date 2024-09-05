import React, { useEffect, useState } from "react";
import SchoolSidebar from "./schoolSidebar";
import { useSchoolContext } from "context/SchoolContext";
import apiClient from "config/apiClient";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import { useNavigate } from "react-router-dom";
// import school from '../../../../gallery/images/school.jpg';
// import banner from '../../../../gallery/images/banner.jpg';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Save, Trash2, School, Mail, Home, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SchoolProfile = () => {
  const navigate = useNavigate();
  const { schoolId } = useSchoolContext();
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editedData, setEditedData] = useState({
    school_name: "",
    email: "",
    password: "",
    address: "",
    course_id: [],
  });

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await apiClient.get(`/school/${schoolId}`);
        setSchoolData(response.data.data);
        setEditedData({
          school_name: response.data.data.school_name,
          email: response.data.data.email,
          address: response.data.data.address,
          password: response.data.data.password,
          course_id: response.data.data.course_id,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch school data");
        setLoading(false);
      }
    };

    if (schoolId) {
      fetchSchoolData();
    }
  }, [schoolId]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await apiClient.delete(`/school/${schoolId}`);
      navigate("/admin");
    } catch (err) {
      console.error("Error deleting school:", err);
      setError("Failed to delete school");
    } finally {
      setLoading(false);
      setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedData = Object.entries(editedData).reduce(
        (acc, [key, value]) => {
          if (value !== schoolData[key]) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      if (Object.keys(updatedData).length > 0) {
        const putResponse = await apiClient.put(
          `/school/${schoolId}`,
          updatedData
        );
        setSchoolData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating school data:", err);
      setError("Failed to update school data");
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-red-600 text-xl font-semibold">{error}</div>
      </div>
    );

  const bannerImageUrl =
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80";
  const logoImageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80";

  return (
    <div className="flex h-screen bg-gray-100">
      <SchoolSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
            School Profile
          </h1>
          <Card className="w-full max-w-3xl mx-auto mb-8">
            {loading ? (
              <LoadingSpinner />
            ) : schoolData ? (
              <>
                <div className="relative">
                  <img
                    src={bannerImageUrl}
                    alt="School Banner"
                    className="w-full h-48 object-cover"
                  />
                  <motion.div
                    className="absolute -bottom-20 left-4"
                    initial={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="w-44 h-44 rounded-full border-4 border-white overflow-hidden shadow-lg"
                      style={{ boxShadow: "0 0 0 2px black" }}
                    >
                      <img
                        src={logoImageUrl}
                        alt="School Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
                <CardContent className="p-6 pt-28">
                  <AnimatePresence>
                    <motion.div
                      className="space-y-4 grid grid-cols-2 gap-6"
                      initial={{ height: "auto" }}
                      animate={{ height: isEditing ? "auto" : "auto" }}
                      exit={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {["school_name", "email", "address"].map((field) => (
                        <div
                          key={field}
                          className="flex items-center space-x-4"
                        >
                          {field === "school_name" && (
                            <School className="text-gray-600 mt-2" />
                          )}
                          {field === "email" && (
                            <Mail className="text-gray-600  mt-2" />
                          )}
                          {field === "address" && (
                            <Home className="text-gray-600  mt-2" />
                          )}
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-600 capitalize">
                              {field.replace("_", " ")}:
                            </p>
                            <Input
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              value={editedData[field]}
                              onChange={handleChange}
                              className="mt-1"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      ))}
                      {isEditing && (
                        <div className="flex items-center space-x-4">
                          <Key className="text-gray-600  mt-2" />
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-600">
                              Password:
                            </p>
                            <Input
                              type="password"
                              name="password"
                              value={editedData.password}
                              onChange={handleChange}
                              className="mt-1"
                              placeholder="Enter new password"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex gap-4 mt-12 mb-6">
                    <Button
                      onClick={handleEdit}
                      className="w-1/2"
                      disabled={loading}
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : isEditing ? (
                        <>
                          <Save className="mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2" />
                          Edit Information
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDeleteClick}
                      className=" bg-red-500 w-1/2 hover:bg-red-600"
                      disabled={loading}
                    >
                      <Trash2 className="mr-2" />
                      Delete School
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No school data available</p>
              </div>
            )}
          </Card>
        </main>
      </div>
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="mb-4">
            Are you sure you want to delete this school? This action cannot be
            undone.
          </p>
          <div className="flex justify-end">
            <Button
              onClick={handleDeleteCancel}
              variant="outline"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolProfile;
