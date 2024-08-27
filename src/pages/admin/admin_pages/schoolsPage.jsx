import React, { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import apiClient from "config/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  ChevronDown,
  Users,
  BookOpen,
  GraduationCap,
  Send,
} from "lucide-react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useSchoolContext } from "context/SchoolContext";
import { useNavigate } from "react-router-dom";

const initialSchoolState = {
  school_name: "",
  email: "",
  password: "",
  address: "",
};

const InfoIcon = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <HelpCircle
            className="w-5 h-5 text-gray-500 cursor-help"
            onClick={() => setIsOpen(!isOpen)}
          />
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SchoolCard = ({ school }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [totalClass, setTotalClass] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalCourse, setTotalCourse] = useState(0);
  const { schoolId, setSchoolId } = useSchoolContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setSchoolId(school.id);
    navigate("/admin/schools/overview");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await apiClient.get(`/class/school/${school.id}`);
        const studentsResponse = await apiClient.get(
          `/student/school/${school.id}`
        );

        if (
          classResponse.data.status === "success" &&
          studentsResponse.data.status === "success"
        ) {
          setTotalClass(
            classResponse.data.data ? classResponse.data.data.length : 0
          );
          setTotalStudent(
            studentsResponse.data.data ? studentsResponse.data.data.length : 0
          );
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [school.id]);

  const bannerImageUrl =
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80";
  const logoImageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80";
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full max-w-3xl mx-auto">
      <div className="relative">
        <img
          src={bannerImageUrl}
          alt="School Banner"
          className="w-full h-32 object-cover"
        />
        <div className="absolute -bottom-10 left-4">
          <div
            className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg"
            style={{ boxShadow: "0 0 0 2px black" }}
          >
            <img
              src={logoImageUrl}
              alt="School Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div
        className="pt-12 px-6 pb-6 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            {school.school_name}
          </h3>
          <div className="flex">
            <Button
              onClick={handleClick}
              className="flex items-center underline bg-white hover:bg-white space-x-2  text-gray-800  rounded-lg "
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-sm">
          {school.email}, {school.address}
        </p>
        <div className="mt-4 flex items-center  text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200">
          <span className="mr-2 font-semibold text-sm">
            {showDetails ? "Hide Details" : "Overview"}
          </span>
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-200 ${
              showDetails ? "rotate-180" : ""
            }`}
          />
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showDetails ? "auto" : 0,
            opacity: showDetails ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {showDetails && (
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
              <InfoCard
                icon={<BookOpen className="text-green-500" />}
                title="Classes"
                value={totalClass}
              />
              <InfoCard
                icon={<Users className="text-blue-500" />}
                title="Students"
                value={totalStudent}
              />
              <InfoCard
                icon={<GraduationCap className="text-purple-500" />}
                title="Courses"
                value="10"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between items-center h-full">
    <div className="flex gap-2 items-center justify-center">
      <div className="flex justify-center mb-2  h-5 w-5">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-700 text-sm">{title}</h4>
      </div>
    </div>
    <p className="text-lg font-bold text-gray-900 mt-auto">{value}</p>
  </div>
);
const SchoolsPage = () => {
  const { toast } = useToast();
  const [schoolData, setSchoolData] = useState([]);
  const [newSchool, setNewSchool] = useState(initialSchoolState);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await apiClient.get("/school");
      console.log(response);
      setSchoolData(response.data.data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchool((prev) => ({ ...prev, [name]: value }));
  };

  const validateSchoolData = (schoolData) => {
    const requiredFields = ["school_name", "email", "password", "address"];
    for (let field of requiredFields) {
      if (!schoolData[field]) {
        return `${field.replace("_", " ")} is required`;
      }
    }
    return null; // No errors
  };

  const addSchool = async () => {
    const validationError = validateSchoolData(newSchool);
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsAddDialogOpen(false);

    toast({
      title: "Processing",
      description: "Adding school...",
    });

    try {
      apiClient
        .post("/school", newSchool)
        .then((response) => {
          if (response.data.status === "success") {
            setNewSchool(initialSchoolState);
            fetchSchools();
            toast({
              title: "Success",
              description: "School added successfully",
            });
          } else {
            console.error("Failed to add school:", response.data.message);
            toast({
              title: "Error",
              description: "Failed to add school. Please try again.",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error("Error adding school:", error);
          toast({
            title: "Error",
            description:
              "An error occurred while adding the school. Please try again.",
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("Error sending request:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while sending the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 ml-56">
          <div className="flex justify-between">
            <div className="flex ">
              <h1 className="text-2xl font-bold mb-6">School Management</h1>
              <div className="pt-1.5 ml-4">
                <InfoIcon text="Click on the icon to go to the dashboard." />
              </div>
            </div>
            <div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="mb-4"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Add School
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New School</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="school_name" className="text-right">
                        School Name
                      </Label>
                      <Input
                        id="school_name"
                        name="school_name"
                        value={newSchool.school_name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newSchool.email}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={newSchool.password}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={newSchool.address}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addSchool}>Save School</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Display schools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schoolData &&
              schoolData.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
          </div>
        </main>
      </div>
      <Toaster duration={1000} />
    </div>
  );
};

export default SchoolsPage;
